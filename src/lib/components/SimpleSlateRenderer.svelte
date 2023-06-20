<!-- Adapted from https://payloadcms.com/docs/fields/rich-text#generating-html -->

<script lang="ts">
	import type { RichtextElement, RichtextLinkElement, RichtextTextElement } from '$lib/types/Types';
	import { Text } from 'slate';

	export let richTextElements: Array<RichtextElement | RichtextTextElement>;

	function toRichtextLinkElement(elem: RichtextElement) {
		return elem as RichtextLinkElement;
	}
</script>

{#each richTextElements as elem}
	{#if Text.isText(elem)}
		<!-- 
            Ideally we'd use sematic html elements here but since multiple styles
            can be applied at once the nesting would look a bit ridiculous so 
            only spans.
        -->
		<span
			class:bold={elem.bold}
			class:italic={elem.italic}
			class:underline={elem.underline}
			class:strikethrough={elem.strikethrough}
		>
			{elem.text}
		</span>
	{:else if elem.type === 'link'}
		<a
			href={toRichtextLinkElement(elem).url}
			target={toRichtextLinkElement(elem).newTab ? '_blank' : '_self'}
		>
			<svelte:self slateElements={elem.children} />
		</a>
	{:else if elem.type === 'ul'}
		<ul>
			<svelte:self slateElements={elem.children} />
		</ul>
	{:else if elem.type === 'ol'}
		<ol>
			<svelte:self slateElements={elem.children} />
		</ol>
	{:else if elem.type === 'li'}
		<li>
			<svelte:self slateElements={elem.children} />
		</li>
	{:else if elem.type === 'indent'}
		<div class="indent">
			<svelte:self slateElements={elem.children} />
		</div>
	{:else if elem.type === 'blockquote'}
		<blockquote>
			<svelte:self slateElements={elem.children} />
		</blockquote>
	{:else}
		<p>
			<svelte:self slateElements={elem.children} />
		</p>
	{/if}
{/each}

<style>
	.bold {
		font-weight: bold;
	}

	.italic {
		font-style: italic;
	}

	.underline.strikethrough {
		text-decoration: line-through underline;
	}

	.underline {
		text-decoration: underline;
	}

	.strikethrough {
		text-decoration: line-through;
	}

	.indent {
		margin-left: 2rem;
	}

	blockquote {
		border-left: 0.2rem solid gray;
		padding-left: 0.4rem;
	}
</style>
