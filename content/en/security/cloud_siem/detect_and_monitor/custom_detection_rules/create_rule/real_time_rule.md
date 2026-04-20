---
title: Create a Real-Time Rule
aliases:
    - /security/cloud_siem/detect_and_monitor/custom_detection_rules/signal_correlation_rules/
code_lang: real_time_rule
type: multi-code-lang
weight: 1
---

## Overview

Real-time detection rules continuously monitors and analyzes incoming logs for security threats. These rules trigger immediate alerts when specific patterns or anomalies are detected, enabling quicker response to potential incidents.

## Create a rule

1. To create a detection rule, navigate to the [Create a New Detection][1] page.
1. Select **Real-Time Rule**.

## Define your real-time rule

Select the detection method you want to use for creating signals.

## Define search queries

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/threshold_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/new_value_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values you want to count during the specified time frame.
{{% cloud_siem/anomaly_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/impossible_travel_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

**Note**: All logs and events matching this query are analyzed for a potential impossible travel.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a root query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over 24-hour roll-up period.
{{% cloud_siem/unit_testing %}}

Click **Add Root Query** to add additional queries.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Signal Correlation" %}}

{{< img src="security/security_monitoring/detection_rules/signal_correlation_query.png" alt="Define the search query" style="width:100%;" >}}

1. Select a rule for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Use the **correlated by** dropdown to define the correlating attribute.
    - You can select multiple attributes (maximum of 3) to correlate the selected rules.
1. Select a rule for **Rule b** in the second Rule editor's dropdown.
    - The attributes and sliding window time frame is automatically set to what was selected for **Rule a**.
1. Click the pencil icon to rename the rule.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Sequence" %}}

{{< img src="security/security_monitoring/detection_rules/sequence/sequence_queries.png" alt="Sequence editor page showing the sequence with two steps" style="width:100%;" >}}

#### Add step

1. To search a different data type, click the down arrow next to **Logs** and select **Signals** or **Rules**.
1. Define the condition for the step.
    - **Logs**: Construct a search query using the [Log Explorer search syntax][1].
    - **Signals**: Reference an existing rule or query on signal fields.
    - **Rules**: Select a rule.
1. Set **group by** fields (for example, `@usr.email` or `@ip.address`) to link entities across steps.
1. Enter a threshold condition, such as `>10`.
1. If you want to use another query, connect this query with the next query using `AND` or `OR` and repeat steps 1-4.
1. In the **roll-up over** dropdown menu, select the time frame all queries in that step must occur to transition to the next step.

#### Define step transitions

For the current step and the next step:

1. In the **within** dropdown menu, select an evaluation window for the transition.
    - **Note**: The total evaluation time across the sequence can be up to 24 hours.
1. Follow the instructions in [Add step](#add-step) to complete the step.
    - **Note**: You can select different `group by` fields between steps. For example, link `@usr.email`from an earlier step to `@ip.address` in a later step.
1. Click **Add Step** if you want to add more steps.

#### Severity and notification

1. In the **Trigger** dropdown menu, select the severity status.
1. (Optional) In the **Add notify** section, click **Add Recipient** to configure [notification targets][2].
    - You can create [notification rules][3] to manage notifications automatically, avoiding manual edits for each detection rule.

#### Review the sequence preview

In the **Preview detection** section, check the steps, transitions, and time window in the visualization of the steps. Reorder the steps and adjust time windows as needed.

[1]: /logs/search_syntax/
[2]: /security_platform/notifications/#notification-channels
[3]: /security/notifications/rules/

{{% /tab %}}
{{< /tabs >}}

## Set conditions

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_threshold %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-threshold}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-threshold}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Forget value {#forget-value-rt-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-rt-new-value}

{{% cloud_siem/rule_multi_triggering %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-new-value}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-new-value}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-anomaly}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_content_anomaly %}}

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-rt-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-rt-content-anomaly}

{{% cloud_siem/rule_multi_triggering_content_anomaly %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-rt-content-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-impossible-travel}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-impossible-travel}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-impossible-travel}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/condition_else.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_third_party %}}

### Other parameters

#### 1. Decrease severity for non-production environments {#decrease-severity-rt-third-party}

{{% cloud_siem/enable_decrease_severity %}}

