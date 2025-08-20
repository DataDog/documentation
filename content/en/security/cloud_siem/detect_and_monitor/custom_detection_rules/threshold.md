---
title: Threshold
disable_toc: false
---

## Overview

Detect when events exceed a threshold that you define. For example, if you create a trigger with a threshold greater than `10`, a security signal is generated when the condition is met.

## Create a rule

To create a threshold detection rule or job:

1. Navigate to the [Detection Rules][1] page and click **+ New Rule**.
1. Select whether you want to create a **Real-Time Rule**, **Scheduled Rule** or a **Historical Job**.
1. Leave the **Threshold** option as the selected detection method.

{{< tabs >}}
{{% tab "Real-time rule" %}}

### Define search queries

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][1].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined Group By generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).

Click **Add Query** to add additional queries.

**Note**: The query applies to all ingested logs.

#### Joining queries

Joining together logs that span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.

The Detection Rules join the logs together using a `group by` value. The `group by` values are typically entities (for example, IP address or user), but can be any attribute.

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

Use unit testing to test your rules against sample logs and make sure the detection rule is working as expected. Specifically, this can be helpful when you are creating a detection rule for an event that hasn't happened yet, so you don't have actual logs for it. For example: You have logs with a `login_attempt` field and want to detect logs with `login_attempt:failed`, but you only have logs with `login_attempt:success`. To test the rule, you can construct a sample log by copying a log with `login_attempt:success` and changing the `login_attempt` field to `failed`.

To use unit testing:

1. After entering the rule query, click **Unit Test** to test your query against a sample log.
1. To construct a sample log, you can:  
    a. Navigate to [Log Explorer][2].  
    b. Enter the same detection rule query in the search bar.  
    c. Select one of the logs.  
    d. Click the export button at the top right side of the log side panel, and then select **Copy**.
1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
1. Click **Run Query Test**.

### Set conditions

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

### Decreasing non-production severity

One way to decrease signal noise is to prioritize production environment signals over non-production environment signals. Select the `Decrease severity for non-production environments` checkbox to decrease the severity of signals in non-production environments by one level from what is defined by the rule case.

| Signal Severity in Production Environment| Signal Severity in Non-production Environment|
| ---------------------------------------- | -------------------------------------------- |
| Critical                                 | High                                         |
| High                                     | Medium                                       |
| Medium                                   | Info                                         |
| Info                                     | Info                                         |

The severity decrement is applied to signals with an environment tag starting with `staging`, `test`, or `dev`.

### Describe your playbook

{{% security-rule-say-whats-happening %}}

### Create a suppression

Optionally, add a suppression rule to prevent a signal from getting generated. For example, if a user `john.doe` is triggering a signal, but their actions are benign and you do not want signals triggered from this user, add the following query into the **Add a suppression query** field: `@user.username:john.doe`.

Additionally, in the suppression rule, you can add a log exclusion query to exclude logs from being analyzed. These queries are based on **log attributes**. **Note**: The legacy suppression was based on log exclusion queries, but it is now included in the suppression rule's **Add a suppression query** step.

[1]: /logs/search_syntax/
[2]:  https://app.datadoghq.com/logs/

{{% /tab %}}
{{% tab "Scheduled rule" %}}

### Define search queries

{{% cloud_siem/define_search_queries %}}

### Add custom schedule

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{% tab "Historical job" %}}

### Define search queries

{{% cloud_siem/define_search_queries %}}

### Notify when job is complete

TKTK

### Describe your playbook

{{% security-rule-say-whats-happening %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
