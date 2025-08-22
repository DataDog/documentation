---
title: Content Anomaly
disable_toc: false
---

## Overview

While the anomaly method detects anomalies in volume and is ideal for identifying spikes in log or event activity, content anomaly detection analyzes the content of logs. The rule determines a similarity score for incoming values by comparing them to previous values. The similarity score helps determine whether the incoming value is an outlier. See [How an event is determined to be anomalous](?tab=contentanomaly#how-an-event-is-determined-to-be-anomalous) for more information.

## Create a rule

To create a threshold detection rule or job, navigate to the [Detection Rules][1] page and click **+ New Rule**.

### Create a New Rule

Select a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.

### Define your rule or historical job

If you are creating a historical job, select the logs index and time range for the job.

Select the **Content Anomaly** tile.

### Define search queries

1. Construct a search query for your logs or events using the [Log Explorer search syntax][2]. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **Group by** field, specify the fields you want to group by.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
  **Note**: If the detection rule is modified, the learning period restarts at day `0`.

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Set conditions

#### Severity and notification

{{% security-rule-severity-notification %}}

n the **Anomaly count** field, enter the condition for how many anomalous logs are required to trigger a signal. For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

#### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

After a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" once the time exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

#### Other parameters

In the **Content anomaly detection options** section, specify the parameters to assess whether a log is anomalous or not. See [How an event is determined to be anomalous](#how-an-event-is-determined-to-be-anomalous) for more information.

In the **Rule multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected.

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid selection exclusion.

##### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

#####  How an event is determined to be anomalous

Content anomaly detection balances precision and sensitivity using several rule parameters that you can set:

1. Similarity threshold: Defines how dissimilar a field value must be to be considered anomalous (default: `70%`).
1. Minimum similar items: Sets how many similar historical logs must exist for a value to be considered normal (default: `1`).
1. Evaluation window: The time frame during which anomalies are counted toward a signal (for example, a 10-minute time frame).

These parameters help to identify field content that is both unusual and rare, filtering out minor or common variations.

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

{{% cloud_siem/create_suppression %}}

{{% /tab %}}
{{% tab "Scheduled rule" %}}

### Add custom schedule

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Notify when job is complete

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

Click **Save Rule**.

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /logs/search_syntax/