---
title: New Value
disable_toc: false
---

## Overview

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `country` or `IP address`, a security signal will be generated whenever a new value is seen which has not been seen before.

## Create a rule

To create a threshold detection rule or job, navigate to the [Detection Rules][1] page and click **+ New Rule**.

### Create a New Rule

Select a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.

### Define your rule or historical job

If you are creating a historical job, select the logs index and time range for the job.

Select the **New Value** tile.

### Define search queries

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

Construct a search query for your logs or events using the [Log Explorer search syntax][2].

To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**.

**Note**: The query applies to all ingested logs and events.

#### Learned value

In your search query, select the values you want to detect, the learning duration, and, optionally, define a signal grouping. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user or IP address).

For example, create a query for successful user authentication and set **Detect new value** to `country` and group by to `user`. Set a learning duration of `7 days`. Once configured, logs coming in over the next 7 days are evaluated with the set values. If a log comes in with a new value after the learning duration, a signal is generated, and the new value is learned to prevent future signals with this value.

You can also identify users and entities using multiple values in a single query. For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to **Detect new value**.

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
### Set conditions

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

{{% cloud_siem/set_conditions %}}

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

### Add custom schedule

{{% cloud_siem/add_custom_schedule %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Set conditions

#### Other parameters

In the **Forget Value** dropdown, select the number of days (**1**-**30 days**) after which the value is forgotten.

In the **Job multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected within a specified time frame. For example, the same signal updates if any new value is detected within 1 hour, for a maximum duration of 24 hours.

**Note**: If a unique signal is required for every new value, configure this value to `0` minutes.

Toggle **Enable Optional Group By** section, if you want to group events even when values are missing. If there is a missing value, a sample value is generated to avoid selection exclusion.

### Notify when job is complete

{{% cloud_siem/notify_when_job_complete %}}

### Describe your playbook

{{% security-rule-say-whats-happening %}}

Click **Save Rule**.

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /logs/search_syntax/