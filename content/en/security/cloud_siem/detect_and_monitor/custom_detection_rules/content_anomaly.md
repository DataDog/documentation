---
title: Content Anomaly
disable_toc: false
---

## Overview

While the anomaly method detects anomalies in volume and is ideal for identifying spikes in log or event activity, content anomaly detection analyzes the content of logs. The rule determines a similarity score for incoming values by comparing them to previous values. The similarity score helps determine whether the incoming value is an outlier. See [How an event is determined to be anomalous](?tab=contentanomaly#how-an-event-is-determined-to-be-anomalous) for more information.

## Create a rule

To create a threshold detection rule or job:

1. Navigate to the [Detection Rules][1] page and click **+ New Rule**.
1. Select whether you want to create a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.
1. Select the **Content Anomaly** option.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Define search queries

1. Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **Group by** field, specify the fields you want to group by.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
  **Note**: If the detection rule is modified, the learning period restarts at day `0`.
1. In the **Other parameters** section, you can specify the parameters to assess whether a log is anomalous or not. See [How an event is determined to be anomalous](#how-an-event-is-determined-to-be-anomalous) for more information.

#####  How an event is determined to be anomalous

Content anomaly detection balances precision and sensitivity using several rule parameters that you can set:

1. Similarity threshold: Defines how dissimilar a field value must be to be considered anomalous (default: `70%`).
1. Minimum similar items: Sets how many similar historical logs must exist for a value to be considered normal (default: `1`).
1. Evaluation window: The time frame during which anomalies are counted toward a signal (for example, a 10-minute time frame).

These parameters help to identify field content that is both unusual and rare, filtering out minor or common variations.

[1]: /logs/search_syntax/

#### Joining queries

{{% cloud_siem/joining_queries %}}

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

{{% cloud_siem/set_conditions %}}

#### Example

If you have a `failed_login` and a `successful_login` query:

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

and a rule case that triggers when `failed_login > 5 && successful_login>0`:

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="The set rule cases section set to trigger a high severity signal when failed_login is greater than five and successful_login is greater than zero" style="width:90%;" >}}

The rule case joins these queries together based on their `group by` value. The `group by` attribute is typically the same attribute because the value must be the same for the case to be met. If a `group by` value doesn't exist, the case will never be met. A Security Signal is generated for each unique `group by` value when a case is matched.

In this example, when there are more than five failed logins and at least one successful login for the same `User Name`, the first case is matched, and a Security Signal is generated.

### Severity and notification

{{% security-rule-severity-notification %}}

n the **Anomaly count** field, enter the condition for how many anomalous logs are required to trigger a signal. For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

After a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" once the time exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

{{% cloud_siem/create_suppression %}}

[1]: /logs/search_syntax/
[2]:  https://app.datadoghq.com/logs/

{{% /tab %}}
{{% tab "Scheduled rule" %}}

### Define search queries

{{% cloud_siem/define_search_queries %}}

### Add custom schedule

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Define search queries

{{% cloud_siem/define_search_queries %}}

### Notify when job is complete

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
