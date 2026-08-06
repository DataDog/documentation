---
title: Fleet Automation
description: "Centrally govern and remotely manage Datadog Agents and OpenTelemetry Collectors at scale with configuration views, upgrades, flare collection, and API key rotation."
aliases:
  - /agent/fleet_automation/remote_management
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Centrally set up and scale monitoring of your infrastructure and apps with Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Manage all your OpenTelemetry collectors with Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "/remote_configuration"
  tag: "Documentation"
  text: "Find out more about Remote Configuration"
- link: "/infrastructure/list/#agent-configuration"
  tag: "Documentation"
  text: "Learn about the Agent configuration view"
- link: "https://www.datadoghq.com/blog/fleet-automation/"
  tag: "Blog"
  text: "Centrally govern and remotely manage Datadog Agents at scale with Fleet Automation"
site_support_id: fleet-automation-standard-features
---

## Overview

Datadog Fleet Automation allows you to centrally govern and remotely manage Datadog Agents and OpenTelemetry (OTel) Collectors at scale to support your evolving observability needs.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="The Fleet Automation page showing a list of Agents with their versions, statuses, and enabled products." style="width:100%;" >}}

## Key capabilities

With Fleet Automation, you can:
- **[View Agent and OTel Collector configurations][3]** along with historical changes to confirm deployment updates and verify configuration consistency.
- **[Configure Datadog Agents][4]** to centralize setup and gain visibility into your environments faster.
- **[Keep your fleet up to date][5]** by identifying and upgrading outdated Agent and OTel Collector versions.
- **[Send a support flare remotely][6]**, reducing the time it takes to debug issues on an Agent or DDOT Collector.
- **[View your fleet by Kubernetes cluster][7]** to inspect and configure Agents grouped by cluster instead of as individual hosts.

## Fleet Automation API

Fleet Automation provides a public API that allows you to programmatically view and manage Datadog Agents at scale. For full endpoint details and usage examples, see the [Fleet Automation API documentation][1]. 

<div class="alert alert-info">
The Fleet Automation API does not support all Datadog Agent configuration capabilities.
</div>

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| Permission | Description |
|--------------|---------------|
| `API Keys Read`| Restricts which users can view and search Agents by API key. |
| `Agent Flare Collection` | Restricts which users can remotely send flares from Fleet Automation. |
| `Agent Upgrade` | Restricts which users have access to upgrade Agents from Fleet Automation. |
| `Agent Configuration Management` | Restricts which users have access to configure Agents from Fleet Automation. |

For information on setting up roles and permissions, see [Access Control][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/fleet-automation/
[2]: /account_management/rbac/
[3]: /agent/fleet_automation/fleet_view/
[4]: /agent/fleet_automation/configure_agents/
[5]: /agent/fleet_automation/upgrade_agents/
[6]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[7]: /agent/fleet_automation/fleet_view/#kubernetes-view
