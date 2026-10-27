import type { FragmentSelector } from "../../lib/apiFragment";
import type { ShapeClassId } from "./shapeClasses";

/** Category slug of the `Rendering Shapes` tag in tests/fixtures/api/v2/partial_spec.yaml. */
export const SHAPE_CASES_CATEGORY = "rendering-shapes";

export interface ShapeCase {
  classId: ShapeClassId;
  /** Operation slug under `category`. */
  operation: string;
  /**
   * Category slug, `rendering-shapes` by default. Set it when the operation is
   * already in the fixture under another tag, since a path can't be listed twice.
   */
  category?: string;
  fragment: FragmentSelector;
}

/**
 * One case per rendering class. Cases can share a trimmed operation when
 * their fragments differ. Each case's fragment is
 * snapshotted as `tests/headless/api-shape-snapshots/<classId>.{html,md}`.
 */
export const SHAPE_CASES: ShapeCase[] = [
  // ── Parameters ───────────────────────────────────────────────────
  {
    classId: "param-location-path",
    operation: "delete-an-application-key-for-this-service-account",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-location-query",
    operation: "get-the-list-of-devices",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-location-header",
    operation: "get-the-evidence-for-an-ownership-inference",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-none",
    operation: "save-new-value-for-on-demand-concurrency-cap",
    fragment: { sections: ["endpoint-url"], absent: ["arguments"] },
  },
  {
    classId: "param-required-query",
    operation: "get-the-list-of-interfaces-of-the-device",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-required-header",
    operation: "ingest-stix-threat-intelligence",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-bracket-name-required",
    operation: "get-service-list",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-explode",
    operation: "get-rows-by-id",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-schema-example",
    operation: "delete-rum-replay-playlist",
    fragment: { sections: ["arguments", "curl"] },
  },
  {
    classId: "param-type",
    operation: "get-all-access-tokens",
    fragment: { sections: ["arguments"] },
  },
  {
    classId: "param-enum",
    operation: "delete-a-rum-retention-quota-configuration",
    fragment: { sections: ["arguments"] },
  },
  {
    classId: "param-default",
    operation: "search-test-suites",
    fragment: { sections: ["arguments"] },
  },
  {
    classId: "param-ref-with-siblings",
    operation: "list-org-group-policies",
    fragment: { sections: ["arguments", "curl"] },
  },

  // ── Request body ─────────────────────────────────────────────────
  {
    classId: "request-none",
    operation: "get-the-list-of-interfaces-of-the-device",
    fragment: { sections: ["curl"], absent: ["request"] },
  },
  {
    classId: "request-required",
    operation: "ingest-stix-threat-intelligence",
    fragment: { sections: ["request"] },
  },
  {
    classId: "request-optional",
    operation: "create-a-datadog-gcp-principal",
    fragment: { sections: ["request", "curl"] },
  },
  {
    classId: "request-description",
    operation: "re-order-retention-filters",
    fragment: { sections: ["request"] },
  },
  {
    classId: "request-json",
    operation: "save-new-value-for-on-demand-concurrency-cap",
    fragment: { sections: ["request"] },
  },
  {
    classId: "request-json-variant",
    operation: "submit-distribution-points",
    fragment: { sections: ["request", "curl"] },
  },
  {
    classId: "request-multipart",
    operation: "upload-idp-metadata",
    fragment: { sections: ["request", "curl"] },
  },
  {
    classId: "request-multipart-encoding",
    operation: "upload-source-maps",
    fragment: { sections: ["request"] },
  },
  {
    classId: "request-multiple-content-types",
    operation: "send-logs",
    fragment: { sections: ["request"] },
  },
  {
    classId: "request-curl-examples-one",
    operation: "save-new-value-for-on-demand-concurrency-cap",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "request-curl-examples-many",
    operation: "send-logs",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "request-readonly-strip",
    operation: "create-a-workflow",
    fragment: { sections: ["request"] },
  },

  // ── Responses ────────────────────────────────────────────────────
  {
    classId: "response-success",
    operation: "create-a-datadog-gcp-principal",
    fragment: { sections: ["response"], responseCode: "200" },
  },
  {
    classId: "response-no-content",
    operation: "delete-a-rum-based-metric",
    fragment: { sections: ["response", "curl"], responseCode: "204" },
  },
  {
    classId: "response-multiple-2xx",
    operation: "delete-a-workload-protection-policy",
    fragment: { sections: ["response"] },
  },
  {
    classId: "response-error",
    operation: "delete-a-rum-based-metric",
    fragment: { sections: ["response"], responseCode: "404" },
  },
  {
    classId: "response-error-no-content",
    category: "monitors",
    operation: "unmute-all-monitors",
    fragment: { sections: ["response"], responseCode: "400" },
  },
  {
    classId: "response-empty-body",
    operation: "send-logs",
    fragment: { sections: ["response"], responseCode: "202" },
  },
  {
    classId: "response-json-variant",
    operation: "get-usage-attribution-types",
    fragment: { sections: ["response"] },
  },
  {
    classId: "response-non-json-text",
    operation: "get-slo-report",
    fragment: { sections: ["response"] },
  },
  {
    classId: "response-non-json-file",
    operation: "download-the-workload-protection-policy",
    fragment: { sections: ["response"] },
  },
  {
    classId: "response-readonly-writeonly",
    operation: "get-a-custom-destination",
    fragment: { sections: ["response"] },
  },

  // ── Schema ───────────────────────────────────────────────────────
  {
    classId: "schema-scalar-types",
    operation: "get-a-given-apm-retention-filter",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-nested-object",
    operation: "create-a-datadog-gcp-principal",
    fragment: { sections: ["response"], responseCode: "200", field: "data" },
  },
  {
    classId: "schema-array",
    operation: "get-usage-attribution-types",
    fragment: { sections: ["response"], field: "data" },
  },
  {
    classId: "schema-array-of-arrays",
    operation: "fetch-uptime-for-multiple-tests",
    fragment: { sections: ["response"], field: "history" },
  },
  {
    classId: "schema-array-items-untyped",
    operation: "query-users",
    fragment: { sections: ["response"], field: "hits" },
  },
  {
    classId: "schema-array-of-oneOf",
    operation: "get-a-restriction-query",
    fragment: { sections: ["response"], field: "included" },
  },
  {
    classId: "schema-top-level-array",
    operation: "fetch-uptime-for-multiple-tests",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-top-level-oneOf",
    operation: "create-or-update-kinds",
    fragment: { sections: ["request"] },
  },
  {
    classId: "schema-no-type",
    category: "monitors",
    operation: "monitors-group-search",
    fragment: { sections: ["response"], field: "name" },
  },
  {
    classId: "schema-format",
    operation: "list-servicenow-templates",
    fragment: { sections: ["response"], field: "instance_id" },
  },
  {
    classId: "schema-format-date-time",
    category: "dashboards",
    operation: "get-all-dashboards",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-format-binary",
    operation: "upload-idp-metadata",
    fragment: { sections: ["request"], field: "idp_file" },
  },
  {
    classId: "schema-enum",
    operation: "ingest-stix-threat-intelligence",
    fragment: { sections: ["request"], field: "type" },
  },
  {
    classId: "schema-enum-non-string",
    operation: "submit-a-service-check",
    fragment: { sections: ["request"], field: "status" },
  },
  {
    classId: "schema-default",
    operation: "create-a-workflow",
    fragment: { sections: ["request"], field: "type" },
  },
  {
    classId: "schema-example-scalar",
    operation: "submit-a-service-check",
    fragment: { sections: ["request"] },
  },
  {
    classId: "schema-example-array",
    operation: "get-the-default-locations",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-example-object",
    operation: "validate-csv-budget",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-deprecated",
    category: "dashboards",
    operation: "get-all-dashboards",
    fragment: { sections: ["response"], field: "is_read_only" },
  },
  {
    classId: "schema-required",
    operation: "ingest-stix-threat-intelligence",
    fragment: { sections: ["request"], field: "id" },
  },
  {
    classId: "schema-prop-name-special-chars",
    operation: "list-jira-issue-templates",
    fragment: { sections: ["response"], field: "jira-account" },
  },
  {
    classId: "schema-bare-object",
    operation: "list-rum-replay-playlist-sessions",
    fragment: { sections: ["response"], field: "session_event" },
  },
  {
    classId: "schema-map-of-scalars",
    operation: "list-servicenow-templates",
    fragment: { sections: ["response"], field: "fields_mapping" },
  },
  {
    classId: "schema-map-of-objects",
    operation: "get-all-apm-service-dependencies",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-map-of-arrays",
    operation: "get-all-host-tags",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-map-of-oneOf",
    operation: "upsert-rows",
    fragment: { sections: ["request"], field: "values" },
  },
  {
    classId: "schema-map-untyped",
    operation: "aggregate-events",
    fragment: { sections: ["response"], field: "by" },
  },
  {
    classId: "schema-map-with-properties",
    operation: "get-a-workflow-instance",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-oneOf",
    operation: "list-distinct-metric-volumes-by-metric-name",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-oneOf-single",
    operation: "retrieve-a-dependency-scan-result",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-oneOf-inline-variant",
    operation: "get-all-workload-protection-agent-rules-us1-fed",
    fragment: { sections: ["response"], field: "value" },
  },
  {
    classId: "schema-oneOf-primitive-variant",
    operation: "upsert-rows",
    fragment: { sections: ["request"] },
  },
  {
    classId: "schema-oneOf-array-variant",
    operation: "list-agent-observability-dataset-records",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-oneOf-with-type",
    operation: "list-agent-observability-dataset-records",
    fragment: { sections: ["response"], field: "input" },
  },
  {
    classId: "schema-oneOf-with-additionalProperties",
    operation: "create-or-update-entities",
    fragment: { sections: ["request"] },
  },
  {
    classId: "schema-recursive-ref",
    operation: "get-ast-for-source-code",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-depth-cap",
    operation: "get-a-specific-pipeline",
    fragment: { sections: ["response"] },
  },
  {
    classId: "schema-ref-with-siblings",
    operation: "create-cases-for-security-findings",
    fragment: { sections: ["request"] },
  },

  // ── Operation ────────────────────────────────────────────────────
  {
    classId: "operation-method",
    operation: "delete-a-rum-application",
    fragment: { sections: ["endpoint-url", "curl"] },
  },
  {
    classId: "operation-deprecated",
    operation: "delete-a-salesforce-incident-template",
    fragment: { sections: ["heading"] },
  },
  {
    classId: "operation-unstable",
    operation: "delete-jira-issue-template",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "operation-no-description",
    operation: "validate-csv-budget",
    fragment: { sections: ["endpoint-url"], absent: ["overview"] },
  },
  {
    classId: "operation-display-name",
    operation: "delete-a-case-type",
    fragment: { sections: ["heading", "curl"] },
  },
  {
    classId: "operation-permissions-single",
    operation: "delete-a-rum-application",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "operation-permissions-all",
    operation: "delete-user",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "operation-permissions-any",
    operation: "revoke-a-personal-access-token",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "operation-no-permissions",
    operation: "get-a-downtime",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "operation-auth-api-keys",
    category: "authentication",
    operation: "validate-api-key",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "operation-auth-default",
    operation: "get-a-schedule-by-id",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "operation-auth-none",
    operation: "validate-csv-budget",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "operation-auth-bearer",
    operation: "delete-user",
    fragment: { sections: ["curl"] },
  },
  {
    classId: "operation-oauth-scopes",
    operation: "delete-status-page",
    fragment: { sections: ["overview", "curl"] },
  },
  {
    classId: "operation-no-sdk-examples",
    operation: "get-an-ownership-inference-by-owner-type",
    fragment: { sections: ["code-tabs"] },
  },
  {
    classId: "code-example-accordion",
    category: "monitors",
    operation: "create-a-monitor",
    fragment: { sections: ["curl"] },
  },

  // ── Operation description ────────────────────────────────────────
  {
    classId: "op-desc-inline",
    operation: "download-the-workload-protection-policy",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-link",
    operation: "delete-an-existing-workflow",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-list",
    operation: "upload-source-maps",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-table",
    operation: "list-scanned-assets-metadata",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-code-fence",
    operation: "get-available-fields-for-usage-summary",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-heading",
    operation: "search-security-findings",
    fragment: { sections: ["overview"] },
  },
  {
    classId: "op-desc-raw-html",
    operation: "delete-a-webhook",
    fragment: { sections: ["overview"] },
  },

  // ── Regions ──────────────────────────────────────────────────────
  {
    classId: "region-servers-override",
    operation: "resolve-on-call-page",
    fragment: { sections: ["endpoint-url", "curl"] },
  },
  {
    classId: "region-servers-subdomain",
    operation: "list-ip-ranges",
    fragment: { sections: ["endpoint-url", "curl"] },
  },

  // ── Field descriptions ───────────────────────────────────────────
  {
    classId: "field-desc-inline",
    operation: "get-a-downtime",
    fragment: { sections: ["response"], field: "rrule" },
  },
  {
    classId: "field-desc-link",
    operation: "list-all-apm-retention-filters",
    fragment: { sections: ["response"], field: "query" },
  },
  {
    classId: "field-desc-list",
    operation: "get-a-schedule-by-id",
    fragment: { sections: ["response"], field: "status" },
  },
  {
    classId: "field-desc-raw-html",
    operation: "get-an-ownership-inference-by-owner-type",
    fragment: { sections: ["response"], field: "primary_contact_ref" },
  },
];
