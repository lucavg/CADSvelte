import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','passwordHash','userAuthToken','createdAt','updatedAt','roleId']);

export const RolesScalarFieldEnumSchema = z.enum(['id','name']);

export const OwnerScalarFieldEnumSchema = z.enum(['id','name','email','street','ownerCityId','phone','cellphone','comments']);

export const LostCatScalarFieldEnumSchema = z.enum(['id','name','raceId','sexId','castrated','colorId','age','dateLost','catCityId','description','photoUrl','chipped','chipNumber','collar','ownerId','response','comments','rip','dateReported','locationId']);

export const CatRaceScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const LocationScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const SexScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const ColorScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  roleId: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const RolesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Roles = z.infer<typeof RolesSchema>

/////////////////////////////////////////
// OWNER SCHEMA
/////////////////////////////////////////

export const OwnerSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().nullable(),
  ownerCityId: z.number().int(),
  phone: z.string().nullable(),
  cellphone: z.string().nullable(),
  comments: z.string().nullable(),
})

export type Owner = z.infer<typeof OwnerSchema>

/////////////////////////////////////////
// LOST CAT SCHEMA
/////////////////////////////////////////

export const LostCatSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).nullable(),
  chipped: z.boolean().nullable(),
  chipNumber: z.string().nullable(),
  collar: z.string().nullable(),
  ownerId: z.number().int(),
  response: z.string().nullable(),
  comments: z.string().nullable(),
  rip: z.boolean().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).nullable(),
})

export type LostCat = z.infer<typeof LostCatSchema>

/////////////////////////////////////////
// CAT RACE SCHEMA
/////////////////////////////////////////

export const CatRaceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  enabled: z.boolean(),
})

export type CatRace = z.infer<typeof CatRaceSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  enabled: z.boolean(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// SEX SCHEMA
/////////////////////////////////////////

export const SexSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  enabled: z.boolean(),
})

export type Sex = z.infer<typeof SexSchema>

/////////////////////////////////////////
// COLOR SCHEMA
/////////////////////////////////////////

export const ColorSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  enabled: z.boolean(),
})

export type Color = z.infer<typeof ColorSchema>

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  enabled: z.boolean(),
})

export type City = z.infer<typeof CitySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  userAuthToken: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roleId: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
}).strict()

// ROLES
//------------------------------------------------------

export const RolesIncludeSchema: z.ZodType<Prisma.RolesInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RolesArgsSchema: z.ZodType<Prisma.RolesDefaultArgs> = z.object({
  select: z.lazy(() => RolesSelectSchema).optional(),
  include: z.lazy(() => RolesIncludeSchema).optional(),
}).strict();

export const RolesCountOutputTypeArgsSchema: z.ZodType<Prisma.RolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RolesCountOutputTypeSelectSchema: z.ZodType<Prisma.RolesCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
}).strict();

export const RolesSelectSchema: z.ZodType<Prisma.RolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// OWNER
//------------------------------------------------------

export const OwnerIncludeSchema: z.ZodType<Prisma.OwnerInclude> = z.object({
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  lostCats: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OwnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OwnerArgsSchema: z.ZodType<Prisma.OwnerDefaultArgs> = z.object({
  select: z.lazy(() => OwnerSelectSchema).optional(),
  include: z.lazy(() => OwnerIncludeSchema).optional(),
}).strict();

export const OwnerCountOutputTypeArgsSchema: z.ZodType<Prisma.OwnerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OwnerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OwnerCountOutputTypeSelectSchema: z.ZodType<Prisma.OwnerCountOutputTypeSelect> = z.object({
  lostCats: z.boolean().optional(),
}).strict();

export const OwnerSelectSchema: z.ZodType<Prisma.OwnerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  street: z.boolean().optional(),
  ownerCityId: z.boolean().optional(),
  phone: z.boolean().optional(),
  cellphone: z.boolean().optional(),
  comments: z.boolean().optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  lostCats: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OwnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOST CAT
//------------------------------------------------------

export const LostCatIncludeSchema: z.ZodType<Prisma.LostCatInclude> = z.object({
  race: z.union([z.boolean(),z.lazy(() => CatRaceArgsSchema)]).optional(),
  sex: z.union([z.boolean(),z.lazy(() => SexArgsSchema)]).optional(),
  color: z.union([z.boolean(),z.lazy(() => ColorArgsSchema)]).optional(),
  cityLost: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => OwnerArgsSchema)]).optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

export const LostCatArgsSchema: z.ZodType<Prisma.LostCatDefaultArgs> = z.object({
  select: z.lazy(() => LostCatSelectSchema).optional(),
  include: z.lazy(() => LostCatIncludeSchema).optional(),
}).strict();

export const LostCatSelectSchema: z.ZodType<Prisma.LostCatSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  raceId: z.boolean().optional(),
  sexId: z.boolean().optional(),
  castrated: z.boolean().optional(),
  colorId: z.boolean().optional(),
  age: z.boolean().optional(),
  dateLost: z.boolean().optional(),
  catCityId: z.boolean().optional(),
  description: z.boolean().optional(),
  photoUrl: z.boolean().optional(),
  chipped: z.boolean().optional(),
  chipNumber: z.boolean().optional(),
  collar: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  response: z.boolean().optional(),
  comments: z.boolean().optional(),
  rip: z.boolean().optional(),
  dateReported: z.boolean().optional(),
  locationId: z.boolean().optional(),
  race: z.union([z.boolean(),z.lazy(() => CatRaceArgsSchema)]).optional(),
  sex: z.union([z.boolean(),z.lazy(() => SexArgsSchema)]).optional(),
  color: z.union([z.boolean(),z.lazy(() => ColorArgsSchema)]).optional(),
  cityLost: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => OwnerArgsSchema)]).optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

// CAT RACE
//------------------------------------------------------

