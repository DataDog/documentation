---
title: Categories of Data
kind: documentation
aliases:
    # - /getting_started/categories_of_data/
    - /security/
further_reading:
- link: "security/tracing"
  tag: "Documentation"
  text: APM Security
- link: "security/logs"
  tag: "Documentation"
  text: Logs Security
- link: "security/agent"
  tag: "Documentation"
  text: Agent Security
- link: "security/other"
  tag: "Documentation"
  text: Additional Security Considerations
---

This article is part of a **series on data security**.

Datadog allows customers to submit data in multiple ways, including via the [Agent][1], the [public API][2], and [integrations][3]. This article describes the main categories of data which might be submitted by customers to Datadog as part of the intended use of its product, and highlights scenarios where submitted data may contain personal data.

## User Personal Data

User Personal Data is required by Datadog to provide and support the service, e.g. to authenticate authorized users, maintain contact and billing information, and address support tickets. Please consult our [privacy policy][4] for more information.

## Metadata

Metadata consist primarily of [tags][5], which are typically formatted in the `key:value` (e.g. `env:prod`) format. Metadata enable customer data such as Infrastructure Metrics, APM and Logs to be filtered and grouped. Metadata should not contain personal data as part of the intended use of the service.

## Infrastructure Metrics

Infrastructure Metrics consist of timeseries for given metric names, associated with Metadata, used to populate [graphs][6]. Metric names and timeseries should not contain personal data as part of the intended use of the service.

## APM

APM data consists of four levels of granularity: Services, Resources, Traces, and Spans. See [Getting Started with APM][7] for an explanation about each. Services and Resources should not contain personal data as part of the intended use of the service. Customers should leverage certain Agent features to restrict personal data before transmitting Traces and Spans to Datadog. See the [APM Security][12] page for more information.

## Logs

Logs consist of messages collected [by the Agent or by integrations][8], and associated with optional Metadata. Log files are immutable records of computer events about an operating system, application, or user activities, which form an audit trail. These records may be used to assist in detecting security violations, performance problems, and flaws in applications. Customers should leverage certain Agent features to restrict personal data before transmitting Logs to Datadog. See the [Logs Security][13] page for more information.

## Processes

[Processes][9] consist of metrics and data from the `proc` filesystem, which acts as an interface to internal data structures in the kernel. Process data may contain the process command (including its path and arguments), the associated username, the ID of the process and its parent, the process state, and the working directory. Process data may also be associated with optional Metadata. Processes should not contain personal data as part of the intended use of the service. See the [Processes Security][14] section for more information.

## Monitors and Alerts

[Monitors and Alerts][10] are defined by customers to monitor the state of their infrastructure and applications based on the data they submit to Datadog. Monitors and Alerts are associated with optional Metadata. A Monitor might trigger an Alert when certain conditions occur, such as a metric reaching a threshold, in order to track critical changes and notify team members as needed. With the exception of User Personal Data used for notifications, Monitors should not contain personal data as part of the intended use of the service.

## Events and Comments

[Events][11] are aggregated from multiple sources into a consolidated Event stream, including triggered monitors, Events submitted by integrations, Events submitted by the application itself, Comments and annotations from users, and Events and Comments submitted through the API. Events and Comments are associated with optional Metadata. With the exception of User Personal Data used for notifications, Events and Comments should not contain personal data as part of the intended use of the service.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /api/
[3]: /integrations/
[4]: https://www.datadoghq.com/legal/privacy/
[5]: /getting_started/tagging/
[6]: /graphing/
[7]: /tracing/visualization/
[8]: /logs/log_collection/
[9]: /graphing/infrastructure/process/
[10]: /monitors/
[11]: /graphing/event_stream/
[12]: /security/tracing/
[13]: /security/logs/
[14]: /security/other/
