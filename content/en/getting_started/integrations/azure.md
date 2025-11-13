---
title: Getting Started with Azure
aliases:
- /integrations/guide/azure-manual-setup/
- /integrations/guide/azure-programmatic-management/
description: Connect Microsoft Azure with Datadog using Azure app registration integration options. Configure metric collection, log forwarding, and Agent installation.
further_reading:
    - link: 'https://www.datadoghq.com/blog/azure-integration-onboarding/'
      tag: 'Blog'
      text: 'Accelerate your Azure integration setup with guided onboarding'
    - link: 'https://docs.datadoghq.com/integrations/azure/#overview'
      tag: 'Documentation'
      text: 'Microsoft Azure integration'
    - link: 'https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'Guide'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
---

## Overview

Datadog offers multiple configuration options for the Azure integration. This guide provides an overview of the various options available for getting started with Azure, with links to Azure resources and tutorials that address specific use cases.

## Prerequisites

If you haven't already, create a [Datadog account][2].

{{% collapse-content title="Permissions required for integration setup" level="h4" expanded=false id="required-permissions" %}}

### In Azure

Your Microsoft Entra ID user needs the following permissions:

#### Permission to create an app registration

**One** of the following must be true for the user:

- `Users can register applications` has been set to `Yes`
- The user has the [Application Developer][38] role

##### Admin roles within your subscriptions

Within the subscriptions you wish to monitor, you must have either:

- The **Owner** role
- Both the **Contributor** and **User Access Admin** roles

#### Permission to add and grant consent for Graph API permissions

The [Privileged Role Administrator role][25] contains the required permissions.

### In Datadog

The `Datadog Admin Role`, or any other role with the `azure_configurations_manage` permission.

{{% /collapse-content %}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> and <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Log Archives</a> require the app registration setup method. For US3 Datadog accounts using the Azure Native integration, follow the setup steps on this page to create an app registration. If a subscription is connected through both methods, a redundancy warning appears in the Azure integration tile—this can be safely ignored for cloud cost management and log archiving.
</div>

## Setup

Follow the instructions on this page to set up the **Azure integration** through an app registration, available for all Datadog sites.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Site selector for US3 site" video=true >}}

{{% collapse-content title="Quickstart (recommended)" level="h4" expanded=false id="quickstart-setup" %}}

### Choose the Quickstart setup method if...

- You are setting up Datadog for the first time.
- You prefer a UI-based workflow and want to minimize the time it takes to create a service principal with the required monitoring permissions.
- You want to automate setup steps in scripts or CI/CD pipelines.

### Instructions

1. In the Azure integration tile, click **+ Add New App registration**, then select **Quickstart**.
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
7. Enable log collection to set up and configure the services and diagnostic settings needed to forward logs to Datadog:
   1. If a log forwarder already exists in the tenant, it is modified to extend its scope. Any changed settings apply to existing as well as newly-selected subscriptions or management groups.
   2. If you're creating a new log forwarder:
      1. Enter a resource group name to store the log forwarder control plane
      2. Select a control plane subscription for the log-forwarding orchestration (LFO).
      3. Select a region for the control plane.<br>
   **Note**: The resource group name, control plane subscription, and region fields only appear when creating a new log forwarder.
   3. Optionally, open **Log filtering options** to filter logs by tags, or apply filtering for specific information (such as PII) using regex.

   See the [Architecture section][34] of the automated log forwarding guide for more information about this architecture.

8. Click **Confirm** to finish the setup.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Choose the Terraform setup method if...

- You manage infrastructure as code and want to keep the Datadog Azure integration under version control.
- You need to configure multiple tenants or subscriptions consistently with reusable provider blocks.
- You want a repeatable, auditable deployment process that fits into your Terraform-managed environment.

### Instructions

Follow these steps to deploy the Datadog Azure integration through [Terraform][23].

{{< tabs >}}
{{% tab "Create an app registration" %}}

1. In the [Azure integration tile][100], click **+ Add New App registration**, then select **Terraform**.
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
      a. Enter a resource group name to store the log forwarder control plane.
      b. Select a control plane subscription for the log-forwarding orchestration (LFO).
      c. Select a region for the control plane.
   See the [Architecture section][102] of the automated log forwarding guide for more information about this architecture.

6. Copy and run the command under **Initialize and apply the Terraform**.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "Use an existing app registration" %}}



