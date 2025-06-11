---
title: Socket Destination
disable_toc: false
---

Use Observability Pipelines' Socket destination to send logs to a socket endpoint.

## Setup

Set up the Socket destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/socket %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### How the destination works

#### Event batching

The Socket destination does not batch events.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching