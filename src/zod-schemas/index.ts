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

export const LostCatScalarFieldEnumSchema = z.enum(['id','name','raceId','sexId','castrated','colorId','age','dateLost','cityLost','description','photoUrl','chipped','chipNumber','collar','ownerName','ownerEmail','ownerStreet','ownerCity','ownerPhone','ownerCellphone','response','comments','rip','dateReported','locationId']);

export const CatRaceScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const LocationScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const SexScalarFieldEnumSchema = z.enum(['id','name','enabled']);

export const ColorScalarFieldEnumSchema = z.enum(['id','name','enabled']);

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
  cityLost: z.string().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).nullable(),
  chipped: z.boolean().nullable(),
  chipNumber: z.string().nullable(),
  collar: z.string().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().nullable(),
  ownerCellphone: z.string().nullable(),
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

// LOST CAT
//------------------------------------------------------

export const LostCatIncludeSchema: z.ZodType<Prisma.LostCatInclude> = z.object({
  race: z.union([z.boolean(),z.lazy(() => CatRaceArgsSchema)]).optional(),
  sex: z.union([z.boolean(),z.lazy(() => SexArgsSchema)]).optional(),
  color: z.union([z.boolean(),z.lazy(() => ColorArgsSchema)]).optional(),
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
  cityLost: z.boolean().optional(),
  description: z.boolean().optional(),
  photoUrl: z.boolean().optional(),
  chipped: z.boolean().optional(),
  chipNumber: z.boolean().optional(),
  collar: z.boolean().optional(),
  ownerName: z.boolean().optional(),
  ownerEmail: z.boolean().optional(),
  ownerStreet: z.boolean().optional(),
  ownerCity: z.boolean().optional(),
  ownerPhone: z.boolean().optional(),
  ownerCellphone: z.boolean().optional(),
  response: z.boolean().optional(),
  comments: z.boolean().optional(),
  rip: z.boolean().optional(),
  dateReported: z.boolean().optional(),
  locationId: z.boolean().optional(),
  race: z.union([z.boolean(),z.lazy(() => CatRaceArgsSchema)]).optional(),
  sex: z.union([z.boolean(),z.lazy(() => SexArgsSchema)]).optional(),
  color: z.union([z.boolean(),z.lazy(() => ColorArgsSchema)]).optional(),
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
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RolesOrderByWithRelationInputSchema).optional()
}).strict();

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
}).strict());

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
}).strict();

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
}).strict();

export const RolesWhereInputSchema: z.ZodType<Prisma.RolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const RolesOrderByWithRelationInputSchema: z.ZodType<Prisma.RolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

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
}).strict());

export const RolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolesSumOrderByAggregateInputSchema).optional()
}).strict();

export const RolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

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
  cityLost: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerStreet: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerCity: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  race: z.union([ z.lazy(() => CatRaceRelationFilterSchema),z.lazy(() => CatRaceWhereInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SexRelationFilterSchema),z.lazy(() => SexWhereInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => ColorRelationFilterSchema),z.lazy(() => ColorWhereInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatOrderByWithRelationInputSchema: z.ZodType<Prisma.LostCatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  cityLost: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipped: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  collar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerName: z.lazy(() => SortOrderSchema).optional(),
  ownerEmail: z.lazy(() => SortOrderSchema).optional(),
  ownerStreet: z.lazy(() => SortOrderSchema).optional(),
  ownerCity: z.lazy(() => SortOrderSchema).optional(),
  ownerPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerCellphone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  response: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rip: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceOrderByWithRelationInputSchema).optional(),
  sex: z.lazy(() => SexOrderByWithRelationInputSchema).optional(),
  color: z.lazy(() => ColorOrderByWithRelationInputSchema).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional()
}).strict();

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
  cityLost: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }) ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().min(1, { message: "Gelieve een foto te uploaden" }) ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerName: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }) ]).optional(),
  ownerEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerStreet: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerCity: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }) ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().gte(1, { message: "Gelieve een locatie te kiezen" }) ]).optional().nullable(),
  race: z.union([ z.lazy(() => CatRaceRelationFilterSchema),z.lazy(() => CatRaceWhereInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SexRelationFilterSchema),z.lazy(() => SexWhereInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => ColorRelationFilterSchema),z.lazy(() => ColorWhereInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
}).strict());

export const LostCatOrderByWithAggregationInputSchema: z.ZodType<Prisma.LostCatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  cityLost: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipped: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chipNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  collar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerName: z.lazy(() => SortOrderSchema).optional(),
  ownerEmail: z.lazy(() => SortOrderSchema).optional(),
  ownerStreet: z.lazy(() => SortOrderSchema).optional(),
  ownerCity: z.lazy(() => SortOrderSchema).optional(),
  ownerPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerCellphone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
}).strict();

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
  cityLost: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerEmail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerStreet: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerCity: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerPhone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerCellphone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  response: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const CatRaceWhereInputSchema: z.ZodType<Prisma.CatRaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatRaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatRaceWhereInputSchema),z.lazy(() => CatRaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict();

export const CatRaceOrderByWithRelationInputSchema: z.ZodType<Prisma.CatRaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict();

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
}).strict());

