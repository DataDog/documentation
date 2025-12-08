---
title: Syslog Destinations
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' syslog destinations to send logs to rsyslog or syslog-ng.

## Setup

Set up the rsyslog or syslog-ng destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/syslog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

### How the destination works

#### Event batching

The rsyslog and syslog-ng destinations do not batch events.

[1]: https://app.datadoghq.com/observability-pipelines