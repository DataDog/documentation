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

Use Observability Pipelines' Azure Data Explorer destination to send logs to [Azure Data Explorer][1] (ADX). The destination sends logs to your ADX cluster using streaming or queued ingestion. See the [Ingestion modes](#ingestion-modes) section for more information.

## Prerequisites

Before you configure the Azure Data Explorer destination, you must have:

- An ADX cluster. See [Create a cluster][2] for more information.
- An ADX database and the tables you want to send logs to. See [Create a database][3] and [Create a table in Azure Data Explorer][4] for more information.
- If you use the streaming ingestion mode, you must have:
    - Streaming ingestion enabled on your cluster. See [Configure streaming ingestion on your Azure Data Explorer cluster][5] for more information.
    - A streaming ingestion policy enabled on the target tables or database. For example, run this command to enable streaming ingestion on a table:
        ```bash
        .alter table ['<TABLE_NAME>'] policy streamingingestion enable
        ```
        See [Streaming ingestion policy][6] for more information.
- (Optional) An ingestion mapping on the target table, if you want to map log fields to table columns. See [Ingestion mappings][7] for more information.
- An Azure identity that the Worker uses to authenticate to ADX. The identity must have ingestion permissions, such as the [Database Ingestor][8] role, on each database the Worker sends logs to.

## Setup

<div class="alert alert-danger">Only enter the identifiers for the Azure Data Explorer ingestion endpoint and, if applicable, the Azure authentication client secret and certificate password. Do <b>not</b> enter the actual values.</div>

Configure the Azure Data Explorer destination when you [set up a pipeline][9]. You can set up a pipeline in the [UI][10], using the [API][11], or with [Terraform][12]. The steps in this section are configured in the UI.

After you select the Azure Data Explorer destination in the pipeline UI:

