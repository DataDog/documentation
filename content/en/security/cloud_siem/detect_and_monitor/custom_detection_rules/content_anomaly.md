---
title: Content Anomaly
disable_toc: false
---
{{< jqmath-vanilla >}}

## Overview

Content anomaly detection analyzes incoming logs to identify and alert on anomalous log content. You can set [anomaly detection parameters](#anomaly-detection-parameters) to trigger signals if a log's field values significantly deviate from historical logs within a group. A significant deviation is when the similarity between incoming and historical values is low or there is no similarity at all. See [How logs are determined to be anomalous](#how-logs-are-determined-to-be-anomalous) for more information.

See [Create Rule][1] for instructions on how to configure a content anomaly rule.

## How content anomaly detection works

### Anomaly detection parameters

When you create a rule with the content anomaly detection method, you can set the following parameters.

#### Learning duration
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="A content anomaly rule's query with the leaning duration setting highlighted" style="width:100%;" >}}

- **Description**: Time window when values are learned. No signals are generated during this phase. The learning period restarts if the rule is modified.
- **Default**: `7` days
- **Range**: `1`-`10` days
- **How to configure**: When you edit a content anomaly rule, you can set the learning duration in the query's **Learning for** dropdown menu.

#### Forget after
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="Content anomaly detection options with the within the last days dropdown menu highlighted" style="width:100%;" >}}

- **Description**: How long learned values are retained before being discarded.
- **Default**: `7` days
- **Range**: `1`-`10` days
- **How to configure**: In the **Content anomaly detection options** section of a rule's setting page, you can set how long learned values are retained in the **within in the last** dropdown menu.

#### Similarity percentage threshold

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="Content anomaly detection options with the similarity percentage dropdown menu highlighted" style="width:100%;" >}}

- **Description**: Minimum similarity required to consider a log as normal.
- **Default**: `70%`
- **Range**: `35`-`100%`
- **How to configure**: In the **Content anomaly detection options** section of a rule's setting page, you can set the similarity percentage threshold in the **within in the last** dropdown menu.

#### Similar items threshold

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="Content anomaly detection options with the similar items dropdown menu highlighted" style="width:100%;" >}}

- **Description**: Number of matching historical logs required for an incoming value to be considered normal.
- **Default**: `1`
- **Range**: `1`-`20`
- **How to configure**: In the **Content anomaly detection options** section of a rule's setting page, you can enter the similar items threshold in the **with more than** field.

#### Evaluation Window
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="Content anomaly detection options with the similar items dropdown menu highlighted" style="width:100%;" >}}

- **Description**: Defines the time frame for counting anomalous logs. Signals are triggered if anomalies exceed the case condition (for example, `a >= 2`).
- **Range**: `0`-`24` hours
- **How to configure**: In the **Set conditions** section of a rule's setting page, you can set a conditiions's evaluation window in the **within a window of** dropdown menu.

## How logs are determined to be anomalous

