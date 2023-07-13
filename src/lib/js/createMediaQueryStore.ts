import { browser } from '$app/environment';
import { onDestroy } from 'svelte';
import { writable, readable, type Readable } from 'svelte/store';

export function createMediaQueryStore(query: string): Readable<boolean> {
	if (!browser) {
		return readable<boolean>(false);
	}

	const mediaQuery = window.matchMedia(query);
	const store = writable<boolean>(mediaQuery.matches);

	mediaQuery.addEventListener('change', onChange);

	onDestroy(() => {
		mediaQuery.removeEventListener('change', onChange);
	});

	return {
		subscribe: store.subscribe
	};

	function onChange(e: MediaQueryListEvent): void {
		store.set(e.matches);
	}
}

export function createReducedMotionStore(): Readable<boolean> {
	return createMediaQueryStore('(prefers-reduced-motion: reduce)');
}
