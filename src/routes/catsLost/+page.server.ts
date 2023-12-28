import { db } from '$lib/database';

export const load = async () => {
	const lostCats = await db.lostCat.findMany({
		include: { race: true, sex: true, color: true, location: true }
	});
	const racesNotMapped = await db.catRace.findMany({ where: { enabled: true } });
	const locationsNotMapped = await db.location.findMany({ where: { enabled: true } });
	const genders = await db.sex.findMany({ where: { enabled: true } });
	const colorsNotMapped = await db.color.findMany({ where: { enabled: true } });
	const cityiesNotMapped = await db.lostCat.findMany({
		select: { cityLost: true },
		distinct: ['cityLost']
	});
	const cities = cityiesNotMapped.map((city) => city.cityLost);
	cities.push('Nieuwe stad toevoegen');
	const colors = colorsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const locations = locationsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const races = racesNotMapped.map((item) => ({ value: item.id, label: item.name }));

	return {
		lostCats,
		races,
		genders,
		locations,
		colors
	};
};
