---
title: Detection Rules
type: documentation
aliases:
 - /security_platform/detection_rules/cloud_siem
 - /security_platform/detection_rules/security_monitoring
 - /security_platform/detection_rules/create_a_new_rule
 - /security_platform/cloud_siem/log_detection_rules/
 - /cloud_siem/detection_rules/security_monitoring/
 - /security/detection_rules/cloud_siem/
 - /security/detection_rules/security_monitoring
 - /security/detection_rules/create_a_new_rule
 - /security/cloud_siem/log_detection_rules/
further_reading:
- link: "/cloud_siem/default_rules/"
  tag: "Documentation"
  text: "Configure default Cloud SIEM detection rules"
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/"
  tag: "Blog"
  text: "Detect unauthorized third parties in your AWS account"
- link: "https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/"
  tag: "Blog"
  text: "Detect security threats with anomaly detection rules"
- link: "/security/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about Security notification variables"
- link: "https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/"
  tag: "Blog"
  text: "Monitor Cloudflare Zero Trust with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
  tag: "Blog"
  text: "Monitor 1Password with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/"
  tag: "Blog"
  text: "Detect anomalies beyond spikes and new values with Content Anomaly Detection in Cloud SIEM"
---

## Overview

Cloud SIEM detection rules analyze logs, Audit Trail events, and events from Event Management to generate security signals when threats are detected. You can use [out-of-the-box detection rules](#out-of-the-box-detection-rules) or [create custom detection rules](#custom-detection-rules). This document walks you through how to create a custom detection rule.

### Out-of-the-box detection rules

After you set up Cloud SIEM, [OOTB detection rules][6] automatically begin analyzing your logs, Audit Trail events, and events from Event Management. You can edit OOTB detection rules and:
- Change the name of the rule.
- Extend the query. The original query cannot be edited, but you can add a custom query to it.
- Change the severity setting in the **Set conditions** section.
- Modify the playbook.

### Custom detection rules

To create a detection rule in Datadog, navigate to the [Detection Rules page][1] and click **New Rule**.

## Detection mechanism

Select whether you want to generate security signals from a **Real-Time Rule** or a **Historical job**. See [Historical Jobs][5] for more information on the one-time search job for historical logs or audit events.

## Detection methods

### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

### New value

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `country` or `IP address`, a security signal will be generated whenever a new value is seen which has not been seen before.

### Anomaly

When configuring a specific threshold isn't an option, you can define an anomaly detection rule instead. With anomaly detection, a dynamic threshold is automatically derived from the past observations of the events.

### Content anomaly

While the anomaly method detects anomalies in volume and is ideal for identifying spikes in log or event activity, content anomaly detection analyzes the content of logs. The rule determines a similarity score for incoming values by comparing them to previous values. The similarity score helps determine whether the incoming value is an outlier. See [How an event is determined to be anomalous](#how-an-event-is-determined-to-be-anomalous) for more information.

### Impossible travel

Impossible travel detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events.

### Third Party

Third Party allows you to forward alerts from an outside vendor or application. You can update the rule with suppression queries and who to notify when a signal is generated.

## Define a search query

{{< tabs >}}
{{% tab "Threshold" %}}

### Search query

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined Group By generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).

Click **Add Query** to add additional queries.

**Note**: The query applies to all ingested logs.

#### Joining queries

Joining together logs that span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

The Detection Rules join the logs together using a `group by` value. The `group by` values are typically entities (for example, IP address or user), but can be any attribute.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "New Value" %}}

### Search query

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}


Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1].

Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

**Note**: The query applies to all ingested logs.

#### Learned value

Select the value or values to detect, the learning duration, and, optionally, define a signal grouping. The defined group-by generates a signal for each group-by value. Typically, the group-by is an entity (like user or IP).

For example, create a query for successful user authentication and set **Detect new value** to `country` and group by to `user`. Set a learning duration of `7 days`. Once configured, logs coming in over the next 7 days are evaluated with the set values. If a log comes in with a new value after the learning duration, a signal is generated, and the new value is learned to prevent future signals with this value.

You can also identify users and entities using multiple values in a single query. For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to **Detect new value**.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "Anomaly" %}}

### Search query

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP).

Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it does not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.

**Note**: The query applies to all ingested logs.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "Content anomaly" %}}

### Search query

1. Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1].
1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **Group by** field, specify the fields you want to group by.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
  **Note**: If the detection rule is modified, the learning period restarts at day `0`.
1. In the **Other parameters** section, you can specify the parameters to assess whether a log is anomalous or not. See [How an event is determined to be anomalous](#how-an-event-is-determined-to-be-anomalous) for more information.

#####  How an event is determined to be anomalous

Content anomaly detection balances precision and sensitivity using several rule parameters that you can set:

1. Similarity threshold: Defines how dissimilar a field value must be to be considered anomalous (default: `70%`).
1. Minimum similar items: Sets how many similar historical logs must exist for a value to be considered normal (default: `1`).
1. Evaluation window: The time frame during which anomalies are counted toward a signal (for example, a 10-minute time frame).

These parameters help to identify field content that is both unusual and rare, filtering out minor or common variations.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "Impossible travel" %}}

### Search query

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1]. All logs matching this query are analyzed for a potential impossible travel. You can use the `preview` section to see which logs are matched by the current query.

#### User attribute

For the `user attribute`, select the field in the analyzed log that contains the user ID. This can be an identifier like an email address, user name, or account identifier.

#### Location attribute

The `location attribute` specifies which field holds the geographic information for a log. The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][2] to give a log location information based on the client's IP address.

#### Baseline user locations

Click the checkbox if you'd like Datadog to learn regular access locations before triggering a signal.

When selected, signals are suppressed for the first 24 hours. In that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.

Do not click the checkbox if you want Datadog to detect all impossible travel behavior.

[1]: /logs/search_syntax/
[2]: /logs/log_configuration/processors#geoip-parser
{{% /tab %}}

{{% tab "Third Party" %}}

### Root query

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1]. The trigger defined for each new attribute generates a signal for each new value of that attribute over a 24-hour roll-up period.

Click **Add Query** to add additional queries.

**Note**: The query applies to all ingested logs.

[1]: /logs/search_syntax/
{{% /tab %}}
{{< /tabs >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

Use unit testing to test your rules against sample logs and make sure the detection rule is working as expected. Specifically, this can be helpful when you are creating a detection rule for an event that hasn't happened yet, so you don't have actual logs for it. For example: You have logs with a `login_attempt` field and want to detect logs with `login_attempt:failed`, but you only have logs with `login_attempt:success`. To test the rule, you can construct a sample log by copying a log with `login_attempt:success` and changing the `login_attempt` field to `failed`.

To use unit testing:

1. After entering the rule query, click **Unit Test** to test your query against a sample log.
1. To construct a sample log, you can:  
    a. Navigate to [Log Explorer][3].  
    b. Enter the same detection rule query in the search bar.  
    c. Select one of the logs.  
    d. Click the export button at the top right side of the log side panel, and then select **Copy**.
1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
1. Click **Run Query Test**.

## Set a rule case

{{< tabs >}}
{{% tab "Threshold" %}}

### Trigger

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="The set rule case section showing the default settings" style="width:80%;" >}}

Enable **Create rules cases with the Then operator** if you want to trigger a signal for the example: If query A occurs and then query B occurs. The `then` operator can only be used on a single rule case.

All rule cases are evaluated as case statements. Thus, the order of the cases affects which notifications are sent because the first case to match generates the signal. Click and drag your rule cases to change their ordering. 

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section. An example rule case for query `a` is `a > 3`.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

#### Example

If you have a `failed_login` and a `successful_login` query:

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

and a rule case that triggers when `failed_login > 5 && successful_login>0`:

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="The set rule cases section set to trigger a high severity signal when failed_login is greater than five and successful_login is greater than zero" style="width:90%;" >}}

The rule case joins these queries together based on their `group by` value. The `group by` attribute is typically the same attribute because the value must be the same for the case to be met. If a `group by` value doesn't exist, the case will never be met. A Security Signal is generated for each unique `group by` value when a case is matched.

In this example, when there are more than five failed logins and at least one successful login for the same `User Name`, the first case is matched, and a Security Signal is generated.

### Severity and notification

{{% security-rule-severity-notification %}}

### Time windows

{{% security-rule-time-windows %}}

Click **Add Case** to add additional cases.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

{{% /tab %}}

