<script>
	import '$lib/css/main.css';

	let navLinksVisible = false;
</script>

<header class="header">
	<a class="skip-to-main-button" href="#main"> Skip to main content </a>
	<div class="logo">
		<img class="logo-img" src="/logo-solid.png" alt="logo of IRyS' second anniversary project" />
	</div>

	<h1 class="h1">
		<div class="title">THE PANDORA LOGS OF HOPE</div>
	</h1>

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
</header>

<main id="main">
	<slot />
</main>

<style>
	.logo {
		height: 2.5rem;
		padding: 0.625rem;
		text-align: center;
	}

	.logo-img {
		height: 100%;
	}

	.header {
		background-color: var(--dark-red);
		color: #fff;
	}

	.h1 {
		margin: 0;
		background: var(--light-red);
		text-align: center;
		padding: 0 0.75rem;
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		--white-border: 4px solid #fff;
	}

	.nav {
		display: flex;
		flex-direction: column;
		/*height: 3.75rem;*/
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
		background: var(--light-red);
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
	}

	.skip-to-main-button {
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		padding: 0;
		clip: rect(0, 0, 0, 0);
		transition: all 0.15s ease;
	}

	.skip-to-main-button:focus {
		clip: auto;
		display: flex;
		align-items: center;
		background-color: var(--r-primary);
		color: #fff;
		padding: 1em;
	}

	.h1::before,
	.h1::after {
		content: '';
		border: var(--white-border);
		border-width: 2px;
	}

	.h1::before {
		margin-top: -4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.skip-to-main-button {
			transition: none;
		}
	}

	@media (min-width: 768px) {
		.h1 {
			padding: 0 3%;
			display: flex;
			justify-content: space-between;
			font-size: 2rem;
			gap: 1.5%;
			flex-direction: row;
		}

		.h1::before,
		.h1::after {
			position: initial;
			width: auto;
			flex-grow: 1;
			border-width: 4px;
		}

		.h1::before {
			border-right: 0;
		}

		.h1::after {
			border-left: 0;
		}

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
		}
	}
</style>
