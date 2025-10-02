---
title: Create a Scheduled Rule
code_lang: scheduled_rule
type: multi-code-lang
weight: 2
---

## Overview

Scheduled detection rules run at predefined intervals to analyze indexed log data and detect security threats. These rules can identify patterns, anomalies, or specific conditions within a defined time frame, and trigger alerts or reports if the criteria are met.

Scheduled rules complement real-time monitoring by ensuring periodic, in-depth analysis of logs using [calculated fields][2].

## Create a rule

1. To create a detection rule, navigate to the [Create a New Detection][1] page.
1. Select **Scheduled Rule**.

## Define your scheduled rule

Select the detection method you want to use for creating signals.

## Define search queries

{{< tabs >}}
{{% tab "Threshold" %}}

Choose the query language you want to use.

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
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
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
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
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
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
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
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
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
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
1. If you are an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over 24-hour roll-up period.
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
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

#### 1. Rule multi-triggering {#rule-multi-triggering-schedule-threshold}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-schedule-threshold}
{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-schedule-threshold}
{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

### Other parameters

#### 1. Forget value {#forget-value-scheduled-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-scheduled-new-value}

{{% cloud_siem/rule_multi_triggering %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-scheduled-new-value}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-scheduled-new-value}

{{% cloud_siem/enable_group_by %}}

#### 5. Enable instantaneous baseline

{{% cloud_siem/enable_instantaneous_baseline %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-scheduled-anomaly}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-scheduled-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-scheduled-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_content_anomaly %}}

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-scheduled-content-anomaly}

{{% cloud_siem/content_anomaly_options %}}

#### 2. Rule multi-triggering behavior {#rule-multi-triggering-scheduled-content-anomaly}

{{% cloud_siem/rule_multi_triggering_content_anomaly %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-scheduled-content-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-scheduled-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-scheduled-impossible-travel}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-scheduled-impossible-travel}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-scheduled-impossible-travel}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/conditions_else.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_third_party %}}

### Other parameters

#### 1. Decrease severity for non-production environments {#decrease-severity-scheduled-third-party}

{{% cloud_siem/enable_decrease_severity %}}

#### 2. Enable optional group by {#enable-group-by-scheduled-third-party}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Signal Correlation" %}}

{{< img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_then_operator %}}

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-scheduled-signal-correlation}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-scheduled-signal-correlation}

{{% cloud_siem/enable_decrease_severity %}}

{{% /tab %}}
{{< /tabs >}}

### Add custom schedule

You can set specific evaluation time and how often it runs by creating a custom schedule or using a recurrence rule (RRULE).

#### Create custom schedule

{{< img src="security/security_monitoring/detection_rules/custom_schedule.png" alt="The Use custom schedule section with an example" style="width:100%;" >}}

1. Select **Create Custom Schedules**.
1. Set how often and at what time you want the rule to run.

#### Use RRULE

{{< img src="security/security_monitoring/detection_rules/rrule_example.png" alt="The Use RRULE section with an example" style="width:100%;" >}}

Recurrence rule (RRULE) is a property name from the [iCalendar RFC][1], which is the standard for defining recurring events. Use the [official RRULE generator][4] to generate recurring rules. Leverage RRULEs to cover more advanced scheduling use cases.

For example, if the RRULE is:

```text
FREQ=DAILY;INTERVAL=1;BYHOUR=6;BYMINUTE=0
```

The example RRULE runs the scheduled rule once a day at 6:00 AM.

**Notes**:
- Attributes specifying the duration in RRULE are not supported (for example, DTSTART, DTEND, DURATION).
- Evaluation frequencies must be a day or longer. For shorter evaluation frequencies, use the default monitor schedules.

To write a custom RRULE for your detection rule:

1. Select **</> Use RRULE**.
1. Set the date and time for when you want the rule to start.
1. Input a [RRULE string][4] to set how often you want the rule to run.

## Describe your playbook

{{% security-rule-say-whats-happening %}}

## Create a suppression

{{% cloud_siem/create_suppression %}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /logs/explorer/calculated_fields/
[3]: https://icalendar.org/rrule-tool.html
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html