<script>
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
			<div class="about-container">
				<div class="about-item">
					<img
						class="about-image"
						src="/img/about/about-img-server.png"
						alt="GuyRyS doing half a heart on the right"
					/>
					<div class="about-body">
						<div class="about-body-header">About Us</div>
						<div class="about-body-desc">
							This fan project is brought to you by the IRyStocrats in IRyS' Stage (IRyS' fan
							discord) and HoloEN Fans.
						</div>
					</div>
				</div>

				<div class="about-item">
					<img
						class="about-image"
						src="/img/about/about-img-irys.png"
						alt="IRyS doing a thumbs up on the left"
					/>
					<div class="about-body">
						<div class="about-body-header">About IRyS</div>
						<div class="about-body-desc">
							IRyS is the Diva of hololive English's Project:HOPE.<br />
							Check out her channel here!
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.background-image {
		background-attachment: fixed;
		background-image: url('/img/about/about-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		height: 100%;
	}

	.background-overlay {
		background-color: rgb(24, 18, 23, 0.4);
		background-size: cover;
		backdrop-filter: blur(5px);
	}

	.content {
		padding-top: 48px;
	}

	.about-container {
		display: grid;
		grid-template-columns: 1fr;
	}

	.about-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0px calc(0.2 * (max(0px, 100vw - 400px)) + 4px); /*Min padding at 768px which increases with vw*/
		margin-bottom: 84px;
	}

	.about-image {
		max-width: 500px;
		width: 100%;
		filter: drop-shadow(8px 8px 0.35rem rgb(0, 0, 0, 0.5));
	}

	.about-body {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin-top: 32px;
	}

	.about-body-header {
		color: white;
		font-size: 40px;
		text-align: center;
		text-shadow: 2px 4px 0.4rem rgb(0, 0, 0, 0.8);
	}

	.about-body-desc {
		color: white;
		font-size: 24px;
		margin-top: 24px;
		text-align: center;
		text-shadow: 2px 2px 0.25rem rgb(0, 0, 0, 0.5);
	}

	@media (min-width: 768px) {
		.about-container {
			grid-template-columns: 1fr 1fr;
		}

		.about-item {
			padding: 24px 48px;
		}

		.about-body-desc {
			padding-left: 32px;
			padding-right: 32px;
		}
	}
</style>
