<script lang="ts">
	import { onMount } from 'svelte';
	import HeroImage from './HeroImage.svelte';
	import ScrollHint from './ScrollHint.svelte';
	import type { TransitionConfig } from 'svelte/transition';
	import { createReducedMotionStore } from '$lib/js/createMediaQueryStore';

	let showTitle = false;
	let showPoem = false;
	let lastDuration = 0;
	let poemElement: HTMLElement;

	const reducedMotion = createReducedMotionStore();

	const poem = [
		`poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			cCpoem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem
		`,

		`poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem cCpoem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem cCpoem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem
		`
	];

	$: textTransition = $reducedMotion ? () => ({}) : typewriter;

	onMount(() => {
		setTimeout(() => {
			showTitle = true;
		}, 500);

		setTimeout(() => {
			showPoem = true;
		}, 1500);
	});

	function typewriter(node: HTMLElement, { speed = 1 }): TransitionConfig {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent ?? '';
		const duration = text.length / (speed * 0.01);
		const delay = lastDuration;
		lastDuration += duration;

		return {
			delay,
			duration,
			tick: (t) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
				poemElement?.scrollBy({ top: 3, behavior: 'smooth' });
			}
		};
	}
</script>

<div class="hero-section">
	<div class="hero-image">
		<HeroImage />
	</div>

	{#if showTitle}
		<div class="title" class:title-show={showTitle}>THE PANDORA LOGS OF HOPE</div>

		<div class="sub-title">
			<p>Project: Hope began on xx</p>
			<p>Some epic description about the timeline / chuuni text This is her journey.</p>
		</div>

		<ScrollHint />
	{/if}

	{#key showPoem}
		<div class="poem" class:show={showPoem} bind:this={poemElement}>
			{#each poem as line}
				<p in:textTransition={{ speed: 5 }}>{line}</p>
			{/each}
		</div>
	{/key}
</div>

<style>
	.hero-section {
		padding-top: 15vh;
		min-height: 100vh;
		background-color: #242424;
		color: #fff;
		scroll-snap-align: start;
		position: relative;
	}

	.hero-image {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 48px;
		transition: all 150ms ease-in-out;
		opacity: 0;
		text-align: center;
	}

	.title-show {
		opacity: 1;
	}

	.sub-title {
		font-size: 24px;
		text-align: center;
	}

	.poem {
		scroll-snap-align: start;
		padding: 2rem 10%;
		opacity: 0;
		/* transition: all 150ms ease-in-out; */
		color: rgba(255, 255, 255, 0.5);
	}

	.show {
		opacity: 1;
	}

	@media (min-width: 1500px) {
		.poem {
			position: absolute;
			right: 1rem;
			top: 6rem;
			width: 25%;
			padding: 1rem;
			scrollbar-width: thin;
			overflow-y: scroll;
			height: calc(100vh - 12rem);
			padding-top: 50vh;
		}

		.poem::-webkit-scrollbar {
			width: 0.5rem;
		}

		.poem:hover::-webkit-scrollbar-track {
			background: #3d3d3d;
		}

		.poem::-webkit-scrollbar-thumb {
			background-color: #888;
			border-radius: 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poem {
			padding-top: 0;
			display: flex;
			flex-direction: column;
			justify-content: end;
		}
	}
</style>
