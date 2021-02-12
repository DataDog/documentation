---
title: Threat Detection Rules
kind: documentation
further_reading:
- link: "/security_monitoring/explorer/"
  tag: "Documentation"
  text: "Security Signals Explorer"
---

## Overview

Detection Rules define conditional logic that is applied to all ingested logs. When at least one case defined in a Detection Rule is matched over a given period of time, Datadog generates a Security Signal. Datadog provides [Default Rules][1], which begin detecting threats in your environment immediately. 

## Create Detection Rules

To create a new Detection Rule in Datadog, use the main navigation: **Security** → **Detection Rules** --> **New Rule**.

### Define the search query

{{< img src="security_monitoring/detection_rules/define_search_query.png" alt="Define the search query" >}}

Construct a search query using the same logic as a [log explorer search][2]. Each query has a label, which is a lowercase ASCII letter. The query name can be changed from an ASCII letter by clicking the pencil icon. 

Optionally, define a signal grouping. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (e.g. user, IP, etc.). The group-by is also used to [join the queries together](#joining-queries).

Add additional queries with the Add Query button.

**Note**: The query applies to all Datadog events and ingested logs which do not require indexing.



### Define the rule cases

{{< img src="security_monitoring/detection_rules/define_rule_case.png" alt="Define the rule case" >}}

#### Rule case trigger and name

Rule cases, such as `a > 3`, are evaluated as case statements. Thus, the first case to match generates the signal. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-the-search-query) are referenced in this section. 

**Note**: The query label must preceed the operator. For example, `a < 3` is allowed; `3 > a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated. 

#### Severity and notification

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][3] for each rule case. 

#### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real time. 

Once a signal is generated, the signal will remain “open” if a case is matched at least once within this `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal. 

A signal will “close” regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp. 

Additional cases can be added by clicking the **Add Case** button. 

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`. 

### Security signal message

The notification box has the same Markdown and preview features as those of [monitor notifications][4].

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

## Manage Detection Rules

The [Security Configuration Detection Rules][5] page lets you search of all Detection Rules. Quickly enable, disable, edit, delete, clone, or view signals generated by any of these rules. Create a [new rule][6] from scratch from this view.

### Finding rules

The free text search filters Detection Rules by text in the rule name or query. Query results update in real time when the query is edited—there is no “Search” button to click.

### Detection rules table

{{< img src="security_monitoring/detection_rules/rules_table2.png" alt="Detection Rules Table"  >}}

The Detection Rules are displayed in the Detection Rules table.

Configure the Detection Rules table content and preferences with the Options button. Only date created and rule ID are available for additional columns.

Detection Rules are sorted alphabetically—ascending by default (A-Z). The rules can be inverse-sorted by name, as well as sort by query name, creation date, or rule ID.

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



[1]: /security_monitoring/default_rules/
[2]: /logs/explorer/search/
[3]: /monitors/notifications/?tab=is_alert#integrations
[4]: /monitors/notifications/
[5]: https://app.datadoghq.com/security/configuration/rules
[6]: https://app.datadoghq.com/security/configuration/rules/new
