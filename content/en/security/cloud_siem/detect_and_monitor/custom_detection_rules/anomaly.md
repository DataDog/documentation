---
title: Anomaly
disable_toc: false
---

## Overview

When configuring a specific threshold isn't an option, you can define an anomaly detection rule instead. With anomaly detection, a dynamic threshold is automatically derived from the past observations of the events.

## Create a rule

To create a threshold detection rule or job:

1. Navigate to the [Detection Rules][1] page and click **+ New Rule**.
1. Select whether you want to create a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.
1. Select the **Anomaly** option.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**. Construct a search query for your logs or events using the [Log Explorer search syntax][101].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).

Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it does not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.

You can also filter logs using values from a specific columns in a reference table. See [Filter logs based on reference tables](#filter-logs-based-on-reference-tables) for more details.

Click **Unit Test** if you want to test the selected query against a sample log. See [Unit testing](#unit-testing) for more information.

**Note**: The query applies to all ingested logs and events.

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Set conditions

#### Severity and notification

{{% security-rule-severity-notification %}}

#### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

After a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" after the time period exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

#### Other parameters

In the **Rule multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected.

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid selection exclusion.


##### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

{{% cloud_siem/create_suppression %}}

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
