---
title: "Enable Data Observability: Jobs Monitoring for Databricks"
description: "Enable Data Observability: Jobs Monitoring for Databricks workspaces with OAuth or Personal Access Token authentication and Datadog Agent installation."
aliases:
  - /data_jobs/databricks
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Observability: Jobs Monitoring'
    - link: "https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/"
      tag: "Blog"
      text: "Detect issues and optimize spend with Databricks serverless job monitoring"
---

[Data Observability: Jobs Monitoring][7] gives visibility into the performance and reliability of your Databricks jobs and workflows running on clusters or serverless compute.

## Setup

<div class="alert alert-info">If your Databricks workspace has <a href="https://docs.databricks.com/en/security/network/front-end/index.html">Networking Restrictions</a> enabled, add Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} to your allow-list. If your workspace uses Private Link, see the <strong>Private Link Connectivity</strong> tab below.</div>

Follow these steps to enable Data Observability: Jobs Monitoring for Databricks.

1. [Configure the Datadog-Databricks integration](#configure-the-datadog-databricks-integration) for a Databricks workspace.
1. [Install the Datadog Agent](#install-the-datadog-agent) on your Databricks cluster(s) in the workspace.


### Configure the Datadog-Databricks integration

{{< tabs >}}

{{% tab "Use a Service Principal for OAuth" %}}

<div class="alert alert-danger">New workspace integrations must authenticate using OAuth. Workspaces already integrated with a Personal Access Token continue to function and can switch to OAuth at any time. After a workspace starts using OAuth, it cannot revert to a Personal Access Token.</div>

#### Create and configure the service principal in Databricks

1. As a **Databricks workspace admin**, go to {{< ui >}}Settings{{< /ui >}} by clicking your profile in the upper-right corner of the workspace.
1. On the {{< ui >}}Identity and access{{< /ui >}} tab, click {{< ui >}}Manage{{< /ui >}} next to {{< ui >}}Service principals{{< /ui >}}.
1. Click {{< ui >}}Add service principal{{< /ui >}}, then click {{< ui >}}Add new{{< /ui >}}.

   <div class="alert alert-warning">For Azure Databricks, select the "Databricks managed" management type. Datadog does NOT support "Microsoft Entra ID managed" service principals.</div>
1. Enter a name and enable the following workspace entitlements for the service principal:
   - {{< ui >}}Workspace access{{< /ui >}}
   - {{< ui >}}Databricks SQL access{{< /ui >}}
   - {{< ui >}}Admin access{{< /ui >}}: Grants the workspace administrator access that Datadog requires. This is equivalent to adding the service principal to the `admins` group.

   <div class="alert alert-info">If you cannot grant the <strong>Admin access</strong> entitlement, provision granular access instead, as described in the <a href="#permissions">Permissions</a> section under Advanced Configuration.</div>
1. Click **Add**.

1. Click on the name of your new service principal. Under the {{< ui >}}Secrets{{< /ui >}} tab, click {{< ui >}}Generate secret{{< /ui >}}.
   1. Set {{< ui >}}Lifetime (days){{< /ui >}} to the maximum value allowed (730).

   1. Click {{< ui >}}Generate{{< /ui >}}.

   1. Take note of your client ID and client secret.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="In Databricks, a modal showing the client ID and secret associated with a new OAuth secret is displayed." style="width:70%;" >}}

1. On the {{< ui >}}Permissions{{< /ui >}} tab, click {{< ui >}}Grant access{{< /ui >}}. Search for the new service principal, grant it the {{< ui >}}Manage{{< /ui >}} permission, and click {{< ui >}}Save{{< /ui >}}.

#### Add the Databricks workspace to Datadog

1. In Datadog, open the Databricks integration tile.
1. On the {{< ui >}}Configure{{< /ui >}} tab, click {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Enter a workspace name, your Databricks workspace URL, and the client ID and secret you generated.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, client ID, and client secret." style="width:100%;" >}}
1. Provide the ID of a [Databricks SQL Warehouse][19] for Datadog to query. This gives you visibility into your Databricks costs in Jobs Monitoring or [Cloud Cost Management][18] and powers [Quality Monitoring][21].
   1. In Databricks, go to {{< ui >}}SQL Warehouses{{< /ui >}} and select the warehouse for Datadog to use. It must be Pro or Serverless. Classic Warehouses are not supported. To reduce costs, use a dedicated 2XS warehouse, with Auto Stop configured for 5-10 minutes.
   1. Copy the ID from the warehouse's overview page (it is also the last segment of the warehouse's URL) and enter it in the integration tile.
   1. On the warehouse's {{< ui >}}Permissions{{< /ui >}} tab (top right), grant the service principal `CAN USE`.
   1. Grant the service principal read access to the Unity Catalog [system tables][20]. In the {{< ui >}}SQL Editor{{< /ui >}}, run the following commands using the service principal's client ID (not its display name):

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">The user running these commands must have the <code>MANAGE</code> privilege on <code>CATALOG system</code>.</div>
1. In the **Select products to set up integration** section, ensure that Data Observability: Jobs Monitoring is {{< ui >}}Enabled{{< /ui >}}.
1. In the {{< ui >}}Datadog Agent Setup{{< /ui >}} section, choose either
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog installs and manages the Agent with a global init script in the workspace.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Follow the [instructions below](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) to install and manage the init script for installing the Agent globally or on specific Databricks clusters.

[18]: https://docs.datadoghq.com/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /data_observability/quality_monitoring/data_warehouses/databricks/

{{% /tab %}}

{{% tab "Private Link Connectivity" %}}

If your Databricks workspace is deployed using [Private Link Connectivity][25], Datadog cannot access the Databricks APIs directly. This requires using a [Private Action Runner][26] deployed in your environment.

See [Private Link Connectivity (Preview)][15] for full setup instructions.

[15]: /data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/actions/private_actions/

{{% /tab %}}

{{% tab "Use a Personal Access Token (Legacy)" %}}

<div class="alert alert-danger">This option is only available for workspace integrations created before July 7, 2025. New workspace integrations must authenticate using OAuth.</div>

1. In your Databricks workspace, click on your profile in the top right corner and go to {{< ui >}}Settings{{< /ui >}}. Select {{< ui >}}Developer{{< /ui >}} in the left side bar. Next to {{< ui >}}Access tokens{{< /ui >}}, click {{< ui >}}Manage{{< /ui >}}.
1. Click {{< ui >}}Generate new token{{< /ui >}}, enter "Datadog Integration" in the {{< ui >}}Comment{{< /ui >}} field, set the {{< ui >}}Lifetime (days){{< /ui >}} value to the maximum allowed (730 days), and create a reminder to update the token before it expires. Then click {{< ui >}}Generate{{< /ui >}}. Take note of your token.

   **Important:**
   * For the [Datadog managed init script install (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), ensure the token's Principal is a <strong>Workspace Admin</strong>.
   * For manual init script installation, ensure the token's Principal has [CAN VIEW access][9] for the Databricks jobs and clusters you want to monitor.

   As an alternative, follow the [official Databricks documentation][10] to generate an access token for a [service principal][11]. The service principal must have the [<strong>Workspace access</strong> entitlement][17] enabled and the <strong>Workspace Admin</strong> or [CAN VIEW access][9] permissions as described above.
1. In Datadog, open the Databricks integration tile.
1. On the {{< ui >}}Configure{{< /ui >}} tab, click {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Enter a workspace name, your Databricks workspace URL, and the Databricks token you generated.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, and API token." style="width:100%;" >}}
1. Provide the ID of a [Databricks SQL Warehouse][19] for Datadog to query. This gives you visibility into your Databricks costs in Jobs Monitoring or [Cloud Cost Management][18] and powers [Quality Monitoring][21].
   1. In Databricks, go to {{< ui >}}SQL Warehouses{{< /ui >}} and select the warehouse for Datadog to use. It must be Pro or Serverless. Classic Warehouses are not supported. To reduce costs, use a dedicated 2XS warehouse, with Auto Stop configured for 5-10 minutes.
   1. Copy the ID from the warehouse's overview page (it is also the last segment of the warehouse's URL) and enter it in the integration tile.
   1. On the warehouse's {{< ui >}}Permissions{{< /ui >}} tab (top right), grant the token's principal `CAN USE`.
   1. Grant the token's principal read access to the Unity Catalog [system tables][20]. In the {{< ui >}}SQL Editor{{< /ui >}}, run the following commands using the principal's client ID (not its display name):

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">The user running these commands must have the <code>MANAGE</code> privilege on <code>CATALOG system</code>.</div>
1. In the **Select products to set up integration** section, make sure the Data Observability: Jobs Monitoring product is **Enabled**.
1. In the {{< ui >}}Datadog Agent Setup{{< /ui >}} section, choose either
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog installs and manages the Agent with a global init script in the workspace.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Follow the [instructions below](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) to install and manage the init script for installing the Agent globally or on specific Databricks clusters.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /data_observability/quality_monitoring/data_warehouses/databricks/


{{% /tab %}}

{{< /tabs >}}

### Install the Datadog Agent

The Datadog Agent must be installed on Databricks clusters to monitor Databricks jobs that run on all-purpose or job clusters. This step is not required to monitor jobs on [serverless compute][4].

{{< tabs >}}
{{% tab "Datadog managed global init script (Recommended)" %}}

Datadog can install and manage a global init script in the Databricks workspace. The Datadog Agent is installed on all clusters in the workspace, when they start.

<div class="alert alert-danger">
<ul>
<li>This setup does not work on Databricks clusters in <strong>Standard</strong> access mode, because global init scripts cannot be installed on those clusters. If you are using clusters with the <strong>Standard</strong> access mode, Datadog recommends to <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">Manually configure a cluster policy</a> across multiple clusters or <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Manually install on a specific cluster</a>.</li>
<li>This install option, in which Datadog installs and manages your Datadog global init script, requires a Databricks Access Token with <strong>Workspace Admin</strong> permissions. A token with CAN VIEW access does not allow Datadog to manage the global init script of your Databricks account.</li>
</ul>
</div>

#### When integrating a workspace with Datadog

1. In the **Select products to set up integration** section, make sure the Data Observability: Jobs Monitoring product is **Enabled**.
1. In the {{< ui >}}Datadog Agent Setup{{< /ui >}} section, select the {{< ui >}}Managed by Datadog{{< /ui >}} toggle button.
1. Click {{< ui >}}Select API Key{{< /ui >}} to either select an existing Datadog API key or create a new Datadog API key.
1. (Optional) Disable {{< ui >}}Enable Log Collection{{< /ui >}} if you do not want to collect driver and worker logs for correlating with jobs.
1. Click {{< ui >}}Save Databricks Workspace{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="In the Datadog-Databricks integration tile, Datadog Agent Setup when adding a Databricks workspace. Datadog can install and manage a global init script." style="width:100%;" >}}

