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

For example, you can monitor CPU, memory, disk, and network utilization on a server and use the [Process check][3] to collect metrics for specific, named application processes. This does not provide Live Processes visibility into all processes running on the host.

For cloud workloads with similarly limited monitoring requirements, contact your Datadog account team to discuss eligibility. Cloud hosts must have the Datadog Agent installed to use Infrastructure Basic.

<!-- TODO: Confirm whether cloud hosts still require an exception at GA. The technical wiki describes approval by exception; the launch brief includes lower-tier cloud workloads. -->

## Capabilities

Infrastructure Basic includes the following:

- Core system metrics, including CPU, memory, disk, and network utilization
- Limited process and service information through supported checks
- Out-of-the-box dashboards, unlimited alerts, 6 months data retention
- A limited set of [infrastructure integrations][1]
- SaaS integrations (ServiceNow, PagerDuty, etc.)
- [Host Map][4] to visualize your hosts

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
