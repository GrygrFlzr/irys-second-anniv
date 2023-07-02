<script lang="ts">
	import SimpleImageGallery from '$lib/components/SimpleImageGallery.svelte';
	import SimpleSlateRenderer from '$lib/components/SimpleSlateRenderer.svelte';
	import { createReducedMotionStore } from '$lib/js/createMediaQueryStore';
	import type { YearlyTimelineData } from '$lib/types/Types';

	export let years: YearlyTimelineData[];
	export let intersectingEvents: Record<string, boolean>;
	export let diamondY: number;
	export let currentYear: number;

	let scrollY = 0;
	let timelineItemObserver: IntersectionObserver;
	let yearObserver: IntersectionObserver;
	let currentIntersectingYear: Element;
	let throttling = false;
	let windowInnerHeight = 0;

	const ITEM_ID_PREFIX = 'id_';
	const yearElements: Record<number, HTMLElement> = {};
	const revealSections: Record<string, HTMLElement> = {};
	const prefersReducedMotion = createReducedMotionStore();

	$: innerHeight = 0;
	$: if (currentIntersectingYear && !$prefersReducedMotion) {
		const boundingClientRect = currentIntersectingYear.getBoundingClientRect();

		diamondY = Math.max(
			0,
			((scrollY - (boundingClientRect.top + scrollY)) / boundingClientRect.height) * 100
		);
	}

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
			threshold: 0
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
			intersectingMap[eventId] = entry.isIntersecting;
		});

		intersectingEvents = intersectingMap;
	}

	function yearObserverAction(item: HTMLElement) {
		yearObserver ??= new IntersectionObserver(yearObserverCallback, {
			threshold: 0
		});

		yearObserver.observe(item);

		return {
			destroy() {
				yearObserver.unobserve(item);
			}
		};
	}

	function yearObserverCallback(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				currentIntersectingYear = entry.target;
			}
		});
	}

	function handleScroll() {
		if (throttling) {
			return;
		}

		requestAnimationFrame(() => {
			reveal();
			checkYear();
			throttling = false;
		});
		throttling = true;
	}

	function checkYear() {
		// For the foldout to adjust the height based on whether the header collapses

		for (let i = 0; i < years.length; i++) {
			const year = years[i];
			const nextYear = years[i + 1];
			const element1 = yearElements[year.year].getBoundingClientRect().top;
			const element2: number | undefined =
				yearElements[nextYear?.year]?.getBoundingClientRect().top;

			if (
				element2 &&
				scrollY > element1 + window.scrollY - windowInnerHeight / 1.25 &&
				scrollY < element2 + window.scrollY - windowInnerHeight / 1.25
			) {
				currentYear = year.year;
			}
			// For the last year
			else if (
				scrollY > element1 + window.scrollY - windowInnerHeight / 1.25 &&
				typeof element2 === 'undefined'
			) {
				currentYear = years[years.length - 1].year;
			}
		}
	}
</script>

<svelte:window bind:scrollY bind:innerHeight on:scroll={handleScroll} />

<section class="timeline">
	{#each years as year}
		<section class="year-divider" use:yearObserverAction bind:this={yearElements[year.year]}>
			<p class="year-css" id={year.id}>{year.year}</p>
			{#each year.events as item}
				<section
					class="timeline-section reveal-section active"
					bind:this={revealSections[year.year]}
				>
					<div class="timeline-item" id="{ITEM_ID_PREFIX}{item.id}" use:timelineTimeObserverAction>
						<div class="timeline-extra">
							<h2>{item.title}</h2>
							<div class="date">{formatDate(item.date)}</div>
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
		transform: translateY(150px);
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
		background-color: rgba(255, 255, 255, 0.7);
		padding: 20px 25px;
		border-radius: 50px;
		position: relative;
		height: auto;
		margin: 0px 0px 100px 60px;
		line-height: 1.5;
		justify-items: left;
	}

	.timeline-extra {
		margin: 10px;
		padding: 20px;
		color: #59084a;
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

	.date {
		margin: 10px;
		font-size: medium;
		font-weight: bold;
	}
	p {
		margin: 0;
		padding: 10px 0px;
		font-size: medium;
	}

	.milestone-content {
		margin: 10px;
	}

	@media (min-width: 320px) {
		.timeline {
			margin: 0px 10px 0px 40px;
			padding: 30px 10px 0px 20px;
		}
	}
	@media (min-width: 481px) {
		.timeline {
			margin: 0px 20px 0px 40px;
			padding: 50px 20px 0px 30px;
		}
	}
	@media (min-width: 769px) {
		.timeline {
			margin: 0px 0px 0px 135px;
			padding: 50px 30px 0px 30px;
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
