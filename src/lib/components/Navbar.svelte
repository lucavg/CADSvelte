<script lang="ts">
	import { get } from 'svelte/store';
	import { navItemsStore } from '../../stores/navItemsStore';
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';

	let menuOpen = false;

	const toggleItem = (name: string) => {
		const navItems = get(navItemsStore);
		const item = navItems.find((item) => item.name === name);
		if (item) {
			item.isOpen = !item.isOpen;
		}
		navItemsStore.set(navItems);
	};

	const closeAll = () => {
		const navItems = get(navItemsStore);
		navItems.forEach((item) => {
			if (item.isOpen) {
				item.isOpen = false;
			}
		});
		navItemsStore.set(navItems);
		menuOpen = false;
	};
</script>

<div class="bg-nav text-white px-6 py-4">
	<div class="flex justify-between items-center">
		<img src="/cad02.gif" alt="Logo" class="mr-4" />
		<div class="text-lg">Coördinatie Antwerpse Dierenbescherming vzw</div>

		<div class="hidden md:flex space-x-4">
			{#each $navItemsStore as item}
				{#if item.children && item.children.length > 0}
					<Menu>
						<span slot="toggle" class="cursor-pointer text-white hover:text-gray-300"
							>{item.name}</span
						>
						{#each item.children as child}
							<MenuItem>
								<a href={child.link} class="block text-white hover:text-gray-300">{child.name}</a>
							</MenuItem>
						{/each}
					</Menu>
				{:else}
					<a href={item.link} class="text-white hover:text-gray-300">{item.name}</a>
				{/if}
			{/each}
		</div>

		<button class="md:hidden" on:click={() => (menuOpen = !menuOpen)}>
			{#if menuOpen}
				<svg
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					class="w-6 h-6"
				>
					<path d="M6 18L18 6M6 6l12 12" />
				</svg>
			{/if}
			{#if !menuOpen}
				<svg
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					class="w-6 h-6"
				>
					<path d="M4 6h16M4 12h16m-7 6h7" />
				</svg>
			{/if}
		</button>
	</div>

	{#if menuOpen}
		<div class="md:hidden mt-4 space-y-2">
			{#each $navItemsStore as item}
				{#if item.children && item.children.length > 0}
					<div>
						<button
							class="cursor-pointer text-white hover:text-gray-300"
							on:click={() => toggleItem(item.name)}>{item.name}</button
						>
						{#if item.isOpen}
							{#each item.children as child}
								<MenuItem>
									<a
										on:click={closeAll}
										href={child.link}
										class="block text-white hover:text-gray-300">{child.name}</a
									>
								</MenuItem>
							{/each}
						{/if}
					</div>
				{:else}
					<a href={item.link} on:click={closeAll} class="block text-white hover:text-gray-300"
						>{item.name}</a
					>
				{/if}
			{/each}
		</div>
	{/if}
</div>
