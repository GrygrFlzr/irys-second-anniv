<script lang="ts">
	import { browser } from '$app/environment';
	import SimpleImageGallery from '$lib/components/SimpleImageGallery.svelte';
	import SimpleSlateRenderer from '$lib/components/SimpleSlateRenderer.svelte';
	import type { TimelineData } from '$lib/types/Types';

	export let data: Array<TimelineData> = [
		{
			date: new Date(),
			title: 'placeholder2',
			background_image: undefined,
			images: [],
			content: []
		}
	];

	const years = [2021, 2022, 2023];
	/*let sectionElement;
	window.addEventListener(
		"load",
		(event) => {
			sectionElement = document.getElementById(`sectionID`);

			createObserver();
		}

	);
	function createObserver(){
		let observer;
		
		let options = {
		root: document.querySelector("#scrollArea"),
		rootMargin: "0px",
		threshold: 0.5,
		};
		observer = new IntersectionObserver(handleIntersect, options);
	}
	function handleIntersect(entries, observer){

	}*/

	let scroll: number;
	$: innerHeight = 0;
	/* Reference https://alvarotrigo.com/blog/css-animations-scroll/*/
	function reveal() {
		var revealsections = document.querySelectorAll('.reveal-section');
		for (var i = 0; i < revealsections.length; i++) {
			var sectionTop = revealsections[i].getBoundingClientRect().top;
			var sectionVisible = 150;
			if (sectionTop < innerHeight - sectionVisible) {
				revealsections[i].classList.add('active');
			} else {
				revealsections[i].classList.remove('active');
			}
		}
	}
	if (browser) {
		window.addEventListener('scroll', reveal);
	}

	// https://stackoverflow.com/a/3552493
	function formatDate(date: Date) {
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
		let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
		let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
		return `${mo} ${da}, ${ye}`;
	}
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight />
<section class="timeline">
	{#each years as year}
		<p class="year-divider">{year}</p>
		{#each data as item, i}
			{#if item.date.getFullYear() === year}
				<section class="timeline-section reveal-section active">
					<div class="timeline-item" id="id_{i}">
						<div class="timeline-extra">
							<h2>{item.title}</h2>
							<h3>{formatDate(item.date)}</h3>
							<div class="milestone-content">
								<SimpleSlateRenderer richTextElements={item.content} />
							</div>
						</div>
						<div class="timeline-img-container">
							<SimpleImageGallery images={item.images} />
						</div>
					</div>
				</section>
			{/if}
		{/each}
	{/each}
</section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
	.timeline {
		margin: 1rem;
		padding: 0 20px 0 30px;
	}
	.year-divider {
		color: #ddd;
		font-size: 22px;
		padding-bottom: 20px;
		text-decoration: underline;
		text-underline-position: under;
	}
	.timeline section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100vh;
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
		margin-bottom: 100px;
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
	h3 {
		margin: 10px;
		font-size: medium;
	}
	p {
		margin: 0;
		padding: 10px 0px;
		font-size: medium;
	}

	.milestone-content {
		margin: 10px;
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
