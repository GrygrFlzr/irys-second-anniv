<script lang="ts">
	import { getGlobalStore } from '$lib/js/globalStore';
	import NavLink from './NavLink.svelte';

	let navLinksVisible = false;
	const globalStore = getGlobalStore();

	function close() {
		navLinksVisible = false;
		$globalStore.navLinksVisible = false;
	}

	function toggle() {
		navLinksVisible = !navLinksVisible;
		$globalStore.navLinksVisible = navLinksVisible;
	}
</script>

<nav class="nav">
	<button class="nav-button" on:click={toggle} title="menu">
		<svg viewBox="0 0 24 24" width="24" aria-hidden="true">
			{#each [4, 12, 20] as y}
				<rect x="0" {y} width="30" height="2" fill="currentColor" />
			{/each}
		</svg>
	</button>

	<div class="nav-links" class:navLinkActive={navLinksVisible}>
		<NavLink href="/" on:click={close}>Timeline</NavLink>
		<NavLink href="/art" on:click={close}>Fan Art</NavLink>
		<NavLink href="/about" on:click={close}>About</NavLink>
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
		padding: 0.625rem 1rem;
		cursor: pointer;
		width: fit-content;
	}

	.nav-links {
		display: flex;
		max-height: 0;
		overflow: hidden;
		flex-direction: column;

		/** arbitrary big number for transition */
		--max-height-for-transition: 500px;
	}

	.navLinkActive {
		transition: max-height 1s ease-out;
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