#### When adding the init script to a Databricks workspace already integrated with Datadog

1. On the **Configure** tab, click the workspace in the list of workspaces
1. Click the {{< ui >}}Configured Products{{< /ui >}} tab
1. Make sure the Data Observability: Jobs Monitoring product is **Enabled**.
1. In the {{< ui >}}Datadog Agent Setup{{< /ui >}} section, select the {{< ui >}}Managed by Datadog{{< /ui >}} toggle button.
1. Click {{< ui >}}Select API Key{{< /ui >}} to either select an existing Datadog API key or create a new Datadog API key.
1. (Optional) Disable {{< ui >}}Enable Log Collection{{< /ui >}} if you do not want to collect driver and worker logs for correlating with jobs.
1. Click **Save Databricks Workspace** at the bottom of the browser window.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="In the Datadog-Databricks integration tile, Datadog Agent Setup for a Databricks workspace already added to the integration. Datadog can install and manage a global init script." style="width:100%;" >}}

Optionally, you can add tags to your Databricks cluster and Spark performance metrics by configuring the following environment variable in the {{< ui >}}Advanced Configuration{{< /ui >}} section of your cluster in the Databricks UI or as [Spark env vars][2] with the Databricks API:

| Variable                 | Description                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][1]. For example: `env:staging,team:data_engineering` |
| DD_ENV                   | Override the `env` environment tag on metrics, traces, and logs from this cluster. By default, the Databricks workspace name is used as env.|
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][3] for more details. |


[1]: /getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Manually configure a cluster policy" %}}

This approach is recommended for clusters in **Standard** access mode.

**Create the init script**

1. In Databricks, create an init script file in a [Unity Catalog volume][26] with the following content. Be sure to make note of the volume path (for example, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. Grant read-only permissions to the init script:
    1. At the volume level, grant the `READ VOLUME` permission to all account users.
    1. At the catalog level, grant the `USE CATALOG` permission to all account users.

   <div class="alert alert-info">Databricks evaluates Unity Catalog Volume permissions against the <strong>cluster owner</strong>, not the principal running the cluster.</div>

1. **Add the init script to the allowlist**: For clusters in **Standard** access mode, you must add the init script path to the Unity Catalog allowlist. Follow the instructions in the [Databricks documentation][27] to add your init script path to the allowlist.

**Configure the compute policy**

1. In {{< ui >}}Compute{{< /ui >}}, navigate to the {{< ui >}}Policies{{< /ui >}} tab. If you already have a cluster policy applied to your clusters, navigate to that existing policy to edit it. This is the simpler approach as the policy automatically applies to all clusters using it. Otherwise, click {{< ui >}}Create Policy{{< /ui >}} to create a new policy.
1. To add the init script to the cluster policy, in the {{< ui >}}Definition{{< /ui >}} section, click {{< ui >}}Add Definition{{< /ui >}}. In the modal that opens, fill in the fields:
   1. In the {{< ui >}}Field{{< /ui >}} dropdown, select {{< ui >}}init_scripts{{< /ui >}}.
   1. In the {{< ui >}}Source{{< /ui >}} dropdown, select {{< ui >}}Volume{{< /ui >}}.
   1. Under {{< ui >}}Destination{{< /ui >}}, enter the volume path to your init script.
   1. Click {{< ui >}}Add{{< /ui >}}.
1. Configure the environment variables. You must add each of the following environment variables to the cluster policy you created:

   | Key                  | Description                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | Your [Datadog API key][1].   |
   | DD_SITE              | Your [Datadog site][2].      |
   | DATABRICKS_WORKSPACE | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). |

   1. For each of the above variables, in the {{< ui >}}Definition{{< /ui >}} section, click {{< ui >}}Add Definition{{< /ui >}}. In the modal that opens, fill in the fields:
       1. In the {{< ui >}}Field{{< /ui >}} dropdown, select {{< ui >}}spark_env_vars{{< /ui >}}.
       1. In the {{< ui >}}Key{{< /ui >}} field, enter the environment variable key.
       1. In the {{< ui >}}Value{{< /ui >}} field, enter the environment variable value.
       1. Under the {{< ui >}}Type{{< /ui >}} drop-down, select {{< ui >}}Fixed{{< /ui >}}.
       1. Check the {{< ui >}}Hidden{{< /ui >}} checkbox to reduce exposure of sensitive values.
   1. Optionally, set other init script parameters and Datadog environment variables, such as `DD_ENV` and `DD_SERVICE`. You can configure the script using the following parameters:

      | Variable                 |  Description                                                                                                                                                      |  Default |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Collect spark driver logs in Datadog.                                                                                                                          | false   |
      | WORKER_LOGS_ENABLED      | Collect spark workers logs in Datadog.                                                                                                                            | false   |
      | DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. For example: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | Override the `env` environment tag on metrics, traces, and logs from this cluster. By default, the Databricks workspace name is used as env.                                                                                         |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |

1. Click {{< ui >}}Create{{< /ui >}} if creating a new policy or {{< ui >}}Save{{< /ui >}} if updating an existing policy. If you update an existing policy, all clusters using that policy automatically apply the changes on their next restart. If you create a new policy, follow the steps below to apply it to your clusters.

**Apply the cluster policy to clusters**

1. In {{< ui >}}Compute{{< /ui >}}, select the cluster you want to update or click {{< ui >}}Create Compute{{< /ui >}} for a new cluster.
1. In the {{< ui >}}Policy{{< /ui >}} dropdown at the top, select the policy you created.
1. Click {{< ui >}}Confirm{{< /ui >}} to save the changes. The cluster needs to be restarted for the policy to take effect.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "Manually install a global init script" %}}

<div class="alert alert-danger">
This setup does not work on Databricks clusters in <strong>Standard</strong> access mode, because global init scripts cannot be installed on those clusters. If you are using clusters with the <strong>Standard</strong> access mode, Datadog recommends to <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">Manually configure a cluster policy</a> or <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Manually install on a specific cluster</a>.
</div>

