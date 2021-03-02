---
title: Security Monitoring Rules
further_reading:
- link: "/security_monitoring/default_rules/"
  tag: "Documentation"
  text: "Configure default Security Monitoring rules"
- link: "/security_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
---

## Create a New Rule

To create a new Security Monitoring detection rule in Datadog, hover over **Security**, select **Security Rules**, and select the **New Rule** button in the top right corner of the page.

## Rule Type

For Security Monitoring, select **Log Detection** to analyze ingested logs in real-time.

## Choose a Detection Method

### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

### New term

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `country` or `IP address`, a security signal will be generated whenever a new value is seen which has not been seen before.

## Define a Search Query

{{< tabs >}}
{{% tab "Threshold" %}}

### Search query

{{< img src="security_monitoring/detection_rules/threshold.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

Optionally, define a unique count and signal grouping. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (like user, or IP). The group-by is also used to [join the queries together](#joining-queries).

Add additional queries with the Add Query button.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

#### Joining queries

Joining together logs that span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.

{{< img src="security_monitoring/detection_rules/joining_queries_define.png" alt="Define search queries"  >}}

The Detection Rules join the logs together using a group by value. The group by values are typically entities (e.g. IP address, user, etc), but can be any attribute.

{{< img src="security_monitoring/detection_rules/group_by.png" alt="Group by"  >}}

The Detection Rule cases join these queries together based on their group by value. The group by attribute is typically the same attribute because the value must be the same for the case to be met. If a group by value doesn’t exist, the case will never be met. A Security Signal is generated for each unique group by value when a case is matched.

{{< img src="security_monitoring/detection_rules/set_rule_cases2.png" alt="Set rule cases"  >}}

In this example, when greater than five failed logins and a successful login exist for the same `@usr.name`, the first case is matched, and a Security Signal is generated.

{{< img src="security_monitoring/detection_rules/gbv2.png" alt="Set rule cases" >}}

[1]: /logs/search_syntax/
{{% /tab %}}

{{% tab "New Term" %}}

### Search query

{{< img src="security_monitoring/detection_rules/new_term.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

#### Learned value

{{< img src="security_monitoring/detection_rules/learning_duration.png" alt="Define the learned value" >}}

Select a value to detect, learning duration, and, optionally, define a signal grouping. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (like user or IP).

For example, create a query for successful user authentication and set **detect new value** to `country` and group by to `user`. Set a learning duration of `7 days`. Once configured, logs coming in over the next 7 days are evaluated with the set values. If a log comes in with a new value after the learning duration, a signal is generated, and the new value is learned to prevent future signals with this value.

[1]: /logs/search_syntax/
{{% /tab %}}
{{< /tabs >}}

## Set a Rule Case

{{< tabs >}}
{{% tab "Threshold" %}}

### Trigger

{{< img src="security_monitoring/detection_rules/define_rule_case.png" alt="Define the rule case" >}}

Rule cases, such as `a > 3`, are evaluated as case statements. Thus, the first case to match generates the signal. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section.

**Note**: The query label must precede the operator. For example, `a < 3` is allowed; `3 > a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

### Severity and notification

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][1] for each rule case.

### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real-time.

Once a signal is generated, the signal will remain “open” if a case is matched at least once within this `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal will “close” regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp.

Additional cases can be added by clicking the **Add Case** button.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

[1]: /monitors/notifications/?tab=is_alert#integrations
{{% /tab %}}

{{% tab "New Term" %}}

{{< img src="security_monitoring/detection_rules/new_term_rule_case.png" alt="Define the rule case" >}}

### Severity and notification

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][1] for each rule case.

### Forget value

To forget a value if it is not seen over a period of time, select an option from the dropdown menu.

### Update the same signal

Set a maximum duration to keep updating a value if detected within a set time frame. For example, the same signal will update if any new value is detected within `1 hour`, for a maximum duration of `24 hours`.

**Note**: If a unique signal is required for every new value, configure this value to `0 minutes`.

[1]: /monitors/notifications/?tab=is_alert#integrations
{{% /tab %}}
{{< /tabs >}}

## Say What's Happening

The notification box has the same Markdown and preview features as those of [monitor notifications][1].

The **Rule name** section allows you to configure the rule name that appears in the rules list view, as well as the title of the Security Signal.

Tag your signals with different tags, for example, `security:attack` or `technique:T1110-brute-force`.

**Note**: the tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notifications/?tab=is_alert
