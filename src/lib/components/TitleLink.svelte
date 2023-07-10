<script lang="ts">
	import LinkIcon from './LinkIcon.svelte';

	export let href: string;
</script>

<a {href} class="title-link">
	<span class="icon">
		<LinkIcon />
	</span>
	<slot />
</a>

<style>
	.title-link {
		color: #ddd;
		position: relative;
		text-decoration: none;
	}

	.icon {
		opacity: 0;
		position: absolute;
		left: -1.5rem;
		top: 2rem;
		transition: opacity ease-in-out 200ms;
	}

	.title-link:hover {
		text-decoration-line: underline;
	}

	.title-link:hover .icon {
		opacity: 1;
	}
</style>
