---
title: Getting Started with Azure
further_reading:
    - link: 'https://docs.datadoghq.com/integrations/azure/#overview'
      tag: 'Documentation'
      text: 'Microsoft Azure integration'
    - link: 'https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/'
      tag: 'Guide'
      text: 'Azure Integration Architecture and Configuration'
    - link: 'https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'Guide'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
---

## Overview

Datadog offers multiple configuration options for the Azure integration. This guide provides an overview of the various options available for getting started with Azure, with links to Azure resources and tutorials that address specific use cases.

## Prerequisites

If you haven't already, create a [Datadog account][2]. 

{{% collapse-content title="Permissions required for integration setup" level="h4" expanded=false id="required-permissions" %}}

#### In Azure

Your Microsoft Entra ID user needs the following permissions:

##### Permission to create an app registration

**One** of the following must be true for the user:

- `Users can register applications` has been set to `Yes`
- The user has the [Application Developer][38] role

##### Permission to assign roles within your subscriptions

You must have one of the [Azure built-in roles in the Privileged category][24], or a custom role including the `Microsoft.Authorization/roleAssignments/write` action, in each of the subscriptions you wish to connect.

##### Permission to add and grant consent for Graph API permissions

The [Privileged Role Administrator role][25] contains the required permissions.

#### In Datadog

The `Datadog Admin Role`, or any other role with the `azure_configurations_manage` permission.

{{% /collapse-content %}} 

## Setup

Follow the instructions on this page to set up the **Azure integration** through an app registration, available for all Datadog sites. 

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Site selector for US3 site" video=true >}}

{{% collapse-content title="Quickstart (recommended)" level="h4" expanded=false id="azure-quickstart-setup" %}}

### Choose this if...

- You are setting up Datadog for the first time.
- You prefer a UI-based workflow and want to quickly create a service principal with the required monitoring permissions.
- You want to automate setup steps easily in scripts or CI/CD pipelines.

### Instructions

1. In the Azure integration tile, click **Add New App registration**, then select **Quickstart**.
2. Copy the setup script, and run it in the Azure Cloud shell.
3. Return to the Datadog UI. You should see **CONNECTED** at the top right corner of the setup script.
4. Select the subscriptions and management groups to collect data from.
5. Optionally, click the metric collection toggle to disable all metric collection from Azure. You can also expand the **Advanced Configuration** dropdown to filter metrics by:
   - Resource provider
   - Tags
   - Hosts
   - App Service Plans
   - Container Apps

You can also click to enable custom metric collection from [Azure Application Insights][36], and disable the collection of usage metrics.

6. Optionally, click the resource collection toggle to disable the collection of configuration information from your Azure resources.
7. Configure log collection:
   a. If a log forwarder already exists in the tenant, extend its scope to include any new subscriptions or management groups.
   b. If you're creating a new log forwarder:
      a. Enter a resource group name to store the log forwarder control plane
      b. Select a control plane subscription for the log-forwarding orchestration (LFO).
      c. Select a region for the control plane.
   See the [Architecture section][37] of the automated log forwarding guide for more information about this architecture.
    
8. Click **Confirm** to finish the setup.

Enable Log collection (this is the automated log forwarding feature now part of the onboarding flow)). If a log forwarder already exists in the tenant, modify it and extend it to the selected scopes instead. Advanced log forwarding set ups with more than 1 forwarder are not supported.
Choose resource group name, control plane subscription, and control plane region. This section appears only for new log forwarders.
(optional) click on Log filtering options and filter logs by tags or enter PII filtering regex
Click on finish setup.


{{% /collapse-content %}} 

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Choose this if...

- You manage infrastructure as code and want to keep the Datadog Azure integration under version control.
- You need to configure multiple tenants or subscriptions consistently with reusable provider blocks.
- You want a repeatable, auditable deployment process that fits into your Terraform-managed environment.

### Instructions

Follow these steps to deploy the Datadog Azure integration through [Terraform][23].

{{< tabs >}}
{{% tab "Create a new app registration" %}}

1. In the [Azure integration tile][100], select **Terraform** as the method for setting up your app registration.
2. Select the subscriptions and management groups to collect data from.
3. Optionally, click the metric collection toggle to disable all metric collection from Azure. You can also expand the **Advanced Configuration** dropdown to filter metrics by:
   - Resource provider
   - Tags
   - Hosts
   - App Service Plans
   - Container Apps

You can also click to enable custom metric collection from [Azure Application Insights][101], and disable the collection of usage metrics.

4. Optionally, click the resource collection toggle to disable the collection of configuration information from your Azure resources.
5. Configure log collection:
   a. If a log forwarder already exists in the tenant, extend its scope to include any new subscriptions or management groups.
   b. If you're creating a new log forwarder:
      a. Enter a resource group name to store the log forwarder control plane
      b. Select a control plane subscription for the log-forwarding orchestration (LFO).
      c. Select a region for the control plane.
   See the [Architecture section][102] of the automated log forwarding guide for more information about this architecture.

6. Copy and run the command under **Initialize and apply the Terraform**.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "Use an existing app registration" %}}

Use this method if you already have an app registration configured with the **Monitoring Reader** role for Datadog to monitor the provided scope (subscriptions or management groups). If you don't already have an app registration created, see [Integrating through the Azure Portal][203] or [Integrating through the Azure CLI][202] for setup instructions.

1. Configure the [Datadog Terraform provider][200] to interact with the Datadog API through a Terraform configuration.
2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:
    * `tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure application (client) ID.
    * `client_secret`: Your Azure web application secret key.

   See the [Datadog Azure integration resource][201] page in the Terraform registry for further example usage and the full list of optional parameters, as well as additional Datadog resources.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[202]: /integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[203]: /integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
{{% /tab %}}
{{< /tabs >}}

#### Managing multiple subscriptions or tenants

You can use multiple provider blocks with aliases to manage Terraform resources across multiple subscriptions or tenants. Read [Provider Configuration][22] for more information.

### Monitor the integration status

Once the integration is configured, Datadog begins running a continuous series of calls to Azure APIs to collect critical monitoring data from your Azure environment. Sometimes these calls return errors (for example, if the provided credentials have expired). These errors can inhibit or block Datadog's ability to collect monitoring data.

When critical errors are encountered, the Azure integration generates events in the Datadog Events Explorer, and republishes them every five minutes. You can configure an Event Monitor to trigger when these events are detected and notify the appropriate team.

Datadog provides a monitor template to help you get started. To use the monitor template:

1. In Datadog, go to **Monitors** and click the **Browse Templates** button.
2. Search for and select the monitor template titled [[Azure] Integration Errors][26].
3. Make any desired modifications to the search query or alert conditions. By default, the monitor triggers whenever a new error is detected, and resolves when the error has not been detected for the past 15 minutes.
4. Update the notification and re-notification messages as desired. Note that the events themselves contain pertinent information about the event and are included in the notification automatically. This includes detailed information about the scope, error response, and common steps to remediate.
5. [Configure notifications][27] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

{{% /collapse-content %}} 

{{% collapse-content title="Use an existing app registration" level="h4" expanded=false id="azure-existing-app-registration-setup" %}}

1. In the [Datadog Azure integration tile][20], select **Add Existing**.
2. In the **Tenant ID** field, paste your Directory (tenant) ID.
3. In the **Client ID** field, paste the application (client) ID.
4. In the **Client Secret Value** field, paste the value of the app registration's client secret.
5. Optionally, click the **Monitor Automuting** toggle to disable monitor automuting.
6. Optionally, click the metric collection toggle to disable all metric collection from Azure. You can also expand the **Advanced Configuration** dropdown to filter metrics by:
   - Resource provider
   - Tags
   - Hosts
   - App Service Plans
   - Container Apps

You can also click to enable custom metric collection from [Azure Application Insights][36], and disable the collection of usage metrics.

6. Optionally, click the resource collection toggle to disable the collection of configuration information from your Azure resources.
7. Click **Create Configuration**.

{{% /collapse-content %}} 

## Metric collection

Datadog's Azure integration is built to collect all metrics from [Azure Monitor][8]. See the [Integrations page][9] for a full listing of the available sub-integrations. Many of these integrations are installed by default when Datadog recognizes data coming in from your Azure account. 

You can find your Azure metrics in the metrics summary page in the Datadog platform by navigating to `Metrics > Summary` and searching for `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Metric summary image" style="width:100%;" >}}

## Log collection 

Datadog recommends using the Agent or DaemonSet to send logs from Azure. If direct streaming isn't possible, you can use an Azure Resource Manager (ARM) template to [automate log forwarding setup][19] across your Azure environment with no manual configuration. This feature automatically manages and scales log forwarding services.

