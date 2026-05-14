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
---

Fleet Automation allows you to roll out and manage Datadog Agent configuration at scale. Configuration changes can be applied using guided workflows in the UI or by providing custom YAML files. Fleet Automation allows you to standardize Agent configuration across environments. With Fleet Automation, you can:
- Set up Datadog product telemetry such as APM, Logs, and NDM
- Enable or adjust Agent integrations
- Manage Agent tags
- Apply consistent configuration across environments

## Configure multiple Agents

1. In Fleet Automation, open the [Configure Agents][1] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Scope the configuration to the target Agents. You can target a group of Agents by filtering on host information or tags.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="The Scope this configuration step in Fleet Automation's Configure Agents workflow, showing filters for environment, operating system, and hostname, a list of 33 Agents included in scope, and a Configuration Summary panel on the right." style="width:100%;" >}}

1. Select the products (for example, APM, Logs, or NDM) that the target Agents should run.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="The Select products to configure step in Fleet Automation's Configure Agents workflow, showing product tiles grouped under Core Observability (Infrastructure Monitoring, Log Management, APM) and Additional Observability (Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)." style="width:100%;" >}}

1. Review the deployment plan to confirm scoped Agents and deployment settings, such as rollout concurrency.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment and track its progress from the [Deployments page][2].

## Edit the configuration of a single Agent

1. In the Datadog UI, navigate to the [Fleet Automation][3] page and select {{< ui >}}View Agents{{< /ui >}}. 

1. (Optional) You can target a group of Agents by filtering on host information or tags.

1. Select your host to open a side panel. In the side panel, click the {{< ui >}}Configuration{{< /ui >}} tab to access your modifiable configurations. 

1. Click the {{< ui >}}Edit{{< /ui >}} button to edit your configuration. 

1. Submit these changes by selecting {{< ui >}}Deploy Changes{{< /ui >}}.

**Note**: Some configuration fields (for example, `api_key`, `site`, and `notable_events`) cannot be modified.

In the following example, the `logs_enabled` field is changed from `false` to `true`. After the changes are deployed, log collection on this Agent is enabled. 

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Edit and deploy Agent configuration changes." style="width:90%;" >}}

## Configure Agents using the API

Fleet Automation provides an API to apply configuration updates to your Agents programmatically. Deploy changes to any group of hosts using filter queries, supplying either full configuration files or targeted patches. Fleet Automation does not support all Agent configuration fields, and settings related to Agent connection or secrets (site, API keys, and other authentication parameters) cannot be managed through the API. Push configuration on demand or integrate it into your existing automation workflows. For full details, see the [Fleet Automation API][4].

## Configuration precedence

Configuration changes deployed through Fleet Automation are appended to the Datadog Agent's local configuration. If a conflict occurs at the configuration-field level, Fleet Automation overrides the local value. In short, the most recent configuration change, whether applied by Fleet Automation, configuration management tools, or directly on the host, becomes the Agent's active configuration.

You can use [Fleet Automation Audit Trail][5] to gain visibility into recent configuration changes to your Agents and to set up alerts on those changes.

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
