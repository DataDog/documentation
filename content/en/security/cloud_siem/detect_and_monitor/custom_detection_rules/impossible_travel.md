---
title: Impossible Travel
disable_toc: false
---

## Overview

The impossible travel method detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events. See [Create Rule][1] for detailed instructions on how to create an impossible travel rule.

## How the impossible travel method works

### Baseline user locations

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="A impossible travel rule's query with the baseline locations option highlighted" style="width:100%;" >}}

When you set up a query for your impossible travel rule, you can enable **Baseline User Locations** if you want Datadog to learn the common locations for each user before the rule starts creating signals.

#### Baseline user locations disabled

When **Baseline User Locations** is disabled (default):

- Each log is assessed for whether it contains a location that is impossible to travel to from an already encountered location.

- Travel is impossible between two locations if the speed of travel is higher than 1000 km/h and the distance is greater than 500km.

#### Baseline user locations enabled

When **Baseline User Locations** is enabled:

- There is a learning period of 24 hours for each user. During this time, Datadog learns the common locations (city and country) for each user and signals are not created.
- Encountered locations are forgotten after 30 days if they have not been encountered again.
- If a new location is encountered, Datadog:
    - Checks if the location is one of the common locations. If it is one of the common locations, Datadog moves on to the next log or event.
    - Checks if it's an impossible travel situation.
        - If it's not an impossible travel situation, Datadog moves on to the next log or event.
        - It it's an impossible travel situation, Datadog checks if there is an IP transition pattern. From example, if a user travels from location A to location B and that travel pattern has occurred in the past, a signal is not triggered.

## API schema reference

This section describes the API payload for creating or updating an `impossible_travel` rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Trigger thresholds

A signal triggers only when **both** thresholds are exceeded between two successive successful authentication events for the same user:

| Condition | Threshold |
|---|---|
| Travel speed | > 1000 km/h |
| Travel distance | > 500 km |

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][3]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and `impossibleTravelOptions`. See [Options](#options). |
| `queries` | array | Queries for selecting logs which are part of the rule. See [Queries](#queries). |
| `cases` | array | Cases for generating signals. See [Cases](#cases). |

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |
| `groupSignalsBy` | array\<string\> | Additional grouping to perform on top of existing groups. Must be a subset of the existing groups. |
| `referenceTables` | array | Reference tables for the rule. Maximum of 1,000,000 rows. |

### Queries

An `impossible_travel` rule has exactly one query with `aggregation: "geo_data"`.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Used as an alias referenced in `cases[].condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][4]. Scope to successful authentication events from the desired source. |
| `aggregation` | string enum | yes | The aggregation type. Must be `geo_data` for this detection method. |
| `metrics` | array\<string\> | yes | Must be `["@network.client.geoip"]` — the geo-enriched IP attribute the detector reads. |
| `groupByFields` | array\<string\> | yes | Per-user key, typically `["@usr.name"]` or `["@usr.id"]`. One group = one user. |
| `distinctFields` | array\<string\> | no | Leave empty (`[]`) for `impossible_travel`. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |
| `hasOptionalGroupByFields` | bool | no | When `false`, events without a group-by value are ignored. When `true`, events with missing group-by fields are processed with `N/A`. |

### Cases

An `impossible_travel` rule typically has a single case with no `condition` — the rule fires inherently when impossible travel is detected.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. Often empty for `impossible_travel`. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | no | Typically omitted for single-case `impossible_travel` rules. |
| `notifications` | array\<string\> | no | Notification targets. |

### Options

Common `options` fields:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `impossible_travel` for this method. |
| `keepAlive` | int (seconds) | 21600 | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |
| `maxSignalDuration` | int (seconds) | 86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. Allowed values: same as `keepAlive`. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. |

**Note:** `evaluationWindow` is **not used** for `impossible_travel` rules. Omit it from the `options` block — the detector drives its own evaluation cadence.

#### `impossibleTravelOptions`

Method-specific sub-object under `options`.

| Field | Type | Description |
|---|---|---|
| `baselineUserLocations` | bool | If `true`, signals are suppressed for the first 24 hours while Datadog learns the user's regular access locations. Can reduce noise and help infer VPN usage or credentialed API access. Known-location retention is 30 days. |
| `detectIpTransition` | bool | When `true`, also considers a transition between IPs (not only between geo regions) when deciding whether two events are separate "trips". Useful where multiple distinct IPs in the same region should be treated as one location. |

### Example payload

Example of an `impossible_travel` rule that detects OCI SSO logins without MFA where the travel between two successive logins is implausible. Events are grouped by `@usr.name`, and corporate VPN sources are excluded.

```json
{
  "name": "OCI ConsoleLogin without MFA — impossible travel",
  "type": "log_detection",
  "isEnabled": true,
  "message": "Impossible travel detected for {{@usr.name}} from {{@network.client.geoip.country.name}}.",
  "tags": [
    "source:oracle-cloud-infrastructure",
    "security:attack",
    "tactic:TA0001-initial-access"
  ],
  "options": {
    "detectionMethod": "impossible_travel",
    "keepAlive": 21600,
    "maxSignalDuration": 86400,
    "impossibleTravelOptions": {
      "baselineUserLocations": true
    }
  },
  "queries": [
    {
      "name": "impossible_travel_no_mfa",
      "query": "source:oci.audit @evt.name:AccessApp @data.additionalDetails.eventId:sso.app.access.success -@threat_intel.results.category:corp_vpn",
      "aggregation": "geo_data",
      "metrics": ["@network.client.geoip"],
      "groupByFields": ["@usr.name"],
      "distinctFields": []
    }
  ],
  "cases": [
    {
      "status": "medium",
      "name": "",
      "notifications": []
    }
  ]
}
```

### Further reading

- [Create a detection rule (API reference)][5]
- [Log search syntax][4]
- [Security notification variables][3]

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule
[3]: /security/notifications/variables/
[4]: /logs/search_syntax/
[5]: /api/latest/security-monitoring/#create-a-detection-rule
