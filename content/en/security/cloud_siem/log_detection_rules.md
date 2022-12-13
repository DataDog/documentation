---
title: Log Detection Rules
type: documentation
aliases:
 - security_platform/detection_rules/cloud_siem
 - security_platform/detection_rules/security_monitoring
 - security_platform/detection_rules/create_a_new_rule
 - security_platform/cloud_siem/log_detection_rules/
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
aliases:
    - /cloud_siem/detection_rules/security_monitoring/
    - /security_platform/detection_rules/cloud_siem/
---

## Overview

To create a new log detection rule in Datadog, hover over **Security**, select **Detection Rules**, and select the **New Rule** button in the top right corner of the page.

## Rule Type

For Cloud SIEM (Security Information and Event Management), select **Log Detection** to analyze ingested logs in real-time.

## Choose a detection method

### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

### New value

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `country` or `IP address`, a security signal will be generated whenever a new value is seen which has not been seen before.

### Anomaly

<div class="alert alert-warning">
Anomaly detection is currently in <a href="https://app.datadoghq.com/security/configuration/rules/new">public beta</a>.
</div>

When configuring a specific threshold isn't an option, you can define an anomaly detection rule instead. With anomaly detection, a dynamic threshold is automatically derived from the past observations of the events.

### Impossible Travel

Impossible travel detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events.

## Define a search query

{{< tabs >}}
{{% tab "Threshold" %}}

### Search query

{{< img src="security/security_monitoring/detection_rules/threshold.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (like user, or IP). The group-by is also used to [join the queries together](#joining-queries).

Add additional queries with the Add Query button.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

#### Advanced options

Click the **Advanced** option to add queries that will **Only trigger a signal when:** a value is met, or **Never trigger a signal when:** a value is met. For example, if a user is triggering a signal, but their actions are benign and you no longer want signals triggered from this user, create a logs query that excludes `@user.username: john.doe` under the **Never trigger a signal when:** option.

#### Joining queries

Joining together logs that span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.

{{< img src="security/security_monitoring/detection_rules/joining_queries_define.png" alt="Define search queries"  >}}

The Detection Rules join the logs together using a group by value. The group by values are typically entities (for example, IP address or user), but can be any attribute.

{{< img src="security/security_monitoring/detection_rules/group_by.png" alt="Group by"  >}}

The Detection Rule cases join these queries together based on their group by value. The group by attribute is typically the same attribute because the value must be the same for the case to be met. If a group by value doesn’t exist, the case will never be met. A Security Signal is generated for each unique group by value when a case is matched.

{{< img src="security/security_monitoring/detection_rules/set_rule_cases2.png" alt="Set rule cases"  >}}

In this example, when greater than five failed logins and a successful login exist for the same `@usr.name`, the first case is matched, and a Security Signal is generated.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "New Value" %}}

### Search query

{{< img src="security/security_monitoring/detection_rules/new_term.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

#### Learned value

{{< img src="security/security_monitoring/detection_rules/learning_duration.png" alt="Define the learned value" >}}

Select the value or values to detect, the learning duration, and, optionally, define a signal grouping. The defined group-by generates a signal for each group-by value. Typically, the group-by is an entity (like user or IP).

For example, create a query for successful user authentication and set **Detect new value** to `country` and group by to `user`. Set a learning duration of `7 days`. Once configured, logs coming in over the next 7 days are evaluated with the set values. If a log comes in with a new value after the learning duration, a signal is generated, and the new value is learned to prevent future signals with this value.

You can also identify users and entities using multiple values in a single query. For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to **Detect new value**. 

#### Advanced options

Click the **Advanced** option to add queries that will **Only trigger a signal when** a value is met, or **Never trigger a signal** when a value is met. For example, if a user is triggering a signal, but their actions are benign and you no longer want signals triggered from this user, create a logs query that excludes `@user.username: john.doe` under `Never Trigger A Signal`.

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "Anomaly" %}}

Construct a search query using the same logic as a log explorer search.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (like user, or IP).

Anomaly detection inspects how the `group by` attribute has behaved in the past. If a group by attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it will not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.

**Note**: The query applies to all Datadog events and ingested logs that do not require indexing.

{{% /tab %}}

{{% tab "Impossible Travel" %}}

### Search query

Construct a search query using the same logic as a [log explorer search][1]. All logs matching this query are analyzed for a potential impossible travel. You can use the `preview` section to see which logs are matched by the current query.

#### User attribute

For the `user attribute`, select the field in the analyzed log that contains the user ID. This can be an identifier like an email address, user name, or account identifier.

#### Location attribute

The `location attribute` specifies which field holds the geographic information for a log. The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][2] to give a log location information based on the client's IP address.

#### Baseline user locations

Click the checkbox if you'd like Datadog to learn regular access locations before triggering a signal.

When selected, signals are suppressed for the first 24 hours. In that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.

Do not click the checkbox if you want Datadog to detect all impossible travel behavior.

#### Advanced options

Click the **Advanced** option to add queries that will **Only trigger a signal when:** a value is met, or **Never trigger a signal when:** a value is met. For example, if a user is triggering a signal, but their actions are benign and you no longer want signals triggered from this user, create a logs query that excludes `@user.username: john.doe` under the **Never trigger a signal when:** option.


[1]: /logs/search_syntax/
[2]: /logs/log_configuration/processors#geoip-parser
{{% /tab %}}
{{< /tabs >}}

## Set a rule case

{{< tabs >}}
{{% tab "Threshold" %}}

### Trigger

{{< img src="security/security_monitoring/detection_rules/define_rule_case.png" alt="Define the rule case" >}}

Rule cases, such as `a > 3`, are evaluated as case statements. Thus, the first case to match generates the signal. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

### Severity and notification

{{% cloud-siem-rule-severity-notification %}}

### Time windows

{{% cloud-siem-rule-time-windows %}}

Click **Add Case** to add additional cases.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

{{% /tab %}}

{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_term_rule_case.png" alt="Define the rule case" >}}

### Severity and notification

{{% cloud-siem-rule-severity-notification %}}

### Forget value

To forget a value if it is not seen over a period of time, select an option from the dropdown menu.

### Update the same signal

Set a maximum duration to keep updating a signal if new values are detected within a set time frame. For example, the same signal will update if any new value is detected within `1 hour`, for a maximum duration of `24 hours`.

**Note**: If a unique signal is required for every new value, configure this value to `0 minutes`.

{{% /tab %}}

{{% tab "Anomaly" %}}

### Severity and notification

{{% cloud-siem-rule-severity-notification %}}

### Time windows

Datadog automatically detects the seasonality of the data and generates a security signal when the data is determined to be anomalous.

Once a signal is generated, the signal remains "open" if the data remains anomalous and the last updated timestamp is updated for the anomalous duration.

A signal "closes" once the time exceeds the maximum signal duration, regardless of whether or not the anomaly is still anomalous. This time is calculated from the first seen timestamp.

{{% /tab %}}

{{% tab "Impossible Travel" %}}

The impossible travel detection method does not require setting a rule case.

### Severity and notification

{{% cloud-siem-rule-severity-notification %}}

### Time windows

{{% cloud-siem-rule-time-windows %}}

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

{{% cloud-siem-rule-say-whats-happening %}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/variables/
[2]: /security/notifications/variables/#template-variables