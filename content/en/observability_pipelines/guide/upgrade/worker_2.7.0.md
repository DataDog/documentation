---
title: Upgrade to Worker Version 2.7.0
description: Learn more about Worker version 2.7.0.
disable_toc: false
---

Upgrade to Worker version 2.7.0 to have access to the following new features, enhancements, and fixes.

## New features

- [The HTTP Client destination][1]: Send logs to an HTTP client, such as a logging platform or SIEM.
- [Processor Groups][2]: Organize your processors into logical groups to help you manage them.
- [Disk][3] and [memory][4] buffering options are available for destinations.

## Enhancements

- Decompressing lz4 frame data is supported.
- Azure Blob Storage and Google Cloud Storage archive destinations' prefix fields support template syntax.
- The Splunk HEC destination has a custom environment variable.
- The sample processor has an optional `group_by` parameter.

## Fixes
- The Datadog Logs destination's default compression has been updated to `zstd`, which matches Datadog Agent's default compression.
- Amazon S3, Google Cloud Storage, and Azure Blob Storage destinations correctly resolves log timestamps.
- Performance improvements for custom OCSF mapper.
- Enabled flag logic in the filter processor to pass events to the next processor.

[1]: /observability_pipelines/destinations/http_client/
[2]: /observability_pipelines/processors/#processor-groups
[3]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#disk-buffers
[4]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#in-memory-buffering-for-components