1. In Databricks, click your display name (email address) in the upper right corner of the page.
1. Select {{< ui >}}Settings{{< /ui >}} and click the {{< ui >}}Compute{{< /ui >}} tab.
1. In the {{< ui >}}All purpose clusters{{< /ui >}} section, next to {{< ui >}}Global init scripts{{< /ui >}}, click {{< ui >}}Manage{{< /ui >}}.
1. Click {{< ui >}}Add{{< /ui >}}. Name your script. Then, in the {{< ui >}}Script{{< /ui >}} field, copy and paste the following script, remembering to replace the placeholders with your parameter values.

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

   The script above sets the required parameters, and downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. To enable the script for all new and restarted clusters, toggle {{< ui >}}Enabled{{< /ui >}}.
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI, admin settings, global init scripts. A script called 'install-datadog-agent' is in a list with an enabled toggle." style="width:100%;" >}}
1. Click {{< ui >}}Add{{< /ui >}}.

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
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. For example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Override the `env` environment tag on metrics, traces, and logs from this cluster. By default, the Databricks workspace name is used as env.                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "Manually install on a specific cluster" %}}

1. In Databricks, create an init script file in a [Unity Catalog volume][26] with the following content. Be sure to make note of the volume path (for example, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL (for example, `install-databricks-0.14.0.sh` to use version `0.14.0`). You can find the source code used to generate this script, and the changes between script versions, on the [Datadog Agent repository][3].

1. Grant read-only permissions to the init script:
    1. At the volume level, grant the `READ VOLUME` permission to all account users.
    1. At the catalog level, grant the `USE CATALOG` permission to all account users.

   <div class="alert alert-info">Databricks evaluates Unity Catalog Volume permissions against the <strong>cluster owner</strong>, not the principal running the cluster.</div>

1. **Add the init script to the allowlist** (required for **Standard** access mode clusters): If your cluster uses **Standard** access mode, you must add the init script path to the Unity Catalog allowlist. Follow the instructions in the [Databricks documentation][27] to add your init script path to the allowlist.

1. On the cluster configuration page, click the {{< ui >}}Advanced options{{< /ui >}} toggle.
1. At the bottom of the page, go to the {{< ui >}}Init Scripts{{< /ui >}} tab.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI, cluster configuration advanced options,  Init Scripts tab. A 'Destination' drop-down and an 'Init script path' file selector." style="width:80%;" >}}

   - Under the {{< ui >}}Destination{{< /ui >}} drop-down, select {{< ui >}}Volume{{< /ui >}}.
   - Under {{< ui >}}Init script path{{< /ui >}}, enter the volume path to your init script.
   - Click {{< ui >}}Add{{< /ui >}}.

#### Set the required init script parameters

1. In Databricks, on the cluster configuration page, click the {{< ui >}}Advanced options{{< /ui >}} toggle.
2. At the bottom of the page, go to the {{< ui >}}Spark{{< /ui >}} tab.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Databricks UI, cluster configuration advanced options, Spark tab. A textbox titled 'Environment variables' contains values for DD_API_KEY and DD_SITE." style="width:100%;" >}}

   In the {{< ui >}}Environment variables{{< /ui >}} textbox, provide the values for the init script parameters.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1].                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration). |         |
| DRIVER_LOGS_ENABLED      | Collect spark driver logs in Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Collect spark workers logs in Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Add tags to Databricks cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][4]. For example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Override the `env` environment tag on metrics, traces, and logs from this cluster. By default, the Databricks workspace name is used as env.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][5] for more details. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /getting_started/tagging/
[5]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

3. Click {{< ui >}}Confirm{{< /ui >}}.

{{% /tab %}}

{{< /tabs >}}

### Restart already-running clusters

The init script installs the Agent when clusters start.

Already-running all-purpose clusters or long-lived job clusters must be manually restarted for the init script to install the Datadog Agent.

For scheduled jobs that run on job clusters, the init script installs the Datadog Agent automatically on the next run.

## Validation

In Datadog, view the [Data Observability: Jobs Monitoring][6] page to see a list of all your Databricks jobs.

If some jobs are not visible, navigate to the [Configuration][9] page to understand why. This page lists all your Databricks jobs not yet configured with the Agent on their clusters, along with guidance for completing setup.

## Troubleshooting

If you don't see any data in Jobs Monitoring after installing the product, follow these steps.

### Init script not running or failing

