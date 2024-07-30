---
title: Set Up Pipelines
disable_toc: false
further_reading:
- link: "observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines"
- link: "observability_pipelines/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update an existing pipeline"
- link: "observability_pipelines/advanced_configurations/"
  tag: "Documentation"
  text: "Advanced configurations for Observability Pipelines"
---

## Overview

In Observability Pipelines, a pipeline is a sequential path made up of three types of components: a source, processors, and destinations. The Observability Pipeline [source][2] receives logs from your log source (for example, the Datadog Agent). The [processors][3] enrich and transform your data, and the [destination][4] is where your processed logs are sent. For some templates, your logs are sent to more than one destination. For example, if you use the Archive Logs template, your logs are sent to a cloud provider storage and another specified destination.

You set up a pipeline and its components in the [Observability Pipelines][1] UI after you select a template. All [sources][2] and [processors][3] are available for all templates. All [destinations][4] are available for all templates, except for the Amazon S3, Google Cloud Storage, and Azure Storage destinations, which are only available for the Archive Logs template. After you have set up your pipeline, see [Update Exiting Pipelines][10] if you want to update it.

## Set up a pipeline

Set up your pipelines and its [sources][2], [processors][3], [destinations][4] in the Observability Pipelines UI. The general setup steps are:

1. Navigate to [Observability Pipelines][1]
1. Select a template:
    - [Log volume control][5]
    - [Dual ship logs][6]
    - [Split logs][7]
    - [Archive logs to Datadog Archives][8]
    - [Sensitive data redaction][9]
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up you processors.
1. Install the Observability Pipelines Worker.
1. Enable monitors for your pipeline.

See [Advanced Configurations][11] for bootstrapping options and for details on setting up the Worker with Kubernetes.

After you have set up your pipeline, see [Update Exiting Pipelines][10] if you want to make any changes to it.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/processors/
[4]: /observability_pipelines/destinations/
[5]: /observability_pipelines/log_volume_control/
[6]: /observability_pipelines/dual_ship_logs/
[7]: /observability_pipelines/split_logs/
[8]: /observability_pipelines/archive_logs/
[9]: /observability_pipelines/sensitive_data_redaction/
[10]: /observability_pipelines/update_existing_pipelines/
[11]: /observability_pipelines/advanced_configurations/