- You already have an app registration configured with the **Monitoring Reader** role for Datadog to monitor the provided scope (subscriptions or management groups), and don't want to create new resources.

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
{{% /tab %}}
{{< /tabs >}}

#### Managing multiple subscriptions or tenants

You can use multiple provider blocks with aliases to manage Terraform resources across multiple subscriptions or tenants. Read [Provider Configuration][22] for more information.

### Monitor the integration status

After the integration is configured, Datadog begins running a continuous series of calls to Azure APIs to collect critical monitoring data from your Azure environment. Sometimes these calls return errors (for example, if the provided credentials have expired). These errors can inhibit or block Datadog's ability to collect monitoring data.

When critical errors are encountered, the Azure integration generates events in the Datadog Events Explorer, and republishes them every five minutes. You can configure an Event Monitor to trigger when these events are detected and notify the appropriate team.

Datadog provides a monitor template to help you get started. To use the monitor template:

1. In Datadog, go to **Monitors** and click the **Browse Templates** button.
2. Search for and select the monitor template titled [[Azure] Integration Errors][26].
3. Make any desired modifications to the search query or alert conditions. By default, the monitor triggers whenever a new error is detected, and resolves when the error has not been detected for the past 15 minutes.
4. Update the notification and re-notification messages as desired. Note that the events themselves contain pertinent information about the event and are included in the notification automatically. This includes detailed information about the scope, error response, and common steps to remediate.
5. [Configure notifications][27] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

{{% /collapse-content %}}

{{% collapse-content title="Use an existing app registration" level="h4" expanded=false id="existing-app-registration-setup" %}}

### Choose the existing app registration setup method if..

- You already have an app registration configured with the **Monitoring Reader** role for Datadog to monitor the provided scope (subscriptions or management groups), and don't want to create new resources.

