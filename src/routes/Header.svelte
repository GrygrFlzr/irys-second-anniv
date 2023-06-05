<script>
	import '$lib/css/main.css';
	import Navbar from './Navbar.svelte';
</script>

<header class="header">
	<a class="skip-to-main-button" href="#main"> Skip to main content </a>
	<div class="logo">
		<img class="logo-img" src="/logo-solid.png" alt="logo of IRyS' second anniversary project" />
	</div>

	<h1 class="h1">
		<div class="title">THE PANDORA LOGS OF HOPE</div>
	</h1>

	<Navbar />
</header>

<style>
	.logo {
		height: 2rem;
		padding: 0.625rem;
		text-align: center;
	}

	.logo-img {
		height: 100%;
	}

	.header {
		background-color: var(--very-dark-pink);
		color: #fff;
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 500;
	}

	.h1 {
		margin: 0;
		background: var(--dark-pink);
		text-align: center;
		padding: 0 0.75rem;
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		--white-border: 4px solid #fff;
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
		background-color: var(--dark-pink);
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

	@media (min-width: 576px) {
		.logo {
			height: 2.5rem;
		}
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
	}
</style>
