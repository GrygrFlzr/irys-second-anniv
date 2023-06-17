<script lang="ts">
	import TimelineContent from './TimelineContent.svelte';
	import Timeline from './Timeline.svelte';
	import type { TimelineData } from '$lib/js/Types';
	// Can probably have a different file hold the data / Use the database
	// *IMPORTANT* DATA IS REQUIRED TO BE SORTED BY YEAR/DATE ACCORDINGLY (OTHERWISE IT WIRED AND STUFF)

	// Prefilled by server data; assuming the data is sorted by server side code.
	export let data: Array<TimelineData>;
</script>

<div class="background-img">
	<div class="content">
		<div class="achievements">
			<h1 class="timeHeader">Achievements/Major Events</h1>
		</div>
		<Timeline {data} />
		<div>
			<TimelineContent {data} />
		</div>
	</div>
</div>

<style>
	.background-img {
		background: #600150;
		background-image: url('/img/timeline-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}

	.content {
		background: rgba(0, 0, 0, 0);
		backdrop-filter: blur(5px);
		padding-top: 1em;
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
</style>
