---
title: Observability Pipelines
kind: documentation
disable_toc: false
---

## Overview

<div class="alert alert-warning">This documentation is for Observability Pipelines Worker (OPW) 2.0. If you are using OPW 1.8 and want to use OPW 2.0, you <strong>must</strong> migrate your OPW 1.8 pipelines to OPW 2.0.</div>

Observability Pipelines allows you to collect, process, and route logs for the following use cases:

- Dual ship logs: Send your logs to multiple destinations.
- Log volume control: Cut down on your log volume and trim down the size of your logs before it leaves your infrastructure or network.
- Split logs: Send your logs to different destinations based on your use case. For example, you can devops logs to Datadog and security logs to another destination.
- Archive logs: Send logs to Datadog log archives and another destination.
- Redact data before routing your logs to a destination.

The Observability Pipelines Worker is the software that runs in your infrastructure. It aggregates and centrally processes and routes your data based on the selected use case.

The Datadog UI provides a control plane to manage your Observability Pipelines Workers. You can monitor your pipelines to understand the health of your pipelines, identify bottlenecks and latencies, and investigate your largest volume contributors.

## Get started

1. Navigate to [Observability Pipelines][LINK].
1. Select a use case:
    - [Dual ship logs][1]
    - Log volume control
    - Split logs
    - Archive logs
    - Redact data before routing

[1]: content/en/observability_pipelines/dual_ship_logs/