---
title: Elasticsearch Destination
disable_toc: false
---

Use Observability Pipelines' Elasticsearch destination to send logs to Elasticsearch.

## Setup

Set up the Elasticsearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. In the **Mode** dropdown menu, select **Bulk** or **Data streams**.
	- **Bulk** mode
		- Uses Elasticsearch's [Bulk API][5] to send batched events directly into a standard index.
		- Choose this mode when you want direct control over index naming and lifecycle management. Data is appended to the index you specify, and you are responsible for handling rollovers, deletions, and mappings.
		- To configure **Bulk** mode:
			- In the **Index** field, optionally enter the name of the Elasticsearch index. You can use [template syntax][3] to dynamically route logs to different indexes based on specific fields in your logs, for example `logs-{{service}}`.
	- **Data streams** mode
		- Uses [Elasticsearch Data Streams][4] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for time series log data.
		- Choose this mode when you want Elasticsearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure **Data streams** mode, optionally define the data stream name (default is `logs-generic-default`) by entering the following information:
			- In the **Type** field, enter the category of data being ingested, for example `logs`.
			- In the **Dataset** field, specify the format or data source that describes the structure, for example `apache`.
			- In the **Namespace** field, enter the grouping for organizing your data streams, for example `production`.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. Enter the name for the Elasticsearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
1. Enter the Elasticsearch version.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://www.elastic.co/docs/reference/fleet/data-streams
[5]: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk