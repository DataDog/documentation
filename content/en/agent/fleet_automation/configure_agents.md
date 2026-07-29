---
title: Configure Agents
description: "Roll out and manage Datadog Agent configuration at scale with Fleet Automation."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/api/latest/fleet-automation/"
  tag: "Documentation"
  text: "Fleet Automation API"
site_support_id: fleet-automation-standard-features
---

Use [Fleet Automation][3] to roll out and manage Datadog Agent configuration at scale. Apply configuration changes through guided workflows in the UI or with custom YAML files.

## Prerequisites

- [Remote Configuration][9] enabled for your organization
- Agent version 7.73+ for Agent and OTel Collector configuration (version 7.76+ for configuring integrations and secrets)
- Linux VMs installed with the install script or Ansible Datadog Role, or Windows VMs

<div class="alert alert-info">
Remote configuration of Agents in containerized workloads is not supported.
</div>

## Configure multiple Agents

1. In Fleet Automation, open the [Configuration][1] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="The Scope this configuration step in Fleet Automation's Configure Agents workflow, showing filters for environment, operating system, and hostname, a list of 33 Agents included in scope, and a Configuration Summary panel on the right." style="width:100%;" >}}

1. Select the products (for example, Logs, APM, or NDM) that the target Agents should run.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="The Select products to configure step in Fleet Automation's Configure Agents workflow, showing product tiles grouped under Core Observability (Infrastructure Monitoring, Log Management, APM) and Additional Observability (Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)." style="width:100%;" >}}

1. Review the deployment plan to confirm scoped Agents and deployment settings, such as rollout concurrency.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment and track its progress from the [Deployments page][2].

## Edit the configuration of a single Agent

1. Navigate to [Fleet View][3]. 

1. (Optional) Filter by host information or tags to narrow the list.

1. Select a host to open its side panel, then click the {{< ui >}}Configuration{{< /ui >}} tab. 

1. Click {{< ui >}}Edit{{< /ui >}} to modify the configuration. 

1. Click {{< ui >}}Deploy Changes{{< /ui >}} to apply your updates.

**Note**: Some configuration fields (for example, `api_key`, `site`, and `notable_events`) cannot be modified.

The example below shows the `logs_enabled` field changed from `false` to `true`, which enables log collection on the Agent after deployment.

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Edit and deploy Agent configuration changes." style="width:90%;" >}}

## Configure Agents with the API

Fleet Automation provides an API to apply configuration updates programmatically. Deploy changes to any group of hosts with filter queries, supplying either full configuration files or targeted patches. Push configuration on demand or integrate it into your existing automation workflows. For full details, see the [Fleet Automation API][4].

**Note**: The API does not support all Agent configuration fields. Settings related to Agent connection or secrets (`site`, `api_key`, and other authentication parameters) cannot be managed through the API.

## Configuration precedence

Configuration changes deployed through Fleet Automation follow different rules depending on the target:

- **Agent configuration (`datadog.yaml`):** Fleet Automation applies changes using merge patch: only the specified fields are updated, and unmentioned fields are left unchanged. If a conflict occurs at the field level, the Fleet Automation value takes precedence over any local value.
- **Integration and custom log configurations:** Fleet Automation supports two modes:
    - Deploy a new configuration file.
    - Update an existing file using merge patch to modify only specific fields. If you deploy a change targeting an existing filename without using merge patch, the file is fully overwritten.

  In both cases, the most recent change becomes the Agent's active configuration, regardless of the source (Fleet Automation, configuration management tools, or direct host edits).

Use [Fleet Automation Audit Trail][5] to track recent configuration changes to your Agents and set up alerts on those changes.

## Mirrors and proxies

You can use remote Agent management along with a proxy or mirrored repositories.

For instructions on configuring your Agent to use a proxy, see [Agent Proxy Configuration][6]. After you've configured the proxy, restart the Agent to apply the settings.

For instructions on using mirrored or air-gapped repositories, see:
- [Synchronize Datadog's images with a private container registry][7]
- [Installing the Agent on a server with limited internet connectivity][8]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: https://app.datadoghq.com/fleet/deployments
[3]: https://app.datadoghq.com/fleet
[4]: /api/latest/fleet-automation/
[5]: /agent/fleet_automation/fleet_view/#view-agent-audit-trail-events
[6]: /agent/configuration/proxy/
[7]: /containers/guide/sync_container_images/
[8]: /agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: /agent/guide/setup_remote_config
