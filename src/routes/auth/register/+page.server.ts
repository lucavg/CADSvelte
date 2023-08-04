import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';
import type { PageServerLoad } from './$types';

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const ensureUserRoleExists = async () => {
	const userRole = await db.roles.findUnique({
		where: { name: Roles.USER }
	});

	if (!userRole) {
		await db.roles.create({
			data: { name: Roles.USER }
		});
	}
};

const ensureAdminRoleExists = async () => {
	const adminRole = await db.roles.findUnique({
		where: { name: Roles.ADMIN }
	});

	if (!adminRole) {
		await db.roles.create({
			data: { name: Roles.ADMIN }
		});
	}
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { invalid: true });
	}

	const user = await db.user.findUnique({
		where: { email }
	});

	if (user) {
		return fail(400, { user: true });
	}

	await ensureUserRoleExists();
	await ensureAdminRoleExists();

	await db.user.create({
		data: {
			email,
			passwordHash: await bcrypt.hash(password, 10),
			userAuthToken: crypto.randomUUID(),
			role: { connect: { name: Roles.ADMIN } }
		}
	});

	throw redirect(303, '/auth/login');
};

export const actions: Actions = { register };
