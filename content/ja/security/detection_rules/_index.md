---
title: Detection Rules
aliases:
  - /security_monitoring/detection_rules/
  - /cloud_siem/detection_rules/
  - /security_platform/detection_rules/
  - /security/security_monitoring/log_detection_rules/
further_reading:
- link: "/security/default_rules/#all"
  tag: Documentation
  text: Explore default detection rules
- link: /security/notifications/
  tag: Documentation
  text: Learn more about security notifications
- link: "https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/"
  tag: Blog
  text: Detect abuse of functionality with Datadog
- link: "https://www.datadoghq.com/blog/impossible-travel-detection-rules/"
  tag: Blog
  text: Detect suspicious login activity with impossible travel detection rules
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

Detection rules define conditional logic that is applied to all ingested logs and cloud configurations. When at least one case defined in a rule is matched over a given period of time, a security signal is generated. You can view these signals in the [Signals Explorer][16].

## Out-of-the-box detection rules

Datadog provides [out-of-the-box detection rules][1] to flag attacker techniques and potential misconfigurations. When new detection rules are released, they are automatically imported into your account, your Application Security Management library, and the Agent, depending on your configuration.

Out-of-the box rules are available for the following security products:

- [Cloud SIEM][2] uses log detection to analyze ingested logs in real-time.
- Cloud Security Management (CSM):
    - [CSM Misconfigurations][4] uses cloud configuration and infrastructure configuration detection rules to scan the state of your cloud environment.
    - [CSM Threats][5] uses the Datadog Agent and detection rules to actively monitor and evaluate system activity.
    - [CSM Identity Risks][14] uses detection rules to detect IAM-based risks in your cloud infrastructure.
- [Application Security Management][6] (ASM) leverages Datadog [APM][7], the [Datadog Agent][8], and detection rules to detect threats in your application environment.

## Beta detection rules

Datadog's Security Research team continually adds new OOTB security detection rules. While the aim is to deliver high quality detections with the release of integrations or other new features, the performance of the detection at scale often needs to be observed before making the rule generally available. This gives Datadog's Security Research the time to either refine or deprecate detection opportunities that do not meet our standards.

## Custom detection rules

There may be situations where you need to customize a rule based on your environment or workload. For example, if you're using ASM, you may want to customize a detection rule that detects users performing sensitive actions from a geolocation where your business doesn't operate.

To [create custom rules](#create-detection-rules), you can clone the default rules and edit the copies, or create your own rules from scratch.

## Search and filter detection rules

To view out-of-the-box and custom detection rules in Datadog, navigate to the [**Security Settings**][15] page. Rules are listed on separate pages for each product (Application Security, Cloud Security Management, and Cloud SIEM).

To search and filter the rules, use the search box and facets to query by value. For example, to only show rules for a given rule type, hover over the rule type and select `only`. You can also filter by facets such as `source` and `severity` when investigating and triaging incoming issues.

{{< img src="security/default_detection_rules.png" alt="The Configuration page shows default and custom Cloud SIEM detection rules" width="100%">}}

## Create detection rules

To create a custom detection rule, click the **New Rule** button in the upper-right corner of the Detection Rules page. You can also [clone an existing default or custom rule](#clone-a-rule) and use it as a template.

For detailed instructions, see the following articles:

- [Cloud SIEM][3]
- [ASM][11]
- [CSM Misconfigurations][12]
- [CSM Threats][13]

## Manage detection rules

### Enable or disable rules

To enable or disable a rule, toggle the switch to the right of the rule name.

You can also bulk enable or disable rules:

1. Click **Select Rules**.
1. Select the rules you want to enable or disable.
1. Click the **Edit Rules** dropdown menu.
1. Select **Enable Rules** or **Disable Rules**.

### Edit a rule

For out-of-the-box detection rules, you can only add or edit a suppression query. To update the query, adjust triggers, or manage notifications, you can [clone the default rule](#clone-a-rule) and use it as a template for a custom rule. You can then [disable the default rule](#enable-or-disable-rules).

- To edit a default rule, click the vertical three-dot menu for the rule and select **Edit default rule**.
- To edit a custom rule, click the vertical three-dot menu for the rule and select **Edit rule**.

### Clone a rule

To clone a rule, click the vertical three-dot menu for the rule and select **Clone rule**.

Cloning a rule is helpful if you wish to duplicate an existing rule and lightly modify settings to cover other areas of detection. For example, you could duplicate a log detection rule and modify it from **Threshold** to **Anomaly** to add a new dimension to threat detection using the same queries and triggers.

### Delete a rule

To delete a custom rule, click the vertical three-dot menu for the rule and select **Delete rule**.

**Note**: You can only delete custom rules. To remove a default rule, you must [disable it](#enable-or-disable-rules).

### Restrict edit permissions

By default, all users have full access to the detection rules. To use granular access controls to limit the [roles][10] that may edit a single rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restrict Access**. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown menu to select one or more roles, teams, or users that may edit the security rule.
1. Click **Add**.
1. Click **Save**.

**Note:** To maintain your edit access to the rule, the system requires you to include at least one role that you are a member of before saving.

To restore access to a rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

### View generated signals

To view the security signals for a rule in the [Signals Explorer][16], click the vertical three-dot menu and select **View generated signals**. This is useful when correlating signals across multiple sources by rule, or when completing an audit of rules.

### Export a rule as JSON

To export a copy of a rule as JSON, click the vertical three-dot menu for the rule and select **Export as JSON**.

## Rule deprecation

Regular audits of all detection rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's **Rule Details > Playbook** section
    - Misconfigurations side panel (CSM Misconfigurations only)
    - [Rule editor][15] for that specific rule 
2. Once the rule is deprecated, there is a 15 month period before the rule is deleted. This is due to the signal retention period of 15 months. During this time, you can re-enable the rule by [cloning the rule](#clone-a-rule) in the UI.
3. Once the rule is deleted, you can no longer clone and re-enable it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/
[2]: /security/cloud_siem/
[3]: /security/cloud_siem/log_detection_rules/
[4]: /security/cloud_security_management/misconfigurations/
[5]: /security/threats/
[6]: /security/application_security/
[7]: /tracing/
[8]: /agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /account_management/rbac/
[11]: /security/application_security/threats/custom_rules/
[12]: /security/cloud_security_management/misconfigurations/custom_rules
[13]: /security/threats/workload_security_rules?tab=host#create-custom-rules
[14]: /security/cloud_security_management/identity_risks/
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security