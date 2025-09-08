---
title: Content Anomaly
disable_toc: false
---

## Overview

Content anomaly detection analyzes incoming logs to identify and alert on anomalous log content. It examines user-specified fields and triggers signals when new logs contain values that significantly deviate from historical patterns within a group. A significant deviation is when the similarity between incoming and historical values is low or there is no similarity at all.

See [Create Rule][1] for detailed instructions on how to configure a content anomaly rule.

## How the content anomaly detection works

### 1. Define the rule
In the rule editor:
  1. Select **Content Anomaly** as the detection method.
  1. Specify a query to filter logs.
  1. Select the fields to analyze.
  1. Define **group by** fields and the **learning period** (1-10 days).
  1. Set conditions for how many anomalous logs are required to trigger a signal.
  1. Optionally, adjust **Other Parameters** (defaults are provided).

### 2. Learning historical values
- During the **learning period**, the rule observes logs and learns typical field values.
- No signals are generated during this phase.
- If the rule is modified, the learning period restarts.

### 3. Detecting anomalies

- After the learning period has passed, incoming logs are compared against historical values.
- If a log's field values are significantly different and the count of anomalous logs meets the threshold, a signal is triggered.

## Configuration options

### Learning duration (`learningDuration`)

- Definition: Time window during which values are learned without generating signals.
- Default: 7 days
- Limits: 1-10 days

### Forget after (forgetAfter)

- Definition: How long the learned values are retained before being discarded.
- Default: 7 days
- Limits: 1-10 days

### Anomaly detection parameters

- `similarityPercentageThreshold`
  - Definition: Minimum similarity required to consider a log as normal.
  - Default: 70%
  - Limits: 35-100%

- `nbSimilarItemsThreshold`
  - Definition: Number of historical logs required for an incoming value to be considered normal.
  - Default: 1
  - Limits: 1-20

### Evaluation window (`evaluationsWindow`)
  - Definition: Defines the time frame for counting anomalous logs. Signals are triggered if anomalies exceed the case condition (for example, `a >= 2`, where `a` is the query).
  - Limits: 0-24 hours

## How a log is assessed

1. Logs are tokenized using Unicode Text Segmentation (UTS #29).
1. Tokens are compared using Jaccard similarity.
1. Efficient comparisons are achieved with MinHash and Locality Sensitive Hashing (LSH).
1. A log is anomalous if it fails both similarity and historical thresholds.

## Similarity computation examples

### Single-word fields

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

Intersection = {auth, k8s, public}, Union = {auth, k8s, public, swe, pm} → Jaccard = 3/5 = 0.6

### Multi-word fields

```
log1={actionDescription: "User connected to abc network"}
log2={actionDescription: "User got unauthorized network access"}
```

Intersection = {User, network}, Union = {User, connected, to, abc, network, got, unauthorized, access} → Jaccard = 2/8 = 0.25

## Comparison to other detection methods

| Feature | Anomaly Detection | New Value Detection | Content Anomaly Detection |
|---------|-------------------|---------------------|---------------------------|
| Detects new field values | No | Yes | Yes (configurable) |
| Detects rare field values | No | No | Yes |
| Detects dissimilar values | No | No | Yes |
| Detects log spikes | Yes | No | No |
| Multiple queries supported | No | No | Yes |
| Multiple cases supported | No | No | Yes |
| Threshold definition | Learned distribution | Always `1` | User-specified |
| Evaluation window | Yes | No | Yes |
| Retention | 14 days | 30 days | 10 days |

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule