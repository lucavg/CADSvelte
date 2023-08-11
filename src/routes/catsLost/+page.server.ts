import { db } from '$lib/database';

export const load = async () => {
	const lostCats = await db.lostCat.findMany({
		include: { race: true, sex: true, color: true, location: true }
	});
	const races = await db.catRace.findMany({ where: { enabled: true } });
	const genders = await db.sex.findMany({ where: { enabled: true } });
	const colors = await db.color.findMany({ where: { enabled: true } });

	return {
		lostCats,
		races,
		genders,
		colors
	};
};
