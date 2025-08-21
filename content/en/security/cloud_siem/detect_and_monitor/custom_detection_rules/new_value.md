---
title: New Value
disable_toc: false
---

## Overview

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `country` or `IP address`, a security signal will be generated whenever a new value is seen which has not been seen before.

## Create a rule

To create a threshold detection rule or job:

1. Navigate to the [Detection Rules][1] page and click **+ New Rule**.
1. Select whether you want to create a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.
1. Select the **New Value** option.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

{{% cloud_siem/define_search_queries_new_value %}}

#### Learned value

{{% cloud_siem/learned_value %}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

#### Severity and notification

{{% security-rule-severity-notification %}}

#### Other parameters

In the **Forget Value** dropdown, select the number of days (**1**-**30 days**) after which the value is forgotten.

In the **Rule multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected within a specified time frame. For example, the same signal updates if any new value is detected within 1 hour, for a maximum duration of 24 hours.

**Note**: If a unique signal is required for every new value, configure this value to `0` minutes.

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid selection exclusion.

##### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

{{% cloud_siem/create_suppression %}}

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Scheduled rule" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

{{% cloud_siem/define_search_queries_new_value %}}

#### Learned value

{{% cloud_siem/learned_value %}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Add custom schedule

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

{{% cloud_siem/define_search_queries_new_value %}}

#### Learned value

{{% cloud_siem/learned_value %}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

### Notify when job is complete

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
