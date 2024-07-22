---
title: Fluentd and Fluent Bit Sources
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

Use Observability Pipelines's Fluentd or Fluent Bit source to receive logs from the your Fluentd or Fluent Bit agent. To set up this source, follow the instructions in [Set up Pipelines][1].

### Prerequisites

{{% observability_pipelines/prerequisites/fluent %}}

### Set up the source in the pipeline UI

To set up this source, follow the instructions in [Set Up Pipelines][1]. The information below are source settings in the pipeline UI.

{{% observability_pipelines/source_settings/fluent %}}

### Send logs to the Observability Pipelines Worker over Fluent

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /observability_pipelines/set_up_pipelines/