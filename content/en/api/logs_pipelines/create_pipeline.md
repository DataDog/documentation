---
title: Create a Pipeline
type: apicontent
order: 25.5
external_redirect: /api/#create-a-pipeline
---

## Create a Pipeline

Create a Pipeline in your organization.

**ARGUMENTS**:

* **`name`** [*required*]:
    Your pipeline name.

* **`is_enabled`** [*optional*, *default*=**False**]:
    Boolean value to enable your pipeline.

* **`filter.query`** [*optional*]: Defines your pipeline filter. Only logs that match the filter criteria are processed by this pipeline.

* **`processors`** [*optional*]: Ordered array of processors or nested pipelines. See the [Processor documentation][1] to get the specific Scheme for each processor.
[1]: /logs/processing/processors/?tab=api
