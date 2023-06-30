<script lang="ts">
	import { onMount } from 'svelte';
	import type { TimelineData } from '$lib/types/Types';
	import { browser } from '$app/environment';

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

	// For Lighting up the timeline bubble and foldout content when content is on screen
	let active = false;
	let border = false;
	if (browser) {
		const items = document.querySelectorAll('.timeline-item');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const currentIndex = Array.prototype.indexOf.call(items, entry.target);
					const timelineBubble = document.getElementById(`content_${currentIndex}`);
					const foldoutContent = document.getElementById(`foldout-content${currentIndex}`);
					timelineBubble?.classList.toggle('active', entry.isIntersecting);
					foldoutContent?.classList.toggle('active', entry.isIntersecting);
				});
			},
			{
				threshold: 0
			}
		);
		items.forEach((item) => {
			observer.observe(item);
		});
	}
	// For the diamond to move about
	let diamondY = 0;

	$: if (browser) {
		const contentYear = document.querySelectorAll('.year-divider');
		const observer2 = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const currentIndex = Array.prototype.indexOf.call(contentYear, entry.target);
						currentYearIndex = currentIndex + 1;
						diamondY = Math.max(
							0,
							((y - (entry.boundingClientRect.top + window.pageYOffset)) /
								entry.boundingClientRect.height) *
								100
						);
					}
				});
			},
			{
				threshold: 0
			}
		);
		contentYear.forEach((year) => {
			observer2.observe(year);
		});
	}

	// For the toggle button to disappear/ Foldout
	let foldout: HTMLDivElement | null;
	let toggleid: HTMLDivElement;

	let timeline: HTMLDivElement;
	let foldoutopen = false;
	function handleFoldoutOpen() {
		foldoutopen = true;
		toggleid?.classList.toggle('active');
		foldout?.classList.toggle('active');
		timeline?.classList.toggle('active');
		document.body.addEventListener('click', handleMenuClose);
	}

	function handleMenuClose() {
		foldoutopen = false;
		toggleid?.classList.toggle('active');
		foldout?.classList.toggle('active');
		timeline?.classList.toggle('active');
		document.body.removeEventListener('click', handleMenuClose);
	}

	//Allows the user to scroll into the timeline content on click
	function scrolltoElement(id: string) {
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	}

	let y = 0;
	let wrapperY = 0;
	let wrapperOffset = 0;
	let scrollHeight = 1;
	let scrollTop = 0;
	let throttling = false;
	let windowInnerHeight = 0;
	let headerHeight: number | undefined;

	$: currentYear = years[0];
	$: currentYearIndex = 0;
	$: currentYearDiamond = currentYearIndex * 23;
	$: scrollHeightBelow = scrollHeight - wrapperOffset - 100;
	$: calcOffset = wrapperOffset - windowInnerHeight / 2;

	onMount(() => {
		scrollHeight = document.documentElement.scrollHeight;
		scrollTop = document.documentElement.scrollTop;

		// For the timeline to do the collapse thing
		window.addEventListener('scroll', function () {
			// For the foldout to adjust the height based on whether the header collapses
			const HHeight = document.getElementById('header-id')?.offsetHeight;
			headerHeight = HHeight;
			// ---------------------------------------------------------------------------- //
			for (let i = 0; i < years.length; i++) {
				var element1 = document.getElementById(`contentyear_${i}`)?.getBoundingClientRect().top;
				var element2 = document.getElementById(`contentyear_${i + 1}`)?.getBoundingClientRect().top;
				// Can't really get rid of lint errors as element2 is supposed to be undefined for the last year
				try {
					if (
						y > element1 + this.window.scrollY - windowInnerHeight / 1.25 &&
						y < element2 + this.window.scrollY - windowInnerHeight / 1.25
					) {
						currentYear = years[i];
					}
					// For the last year
					else if (
						y > element1 + this.window.scrollY - windowInnerHeight / 1.25 &&
						typeof element2 === 'undefined'
					) {
						currentYear = years[years.length - 1];
					}
				} catch {
					currentYear = years[i];
				}
			}
		});
	});

	function handleResize() {
		if (throttling) {
			return;
		}

		throttling = true;
		requestAnimationFrame(() => {
			scrollHeight = document.documentElement.scrollHeight;
			throttling = false;
		});
	}

	function checkSidebarY(node: HTMLElement) {
		wrapperY = node.getBoundingClientRect().top + screenY;
	}
</script>

<svelte:window bind:scrollY={y} on:resize={handleResize} bind:innerHeight={windowInnerHeight} />

<div class="toggle" bind:this={toggleid} class:active>
	<button
		type="button"
		class="arrow glow"
		id="toggle_button"
		on:click|stopPropagation={handleFoldoutOpen}>&#8250</button
	>
