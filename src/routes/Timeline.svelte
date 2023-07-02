<script lang="ts">
	import type { YearlyTimelineData } from '$lib/types/Types';

	export let years: YearlyTimelineData[];
	export let intersectingEvents: Record<string, boolean>;
	/* For the diamond to move about*/
	export let diamondY: number;
	export let currentYear = years[0].year;

	let foldoutOpen = false;
	function handleFoldoutOpen() {
		foldoutOpen = true;
		document.body.addEventListener('click', handleMenuClose);
	}

	function handleMenuClose() {
		foldoutOpen = false;
		document.body.removeEventListener('click', handleMenuClose);
	}

	//Allows the user to scroll into the timeline content on click
	function scrollToElement(id: string) {
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	}

	$: currentYearIndex = years.findIndex((y) => y.year === currentYear);
	$: currentYearDiamondOffset = (currentYearIndex + 1) * 23;
</script>

<div class="toggle" class:active={foldoutOpen}>
	<button
		type="button"
		class="arrow glow"
		id="toggle_button"
		on:click|stopPropagation={handleFoldoutOpen}>&#8250</button
	>
</div>
<div class="foldout" class:active={foldoutOpen}>
	{#each years as { year, events }}
		<section class="foldout-wrapper">
			<h2 class="foldout-year">{year}</h2>
			{#each events as content}
				{@const target = `id_${content.id}`}
				<a
					class="foldout-content"
					class:active={intersectingEvents[content.id]}
					id="foldout-content{content.id}"
					href="#id_{target}"
					on:click|preventDefault={() => scrollToElement(target)}
				>
					<p class="content-title">{content.title}</p>
				</a>
			{/each}
		</section>
	{/each}
</div>

<div class="sidebar" class:active={foldoutOpen}>
	<div class="wrapper">
		<span class="diamond" style:top="calc({diamondY}% + {currentYearDiamondOffset}px)">&#9830</span>
		{#each years as { year, events }}
			<div class="year" id="x">
				<p>{year}</p>
				<div class="links">
					{#if year === currentYear}
						{#each events as content}
							<div class="content-jump" class:active={intersectingEvents[content.id]} />
						{/each}
					{/if}
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
		top: var(--header-height);
		width: 250px;
		height: 95svh;
		transform: translateX(-300px);
		background: #e5e5e5;
		transition: transform 0.5s, top 0.15s;
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
		display: inline-block;
		text-decoration: none;
		color: initial;
		font-size: 0.83em;
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
	/* .content-jump.border {
		border-left: 3px solid #b90b8c;
		transition: all 500ms ease-in-out;
	} */
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
