import * as z from 'zod';
import * as imports from './';
import {
	type CompleteCatRace,
	RelatedCatRaceModel,
	type CompleteSex,
	RelatedSexModel,
	type CompleteColor,
	RelatedColorModel,
	type CompleteLocation,
	RelatedLocationModel
} from './index';

export const LostCatModel = z.object({
	id: z.number().int(),
	name: z.string(),
	raceId: z.number().int(),
	sexId: z.number().int(),
	castrated: z.boolean().nullish(),
	colorId: z.number().int(),
	age: z.number().int().nullish(),
	dateLost: z.date(),
	cityLost: z.string().nullish(),
	description: z.string(),
	photoUrl: z.string().nullish(),
	chipped: z.boolean().nullish(),
	chipNumber: z.string().nullish(),
	collar: z.string().nullish(),
	ownerName: z.string(),
	ownerEmail: z.string(),
	ownerStreet: z.string(),
	ownerCity: z.string(),
	ownerPhone: z.string().nullish(),
	ownerCellphone: z.string().nullish(),
	comments: z.string().nullish(),
	rip: z.boolean().nullish(),
	dateReported: z.date(),
	locationId: z.number().int().nullish()
});

export interface CompleteLostCat extends z.infer<typeof LostCatModel> {
	race: CompleteCatRace;
	sex: CompleteSex;
	color: CompleteColor;
	location?: CompleteLocation | null;
}

/**
 * RelatedLostCatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLostCatModel: z.ZodSchema<CompleteLostCat> = z.lazy(() =>
	LostCatModel.extend({
		race: RelatedCatRaceModel,
		sex: RelatedSexModel,
		color: RelatedColorModel,
		location: RelatedLocationModel.nullish()
	})
);
