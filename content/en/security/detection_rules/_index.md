---
title: Detection Rules
kind: documentation
aliases:
  - /security_monitoring/detection_rules/
  - /cloud_siem/detection_rules/
further_reading:
- link: "/cloud_siem/default_rules"
  tag: "Documentation"
  text: "Explore default detection rules"
- link: "/security_platform/notifications/"
  tag: "Documentation"
  text: "Learn more about Security notifications"
- link: "https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/"
  tag: "Blog"
  text: "Detect Abuse of Functionality with Datadog"
- link: "https://www.datadoghq.com/blog/impossible-travel-detection-rules/"
  tag: "Blog"
  text: "Detect suspicious login activity with impossible travel detection rules"
---

## Overview

Detection Rules define conditional logic that is applied to all ingested logs and cloud configurations. When at least one case defined in a rule that is matched over a given period of time, Datadog generates a Security Signal.

For each of monitoring option, there are [default detection rules][1] that work out-of-the-box with integration configuration.

- [Cloud SIEM][2] uses log detection to analyze ingested logs in real-time. You can also create [custom detection rules][3] to tailor to your environment.

- [Cloud Security Posture Management][4] uses cloud configuration and infrastructure configuration detection rules to scan the state of your cloud environment.

- With [Cloud Workload Security][5], the Datadog Agent actively monitors system activity and evaluates it against a set of detection rules.

- [Application Security Management][6] (ASM) leverages Datadog [APM][7], the [Datadog Agent][8], and detection rules to detect threats in your application environment.

## Creating and managing detection rules

The [Detection Rules][9] page lets you search all detection rules by rule type. Quickly enable, disable, edit, delete, and clone rules. To create a custom [detection rule][3], click on the **New Rule** button in the top right corner of the page.

### Finding detection rules

The free text search filters Detection Rules by text in the rule name or query. Query results update in real-time when the query is edited—there is no “Search” button to click.

#### Filter by facet

Use facets in the left panel to scope a search query by value. For example, if you have several rule types, such as `log detection` or `cloud configuration`, filter by `only` to see rules by rule type.

{{< img src="security_platform/security_monitoring/detection_rules/rule_type_filter.png" alt="Filtering by rule type, such as a log detection or cloud configuration, in Datadog" style="width:80%;" >}}

You can also filter by facets such as `source` and `severity` to help when investigating and triaging incoming issues. To include all facets within a category in search again, hover your mouse over a value in the panel and click **all**.

**Note**: By default, all facets are selected.

### Rules table

Rules are displayed in the detection rules table. You can sort the table by clicking on the **Sort by** option in the top right corner of the table. For example, sort by **Highest Severity** to triage high-impact misconfigurations and threats.

#### Enabling or disabling a rule

Enable or disable a rule using the toggle switch to the right of the rule.

#### Rule and generated signal options

Click on the three dot menu, next to the rule toggle, and select any of the provided options: Edit, Clone, Delete, or View generated signals.

- Click **Edit** to update queries, adjust triggers, manage notifications, or adjust rule configuration.
  -  **Note**: You can only edit an out-of-the-box (OOTB) rule by first cloning the rule, and then modifying the rule. To edit a default rule, click **Edit** and scroll to the bottom of the rule configuration page. Click **Clone**, and then modify the rule.
- Cloning a rule is helpful if you wish to duplicate an existing rule and lightly modify settings to cover other areas of detection. For example, you could duplicate a log detection rule and modify it from **Threshold** to **Anomaly** to add new dimension to threat detection using the same queries and triggers.
- The delete option is **only** available for custom rules. You cannot delete an out-of-the-box (OOTB) rule as they are native to the platform. To permanently delete a custom rule, click **Delete**. To disable an OOTB rule, click the disable toggle.
- Click **View generated signals** to pivot to the [Signals Explorer][6] and query by a rule's ID. This is useful when correlating signals across multiple sources by rule, or when completing an audit of rules. 

#### Limit edit access

By default, all users have full access to security rules.

Use granular access controls to limit the [roles][10] that may edit a single rule:
1. Click on the three dot menu for the rule.
1. Select **Permissions**.
1. Click **Restrict Access**.
1. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the drop-down to select one or more roles that may edit the security rule.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**
**Note:** To maintain your edit access to the rule, the system requires you to include at least one role that you are a member of before saving. 

To restore general access to a rule with restricted access, follow the steps below:
1. Click on the three dot menu on the right of the rule.
1. Select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: /security_platform/default_rules/
[2]: /security_platform/cloud_siem/
[3]: /security_platform/cloud_siem/log_detection_rules/
[4]: /security_platform/cspm/
[5]: /security_platform/cloud_workload_security/
[6]: /security_platform/application_security/
[7]: /tracing/
[8]: /agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /account_management/rbac/
