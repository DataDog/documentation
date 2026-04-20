---
title: New Value
description: Learn about how the new value detection method works.
---

## Overview

The new value detection method alerts when attribute values that have not been seen before, such as a new user, account, API key, or object ID, appear in your logs.

See [Create Rule][1] for instructions on how to configure a new value rule.

## How the new value detection method works

A new value detection rule:

- Learns the values of the fields you have selected, such as `@userIdentity.arn`.
- Learns by recording values over a learning period or uses a threshold method that does not require a learning period. See [Learning duration](#learning-duration) for more information.
- Triggers a signal when a value appears that has not been observed within the current scope.
- Forgets a learned value if the value has not been observed for the number of days set in the [Forget value](#forget-value) option. If the value has been forgotten, the rule alerts when the value reappears.

### Configuration options

#### Detect new values

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="A new value rule's query with the detect new value setting highlighted" style="width:100%;" >}}

The **Detect new value** field defines the attributes containing the values to learn. You can add up to five attributes.

#### Group-by fields

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="A new value rule's query's group by field highlighted" style="width:100%;" >}}

The `group by` field defines the scope within which new values are evaluated, such as per account.

#### Learning duration

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="A new value rule's query with the learning duration setting highlighted" style="width:100%;" >}}

The learning duration has the following options:
- **for all new values**: The rule triggers on any new values.
- **after the first seen value**: The rule triggers on any new values after the value has been observed once.
- **after**: Define the length of time the rule learns values for the selected fields. For example, if you select **after 7 days**, the rule learns the values for the first seven days and then triggers on any new values after the seven days. The maximum learning duration is 30 days.

#### Forget value

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="A new value rule's other parameters section showing the forget after option" style="width:40%;" >}}

The [Forget value][2] option determines how long the rule keeps a value known. After this period has passed, the value is forgotten and the rule alerts on the value again. The maximum number of days for **Forget value** is 30 days.

## API schema reference

This section describes the API payload for creating or updating a `new_value` detection rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Top-level payload fields

