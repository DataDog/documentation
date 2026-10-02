import { z } from "zod";

export const CurlParamSchema = z
  .object({
    name: z.string(),
    example: z.string().optional(),
    required: z.boolean().optional(),
  })
  .strict();

/**
 * OpenAPI 3.x Security Requirement Object: a map of security scheme name
 * to required scopes. An empty scope array means "no scopes required".
 */
const SecurityRequirementSchema = z.record(z.string(), z.array(z.string()));

/**
 * The subset of an OpenAPI Security Scheme Object used to render auth,
 * plus Datadog's `x-env-name` extension (the shell variable holding the credential).
 */
export const CurlSecuritySchemeSchema = z
  .object({
    type: z.string(),
    in: z.string().optional(),
    name: z.string().optional(),
    scheme: z.string().optional(),
    "x-env-name": z.string().optional(),
  })
  .passthrough();

export const GenerateCurlOptionsSchema = z
  .object({
    method: z.string(),
    path: z.string(),
    site: z
      .string()
      .optional()
      .describe("Datadog site domain, e.g. 'datadoghq.com'"),
    subdomain: z
      .string()
      .optional()
      .describe("Subdomain of the API host, e.g. 'api'. Defaults to 'api'."),
    pathParams: z.array(CurlParamSchema).optional(),
    queryParams: z.array(CurlParamSchema).optional(),
    requestBodyJson: z
      .string()
      .optional()
      .describe("Prettified JSON string for the request body"),
    security: z
      .array(SecurityRequirementSchema)
      .optional()
      .describe(
        "Security requirements from the operation (used to determine which auth headers to include)",
      ),
    globalSecurity: z
      .array(SecurityRequirementSchema)
      .optional()
      .describe(
        "Spec-level security requirements, used when the operation declares none",
      ),
    securitySchemes: z
      .record(z.string(), CurlSecuritySchemeSchema)
      .optional()
      .describe("Security schemes from the spec's components, keyed by name"),
  })
  .strict();

export type CurlParam = z.infer<typeof CurlParamSchema>;
export type CurlSecurityScheme = z.infer<typeof CurlSecuritySchemeSchema>;
export type GenerateCurlOptions = z.infer<typeof GenerateCurlOptionsSchema>;
