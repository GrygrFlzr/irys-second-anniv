<script>
	import '$lib/css/main.css';
	import { createGlobalStore } from '$lib/js/globalStore';
	import Header from './Header.svelte';

	createGlobalStore();
</script>

<Header />

<main id="main">
	<slot />
</main>

<style>
	main {
		margin-top: var(--header-offset);
	}

	@media (min-width: 768px) {
		main {
			padding: 0rem;
		}
	}
</style>
