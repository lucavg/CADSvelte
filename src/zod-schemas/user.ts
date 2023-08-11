import * as z from 'zod';
import * as imports from './';
import { type CompleteRoles, RelatedRolesModel } from './index';

export const UserModel = z.object({
	id: z.string(),
	email: z.string(),
	passwordHash: z.string(),
	userAuthToken: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	roleId: z.number().int()
});

export interface CompleteUser extends z.infer<typeof UserModel> {
	role: CompleteRoles;
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
	UserModel.extend({
		role: RelatedRolesModel
	})
);
