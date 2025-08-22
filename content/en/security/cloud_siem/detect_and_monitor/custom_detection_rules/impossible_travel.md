---
title: Impossible Travel
disable_toc: false
---

## Overview

Impossible travel detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events.

## Create a rule

To create a threshold detection rule or job, navigate to the [Detection Rules][1] page and click **+ New Rule**.

### Create a New Rule

Select a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.

### Define your rule or historical job

If you are creating a historical job, select the logs index and time range for the job.

Select the **Impossible Travel** tile.

### Define search queries

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][2]. All logs matching this query are analyzed for a potential impossible travel. The `Preview matching logs` section shows logs that match the query.

#### User attribute

For the `user attribute`, select the field in the analyzed log that contains the user ID. This can be an identifier like an email address, user name, or account identifier.

#### Location attribute

The `location attribute` specifies which field holds the geographic information for a log. The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][3] to give a log location information based on the client's IP address.

#### Baseline user locations

Click the checkbox if you'd like Datadog to learn regular access locations before triggering a signal.

When selected, signals are suppressed for the first 24 hours. In that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.

Do not click the checkbox if you want Datadog to detect all impossible travel behavior.

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

#### Time windows

{{% security-rule-time-windows %}}

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

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

### Set conditions

#### Severity and notification

{{% security-rule-severity-notification %}}

#### Time windows

{{% security-rule-time-windows %}}

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

#### Other parameters

In the **Rule multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected.

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

In the **Job multi-triggering behavior** section, select how often you want to keep updating the same signal if new values are detected.

Toggle **Decrease severity for non-production environment** if you want to prioritize production environment signals over non-production signals. See [Decreasing non-production severity](#decreasing-non-production-severity) for more information.

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
[3]]: /logs/log_configuration/processors/?tab=ui#geoip-parser