{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_term_rule_case.png" alt="Define the rule case" style="width:80%;" >}}

### Severity and notification

{{% security-rule-severity-notification %}}

### Forget value

To forget a value if it is not seen over a period of time, select an option from the dropdown menu.

### Update the same signal

Set a maximum duration to keep updating a signal if new values are detected within a set time frame. For example, the same signal will update if any new value is detected within `1 hour`, for a maximum duration of `24 hours`.

**Note**: If a unique signal is required for every new value, configure this value to `0 minutes`.

{{% /tab %}}

{{% tab "Anomaly" %}}

### Severity and notification

{{% security-rule-severity-notification %}}

### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

Once a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" once the time exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

{{% /tab %}}

{{% tab "Content anomaly" %}}

### Severity and notification

{{% security-rule-severity-notification %}}

In the **Anomaly count** field, enter the condition for how many anomalous logs are required to trigger a signal. For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

After a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" once the time exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

{{% /tab %}}

{{% tab "Impossible travel" %}}

The impossible travel detection method does not require setting a rule case.

### Severity and notification

{{% security-rule-severity-notification %}}

### Time windows

{{% security-rule-time-windows %}}

{{% /tab %}}

{{% tab "Third Party" %}}

### Trigger

All rule cases are evaluated as case statements. Thus, the order of the cases affects which notifications are sent because the first case to match generates the signal. Click and drag your rule cases to change their ordering. 

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section. An example rule case for query `a` is `a > 3`.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

### Severity and notification

{{% security-rule-severity-notification %}}

Click **Add Case** to add additional cases.

{{% /tab %}}
{{< /tabs >}}

### Decreasing non-production severity

One way to decrease signal noise is to prioritize production environment signals over non-production environment signals. Select the `Decrease severity for non-production environments` checkbox to decrease the severity of signals in non-production environments by one level from what is defined by the rule case.

| Signal Severity in Production Environment| Signal Severity in Non-production Environment|
| ---------------------------------------- | -------------------------------------------- |
| Critical                                 | High                                         |
| High                                     | Medium                                       |
| Medium                                   | Info                                         |
| Info                                     | Info                                         |

The severity decrement is applied to signals with an environment tag starting with `staging`, `test`, or `dev`.

## Say what's happening

{{% security-rule-say-whats-happening %}}

Use the **Tag resulting signals** dropdown menu to add tags to your signals. For example, `security:attack` or `technique:T1110-brute-force`.

**Note**: the tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Suppression rules

Optionally, add a suppression rule to prevent a signal from getting generated. For example, if a user `john.doe` is triggering a signal, but their actions are benign and you do not want signals triggered from this user, add the following query into the **Add a suppression query** field: `@user.username:john.doe`.

Additionally, in the suppression rule, you can add a log exclusion query to exclude logs from being analyzed. These queries are based on **log attributes**. **Note**: The legacy suppression was based on log exclusion queries, but it is now included in the suppression rule's **Add a suppression query** step.

## Rule Version History

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="The version history for a GitHub OAuth access token compromise showing" style="width:80%;" >}}

Use Rule Version History to:
- See past versions of a detection rule and understand the changes over time.
- See who made the changes for improved collaboration.
- Compare versions with diffs to analyze the modifications and impact of the changes.

To see the version history of a rule:
1. Navigate to [Detection Rules][4].
1. Click on the rule you are interested in.
1. In the rule editor, click **Version History** to see past changes.
1. Click a specific version to see what changes were made.
1. Click **Open Version Comparison** to see what changed between versions.
1. Select the two versions you want to compare.
    - Data highlighted in red indicates data that was modified or removed.
    - Data highlighted in green indicates data that was added.
1. Click **Unified** if you want to see the comparison in the same panel.

## Rule deprecation

Regular audits of all out-of-the-box detection rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's **Rule Details > Playbook** section
    - [Rule editor][2] for that specific rule
2. Once the rule is deprecated, there is a 15 month period before the rule is deleted. This is due to the signal retention period of 15 months. During this time, you can re-enable the rule by [cloning the rule][2] in the UI.
3. Once the rule is deleted, you can no longer clone and re-enable it.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /security/detection_rules/#clone-a-rule
[3]: https://app.datadoghq.com/logs/
[4]: https://app.datadoghq.com/security/rules
[5]: /security/cloud_siem/historical_jobs/
[6]: /security/default_rules/?category=cat-cloud-siem-log-detection#all
