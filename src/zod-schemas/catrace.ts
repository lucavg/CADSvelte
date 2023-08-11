import * as z from 'zod';
import * as imports from './';
import { type CompleteLostCat, RelatedLostCatModel } from './index';

export const CatRaceModel = z.object({
	id: z.number().int(),
	name: z.string(),
	enabled: z.boolean()
});

export interface CompleteCatRace extends z.infer<typeof CatRaceModel> {
	LostCat: CompleteLostCat[];
}

/**
 * RelatedCatRaceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCatRaceModel: z.ZodSchema<CompleteCatRace> = z.lazy(() =>
	CatRaceModel.extend({
		LostCat: RelatedLostCatModel.array()
	})
);
