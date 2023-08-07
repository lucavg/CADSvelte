import { writable } from 'svelte/store';

interface NavItem {
	name: string;
	link?: string;
	children?: NavItem[];
}

export const navItemsStore = writable<NavItem[]>([
	{ name: 'Home', link: '/' },
	{
		name: 'Katten',
		children: [
			{ name: 'Gevonden katten', link: '/catsFound' },
			{ name: 'Verloren katten', link: '/catsLost' }
		]
	},
	{
		name: 'Honden',
		children: [
			{ name: 'Gevonden honden', link: '/dogsFound' },
			{ name: 'Verloren honden', link: '/dogsLost' }
		]
	},
	{
		name: 'Allerlei',
		children: [
			{ name: 'Gevonden allerlei', link: '/randomFound' },
			{ name: 'Verloren allerlei', link: '/randomLost' }
		]
	},
	{ name: 'RIP', link: '/rip' },
	{
		name: 'Andere',
		children: [
			{ name: 'De visie van Mark Eyskens', link: '/mark' },
			{ name: 'Chips', link: '/chips' },
			{ name: 'Sterilisatie', link: '/sterilisatie' },
			{ name: 'Steun Ons', link: '/steunOns' },
			{ name: 'Tips', link: '/tips' },
			{ name: 'Toxoplasmose', link: '/toxoplasmose' },
			{ name: 'Veiligheid', link: '/veiligheid' },
			{ name: 'Zwerfkatten', link: '/zwerfkatten' }
		]
	},
	{ name: 'Contact', link: '/contact' },
	{ name: 'Vragen', link: '/vragen' }
]);
