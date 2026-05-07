import type { SchemaField } from "./schemaField";
import type { CodeExampleSet } from "./codeExamples";

export interface ApiOperationStub {
  operationId: string;
  summary: string;
  slug: string;
  menuOrder: number;
  version: "v1" | "v2";
  method: string;
}

export interface ApiCategory {
  name: string;
  slug: string;
  description: string;
  operations: ApiOperationStub[];
  deprecated: boolean;
}

export interface ResponseData {
  statusCode: string;
  description: string;
  schema?: SchemaField[];
  examples?: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export interface RequestBodyData {
  required: boolean;
  description?: string;
  schema: SchemaField[];
  examples: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export interface EndpointData {
  operationId: string;
  summary: string;
  slug: string;
  method: string;
  path: string;
  description: string;
  version: "v1" | "v2";
  deprecated: boolean;
  unstable: boolean;
  unstableMessage?: string;
  newerVersionUrl?: string;
  permissions?: string[];
  oauthScopes?: string[];
  regionUrls?: Record<string, string>;
  pathParams?: SchemaField[];
  queryParams?: SchemaField[];
  headerParams?: SchemaField[];
  requestBody?: RequestBodyData;
  responses: ResponseData[];
  codeExamples: CodeExampleSet[];
}
