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

The following examples use the catalog `main`, the schema `obs_pipelines`, and the table `apache_common_logs`. Replace these values with the names you want to use.

### 1. Grant your admin user permission to create the schema and table

The `GRANT` commands in the following steps must be run by a Databricks workspace admin. Run the following SQL in Databricks to grant your admin user the required permissions, replacing `<ADMIN_USER>` with the user who creates the schema and table:

```sql
GRANT CREATE SCHEMA ON CATALOG main TO `<ADMIN_USER>`;
GRANT CREATE TABLE ON SCHEMA main.obs_pipelines TO `<ADMIN_USER>`;
```

### 2. Create the schema

Run this SQL in Databricks to create the schema.

```sql
CREATE SCHEMA IF NOT EXISTS main.obs_pipelines
MANAGED LOCATION 's3://<YOUR_BUCKET>/managed';
```

**Note**: `MANAGED LOCATION` is optional. See the [Databricks documentation][6] for other options.

### 3. Create the table

Run this SQL in Databricks to create the table that log data is sent to:

```sql
CREATE TABLE main.obs_pipelines.apache_common_logs (
  host STRING,
  message STRING,
  service STRING,
  source_type STRING,
  timestamp TIMESTAMP
);
```

The fully qualified table name (`catalog.schema.table`, for example `main.obs_pipelines.apache_common_logs`) is the value you enter for **Table Name** when you set up the destination.

### 4. Create a service principal

The Databricks (Zerobus) API uses OAuth authentication. The OAuth client ID is the service principal's UUID, and the OAuth client secret is generated when you create the service principal.

To create a service principal:

1. In your Databricks workspace, go to **User Settings** > **Identity and access** > **Service principals**.
1. Click **Add service principal**.
1. After the service principal is created, generate an OAuth secret for it. Take note of the service principal's **Application ID** (client ID) and the OAuth client secret. You need both when you configure the Observability Pipelines Databricks destination.

### 5. Grant the service principal access to the catalog, schema, and table

Run this SQL in Databricks, replacing `<SERVICE_PRINCIPAL_UUID>` with the service principal's application ID from step 4.

```sql
GRANT USE CATALOG ON CATALOG main TO `<SERVICE_PRINCIPAL_UUID>`;
GRANT USE SCHEMA ON SCHEMA main.obs_pipelines TO `<SERVICE_PRINCIPAL_UUID>`;
GRANT SELECT, MODIFY ON TABLE main.obs_pipelines.apache_common_logs TO `<SERVICE_PRINCIPAL_UUID>`;
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
