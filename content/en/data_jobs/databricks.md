---
title: Enable Data Jobs Monitoring for Databricks
kind: documentation
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}}

[Data Jobs Monitoring][7] gives visibility into the performance and reliability of your Apache Spark and Databricks jobs.

## Setup

Follow these steps to enable Data Jobs Monitoring for Databricks.

1. [Configure the Datadog-Databricks integration](#configure-the-datadog-databricks-integration) with your Databricks API token.
1. [Install the Datadog Agent](#install-the-datadog-agent-on-your-databricks-clusters) on your Databricks cluster(s).

### Configure the Datadog-Databricks integration

1. In your Databricks workspace, go to **Settings** > **Developer**. Next to **Access tokens**, click **Manage**.
1. Click **Generate new token**, enter a comment, and click **Generate**. Take note of your token.
1. In Datadog, open the Databricks integration tile.
1. On the **Configure** tab, click **Add New**.
1. Enter a workspace name, your Databricks workspace URL, and the Databricks token you generated.
   {{< img src="data_jobs/databricks/configure-token.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, and API token." style="width:100%;" >}}


### Install the Datadog Agent on your Databricks cluster(s)

You can choose to install the Agent globally, or on a specific Databricks cluster.

{{< tabs >}}
{{% tab "Global init (Recommended)" %}}

1. In Databricks, click your display name (email address) in the upper right corner of the page.
1. Select **Settings** and click the **Compute** tab.
1. In the **All purpose clusters** section, next to **Global init scripts**, click **Manage**.
1. Click **Add**. Name your script. Then, in the **Script** field, copy and paste the following script, remembering to replace the placeholders with your parameter values. 

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME> 

   # Download and run the latest init script
   bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/databricks/databricks_init_latest.sh)" || true
   ```

   The script above sets the required parameters, downloads and runs the latest init script for Data Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the file name in the URL with `databricks_init_1.0.0.sh` to use the last stable version.

1. To enable the script for all new and restarted clusters, toggle **Enabled**.
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI, admin settings, global init scripts. A script called 'install-datadog-agent' is in a list with an enabled toggle." style="width:100%;" >}}
1. Click **Add**.

#### Set the required init script parameters

Provide the values for the init script parameters at the beginning of the global init script.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
```

Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1]                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2]                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration) |         |
| DRIVER_LOGS_ENABLED      | To collect spark driver logs in Datadog                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | To collect spark workers logs in Datadog                                                                                                                         | false   |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/

{{% /tab %}}
{{% tab "On a specific cluster" %}}

1. In Databricks, create a init script file in **Workspace** with the following content. Be sure to make note of the file path.
   ```shell
   #!/bin/bash

   # Download and run the latest init script
   bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/databricks/databricks_init_latest.sh)" || true
   ```

   The script above downloads and runs the latest init script for Data Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the file name in the URL with `databricks_init_1.0.0.sh` to use the last stable version.

1. On the cluster configuration page, click the **Advanced options** toggle.
1. At the bottom of the page, go to the **Init Scripts** tab.
   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI, cluster configuration advanced options,  Init Scripts tab. A 'Destination' drop-down and an 'Init script path' file selector." style="width:80%;" >}}
   - Under the **Destination** drop-down, select `Workspace`.
   - Under **Init script path**, enter the path to your init script.
   - Click **Add**.

#### Set the required init script parameters

1. In Databricks, on the cluster configuration page, click the **Advanced options** toggle.
2. At the bottom of the page, go to the **Spark** tab.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Databricks UI, cluster configuration advanced options, Spark tab. A textbox titled 'Environment variables' contains values for DD_API_KEY and DD_SITE." style="width:100%;" >}}

   In the **Environment variables** textbox, provide the values for the init script parameters.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   Optionally, you can also set other init script parameters and Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`. The script can be configured using the following parameters:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Your [Datadog API key][1]                                                                                                                                        |         |
| DD_SITE                  | Your [Datadog site][2]                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Name of your Databricks Workspace. It should match the name provided in the [Datadog-Databricks integration step](#configure-the-datadog-databricks-integration) |         |
| DRIVER_LOGS_ENABLED      | To collect spark driver logs in Datadog                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | To collect spark workers logs in Datadog                                                                                                                         | false   |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/

3. Click **Confirm**.

{{% /tab %}}

{{< /tabs >}}

## Validation

In Datadog, view the [Data Jobs Monitoring][6] page to see a list of all your Databricks jobs.

## Tag spans at runtime

{{% djm-runtime-tagging %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /data_jobs
