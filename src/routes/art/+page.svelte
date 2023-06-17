<script>
	import ArtGallery from './ArtGallery.svelte';

    import { fade, fly } from "svelte/transition";

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
                <div class="header-title" in:fade="{{duration:headerAppearDuration}}">
                    <div in:fly="{{duration:headerAppearDuration, y:headerTransitionFadeOffset}}">
                        Anniversary Messages and Fanart
                    </div>
                </div>
                <div class="header-desc" in:fade="{{duration:headerAppearDuration}}">
                    <div in:fly="{{duration:headerAppearDuration, delay: descriptionDelayDuration, y:headerTransitionFadeOffset}}">
                        A collection of messages and art from IRyStocrats around the world, for IRyS' 2nd
                        Anniversary.
                    </div>
                </div>
            </div>

            <div class="gallery-container" in:fade="{{duration:contentsAppearDuration, delay:contentsDelayDuration}}">
                <div in:fly="{{duration:contentsAppearDuration, delay:contentsDelayDuration, y:contentsTransitionFadeOffset}}">
                    <ArtGallery {data} />
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
        background-color:rgb(24, 18, 23, 0.95);
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
