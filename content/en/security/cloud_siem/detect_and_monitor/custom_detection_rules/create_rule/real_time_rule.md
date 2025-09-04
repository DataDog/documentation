---
title: Create a Real-Time Rule
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

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values are counted over the specified time frame.
1. (Optional) In the **group by** dropdown menu, select attributes you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.
1. (Optional) You can [filter logs using references tables](#filter-ref-threshold):
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

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
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
1. (Optional) You can [filter logs using references tables](#filter-ref-threshold):
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

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values you want to count during the specified time frame.
1. (Optional) In the **group by** dropdown menu, select attributes you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.
    - Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it does not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.
1. (Optional) You can [filter logs using references tables](#filter-ref-anomaly):
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

{{% /tab %}}
{{% tab "Content Anomaly" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **group by** field, specify the fields you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
    - **Note**: If the detection rule is modified, the learning period restarts at day `0`.
1. (Optional) You can [filter logs using references tables](#filter-ref-content-anomaly):
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

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Impossible Travel" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **User attribute** dropdown menu, select the log attribute that contains the user ID. This can be an identifier like an email address, user name, or account identifier.
1. The **Location attribute** value is automatically set to `@network.client.geoip`.
    - The `location attribute` specifies which field holds the geographic information for a log.
    - The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][3] to give a log location information based on the client's IP address.
1. Click the **Baseline user locations** checkbox if you want Datadog to learn regular access locations before triggering a signal.
    - When selected, signals are suppressed for the first 24 hours. During that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.
    - Do **not** click the checkbox if you want Datadog to detect all impossible travel behavior.
    - See [How the impossible detection method works][4] for more information.
1. (Optional) You can [filter logs using references tables](#filter-ref-impossible):
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
[3]: /logs/log_configuration/processors/?tab=ui#geoip-parser
[4]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/#how-the-impossible-travel-method-works

{{% /tab %}}
{{% tab "Third Party" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over 24-hour roll-up period.
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

{{% /tab %}}
{{% tab "Signal Correlation" %}}

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

{{% cloud_siem/set_conditions %}}

#### Example

If you have a `failed_login` and a `successful_login` query:

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

and a rule condition that triggers when `failed_login > 5 && successful_login>0`:

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="The set rule conditions section set to trigger a high severity signal when failed_login is greater than five and successful_login is greater than zero" style="width:90%;" >}}

The rule condition joins these queries together based on their `group by` value. The `group by` attribute is typically the same attribute because the value must be the same for the condition to be met. If a `group by` value doesn't exist, the condition will never be met. A security signal is generated for each unique `group by` value when a condition is matched.

In this example, when there are more than five failed logins and at least one successful login for the same `User Name`, the first condition is matched, and a security signal is generated.

### Other parameters

#### 1. Rule multi-triggering {#rule-multi-triggering-rt-threshold}

{{% cloud_siem/rule_multi_triggering %}}

#### 2. Decrease severity for non-production environments {#decrease-severity-rt-threshold}

{{% cloud_siem/enable_decrease_severity %}}

#### 3. Enable optional group by {#enable-group-by-rt-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{% cloud_siem/set_conditions_severity_notify_only %}}

### Other parameters

#### 1. Forget value {#forget-value-rt-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Rule multi-triggering {#rule-multi-triggering-rt-new-value}

{{% cloud_siem/rule_multi_triggering %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-new-value}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-new-value}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

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

{{% cloud_siem/set_conditions_content_anomaly %}}

### Other parameters

#### 1. Content anomaly detection {#content-anomaly-rt-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Rule multi-triggering {#rule-multi-triggering-rt-content-anomaly}

{{% cloud_siem/rule_multi_triggering %}}

#### 3. Decrease severity for non-production environments {#decrease-severity-rt-content-anomaly}

{{% cloud_siem/enable_decrease_severity %}}

#### 4. Enable optional group by {#enable-group-by-rt-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

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

{{% cloud_siem/set_conditions %}}

### Other parameters

#### 1. Decrease severity for non-production environments {#decrease-severity-rt-third-party}

{{% cloud_siem/enable_decrease_severity %}}

#### 2. Enable optional group by {#enable-group-by-rt-third-party}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Signal Correlation" %}}

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