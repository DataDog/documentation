---
title: Threshold
disable_toc: false
---

## Overview

Detect when events exceed a threshold that you define. For example, if you create a trigger with a threshold greater than `10`, a security signal is generated when the condition is met.

## Create a rule

To create a threshold detection rule or job:

1. Navigate to the [Detection Rules][1] page and click **+ New Rule**.
1. Select whether you want to create a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.
1. Leave the **Threshold** option as the selected detection method.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

{{% cloud_siem/define_search_queries %}}

#### Joining queries

{{% cloud_siem/joining_queries %}}


{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Set conditions

{{% cloud_siem/set_conditions %}}

#### Example

If you have a `failed_login` and a `successful_login` query:

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

and a rule condition that triggers when `failed_login > 5 && successful_login>0`:

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="The set rule conditions section set to trigger a high severity signal when failed_login is greater than five and successful_login is greater than zero" style="width:90%;" >}}

The rule condition joins these queries together based on their `group by` value. The `group by` attribute is typically the same attribute because the value must be the same for the condition to be met. If a `group by` value doesn't exist, the condition will never be met. A security signal is generated for each unique `group by` value when a condition is matched.

In this example, when there are more than five failed logins and at least one successful login for the same `User Name`, the first condition is matched, and a security signal is generated.

#### Severity and notification

{{% security-rule-severity-notification %}}

#### Time windows

{{% security-rule-time-windows %}}

Click **Add Condition** to add additional conditions.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

#### Other parameters

In the **Rule multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected within a specified time frame. For example, the same signal updates if any new value is detected within 1 hour, for a maximum duration of 24 hours.

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
