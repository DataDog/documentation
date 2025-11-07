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