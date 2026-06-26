---
title: Investigate
disable_toc: false
---

When you select a Workload Protection signal in the [Signals Explorer][1], the side panel provides investigation tools to reconstruct the attack story, understand impact, and access the raw signal data.

## Investigation graph

The **Investigation** tab displays an interactive graph that maps processes, resources, and runtime events involved in the signal. The investigation graph helps you see how an attack unfolded step by step.

From the graph, you can pivot to other telemetry sources, such as Code Security or Infrastructure Monitoring, to validate code vulnerabilities or simply get more info on the specific ressource.

### Correlated events

Use **Correlated events** on the investigation graph to expand the view beyond the initial signal. Correlated events groups runtime activity that belongs to the same process lineage or exploitation chain using [Execution Context][2].

Each event detected by Workload Protection is tagged with a correlation key that associates it with others in the same execution chain. This grouping helps you focus on the broader compromise attempt instead of responding to isolated alerts.

Workload Protection supports built-in Execution Context layers for common runtime scenarios, including:

- **Generic cgroup context**: Fallback context for unrelated events.
- **Generic auid context**: Groups events by user session.
- **Service context**: Isolates runtime activity within service boundaries.
- **Interactive shell context**: Correlates commands from the same shell session.
- **Kubernetes user session context**: Tracks Kubernetes user actions with fine-grained correlation.

### Blast radius

Use **Blast radius** on the investigation graph to assess the potential impact of the detected threat. The blast radius view highlights the resources, services, and dependencies that could be affected if the compromise spreads beyond the initial detection point.

This helps you prioritize response efforts and understand which adjacent workloads, hosts, or containers require additional monitoring or hardening.

## Threat timeline

The **Threat timeline** presents a chronological narrative of every event within a correlated threat story. It combines correlated events, triage statuses, and recommended actions into a single view so you can retrace an attacker's movements from the initial exploit to subsequent actions without switching between dashboards.

Each event in the timeline includes contextual details and links to correlated metrics, logs, and traces.

## Context

The **Context** tab summarizes the key attributes of the signal and the resources involved in the detection. Use it to quickly understand:

- The detection rule that generated the signal and its severity.
- The host, container, process, or user associated with the threat.
- Tags and attributes that help you filter related signals in the Signals Explorer.

## Signal JSON

The **Signal JSON** tab displays the raw content of the signal. Signal JSON is the underlying data structure that powers the Signals Explorer, dashboards, and programmatic queries.

Use Signal JSON when you need to:

- Write complex queries to group, count, or correlate signals in the [Signals Explorer][1] or [dashboards][3].
- Build automations or integrations that consume signal data through the [Datadog API][4].
- Share the full signal payload with colleagues or external tools during an investigation.

**Note**: Signal JSON is most useful for advanced users who want to query signals programmatically. For most investigations, the investigation graph, timeline, and context tabs provide the information you need.

[1]: https://app.datadoghq.com/security/workload-protection/signals
[2]: /security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[3]: /dashboards/
[4]: /api/latest/security-monitoring/
