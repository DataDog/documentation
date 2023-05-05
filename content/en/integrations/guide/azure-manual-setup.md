---
title: Azure Manual Setup Guide
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

Use this guide to manually set up the [Datadog Azure integration][1].

{{< site-region region="us3" >}}

### Prerequisites

#### Required permissions

To set up the Azure Native integration, you must be an **Owner** on any Azure subscriptions you want to link, and **Admin** for the Datadog org you are linking them to. Ensure you have the appropriate access before starting the setup.

## Setup

Configuring the Azure integration requires the creation of a Datadog resource in Azure. These resources represent the connection or link between a Datadog organization and an Azure subscription. A Datadog resource is needed for each subscription you wish to monitor with Datadog. 

There are two options when you create a Datadog resource in Azure:

1. Link to an existing Datadog organization. This is the more common action. Use this to configure your Datadog org to monitor an Azure subscription that hasn't been linked yet. This action does not affect your Datadog billing plan.

2. Create a new Datadog organization. This flow is less common. Use this if you do not yet have a Datadog org and you want to get started with a paid plan through Azure Marketplace. This flow creates a brand new Datadog org, allows you to select a billing plan, and links the associated Azure subscription for monitoring.

**Note**: Trials are not available through the **Create a new Datadog organization** option in Azure. To get started with a free trial, first [create a trial Datadog org on the US3 site][1]. Then use the linking flow to add any subscriptions you want to monitor.

Once you create a Datadog resource, data collection begins for the associated subscription. See details for using this resource to configure, manage, and deploy Datadog in the [Managing the Azure Native Integration][2] guide.

### Create a Datadog resource

To start monitoring an Azure subscription, navigate to the [Datadog Service page in Azure][3] and select the option to create a new Datadog resource:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}

Choose **Link Azure subscription to an existing Datadog organization** or **Create a new Datadog organization**. Linking is the more common action. Use this to configure monitoring for an Azure subscription that hasn't been linked yet. Only choose the **Create** flow if you are not yet a Datadog customer and want to get started with a new, paid plan.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

**Note**: New Datadog organizations created through the Azure portal automatically have billing consolidated into their Azure invoice. This usage counts towards your organization's [MACC][4] if applicable.

### SSO configuration

_(Optional)_: You can configure [single sign-on (SSO)][5] during the process of creating a new Datadog organization in Azure. You can also configure SSO later. To configure SSO during the initial creation, first create a Datadog enterprise gallery app.

### Configuration {#configuration-us3}

{{< tabs >}}
{{% tab "Link" %}}

#### Basics {#basics-link}

After selecting to link to an existing Datadog organization, the portal displays a form for creating the Datadog resource:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure subscription to an existing Datadog organization" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][5] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | Specify a name for the Datadog resource. The recommended naming convention is: `subscription_name-datadog_org_name`.                                                                                                         |
| Location             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog organization | After the authentication step is completed, the Datadog organization name is set to the name of the Datadog organization being linked. The Datadog site is set to US3.                                                                                                                                |

Click **Link to Datadog organization** to open a Datadog authentication window, then sign in to Datadog.

By default, Azure links your current Datadog organization to your Datadog resource. If you want to link to a different organization, select the appropriate organization in the authentication window:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 select Datadog organization" responsive="true" style="width:90%;">}}

When the OAuth flow is complete, verify the Datadog organization name is correct.

[1]: https://docs.datadoghq.com/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Create" %}}

#### Basics {#basics-create}

After selecting to create a new Datadog organization, the portal displays a form for creating both the Datadog resource and the new Datadog organization:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][2] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | The name for the Datadog resource. This name is assigned to the new Datadog organization.                                                                                                                                    |
| Location             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog organization | The Datadog organization name is set to the resource name, and the Datadog site is set to US3.                                                                                                                                |
| Pricing plan         | A list of the available Datadog pricing plans. If you have a private offer, it iss available in this dropdown.                                                                                                                 |
| Billing term         | Monthly.                                                                                                                                                                                                                      |

