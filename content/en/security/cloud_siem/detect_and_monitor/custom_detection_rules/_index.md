---
title: Custom Detection Rules
type: documentation
aliases:
 - /security_platform/detection_rules/cloud_siem
 - /security_platform/detection_rules/security_monitoring
 - /security_platform/detection_rules/create_a_new_rule
 - /security_platform/cloud_siem/log_detection_rules/
 - /cloud_siem/detection_rules/security_monitoring/
 - /security/detection_rules/cloud_siem/
 - /security/detection_rules/security_monitoring
 - /security/detection_rules/create_a_new_rule
 - /security/cloud_siem/log_detection_rules/
 - /security/cloud_siem/detection_rules/
further_reading:
- link: "/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/"
  tag: "Documentation"
  text: "Create a custom detection rule"
- link: "/cloud_siem/default_rules/"
  tag: "Documentation"
  text: "Configure default Cloud SIEM detection rules"
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/"
  tag: "Blog"
  text: "Detect unauthorized third parties in your AWS account"
- link: "https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/"
  tag: "Blog"
  text: "Detect security threats with anomaly detection rules"
- link: "/security/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about Security notification variables"
- link: "https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/"
  tag: "Blog"
  text: "Monitor Cloudflare Zero Trust with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
  tag: "Blog"
  text: "Monitor 1Password with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/"
  tag: "Blog"
  text: "Detect anomalies beyond spikes and new values with Content Anomaly Detection in Cloud SIEM"
---

## Overview

Out-of-the-box detection rules help you cover the majority of threat scenarios, but you can also create custom detection rules for your specific use cases. See [Create Rule][1] for instructions on how to create a custom rule.

## Rule types

You can create the following types of custom detection rules:

- Real-time rule, which continuously monitors and analyzes incoming logs.
- Scheduled rule, which runs at pre-scheduled intervals to analyze log data.
- Historical job, which backtests detections by running them against historical logs.

## Detection methods

The following detection methods are available for custom detection rule or historical job:

- [Threshold][3]: Detects when events exceed a user-defined threshold.
- [New value][4]: Detects when an attributes changes to a brand new value.
- [Anomaly][5]: Detects when a behavior deviates from its historical baseline.
- [Content anomaly][6]: Detects when an event's content is an anomaly compared to the historical baseline
- [Impossible travel][7]: Detects if impossible speed is detected in user activity logs.
- [Third party][8]: Maps third-party security logs to signals, setting the severity based on log attributes.
- [Signal correlation][9]: Combines multiple signals together to generate a new signal so you can alert on more complex use cases and reduce alert fatigue.

## Rule Version History

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="The version history for a GitHub OAuth access token compromise showing" style="width:80%;" >}}

Use Rule Version History to:
- See past versions of a detection rule and understand the changes over time.
- See who made the changes for improved collaboration.
- Compare versions with diffs to analyze the modifications and impact of the changes.

To see the version history of a rule:
1. Navigate to [Detection Rules][2].
1. Click on the rule you are interested in.
1. In the rule editor, click **Version History** to see past changes.
1. Click a specific version to see what changes were made.
1. Click **Open Version Comparison** to see what changed between versions.
1. Select the two versions you want to compare.
    - Data highlighted in red indicates data that was modified or removed.
    - Data highlighted in green indicates data that was added.
1. Click **Unified** if you want to see the comparison in the same panel.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/
[2]: https://app.datadoghq.com/security/rules
[3]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[9]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/signal_correlation_rules/
