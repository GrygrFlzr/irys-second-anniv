<script lang="ts">
	import { createReducedMotionStore } from '$lib/js/createMediaQueryStore';
	import type { PageData } from './$types';
	import Confetti from './Confetti.svelte';
	import Hero from './Hero.svelte';
	import Timeline from './Timeline.svelte';
	import TimelineContent from './TimelineContent.svelte';

	// Prefilled by server data; assuming the data is sorted by server side code.
	export let data: PageData;

	let intersectingEvents: Record<string, boolean> = {};
	let diamondY = 0;
	let currentYear = data.data[0].year;
	let showConfettiElements: Set<string> = new Set();

	const prefersReducedMotion = createReducedMotionStore();
</script>

<svelte:head>
	<title>The Pandora Logs Of Hope - AnniversaRyS 2023</title>
</svelte:head>

<div class="background">
	<img src="/img/timeline-bg.jpg" class="background-img" alt="" />
	<div class="stream-idol blur">
		<a href="https://www.youtube.com/watch?v=UpbpwXAEJl4" class="timeHeader"
			>Oh you found me! Stream Idol</a
		>
	</div>

	<Hero />

	<Confetti showConfetti={showConfettiElements.size > 0} {prefersReducedMotion} />
	<div class="content">
		<Timeline bind:intersectingEvents bind:diamondY bind:currentYear years={data.data} />
		<div class="blur">
			<TimelineContent
				bind:intersectingEvents
				bind:diamondY
				bind:currentYear
				bind:showConfettiElements
				years={data.data}
				{prefersReducedMotion}
			/>
		</div>
	</div>
</div>

<style>
	.background {
		/** shouldn't be global otherwise other pages and error page will also be hidden */
		margin-top: calc(var(--header-offset) * -1);
		background: #600150;
	}

	/* 
		the performance of background-attachment: fixed 
		is terrible on Chrome Android. will-change: transform doesn't help much
		so we use a fixed position image instead
	 */
	.background-img {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		object-position: center;
		position: fixed;
		top: 0;
		z-index: 0;
	}

	.content {
		background: rgba(0, 0, 0, 0);
	}
	.blur {
		padding-top: 1rem;
		backdrop-filter: blur(5px);
	}
	.stream-idol {
		background-color: #300029;
		margin: 0px 20px 10px;
		padding: 15px 15px;
		border-radius: 30px;
	}

	.timeHeader {
		color: #cbcbcb;
		text-align: center;
		margin: auto;
		padding: 15px 15px;
		display: block;
	}
	@media (max-width: 769px) {
		.timeHeader {
			font-size: small;
			padding: 0px;
		}
		.stream-idol {
			padding: 0px;
			margin: 0px;
		}
	}
</style>
