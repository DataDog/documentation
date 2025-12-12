---
title: CrowdStrike Next-Gen SIEM Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' CrowdStrike Next-Gen SIEM destination to send logs to CrowdStrike Next-Gen SIEM.

## Setup

Set up the CrowdStrike NG-SIEM destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching