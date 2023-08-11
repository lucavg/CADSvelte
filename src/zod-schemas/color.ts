import * as z from 'zod';
import * as imports from './';
import { type CompleteLostCat, RelatedLostCatModel } from './index';

export const ColorModel = z.object({
	id: z.number().int(),
	name: z.string(),
	enabled: z.boolean()
});

export interface CompleteColor extends z.infer<typeof ColorModel> {
	LostCat: CompleteLostCat[];
}

/**
 * RelatedColorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedColorModel: z.ZodSchema<CompleteColor> = z.lazy(() =>
	ColorModel.extend({
		LostCat: RelatedLostCatModel.array()
	})
);
