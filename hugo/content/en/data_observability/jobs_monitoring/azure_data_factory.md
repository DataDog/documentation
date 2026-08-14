---
title: "Jobs Monitoring for Azure Data Factory"
description: "Enable Data Observability: Jobs Monitoring for Azure Data Factory pipelines with Datadog."
further_reading:
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
  - link: '/integrations/azure/'
    tag: 'Documentation'
    text: 'Azure Integration'
  - link: '/data_observability/lineage/'
    tag: 'Documentation'
    text: 'Data Observability: Lineage'
---

<div class="alert alert-info">Jobs Monitoring for Azure Data Factory is in Preview.</div>

## Overview

[Data Observability: Jobs Monitoring][1] gives visibility into the performance and reliability of your Azure Data Factory pipelines. Datadog reads pipeline and activity run history from the Data Factory management API. Each pipeline run appears as a job run with its activities broken out, along with the error message for failed runs.

Datadog also derives dataset lineage from the activities in your pipelines, connecting each pipeline to the tables and files it reads and writes.

## Prerequisites

Before you begin, make sure you have:

- An Azure subscription containing the data factories you want to monitor.
- The [Datadog Azure integration][2] installed, with an App Registration that has access to that subscription.
- Permission to create role assignments on the subscription or on individual data factories.

## Add required Azure permissions

The Datadog Azure integration assigns the **Monitoring Reader** role. That role covers reading data factory metadata, but not reading run history. Azure registers the run-history endpoints as *actions* rather than *reads*, and the wildcard in Monitoring Reader matches reads only.

Grant the following three actions to the App Registration used by your Datadog Azure integration:

- `Microsoft.DataFactory/factories/querypipelineruns/action`
- `Microsoft.DataFactory/factories/pipelineruns/queryactivityruns/action`
- `Microsoft.DataFactory/factories/querytriggerruns/action`

Without them, Datadog can list your factories and pipelines but collects no runs.

{{< tabs >}}
{{% tab "Custom role (recommended)" %}}

A custom role grants only the permissions Datadog uses. Save the following definition as `datadog-adf-reader.json`, replacing `<SUBSCRIPTION_ID>` with your subscription ID:

```json
{
  "Name": "Datadog Data Observability - ADF Reader",
  "Description": "Read-only access to Azure Data Factory metadata and run history for Datadog Data Observability.",
  "IsCustom": true,
  "Actions": [
    "Microsoft.DataFactory/factories/read",
    "Microsoft.DataFactory/factories/*/read",
    "Microsoft.DataFactory/factories/querypipelineruns/action",
    "Microsoft.DataFactory/factories/querytriggerruns/action",
    "Microsoft.DataFactory/factories/pipelineruns/queryactivityruns/action"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": ["/subscriptions/<SUBSCRIPTION_ID>"]
}
```

Create the role, then assign it to the App Registration:

```shell
az role definition create --role-definition ./datadog-adf-reader.json

az role assignment create \
  --assignee <APP_REGISTRATION_CLIENT_ID> \
  --role "Datadog Data Observability - ADF Reader" \
  --scope /subscriptions/<SUBSCRIPTION_ID>
```

To limit access to specific factories, repeat the assignment with a factory scope instead of the subscription scope:

```shell
--scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.DataFactory/factories/<FACTORY_NAME>
```

To assign the role across several subscriptions, set `AssignableScopes` to a management group, such as `/providers/Microsoft.Management/managementGroups/<MANAGEMENT_GROUP_ID>`.

**Note**: Creating a role definition requires the **Owner** or **User Access Administrator** role at the assignable scope.

{{% /tab %}}
{{% tab "Built-in role" %}}

If your organization does not allow custom roles, assign the built-in **Data Factory Contributor** role, which includes the three actions:

```shell
az role assignment create \
  --assignee <APP_REGISTRATION_CLIENT_ID> \
  --role "Data Factory Contributor" \
  --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.DataFactory/factories/<FACTORY_NAME>
```

You can also assign it in the Azure portal under **Data Factory** > **Access control (IAM)** > **Add role assignment**.

This role also grants write and delete access on factories, pipelines, datasets, and linked services. Datadog uses only the read and query permissions. Scope the assignment to individual factories rather than to the whole subscription to limit what the role covers.

{{% /tab %}}
{{< /tabs >}}

## Configure the integration

