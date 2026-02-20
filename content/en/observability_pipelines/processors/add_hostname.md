---
title: Add Hostname Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

This processor adds a field with the name of the host that sent the log. For example, `hostname: 613e197f3526`. **Note**: If the `hostname` already exists, the Worker throws an error and does not overwrite the existing `hostname`.

## Setup

To set up this processor:
- Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.

{{% observability_pipelines/processors/filter_syntax %}}