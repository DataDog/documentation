---
title: ATT&CK Map
disable_toc: false
further_reading:
- link: "/security/cloud_siem/detection_rules/"
  tag: "Documentation"
  text: "Create custom detection rules"
---

## Overview

The MITRE ATT&CK Framework is a knowledge base used to develop specific threat models and methodologies. Use the Cloud SIEM ATT&CK Map to explore and visualize the MITRE ATT&CK Framework against Datadog's out-of-the-box rules and your custom detection rules. The ATT&CK Map displays detection rule density as a heat map to provide visibility into attacker techniques. Security teams can use the heat map to assess gaps in coverage that is relevant to their organization or team and prioritize improvements to their detection rule defenses.

## View detection rules in the ATT&CK Map

To view detection rules against the MITRE ATT&CK Framework:
1. Navigate to the [Detection Rules][1] page.
1. Click the **ATT&CK Map** button located next to **Rules List**.

The default view of the map shows all Datadog out-of-the-box and custom rules for active sources, broken down into different attack techniques. Active sources are the sources of logs found and analyzed in the Cloud SIEM index.  **Note**: For the legacy SKU, all ingested logs are analyzed by Cloud SIEM unless [security filters][2] have been set up.

To view the map for all sources, in the **Visualize** dropdown menu, select **All Sources** . This shows all out-of-the-box rules, including those that are not currently used to detect threats from your logs.

Click the different rule density buttons to visualize the map for a specific number of rules. For example, if you click **High \+7**, only tiles that have more than seven rules enabled are shown on the map.

### View a technique's information and related rules

To view more information about the technique and the rules monitoring the technique:

1. On the [ATT&CK Map][3] page, click on a technique tile.
1. Click **Create Custom Rule** if you want to create a custom rule for this technique. See [Detection Rules][4] for more information on creating custom rules.
1. In the **Rules monitoring this Technique** section, you can:
	1. Enter a search query to filter to specific rules.
    1. Sort by the creation date, rule type, rule name, source, or highest severity,
    1. Toggle **Show deprecated rules** to see deprecated rules for this technique.

### Custom rules

Custom rules only show up in the map if they are tagged in the rule editor with the correct MITRE tactic and technique. The tactic and technique must also be paired correctly. If the correct format and pairing are not used, the rule does not show up in the map when you use the search bar to filter for that rule.

This is the correct format for tactic and technique tags:

- `tactic: <tactic number>-<tactic name>`
    - For example: `tactic:TA0001-initial-access`
- `technique: <technique number>-<technique name>`
    - For example: `technique:T1110-brute-force`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/rules
[2]: https://docs.datadoghq.com/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[3]: https://app.datadoghq.com/security/rules?query=product=siem&sort=date&viz=attck-map
[4]: https://docs.datadoghq.com/security/cloud_siem/detection_rules/?tab=threshold
