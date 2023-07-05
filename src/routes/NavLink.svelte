<script>
	/**@type {string}*/
	export let href;
</script>

<a class="nav-link" {href} on:click>
	<span class="nav-link-text">
		<slot />
	</span>
	<svg class="nav-link-decoration" viewBox="0 0 60 60" aria-hidden>
		<polygon fill="currentColor" points="0,60 22,60 62,0 40,0" />
	</svg>
</a>

<style>
	.nav-link {
		display: flex;
		background: var(--dark-pink);
		border: none;
		color: #fff;
		font-size: 1.3rem;
		padding: 0.4rem;
		border-radius: 1rem / 0.5rem;
		text-decoration: none;
		width: 90%;
		margin: 0 auto 0.75rem;
		transition: all 0.2s ease-in;
		overflow: hidden;
		align-items: center;
		justify-content: space-between;
		font-weight: bold;
	}

	.nav-link-text::before {
		content: '✦';
		margin-right: 0.4rem;
	}

	.nav-link:hover,
	.nav-link:focus {
		background-color: #fff;
		color: var(--dark-pink);
	}

	.nav-link-decoration {
		height: 2.5rem;
		margin: -0.3em 0;
	}

	@media (min-width: 768px) {
		.nav-link {
			min-width: 11rem;
			width: fit-content;
			margin: 0.5rem;
		}

		.nav-link-decoration {
			display: none;
		}
	}
</style>
