---
title: Create and Manage Security Monitoring Rules
further_reading:
- link: "/security_monitoring/default_rules/"
  tag: "Documentation"
  text: "Configure default Security Monitoring rules"
- link: "/security_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
---

## Create a New Detection Rule

To create a new Security Monitoring detection rule in Datadog, hover over **Security**, select **Security Rules**, and select the **New Rule** button in the top right corner of the page.

## Select a detection rule type

For Security Monitoring, select **Log Detection** to analyze ingested logs in real time.

## Choose a detection method

### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

#### Count unique
#### Roll up window

### New term

Detect when an attribute changes to a new value. For example, if you create a trigger based on a specific attribute, such as `protocol` or `IP address`, a security signal will occur whenever the value of that attribute changes from it's original state.

#### detect new value
#### learning duration
#### a TTL on the time we keep the values

### Define the search query and rule case

{{< tabs >}}
{{% tab "Threshold" %}}

#### Search query

{{< img src="security_monitoring/detection_rules/define_search_query.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

Optionally, define a signal grouping. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (e.g. user, IP, etc.). The group-by is also used to [join the queries together](#joining-queries).

Add additional queries with the Add Query button.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

{{< img src="security_monitoring/detection_rules/define_rule_case.png" alt="Define the rule case" >}}

#### Rule case trigger and name

Rule cases, such as `a > 3`, are evaluated as case statements. Thus, the first case to match generates the signal. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-the-search-query) are referenced in this section.

**Note**: The query label must precede the operator. For example, `a < 3` is allowed; `3 > a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

{{% /tab %}}

{{% tab "New Term" %}}

#### Search query

{{< img src="security_monitoring/detection_rules/define_search_query.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][1]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon.

Optionally, define a signal grouping. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (e.g. user, IP, etc.). The group-by is also used to [join the queries together](#joining-queries).

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.

{{% /tab %}}

{{< /tabs >}}

#### Severity and notification

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][1] for each rule case.

#### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real time.

Once a signal is generated, the signal will remain “open” if a case is matched at least once within this `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal will “close” regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp.

Additional cases can be added by clicking the **Add Case** button.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

### Security signal message

The notification box has the same Markdown and preview features as those of [monitor notifications][2].

The **Rule name** section allows you to configure the rule name that appears in the rules list view, as well as the title of the Security Signal.

Tag your signals with different tags, for example `security:attack` or `technique:T1110-brute-force`.

**Note**: the tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

### Joining queries

Joining together logs that span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.

{{< img src="security_monitoring/detection_rules/joining_queries_define.png" alt="Define search queries"  >}}

The Detection Rules join the logs together using a group by value. The group by values are typically entities (e.g. IP address, user, etc), but can be any attribute.

{{< img src="security_monitoring/detection_rules/group_by.png" alt="Group by"  >}}

The Detection Rule cases join these queries together based on their group by value. The group by attribute is typically the same attribute because the value must be the same for the case to be met. If a group by value doesn’t exist, the case will never be met. A Security Signal is generated for each unique group by value when a case is matched.

{{< img src="security_monitoring/detection_rules/set_rule_cases2.png" alt="Set rule cases"  >}}

In this example, when greater than 5 failed logins and a successful login exist for the same `@usr.name`, the first case is matched and a Security Signal is generated.

{{< img src="security_monitoring/detection_rules/gbv2.png" alt="Set rule cases" >}}

## Manage Rules

The [Security Configuration Detection Rules][1] page lets you search all Detection Rules. Quickly enable, disable, edit, delete, clone, or view signals generated by any of these rules. Create a [new rule][2] from scratch from this view.

### Finding rules

The free text search filters Detection Rules by text in the rule name or query. Query results update in real time when the query is edited—there is no “Search” button to click.

### Rules table

{{< img src="security_monitoring/detection_rules/rules_table2.png" alt="Rules Table"  >}}

Rules are displayed in the rules table.

Configure the rules table content and preferences with the Options button. Only date created and rule ID are available for additional columns.

Rules are sorted alphabetically—ascending by default (A-Z). The rules can be inverse-sorted by name, as well as sort by query name, creation date, or rule ID.

#### Enabling or disabling a rule

Enable or disable a rule using the toggle switch to the right of the rule.

#### Editing a rule

Edit a rule by hovering over the rule and clicking the **Edit** button.

#### Searching for signals generated by a rule

Search for signals generated by a rule by hovering over the rule and clicking the **View Generated Signals** button.

#### Cloning a rule

Clone a rule by hovering over the rule and clicking the **Clone** button.

#### Deleting a rule

Delete a rule by hovering over the rule and clicking the **Delete** button.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notifications/?tab=is_alert#integrations
[2]: /monitors/notifications/?tab=is_alert
