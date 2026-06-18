---
title: Fleet View
description: "View and inspect Datadog Agents and OpenTelemetry Collectors across your fleet."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send a flare"
- link: "/containers/kubernetes/installation/"
  tag: "Documentation"
  text: "Install the Datadog Agent on Kubernetes"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View is in Preview on Datadog Government sites (US1-FED and US2-FED).<br><br>
Additional Fleet Automation functionality such as Configuring Agents, Upgrading Agents and Upgrading SDKs are not supported for your selected Datadog site ({{< region-param key=dd_site_name >}}).
</div>
{{< /site-region >}}

Use [Fleet View][1] to gain insight into observability gaps on your hosts, outdated Agents or OTel Collectors, and Agents with integration issues.

For each Datadog Agent, you can see:
- The Agent version
- Whether the Agent has any unconfigured or misconfigured integrations
- The services that the Agent is monitoring
- The Agent's Remote Configuration status
- The products that are enabled on the Agent
- Agent Audit Trail events including configuration changes, upgrades, and flares

For each OTel Collector, you can see:
- The Collector version
- The distribution of the Collector
- The configuration YAML of the Collector
- Pipeline and topology views of the Collector

## Prerequisites

- Configuration view is enabled by default for Agents and OTel Collectors with version 7.47.0 and later. To enable it manually for older versions, set `inventories_configuration_enabled` to `true` in your [Agent configuration file][3], or use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- Agent integration configuration is enabled by default in Agent version 7.49.0 or later. To enable it manually on older versions, set `inventories_checks_configuration_enabled` to `true` in your [Agent configuration file][3], or use the `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` environment variable.

<div class="alert alert-info">Fleet Automation requires the <a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a> to display OpenTelemetry Collector configuration, pipelines, and topology. Configure the extension before using the OTel Collector features described on this page.</div>

## Examine a Datadog Agent or OpenTelemetry Collector

Select a Datadog Agent or OTel Collector to view its configuration, connected integrations, audit events, and a support tab for sending a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="The Agent detail panel showing configuration, connected integrations, and audit events." style="width:100%;" >}}

## Search and filter

Use the search bar at the top of Fleet View to find specific Agents, OTel Collectors, or clusters across your fleet. You can:

- Perform free-text search by hostname or cluster name
- Filter by host and Agent tags, such as operating system, environment (`env`), team, and enabled products (`products_enabled`)

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

## View Agent Audit Trail events

The {{< ui >}}Audit Events{{< /ui >}} tab displays Audit Trail events associated with the selected Agent.
Use this tab to:
- Identify configuration changes, API key updates, installs, upgrades, and support flares
- Determine when and where changes were made

Audit Trail event visibility depends on your plan. When Audit Trail is enabled in your organization, you can view Agent events for up to 90 days based on your Audit Trail retention settings. If Audit Trail is not enabled in your organization, you can view the past 24 hours of events.

## Send a remote flare

You can send a flare from the Datadog Agent or DDOT Collector after enabling Remote Configuration on the Agent. For instructions, see [Send a flare from the Datadog site][2].

When you contact Datadog Support with Remote Configuration enabled, the Support team may initiate a flare from your environment to help resolve your issue faster.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="The support tab for an Agent with the Send Flare button." style="width:100%;" >}}

## Kubernetes view

The Kubernetes view lets you see Datadog Agents and OTel Collectors running in Kubernetes environments, giving you a unified view of your fleet across both host-based and containerized infrastructure.

By default, Fleet View lists infrastructure as individual hosts. Use the {{< ui >}}View by infra type{{< /ui >}} toggle to switch to the [Kubernetes view][4], which shows Agents by Kubernetes cluster instead.

Each row is a cluster managed by the [Datadog Operator][5] or Helm chart, and the Agents in it (Node Agents, Cluster Agent, Cluster Check Runners) appear grouped per cluster instead of as individual hosts.

### Prerequisites for Kubernetes view

Most of the Kubernetes view is available without any prerequisite version. Specific capabilities have the following requirements:

**View configuration**
- `DatadogAgent` custom resource: Datadog Operator v1.24 or later
- Helm Chart values (`values.yaml`): Datadog Helm Chart v3.157.0 or later

**Edit configuration from Fleet View**
- [Remote Configuration][6] enabled for your organization, and Datadog Operator v1.27 or later (you cannot edit Helm Chart values from Fleet View)
- The following flags set in your [Operator configuration][7]:
  - `remoteConfigEnabled`
  - `remoteUpdatesEnabled`
  - `createControllerRevisions`

**View integrations running on a Cluster Agent**
- Integrations list: Agent v7.72.0 or later
- Integration status in the list: Agent v7.79.0 or later

### View Kubernetes clusters

Clusters are listed alphabetically by cluster name. The table lists each cluster's name, deployment method (Datadog Operator or Helm), namespace, Agent version, Agent pod status, readiness, age, and number of restarts.

To find a specific cluster, you can [search](#search-and-filter) by cluster name.

Click a cluster to view:

- Cluster details, such as environment and tags
- Cluster-level Agents (Cluster Agent and Cluster Check Runners)
- Node Agents

On the {{< ui >}}Configuration{{< /ui >}} tab, you can view configuration:

- **Datadog Operator v1.24 or later**: View the `DatadogAgent` custom resource configuration. With Datadog Operator v1.27 or later, you can also edit the configuration from this tab.
- **Datadog Helm Chart v3.157.0 or later**: View the Helm Chart values (`values.yaml`).

### Limitations

Compared to the default view, the Kubernetes view has the following limitations:

- You cannot send remote support flares.
- You can see which OTel Collectors are running, but you cannot view their configuration in the Kubernetes view.
- Fleet Automation API access is not available.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[3]: /agent/configuration/agent-configuration-files/
[4]: https://app.datadoghq.com/fleet?view_by=clusters
[5]: /containers/datadog_operator
[6]: /agent/guide/setup_remote_config
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
