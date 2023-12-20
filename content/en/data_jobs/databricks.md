---
title: Data Jobs Monitoring for Databricks
kind: documentation
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

Data Jobs Monitoring gives visibility into the performance and reliability of your Databricks jobs and underlying infrastructure.

## Setup

1. [Configure the Datadog-Databricks integration](#configure-the-datadog-databricks-integration) with your Databricks API token.
2. [Install the Datadog Agent](#install-the-datadog-agent-on-your-databricks-clusters) on your Databricks cluster(s).
3. [Add your Datadog API key](#add-your-datadog-api-key-in-databricks) in Databricks.

### Configure the Datadog-Databricks integration 

1. In your Databricks workspace, click _User Settings_. Then click on _Access Tokens_.
2. Click _Generate new token_, enter a comment, and click _Generate_. Take note of your token.
3. In Datadog, open the Databricks integration tile.
4. On the _Configure_ tab, click _add new_. Enter a workspace name, your Databricks workspace URL, and the token you generated.
   {{< img src="data_jobs/databricks/configure-token.png" alt="In Datadog-Databricks integration, a Databricks workspace." style="width:100%;" >}}


### Install the Datadog Agent on your Databricks cluster(s)

Use [this init script][2] to install the Datadog Agent on a specific Databricks cluster, or globally.

{{< tabs >}}
{{% tab "On a specific cluster" %}}
1. Save the [init script][1] to TK
2. In Databricks, on the cluster configuration page, click the _Advanced options_ toggle.
3. At the bottom of the page, go to the _Init Scripts_ tab.
4. Under the _Destination_ drop-down, select `Workspace`.
5. Under _Init script path_, enter the path to your init script. For example, TK
6. Click _Add_.

[1]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init_without_logs.sh
{{% /tab %}}
{{% tab "Global" %}}
1. In Databricks, go to _Admin Settings_ and click the _Global Init Scripts_ tab.
2. Click _Add_. Name your script. Then, in the _Script_ field, copy and paste the [init script][1].
3. Toggle _Enabled_.

[1]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init_without_logs.sh
{{% /tab %}}
{{< /tabs >}}

### Add your Datadog API key in Databricks
TK

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[2]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init_without_logs.sh