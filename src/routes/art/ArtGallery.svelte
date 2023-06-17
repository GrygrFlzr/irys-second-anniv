<script>
	import ArtGalleryItem from './ArtGalleryItem.svelte';
</script>

<div class="content">
	<div class="items-container">
		<ArtGalleryItem />
		<ArtGalleryItem />
		<ArtGalleryItem />
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
	}
</style>
