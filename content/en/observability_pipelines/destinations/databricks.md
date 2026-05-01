---
title: Databricks (Zerobus) Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Databricks (Zerobus) destination to send logs to a Databricks Unity Catalog table. The destination streams logs to the [Zerobus][5] streaming ingestion API and authenticates to Databricks with an OAuth service principal.

## Prerequisites

Before you configure the Databricks (Zerobus) destination, set up the following in your Databricks workspace:

- A Unity Catalog schema and table that the Observability Pipelines Worker writes logs to.
- A service principal that the Worker uses to authenticate to Databricks. The service principal needs permission to read and write to the table.

The setup steps in this section uses SQL. See the [Databricks documentation][6] for more information.

### Set up the schema and table

The SQL examples in this section use the following placeholders:

| Placeholder               | Description                                | Example                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<ADMIN_USER>`            | The user who creates the schema and table. |                            |
| `<CATALOG_NAME>`          | The Unity Catalog name.                    | `main`                     |
| `<SCHEMA_NAME>`           | The schema name.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | The table name.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | The managed location URI.                  | `s3://your-bucket/managed` |

**Note**: The `GRANT` commands must be run by a Databricks workspace admin.

1. Grant your user permissions to create a schema:
    ```sql
    GRANT CREATE SCHEMA ON CATALOG `<CATALOG_NAME>` TO `<ADMIN_USER>`;
    ```

1. Create the schema:
    ```sql
    CREATE SCHEMA IF NOT EXISTS `<CATALOG_NAME>`.`<SCHEMA_NAME>`
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    **Note**: `MANAGED LOCATION` is optional. See the [Databricks documentation][6] for other options.

1. Grant your user permissions to create a table on the schema:
    ```sql
    GRANT CREATE TABLE ON SCHEMA `<CATALOG_NAME>`.`<SCHEMA_NAME>` TO `<ADMIN_USER>`;
    ```

1. Create the table that Observability Pipelines sends log data to:
    ```sql
    CREATE TABLE `<CATALOG_NAME>`.`<SCHEMA_NAME>`.`<TABLE_NAME>` (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```

The fully qualified table name is `catalog.schema.table`, for example `main.obs_pipelines.apache_common_logs`. This is the value you enter for **Table Name** when you set up the Observability Pipelines Databricks destination.

### Set up the service principal

The Databricks (Zerobus) API uses OAuth authentication. The OAuth client ID is the service principal's UUID, and the OAuth client secret is generated when you create the service principal.

To create a service principal:
1. In your Databricks workspace, navigate to **User Settings** > **Identity and access** > **Service principals**.
1. Click **Add service principal**.
1. After the service principal is created, generate an OAuth secret for it. Take note of the service principal's **Application ID** (client ID) and the OAuth client secret. You need both when you configure the Observability Pipelines Databricks destination.

1. Run this SQL in Databricks to grant the service principal access to the catalog, schema, and table. Replace `<SERVICE_PRINCIPAL_UUID>` with the service principal's application ID from the previous step.
    ```sql
    GRANT USE CATALOG ON CATALOG `<CATALOG_NAME>` TO `<SERVICE_PRINCIPAL_UUID>`;
    GRANT USE SCHEMA ON SCHEMA `<CATALOG_NAME>`.`<SCHEMA_NAME>` TO `<SERVICE_PRINCIPAL_UUID>`;
    GRANT SELECT, MODIFY ON TABLE `<CATALOG_NAME>`.`<SCHEMA_NAME>`.`<TABLE_NAME>` TO `<SERVICE_PRINCIPAL_UUID>`;
    ```

## Setup

Configure the Databricks (Zerobus) destination when you [set up a pipeline][2]. You can set up a pipeline in the [UI][1], using the [API][3], or with [Terraform][4]. The steps in this section are configured in the UI.

Log fields that are not present in the table schema are dropped. For example, if a log has the fields `id`, `name`, and `host`, and the table schema only contains the columns `name` and `host`, then the `id` field is dropped and is not written to the table.

After you select the Databricks (Zerobus) destination in the pipeline UI:

<div class="alert alert-danger">Only enter the identifier for the OAuth client secret. Do <b>not</b> enter the actual value.</div>

1. Enter the **Ingestion Endpoint** for your Databricks workspace, such as `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. The Worker streams logs to this endpoint.
1. Enter the **Table Name** in the format `catalog.schema.table`, such as `main.obs_pipelines.apache_common_logs`.
1. Enter the **Unity Catalog Endpoint** for your Databricks workspace, such as `https://<workspace>.cloud.databricks.com`. The Worker uses this endpoint to read the table's schema.
1. For **Auth - Client ID**, enter the application ID of the service principal, such as `abcdefgh-1234-5678-abcd-ef0123456789`.
1. For **Auth - Client Secret**, enter the identifier for your OAuth client secret. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings


#### Buffering

{{% observability_pipelines/destination_buffer %}}

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

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][7] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/configuration/set_up_pipelines/
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.databricks.com/aws/en/ingestion/zerobus
[6]: https://docs.databricks.com/aws/en/schemas/create-schema
[7]: /observability_pipelines/destinations/#event-batching
