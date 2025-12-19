---
title: Category Processor
description: "Add a new attribute to a log matching a provided search query"
processor_type: category-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/search_syntax/"
  tag: "Documentation"
  text: "Log search syntax"
---

## Overview

Use the category processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query. Then, use categories to create groups for an analytical view (for example, URL groups, machine groups, environments, and response time buckets).

**Notes**:

* The syntax of the query is the one in the [Log Explorer][1] search bar. This query can be done on any log attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
* Once the log has matched one of the processor queries, it stops. Make sure they are properly ordered in case a log could match several queries.
* The names of the categories must be unique.
* Once defined in the category processor, you can map categories to log status using the [log status remapper][4].

## Use cases

The Category Processor allows you to categorize your log events based on their content. Common use cases are:
- Categorizing success and failure logs, for example as we do with Auth0 logs.
- Categorizing status of logs based on the log content, for example as we do for IIS logs

## Before and after state of logsb

{{% collapse-content title="Example: Categorizing logs with the Category Processor" level="h4" %}}

**Before:**

```json
{
  "http": {
    "method": "GET",
    "url": "/v1/orders",
    "status_code": 500
  },
  "message": "Order processing failed: timeout while contacting payment provider",
  "timestamp": 1696945536000
}
```

**Category Processor**

We create a Category Processor to set a log status category based on the http.status_code. That will allow us later to use a status remapper to that attribute.

**After processing:**

```json
{
  "http": {
    "method": "GET",
    "url": "/v1/orders",
    "status_code": 500
  },
  "message": "Order processing failed: timeout while contacting payment provider",
  "log_status": "error",
  "timestamp": 1696945536000
}
```

The Category Processor added a new attribute called log_status with the status of the log derived from the HTTP status code.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][3] with the following category processor JSON payload:

```json
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| Parameter    | Type            | Required | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Type of the processor.                                                                                     |
| `name`       | String          | No       | Name of the processor.                                                                                     |
| `is_enabled` | Boolean         | No       | If the processors is enabled or not. Default: `false`                                                      |
| `categories` | Array of Object | Yes      | Array of filters to match or not a log and their corresponding `name` to assign a custom value to the log. |
| `target`     | String          | Yes      | Name of the target attribute which value is defined by the matching category.                              |

[2]: /api/v1/logs-pipelines/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /api/v1/logs-pipelines/
[4]: /logs/processor_types/log_status_remapper