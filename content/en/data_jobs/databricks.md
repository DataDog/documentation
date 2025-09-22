---
title: Enable Data Jobs Monitoring for Databricks
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
    - link: "https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/"
      tag: "Blog"
      text: "Detect issues and optimize spend with Databricks serverless job monitoring"
---

[Data Jobs Monitoring][7] gives visibility into the performance and reliability of your Apache Spark and Databricks jobs.

{{< callout url="https://www.datadoghq.com/product-preview/databricks-serverless-job-monitoring" btn_hidden="false" header="Join the Preview: Databricks Serverless Job Monitoring">}}
Databricks Serverless Job Monitoring helps you detect issues with jobs running on Serverless or SQL Warehouse compute. Complete the form to request access.
{{< /callout >}}

## Setup

<div class="alert alert-info"><a href="https://docs.databricks.com/en/security/network/front-end/index.html">Databricks Networking Restrictions</a> can block some Datadog functions. Add the following Datadog IP ranges to your allow-list: {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IPs" >}}, {{< region-param key="ip_ranges_url_api" link="true" text="API IPs" >}}.</div>

Follow these steps to enable Data Jobs Monitoring for Databricks.

1. [Configure the Datadog-Databricks integration](#configure-the-datadog-databricks-integration) for a Databricks workspace.
1. [Install the Datadog Agent](#install-the-datadog-agent) on your Databricks cluster(s) in the workspace.


### Configure the Datadog-Databricks integration

{{< tabs >}}

{{% tab "Use a Service Principal for OAuth" %}}

<div class="alert alert-warning">New workspaces must authenticate using OAuth. Workspaces integrated with a Personal Access Token continue to function and can switch to OAuth at any time. After a workspace starts using OAuth, it cannot revert to a Personal Access Token.</div>

1. In your Databricks account, click on **User Management** in the left menu. Then, under the **Service principals** tab, click **Add service principal**.
1. Under the **Credentials & secrets** tab, click **Generate secret**. Set **Lifetime (days)** to the maximum value allowed (730), then click **Generate**. Take note of your client ID and client secret. Also take note of your account ID, which can be found by clicking on your profile in the upper-right corner.
  {{< img src="data_jobs/databricks/client-id-secret.png" alt="In Databricks, a modal showing the client ID and secret associated with a new OAuth secret is displayed." style="width:70%;" >}}
  {{< img src="data_jobs/databricks/account-id.png" alt="In Databricks, a drop-down menu showing the user's account ID is displayed." style="width:70%;" >}}
1. Click **Workspaces** in the left menu, then select the name of your workspace.
1. Go to the **Permissions** tab and click **Add permissions**.
1. Search for the service principal you created and assign it the **Admin** permission.
1. In Datadog, open the Databricks integration tile.
1. On the **Configure** tab, click **Add Databricks Workspace**.
1. Enter a workspace name, your Databricks workspace URL, account ID, and the client ID and secret you generated.
   {{< img src="data_jobs/databricks/configure-workspace-form-m2m.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, account ID, client ID, and client secret." style="width:100%;" >}}
1. To gain visibility into your Databricks costs in Data Jobs Monitoring or [Cloud Cost Management][18], provide the ID of a [Databricks SQL Warehouse][19] that Datadog can use to query your [system tables][20].
   - The service principal must have access to the SQL Warehouse. In the Warehouse configuration page, go to **Permissions** (top right) and grant it `CAN USE` permission.
   - Grant the service principal read access to the Unity Catalog [system tables][20] by running the following commands:
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   The user granting these must have `MANAGE` privilege on `CATALOG system`.
      
   -  The SQL Warehouse must be Pro or Serverless. Classic Warehouses are **NOT** supported. A 2XS warehouse is recommended, with Auto Stop set to 5-10 minutes to reduce cost.
1. In the **Select products to set up integration** section, ensure that Data Jobs Monitoring is **Enabled**.
1. In the **Datadog Agent Setup** section, choose either
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog installs and manages the Agent with a global init script in the workspace.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Follow the [instructions below](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) to install and manage the init script for installing the Agent globally or on specific Databricks clusters.

[18]: https://docs.datadoghq.com/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/

{{% /tab %}}

{{% tab "Use a Personal Access Token (Legacy)" %}}

<div class="alert alert-warning">This option is only available for workspaces created before July 7, 2025. New workspaces must authenticate using OAuth.</div>

1. In your Databricks workspace, click on your profile in the top right corner and go to **Settings**. Select **Developer** in the left side bar. Next to **Access tokens**, click **Manage**.
1. Click **Generate new token**, enter "Datadog Integration" in the **Comment** field, set the **Lifetime (days)** value to the maximum allowed (730 days), and create a reminder to update the token before it expires. Then click **Generate**. Take note of your token.

   **Important:**
   * For the [Datadog managed init script install (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), ensure the token's Principal is a <strong>Workspace Admin</strong>.
   * For manual init script installation, ensure the token's Principal has [CAN VIEW access][9] for the Databricks jobs and clusters you want to monitor.

   As an alternative, follow the [official Databricks documentation][10] to generate an access token for a [service principal][11]. The service principal must have the [<strong>Workspace access</strong> entitlement][17] enabled and the <strong>Workspace Admin</strong> or [CAN VIEW access][9] permissions as described above.
1. In Datadog, open the Databricks integration tile.
1. On the **Configure** tab, click **Add Databricks Workspace**.
1. Enter a workspace name, your Databricks workspace URL, and the Databricks token you generated.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, and API token." style="width:100%;" >}}
1. To gain visibility into your Databricks costs in Data Jobs Monitoring or [Cloud Cost Management][18], provide the ID of a [Databricks SQL Warehouse][19] that Datadog can use to query your [system tables][20].

   - The token's principal must have access to the SQL Warehouse. Give it `CAN USE` permission from **Permissions** at the top right of the Warehouse configuration page.
   - Grant the service principal read access to the Unity Catalog [system tables][20] by running the following commands::
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <token_principal>;
   GRANT SELECT ON CATALOG system TO <token_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <token_principal>;
   ```
   The user granting these must have `MANAGE` privilege on `CATALOG system`.
   -  The SQL Warehouse must be Pro or Serverless. Classic Warehouses are **NOT** supported. A 2XS size warehouse is recommended, with Auto Stop configured for 5-10 minutes to minimize cost.
1. In the **Select products to set up integration** section, make sure the Data Jobs Monitoring product is **Enabled**.
1. In the **Datadog Agent Setup** section, choose either
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog installs and manages the Agent with a global init script in the workspace.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Follow the [instructions below](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) to install and manage the init script for installing the Agent globally or on specific Databricks clusters.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/


{{% /tab %}}

{{< /tabs >}}

### Install the Datadog Agent

The Datadog Agent must be installed on Databricks clusters to monitor Databricks jobs that run on all-purpose or job clusters. This step is not required to monitor jobs on [serverless compute][4].

{{< tabs >}}
{{% tab "Datadog managed global init script (Recommended)" %}}

Datadog can install and manage a global init script in the Databricks workspace. The Datadog Agent is installed on all clusters in the workspace, when they start.

<div class="alert alert-warning">
<ul>
<li>This setup does not work on Databricks clusters in <strong>Standard</strong> (formerly <strong>Shared</strong>) access mode, because global init scripts cannot be installed on those clusters. If you are using clusters with the <strong>Standard</strong> (formerly <strong>Shared</strong>) access mode, you must follow the instructions to <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Manually install on a specific cluster</a> for installation on those specific clusters.</li>
<li>This install option, in which Datadog installs and manages your Datadog global init script, requires a Databricks Access Token with <strong>Workspace Admin</strong> permissions. A token with CAN VIEW access does not allow Datadog to manage the global init script of your Databricks account.</li>
</ul>
</div>

#### When integrating a workspace with Datadog

1. In the **Select products to set up integration** section, make sure the Data Jobs Monitoring product is **Enabled**.
1. In the **Datadog Agent Setup** section, select the **Managed by Datadog** toggle button.
1. Click **Select API Key** to either select an existing Datadog API key or create a new Datadog API key.
1. (Optional) Disable **Enable Log Collection** if you do not want to collect driver and worker logs for correlating with jobs.
1. Click **Save Databricks Workspace**.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="In the Datadog-Databricks integration tile, Datadog Agent Setup when adding a Databricks workspace. Datadog can install and manage a global init script." style="width:100%;" >}}

#### When adding the init script to a Databricks workspace already integrated with Datadog

1. On the **Configure** tab, click the workspace in the list of workspaces
1. Click the **Configured Products** tab
1. Make sure the Data Jobs Monitoring product is **Enabled**.
1. In the **Datadog Agent Setup** section, select the **Managed by Datadog** toggle button.
1. Click **Select API Key** to either select an existing Datadog API key or create a new Datadog API key.
1. (Optional) Disable **Enable Log Collection** if you do not want to collect driver and worker logs for correlating with jobs.
1. Click **Save Databricks Workspace** at the bottom of the browser window.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="In the Datadog-Databricks integration tile, Datadog Agent Setup for a Databricks workspace already added to the integration. Datadog can install and manage a global init script." style="width:100%;" >}}

Optionally, you can add tags to your Databricks cluster and Spark performance metrics by configuring the following environment variable in the Advanced Configuration section of your cluster in the Databricks UI or as [Spark env vars][2] with the Databricks API:

| Variable                 | Description                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][1]. Example: `env:staging,team:data_engineering` |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster. |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][3] for more details. |


[1]: /getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Manually install a global init script" %}}

<div class="alert alert-warning">
This setup does not work on Databricks clusters in <strong>Standard</strong> (formerly <strong>Shared</strong>) access mode, because global init scripts cannot be installed on those clusters. If you are using clusters with the <strong>Standard</strong> (formerly <strong>Shared</strong>) access mode, you must follow the instructions to <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Manually install on a specific cluster</a> for installation on those specific clusters.
</div>

1. In Databricks, click your display name (email address) in the upper right corner of the page.
1. Select **Settings** and click the **Compute** tab.
1. In the **All purpose clusters** section, next to **Global init scripts**, click **Manage**.
1. Click **Add**. Name your script. Then, in the **Script** field, copy and paste the following script, remembering to replace the placeholders with your parameter values.

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   The script above sets the required parameters, and downloads and runs the latest init script for Data Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. To enable the script for all new and restarted clusters, toggle **Enabled**.
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI, admin settings, global init scripts. A script called 'install-datadog-agent' is in a list with an enabled toggle." style="width:100%;" >}}
1. Click **Add**.

#### Set the required init script parameters

Provide the values for the init script parameters at the beginning of the global init script.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1].                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). Enclose the name in double quotes if it contains whitespace. |         |
| DRIVER_LOGS_ENABLED      | Collect spark driver logs in Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Collect spark workers logs in Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. Example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "Manually install on a specific cluster" %}}

1. In Databricks, create a init script file in **Workspace** with the following content. Be sure to make note of the file path.
   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   The script above downloads and runs the latest init script for Data Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. On the cluster configuration page, click the **Advanced options** toggle.
1. At the bottom of the page, go to the **Init Scripts** tab.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI, cluster configuration advanced options,  Init Scripts tab. A 'Destination' drop-down and an 'Init script path' file selector." style="width:80%;" >}}

   - Under the **Destination** drop-down, select `Workspace`.
   - Under **Init script path**, enter the path to your init script.
   - Click **Add**.

#### Set the required init script parameters

1. In Databricks, on the cluster configuration page, click the **Advanced options** toggle.
2. At the bottom of the page, go to the **Spark** tab.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script-quoted.png" alt="Databricks UI, cluster configuration advanced options, Spark tab. A textbox titled 'Environment variables' contains values for DD_API_KEY and DD_SITE." style="width:100%;" >}}

   In the **Environment variables** textbox, provide the values for the init script parameters.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
   ```

   Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1].                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). Enclose the name in double quotes if it contains whitespace. |         |
| DRIVER_LOGS_ENABLED      | Collect spark driver logs in Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Collect spark workers logs in Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. Example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

3. Click **Confirm**.

{{% /tab %}}

{{% tab "Manually configure on a cluster policy" %}}

1. In Databricks, create a init script file in **Workspace** with the following content. Be sure to make note of the file path.
   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   The script above downloads and runs the latest init script for Data Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

2. On the create policy page, click **Add Definition** under the **Definition** section.
3. In the **Field** dropdown that appears, select **init_scripts**.

   {{< img src="data_jobs/databricks/configure-databricks-cluster-policy-init-script.png" alt="Databricks UI, cluster policy creation page, Definition section. A 'Field' drop-down with 'init_scripts' selected, showing a 'Source' drop-down and an 'File path' file selector." style="width:80%;" >}}

   - Under the **Source** drop-down, select `Workspace`.
   - Under **File path**, enter the path to your init script.
   - Click **Add**.

### Setup required environment variables 

Each of the following environment variables must be added to the cluster policy.

| Key                  | Description                  |
|----------------------|------------------------------|
| DD_API_KEY           | Your [Datadog API key][1].   |
| DD_SITE              | Your [Datadog site][2].      |
| DATABRICKS_WORKSPACE | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). Enclose the name in double quotes if it contains whitespace. |

This can be done by following these steps for each variable:

1. Click **Add Definition** under the **Definition** section.
2. In the **Field** dropdown that appears, select **spark_env_vars**.

   {{< img src="data_jobs/databricks/configure-databricks-cluster-policy-envvars.png" alt="Databricks UI, cluster policy creation page, Definition section. A 'Field' drop-down with 'spark_env_vars' selected, showing text boxes to enter a 'Key' and 'Value' envvar configuration. A 'Type' dropdown with 'Fixed' selected, and a 'Hidden' checkbox that is selected." style="width:80%;" >}}

   - In the **Key** field, enter the environment variable key.
   - In the **Value** field, enter the environment variable value.
   - Under the **Type** drop-down, select `Fixed`.
   - Toggle the **Hidden** checkbox to reduce exposure of sensitive environment variables.

   Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1].                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). Enclose the name in double quotes if it contains whitespace. |         |
