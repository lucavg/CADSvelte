<script lang="ts">
	import { navItemsStore } from '../../stores/navItemsStore';
</script>

<div class="navbar bg-primary">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost flex lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="#fff"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</button>
			<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-80">
				{#each $navItemsStore as item}
					{#if item.children && item.children.length > 0}
						<li>
							<details>
								<summary class="text-neutral text-xl">{item.name}</summary>
								<ul class="p-2 text-neutral">
									{#each item.children as child}
										<li><a href={child.link} class="text-xl">{child.name}</a></li>
									{/each}
								</ul>
							</details>
						</li>
					{:else}
						<li><a href={item.link} class="text-neutral text-xl">{item.name}</a></li>
					{/if}
				{/each}
			</ul>
		</div>
		<a href="." class="flex flex-row items-center">
			<img alt="logo" src="/cad02.webp" />
			<p class="no-animation text-neutral text-xl">Coördinatie Antwerpse Dierenbescherming vzw</p>
		</a>
	</div>
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each $navItemsStore as item}
				{#if item.children && item.children.length > 0}
					<li>
						<details>
							<summary class="text-neutral text-xl">{item.name}</summary>
							<ul class="p-2 bg-primary text-neutral text-xl">
								{#each item.children as child}
									<li><a href={child.link} class="text-xl">{child.name}</a></li>
								{/each}
							</ul>
						</details>
					</li>
				{:else}
					<li><a href={item.link} class="text-neutral text-xl">{item.name}</a></li>
				{/if}
			{/each}
		</ul>
	</div>
</div>
