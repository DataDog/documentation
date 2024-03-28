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
1. [Add your Datadog API key](#add-your-datadog-api-key-in-databricks) in Databricks.

### Configure the Datadog-Databricks integration 

1. In your Databricks workspace, go to **Settings** > **Developer**. Next to **Access tokens**, click **Manage**.
1. Click **Generate new token**, enter a comment, and click **Generate**. Take note of your token.
1. In Datadog, open the Databricks integration tile.
1. On the **Configure** tab, click **Add New**. 
1. Enter a workspace name, your Databricks workspace URL, and the Databricks token you generated.
   {{< img src="data_jobs/databricks/configure-token.png" alt="In the Datadog-Databricks integration tile, a Databricks workspace is displayed. This workspace has a name, URL, and API token." style="width:100%;" >}}


### Install the Datadog Agent on your Databricks cluster(s)

Use one of the following init scripts:
- [Install the Datadog Agent][8]
- [Install the Datadog Agent without logs][2]

You can choose to install the Agent globally, or on a specific Databricks cluster.

{{< tabs >}}
{{% tab "Global init (Recommended)" %}}
1. In Databricks, go to **Settings** > **Compute**. In the **All purpose clusters** section, next to **Global init scripts**, click **Manage**.
1. Click **Add**. Name your script. Then, in the **Script** field, copy and paste the init script.
1. To enable the script for all new and restarted clusters, toggle **Enabled**.
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI, admin settings, global init scripts. A script called 'install-datadog-agent' is in a list with an enabled toggle." style="width:100%;" >}}
1. Click **Add**.

{{% /tab %}}
{{% tab "On a specific cluster" %}}
1. Download the init script.
1. In Databricks, on the cluster configuration page, click the **Advanced options** toggle.
1. At the bottom of the page, go to the **Init Scripts** tab.
   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI, cluster configuration advanced options,  Init Scripts tab. A 'Destination' drop-down and an 'Init script path' file selector." style="width:80%;" >}}
   - Under the **Destination** drop-down, select `Workspace`.
   - Under **Init script path**, enter the path to your init script.
   - Click **Add**.

{{% /tab %}}

{{< /tabs >}}

### Add your Datadog API key in Databricks
1. Find your [Datadog API key][3].
1. In Databricks, on the cluster configuration page, click the **Advanced options** toggle.
1. At the bottom of the page, go to the **Spark** tab.
   {{< img src="data_jobs/databricks/configure-databricks-spark-envvars-updated.png" alt="Databricks UI, cluster configuration advanced options, Spark tab. A textbox titled 'Environment variables' contains values for DD_API_KEY and DD_SITE." style="width:100%;" >}}

   In the **Environment variables** textbox, set values for: 
    - `DD_API_KEY`: Your Datadog API key. (You can also use Databricks [secret management][4] to store your API key.)
    - `DD_SITE`: Your [Datadog site][5].

   For example, if your Datadog site is {{< region-param key="dd_site" code="true" >}}, paste the following into the box:

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   ```

   Optionally, you can also set other Datadog environment variables here, such as `DD_ENV` and `DD_SERVICE`.
1. Click **Confirm**.

## Validation

In Datadog, view the [Data Jobs Monitoring][6] page to see a list of all your Databricks jobs.

## Tag spans at runtime

{{% djm-runtime-tagging %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[2]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init_without_logs.sh
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.databricks.com/en/security/secrets/index.html
[5]: /getting_started/site/
[6]: https://app.datadoghq.com/data-jobs/
[7]: /data_jobs
[8]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init.sh