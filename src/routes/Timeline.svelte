<script lang="ts">
	import { onMount } from 'svelte';
	import type { TimelineData } from '$lib/js/Types';
	import { createEditor } from 'slate';

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

	/**
	 * @param {string} id
	function scrolltoElement(id) {
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	}
	*/

	let y = 0;
	let wrapperOffset = 0;
	let scrollHeight = 1;
	let throttling = false;
	let windowInnerHeight = 0;

	$: scrollHeightBelow = scrollHeight - wrapperOffset - 100;
	$: calcOffset = wrapperOffset - windowInnerHeight / 2;
	$: diamondY = Math.max(0, ((y - calcOffset) / scrollHeightBelow) * 100);

	onMount(() => {
		scrollHeight = document.documentElement.scrollHeight;
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
</script>

<svelte:window bind:scrollY={y} on:resize={handleResize} bind:innerHeight={windowInnerHeight} />

<div class="sidebar" id="timeline-sidebar">
	<div class="wrapper" bind:offsetHeight={wrapperOffset}>
		<span class="diamond" style:top="calc({diamondY}% - 8px)">&#9830</span>
		{#each years as year}
			<div class="year">
				<p>{year}</p>
				<div class="links">
					{#each data as content, i}
						{#if content.date.getFullYear() === year}
							<div class="content-jump">
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
<style>
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
	}
	.year p {
		margin: inherit;
		padding-left: 25px;
		color: #ddd;
	}
	/*		border-left: 2px solid #ccc;*/
	.sidebar {
		position: -webkit-sticky; /* for Safari */
		position: sticky;
		float: left;
		top: 50px;
		left: 0px;
		bottom: 0;
		margin: 0 0 0 25px;
		width: 18px;
		padding-top: 25px;

		background: transparent;
		transition: all 500ms ease-in-out;
		z-index: 1000;
	}
	.diamond {
		top: 0px;
		color: #ddd;
		font-size: 32px;
		position: absolute;
		line-height: 1;
	}
	/*.sidebar:hover {
		width: 100px;
	}*/
	.sidebar .wrapper {
		width: 100px;
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
	/*.sidebar .links .content-jump img{
        display: inline-block;
        width: 18px;
        height: 18px;
    }*/
	/*button {
		display: inline-block;
		font-size: 15px;
		margin-left: 10px;
		background-color: transparent;
		border: none;
		width: 50px;
		color: #e1cbd2;
	}*/
	/*.sidebar .links .content-jump:hover {
		background: transparent;
		cursor: pointer;
	}*/
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
		background-color: #b90b8c;
		border: 3px solid #ddd;
		position: absolute;
		left: -9px;
	}
	/*.content-jump:hover::before{
        width: 18px;
        transition: all 300ms ease-in-out;
   }*/
	/* Circle shape
    .content-jump::before {
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #000;
		border: 3px solid #ddd;
		position: absolute;
		left: -8px;
	}*/
</style>