export const CatRaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.CatRaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CatRaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CatRaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CatRaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CatRaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CatRaceSumOrderByAggregateInputSchema).optional()
}).strict();

export const CatRaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CatRaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema),z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema),z.lazy(() => CatRaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict();

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
}).strict());

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const SexWhereInputSchema: z.ZodType<Prisma.SexWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SexWhereInputSchema),z.lazy(() => SexWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict();

export const SexOrderByWithRelationInputSchema: z.ZodType<Prisma.SexOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict();

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
}).strict());

export const SexOrderByWithAggregationInputSchema: z.ZodType<Prisma.SexOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SexCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SexAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SexMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SexMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SexSumOrderByAggregateInputSchema).optional()
}).strict();

export const SexScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SexScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SexScalarWhereWithAggregatesInputSchema),z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SexScalarWhereWithAggregatesInputSchema),z.lazy(() => SexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ColorWhereInputSchema: z.ZodType<Prisma.ColorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColorWhereInputSchema),z.lazy(() => ColorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  LostCat: z.lazy(() => LostCatListRelationFilterSchema).optional()
}).strict();

export const ColorOrderByWithRelationInputSchema: z.ZodType<Prisma.ColorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  LostCat: z.lazy(() => LostCatOrderByRelationAggregateInputSchema).optional()
}).strict();

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
}).strict());

export const ColorOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ColorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ColorSumOrderByAggregateInputSchema).optional()
}).strict();

export const ColorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColorScalarWhereWithAggregatesInputSchema),z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColorScalarWhereWithAggregatesInputSchema),z.lazy(() => ColorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RolesCreateNestedOneWithoutUserInputSchema)
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roleId: z.number().int()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RolesUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roleId: z.number().int()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesCreateInputSchema: z.ZodType<Prisma.RolesCreateInput> = z.object({
  name: z.string(),
  User: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RolesUncheckedCreateInputSchema: z.ZodType<Prisma.RolesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RolesUpdateInputSchema: z.ZodType<Prisma.RolesUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RolesCreateManyInputSchema: z.ZodType<Prisma.RolesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const RolesUpdateManyMutationInputSchema: z.ZodType<Prisma.RolesUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatCreateInputSchema: z.ZodType<Prisma.LostCatCreateInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict();

export const LostCatUncheckedCreateInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatUpdateInputSchema: z.ZodType<Prisma.LostCatUpdateInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict();

export const LostCatUncheckedUpdateInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatCreateManyInputSchema: z.ZodType<Prisma.LostCatCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatUpdateManyMutationInputSchema: z.ZodType<Prisma.LostCatUpdateManyMutationInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CatRaceCreateInputSchema: z.ZodType<Prisma.CatRaceCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutRaceInputSchema).optional()
}).strict();

export const CatRaceUncheckedCreateInputSchema: z.ZodType<Prisma.CatRaceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutRaceInputSchema).optional()
}).strict();

export const CatRaceUpdateInputSchema: z.ZodType<Prisma.CatRaceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict();

export const CatRaceUncheckedUpdateInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict();

export const CatRaceCreateManyInputSchema: z.ZodType<Prisma.CatRaceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const CatRaceUpdateManyMutationInputSchema: z.ZodType<Prisma.CatRaceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CatRaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SexCreateInputSchema: z.ZodType<Prisma.SexCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutSexInputSchema).optional()
}).strict();

export const SexUncheckedCreateInputSchema: z.ZodType<Prisma.SexUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutSexInputSchema).optional()
}).strict();

export const SexUpdateInputSchema: z.ZodType<Prisma.SexUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutSexNestedInputSchema).optional()
}).strict();

export const SexUncheckedUpdateInputSchema: z.ZodType<Prisma.SexUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutSexNestedInputSchema).optional()
}).strict();

export const SexCreateManyInputSchema: z.ZodType<Prisma.SexCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const SexUpdateManyMutationInputSchema: z.ZodType<Prisma.SexUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SexUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SexUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColorCreateInputSchema: z.ZodType<Prisma.ColorCreateInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatCreateNestedManyWithoutColorInputSchema).optional()
}).strict();

export const ColorUncheckedCreateInputSchema: z.ZodType<Prisma.ColorUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional(),
  LostCat: z.lazy(() => LostCatUncheckedCreateNestedManyWithoutColorInputSchema).optional()
}).strict();