1. Navigate to [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3].
2. Click {{< ui >}}Configure{{< /ui >}} next to Azure Data Factory.

   {{< img src="data_observability/azure_data_factory/settings-integrations.png" alt="Azure Data Factory entry on the Data Observability Settings Integrations page, expanded to show one connected account" style="width:100%;" >}}

3. Select the App Registration that has access to the subscriptions hosting your data factories.

   {{< img src="data_observability/azure_data_factory/app-registration-selection.png" alt="App Registration selection step showing client ID, tenant, and available subscription count for each registration" style="width:100%;" >}}

4. Select the subscriptions to monitor, then click {{< ui >}}Save{{< /ui >}}.

   {{< img src="data_observability/azure_data_factory/subscription-selection.png" alt="Subscription selection step with a checkbox for each subscription available on the App Registration" style="width:100%;" >}}

Datadog monitors every data factory in the subscriptions you select.

## What Datadog collects

After setup, Datadog collects new pipeline and activity runs every few minutes. Runs from a pipeline you create after setup are collected on the same cadence.

For each pipeline run, Datadog reports:

- The pipeline run and each of its activity runs, with start time, end time, and duration.
- The run status, and the error message for failed runs.
- The trigger that started the run.
- An `env` tag set to the name of the data factory.
- The annotations on the pipeline and the user properties on each activity, as tags. Tags you set in Data Factory are available for filtering and grouping in Datadog.

## Dataset lineage

Datadog derives dataset lineage from the activities in each pipeline run, using the runtime values of the datasets and linked services the activity resolved. Because lineage comes from the run rather than from the pipeline definition, parameterized datasets resolve to the assets each run touched.

For activities that move data, such as a copy, Datadog reports the source and sink datasets. For activities that run SQL, Datadog reports the tables the statement read and wrote.

Datadog resolves datasets across the major warehouse, database, and object storage connectors, including:

- Snowflake
- Google BigQuery
- Amazon Redshift
- SQL Server and Azure SQL
- Azure Databricks Delta Lake
- Amazon S3
- Azure Blob Storage
- Azure Data Lake Storage

Assets resolve to the same entities that Datadog's other {{< prodname >}}Data Observability{{< /prodname >}} integrations report, so lineage connects across your data platforms.

Activities that Datadog cannot resolve datasets for appear as job runs without dataset lineage.

To see the lineage for a pipeline, open [Lineage][4] and anchor on the pipeline. The graph shows the tables the pipeline read upstream and the tables it wrote downstream.

{{< img src="data_observability/azure_data_factory/adf-lineage-graph.png" alt="The Lineage graph anchored on an Azure Data Factory pipeline, with the table it reads on the left and the three tables it writes on the right" style="width:100%;" >}}

## Validate

Open [Data Observability: Jobs Monitoring][1] and set the job type selector to {{< ui >}}ADF Pipelines{{< /ui >}}. Your pipelines appear with their run counts, failure rates, and durations, tagged with the name of their data factory.

{{< img src="data_observability/azure_data_factory/adf-pipelines-jobs-list.png" alt="Data Observability Jobs Monitoring overview filtered to ADF Pipelines, listing pipelines with their monitors, last status, duration, and failure rate" style="width:100%;" >}}

Click a pipeline to see how it performed across runs, then click a run to open it. The flame graph shows the pipeline run with each of its activities nested underneath, so you can see which activity took the longest. The {{< ui >}}Overview{{< /ui >}} tab lists the run's metadata, including the trigger that started it, and for failed runs the error message.

{{< img src="data_observability/azure_data_factory/adf-pipeline-run.png" alt="Flame graph for a single Azure Data Factory pipeline run, showing the pipeline span with its activity spans nested underneath, and the span Overview tab listing the trigger that started the run" style="width:100%;" >}}

## Troubleshooting

### No runs appear, but pipelines are listed

Datadog can read your factory metadata but not its run history. Confirm that the App Registration has the three `action` permissions described in [Add required Azure permissions](#add-required-azure-permissions). Role assignments can take a few minutes to take effect.

### Nothing appears at all

Confirm that the subscriptions hosting your data factories are selected in the integration configuration, and that the App Registration you selected has access to them. The Data Observability Settings page reports connection errors and warnings on the account.

### Pipelines appear without dataset lineage

Not every activity carries the information Datadog needs to resolve the datasets it read and wrote. See [Dataset lineage](#dataset-lineage) for what Datadog resolves. Pipelines built from activities it cannot resolve appear as job runs without lineage edges.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-jobs/
[2]: /integrations/azure/
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: /data_observability/lineage/
