<script>
	import { onMount } from 'svelte';
	import HeroImage from './HeroImage.svelte';

	let showTitle = false;

	onMount(() => {
		setTimeout(() => {
			showTitle = true;
		}, 500);
	});
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
	{/if}
</div>

<style>
	.hero-section {
		padding-top: 15vh;
		height: 100vh;
		background-color: #242424;
		color: #fff;
		scroll-snap-align: start;
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
</style>
