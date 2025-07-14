---
title: Datadog Logs Destination
disable_toc: false
---

Use Observability Pipelines' Datadog Logs destination to send logs to Datadog Log Management. You can also use [AWS PrivateLink](#aws-privatelink) to send logs from Observability Pipelines to Datadog.

## Setup

Set up the Datadog Logs destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/datadog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

## AWS PrivateLink

If you would like to send logs from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][3] for setup instructions. The two endpoints that you need to set up are:

- Logs (User HTTP intake): `http-intake.logs.datadoghq.com`
- Remote Configuration: `config.datadoghq.com`

**Note**: If you are a PCI-compliant organization, the Worker sends logs over `http-intake-pci.logs.datadoghq.com`, which is not available with AWS PrivateLink.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /agent/guide/private-link/?tab=crossregionprivatelinkendpoints