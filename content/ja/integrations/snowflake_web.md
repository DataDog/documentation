---
app_id: snowflake-web
app_uuid: 49ad5ddd-6cc2-4aa0-bd81-3a5c7186657f
assets:
  dashboards:
    Snowflake-Event-Tables-Overview: assets/dashboards/Snowflake-Event-Tables-Overview_dashboard.json
    Snowflake-Overview: assets/dashboards/Snowflake-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - snowflake.organization.balance.free_usage
      - snowflake.logins.fail.count
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10436
    source_type_name: Snowflake Web
  monitors:
    '[Snowflake] High Error Log Count on Event Tables': assets/monitors/high_volume_event_table_logs_errors.json
    '[Snowflake] High Volume of Queries are Failing': assets/monitors/high_volume_queries_failing.json
    '[Snowflake] Increased Failed Login Attempts': assets/monitors/increased_failed_login_attempts.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- cost management
- data stores
- metrics
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: snowflake_web
integration_id: snowflake-web
integration_title: Snowflake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snowflake_web
public_title: Snowflake
short_description: 長時間実行されるクエリや失敗したクエリを特定し、コストを削減し、セキュリティ上の脅威を見つけ、Snowpark のワークロードを監視します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cost Management
  - Category::Data Stores
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: 長時間実行されるクエリや失敗したクエリを特定し、コストを削減し、セキュリティ上の脅威を見つけ、Snowpark のワークロードを監視します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/
  support: README.md#Support
  title: Snowflake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

<div class="alert alert-info">The new Snowflake integration replaces the Datadog Agent-based Snowflake integration, and offers additional functionality. After setting up the new Snowflake integration, it is recommended to uninstall the Agent-based Snowflake integration to reduce API call volume to Snowflake.</div>

It can be difficult to effectively monitor and optimize Snowflake infrastructure and data retrieval. Issues arise which may lead to inefficient resource utilization, higher costs, and a degraded customer experience. 

With Datadog's Snowflake integration, you can uncover long-running queries to improve performance and reduce costs, identify real time security threats, and monitor your Snowpark workloads. 

After parsing your Snowflake data, Datadog populates the [out-of-the-box overview dashboard][1] with insights across all your collected resources. It also offers recommended monitors to help you get started on alerting on failed Snowpark executions or an abnormal amount of login attempts.

<div class="alert alert-info"><strong>Note</strong>: Metrics are collected with queries to Snowflake. Queries made by the Datadog integration are billable by Snowflake.</div>

## Setup

### Installation

No installation steps are required.

### Configuration

#### Connect your Snowflake account

1. Find your [Snowflake account URL][2]. 

{{< img src="integrations/snowflake/snowflake_account_url.png" alt="The account menu with the copy account URL option selected in the Snowflake UI" popup="true">}}

2. Enable the resources you are interested in collecting: 

##### Account and Organization usage metrics

The table below describes the types of metrics collected and their associated metric prefixes.

| **Type** | **Description** | **Metric prefixes collected**  |  
|------|-------------|-----------------------------|                                                                                            
| **Account usage**      | Storage usage, credit consumption, and query metrics at an account level.<br>_Collected hourly_.              | `snowflake.auto_recluster`<br>`snowflake.billing`<br>`snowflake.data_transfer`<br>`snowflake.logins`<br>`snowflake.pipe`<br>`snowflake.query`<br>`snowflake.replication`<br>`snowflake.storage`<br>`snowflake.storage.database`<br>`snowflake.storage.table` |
| **Organization usage** | Credit consumption, data transfer history, and budget metrics at an organization level.<br>_Collected daily_. | `snowflake.organization` |

##### Logs

The table below describes the types of logs collected and which Snowflake tables are included.

<table>
  <tr>
    <td style="width:10%;"><strong>Type</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Tables required</strong></td>
  </tr>
  <tr>
    <td style="width:10%;">Query history</td>
    <td>History of query executions. Query history logs can be enriched with access history logs to provide more insight into how data is used through queries and its lineage.</td>
    <td><a href="https://docs.snowflake.com/en/sql-reference/account-usage/query_history">SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY</a></td>
  </tr>
  <tr>
    <td style="width:10%;">Security</td>
    <td>Utilize these logs with <a href="https://app.datadoghq.com/security/home">Cloud SIEM</a> to better detect and respond to security threats in your environment.</td>
    <td> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/login_history">SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/sessions">SNOWFLAKE.ACCOUNT_USAGE.SESSIONS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_users">SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/data_transfer_history">SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/stages">SNOWFLAKE.ACCOUNT_USAGE.STAGES</a></td>
  </tr>
  <tr>
    <td style="width:10%;">Event table</td>
    <td>Message and event data generated by your functions and procedures. Requires additional GRANT privileges.</td>
    <td>Your custom <a href="https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-columns">event table</a></td>
  </tr>
</table>

##### Cloud Cost Management

Enable Cloud Cost Management to receive Snowflake cost metrics aggregated from the [SNOWFLAKE.ORGANIZATION_USAGE.USAGE_IN_CURRENCY_DAILY][3] table. You can use these metrics with [Cloud Cost Management][4] to gain additional insight into your cost and usage.

3. Create a Datadog-specific role and user to monitor Snowflake. Execute the series of commands below in your Snowflake environment to create a user accessible for Datadog.

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="true" >}}
-- Create a new role intended to monitor Snowflake usage. The name of the role is customizable.
create role DATADOG;

-- Grant privileges on the SNOWFLAKE database to the new role.
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- Grant usage to your default warehouse to the role DATADOG.
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- Grant ORGANIZATION_BILLING_VIEWER to the new role. Do this if you wish to collect Snowflake cost data.
grant database role SNOWFLAKE.ORGANIZATION_BILLING_VIEWER to role DATADOG;

-- Grant usage on the database, schema, and table of the event table.
grant usage on database <EVENT_TABLE_DATABASE> to role DATADOG:
grant usage on schema <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> to role DATADOG;
grant select on table <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> to role DATADOG:

-- Create a user.
create user <USERNAME>
LOGIN_NAME = <USERNAME>
password = <PASSWORD>
default_warehouse =<WAREHOUSE>
default_role = DATADOG

-- Grant the monitor role to the user.
grant role DATADOG to user <USERNAME>
{{< /code-block >}}

<div class="alert alert-info">
<strong>Notes</strong>:

- By default, this integration monitors the `SNOWFLAKE` database and `ACCOUNT_USAGE` schema. This database is available by default and only viewable by users in the `ACCOUNTADMIN` role or any role granted by the `ACCOUNTADMIN`.  
- To collect organization metrics, the user must have the `ORGADMIN` role.
</div>

4. Configure key-pair authentication. The public key is assigned to the user created earlier, and the private key is uploaded to Datadog, allowing Datadog to connect to your Snowflake account.  
    a. Create and upload a private key following the [Snowflake instructions][5]. Datadog currently only supports unencrypted private keys.
    b. Create a public key following the [Snowflake instructions][6].  
    c. Assign the public key to the user created earlier following the [Snowflake instructions][7].  

<div class="alert alert-info">
Certain IP address prefixes must be allow-listed for Datadog to collect data from your Snowflake account. The list of IP prefixes belonging to Datadog can be found in the <a href="https://ip-ranges.datadoghq.com/">IP Ranges page</a>, and the range to allow can be found under <strong>webhooks</strong>.
</div>

#### Custom metrics

The Snowflake integration supports custom queries to collect custom metrics. Users can write custom SQL queries to extract specific data and view it as metrics and metric tags in Datadog. 

By default, the integration connects to the shared `SNOWFLAKE` database and `ACCOUNT_USAGE` schema. If you are querying a table outside the `ACCOUNT_USAGE` schema, ensure your configured role has the appropriate permissions to access the table.

The table below describes the fields used to define custom metrics.

| Field | Description | Required |
| -------------  | ----------- | --- |
| Custom Metric Identifier | This is an identifier for the custom metric, used to distinguish separate custom metrics in each account.   | Yes |
| Query | This is the SQL to execute. It can be a simple statement or a multiline script. All of the rows of the results are evaluated. Use the pipe if you require a multiline script. | Yes |
| Metadata Columns | This is a list representing each column ordered sequentially from left to right. There are two required fields for each column:<br> - **Custom Column Name**:<br>This is the suffix to append to the `metric_prefix` to form the full metric name. If the type is specified as `Tag Key`, the column is instead applied as a tag to every metric collected by this query.<br> - **Metadata Type**:<br>This is the submission method (for example, gauge, count, or rate). This can also be set to tag each metric in the row with the name and value (`<name>:<row_value>`) of the item in this column. | Yes |


**Notes**:
   - At least one item in the defined columns should be a metric type (gauge, count, rate, distribution).
   - The number of items in columns must equal the number of columns returned in the query.
   - The order in which the items in columns are defined must be in the same order returned in the query.

**Example**:

{{< img src="integrations/snowflake/custom_query.png" alt="Custom metrics tab in the Snowflake integration tile" popup="true">}}

#### Validation

To verify the result, search for the metrics using Metrics Summary:

{{< img src="integrations/snowflake/snowflake_metrics.png" alt="Snowflake metrics in the Metric Summary page" popup="true">}}

## Data Collected

