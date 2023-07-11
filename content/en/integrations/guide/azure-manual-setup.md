---
title: Azure Integration Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Datadog Azure integration"
further_reading:
- link: "https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "Documentation"
  text: "Why should I install the Datadog Agent on my cloud instances?"
- link: "https://docs.datadoghq.com/integrations/guide/azure-portal/"
  tag: "Documentation"
  text: "Datadog in the Azure Portal"
- link: "https://www.datadoghq.com/blog/azure-government-monitoring-datadog/"
  tag: "Blog"
  text: "Monitor Azure Government with Datadog"
- link: "https://www.datadoghq.com/blog/azure-container-apps/"
  tag: "Blog"
  text: "Monitor Azure Container Apps with Datadog"
- link: "https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/"
  tag: "Blog"
  text: "How to Monitor Microsoft Azure VMs"
- link: "https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/"
  tag: "Blog"
  text: "Explore Azure App Service with the Datadog Serverless view"
---

## Overview

Use this guide to manually set up the [Datadog Azure integration][1] through an app registration with read permissions to the monitored subscriptions.

**All sites**: All Datadog sites can use the steps on this page to complete the app registration credential process for Azure metric collection and the Event Hub setup for sending Azure Platform Logs.

**US3**: If your organization is on the Datadog US3 site, you can use the Azure Native integration to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. Setup entails creating a [Datadog resource in Azure][12] to link your Azure subscriptions to your Datadog organization. This replaces the app registration credential process for metric collection and Event Hub setup for log forwarding. See the [Azure Native manual setup][13] guide for more information.

## Setup

### Integrating through the Azure CLI

To integrate Datadog with Azure using the Azure CLI, Datadog recommends using the [Azure Cloud Shell][7].

{{< tabs >}}
{{% tab "Azure CLI" %}}

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
- The `appID` generated from this command must be entered in the [Datadog Azure integration tile][1] under **Client ID**.
- Enter the generated `Tenant ID` value in the [Datadog Azure integration tile][1] under **Tenant name/ID**.
- `--scopes` can support multiple values, and you can add multiple subscriptions or Management Groups at once. See the examples in the **[az ad sp][2]** documentation.
- Add `--name <CUSTOM_NAME>` to use a hand-picked name, otherwise Azure generates a unique one. The name is not used in the setup process.
- Add `--password <CUSTOM_PASSWORD>` to use a hand-picked password. Otherwise Azure generates a unique one. This password must be entered in the [Datadog Azure integration tile][1] under **Client Secret**.

Management Group is a valid and recommended option for scope. For example:

```shell
az account management-group entities list --query "[?inheritedPermissions!='noaccess' && permissions!='noaccess'].{Name:displayName,Id:id}" --output table
```

- This command displays all the subscriptions and management groups a user has access to.
- It joins the IDs together and creates the Service-Principal. You can run this one command to create a user and assign roles to every management-group/subscription

[1]: https://app.datadoghq.com/integrations/azure
[2]: https://learn.microsoft.com/en-us/cli/azure/ad/sp?view=azure-cli-latest
{{% /tab %}}
{{% tab "Azure CLI Classic" %}}

First, log in to the Azure account you want to integrate with Datadog:

```text
azure login
```

Run the account show command:

```text
az account show
```

Enter the generated `Tenant ID` value in the [Datadog Azure integration tile][1] under **Tenant name/ID**.

Create a name and password:

```text
azure ad sp create -n <NAME> -p <PASSWORD>
```

- The `<NAME>` is NOT used but is required as part of the setup process.
- The `<PASSWORD>` you choose must be entered in the [Datadog Azure integration tile][1] under **Client Secret**.
- The `Object Id` returned from this command is used in place of `<OBJECT_ID>` in the next command.

Create an application as a service principal using the format:

```text
azure role assignment create --objectId <OBJECT_ID> -o "Monitoring Reader" -c /subscriptions/<SUBSCRIPTION_ID>/
```

- This command grants the Service Principal the `monitoring reader` role for the subscription you would like to monitor.
- The `Service Principal Name` generated from this command must be entered in the [Datadog Azure integration tile][1] under **Client ID**.
- `<SUBSCRIPTION_ID>` is the Azure subscription you would like to monitor, and is listed as `ID` with `azure account show` or in the portal.

[1]: https://app.datadoghq.com/integrations/azure
{{% /tab %}}
{{< /tabs >}}

### Integrating through the Azure portal

1. [Create an app registration](#creating-the-app-registration) in your Active Directory and pass the correct credentials to Datadog.
2. [Give the application read-access](#giving-read-permissions-to-the-application) to any subscriptions you would like to monitor.

#### Creating the app registration

1. Under **Azure Active Directory**, navigate to **App Registrations** and click **New registration**.
2. Enter the following and click the **Create** button. The name and sign-on URL are not used but are required for the setup process.

    - Name: `Datadog Auth`
    - Supported Account Types: `Accounts in this organizational directory only (Datadog)`
    - Redirect URI: {{< region-param key="dd_full_site" code="true" >}}

{{< img src="integrations/azure/Azure_create_ad.png" alt="Azure create app" popup="true" style="width:80%;" >}}

#### Giving read permissions to the application

1. To assign access at the individual subscription level, navigate to **Subscriptions** through the search box or the left sidebar.

{{< img src="integrations/azure/subscriptions_icon.png" alt="Subscriptions icon" popup="true" style="width:25%">}}

To assign access at the Management Group level, navigate to **Management Groups** and select the Management Group that contains the set of subscriptions you would like to monitor.
**Note**: Assigning access at the Management Group level means that any new subscriptions added to the group are automatically discovered and monitored by Datadog.

{{< img src="integrations/azure/azure_management_groups_icon.png" alt="Management groups icon" popup="true" style="width:25%">}}

To configure monitoring for the entire tenant, assign access to the **Tenant Root Group**.

2. Click on the subscription you would like to monitor.
3. Select **Access control (IAM)** in the subscription menu and click **Add** > **Add role assignment**:

    {{< img src="integrations/azure/azure-add-role.png" alt="Add Role Assignment" popup="true" style="width:80%">}}

4. For **Role**, select **Monitoring Reader**. Under **Select**, choose the name of the Application you just created:

5. Click **Save**.
6. Repeat this process for any additional subscriptions you want to monitor with Datadog.
**Note**: Users of Azure Lighthouse can add subscriptions from customer tenants.

**Note**: Diagnostics must be enabled for ARM deployed VMs to collect metrics, see [Enable diagnostics][11].

#### Completing the integration

1. Under **App Registrations**, select the App you created, copy the **Application ID** and **Tenant ID**, and paste the values in the [Datadog Azure integration tile][10] under **Client ID** and **Tenant ID**.
2. For the same app, go to **Manage** > **Certificates and secrets**.
3. Add a new **Client Secret** called `datadogClientSecret`, select a timeframe for **Expires**, and click **Add**:

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Azure client secret" popup="true" style="width:80%">}}

4. When the key value is shown, copy and paste the value in the [Datadog Azure integration tile][10] under **Client Secret** and click **Install Integration** or **Update Configuration**.

**Note**: Your updates to the Azure configuration can take up to 20 minutes to be reflected in Datadog.

### Configuration

To limit metric collection for Azure-based hosts, open the integration tile for Azure. Select the **Configuration** tab, then open **App Registrations**. Enter a list of tags in the text box under **Metric Collection Filters**.

This list of tags in `<KEY>:<VALUE>` form is separated by commas and defines a filter used while collecting metrics. Wildcards such as `?` (for single characters) and `*` (for multiple characters) can also be used.

Only VMs that match one of the defined tags are imported into Datadog. The rest are ignored. VMs matching a given tag can also be excluded by adding `!` before the tag. For example:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Monitor the integration status

Once the integration is configured, Datadog begins running a continuous series of calls to Azure APIs to collect critical monitoring data from your Azure environment. Sometimes these calls return errors (for example, if the provided credentials have expired). These errors can inhibit or block Datadog's ability to collect monitoring data.

When critical errors are encountered, the Azure integration generates events in the Datadog Events Explorer, and republishes them every five minutes. You can configure an Event Monitor to trigger when these events are detected and notify the appropriate team.

Datadog provides a recommended monitor you can use as a template to get started. To use the recommended monitor:

1. In Datadog, go to **Monitors** -> **New Monitor** and select the [Recommended Monitors][8] tab.
2. Select the recommended monitor titled `[Azure] Integration Errors`.
3. Make any desired modifications to the search query or alert conditions. By default, the monitor triggers whenever a new error is detected, and resolves when the error has not been detected for the past 15 minutes.
4. Update the notification and re-notification messages as desired. Note that the events themselves contain pertinent information about the event and are included in the notification automatically. This includes detailed information about the scope, error response, and common steps to remediate.
5. [Configure notifications][9] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

### Metrics collection

After the integration tile is set up, metrics are collected by a crawler. To collect additional metrics, deploy the Datadog Agent to your VMs:

#### Agent installation

You can use the Azure extension to install the Datadog Agent on Windows VMs, Linux x64 VMs, and Linux ARM-based VMs.

1. In the [Azure portal][14], navigate to your **VM** > **Settings** > **Extensions** > **Add** and select **Datadog Agent**.
2. Click **Create**, enter your [Datadog API key][15], and click **OK**.

To install the Agent based on operating system or CI and CD tool, see the [Datadog Agent installation instructions][16].

**Note**: Domain controllers are not supported when installing the Datadog Agent with the Azure extension.

#### Sending logs

See the [Azure Logging guide][5] to set up log forwarding from your Azure environment to Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: https://us3.datadoghq.com/signup
[3]: /integrations/guide/azure-portal/
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: https://docs.datadoghq.com/logs/guide/azure-logging-guide
[6]: /integrations/guide/azure-native-manual-setup/
[7]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[8]: https://app.datadoghq.com/monitors/recommended
[9]: /monitors/notify/#notify-your-team
[10]: https://app.datadoghq.com/integrations/azure
[11]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/#enable-diagnostics
[12]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[13]: /integrations/guide/azure-native-manual-setup/
[14]: https://portal.azure.com
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/account/settings/agent/latest
