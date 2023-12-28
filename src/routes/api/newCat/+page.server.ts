import { db } from '$lib/database';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { LostCatSchema } from '../../../zod-schemas';

export const load = async ({ locals: { user } }) => {
	if (!user) {
		throw redirect(302, '/');
	}

	const form = await superValidate(LostCatSchema);
	form.data.rip = false;

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
		races,
		locations,
		genders,
		colors,
		cities,
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();

		const form = await superValidate(body, LostCatSchema);
		console.log(form);

		if (!form.valid) {
			form.message = 1;
			return fail(400, { form });
		}

		const newLostCat = await db.lostCat.create({
			data: {
				name: form.data.name,
				raceId: form.data.raceId,
				sexId: form.data.sexId,
				castrated: form.data.castrated,
				colorId: form.data.colorId,
				age: form.data.age,
				dateLost: form.data.dateLost,
				cityLost: form.data.cityLost,
				description: form.data.description,
				photoUrl: form.data.photoUrl,
				chipped: form.data.chipped,
				chipNumber: form.data.chipNumber,
				collar: form.data.collar,
				ownerName: form.data.ownerName,
				ownerEmail: form.data.ownerEmail,
				ownerStreet: form.data.ownerStreet,
				ownerCity: form.data.ownerCity,
				ownerPhone: form.data.ownerPhone,
				ownerCellphone: form.data.ownerCellphone,
				comments: form.data.comments,
				rip: form.data.rip,
				dateReported: form.data.dateReported,
				locationId: form.data.locationId
			}
		});

		if (newLostCat) {
			throw redirect(303, '/catsLost');
		} else {
			return { form };
		}
	}
};