export const ColorUpdateInputSchema: z.ZodType<Prisma.ColorUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUpdateManyWithoutColorNestedInputSchema).optional()
}).strict();

export const ColorUncheckedUpdateInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  LostCat: z.lazy(() => LostCatUncheckedUpdateManyWithoutColorNestedInputSchema).optional()
}).strict();

export const ColorCreateManyInputSchema: z.ZodType<Prisma.ColorCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const ColorUpdateManyMutationInputSchema: z.ZodType<Prisma.ColorUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

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
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const RolesRelationFilterSchema: z.ZodType<Prisma.RolesRelationFilter> = z.object({
  is: z.lazy(() => RolesWhereInputSchema).optional(),
  isNot: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  userAuthToken: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

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
}).strict();

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
}).strict();

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
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

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
}).strict();

export const CatRaceRelationFilterSchema: z.ZodType<Prisma.CatRaceRelationFilter> = z.object({
  is: z.lazy(() => CatRaceWhereInputSchema).optional(),
  isNot: z.lazy(() => CatRaceWhereInputSchema).optional()
}).strict();

export const SexRelationFilterSchema: z.ZodType<Prisma.SexRelationFilter> = z.object({
  is: z.lazy(() => SexWhereInputSchema).optional(),
  isNot: z.lazy(() => SexWhereInputSchema).optional()
}).strict();

export const ColorRelationFilterSchema: z.ZodType<Prisma.ColorRelationFilter> = z.object({
  is: z.lazy(() => ColorWhereInputSchema).optional(),
  isNot: z.lazy(() => ColorWhereInputSchema).optional()
}).strict();

export const LocationNullableRelationFilterSchema: z.ZodType<Prisma.LocationNullableRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const LostCatCountOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  cityLost: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerName: z.lazy(() => SortOrderSchema).optional(),
  ownerEmail: z.lazy(() => SortOrderSchema).optional(),
  ownerStreet: z.lazy(() => SortOrderSchema).optional(),
  ownerCity: z.lazy(() => SortOrderSchema).optional(),
  ownerPhone: z.lazy(() => SortOrderSchema).optional(),
  ownerCellphone: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LostCatAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LostCatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  cityLost: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerName: z.lazy(() => SortOrderSchema).optional(),
  ownerEmail: z.lazy(() => SortOrderSchema).optional(),
  ownerStreet: z.lazy(() => SortOrderSchema).optional(),
  ownerCity: z.lazy(() => SortOrderSchema).optional(),
  ownerPhone: z.lazy(() => SortOrderSchema).optional(),
  ownerCellphone: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LostCatMinOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  castrated: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  dateLost: z.lazy(() => SortOrderSchema).optional(),
  cityLost: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  chipped: z.lazy(() => SortOrderSchema).optional(),
  chipNumber: z.lazy(() => SortOrderSchema).optional(),
  collar: z.lazy(() => SortOrderSchema).optional(),
  ownerName: z.lazy(() => SortOrderSchema).optional(),
  ownerEmail: z.lazy(() => SortOrderSchema).optional(),
  ownerStreet: z.lazy(() => SortOrderSchema).optional(),
  ownerCity: z.lazy(() => SortOrderSchema).optional(),
  ownerPhone: z.lazy(() => SortOrderSchema).optional(),
  ownerCellphone: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  rip: z.lazy(() => SortOrderSchema).optional(),
  dateReported: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LostCatSumOrderByAggregateInputSchema: z.ZodType<Prisma.LostCatSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  sexId: z.lazy(() => SortOrderSchema).optional(),
  colorId: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

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
}).strict();

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
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const LostCatListRelationFilterSchema: z.ZodType<Prisma.LostCatListRelationFilter> = z.object({
  every: z.lazy(() => LostCatWhereInputSchema).optional(),
  some: z.lazy(() => LostCatWhereInputSchema).optional(),
  none: z.lazy(() => LostCatWhereInputSchema).optional()
}).strict();

export const LostCatOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LostCatOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatRaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatRaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatRaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatRaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatRaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.CatRaceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SexCountOrderByAggregateInputSchema: z.ZodType<Prisma.SexCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SexAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SexAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SexMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SexMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SexMinOrderByAggregateInputSchema: z.ZodType<Prisma.SexMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SexSumOrderByAggregateInputSchema: z.ZodType<Prisma.SexSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColorCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColorAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColorMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColorSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColorSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const RolesUpdateOneRequiredWithoutUserNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

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
}).strict();

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
}).strict();

export const CatRaceCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatRaceCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => CatRaceWhereUniqueInputSchema).optional()
}).strict();

export const SexCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SexCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => SexWhereUniqueInputSchema).optional()
}).strict();

export const ColorCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColorCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => ColorWhereUniqueInputSchema).optional()
}).strict();

