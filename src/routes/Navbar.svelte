<script>
	let navLinksVisible = false;
</script>

<nav class="nav">
	<button class="nav-button" on:click={() => (navLinksVisible = !navLinksVisible)}>☰</button>

	<div class="nav-links" class:navLinkActive={navLinksVisible}>
		<a href="/" class="nav-link">Home</a>
		<a href="/achievements" class="nav-link">Achievements</a>
		<a href="/art" class="nav-link">Art Gallery</a>
		<a href="/songs" class="nav-link">Songs</a>
		<a href="/appreciation" class="nav-link">Appreciation</a>
		<a href="/about" class="nav-link">About Us</a>
	</div>
</nav>

<style>
	.nav {
		display: flex;
		flex-direction: column;
	}

	.nav-button {
		background: none;
		border: none;
		color: #fff;
		font-size: 1.7rem;
		padding: 0.625rem;
		cursor: pointer;
		width: fit-content;
	}

	.nav-links {
		display: none;
		flex-direction: column;
	}

	.navLinkActive {
		display: flex;
	}

	.nav-link {
		display: block;
		background: var(--dark-pink);
		border: none;
		color: #fff;
		font-size: 1.3rem;
		padding: 0.4rem;
		border-radius: 1rem;
		text-decoration: none;
		min-width: 10rem;
		width: fit-content;
		margin: 0.5rem;
	}

	.nav-link::before {
		content: '✦';
		margin-right: 0.4rem;
	}

	@media (min-width: 768px) {
		.nav {
			flex-direction: row;
			align-items: center;
		}

		.nav-button {
			display: none;
		}

		.nav-links {
			display: flex;
			flex-direction: row;
			padding: 0.25rem 0;
		}
	}
</style>
