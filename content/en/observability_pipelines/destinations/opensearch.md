---
title: OpenSearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' OpenSearch destination to send logs to OpenSearch.

## Setup

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. In the **Mode** dropdown menu, select **Bulk** or **Data streams**.
	- **Bulk** mode
		- Uses OpenSearch's [Bulk API][4] to send batched events directly into a standard index.
		- Choose this mode when you want direct control over index naming and lifecycle management. Data is appended to the index you specify, and you are responsible for handling rollovers, deletions, and mappings.
		- To configure **Bulk** mode:
			- In the **Index** field, optionally enter the name of the OpenSearch index. You can use [template syntax][3] to dynamically route logs to different indexes based on specific fields in your logs, for example `logs-{{service}}`.
	- **Data streams** mode
		- Uses  [OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure **Data streams** mode, optionally define the data stream name (default is `logs-generic-default`) by entering the following information:
			- In the **Type** field, enter the category of data being ingested, for example `logs`.
			- In the **Dataset** field, specify the format or data source that describes the structure, for example `apache`.
			- In the **Namespace** field, enter the grouping for organizing your data streams, for example `production`.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://docs.opensearch.org/latest/api-reference/document-apis/bulk/
[5]: https://docs.opensearch.org/latest/im-plugin/data-streams/