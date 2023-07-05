<script lang="ts">
	import type { Image } from '$lib/types/Types';
	import SimpleImageGallery from '$lib/components/SimpleImageGallery.svelte';

	export let author = 'author';
	export let images: Image[];
</script>

<div class="content">
	<div class="item-gallery">
		<SimpleImageGallery {images} />
	</div>
	<div class="item-author">
		<span class="item-author-by">by: </span>
		{author ? author : 'Anonymous'}
	</div>
</div>

<style>
	.content {
		width: 100%;
	}

	.item-author {
		color: rgb(221, 221, 221, 1);
		font-size: 20px;
		margin-top: 8px;
		margin-bottom: 4px;
		text-shadow: 2px 2px 0.25rem rgb(0, 0, 0, 0.5);
		text-align: right;
	}

	.item-author-by {
		color: rgb(221, 221, 221, 0.4);
	}

	.item-gallery {
		filter: drop-shadow(5px 5px 0.35rem rgb(0, 0, 0, 0.5));
	}
</style>
