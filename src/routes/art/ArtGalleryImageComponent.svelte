<!-- Adapted from: https://photoswipe.com/svelte-image-gallery/ -->
<script lang="ts">
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';

	import type { Image } from '$lib/types/Types';

	export let images: Array<Image>;

	function photoSwipeAction(ele: HTMLElement) {
		const lightbox = new PhotoSwipeLightbox({
			gallery: ele,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();

		return {
			destroy() {
				lightbox.destroy();
			}
		};
	}
</script>

<div
	class="pswp-gallery"
	class:single-image-gallery={images.length === 1}
	class:double-image-gallery={images.length === 2}
	class:grid-image-gallery={images.length >= 3}
	use:photoSwipeAction
>
	{#each images as image}
		<a
			href={image.src}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<img class="thumbnail" src={image.src} alt={image.alt} loading="lazy" />
		</a>
	{/each}
</div>

<style>
	.pswp-gallery {
		display: grid;
		gap: 0.75rem;
		width: 100%;
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
		display: block;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		max-height: 800px;
	}

	@media (min-width: 768px) {
		.double-image-gallery {
			grid-template-columns: 1fr 1fr;
		}

		.grid-image-gallery {
			grid-template-columns: 1fr 1fr;
		}

		.double-image-gallery .thumbnail {
			display: inline;
		}

		.grid-image-gallery .thumbnail {
			display: inline;
		}
	}

	@media (min-width: 1400px) {
		.grid-image-gallery {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
