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

<div class="pswp-gallery" use:photoSwipeAction>
	{#each images as image}
		<a
			href={image.src}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<img class="thumbnail" src={image.smallSrc ?? image.src} alt={image.alt} />
		</a>
	{/each}
</div>

<style>
	.pswp-gallery {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr;
	}

	.thumbnail {
		width: 100%;
	}
</style>
