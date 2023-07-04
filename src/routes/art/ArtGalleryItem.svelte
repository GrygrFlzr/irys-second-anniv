<script lang="ts">
	import type { Image } from '$lib/types/Types';
	import SimpleImageGallery from '$lib/components/SimpleImageGallery.svelte';

	export let author = 'author';
	export let images : Image[];
</script>

<div class="content">
	<div>
		<SimpleImageGallery images={images} />
	</div>
	<div class="item-author">
		{author}
	</div>
</div>

<style>
	.content {
		display: block;
		padding: 24px calc(0.2*(max(0px, 100vw - 768px)) + 12px); /*Min padding at 768px which increases with vw*/
	}

	.item-author {
		color: #ddd;
		font-size: 20px;
		margin-top: 8px;
		margin-bottom: 12px;
	}
</style>
