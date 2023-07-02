<script>
	import ArtGalleryItem from './ArtGalleryItem.svelte';

	export let data = [
		{
			contributor: 'contributor_0',
			images: ['/img/art/art-1.png']
		}
	];
</script>

<div class="content">
	<div class="items-container">
		{#each data as item}
			<ArtGalleryItem {...item} />
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		justify-content: center;
	}

	.items-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