export const LocationCreateNestedOneWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutLostCatInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.CatRaceUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatRaceCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => CatRaceUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => CatRaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CatRaceUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict();

export const SexUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.SexUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SexCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => SexUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => SexWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SexUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict();

export const ColorUpdateOneRequiredWithoutLostCatNestedInputSchema: z.ZodType<Prisma.ColorUpdateOneRequiredWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColorCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => ColorUpsertWithoutLostCatInputSchema).optional(),
  connect: z.lazy(() => ColorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColorUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict();

export const LocationUpdateOneWithoutLostCatNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneWithoutLostCatNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutLostCatInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutLostCatInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateToOneWithWhereWithoutLostCatInputSchema),z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]).optional(),
}).strict();

export const LostCatCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LostCatUncheckedCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatCreateWithoutRaceInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

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
}).strict();

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
}).strict();

export const LostCatCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LostCatUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatCreateWithoutLocationInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

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
}).strict();

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
}).strict();

export const LostCatCreateNestedManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutSexInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LostCatUncheckedCreateNestedManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutSexInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatCreateWithoutSexInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutSexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManySexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

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
}).strict();

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
}).strict();

export const LostCatCreateNestedManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateNestedManyWithoutColorInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LostCatUncheckedCreateNestedManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateNestedManyWithoutColorInput> = z.object({
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatCreateWithoutColorInputSchema).array(),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema),z.lazy(() => LostCatCreateOrConnectWithoutColorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LostCatCreateManyColorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LostCatWhereUniqueInputSchema),z.lazy(() => LostCatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

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
}).strict();

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
}).strict();

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
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

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
}).strict();

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
}).strict();

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
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

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
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

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
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

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
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const RolesCreateWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateWithoutUserInput> = z.object({
  name: z.string()
}).strict();

export const RolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const RolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RolesUpsertWithoutUserInputSchema: z.ZodType<Prisma.RolesUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolesUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUserInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateWithoutRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyRoleInputSchema),z.lazy(() => UserCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

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
}).strict();

export const CatRaceCreateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const CatRaceUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const CatRaceCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => CatRaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict();

export const SexCreateWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const SexUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const SexCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.SexCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => SexWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict();

export const ColorCreateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const ColorUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const ColorCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.ColorCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => ColorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict();

export const LocationCreateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateWithoutLostCatInput> = z.object({
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const LocationUncheckedCreateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutLostCatInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  enabled: z.boolean().optional()
}).strict();

export const LocationCreateOrConnectWithoutLostCatInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutLostCatInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]),
}).strict();

export const CatRaceUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => CatRaceCreateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => CatRaceWhereInputSchema).optional()
}).strict();

export const CatRaceUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => CatRaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CatRaceUpdateWithoutLostCatInputSchema),z.lazy(() => CatRaceUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict();

export const CatRaceUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CatRaceUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.CatRaceUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SexUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => SexCreateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => SexWhereInputSchema).optional()
}).strict();

export const SexUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => SexWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SexUpdateWithoutLostCatInputSchema),z.lazy(() => SexUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict();

export const SexUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SexUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.SexUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColorUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => ColorCreateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => ColorWhereInputSchema).optional()
}).strict();

export const ColorUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => ColorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColorUpdateWithoutLostCatInputSchema),z.lazy(() => ColorUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict();

export const ColorUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColorUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.ColorUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUpsertWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpsertWithoutLostCatInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedCreateWithoutLostCatInputSchema) ]),
  where: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const LocationUpdateToOneWithWhereWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpdateToOneWithWhereWithoutLostCatInput> = z.object({
  where: z.lazy(() => LocationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LocationUpdateWithoutLostCatInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutLostCatInputSchema) ]),
}).strict();

export const LocationUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUpdateWithoutLostCatInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateWithoutLostCatInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutLostCatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatCreateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateWithoutRaceInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict();

export const LostCatUncheckedCreateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutRaceInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatCreateOrConnectWithoutRaceInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema) ]),
}).strict();

export const LostCatCreateManyRaceInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyRaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyRaceInputSchema),z.lazy(() => LostCatCreateManyRaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LostCatUpsertWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutRaceInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutRaceInputSchema) ]),
}).strict();

export const LostCatUpdateWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutRaceInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutRaceInputSchema) ]),
}).strict();

export const LostCatUpdateManyWithWhereWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutRaceInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutRaceInputSchema) ]),
}).strict();

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
  cityLost: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chipped: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chipNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  collar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerStreet: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerCity: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerCellphone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rip: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  dateReported: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const LostCatCreateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateWithoutLocationInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema)
}).strict();

export const LostCatUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" })
}).strict();

export const LostCatCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const LostCatCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyLocationInputSchema),z.lazy(() => LostCatCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LostCatUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const LostCatUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutLocationInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const LostCatUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutLocationInputSchema) ]),
}).strict();

export const LostCatCreateWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateWithoutSexInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  color: z.lazy(() => ColorCreateNestedOneWithoutLostCatInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict();

export const LostCatUncheckedCreateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutSexInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatCreateOrConnectWithoutSexInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema) ]),
}).strict();

export const LostCatCreateManySexInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManySexInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManySexInputSchema),z.lazy(() => LostCatCreateManySexInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LostCatUpsertWithWhereUniqueWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutSexInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutSexInputSchema) ]),
}).strict();

export const LostCatUpdateWithWhereUniqueWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutSexInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutSexInputSchema) ]),
}).strict();

export const LostCatUpdateManyWithWhereWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutSexInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutSexInputSchema) ]),
}).strict();

export const LostCatCreateWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateWithoutColorInput> = z.object({
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  race: z.lazy(() => CatRaceCreateNestedOneWithoutLostCatInputSchema),
  sex: z.lazy(() => SexCreateNestedOneWithoutLostCatInputSchema),
  location: z.lazy(() => LocationCreateNestedOneWithoutLostCatInputSchema).optional()
}).strict();

export const LostCatUncheckedCreateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedCreateWithoutColorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatCreateOrConnectWithoutColorInputSchema: z.ZodType<Prisma.LostCatCreateOrConnectWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema) ]),
}).strict();

export const LostCatCreateManyColorInputEnvelopeSchema: z.ZodType<Prisma.LostCatCreateManyColorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LostCatCreateManyColorInputSchema),z.lazy(() => LostCatCreateManyColorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LostCatUpsertWithWhereUniqueWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpsertWithWhereUniqueWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LostCatUpdateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutColorInputSchema) ]),
  create: z.union([ z.lazy(() => LostCatCreateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedCreateWithoutColorInputSchema) ]),
}).strict();

export const LostCatUpdateWithWhereUniqueWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateWithWhereUniqueWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateWithoutColorInputSchema),z.lazy(() => LostCatUncheckedUpdateWithoutColorInputSchema) ]),
}).strict();

export const LostCatUpdateManyWithWhereWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateManyWithWhereWithoutColorInput> = z.object({
  where: z.lazy(() => LostCatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LostCatUpdateManyMutationInputSchema),z.lazy(() => LostCatUncheckedUpdateManyWithoutColorInputSchema) ]),
}).strict();

export const UserCreateManyRoleInputSchema: z.ZodType<Prisma.UserCreateManyRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  userAuthToken: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAuthToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatCreateManyRaceInputSchema: z.ZodType<Prisma.LostCatCreateManyRaceInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatUpdateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutRaceInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict();

export const LostCatUncheckedUpdateWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatUncheckedUpdateManyWithoutRaceInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatCreateManyLocationInputSchema: z.ZodType<Prisma.LostCatCreateManyLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" })
}).strict();

export const LostCatUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutLocationInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional()
}).strict();

export const LostCatUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatUncheckedUpdateManyWithoutLocationInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LostCatCreateManySexInputSchema: z.ZodType<Prisma.LostCatCreateManySexInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  colorId: z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatUpdateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutSexInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  color: z.lazy(() => ColorUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict();

export const LostCatUncheckedUpdateWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutSexInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatUncheckedUpdateManyWithoutSexInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutSexInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorId: z.union([ z.number().gte(1, { message: "Gelieve een kleur te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatCreateManyColorInputSchema: z.ZodType<Prisma.LostCatCreateManyColorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),
  raceId: z.number().gte(1, { message: "Gelieve een ras te kiezen" }),
  sexId: z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),
  castrated: z.boolean().optional().nullable(),
  age: z.number().int().optional().nullable(),
  dateLost: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  cityLost: z.string().optional().nullable(),
  description: z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),
  photoUrl: z.string().min(1, { message: "Gelieve een foto te uploaden" }).optional().nullable(),
  chipped: z.boolean().optional().nullable(),
  chipNumber: z.string().optional().nullable(),
  collar: z.string().optional().nullable(),
  ownerName: z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),
  ownerEmail: z.string(),
  ownerStreet: z.string(),
  ownerCity: z.string(),
  ownerPhone: z.string().optional().nullable(),
  ownerCellphone: z.string().optional().nullable(),
  response: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  rip: z.boolean().optional().nullable(),
  dateReported: z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),
  locationId: z.number().gte(1, { message: "Gelieve een locatie te kiezen" }).optional().nullable()
}).strict();

