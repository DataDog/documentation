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
---

Use the [**Fleet Automation**][1] page to gain insight into observability gaps on your hosts, outdated Agents or OTel Collectors, and Agents with integration issues. 

For each Datadog Agent, you can see:
- The Agent version
- Whether the Agent has any unconfigured or misconfigured integrations
- The services that the Agent is monitoring
- The Agent's Remote Configuration status
- The products that are enabled on the Agent
- Agent Audit Trail events including configuration changes, upgrades and flares

For each OTel Collector, you can see:
- The Collector version
- The distribution of the Collector
- The configuration YAML of the Collector
- Pipeline visualization of the Collector

## Examine a Datadog Agent or OpenTelemetry Collector
Selecting a Datadog Agent or OTel Collector gives you more information about it, including its configuration, connected integrations, audit events, and a support tab that you can use to send a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="An Agent's integration information" style="width:100%;" >}}

## Visualize an OTel Collector Pipeline
The {{< ui >}}Pipeline Visualization{{< /ui >}} toggle in the {{< ui >}}Configurations{{< /ui >}} tab of an OTel Collector provides a pipeline view of the Collector. Use Pipeline Visualization to:
- Validate telemetry routing between configured OTel Collector components.
- Spot unexpected data drops along the OTel Collector pipeline.
- Inspect specific component configuration YAML snippets by hovering over any component.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="OTel Collector pipeline view" style="width:100%;" >}}

## View Agent Audit Trail events

The {{< ui >}}Audit Events{{< /ui >}} tab displays Audit Trail events associated with the selected Agent.
Use this tab to:
- Identify configuration changes, API key updates, installs, upgrades and support flares.
- Determine when changes were made and from where

Audit Trail event visibility depends on your plan. When Audit Trail is enabled in your organization, you can view Agent events for up to 90 days based on your Audit Trail retention settings. If Audit Trail is not enabled in your organization, you can view the past 24 hours of events.

## Send a remote flare

You can send a flare from the Datadog Agent or DDOT Collector after enabling Remote Configuration on the Agent. For instructions on sending a flare, see [Send a flare from the Datadog site][2].

When contacting Datadog Support with Remote Configuration enabled for an Agent, the Support team may initiate a flare from your environment in order to better assist you in a timely manner. Flares provide troubleshooting information to Datadog Support to help you resolve your issue.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Send a remote flare" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
