<script>
	import '$lib/css/main.css';
	import Header from './Header.svelte';
</script>

<Header />

<main id="main">
	<slot />
</main>

<style>
	main {
		margin-top: var(--header-height);
	}

	@media (min-width: 768px) {
		main {
			padding: 0rem;
		}
	}
</style>
