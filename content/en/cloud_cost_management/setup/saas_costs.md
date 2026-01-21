---
title: SaaS Cost Integrations
is_beta: true
private: true
disable_toc: false
aliases:
- /cloud_cost_management/saas_costs
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/setup/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/setup/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/setup/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/setup/oracle"
  tag: "Documentation"
  text: "Gain insights into your Oracle bill"
- link: "/cloud_cost_management/setup/custom"
  tag: "Documentation"
  text: "Gain insights into your custom costs"
- link: "https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/"
  tag: "Blog"
  text: "Quickly and comprehensively analyze the cloud and SaaS costs behind your services"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
SaaS Cost Integrations are in Preview.
{{< /callout >}}

## Overview

SaaS Cost Integrations allow you to send cost data **directly from your providers** by configuring the accounts associated with your cloud cost data in Datadog.

{{< partial name="cloud_cost/cost-integrations.html" >}}

</br>

If your provider is not supported, use [Custom Costs][1] to upload any cost data source to Datadog and understand the total cost of your services. Only SaaS costs in USD are supported at this time.

## Setup

To use SaaS Cost Integrations, you must configure [Cloud Cost Management][2] for AWS, Azure, Google Cloud, or Oracle Cloud.

See the respective documentation for your cloud provider:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

### Configure your SaaS accounts

Navigate to [**Cloud Cost** > **Settings**, select **Accounts**][8] and then click **Configure** on a provider to collect cost data.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Add your accounts with AWS, Azure, Google Cloud to collect cost data. You can also add your accounts for Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, Twilio, and GitHub" style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. Find your [Snowflake account URL][102].
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="The account menu with the copy account URL option selected in the Snowflake UI" style="width:100%;" >}}
2. Navigate to the [Snowflake integration tile][101] in Datadog and click **Add Snowflake Account**.
3. Enter your Snowflake account URL in the `Account URL` field. For example: `https://xyz12345.us-east-1.snowflakecomputing.com`.
4. Under the **Connect your Snowflake account** section, click the toggle to enable Snowflake in Cloud Cost Management.
5. Enter your Snowflake user name in the `User Name` field.
6. Follow step 4 of the [Snowflake integration][103] page to create a Datadog-specific role and user to monitor Snowflake.
7. Follow step 5 of the [Snowflake integration][103] page to configure the key-value pair authentication.
8. Click **Save**.

Your Snowflake cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

**Snowflake query tags**

