<script lang="ts">
	import type { Image } from '$lib/types/Types';
	import ArtGalleryImageComponent from './ArtGalleryImageComponent.svelte';

	export let itemNumber = 0;
	export let author = 'author';
	export let images: Image[];
</script>

<div class="content">
	<div class="item-labels">
		<span class="item-number">#{itemNumber} |</span>
		<span class="item-author">{author ? author : 'Anonymous'}</span>
	</div>
	<div class="item-gallery">
		<ArtGalleryImageComponent {images} />
	</div>
</div>

<style>
	.content {
		width: 100%;
	}

	.item-labels {
		font-size: 20px;
		margin-bottom: 18px;
		text-shadow: 2px 2px 0.25rem rgb(0, 0, 0, 0.5);
		text-align: left;
	}

	.item-number {
		color: rgb(221, 221, 221, 0.4);
	}

	.item-author {
		color: rgb(221, 221, 221, 1);
	}

	.item-gallery {
		filter: drop-shadow(5px 5px 0.35rem rgb(0, 0, 0, 0.5));
	}
</style>