export const LostCatUpdateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUpdateWithoutColorInput> = z.object({
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  race: z.lazy(() => CatRaceUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  sex: z.lazy(() => SexUpdateOneRequiredWithoutLostCatNestedInputSchema).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutLostCatNestedInputSchema).optional()
}).strict();

export const LostCatUncheckedUpdateWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateWithoutColorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LostCatUncheckedUpdateManyWithoutColorInputSchema: z.ZodType<Prisma.LostCatUncheckedUpdateManyWithoutColorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Gelieve een valide naam in te geven" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().gte(1, { message: "Gelieve een ras te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sexId: z.union([ z.number().gte(1, { message: "Gelieve een geslacht te kiezen" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  castrated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateLost: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityLost: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string().min(1, { message: "Gelieve een omschrijving in te geven" }).max(999, { message: "Deze omschrijving is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  photoUrl: z.union([ z.string().min(1, { message: "Gelieve een foto te uploaden" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipped: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chipNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  collar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerName: z.union([ z.string().min(1, { message: "Gelieve een naam in te geven voor het baasje" }).max(99, { message: "Deze naam is te lang!" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerStreet: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerCity: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerCellphone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rip: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateReported: z.union([ z.coerce.date({ required_error: "Gelieve een correcte datum te kiezen", invalid_type_error: "Gelieve een correcte datum te kiezen!" }),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().gte(1, { message: "Gelieve een locatie te kiezen" }),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

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
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const RolesFindFirstArgsSchema: z.ZodType<Prisma.RolesFindFirstArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolesFindFirstOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesFindManyArgsSchema: z.ZodType<Prisma.RolesFindManyArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesAggregateArgsSchema: z.ZodType<Prisma.RolesAggregateArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolesGroupByArgsSchema: z.ZodType<Prisma.RolesGroupByArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithAggregationInputSchema.array(),RolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: RolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolesFindUniqueArgsSchema: z.ZodType<Prisma.RolesFindUniqueArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolesFindUniqueOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const LostCatFindFirstArgsSchema: z.ZodType<Prisma.LostCatFindFirstArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LostCatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LostCatFindFirstOrThrowArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LostCatFindManyArgsSchema: z.ZodType<Prisma.LostCatFindManyArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LostCatScalarFieldEnumSchema,LostCatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LostCatAggregateArgsSchema: z.ZodType<Prisma.LostCatAggregateArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithRelationInputSchema.array(),LostCatOrderByWithRelationInputSchema ]).optional(),
  cursor: LostCatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LostCatGroupByArgsSchema: z.ZodType<Prisma.LostCatGroupByArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
  orderBy: z.union([ LostCatOrderByWithAggregationInputSchema.array(),LostCatOrderByWithAggregationInputSchema ]).optional(),
  by: LostCatScalarFieldEnumSchema.array(),
  having: LostCatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LostCatFindUniqueArgsSchema: z.ZodType<Prisma.LostCatFindUniqueArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() ;

export const LostCatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LostCatFindUniqueOrThrowArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() ;

export const CatRaceFindFirstArgsSchema: z.ZodType<Prisma.CatRaceFindFirstArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatRaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CatRaceFindFirstOrThrowArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatRaceFindManyArgsSchema: z.ZodType<Prisma.CatRaceFindManyArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatRaceScalarFieldEnumSchema,CatRaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatRaceAggregateArgsSchema: z.ZodType<Prisma.CatRaceAggregateArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithRelationInputSchema.array(),CatRaceOrderByWithRelationInputSchema ]).optional(),
  cursor: CatRaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CatRaceGroupByArgsSchema: z.ZodType<Prisma.CatRaceGroupByArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
  orderBy: z.union([ CatRaceOrderByWithAggregationInputSchema.array(),CatRaceOrderByWithAggregationInputSchema ]).optional(),
  by: CatRaceScalarFieldEnumSchema.array(),
  having: CatRaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CatRaceFindUniqueArgsSchema: z.ZodType<Prisma.CatRaceFindUniqueArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() ;

export const CatRaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CatRaceFindUniqueOrThrowArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() ;

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const SexFindFirstArgsSchema: z.ZodType<Prisma.SexFindFirstArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SexFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SexFindFirstOrThrowArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SexFindManyArgsSchema: z.ZodType<Prisma.SexFindManyArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SexScalarFieldEnumSchema,SexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SexAggregateArgsSchema: z.ZodType<Prisma.SexAggregateArgs> = z.object({
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithRelationInputSchema.array(),SexOrderByWithRelationInputSchema ]).optional(),
  cursor: SexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SexGroupByArgsSchema: z.ZodType<Prisma.SexGroupByArgs> = z.object({
  where: SexWhereInputSchema.optional(),
  orderBy: z.union([ SexOrderByWithAggregationInputSchema.array(),SexOrderByWithAggregationInputSchema ]).optional(),
  by: SexScalarFieldEnumSchema.array(),
  having: SexScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SexFindUniqueArgsSchema: z.ZodType<Prisma.SexFindUniqueArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() ;

export const SexFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SexFindUniqueOrThrowArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() ;

export const ColorFindFirstArgsSchema: z.ZodType<Prisma.ColorFindFirstArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColorFindFirstOrThrowArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColorFindManyArgsSchema: z.ZodType<Prisma.ColorFindManyArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColorScalarFieldEnumSchema,ColorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColorAggregateArgsSchema: z.ZodType<Prisma.ColorAggregateArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithRelationInputSchema.array(),ColorOrderByWithRelationInputSchema ]).optional(),
  cursor: ColorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColorGroupByArgsSchema: z.ZodType<Prisma.ColorGroupByArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
  orderBy: z.union([ ColorOrderByWithAggregationInputSchema.array(),ColorOrderByWithAggregationInputSchema ]).optional(),
  by: ColorScalarFieldEnumSchema.array(),
  having: ColorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColorFindUniqueArgsSchema: z.ZodType<Prisma.ColorFindUniqueArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() ;

export const ColorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColorFindUniqueOrThrowArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const RolesCreateArgsSchema: z.ZodType<Prisma.RolesCreateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
}).strict() ;