1. **Restart the cluster**: The init script is only run on cluster startup. Ensure the cluster has been restarted since the init script was added.
1. **Confirm the init script ran**: In Databricks, click into the cluster and navigate to the {{< ui >}}Event log{{< /ui >}} tab. If `INIT_SCRIPTS_STARTED` is not present, the init script was not picked up by this cluster. Return to the [installation steps](#install-the-datadog-agent) to ensure the init script has been added to the cluster.
1. **Confirm the init script succeeded**: Find the `INIT_SCRIPTS_FINISHED` action in the event log and click into it to inspect the JSON, which indicates whether the init script exited with a failure.
1. **Investigate init script failures**: If `INIT_SCRIPTS_FINISHED` shows a failure, enable [cluster log delivery][29] to send init script logs to your preferred destination. Sending logs to a Unity Catalog volume is recommended.
   {{< img src="data_jobs/databricks/compute_logging_config.png" alt="The Databricks cluster configuration page showing the Logging tab with options to configure a log delivery destination." style="width:100%;" >}}
   After restarting the cluster with log delivery enabled, navigate to the log destination. The stdout and stderr logs can be found under the following path:
   ```
   <cluster-log-path>/<cluster-id>/init_scripts/<cluster-id>_<script-hash>/
   ```

### Data not appearing after a successful init script run

1. **API Key Validation:** If the init script was manually installed, use the [Validate API key endpoint][25] to ensure that the Datadog API key specified in the script is valid.
1. **Agent Validation:** The init script installs the Datadog Agent. To make sure it is properly installed, connect to the cluster with SSH and run the Agent status command:
  ```shell
  sudo datadog-agent status
  ```

## Advanced Configuration

### Filter log collection on clusters

#### Exclude all log collection from an individual cluster
Configure the following environment variable in the {{< ui >}}Advanced Configuration{{< /ui >}} section of your cluster in the Databricks UI or as a [Spark environment variable][18] in the Databricks API.
```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Permissions
Grant {{< ui >}}Workspace Admin{{< /ui >}} privileges to the user or service principal that connects to your Databricks workspace. This allows Datadog to manage init script installations and updates automatically, reducing the risk of misconfiguration.

If you need more granular control, grant these minimal permissions to the following [workspace level objects][19] to still be able to monitor all jobs, clusters, and queries within a workspace:

| Object                 | Permission                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Job                              | [CAN VIEW][20]
| Compute                          | [CAN ATTACH TO][21]
| Lakeflow Declarative Pipelines   | [CAN VIEW][22]
| Query                            | [CAN VIEW][23]
| SQL warehouse                    | [CAN MONITOR][24]

Additionally, for Datadog to access your Databricks cost data in Data Observability: Jobs Monitoring or [Cloud Cost Management][26], the user or service principal used to query [system tables][27] must have the following permissions:
   - `CAN USE` permission on the SQL Warehouse.
   - Read access to the [system tables][27] within Unity Catalog. In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} and run the following commands, using the service principal's client ID (not its display name):
   ```sql
   GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
   GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
   GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
   ```
   The user granting these must have `MANAGE` privilege on `CATALOG system`.


### Tag spans at runtime

{{% djm-runtime-tagging %}}

### Configure cluster tags

Databricks custom cluster tags are automatically captured and available across Data Observability: Jobs Monitoring and the Datadog platform. The only exception is tags from Azure resource groups, which are not auto-captured.

To add tags manually, set the `DD_TAGS` environment variable in the Spark environment variables of your cluster. This has the same effect as Databricks custom cluster tags but requires manual configuration. Use comma or space separated key:value pairs following [Datadog tag conventions][28]:

```text
DD_TAGS=env:staging,team:data_engineering
```

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

### Set up Data Observability: Jobs Monitoring with Databricks Networking Restrictions
With [Databricks Networking Restrictions][12], Datadog may not have access to your Databricks APIs, which is required to collect traces for Databricks job executions along with tags and other metadata.

If you are controlling Databricks API access with [IP access lists][13], allow-listing Datadog's specific {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} allows Datadog to connect to the Databricks APIs in your workspace. See Databricks's documentation for configuring IP access lists for [individual workspaces][16] to give Datadog API access.

To monitor workspaces that use [Databricks Private Link][14] connectivity, see [Private Link Connectivity (Preview)][15].

[15]: /data_observability/jobs_monitoring/databricks/private_link

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
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
[25]: https://docs.datadoghq.com/api/latest/authentication/?code-lang=curl#validate-api-key
[26]: https://docs.datadoghq.com/cloud_cost_management
[27]: https://docs.databricks.com/aws/en/admin/system-tables/
[28]: /getting_started/tagging/
[29]: https://docs.databricks.com/aws/en/compute/configure#compute-log-delivery
