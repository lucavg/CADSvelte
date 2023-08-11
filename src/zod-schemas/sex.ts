import * as z from 'zod';
import * as imports from './';
import { type CompleteLostCat, RelatedLostCatModel } from './index';

export const SexModel = z.object({
	id: z.number().int(),
	name: z.string(),
	enabled: z.boolean()
});

export interface CompleteSex extends z.infer<typeof SexModel> {
	LostCat: CompleteLostCat[];
}

/**
 * RelatedSexModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSexModel: z.ZodSchema<CompleteSex> = z.lazy(() =>
	SexModel.extend({
		LostCat: RelatedLostCatModel.array()
	})
);
