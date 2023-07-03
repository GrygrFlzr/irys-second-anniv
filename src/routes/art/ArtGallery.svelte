<script lang="ts">
	import ArtGalleryItem from './ArtGalleryItem.svelte';

	export let data: any[] = [];
</script>

<div class="content">
	<div class="items-container">
		{#each data as item}
			<ArtGalleryItem author={item.author} images={item.images} />
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