[1]: https://docs.datadoghq.com/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

## Setup

### Integrating through the Azure CLI

To integrate Datadog with Azure using the Azure CLI, Datadog recommends using the [Azure Cloud Shell][1].

{{< tabs >}}
{{% tab "Azure CLI" %}}

First, log in to the Azure account you want to integrate with Datadog:

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
  "appId": "0dd17b1e-54a4-45ae-b168-232b14b01f88",
  "displayName": "azure-cli-2025-02-23-04-27-19",
  "password": "dj-8Q~hKbQwU93Q0FBfIZ_pI5ZtaLoRxaws8Dca5",
  "tenant": "4d3bac44-0230-4732-9e70-cc00736f0a97"
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
6. Repeat this process for any additional subscriptions you want to monitor with Datadog. **Note**: Users of Azure Lighthouse can add subscriptions from customer tenants.

**Note**: Diagnostics must be enabled for ARM deployed VMs to collect metrics, see [Enable diagnostics][5].

#### Completing the integration

1. Under **App Registrations**, select the App you created, copy the **Application ID** and **Tenant ID**, and paste the values in the [Datadog Azure integration tile][4] under **Client ID** and **Tenant ID**.
2. For the same app, go to **Manage** > **Certificates and secrets**.
3. Add a new **Client Secret** called `datadogClientSecret`, select a timeframe for **Expires**, and click **Add**:

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Azure client secret" popup="true" style="width:80%">}}

4. When the key value is shown, copy and paste the value in the [Datadog Azure integration tile][4] under **Client Secret** and click **Install Integration** or **Update Configuration**.

**Note**: Your updates to the Azure configuration can take up to 20 minutes to be reflected in Datadog.

### Configuration

To limit resource collection for Azure based hosts, open the integration tile for Azure. Select the **Configuration** tab, then open **App Registrations**. Enter a list of tags in the text box under **Metric Collection Filters**.

This list of tags in `<KEY>:<VALUE>` form is separated by commas and defines a filter used while collecting metrics. Wildcards such as `?` (for single characters) and `*` (for multiple characters) can also be used. 

Only VMs that match one of the defined tags are imported into Datadog. The rest are ignored. VMs matching a given tag can also be excluded by adding `!` before the tag. For example:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Monitor the integration status

Once the integration is configured, Datadog begins running a continuous series of calls to Azure APIs to collect critical monitoring data from your Azure environment. Sometimes these calls return errors (for example, if the provided credentials have expired). These errors can inhibit or block Datadog's ability to collect monitoring data.

When critical errors are encountered, the Azure integration generates events in the Datadog Events Explorer, and republishes them every five minutes. You can configure an Event Monitor to trigger when these events are detected and notify the appropriate team.

Datadog provides a recommended monitor you can use as a template to get started. To use the recommended monitor:

1. In Datadog, go to **Monitors** -> **New Monitor** and select the [Recommended Monitors][2] tab.
2. Select the recommended monitor titled `[Azure] Integration Errors`.
3. Make any desired modifications to the search query or alert conditions. By default, the monitor will trigger whenever a new error is detected, and resolve when the error has not been detected for the past 15 minutes.
4. Update the notification and re-notification messages as desired. Note that the events themselves contain pertinent information about the event and are included in the notification automatically. This includes detailed information about the scope, error response, and common steps to remediate.
5. [Configure notifications][3] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

[1]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[2]: https://app.datadoghq.com/monitors/recommended
[3]: /monitors/notify/#notify-your-team
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/#enable-diagnostics

{{< /site-region >}}

#### Sending logs

See the [Azure Logging guide][5] to set up log forwarding from your Azure environment to Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: https://us3.datadoghq.com/signup
[3]: /integrations/guide/azure-portal/
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: https://docs.datadoghq.com/logs/guide/azure-logging-guide