</div>
<div class="foldout" style:top="calc({headerHeight}px)" class:active bind:this={foldout}>
	{#each years as year}
		<section class="foldout-wrapper">
			<h2 class="foldout-year">{year}</h2>
			{#each data as content, i}
				{#if content.date.getFullYear() === year}
					<button
						class="foldout-content"
						class:active
						id="foldout-content{i}"
						on:click|preventDefault={() => scrolltoElement(`id_${i}`)}
					>
						<p class="content-title">{content.title}</p>
					</button>
				{/if}
			{/each}
		</section>
	{/each}
</div>

<div class="sidebar" class:active bind:this={timeline}>
	<div class="wrapper" use:checkSidebarY>
		<span class="diamond" style:top="calc({diamondY}% + {currentYearDiamond}px)">&#9830</span>
		{#each years as year, x}
			<div class="year" id="timelineyear_{x}">
				<p>{year}</p>
				<div class="links" class:active>
					{#each data as content, i}
						{#if content.date.getFullYear() === year && content.date.getFullYear() === currentYear}
							<div class="content-jump" class:active class:border id="content_{i}">
								<!--<button on:click={() => scrolltoElement(`${x}_${i}_id`)}>{content.title}</button>-->
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Reference https://www.youtube.com/watch?v=BHskAsXVey8 -->
<!-- Glow Reference https://www.w3schools.com/howto/howto_css_glowing_text.asp-->
<style>
	.toggle {
		position: fixed;
		top: 40%;
		left: 0px;
		width: 30px;
		height: auto;
		background: transparent;
		cursor: pointer;
		transition: 0.2s;
		z-index: 300;
	}
	.toggle.active {
		transform: translateX(-30px);
	}
	.arrow {
		background: transparent;
		border: none;
		padding-left: 16px;
	}
	.glow {
		font-size: 50px;
		color: #fff;
		text-align: center;
		animation: glow 1s ease-in-out infinite alternate;
	}
	@keyframes glow {
		from {
			text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073,
				0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
		}

		to {
			text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6,
				0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
		}
	}
	.foldout {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		top: 63.8px;
		width: 250px;
		height: 95svh;
		transform: translateX(-300px);
		background: #e5e5e5;
		transition: 0.5s;
	}
	/*Styling Scrollbar for Firefox*/
	.foldout.active {
		transform: translateX(0px);
		z-index: 1001;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #b90b8c #e5e5e5;
	}
	/*Styling Scrollbar For Chrome, Edge and Safari*/
	.foldout::-webkit-scrollbar {
		width: 10px;
	}
	.foldout::-webkit-scrollbar-track {
		background: #e5e5e5;
	}
	.foldout::-webkit-scrollbar-thumb {
		background-color: #b90b8c;
		border-radius: 20px;
		border: 3px solid #e5e5e5;
	}

	.foldout-year {
		margin: 0;
		padding: 8px;
	}
	.foldout-content {
		background: #d9d9d9;
		border: transparent;
		font-family: inherit;
		margin: 0;
		padding: 15px;
		height: auto;
		width: 100%;
	}
	.foldout-content.active {
		background: #b90b8c;
		transition: 0.3s;
	}
	.foldout-content:hover {
		background: #116116;
		cursor: pointer;
		transition: 0.5s;
	}
	.content-title {
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: auto;
		width: auto;
	}
	.year::before {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: #ddd;
		border: 3px solid #ddd;
		position: absolute;
		left: 0px;
		transition: all 300ms ease-in-out;
	}
	.links {
		transition: all 500ms ease-in-out;
	}
	.year p {
		margin: inherit;
		padding: 5px 0px 0px 15px;
		color: #ddd;
		border-left: 3px solid #ddd;
		transform: translateX(7px);
	}
	/*		border-left: 2px solid #ccc;*/
	.sidebar {
		position: -webkit-sticky; /* for Safari */
		position: sticky;
		float: left;
		top: 150px;
		left: 300px;
		bottom: 0;
		margin: 0 0 0 25px;
		width: 18px;
		padding-top: 25px;
		transform: translateX(-250px);
		background: transparent;
		transition: all 500ms ease-in-out;
		z-index: 1000;
	}
	.sidebar.active {
		transform: translateX(-500px);
	}
	.diamond {
		top: 0px;
		color: #ddd;
		font-size: 32px;
		position: absolute;
		line-height: 1;
	}

	.sidebar .wrapper {
		width: 20px;
		height: 100%;
		background-color: transparent;
	}
	.sidebar .links {
		padding: 0px 0px;
	}
	.sidebar .links .content-jump {
		margin: 0px 0px;
		height: 50px;
		color: #888;
		display: flex;
		align-items: center;
		padding: 0px 12px;
		transition: all 300ms ease-in-out;
	}

	.content-jump {
		border-left: 3px solid #ddd;
		padding-left: 6px;
		transform: translateX(7px);
	}
	.content-jump::before {
		content: '';
		background: #e1cbd2;
		width: 0px;
		height: 3px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	.content-jump::after {
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		/*background-color: #b90b8c;*/
		background-color: #ddd;
		border: 3px solid #ddd;
		position: absolute;
		left: -9px;
	}
	.content-jump.border {
		border-left: 3px solid #b90b8c;
		transition: all 500ms ease-in-out;
	}
	.content-jump.active::after {
		background-color: #b90b8c;
		transition: all 500ms ease-in-out;
	}
	@media (min-width: 320px) {
		.content-title {
			font-size: 1.5em;
		}
	}
	@media (min-width: 481px) {
		.content-title {
			font-size: 1.25em;
		}
	}
	@media (min-width: 769px) {
		.foldout {
			width: 200px;
		}
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1400px) {
		.foldout {
			width: 250px;
		}
	}
</style>
