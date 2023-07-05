<script lang="ts">
	import ArtGalleryItem from './ArtGalleryItem.svelte';

	export let data: any[] = [];
</script>

<div class="content">
	<div class="items-container">
		{#each data as item, i}
			<ArtGalleryItem author={item.author} images={item.images} />
			{#if i != data.length - 1}
				<hr class="item-divider" />
			{/if}
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		justify-content: center;
	}

	.items-container {
		align-items: center;
		display: flex;
		flex-direction: column;
		padding: 24px calc(0.2 * (max(0px, 100vw - 768px)) + 12px); /*Min padding at 768px which increases with vw*/
		margin-bottom: 24px;
	}

	.item-divider {
		width: 100%;
		border: 0;
		height: 2px;
		background-image: linear-gradient(to right, transparent, rgb(109, 2, 54, 0.5), transparent);
		margin-top: 32px;
		margin-bottom: 32px;
	}
</style>
