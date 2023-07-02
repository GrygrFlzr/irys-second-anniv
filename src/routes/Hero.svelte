<script>
	import { onMount } from 'svelte';
	import HeroImage from './HeroImage.svelte';
	import ScrollHint from './ScrollHint.svelte';

	let showTitle = false;
	let showPoem = false;

	onMount(() => {
		setTimeout(() => {
			showTitle = true;
		}, 500);

		setTimeout(() => {
			showPoem = true;
		}, 1500);
	});

	/**
	 * @param {HTMLElement} ele
	 */
	function autoScroll(ele) {
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
