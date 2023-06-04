<script>
	import NavLink from './NavLink.svelte';

	let navLinksVisible = false;
</script>

<nav class="nav">
	<button class="nav-button" on:click={() => (navLinksVisible = !navLinksVisible)}>☰</button>

	<div class="nav-links" class:navLinkActive={navLinksVisible}>
		<NavLink href="/">Timeline</NavLink>
		<NavLink href="/art">Fan Art</NavLink>
		<NavLink href="/about">About Us</NavLink>
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
		display: flex;
		max-height: 0;
		overflow: hidden;
		flex-direction: column;
		transition: max-height 0.15s ease-out;

		/** arbitrary big number for transition */
		--max-height-for-transition: 500px;
	}

	.navLinkActive {
		max-height: var(--max-height-for-transition);
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
			max-height: var(--max-height-for-transition);
			flex-direction: row;
			padding: 0.25rem 0;
		}
	}
</style>
