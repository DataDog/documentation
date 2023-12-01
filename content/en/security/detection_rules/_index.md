---
title: Detection Rules
kind: documentation
aliases:
  - /security_monitoring/detection_rules/
  - /cloud_siem/detection_rules/
  - /security_platform/detection_rules/
  - /security/security_monitoring/log_detection_rules/
further_reading:
- link: "/security/default_rules/#all"
  tag: "Documentation"
  text: "Explore default detection rules"
- link: "/security/notifications/"
  tag: "Documentation"
  text: "Learn more about security notifications"
- link: "https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/"
  tag: "Blog"
  text: "Detect abuse of functionality with Datadog"
- link: "https://www.datadoghq.com/blog/impossible-travel-detection-rules/"
  tag: "Blog"
  text: "Detect suspicious login activity with impossible travel detection rules"
---

Detection Rules define conditional logic that is applied to all ingested logs and cloud configurations. When at least one case defined in a rule that is matched over a given period of time, Datadog generates a security signal.

For each monitoring option, there are [default detection rules][1] that work out-of-the-box with integration configuration.

- [Cloud SIEM][2] uses log detection to analyze ingested logs in real-time. You can also create [custom detection rules][3] to tailor to your environment.
- [Cloud Security Management Misconfigurations][4] uses cloud configuration and infrastructure configuration detection rules to scan the state of your cloud environment.
- With [Cloud Security Management Threats][5], the Datadog Agent actively monitors system activity and evaluates it against a set of detection rules.
- [Application Security Management][6] (ASM) leverages Datadog [APM][7], the [Datadog Agent][8], and detection rules to detect threats in your application environment.

## Create and manage detection rules

Creating and managing detection rules

The [Detection Rules][9] page lets you search all detection rules by rule type. Quickly enable, disable, edit, delete, and clone rules. To create a custom [detection rule][3], click on the **New Rule** button in the top right corner of the page.

- Cloud SIEM: Log Detection Rules
- ASM: Custom Detection Rules
- CSM Misconfigurations: Custom Rules
- CSM Threats: Managing CSM Threats Detection Rules

#### Filter by facet

Use facets in the left panel to scope a search query by value. For example, if you have several rule types, such as `log detection` or `cloud configuration`, filter by `only` to see rules by rule type.

{{< img src="security/security_monitoring/detection_rules/rule_type_filter.png" alt="Filtering by rule type, such as a log detection or cloud configuration, in Datadog" style="width:80%;" >}}

You can also filter by facets such as `source` and `severity` to help when investigating and triaging incoming issues. To include all facets within a category in search again, hover your mouse over a value in the panel and click **all**.

**Note**: By default, all facets are selected.

## Manage detection rules

For default out-of-the-box rules, you can only add or edit a 

### Enable or disable rules

To enable or disable a rule, toggle the switch to the right of the rule name.

You can also bulk enable or disable rules:

1. Click **Select Rules**.
1. Select the rules you want to enable or disable.
1. Click the **Edit Rules** dropdown menu.
1. Select **Enable Rules** or **Disable Rules**.

### Edit a rule

For out-of-the-box rules, you can only add or edit a suppression query. To update the query, adjust triggers, or manage notifications, you must clone the default rule.

- Click **Edit** to update queries, adjust triggers, manage notifications, or adjust rule configuration.
  -  **Note**: You can only edit an out-of-the-box (OOTB) rule by first cloning the rule, and then modifying the rule. To edit a default rule, click **Edit** and scroll to the bottom of the rule configuration page. Click **Clone**, and then modify the rule.

For default rules, you can only edit the suppression query.

To edit a default rule, click the vertical three-dot menu and select **Edit default rule**.

To edit a custom rule, click the vertical three-dot menu and select **Edit rule**.

### Clone a rule

To clone a rule, click the vertical three-dot menu and select **Clone rule**.

Cloning a rule is helpful if you wish to duplicate an existing rule and lightly modify settings to cover other areas of detection. For example, you could duplicate a log detection rule and modify it from **Threshold** to **Anomaly** to add a new dimension to threat detection using the same queries and triggers.

### Delete a rule

To delete a custom rule, click the vertical three-dot menu and select **Delete rule**.

**Note**: You can only delete custom rules. To remove a default rule, you must [disable it](#enable-or-disable-rules).

### Restrict edit permissions

By default, all users have full access to the detection rules. To use granular access controls to limit the [roles][10] that may edit a single rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restrict Access**. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown menu to select one or more roles, teams, or users that may edit the security rule.
1. Click **Add**.
1. Click **Save**

**Note:** To maintain your edit access to the rule, the system requires you to include at least one role that you are a member of before saving.

To restore access to a rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

### View generated signals

To view the security signals for a rule in the [Signals Explorer][6], click the vertical three-dot menu and select **View generated signals**. This is useful when correlating signals across multiple sources by rule, or when completing an audit of rules.

### Export a rule as JSON

To export a copy of a rule as JSON, click the vertical three-dot menu for the rule and select **Export as JSON**.

## Rule deprecation

Regular audits of all detection rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's **Rule Details > Playbook** section
    - Misconfigurations side panel (CSM Misconfigurations only)
    - [Rule editor](#rule-and-generated-signal-options) for that specific rule 
2. Once the rule is deprecated, there is a 15 month period before the rule is deleted. This is due to the signal retention period of 15 months. During this time, you can re-enable the rule by [cloning the rule](#rule-and-generated-signal-options) in the UI.
3. Once the rule is deleted, you can no longer clone and re-enable it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/
[2]: /security/cloud_siem/
[3]: /security/cloud_siem/log_detection_rules/
[4]: /security/misconfigurations/
[5]: /security/threats/
[6]: /security/application_security/
[7]: /tracing/
[8]: /agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /account_management/rbac/