---
title: Agent
description: "Use the Agent overlay in Cloudcraft to see where the Datadog Agent is installed and which features are enabled per host."
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

<div class="alert alert-info">The Agent overlay is not available for vSphere accounts.</div>

The Agent overlay shows where the Datadog Agent is installed and what features are enabled per host, such as Application Performance Monitoring (APM), Cloud Network Monitoring (CNM), Log Management, and more. This helps you to assess visibility gaps across your environment.

## Take action on hosts

Click a host to open a mini panel with its Agent version and the Datadog products enabled on it. In the mini panel, click {{< ui >}}View Full Details{{< /ui >}} to open a side panel with direct links to Fleet Automation, where you can deploy a configuration or upgrade the Agent.

{{< img src="datadog_cloudcraft/overlays/observability_overlay_with_fleet_4.mp4" alt="Agent overlay in Cloudcraft, clicking a host to open its mini panel, then opening the side panel to deploy a configuration or upgrade the Agent with Fleet Automation." video=true >}}

## View Datadog coverage

Above the diagram, select a product, such as APM, Logs, or CNM, to see which hosts it covers. Select {{< ui >}}Summary{{< /ui >}} to see where the Agent is installed.

### Legend

The legend in the bottom right of the diagram shows how many hosts are in each state.

| Pin Color | Description                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------|
| Green     | The Agent is installed and, if you selected a product, the product covers the host                   |
| Orange    | The Agent is installed, but the selected product doesn't cover the host. In the Agent version view, the Agent is outdated. |
| Gray      | The Agent is not installed                                                                           |

### Tracked features

The Agent overlay tracks coverage for the following products:

| Feature           | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| Agent version     | Verifies if the Datadog Agent is installed and its version         |
| GPU Monitoring    | GPU Monitoring coverage                                            |
| APM               | Application Performance Monitoring (traces collected)              |
| CSPM              | Cloud Security Misconfigurations coverage                          |
| WP                | Workload Protection coverage                                       |
| Logs              | Log Management collection status                                   |
| CNM               | Cloud Network Monitoring coverage                                  |
| Process           | Process monitoring enabled                                         |
| USM               | Coverage of Universal Service Monitoring                           |
| CSM VM Hosts      | Coverage of Cloud Security Vulnerabilities on hosts                |
| CSM VM Containers | Coverage of Cloud Security Vulnerabilities on containers           |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

