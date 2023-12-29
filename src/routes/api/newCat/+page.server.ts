import { db } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { LostCatSchema } from '../../../zod-schemas';
import { z } from 'zod';

const extendedLostCatSchema = LostCatSchema.extend({
	ownerName: z.string().optional(),
	ownerEmail: z.string().email().optional(),
	ownerStreet: z.string().optional(),
	ownerCityId: z.number(),
	ownerCityName: z.string().optional(),
	ownerPhone: z.string().optional(),
	ownerCellphone: z.string().optional(),
	ownerComments: z.string().optional(),
	catCityName: z.string().optional()
});

export const load = async ({ locals: { user } }) => {
	if (!user) {
		throw redirect(302, '/');
	}

	const form = await superValidate(extendedLostCatSchema);
	form.data.rip = false;

	const racesNotMapped = await db.catRace.findMany({ where: { enabled: true } });
	const locationsNotMapped = await db.location.findMany({ where: { enabled: true } });
	const colorsNotMapped = await db.color.findMany({ where: { enabled: true } });
	const citiesNotMapped = await db.city.findMany({ where: { enabled: true } });
	const ownersNotMapped = await db.owner.findMany();

	const colors = colorsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const locations = locationsNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const races = racesNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const cities = citiesNotMapped.map((item) => ({ value: item.id, label: item.name }));
	const owners = ownersNotMapped.map((item) => ({ value: item.id, label: item.name }));
	cities.push({ value: 0, label: 'Nieuwe stad toevoegen' });

	return {
		races,
		locations,
		colors,
		cities,
		owners,
		ownersNotMapped,
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();

		const form = await superValidate(body, extendedLostCatSchema);
		console.log('formData: ', form);

		if (!form.valid) {
			form.message = 1;
			return fail(400, { form });
		}

		let cityLost = await db.city.findUnique({ where: { id: form.data.catCityId } });
		if (cityLost === null && form.data.catCityName) {
			cityLost = await db.city.findUnique({ where: { name: form.data.catCityName } });
		}
		console.log('ownerCity: ', cityLost);

		if (cityLost === null) {
			cityLost = await db.city.create({
				data: {
					name: form.data.catCityName ?? 'Onbekend',
					enabled: true
				}
			});
		}

		let ownerCity = await db.city.findUnique({ where: { id: form.data.ownerCityId } });
		if (ownerCity === null && form.data.ownerCityName) {
			ownerCity = await db.city.findUnique({ where: { name: form.data.ownerCityName } });
		}
		console.log('ownerCity: ', ownerCity);

		if (ownerCity === null) {
			ownerCity = await db.city.create({
				data: {
					name: form.data.ownerCityName ?? 'Onbekend',
					enabled: true
				}
			});
		}

		let owner = await db.owner.findUnique({ where: { id: form.data.ownerId } });
		if (owner === null && form.data.ownerName) {
			owner = await db.owner.findUnique({ where: { email: form.data.ownerEmail } });
		}
		console.log('owner: ', owner);

		if (owner === null) {
			owner = await db.owner.create({
				data: {
					name: form.data.ownerName ?? 'Onbekend',
					email: form.data.ownerEmail ?? 'onbekend@gmail.com',
					street: form.data.ownerStreet,
					city: {
						connectOrCreate: {
							where: {
								name: cityLost.name
							},
							create: {
								name: form.data.ownerCityName ?? 'Onbekend',
								enabled: true
							}
						}
					},
					phone: form.data.ownerPhone,
					cellphone: form.data.ownerCellphone,
					comments: form.data.ownerComments
				}
			});
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
				description: form.data.description,
				photoUrl: form.data.photoUrl,
				chipped: form.data.chipped,
				chipNumber: form.data.chipNumber,
				collar: form.data.collar,
				ownerId: owner.id,
				catCityId: cityLost.id,
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
