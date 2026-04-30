---
title: Service Remapper
processor_name: service-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The service remapper processor assigns one or more attributes to your logs as the official service.

**Note**: If multiple service remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

## Use cases

| Use case | Example |
| :--- | :--- |
| Select a custom attribute to define the log event's official service. | For logs from Microsoft 365, remap the `Workload` attribute as the log service. |
| Remap an attribute that becomes available only after preliminary parsing. | Remap the service contained within the `message` attribute of Bitdefender logs after a Grok Parser has extracted it. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

