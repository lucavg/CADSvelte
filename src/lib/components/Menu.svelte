<div>
	<button class="focus:outline-none">
		<slot name="toggle" />
	</button>
	<menu class="mt-2 space-y-2 bg-primary">
		<slot />
	</menu>
</div>

<style>
	div {
		position: relative;
	}

	button {
		cursor: pointer;
	}

	menu {
		position: absolute;
		display: none;
		padding: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	div:hover > menu,
	div:focus-within > menu {
		display: block;
	}
</style>