If you need to set up an app registration for Datadog, see the [Quickstart](#quickstart-setup) or [Terraform](#terraform-setup) setup methods.

### Instructions

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

Datadog's Azure integration is built to collect all metrics from [Azure Monitor][8]. The [Integrations page][9] shows a curated list of predefined sub-integrations that provide additional out-of-the-box dashboards and monitors for specific Azure services. Many of these integrations are installed by default when Datadog recognizes data coming in from your Azure account. However, Datadog can ingest metrics from **any Azure Monitor-supported resource**, even if it doesn't have a dedicated sub-integration tile.

You can find your Azure metrics in the metrics summary page in the Datadog platform by navigating to `Metrics > Summary` and searching for `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Metric summary image" style="width:100%;" >}}

## Enable log collection

You can use the automated log forwarding feature to setup and configure the services and diagnostic settings needed to forward logs to Datadog. If an automated log forwarding control plane already exists in the tenant, this flow modifies it and extends its scope to include the selected subscriptions or management groups. For more detail, see [Azure Automated Log Forwarding Setup][19].

Datadog recommends using the Agent or DaemonSet to send logs from Azure. If direct streaming isn't possible, you can use an Azure Resource Manager (ARM) template to [automate log forwarding setup][19] across your Azure environment with no manual configuration. This feature automatically manages and scales log forwarding services.

{{% collapse-content title="Automated (recommended)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Choose the automated log forwarding setup method if...

- You haven't already set up logs through the [Quickstart setup method](#azure-quickstart-setup).
- You prefer a UI-based workflow and want to minimize the time it takes to create a service principal with the required monitoring permissions.
- You want to automate setup steps in scripts or CI/CD pipelines.

### Instructions

1. Open the [Automated Log Forwarding ARM template][29] in Azure.
2. Configure your Azure project and instance details on the [Basics tab][30].
3. Enter your Datadog credentials on the [Datadog Configuration tab][31].
4. Acknowledge deployment warnings on the [Deployment tab][32].
5. Start the deployment process on the [Review + create tab][33].


<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Log Archives</a> require the app registration setup method. For US3 Datadog accounts using the Azure Native integration, follow the steps on this page to create an app registration.
</div>

See [Azure Automated Log Forwarding Architecture][34] for more details.

{{% /collapse-content %}}

{{% collapse-content title="Container App" level="h4" expanded=false id="container-app-log-forwarding-setup" %}}

### Choose the Container App log forwarding method if...

- You prefer to manually configure [diagnostic settings][53] on the resources you want to forward logs from.

## Instructions

1. Click the button below, and fill in the form on the Azure Portal. Datadog automatically deploys the Azure resources required to forward logs into your Datadog account.

   [![Deploy to Azure](https://aka.ms/deploytoazurebutton)][52]

2. After the template deployment finishes, set up [diagnostic settings][53] for each log source to send Azure platform logs (including resource logs) to the Storage Account created during deployment.

**Note**: Resources can only stream to a Storage Account in the same Azure region.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

## Get more from the Datadog Platform

### Install the Agent for greater visibility into your application

After you set up your Azure integration, Datadog crawlers automatically collect Azure metrics, but you can gain even deeper visibility into your Azure instances with the [Datadog Agent][1]. Installing the Datadog Agent into your environment allows you to collect additional data including, but not limited to:
- **Application health**
- **Process utilization**
- **System-level metrics**

You can also use the built-in StatsD client to send custom metrics from your applications, to correlate what's happening with your applications, users, and system. See the guide on [_Why should I install the Datadog Agent on my cloud instances?_][15] for more information on the benefits of installing the Datadog Agent on your instances.

Use the Azure extension to install the Datadog Agent on Windows VMs, Linux x64 VMs, and Linux ARM-based VMs. You can also use the AKS Cluster Extension to deploy the Agent to your AKS Clusters.

{{< tabs >}}
{{% tab "VM Extension" %}}

1. In the [Azure portal][4], select the appropriate VM.
2. From the left sidebar, under **Settings**, select **Extensions + applications**.
3. Click **+ Add**.
4. Search for and select the `Datadog Agent` extension.
5. Click **Next**.
6. Enter your [Datadog API key][2] and [Datadog site][1], and click **OK**.

To install the Agent based on operating system or CI and CD tool, see the [Datadog Agent installation instructions][3].

**Note**: Domain controllers are not supported when installing the Datadog Agent with the Azure extension.

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "AKS Cluster Extension" %}}

The Datadog AKS Cluster Extension allows you to deploy the Datadog Agent natively within Azure AKS, avoiding the complexity of third-party management tools. To install the Datadog Agent with the AKS Cluster Extension:

1. Go to your AKS cluster in the Azure portal.
2. From the left sidebar of the AKS cluster, select **Extensions + applications** under **Settings**.
3. Search for and select the `Datadog AKS Cluster Extension`.
4. Click **Create**, and follow the instructions in the tile using your [Datadog credentials][1] and [Datadog site][2].

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

See [Troubleshooting][16] in the Azure Advanced Configuration guide.

Still need help? Contact [Datadog support][17].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/agent/
[2]: https://www.datadoghq.com/
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: /integrations/#cat-azure
[15]: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /integrations/guide/azure-advanced-configuration/#azure-integration-troubleshooting
[17]: /help/
[19]: /logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /monitors/notify/#configure-notifications-and-automations
[28]: /integrations/guide/azure-advanced-configuration/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[30]: /logs/guide/azure-automated-log-forwarding/#basics
[31]: /logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /logs/guide/azure-automated-log-forwarding/#deployment
[33]: /logs/guide/azure-automated-log-forwarding/#review--create
[34]: /logs/guide/azure-automated-log-forwarding/#architecture
[35]: /integrations/guide/azure-advanced-configuration/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
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
[51]: https://app.datadoghq.com/logs
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fforwarder.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
