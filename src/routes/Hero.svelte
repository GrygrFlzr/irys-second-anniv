<script lang="ts">
	import { onMount } from 'svelte';
	import HeroImage from './HeroImage.svelte';
	import ScrollHint from './ScrollHint.svelte';
	import { getGlobalStore } from '$lib/js/globalStore';

	let showTitle = false;
	let showPoem = false;
	let heroSection: HTMLElement;
	const globalStore = getGlobalStore();

	onMount(() => {
		setTimeout(() => {
			showTitle = true;
		}, 500);

		setTimeout(() => {
			showPoem = true;
		}, 1500);
		
		$globalStore.heroHeight = heroSection.clientHeight;
	});

	/**
	 * @param {HTMLElement} ele
	 */
	function autoScroll(ele:HTMLElement) {
		if (
			!matchMedia('(min-width: 1500px)').matches ||
			matchMedia('prefers-reduced-motion: reduce').matches
		) {
			return;
		}
		const timeout = setInterval(() => {
			ele.scrollBy({ top: 10, behavior: 'smooth' });
		}, 50);
		if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
			clearInterval(timeout);
		}

		return {
			destroy() {
				clearInterval(timeout);
			}
		};
	}
</script>

<div class="hero-section" bind:this={heroSection}>
	<div class="hero-image">
		<HeroImage />
	</div>

	{#if showTitle}
		<div class="title" class:title-show={showTitle}>THE PANDORA LOGS OF HOPE</div>

		<div class="sub-title">
			<p>
				The world had been riddled with despair and desperation.<br />
				But it would not stay that way for long.<br />
				One being would believe in the power of her voice.<br />
				One nephilim saw what was needed to reawaken the world.<br /><br />

				And thus, Hope descended on July 11, 2021.
			</p>
			<p class="sub-title-emphasis"><b>This is her journey.</b></p>
		</div>

		<ScrollHint />
	{/if}

	<div class="poem" class:show={showPoem} use:autoScroll>
		<p>
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			cCpoem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem
		</p>

		<p>
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem cCpoem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem cCpoem poem
			poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem poem
			poem poem poem poem poem poem poem
		</p>
	</div>
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
	}

	.title-show {
		opacity: 1;
	}

	.sub-title {
		font-size: 22px;
		text-align: center;
		color: rgb(255, 255, 255, 0.5);
	}

	.sub-title-emphasis {
		font-size: 24px;
		color: rgb(255, 255, 255, 1);
	}

	.poem {
		scroll-snap-align: start;
		padding: 2rem 10%;
		opacity: 0;
		transition: all 150ms ease-in-out;
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
		}
	}
</style>
