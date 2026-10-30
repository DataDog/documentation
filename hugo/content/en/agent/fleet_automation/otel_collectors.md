---
title: Manage OpenTelemetry Collectors
description: "View, visualize, and configure OpenTelemetry Collectors across your fleet with Fleet Automation."
further_reading:
- link: "/agent/fleet_automation/fleet_view/"
  tag: "Documentation"
  text: "Fleet View"
- link: "/agent/fleet_automation/configure_agents/"
  tag: "Documentation"
  text: "Configure Agents"
- link: "/opentelemetry/integrations/datadog_extension/"
  tag: "Documentation"
  text: "Datadog Extension"
- link: "/opentelemetry/setup/agent/"
  tag: "Documentation"
  text: "Send OpenTelemetry Data Through the Datadog Agent"
- link: "https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation"
  tag: "Blog"
  text: "Manage all your OpenTelemetry collectors with Datadog Fleet Automation"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View is in Preview on Datadog Government sites (US1-FED and US2-FED). Configuring the Agent's Collector is not supported for your selected Datadog site ({{< region-param key=dd_site_name >}}).
</div>
{{< /site-region >}}

[Fleet Automation][1] lists your OpenTelemetry (OTel) Collectors alongside your Datadog Agents. Use it to see each Collector's version, distribution, and configuration, follow how telemetry flows through its pipelines, and manage the Agent's Collector remotely.

What you can do with a Collector depends on how you run it:

| Capability | Agent's Collector | DDOT Collector | Upstream OpenTelemetry Collector |
|---|---|---|---|
| [View the Collector and its configuration](#examine-an-opentelemetry-collector) | {{< X >}} | {{< X >}} | {{< X >}} |
| [Pipeline and Topology views](#visualize-otel-pipelines) | {{< X >}} | {{< X >}} | {{< X >}} |
| [Configure from Fleet Automation](#configure-the-agents-collector) | {{< X >}} | | |
| [Send a remote flare](#send-a-remote-flare) | {{< X >}} | | |
| [Upgrade from Fleet Automation](#upgrade-the-agents-collector) | {{< X >}} | | |

The Agent's Collector is the OTel Collector that runs alongside the Datadog Agent. Configuration, flares, and upgrades use [Remote Configuration][2], which works only with the Agent's Collector. The DDOT Collector and upstream Collectors appear in Fleet View when the [Datadog Extension][3] is configured.

## Prerequisites

- **DDOT Collector**: The Datadog Extension is enabled automatically. Don't configure it manually.
- **Upstream OpenTelemetry Collector**: Add the [Datadog Extension][4] to your Collector configuration. Fleet Automation requires the extension to display the Collector's configuration, pipelines, and topology.
- **Agent's Collector**: Configuration view is enabled by default on Agent 7.47.0 and later. For older versions, see the [Fleet View prerequisites][5].

## Examine an OpenTelemetry Collector

In [Fleet View][1], filter for OTel Collectors and select a Collector to open its detail panel. For each Collector, you can see:

- The Collector version
- The distribution of the Collector
- The configuration YAML of the Collector
- Pipeline and topology views of the Collector
- [Audit Trail events][6], such as configuration changes, upgrades, and flares

To check the health of your Collectors, see [Monitor Agent and OTel Collector health][7].

## Visualize OTel pipelines

The {{< ui >}}Configuration{{< /ui >}} tab for an OTel Collector includes {{< ui >}}Pipeline{{< /ui >}} and {{< ui >}}Topology{{< /ui >}} views. These views provide end-to-end visibility into how telemetry flows through your OTel pipelines.

To access these views:

1. Navigate to [**Fleet Automation**][1].
1. Filter for OTel Collectors.
1. Select a Collector to open the detail panel.
1. Click the {{< ui >}}Configuration{{< /ui >}} tab.
1. Select {{< ui >}}Pipeline{{< /ui >}} or {{< ui >}}Topology{{< /ui >}} from the {{< ui >}}View as{{< /ui >}} options.

### Pipeline view

The {{< ui >}}Pipeline{{< /ui >}} view displays the telemetry pipeline for a single OTel Collector. Use the pipeline view to:

- Validate telemetry routing between configured receivers, processors, and exporters.
- Identify data flow issues, such as data drops and bottlenecks, by enabling the {{< ui >}}Show traffic{{< /ui >}} toggle.
- Investigate pipeline alerts by examining active monitor alerts surfaced on component nodes.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Pipeline view showing telemetry routing between OTel Collector components." style="width:100%;" >}}

### Topology view

The {{< ui >}}Topology{{< /ui >}} view displays the forwarding chain across OTel Collectors deployed as DaemonSets and gateways. Use the topology view to:

- Validate telemetry routing across Collectors in a DaemonSet-to-gateway architecture.
- Spot data drops and bottlenecks by enabling the {{< ui >}}Show traffic{{< /ui >}} toggle to overlay data flow rates on each edge.
- Investigate pipeline issues by examining active monitor alerts surfaced on Collector nodes.

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="Topology view showing DaemonSet Collectors forwarding through gateway Collectors to Datadog." style="width:100%;" >}}

## Configure the Agent's Collector

**[Placeholder: Confirm the release stage and minimum Agent version for configuring the Agent's Collector. This page uses Preview and Agent 7.82+.]**

**[Placeholder: Add a "Join the Preview!" callout with the public Preview request form URL.]**

Use Fleet Automation to update the OTel configuration of the Agent's Collector on many hosts at once. You can update specific fields or replace the whole YAML configuration.

### Prerequisites

- [Remote Configuration][2] enabled for your organization and the Agent's API key
- [Remote updates][8] enabled on each target VM Agent (`remote_updates: true`)
- Agent version 7.82+ with the [Agent's Collector][9] enabled
- Linux VMs installed with the install script or Ansible Datadog Role, or Windows VMs

### Configure multiple Agent's Collectors

1. In Fleet Automation, open the [Configuration][10] tab, click {{< ui >}}Configure Agents{{< /ui >}}, then click {{< ui >}}Configure OTel with YAML{{< /ui >}}.
1. Scope the configuration to the target Collectors. Filter by host information or tags to target a specific group.
1. Update the target fields, or replace the entire YAML configuration.

   **[Placeholder: Add a screenshot of the Configure OTel with YAML step.]**

1. Review the deployment plan to confirm the scoped Collectors and deployment settings, such as rollout concurrency.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment and track its progress from the [Deployments page][11].

To edit the configuration of one Agent's Collector, see [Edit the configuration of a single Agent or its Collector][12].

## Send a remote flare

You can send a flare from the Agent's Collector after you enable Remote Configuration on the Agent. For instructions, see [Send a remote flare][13].

## Upgrade the Agent's Collector

To upgrade Agents and their Collectors remotely, see [Upgrade Agents][14].

## Upstream Collectors

Fleet Automation shows upstream Collectors that run the Datadog Extension. You can't configure, upgrade, or send flares from upstream Collectors through Fleet Automation.

**[Placeholder: Add a section on managing upstream Collectors through OpAMP, with its release stage, when it's available.]**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/guide/setup_remote_config
[3]: /opentelemetry/integrations/datadog_extension/
[4]: /opentelemetry/integrations/datadog_extension/#setup
[5]: /agent/fleet_automation/fleet_view/#prerequisites
[6]: /agent/fleet_automation/fleet_view/#view-audit-trail-events
[7]: /agent/fleet_automation/fleet_view/#monitor-agent-and-otel-collector-health
[8]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[9]: /opentelemetry/setup/ddot_collector/install/
[10]: https://app.datadoghq.com/fleet/agent-management
[11]: https://app.datadoghq.com/fleet/deployments
[12]: /agent/fleet_automation/configure_agents/#edit-the-configuration-of-a-single-agent-or-its-collector
[13]: /agent/fleet_automation/fleet_view/#send-a-remote-flare
[14]: /agent/fleet_automation/upgrade_agents/