1. Logs are tokenized using [Unicode Text Segmentation (UTS #29)][2].
1. Tokens are compared using [Jaccard similarity][3].
1. Efficient comparisons are achieved with [MinHash][4] and [Locality Sensitive Hashing (LSH)][5].
1. A log is anomalous if it fails both similarity percentage and similar items threshold.

### Jaccard similarity computation examples

Cloud SIEM uses the [Jaccard similarity][3] to compare logs.

$$\text"J(A,B)" = {∣\text"A" ∩ \text"B"∣} / {∣\text"A" ∪ \text"B"∣}$$

The following are examples of how Jaccard similarity is calculated for logs with single-word fields and logs with multi-word fields.

#### Single-word fields

These are two example logs with single-word fields:

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

To calculate the Jaccard similarity between the two logs:

- The intersection of `log1` and `log2` results in this set of words: `{auth, k8s, public}`.
- The union of `log1` and `log2` results in this set of words: `{auth, k8s, public, swe, pm}`.
- The Jaccard similarity is calculated using the number of words in the results:

$$\text"J(log1,log2)" = 3 / 5 = 0.6$$

#### Multi-word fields

These are two example logs with multi-word fields:

```
log1={actionDescription: "User connected to abc network"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

To calculate the Jaccard similarity between the two logs:

- The intersection of `log1` and `log2` results in this set of words: `{User, network}`.
- The union of `log1` and `log2` results in this set of words: `{User, connected, to, abc, network, got, unauthorized, access}`.
- The Jaccard similarity is calculated using the number of elements in the results:

$$\text"J(log1,log2)" = 2 / 8 = 0.25$$

## API schema reference

This section describes the API payload for creating or updating a `content_anomaly` rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][6]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and content anomaly options. See [Options](#options). |
| `queries` | array | Queries for selecting logs which are part of the rule. See [Queries](#queries). |
| `cases` | array | Cases for generating signals. See [Cases](#cases). |

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |
| `groupSignalsBy` | array\<string\> | Additional grouping to perform on top of the existing groups in the query section. Must be a subset of the existing groups. |
| `referenceTables` | array | Reference tables for the rule. Maximum of 1,000,000 rows. |

### Queries

Content anomaly supports multiple queries per rule.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Used as an alias referenced in `cases[].condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][7]. |
| `aggregation` | string enum | yes | The aggregation type. Allowed values: `count`, `cardinality`, `sum`, `max`, `new_value`, `geo_data`, `event_count`, `none`. |
| `groupByFields` | array\<string\> | no | Fields to group by. |
| `distinctFields` | array\<string\> | conditional | Field for which the cardinality is measured. Required when `aggregation` is `cardinality`. |
| `metrics` | array\<string\> | conditional | Target fields to aggregate over. Required for `sum`, `max`, `geo_data`, `new_value` aggregations. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |
| `hasOptionalGroupByFields` | bool | no | When `false`, events without a group-by value are ignored. When `true`, events with missing group-by fields are processed with `N/A`. |

### Cases

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | no | A case contains logical operations (`>`, `>=`, `<`, `<=`, `&&`, `||`) to determine if a signal should be generated based on the anomalous event counts from the defined queries. |
| `notifications` | array\<string\> | no | Notification targets (for example, `@slack-*`, `@team-*`). |

### Options

Common `options` fields:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `content_anomaly` for this method. |
| `evaluationWindow` | int (seconds) | 0–86400 | Defines the time frame for counting anomalous logs. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |
| `keepAlive` | int (seconds) | ≥ `evaluationWindow` | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. |
| `maxSignalDuration` | int (seconds) | 3600–86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. |

**Cross-field constraint (server-enforced):** `evaluationWindow ≤ keepAlive ≤ maxSignalDuration`.

#### Content anomaly options

Method-specific options controlling the anomaly detection logic. See [Anomaly detection parameters](#anomaly-detection-parameters) above for UI-level configuration.

| Field | Type | Typical | Description |
|---|---|---|---|
| `learningDuration` | int (days) | 7 | Time window during which values are learned. No signals are generated during this phase. Range: `1`–`10` days. |
| `forgetAfter` | int (days) | 7 | How long learned values are retained before being discarded. Range: `1`–`10` days. |
| Similarity percentage threshold | int (percent) | 70 | Minimum similarity required to consider a log as normal. Range: `35`–`100`%. |
| Similar items threshold | int | 1 | Number of matching historical logs required for an incoming value to be considered normal. Range: `1`–`20`. |

### Example payload

```json
{
  "name": "Anomalous content in CloudTrail user creation events",
  "type": "log_detection",
  "isEnabled": true,
  "message": "Anomalous event content detected for {{@usr.name}}.",
  "tags": [
    "source:cloudtrail",
    "security:attack"
  ],
  "options": {
    "detectionMethod": "content_anomaly",
    "evaluationWindow": 3600,
    "keepAlive": 7200,
    "maxSignalDuration": 86400
  },
  "queries": [
    {
      "name": "anomalous_user_creation",
      "query": "source:cloudtrail @evt.name:CreateUser",
      "aggregation": "count",
      "groupByFields": ["@usr.name"]
    }
  ],
  "cases": [
    {
      "name": "",
      "status": "medium",
      "condition": "anomalous_user_creation >= 1",
      "notifications": []
    }
  ]
}
```

## Comparing content anomaly method with other detection methods

| Feature | Anomaly Detection | New Value Detection | Content Anomaly Detection |
|---------|-------------------|---------------------|---------------------------|
| Detects new field values | No | Yes | Yes (configurable) |
| Detects rare field values | No | No | Yes |
| Detects dissimilar values | No | No | Yes |
| Detects log spikes | Yes | No | No |
| Multiple queries supported | No | No | Yes |
| Multiple cases supported | No | No | Yes |
| Threshold definition for triggering signals | Learned from the log count distribution per time bucket (~99th percentile).| Always triggers a signal on the first occurrence of a new value. | User-specified (`1`-`100`) |
| Evaluation window | Yes | No | Yes |
| Retention | 14 days | 30 days | 10 days |

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing
[6]: /security/notifications/variables/
[7]: /logs/search_syntax/
[8]: /api/latest/security-monitoring/#create-a-detection-rule