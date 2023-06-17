<script>
	export let contributor = 'contributor';
	export let images = ['/img/art/art-1.png'];
</script>

<div class="content">
	<div>
		{#each images as image}
			<img class="item-img" src={image} alt="Art by {contributor}" />
		{/each}
	</div>
	<div class="item-contributor">
		{contributor}
	</div>
</div>

<style>
	.content {
		padding: 24px 0px;
	}

	.item-contributor {
		font-size: 20px;
		margin-top: 12px;
	}
</style>
