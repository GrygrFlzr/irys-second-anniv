<script>
	import ArtGallery from './ArtGallery.svelte';

	// Test data for art contributions
	const data = [
		{
			contributor: 'contributor_1',
			images: ['/img/art/art-1.png', '/img/art/art-2.png']
		},
		{
			contributor: 'contributor_2',
			images: ['/img/art/art-2.png']
		},
		{
			contributor: 'contributor_3',
			images: ['/img/art/art-3.png']
		},
		{
			contributor: 'contributor_4',
			images: ['/img/art/art-4.png']
		},
		{
			contributor: 'contributor_5',
			images: ['/img/art/art-5.png']
		},
		{
			contributor: 'contributor_6',
			images: ['/img/art/art-6.png']
		},
		{
			contributor: 'contributor_7',
			images: ['/img/art/art-7.png']
		},
		{
			contributor: 'contributor_8',
			images: ['/img/art/art-8.png']
		},
		{
			contributor: 'contributor_9',
			images: ['/img/art/art-9.png']
		}
	];
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
			<ArtGallery {data} />
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
