import { setContext, getContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const CONTEXT_KEY = 'globalStore';

export interface GlobalStore {
	navLinksVisible: boolean;
	headerHeight: number;
}

export function createGlobalStore() {
	setContext(
		CONTEXT_KEY,
		writable({
			navLinksVisible: false,
			headerHeight: 0
		})
	);
}

export function getGlobalStore(): Writable<GlobalStore> {
	return getContext(CONTEXT_KEY);
}
