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

			Also do not add a line break between {elem.text} and </span> because
			it adds random whitespace to the generated output.
        -->
		<span
			class="text"
			class:bold={elem.bold}
			class:italic={elem.italic}
			class:underline={elem.underline}
			class:strikethrough={elem.strikethrough}>{elem.text}</span
		>
	{:else if elem.type === 'link'}
		<!--
			Similarly, don't add a line break between the text element and the
			</a> as it adds a random whitespace.
		-->
		<a
			href={toRichtextLinkElement(elem).url}
			target={toRichtextLinkElement(elem).newTab ? '_blank' : '_self'}
			class="richTextLink"
		>
			<svelte:self richTextElements={elem.children} /></a
		>
	{:else if elem.type === 'ul'}
		<ul>
			<svelte:self richTextElements={elem.children} />
		</ul>
	{:else if elem.type === 'ol'}
		<ol>
			<svelte:self richTextElements={elem.children} />
		</ol>
	{:else if elem.type === 'li'}
		<li>
			<svelte:self richTextElements={elem.children} />
		</li>
	{:else if elem.type === 'indent'}
		<div class="indent">
			<svelte:self richTextElements={elem.children} />
		</div>
	{:else if elem.type === 'blockquote'}
		<blockquote>
			<svelte:self richTextElements={elem.children} />
		</blockquote>
	{:else}
		<p>
			<svelte:self richTextElements={elem.children} />
		</p>
	{/if}
{/each}

<style>
	a {
		font-weight: bold;
		outline: none;
		text-decoration: underline 0.15em rgba(0, 0, 0, 0);
		transition: text-decoration-color 300ms;
	}

	/* Always show links in non-hover devices */
	@media (hover: none) {
		a:link {
			text-decoration-color: rgb(255, 182, 209);
		}
	}

	a:link {
		color: rgb(255, 182, 209);
	}
	a:visited {
		color: #e60073;
	}
	a:focus {
		text-decoration-color: rgb(255, 182, 209);
	}
	a:hover {
		text-decoration-color: rgb(255, 182, 209);
	}
	a:active {
		text-decoration: none;
	}

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

	.text {
		white-space: pre-line;
	}
</style>
