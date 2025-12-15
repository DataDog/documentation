---
title: Azure Advanced Configuration
description: "Advanced configuration and architecture of the Datadog Azure integration"
aliases:
- /integrations/guide/azure-architecture-and-configuration/
- /integrations/guide/powershell-command-to-install-azure-datadog-extension/
- /integrations/guide/azure-vms-appear-in-app-without-metrics/
- /integrations/guide/azure-troubleshooting/
- /integrations/guide/powered-down-azure-vm-on-infrastructure-list/
- /integrations/guide/azure-count-metric/
- /integrations/guide/azure-status-metric
- /integrations/faq/azure-vm-status-is-not-reporting
- /integrations/faq/azure-status-metric
- /integrations/faq/azure-count-metric
- /integrations/faq/azure-troubleshooting
- /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
- /integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
- /integrations/faq/powershell-command-to-install-azure-datadog-extension
further_reading:
- link: "/integrations/azure/"
  tag: "Documentation"
  text: "Azure Integration"
---

## Overview

This guide provides advanced configuration options and reference architectures for users configuring Datadog's Azure integration, as well as alternative configuration options for specific use cases.

### Reference architectures

The diagrams in this guide provide a visual representation of the configuration process and outcome when following the steps in [Getting Started with Azure][1]. This guide provides a detailed overview of Datadog's interaction with your Azure environment and answers common security, compliance, and governance questions.

### Alternate configurations

The setup processes documented in [Getting Started with Azure][1] are the recommended steps and result in the ideal configuration for the majority of users. Alternate configuration options in this document may be preferable for certain use cases. Any trade-offs in performance, features, or ease-of-management are outlined as needed.

## Metric and data collection

Enabling Datadog's Azure integration allows Datadog to:

  - Discover and monitor all resources in all subscriptions within the given scope
  - Automatically update discovered metric definitions, to ensure that all of the metrics available from Azure Monitor are collected
  - Ingest a range of both general and resource-specific metadata (including custom Azure tags), and apply it to the associated resource metrics in Datadog as tags
  - Query Azure metadata APIs and use the responses to [generate useful metrics in Datadog][2] for insights that Azure Monitor does not support

The Azure APIs used and data collected are identical regardless of whether you use the standard or Azure Native version of the integration.

The diagram below outlines the process and resulting architecture of the Azure integration configuration described in [Getting Started with Azure][1].

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Workflow diagram showing Azure App Registration integration setup: create app registration with service principal and client secrets in Azure, assign monitoring reader role to subscription or management resources, then configure integration with metric tag filters in the Datadog backend." >}}

After this is completed, data collection begins automatically. The app registration allows Datadog to [request a token from Azure Active Directory][3] (AD). Datadog uses this token as the authorization for API calls to various Azure APIs, to discover resources within the scope provided, and collect data. This continuous process runs with two-minute intervals by default, and is used to discover and collect data from your Azure environment. The data collection process is pictured below.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Workflow diagram showing Azure metric collection process: the Datadog backend reads configuration, authenticates through service principal to Azure Active Directory, collects subscription and resource metadata using RBAC permissions, filters resources by tags, then retrieves metrics from Azure Monitor for ingestion into Datadog." >}}

## Log collection

The diagram below provides a reference architecture for forwarding logs from Azure to Datadog, as described in the [Event Hub log forwarding guide][5].

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Architecture diagram showing manual Azure log forwarding setup across two regions where Azure resources use diagnostic settings to send logs through Event Hubs and Log Forwarding Functions to Datadog Logs Ingestion." >}}

### Alternate configuration options for log forwarding

The default architecture above is suitable for most users. Depending on the scale and composition of your Azure environment, as well as the methods your organization uses to implement this architecture, the sections below detail additional considerations that may be relevant.

#### Using the provided templates