[Snowflake's query tags][105] are powerful metadata strings that can be associated with queries. The [Snowflake Cost Management integration][101] ingests [JSON parsable][106] query tags present in a comma-separated allowlist found in the Snowflake integration tile.

For example, if an organization wishes to group its Snowflake compute costs by the `team` and `application` dimensions, it may choose to tag its Snowflake queries for a specific team's application in the following manner:
```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="Group costs by team and application query tags." style="width:100%" >}}

As a result, the costs of all queries executed with the `team` and `application` query tags are attributable to those concepts.

To use query tags within cost management, ensure the following:

- The `query_tag` string must be JSON parsable. Specifically, this means that the string is processable by the native `PARSE_JSON` function.

- An allowlist of keys must be provided in the Snowflake integration tile. These keys map to the first layer of the JSON-formatted `query_tag` field. This allowlist appears in the form of a comma-separated list of strings for example: `tag_1,tag_2,tag_3`. Ensure that strings contain only alphanumeric characters, underscores, hyphens, and periods. You can enter this information into the Snowflake tile, under **Resources Collected -> Cloud Cost Management -> Collected Query Tags**.

**Note**: Select your query tags with data magnitude in mind. Appropriate query tags are ones that have low to medium group cardinality (for example: team, user, service). Selecting a query tag with high group cardinality (such as unique UUID associated with job executions) can result in bottlenecking issues for both data ingestion and frontend rendering.

**Snowflake CCM object tags**

Object tags are user-defined strings that you can attach to Snowflake objects for enhanced auditability and cost analysis. For example, to track costs by team, tag your warehouses with the respective teams that use them.

All object tag configuration is done within [Snowflake][104].

Notes:
- **Tag Inheritance**: Snowflake objects adhere to a hierarchical structure, and the CCM integration considers inherited tags when submitting cost data.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Integrate with Snowflake to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Navigate to the [Databricks integration tile][101] in Datadog and click **Configure**.
2. Enter the workspace name, url, client ID, and client secret corresponding to your Databricks service principal.
3. Under the **Select products to set up integration** section, click the toggle for each account to enable Databricks `Cloud Cost Management`.
4. Enter a `System Tables SQL Warehouse ID` corresponding to your Databricks instance's warehouse to query for system table billing data.
5. Click **Save Databricks Workspace**.

Your service principal requires read access to the [system tables](https://docs.databricks.com/aws/en/admin/system-tables/) within Unity Catalog.
```sql
GRANT USE CATALOG ON CATALOG system TO <service_principal>;
GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
GRANT SELECT ON CATALOG system TO <service_principal>;
```

Your Databricks cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Integrate with Databricks to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

**IMPORTANT**: An **admin-scoped API key is required** to collect OpenAI cost data for Cloud Cost Management. Project-scoped API keys cannot collect cost data.

1. Create an [admin API key][103] in your OpenAI account settings:
   - Log in to your [OpenAI Account][104].
   - Navigate to the [Admin Keys page][105] or go to **API keys** under **Organization settings** and select the **Admin keys** tab.
   - Click **Create a new secret key** and copy the created admin API key.
2. Navigate to the [OpenAI integration tile][102] in Datadog and click **Add Account**.
3. Enter your OpenAI account name, input your admin API key, and optionally, specify tags.
4. Under the **Resources** section, click the toggle for each account to enable `OpenAI Billing Usage Data Collection`.
5. Click **Save**.

Your OpenAI cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Integrate with OpenAI to collect cost data." style="width:100%" >}}

[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys
[104]: https://platform.openai.com/
[105]: https://platform.openai.com/settings/organization/admin-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. Generate an Admin API key

Begin by getting an [Admin API key](https://docs.anthropic.com/en/api/administration-api) from Anthropic. This key allows access to usage and cost reports across your organization.

1. Navigate to your organization's settings or reach out to your Anthropic account admin to create a new Admin API key.
2. Copy the API key to a secure location.

### 2. Configure the Datadog integration

1. In Datadog, go to [**Integrations > Anthropic Usage and Costs**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs).
2. On the **Configure** tab, under **Account details**, paste in the **Admin API Key** from Anthropic.
3. Click **Save**.

After you save your configuration, Datadog begins polling Anthropic usage and cost endpoints using this key, and populates metrics in your environment.

{{% /tab %}}

{{% tab "GitHub" %}}

1. Create a personal authorization token (classic), with the `manage_billing:enterprise` and `read:org` scopes on the [Personal Access Tokens][109] page in GitHub.
2. Navigate to the Datadog [GitHub Costs tile][108].
3. Click **Add New**.
4. Enter an account name, your personal access token, and your enterprise name (in `enterprise-name` format), as well as any appropriate tags.
5. Click the checkmark button to save this account.

Your GitHub cost data for the past 15 months can be accessed in Cloud Cost Management within 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="Integrate with GitHub to collect cost data." style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Create or acquire an API key with the [billing admin][102] role in Confluent Cloud.
2. Navigate to the [Confluent Cloud integration tile][101] in Datadog and click **Add Account**.
3. Enter your Confluent Cloud account name, API key, API secret, and optionally, specify tags.
4. Under the **Resources** section, click the toggle for `Collect cost data to view in Cloud Cost Management`.
5. Click **Save**.

Your Confluent Cloud cost data becomes available in Cloud Cost Management 24 hours after setup. This data automatically includes 12 months of history, the maximum provided by the Confluent billing API. Over the next three months, the data gradually expands to cover 15 months of history. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

If you wish to collect cluster-level tags or business metadata tags for your costs, you can add a Schema Registry API key and secret. Please look into [Schema Management on Confluent Cloud][103] for more information.

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Integrate with Confluent to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Create an API token][101] in MongoDB with `Organizational Billing Viewer` permissions, and add `Organizational Read Only` permissions for cluster resource tags.
2. Navigate to the [MongoDB Cost Management integration tile][102] in Datadog and click **Add New**.
3. Enter your MongoDB account name, public key, private key, organizational ID, and optionally, specify tags.
4. Click **Save**.

Your MongoDB cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Integrate with MongoDB to collect cost data." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Go to the [API Key][102] section in your Elastic Cloud organization's settings.
2. Click **Create New Key**.
3. Choose a **Name** and **Expiration Date** for your API key.
4. Select the **Billing Admin** role.
5. Click **Create Key** to generate the key.
6. Go to the [Elastic Cloud integration tile][101] in Datadog
7. Click **Add Account**.
8. Enter your **Elastic Cloud Organization ID** and **Billing API Key** in the account table.

Your Elastic Cloud cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Integrate with Elastic Cloud to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Create an API token with at least the `"global:read"` scope and `"Billing"` role on the [Personal API tokens][101] page in Fastly.
2. Navigate to the [Fastly cost management integration tile][102] in Datadog and click **Add New**.
3. Enter your Fastly account name and API token.
4. Click **Save**.

Your Fastly cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Integrate with Fastly to collect cost data." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Navigate to the [Twilio integration tile][101] in Datadog and click **Add Account**.
2. Under the **Resources** section, click the toggle for each account to enable `Twilio in Cloud Cost Management`.
3. Enter an `Account SID` for your Twilio account.
4. Click **Save**.

Your Twilio cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Integrate with Twilio to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Data Collected

You can view cost data on the [**Cloud Cost Explorer** page][3], the [Cloud Cost Tag Explorer][4], and in [dashboards][5], [notebooks][6], or [monitors][7]. You can also combine these cost metrics with other [cloud cost metrics][2] or observability metrics.

The following table contains a non-exhaustive list of out-of-the-box tags associated with each SaaS Cost integration.

{{< tabs >}}
{{% tab "Snowflake" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Tag Name</th>
      <th>Tag Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_locator</code></td>
      <td>Locator for the account where the usage was consumed.</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>Name of the account where the usage was consumed.</td>
    </tr>
    <tr>
      <td><code>balance_source</code></td>
      <td>Source of the funds used to pay for the daily usage. The source can be one of the following:<br>- <b>capacity</b>: Usage paid with credits remaining on an organization's capacity commitment.<br>- <b>rollover</b>: Usage paid with rollover credits. When an organization renews a capacity commitment, unused credits are added to the balance of the new contract as rollover credits.<br>- <b>free usage</b>: Usage covered by the free credits provided to the organization.<br>- <b>overage</b>: Usage that was paid at on-demand pricing, which occurs when an organization has exhausted its capacity, rollover, and free credits.<br>- <b>rebate</b>: Usage covered by the credits awarded to the organization when it shared data with another organization.</td>
    </tr>
    <tr>
      <td><code>billing_type</code></td>
      <td>Indicates what is being charged or credited. Possible billing types include:<br>- <b>consumption</b>: Usage associated with compute credits, storage costs, and data transfer costs.<br>- <b>rebate</b>: Usage covered by the credits awarded to the organization when it shared data with another organization.<br>- <b>priority support</b>: Charges for priority support services. This charge is associated with a stipulation in a contract, not with an account.<br>- <b>vps_deployment_fee</b>: Charges for a Virtual Private Snowflake deployment.<br>- <b>support_credit</b>: Snowflake Support credited the account to reverse charges attributed to an issue in Snowflake.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>A description of the cost type associated with distinct line items. Descriptions differ for each cost type, represented by the <code>servicename</code> tag.</td>
    </tr>
    <tr>
      <td><code>contract_number</code></td>
      <td>Snowflake contract number for the organization.</td>
    </tr>
    <tr>
      <td><code>database_name</code></td>
      <td>Name of the database in which the query was executed (if applicable). Only found for <b>query attribution</b> costs.</td>
    </tr>
    <tr>
      <td><code>organization_name</code></td>
      <td>Name of the organization.</td>
    </tr>
    <tr>
      <td><code>query_hash</code></td>
      <td>Unique hash representing a parameterized version of the query for attribution purposes. Only found for <b>query attribution</b> costs.</td>
    </tr>
    <tr>
      <td><code>query_hash_version</code></td>
      <td>Version of the Snowflake query hash algorithm used to generate <code>query_hash</code>. Only found for <b>query attribution</b> costs.</td>
    </tr>
    <tr>
      <td><code>rating_type</code></td>
      <td>Indicates how the usage in the record is rated, or priced. Possible values include:<br>- <b>compute</b><br>- <b>data_transfer</b><br>- <b>storage</b><br>- <b>Other</b></td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Name of the region where the account is located.</td>
    </tr>
    <tr>
      <td><code>service_level</code></td>
      <td>Service level (edition) of the Snowflake account (Standard, Enterprise, or Business Critical).</td>
    </tr>
    <tr>
      <td><code>servicename</code></td>
      <td>Type of usage. Possible service types include:<br>- <b>automatic_clustering</b>: Refer to Automatic Clustering.<br>- <b>data_transfer</b>: Refer to Understanding data transfer cost.<br>- <b>logging</b>: Refer to Logging and Tracing Overview.<br>- <b>materialized_view</b>: Refer to Working with Materialized Views.<br>- <b>replication</b>: Refer to Introduction to replication and failover across multiple accounts.<br>- <b>query_acceleration</b>: Refer to Using the Query Acceleration Service.<br>- <b>search_optimization</b>: Refer to Search Optimization Service.<br>- <b>serverless_task</b>: Refer to Introduction to tasks.<br>- <b>snowpipe</b>: Refer to Snowpipe.<br>- <b>snowpipe_streaming</b>: Refer to Snowpipe Streaming.<br>- <b>storage</b>: Refer to Understanding storage cost.<br>- <b>warehouse_metering_query_attribution</b>: Refer to Virtual warehouse credit usage of queries with an execution time of 100ms or greater. Does not indicate usage of serverless or cloud services compute.<br>- <b>warehouse_metering_query_attribution</b>: Refer to Virtual warehouse credit usage of queries with execution time of 100ms or less, as well as idle warehouse time. Does not indicate usage of serverless or cloud services compute.</td>
    </tr>
    <tr>
      <td><code>user_name</code></td>
      <td>Name of the user or service account associated with the query.</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>Identifier for the warehouse generating the cost.</td>
    </tr>
    <tr>
      <td><code>warehouse_name</code></td>
      <td>Name of the warehouse associated with this usage.</td>
    </tr>
    <tr>
      <td><code>warehouse_size</code></td>
      <td>Size of the warehouse (for example, Large, Medium).</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Databricks" %}}

**Note**: The Databricks cost integration calculates costs using list prices and usage data. It does not reflect any negotiated or discounted rates.

<table>
  <thead>
    <tr>
      <th style="width: 220px;">Tag Name</th>
      <th>Tag Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>ID of the account this report was generated for.</td>
    </tr>
    <tr>
      <td><code>billing_origin_product</code></td>
      <td>Product or feature originating the billing event (for example, JOBS, CLUSTERS).</td>
    </tr>
    <tr>
      <td><code>central_clean_room_id</code></td>
      <td>ID of the central clean room associated with the workload (if applicable).</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>A combination of the cloud type and name of the associated SKU (for example, AWS - PREMIUM_ALL_PURPOSE_COMPUTE).</td>
    </tr>
    <tr>
      <td><code>cloud</code></td>
      <td>Cloud this usage is relevant for. Possible values are AWS, AZURE, and GCP.</td>
    </tr>
    <tr>
      <td><code>cluster_id</code></td>
      <td>ID of the cluster associated with this usage.</td>
    </tr>
    <tr>
      <td><code>custom_tags</code></td>
      <td>Custom tags applied to the usage, usually as key-value pairs for additional metadata or categorization.</td>
    </tr>
    <tr>
      <td><code>destination_region</code></td>
      <td>Region where the workload is directed (if applicable).</td>
    </tr>
    <tr>
      <td><code>dlt_maintenance_id</code></td>
      <td>Maintenance ID for Delta Live Tables (if applicable).</td>
    </tr>
    <tr>
      <td><code>dlt_pipeline_id</code></td>
      <td>ID of the Delta Live Tables pipeline (if applicable).</td>
    </tr>
    <tr>
      <td><code>dlt_tier</code></td>
      <td>Tier of Delta Live Tables service (if applicable).</td>
    </tr>
    <tr>
      <td><code>dlt_update_id</code></td>
      <td>Delta Live Table update ID associated with this usage (if applicable).</td>
    </tr>
    <tr>
      <td><code>endpoint_id</code></td>
      <td>ID of the endpoint for SQL-based or serving-related usage (if applicable).</td>
    </tr>
    <tr>
      <td><code>endpoint_name</code></td>
      <td>Name of the SQL or serving endpoint (if applicable).</td>
    </tr>
    <tr>
      <td><code>instance_pool_id</code></td>
      <td>ID of the instance pool used (if applicable).</td>
    </tr>
    <tr>
      <td><code>is_photon</code></td>
      <td>Indicates whether Photon processing was used (<code>true</code> or <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>is_serverless</code></td>
      <td>Indicates if the usage pertains to a serverless compute resource (<code>true</code> or <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>job_id</code></td>
      <td>Unique identifier for the job in Databricks.</td>
    </tr>
    <tr>
      <td><code>job_name</code></td>
      <td>Name of the job in Databricks (if applicable).</td>
    </tr>
    <tr>
      <td><code>job_run_id</code></td>
      <td>Identifier for the specific job run (if applicable).</td>
    </tr>
    <tr>
      <td><code>jobs_tier</code></td>
      <td>Tier of the job, such as <code>CLASSIC</code> or <code>PREMIUM</code>.</td>
    </tr>
    <tr>
      <td><code>networking</code></td>
      <td>Type of networking used for this job, if specified.</td>
    </tr>
    <tr>
      <td><code>node_type</code></td>
      <td>Type of node used in this billing record (for example, m5d.large).</td>
    </tr>
    <tr>
      <td><code>notebook_id</code></td>
      <td>ID of the notebook used in this billing record (if applicable).</td>
    </tr>
    <tr>
      <td><code>notebook_path</code></td>
      <td>Path to the notebook in Databricks (if applicable).</td>
    </tr>
    <tr>
      <td><code>record_id</code></td>
      <td>Unique ID for this record.</td>
    </tr>
    <tr>
      <td><code>run_name</code></td>
      <td>Name of the current job or workflow run (if applicable).</td>
    </tr>
    <tr>
      <td><code>serving_type</code></td>
      <td>Type of serving model used, if applicable (for example, Model Serving).</td>
    </tr>
    <tr>
      <td><code>source_region</code></td>
      <td>Originating region for this billing record (if applicable).</td>
    </tr>
    <tr>
      <td><code>sql_tier</code></td>
      <td>SQL tier associated with the usage (if applicable).</td>
    </tr>
    <tr>
      <td><code>usage_metadata</code></td>
      <td>Metadata related to the usage, which might include details like usage type, service category, or other relevant information.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Type of usage being billed (for example, COMPUTE_TIME).</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>ID of the SQL warehouse (if applicable).</td>
    </tr>
    <tr>
      <td><code>workspace_id</code></td>
      <td>ID of the Workspace this usage was associated with.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "OpenAI" %}}

| Tag Name | Tag Description |
|---|---|
| `charge_description` | The name of the model whose costs are associated with the charge. |
| `organization_id` | The unique identifier of the organization. |
| `organization_name` | The name of the organization. |
| `project_id` | The unique identifier of the project. |
| `project_name` | The name of the project. |

{{% /tab %}}

{{% tab "Anthropic" %}}

| Tag Name | Tag Description |
|---|---|
| `workspace_id` | The unique identifier of the Anthropic workspace. |
| `workspace_name` | A tag-normalized version of the workspace name. |
| `display_workspace_name` | The unaltered name of the workspace. |
| `org_id` | The unique identifier of the Anthropic organization. |
| `org_name` | A tag-normalized version of the Anthropic organization's name. |
| `display_org_name` | The unaltered name of the organization. |
| `model_id` | The canonical Anthropic model identifier (for example, `claude-3-opus-20240229`). |
| `model` | An alias for `model_id`, provided for compatibility and consistency with usage and metrics. |
| `model_name` | The friendly name of the model (for example, `Claude 3 Opus`). |
| `service_tier` | The Anthropic service plan or tier associated with the usage (for example, `standard`, `pro`, `enterprise`). |
| `token_type` | The category of tokens consumed.|
| `context_window` | The context window size for the tokens (for example, `tier_0-200k`). |

{{% /tab %}}

{{% tab "GitHub" %}}

**Note**: The GitHub cost integration estimates costs based on list prices and usage data, and includes discount values when available. It does not account for any negotiated rates.

| Tag Name | Tag Description |
|---|---|
| `enterprise_name` | Alphanumeric string identifying the GitHub enterprise account. |
| `charge_description` | The description of the charge. |
| `product` | The product of usage, for example "actions" or "storage". |
| `organization_name` | The GitHub organization. |
| `repository_name` | The GitHub repository. |
| `billing_currency` | The billing currency, for example "USD". |
| `discount` | If the cost item is a discount. |

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Tag Name</th>
      <th>Tag Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>The subtype of the cost (for example, KAFKA_NETWORK_WRITE).</td>
    </tr>
    <tr>
      <td><code>environment_id</code></td>
      <td>The unique identifier for the environment.</td>
    </tr>
    <tr>
      <td><code>network_access_type</code></td>
      <td>Network access type for the cluster. Possible values are <code>INTERNET</code>, <code>TRANSIT_GATEWAY</code>, <code>PRIVATE_LINK</code>, and <code>PEERED_VPC</code>.</td>
    </tr>
    <tr>
      <td><code>product</code></td>
      <td>Product name. Possible values include <code>KAFKA</code>, <code>CONNECT</code>, <code>KSQL</code>, <code>AUDIT_LOG</code>, <code>STREAM_GOVERNANCE</code>, <code>CLUSTER_LINK</code>, <code>CUSTOM_CONNECT</code>, <code>FLINK</code>, <code>SUPPORT_CLOUD_BASIC</code>, <code>SUPPORT_CLOUD_DEVELOPER</code>, <code>SUPPORT_CLOUD_BUSINESS</code>, and <code>SUPPORT_CLOUD_PREMIER</code>.</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>The unique identifier of the Confluent resource.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>The name of the Confluent resource.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| Tag Name | Tag Description |
|---|---|
| `charge_description` | The SKU of a charge. |
| `kind` | The type of resource. |
| `name` | The unique identifier of the Elastic Cloud resource. |
| `price_per_hour` | The cost of the Elastic Cloud resource per hour. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| Tag Name | Tag Description |
|---|---|
| `charge_description` | The description of a charge. |
| `cluster_name` | The name of the cluster that incurred the charge. |
| `group_id` | ID of the project with which the line item is associated. |
| `invoice_id` | The unique identifier of the invoice. |
| `mongo_org_id` | MongoDB organization ID. |
| `replica_set_name` | Name of the replica set with which the line item is associated. |
| `resource_tags` | Arbitrary tags on clusters set by users, usually as key-value pairs. |
| `status` | State of the payment. |

{{% /tab %}}

{{% tab "Fastly" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Tag Name</th>
      <th>Tag Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>The description of the charge.</td>
    </tr>
    <tr>
      <td><code>credit_coupon_code</code></td>
      <td>Code of any coupon or credit applied to this cost entry (if available).</td>
    </tr>
    <tr>
      <td><code>plan_name</code></td>
      <td>Name of the plan under which this service falls, often matching "product_line".</td>
    </tr>
    <tr>
      <td><code>product_name</code></td>
      <td>Name of the specific product being billed (for example, "North America Bandwidth").</td>
    </tr>
    <tr>
      <td><code>product_group</code></td>
      <td>Group or category of the product, such as "Full Site Delivery".</td>
    </tr>
    <tr>
      <td><code>product_line</code></td>
      <td>Line of products to which this item belongs, for example, "Network Services".</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Region where the service usage occurred (for example, "North America").</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>Name of the service associated with this cost entry, often matching the <code>product_name</code>.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Type of usage being billed (for example, "Bandwidth").</td>
    </tr>
    <tr>
      <td><code>usage_type_cd</code></td>
      <td>Code or label representing the type of usage, such as "North America Bandwidth".</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Tag Name</th>
      <th>Tag Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_sid</code></td>
      <td>Alphanumeric string identifying the Twilio account.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>The category of usage. For more information, see <a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">Usage Categories</a>.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>The description of the charge.</td>
    </tr>
    <tr>
      <td><code>count_unit</code></td>
      <td>The units in which count is measured, such as calls for calls or messages for SMS.</td>
    </tr>
    <tr>
      <td><code>usage_unit</code></td>
      <td>The units in which usage is measured, such as minutes for calls or messages for SMS.</td>
    </tr>
  </tbody>
</table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/setup/custom
[2]: /cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /dashboards
[6]: /notebooks
[7]: /monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts
