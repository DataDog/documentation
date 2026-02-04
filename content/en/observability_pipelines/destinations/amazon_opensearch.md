---
title: Amazon OpenSearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Amazon OpenSearch destination to send logs to Amazon OpenSearch.

## Setup

Set up the Amazon OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the Amazon OpenSearch endpoint URL, and if applicable, username and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your Amazon OpenSearch endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. In the **Mode** dropdown menu, select **Bulk** or **Data streams**.
	- **Bulk** mode
		- Uses Amazon OpenSearch's [Bulk API][4] to send batched events directly into a standard index.
		- Choose this mode when you want direct control over index naming and lifecycle management. Data is appended to the index you specify, and you are responsible for handling rollovers, deletions, and mappings.
		- To configure **Bulk** mode:
			- In the **Index** field, optionally enter the name of the Amazon OpenSearch index. You can use [template syntax][3] to dynamically route logs to different indexes based on specific fields in your logs, for example `logs-{{service}}`.
	- **Data streams** mode
		- Uses [Amazon OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want Amazon OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure **Data streams** mode, optionally define the data stream name (default is `logs-generic-default`) by entering the following information:
			- In the **Type** field, enter the category of data being ingested, for example `logs`.
			- In the **Dataset** field, specify the format or data source that describes the structure, for example `apache`.
			- In the **Namespace** field, enter the grouping for organizing your data streams, for example `production`.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. Optionally, enter the name of the Amazon OpenSearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
1. Select an authentication strategy, **Basic** or **AWS**. If you selected:
	- **Basic**:
		- Enter the identifier for your Amazon OpenSearch username. If you leave it blank, the [default](#set-secrets) is used.
		- Enter the identifier for your Amazon OpenSearch password. If you leave it blank, the [default](#set-secrets) is used.
	- **AWS**:
		1. Enter the AWS region.
		1. (Optional) Select an AWS authentication option. The **Assume role** option should only be used if the user or role you created earlier needs to assume a different role to access the specific AWS resource and that permission has to be explicitly defined.<br>If you select **Assume role**:
			1. Enter the ARN of the IAM role you want to assume.
			1. Optionally, enter the assumed role session name and external ID.
{{% observability_pipelines/destination_buffer_numbered %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon OpenSearch endpoint URL identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_ENDPOINT_URL`.
- Amazon OpenSearch authentication username identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_USERNAME`.
- Amazon OpenSearch authentication password identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/gsgupload-data.html
[5]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/data-streams.html