export const CatRaceIncludeSchema: z.ZodType<Prisma.CatRaceInclude> = z.object({
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CatRaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CatRaceArgsSchema: z.ZodType<Prisma.CatRaceDefaultArgs> = z.object({
  select: z.lazy(() => CatRaceSelectSchema).optional(),
  include: z.lazy(() => CatRaceIncludeSchema).optional(),
}).strict();

export const CatRaceCountOutputTypeArgsSchema: z.ZodType<Prisma.CatRaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CatRaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CatRaceCountOutputTypeSelectSchema: z.ZodType<Prisma.CatRaceCountOutputTypeSelect> = z.object({
  LostCat: z.boolean().optional(),
}).strict();

export const CatRaceSelectSchema: z.ZodType<Prisma.CatRaceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enabled: z.boolean().optional(),
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CatRaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationDefaultArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({
  LostCat: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enabled: z.boolean().optional(),
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SEX
//------------------------------------------------------

export const SexIncludeSchema: z.ZodType<Prisma.SexInclude> = z.object({
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SexCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SexArgsSchema: z.ZodType<Prisma.SexDefaultArgs> = z.object({
  select: z.lazy(() => SexSelectSchema).optional(),
  include: z.lazy(() => SexIncludeSchema).optional(),
}).strict();

export const SexCountOutputTypeArgsSchema: z.ZodType<Prisma.SexCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SexCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SexCountOutputTypeSelectSchema: z.ZodType<Prisma.SexCountOutputTypeSelect> = z.object({
  LostCat: z.boolean().optional(),
}).strict();

export const SexSelectSchema: z.ZodType<Prisma.SexSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enabled: z.boolean().optional(),
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SexCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COLOR
//------------------------------------------------------

export const ColorIncludeSchema: z.ZodType<Prisma.ColorInclude> = z.object({
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ColorArgsSchema: z.ZodType<Prisma.ColorDefaultArgs> = z.object({
  select: z.lazy(() => ColorSelectSchema).optional(),
  include: z.lazy(() => ColorIncludeSchema).optional(),
}).strict();

export const ColorCountOutputTypeArgsSchema: z.ZodType<Prisma.ColorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ColorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ColorCountOutputTypeSelectSchema: z.ZodType<Prisma.ColorCountOutputTypeSelect> = z.object({
  LostCat: z.boolean().optional(),
}).strict();

export const ColorSelectSchema: z.ZodType<Prisma.ColorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enabled: z.boolean().optional(),
  LostCat: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CITY
//------------------------------------------------------

export const CityIncludeSchema: z.ZodType<Prisma.CityInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => OwnerFindManyArgsSchema)]).optional(),
  lostCats: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CityArgsSchema: z.ZodType<Prisma.CityDefaultArgs> = z.object({
  select: z.lazy(() => CitySelectSchema).optional(),
  include: z.lazy(() => CityIncludeSchema).optional(),
}).strict();

export const CityCountOutputTypeArgsSchema: z.ZodType<Prisma.CityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CityCountOutputTypeSelectSchema: z.ZodType<Prisma.CityCountOutputTypeSelect> = z.object({
  owner: z.boolean().optional(),
  lostCats: z.boolean().optional(),
}).strict();

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enabled: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => OwnerFindManyArgsSchema)]).optional(),
  lostCats: z.union([z.boolean(),z.lazy(() => LostCatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAuthToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RolesOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    userAuthToken: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    userAuthToken: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
    userAuthToken: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    userAuthToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  userAuthToken: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAuthToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const RolesWhereInputSchema: z.ZodType<Prisma.RolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.RolesWhereInput>;

export const RolesOrderByWithRelationInputSchema: z.ZodType<Prisma.RolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesOrderByWithRelationInput>;

export const RolesWhereUniqueInputSchema: z.ZodType<Prisma.RolesWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.RolesWhereUniqueInput>;

export const RolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolesSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesOrderByWithAggregationInput>;

export const RolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.RolesScalarWhereWithAggregatesInput>;

export const OwnerWhereInputSchema: z.ZodType<Prisma.OwnerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OwnerWhereInputSchema),z.lazy(() => OwnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OwnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OwnerWhereInputSchema),z.lazy(() => OwnerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
  lostCats: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerWhereInput>;

export const OwnerOrderByWithRelationInputSchema: z.ZodType<Prisma.OwnerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  street: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cellphone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.lazy(() => CityOrderByWithRelationInputSchema).optional(),
  lostCats: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerOrderByWithRelationInput>;

export const OwnerWhereUniqueInputSchema: z.ZodType<Prisma.OwnerWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string().email({ message: 'Email adres klopt niet' })
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string().email({ message: 'Email adres klopt niet' }),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().email({ message: 'Email adres klopt niet' }).optional(),
  AND: z.union([ z.lazy(() => OwnerWhereInputSchema),z.lazy(() => OwnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OwnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OwnerWhereInputSchema),z.lazy(() => OwnerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  street: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCityId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
  lostCats: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.OwnerWhereUniqueInput>;

export const OwnerOrderByWithAggregationInputSchema: z.ZodType<Prisma.OwnerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  street: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cellphone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => OwnerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OwnerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OwnerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OwnerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OwnerSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerOrderByWithAggregationInput>;

export const OwnerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OwnerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OwnerScalarWhereWithAggregatesInputSchema),z.lazy(() => OwnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OwnerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OwnerScalarWhereWithAggregatesInputSchema),z.lazy(() => OwnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerCityId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cellphone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerScalarWhereWithAggregatesInput>;

export const LostCatWhereInputSchema: z.ZodType<Prisma.LostCatWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LostCatWhereInputSchema),z.lazy(() => LostCatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LostCatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LostCatWhereInputSchema),z.lazy(() => LostCatWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sexId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  castrated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  colorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  age: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  dateLost: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  catCityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  race: z.union([ z.lazy(() => CatRaceRelationFilterSchema),z.lazy(() => CatRaceWhereInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SexRelationFilterSchema),z.lazy(() => SexWhereInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => ColorRelationFilterSchema),z.lazy(() => ColorWhereInputSchema) ]).optional(),
  cityLost: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
  owner: z.union([ z.lazy(() => OwnerRelationFilterSchema),z.lazy(() => OwnerWhereInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatWhereInput>;

export const LostCatOrderByWithRelationInputSchema: z.ZodType<Prisma.LostCatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipped: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  collar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  response: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rip: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceOrderByWithRelationInputSchema).optional(),
  sex: z.lazy(() => SexOrderByWithRelationInputSchema).optional(),
  color: z.lazy(() => ColorOrderByWithRelationInputSchema).optional(),
  cityLost: z.lazy(() => CityOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => OwnerOrderByWithRelationInputSchema).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatOrderByWithRelationInput>;

export const LostCatWhereUniqueInputSchema: z.ZodType<Prisma.LostCatWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    chipNumber: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    chipNumber: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  chipNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => LostCatWhereInputSchema),z.lazy(() => LostCatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LostCatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LostCatWhereInputSchema),z.lazy(() => LostCatWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }) ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number().gte(1, { message: "Gelieve een ras te kiezen" }) ]).optional(),
  sexId: z.union([ z.lazy(() => IntFilterSchema),z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }) ]).optional(),
  castrated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  colorId: z.union([ z.lazy(() => IntFilterSchema),z.number().gte(1, { message: "Gelieve een kleur te kiezen" }) ]).optional(),
  age: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  dateLost: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }) ]).optional(),
  catCityId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }) ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().min(1, { message: "Gelieve een foto te uploaden" }) ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }) ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().gte(1, { message: "Gelieve een locatie te kiezen" }) ]).optional().nullable(),
  race: z.union([ z.lazy(() => CatRaceRelationFilterSchema),z.lazy(() => CatRaceWhereInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SexRelationFilterSchema),z.lazy(() => SexWhereInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => ColorRelationFilterSchema),z.lazy(() => ColorWhereInputSchema) ]).optional(),
  cityLost: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
  owner: z.union([ z.lazy(() => OwnerRelationFilterSchema),z.lazy(() => OwnerWhereInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
}).strict()) as z.ZodType<Prisma.LostCatWhereUniqueInput>;

export const LostCatOrderByWithAggregationInputSchema: z.ZodType<Prisma.LostCatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipped: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  collar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  response: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rip: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LostCatCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LostCatAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LostCatMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LostCatMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LostCatSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatOrderByWithAggregationInput>;

export const LostCatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LostCatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LostCatScalarWhereWithAggregatesInputSchema),z.lazy(() => LostCatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LostCatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LostCatScalarWhereWithAggregatesInputSchema),z.lazy(() => LostCatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  sexId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  castrated: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  colorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  age: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  dateLost: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  catCityId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatScalarWhereWithAggregatesInput>;

export const CatRaceWhereInputSchema: z.ZodType<Prisma.CatRaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatRaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceWhereInput>;

export const CatRaceOrderByWithRelationInputSchema: z.ZodType<Prisma.CatRaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceOrderByWithRelationInput>;

export const CatRaceWhereUniqueInputSchema: z.ZodType<Prisma.CatRaceWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatRaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CatRaceWhereUniqueInput>;

export const CatRaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.CatRaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CatRaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CatRaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CatRaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CatRaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CatRaceSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceOrderByWithAggregationInput>;

export const CatRaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CatRaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema),z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema),z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceScalarWhereWithAggregatesInput>;

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.LocationWhereInput>;

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationOrderByWithRelationInput>;

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.LocationWhereUniqueInput>;

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationOrderByWithAggregationInput>;

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict() as z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput>;

export const SexWhereInputSchema: z.ZodType<Prisma.SexWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.SexWhereInput>;

export const SexOrderByWithRelationInputSchema: z.ZodType<Prisma.SexOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexOrderByWithRelationInput>;

export const SexWhereUniqueInputSchema: z.ZodType<Prisma.SexWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.SexWhereUniqueInput>;

export const SexOrderByWithAggregationInputSchema: z.ZodType<Prisma.SexOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SexCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SexAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SexMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SexMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SexSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexOrderByWithAggregationInput>;

export const SexScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SexScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SexScalarWhereWithAggregatesInputSchema),z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SexScalarWhereWithAggregatesInputSchema),z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict() as z.ZodType<Prisma.SexScalarWhereWithAggregatesInput>;

export const ColorWhereInputSchema: z.ZodType<Prisma.ColorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.ColorWhereInput>;

export const ColorOrderByWithRelationInputSchema: z.ZodType<Prisma.ColorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorOrderByWithRelationInput>;

export const ColorWhereUniqueInputSchema: z.ZodType<Prisma.ColorWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.ColorWhereUniqueInput>;

export const ColorOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ColorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ColorSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorOrderByWithAggregationInput>;

export const ColorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColorScalarWhereWithAggregatesInputSchema),z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColorScalarWhereWithAggregatesInputSchema),z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict() as z.ZodType<Prisma.ColorScalarWhereWithAggregatesInput>;

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  owner: z.lazy(() => OwnerListRelationFilterSchema).optional(),
  lostCats: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CityWhereInput>;

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => OwnerOrderByRelationAggregateInputSchema).optional(),
  lostCats: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityOrderByWithRelationInput>;

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  owner: z.lazy(() => OwnerListRelationFilterSchema).optional(),
  lostCats: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CityWhereUniqueInput>;

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CitySumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityOrderByWithAggregationInput>;

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict() as z.ZodType<Prisma.CityScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RolesCreateNestedOneWithoutUserInputSchema)
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roleId: z.number().int()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RolesUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roleId: z.number().int()
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const RolesCreateInputSchema: z.ZodType<Prisma.RolesCreateInput> = z.object({
  name: z.string(),
  User: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesCreateInput>;

export const RolesUncheckedCreateInputSchema: z.ZodType<Prisma.RolesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesUncheckedCreateInput>;

export const RolesUpdateInputSchema: z.ZodType<Prisma.RolesUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesUpdateInput>;

export const RolesUncheckedUpdateInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesUncheckedUpdateInput>;

export const RolesCreateManyInputSchema: z.ZodType<Prisma.RolesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict() as z.ZodType<Prisma.RolesCreateManyInput>;

export const RolesUpdateManyMutationInputSchema: z.ZodType<Prisma.RolesUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RolesUpdateManyMutationInput>;

export const RolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RolesUncheckedUpdateManyInput>;

export const OwnerCreateInputSchema: z.ZodType<Prisma.OwnerCreateInput> = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  city: z.lazy(() => CityCreateNestedOneWithoutOwnerInputSchema),
  lostCats: z.lazy(() => LostCatCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerCreateInput>;

export const OwnerUncheckedCreateInputSchema: z.ZodType<Prisma.OwnerUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  ownerCityId: z.number().int(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  lostCats: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUncheckedCreateInput>;

export const OwnerUpdateInputSchema: z.ZodType<Prisma.OwnerUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutOwnerNestedInputSchema).optional(),
  lostCats: z.lazy(() => LostCatUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUpdateInput>;

export const OwnerUncheckedUpdateInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lostCats: z.lazy(() => LostCatUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateInput>;

export const OwnerCreateManyInputSchema: z.ZodType<Prisma.OwnerCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  ownerCityId: z.number().int(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.OwnerCreateManyInput>;

export const OwnerUpdateManyMutationInputSchema: z.ZodType<Prisma.OwnerUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerUpdateManyMutationInput>;

export const OwnerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateManyInput>;

export const LostCatCreateInputSchema: z.ZodType<Prisma.LostCatCreateInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateInput>;

export const LostCatUncheckedCreateInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateInput>;

export const LostCatUpdateInputSchema: z.ZodType<Prisma.LostCatUpdateInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateInput>;

export const LostCatUncheckedUpdateInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateInput>;

export const LostCatCreateManyInputSchema: z.ZodType<Prisma.LostCatCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManyInput>;

export const LostCatUpdateManyMutationInputSchema: z.ZodType<Prisma.LostCatUpdateManyMutationInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyMutationInput>;

export const LostCatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyInput>;

export const CatRaceCreateInputSchema: z.ZodType<Prisma.CatRaceCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutRaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceCreateInput>;

export const CatRaceUncheckedCreateInputSchema: z.ZodType<Prisma.CatRaceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutRaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceUncheckedCreateInput>;

export const CatRaceUpdateInputSchema: z.ZodType<Prisma.CatRaceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceUpdateInput>;

export const CatRaceUncheckedUpdateInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceUncheckedUpdateInput>;

export const CatRaceCreateManyInputSchema: z.ZodType<Prisma.CatRaceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CatRaceCreateManyInput>;

export const CatRaceUpdateManyMutationInputSchema: z.ZodType<Prisma.CatRaceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceUpdateManyMutationInput>;

export const CatRaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceUncheckedUpdateManyInput>;

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutLocationInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationCreateInput>;

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationUncheckedCreateInput>;

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationUpdateInput>;

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationUncheckedUpdateInput>;

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LocationCreateManyInput>;

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LocationUpdateManyMutationInput>;

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LocationUncheckedUpdateManyInput>;

export const SexCreateInputSchema: z.ZodType<Prisma.SexCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutSexInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexCreateInput>;

export const SexUncheckedCreateInputSchema: z.ZodType<Prisma.SexUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutSexInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexUncheckedCreateInput>;

export const SexUpdateInputSchema: z.ZodType<Prisma.SexUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutSexNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexUpdateInput>;

export const SexUncheckedUpdateInputSchema: z.ZodType<Prisma.SexUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutSexNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexUncheckedUpdateInput>;

export const SexCreateManyInputSchema: z.ZodType<Prisma.SexCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.SexCreateManyInput>;

export const SexUpdateManyMutationInputSchema: z.ZodType<Prisma.SexUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SexUpdateManyMutationInput>;

export const SexUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SexUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SexUncheckedUpdateManyInput>;

export const ColorCreateInputSchema: z.ZodType<Prisma.ColorCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutColorInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorCreateInput>;

export const ColorUncheckedCreateInputSchema: z.ZodType<Prisma.ColorUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutColorInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorUncheckedCreateInput>;

export const ColorUpdateInputSchema: z.ZodType<Prisma.ColorUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutColorNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorUpdateInput>;

export const ColorUncheckedUpdateInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutColorNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorUncheckedUpdateInput>;

export const ColorCreateManyInputSchema: z.ZodType<Prisma.ColorCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ColorCreateManyInput>;

export const ColorUpdateManyMutationInputSchema: z.ZodType<Prisma.ColorUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ColorUpdateManyMutationInput>;

export const ColorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ColorUncheckedUpdateManyInput>;

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  owner: z.lazy(() => OwnerCreateNestedManyWithoutCityInputSchema).optional(),
  lostCats: z.lazy(() => LostCatCreateNestedManyWithoutCityLostInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityCreateInput>;

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  owner: z.lazy(() => OwnerUncheckedCreateNestedManyWithoutCityInputSchema).optional(),
  lostCats: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutCityLostInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedCreateInput>;

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => OwnerUpdateManyWithoutCityNestedInputSchema).optional(),
  lostCats: z.lazy(() => LostCatUpdateManyWithoutCityLostNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUpdateInput>;

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => OwnerUncheckedUpdateManyWithoutCityNestedInputSchema).optional(),
  lostCats: z.lazy(() => LostCatUncheckedUpdateManyWithoutCityLostNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedUpdateInput>;

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CityCreateManyInput>;

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CityUpdateManyMutationInput>;

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CityUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const RolesRelationFilterSchema: z.ZodType<Prisma.RolesRelationFilter> = z.object({
  is: z.lazy(() => RolesWhereInputSchema).optional(),
  isNot: z.lazy(() => RolesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesRelationFilter>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserAvgOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserSumOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserListRelationFilter>;

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByRelationAggregateInput>;

export const RolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RolesCountOrderByAggregateInput>;

export const RolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RolesAvgOrderByAggregateInput>;

export const RolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RolesMaxOrderByAggregateInput>;

export const RolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RolesMinOrderByAggregateInput>;

export const RolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RolesSumOrderByAggregateInput>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const CityRelationFilterSchema: z.ZodType<Prisma.CityRelationFilter> = z.object({
  is: z.lazy(() => CityWhereInputSchema).optional(),
  isNot: z.lazy(() => CityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityRelationFilter>;

export const LostCatListRelationFilterSchema: z.ZodType<Prisma.LostCatListRelationFilter> = z.object({
  every: z.lazy(() => LostCatWhereInputSchema).optional(),
  some: z.lazy(() => LostCatWhereInputSchema).optional(),
  none: z.lazy(() => LostCatWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const LostCatOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LostCatOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatOrderByRelationAggregateInput>;

export const OwnerCountOrderByAggregateInputSchema: z.ZodType<Prisma.OwnerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  cellphone: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerCountOrderByAggregateInput>;

export const OwnerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OwnerAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerAvgOrderByAggregateInput>;

export const OwnerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OwnerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  cellphone: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerMaxOrderByAggregateInput>;

export const OwnerMinOrderByAggregateInputSchema: z.ZodType<Prisma.OwnerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  cellphone: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerMinOrderByAggregateInput>;

export const OwnerSumOrderByAggregateInputSchema: z.ZodType<Prisma.OwnerSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerCityId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerSumOrderByAggregateInput>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.BoolNullableFilter>;

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.IntNullableFilter>;

export const CatRaceRelationFilterSchema: z.ZodType<Prisma.CatRaceRelationFilter> = z.object({
  is: z.lazy(() => CatRaceWhereInputSchema).optional(),
  isNot: z.lazy(() => CatRaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceRelationFilter>;

export const SexRelationFilterSchema: z.ZodType<Prisma.SexRelationFilter> = z.object({
  is: z.lazy(() => SexWhereInputSchema).optional(),
  isNot: z.lazy(() => SexWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexRelationFilter>;

export const ColorRelationFilterSchema: z.ZodType<Prisma.ColorRelationFilter> = z.object({
  is: z.lazy(() => ColorWhereInputSchema).optional(),
  isNot: z.lazy(() => ColorWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorRelationFilter>;

export const OwnerRelationFilterSchema: z.ZodType<Prisma.OwnerRelationFilter> = z.object({
  is: z.lazy(() => OwnerWhereInputSchema).optional(),
  isNot: z.lazy(() => OwnerWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerRelationFilter>;

export const LocationNullableRelationFilterSchema: z.ZodType<Prisma.LocationNullableRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.LocationNullableRelationFilter>;

export const LostCatCountOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCountOrderByAggregateInput>;

export const LostCatAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatAvgOrderByAggregateInput>;

export const LostCatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatMaxOrderByAggregateInput>;

export const LostCatMinOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatMinOrderByAggregateInput>;

export const LostCatSumOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  catCityId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatSumOrderByAggregateInput>;

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolNullableWithAggregatesFilter>;

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.BoolFilter>;

export const CatRaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceCountOrderByAggregateInput>;

export const CatRaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceAvgOrderByAggregateInput>;

export const CatRaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceMaxOrderByAggregateInput>;

export const CatRaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceMinOrderByAggregateInput>;

export const CatRaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceSumOrderByAggregateInput>;

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolWithAggregatesFilter>;

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LocationCountOrderByAggregateInput>;

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LocationAvgOrderByAggregateInput>;

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LocationMaxOrderByAggregateInput>;

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LocationMinOrderByAggregateInput>;

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LocationSumOrderByAggregateInput>;

export const SexCountOrderByAggregateInputSchema: z.ZodType<Prisma.SexCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SexCountOrderByAggregateInput>;

export const SexAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SexAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SexAvgOrderByAggregateInput>;

export const SexMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SexMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SexMaxOrderByAggregateInput>;

export const SexMinOrderByAggregateInputSchema: z.ZodType<Prisma.SexMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SexMinOrderByAggregateInput>;

export const SexSumOrderByAggregateInputSchema: z.ZodType<Prisma.SexSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SexSumOrderByAggregateInput>;

export const ColorCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ColorCountOrderByAggregateInput>;

export const ColorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColorAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ColorAvgOrderByAggregateInput>;

export const ColorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ColorMaxOrderByAggregateInput>;

export const ColorMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ColorMinOrderByAggregateInput>;

export const ColorSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColorSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ColorSumOrderByAggregateInput>;

export const OwnerListRelationFilterSchema: z.ZodType<Prisma.OwnerListRelationFilter> = z.object({
  every: z.lazy(() => OwnerWhereInputSchema).optional(),
  some: z.lazy(() => OwnerWhereInputSchema).optional(),
  none: z.lazy(() => OwnerWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerListRelationFilter>;

export const OwnerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OwnerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerOrderByRelationAggregateInput>;

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CityCountOrderByAggregateInput>;

export const CityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CityAvgOrderByAggregateInput>;

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CityMaxOrderByAggregateInput>;

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CityMinOrderByAggregateInput>;

export const CitySumOrderByAggregateInputSchema: z.ZodType<Prisma.CitySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CitySumOrderByAggregateInput>;

export const RolesCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesCreateNestedOneWithoutUserInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const RolesUpdateOneRequiredWithoutUserNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RolesUpdateOneRequiredWithoutUserNestedInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const UserCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput>;

export const UserUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput>;

export const UserUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyWithoutRoleNestedInput>;

export const UserUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleNestedInput>;

export const CityCreateNestedOneWithoutOwnerInputSchema: z.ZodType<Prisma.CityCreateNestedOneWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutOwnerInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityCreateNestedOneWithoutOwnerInput>;

export const LostCatCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatCreateWithoutOwnerInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutOwnerInput>;

export const LostCatUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatCreateWithoutOwnerInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutOwnerInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const CityUpdateOneRequiredWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CityUpdateOneRequiredWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutOwnerInputSchema).optional(),
  upsert: z.lazy(() => CityUpsertWithoutOwnerInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CityUpdateToOneWithWhereWithoutOwnerInputSchema),z.lazy(() => CityUpdateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedUpdateWithoutOwnerInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CityUpdateOneRequiredWithoutOwnerNestedInput>;

export const LostCatUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatCreateWithoutOwnerInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutOwnerNestedInput>;

export const LostCatUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatCreateWithoutOwnerInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutOwnerNestedInput>;

export const CatRaceCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatRaceCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => CatRaceWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceCreateNestedOneWithoutLostCatInput>;

export const SexCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SexCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => SexWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexCreateNestedOneWithoutLostCatInput>;

export const ColorCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColorCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => ColorWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorCreateNestedOneWithoutLostCatInput>;

export const CityCreateNestedOneWithoutLostCatsInputSchema: z.ZodType<Prisma.CityCreateNestedOneWithoutLostCatsInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedCreateWithoutLostCatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutLostCatsInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityCreateNestedOneWithoutLostCatsInput>;

export const OwnerCreateNestedOneWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerCreateNestedOneWithoutLostCatsInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutLostCatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OwnerCreateOrConnectWithoutLostCatsInputSchema).optional(),
  connect: z.lazy(() => OwnerWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerCreateNestedOneWithoutLostCatsInput>;

export const LocationCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationCreateNestedOneWithoutLostCatInput>;

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput>;

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;

export const CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.CatRaceUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatRaceCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => CatRaceUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => CatRaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CatRaceUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceUpdateOneRequiredWithoutLostCatNestedInput>;

export const SexUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.SexUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SexCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => SexUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => SexWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SexUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SexUpdateOneRequiredWithoutLostCatNestedInput>;

export const ColorUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.ColorUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColorCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => ColorUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => ColorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColorUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ColorUpdateOneRequiredWithoutLostCatNestedInput>;

export const CityUpdateOneRequiredWithoutLostCatsNestedInputSchema: z.ZodType<Prisma.CityUpdateOneRequiredWithoutLostCatsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedCreateWithoutLostCatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutLostCatsInputSchema).optional(),
  upsert: z.lazy(() => CityUpsertWithoutLostCatsInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CityUpdateToOneWithWhereWithoutLostCatsInputSchema),z.lazy(() => CityUpdateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLostCatsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CityUpdateOneRequiredWithoutLostCatsNestedInput>;

export const OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema: z.ZodType<Prisma.OwnerUpdateOneRequiredWithoutLostCatsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutLostCatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OwnerCreateOrConnectWithoutLostCatsInputSchema).optional(),
  upsert: z.lazy(() => OwnerUpsertWithoutLostCatsInputSchema).optional(),
  connect: z.lazy(() => OwnerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OwnerUpdateToOneWithWhereWithoutLostCatsInputSchema),z.lazy(() => OwnerUpdateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedUpdateWithoutLostCatsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerUpdateOneRequiredWithoutLostCatsNestedInput>;

export const LocationUpdateOneWithoutLostCatNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutLostCatInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LocationUpdateOneWithoutLostCatNestedInput>;

export const LostCatCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutRaceInput>;

export const LostCatUncheckedCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutRaceInput>;

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;

export const LostCatUpdateManyWithoutRaceNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutRaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutRaceInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutRaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutRaceNestedInput>;

export const LostCatUncheckedUpdateManyWithoutRaceNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutRaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutRaceInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutRaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutRaceNestedInput>;

export const LostCatCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutLocationInput>;

export const LostCatUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutLocationInput>;

export const LostCatUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutLocationNestedInput>;

export const LostCatUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutLocationNestedInput>;

export const LostCatCreateNestedManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutSexInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutSexInput>;

export const LostCatUncheckedCreateNestedManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutSexInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutSexInput>;

export const LostCatUpdateManyWithoutSexNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutSexNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutSexInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutSexInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutSexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutSexInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutSexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutSexNestedInput>;

export const LostCatUncheckedUpdateManyWithoutSexNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutSexNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutSexInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutSexInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutSexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutSexInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutSexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutSexNestedInput>;

export const LostCatCreateNestedManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutColorInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutColorInput>;

export const LostCatUncheckedCreateNestedManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutColorInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutColorInput>;

export const LostCatUpdateManyWithoutColorNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutColorNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutColorInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutColorInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutColorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutColorInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutColorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutColorNestedInput>;

export const LostCatUncheckedUpdateManyWithoutColorNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutColorNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutColorInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutColorInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutColorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutColorInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutColorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutColorNestedInput>;

export const OwnerCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.OwnerCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerCreateWithoutCityInputSchema).array(),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema),z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OwnerCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerCreateNestedManyWithoutCityInput>;

export const LostCatCreateNestedManyWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutCityLostInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatCreateWithoutCityLostInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyCityLostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateNestedManyWithoutCityLostInput>;

export const OwnerUncheckedCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.OwnerUncheckedCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerCreateWithoutCityInputSchema).array(),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema),z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OwnerCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerUncheckedCreateNestedManyWithoutCityInput>;

export const LostCatUncheckedCreateNestedManyWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutCityLostInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatCreateWithoutCityLostInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyCityLostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutCityLostInput>;

export const OwnerUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.OwnerUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerCreateWithoutCityInputSchema).array(),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema),z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OwnerUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => OwnerUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OwnerCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OwnerUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => OwnerUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OwnerUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => OwnerUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OwnerScalarWhereInputSchema),z.lazy(() => OwnerScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerUpdateManyWithoutCityNestedInput>;

export const LostCatUpdateManyWithoutCityLostNestedInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithoutCityLostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatCreateWithoutCityLostInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutCityLostInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutCityLostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyCityLostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutCityLostInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutCityLostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutCityLostInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutCityLostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithoutCityLostNestedInput>;

export const OwnerUncheckedUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerCreateWithoutCityInputSchema).array(),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema),z.lazy(() => OwnerCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OwnerUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => OwnerUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OwnerCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OwnerWhereUniqueInputSchema),z.lazy(() => OwnerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OwnerUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => OwnerUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OwnerUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => OwnerUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OwnerScalarWhereInputSchema),z.lazy(() => OwnerScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateManyWithoutCityNestedInput>;

export const LostCatUncheckedUpdateManyWithoutCityLostNestedInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutCityLostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatCreateWithoutCityLostInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutCityLostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LostCatUpsertWithWhereUniqueWithoutCityLostInputSchema),z.lazy(() => LostCatUpsertWithWhereUniqueWithoutCityLostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyCityLostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LostCatUpdateWithWhereUniqueWithoutCityLostInputSchema),z.lazy(() => LostCatUpdateWithWhereUniqueWithoutCityLostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LostCatUpdateManyWithWhereWithoutCityLostInputSchema),z.lazy(() => LostCatUpdateManyWithWhereWithoutCityLostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutCityLostNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedBoolNullableFilter>;

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter>;

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>;

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedFloatNullableFilter>;

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedBoolFilter>;

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;

export const RolesCreateWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateWithoutUserInput> = z.object({
  name: z.string()
}).strict() as z.ZodType<Prisma.RolesCreateWithoutUserInput>;

export const RolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict() as z.ZodType<Prisma.RolesUncheckedCreateWithoutUserInput>;

export const RolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RolesCreateOrConnectWithoutUserInput>;

export const RolesUpsertWithoutUserInputSchema: z.ZodType<Prisma.RolesUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.RolesUpsertWithoutUserInput>;

export const RolesUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutUserInput>;

export const RolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RolesUpdateWithoutUserInput>;

export const RolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RolesUncheckedUpdateWithoutUserInput>;

export const UserCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateWithoutRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutRoleInput>;

export const UserUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput>;

export const UserCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput>;

export const UserCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyRoleInputSchema),z.lazy(() => UserCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.UserCreateManyRoleInputEnvelope>;

export const UserUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput>;

export const UserUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput>;

export const UserUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput>;

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAuthToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereInput>;

export const CityCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CityCreateWithoutOwnerInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  lostCats: z.lazy(() => LostCatCreateNestedManyWithoutCityLostInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityCreateWithoutOwnerInput>;

export const CityUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  lostCats: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutCityLostInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedCreateWithoutOwnerInput>;

export const CityCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.CityCreateOrConnectWithoutOwnerInput>;

export const LostCatCreateWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatCreateWithoutOwnerInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutOwnerInput>;

export const LostCatUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutOwnerInput>;

export const LostCatCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutOwnerInput>;

export const LostCatCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyOwnerInputSchema),z.lazy(() => LostCatCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManyOwnerInputEnvelope>;

export const CityUpsertWithoutOwnerInputSchema: z.ZodType<Prisma.CityUpsertWithoutOwnerInput> = z.object({
  update: z.union([ z.lazy(() => CityUpdateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedCreateWithoutOwnerInputSchema) ]),
  where: z.lazy(() => CityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUpsertWithoutOwnerInput>;

export const CityUpdateToOneWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => CityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CityUpdateWithoutOwnerInputSchema),z.lazy(() => CityUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutOwnerInput>;

export const CityUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CityUpdateWithoutOwnerInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  lostCats: z.lazy(() => LostCatUpdateManyWithoutCityLostNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUpdateWithoutOwnerInput>;

export const CityUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  lostCats: z.lazy(() => LostCatUncheckedUpdateManyWithoutCityLostNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedUpdateWithoutOwnerInput>;

export const LostCatUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutOwnerInput>;

export const LostCatUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutOwnerInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutOwnerInput>;

export const LostCatUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutOwnerInput>;

export const LostCatScalarWhereInputSchema: z.ZodType<Prisma.LostCatScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LostCatScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LostCatScalarWhereInputSchema),z.lazy(() => LostCatScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sexId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  castrated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  colorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  age: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  dateLost: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  catCityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatScalarWhereInput>;

export const CatRaceCreateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CatRaceCreateWithoutLostCatInput>;

export const CatRaceUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CatRaceUncheckedCreateWithoutLostCatInput>;

export const CatRaceCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => CatRaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.CatRaceCreateOrConnectWithoutLostCatInput>;

export const SexCreateWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.SexCreateWithoutLostCatInput>;

export const SexUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.SexUncheckedCreateWithoutLostCatInput>;

export const SexCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => SexWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.SexCreateOrConnectWithoutLostCatInput>;

export const ColorCreateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ColorCreateWithoutLostCatInput>;

export const ColorUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ColorUncheckedCreateWithoutLostCatInput>;

export const ColorCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => ColorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.ColorCreateOrConnectWithoutLostCatInput>;

export const CityCreateWithoutLostCatsInputSchema: z.ZodType<Prisma.CityCreateWithoutLostCatsInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  owner: z.lazy(() => OwnerCreateNestedManyWithoutCityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityCreateWithoutLostCatsInput>;

export const CityUncheckedCreateWithoutLostCatsInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutLostCatsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  owner: z.lazy(() => OwnerUncheckedCreateNestedManyWithoutCityInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedCreateWithoutLostCatsInput>;

export const CityCreateOrConnectWithoutLostCatsInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutLostCatsInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedCreateWithoutLostCatsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CityCreateOrConnectWithoutLostCatsInput>;

export const OwnerCreateWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerCreateWithoutLostCatsInput> = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  city: z.lazy(() => CityCreateNestedOneWithoutOwnerInputSchema)
}).strict() as z.ZodType<Prisma.OwnerCreateWithoutLostCatsInput>;

export const OwnerUncheckedCreateWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerUncheckedCreateWithoutLostCatsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  ownerCityId: z.number().int(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.OwnerUncheckedCreateWithoutLostCatsInput>;

export const OwnerCreateOrConnectWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerCreateOrConnectWithoutLostCatsInput> = z.object({
  where: z.lazy(() => OwnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OwnerCreateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutLostCatsInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerCreateOrConnectWithoutLostCatsInput>;

export const LocationCreateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateWithoutLostCatInput> = z.object({
  name: z.string().optional(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LocationCreateWithoutLostCatInput>;

export const LocationUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LocationUncheckedCreateWithoutLostCatInput>;

export const LocationCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.LocationCreateOrConnectWithoutLostCatInput>;

export const CatRaceUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => CatRaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CatRaceUpsertWithoutLostCatInput>;

export const CatRaceUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => CatRaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.CatRaceUpdateToOneWithWhereWithoutLostCatInput>;

export const CatRaceUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceUpdateWithoutLostCatInput>;

export const CatRaceUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceUncheckedUpdateWithoutLostCatInput>;

export const SexUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => SexWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.SexUpsertWithoutLostCatInput>;

export const SexUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => SexWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.SexUpdateToOneWithWhereWithoutLostCatInput>;

export const SexUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SexUpdateWithoutLostCatInput>;

export const SexUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SexUncheckedUpdateWithoutLostCatInput>;

export const ColorUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => ColorWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ColorUpsertWithoutLostCatInput>;

export const ColorUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => ColorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.ColorUpdateToOneWithWhereWithoutLostCatInput>;

export const ColorUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ColorUpdateWithoutLostCatInput>;

export const ColorUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ColorUncheckedUpdateWithoutLostCatInput>;

export const CityUpsertWithoutLostCatsInputSchema: z.ZodType<Prisma.CityUpsertWithoutLostCatsInput> = z.object({
  update: z.union([ z.lazy(() => CityUpdateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLostCatsInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedCreateWithoutLostCatsInputSchema) ]),
  where: z.lazy(() => CityWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUpsertWithoutLostCatsInput>;

export const CityUpdateToOneWithWhereWithoutLostCatsInputSchema: z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutLostCatsInput> = z.object({
  where: z.lazy(() => CityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CityUpdateWithoutLostCatsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLostCatsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutLostCatsInput>;

export const CityUpdateWithoutLostCatsInputSchema: z.ZodType<Prisma.CityUpdateWithoutLostCatsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => OwnerUpdateManyWithoutCityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUpdateWithoutLostCatsInput>;

export const CityUncheckedUpdateWithoutLostCatsInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutLostCatsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => OwnerUncheckedUpdateManyWithoutCityNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CityUncheckedUpdateWithoutLostCatsInput>;

export const OwnerUpsertWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerUpsertWithoutLostCatsInput> = z.object({
  update: z.union([ z.lazy(() => OwnerUpdateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedUpdateWithoutLostCatsInputSchema) ]),
  create: z.union([ z.lazy(() => OwnerCreateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutLostCatsInputSchema) ]),
  where: z.lazy(() => OwnerWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUpsertWithoutLostCatsInput>;

export const OwnerUpdateToOneWithWhereWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerUpdateToOneWithWhereWithoutLostCatsInput> = z.object({
  where: z.lazy(() => OwnerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OwnerUpdateWithoutLostCatsInputSchema),z.lazy(() => OwnerUncheckedUpdateWithoutLostCatsInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerUpdateToOneWithWhereWithoutLostCatsInput>;

export const OwnerUpdateWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerUpdateWithoutLostCatsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutOwnerNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUpdateWithoutLostCatsInput>;

export const OwnerUncheckedUpdateWithoutLostCatsInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateWithoutLostCatsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateWithoutLostCatsInput>;

export const LocationUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => LocationWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.LocationUpsertWithoutLostCatInput>;

export const LocationUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => LocationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict() as z.ZodType<Prisma.LocationUpdateToOneWithWhereWithoutLostCatInput>;

export const LocationUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LocationUpdateWithoutLostCatInput>;

export const LocationUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LocationUncheckedUpdateWithoutLostCatInput>;

export const LostCatCreateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateWithoutRaceInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutRaceInput>;

export const LostCatUncheckedCreateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutRaceInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutRaceInput>;

export const LostCatCreateOrConnectWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutRaceInput>;

export const LostCatCreateManyRaceInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyRaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyRaceInputSchema),z.lazy(() => LostCatCreateManyRaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManyRaceInputEnvelope>;

export const LostCatUpsertWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutRaceInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutRaceInput>;

export const LostCatUpdateWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutRaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutRaceInput>;

export const LostCatUpdateManyWithWhereWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutRaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutRaceInput>;

export const LostCatCreateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateWithoutLocationInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema)
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutLocationInput>;

export const LostCatUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" })
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutLocationInput>;

export const LostCatCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutLocationInput>;

export const LostCatCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyLocationInputSchema),z.lazy(() => LostCatCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManyLocationInputEnvelope>;

export const LostCatUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutLocationInput>;

export const LostCatUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutLocationInput>;

export const LostCatUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutLocationInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutLocationInput>;

export const LostCatCreateWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateWithoutSexInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutSexInput>;

export const LostCatUncheckedCreateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutSexInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutSexInput>;

export const LostCatCreateOrConnectWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutSexInput>;

export const LostCatCreateManySexInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManySexInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManySexInputSchema),z.lazy(() => LostCatCreateManySexInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManySexInputEnvelope>;

export const LostCatUpsertWithWhereUniqueWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutSexInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutSexInput>;

export const LostCatUpdateWithWhereUniqueWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutSexInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutSexInput>;

export const LostCatUpdateManyWithWhereWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutSexInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutSexInput>;

export const LostCatCreateWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateWithoutColorInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  cityLost: z.lazy(() => CityCreateNestedOneWithoutLostCatsInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutColorInput>;

export const LostCatUncheckedCreateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutColorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutColorInput>;

export const LostCatCreateOrConnectWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutColorInput>;

export const LostCatCreateManyColorInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyColorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyColorInputSchema),z.lazy(() => LostCatCreateManyColorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManyColorInputEnvelope>;

export const LostCatUpsertWithWhereUniqueWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutColorInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutColorInput>;

export const LostCatUpdateWithWhereUniqueWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutColorInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutColorInput>;

export const LostCatUpdateManyWithWhereWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutColorInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutColorInput>;

export const OwnerCreateWithoutCityInputSchema: z.ZodType<Prisma.OwnerCreateWithoutCityInput> = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  lostCats: z.lazy(() => LostCatCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerCreateWithoutCityInput>;

export const OwnerUncheckedCreateWithoutCityInputSchema: z.ZodType<Prisma.OwnerUncheckedCreateWithoutCityInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  lostCats: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUncheckedCreateWithoutCityInput>;

export const OwnerCreateOrConnectWithoutCityInputSchema: z.ZodType<Prisma.OwnerCreateOrConnectWithoutCityInput> = z.object({
  where: z.lazy(() => OwnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerCreateOrConnectWithoutCityInput>;

export const OwnerCreateManyCityInputEnvelopeSchema: z.ZodType<Prisma.OwnerCreateManyCityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OwnerCreateManyCityInputSchema),z.lazy(() => OwnerCreateManyCityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.OwnerCreateManyCityInputEnvelope>;

export const LostCatCreateWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatCreateWithoutCityLostInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  owner: z.lazy(() => OwnerCreateNestedOneWithoutLostCatsInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatCreateWithoutCityLostInput>;

export const LostCatUncheckedCreateWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutCityLostInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatUncheckedCreateWithoutCityLostInput>;

export const LostCatCreateOrConnectWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutCityLostInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatCreateOrConnectWithoutCityLostInput>;

export const LostCatCreateManyCityLostInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyCityLostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyCityLostInputSchema),z.lazy(() => LostCatCreateManyCityLostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.LostCatCreateManyCityLostInputEnvelope>;

export const OwnerUpsertWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.OwnerUpsertWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => OwnerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OwnerUpdateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedUpdateWithoutCityInputSchema) ]),
  create: z.union([ z.lazy(() => OwnerCreateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedCreateWithoutCityInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerUpsertWithWhereUniqueWithoutCityInput>;

export const OwnerUpdateWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.OwnerUpdateWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => OwnerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OwnerUpdateWithoutCityInputSchema),z.lazy(() => OwnerUncheckedUpdateWithoutCityInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerUpdateWithWhereUniqueWithoutCityInput>;

export const OwnerUpdateManyWithWhereWithoutCityInputSchema: z.ZodType<Prisma.OwnerUpdateManyWithWhereWithoutCityInput> = z.object({
  where: z.lazy(() => OwnerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OwnerUpdateManyMutationInputSchema),z.lazy(() => OwnerUncheckedUpdateManyWithoutCityInputSchema) ]),
}).strict() as z.ZodType<Prisma.OwnerUpdateManyWithWhereWithoutCityInput>;

export const OwnerScalarWhereInputSchema: z.ZodType<Prisma.OwnerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OwnerScalarWhereInputSchema),z.lazy(() => OwnerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OwnerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OwnerScalarWhereInputSchema),z.lazy(() => OwnerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerScalarWhereInput>;

export const LostCatUpsertWithWhereUniqueWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutCityLostInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutCityLostInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutCityLostInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutCityLostInput>;

export const LostCatUpdateWithWhereUniqueWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutCityLostInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutCityLostInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutCityLostInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutCityLostInput>;

export const LostCatUpdateManyWithWhereWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutCityLostInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutCityLostInputSchema) ]),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutCityLostInput>;

export const UserCreateManyRoleInputSchema: z.ZodType<Prisma.UserCreateManyRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UserCreateManyRoleInput>;

export const UserUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateWithoutRoleInput>;

export const UserUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput>;

export const UserUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleInput>;

export const LostCatCreateManyOwnerInputSchema: z.ZodType<Prisma.LostCatCreateManyOwnerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManyOwnerInput>;

export const LostCatUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutOwnerInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutOwnerInput>;

export const LostCatUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutOwnerInput>;

export const LostCatUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutOwnerInput>;

export const LostCatCreateManyRaceInputSchema: z.ZodType<Prisma.LostCatCreateManyRaceInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManyRaceInput>;

export const LostCatUpdateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutRaceInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutRaceInput>;

export const LostCatUncheckedUpdateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutRaceInput>;

export const LostCatUncheckedUpdateManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutRaceInput>;

export const LostCatCreateManyLocationInputSchema: z.ZodType<Prisma.LostCatCreateManyLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" })
}).strict() as z.ZodType<Prisma.LostCatCreateManyLocationInput>;

export const LostCatUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutLocationInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutLocationInput>;

export const LostCatUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutLocationInput>;

export const LostCatUncheckedUpdateManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutLocationInput>;

export const LostCatCreateManySexInputSchema: z.ZodType<Prisma.LostCatCreateManySexInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManySexInput>;

export const LostCatUpdateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutSexInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutSexInput>;

export const LostCatUncheckedUpdateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutSexInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutSexInput>;

export const LostCatUncheckedUpdateManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutSexInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutSexInput>;

export const LostCatCreateManyColorInputSchema: z.ZodType<Prisma.LostCatCreateManyColorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  catCityId: z.number().int(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManyColorInput>;

export const LostCatUpdateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutColorInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  cityLost: z.lazy(() => CityUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutColorInput>;

export const LostCatUncheckedUpdateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutColorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutColorInput>;

export const LostCatUncheckedUpdateManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutColorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catCityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutColorInput>;

export const OwnerCreateManyCityInputSchema: z.ZodType<Prisma.OwnerCreateManyCityInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email({ message: 'Email adres klopt niet' }),
  street: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  cellphone: z.string().optional().nullable(),
  comments: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.OwnerCreateManyCityInput>;

export const LostCatCreateManyCityLostInputSchema: z.ZodType<Prisma.LostCatCreateManyCityLostInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerId: z.number().int(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict() as z.ZodType<Prisma.LostCatCreateManyCityLostInput>;

export const OwnerUpdateWithoutCityInputSchema: z.ZodType<Prisma.OwnerUpdateWithoutCityInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lostCats: z.lazy(() => LostCatUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUpdateWithoutCityInput>;

export const OwnerUncheckedUpdateWithoutCityInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateWithoutCityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lostCats: z.lazy(() => LostCatUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateWithoutCityInput>;

export const OwnerUncheckedUpdateManyWithoutCityInputSchema: z.ZodType<Prisma.OwnerUncheckedUpdateManyWithoutCityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string().email({ message: 'Email adres klopt niet' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OwnerUncheckedUpdateManyWithoutCityInput>;

export const LostCatUpdateWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutCityLostInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  owner: z.lazy(() => OwnerUpdateOneRequiredWithoutLostCatsNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LostCatUpdateWithoutCityLostInput>;

export const LostCatUncheckedUpdateWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutCityLostInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateWithoutCityLostInput>;

export const LostCatUncheckedUpdateManyWithoutCityLostInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutCityLostInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutCityLostInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const RolesFindFirstArgsSchema: z.ZodType<Prisma.RolesFindFirstArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RolesFindFirstArgs>;

export const RolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolesFindFirstOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RolesFindFirstOrThrowArgs>;

export const RolesFindManyArgsSchema: z.ZodType<Prisma.RolesFindManyArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RolesFindManyArgs>;

export const RolesAggregateArgsSchema: z.ZodType<Prisma.RolesAggregateArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RolesAggregateArgs>;

export const RolesGroupByArgsSchema: z.ZodType<Prisma.RolesGroupByArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithAggregationInputSchema.array(),RolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: RolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RolesGroupByArgs>;

export const RolesFindUniqueArgsSchema: z.ZodType<Prisma.RolesFindUniqueArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RolesFindUniqueArgs>;

export const RolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolesFindUniqueOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RolesFindUniqueOrThrowArgs>;

export const OwnerFindFirstArgsSchema: z.ZodType<Prisma.OwnerFindFirstArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereInputSchema.optional(),
  orderBy: z.union([ OwnerOrderByWithRelationInputSchema.array(),OwnerOrderByWithRelationInputSchema ]).optional(),
  cursor: OwnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OwnerScalarFieldEnumSchema,OwnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerFindFirstArgs>;

export const OwnerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OwnerFindFirstOrThrowArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereInputSchema.optional(),
  orderBy: z.union([ OwnerOrderByWithRelationInputSchema.array(),OwnerOrderByWithRelationInputSchema ]).optional(),
  cursor: OwnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OwnerScalarFieldEnumSchema,OwnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerFindFirstOrThrowArgs>;

export const OwnerFindManyArgsSchema: z.ZodType<Prisma.OwnerFindManyArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereInputSchema.optional(),
  orderBy: z.union([ OwnerOrderByWithRelationInputSchema.array(),OwnerOrderByWithRelationInputSchema ]).optional(),
  cursor: OwnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OwnerScalarFieldEnumSchema,OwnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OwnerFindManyArgs>;

export const OwnerAggregateArgsSchema: z.ZodType<Prisma.OwnerAggregateArgs> = z.object({
  where: OwnerWhereInputSchema.optional(),
  orderBy: z.union([ OwnerOrderByWithRelationInputSchema.array(),OwnerOrderByWithRelationInputSchema ]).optional(),
  cursor: OwnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OwnerAggregateArgs>;

export const OwnerGroupByArgsSchema: z.ZodType<Prisma.OwnerGroupByArgs> = z.object({
  where: OwnerWhereInputSchema.optional(),
  orderBy: z.union([ OwnerOrderByWithAggregationInputSchema.array(),OwnerOrderByWithAggregationInputSchema ]).optional(),
  by: OwnerScalarFieldEnumSchema.array(),
  having: OwnerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OwnerGroupByArgs>;

export const OwnerFindUniqueArgsSchema: z.ZodType<Prisma.OwnerFindUniqueArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OwnerFindUniqueArgs>;

export const OwnerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OwnerFindUniqueOrThrowArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OwnerFindUniqueOrThrowArgs>;

export const LostCatFindFirstArgsSchema: z.ZodType<Prisma.LostCatFindFirstArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatFindFirstArgs>;

export const LostCatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LostCatFindFirstOrThrowArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatFindFirstOrThrowArgs>;

export const LostCatFindManyArgsSchema: z.ZodType<Prisma.LostCatFindManyArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LostCatFindManyArgs>;

export const LostCatAggregateArgsSchema: z.ZodType<Prisma.LostCatAggregateArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LostCatAggregateArgs>;

export const LostCatGroupByArgsSchema: z.ZodType<Prisma.LostCatGroupByArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithAggregationInputSchema.array(),LostCatOrderByWithAggregationInputSchema ]).optional(),
  by: LostCatScalarFieldEnumSchema.array(),
  having: LostCatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LostCatGroupByArgs>;

export const LostCatFindUniqueArgsSchema: z.ZodType<Prisma.LostCatFindUniqueArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LostCatFindUniqueArgs>;

export const LostCatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LostCatFindUniqueOrThrowArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LostCatFindUniqueOrThrowArgs>;

export const CatRaceFindFirstArgsSchema: z.ZodType<Prisma.CatRaceFindFirstArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceFindFirstArgs>;

export const CatRaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CatRaceFindFirstOrThrowArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceFindFirstOrThrowArgs>;

export const CatRaceFindManyArgsSchema: z.ZodType<Prisma.CatRaceFindManyArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CatRaceFindManyArgs>;

export const CatRaceAggregateArgsSchema: z.ZodType<Prisma.CatRaceAggregateArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CatRaceAggregateArgs>;

export const CatRaceGroupByArgsSchema: z.ZodType<Prisma.CatRaceGroupByArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithAggregationInputSchema.array(),CatRaceOrderByWithAggregationInputSchema ]).optional(),
  by: CatRaceScalarFieldEnumSchema.array(),
  having: CatRaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CatRaceGroupByArgs>;

export const CatRaceFindUniqueArgsSchema: z.ZodType<Prisma.CatRaceFindUniqueArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CatRaceFindUniqueArgs>;

export const CatRaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CatRaceFindUniqueOrThrowArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CatRaceFindUniqueOrThrowArgs>;

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LocationFindFirstArgs>;

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LocationFindFirstOrThrowArgs>;

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LocationFindManyArgs>;

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LocationAggregateArgs>;

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LocationGroupByArgs>;

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LocationFindUniqueArgs>;

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LocationFindUniqueOrThrowArgs>;

export const SexFindFirstArgsSchema: z.ZodType<Prisma.SexFindFirstArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SexFindFirstArgs>;

export const SexFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SexFindFirstOrThrowArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SexFindFirstOrThrowArgs>;

export const SexFindManyArgsSchema: z.ZodType<Prisma.SexFindManyArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SexFindManyArgs>;

export const SexAggregateArgsSchema: z.ZodType<Prisma.SexAggregateArgs> = z.object({
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SexAggregateArgs>;

export const SexGroupByArgsSchema: z.ZodType<Prisma.SexGroupByArgs> = z.object({
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithAggregationInputSchema.array(),SexOrderByWithAggregationInputSchema ]).optional(),
  by: SexScalarFieldEnumSchema.array(),
  having: SexScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SexGroupByArgs>;

export const SexFindUniqueArgsSchema: z.ZodType<Prisma.SexFindUniqueArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SexFindUniqueArgs>;

export const SexFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SexFindUniqueOrThrowArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SexFindUniqueOrThrowArgs>;

export const ColorFindFirstArgsSchema: z.ZodType<Prisma.ColorFindFirstArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ColorFindFirstArgs>;

export const ColorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColorFindFirstOrThrowArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ColorFindFirstOrThrowArgs>;

export const ColorFindManyArgsSchema: z.ZodType<Prisma.ColorFindManyArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ColorFindManyArgs>;

export const ColorAggregateArgsSchema: z.ZodType<Prisma.ColorAggregateArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ColorAggregateArgs>;

export const ColorGroupByArgsSchema: z.ZodType<Prisma.ColorGroupByArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithAggregationInputSchema.array(),ColorOrderByWithAggregationInputSchema ]).optional(),
  by: ColorScalarFieldEnumSchema.array(),
  having: ColorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ColorGroupByArgs>;

export const ColorFindUniqueArgsSchema: z.ZodType<Prisma.ColorFindUniqueArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ColorFindUniqueArgs>;

export const ColorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColorFindUniqueOrThrowArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ColorFindUniqueOrThrowArgs>;

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CityFindFirstArgs>;

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CityFindFirstOrThrowArgs>;

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CityFindManyArgs>;

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CityAggregateArgs>;

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(),CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(),
  having: CityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CityGroupByArgs>;

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CityFindUniqueArgs>;

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CityFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const RolesCreateArgsSchema: z.ZodType<Prisma.RolesCreateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.RolesCreateArgs>;

export const RolesUpsertArgsSchema: z.ZodType<Prisma.RolesUpsertArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
  create: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
  update: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.RolesUpsertArgs>;

export const RolesCreateManyArgsSchema: z.ZodType<Prisma.RolesCreateManyArgs> = z.object({
  data: z.union([ RolesCreateManyInputSchema,RolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.RolesCreateManyArgs>;

export const RolesDeleteArgsSchema: z.ZodType<Prisma.RolesDeleteArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RolesDeleteArgs>;

export const RolesUpdateArgsSchema: z.ZodType<Prisma.RolesUpdateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
  where: RolesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RolesUpdateArgs>;

export const RolesUpdateManyArgsSchema: z.ZodType<Prisma.RolesUpdateManyArgs> = z.object({
  data: z.union([ RolesUpdateManyMutationInputSchema,RolesUncheckedUpdateManyInputSchema ]),
  where: RolesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RolesUpdateManyArgs>;

export const RolesDeleteManyArgsSchema: z.ZodType<Prisma.RolesDeleteManyArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RolesDeleteManyArgs>;

export const OwnerCreateArgsSchema: z.ZodType<Prisma.OwnerCreateArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  data: z.union([ OwnerCreateInputSchema,OwnerUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.OwnerCreateArgs>;

export const OwnerUpsertArgsSchema: z.ZodType<Prisma.OwnerUpsertArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereUniqueInputSchema,
  create: z.union([ OwnerCreateInputSchema,OwnerUncheckedCreateInputSchema ]),
  update: z.union([ OwnerUpdateInputSchema,OwnerUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.OwnerUpsertArgs>;

export const OwnerCreateManyArgsSchema: z.ZodType<Prisma.OwnerCreateManyArgs> = z.object({
  data: z.union([ OwnerCreateManyInputSchema,OwnerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.OwnerCreateManyArgs>;

export const OwnerDeleteArgsSchema: z.ZodType<Prisma.OwnerDeleteArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  where: OwnerWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OwnerDeleteArgs>;

export const OwnerUpdateArgsSchema: z.ZodType<Prisma.OwnerUpdateArgs> = z.object({
  select: OwnerSelectSchema.optional(),
  include: OwnerIncludeSchema.optional(),
  data: z.union([ OwnerUpdateInputSchema,OwnerUncheckedUpdateInputSchema ]),
  where: OwnerWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OwnerUpdateArgs>;

export const OwnerUpdateManyArgsSchema: z.ZodType<Prisma.OwnerUpdateManyArgs> = z.object({
  data: z.union([ OwnerUpdateManyMutationInputSchema,OwnerUncheckedUpdateManyInputSchema ]),
  where: OwnerWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.OwnerUpdateManyArgs>;

export const OwnerDeleteManyArgsSchema: z.ZodType<Prisma.OwnerDeleteManyArgs> = z.object({
  where: OwnerWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.OwnerDeleteManyArgs>;

export const LostCatCreateArgsSchema: z.ZodType<Prisma.LostCatCreateArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  data: z.union([ LostCatCreateInputSchema,LostCatUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.LostCatCreateArgs>;

export const LostCatUpsertArgsSchema: z.ZodType<Prisma.LostCatUpsertArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
  create: z.union([ LostCatCreateInputSchema,LostCatUncheckedCreateInputSchema ]),
  update: z.union([ LostCatUpdateInputSchema,LostCatUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.LostCatUpsertArgs>;

export const LostCatCreateManyArgsSchema: z.ZodType<Prisma.LostCatCreateManyArgs> = z.object({
  data: z.union([ LostCatCreateManyInputSchema,LostCatCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.LostCatCreateManyArgs>;

export const LostCatDeleteArgsSchema: z.ZodType<Prisma.LostCatDeleteArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LostCatDeleteArgs>;

export const LostCatUpdateArgsSchema: z.ZodType<Prisma.LostCatUpdateArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  data: z.union([ LostCatUpdateInputSchema,LostCatUncheckedUpdateInputSchema ]),
  where: LostCatWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LostCatUpdateArgs>;

export const LostCatUpdateManyArgsSchema: z.ZodType<Prisma.LostCatUpdateManyArgs> = z.object({
  data: z.union([ LostCatUpdateManyMutationInputSchema,LostCatUncheckedUpdateManyInputSchema ]),
  where: LostCatWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.LostCatUpdateManyArgs>;

export const LostCatDeleteManyArgsSchema: z.ZodType<Prisma.LostCatDeleteManyArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.LostCatDeleteManyArgs>;

export const CatRaceCreateArgsSchema: z.ZodType<Prisma.CatRaceCreateArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  data: z.union([ CatRaceCreateInputSchema,CatRaceUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CatRaceCreateArgs>;

export const CatRaceUpsertArgsSchema: z.ZodType<Prisma.CatRaceUpsertArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
  create: z.union([ CatRaceCreateInputSchema,CatRaceUncheckedCreateInputSchema ]),
  update: z.union([ CatRaceUpdateInputSchema,CatRaceUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CatRaceUpsertArgs>;

export const CatRaceCreateManyArgsSchema: z.ZodType<Prisma.CatRaceCreateManyArgs> = z.object({
  data: z.union([ CatRaceCreateManyInputSchema,CatRaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CatRaceCreateManyArgs>;

export const CatRaceDeleteArgsSchema: z.ZodType<Prisma.CatRaceDeleteArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CatRaceDeleteArgs>;

export const CatRaceUpdateArgsSchema: z.ZodType<Prisma.CatRaceUpdateArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  data: z.union([ CatRaceUpdateInputSchema,CatRaceUncheckedUpdateInputSchema ]),
  where: CatRaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CatRaceUpdateArgs>;

export const CatRaceUpdateManyArgsSchema: z.ZodType<Prisma.CatRaceUpdateManyArgs> = z.object({
  data: z.union([ CatRaceUpdateManyMutationInputSchema,CatRaceUncheckedUpdateManyInputSchema ]),
  where: CatRaceWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CatRaceUpdateManyArgs>;

export const CatRaceDeleteManyArgsSchema: z.ZodType<Prisma.CatRaceDeleteManyArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CatRaceDeleteManyArgs>;

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.LocationCreateArgs>;

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.LocationUpsertArgs>;

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.LocationCreateManyArgs>;

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LocationDeleteArgs>;

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LocationUpdateArgs>;

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.LocationUpdateManyArgs>;

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.LocationDeleteManyArgs>;

export const SexCreateArgsSchema: z.ZodType<Prisma.SexCreateArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  data: z.union([ SexCreateInputSchema,SexUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.SexCreateArgs>;

export const SexUpsertArgsSchema: z.ZodType<Prisma.SexUpsertArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
  create: z.union([ SexCreateInputSchema,SexUncheckedCreateInputSchema ]),
  update: z.union([ SexUpdateInputSchema,SexUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.SexUpsertArgs>;

export const SexCreateManyArgsSchema: z.ZodType<Prisma.SexCreateManyArgs> = z.object({
  data: z.union([ SexCreateManyInputSchema,SexCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.SexCreateManyArgs>;

export const SexDeleteArgsSchema: z.ZodType<Prisma.SexDeleteArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SexDeleteArgs>;

export const SexUpdateArgsSchema: z.ZodType<Prisma.SexUpdateArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  data: z.union([ SexUpdateInputSchema,SexUncheckedUpdateInputSchema ]),
  where: SexWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SexUpdateArgs>;

export const SexUpdateManyArgsSchema: z.ZodType<Prisma.SexUpdateManyArgs> = z.object({
  data: z.union([ SexUpdateManyMutationInputSchema,SexUncheckedUpdateManyInputSchema ]),
  where: SexWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SexUpdateManyArgs>;

export const SexDeleteManyArgsSchema: z.ZodType<Prisma.SexDeleteManyArgs> = z.object({
  where: SexWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SexDeleteManyArgs>;

export const ColorCreateArgsSchema: z.ZodType<Prisma.ColorCreateArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  data: z.union([ ColorCreateInputSchema,ColorUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ColorCreateArgs>;

export const ColorUpsertArgsSchema: z.ZodType<Prisma.ColorUpsertArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
  create: z.union([ ColorCreateInputSchema,ColorUncheckedCreateInputSchema ]),
  update: z.union([ ColorUpdateInputSchema,ColorUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ColorUpsertArgs>;

export const ColorCreateManyArgsSchema: z.ZodType<Prisma.ColorCreateManyArgs> = z.object({
  data: z.union([ ColorCreateManyInputSchema,ColorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ColorCreateManyArgs>;

export const ColorDeleteArgsSchema: z.ZodType<Prisma.ColorDeleteArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ColorDeleteArgs>;

export const ColorUpdateArgsSchema: z.ZodType<Prisma.ColorUpdateArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  data: z.union([ ColorUpdateInputSchema,ColorUncheckedUpdateInputSchema ]),
  where: ColorWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ColorUpdateArgs>;

export const ColorUpdateManyArgsSchema: z.ZodType<Prisma.ColorUpdateManyArgs> = z.object({
  data: z.union([ ColorUpdateManyMutationInputSchema,ColorUncheckedUpdateManyInputSchema ]),
  where: ColorWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ColorUpdateManyArgs>;

export const ColorDeleteManyArgsSchema: z.ZodType<Prisma.ColorDeleteManyArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ColorDeleteManyArgs>;

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CityCreateArgs>;

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
  create: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CityUpsertArgs>;

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CityCreateManyArgs>;

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CityDeleteArgs>;

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CityUpdateArgs>;

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CityUpdateManyArgs>;

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CityDeleteManyArgs>;