#### 2. Enable optional group by {#enable-group-by-rt-third-party}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Signal Correlation" %}}

{{< img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_then_operator %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-signal-correlation}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-signal-correlation}

{{% cloud_siem/enable_decrease_severity %}}

{{% /tab %}}
{{% tab "Sequence" %}}

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-sequence}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-sequence}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-sequence}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{< /tabs >}}

## Describe your playbook

{{% security-rule-say-whats-happening %}}

## Create a suppression

{{% cloud_siem/create_suppression %}}

## API schema reference

This section describes the real-time detection rule schema, covering the `threshold` detection method (the default) and the case condition grammar that applies across all real-time detection methods. It is also used by the [Security Monitoring API][10] to create and update rules.

For method-specific schemas, see the dedicated pages: [Anomaly][11], [New Value][12], [Impossible Travel][13], [Content Anomaly][14], [Third Party][15], [Sequence][16].

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][17]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` plus method-specific sub-objects. See [Options](#options). |
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
| `calculatedFields` | array | Calculated fields. Only allowed for scheduled rules — in other words, when `schedulingOptions` is also defined. |
| `thirdPartyCases` | array | Required when `detectionMethod` is `third_party`; replaces `cases`. See [Third Party][15]. |

### Queries

A threshold rule can contain one or more queries. See method-specific pages for constraints on other detection methods.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Used as an alias referenced in `cases[].condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][18]. |
| `aggregation` | string enum | yes | The aggregation type. Allowed values: `count`, `cardinality`, `sum`, `max`, `new_value`, `geo_data`, `event_count`, `none`. |
| `groupByFields` | array\<string\> | usually | Fields to group by. One signal is emitted per distinct group-by tuple. |
| `distinctFields` | array\<string\> | conditional | Field for which the cardinality is measured. Required when `aggregation` is `cardinality`. |
| `metrics` | array\<string\> | conditional | Target fields to aggregate over. Required for `sum`, `max`, `geo_data`, and `new_value` aggregations. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |
| `indexes` | array\<string\> | no | List of indexes to query when the `dataSource` is `logs`. Only used for scheduled rules. |
| `hasOptionalGroupByFields` | bool | no | When `false`, events without a group-by value are ignored by the rule. When `true`, events with missing group-by fields are processed with `N/A` replacing the missing values. |

#### Aggregation rules matrix

Server-enforced combinations of `aggregation`, `distinctFields`, `metrics`, and `groupByFields`:

| Aggregation | `distinctFields` | `metrics` | `groupByFields` |
|---|---|---|---|
| `count` | no | no | yes |
| `cardinality` | yes | no | yes |
| `sum` | no | yes (numeric field) | yes |
| `max` | no | yes (numeric field) | yes |
| `new_value` | no | yes (watched attribute) | yes |
| `geo_data` | no | yes (`@network.client.geoip`) | yes |
| `event_count` | no | no | no |
| `none` | no | no | no (used by `third_party`) |

### Cases

Cases turn query results into signals. They are evaluated **top-down, first match wins**. Order cases by decreasing severity (`critical` → `high` → `medium` → `low` → `info`) so the most important verdict is picked first. If no case matches, no signal is generated.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. Available as `{{case_name}}` in the `message` template. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | conditional | Expression over query aliases (for example, `failed_logins > 5`). Required when multiple cases compete; may be omitted when a rule has a single trivial case. |
| `notifications` | array\<string\> | no | Notification targets (for example, `@slack-*`, `@team-*`, `@email-...`, `@webhook-...`). Mustache templates like `@slack-{{service.name}}` are supported. |
| `actions` | array | no | AppSec only — omit on `log_detection` rules. |

#### Case condition grammar

The `condition` field accepts a grammar of logical, comparison, sequential, and multiplicative operators over query aliases and non-negative integer literals.

**Supported operators:**

| Category | Operators |
|---|---|
| Comparison | `>`, `>=`, `<`, `<=` |
| Logical | `&&` (AND), `||` (OR) |
| Sequential | `THEN` (uppercase keyword) |
| Multiplicative | `*` against a non-negative integer literal (for example, `a > 2 * b`, `3 * a > b`) |
| Grouping | parentheses |

**Not supported** — rejected at validation time:

- `==`, `!=` (equality / inequality)
- `!` (logical NOT)
- `+`, `-`, `/`, `%` (arithmetic other than multiplicative)
- Negative numbers
- Decimal numbers

**Operand rules:**

- Query aliases must match `[a-z][a-z0-9_]*` (lowercase start, lowercase / digits / underscore after).
- `NUMBER` tokens are non-negative integers only.
- A comparison accepts these shapes:
  - `query op NUMBER` (for example, `failed_logins > 5`)
  - `NUMBER op query` (for example, `5 < failed_logins`) — **both forms are valid**
  - `query op query` (for example, `errors > warnings`)
  - Either side may be multiplied by an integer literal: `query * NUMBER` or `NUMBER * query`

**Precedence:** `&&` binds tighter than `||`. Use parentheses to disambiguate:

```
(a > 0 && b > 0) || c > 10
```

**`THEN` (sequential):**

A case condition is either a single expression or `<if-expr> THEN <then-expr>`. Exactly one `THEN` per condition is allowed. Do not combine `THEN` with top-level `&&` / `||` — group into the two sides of the `THEN`.

`THEN` enforces **temporal ordering**: `create_user > 0 THEN attach_admin > 0` fires only when a `create_user` match precedes an `attach_admin` match in time. Rewriting the same condition as `create_user > 0 && attach_admin > 0` silently drops the ordering requirement.

`THEN` here is the threshold-style sequential operator for `log_detection` cases. It is **not** the same feature as the [Sequence][16] detection method, which encodes ordering explicitly via `options.sequenceDetectionOptions.steps` and `stepTransitions`.

**Anomaly detection subset:** For `anomaly_detection` rules, the parser accepts only the narrow forms `query op NUMBER` or `NUMBER op query`. See [Anomaly][11].

### Options

Common `options` fields shared across detection methods:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Allowed values: `threshold`, `new_value`, `anomaly_detection`, `impossible_travel`, `third_party`, `sequence_detection`. |
| `evaluationWindow` | int (seconds) | 300 | A time window that matches when at least one of the cases evaluates true. Sliding, real-time. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. Not used for `third_party`. |
| `keepAlive` | int (seconds) | ≥ `evaluationWindow` | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. Not used for `third_party`. |
| `maxSignalDuration` | int (seconds) | 3600–86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. Decreased by one level when the environment tag starts with `staging`, `test`, or `dev`. `INFO` remains `INFO`. |

**Cross-field constraint (server-enforced):** `evaluationWindow ≤ keepAlive ≤ maxSignalDuration`.

For method-specific options (`newValueOptions`, `anomalyDetectionOptions`, `impossibleTravelOptions`, `thirdPartyRuleOptions`, `sequenceDetectionOptions`), see the corresponding method page.

### Example threshold payload

Example of a `threshold` rule that fires when there are more than 5 failed authentications within a 5-minute window, grouped by user.

```json
{
  "name": "Multiple failed authentications from a single user",
  "type": "log_detection",
  "isEnabled": true,
  "message": "User {{@usr.name}} failed authentication {{events_matched}} times.",
  "tags": [
    "source:cloudtrail",
    "security:attack",
    "technique:T1110-brute-force",
    "tactic:TA0006-credential-access"
  ],
  "options": {
    "detectionMethod": "threshold",
    "evaluationWindow": 300,
    "keepAlive": 3600,
    "maxSignalDuration": 86400,
    "decreaseCriticalityBasedOnEnv": true
  },
  "queries": [
    {
      "name": "failed_logins",
      "query": "source:cloudtrail @evt.name:ConsoleLogin @responseElements.ConsoleLogin:Failure",
      "aggregation": "count",
      "groupByFields": ["@usr.name"],
      "distinctFields": []
    }
  ],
  "cases": [
    {
      "name": "brute_force_attempt",
      "status": "high",
      "condition": "failed_logins > 5",
      "notifications": []
    }
  ]
}
```

### Further reading

- [Create a detection rule (API reference)][10]
- [Log search syntax][18]
- [Security notification variables][17]

[1]: https://app.datadoghq.com/security/siem/rules/new
[10]: /api/latest/security-monitoring/#create-a-detection-rule
[11]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[12]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[13]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[14]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[15]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[16]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[17]: /security/notifications/variables/
[18]: /logs/search_syntax/