The **Deploy to Azure** button in the main Azure [Event Hub Logging guide][13] provides a template for creating an Event Hub and forwarder function pair. In addition to using this template to deploy directly, you can use the underlying ARM templates as a starting point for your own infrastructure as code deployments.

These templates do not add diagnostic settings, apart from one optional diagnostic setting for activity logs. For resource logs, Datadog recommends utilizing ARM templates or Terraform to add diagnostic settings to your resources programmatically. These diagnostic settings must be added to every resource that needs to send resource logs to Datadog.

#### Region considerations

Diagnostic settings can only send resource logs to Event Hubs in the same region as the resource. Add an Event Hub and forwarder function pair in each region that contains resources for which you want to send resource logs to Datadog.

However, diagnostic settings are not limited to sending logs to Event Hubs in the same subscription as the resource. If you have multiple subscriptions within your Azure tenant, they can share a single Event Hub and forwarder function within the same region.

#### High-volume log considerations

As the volume of logs scales, you may see bottlenecks, typically arising in the Event Hubs. If you plan to submit high log volumes, you may want to consider adding additional partitions or using a Premium or Dedicated tier.
For especially high log volumes, you may consider adding additional Event Hub and forwarder function pairs within the same region, and splitting traffic between them.

{{% collapse-content title="Commands to install the Azure Datadog Extension" level="h4" expanded=false id="azure-datadog-extension-commands" %}}
## Install on Azure

Datadog provides an Azure extension to assist with Agent deployment on Azure instances:

* [Introducing Azure monitoring with one-click Datadog deployment][6]
* [Azure integration][10] _All sites_
* [Azure Native integration][7] _US3 only_

An alternative to the GUI installation is the command line.
To run the Datadog Agent in your Azure instances as an extension, use the command that matches your environment. Replace `<SITE_PARAMETER>` with your Datadog account **site parameter** value in the [Datadog sites page][33], and `<DATADOG_API_KEY>` with your [Datadog API key][9].

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

More information on the syntax to set Azure instance extensions can be found in the [Azure Extension Set-AzVMExtension documentation][100].

The Azure Extension can accept both normal settings and protected settings.

The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | String | The Agent version to install, following the format `x.y.z` or `latest` |
| `agentConfiguration` | URI | (optional) URI to the Azure blob containing the Agent configuration as a zip file. |
| `agentConfigurationChecksum` | String | The SHA256 checksum of the Agent configuration zip file, mandatory if `agentConfiguration` is specified. |

The protected settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

**Note**: If `agentConfiguration` and `api_key` are specified at the same time, the API key found in the `agentConfiguration` takes precedence. Also note that if an API key is set on the target machine, it's not possible to change it with `Set-AzVMExtension`.

### Specifying a configuration URI

This example shows how to specify a configuration for the Datadog Agent to use.
The Datadog Agent configuration URI must be an Azure blob storage URI.
The Datadog Windows Agent Azure Extension checks that the `agentConfiguration` URI comes from the `.blob.core.windows.net` domain.
The Datataog Agent configuration should be created from the `%PROGRAMDATA%\Datadog` folder.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Note**: After the Datadog Agent is installed, the configuration can only be changed when upgrading to a newer version.

### Set a specific version of the Agent

This example shows how to specify a version of the Agent to install. By default the Datadog Windows Agent Azure Extension installs the latest version of the Datadog Agent.

**Note**: Downgrades are *not* supported, so it's not possible to install a *lower* version of the Datadog Agent than the one currently installed on the target machine. To install a lower version of the Datadog Agent, uninstall the previous version first by removing the Datadog Windows Agent Azure Extension on the target machine. Removing the Datadog Windows Agent Azure Extension does not remove the Datadog Agent configuration.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

More information on the syntax to set Azure instance extensions can be found in the [Azure Extension CLI reference][200].

The Azure Extension can accept both normal settings and protected settings.

