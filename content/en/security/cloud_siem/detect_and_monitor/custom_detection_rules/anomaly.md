---
title: Anomaly
description: Learn about how the anomaly detection method works.
disable_toc: false
---

## Overview

Anomaly detection analyzes logs to identify abnormal spikes in your log volume, which could indicate issues such as an attack, misconfiguration, or runaway process.

See [Create Rule][1] for instructions on how to configure an anomaly rule.

## How anomaly detection works

The anomaly detection rule:

- Aggregates incoming logs into time buckets and computes a baseline.
    - The upper bound reflects the 99.5th percentile of your recent history, using up to 2 weeks of historical logs.
- Checks on each evaluation for the most recent evaluation window and measures how much the series exceeds that bound.
    - A signal is triggered if the excess is large enough over the whole window.

The anomaly method adapts to your normal patterns and reduces noise from routine fluctuations.

**Note**: The anomaly method uses a statistical baseline (not machine learning). It detects spikes only — it does not alert on drops in log volume.

### Seasonality and learning period

The algorithm automatically accounts for daily and weekly seasonality so regular peaks, such as end-of-week surges, do not alert.

A short learning period is applied for new rules or newly observed values for a `group by`. During the learning period, data is collected to build a baseline.

## Best practices

- Scope the query narrowly. Filter by service, environment, team, or endpoint to reduce noise.
- Start with managed default rules for broad coverage, then add custom anomaly rules for high-volume log sources.

## API schema reference

This section describes the API payload for creating or updating an `anomaly_detection` rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][3]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and `anomalyDetectionOptions`. See [Options](#options). |
| `queries` | array | Queries for selecting logs which are part of the rule. See [Queries](#queries). |
| `cases` | array | Cases for generating signals. See [Cases](#cases). |

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |
| `groupSignalsBy` | array\<string\> | Additional grouping to perform on top of the existing groups in the query section. Must be a subset of the existing groups. |
| `referenceTables` | array | Reference tables for the rule. Maximum of 1,000,000 rows. |
| `schedulingOptions` | object | Options for scheduled rules. When this field is present, the rule runs based on the schedule (RRULE, RFC 5545). |
| `calculatedFields` | array | Calculated fields. Only allowed for scheduled rules. |

### Queries

An `anomaly_detection` rule has exactly one query.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Used as an alias referenced in `cases[].condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][4]. |
| `aggregation` | string enum | yes | The aggregation type. Typically `cardinality` or `count` for anomaly detection. Allowed values: `count`, `cardinality`, `sum`, `max`, `new_value`, `geo_data`, `event_count`, `none`. |
| `distinctFields` | array\<string\> | conditional | Field for which the cardinality is measured. Required when `aggregation` is `cardinality`. |
| `groupByFields` | array\<string\> | yes | Fields to group by. Used to define the per-entity scope for anomaly detection. |
| `metrics` | array\<string\> | no | Not used for `cardinality` or `count` aggregations. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |
| `hasOptionalGroupByFields` | bool | no | When `false`, events without a group-by value are ignored. When `true`, events with missing group-by fields are processed with `N/A` replacing the missing values. |

### Cases

Anomaly rules accept a narrow subset of the case condition grammar. Only the following forms are valid:

| Form | Example |
|---|---|
| `query op NUMBER` | `anomalous_events > 1` |
| `NUMBER op query` | `1 < anomalous_events` |

Not accepted inside an anomaly rule case condition:
- `&&`, `||` (logical combinators)
- `THEN` (sequential operator)
- Arithmetic against literals (for example, `*`)
- Multiple queries combined in one condition

An optional trailing second `NUMBER` encodes a decimal percentile. For example, `a > 99 5` means "above the 99.5th percentile" — the percentile at which the detector itself alerts.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. Often empty. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | no | Condition expression. When present, must follow the narrow form above. |
| `notifications` | array\<string\> | no | Notification targets (for example, `@slack-*`, `@team-*`, `@email-...`, `@webhook-...`). |

### Options

Common `options` fields shared with other detection methods:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `anomaly_detection` for this method. |
| `evaluationWindow` | int (seconds) | 1800 | A time window that matches when at least one of the cases evaluates true. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |
| `keepAlive` | int (seconds) | ≥ `evaluationWindow` | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. |
| `maxSignalDuration` | int (seconds) | 3600–86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. Decreased by one level when the environment tag starts with `staging`, `test`, or `dev`. |

**Cross-field constraint (server-enforced):** `evaluationWindow ≤ keepAlive ≤ maxSignalDuration`.

#### `anomalyDetectionOptions`

Method-specific sub-object under `options`.

| Field | Type | Typical | Description |
|---|---|---|---|
| `learningDuration` | int (hours) | 24 | Learning duration in hours. Anomaly detection waits for at least this amount of historical data before it starts evaluating. Allowed values: `1`, `6`, `12`, `24`, `48`, `168`, `336`. |
| `detectionTolerance` | int | 5 | Sets how permissive anomaly detection is. Higher values require higher deviations before triggering a signal. Allowed values: `1`, `2`, `3`, `4`, `5`. |
| `bucketDuration` | int (seconds) | 300 | Duration of the time buckets used to aggregate events matched by the rule. Must be greater than or equal to 300. Allowed values: `300`, `600`, `900`, `1800`, `3600`, `10800`. |
| `instantaneousBaseline` | bool | `false` | When `true`, Datadog uses previous values within the defined learning window to construct the baseline, enabling faster baseline establishment. |
| `learningPeriodBaseline` | int | — | Optional override baseline applied while the rule is in the learning period. Must be ≥ 0. |

### Example payload

Example of an `anomaly_detection` rule that alerts on an anomalous number of OCI `LaunchInstance` events across availability domains, per user. Cardinality of `@oci.availability_domain` is measured per `@usr.name`; a signal fires when that cardinality is unusually high for that user.

```json
{
  "name": "Anomalous number of OCI instances created across availability domains",
  "type": "log_detection",
  "isEnabled": true,
  "message": "User {{@usr.name}} launched OCI instances across an unusual number of availability domains.",
  "tags": [
    "source:oracle-cloud-infrastructure",
    "security:attack",
    "tactic:TA0040-impact"
  ],
  "options": {
    "detectionMethod": "anomaly_detection",
    "evaluationWindow": 1800,
    "keepAlive": 7200,
    "maxSignalDuration": 86400,
    "anomalyDetectionOptions": {
      "learningDuration": 24,
      "detectionTolerance": 5
    }
  },
  "queries": [
    {
      "name": "anomalous_oci_instance_creation",
      "query": "source:oci.audit @evt.name:LaunchInstance",
      "aggregation": "cardinality",
      "distinctFields": ["@oci.availability_domain"],
      "groupByFields": ["@usr.name"]
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

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=anomaly
[2]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/?tab=anomaly#rule-multi-triggering-rt-anomaly
[3]: /security/notifications/variables/
[4]: /logs/search_syntax/
[5]: /api/latest/security-monitoring/#create-a-detection-rule
