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
---

## Overview

Datadog Fleet Automation allows you to centrally govern and remotely manage Datadog Agents and OpenTelemetry (OTel) Collectors at scale to support your evolving observability needs.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="The fleet automation page" style="width:100%;" >}}

## Use cases

For the following use cases, ensure your fleet of Datadog Agents and OTel Collectors are using the latest feature enhancements. With Fleet Automation, you gain the capabilities to:
- **View the latest Agent and OTel Collector configurations** along with historical changes to help confirm deployment updates and ensure configuration consistency.
- **Ensure your fleet of Agents and OTel Collectors are using the latest feature enhancements** by identifying and upgrading outdated versions.
- **Configure your Datadog Agents directly from Fleet Automation**, enabling your teams to centralize setup and get visibility into your environments faster.
- **Send a support flare remotely from the Datadog UI**, reducing the time it takes to debug issues on an Agent or DDOT Collector.

## Setup

### Prerequisites

- [Remote Configuration][1] enabled for your organization
- Agent version 7.73 or later
- Linux VMs installed using the install script or Ansible Datadog Role, or Windows VMs

<div class="alert alert-info">
Remote management of Agents in containerized workloads is not supported.
</div>

### Enable Agent and OTel Collector configuration views

- The Agent and Datadog Distribution of OTel Collector (DDOT) configuration view is enabled by default in Agent versions 7.47.0 or later. To enable Agent configuration manually, set `inventories_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- The upstream OTel Collector configuration view is enabled by setting the [Datadog Extension][3] in your collector configuration file.
- Agent integration configuration is enabled by default on Agent versions 7.49 or later. To enable Agent integration configuration manually, set `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

### Fleet Automation API
Fleet Automation provides a public API that allows you to programmatically view and manage Datadog Agents at scale. For full endpoint details and usage examples, see the [Fleet Automation API documentation][4]. 

**Note**: The Fleet Automation API does not support all Datadog Agent configuration capabilities.

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| Permission | Description |
|--------------|---------------|
| `API Keys Read`| Restricts which users can view and search Agents by API key. |
| `Agent Flare Collection` | Restricts which users can remotely send flares from Fleet Automation. |
| `Agent Upgrade` | Restricts which users have access to upgrade Agents from Fleet Automation. |
| `Agent Configuration Management` | Restricts which users have access to configure Agents from Fleet Automation. |

For information on setting up roles and permissions, see [Access Control][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/setup_remote_config
[2]: /agent/configuration/agent-configuration-files/
[3]: https://docs.datadoghq.com/opentelemetry/integrations/datadog_extension/#setup
[4]: /api/latest/fleet-automation/
[5]: /account_management/rbac/
