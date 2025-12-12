---
title: Google Chronicle Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Google Chronicle destination to send logs to Google Chronicle.

The Observability Pipelines Worker uses standard Google authentication methods. See [Authentication methods at Google][3] for more information about choosing the authentication method for your use case.

## Setup

Set up the Google Chronicle destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/chronicle %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart