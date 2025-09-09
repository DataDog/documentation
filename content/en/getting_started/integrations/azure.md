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
    - link: 'https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension'
      tag: 'Guide'
      text: 'Managing the Azure Native Integration'
    - link: 'https://www.datadoghq.com/blog/azure-integration-configuration/'
      text: 'Fine-tune observability configurations for all your Azure integrations in one place'
      tag: 'Blog'
---

## Overview

Datadog offers multiple configuration options for the Azure integration. This guide provides an overview of the various options available for getting started with Azure, with links to Azure resources and tutorials that address specific use cases.

## Prerequisites

If you haven't already, create a [Datadog account][2]. 

## Setup

Follow the instructions on this page to set up the **Azure integration**, available for all Datadog sites. 

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Site selector for US3 site" video=true >}}

{{% collapse-content title="Azure CLI (recommended)" level="h4" expanded=false id="azure-cli-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

First, log into the Azure account you want to integrate with Datadog:

```shell
az login
```

Create a service principal and configure its access to Azure resources:

```shell
az ad sp create-for-rbac
```

Display a list of subscriptions so that you can copy and paste the `subscription_id`:

```shell
az account list --output table
```

Create an application as a service principal using the format:

```shell
az ad sp create-for-rbac --role "Monitoring Reader" --scopes /subscriptions/{subscription_id}
```

Example Output:
```text
{
  "appId": "4ce52v13k-39j6-98ea-b632-965b77d02f36",
  "displayName": "azure-cli-2025-02-23-04-27-19",
  "password": "fe-3T~bEcFxY23R7NHwVS_qP5AmxLuTwgap5Dea6",
  "tenant": "abc123de-12f1-82de-97bb-4b2cd023bd31"
}
```

- This command grants the Service Principal the `monitoring reader` role for the subscription you would like to monitor.
- The `appID` generated from this command must be entered in the [Datadog Azure integration tile][20] under **Client ID**.
- Enter the generated `Tenant ID` value in the [Datadog Azure integration tile][20] under **Tenant name/ID**.
- `--scopes` can support multiple values, and you can add multiple subscriptions or Management Groups at once. See the examples in the **[az ad sp][21]** documentation.
- Add `--name <CUSTOM_NAME>` to use a hand-picked name, otherwise Azure generates a unique one. The name is not used in the setup process.
- Add `--password <CUSTOM_PASSWORD>` to use a hand-picked password. Otherwise Azure generates a unique one. This password must be entered in the [Datadog Azure integration tile][1] under **Client Secret**.

Management Group is a valid and recommended option for scope. For example:

```shell
az account management-group entities list --query "[?inheritedPermissions!='noaccess' && permissions!='noaccess'].{Name:displayName,Id:id}" --output table
```

- This command displays all the subscriptions and management groups a user has access to.
- It joins the IDs together and creates the Service-Principal. You can run this one command to create a user and assign roles to every management-group/subscription
{{% /collapse-content %}} 


{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

Follow these steps to deploy the integration through [Terraform][23].

1. Configure the [Datadog Terraform provider][24] to interact with the Datadog API through a Terraform configuration.

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:
    * `tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure application (client) ID.
    * `client_secret`: Your Azure web application secret key.

   See the [Datadog Azure integration resource][25] page in the Terraform registry for further example usage and the full list of optional parameters, as well as additional Datadog resources.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

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


{{% collapse-content title="Azure portal" level="h4" expanded=false id="azure-portal-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

1. [Create an app registration](#create-an-app-registration) in your Active Directory.
2. [Give the application read-access](#give-read-permissions-to-the-application) to any subscriptions you would like to monitor.
3. [Configure the application credentials](#complete-the-integration) in Datadog.

#### Create an app registration

1. Under **Microsoft Entra ID**, navigate to **App registrations**.
2. Click **New registration**.
3. Provide a name, and confirm that **Supported account types** is set to `Accounts in this organizational directory only`.
4. Click **Register**.

{{< img src="integrations/guide/azure_manual_setup/azure_app_registration.png" alt="The screen in the Azure portal for registering an application" popup="true" style="width:80%;" >}}

#### Give read permissions to the application

1. Assign access at the individual subscription or management group level. 
   - To assign access at the subscription level, navigate to **Subscriptions** through the search box or the left sidebar.
   - To assign access at the management group level, navigate to **Management Groups** and select the management group that contains the set of subscriptions to monitor.<br />
   **Note**: Assigning access at the management group level means that any new subscriptions added to the group are automatically discovered and monitored by Datadog.

2. Click on the subscription or management group you would like to monitor.
3. Select **Access control (IAM)** in the subscription menu and click **Add role assignment**:

    {{< img src="integrations/guide/azure_manual_setup/azure-add-role.png" alt="Add Role Assignment" popup="true" style="width:80%">}}

4. In the **Role** tab, select **Reader**. 
5. In the **Members** tab, click **Select members**.
6. Enter the application created in the [create an app registration section](#create-an-app-registration).
7. Click **Review + assign** to complete the creation.
8. Repeat this process for any additional subscriptions or management groups you want to monitor with Datadog.

**Notes**: 
   - Users of Azure Lighthouse can add subscriptions from customer tenants.
   - Diagnostics must be enabled for ARM deployed VMs to collect metrics, see [Enable diagnostics][28].

#### Complete the integration

1. Under **App Registrations**, select the app you created, copy the **Application (client) ID** and **Directory (tenant) ID**, and paste the values in the [Datadog Azure integration tile][20] under **Client ID** and **Tenant ID**.
2. For the same app, go to **Manage** > **Certificates & secrets**.
3. Click **+ New client secret**:
   1. Optionally, provide a description.
   2. Select an expiration time frame in the **Expires** field.
   3. Click **Add**.

    {{< img src="integrations/guide/azure_manual_setup/add_client_secret.png" alt="Azure client secret" popup="true" style="width:80%">}}

4. When the key value is shown, copy and paste the value in the [Datadog Azure integration tile][20] under **Client Secret**.
5. Click **Create Configuration**.

**Note**: Your updates to the Azure configuration can take up to 20 minutes to be reflected in Datadog.
{{% /collapse-content %}} 


{{% collapse-content title="Azure CLI Classic" level="h4" expanded=false id="azure-cli-classic-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

First, log in to the Azure account you want to integrate with Datadog:

```text
azure login
```

Run the account show command:

```text
az account show
```

Enter the generated `Tenant ID` value in the [Datadog Azure integration tile][20] under **Tenant name/ID**.

Create a name and password:

```text
azure ad sp create -n <NAME> -p <PASSWORD>
```

- The `<NAME>` is NOT used but is required as part of the setup process.
- The `<PASSWORD>` you choose must be entered in the [Datadog Azure integration tile][20] under **Client Secret**.
- The `Object Id` returned from this command is used in place of `<OBJECT_ID>` in the next command.

Create an application as a service principal using the format:

```text
azure role assignment create --objectId <OBJECT_ID> -o "Monitoring Reader" -c /subscriptions/<SUBSCRIPTION_ID>/
```

- This command grants the Service Principal the `monitoring reader` role for the subscription you would like to monitor.
- The `Service Principal Name` generated from this command must be entered in the [Datadog Azure integration tile][20] under **Client ID**.
- `<SUBSCRIPTION_ID>` is the Azure subscription you would like to monitor, and is listed as `ID` with `azure account show` or in the portal.
{{% /collapse-content %}} 

## Metric collection
Datadog's Azure integration is built to collect all metrics from [Azure Monitor][8]. See the [Integrations page][9] for a full listing of the available sub-integrations. Many of these integrations are installed by default when Datadog recognizes data coming in from your Azure account. 

You can find your Azure metrics in the metrics summary page in the Datadog platform by navigating to `Metrics > Summary` and searching for `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Metric summary image" style="width:100%;" >}}

## Log collection 

Datadog recommends using the Agent or DaemonSet to send logs from Azure. If direct streaming isn't possible, you can use an Azure Resource Manager (ARM) template to [automate log forwarding setup][19] across your Azure environment with no manual configuration. This feature automatically manages and scales log forwarding services.


{{% collapse-content title="Automated (recommended)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

1. Open the [Automated Log Forwarding ARM template][29] in Azure.
2. Configure your Azure project and instance details on the [Basics tab][30].
3. Enter your Datadog credentials on the [Datadog Configuration tab][31].
4. Acknowledge deployment warnings on the [Deployment tab][32].
5. Start the deployment process on the [Review + create tab][33].

See [Azure Automated Log Forwarding Architecture and Configuration][34] for more details.
{{% /collapse-content %}} 




{{% collapse-content title="Event Hub" level="h4" expanded=true id="event-hub-log-forwarding-setup" %}}

### Choose this if...

- <GUIDANCE>

### Prerequisites

- <PREREQUISITES>

### Instructions

To get started, click the button below and fill in the form on Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account will be deployed for you. To forward Activity Logs, set the **Send Activity Logs** option to true.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

### Azure platform logs

After the template deployment finishes, set up diagnostic settings for each log source to send Azure platform logs (including resource logs) to the Event Hub created during deployment.

**Note**: Resources can only stream to Event Hubs in the same Azure region.

If you run into any problems during deployment, see [Automated log collection][35] for common error cases.
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
[5]: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[6]: https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/?tab=windows
[7]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=azurecli
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/metrics-index
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
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
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
