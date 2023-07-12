import {} from 'svelte';

export function useModalAction(ele: HTMLElement, show: boolean) {
	update(show);

	return {
		update,
		destroy() {
			removeEvent();
		}
	};

	function update(show: boolean) {
		if (show) {
			onOpen();
		} else {
			removeEvent();
		}
	}

	function handleClose() {}

	function handleCloseKeydown(e: KeyboardEvent) {}

	function removeEvent() {
		document.body.removeEventListener('click', handleClose);
		window.removeEventListener('keydown', handleCloseKeydown);
	}

	function onOpen() {
		document.body.addEventListener('click', handleClose, { once: true });
		window.addEventListener('keydown', handleCloseKeydown, { once: true });
	}

	function onClosed() {
		removeEvent();
	}
}
