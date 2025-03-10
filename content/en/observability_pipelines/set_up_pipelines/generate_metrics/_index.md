---
title: Generate Metrics
disable_toc: false
---

## Overview

Some log sources, such as firewalls and network appliances, generate a large volume of log events that contain data that don't necessarily need to be stored. Often, you just want to see a summary of the logs and compare it to historical data. Use the Generate Metrics template to generate a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration. The template starts you off with the following processors:

- **Filter**: Add a query to send only a subset of logs based on your conditions.
- **Grok Parser**: Parse your logs using grok parsing rules that are available for a set of sources or add custom parsing rules.
- **Generate metrics**: Generate metrics for your logs or a subset of them. See [Metrics types](#metrics-types) for the types of metrics you can generate.

{{% observability_pipelines/use_case_images/generate_metrics %}}

## Metrics types

{{% observability_pipelines/metrics_types %}}
