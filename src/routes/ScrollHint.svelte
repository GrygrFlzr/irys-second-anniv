<div class="scroll-hint">
	<div>Scroll To Begin</div>
	<svg fill="currentColor" viewBox="0 0 36 36" width="60" height="60">
		<path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z" />
	</svg>
</div>

<style>
	.scroll-hint {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		margin-top: 5rem;
		gap: 2rem;
	}

	.scroll-hint svg {
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-hint svg {
			animation: none;
		}
	}
</style>
