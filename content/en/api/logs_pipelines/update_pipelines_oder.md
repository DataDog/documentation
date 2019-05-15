---
title: Update Pipelines Order
type: apicontent
order: 24.2
external_redirect: /api/#update-pipelines-order
---

## Update Pipelines Order

Update the order of your Pipelines.

**Note**: Logs are processed sequentially. Reordering a pipeline may change the structure and content of the data processed by other pipelines and their processors.

##### Arguments

* **`pipeline_ids`** [*required*]:
    Ordered Array of `<PIPELINE_ID>` strings, the order of pipeline IDs in the array define the overall Pipelines order for Datadog?
