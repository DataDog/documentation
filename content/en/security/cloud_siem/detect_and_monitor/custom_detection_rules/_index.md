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

{{< img src="security/security_monitoring/detection_rules/custom_detection_rules_ui.png" alt="The create a rule page showing the detection types and methods you can create" style="width:100%;" >}}

## Rule types

You can create the following types of custom detection rules:

- Real-time rule: Continuously monitors and analyzes incoming logs.
- Scheduled rule: Runs at pre-scheduled intervals to analyze log data.
- Historical job: Backtest detections by running detections against historical logs.

## Detection methods

The following detection methods are available when you create a custom detection rule or historical job:

- Threshold: Detects when events exceed a user-defined threshold.
- New value: Detects when an attributes changes to a brand new value.
- Anomaly: Detects when a behavior deviates from its historical baseline.
- [Content anomaly][6]: Detects when an event's content is an anomaly compared to the historical baseline
- [Impossible travel][7]: Detects if impossible speed is detected in user activity logs.
- Third party: Maps third-party security logs to signals, setting the severity based on log attributes.
- Signal correlation: Combines multiple signals together to generate a new signal so you can alert on more complex use cases and reduce alert fatigue.

## Filter logs based on Reference Tables

<div class="alert alert-warning">Reference Tables containing over 1,000,000 rows cannot be used to filter events. See <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Add Custom Metadata with Reference Tables</a> for more information on how to create and manage Reference Tables. </div>

Reference Tables allow you to combine metadata with logs, providing more information to resolve application issues. When you define a query for a rule, you can add a query filter based on a Reference Table to perform lookup queries. For more information on creating and managing this feature, see the [Reference Tables][10] guide.

In the following example, a Reference Table containing product information is used to filter and enrich logs:

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

## Unit testing

Use unit testing to test your rules against sample logs and make sure the detection rule is working as expected. This can be helpful when you are creating a detection rule for an event that hasn't happened yet, so you don't have actual logs for the event. For example: You have logs with a `login_attempt` field and want to detect logs with `login_attempt:failed`, but you only have logs with `login_attempt:success`. To test the rule, you can construct a sample log by copying a log with `login_attempt:success` and changing the `login_attempt` field to `failed`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/
[2]: https://app.datadoghq.com/security/siem/rules
[3]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[10]: /integrations/guide/reference-tables/