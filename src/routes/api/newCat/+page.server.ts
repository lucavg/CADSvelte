import { db } from '$lib/database';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { LostCatModel } from '../../../zod-schemas';

export const load = async ({ locals: { user } }) => {
	if (user) {
		throw redirect(302, '/');
	}

	const form = await superValidate(LostCatModel);

	const races = await db.catRace.findMany({ where: { enabled: true } });
	const locations = await db.location.findMany({ where: { enabled: true } });
	const genders = await db.sex.findMany({ where: { enabled: true } });
	const colors = await db.color.findMany({ where: { enabled: true } });
	const cities = await db.lostCat.findMany({ select: { cityLost: true }, distinct: ['cityLost'] });

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
		const form = await superValidate(request, LostCatModel);

		if (!form.valid) {
			throw fail(400, { invalid: true });
		}

		console.log(form.data);

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
			throw fail(500, { error: 'Unable to create new lost cat.' });
		}
	}
};
