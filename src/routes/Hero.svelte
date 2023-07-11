<script lang="ts">
	import { onMount } from 'svelte';
	import HeroImage from './HeroImage.svelte';
	import ScrollHint from './ScrollHint.svelte';
	import { getGlobalStore } from '$lib/js/globalStore';
	import type { TransitionConfig } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { createReducedMotionStore } from '$lib/js/createMediaQueryStore';

	let showTitle = false;
	let showPoem = false;
	let heroSection: HTMLElement;
	let lastDuration = 0;
	let poemElement: HTMLElement;

	const globalStore = getGlobalStore();
	const reducedMotion = createReducedMotionStore();

	// white-space: pre-line. so it's fine for the poem to be indented
	const poem = [
		`On the day of the weaver star
		On the hour of the ox
		People await near and far
		As the timer ticks and tocks`,

		`For eight hours they wonder
		Until the sixth zodiac sign
		Then fourteen bell chimes thunder
		And after it, a repeat sign 𝄆`,

		`"As long as we are with hope,
		we live. We stand tall."
		With these first dozen words
		She is introduced to all`,

		`Soon to arrive is this nephilim
		A singer, a streamer, a soul of kindness
		Born a half demon and half seraphim
		She is Hope Incarnate, she is IRyS`,

		`Once the Hope of the Paradise
		In times of eons past
		She awoke to our modern cries
		For the same hope she once cast`,

		`In these times of despair, when flames burn cold
		When people give up before dreams unfold
		With her heart of gold, her voice so bold
		She sings for tales and futures yet untold`,

		`In four days she will be here
		In four days she will shine
		And through the bird in blue we hear
		She tweets a repeat sign 𝄆`
	];

	$: textTransition = $reducedMotion || !showPoem ? () => ({}) : typewriter;

	onMount(() => {
		setTimeout(() => {
			showTitle = true;
		}, 900);

		setTimeout(() => {
			showPoem = true;
		}, 1500);

		updateHeroHeight();
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

				if (text[i - 1] === '\n' || i === text.length) {
					scrollPoem();
				}
			}
		};
	}

	function scrollPoem() {
		setTimeout(() => {
			poemElement?.scrollTo({ top: poemElement.scrollHeight, behavior: 'smooth' });
		}, 50);
	}

	function updateHeroHeight() {
		$globalStore.heroHeight = heroSection.clientHeight;
	}
</script>

<div class="hero-section" bind:this={heroSection}>
	<div class="hero-image">
		<HeroImage />
	</div>

	{#if showTitle}
		<div
			class="title title-glow"
			class:title-show={showTitle}
			in:fade={{ duration: 500, easing: quadInOut }}
		>
			THE PANDORA LOGS OF HOPE
		</div>

		<div class="sub-title" in:fade={{ delay: 500, duration: 500, easing: quadInOut }}>
			<p>
				The world had been riddled with despair and desperation.<br />
				But it would not stay that way for long.<br />
				One being would believe in the power of her voice.<br />
				One nephilim saw what was needed to reawaken the world.<br /><br />

				And thus, Hope descended on July 11, 2021.
			</p>
			<p class="sub-title-emphasis glow"><b>This is her journey.</b></p>
		</div>

		<div in:fade={{ delay: 1000, duration: 500, easing: quadInOut }}>
			<ScrollHint />
		</div>
	{/if}

	{#key showPoem}
		<div
			class="poem"
			class:show={showPoem}
			bind:this={poemElement}
			in:fade={{ delay: 300, duration: 500 }}
		>
			<div class="poem-symbol">𝄆</div>
			<div class="poem-content">
				{#each poem as line}
					<!--typewriter need exactly one text node-->
					<!--prettier-ignore-->
					<p class="poem-paragraph" in:textTransition={{ speed: 8 }} on:introend={updateHeroHeight}>{line}</p>
				{/each}
			</div>
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
		z-index: 499;
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
		padding: 0 0.75rem 0 0.75rem;
	}

	.title-show {
		opacity: 1;
	}

	.glow {
		animation: glow 3s ease-in-out infinite alternate;
	}

	.title-glow {
		animation: title-glow 3s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			text-shadow: 0 0 0px rgba(255, 255, 255, 0), 0 0 2px rgba(255, 255, 255, 0.6);
		}

		to {
			text-shadow: 0 0 2px rgba(255, 255, 255, 0.6), 0 0 0px rgba(255, 255, 255, 0);
		}
	}

	@keyframes title-glow {
		from {
			text-shadow: 0 0 5px rgba(255, 255, 255, 0), 0 0 10px rgba(255, 255, 255, 0.6);
		}

		to {
			text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 5px rgba(255, 255, 255, 0);
		}
	}

	.sub-title {
		font-size: 22px;
		text-align: center;
		color: rgb(255, 255, 255, 0.5);
		padding: 0 0.75rem 0 0.75rem;
	}

	.sub-title-emphasis {
		font-size: 24px;
		color: rgb(255, 255, 255, 1);
	}

	.poem-symbol {
		font-size: 6rem;
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
		margin-bottom: 1rem;
	}

	.poem {
		scroll-snap-align: start;
		padding: 2rem 10%;
		opacity: 0;
		transition: all 150ms ease-in-out;
		color: rgba(255, 255, 255, 0.95);
		/* 
			reminder: if this is changed to whitespace sensitive
			we need to dedent the poem array
		*/
		white-space: pre-line;
		line-height: 1.5;
		display: flex;
		flex-direction: column;
		align-items: left;
		min-height: 64rem;
		background-color: rgb(41, 38, 38);
		box-shadow: inset 0px 5px 5px rgb(31, 28, 28), 0px 2px 1px rgb(31, 28, 28);
	}

	.poem-content {
		width: fit-content;
		min-width: 22em;
		max-width: 80vw;
	}

	@media (min-width: 768px) {
		.poem {
			display: grid;
			column-gap: 100px;
			grid-template-columns: 2fr 3.2fr;
			min-height: 57rem;
		}

		.poem-symbol {
			font-size: 10rem;
			text-align: right;
		}

		.poem-content {
			padding-top: 30px;
		}
	}

	.show {
		opacity: 1;
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
