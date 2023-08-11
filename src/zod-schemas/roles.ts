import * as z from 'zod';
import * as imports from './';
import { type CompleteUser, RelatedUserModel } from './index';

export const RolesModel = z.object({
	id: z.number().int(),
	name: z.string()
});

export interface CompleteRoles extends z.infer<typeof RolesModel> {
	User: CompleteUser[];
}

/**
 * RelatedRolesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRolesModel: z.ZodSchema<CompleteRoles> = z.lazy(() =>
	RolesModel.extend({
		User: RelatedUserModel.array()
	})
);
