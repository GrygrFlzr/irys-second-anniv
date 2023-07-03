<script lang="ts">
	import '$lib/css/main.css';
	import Navbar from './Navbar.svelte';
	import { createMediaQueryStore, createReducedMotionStore } from '$lib/js/createMediaQueryStore';
	import { tick } from 'svelte';

	let scrollY = 0;
	let unfold = false;
	let header: HTMLElement;
	let prefersReducedMotion = createReducedMotionStore();
	let matchesPC = createMediaQueryStore('(min-width: 768px)');

	$: unfold = scrollY <= 120;
	// if there's transition update to a proximate value of the header height
	// and calculate the actual height after the transition
	$: if (header) {
		if ($matchesPC && !$prefersReducedMotion) {
			updateHeaderHeight((unfold ? 8.5 : 5) * 16);
		} else {
			tick().then(calculateAndUpdateHeaderHeight);
		}
	}

	function calculateAndUpdateHeaderHeight() {
		updateHeaderHeight(header.clientHeight);
	}

	function updateHeaderHeight(height: number) {
		globalThis.document?.documentElement.style.setProperty('--header-height', `${height}px`);
	}
</script>

<header class="header" bind:this={header}>
	<a class="skip-to-main-button" href="#main"> Skip to main content </a>
	<div
		class="scroll-fold"
		class:scroll-unfold={unfold}
		on:transitionend={calculateAndUpdateHeaderHeight}
	>
		<div class="logo">
			<img
				class="logo-img"
				src="/img/logo-solid.png"
				alt="logo of IRyS' second anniversary project"
			/>
		</div>

		<h1 class="h1">
			<div class="title">THE PANDORA LOGS OF HOPE</div>
		</h1>
	</div>

	<Navbar />
</header>

<svelte:window bind:scrollY />

<style>
	.logo {
		padding: 0.625rem;
		text-align: center;
	}

	.scroll-fold {
		max-height: 0;
		padding: 0;
		overflow: hidden;
	}

	.logo-img {
		height: 2rem;
	}

	.header {
		background-color: var(--very-dark-pink);
		color: #fff;
		/** don't use sticky here. The scroll-fold transition will cause it to sometimes fold and unfold repeatably */
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 500;
	}

	.h1 {
		margin: 0;
		background: var(--dark-pink);
		text-align: center;
		padding: 0 0.75rem;
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		--white-border: 4px solid #fff;
		font-weight: 700;
	}

	.skip-to-main-button {
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		padding: 0;
		clip: rect(0, 0, 0, 0);
		transition: all 0.15s ease;
	}

	.skip-to-main-button:focus {
		clip: auto;
		display: flex;
		align-items: center;
		background-color: var(--dark-pink);
		color: #fff;
		padding: 1em;
	}

	@media (min-width: 768px) {
		.scroll-fold {
			transition: max-height 0.15s;
		}

		.scroll-unfold {
			max-height: 10rem;
		}

		.logo-img {
			height: 2.5rem;
		}

		.h1 {
			padding: 0 3%;
			display: flex;
			justify-content: space-between;
			font-size: 2rem;
			gap: 1.5%;
			flex-direction: row;
		}

		.h1::before,
		.h1::after {
			content: '';
			border: var(--white-border);
			margin-top: -4px;
			position: initial;
			width: auto;
			flex-grow: 1;
			border-width: 4px;
		}

		.h1::before {
			border-right: 0;
		}

		.h1::after {
			border-left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skip-to-main-button {
			transition: none;
		}

		.scroll-fold {
			transition: none;
		}
	}
</style>
