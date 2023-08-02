import BackToTop from '$lib/components/BackToTop.svelte';

// Back to Top button
if ('IntersectionObserver' in window) {
	new BackToTop({
		target: document.querySelector('#backtotop'),
		props: {
			track: document.querySelector('#search')
		}
	});
}
