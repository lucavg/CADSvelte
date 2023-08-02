<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let scrolled = false;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	if (browser) {
		onMount(() => {
			const handleScroll = () => {
				scrolled = window.scrollY > 200;
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		});
	}
</script>

<a
	href={'#'}
	class="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white opacity-0 transition duration-500 ease-in-out transform translate-y-4 {scrolled
		? 'opacity-100 translate-y-0'
		: ''}"
	on:click|preventDefault={scrollToTop}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		class="h-6 w-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 10l7-7m0 0l7 7m-7-7v18"
		/>
	</svg>
</a>

<style>
	.opacity-0 {
		opacity: 0;
	}

	.opacity-100 {
		opacity: 1;
	}

	.translate-y-0 {
		transform: translateY(0);
	}

	.translate-y-4 {
		transform: translateY(1rem);
	}
</style>
