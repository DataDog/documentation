---
title: Infrastructure Monitoring (Basic)
description: Monitor system metrics and limited process and service information for on-premises and lower-tier cloud workloads.
---

{{< callout url="#" btn_hidden="true" header="Limited Availability">}}
Infrastructure Basic is currently offered on a limited basis. Contact your Datadog account team if you're interested. Infrastructure Basic is not available through self-service signup.
{{< /callout >}}

## Overview

Infrastructure Monitoring (Basic) is intended for monitoring on-premises hosts. If you only need basic system metrics (CPU, RAM, disk, network, and select processes), Infrastructure Basic can be a cost-effective way to monitor your physical servers and on-premises VMs.

## Use cases

Use Infrastructure Basic for on-premises physical servers and virtual machines where you need to understand whether a host is running, whether it is running out of resources, and whether specific application processes are running.

Examples include legacy and back-office servers, development and staging VMs, and internal systems that need host health monitoring without application-level instrumentation. You can create monitors for conditions such as low available disk space on a back-office server, high CPU utilization, or a selected application process that has stopped running.

Use the [Process check][3] to collect metrics for specific, named application processes. This does not provide Live Processes visibility into all processes running on the host.

You can use Infrastructure Basic alongside one other Infrastructure Monitoring tier in the same Datadog organization. For example, use Basic for on-premises development VMs and a more comprehensive tier for production workloads that require container monitoring or broader process visibility. The same dashboards and queries can cover supported system metrics from both sets of hosts.

For cloud workloads with similarly limited monitoring requirements, contact your Datadog account team to discuss eligibility. Cloud hosts must have the Datadog Agent installed to use Infrastructure Basic.

<!-- TODO: Confirm whether cloud hosts still require an exception at GA. The technical wiki describes approval by exception; the launch brief includes lower-tier cloud workloads. -->

## Capabilities

Infrastructure Basic includes the following:

- Core system metrics, including CPU, memory, disk utilization and I/O, network activity, uptime, and system load
- Limited process and service information through supported checks
- Out-of-the-box dashboards, unlimited alerts, and 6 months of full-resolution data retention
- A limited set of [infrastructure integrations][1]
- SaaS integrations, such as ServiceNow and PagerDuty, to connect alerts from Basic hosts to existing notification and incident management workflows
- [Host Map][4] to visualize your hosts

<!-- TODO: The announcement draft and its review comment specify 15 months of full-resolution retention at GA, replacing 6 months. Update this when the GA change takes effect. -->

<!-- Any other supported products to call out? -->

## Limitations

Infrastructure Basic does not support the following:

- Container monitoring
- Live Processes
- Most Agent integrations, including database, IIS, and Kafka integrations. See the [supported integrations][1] for the limited set available in Basic mode.
- Hosts monitored only through cloud integrations, without the Datadog Agent

<!-- TODO: OTel support? -->

Custom metrics and custom events are supported and billed separately.

<!-- ^ confirm -->

## Setting up Infrastructure Basic

See [Set up Infrastructure Basic][2].

[1]: /agent/configuration/infrastructure-modes/#basic
[2]: /infrastructure/basic/setup/
[3]: /integrations/process/
[4]: /infrastructure/hostmap/

<!-- Blog draft source: https://docs.google.com/document/d/18IlpSCtd20qTWf95_QTSp8x52T8MtUUFMumGDOfP6M0/edit?tab=t.u8cx4upsi1o5 . Supports workload examples, shared dashboards/queries across Basic and one other tier, monitoring workflows, and the planned retention change. The draft comments leave the final product name and Basic-only organization eligibility unresolved; October 13 is a blog publication target, not a confirmed GA date. -->
