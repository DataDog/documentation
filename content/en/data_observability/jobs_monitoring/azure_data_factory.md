---
title: "Jobs Monitoring for Azure Data Factory"
description: "Enable Data Observability: Jobs Monitoring for Azure Data Factory pipelines with Datadog."
further_reading:
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
  - link: '/getting_started/integrations/azure/'
    tag: 'Documentation'
    text: 'Getting Started with Azure'
---

<div class="alert alert-info">Jobs Monitoring for Azure Data Factory is in preview. Contact your Datadog representative or <a href="/help/">support</a> to request access.</div>

## Overview

The Azure Data Factory (ADF) integration provides visibility into your ADF pipeline runs, activities, and data lineage across your Azure environment.

## Prerequisites

- Complete the [Datadog Azure integration setup][1]. The ADF integration reuses the App Registration (service principal) that the Azure integration already manages.
- The App Registration must have monitoring access to the subscriptions containing your Data Factories.

**Note**: Azure Data Factory Jobs Monitoring does not work with the [Azure Native Integration][2].

## Setup

### Step 1: Grant additional Azure permissions

The Datadog Azure integration assigns the built-in **Monitoring Reader** role to your App Registration at subscription scope. This covers read-only Azure Resource Manager (ARM) endpoints, but not the three POST endpoints Datadog needs to enumerate pipeline run history:

| Endpoint | Required permission |
|---|---|
| `POST .../queryPipelineRuns` | `Microsoft.DataFactory/factories/querypipelineruns/action` |
| `POST .../pipelineruns/{id}/queryActivityRuns` | `Microsoft.DataFactory/factories/pipelineruns/queryactivityruns/action` |
| `POST .../queryTriggerRuns` | `Microsoft.DataFactory/factories/querytriggerruns/action` |

Without these permissions, Datadog can inventory your factories but can't collect pipeline run history. Add one of the following role assignments to the Datadog App Registration for each Data Factory you want to monitor.

By default, Datadog monitors all Data Factories within the subscriptions you select in [Step 2](#step-2-enable-azure-data-factory-in-datadog). To restrict monitoring to specific factories, scope the role assignment to each factory instead of the subscription.

{{< tabs >}}
{{% tab "Minimal custom role (recommended)" %}}

This grants only the permissions Datadog needs, with no write access to your factories.

1. Save the following JSON to a file named `datadog-adf-reader.json`, replacing `<SUBSCRIPTION_ID>` with your Azure subscription ID:

   ```json
   {
     "Name": "Datadog Data Observability - ADF Reader",
     "Description": "Read-only access to ADF factory metadata and run history for Datadog Data Observability.",
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

1. Open [Azure Cloud Shell][3] and run the following, replacing the placeholder values:

   ```shell
   az role definition create --role-definition ./datadog-adf-reader.json

   az role assignment create \
     --assignee <DATADOG_APP_REGISTRATION_CLIENT_ID> \
     --role "Datadog Data Observability - ADF Reader" \
     --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.DataFactory/factories/<FACTORY_NAME>
   ```

   Repeat the `az role assignment create` command for each Data Factory you want to monitor.

**Note**: To find the Datadog App Registration Client ID, go to [Integrations > Azure][4] in Datadog and locate the App Registration entry, or find it in the Azure Portal under **Microsoft Entra ID > App registrations > [your Datadog app] > Overview**.

**Note**: Creating a custom role requires the **Owner** or **User Access Administrator** role at the assignable scope. If your security policy prohibits custom roles, use the built-in role instead.

{{% /tab %}}
{{% tab "Built-in Data Factory Contributor role" %}}

This is simpler to configure, but grants write access to the factory in addition to the read permissions Datadog needs. Scope the assignment to the specific factory (rather than the subscription or resource group) to limit that risk.

In the Azure Portal:

1. Navigate to your Data Factory.
1. Select {{< ui >}}Access Control (IAM){{< /ui >}} from the left sidebar.
1. Click {{< ui >}}Add{{< /ui >}} > {{< ui >}}Add role assignment{{< /ui >}}.
1. Select the **Data Factory Contributor** role.
1. Under {{< ui >}}Members{{< /ui >}}, search for and select your Datadog App Registration.
1. Click {{< ui >}}Review + assign{{< /ui >}}.

Or using the Azure CLI:

```shell
az role assignment create \
  --assignee <DATADOG_APP_REGISTRATION_CLIENT_ID> \
  --role "Data Factory Contributor" \
  --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.DataFactory/factories/<FACTORY_NAME>
```

{{% /tab %}}
{{< /tabs >}}

### Step 2: Enable Azure Data Factory in Datadog

1. In Datadog, navigate to [Data Observability > Settings > Integrations][5].
1. Locate the {{< ui >}}Azure Data Factory{{< /ui >}} section and click {{< ui >}}Configure{{< /ui >}}.
1. On the onboarding page, select the Azure App Registration you granted permissions to in Step 1. If you haven't connected an Azure App Registration to Datadog yet, complete the [Azure integration setup][1] first.
1. Select the subscriptions that contain the Data Factories you want to monitor. Only subscriptions accessible to the selected App Registration are shown.

   **Note**: You must select at least one subscription to save the configuration. Datadog monitors all Data Factories within the selected subscriptions.

1. Click {{< ui >}}Save{{< /ui >}}.

### Step 3: View your pipeline runs

After saving, Datadog schedules an inventory crawl of your selected subscriptions. Once the crawl completes, your ADF pipeline runs appear on the [Jobs page][6], listed with status, duration, and associated factory and subscription. Drill into an individual pipeline run to see activity-level details and data lineage for Copy activities.

If you don't see your pipeline runs after a few hours, check the following:

- The App Registration has the role assignment from Step 1 on each target factory:

  ```shell
  az role assignment list \
    --assignee <DATADOG_APP_REGISTRATION_OBJECT_ID> \
    --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.DataFactory/factories/<FACTORY_NAME>
  ```

- The subscriptions containing your factories are selected in the integration configuration (Step 2).
- A Datadog representative has enabled preview access for your organization.
- Your factories have had pipeline runs recently. The first crawl only covers the hour before it ran; later crawls pick up where the previous one left off. Runs completed before you configured the integration don't appear retroactively.

[1]: /getting_started/integrations/azure/
[2]: /integrations/guide/azure-native-integration
[3]: https://shell.azure.com
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://app.datadoghq.com/data-obs/settings/integrations
[6]: https://app.datadoghq.com/data-obs/jobs
