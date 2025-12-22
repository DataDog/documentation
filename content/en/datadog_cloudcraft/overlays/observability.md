---
title: Observability
description: "Use the Observability overlay in Cloudcraft to see where the Datadog Agent is installed and which features are enabled per host."
further_reading:
- link: "/datadog_cloudcraft/overlays/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure overlay"
- link: "/datadog_cloudcraft/overlays/security/"
  tag: "Documentation"
  text: "Security overlay"
- link: "/datadog_cloudcraft/overlays/ccm/"
  tag: "Documentation"
  text: "Cloud Cost Management overlay"
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
---

## Overview

The Observability overlay shows where the Datadog Agent is installed and what features are enabled per host, such as Application Performance Monitoring (APM), Cloud Network Monitoring (CNM), Log Management, and more. This helps you to assess visibility gaps across your environment.

## Take action on resources

On the Observability overlay, you can take action on individual resources or groups of resources:

- Click a single host to open a side panel with direct links to Fleet Automation, where you can deploy configurations or upgrade the Agent.
- Click a resource group, such as a subnet or VPC, to open a side panel that allows you to apply bulk updates across all the hosts in that resource group.
- To select multiple (but not all) hosts, hold down the <kbd>Command</kbd> key on Mac or the <kbd>Control</kbd> key on Windows while clicking on each host.

{{< img src="datadog_cloudcraft/observability_overlay_with_fleet_2.mp4" alt="Observability overlay in Cloudcraft, clicking on a resource group, and opening the side panel to display the bulk update feature." video=true >}}

## View Datadog coverage

In the bottom left legend, the **View Datadog coverage by** dropdown allows you to inspect the installation status for specific features. Each row shows:

- Feature name (for example, APM, Logs, CNM)
- Numerical coverage: X / Y (for example, 16/35), where:
  - X is the number of resources with that feature enabled
  - Y is the total number of relevant resources in the current view or filter

### Legend

| Pin Color | Description                                               |
|-----------|-----------------------------------------------------------|
| Green     | Agent and feature are both enabled                        |
| Gray      | Feature is not enabled                                    |
| Yellow    | Agent is installed but requires an upgrade               |

### Tracked features

The observability overlay tracks coverage for the following products:

| Feature           | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| Agent version     | Verifies if the Datadog Agent is installed and its version         |
| APM               | Application Performance Monitoring (traces collected)        |
| CNM               | Cloud Network Monitoring coverage                                 |
| Logs              | Log Management collection status                                              |
| CWS               | Cloud Workload Protection coverage                                   |
| CSPM              | Cloud Security Misconfigurations coverage                         |
| Process           | Process monitoring enabled                                         |
| CSM VM Hosts      | Coverage of Cloud Security Vulnerabilities on hosts          |
| CSM VM Containers | Coverage of Cloud Security Vulnerabilities on containers                |
| USM               | Coverage of Universal Service Monitoring                |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

