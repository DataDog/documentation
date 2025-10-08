---
title: Detection Rules
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
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
- name: Workload Protection
  url: /security/workload_protection/
  icon: cloud-security-management
---

{{< product-availability >}}

Detection rules define conditional logic that is applied to all ingested logs and cloud configurations. When at least one case defined in a rule is matched over a given period of time, a security signal is generated. You can view these signals in the [Signals Explorer][1].

## Out-of-the-box detection rules

Datadog provides [out-of-the-box detection rules][2] to flag attacker techniques and potential misconfigurations. When new detection rules are released, they are automatically imported into your account, your App and API Protection library, and the Agent, depending on your configuration.

Out-of-the box rules are available for the following security products:

- [Cloud SIEM][3] uses log detection to analyze ingested logs in real-time.
- Cloud Security:
    - [Cloud Security Misconfigurations][4] uses cloud configuration and infrastructure configuration detection rules to scan the state of your cloud environment.
    - [Cloud Security Identity Risks][6] uses detection rules to detect IAM-based risks in your cloud infrastructure.
- [Workload Protection][5] uses the Datadog Agent and detection rules to actively monitor and evaluate system activity.
- [App and API Protection][7] (AAP) leverages Datadog [APM][8], the [Datadog Agent][9], and detection rules to detect threats in your application environment.

## MITRE ATT&CK map

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK is a framework that helps organizations understand how cyber attackers operate. It maps the following:

- **Tactics:** The "why" of an attack. These are the high-level goals, like gaining initial access, executing malicious code, or stealing data.
- **Techniques:** The "how" of an attack. These are the specific actions an attacker takes to achieve a tactic, like using phishing to get into a system or exploiting a vulnerability in software.

By mapping tactics and techniques, MITRE ATT&CK provides security teams with a common language to communicate threats and better prepare defenses.

To use the MITRE ATT&CK map, do the following:

1. Open Detection Rules in [SIEM][16] or [Workload Protection][17].
2. Select **MITRE ATT&CK map**.
3. Select one of more products in the filter <i class="icon-filter"></i>.
4. Review the map for the following:
   - Assessing Coverage: Determine which attack techniques are well-covered and which are under-monitored.
   - Prioritizing Rule Creation: Focus on creating detection rules for techniques with low or no coverage.
   - Streamlining Rule Management: Manage and update detection rules, ensuring they align with the latest threat intelligence.
The MITRE ATT&CK map available in SIEM or Workload Protection, but you can select Application and API Protection in the filter. Application and API Protection is included in the MITRE ATT&CK map for all-inclusive security coverage.
## Beta detection rules

Datadog's Security Research team continually adds new OOTB security detection rules. While the aim is to deliver high quality detections with the release of integrations or other new features, the performance of the detection at scale often needs to be observed before making the rule generally available. This gives Datadog's Security Research the time to either refine or deprecate detection opportunities that do not meet our standards.

## Custom detection rules

There may be situations where you need to customize a rule based on your environment or workload. For example, if you're using AAP, you may want to customize a detection rule that detects users performing sensitive actions from a geolocation where your business doesn't operate.

To [create custom rules](#create-detection-rules), you can clone the default rules and edit the copies, or create your own rules from scratch.

## Search and filter detection rules

To view out-of-the-box and custom detection rules in Datadog, navigate to the [**Security Settings**][10] page. Rules are listed on separate pages for each product (App and API Protection, Cloud Security, and Cloud SIEM).

To search and filter the rules, use the search box and facets to query by value. For example, to only show rules for a given rule type, hover over the rule type and select `only`. You can also filter by facets such as `source` and `severity` when investigating and triaging incoming issues.

{{< img src="security/default_detection_rules.png" alt="The Configuration page shows default and custom Cloud SIEM detection rules" width="100%">}}

## Create detection rules

To create a custom detection rule, click the **New Rule** button in the upper-right corner of the Detection Rules page. You can also [clone an existing default or custom rule](#clone-a-rule) and use it as a template.

For detailed instructions, see the following articles:

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security Misconfigurations][13]
- [Workload Protection][14]

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

### See the version history for a rule

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="The version history for a GitHub OAuth access token compromise showing" style="width:80%;" >}}

Use Rule Version History to:
- See past versions of a detection rule and understand the changes over time.
- See who made the changes for improved collaboration.
- Compare versions with diffs to analyze the modifications and impact of the changes.

To see the version history of a rule:
1. Navigate to the [Security Settings][15] page. In the left navigation panel:
    - For AAP: Click **App and API Protection** and then click **Detection Rules**.
    - For Cloud Security: Click **Cloud Security** and then click **Threat Detection Rules**.
    - For Cloud SIEM: Click **Cloud SIEM** and then click **Detection Rules**.
1. Click on the rule you are interested in.
1. In the rule editor, click **Version History** to see past changes.
1. Click a specific version to see what changes were made.
1. Click **Open Version Comparison** to see what changed between versions.
1. Select the two versions you want to compare.
    - Data highlighted in red indicates data that was modified or removed.
    - Data highlighted in green indicates data that was added.
1. Click **Unified** if you want to see the comparison in the same panel.

### Restrict edit permissions

{{% security-products/detection-rules-granular-access %}}

### View generated signals

To view the security signals for a rule in the [Signals Explorer][1], click the vertical three-dot menu and select **View generated signals**. This is useful when correlating signals across multiple sources by rule, or when completing an audit of rules.

### Export a rule as JSON

To export a copy of a rule as JSON, click the vertical three-dot menu for the rule and select **Export as JSON**.

## Rule deprecation

Regular audits of all detection rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's **Rule Details > Playbook** section
    - Misconfigurations side panel (Cloud Security Misconfigurations only)
    - [Rule editor][10] for that specific rule 
2. Once the rule is deprecated, there is a 15 month period before the rule is deleted. This is due to the signal retention period of 15 months. During this time, you can re-enable the rule by [cloning the rule](#clone-a-rule) in the UI.
3. Once the rule is deleted, you can no longer clone and re-enable it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /security/default_rules/
[3]: /security/cloud_siem/
[4]: /security/cloud_security_management/misconfigurations/
[5]: /security/workload_protection/
[6]: /security/cloud_security_management/identity_risks/
[7]: /security/application_security/
[8]: /tracing/
[9]: /agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
[12]: /security/application_security/policies/custom_rules/
[13]: /security/cloud_security_management/misconfigurations/custom_rules
[14]: /security/workload_protection/workload_security_rules?tab=host#create-custom-rules
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules

