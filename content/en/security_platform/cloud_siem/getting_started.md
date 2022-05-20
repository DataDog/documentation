---
title: Getting Started with Cloud SIEM
kind: documentation
description: "Learn the main concepts of Datadog Cloud SIEM, how to enable threat detection, and discover out-of-the-box threat detection rules."
aliases:
  - /cloud-siem/getting_started/
  - /security_monitoring/getting_started/
  - /security_platform/security_monitoring/
  - /security_platform/security_monitoring/getting_started
  - /security_platform/getting_started/
further_reading:
- link: "/security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default detection rules"
- link: "/security_platform/explorer"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security_platform/guide/aws-config-guide-for-cloud-siem/"
  tag: "Documentation"
  text: "AWS Configuration Guide for Cloud SIEM"
---

To get started with Datadog Cloud SIEM (Security Information and Event Management), follow these steps:

- [Ingest logs](#ingest-logs)
- [Review Detection Rules](#review-detection-rules)
- [Explore Security Signals](#explore-security-signals)
- [Further reading](#further-reading)

For step-by-step instructions on how to start detecting threats in your AWS CloudTrail logs, see the [AWS Configuration Guide for Cloud SIEM][1].

## Ingest logs

If you already have a logging source, follow the [in-app onboarding][2] to begin collecting logs from that source.

Datadog’s [Log Collection documentation][3] provides detailed information on collecting logs from many different sources into Datadog. All ingested logs are first parsed and enriched. In real time, Detection Rules apply to all processed logs to maximize detection coverage without any of the traditionally associated performance or cost concerns of indexing all of your log data. [Read more about Datadog’s Logging without Limits™][4].

{{< img src="security_platform/security_monitoring/getting_started/ingest_logs_overview.png" alt="Ingest Logs" >}}

## Review Detection Rules

Datadog provides out-of-the-box [Detection Rules][5], which begin detecting threats in your environment immediately. The default enabled Detection Rules detect threats according to known best practices. More mature security organizations may wish to enable more detection rules to begin detecting more advanced threats. Additionally, more advanced templates are included to provide guidance on how to detect threats in your custom applications. Refer to the [Detection Rules documentation][6] for further details.

## Explore Security Signals

When a threat is detected with a Detection Rule, a Security Signal is generated. The Security Signals can be correlated and triaged in the [Security Signals Explorer][7]. Refer to the [Security Signals Explorer][8] documentation for further details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/guide/aws-config-guide-for-cloud-siem
[2]: https://app.datadoghq.com/security/onboarding
[3]: /logs/log_collection/
[4]: https://www.datadoghq.com/blog/logging-without-limits/
[5]: /security_monitoring/default_rules/
[6]: /security_monitoring/detection_rules/
[7]: https://app.datadoghq.com/security
[8]: /security_monitoring/explorer/