The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | String | The Agent version to install, following the format `x.y.z` or `latest` |
| `agentConfiguration` | URI | (optional) URI to the Azure blob containing the Agent configuration as a zip file. |
| `agentConfigurationChecksum` | String | The SHA256 checksum of the Agent configuration zip file, mandatory if `agentConfiguration` is specified. |

The protected settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

**Note**: If `agentConfiguration` and `api_key` are specified at the same time, the API key found in the `agentConfiguration` takes precedence. If an API key is set on the target machine, it's not possible to change it with the `api_key` setting.

### Specifying a configuration URI

This example shows how to specify a configuration for the Datadog Agent to use.
- The Datadog Agent configuration URI must be an Azure blob storage URI.
- The Datadog Linux Agent Azure Extension checks that the `agentConfiguration` URI comes from the `.blob.core.windows.net` domain.
- The Datataog Agent configuration should be created from the `/etc/datadog-agent/` folder.

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

[200]: https://learn.microsoft.com/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Install on Azure Arc

To run the Datadog Agent in your [Azure Arc][11] instances as an extension, use the command that matches your environment.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

More information on the syntax to set Azure `connectedmachine` extensions can be found in the [az connectedmachine extension][12] page.
{{% /collapse-content %}} 

{{% collapse-content title="Azure count metrics" level="h4" expanded=false id="azure-count-metrics" %}}
Datadog generates an additional metric for each resource monitored with the [Azure integration][23]: `azure.*.count`. For example, Azure Virtual Machines monitored by Datadog reports `azure.vm.count`.

The `azure.*.count` metric is an improvement over `azure.*.status`, which is deprecated.

## Count metric

The `azure.*.count` metric provides two fundamental pieces of information:

- The number of resources of that type.
- The status of each resource as reported by Azure.

The `azure.*.count` metric is created in the same namespace as the other metrics for that resource type, for example: `azure.network_loadbalancers.count`. It includes all of the same metadata tags as the other metrics in that namespace, plus as additional tag for `status`.

### Use cases

Use the `azure.*.count` metric to:

- Create a view of the number of Virtual Machines broken out by their status over time by graphing `azure.vm.count` over everything and summing by `status`.
- Create query widgets in dashboards to display the number of a given resource type. Use any available tags to scope the count to a relevant aggregation such as region, resource group, kind, or status.
- Create monitors to alert you about the status of different Azure resources.

**Note**: In some cases, the default visualization settings can make it appear as though resources are being double counted intermittently in charts or query widgets. This does not affect monitors or widgets scoped to a specific status.
You can reduce this effect by turning off [interpolation][22] in charts or query widgets by setting Interpolation > none or using `.fill(null)`.

For most resource types, the possible statuses are:

- Running
- Unavailable
- Unknown
- Degraded
- Failed

Virtual machines have more detailed statuses, including:

- Running
- Stopped_deallocated
- Stopped
- Unknown
- Unavailable
- Degraded
- Failed

If you see a status of `query_failed` you need to enable the Resource Health provider in Azure.
{{% /collapse-content %}} 

## Azure integration troubleshooting

