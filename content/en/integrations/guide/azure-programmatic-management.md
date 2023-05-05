---
title: Azure Integration Programmatic Management Guide
kind: guide
description: "Steps for programmatically managing the Azure integration with Datadog"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Documentation"
  text: "Azure Integration"
---

## Overview

This guide demonstrates how to programmatically manage the Azure integration with Datadog, as well as other Azure resources such as the Datadog Agent VM extension. This enables you to manage observability across multiple accounts at once.

## Datadog Azure integration

### Azure or Azure Native integration?

If your Datadog account is hosted on Datadog's [US3 site][3], you can use the [Datadog resource in Azure][14] to create and manage the Datadog integration with your Azure environment. This is referred to as the Azure Native integration, and enables you to configure log and metric collection settings, deploy the Datadog Agent, and manage account settings. See [Managing the Azure Native Integration][4] for additional information.

If your Datadog account is hosted on any other [Datadog site][3], use the [Azure integration][5] to collect monitoring data from your Azure environment.

If you prefer to use CLI, see the [Azure CLI for Datadog][2].

<div class="alert alert-warning">To ensure that you see the correct examples, check that the Datadog site selector in the side panel is correctly set to your <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">Datadog site</a>.</div>

### Terraform

Follow these steps to deploy the integration through [Terraform][13].

{{% site-region region="us3" %}}

The Azure Native integration uses the Datadog resource to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. This is possible through creation of the [azurerm_datadog_monitor][3] resource and assignment of the [Monitoring Reader role][4] in Azure to link your Azure subscription(s) to your Datadog organization. This replaces the App Registration credential process for metric collection and Event Hub setup for log forwarding.

**Note**: To set up the Azure Native integration, you must be an Owner on any Azure subscriptions you want to link, and Admin for the Datadog org you are linking them to.

1. Use the templates below to create the `azurerm_datadog_monitor` resource and perform the `Monitoring Reader` role assignment:

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

2. Run `terraform apply`.

[2]: /integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
{{% /site-region %}}

{{% site-region region="us,eu,us5,gov" %}}

1. Configure the [Datadog Terraform provider][2] to interact with the Datadog API through a Terraform configuration. 

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:  
    * `azure_tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure web application secret key.
    * `client_secret`: Your Azure web application secret key.

See the [Terraform Registry][3] for further example usage and the full list of optional parameters, as well as additional Datadog resources. 

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

[1]: https://www.terraform.io
[2]: https://docs.datadoghq.com/integrations/terraform/#overview
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /site-region %}}

#### Managing multiple subscriptions or tenants

You can use multiple provider blocks with aliases to manage Terraform resources across multiple subscriptions or tenants. Read [Provider Configuration][9] for more information.

## Datadog Azure VM Extension

### Terraform

You can use Terraform to create and manage the Datadog Agent extension. Follow these steps to install and configure the Agent on a single machine, and then upload a zipped configuration file to blob storage to be referenced in your VM Extension Terraform block.

1. [Install the Agent][11].
2. Apply any desired [Agent configurations][12].
3. For Windows Server 2008, Vista, and newer, save the `%ProgramData%\Datadog` folder as a zip file. For Linux, save the `/etc/datadog-agent` folder as a zip file.
4. Upload the file to blob storage.
5. Reference the blob storage URL in the Terraform block to create the VM extension:

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY_VALUE>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY_VALUE>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

See the [Virtual Machine Extension resource][10] in the Terraform registry for more information about the available arguments.

## Logs

{{% site-region region="us3" %}}

Once the Datadog resource is set up in your Azure account, configure log collection through the Azure Portal. See [Configure metrics and logs][1] in the Azure documentation for more information.

[1]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{% /site-region %}}

{{% site-region region="us,eu,us5,gov" %}}

The best method for submitting logs from Azure to Datadog is with the Agent or DaemonSet. For some resources it may not be possible. In these cases, Datadog recommends creating a log forwarding pipeline using an Azure Event Hub to collect Azure Platform Logs. For resources that cannot stream Azure Platform Logs to an Event Hub, you can use the Blob Storage forwarding option.

To get started, click the button below and fill in the form on Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account are deployed for you.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Use the Azure CLI to create diagnostic settings that forward logs to your event hub:

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

az monitor diagnostic-settings create --name
                                      --resource
                                      [--event-hub]
                                      
{{< /code-block >}}

See the [az monitor diagnostic-settings create][1] section in the Azure CLI reference for more information.

[1]: https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest#az-monitor-diagnostic-settings-create
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/#create-datadog-resource
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /getting_started/site/
[4]: /integrations/guide/azure-portal/
[5]: /integrations/azure/
[6]: /agent/basic_agent_usage/ansible/
[7]: /integrations/azure_container_service/
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings#agent
[12]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
