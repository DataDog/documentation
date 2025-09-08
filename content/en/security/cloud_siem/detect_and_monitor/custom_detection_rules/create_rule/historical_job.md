---
title: Create a Historical Job
code_lang: historical_job
type: multi-code-lang
weight: 3
---

## Overview

Historical jobs are one-time executable searches on historical logs using the detection engine that creates results instead of signals. These results can be converted to signals. It allows backtesting of detection rules to assess their effectiveness on past data.

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
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

**Note**: The query applies to all ingested logs and events.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Detect new value** dropdown menu, select the attributes you want to detect.
    - For example, if you want to create a query for successful user authentication with the following settings:
        - **Detect new value** is `country`
        - **group by** is `user`
        - Learning duration is `after 7 days`
    <br>Then, logs coming in over the next 7 days are evaluated with those configured values. If a log comes in with a new value after the learning duration (`7 days`), a signal is generated, and the new value is learned to prevent future signals with this value.
    - You can also identify users and entities using multiple **Detect new value** attributes in a single query.
        - For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to the **Detect new value** field.
1. (Optional) Define a signal grouping in the **group by** dropdown menu.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user or IP address).
1. In the dropdown menu to the right of **group by**, select the learning duration.
1. (Optional) If you want to create calculated fields to transform your logs during query time, click **Add** and select **Calculated fields**.
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
1. (Optional) You can filter logs using references tables:
    1. Click the **Add** button next to the query editor and select **Join with Reference Table**.
    1. In the **Inner join with reference table** dropdown menu, select your reference table in the dropdown menu.
    1. In the **where field** dropdown menu, select the log field to join on.
    1. Select the **IN** or **NOT IN** operator to filter in or out matching logs.
    1. In the **column** dropdown menu, select the Reference Table column to join on.
    1. (Optional) Select Reference Table columns used to enrich logs.
    1. (Optional) Filter logs by directly querying data in Reference Table columns.
1. (Optional) To test your rules against sample logs, click **Unit Test**.
    1. To construct a sample log, you can:  
        1. Navigate to [Log Explorer][2].  
        1. Enter the same detection rule query in the search bar.  
     1. Select one of the logs.  
     1. Click the export button at the top right side of the log side panel, and then select **Copy**.
    1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
    1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
    1. Click **Run Query Test**.

**Note**: The query applies to all ingested logs and events.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values you want to count during the specified time frame.
1. (Optional) In the **group by** dropdown menu, select attributes you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.
    - Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it does not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.
1. (Optional) If you want to create calculated fields to transform your logs during query time, click **Add** and select **Calculated fields**.
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
1. (Optional) You can filter logs using references tables:
    1. Click the **Add** button next to the query editor and select **Join with Reference Table**.
    1. In the **Inner join with reference table** dropdown menu, select your reference table in the dropdown menu.
    1. In the **where field** dropdown menu, select the log field to join on.
    1. Select the **IN** or **NOT IN** operator to filter in or out matching logs.
    1. In the **column** dropdown menu, select the Reference Table column to join on.
    1. (Optional) Select Reference Table columns used to enrich logs.
    1. (Optional) Filter logs by directly querying data in Reference Table columns.
1. (Optional) To test your rules against sample logs, click **Unit Test**.
    1. To construct a sample log, you can:  
        1. Navigate to [Log Explorer][2].  
        1. Enter the same detection rule query in the search bar.  
     1. Select one of the logs.  
     1. Click the export button at the top right side of the log side panel, and then select **Copy**.
    1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
    1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
    1. Click **Run Query Test**.

**Note**: The query applies to all ingested logs and events.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **User attribute** dropdown menu, select the log attribute that contains the user ID. This can be an identifier like an email address, user name, or account identifier.
1. The **Location attribute** value is automatically set to `@network.client.geoip`.
    - The `location attribute` specifies which field holds the geographic information for a log.
    - The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][4] to give a log location information based on the client's IP address.
1. Click the **Baseline user locations** checkbox if you want Datadog to learn regular access locations before triggering a signal.
    - When selected, signals are suppressed for the first 24 hours. During that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.
    - Do **not** click the checkbox if you want Datadog to detect all impossible travel behavior.
    - See [How the impossible detection method works][5] for more information.
1. (Optional) If you want to create calculated fields to transform your logs during query time, click **Add** and select **Calculated fields**.
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
1. (Optional) You can filter logs using references tables:
    1. Click the **Add** button next to the query editor and select **Join with Reference Table**.
    1. In the **Inner join with reference table** dropdown menu, select your reference table in the dropdown menu.
    1. In the **where field** dropdown menu, select the log field to join on.
    1. Select the **IN** or **NOT IN** operator to filter in or out matching logs.
    1. In the **column** dropdown menu, select the Reference Table column to join on.
    1. (Optional) Select Reference Table columns used to enrich logs.
    1. (Optional) Filter logs by directly querying data in Reference Table columns.
1. (Optional) To test your rules against sample logs, click **Unit Test**.
    1. To construct a sample log, you can:  
        1. Navigate to [Log Explorer][2].  
        1. Enter the same detection rule query in the search bar.  
     1. Select one of the logs.  
     1. Click the export button at the top right side of the log side panel, and then select **Copy**.
    1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
    1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
    1. Click **Run Query Test**.

**Note**: All logs and events matching this query are analyzed for a potential impossible travel.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/
[4]: /logs/log_configuration/processors/?tab=ui#geoip-parser
[5]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/#how-the-impossible-travel-method-works

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over 24-hour roll-up period.
1. (Optional) If you want to create calculated fields to transform your logs during query time, click **Add** and select **Calculated fields**.
    - See [Calculated Fields Expressions Language][3] for information on syntax and language constructs.
1. (Optional) You can filter logs using references tables:
    1. Click the **Add** button next to the query editor and select **Join with Reference Table**.
    1. In the **Inner join with reference table** dropdown menu, select your reference table in the dropdown menu.
    1. In the **where field** dropdown menu, select the log field to join on.
    1. Select the **IN** or **NOT IN** operator to filter in or out matching logs.
    1. In the **column** dropdown menu, select the Reference Table column to join on.
    1. (Optional) Select Reference Table columns used to enrich logs.
    1. (Optional) Filter logs by directly querying data in Reference Table columns.
1. (Optional) To test your rules against sample logs, click **Unit Test**.
    1. To construct a sample log, you can:  
        1. Navigate to [Log Explorer][2].  
        1. Enter the same detection rule query in the search bar.  
     1. Select one of the logs.  
     1. Click the export button at the top right side of the log side panel, and then select **Copy**.
    1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
    1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
    1. Click **Run Query Test**.

**Note**: The query applies to all ingested logs and events.

Click **Add Root Query** to add additional queries.

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs
[3]: /logs/explorer/calculated_fields/expression_language/

{{% /tab %}}
{{< /tabs >}}

## Set conditions

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="security/security_monitoring/detection_rules/condition_severity_notification.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_conditions_only %}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-threshold}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

### Other parameters

#### 1. Forget value {#forget-value-historical-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Job multi-triggering {#job-multi-triggering-historical-new-value}

{{% cloud_siem/job_multi_triggering %}}

#### 3. Enable optional group by {#enable-group-by-historical-new-value}

{{% cloud_siem/enable_group_by %}}

#### 4. Enable instantaneous baseline

{{% cloud_siem/enable_instantaneous_baseline %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" >}}

1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Anomaly count** field, enter the condition for how many anomalous logs within the specified window are required to trigger a signal.
    - For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.
    - All rule conditions are evaluated as condition statements. Thus, the order of the conditions affects which notifications are sent because the first condition to match generates the signal. Click and drag your rule conditions to change their ordering.
    - A rule condition contains logical operations (`>`, `>=`, `&&`, `||`) to determine if a signal should be generated based on the event counts in the previously defined queries.
    - The ASCII lowercase query labels are referenced in this section. An example rule condition for query `a` is `a > 3`.
    - **Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.
1. In the **within a window of** dropdown menu, select the time period during which a signal is triggered if the condition is met.

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-historical-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Job multi-triggering {#job-multi-triggering-historical-content-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 3. Enable optional group by {#enable-group-by-historical-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" >}}

### Other parameters

#### 1. Job multi-triggering {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Enable optional group by {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/condition_severity_notification.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" >}}

{{% cloud_siem/set_conditions_conditions_only %}}

### Other parameters

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{< /tabs >}}

## Notify when job is complete

{{% cloud_siem/notify_when_job_complete %}}

## Describe your playbook

{{% security-rule-say-whats-happening %}}

[1]: https://app.datadoghq.com/security/rules/new