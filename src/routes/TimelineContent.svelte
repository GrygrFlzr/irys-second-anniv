<script lang="ts">
	import SimpleImageGallery from '$lib/components/SimpleImageGallery.svelte';
	import SimpleSlateRenderer from '$lib/components/SimpleSlateRenderer.svelte';
	import { createReducedMotionStore } from '$lib/js/createMediaQueryStore';
	import type { YearlyTimelineData } from '$lib/types/Types';

	export let years: YearlyTimelineData[];
	export let intersectingEvents: Record<string, boolean>;
	export let diamondY: number;
	export let currentYear: number;
	export let src: string | undefined;

	let timelineItemObserver: IntersectionObserver;
	let throttling = false;

	const ITEM_ID_PREFIX = 'id_';
	const yearElements: Record<number, HTMLElement> = {};
	const revealSections: Record<string, HTMLElement> = {};
	const prefersReducedMotion = createReducedMotionStore();

	$: idFromEvent = new Map(years.flatMap((year) => year.events).map((event) => [event.id, event]));

	/* Reference https://alvarotrigo.com/blog/css-animations-scroll/*/
	function reveal() {
		for (const revealSection of Object.values(revealSections)) {
			const revealSectionTop = revealSection.getBoundingClientRect().top;
			const revealSectionVisible = 150;
			if (revealSectionTop < innerHeight - revealSectionVisible) {
				revealSection.classList.add('active');
			} else {
				revealSection.classList.remove('active');
			}
		}
	}

	// https://stackoverflow.com/a/3552493
	function formatDate(date: Date) {
		const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
		const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
		const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
		return `${mo} ${da}, ${ye}`;
	}

	function timelineTimeObserverAction(item: HTMLElement) {
		timelineItemObserver ??= new IntersectionObserver(timelineItemObserverCallback, {
			threshold: 0.5
		});

		timelineItemObserver.observe(item);

		return {
			destroy() {
				timelineItemObserver.unobserve(item);
			}
		};
	}

	function timelineItemObserverCallback(entries: IntersectionObserverEntry[]) {
		const intersectingMap: Record<string, boolean> = {
			...intersectingEvents
		};

		entries.forEach((entry) => {
			const eventId = entry.target.id.replace(ITEM_ID_PREFIX, '');
			const event = idFromEvent.get(eventId);
			if (event?.background_image != null) {
				src = event.background_image.src;
			} else if (event?.images != null) {
				src = event?.images[0].src;
			}
			intersectingMap[eventId] = entry.isIntersecting;
		});

		intersectingEvents = intersectingMap;
	}

	function handleScroll() {
		if (throttling) {
			return;
		}

		requestAnimationFrame(() => {
			reveal();
			checkYear();
			checkDiamond();
			throttling = false;
		});
		throttling = true;
	}

	function checkYear() {
		// For the foldout to adjust the height based on whether the header collapses
		let newYear = currentYear;

		for (let i = 0; i < years.length; i++) {
			const year = years[i];
			const nextYear = years[i + 1];
			const element1 = yearElements[year.year].getBoundingClientRect().top;
			const element2: number | undefined =
				yearElements[nextYear?.year]?.getBoundingClientRect().top;
			const element1ScrollY = element1 + scrollY;
			const element2ScrollY = (element2 ?? 0) + scrollY;
			const bottomOfScreen = scrollY + innerHeight / 1.25;

			if (element2 && bottomOfScreen > element1ScrollY && scrollY < element2ScrollY) {
				newYear = year.year;
			}
			// For the last year
			else if (bottomOfScreen > element1ScrollY && typeof element2 === 'undefined') {
				newYear = years[years.length - 1].year;
			}
		}

		currentYear = newYear;
	}

	function checkDiamond() {
		const currentIntersectingYear = yearElements[currentYear];
		if (currentIntersectingYear && !$prefersReducedMotion) {
			const boundingClientRect = currentIntersectingYear.getBoundingClientRect();
			diamondY = Math.max(
				0,
				((scrollY - (boundingClientRect.top + scrollY)) / boundingClientRect.height) * 100
			);
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />

<section class="timeline">
	{#each years as year}
		<section class="year-divider" bind:this={yearElements[year.year]}>
			<p class="year-css" id={year.id}>{year.year}</p>
			{#each year.events as item}
				<section class="timeline-section reveal-section active" bind:this={revealSections[item.id]}>
					<div class="timeline-item" id="{ITEM_ID_PREFIX}{item.id}" use:timelineTimeObserverAction>
						<div class="timeline-extra">
							<div class="date">{formatDate(item.date)}</div>
							<h2>{item.title}</h2>
							<div class="milestone-content">
								<SimpleSlateRenderer richTextElements={item.content} />
							</div>
						</div>
						<div class="timeline-img-container">
							<SimpleImageGallery images={item.images} />
						</div>
					</div>
				</section>
			{/each}
		</section>
		<div class="extra-space">
			<h2 class="year-end">End of {year.year}</h2>
		</div>
	{/each}
</section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
	.timeline {
		margin: 1rem;
		padding: 0 20px 0 30px;
	}
	.year-css {
		color: #ddd;
		font-size: 22px;
		margin-left: 60px;
		padding-bottom: 20px;
		text-decoration: underline;
		text-underline-position: under;
		scroll-snap-align: start;
	}
	.timeline-section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 90vh;
		min-height: 100svh;
	}
	/* Line for the timeline      border-left: 2px solid #ccc;  */
	.reveal-section {
		position: relative;
		transform: translateY(100px);
		opacity: 0;
		transition: 1s all ease;
	}
	.active {
		transform: translateY(0);
		opacity: 1;
	}
	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 20px 25px;
		border-radius: 50px;
		position: relative;
		height: auto;
		margin: 0px 0px 100px 20px;
		line-height: 1.5;
		justify-items: left;
	}

	.timeline-extra {
		margin: 10px;
		color: white;
	}
	.extra-space {
		display: flex;
		color: #ddd;
		width: auto;
		height: 450px;
		align-items: center;
		justify-content: center;
	}
	.year-end {
		position: relative;
	}
	.year-end::before {
		content: '';
		display: block;
		width: 60%;
		height: 2px;
		background: #ddd;
		left: -70%;
		top: 50%;
		position: absolute;
	}
	.year-end::after {
		content: '';
		display: block;
		width: 60%;
		height: 2px;
		background: #ddd;
		right: -70%;
		top: 50%;
		position: absolute;
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
		font-size: 2em;
	}

	.date {
		margin: 10px;
		font-size: 1.5em;
		font-weight: lighter;
	}
	p {
		margin: 0;
		padding: 10px 0px;
		font-size: medium;
	}
	/*https://stackoverflow.com/questions/1165497/how-to-prevent-text-from-overflowing-in-css*/
	.milestone-content {
		margin: 10px;
		word-wrap: break-word;
		/*white-space: pre-wrap; (Seems to add more whitespace below the link)*/
		word-break: break-word;
	}

	@media (min-width: 320px) {
		.timeline {
			margin: 0px 10px 0px 40px;
			padding: 30px 10px 0px 20px;
		}
		.extra-space {
			height: 100px;
		}
	}
	@media (min-width: 481px) {
		.timeline {
			margin: 0px 20px 0px 40px;
			padding: 50px 20px 0px 30px;
		}
		.extra-space {
			height: 250px;
		}
	}
	@media (min-width: 769px) {
		.timeline {
			margin: 0px 0px 0px 135px;
			padding: 50px 30px 0px 30px;
		}
		.extra-space {
			height: 350px;
		}
		.timeline-extra {
			padding: 20px;
		}
	}

	@media (min-width: 1024px) {
		.timeline {
			margin: 0px 10px 0px 100px;
			padding: 50px 10px 0px 60px;
		}

		.timeline-item {
			grid-template-columns: 3fr 2fr;
			margin-right: 5em;
		}

		.timeline-img-container {
			margin: auto 1rem;
		}
		.extra-space {
			height: 450px;
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

	@media (prefers-reduced-motion: reduce) {
		.reveal-section {
			transition: 1s opacity ease;
		}
	}

	/** TODO: considering adding dark mode and make timeline-item black  */
</style>
