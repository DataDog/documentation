---
title: Events Forwarding
description: "Forward security and observability events to custom destinations"
further_reading:
  - link: "/logs/log_configuration/forwarding_custom_destinations"
    tag: "Documentation"
    text: "Forwarding Logs to Custom Destinations"
  - link: "/security/detection_rules/"
    tag: "Documentation"
    text: "Detection Rules"
  - link: "/security/workload_protection/"
    tag: "Documentation"
    text: "Workload Protection"
---

## Overview

Events Forwarding allows you to forward various types of security and observability data from Datadog to custom destinations such as Splunk, Elasticsearch, and HTTP endpoints. This enables security teams to centralize their workflows by routing relevant events to third-party SIEMs, data lakes, or internal tools.

Events Forwarding supports the following data types:

| Data Type | Description |
|-----------|-------------|
| **Logs** | Application and infrastructure logs |
| **Audit Logs** | Datadog platform audit events |
| **Spans** | APM distributed tracing data |
| **Security Signals** | Signals from Cloud SIEM and detection rules |
| **Cloud Workload Security Events** | Runtime security events from Workload Protection |

{{< img src="security/events_forwarding/events_forwarding_overview.png" alt="The Events Forwarding page showing the list of configured destinations for different data types." >}}

**Note**: For logs, additional destination types are available (Microsoft Sentinel, Google Chronicle). See [Forwarding Logs to Custom Destinations][2] for details.

## Prerequisites

### Permissions

Each data type requires specific permissions to create and manage forwarding rules:

| Data Type | Permission |
|-----------|------------|
| Logs | [`logs_write_forwarding_rules`][1] |
| Audit Logs | [`audit_logs_write`][1] |
| Spans | [`apm_pipelines_write`][1] |
| Security Signals | [`security_monitoring_signals_write`][1] |
| Cloud Workload Security Events | [`security_monitoring_cws_agent_rules_write`][1] |

## Set up events forwarding

Events Forwarding uses the same destination types and configuration as log forwarding. For detailed instructions on setting up destinations, see [Forwarding Logs to Custom Destinations][2].

{{< site-region region="gov" >}}
<div class="alert alert-danger">Sending events to a custom destination is outside of the Datadog GovCloud environment, which is outside the control of Datadog. Datadog shall not be responsible for any events that have left the Datadog GovCloud environment, including without limitation, any obligations or requirements that the user may have related to FedRAMP, DoD Impact Levels, ITAR, export compliance, data residency or similar regulations applicable to such events.</div>
{{< /site-region >}}

To set up a forwarding rule:

1. Navigate to [**Security Settings** > **Events Forwarding**][3].
2. Click **New Destination**.
3. Select the **data type** you want to forward.
4. Enter a query to filter events. Only matching events are forwarded.
5. Select and configure the **destination type**.
6. Click **Save**.

{{< img src="security/events_forwarding/new_destination.png" alt="The new destination configuration page showing data type selection, query filter, and destination type options." >}}

### Supported destination types

The following destination types are available for all data types:

- **HTTP** - Send events to any HTTPS endpoint with basic authentication or custom headers.
- **Splunk** - Forward events using Splunk's HTTP Event Collector (HEC).
- **Elasticsearch** - Send events to an Elasticsearch cluster with configurable index rotation.

For logs, additional destinations are also supported: **Microsoft Sentinel** and **Google Chronicle**. See [Forwarding Logs to Custom Destinations][2] for setup details.

## Monitoring

The following metrics report on events that have been forwarded successfully, including events that were sent successfully after retries, as well as events that were dropped:

- `datadog.forwarding.<data_type>.bytes`
- `datadog.forwarding.<data_type>.count`

Where `<data_type>` corresponds to the forwarded data type (for example, `logs`, `trace`, `signal`, `secruntime`).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: /logs/log_configuration/forwarding_custom_destinations/
[3]: https://app.datadoghq.com/security/settings/events-forwarding
[4]: /security/detection_rules/
[5]: /security/workload_protection/