| DRIVER_LOGS_ENABLED      | Collect spark driver logs in Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Collect spark workers logs in Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. Example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

3. Click **Create**. The cluster policy is now available to use when configuring new clusters or editing existing ones.

{{% /tab %}}

{{< /tabs >}}

### Restart already-running clusters

The init script installs the Agent when clusters start.

Already-running all-purpose clusters or long-lived job clusters must be manually restarted for the init script to install the Datadog Agent.

For scheduled jobs that run on job clusters, the init script installs the Datadog Agent automatically on the next run.

## Validation

In Datadog, view the [Data Jobs Monitoring][6] page to see a list of all your Databricks jobs.

If some jobs are not visible, navigate to the [Configuration][9] page to understand why. This page lists all your Databricks jobs not yet configured with the Agent on their clusters, along with guidance for completing setup.

## Troubleshooting

{{% djm-install-troubleshooting %}}

## Advanced Configuration

### Filter log collection on clusters

#### Exclude all log collection from an individual cluster
Configure the following environment variable in the Advanced Configuration section of your cluster in the Databricks UI or as a [Spark environment variable][18] in the Databricks API.
```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Permissions
Grant **Workspace Admin** privileges to the user or service principal that connects to your Databricks workspace. This allows Datadog to manage init script installations and updates automatically, reducing the risk of misconfiguration.

If you need more granular control, grant these minimal permissions to the following [workspace level objects][19] to still be able to monitor all jobs, clusters, and queries within a workspace: 

| Object                 | Permission                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Job                              | [CAN VIEW][20]
| Compute                          | [CAN ATTACH TO][21]
| Lakeflow Declarative Pipelines   | [CAN VIEW][22]
| Query                            | [CAN VIEW][23]
| SQL warehouse                    | [CAN MONITOR][24]

Additionally, for Datadog to access your Databricks cost data in Data Jobs Monitoring or [Cloud Cost Management][18], the user or service principal used to query [system tables][20] must have the following permissions:
   - `CAN USE` permission on the SQL Warehouse.
   - Read access to the [system tables][20] within Unity Catalog. This can be granted with:
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   The user granting these must have `MANAGE` privilege on `CATALOG system`.
      
[18]: https://docs.datadoghq.com/cloud_cost_management
[20]: https://docs.databricks.com/aws/en/admin/system-tables/

### Tag spans at runtime

{{% djm-runtime-tagging %}}

### Aggregate cluster metrics from one-time job runs
   This configuration is applicable if you want cluster resource utilization data about your jobs and create a new job and cluster for each run via the [one-time run API endpoint][8] (common when using orchestration tools outside of Databricks such as Airflow or Azure Data Factory).

   If you are submitting Databricks Jobs through the [one-time run API endpoint][8], each job run has a unique job ID. This can make it difficult to group and analyze cluster metrics for jobs that use ephemeral clusters. To aggregate cluster utilization from the same job and assess performance across multiple runs, you must set the `DD_JOB_NAME` variable inside the `spark_env_vars` of every `new_cluster` to the same value as your request payload's `run_name`.

   Here's an example of a one-time job run request body:

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Set up Data Jobs Monitoring with Databricks Networking Restrictions
With [Databricks Networking Restrictions][12], Datadog may not have access to your Databricks APIs, which is required to collect traces for Databricks job executions along with tags and other metadata.

If you are controlling Databricks API access with [IP access lists][13], allow-listing Datadog's specific {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} allows Datadog to connect to the Databricks APIs in your workspaces/account. See Databricks's documentation for configuring IP access lists for [individual workspaces][16] and the [account console][17] to give Datadog API access. Updating the IP access lists **at both the workspace and account level is required** for the Databricks integration. **Note:** Datadog only uses Databricks account-level APIs to automatically refresh your service principal's client secret.

If you are using [Databricks Private Connectivity][14], reach out to the Datadog [support team][15] to discuss potential options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://app.datadoghq.com/data-jobs/configuration
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[15]: https://www.datadoghq.com/support/
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[17]: https://docs.databricks.com/aws/en/security/network/front-end/ip-access-list-account
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
