import type { ActionReturn } from 'svelte/action';

interface ModalActionOptions {
	show: boolean;
}

export function modalAction(
	ele: HTMLElement,
	options: ModalActionOptions
): ActionReturn<
	ModalActionOptions,
	{
		'on:close-modal'?: () => void;
	}
> {
	let lastActiveElement: HTMLElement | null = null;
	ele.tabIndex = -1;
	update(options);

	return {
		update,
		destroy() {
			removeEvent();
		}
	};

	function update({ show }: ModalActionOptions) {
		if (show) {
			handleOpen();
		} else {
			close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
		}

		if (e.key === 'Tab') {
			focusTrap(e, ele);
		}
	}

	function removeEvent() {
		document.body.removeEventListener('click', clickOutside);
		window.removeEventListener('keydown', handleKeydown);
	}

	function handleOpen() {
		document.body.addEventListener('click', clickOutside);
		window.addEventListener('keydown', handleKeydown);
		document.body.style.overflow = 'hidden';

		if (document.activeElement instanceof HTMLElement) {
			lastActiveElement = document.activeElement;
		}
		ele.focus();
	}

	function clickOutside(e: MouseEvent) {
		if (!ele.contains(e.target as Node)) {
			close();
		}
	}

	function handleClose() {
		document.body.style.overflow = 'auto';
		removeEvent();

		if (ele.contains(document.activeElement)) {
			lastActiveElement?.focus();
		}
		lastActiveElement = null;
	}

	function close() {
		handleClose();
		ele.dispatchEvent(new CustomEvent('close-modal'));
	}
}

function focusTrap(e: KeyboardEvent, element: Element) {
	const { shiftKey } = e;
	const focusable = Array.from(getAllFocusable(element));

	const [first] = focusable;
	const last = focusable[focusable.length - 1];
	const lastOfTabOrder = shiftKey ? first : last;

	if (e.target !== lastOfTabOrder) {
		return;
	}

	e.preventDefault();
	const shouldFocus = shiftKey ? last : first;
	(shouldFocus ?? element).focus();
}

function getAllFocusable(parent: Element): NodeListOf<HTMLElement> {
	const selector = `a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']):not([disabled]), *[contenteditable=true]`;

	return parent.querySelectorAll(selector);
}
