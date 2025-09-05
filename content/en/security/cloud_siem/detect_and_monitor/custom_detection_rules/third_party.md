---
title: Third Party
disable_toc: false
---

## Overview

Third Party allows you to forward alerts from an outside vendor or application. You can update the rule with suppression queries and who to notify when a signal is generated.

## Create a rule

### Create a New Rule

Select a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.

### Define your rule or historical job

If you are creating a historical job, select the logs index and time range for the job.

Select the **Third Party** tile.

### Define search queries

#### Root query

Construct a search query for your logs or audit events using the [Log Explorer search syntax][2].

To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**.

The trigger defined for each new attribute generates a signal for each new value of that attribute over a 24-hour roll-up period.

Click **Add Root Query** to add additional queries.

**Note**: The query applies to all ingested logs and events.

#### Joining root queries

{{% cloud_siem/joining_queries %}}

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

{{% cloud_siem/set_conditions %}}



#### Severity and notification

{{% security-rule-severity-notification %}}

#### Other parameters

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid getting excluded.

##### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

{{% cloud_siem/create_suppression %}}

{{% /tab %}}
{{% tab "Scheduled rule" %}}

### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

{{% cloud_siem/set_conditions %}}



#### Severity and notification

{{% security-rule-severity-notification %}}

#### Other parameters

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid getting excluded.

##### Decreasing non-production severity

{{% cloud_siem/decreasing_non_prod_severity %}}

### Add custom schedule

{{% cloud_siem/add_custom_schedule %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

{{% cloud_siem/set_conditions %}}



#### Other parameters

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid getting excluded.

### Notify when job is complete

{{% cloud_siem/notify_when_job_complete %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

Click **Save Rule**.

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /logs/search_syntax/