---
title: Third Party
description: Learn about how the third party detection method works.
disable_toc: false
---

## Overview

The third party detection method maps vendor-supplied severities — from products like SentinelOne, Jamf Protect, CrowdStrike, Microsoft Defender, or CheckPoint Harmony — onto Datadog signal severities. The rule ingests events that a third-party product has already scored and emits one Datadog signal per matching vendor severity tier.

See [Create Rule][1] for instructions on how to configure a third party rule.

## When to use

Use `third_party` when the upstream product is the authoritative detector and Datadog's job is to re-label the event so it surfaces as a first-class security signal. Typical integrations:

- EDR vendors (SentinelOne, CrowdStrike, Microsoft Defender)
- MDM and endpoint-posture tools (Jamf Protect)
- Cloud-native detection products whose events already carry a severity attribute (for example, `@evt.severity`, `@severity`, `@alert.severity`)

If Datadog should compute the severity itself (by counting, cardinality, ordering, or novelty), pick a different detection method.

## How it works

A third party rule has two conjunctive filter stages:

1. **Root queries** (`rootQueries`) filter all incoming events from the vendor source and control how signals are grouped (one signal per distinct `groupByFields` tuple).
2. **Per-severity queries** (`queries`) further filter events by vendor severity level (for example, `@evt.severity:Critical`).

Every event must match **both** a `rootQuery` AND one of the per-severity queries to generate a signal with the corresponding severity. Events that match a `rootQuery` but no per-severity query fall back to `defaultStatus`.

## API schema reference

This section describes the API payload for creating or updating a `third_party` rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][2]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and `thirdPartyRuleOptions`. See [Options](#options). |
| `queries` | array | Per-severity filter queries. See [Queries](#queries). |

Either `cases` or `thirdPartyCases` is required — see [Cases](#cases).

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |

### Queries

Per-severity filter queries. Each selects one vendor severity tier.

| Field | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | Filter selecting one vendor severity level (for example, `@evt.severity:Critical`). |
| `aggregation` | string enum | yes | Must be `none` for third party rules. |
| `name` | string | no | Name of the query. |

**Important**: Do not set `groupByFields`, `distinctFields`, or `metrics` on per-severity queries. The server rejects them when paired with `aggregation: "none"`. Signal grouping is controlled by `rootQueries[].groupByFields` instead.

### Cases

Two forms are accepted. For new rules, prefer `thirdPartyCases` — the pairing is explicit and survives query reordering.

#### Canonical: `thirdPartyCases` (replaces `cases`)

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. |
| `query` | string | yes | A query to map a third party event to this case. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `notifications` | array\<string\> | no | Notification targets for each case. |

#### Alternate: flat `cases` pairing 1-to-1 with `queries`

A flat `cases` array where each entry sets only `status`. The Nth case inherits the filter from the Nth entry of `queries`. This positional pairing is used by Datadog-shipped rules.

```json
"cases": [
  { "status": "low" },
  { "status": "medium" },
  { "status": "high" },
  { "status": "critical" }
]
```

Reordering one array without the other silently breaks the mapping.

### Options

Common `options` fields:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `third_party` for this method. |
| `evaluationWindow` | int (seconds) | 1800 | Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. For `third_party`, this field is not used in the classical sense but is accepted. |
| `keepAlive` | int (seconds) | 1800 | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. For `third_party` rules, this field is not used. |
| `maxSignalDuration` | int (seconds) | 86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. |

#### `thirdPartyRuleOptions`

Method-specific sub-object under `options`.

| Field | Type | Required | Description |
|---|---|---|---|
| `rootQueries` | array of `{ query, groupByFields }` | yes | Queries to be combined (AND) with each per-severity query. Each entry applies its own `query` and its own `groupByFields`, so one rule can group different alert types on different tuples. |
| `signalTitleTemplate` | string | no | A template for the signal title; if omitted, the title is generated based on the case name. Supports attribute and tag variables (see [Security notification variables][2]). |
| `defaultStatus` | string enum | no | Severity used when an event satisfies one of the `rootQueries` but none of the per-severity queries. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `defaultNotifications` | array\<string\> | no | Notification targets for the logs that do not correspond to any of the cases. |

##### `rootQueries[]`

| Field | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | Query to run on logs. Filters all incoming events from the vendor source. |
| `groupByFields` | array\<string\> | yes | Fields to group by. Controls signal de-duplication — one signal per distinct tuple. An empty array disables grouping, so every matching event produces its own signal. |

### Vendor patterns

- **Single root query**: Used when all alerts from the vendor should be grouped the same way. Example: SentinelOne with one `rootQueries` entry grouping by `@agentRealtimeInfo.name`.
- **Multiple root queries**: Used when different alert types should be grouped on different tuples. Example: CrowdStrike with one `rootQueries` entry per `@evt.type`, each with its own `groupByFields`.

### Example payload

Example of a `third_party` rule that maps SentinelOne endpoint alert severities to Datadog signal severities, grouped by host.

```json
{
  "name": "SentinelOne Alerts",
  "type": "log_detection",
  "isEnabled": true,
  "message": "{{@evt.name}} on {{@agentRealtimeInfo.name}}.",
  "tags": [
    "source:sentinelone",
    "security:attack"
  ],
  "options": {
    "detectionMethod": "third_party",
    "evaluationWindow": 1800,
    "keepAlive": 1800,
    "maxSignalDuration": 86400,
    "thirdPartyRuleOptions": {
      "signalTitleTemplate": "SentinelOne custom alert — {{@evt.name}} on {{@agentRealtimeInfo.name}}",
      "defaultStatus": "medium",
      "defaultNotifications": [],
      "rootQueries": [
        {
          "query": "source:sentinelone endpoint:cloud_detection_alerts",
          "groupByFields": ["@agentRealtimeInfo.name"]
        }
      ]
    }
  },
  "queries": [
    { "query": "@evt.severity:Low",      "aggregation": "none" },
    { "query": "@evt.severity:Medium",   "aggregation": "none" },
    { "query": "@evt.severity:High",     "aggregation": "none" },
    { "query": "@evt.severity:Critical", "aggregation": "none" }
  ],
  "cases": [
    { "status": "low" },
    { "status": "medium" },
    { "status": "high" },
    { "status": "critical" }
  ]
}
```

## Further reading

- [Create a detection rule (API reference)][3]
- [Security notification variables][2]
- [Log search syntax][4]

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=thirdparty
[2]: /security/notifications/variables/
[3]: /api/latest/security-monitoring/#create-a-detection-rule
[4]: /logs/search_syntax/
