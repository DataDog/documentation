---
title: Azure Data Explorer Destination
description: Learn how to send logs to Azure Data Explorer using the Observability Pipelines Worker.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
further_reading:
- link: "/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines"
---

{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
The Azure Data Explorer destination is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' Azure Data Explorer destination to send logs to [Azure Data Explorer][1] (ADX). The destination sends logs to your ADX cluster using [streaming ingestion][2].

## Prerequisites

Before you configure the Azure Data Explorer destination, you must have:

- An ADX cluster with streaming ingestion enabled.
    - See [Create a cluster][3] and [Configure streaming ingestion on your Azure Data Explorer cluster][2] for more information.
- An ADX database and the tables to which you want to send logs.
    - See [Create a database][4] for more information.
- A streaming ingestion policy enabled on the target tables or database. For example, run this command to enable streaming ingestion on a table:
    ```
    .alter table ['<TABLE_NAME>'] policy streamingingestion enable
    ```
    See [Streaming ingestion policy][5] for more information.
- (Optional) An [ingestion mapping][6] on the target table, if you want to map log fields to table columns.
- An Azure identity that the Worker uses to authenticate to ADX. The identity must have ingestion permissions, such as the [Database Ingestor][7] role, on each database to which the Worker sends logs.

## Setup

<div class="alert alert-danger">Only enter the identifier for the Azure Data Explorer ingestion endpoint. Do <b>not</b> enter the actual value.</div>

Configure the Azure Data Explorer destination when you [set up a pipeline][8]. You can set up a pipeline in the [UI][9], using the [API][10], or with [Terraform][11]. The steps in this section are configured in the UI.

After you select the Azure Data Explorer destination in the pipeline UI:

1. Enter the identifier for your Azure Data Explorer ingestion endpoint. This identifier references the ingestion endpoint, such as `https://<CLUSTER>.<REGION>.kusto.windows.net`. If you leave the identifier field blank, the [default](#secret-defaults) is used.
    - **Note**: The ingestion endpoint is the URI shown in your ADX Cluster and **not** the data ingestion URI.
1. In the **Database** field, enter the name of the ADX database, such as `logs_db`.
1. In the **Table** field, enter the name of the ADX table to which you want to send logs, such as `application_logs`. This field supports [template syntax][12], so you can route logs to different tables based on a log field. For example, `{{ adx.table }}`.
    - **Note**: The resolved table must already exist in your cluster. If the table does not exist, or if the template resolves to an empty or null value, the Worker drops the batch of events.
1. (Optional) In the **Mapping Reference** field, enter the name of the ingestion mapping to use, such as `logs_json_mapping`. This field supports [template syntax][12], such as `{{ adx.mapping }}`.
    - **Notes**:
        - The resolved mapping must already exist in your cluster.
        - If the field is left blank or the template doesn't resolve to a value, the Worker sends the logs without a mapping reference and ADX ingests the logs as is.
        - See [Mapping with ingestionMappingReference][6] for more information.
1. In the **Azure Authentication** dropdown menu, select the authentication method and credentials for the Worker to use.
1. Enter the credentials for the authentication method you selected. See [Azure authentication](#azure-authentication) for the fields that each method requires.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Token scope

In the **Token Scope** field, enter the scope used to request access tokens for ADX. The default is `https://kusto.kusto.windows.net/.default`. You only need to change this setting if your cluster is in a sovereign or national cloud, such as Azure Government or Azure China.

#### Compression

Toggle the switch to **Enable Compression** with gzip. Optionally, select the compression level. If left unset, gzip level `3` is used.

#### Batching

You can configure how the Worker batches events before sending them to ADX.

- **Batch Max Bytes**: The maximum size of a batch, in bytes. The default is `2,000,000` bytes (2 MB). The maximum is 4 MB, which is the ADX streaming ingestion data size limit. See [Performance and operational considerations][13] for more information.
    - **Note**: Data created by [update policies][14] is included in the ingestion data size limit. Datadog recommends a default batch size of 2 MB to accommodate this additional data.
- **Batch Max Events**: The maximum number of events in a batch. The default is `1,000`.
- **Batch Timeout**: The maximum number of seconds before a partial batch is flushed. The default is `1` second.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Azure Data Explorer ingestion endpoint identifier:
    - References the URI of your ADX cluster, such as `https://<CLUSTER>.<REGION>.kusto.windows.net`.
    - The default identifier is `DESTINATION_AZURE_DATA_EXPLORER_INGESTION_ENDPOINT`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/azure_data_explorer %}}

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### Requests dropped with a bad request error

If the Worker logs errors similar to the following, ADX rejected the request with a `400 Bad Request` response:

```
Not retriable; dropping the request. reason="Default retry strategy: Bad Request"
```
```
Internal log [Service call failed. No retries or retries exhausted.] has been suppressed 63 times.
```

The Worker does not retry `400` responses, so the batch is dropped. This error occurs when the table in the **Table** field, or the table that the template resolves to, does not exist in your ADX database. To resolve this issue:

- Verify that the table name is spelled correctly and that the table exists in the database specified in the **Database** field.
- If you use template syntax, verify that the values in your logs resolve to tables that exist in the database.

### Failed to render template

If the Worker logs an error similar to the following, the Worker couldn't resolve the template in the **Table** field:

```
Failed to render template for "table". error=Missing fields on event: [".adx.table"] error_type="template_failed" stage="processing"
```

This error occurs when a log doesn't have the field referenced in the template. The Worker drops logs whose table template cannot be resolved. To resolve this issue, make sure all logs sent to the destination contain the field referenced in the template. See [Template syntax][12] for more information.

### Throttling when sending logs to many tables

If the Worker logs a high number of warnings similar to the following, ADX is throttling the Worker's requests with `429` responses:

```
Retrying after response.
```
```
Internal log [Retrying after response.] has been suppressed 132 times.
```

When you use template syntax in the **Table** or **Mapping Reference** fields, the Worker creates a separate batch for each combination of resolved table and mapping reference. If your logs resolve to many distinct tables and mapping references, the Worker sends many small requests at the same time. Depending on the size of your cluster, ADX might throttle these requests.

As long as your ADX cluster remains available, throttled requests are retried, so data loss is unlikely. However, high rates of throttling can cause:

- A large drop in pipeline throughput, which is the number of logs that pass through the pipeline per second.
- High buffer utilization. Logs waiting to be sent fill the destination buffer, and the backpressure propagates to the source. When the source buffer is full, push-based sources, such as the HTTP Server and Datadog Agent sources, reject new logs. Pull-based sources stop pulling new logs.

If you expect your pipeline to send logs to a high number of tables:

- [Scale your ADX cluster][15] to handle the volume of requests.
- Monitor your source and destination [buffer metrics][16] to make sure the buffers don't fill up. Full buffers can cause the pipeline to reject logs.

## Health metrics

For [component metrics][16] and [destination buffer metrics][17] emitted by all destinations, see the [Pipelines Usage Metrics][18] documentation. To filter or group by Azure Data Explorer destination metrics, use the tag `component_type:azure_data_explorer`.

## How the destination works

### Azure authentication

The fields you need to fill in depend on the authentication method you select in the **Azure Authentication** dropdown menu.

#### Azure CLI

Uses the credentials of the account signed in to the [Azure CLI][19] on the host where the Worker runs. No additional fields are required.

#### Client certificate

Uses a [Microsoft Entra application (service principal)][20] client ID and certificate.

- **Client ID**: The client ID of your Microsoft Entra application.
- **Tenant ID**: Your Microsoft Entra tenant ID.
- **Certificate path**: The path to the PKCS12 certificate file (`.pfx`) that contains the RSA private key, such as `path/to/certificate.pfx`.
- (Optional) **Certificate password**: The password for the certificate, if the certificate is password protected.

#### Client secret

Uses a [Microsoft Entra application (service principal)][20] client ID and client secret.

- **Client ID**: The client ID of your Microsoft Entra application.
- **Tenant ID**: Your Microsoft Entra tenant ID.
- **Client secret**: The client secret of your Microsoft Entra application.

#### Managed identity

Uses an [Azure managed identity][21] assigned to the resource where the Worker runs.

- (Optional) **User-assigned managed identity ID**: The ID of the user-assigned managed identity to use. If left blank, the system-assigned managed identity is used.
- (Optional) **User-assigned managed identity ID type**: The type of ID you entered for the user-assigned managed identity: **Client ID**, **Object ID**, or **Resource ID**. Defaults to **Client ID**.

#### Managed identity (client assertion)

Uses a managed identity to get a client assertion, which is then exchanged for an access token for the target application.

- **Client assertion client ID**: The client ID of the target application.
- **Client assertion tenant ID**: The tenant ID of the target application.
- (Optional) **User-assigned managed identity ID**: The ID of the user-assigned managed identity to use. If left blank, the system-assigned managed identity is used.
- (Optional) **User-assigned managed identity ID type**: The type of ID you entered for the user-assigned managed identity: **Client ID**, **Object ID**, or **Resource ID**. Defaults to **Client ID**.

#### Workload identity

Uses a [Microsoft Entra Workload ID][22] federated token, such as a Kubernetes service account token, to authenticate.

- (Optional) **Client ID**: The client ID of your Microsoft Entra application or managed identity. If left blank, the `AZURE_CLIENT_ID` environment variable is used.
- (Optional) **Tenant ID**: Your Microsoft Entra tenant ID. If left blank, the `AZURE_TENANT_ID` environment variable is used.
- (Optional) **Token File Path**: The path to the file containing the Kubernetes service account token, such as `/var/run/secrets/azure/tokens/azure-identity-token`. If left blank, the `AZURE_FEDERATED_TOKEN_FILE` environment variable is used.

### Routing

When you use template syntax in the **Table** or **Mapping Reference** fields, the Worker groups events into batches by their resolved database, table, and mapping reference. Each batch is sent to one table with one mapping reference.

### Retries

The Worker retries requests that fail because of network errors, timeouts, and HTTP `408`, `429`, and `5xx` responses (except `501`). The Worker doesn't retry other unsuccessful responses, such as a `400` response when the table does not exist. Instead, it drops the batch.

### Event batching

A batch of events is flushed when one of these parameters is met. Batching is also configurable for this destination. See [Destinations event batching][23] for more information.

| Maximum Events | Maximum Bytes | Timeout (seconds) |
|----------------|---------------|-------------------|
| 1,000          | 2 MB          | 1                 |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/data-explorer/data-explorer-overview
[2]: https://learn.microsoft.com/en-us/azure/data-explorer/ingest-data-streaming
[3]: https://learn.microsoft.com/en-us/azure/data-explorer/create-cluster-and-database#create-a-cluster
[4]: https://learn.microsoft.com/en-us/azure/data-explorer/create-cluster-and-database#create-a-database
[5]: https://learn.microsoft.com/en-us/kusto/management/streaming-ingestion-policy?view=azure-data-explorer
[6]: https://learn.microsoft.com/en-us/kusto/management/mappings?view=azure-data-explorer
[7]: https://learn.microsoft.com/en-us/kusto/access-control/role-based-access-control?view=azure-data-explorer
[8]: /observability_pipelines/configuration/set_up_pipelines/
[9]: https://app.datadoghq.com/observability-pipelines
[10]: /api/latest/observability-pipelines/
[11]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[12]: /observability_pipelines/destinations/#template-syntax
[13]: https://learn.microsoft.com/en-us/azure/data-explorer/ingest-data-streaming?tabs=azure-portal%2Ccsharp#performance-and-operational-considerations
[14]: https://learn.microsoft.com/en-us/kusto/management/update-policy?view=azure-data-explorer
[15]: https://learn.microsoft.com/en-us/azure/data-explorer/manage-cluster-horizontal-scaling
[16]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[17]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[18]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[19]: https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli
[20]: https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals
[21]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview
[22]: https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview
[23]: /observability_pipelines/destinations/#event-batching
