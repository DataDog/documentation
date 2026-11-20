import type { OpenAPIV3 } from "openapi-types";

/**
 * Internal builder shape produced by `splitParameters`. Each list contains
 * resolved OpenAPI Parameter Objects (post-`$ref`-resolution), grouped by
 * their `in` field.
 *
 * Not validated at runtime — these never escape the builder pipeline as
 * a public return value, so they don't need a Zod schema. The view
 * functions that *do* return data (`getCategoriesView`, `getOperationView`)
 * have Zod schemas in this folder.
 */
export interface SplitParams {
  path: OpenAPIV3.ParameterObject[];
  query: OpenAPIV3.ParameterObject[];
  header: OpenAPIV3.ParameterObject[];
}
