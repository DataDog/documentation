---
title: Version History
disable_toc: false
further_reading:
- link: "/security/cloud_siem/detect_and_monitor/custom_detection_rules/"
  tag: "Documentation"
  text: "Create a custom rule"
---

## Overview

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="The version history for a GitHub OAuth access token compromise showing" style="width:80%;" >}}

Use Rule Version History to:

- See past versions of a detection rule and understand the changes over time.
- See who made the changes for improved collaboration.
- Compare versions with diffs to analyze the modifications and impact of the changes.

## See version history of a rule

To see the version history of a rule:
1. Navigate to [Detection Rules][1].
1. Click on the rule you are interested in.
1. In the rule editor, click **Version History** to see past changes.
1. Click a specific version to see what changes were made.
1. Click **Open Version Comparison** to see what changed between versions.
1. Select the two versions you want to compare.
    - Data highlighted in red indicates data that was modified or removed.
    - Data highlighted in green indicates data that was added.
1. Click **Unified** if you want to see the comparison in the same panel.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules