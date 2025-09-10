---
title: Azure Native Integration Setup & Reference

further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure integration"
  - link: "https://www.datadoghq.com/blog/azure-datadog-partnership"
    tag: Blog
    text: "Microsoft partnership embeds Datadog natively in the Azure portal"
  - link: "https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/"
    tag: Blog
    text: "Enable monitoring for enterprise-scale Azure environments in minutes with Datadog"
---

This guide is for setting up and managing the Datadog Monitor resource in Azure, which connects your Datadog organization and your Azure environment.<WHEN_TO_CHOOSE>

## Prerequisites

- Your Datadog account must be on the [US3 Site][1]
- You must be an **Owner** on any Azure subscriptions you want to link, and **Admin** for the Datadog organization you are linking them to

The Datadog resource in Azure represents the connection between your Datadog organization and your Azure environment. You can configure a Datadog resource to link as many subscriptions as you wish to monitor. 

With the Datadog resource, you can manage the following within the associated Azure subscription:
- View or modify the scope of the Datadog resource to include the subscriptions to monitor
- Configure the collection of Azure metrics and platform logs
- Verify the Azure resources sending metrics and logs
- View API keys and set the key default for your Datadog resource Agent deployments
- Deploy the Datadog VM Agent to your Azure VMs and view details about running Agents
- Deploy the Datadog .NET extension to your Azure Web Apps and view details about installed extensions
- Reconfigure single sign-on
- Change the billing plan for your Datadog organization (Azure Marketplace only)
- Enable or disable the Azure integration
- Delete the Datadog resource

This page describes the Azure Portal experience. If you prefer to use CLI, see the [Azure CLI for Datadog][3].

## Included and missing features <REWORD>

<CONTENT>

## Setup

{{% collapse-content title="Azure portal" level="h4" expanded=false id="azure-portal-setup" %}}
There are two options when you create a Datadog resource in the Azure portal:

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

[1]: /getting_started/site/
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

[1]: /getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}
1. Ensure that you have configured the [Terraform Azure provider][2].

2. Use the templates below to create the `azurerm_datadog_monitor` resource and perform the `Monitoring Reader` role assignment with Terraform:

#### Azure Datadog Monitor resource

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NAME>"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NAME>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "<NAME>"
    email = "<EMAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### Monitoring Reader role

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Monitoring Reader"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. Run `terraform apply`.
{{% /collapse-content %}} 

## Support requests clarification <REWORD>

<CONTENT>

## Use the Datadog resource

### Overview

Select **Overview** in the left sidebar to view information for your Datadog resource.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="The Azure portal with Overview highlighted in the left nav bar" responsive="true" style="width:100%;">}}

### Essentials

The overview page displays essential information about your Datadog resource including: resource group name, location (region), subscriptions, tags, Datadog organization link, status, pricing plan, and billing term.

**Note**: The Datadog organization link is a SAML link if SSO is enabled. If the Datadog organization was created with the Azure marketplace, set a password the first time you use this link.

### Links

The overview page provides links to view Datadog dashboards, logs, and host maps.

### Resource summary

The overview page provides a summary table of the resources sending logs and metrics to Datadog. This table includes the following columns:

| Column             | Description                                                               |
|--------------------|---------------------------------------------------------------------------|
| Resource type      | The Azure resource type                                                   |
| Total resources    | The count of all resources for the resource type                          |
| Logs to Datadog    | The count of resources sending logs to Datadog through the integration    |
| Metrics to Datadog | The count of resources sending metrics to Datadog through the integration |

### Disable

To stop sending logs and metrics from Azure to Datadog, select **Disable** on the overview page, then click **OK**.

{{< img src="integrations/guide/azure_portal/disable.png" alt="The Datadog resource page within the Azure portal with Overview selected on the left nav bar, the Disable tab highlighted, and the OK button highlighted" responsive="true" style="width:100%;">}}

**Note**: Disabling the Datadog resource stops the submission of metrics and platform logs to Datadog for the associated subscriptions. Any resources in the subscriptions submitting data directly to Datadog through the Agent or extension are unaffected.

### Enable 

To start sending logs and metrics from Azure to Datadog, select **Enable** on the overview page, then click **OK**. Any previous configuration for logs and metrics is retrieved and enabled.

{{< img src="integrations/guide/azure_portal/enable.png" alt="The Datadog resource page within the Azure portal, with Overview selected in the left nav bar,the Enable tab highlighted, and the OK button highlighted" responsive="true" style="width:100%;">}}

### Delete

To delete the Datadog resource, select **Delete** on the overview page. Confirm deletion by typing `yes`, then click **Delete**.

{{< img src="integrations/guide/azure_portal/delete.png" alt="The Datadog resource page within the Azure portal, with Overview selected in the left nav bar, the Delete tab highlighted, and a field to confirm deletion" responsive="true" style="width:100%;">}}

For Datadog organizations billed through the Azure Marketplace:
- If the deleted Datadog resource is the only Datadog resource mapped to its associated Datadog organization, logs and metrics are no longer sent to Datadog and all billing stops for Datadog through Azure. Datadog support will reach out to confirm next steps with your account.
- If there are additional Datadog resources mapped to the associated Datadog organization, deleting a Datadog resource only stops sending logs and metrics for its associated Azure subscription.

If your Datadog organization is **not** billed through the Azure Marketplace, deleting a Datadog resource just removes the integration for that Azure subscription.

### Change plan

Select **Change Plan** on the overview page to change your Datadog billing plan.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="The Datadog resource page within the Azure portal, with Overview selected along the left nav bar and the Change Plan tab highlighted" responsive="true" style="width:100%;">}}

The portal retrieves all the available Datadog plans for your tenant, including any private offers. Select the appropriate plan and click **Change Plan**.

{{% collapse-content title="Datadog Agent extensions" level="h4" expanded=false id="agent-extensions" %}}

{{< tabs >}}
{{% tab "VM Extension" %}}

To see a list of virtual machines (VMs) in the subscription, select **Virtual machine agent** in the left sidebar. On this page, you can install the Datadog Agent on a VM as an extension.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="The Datadog resource in Azure with Virtual machine agent selected and the Install extension option highlighted" responsive="true" style="width:90%;">}}

For each VM, the following information is displayed:

| Column               | Description                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | The VM's name                                                                                                                                                  |
| Resource status      | Whether the VM is stopped or running. The Datadog Agent can only be installed on a running VM. If the VM is stopped, installing the Datadog Agent is disabled. |
| Agent version        | The Datadog Agent version number                                                                                                                               |
| Agent status         | Whether the Datadog Agent is running on the VM.                                                                                                                |
| Integrations enabled | The key metrics being collected by enabled integrations in the Datadog Agent.                                                                                  |
| Install method       | The specific tool used to install the Datadog Agent, such as Chef, Azure VM extension, etc.                                                                    |
| Sending logs         | Whether the Datadog Agent is sending logs to Datadog.                                                                                                          |

#### Install

You can install the Datadog Agent directly in Azure with the VM Extension. To install the Datadog Agent: 

1. Select the appropriate VM.
2. Click **Install Extension**. 
3. The portal asks for confirmation to install the Agent with the default key. Select **OK** to begin installation. Azure shows the status as `Installing` until the Agent is installed and provisioned. After the Datadog Agent is installed, the status changes to `Installed`.

##### Uninstall

If the Datadog Agent was installed with the Azure VM extension:

1. Select the appropriate VM.
2. Click **Uninstall Agent**.

If the Agent was installed using a different method, you cannot use the Datadog resource to deploy or remove the Agent, but information about the Agent is still reflected on this page.

{{% /tab %}}
{{% tab "AKS Cluster Extension" %}}

The Datadog AKS Cluster Extension allows you to deploy the Datadog Agent natively within Azure AKS, avoiding the complexity of third-party management tools. 

#### Install

To install the Datadog Agent with the AKS Cluster Extension: 

1. Click on your AKS cluster in the **Monitored Resources** section in the left sidebar.
2. From the left sidebar of the AKS cluster, select **Extensions + applications** under **Settings**.
3. Search for and select the `Datadog AKS Cluster Extension`.
4. Click **Create**, and follow the instructions in the tile using your [Datadog credentials][1] and [Datadog site][2].

#### Uninstall

1. Click on your AKS cluster in the **Monitored Resources** section in the left sidebar.
2. From the left sidebar of the AKS cluster, select **Extensions + applications** under **Settings**.
3. Select the Datadog AKS Cluster Extension (its **Type** is `Datadog.AKSExtension`).
4. Click **Uninstall**.

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="App Service extension" level="h4" expanded=false id="app-service-extension" %}}

Select **App Service extension** in the left sidebar to see a list of app services in the subscription. On this page, you can install the Datadog extension on Azure App Service to enable APM tracing and custom metrics.

For each app service, the following information is displayed:

| Column            | Description                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name     | The app name                                                                                                                                                                 |
| Resource status   | Whether the app service is stopped or running. The app service must be running to initiate install. If the app service is stopped, installing the Datadog Agent is disabled. |
| App service plan  | The specific plan configured for the app service                                                                                                                             |
| Extension version | The Datadog extension version number                                                                                                                                         |

#### Install

To install the [Datadog extension][6], select the appropriate app, then click **Install Extension**. The portal asks for confirmation to install the extension. Select **OK** to begin installation. This restarts your app and adds the following settings:

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`

Azure shows the status as `Installing` until the Agent is installed and provisioned. After the Datadog Agent is installed, the status changes to `Installed`.

**Note**: Ensure you are adding the extension to apps with [supported runtimes][7]. The Datadog resource does not limit or filter the list of apps.

#### Uninstall

To uninstall the Datadog extension, select the appropriate app, then click **Uninstall Extension**.
{{% /collapse-content %}} 

## Next steps

<CONTENT>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/site/
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[3]: https://docs.microsoft.com/cli/azure/datadog?view=azure-cli-latest
[4]: https://learn.microsoft.com/azure/partner-solutions/datadog/overview