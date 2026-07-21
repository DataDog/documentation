---
title: Databricks (Zerobus) Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
The Databricks (Zerobus) destination is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' Databricks (Zerobus) destination to send logs to a Databricks Unity Catalog table. The destination streams logs to the [Zerobus Ingest API][1] and authenticates to Databricks with an OAuth service principal.

## Prerequisites

Before you configure the Databricks (Zerobus) destination, you must:

- [Set up a Unity Catalog schema and table](#set-up-a-schema-and-table) that the Observability Pipelines Worker writes logs to.
- [Set up a service principal](#set-up-a-service-principal) that the Worker uses to authenticate to Databricks. The service principal needs permission to read and write to the table.

### Set up a schema and table

The SQL examples in this section use the following placeholders:

| Placeholder               | Description                                | Example                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | The user who creates the schema and table. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | The Unity Catalog name.                    | `main`                     |
| `<SCHEMA_NAME>`           | The schema name.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | The table name.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (Optional) The managed location URI.       | `s3://your-bucket/managed` |

**Note**: The `GRANT` commands must be run by a Databricks workspace admin.

In the Databricks workspace:

1. If you're not a Databricks workspace admin, have an admin run the following command to grant your user permission to create a schema:
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. Create the schema:
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. If you're not an admin user, have an admin run the following command to grant your user permission to create a table on the schema:
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Run the following command to create the table that Observability Pipelines writes log data to:
    ```sql
    CREATE TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```
    - See Databricks' [Create a Unity Catalog Managed Table][3] documentation for more information.

The fully qualified table name is `catalog.schema.table`, for example `main.obs_pipelines.apache_common_logs`. This is the value you enter for {{< ui >}}Table Name{{< /ui >}} when you set up the Observability Pipelines Databricks destination.

### Set up a service principal

The Databricks [Zerobus Ingest API][1] uses OAuth authentication. When you create the service principal, the OAuth client secret is generated and the OAuth client ID is the service principal's UUID.

To create a service principal:

1. In your Databricks workspace, navigate to **User Settings** > **Identity and access** > **Service principals**.
1. Click **Add service principal**.
1. After the service principal is created, generate an OAuth secret for it.
    - Take note of the service principal's **Application ID** (client ID) and the OAuth client secret. You need both of them when you configure the Observability Pipelines Databricks destination.
1. Run this SQL in Databricks to grant the service principal access to the catalog, schema, and table. Replace `<SERVICE_PRINCIPAL_UUID>` with the service principal's application ID from the previous step:
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

See Databricks' [Add service principals to your account][4] and [Grant permissions on an object][5] documentation for more information.

## Setup

Configure the Databricks (Zerobus) destination when you [set up a pipeline][6]. You can set up a pipeline in the [UI][7], using the [API][8], or with [Terraform][9]. The steps in this section are configured in the UI.

**Note**: Log fields that are not present in the table schema are dropped. For example, if a log has the fields `id`, `name`, and `host`, and the table schema only contains the columns `name` and `host`, then the `id` field is dropped and not written to the table.

After you select the Databricks (Zerobus) destination in the pipeline UI:

<div class="alert alert-warning">Databricks (Zerobus) doesn't convert timestamps in string format to Databricks' <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"><code>TIMESTAMP</code> type</a>. If your table uses a timestamp column, see <a href="#convert-string-timestamps-to-timestamp-format">Convert string timestamps to timestamp format</a> for more information.</div>

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the OAuth client secret. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Enter the {{< ui >}}Ingestion Endpoint{{< /ui >}} for your Databricks workspace, such as `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. The Worker sends logs to this endpoint.
1. Enter the {{< ui >}}Table Name{{< /ui >}} in the format `catalog.schema.table`, such as `main.obs_pipelines.apache_common_logs`.
1. Enter the {{< ui >}}Unity Catalog Endpoint{{< /ui >}} for your Databricks workspace, such as `https://<workspace>.cloud.databricks.com`. The Worker uses this endpoint to read the table's schema.
1. In the {{< ui >}}Auth - Client ID{{< /ui >}} field, enter the application ID of the service principal, such as `abcdefgh-1234-5678-abcd-ef0123456789`.
1. In the {{< ui >}}Auth - Client Secret{{< /ui >}} field, enter the identifier for your OAuth client secret. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

#### Buffering

{{% observability_pipelines/destination_buffer %}}

### Convert string timestamps to timestamp format

If your logs have timestamps in string format and your Databricks table has a timestamp column declared as a [`TIMESTAMP` type][11], you must convert the string to timestamp format before sending logs to the Databricks (Zerobus) destination. Databricks (Zerobus) can only convert the timestamp format to its `TIMESTAMP` type.

If you do not convert the string timestamp, the Worker throws an error similar to:

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

To convert timestamps in string format to timestamp format:

1. Add a [Custom Processor][12] to your pipeline.
1. Add a function with the following custom script:
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Databricks OAuth client secret identifier:
    - References the OAuth client secret for the service principal the Observability Pipelines Worker uses to authenticate to Databricks.
    - The default identifier is `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Metrics

For [component metrics][14] and [destination buffer metrics][15] emitted by all destinations, see the [Pipelines Usage Metrics][16] documentation. To filter or group by Databricks destination metrics, use the tag `component_type:databricks_zerobus`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][10] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 10                | 1                   |

[1]: https://docs.databricks.com/aws/en/ingestion/zerobus-overview
[2]: https://docs.databricks.com/aws/en/schemas/create-schema
[3]: https://docs.databricks.com/aws/en/tables/managed#create-a-managed-table
[4]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account
[5]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/?language=Catalog%C2%A0Explorer#-grant-permissions-on-an-object
[6]: /observability_pipelines/configuration/set_up_pipelines/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /observability_pipelines/destinations/#event-batching
[11]: https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type
[12]: /observability_pipelines/processors/custom_processor#setup
[13]: /observability_pipelines/processors/custom_processor/#parse_timestamp
[14]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[15]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[16]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
