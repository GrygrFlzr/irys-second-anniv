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
		padding: 24px 0px;
	}

	.item-author {
		color: #ddd;
		font-size: 20px;
		margin-top: 12px;
	}
</style>