{{% collapse-content title="Find your tenant name" level="h4" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. Navigate to [portal.azure.com][24].
2. In the left sidebar, select **Azure Active Directory**.
3. Under **Basic information**, find the **Name** value.
{{% /collapse-content %}} 

{{% collapse-content title="Unable to log in" level="h4" expanded=false id="troubleshooting-unable-to-login" %}}
If you experience an error logging in while trying to install the Azure integration, contact [Datadog support][36]. When possible, attach a screenshot.
{{% /collapse-content %}} 

{{% collapse-content title="Missing metrics" level="h4" expanded=false id="troubleshooting-missing-metrics" %}}
Ensure you completed the installation process, which includes giving read permissions to the Azure application for the subscriptions you want to monitor.

For ARM deployed virtual machines, you must also turn on Diagnostics and select the VM metrics you would like to collect. See **Enable Diagnostics** below for instructions.

For other missing metrics, contact [Datadog support][36] with the following information about the metric:
- dimensions
- resource group
- resource name
- subscription ID or subscription name 

Attach a screenshot of a graph from Azure Monitor that shows a graph of the metric. **Important**: Graph 1-minute datapoints in the screenshot.

#### Enable diagnostics

Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc. Follow these instructions:

1. Navigate to the [Azure portal][24] and locate your VM.
2. Click on **Diagnostics settings** under the **Monitoring** section.
3. Pick a storage account and click **Enable guest-level monitoring**.
4. By default, basic metrics and logs are enabled. Adjust based on your preferences.
5. Click **Save** to save any changes.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="azure diagnostics settings overview displayed with No storage account highlighted under Pick a storage account and enable guest level monitoring enabled" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Discrepancy between your data in Azure and Datadog" level="h4" expanded=false id="troubleshooting-metric-discrepancy" %}}
Datadog's Azure integration collects all metrics from [Azure Monitor][27]. Metrics are collected with all available dimensions (which are mapped to tags in Datadog), the highest time granularity, and the primary aggregation type.

The sections below describe two important distinctions to be aware of, as well as steps to [reconcile the discrepancy](#reconcile-the-discrepancy).

#### 1. Time aggregation

Datadog displays raw data from Azure in per-second values, regardless of the time frame selected in Azure. That can make Datadog's value appear lower than the value Azure displays. See [Time aggregation][15] in the metric documentation for more information.

#### 2. Space aggregation

[Space aggregation][28] in Datadog corresponds to the [primary aggregation type][17] of the metric in Azure Monitor. You can find the primary aggregation type from Azure's [Metric Definitions - List][16] API, in the field `primaryAggregationType`.

#### Reconcile the discrepancy

1. Graph the metric in [Azure Monitor Metrics Explorer][18], or by going to the resource in Azure and clicking **Monitoring** and then **Metrics** in the left panel.
2. Graph the metric in the [Datadog Metrics Explorer][31].
3. Confirm that the query in Azure is scoped identically to the query in Datadog:
   - Any dimensions used in the Azure metric query should match tags used in the Datadog metric query
   - The primary aggregation type used in the query should match the Datadog [space aggregator][28]
   - The time frame should match the time frame in the Datadog Metric Explorer
4. Hover over a datapoint on the graph to display the timestamp and value.

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="The Azure Metrics Explorer with the cursor hovering over a point in the graph, and the metric value and timestamp highlighted" >}}

5. Find the same point in time in the Datadog graph and compare the values. If the values are equal, the original discrepancy was due to differences in either time or space aggregation between the two graphs.
{{% /collapse-content %}} 

### Log collection troubleshooting

To troubleshoot log forwarding issues, begin with the [general troubleshooting section](#general-troubleshooting-applicable-to-all-setup-methods). If those steps do not resolve your issue, look at the following setup-specific guidance. 

- [Automated](#automated-log-forwarding-troubleshooting)
- [Blob Storage](#blob-storage-log-forwarding-troubleshooting)
- [Native integration](#azure-native-integration-log-forwarding-troubleshooting)
- [Event Hub](#event-hub-log-forwarding-troubleshooting)

#### General troubleshooting applicable to all setup methods

Exceeding the daily log quota:
: Ensure that you have not exceeded your [daily quota][20] for log retention.

Excluding logs with exclusion filters:
: Ensure that your logs are not excluded by [exclusion filters][38].

Incorrect syntax used to search logs:
: Ensure that you used the correct [search syntax][34] and that your search contains the correct attributes or tags.

Diagnostic setting not present:
: Ensure that a [diagnostic setting][8] has been added to the resources, Activity Logs, and Entra ID logs you want to send to Datadog.

**Note**: You can search for Entra ID logs with the query `source:azure.activedirectory`.

#### Automated log forwarding troubleshooting

{{% collapse-content title="Check for naming conflicts" level="h4" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
If you have Azure resources with the same resource name as one of the default parameters, it can lead to naming conflicts. Azure does not allow resources to share resource names within an individual subscription. Datadog recommends renaming the default parameter with a unique name that does not already exist within your environment.

**Note**: If you are rerunning the template due to this failure, Datadog recommends also removing the entire resource group to create a fresh deployment. 
{{% /collapse-content %}} 

{{% collapse-content title="Ensure the resource provider is registered" level="h4" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
If your template deployment is failing due to the error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure has resource providers for each of its services, such as `Microsoft.EventHub` for Azure Event Hubs. If your Azure subscription is not registered to a required resource provider, the script fails. 

Remediate this by registering with the appropriate resource provider. Run the example command below in CloudShell, substituting <RESOURCE_PROVIDER_NAME> with the name of the resource provider (for example, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
If all logs are missing, verify your [Datadog site][33] and API key:

1. In the resource group where the automated log forwarding resources were deployed, go to **Settings > Deployments**.
2. Select the most recent deployment.
3. Click **Redeploy** to check and modify the values.
{{% /collapse-content %}} 

{{% collapse-content title="Verify logs are present in the storage account container" level="h4" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
For missing Azure resource logs, find the ARM-deployed storage account in the resource's region and check the container with the expected logs.
{{% /collapse-content %}} 

{{% collapse-content title="Inspect the containerAppConsole logs of the forwarder jobs" level="h4" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
[Container App Console logs][32] help you diagnose application errors and exceptions. To inspect the logs, enable logging within the Container Apps environment in the same region as your resources that are missing logs.
{{% /collapse-content %}} 

**Note**: When using the automated log forwarder to send logs, you must manually set Microsoft Entra diagnostic settings. See [Configure Microsoft Entra diagnostic settings for activity logs][14] for more information.

#### Blob Storage log forwarding troubleshooting

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
If you are missing all logs, ensure that:
   - The [selected Datadog site][33] is correct
   - The configured [API key][9] belongs to the correct Datadog organization
{{% /collapse-content %}} 

{{% collapse-content title="Verify the forwarder config" level="h4" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
Ensure that the forwarder is using the latest version, running Node.js 22 LTS or later on Windows OS. The code is publicly available at [index.js][19]
{{% /collapse-content %}} 

{{% collapse-content title="Inspect the Blob Trigger" level="h4" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Verify the Blob Storage trigger is configured with the following options:

- **Binding Type**: `Azure Blob Storage`
- **Blob parameter name**: `blobContent`
- **Path**: The path to your log data within the storage account
- **Storage account connection**: The name of the application setting containing the storage account connection string
{{% /collapse-content %}} 

{{% collapse-content title="Inspect Blob Storage metrics" level="h4" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Ensure that Blob Storage is receiving data:
: `azure.storage_storageaccounts_blobservices.ingress`

Ensure that Blob Storage is sending data:
: `azure.storage_storageaccounts_blobservices.egress` 

Ensure that requests to Blob Storage are successful:
: `azure.storage_storageaccounts_blobservices.transactions`

For the `azure.storage_storageaccounts_blobservices.transactions` metric, you can use the following metric queries to view the number of successful or failed `PUT` operations, respectively:

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="Inspect function metrics" level="h4" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
Check if the function app is encountering execution issues, data receipt or transmission issues, or error status codes by inspecting the following metrics:

Ensure that the function is receiving data:
: `azure.functions.bytes_received`

Ensure that the function is sending data:
: `azure.functions.bytes_sent`

Ensure that the function's requests are receiving successful status codes:
: `azure.functions.http2xx`

Ensure that the function's requests are not receiving error status codes:
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="Diagnostic settings not automatically added to resources or Activity Logs" level="h4" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

If a diagnostic setting has not been added automatically to your resources or Activity Logs, check if:
   - The [maximum number of diagnostic settings][25] has been reached
   - A lock exists on the resources that prevents modifications
{{% /collapse-content %}} 

**Note**: When new logs are added to a Blob Storage file, the function is triggered to send the full contents of the file, not only the new additions.

#### Azure Native integration log forwarding troubleshooting

{{% collapse-content title="Check resource logs tag rules" level="h4" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Check that any tag rules in the Datadog resource configuration match the tags set on your resource logs.

If there are no issues with the tag rules, contact [Datadog Support][36] and share the following information:
   - **Tenant ID**: Find the Tenant ID value nn Entra ID, under **Basic information**
   - **Subscription ID**: The subscription ID of any subscriptions that logs are missing from
   - **Datadog Resource ID**: Find the Datadog Resource ID by going to **Settings > Properties** on the Datadog resource blade. The Resource ID uses this format: `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **Resource ID**: The resource ID of any resources that logs are missing from, such as web apps or databases
{{% /collapse-content %}} 

**Note**: When using the Datadog resource in Azure to send logs, Entra ID diagnostic settings must be set manually.

#### Event Hub log forwarding troubleshooting
   
{{% collapse-content title="Check if the resource provider is unregistered" level="h4" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

If your template deployment is failing due to the error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure has resource providers for each of its services, such as `Microsoft.EventHub` for Azure Event Hubs. If your Azure subscription is not registered to a required resource provider, the script fails. 

Remediate this by registering with the appropriate resource provider. Run the example command below in CloudShell, substituting <RESOURCE_PROVIDER_NAME> with the name of the resource provider (for example, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-eh" %}}
If you are missing all logs, ensure that:
   - The [selected Datadog site][33] is correct
   - The configured [API key][9] belongs to the correct Datadog organization

**Note**: if the Datadog site and API key have been set in the function app settings, your app may restart if they are modified. 
{{% /collapse-content %}} 

{{% collapse-content title="Identify potential Event Hub bottlenecks" level="h4" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
A spike in incoming messages with a drop in outgoing ones suggests a bottleneck. Use these metrics to investigate:

Check for incoming messages:
: `azure.eventhub_namespaces.incoming_messages`

Check for incoming data:
: `azure.eventhub_namespaces.incoming_bytes`

Check for outgoing messages:
: `azure.eventhub_namespaces.outgoing_messages`

Check for outgoing data:
: `azure.eventhub_namespaces.outgoing_bytes`

Check for Microsoft.EventHub throttled requests:
: `azure.eventhub_namespaces.throttled_requests`

Check for Microsoft.EventHub server errors:
: `azure.eventhub_namespaces.server_errors`

**Note**: Increasing log delays can cause data loss, as [logs older than 18 hours][4] are dropped. 

To remediate the bottleneck, you can either:

   - [Scale up your Event Hub partitions][26] to handle higher throughput (maximum 32). Because in-place scaling is only available for Premium or Dedicated tiers, you must create a new Event Hub with the desired partition count and then reconfigure its diagnostic settings and forwarder trigger. Consult [Azure support][30] for scaling advice. 
   - Split the log forwarder into multiple pipelines in Datadog, with each one processing a specific subset of resources based on rules such as priority. This increases the number of logs that can be handled simultaneously.
{{% /collapse-content %}} 

{{% collapse-content title="Inspect function metrics" level="h4" expanded=false id="inspect-function-metrics-eh" %}}
Ensure the function app is executing by looking at the following function metrics:

Check the function execution count:
: `azure.functions.function_execution_count`

Check that the function is receiving data:
: `azure.functions.bytes_received`

Check that the function is receiving data:
: `azure.functions.bytes_sent`

Check that the function's requests are returning successful status codes:
: `azure.functions.http2xx`

Check that the function's requests are not returning error status codes:
: `azure.functions.http4xx`
: `azure.functions.http5xx`

**Notes**: 
   - The log forwarder uses the [Azure Functions V4 Programming model][35], which is package-based and disables direct code editing in the Azure portal. To update or customize a function that was previously set up manually, contact [Datadog support][36] for instructions.
   - For more reliable, efficient, and cost-effective log collection, transition to the [Automated Log Forwarder][37]. It fully automates the process of forwarding logs from all your Azure resources to Datadog.
{{% /collapse-content %}} 

## Monitoring multiple app registrations

Subscriptions monitored by multiple app registrations can introduce overlapping access configurations. This setup is not recommended and may result in integration issues or system conflicts, and may also increase your Azure Monitor costs.

## Powered-down Azure VMs on the infrastructure list

When you power down your VMs in Azure, the Datadog Azure integration still collects the metric `azure.vm.status` for that VM. This metric is tagged with `status:running`, `status:not_running`, or `status:unknown`.

This is intended, but causes the VM to remain on your infrastructure list. If your VM reports only this metric, it does not count towards your billable host-count. For more billing information, see the Datadog [billing page][21].

If you destroy your Azure VM, it phases out of your infrastructure list within 3 hours.

## Azure VMs appear in the app without metrics

After properly installing the Azure Integration within Datadog, metrics from you Azure VMs and other services should begin to flow in about 15 minutes.

If after this time you see Azure VMs in your infrastructure list but no metrics are being reported, a few things can be happening.

1. Make sure you are looking for the right metrics.
    **Classic** virtual machine metrics begin with the azure.vm namespace and ARM deployed virtual machine metrics begin with the `azure.compute_virtualmachines` namespace.

2. If neither of these namespaces are returning metrics, make sure **Diagnostics** is turned on for the Virtual Machines within the Azure Portal. Only Boot diagnostics and Basic metrics are required.
    * For **Classic** VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="The azure portal showing the diagnostics view of a classic virtual machine with status set to on" >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="The azure portal showing the diagnostics settings view of a virtual machine with status set to on" >}}

3. Make sure the Virtual machine is running.
    The integration does not collect performance metrics for stopped or deallocated machines. Use the `azure.vm.count` metric and the `status` tag values of `running`, `stopped`, and `stopped_deallocated` to determine the status of your hosts. Make sure the host in question has `status:running`, and is running in the Azure portal.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="A graph of the azure.vm.count metric from status:running" >}}

## Issues with `azure.*.count` metrics

If your Azure integration is reporting metrics but not `azure.*.count`, or `azure.*.count` is returning `status:query_failed`, your Azure subscription needs to register the Azure Resource Health provider.

Using the Azure Command Line Interface:
```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

The `azure.*.count` metric should show in Datadog within 5 - 10 minutes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[3]: https://learn.microsoft.com/azure/databricks/dev-tools/api/latest/aad/
[4]: /logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[5]: /logs/guide/azure-event-hub-log-forwarding
[6]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[7]: /integrations/guide/azure-native-integration/#agent-extensions
[8]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: /account_management/api-app-keys/#api-keys
[10]: /getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[11]: /integrations/azure_arc/
[12]: https://learn.microsoft.com/cli/azure/connectedmachine/extension
[13]: /logs/guide/azure-event-hub-log-forwarding/
[14]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-configure-diagnostic-settings
[15]: /metrics/#time-aggregation
[16]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01
[17]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[18]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/metrics
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[20]: /logs/log_configuration/indexes/#set-daily-quota
[21]: /account_management/billing/
[22]: /metrics/guide/interpolation-the-fill-modifier-explained/
[23]: /integrations/azure/
[24]: https://portal.azure.com
[25]: https://learn.microsoft.com/troubleshoot/azure/partner-solutions/log-limitations#check-diagnostic-settings-limit
[26]: https://learn.microsoft.com/azure/event-hubs/event-hubs-scalability
[27]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[28]: /metrics/#space-aggregation
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /getting_started/site/#access-the-datadog-site
[34]: /logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /logs/log_configuration/indexes/#exclusion-filters
