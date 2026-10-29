import { z } from "zod";

export const CurlParamSchema = z
  .object({
    name: z.string(),
    example: z.string().optional(),
    required: z.boolean().optional(),
    explodedItemCount: z
      .number()
      .optional()
      .describe(
        "For an `explode: true` query parameter whose example is an array: the number of items, each sent as its own `name=` pair.",
      ),
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

/** One `-F` field of a `multipart/form-data` body. */
export const CurlFormFieldSchema = z
  .object({
    name: z.string(),
    type: z.string().describe("The property's schema type, e.g. 'string'"),
    binary: z
      .boolean()
      .describe(
        "True for `format: binary`, which curl reads from a file (`@`)",
      ),
  })
  .strict();

export const GenerateCurlOptionsSchema = z
  .object({
    method: z.string(),
    path: z.string(),
    commentLines: z
      .array(z.string())
      .optional()
      .describe(
        "Lines above the command, such as a spec example's `## <summary>` and `# <description>` lines",
      ),
    site: z
      .string()
      .optional()
      .describe("Datadog site domain, e.g. 'datadoghq.com'"),
    otherSites: z
      .array(z.string())
      .optional()
      .describe(
        "Other sites the operation supports, listed in a comment after DD_SITE. Only the .md sets this: the HTML switches sites itself.",
      ),
    host: z
      .string()
      .optional()
      .describe(
        "A fixed host for the URL, for operations whose regions each have their own host (on-call, browser intake). Replaces the subdomain and DD_SITE.",
      ),
    otherHosts: z
      .array(z.object({ site: z.string(), host: z.string() }).strict())
      .optional()
      .describe(
        "With `host`, the other sites' hosts, listed in a comment above the curl. Only the .md sets this: the HTML switches sites itself.",
      ),
    subdomain: z
      .string()
      .optional()
      .describe("Subdomain of the API host, e.g. 'api'. Defaults to 'api'."),
    pathParams: z.array(CurlParamSchema).optional(),
    queryParams: z.array(CurlParamSchema).optional(),
    headerParams: z
      .array(CurlParamSchema)
      .optional()
      .describe(
        "Header parameters. Each required one except Content-Encoding is sent with its example.",
      ),
    requestBodyJson: z
      .string()
      .optional()
      .describe("Prettified JSON string for the request body"),
    contentEncoding: z
      .enum(["gzip", "deflate"])
      .optional()
      .describe(
        "Compress the body before sending it, with this `Content-Encoding`, as Hugo's curl does",
      ),
    hasRequestBody: z
      .boolean()
      .optional()
      .describe(
        "True when the operation has a request body, even one with no JSON example. Hugo sends Content-Type only then.",
      ),
    multipartFormFields: z
      .array(CurlFormFieldSchema)
      .optional()
      .describe(
        "Set when the request body is `multipart/form-data`: one `-F` per field, in place of a JSON body",
      ),
    hasNoContentResponse: z
      .boolean()
      .optional()
      .describe(
        "True when the operation has a 204 response. Hugo leaves out the Accept header then.",
      ),
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
export type CurlFormField = z.infer<typeof CurlFormFieldSchema>;
export type CurlSecurityScheme = z.infer<typeof CurlSecuritySchemeSchema>;
export type GenerateCurlOptions = z.infer<typeof GenerateCurlOptionsSchema>;
