---
title: Sequence
description: Learn about how the sequence detection method works.
disable_toc: false
further_reading:
  - link: "https://www.datadoghq.com/blog/cloud-siem-enterprise-security"
    tag: "Blog"
    text: "Datadog Cloud SIEM: Driving innovation in security operations"

---

## Overview

The sequence method enables you to detect multi-stage attacks by identifying ordered patterns of related events, such as initial access, privilege escalation, and data exfiltration.

You can define a sequence of steps that must occur within a defined time frame and across related entities, such as a user, host, or IP address. Each sequence can combine conditions from multiple logs or signals to identify coordinated activity that might be missed by individual rules.

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="Sequence editor page showing a preview of the steps" style="width:100%;" >}}

See [Create Rule][1] for instructions on how to configure a sequence rule.

## How the sequence method works

### Detection logic

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="Sequence editor page showing three steps" style="width:100%;" >}}

Sequence detection evaluates a defined series of steps that represent distinct stages of suspicious behavior. Each step corresponds to:

- A condition such as a threshold on a log query or a signal match
- Transitions that define the order and time constraints between steps

The rule is triggered when all steps occur in the specified order and within the configured time windows.

### Linking entities

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="Sequence editor page showing a step with the group by field highlighted" style="width:100%;" >}}

The sequence of steps can be correlated across users, accounts, IP addresses, and other fields to automatically track linked entities through `group by` fields. This allows you to follow an attacker's path across different identities and systems.

### Evaluation window

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="Sequence editor page showing the evaluation window highlighted" style="width:100%;" >}}

Each transition between steps has a configurable evaluation window that determines how long the rule waits for the next step to occur. For example, a rule might trigger when `user login from an unusual location` is followed within 20 minutes by a `privilege escalation`, where the user might have gone from a standard role to an admin role.

## Configuration options

When you [create a sequence detection rule][1], you can configure these options:

| Setting | Description | Impact |
|---------|-------------|--------|
| Data type | Specify whether each query evaluates logs, signals, or rules. | Defines data sources for detection. |
| Steps | Define each detection condition, including query and threshold. | Determines which behaviors are monitored. |
| Step transitions | Define the order and time relationship between steps. | Controls when a sequence qualifies for a signal. |
| Evaluation window | After a step has occurred, the time (in seconds) to wait for the next step. | Larger windows increase detection coverage, but may result in more noise. |
| Group by fields | Fields used to link activity across steps (for example, `@usr.email`, `@ip`). | Determines how entities are correlated across queries. |

## Limits

- Sequence detection supports up to 10 steps per rule and a total evaluation window of 24 hours.
- Steps must be in a linear sequence.

## API schema reference

This section describes the API payload for creating or updating a `sequence_detection` rule using the `POST /api/v2/security_monitoring/rules` and `PUT /api/v2/security_monitoring/rules/{rule_id}` endpoints.

### Top-level payload fields

