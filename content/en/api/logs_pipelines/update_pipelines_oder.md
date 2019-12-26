---
title: Update Pipeline Order
type: apicontent
order: 25.2
external_redirect: /api/#update-pipelines-order
---

## Update Pipeline Order

Update the order of your pipelines. Since logs are processed sequentially, reordering a pipeline may change the structure and content of the data processed by other pipelines and their processors.

**Note**: Using the `PUT` method updates your pipeline order by **replacing** your current order with the new one sent to your Datadog organization.

**ARGUMENTS**:

* **`pipeline_ids`** [*required*]:
    Ordered Array of `<PIPELINE_ID>` strings, the order of pipeline IDs in the array define the overall Pipelines order for Datadog?
