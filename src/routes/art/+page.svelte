<script lang="ts">
	import ArtGallery from './ArtGallery.svelte';
	import type { PageData } from './$types';

	// Prefilled by server data; assuming the data is sorted by server side code.
	// Data from the server is autofilled into this variable.
	// Access the actual data with the "data" member.
	export let data: PageData;

	import { fade, fly } from 'svelte/transition';

	const headerAppearDuration = 500;
	const contentsAppearDuration = 400;

	const descriptionDelayDuration = 400;
	const contentsDelayDuration = 700;

	const headerTransitionFadeOffset = 24;
	const contentsTransitionFadeOffset = 24;
</script>

<div class="background-image">
	<div class="background-overlay">
		<div class="content">
			<div class="header-group">
				<div class="header-title" in:fade={{ duration: headerAppearDuration }}>
					<div in:fly={{ duration: headerAppearDuration, y: headerTransitionFadeOffset }}>
						Anniversary Messages and Fanart
					</div>
				</div>
				<div class="header-desc" in:fade={{ duration: headerAppearDuration }}>
					<div
						in:fly={{
							duration: headerAppearDuration,
							delay: descriptionDelayDuration,
							y: headerTransitionFadeOffset
						}}
					>
						A collection of messages and art from IRyStocrats around the world, for IRyS' 2nd
						AnniversaRyS.
					</div>
				</div>
			</div>

			<div
				class="gallery-container"
				in:fade={{ duration: contentsAppearDuration, delay: contentsDelayDuration }}
			>
				<div
					in:fly={{
						duration: contentsAppearDuration,
						delay: contentsDelayDuration,
						y: contentsTransitionFadeOffset
					}}
				>
					<ArtGallery data={data.data} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.background-image {
		background-attachment: fixed;
		background-image: url('/img/art/art-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.background-overlay {
		background-color: rgb(24, 18, 23, 0.95);
		background-size: cover;
		backdrop-filter: blur(5px);
	}

	.content {
		padding-top: 48px;
	}

	.header-group {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: auto;
		text-shadow: 2px 2px 0.25rem rgb(0, 0, 0, 0.5);
		width: 50em;
	}

	@media (max-width: calc(max(50em, 768px))) {
		.header-group {
			width: 90%;
		}
	}

	.header-title {
		color: #ffffff;
		font-size: 40px;
		text-align: center;
	}

	.header-desc {
		color: #ddd;
		font-size: 24px;
		margin-top: 24px;
		text-align: center;
	}

	.gallery-container {
		margin-top: 48px;
	}
</style>
