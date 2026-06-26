import { z } from "zod";
import { SchemaFieldSchema } from "./schemaField";
import { CodeExampleSetSchema } from "./codeExamples";
import { ApiVersionSchema } from "./version";

const ExampleSchema = z
  .object({
    name: z.string(),
    value: z.string(),
    highlightedValue: z.string().optional(),
  })
  .strict();

export const ApiOperationStubSchema = z
  .object({
    operationId: z.string(),
    summary: z.string(),
    slug: z.string(),
    menuOrder: z.number(),
    versions: z.array(ApiVersionSchema),
    method: z.string(),
    deprecated: z.boolean(),
    unstable: z.boolean(),
    // Region-keyed endpoint URLs for the primary (newest) version, used by the
    // category landing page to render each endpoint's method + URL summary.
    regionUrls: z.record(z.string(), z.string()),
  })
  .strict();

export const ApiCategoryStubSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    deprecated: z.boolean(),
  })
  .strict();

export const ApiCategorySchema = ApiCategoryStubSchema.extend({
  operations: z.array(ApiOperationStubSchema),
}).strict();

export const ResponseDataSchema = z
  .object({
    statusCode: z.string(),
    description: z.string(),
    schema: z.array(SchemaFieldSchema).optional(),
    examples: z.array(ExampleSchema).optional(),
  })
  .strict();

export const RequestBodyDataSchema = z
  .object({
    required: z.boolean(),
    description: z.string().optional(),
    schema: z.array(SchemaFieldSchema),
    examples: z.array(ExampleSchema),
  })
  .strict();

export const EndpointDataSchema = z
  .object({
    operationId: z.string(),
    summary: z.string(),
    slug: z.string(),
    method: z.string(),
    path: z.string(),
    description: z.string(),
    version: ApiVersionSchema,
    deprecated: z.boolean(),
    unstable: z.boolean(),
    unstableMessage: z.string().optional(),
    newerVersionUrl: z.string().optional(),
    permissions: z.array(z.string()).optional(),
    oauthScopes: z.array(z.string()).optional(),
    regionUrls: z.record(z.string(), z.string()).optional(),
    pathParams: z.array(SchemaFieldSchema).optional(),
    queryParams: z.array(SchemaFieldSchema).optional(),
    headerParams: z.array(SchemaFieldSchema).optional(),
    requestBody: RequestBodyDataSchema.optional(),
    responses: z.array(ResponseDataSchema),
    codeExamples: z.array(CodeExampleSetSchema),
  })
  .strict();

export const ApiOperationViewSchema = z
  .object({
    slug: z.string(),
    summary: z.string(),
    deprecated: z.boolean(),
    variants: z.array(EndpointDataSchema),
  })
  .strict();

export type ApiOperationStub = z.infer<typeof ApiOperationStubSchema>;
export type ApiCategoryStub = z.infer<typeof ApiCategoryStubSchema>;
export type ApiCategory = z.infer<typeof ApiCategorySchema>;
export type ResponseData = z.infer<typeof ResponseDataSchema>;
export type RequestBodyData = z.infer<typeof RequestBodyDataSchema>;
export type EndpointData = z.infer<typeof EndpointDataSchema>;
export type ApiOperationView = z.infer<typeof ApiOperationViewSchema>;
