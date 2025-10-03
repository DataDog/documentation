---
title: Create a Historical Job
code_lang: historical_job
type: multi-code-lang
weight: 3
---

## Overview

Historical jobs are one-time executable queries on historical logs used to backtest detection rules and assess their effectiveness on past data. The generated job results are lightweight versions of signals providing information on potential threats and anomalies on historical logs. After reviewing the results, you can convert results needing immediate action into signals.

## Create a rule

1. To create a threshold detection rule or job, navigate to the [Create a New Detection][1] page.
1. Select **Historical Job**.

## Define your historical job

1. Select the logs index and time range for the job.
1. Select the detection method you want to use for creating signals.

## Define search queries

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/threshold_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/new_value_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/impossible_travel_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

**Note**: All logs and events matching this query are analyzed for a potential impossible travel.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a root query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over 24-hour roll-up period.
{{% cloud_siem/add_calculated_fields %}}
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

Click **Add Root Query** to add additional queries.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Set conditions

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_historical_condition.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_threshold %}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-threshold}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

### Other parameters

#### 1. Forget value {#forget-value-historical-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Job multi-triggering behavior {#job-multi-triggering-historical-new-value}

{{% cloud_siem/job_multi_triggering %}}

#### 3. Enable optional group by {#enable-group-by-historical-new-value}

{{% cloud_siem/enable_group_by %}}

#### 4. Enable instantaneous baseline

{{% cloud_siem/enable_instantaneous_baseline %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_historical_condition.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" >}}

1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Anomaly count** field, enter the condition for how many anomalous logs within the specified window are required to trigger a signal.
    - For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.
    - All rule conditions are evaluated as condition statements. Thus, the order of the conditions affects which notifications are sent because the first condition to match generates the signal. Click and drag your rule conditions to change their ordering.
    - A rule condition contains logical operations (`>`, `>=`, `&&`, `||`) to determine if a signal should be generated based on the event counts in the previously defined queries.
    - The ASCII lowercase query labels are referenced in this section. An example rule condition for query `a` is `a > 3`.
    - **Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.
1. In the **within a window of** dropdown menu, select the time period during which a signal is triggered if the condition is met.
    - An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates cases in real time.

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-historical-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Job multi-triggering behavior {#job-multi-triggering-historical-content-anomaly}

{{% cloud_siem/rule_multi_triggering_content_anomaly %}}

#### 3. Enable optional group by {#enable-group-by-historical-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/set_condition_root_query.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Query** field, enter the tags of a log that you want to trigger a signal.
    - For example, if you want logs with the tag `dev:demo` to trigger signals with a severity of `INFO`, enter `dev:demo` in the query field. Similarly, if you want logs with the tag `dev:prod` to trigger signals with a severity of `MEDIUM`, enter `dev:prod` in the query field.

### Other parameters

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{< /tabs >}}

## Notify when job is complete

(Optional) Click **Add Recipient** to send notifications upon the completion of job analysis. See [Notification channels][2] for more information.

## Describe your playbook

{{% security-rule-say-whats-happening %}}

[1]: https://app.datadoghq.com/security/rules/new
[2]: /security_platform/notifications/#notification-channels