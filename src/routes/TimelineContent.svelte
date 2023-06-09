<script>
	export let data = [
		{
			date: 'placeholder1',
			title: 'placeholder2',
			photo: '',
			content: 'placeholder3'
		}
	];
</script>

<section class="timeline">
	{#each data as item, i}
		<div class="timeline-item" id="{i}_id">
			<div class="timeline-extra">
				<h2>{item.title}</h2>
				<h3>{item.date}</h3>
				<p>{item.content}</p>
			</div>
			<div class="timeline-img-container">
				<img class="timeline-img" src={item.photo} alt="some test about IRyS" />
			</div>
		</div>
	{/each}
</section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
	.timeline {
		margin: 1rem;
		padding: 0 20px 0 30px;
	}
	/* Line for the timeline      border-left: 2px solid #ccc;  */

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		background-color: rgba(255, 255, 255, 0.7);
		padding: 20px 25px;
		border-radius: 50px;
		position: relative;
		height: auto;
		margin-bottom: 100px;
		line-height: 1.5;
		justify-items: center;
	}

	.timeline-extra {
		margin: 10px;
		padding: 20px;
		color: #59084a;
	}

	.timeline-img {
		height: 150px;
		border-style: solid;
		border-width: 2px;
		border-color: grey;
		border-radius: 30px;
		max-width: 100%;
		object-fit: contain;
	}
	/* Dot beside the timeline 
.timeline-item::before{
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    border: 3px solid #ddd;
    position:absolute;
    left: -39px;
}*/

	h2 {
		margin: 10px;
		text-transform: uppercase;
		font-size: large;
	}
	h3 {
		margin: 10px;
		font-size: medium;
	}
	p {
		margin: 0;
		padding: 10px 0px;
		font-size: medium;
	}

	@media (min-width: 1024px) {
		.timeline {
			margin: 50px 10px 50px 100px;
			padding: 0 20px 0 30px;
		}

		.timeline-item {
			grid-template-columns: 3fr 2fr;
			margin-right: 5em;
		}

		.timeline-img-container {
			margin: auto 1rem;
		}
	}

	@media (min-width: 1400px) {
		.timeline {
			margin-left: 200px;
		}

		.timeline-img-container {
			margin: auto 2rem;
		}
	}

	/** TODO: considering adding dark mode and make timeline-item black  */
</style>