#### Required

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rule. |
| `type` | string enum | The rule type. Use `log_detection` for Cloud SIEM rules. Allowed values: `log_detection`, `workload_security`, `application_security`, `api_security`, `workload_activity`. |
| `message` | string | Message for generated signals. Supports Mustache templating (see [Security notification variables][2]). |
| `isEnabled` | bool | Whether the rule is enabled. |
| `options` | object | Contains `detectionMethod` and `sequenceDetectionOptions`. See [Options](#options). |
| `queries` | array | One query per step in the sequence. See [Queries](#queries). |
| `cases` | array | Cases for generating signals. See [Cases](#cases). |

#### Optional

| Field | Type | Description |
|---|---|---|
| `tags` | array\<string\> | Tags for generated signals. |
| `hasExtendedTitle` | bool | Whether the notifications include the triggering group-by values in their title. |
| `groupSignalsBy` | array\<string\> | Additional grouping. Must be a subset of the existing groups. |

### Queries

A `sequence_detection` rule has one query per step. Each query is linked to a step via its `name`.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Name of the query. Referenced by the corresponding step's `condition`. |
| `query` | string | yes | Query to run on logs. See [Log search syntax][3]. |
| `aggregation` | string enum | yes | Must be `count` for sequence detection. |
| `groupByFields` | array\<string\> | yes | Fields to group by. **Must be identical across every step's query** so stages join on the same entity (for example, all queries group by `@network.client.ip`). |
| `distinctFields` | array\<string\> | no | Leave empty (`[]`) for `sequence_detection`. |
| `dataSource` | string enum | no | Source of events. Defaults to `logs`. Allowed values: `logs`, `audit`, `app_sec_spans`, `spans`, `security_runtime`, `network`, `events`, `security_signals`. |

**Note:** `sequence_detection` is a count-based method. `cardinality`, `new_value`, and other aggregations are not valid for step queries.

### Cases

A `sequence_detection` rule carries a single case whose `condition` references only the **terminal step's alias**. Do **not** use the `THEN` operator in the case condition — sequential ordering lives in `sequenceDetectionOptions`, not in the case grammar.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | no | Name of the case. Often empty. |
| `status` | string enum | yes | Severity of the Security Signal. Allowed values: `info`, `low`, `medium`, `high`, `critical`. |
| `condition` | string | yes | Expression over the terminal step's alias (for example, `final_step > 0`). Must not contain `THEN`. |
| `notifications` | array\<string\> | no | Notification targets. |

### Options

Common `options` fields:

| Field | Type | Typical | Description |
|---|---|---|---|
| `detectionMethod` | string enum | required | The detection method. Must be `sequence_detection` for this method. |
| `keepAlive` | int (seconds) | 3600 | Once a signal is generated, the signal remains "open" if a case is matched at least once within this keep-alive window. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |
| `maxSignalDuration` | int (seconds) | 86400 | A signal "closes" regardless of case matching once the time exceeds the maximum duration. |
| `decreaseCriticalityBasedOnEnv` | bool | `false` | If `true`, signals in non-production environments have a lower severity. |

**Note:** `evaluationWindow` at the top level of `options` is **not used** for sequence rules. Each step and each transition carries its own window. Omit the top-level field or leave it at `0`.

#### `sequenceDetectionOptions`

Method-specific sub-object under `options`.

##### `steps[]`

Ordered list of chain stages. The first entry is the entry point; the last is the terminal step referenced by the case condition.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Unique name identifying the step. Referenced by `stepTransitions[].parent`/`child` and by the case condition. |
| `condition` | string | yes | Condition referencing the corresponding query alias (for example, `user_creation1 > 0`). Uses the same grammar as case conditions. |
| `evaluationWindow` | int (seconds) | yes | Per-step window during which the step's query must match. Allowed values: `0`, `60`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `10800`, `21600`. |

##### `stepTransitions[]`

Transitions defining the allowed order of steps and their evaluation windows.

| Field | Type | Required | Description |
|---|---|---|---|
| `parent` | string | yes | Name of the parent (upstream) step. |
| `child` | string | yes | Name of the child (downstream) step. |
| `evaluationWindow` | int (seconds) | yes | Maximum wait between `parent` firing and `child` firing. Allowed values: same as `steps[].evaluationWindow`. |

### Constraints

- **Total chain duration ≤ 24 hours (86400 seconds).** The sum of `stepTransitions[].evaluationWindow` bounds the total chain duration.
- Up to 10 steps per rule.
- Steps must be in a linear sequence.
- `groupByFields` must match across every step's query.
- Do not use `THEN` in the case condition — ordering is enforced by step order.

### Example payload

Example of a `sequence_detection` rule that chains three CloudTrail stages — `CreateUser` → admin policy attachment → impact action — all correlated by client IP.

```json
{
  "name": "CloudTrail CreateUser → policy attachment → impact",
  "type": "log_detection",
  "isEnabled": true,
  "message": "User creation followed by admin policy attachment followed by impact action, all from {{@network.client.ip}}.",
  "tags": [
    "source:cloudtrail",
    "security:attack",
    "tactic:TA0003-persistence"
  ],
  "options": {
    "detectionMethod": "sequence_detection",
    "evaluationWindow": 0,
    "keepAlive": 3600,
    "maxSignalDuration": 86400,
    "sequenceDetectionOptions": {
      "steps": [
        { "name": "user_creation",     "condition": "user_creation1 > 0",     "evaluationWindow": 21600 },
        { "name": "policy_attachment", "condition": "policy_attachment1 > 0", "evaluationWindow": 21600 },
        { "name": "mitre_impact",      "condition": "mitre_impact1 > 0",      "evaluationWindow": 21600 }
      ],
      "stepTransitions": [
        { "parent": "user_creation",     "child": "policy_attachment", "evaluationWindow": 21600 },
        { "parent": "policy_attachment", "child": "mitre_impact",      "evaluationWindow": 21600 }
      ]
    }
  },
  "queries": [
    {
      "name": "user_creation1",
      "query": "source:cloudtrail @evt.name:CreateUser @eventSource:iam.amazonaws.com",
      "aggregation": "count",
      "dataSource": "logs",
      "groupByFields": ["@network.client.ip"],
      "distinctFields": []
    },
    {
      "name": "policy_attachment1",
      "query": "source:cloudtrail @evt.name:(AttachUserPolicy OR AttachRolePolicy OR PutRolePolicy)",
      "aggregation": "count",
      "dataSource": "logs",
      "groupByFields": ["@network.client.ip"],
      "distinctFields": []
    },
    {
      "name": "mitre_impact1",
      "query": "source:cloudtrail @evt.name:(DeleteTrail OR StopLogging OR CreateAccessKey OR DeleteBucket)",
      "aggregation": "count",
      "dataSource": "logs",
      "groupByFields": ["@network.client.ip"],
      "distinctFields": []
    }
  ],
  "cases": [
    {
      "status": "info",
      "name": "",
      "condition": "mitre_impact > 0",
      "notifications": []
    }
  ]
}
```

### Further reading

- [Create a detection rule (API reference)][4]
- [Log search syntax][3]
- [Security notification variables][2]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=sequence
[2]: /security/notifications/variables/
[3]: /logs/search_syntax/
[4]: /api/latest/security-monitoring/#create-a-detection-rule
