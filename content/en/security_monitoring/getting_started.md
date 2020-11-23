---
title: Getting Started
kind: documentation
description: "Learn the main concepts of Datadog Security Monitoring, how to enable threat detection, and discover out of the box threat detection rules."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Secure your infrastructure with Datadog Runtime Security"
---

To get started with Datadog Security Monitoring, follow these three steps:

* [Ingest logs](#ingest-logs)
* [Review Detection Rules](#review-detection-rules)
* [Explore Security Signals](#explore-security-signals)

## Ingest logs

Datadog’s [Log Collection documentation][1] provides detailed information on collecting logs from many different sources into Datadog. All ingested logs are first parsed and enriched. In real time, Detection Rules apply to all processed logs to maximize detection coverage without any of the traditionally associated performance or cost concerns of indexing all of your log data. [Read more about Datadog’s Logging without Limits™][2].

{{< img src="security_monitoring/getting_started/ingest_logs_overview.png" alt="Ingest Logs" >}}

## Review Detection Rules

Datadog provides out of the box [Detection Rules][3], which begin detecting threats in your environment immediately. The default enabled Detection Rules detect threats according to known best practices. More mature security organizations may wish to enable more rules to begin detecting more advanced threats. Additionally, more advanced templates are included to provide guidance on how to detect threats in your custom applications. Refer to the [Detection Rules documentation][4] for further details.

## Explore Security Signals

When a threat is detected with a Detection Rule, a Security Signal is generated. The Security Signals can be correlated and triaged in the [Security Signals Explorer][5]. Refer to the [Security Signals Explorer][6] documentation for further details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: https://www.datadoghq.com/blog/logging-without-limits/
[3]: /security_monitoring/default_rules/
[4]: /security_monitoring/detection_rules/
[5]: https://app.datadoghq.com/security
[6]: /security_monitoring/explorer/
