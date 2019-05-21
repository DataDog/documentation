---
title: Create a Pipeline
type: apicontent
order: 24.5
external_redirect: /api/#create-a-pipeline
---

## Create a Pipeline

Create a Pipeline in your Organization.


##### Arguments


* **`name`** [*required*]:
    Your pipeline name.

* **`is_enabled`** [*optional*, *default*=**False**]:
    Boolean value wether or note your pipeline is enabled

* **`filter.query`** [*optional*]: Defines your Pipeline Filter. Only logs that match the filter criteria are processed by this pipeline.

* **`processors`** [*optional*]: Ordered Array of Processors or Nested Pipelines. See the Processor documentation to get the specific Scheme for each processor.