### Metrics
{{< get-metrics-from-git "snowflake_web" >}}


### Events

The Snowflake Web integration does not include any events.

### Service Checks

The Snowflake Web integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][10].

## Agent check: Snowflake

<div class="alert alert-danger">The Snowflake Agent check is no longer supported, it is recommended to switch to the new Snowflake integration for additional functionality and reduced API call volume to Snowflake.</div>

## Agent: Overview

This check monitors [Snowflake][11] through the Datadog Agent. Snowflake is a SaaS-analytic data warehouse and runs completely on cloud infrastructure. 
This integration monitors credit usage, billing, storage, query metrics, and more.

<div class="alert alert-info"><bold>Note</bold>: Metrics are collected with queries to Snowflake. Queries made by the Datadog integration are billable by Snowflake.</div>

## Agent: Setup

Follow the instructions below to install and configure this check for an Agent running on a host.

### Agent: Installation

The Snowflake check is included in the [Datadog Agent][12] package.

**Note**: The Snowflake check is not available in Datadog Agent v6 using Python 2. To use Snowflake on Agent v6 see [Use Python 3 with Datadog Agent v6][13] or upgrade to Agent v7.

### Agent: Configuration

<div class="alert alert-warning">Snowflake recommends granting permissions to an alternate role like `SYSADMIN`. Read more about controlling <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">ACCOUNTADMIN role</a> for more information.</div>

1. Create a Datadog specific role and user to monitor Snowflake. In Snowflake, run the following to create a custom role with access to the ACCOUNT_USAGE schema.

    Note: By default, this integration monitors the `SNOWFLAKE` database and `ACCOUNT_USAGE` schema. See "Collecting Organization Data" for information on how to monitor the `ORGANIZATION_USAGE` schema.
    This database is available by default and only viewable by users in the `ACCOUNTADMIN` role or [any role granted by the ACCOUNTADMIN][14].


    ```text
    use role ACCOUNTADMIN;
    grant imported privileges on database snowflake to role SYSADMIN;

    use role SYSADMIN;

    ```


    Alternatively, you can create a `DATADOG` custom role with access to `ACCOUNT_USAGE`.


    ```text
    -- Create a new role intended to monitor Snowflake usage.
    create role DATADOG;

    -- Grant privileges on the SNOWFLAKE database to the new role.
    grant imported privileges on database SNOWFLAKE to role DATADOG;

    -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

    -- Create a user, skip this step if you are using an existing user.
    create user DATADOG_USER
    LOGIN_NAME = DATADOG_USER
    password = '<PASSWORD>'
    default_warehouse = <WAREHOUSE>
    default_role = DATADOG
    default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

    -- Grant the monitor role to the user.
    grant role DATADOG to user <USER>;
    ```


2. Edit the `snowflake.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Snowflake performance data. See the [sample snowflake.d/conf.yaml][15] for all available configuration options.

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ORG_NAME>-<ACCOUNT_NAME>

        ## @param username - string - required
        ## Login name for the user.
        #
        username: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param role - string - required
        ## Name of the role to use.
        ##
        ## By default, the SNOWFLAKE database is only accessible by the ACCOUNTADMIN role. Snowflake recommends
        ## configuring a role specific for monitoring:
        ## https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
        #
        role: <ROLE>

        ## @param min_collection_interval - number - optional - default: 15
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries, set the `min_collection_interval` to 1 hour.
        #
        min_collection_interval: 3600

        # @param disable_generic_tags - boolean - optional - default: false
        # Generic tags such as `cluster` will be replaced by <integration_name>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour. 
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [Restart the Agent][16].

#### Collecting Organization Data

By default, this integration monitors the `ACCOUNT_USAGE` schema, but it can be set to monitor organization-level metrics instead.

To collect organization metrics, change the schema field to `ORGANIZATION_USAGE` and increase the `min_collection_interval` to 43200 in the integration's configuration. This reduces the number of queries to Snowflake, as most organization queries have a latency of up to 24 hours.

**Note**: To monitor organization metrics, your `user` must have the `ORGADMIN` role.

  ```yaml
      - schema: ORGANIZATION_USAGE
        min_collection_interval: 43200
  ```

Only some organization metrics are enabled by default. To collect all available organization metrics, utilize the `metric_groups` configuration option:

  ```yaml
      metric_groups:
        - snowflake.organization.warehouse
        - snowflake.organization.currency
        - snowflake.organization.credit
        - snowflake.organization.storage
        - snowflake.organization.contracts
        - snowflake.organization.balance
        - snowflake.organization.rate
        - snowflake.organization.data_transfer
  ```

Additionally, you can monitor both account and organization metrics at the same time:

  ```yaml
      instances:
      - account: example-inc
        username: DATADOG_ORG_ADMIN
        password: '<PASSWORD>'
        role: SYSADMIN
        schema: ORGANIZATION_USAGE
        database: SNOWFLAKE
        min_collection_interval: 43200

      - account: example-inc
        username: DATADOG_ACCOUNT_ADMIN
        password: '<PASSWORD>'
        role: DATADOG_ADMIN
        schema: ACCOUNT_USAGE
        database: SNOWFLAKE
        min_collection_interval: 3600
  ```

#### Collecting data for multiple environments

If you want to collect data for multiple Snowflake environments, add each environment as an instance in your `snowflake.d/conf.yaml` file. For example, if you needed to collect data for two users named `DATADOG_SYSADMIN` and `DATADOG_USER`:

```yaml
instances:
  - account: example-inc
    username: DATADOG_SYSADMIN
    password: '<PASSWORD>'
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: '<PASSWORD>'
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### Proxy configuration