export const RolesUpsertArgsSchema: z.ZodType<Prisma.RolesUpsertArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
  create: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
  update: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolesCreateManyArgsSchema: z.ZodType<Prisma.RolesCreateManyArgs> = z.object({
  data: z.union([ RolesCreateManyInputSchema,RolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RolesDeleteArgsSchema: z.ZodType<Prisma.RolesDeleteArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesUpdateArgsSchema: z.ZodType<Prisma.RolesUpdateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesUpdateManyArgsSchema: z.ZodType<Prisma.RolesUpdateManyArgs> = z.object({
  data: z.union([ RolesUpdateManyMutationInputSchema,RolesUncheckedUpdateManyInputSchema ]),
  where: RolesWhereInputSchema.optional(),
}).strict() ;

export const RolesDeleteManyArgsSchema: z.ZodType<Prisma.RolesDeleteManyArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
}).strict() ;

export const LostCatCreateArgsSchema: z.ZodType<Prisma.LostCatCreateArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  data: z.union([ LostCatCreateInputSchema,LostCatUncheckedCreateInputSchema ]),
}).strict() ;

export const LostCatUpsertArgsSchema: z.ZodType<Prisma.LostCatUpsertArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
  create: z.union([ LostCatCreateInputSchema,LostCatUncheckedCreateInputSchema ]),
  update: z.union([ LostCatUpdateInputSchema,LostCatUncheckedUpdateInputSchema ]),
}).strict() ;

export const LostCatCreateManyArgsSchema: z.ZodType<Prisma.LostCatCreateManyArgs> = z.object({
  data: z.union([ LostCatCreateManyInputSchema,LostCatCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LostCatDeleteArgsSchema: z.ZodType<Prisma.LostCatDeleteArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  where: LostCatWhereUniqueInputSchema,
}).strict() ;

export const LostCatUpdateArgsSchema: z.ZodType<Prisma.LostCatUpdateArgs> = z.object({
  select: LostCatSelectSchema.optional(),
  include: LostCatIncludeSchema.optional(),
  data: z.union([ LostCatUpdateInputSchema,LostCatUncheckedUpdateInputSchema ]),
  where: LostCatWhereUniqueInputSchema,
}).strict() ;

export const LostCatUpdateManyArgsSchema: z.ZodType<Prisma.LostCatUpdateManyArgs> = z.object({
  data: z.union([ LostCatUpdateManyMutationInputSchema,LostCatUncheckedUpdateManyInputSchema ]),
  where: LostCatWhereInputSchema.optional(),
}).strict() ;

export const LostCatDeleteManyArgsSchema: z.ZodType<Prisma.LostCatDeleteManyArgs> = z.object({
  where: LostCatWhereInputSchema.optional(),
}).strict() ;

export const CatRaceCreateArgsSchema: z.ZodType<Prisma.CatRaceCreateArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  data: z.union([ CatRaceCreateInputSchema,CatRaceUncheckedCreateInputSchema ]),
}).strict() ;

export const CatRaceUpsertArgsSchema: z.ZodType<Prisma.CatRaceUpsertArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
  create: z.union([ CatRaceCreateInputSchema,CatRaceUncheckedCreateInputSchema ]),
  update: z.union([ CatRaceUpdateInputSchema,CatRaceUncheckedUpdateInputSchema ]),
}).strict() ;

