---
title: Elasticsearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

{{< callout url="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/"
 btn_hidden="false" header="Join the Preview!">}}
Sending metrics to Observability Pipelines is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' Elasticsearch destination to send logs or metrics ({{< tooltip glossary="preview" case="title" >}}) to Elasticsearch.

## Setup

Set up the Elasticsearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the Elasticsearch endpoint URL, username, and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifiers for your Elasticsearch username and password. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your Elasticsearch endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. (Optional) Enter the Elasticsearch version.
1. In the **Mode** dropdown menu, select **Bulk** or **Data stream**.
	- **Bulk** mode
		- Uses Elasticsearch's [Bulk API][5] to send batched events directly into a standard index.
		- Choose this mode when you want direct control over index naming and lifecycle management. Data is appended to the index you specify, and you are responsible for handling rollovers, deletions, and mappings.
		- To configure **Bulk** mode:
			- (Optional) In the **Index** field, enter the name of the Elasticsearch index. You can use [template syntax][3] to dynamically route data to different indexes based on specific fields in your logs, for example `logs-{{service}}` or `metrics-{{service}}`.
	- **Data streams** mode
		- Uses [Elasticsearch Data Streams][4] for data storage. Data streams automatically manage backing indexes and rollovers, making them ideal for time series log data.
		- Choose this mode when you want Elasticsearch to manage the index lifecycle for you. Data streams ensure smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure **Data streams** mode, optionally specify the data stream name and configure routing and syncing settings.
			1. In the **Type** field, enter the category of data being ingested, for example `logs` or `metrics`.
			1. In the **Dataset** field, specify the format or data source that describes the structure, for example `apache`.
			1. In the **Namespace** field, enter the grouping for organizing your data streams, for example `production`.
			1. Enable the **Auto routing** toggle to automatically route events to a data stream based on the event content.
			1. Enable the **Sync fields** toggle to synchronize data stream fields with the Elasticsearch index mapping.
			- In the UI, there is a preview of the data stream name you configured. If the fields are left blank, the default data stream name used is `logs-generic-default` for logs and `metrics-generic-default` for metrics. With the above example inputs, the data stream name that the Worker writes to is:
				- `logs-apache-production` for logs
				- `metrics-apache-production` for metrics

#### Optional settings

##### Enable TLS

Toggle the switch to **Enable TLS**.
- If you are using Secrets Management, enter the identifier for the key pass. See [Set secrets](#set-secrets) for the default used if the field is left blank.
- The following certificate and key files are required for TLS:
  - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER, PEM, or CRT (X.509).
  - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER, PEM, or CERT (X.509).
  - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER, PEM, or CERT (PKCS #8) format.
  - **Notes**:
    - The configuration data directory `/var/lib/observability-pipelines-worker/config/` is automatically appended to the file paths. See [Advanced Worker Configurations][6] for more information.
    - The file must be readable by the `observability-pipelines-worker` group and user.

##### Compression

You might want to use compression if you are sending a high volume of events to your Elasticsearch clusters.

Toggle the switch to enable **Compression**. Select a compression algorithm (**gzip**, **snappy**, **zlib**, **zstd**) in the dropdown menu. The default is no compression.

##### Buffering

{{% observability_pipelines/destination_buffer %}}

##### Advanced options

1. In the **ID Key** field, enter the name of the field used as the document ID in Elasticsearch.
1. In the **Pipeline** field, enter the name of an Elasticsearch ingest pipeline to apply to events before indexing.
1. Enable the **Retry partial failures** toggle to retry a failed bulk request when some events in a batch fail while others succeed.

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Elasticsearch endpoint URL identifier:
	- The default identifier is `DESTINATION_ELASTICSEARCH_ENDPOINT_URL`.
- Elasticsearch authentication username identifier:
	- The default identifier is `DESTINATION_ELASTICSEARCH_USERNAME`.
- Elasticsearch authentication password identifier:
	- The default identifier is `DESTINATION_ELASTICSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://www.elastic.co/docs/reference/fleet/data-streams
[5]: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk
[6]: /configuration/install_the_worker/advanced_worker_configurations/