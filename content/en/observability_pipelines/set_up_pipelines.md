---
title: Set Up Pipelines
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Set up your pipelines and its [sources][2], [processors][3], [destinations][4] in the Observability Pipelines UI. The general steps for setting up a pipeline are:

1. Navigate to [Observability Pipelines][1]
1. Select a template:
    - [Log volume control][5]
    - [Dual ship logs][6]
    - [Split logs][7]
    - [Archive logs to Datadog Archives][8]
    - [Sensitive data redaction][9]
1. Select your source.
1. Select your destinations.
1. Set up you processors.
1. Install the Observability Pipelines Worker.
1. Enable monitors for your pipeline.

See [Advanced Configurations][11] for bootstrapping options and for details on setting up the Worker with Kubernetes.

All [sources][2] and [processors][3] are available for all templates. All [destinations][4] are available for all templates, except for the Amazon S3, Google Cloud Storage, and Azure Storage destinations which are only available for the Archive Logs template.

The templates available are for the following use cases:

- Log volume control: Cut down on your log volume before it leaves your infrastructure or network.
- Dual ship logs: Send copies of your logs to multiple destinations.
- Split logs: Send your logs to different destinations based on your use case. For example, you can send DevOps logs to Datadog and security logs to a security vendor.
- Archive logs: Send logs to a log vendor and to an archive in Datadog rehydratable format.
- Sensitive data redaction: Remove sensitive data from your logs before they are routed outside of your infrastructure.

### Update existing pipelines

For existing pipelines, update and deploy changes for source settings, destination settings, and processors in the Observability Pipelines UI.

1. Navigate to [Observability Pipelines][1]
1. Click on the pipeline you want to update.
1. Click **Edit Pipeline**.
1. Update the settings and processors.
1. Click **Deploy Changes**.

If you want to update source and destination environment variables that were set up during the Observability Pipelines Worker installation step, you need to manually update the Worker with the new values. See [Update source or destination variables][10] for more information.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/processors/
[4]: /observability_pipelines/destinations/
[5]: /observability_pipelines/log_volume_control/
[6]: /observability_pipelines/dual_ship_logs/
[7]: /observability_pipelines/split_logs/
[8]: /observability_pipelines/archive_logs/
[9]: /observability_pipelines/sensitive_data_redaction/
[10]: /observability_pipelines/update_existing_pipelines/#update-source-or-destination-variables
[11]: /observability_pipelines/advanced_configurations/