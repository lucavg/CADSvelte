import * as z from 'zod';
import * as imports from './';
import { type CompleteLostCat, RelatedLostCatModel } from './index';

export const LocationModel = z.object({
	id: z.number().int(),
	name: z.string(),
	enabled: z.boolean()
});

export interface CompleteLocation extends z.infer<typeof LocationModel> {
	LostCat: CompleteLostCat[];
}

/**
 * RelatedLocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLocationModel: z.ZodSchema<CompleteLocation> = z.lazy(() =>
	LocationModel.extend({
		LostCat: RelatedLostCatModel.array()
	})
);
