import { db } from '$lib/database';

export const load = async () => {
	const lostCats = await db.lostCat.findMany({
		include: {
			race: true,
			sex: true,
			color: true,
			location: true,
			owner: { include: { city: true } },
			cityLost: true
		}
	});

	const racesNotMapped = await db.catRace.findMany({ where: { enabled: true } });
	const locationsNotMapped = await db.location.findMany({ where: { enabled: true } });
	const genders = await db.sex.findMany({ where: { enabled: true } });
	const colorsNotMapped = await db.color.findMany({ where: { enabled: true } });
	const citiesNotMapped = await db.city.findMany({ where: { enabled: true } });
	const cities = citiesNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const colors = colorsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const locations = locationsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const races = racesNotMapped.map((item) => ({ value: item.id, label: item.name }));

	return {
		lostCats,
		races,
		genders,
		locations,
		cities,
		colors
	};
};
