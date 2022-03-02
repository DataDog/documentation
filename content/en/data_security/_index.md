---
title: Securing the Data Sent to Datadog
kind: documentation
aliases:
  - /security/
further_reading:
- link: "/data_security/tracing/"
  tag: "Documentation"
  text: "APM Security"
- link: "/data_security/logs/"
  tag: "Documentation"
  text: "Logs Security"
- link: "/data_security/agent/"
  tag: "Documentation"
  text: "Agent Security"
- link: "/data_security/synthetics/"
  tag: "Documentation"
  text: "Synthetic Monitoring Security"
- link: "/data_security/other/"
  tag: "Documentation"
  text: "Additional Security Considerations"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security_platform/" target="_blank">Security Platform</a> section.</div>

Datadog allows you to send data in multiple ways, including from the [Agent][1], the [public API][2], and [integrations][3]. This section lists the kinds of data that you might send Datadog as part of the intended use of the product, describes scenarios where submitted data may contain personal data, and provides links to ways you can obfuscate or filter sensitive information before sending it. 

Read the [Datadog Security page][4] and [Privacy Policy][5] for more information.

## Metadata

Metadata consists primarily of [tags][6], which are typically formatted in the `key:value` format, for example, `env:prod`. Metadata facilitates filtering and grouping data such as Infrastructure Metrics, APM, and Logs, within the app. Metadata should not contain personal data as part of the intended use of the service. For example, don't set tag keys or values to information that is identifiably tied to an individual person.

## Infrastructure metrics

Infrastructure Metrics consist of timeseries for given metric names, associated with metadata, used to populate graphs. Metric names and timeseries should not contain personal data as part of the intended use of the service.

## APM

APM data consists of four levels of granularity: services, resources, traces, and spans. Read [the APM Glossary][7] for an explanation about each. Services and resources should not contain personal data as part of the intended use of the service. If needed, use filtering and obfuscation features in the Agent to remove or hide personal data before transmitting traces and spans to Datadog. Read [APM Security][8] for more information.

## Database monitoring

Database monitoring data consists of metrics and samples collected by the Agent and used to track historical performance of normalized queries. The granularity of this data is defined by its normalized query signature and unique host identifier. Database monitoring data should not contain personal data. All query parameters are obfuscated and discarded from collected samples before being sent to Datadog. 

## Logs

Logs consist of messages collected [by the Agent or by integrations][9], and associated with optional tags metadata. Log files are immutable records of computer events about an operating system, application, or user activities, which form an audit trail. These records may be used to assist in detecting security violations, performance problems, and flaws in applications. You can use Agent features to  filter, obfuscate, or otherwise hide personal data before sending Logs to Datadog. Read the [Logs Security][10] page for more information.

## Processes

[Processes][11] consist of metrics and data from the `proc` filesystem, which acts as an interface to internal data structures in the kernel. Process data may contain the process command (including its path and arguments), the associated username, the ID of the process and its parent, the process state, and the working directory. Process data may also be associated with optional tags metadata. Processes should not contain personal data as part of the intended use of the service. Read [Additional Security Considerations][12] for more information.

## Monitors and alerts

You create [monitors and alerts][13] to monitor the state of your infrastructure and applications based on the data they send to Datadog. Monitors and alerts are associated with optional tags metadata. A monitor might trigger an alert when certain conditions occur, such as a metric reaching a threshold, in order to track critical changes and notify team members as needed. Ensure you don't include personal data in your monitors as part of the intended use of the service.

## Events and comments

[Events][14] are aggregated from multiple sources into a consolidated view, including triggered monitors, events submitted by integrations, events submitted by the application itself, and comments sent by users or through the API. Events and comments are associated with optional tags metadata. Ensure you don't include personal data in your events and comments as part of the intended use of the service.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /api/
[3]: /integrations/
[4]: https://www.datadoghq.com/security
[5]: https://www.datadoghq.com/legal/privacy
[6]: /getting_started/tagging/
[7]: /tracing/visualization/
[8]: /data_security/tracing/
[9]: /logs/log_collection/
[10]: /data_security/logs/
[11]: /infrastructure/process/
[12]: /data_security/other/
[13]: /monitors/
[14]: /events/
