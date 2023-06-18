<!-- Adapted from https://payloadcms.com/docs/fields/rich-text#generating-html -->

<script lang="ts">
	import type { Element } from 'slate';
	import { Text } from 'slate';

	export let richTextElements: Array<Element>;

	type SSRText = Text & {
		bold: boolean;
		italic: boolean;
		underline: boolean;
		strikethrough: boolean;
	};

	type SSRElement = Element & {
		type: string;
		children: Array<SSRElement | SSRText>;
	};

	type SSRLinkElement = SSRElement & {
		linkType: string;
		url: string;
		newTab: boolean;
	};

	// Not 100% sure if this aggressive type checking is required.
	let slateElements = richTextElements.map((element: Element) => {
		if (Object.hasOwn(element, 'type')) {
			return element as SSRElement;
		} else if (Object.hasOwn(element, 'text')) {
			return element as unknown as SSRText;
		} else {
			throw new Error(`Unexpected element ${element}, does not conform to SSRText or SSRElement.`);
		}
	});

	function toSSRLinkElement(elem: SSRElement) {
		return elem as SSRLinkElement;
	}
</script>

{#each slateElements as elem}
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
			href={toSSRLinkElement(elem).url}
			target={toSSRLinkElement(elem).newTab ? '_blank' : '_self'}
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