Snowflake recommends setting [environment variables for proxy configuration][17].

You can also set the `proxy_host`, `proxy_port`, `proxy_user`, and `proxy_password` under `init_config` in the [snowflake.d/conf.yaml][15].

**Note**: Snowflake automatically formats the proxy configurations and sets [standard proxy environment variables][18]. 
These variables also impact every requests from integrations, including orchestrators like Docker, ECS, and Kubernetes.

#### Private connectivity to Snowflake configuration

If [private connectivity][19] (such as [AWS PrivateLink][20]) is enabled in Snowflake, you can configure the Snowflake integration by updating the `account` configuration option to the following format:

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Snowflake custom queries

The Snowflake integration supports custom queries. By default, the integration connects to the shared `SNOWFLAKE` database and `ACCOUNT_USAGE` schema. 

To run custom queries in a different schema or database, add another instance to the [sample snowflake.d/conf.yaml][15] and specify the `database` and `schema` options.
Ensure the user and role have access to the specified database or schema.

#### Configuration options
The `custom_queries` option has the following options:

| Option        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Yes      | This is the SQL to execute. It can be a simple statement or a multiline script. All of the rows of the results are evaluated. Use the pipe if you require a multiline script.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Yes      | This is a list representing each column ordered sequentially from left to right.<br><br>There are 2 required pieces of data:<br>  - **`name`**: This is the suffix to append to the `metric_prefix` to form the full metric name. If the `type` is specified as `tag`, the column is instead applied as a tag to every metric collected by this query.<br>  - **`type`**: This is the submission method (`gauge`, `count`, `rate`, etc.). This can also be set to `tag` to tag each metric in the row with the name and value (`<name>:<row_value>`) of the item in this column. |
| tags          | No       | A list of static tags to apply to each metric.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##### Notes:
- At least one item in the defined `columns` should be a metric type (for example, `gauge`, `count`, `rate`).

- The number of items in the columns must equal the number of columns returned in the query.
- The order in which the items in `columns` are defined must be in the same order returned in the query.

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### Example
The following example is a query that counts all queries in the [`QUERY_HISTORY` view][21] tagged by database, schema, and warehouse names.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```
##### Custom query configuration

The custom query configuration in `instances` looks like the following:

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```


### Agent: Validation

[Run the Agent's status subcommand][22] and look for `snowflake` under the Checks section.

## Agent: Data Collected

<div class="alert alert-info"><bold>Note</bold>: Only metrics from the following metric groups are enabled by default: <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code>, and <code>snowflake.logins.*</code>.

If you would like to collect metrics from other metric groups, please refer <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">to the example config file for this integration</a>.
</div>

### Agent: Metrics

See [Metrics](#metrics) for a list of metrics provided by this check.

### Agent: Events

Snowflake does not include any events.

### Agent: Service Checks

**snowflake.can_connect**  
Returns `CRITICAL` if the check cannot authenticate Snowflake credentials. Returns `OK` otherwise.  
*Statuses: ok, critical*

## Agent: Troubleshooting

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Snowflake with Datadog][23]
- [Monitor Snowflake Snowpark with Datadog][24]

[1]: https://app.datadoghq.com/dash/integration/31321/snowflake-overview
[2]: https://docs.snowflake.com/en/user-guide/organizations-connect
[3]: https://docs.snowflake.com/en/sql-reference/organization-usage/usage_in_currency_daily
[4]: https://app.datadoghq.com/cost/overview
[5]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[6]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[7]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/metadata.csv
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/assets/logs/snowflake.yaml
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.snowflake.com/
[12]: https://app.datadoghq.com/account/settings/agent/latest
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=hostagent
[14]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[16]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[17]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[18]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[19]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[20]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[21]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[22]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[23]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
[24]: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/