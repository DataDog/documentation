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
    Boolean value to enable your pipeline.

* **`filter.query`** [*optional*]: Defines your pipeline filter. Only logs that match the filter criteria are processed by this pipeline.

* **`processors`** [*optional*]: Ordered array of processors or nested pipelines. See the [Processor documentation][1] to get the specific scheme for each processor.
[1]: /logs/processing/processors/?tab=api
