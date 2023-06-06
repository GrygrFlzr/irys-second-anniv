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
			<div class="timeline-image">
				<img class="timeline-img" src={item.photo} alt="some test about IRyS" />
			</div>
		</div>
	{/each}
</section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
	/* Line for the timeline      border-left: 2px solid #ccc;  */
	.timeline {
		margin: 50px 10px 50px 200px;
		padding: 0 20px 0 30px;
	}
	.timeline-item {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 20px 25px;
		border-radius: 50px;
		position: relative;
		height: auto;
		margin-bottom: 100px;
		margin-right: 5em;
	}
	.timeline-extra {
		flex: 2;
		margin: 10px;
		padding: 20px;
		color: #59084a;
	}
	.timeline-image {
		flex: 1;
	}
	.timeline-img {
		width: auto;
		height: 150px;
		margin: auto 50px;
		border-style: solid;
		border-width: 2px;
		border-color: grey;
		border-radius: 30px;
		float: right;
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
	div {
		display: inline-block;
	}
	div h2 {
		margin: 10px;
		text-transform: uppercase;
		font-family: Arial, Helvetica, sans-serif;
		font-size: large;
	}
	div h3 {
		margin: 10px;
		font-family: poppins;
		font-size: medium;
	}
	div p {
		margin: 0;
		font-family: poppins;
		padding: 10px 0px;
		font-size: medium;
	}

	@media (max-width: 768px) {
		@media (orientation: portrait) {
			.timeline-item {
				flex-direction: column;
			}
		}

		div h2 {
			font-size: xxx-large;
		}
		div h3 {
			font-size: xxx-large;
		}
		div p {
			font-size: xx-large;
		}
	}
</style>
