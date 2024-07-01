---
"categories":
- azure
- collaboration
- developer tools
- issue tracking
- provisioning
- source control
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure DevOps metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_devops"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/"
  "tag": Blog
  "text": Monitor Azure Pipelines with Datadog CI Visibility
- "link": "https://www.datadoghq.com/blog/azure-pipeline-testing-with-datadog-synthetic-monitoring/"
  "tag": Blog
  "text": Run Datadog Synthetic tests in Azure Pipelines
- "link": "https://www.datadoghq.com/blog/monitor-azure-devops/"
  "tag": Blog
  "text": Monitor Azure DevOps workflows and pipelines with Datadog
"git_integration_title": "azure_devops"
"has_logo": true
"integration_id": "azuredevops"
"integration_title": "Microsoft Azure DevOps"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_devops"
"public_title": "Datadog-Microsoft Azure DevOps Integration"
"short_description": "Track key Azure DevOps metrics."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

[Azure DevOps][1] provides features that organizations use to create and develop products faster. Integrate Datadog with Azure DevOps to:

- Track pull requests and merges to your various projects.
- Monitor release and build events in context with other data from your stack.
- Track durations of completed builds and work items.
- Keep track of work items and updates.

## Setup

### Installation

In Datadog, click the install button in the [Azure DevOps integration tile][2].

### Configuration

Use a service hook to create events and metrics in Datadog in response to events from Azure DevOps services:

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="Configure Service Hooks" >}}

1. In Azure, go to your project's service hooks page.
2. Click **Create subscription**.
3. Pick the Datadog service.
4. Configure the triggering Visual Studio event.
5. Enter your [Datadog API key][3] into the required field.
6. Add your Datadog organization site: {{< region-param key="dd_site_name" code="true" >}}
7. Test the service hook subscription and finish the wizard. **Note**: The test does not validate your API key or Datadog organization site.
8. Repeat steps 4-7 for each event type you want to send to Datadog. All event types are accepted.

After your service hooks are configured, go to Datadog to see events and metrics from Azure DevOps.

Additional reference from Azure: [Create a service hook for Azure DevOps Services and TFS with Datadog][4]

#### Programmatic

Follow Azure's documentation to [Create a service hooks subscription programmatically][5] and use Datadog's endpoint:

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

### Use Datadog monitors as gates in Azure pipelines

You can also use Datadog monitors as gates to [control release deployments][6] in Azure Pipelines. This option allows you to automatically stop problematic deployments if an unhealthy state is detected in Datadog.

1. Add the [Datadog Monitors as Deployment Gates][7] extension to your Azure DevOps org.

    {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="Extension Service Connection" >}}

2. In Azure DevOps, go to **Service Connections** under your project settings and select **New Service Connection**.
3. Select Datadog from the list and press **Next**.
4. In the fields provided, add your Datadog API key and application key for the account you want to use, then enter a name and description to identify this Datadog account in Azure DevOps. Click **Save**. You can add additional service connections if you need to query monitors from multiple Datadog accounts.
5. Go to **Azure Pipelines** to configure your deployment. Here, there's an option to add pre or post deployment conditions between stages. Select where you want to add a Datadog monitor, and then enable the toggle switch for **Gates**.
6. Click **Add** and select the option **Query Datadog monitors**.
7. Select the Datadog service connection then enter your monitor ID and the severity threshold you want to use. The severity threshold is the state of the monitor (either `Alert` or `Warning`) at which the task is failed.

    {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Datadog Monitor Gate" >}}

8. Repeat steps 5-7 to add additional gates as needed in your deployment pipeline.

**Note**: Use [composite monitors][8] to monitor multiple conditions for the gates in your pipeline as part of a single health state for each stage.

To view the source code, see the [Azure Devops Monitor Gate Extension repo][9]."

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_devops" >}}


### Events

The Azure DevOps integration supports the following [service hook event types][11]:

- Build and release
- Work items
- Code


### Service Checks

The Azure DevOps integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][12].

### FAQ

#### Is there an additional cost for this integration?
The metrics and events generated from this integration do not incur any additional costs.

#### How long does this data persist in Datadog?
The data from this integration is held for 15 months, similar to other types of timeseries data in Datadog.

#### How long does it take for the events and metrics to display in Datadog?
The total latency has many variables, but in most cases the events and metrics display in Datadog within 30 seconds of the incident occurring.

#### What can you do with the Azure DevOps events and metrics in Datadog?
The events and metrics can be used like other events and metrics in Datadog, including building dashboards, setting up monitors, and troubleshooting.

#### How are the metrics for build duration and work item duration generated?
The build duration is generated from _build completed_ events by taking the time difference between when the build was initiated to when it completed (measured in seconds).

The work item duration is generated from _work item updated_ events by taking the time difference between the transition to `Done` and when the work item was created (measured in hours).

**Note**: If a `Done` work item is re-opened, the next time it is transitioned to `Done` another data point is generated. The initial data point is not modified, and the new data point still measures from the time the work item was initially created.

#### Your service hook subscription test returns a success message, why aren't events arriving to Datadog?
The service hook subscription test only checks whether Azure DevOps is able to send events to Datadog. It does not validate your API key or your Datadog organization site (US or EU). Make sure that the API key and site are correct.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?toc=%2Fazure%2Fdevops%2Fget-started%2Ftoc.json&view=azure-devops
[2]: https://app.datadoghq.com/integrations/azuredevops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[7]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[8]: /monitors/monitor_types/composite/
[9]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[11]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[12]: https://docs.datadoghq.com/help/

