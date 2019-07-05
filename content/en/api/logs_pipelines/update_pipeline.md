---
title: Update a Pipeline
type: apicontent
order: 24.6
external_redirect: /api/#update-a-pipelines
---

## Update a Pipeline

Update a given pipeline configuration to change it's processors or their order.

##### Arguments

* **`name`** [*required*]:
    Your pipeline name.

* **`is_enabled`** [*optional*, *default*=**False**]:
    Boolean value wether or note your pipeline is enabled

* **`filter.query`** [*optional*]: Defines your Pipeline Filter. Only logs that match the filter criteria are processed by this pipeline.

* **`processors`** [*optional*]: Ordered Array of Processors or Nested Pipelines. See the [Processor documentation][1] to get the specific Scheme for each processor.
[1]: /logs/processing/processors/?tab=api
