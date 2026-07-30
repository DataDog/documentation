---
title: Agent Events
disable_toc: false
aliases:
  - /security/threats/investigate_agent_events
further_reading:
  - link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
    tag: "Documentation"
    text: "Explore Workload Protection detection rules"
  - link: "/security/workload_protection/workload_security_rules"
    tag: "Documentation"
    text: "Learn how to manage Workload Protection detection rules"
  - link: "/security/notifications/"
    tag: "Documentation"
    text: "Learn more about security notifications"
---

This topic explains how to use the Agent Events explorer to query and review Workload Protection events.

The Datadog Agent evaluates system activity on the Agent host. When activity matches an Agent rule expression, the Agent generates an event and passes it to the Datadog backend.

With the [Agent Events explorer][13], you can investigate Agent events separately from signals. Review what happened, where it occurred, and which Agent rule matched using the event side panel. You can also explore the investigation graph, process tree, and raw JSON payload, and view triage and response instructions for the matching rule.

## View Agent events

To view Agent events, go to the [Agent Events explorer][13].

Agent events are queried and displayed using the standard explorer controls in the Datadog [Events explorer][14].

## Investigate Agent events

When you select an Agent event in the [Agent Events explorer][13], the side panel opens with tabs that help you investigate the event.

### Overview

The **Overview** tab summarizes the event and is often the best place to start your investigation.

{{< img src="security/workload_protection/agent_events_overview.png" alt="Agent event side panel Overview tab showing What, Where, Agent rule, and Investigation graph sections" width="100%">}}

The Overview tab includes the following sections:

- **What**: A human-readable description of the detected activity. For example, *A user executed the clang command on host i-0d85f97942d947ca9*.
- **Where**: The infrastructure context where the event occurred, including cloud provider, account, region, host, Kubernetes cluster, namespace, pod, container, and image.
- **Agent rule**: The Agent rule that matched the event, including the rule name, event name, deployment policies, policy version, and rule expression.
- **Investigation graph**: A preview of the investigation graph at the bottom of the Overview tab.

#### Investigation graph

The **Investigation graph** is an interactive visualization that maps the infrastructure and processes involved in the event. It provides a compact overview of the attack chain by highlighting the most relevant entities and processes.

{{< img src="security/workload_protection/agent_events_investigation_graph.png" alt="Investigation graph showing host, Kubernetes pod, container, image, and main process execution path" width="100%">}}

The graph traces the event from the host through the surrounding infrastructure—such as the Kubernetes pod, replica set, container, and container image—and into the process execution path. Main processes involved in the event are displayed individually, while less relevant processes are aggregated into grouped nodes (for example, **+7 processes**) to keep the view focused on the suspicious activity.

Use the investigation graph to understand how the detected activity fits into the broader runtime context without reviewing every process on the host.

#### Process tree

The **Process tree** lists the complete process lineage from the system init process to the process that triggered the event.

{{< img src="security/workload_protection/agent_events_process_tree.png" alt="Process tree listing the full process chain from systemd to the process that triggered the event" width="100%">}}

For each process in the chain, the process tree displays:

- **Path**: The executable path and command-line arguments.
- **PID**: The process ID.
- **PPID**: The parent process ID.
- **User**: The user context under which the process ran.

The process tree shows the full ancestry of the event, starting from `systemd` and continuing through intermediate processes—such as `containerd`, `runc`, and workload-specific processes—down to the command that matched the Agent rule. This helps you reconstruct the exact execution path that led to the detection.

### JSON

The **JSON** tab displays the raw event payload with the complete set of event attributes collected by the Agent. Use JSON when you need the most detailed view of the event data, for example, to write advanced queries in the [Agent Events explorer][13], or share the full event payload during an investigation.

[13]: https://app.datadoghq.com/security/agent-events
[14]: /events/explorer/