A `new_value` rule accepts the following top-level fields on create or update.

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][3]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and `newValueOptions`. See [Options](#options). |
| `queries` | array | Queries for selecting logs which are part of the rule. See [Queries](#queries). |
| `cases` | array | Cases for generating signals. See [Cases](#cases). |

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |
| `groupSignalsBy` | array\<string\> | Additional grouping to perform on top of the existing groups in the query section. Must be a subset of the existing groups. |
| `referenceTables` | array | Reference tables for the rule. Maximum of 1,000,000 rows. |
| `schedulingOptions` | object | Options for scheduled rules. When this field is present, the rule runs based on the schedule (RRULE, RFC 5545). Minimum frequency is 1 day. |
| `calculatedFields` | array | Calculated fields. Only allowed for scheduled rules - in other words, when `schedulingOptions` is also defined. |

### Queries

A `new_value` rule has exactly one query with `aggregation: "new_value"`.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Used as an alias referenced in `cases[].condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][4]. |
| `aggregation` | string enum | yes | The aggregation type. Must be `new_value` for this detection method. |
| `metrics` | array\<string\> | yes | Group of target fields to aggregate over. For `new_value` aggregation, accepts up to five values — each is an attribute whose values are being watched. |
| `groupByFields` | array\<string\> | yes | Fields to group by. Entity scope under which values are learned (for example, `["@account.id"]`). |
| `distinctFields` | array\<string\> | no | Field for which the cardinality is measured. Leave empty (`[]`) for `new_value`. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |
| `indexes` | array\<string\> | no | List of indexes to query when the `dataSource` is `logs`. Only used for scheduled rules. |
| `hasOptionalGroupByFields` | bool | no | When `false`, events without a group-by value are ignored by the rule. When `true`, events with missing group-by fields are processed with `N/A` replacing the missing values. |

### Cases

A `new_value` rule typically has a single case with no `condition` — the rule fires inherently when a new value is observed. Severity is chosen via `status`.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. Often empty for `new_value`. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | no | Logical expression referencing query aliases. Typically omitted for single-case `new_value` rules. |
| `notifications` | array\<string\> | no | Notification targets (for example, `@slack-*`, `@team-*`, `@email-...`, `@webhook-...`). |

### Options

Common `options` fields shared with other detection methods:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `new_value` for this method. |
| `evaluationWindow` | int (seconds) | 300 | A time window that matches when at least one of the cases evaluates true. Sliding, real-time. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |
| `keepAlive` | int (seconds) | ≥ `evaluationWindow` | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. Allowed values: same as `evaluationWindow`. |
| `maxSignalDuration` | int (seconds) | 3600–86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration (measured from first-seen timestamp). Allowed values: same as `evaluationWindow`. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If true, signals in non-production environments have a lower severity than what is defined by the rule case. Severity is decreased by one level when the environment tag starts with `staging`, `test`, or `dev`. `INFO` remains `INFO`. |

**Cross-field constraint (server-enforced):** `evaluationWindow ≤ keepAlive ≤ maxSignalDuration`.

#### `newValueOptions`

Method-specific sub-object under `options`.

| Field | Type | Typical | Description |
|---|---|---|---|
| `learningMethod` | string enum | `"duration"` | The learning method used to determine when signals should be generated for values that weren't learned. Allowed values: `duration`, `threshold`. |
| `learningDuration` | int (days) | 7 | The duration in days during which values are learned, and after which signals are generated for values that weren't learned. If set to `0`, a signal is generated for all new values after the first value is learned. Allowed values: `0`, `1`, `7`. |
| `learningThreshold` | int | 0 | A number of occurrences after which signals will be generated for values that weren't learned. Used when `learningMethod: "threshold"`. Allowed values: `0`, `1`. |
| `forgetAfter` | int (days) | 28 | The duration in days after which a learned value is forgotten. Allowed values: `1`, `2`, `7`, `14`, `21`, `28`. |

### Limits

| Limit | Value |
|---|---|
| Attributes per rule (`queries[0].metrics`) | ≤ 5 |
| `newValueOptions.learningDuration` | ≤ 30 days |
| `newValueOptions.forgetAfter` | ≤ 30 days |
| Queries per rule | exactly 1 |

### Example payload

Example of a `new_value` rule that alerts when a credential is added to an Azure AD application that has rarely been used. The watched attribute is `@properties.targetResources.displayName`, grouped by `@usr.id`, so each user has their own "seen applications" list.

```json
{
  "name": "Credential added to rarely used Azure AD application",
  "type": "log_detection",
  "isEnabled": true,
  "message": "Credential added to Azure AD application {{@properties.targetResources.displayName}}.",
  "tags": [
    "source:azure",
    "security:attack",
    "technique:T1098-account-manipulation",
    "tactic:TA0003-persistence"
  ],
  "options": {
    "detectionMethod": "new_value",
    "maxSignalDuration": 86400,
    "keepAlive": 3600,
    "decreaseCriticalityBasedOnEnv": true,
    "newValueOptions": {
      "learningMethod": "duration",
      "learningDuration": 7,
      "forgetAfter": 28,
      "learningThreshold": 0
    }
  },
  "queries": [
    {
      "name": "new_credential_added",
      "query": "source:azure.activedirectory @evt.name:(\"Add service principal credentials\" OR \"Update application – Certificates and secrets management\") @evt.outcome:success @evt.category:AuditLogs",
      "aggregation": "new_value",
      "metrics": ["@properties.targetResources.displayName"],
      "groupByFields": ["@usr.id"],
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

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=newvalue
[2]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=newvalue#forget-value-rt-new-value
[3]: /security/notifications/variables/
[4]: /logs/search_syntax/
[5]: /api/latest/security-monitoring/#create-a-detection-rule
