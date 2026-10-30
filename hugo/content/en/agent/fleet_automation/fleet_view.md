---
title: Fleet View
description: "View and inspect Datadog Agents and OpenTelemetry Collectors across your fleet."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/fleet_automation/otel_collectors/"
  tag: "Documentation"
  text: "Manage OpenTelemetry Collectors"
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

For what Fleet Automation supports for each kind of Collector, see [Manage OpenTelemetry Collectors][10].

## Prerequisites

- Configuration view is enabled by default for Agents and OTel Collectors with version 7.47.0 and later. To enable it manually for older versions, set `inventories_configuration_enabled` to `true` in your [Agent configuration file][3], or use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- Agent integration configuration is enabled by default in Agent version 7.49.0 or later. To enable it manually on older versions, set `inventories_checks_configuration_enabled` to `true` in your [Agent configuration file][3], or use the `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` environment variable.

<div class="alert alert-info">Fleet Automation requires the <a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a> to display OpenTelemetry Collector configuration, pipelines, and topology. Configure the extension before using the OTel Collector features described on this page.</div>

## Examine a Datadog Agent or OpenTelemetry Collector

Select a Datadog Agent or OTel Collector to view its configuration, connected integrations, audit events, and a support tab for sending a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="The Agent detail panel showing configuration, connected integrations, and audit events." style="width:100%;" >}}

The Agent's **Remote Configuration** status indicates whether it can receive configuration from Datadog. Its **Remote Agent Management** status indicates whether remote management is enabled. An Agent can appear in Fleet View and be connected to Remote Configuration while remote management is **NOT ENABLED**. To enable upgrades and configuration changes on VMs, see [Enable remote Agent management][8].

## Search and filter

Use the search bar at the top of Fleet View to find specific Agents, OTel Collectors, or clusters across your fleet. You can:

- Perform free-text search by hostname or cluster name
- Filter by host and Agent tags, such as operating system, environment (`env`), team, and enabled products (`products_enabled`)

## Monitor Agent and OTel Collector health

**[Placeholder: Confirm that Agent and OTel Collector health signals launch. Remove this section if they don't.]**

With Agent and OTel Collector health signals, you can:

- Understand the health status of your Agent and OTel Collector fleet.
- Identify and fix telemetry issues with guided diagnosis and remediation steps.

## Visualize OTel pipelines

The {{< ui >}}Configuration{{< /ui >}} tab for an OTel Collector includes {{< ui >}}Pipeline{{< /ui >}} and {{< ui >}}Topology{{< /ui >}} views. For how to open and use them, see [Visualize OTel pipelines][11].

## View Audit Trail events

The {{< ui >}}Audit Events{{< /ui >}} tab displays Audit Trail events associated with the selected Agent or OTel Collector.
Use this tab to:
- Identify configuration changes, API key updates, installs, upgrades, and support flares for Agents and the Agent's Collector
- Determine when and where changes were made

Audit Trail event visibility depends on your plan. When Audit Trail is enabled in your organization, you can view Agent events for up to 90 days based on your Audit Trail retention settings. If Audit Trail is not enabled in your organization, you can view the past 24 hours of events.

## Send a remote flare

You can send a flare from the Datadog Agent or the Agent's Collector after enabling Remote Configuration on the Agent. For instructions, see [Send a flare from the Datadog site][2].

When you contact Datadog Support with Remote Configuration enabled, the Support team may initiate a flare from your environment to help resolve your issue faster.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="The support tab for an Agent with the Send Flare button." style="width:100%;" >}}

## Kubernetes view

The Kubernetes view lets you see Datadog Agents and OTel Collectors running in Kubernetes environments. It provides a unified view of your fleet across both host-based and containerized infrastructure.

By default, Fleet View lists infrastructure as individual hosts. Use the {{< ui >}}View by infra type{{< /ui >}} toggle to switch to the [Kubernetes view][4], which shows Agents by Kubernetes cluster instead.

Each row is a cluster managed by the [Datadog Operator][5] or Helm chart. The cluster's Node Agents, Cluster Agent, and Cluster Check Runners appear grouped together rather than as individual hosts.

### Prerequisites for Kubernetes view

Most Kubernetes view features are available without version requirements. Specific capabilities require:

| Capability | Requirement |
|---|---|
| View `DatadogAgent` configuration | Datadog Operator v1.24 or later |
| View Helm Chart values | Datadog Helm Chart v3.157.0 or later |
| Edit configuration (Preview) | [Remote Configuration][6] enabled and Datadog Operator v1.27 or later |
| Edit configuration without setting a cluster name | Datadog Operator v1.30.0 or later |
| View integrations on a Cluster Agent | Agent v7.72.0 or later |
| View integration status on a Cluster Agent | Agent v7.79.0 or later |

To edit configuration from Fleet View, set the following flags in your [Operator configuration][7]: `remoteConfigEnabled`, `remoteUpdatesEnabled`, and `createControllerRevisions`. Editing also requires a Datadog API key and application key to be configured. Editing Helm Chart values from Fleet View is not supported.

On Datadog Operator versions earlier than v1.30.0, you must also set a cluster name (`clusterName`), otherwise the {{< ui >}}Edit{{< /ui >}} button remains disabled. As of Datadog Operator v1.30.0, a cluster name is optional.

If you install the Datadog Operator with its Helm chart, you can enable the required flags together using the `previewFleetRollouts` value:

{{< code-block lang="shell" >}}
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --set previewFleetRollouts=true \
  --set apiKeyExistingSecret=datadog-secret \
  --set appKeyExistingSecret=datadog-secret \
  --devel
{{< /code-block >}}

Replace `datadog-secret` with the name of the Kubernetes Secret that holds your Datadog API and application keys. The `--devel` flag installs the latest development release of the chart.

### View Kubernetes clusters

Clusters are listed alphabetically by cluster name. The table lists each cluster's name, deployment method (Datadog Operator or Helm), namespace, Agent version, Agent pod status, readiness, age, and number of restarts.

To find a specific cluster, you can [search](#search-and-filter) by cluster name.

Click a cluster to view:

- Cluster details, such as environment and tags
- Cluster-level Agents (Cluster Agent and Cluster Check Runners)
- Node Agents

On the {{< ui >}}Configuration{{< /ui >}} tab, you can view configuration:

- **Datadog Operator v1.24 or later**: View the `DatadogAgent` custom resource configuration. With Datadog Operator v1.27 or later, you can also edit the configuration from this tab. Editing is in Preview. For instructions, see [Configure the Agent on Kubernetes][9].
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
[8]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[9]: /agent/fleet_automation/configure_agents/#configure-the-agent-on-kubernetes
[10]: /agent/fleet_automation/otel_collectors/
[11]: /agent/fleet_automation/otel_collectors/#visualize-otel-pipelines
