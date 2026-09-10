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

Use [Fleet Automation][3] to roll out and manage Datadog Agent configuration at scale. Apply configuration changes through guided workflows in the UI or with custom YAML files. You can configure:

* [Agents running on hosts](#configure-host-based-agents)
* (In Preview) [Agents running in Kubernetes clusters managed by the Datadog Operator](#configure-the-agent-on-kubernetes)

You can also apply configuration updates [through the Fleet Automation API](#configure-agents-with-the-api).

## Configure host-based Agents

### Prerequisites

- [Remote Configuration][9] enabled for your organization
- Agent version 7.73+ for Agent and OTel Collector configuration (version 7.76+ for configuring integrations and secrets). To upgrade your Agents, see [Upgrade Agents][10].
- Linux VMs installed with the install script or Ansible Datadog Role, or Windows VMs

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="Join the Preview!" >}}
Managing Datadog Agent tags with Fleet Automation is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

### Configure multiple Agents

1. In Fleet Automation, open the [Configuration][1] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. Filter by host information or tags to target a specific group.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="The Scope this configuration step in Fleet Automation's Configure Agents workflow, showing filters for environment, operating system, and hostname, a list of 33 Agents included in scope, and a Configuration Summary panel on the right." style="width:100%;" >}}

1. Select the products (for example, Logs, APM, or NDM) that the target Agents should run.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="The Select products to configure step in Fleet Automation's Configure Agents workflow, showing product tiles grouped under Core Observability (Infrastructure Monitoring, Log Management, APM) and Additional Observability (Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)." style="width:100%;" >}}

1. Review the deployment plan to confirm scoped Agents and deployment settings, such as rollout concurrency.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment and track its progress from the [Deployments page][2].

### Edit the configuration of a single Agent

1. Navigate to [Fleet View][3]. 

1. (Optional) Filter by host information or tags to narrow the list.

1. Select a host to open its side panel, then click the {{< ui >}}Configuration{{< /ui >}} tab. 

1. Click {{< ui >}}Edit{{< /ui >}} to modify the configuration. 

1. Click {{< ui >}}Deploy Changes{{< /ui >}} to apply your updates.

**Note**: Some configuration fields (for example, `api_key`, `site`, and `notable_events`) cannot be modified.

The example below shows the `logs_enabled` field changed from `false` to `true`, which enables log collection on the Agent after deployment.

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Edit and deploy Agent configuration changes." style="width:90%;" >}}

## Configure the Agent on Kubernetes

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="Join the Preview!" >}}
Configuring Kubernetes Agents with the Datadog Operator in Fleet Automation is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Use Fleet Automation to edit the `DatadogAgent` custom resource for an Operator-managed Kubernetes cluster. For example, you can enable or adjust APM, log collection, and process monitoring without applying an updated manifest to the cluster manually.

### Prerequisites

- The Datadog Agent is running in the Kubernetes cluster.
- Datadog Operator v1.27 or later manages the Agent deployment.
- Remote Configuration is enabled for the API key used by the Agent.
- The Operator is configured to accept remote updates. For the required Operator settings, API and application keys, and cluster name requirements, see [Prerequisites for Kubernetes view][11].

### Edit the cluster configuration

1. Navigate to [Fleet View][3].
1. Under {{< ui >}}View by infra type{{< /ui >}}, switch to the Kubernetes view.
1. Select the cluster that you want to configure, then open the {{< ui >}}Configuration{{< /ui >}} tab.
1. Click {{< ui >}}Edit{{< /ui >}} and update the `DatadogAgent` configuration.
1. Review the changes, then click {{< ui >}}Deploy Changes{{< /ui >}}.

Fleet Automation initiates the change, and Remote Configuration transmits it to the cluster. The Datadog Operator updates the `DatadogAgent` resource and rolls out the configuration across the Agent pods. If the rollout does not complete successfully, the Operator automatically restores the previous configuration.

**Note**: Fleet Automation does not support editing Helm Chart values.

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
[10]: /agent/fleet_automation/upgrade_agents/
[11]: /agent/fleet_automation/fleet_view/#prerequisites-for-kubernetes-view
