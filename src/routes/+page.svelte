<script>
	import TimelineContent from './TimelineContent.svelte';
	import Timeline from './Timeline.svelte';
	// Can probably have a different file hold the data / Use the database
	// *IMPORTANT* DATA IS REQUIRED TO BE SORTED BY YEAR/DATE ACCORDINGLY (OTHERWISE IT WIRED AND STUFF)
	export let data;

	let processedData = data.data.sort((a, b) => {
		return a.date.valueOf() - b.date.valueOf();
	});
</script>


<div class="background-img">
	<div class="content">
		<div class="achievements blur">
			<h1 class="timeHeader">Oh you found me! Stream Idol</h1>
		</div>
		<Timeline data={processedData} />
		<div class="blur">
			<TimelineContent data={processedData} />
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
		padding-top: 1em;
	}
	.blur{
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
	@media (max-width: 769px){
		.timeHeader{
			font-size: small;
			padding: 0px;
		}
		.achievements{
			padding: 0px;
			margin: 0px;
		}
	}
</style>
