<!-- Adapted from: https://photoswipe.com/svelte-image-gallery/ -->
<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';

	import type { Image } from '$lib/types/Types';

	export let galleryID: string;
	export let images: Array<Image>;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div
	class="pswp-gallery"
	class:single-image-gallery={images.length === 1}
	class:double-image-gallery={images.length === 2}
	class:grid-image-gallery={images.length >= 3}
	id={galleryID}
>
	{#each images as image}
		<a
			href={image.src}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<img class="thumbnail" src={image.src} alt={image.alt} />
		</a>
	{/each}
</div>

<style>
	.pswp-gallery {
		display: grid;
		gap: 0.75rem;
	}

	.single-image-gallery {
		grid-template-columns: 1fr;
	}

	.double-image-gallery {
		grid-template-columns: 1fr;
	}

	.grid-image-gallery {
		grid-template-columns: 1fr;
	}

	.thumbnail {
		width: 100%;
	}

	@media (min-width: 768px) {
		.double-image-gallery {
			grid-template-columns: 1fr 1fr;
		}

		.grid-image-gallery {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1400px) {
		.grid-image-gallery {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
