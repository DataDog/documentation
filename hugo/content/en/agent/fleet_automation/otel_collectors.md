---
title: Manage OpenTelemetry Collectors
description: "View and visualize OpenTelemetry Collectors across your fleet, and configure the Agent's Collector, with Fleet Automation."
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
- link: "/opentelemetry/integrations/opamp_extension/"
  tag: "Documentation"
  text: "OpAMP Extension"
- link: "/opentelemetry/setup/agent/"
  tag: "Documentation"
  text: "Send OpenTelemetry Data Through the Datadog Agent"
- link: "https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation"
  tag: "Blog"
  text: "Manage all your OpenTelemetry collectors with Datadog Fleet Automation"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View is in Preview on Datadog Government sites (US1-FED and US2-FED). Configuring and upgrading the Agent's Collector are not supported for your selected Datadog site ({{< region-param key=dd_site_name >}}).
</div>
{{< /site-region >}}

[Fleet Automation][1] lists your OpenTelemetry (OTel) Collectors alongside your Datadog Agents. It works with three kinds of Collectors:

- **The Agent's Collector**: The OTel Collector that runs alongside the Datadog Agent.
- **The DDOT Collector**: The standalone Datadog Distribution of OpenTelemetry (DDOT) Collector.
- **Upstream Collectors**: Collectors from the OpenTelemetry project, such as the contrib distribution or a custom build.

For every kind of Collector, you can view its version, distribution, and configuration, and see how telemetry data flows through its pipelines. You can [configure](#configure-the-agents-collector), [send flares from](#send-a-remote-flare-from-the-agents-collector), and [upgrade](#upgrade-the-agents-collector) only the Agent's Collector, because these features use [Remote Configuration][2]. The DDOT Collector and upstream Collectors appear in Fleet View when the [Datadog Extension][3] or the [OpAMP extension][15] is configured.

## Prerequisites

- **Agent's Collector**: No setup is needed. The configuration view is enabled by default.
- **DDOT Collector**: The Datadog Extension is enabled automatically. Don't configure it manually.
- **Upstream OpenTelemetry Collector**: Add the [Datadog Extension][4] (recommended) or the [OpAMP extension][15] to your Collector configuration. The OpAMP extension doesn't support the Topology view.

## Examine an OpenTelemetry Collector

In [Fleet View][1], filter for OTel Collectors and select a Collector to open its detail panel. For each Collector, you can see:

- The Collector version
- The distribution of the Collector
- The configuration YAML of the Collector
- Pipeline and topology views of the Collector (the OpAMP extension doesn't support the Topology view)
- [Audit Trail events][6], such as configuration changes, upgrades, and flares (Agent's Collector only)

To check the health of your Collectors, see [Monitor Agent and OTel Collector health][7]. Health signals aren't available for the Agent's Collector.

## Visualize OTel pipelines

The {{< ui >}}Configuration{{< /ui >}} tab for an OTel Collector includes {{< ui >}}Pipeline{{< /ui >}} and {{< ui >}}Topology{{< /ui >}} views. These views show how telemetry data flows through your OTel pipelines.

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

<div class="alert alert-info">To show gateway Collectors in the Topology view, configure the Datadog Extension on each Collector in the pipeline. The OpAMP extension doesn't support the Topology view. See <a href="/opentelemetry/integrations/datadog_extension/#4-optional-configure-gateway-topology-preview">Configure gateway topology</a>.</div>

The {{< ui >}}Topology{{< /ui >}} view displays the forwarding chain across OTel Collectors deployed as DaemonSets and gateways. Use the topology view to:

- Validate telemetry routing across Collectors in a DaemonSet-to-gateway architecture.
- Spot data drops and bottlenecks by enabling the {{< ui >}}Show traffic{{< /ui >}} toggle to overlay data flow rates on each edge.
- Investigate pipeline issues by examining active monitor alerts surfaced on Collector nodes.

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="Topology view showing DaemonSet Collectors forwarding through gateway Collectors to Datadog." style="width:100%;" >}}

## Configure the Agent's Collector

{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" header="Join the Preview!" >}}
Configuring the Agent's Collector with Fleet Automation is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Use Fleet Automation to update the OTel configuration of the Agent's Collector on many hosts at once. You can update specific fields or replace the whole YAML configuration.

### Prerequisites for configuring the Agent's Collector

- [Remote Configuration][2] enabled for your organization and the Agent's API key
- [Remote updates][8] enabled on each target VM Agent (`remote_updates: true`)
- Agent version 7.82+ with the [Agent's Collector][9] enabled
- Linux VMs installed with the install script or Ansible Datadog Role, or Windows VMs

### Configure the Agent's Collector on multiple hosts

1. In Fleet Automation, open the [Configuration][10] tab and click {{< ui >}}Configure Agents{{< /ui >}}.
1. Click {{< ui >}}Configure OTel with YAML{{< /ui >}}.
1. Scope the configuration to the target Collectors. Filter by host information or tags to target a specific group.
1. Update the target fields, or replace the entire YAML configuration.

   **[Placeholder: Add a screenshot of the Configure OTel with YAML step.]**

1. Review the deployment plan to confirm the scoped Collectors and deployment settings, such as rollout concurrency.
1. Click {{< ui >}}Deploy Configuration{{< /ui >}} to start the deployment. Track its progress on the [Deployments page][11].

To edit the Collector configuration of a single Agent, see [Edit the configuration of a single Agent or its Collector][12].

## Send a remote flare from the Agent's Collector

You can send a flare from the Agent's Collector after you enable Remote Configuration on the Agent. For instructions, see [Send a remote flare][13].

## Upgrade the Agent's Collector

To upgrade Agents and their Collectors remotely, see [Upgrade Agents][14].

**[Placeholder: Confirm that upgrading the Agent also upgrades its Collector.]**

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
[15]: /opentelemetry/integrations/opamp_extension/