export const CatRaceCreateManyArgsSchema: z.ZodType<Prisma.CatRaceCreateManyArgs> = z.object({
  data: z.union([ CatRaceCreateManyInputSchema,CatRaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CatRaceDeleteArgsSchema: z.ZodType<Prisma.CatRaceDeleteArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  where: CatRaceWhereUniqueInputSchema,
}).strict() ;

export const CatRaceUpdateArgsSchema: z.ZodType<Prisma.CatRaceUpdateArgs> = z.object({
  select: CatRaceSelectSchema.optional(),
  include: CatRaceIncludeSchema.optional(),
  data: z.union([ CatRaceUpdateInputSchema,CatRaceUncheckedUpdateInputSchema ]),
  where: CatRaceWhereUniqueInputSchema,
}).strict() ;

export const CatRaceUpdateManyArgsSchema: z.ZodType<Prisma.CatRaceUpdateManyArgs> = z.object({
  data: z.union([ CatRaceUpdateManyMutationInputSchema,CatRaceUncheckedUpdateManyInputSchema ]),
  where: CatRaceWhereInputSchema.optional(),
}).strict() ;

export const CatRaceDeleteManyArgsSchema: z.ZodType<Prisma.CatRaceDeleteManyArgs> = z.object({
  where: CatRaceWhereInputSchema.optional(),
}).strict() ;

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict() ;

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict() ;

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const SexCreateArgsSchema: z.ZodType<Prisma.SexCreateArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  data: z.union([ SexCreateInputSchema,SexUncheckedCreateInputSchema ]),
}).strict() ;

export const SexUpsertArgsSchema: z.ZodType<Prisma.SexUpsertArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
  create: z.union([ SexCreateInputSchema,SexUncheckedCreateInputSchema ]),
  update: z.union([ SexUpdateInputSchema,SexUncheckedUpdateInputSchema ]),
}).strict() ;

export const SexCreateManyArgsSchema: z.ZodType<Prisma.SexCreateManyArgs> = z.object({
  data: z.union([ SexCreateManyInputSchema,SexCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SexDeleteArgsSchema: z.ZodType<Prisma.SexDeleteArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  where: SexWhereUniqueInputSchema,
}).strict() ;

export const SexUpdateArgsSchema: z.ZodType<Prisma.SexUpdateArgs> = z.object({
  select: SexSelectSchema.optional(),
  include: SexIncludeSchema.optional(),
  data: z.union([ SexUpdateInputSchema,SexUncheckedUpdateInputSchema ]),
  where: SexWhereUniqueInputSchema,
}).strict() ;

export const SexUpdateManyArgsSchema: z.ZodType<Prisma.SexUpdateManyArgs> = z.object({
  data: z.union([ SexUpdateManyMutationInputSchema,SexUncheckedUpdateManyInputSchema ]),
  where: SexWhereInputSchema.optional(),
}).strict() ;

export const SexDeleteManyArgsSchema: z.ZodType<Prisma.SexDeleteManyArgs> = z.object({
  where: SexWhereInputSchema.optional(),
}).strict() ;

export const ColorCreateArgsSchema: z.ZodType<Prisma.ColorCreateArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  data: z.union([ ColorCreateInputSchema,ColorUncheckedCreateInputSchema ]),
}).strict() ;

export const ColorUpsertArgsSchema: z.ZodType<Prisma.ColorUpsertArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
  create: z.union([ ColorCreateInputSchema,ColorUncheckedCreateInputSchema ]),
  update: z.union([ ColorUpdateInputSchema,ColorUncheckedUpdateInputSchema ]),
}).strict() ;

export const ColorCreateManyArgsSchema: z.ZodType<Prisma.ColorCreateManyArgs> = z.object({
  data: z.union([ ColorCreateManyInputSchema,ColorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ColorDeleteArgsSchema: z.ZodType<Prisma.ColorDeleteArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  where: ColorWhereUniqueInputSchema,
}).strict() ;

export const ColorUpdateArgsSchema: z.ZodType<Prisma.ColorUpdateArgs> = z.object({
  select: ColorSelectSchema.optional(),
  include: ColorIncludeSchema.optional(),
  data: z.union([ ColorUpdateInputSchema,ColorUncheckedUpdateInputSchema ]),
  where: ColorWhereUniqueInputSchema,
}).strict() ;

export const ColorUpdateManyArgsSchema: z.ZodType<Prisma.ColorUpdateManyArgs> = z.object({
  data: z.union([ ColorUpdateManyMutationInputSchema,ColorUncheckedUpdateManyInputSchema ]),
  where: ColorWhereInputSchema.optional(),
}).strict() ;

export const ColorDeleteManyArgsSchema: z.ZodType<Prisma.ColorDeleteManyArgs> = z.object({
  where: ColorWhereInputSchema.optional(),
}).strict() ;