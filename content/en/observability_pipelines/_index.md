---
title: Observability Pipelines
kind: documentation
disable_toc: false
---

## Overview

Observability Pipelines allows you to collect, process, and route logs in your own infrastructure. It comes with out-of-the-box templates so that you can easily build and deploy pipelines. The templates are purpose-built for the following use cases:

- Log volume control: Cut down on your log volume before it leaves your infrastructure or network.
- Dual ship logs: Send copies of your logs to multiple destinations.
- Split logs: Send your logs to different destinations based on your use case. For example, you can send devops logs to Datadog and security logs to a security vendor.
- Archive logs: Send logs to a log vendor and to an archive in Datadog rehydratable format.
- Sensitive data redaction: Redact sensitive data in your logs before they are routed outside of your infrastructure.

The Observability Pipelines Worker is the software that runs in your infrastructure. It aggregates and centrally processes and routes your logs based on the selected use case.

The Datadog UI provides a control plane to manage your Observability Pipelines Workers. You can build and edit pipelines, deploy pipeline changes to your Workers, and monitor your pipelines to evaluate the health of your pipelines.


## Get started

1. Navigate to [Observability Pipelines][LINK].
1. Select a use case:
    - Log volume control
    - [Dual ship logs][1]
    - Split logs
    - Archive logs
    - Senstive data redaction
1. Add monitors.

[1]: content/en/observability_pipelines/dual_ship_logs/