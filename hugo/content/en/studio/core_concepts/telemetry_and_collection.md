---
title: Telemetry and collection
description: Learn what telemetry Datadog Studio collects and how it's collected from your applications.
---

## Overview

Studio collects telemetry from your applications, including traces, logs, and metrics, to give you visibility into how your code behaves across environments. This page describes what data Studio captures, where it is routed, and how it is used across your development life cycle.

Studio telemetry supports both local development and production observability. Depending on your configuration, telemetry data is handled differently to help maintain security and performance.

## Local development mode

In local development mode, Studio uses a local-first approach. All telemetry collected during your active coding session is routed to your local dev server instead of the Datadog platform.

- **Telemetry types**: The local dev server ingests all standard observability signals, including:
  - **RUM (frontend) and backend traces**: OpenTelemetry or Datadog-native traces.
  - **Logs, metrics, and errors**: Local logs and performance metrics generated during the dev session.
  - **Coding agent trajectories**: Logs of your coding agent's reasoning, tool usage, and the steps taken within the local workspace.
- **Security and privacy**: To protect your environment, the Studio agent cannot access your local file system directly. Data is scoped to the telemetry produced during your coding session and remains on your local dev server.

## Production and connected mode

When Studio is connected to your Datadog environment, telemetry is ingested to provide a unified, production-ready operational view. This allows you to track work items from inception to production.

- **Agent observability (LLM Observability)**: Studio collects traces and spans for AI/LLM operations. These are grouped into agent sessions (conversations) to provide visibility into agent behavior, latency, and cost.
- **Instrumentation and linking**: Studio automatically links:
  - **Agent sessions**: Grouped by conversation or session ID.
  - **Service context**: Agent sessions are linked to their corresponding RUM sessions and backend APM traces.
  - **Debugging information**: Stack traces and error context are captured and associated with Studio work items to support the Studio issue-to-fix flow.
- **Work tracking**: Work status data—including ticket associations, PR statuses, and deployment telemetry—is synced to support the inception-to-production life cycle.

## Data types at a glance

The following table summarizes the data Studio collects, its purpose, and where it is collected:

| Data category | Purpose | Collection scope |
|---|---|---|
| User sessions (RUM) | Monitor frontend performance and user impact. | Local and production |
| Backend traces (APM) | Diagnose service latency and interaction issues. | Local and production |
| Agent traces and spans (LLM Observability) | Analyze agent reasoning, cost, and tool usage. | Production |
| Logs and metrics | Provide operational awareness and debugging information. | Local and production |
| Coding agent trajectories | Document agent actions for reproducibility. | Local and production |

**Note**: Studio uses these data types to provide recommendations. In production mode, you can toggle specific automations or agentic loops on the Automations page to control which monitors are active.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
