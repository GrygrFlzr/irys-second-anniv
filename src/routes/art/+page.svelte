<script>
	import ArtGallery from './ArtGallery.svelte';
</script>

<div class="background">
	<div class="content">
		<div class="header-group">
			<div class="header-title">Anniversary Messages and Fanart</div>
			<div class="header-desc">
				A collection of messages and art from IRyStocrats around the world, for IRyS' 2nd
				Anniversary.
			</div>
		</div>

		<div class="gallery-container">
			<ArtGallery />
		</div>
	</div>
</div>

<style>
	.background {
		color: black;
	}

	.content {
		padding-top: 48px;
	}

	.header-group {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: auto;
		width: 50em;
	}

	.header-title {
		color: #ffffff;
		font-size: 40px;
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
