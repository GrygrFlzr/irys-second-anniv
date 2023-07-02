<script lang="ts">
	import type { PageData } from './$types';
	import Hero from './Hero.svelte';
	import Timeline from './Timeline.svelte';
	import TimelineContent from './TimelineContent.svelte';

	// Prefilled by server data; assuming the data is sorted by server side code.
	export let data: PageData;

	let intersectingEvents: Record<string, boolean> = {};
	let diamondY = 0;
	let currentYear = data.data[0].year;
</script>

<Hero />

<div class="background-img">
	<div class="content">
		<div class="achievements blur">
			<div class="timeHeader">Oh you found me! Stream Idol</div>
		</div>
		<Timeline bind:intersectingEvents bind:diamondY bind:currentYear years={data.data} />
		<div class="blur">
			<TimelineContent bind:intersectingEvents bind:diamondY bind:currentYear years={data.data} />
		</div>
	</div>
</div>

<style>
	.background-img {
		/** shouldn't be global otherwise other pages and error page will also be hidden */
		margin-top: calc(var(--header-offset) * -1);
		background: #600150;
		background-image: url('/img/timeline-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}

	.content {
		background: rgba(0, 0, 0, 0);
		padding-top: 1em;
	}
	.blur {
		backdrop-filter: blur(5px);
	}
	.achievements {
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
	}
	@media (max-width: 769px) {
		.timeHeader {
			font-size: small;
			padding: 0px;
		}
		.achievements {
			padding: 0px;
			margin: 0px;
		}
	}
</style>