{{% collapse-content title="Automated (recommended)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Choose this if...

- You haven't already set up logs through the [Quickstart setup method](#azure-quickstart-setup).
- You prefer a UI-based workflow and want to quickly create a service principal with the required monitoring permissions.
- You want to automate setup steps easily in scripts or CI/CD pipelines.

### Instructions

1. Open the [Automated Log Forwarding ARM template][29] in Azure.
2. Configure your Azure project and instance details on the [Basics tab][30].
3. Enter your Datadog credentials on the [Datadog Configuration tab][31].
4. Acknowledge deployment warnings on the [Deployment tab][32].
5. Start the deployment process on the [Review + create tab][33].

See [Azure Automated Log Forwarding Architecture and Configuration][34] for more details.
{{% /collapse-content %}} 

{{% collapse-content title="Blob Storage" level="h4" expanded=false id="blob-storage-log-forwarding-setup" %}}
## Setup

1. If you haven't already set up [Azure Blob Storage][39], use one of the following methods to get started:
   - [Azure portal][40]
   - [Azure Storage Explorer][41]
   - [Azure CLI][42]
   - [PowerShell][43]
2. Set up the Datadog-Azure Function to forward logs from Blob Storage using the instructions below.
3. Configure your Azure App Services to [forward their logs to Blob Storage][44].

##### Create a function app

If you already have a function app configured for this purpose, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][45] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
  a. Select the **Code** radio button
  b. For **Runtime stack**, select `Node.js`
  c. For **Version**, select `18 LTS`.
  d. For **Operating System**, select `Windows`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Add a new function to your Function App using the Azure Blob Storage trigger template

1. Select your new or existing function app from the [Function App overview][45].
2. Under the **Functions** tab, click **Create**.
3. For the **Development environment** field, select **Develop in portal**.
4. Under **Select a template**, choose [Azure Blob storage trigger][46].
5. Select your **Storage account connection**.
   **Note**: See [Configure a connection string for an Azure storage account][47] for more information.
6. Click **Create**.

See [Getting started with Azure Functions][48] for more information.

##### Point your Blob Storage trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][49] to the function's `index.js` file.
3. Add your Datadog API key with a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 20.
4. If you're not using the Datadog US1 site, set your [Datadog site][50] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Blob Storage** under **Trigger and inputs**.
8. Set the **Blob Parameter Name** to `blobContent` and click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][51] for logs from this resource.

{{% azure-log-archiving %}}
{{% /collapse-content %}} 

## Get more from the Datadog Platform 

### Installing the agent for greater visibility into your application
After you set up your Azure integration, Datadog crawlers automatically collect Azure metrics, but you can gain even deeper visibility into your Azure instances with the [Datadog Agent][1].

#### Azure Native Agent installation

The simplest way to install the Datadog Agent is directly in Azure with the [VM Extension][11] or [natively within Azure AKS][12], thus avoiding the complexity of third-party management tools. 

#### Standard Azure Agent installation

You can use the [Azure extension to install the Datadog Agent on your Windows and Linux VMs][13] or use the [AKS Cluster Extension to deploy the Agent to your AKS Clusters][14].

Installing the Datadog Agent into your environment allows you to collect additional data including, but not limited to: 
- **application health** 
- **process utilization**
- **system level metrics** 

You can also use the built-in StatsD client to send custom metrics from your application to correlate what's happening with your application, your users, and your system.

See the guide on [_Why should I install the Datadog Agent on my cloud instances?_][15]  for more information on the benefits of installing the Datadog Agent on your instances.


## Troubleshooting
See the [Azure Troubleshooting guide][16].

Still need help? Contact [Datadog support][17].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/agent/
[2]: https://www.datadoghq.com/
[3]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[4]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=manual#create-an-app-registration
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[6]: https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/?tab=windows
[7]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=azurecli
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: https://docs.datadoghq.com/integrations/#cat-azure
[10]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=automatedinstallation
[11]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension#install
[12]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=aksclusterextension#install
[13]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=vmextension#agent-installation
[14]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=aksclusterextension#agent-installation
[15]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/
[17]: https://docs.datadoghq.com/help/
[18]: https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/
[19]: /logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[24]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /monitors/notify/#configure-notifications-and-automations
[28]: /integrations/guide/azure-troubleshooting/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2FcreateUiDefinition.json
[30]: /logs/guide/azure-automated-log-forwarding/#basics
[31]: /logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /logs/guide/azure-automated-log-forwarding/#deployment
[33]: /logs/guide/azure-automated-log-forwarding/#review--create
[34]: /logs/guide/azure-automated-logs-architecture/
[35]: /integrations/guide/azure-troubleshooting/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[37]: /logs/guide/azure-automated-log-forwarding/#architecture
[38]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer

[39]: https://azure.microsoft.com/services/storage/blobs/

[40]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[41]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[42]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[43]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[44]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[45]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[46]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[47]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[48]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[49]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[50]: https://docs.datadoghq.com/getting_started/site/
[51]: https://app.datadoghq.com/logs
