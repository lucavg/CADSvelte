import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../auth/login/$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}
};
