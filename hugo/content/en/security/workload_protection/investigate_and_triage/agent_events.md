---
title: Agent Events
description: Search and analyze the runtime activity that the Datadog Agent sends to Datadog as Agent events.
disable_toc: false
aliases:
  - /security/threats/investigate_agent_events
  - /security/workload_protection/investigate_agent_events
further_reading:
  - link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
    tag: "Documentation"
    text: "Explore Workload Protection detection rules"
  - link: "/security/notifications/"
    tag: "Documentation"
    text: "Learn more about security notifications"
---

The Datadog Agent evaluates system activity on the Agent host. When activity matches an Agent rule expression, the Agent generates an event and passes it to the Datadog backend.

With the [Agent Events Explorer][13], you can investigate Agent events separately from signals. Review what happened, where it occurred, and which Agent rule matched using the event side panel. You can also explore the investigation graph, event tree, and raw JSON payload, and view triage and response instructions for the matching rule.

## Investigate Agent events

To investigate an Agent event:

1. Go to the [Agent Events Explorer][13]. Agent events are queried and displayed using the standard explorer controls in the Datadog [Events Explorer][14].
2. Select an Agent event. The side panel opens with tabs that help you investigate the event.

### Overview

The {{< ui >}}Overview{{< /ui >}} tab summarizes the event and is often the best place to start your investigation.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_overview.png" alt="Agent event side panel Overview tab showing What, Where, Agent rule, and Investigation graph sections" width="100%">}}

The Overview tab includes the following sections:

- {{< ui >}}What{{< /ui >}}: A human-readable description of the detected activity. For example, *A user executed the clang command on host i-0d85f97942d947ca9*.
- {{< ui >}}Where{{< /ui >}}: The infrastructure context where the event occurred, including cloud provider, account, region, host, Kubernetes cluster, namespace, pod, container, and image.
- {{< ui >}}Agent rule{{< /ui >}}: The Agent rule that matched the event, including the rule name, event name, deployment policies, policy version, and rule expression.
- {{< ui >}}Investigation graph{{< /ui >}}: A preview of the investigation graph at the bottom of the Overview tab.
- {{< ui >}}Event Tree{{< /ui >}}: The execution lineage, affected infrastructure, and process, file, network, or kernel activity associated with the event.

#### Investigation graph

The {{< ui >}}Investigation graph{{< /ui >}} is an interactive visualization that maps the infrastructure and processes involved in the event. It provides a compact overview of the attack chain by highlighting the most relevant entities and processes.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_investigation_graph.png" alt="Investigation graph showing host, Kubernetes pod, container, image, and main process execution path" width="100%">}}

The graph traces the event from the host through the surrounding infrastructure—such as the Kubernetes pod, replica set, container, and container image—and into the process execution path. Main processes involved in the event are displayed individually, while less relevant processes are aggregated into grouped nodes (for example, **+7 processes**) to keep the view focused on the suspicious activity.

Use the investigation graph to understand how the detected activity fits into the broader runtime context without reviewing every process on the host.

#### Event tree

The {{< ui >}}Event Tree{{< /ui >}} displays the complete execution lineage for an Agent event, including intermediate processes. It also shows the process, file, network, or kernel activity that matched the Agent rule.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_tree.png" alt="Event tree showing the affected host, pod, container, process lineage, and file activity for an Agent event" width="100%">}}

Each process entry displays:

- {{< ui >}}Path{{< /ui >}}: The executable path and command-line arguments.
- {{< ui >}}PID{{< /ui >}}: The process ID.
- {{< ui >}}User{{< /ui >}}: The user context under which the process ran.

Expand a process entry to view its command, credentials, and executable metadata. Expand an infrastructure entry to view resource-specific information, such as status, tags, security details, or related actions.

Use the {{< ui >}}Show infrastructure entries{{< /ui >}} toggle to show or hide the affected host, pod, and container.

Use attributes such as executable path, arguments, PID, and user to filter for related Agent events. Select {{< ui >}}View in JSON{{< /ui >}} on a process or activity entry to open the corresponding location in the raw event JSON.

### JSON

The {{< ui >}}JSON{{< /ui >}} tab displays the raw event payload with the complete set of event attributes collected by the Agent. Use JSON when you need the most detailed view of the event data, for example, to write advanced queries in the [Agent Events Explorer][13], or share the full event payload during an investigation. To filter in and out any field, you can click on it from the JSON.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[13]: https://app.datadoghq.com/security/agent-events
[14]: /events/explorer/
