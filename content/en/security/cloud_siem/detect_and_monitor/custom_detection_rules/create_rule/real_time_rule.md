---
title: Create a Real-Time Rule
aliases:
    - /security/cloud_siem/detect_and_monitor/custom_detection_rules/signal_correlation_rules/
code_lang: real_time_rule
type: multi-code-lang
weight: 1
---

## Overview

Real-time detection rules continuously monitors and analyzes incoming logs for security threats. These rules trigger immediate alerts when specific patterns or anomalies are detected, enabling quicker response to potential incidents.

## Create a rule

1. To create a detection rule, navigate to the [Create a New Detection][1] page.
1. Select **Real-Time Rule**.

## Define your real-time rule

Select the detection method you want to use for creating signals.

## Define search queries

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/threshold_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/new_value_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values you want to count during the specified time frame.
{{% cloud_siem/anomaly_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
{{% cloud_siem/impossible_travel_query %}}
{{% cloud_siem/add_reference_tables %}}<br><br>
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
{{% cloud_siem/unit_testing %}}

Click **Add Root Query** to add additional queries.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Signal Correlation" %}}

{{< img src="security/security_monitoring/detection_rules/signal_correlation_query.png" alt="Define the search query" style="width:100%;" >}}

1. Select a rule for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Use the **correlated by** dropdown to define the correlating attribute.
    - You can select multiple attributes (maximum of 3) to correlate the selected rules.
1. Select a rule for **Rule b** in the second Rule editor's dropdown.
    - The attributes and sliding window time frame is automatically set to what was selected for **Rule a**.
1. Click the pencil icon to rename the rule.

[1]: /logs/search_syntax/

{{% /tab %}}
{{< /tabs >}}

## Set conditions

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_threshold %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-threshold}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-threshold}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Forget value {#forget-value-rt-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-rt-new-value}

{{% cloud_siem/rule_multi_triggering %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-new-value}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-new-value}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-anomaly}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_content_anomaly %}}

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-rt-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-rt-content-anomaly}

{{% cloud_siem/rule_multi_triggering_content_anomaly %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-rt-content-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-impossible-travel}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-impossible-travel}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-impossible-travel}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/condition_else.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_third_party %}}

### Other parameters

#### 1. Decrease severity for non-production environments {#decrease-severity-rt-third-party}

{{% cloud_siem/enable_decrease_severity %}}

#### 2. Enable optional group by {#enable-group-by-rt-third-party}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Signal Correlation" %}}

{{< img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_then_operator %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-signal-correlation}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-signal-correlation}

{{% cloud_siem/enable_decrease_severity %}}

{{% /tab %}}
{{< /tabs >}}

## Describe your playbook

{{% security-rule-say-whats-happening %}}

## Create a suppression

{{% cloud_siem/create_suppression %}}

[1]: https://app.datadoghq.com/security/rules/new