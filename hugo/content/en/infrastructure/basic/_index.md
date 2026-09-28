---
title: Infrastructure Monitoring (Basic)
description: Monitor system metrics and limited process and service information for on-premises and lower-tier cloud workloads.
---

## Overview

Infrastructure Monitoring (Basic) is intended for monitoring on-premises hosts. If you only need basic system metrics (CPU, RAM, disk, network, and select processes), Infrastructure Basic can be a cost-effective way to monitor your physical servers and on-premises VMs.

<div class="alert alert-info">Contact your Datadog account team to get access to Infrastructure Basic. Your contract must include an Infrastructure Basic subscription; configuring Basic mode alone does not enroll you in the product.</div>

## Use cases

Use Infrastructure Basic for on-premises physical servers and virtual machines where you need to understand whether a host is running, whether it is running out of resources, and whether specific application processes are running.

Examples include legacy and back-office servers, development and staging VMs, and internal systems that need host health monitoring without application-level instrumentation. You can create monitors for conditions such as low available disk space on a back-office server, high CPU utilization, or a selected application process that has stopped running.

Use the [Process check][3] to collect metrics for specific, named application processes. This does not provide Live Processes visibility into all processes running on the host.

You can use Infrastructure Basic alongside one other Infrastructure Monitoring tier in the same Datadog organization. For example, use Basic for on-premises development VMs and a more comprehensive tier for production workloads that require container monitoring or broader process visibility. The same dashboards and queries can cover supported system metrics from both sets of hosts.

For cloud workloads with similarly limited monitoring requirements, contact your Datadog account team to discuss eligibility. Cloud hosts must have the Datadog Agent installed to use Infrastructure Basic.

## Capabilities

Infrastructure Basic includes the following:

- Core system metrics, including CPU, memory, disk utilization and I/O, network activity, uptime, and system load
- Limited process and service information through supported checks
- Out-of-the-box dashboards, unlimited alerts, and 15 months of full-resolution data retention
- A limited set of [infrastructure integrations][1]
- SaaS integrations, such as ServiceNow and PagerDuty, to connect alerts from Basic hosts to existing notification and incident management workflows
- [Host Map][4] to visualize your hosts
- Monitoring through [supported virtualization integrations][6], including VMware vSphere, Proxmox, and Nutanix

<!-- This list will also be in pricing; consider linking to there instead when it's live -->

## Limitations

Infrastructure Basic does not support the following:

- Container monitoring
- Live Processes
- Most Agent integrations, including database, IIS, and Kafka integrations. See the [supported integrations][1] for the limited set available in Basic mode.
- Hosts monitored only through cloud integrations, without the Datadog Agent

**OpenTelemetry:** Hosts monitored with OpenTelemetry must also have the Datadog Agent installed and configured in Basic mode to use Infrastructure Basic. OpenTelemetry-only hosts are not supported.

**Operating system compatibility:** Agent-based monitoring requires an operating system that supports the minimum Agent version for Infrastructure Basic. See [Agent supported platforms][5] for compatibility details. Hosts that cannot run the required Agent version may still be monitored through a [supported virtualization integration][6], such as VMware vSphere.

## Set up Infrastructure Basic

Before configuring your hosts, contact your Datadog account team to add Infrastructure Basic to your contract. Configuring Basic mode alone does not enroll you in the product.

- **Hosts monitored by the Agent:** Follow [Configure Agent infrastructure mode][2] and select `basic` as the mode.
- **Hosts monitored through vSphere, Proxmox, or Nutanix:** Follow [Configure Basic mode for virtualization integrations][6] to set the mode on the integration instance.

[1]: /agent/configuration/infrastructure-modes/#basic
[2]: /agent/configuration/infrastructure-modes/#configure-agent-infrastructure-mode
[3]: /integrations/process/
[4]: /infrastructure/hostmap/
[5]: /agent/supported_platforms/
[6]: /agent/configuration/infrastructure-modes/#configure-basic-mode-for-virtualization-integrations
