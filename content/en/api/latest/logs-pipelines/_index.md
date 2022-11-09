---
title: Logs Pipelines
---
Pipelines and processors operate on incoming logs, parsing
and transforming them into structured attributes for easier querying.

- See the [pipelines configuration page](https://app.datadoghq.com/logs/pipelines)
  for a list of the pipelines and processors currently configured in web UI.

- Additional API-related information about processors can be found in the
  [processors documentation](https://docs.datadoghq.com/logs/log_configuration/processors/?tab=api#lookup-processor).

- For more information about Pipelines, see the
  [pipeline documentation](https://docs.datadoghq.com/logs/log_configuration/pipelines).

**Notes:**

These endpoints are only available for admin users.
Make sure to use an application key created by an admin.

**Grok parsing rules may effect JSON output and require
returned data to be configured before using in a request.**
For example, if you are using the data returned from a
request for another request body, and have a parsing rule
that uses a regex pattern like `\s` for spaces, you will
need to configure all escaped spaces as `%{space}` to use
in the body data.

## Get pipeline order

Get the current order of your pipelines.
This endpoint takes no JSON arguments.

## Update pipeline order

Update the order of your pipelines. Since logs are processed sequentially, reordering a pipeline may change
the structure and content of the data processed by other pipelines and their processors.

**Note**: Using the `PUT` method updates your pipeline order by replacing your current order
with the new one sent to your Datadog organization.

## Get all pipelines

Get all pipelines from your organization.
This endpoint takes no JSON arguments.

## Create a pipeline

Create a pipeline in your organization.

## Delete a pipeline

Delete a given pipeline from your organization.
This endpoint takes no JSON arguments.

## Get a pipeline

Get a specific pipeline from your organization.
This endpoint takes no JSON arguments.

## Update a pipeline

Update a given pipeline configuration to change it’s processors or their order.

**Note**: Using this method updates your pipeline configuration by **replacing**
your current configuration with the new one sent to your Datadog organization.

