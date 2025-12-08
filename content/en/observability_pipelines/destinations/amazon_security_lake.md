---
title: Amazon Security Lake Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Amazon Security Lake destination to send logs to Amazon Security Lake.

## Prerequisites

You need to do the following before setting up the Amazon Security Lake destination:

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## Setup

Set up the Amazon Security Lake destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

## How the destination works

### AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 256,000,000     | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching