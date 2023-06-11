<script>
	import { onDestroy, onMount } from 'svelte';

	/**
	 * @type {import('./EventInfo').EventInfo[]}
	 */
	export let data;

	/**
	 * @type {number | undefined}
	 */
	export let selectedIndex = undefined;

	let observingCount = 0;
	let inView = new Set();
	let mounted = false;

	/**
	 * @type {ReturnType<typeof setTimeout> | undefined}
	 */
	let scrollThrottleTimeout;

	/**
	 * @type {IntersectionObserver | undefined}
	 */
	let observer;

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		clearTimeout(scrollThrottleTimeout);
	});

	/**
	 * @param {HTMLElement} ele
	 */
	function observerAction(ele) {
		if (!observer) {
			observer = createIntersectionObserver();
		}

		observer.observe(ele);
		observingCount++;

		return {
			destroy() {
				observer?.unobserve(ele);
				observingCount--;
				if (observingCount === 0) {
					observer?.disconnect();
					observer = undefined;
				}
			}
		};
	}

	function createIntersectionObserver() {
		return new IntersectionObserver(observerCallback, {
			rootMargin: '-20px'
		});
	}

	/**
	 *
	 * @param {IntersectionObserverEntry[]} entries
	 */
	function observerCallback(entries) {
		const isInitial = entries.length === observingCount;
		entries.forEach((entry) => {
			if (!(entry.target instanceof HTMLElement) || !entry.target.dataset.id) {
				return;
			}
			const id = parseInt(entry.target.dataset.id);
			const index = data.findIndex((i) => i.id === id);
			if (entry.isIntersecting) {
				inView.add(index);
				if (!isInitial) {
					selectedIndex = index;
				}
			} else {
				inView.delete(index);
			}
		});
	}

	/**
	 *
	 * @param {HTMLElement} ele
	 * @param {boolean} selected
	 */
	function scrollAction(ele, selected) {
		update(selected);

		return {
			update
		};

		/**
		 * @param {boolean} selected
		 */
		function update(selected) {
			if (selected) {
				ele.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}
		}
	}

	/**
	 * @param {WheelEvent} event
	 */
	function handleWheel(event) {
		const scrollDown = event.deltaY > 0;

		if (selectedIndex === undefined) {
			selectedIndex = inView.size > 0 ? Math.min(...inView) : 0;
			event.preventDefault();
			return;
		}

		const newIndex = scrollDown ? selectedIndex + 1 : selectedIndex - 1;

		if (!inView.has(newIndex)) {
			return;
		}

		event.preventDefault();
		if (!scrollThrottleTimeout) {
			selectedIndex = newIndex;
			return;
		}

		clearTimeout(scrollThrottleTimeout);
		scrollThrottleTimeout = setTimeout(() => (scrollThrottleTimeout = undefined), 70);
	}
</script>

<svelte:window on:wheel|nonpassive={handleWheel} />

<section class="timeline">
	{#each data as item, i}
		{@const isSelected = i === selectedIndex}
		<div
			class="timeline-item"
			id="{i}_id"
			data-id={item.id}
			class:timeline-item-selected={isSelected}
			use:scrollAction={isSelected}
			use:observerAction
		>
			<div class="timeline-extra">
				<h2>{item.title}</h2>
				<h3>{item.date}</h3>
				<p>{item.content}</p>
			</div>
			<div class="timeline-img-container">
				<img class="timeline-img" src={item.photo} alt="some test about IRyS" />
			</div>
		</div>
	{/each}
</section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
	.timeline {
		margin: 1rem;
		padding: 0 20px 0 30px;
	}
	/* Line for the timeline      border-left: 2px solid #ccc;  */

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		background-color: rgba(255, 255, 255, 0.7);
		padding: 20px 25px;
		border-radius: 50px;
		position: relative;
		margin-bottom: 200px;
		line-height: 1.5;
		justify-items: center;
		min-height: calc(100vh - 100px);
	}

	.timeline-item-selected {
		display: grid;
	}

	.timeline-extra {
		margin: 10px;
		padding: 20px;
		color: #59084a;
	}

	.timeline-img {
		height: 150px;
		border-style: solid;
		border-width: 2px;
		border-color: grey;
		border-radius: 30px;
		max-width: 100%;
		object-fit: contain;
	}
	/* Dot beside the timeline 
.timeline-item::before{
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    border: 3px solid #ddd;
    position:absolute;
    left: -39px;
}*/

	h2 {
		margin: 10px;
		text-transform: uppercase;
		font-size: large;
	}
	h3 {
		margin: 10px;
		font-size: medium;
	}
	p {
		margin: 0;
		padding: 10px 0px;
		font-size: medium;
	}

	@media (min-width: 1024px) {
		.timeline {
			margin: 50px 10px 50px 100px;
			padding: 0 20px 0 30px;
		}

		.timeline-item {
			grid-template-columns: 3fr 2fr;
			margin-right: 5em;
		}

		.timeline-img-container {
			margin: auto 1rem;
		}
	}

	@media (min-width: 1400px) {
		.timeline {
			margin-left: 200px;
		}

		.timeline-img-container {
			margin: auto 2rem;
		}
	}

	/** TODO: considering adding dark mode and make timeline-item black  */
</style>