1. In the **Ingestion Mode** dropdown menu, select one of the following:
    - **Streaming** (default): Use streaming ingestion when you need low latency between ingestion and query. See the [Streaming ingestion](#streaming-ingestion) section for more information.
    - **Queued**: Use queued ingestion if the stream of data into each table is more than 4 GB per hour. See the [Queued ingestion](#queued-ingestion) section for more information.
1. Enter the identifier for your Azure Data Explorer ingestion endpoint. If you leave the identifier field blank, the [default](#secret-defaults) is used. The endpoint the identifier references depends on the ingestion mode you selected:
    - **Streaming**: The cluster URI shown in the Azure portal, such as `https://<CLUSTER>.<REGION>.kusto.windows.net`.
    - **Queued**: The data ingestion URI shown in the Azure portal, such as `https://ingest-<CLUSTER>.<REGION>.kusto.windows.net`.
1. In the **Database** field, enter the name of the ADX database, such as `logs_db`.
1. In the **Table** field, enter the name of the ADX table you want to send logs to, such as `application_logs`. This field supports [template syntax][13], such as `{{ adx.table }}`, so you can route logs to different tables based on a log field.
    - **Note**: The resolved table must already exist in your cluster. If the table doesn't exist, or if the template resolves to an empty or null value, the Worker drops the batch of logs.
1. (Optional) In the **Mapping Reference** field, enter the name of the ingestion mapping to use, such as `logs_json_mapping`. This field supports [template syntax][13], such as `{{ adx.mapping }}`.
    - **Notes**:
        - The resolved mapping must already exist in your cluster.
        - If the field is left blank or the template doesn't resolve to a value, the Worker sends the logs without a mapping reference. ADX then ingests the logs as is.
        - See [Mapping with ingestionMappingReference][14] for more information.
1. In the **Azure Authentication** dropdown menu, select the authentication method for the Worker to use.
1. Enter the credentials for the authentication method you selected. See the [Azure authentication](#azure-authentication) section for the fields that each method requires.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Token scope

In the **Token Scope** field, enter the scope used to request access tokens for ADX. The default is `https://kusto.kusto.windows.net/.default`. Use a different scope only if your cluster is in a sovereign or national cloud, such as Azure Government or Azure China.

#### Compression

Toggle **Enable Compression** to compress requests with gzip. Optionally, select the compression level. If left unset, the default is 3.

#### Batching

You can configure how the Worker batches logs before sending them to ADX. The defaults and limits depend on the ingestion mode.

1. In the **Batch Max Bytes** field, enter the maximum batch size in bytes.
    - **Streaming**:
        - The default is 2 MB.
        - The maximum is 4 MB, which is the ADX streaming ingestion data size limit. See [Performance and operational considerations][15] for more information.
        - **Note**: Data created by [update policies][16] is included in the ingestion data size limit. Datadog recommends keeping the default batch size of 2 MB to leave room for this additional data.
    - **Queued**: The default is 100 MB. The maximum is 1 GB.
1. In the **Batch Max Events** field, enter the maximum number of logs in a batch.
    - **Streaming**: The default is 1,000.
    - **Queued**: There is no limit by default.
1. In the **Batch Timeout** field, enter the maximum number of seconds before a batch is flushed.
    - **Streaming**: The default is 1 second.
    - **Queued**: The default is 10 seconds.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

### Azure authentication

The credential fields you fill in depend on the authentication method you select in the **Azure Authentication** dropdown menu.

#### Azure CLI

The Azure CLI authentication method uses the credentials of the account signed in to the [Azure CLI][17] on the host where the Worker runs. No additional fields are required to configure Azure authentication for the Azure Data Explorer destination.

#### Client certificate

The client certificate authentication method uses a [Microsoft Entra application (service principal)][18] client ID and certificate. Configure the following fields:

- **Client ID**: Enter the client ID of your Microsoft Entra application.
- **Tenant ID**: Enter your Microsoft Entra tenant ID.
- **Certificate Path**: Enter the path to the PKCS12 certificate file (`.pfx`) that contains the RSA private key, such as `path/to/certificate.pfx`.
- (Optional) **Certificate Password**: If the certificate is password protected, enter the identifier that references the certificate password. Do **not** enter the actual value. If you leave the field blank, the [default](#secret-defaults) is used.

#### Client secret

The client secret authentication method uses a [Microsoft Entra application (service principal)][18] client ID and client secret. Configure the following fields:

- **Client ID**: Enter the client ID of your Microsoft Entra application.
- **Tenant ID**: Enter your Microsoft Entra tenant ID.
- **Client Secret**: Enter the identifier that references the client secret of your Microsoft Entra application. Do **not** enter the actual value. If you leave the field blank, the [default](#secret-defaults) is used.

#### Managed identity

The managed identity authentication method uses an [Azure managed identity][19] assigned to the resource where the Worker runs. Configure the following fields:

- (Optional) **User-Assigned Managed Identity ID**: Enter the ID of the user-assigned managed identity to use. If left blank, the system-assigned managed identity is used.
- (Optional) **User-Assigned Managed Identity ID Type**: Select the type of ID you entered for the user-assigned managed identity: **Client ID**, **Object ID**, or **Resource ID**. The default is **Client ID**.

#### Managed identity (client assertion)

The managed identity (client assertion) authentication method uses a managed identity to get a client assertion. The client assertion is exchanged for an access token for the target application. Configure the following fields:

- **Client Assertion Client ID**: Enter the client ID of the target application.
- **Client Assertion Tenant ID**: Enter the tenant ID of the target application.
- (Optional) **User-Assigned Managed Identity ID**: Enter the ID of the user-assigned managed identity to use. If left blank, the system-assigned managed identity is used.
- (Optional) **User-Assigned Managed Identity ID Type**: Select the type of ID you entered for the user-assigned managed identity: **Client ID**, **Object ID**, or **Resource ID**. The default is **Client ID**.

#### Workload identity

The workload identity authentication method uses a [Microsoft Entra Workload ID][20] federated token, such as a Kubernetes service account token, to authenticate. Configure the following fields:

- (Optional) **Client ID**: Enter the client ID of your Microsoft Entra application or managed identity. If left blank, the `AZURE_CLIENT_ID` environment variable is used.
- (Optional) **Tenant ID**: Enter your Microsoft Entra tenant ID. If left blank, the `AZURE_TENANT_ID` environment variable is used.
- (Optional) **Token File Path**: Enter the path to the file containing the Kubernetes service account token, such as `/var/run/secrets/azure/tokens/azure-identity-token`. If left blank, the `AZURE_FEDERATED_TOKEN_FILE` environment variable is used.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Azure Data Explorer ingestion endpoint identifier:
    - References the ADX endpoint for the ingestion mode you selected:
        - Streaming: The cluster URI, such as `https://<CLUSTER>.<REGION>.kusto.windows.net`.
        - Queued: The data ingestion URI, such as `https://ingest-<CLUSTER>.<REGION>.kusto.windows.net`.
    - The default identifier is `DESTINATION_AZURE_DATA_EXPLORER_INGESTION_ENDPOINT`.
- Azure client certificate password identifier for the [client certificate](#client-certificate) authentication method:
    - References the password for the PKCS12 certificate file if the certificate is password protected.
    - The default identifier is `DESTINATION_AZURE_DATA_EXPLORER_CERTIFICATE_PASSWORD`.
- Azure client secret identifier for the [client secret](#client-secret) authentication method:
    - References the client secret of your Microsoft Entra application.
    - The default identifier is `DESTINATION_AZURE_DATA_EXPLORER_CLIENT_SECRET`.

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

The Worker doesn't retry `400` responses, so the batch is dropped. This error typically occurs when the table in the **Table** field doesn't exist in your ADX database. If you use template syntax, the error occurs when the table that the template resolves to doesn't exist. To resolve this issue:

- Verify that the table name is spelled correctly and that the table exists in the database specified in the **Database** field.
- If you use template syntax, verify that the values in your logs resolve to tables that exist in the database.

### Failed to render template

If the Worker logs an error similar to the following, the Worker couldn't resolve the template syntax in the **Table** field:

```
Failed to render template for "table". error=Missing fields on event: ["adx.table"] error_type="template_failed" stage="processing"
```

This error occurs when a log doesn't have the field referenced in the template. The Worker drops logs whose table template syntax can't be resolved. To resolve this issue, make sure all logs sent to the destination contain the field referenced in the template. See [Template syntax][13] for more information.

### Throttling when sending logs to many tables

If the Worker logs a high number of warnings similar to the following, ADX is throttling the Worker's requests with `429` responses:

```
Retrying after response.
```
```
Internal log [Retrying after response.] has been suppressed 132 times.
```

The Worker creates a separate batch for each combination of resolved table and mapping reference. If your logs resolve to many distinct tables and mapping references, the Worker sends many small requests at the same time to ADX. Depending on the size of your cluster, ADX might throttle these requests.

As long as your ADX cluster remains available, throttled requests are retried, so data loss is unlikely. However, high rates of throttling can cause:

- A large drop in pipeline throughput, which is the number of logs that pass through the pipeline per second.
- High buffer utilization. Logs waiting to be sent fill the destination buffer, and the backpressure propagates to the source. When the source buffer is full, push-based sources, such as the HTTP Server and Datadog Agent sources, reject new logs. Pull-based sources stop pulling new logs.

If you expect your pipeline to send logs to a large number of tables:

- [Scale your ADX cluster][21] to handle the volume of requests.
- Monitor your source and [destination buffer metrics][22] to make sure the buffers don't fill up, which could lead to logs getting rejected at the source.

## Health metrics

See [Destination buffer metrics][22] for more information on metrics emitted by all destinations. To filter or group by Azure Data Explorer destination metrics, use the tag `component_type:azure_data_explorer`.

## How the destination works

### Ingestion modes

The Azure Data Explorer destination supports two ingestion modes: [streaming](#streaming-ingestion) and [queued](#queued-ingestion). In both modes, the Worker considers a batch delivered when ADX accepts the request, not when the logs are ingested. A delivered batch doesn't mean the logs were successfully ingested or are queryable. Use ADX metrics to monitor the status of ingestion. See [Kusto.Ingest ingestion status reporting][23] for more information.

#### Streaming ingestion

Streaming ingestion is the default mode. Use it when you need low latency between ingestion and query. The Worker sends each batch of logs directly to the ADX cluster endpoint. Streaming ingestion must be enabled on your cluster and on the target tables or database. See [Configure streaming ingestion on your Azure Data Explorer cluster][5] for more information.

#### Queued ingestion

Use queued ingestion if the stream of data into each table is more than 4 GB per hour. For each batch of logs, the Worker compresses the batch and uploads it to Azure Blob Storage. The Worker then submits an ingestion request to the ADX data ingestion endpoint. See [Azure Data Explorer data ingestion overview][24] for more information.

The Worker considers a batch delivered after the batch is uploaded to Azure Blob Storage and the ingestion request is submitted. Logs sent with queued ingestion can take about 5 minutes to become queryable.

### Event batching

A batch of logs is flushed when one of these parameters is met. Batching is also configurable for this destination. See [Destinations event batching][25] for more information.

| Ingestion mode | Maximum Events | Maximum Size (MB) | Timeout (seconds) |
|----------------|----------------|-------------------|-------------------|
| Streaming      | 1,000          | 2                 | 1                 |
| Queued         | None           | 100               | 10                |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/data-explorer/data-explorer-overview
[2]: https://learn.microsoft.com/en-us/azure/data-explorer/create-cluster-and-database#create-a-cluster
[3]: https://learn.microsoft.com/en-us/azure/data-explorer/create-cluster-and-database#create-a-database
[4]: https://learn.microsoft.com/en-us/azure/data-explorer/create-table-wizard
[5]: https://learn.microsoft.com/en-us/azure/data-explorer/ingest-data-streaming
[6]: https://learn.microsoft.com/en-us/kusto/management/streaming-ingestion-policy?view=azure-data-explorer
[7]: https://learn.microsoft.com/en-us/kusto/management/mappings?view=azure-data-explorer
[8]: https://learn.microsoft.com/en-us/kusto/access-control/role-based-access-control?view=azure-data-explorer
[9]: /observability_pipelines/configuration/set_up_pipelines/
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /observability_pipelines/destinations/#template-syntax
[14]: https://learn.microsoft.com/en-us/kusto/management/mappings?view=azure-data-explorer#mapping-with-ingestionmappingreference
[15]: https://learn.microsoft.com/en-us/azure/data-explorer/ingest-data-streaming?tabs=azure-portal%2Ccsharp#performance-and-operational-considerations
[16]: https://learn.microsoft.com/en-us/kusto/management/update-policy?view=azure-data-explorer
[17]: https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli
[18]: https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals
[19]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview
[20]: https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview
[21]: https://learn.microsoft.com/en-us/azure/data-explorer/manage-cluster-horizontal-scaling
[22]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/?tab=destinations#component-metrics
[23]: https://learn.microsoft.com/en-us/kusto/api/netfx/kusto-ingest-client-status?view=microsoft-fabric
[24]: https://learn.microsoft.com/en-us/azure/data-explorer/ingest-data-overview
[25]: /observability_pipelines/destinations/#event-batching
