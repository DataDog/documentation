---
title: Azure Integration Programmatic Management Guide

description: "Steps for programmatically managing the Azure integration with Datadog"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Documentation"
  text: "Azure Integration"
---

## Overview

 This guide demonstrates how to programmatically manage the Azure integration with Datadog, as well as other Azure resources such as the Datadog Agent VM extension. This enables you to manage observability across multiple accounts at once.

**All sites**: All [Datadog sites][3] can use the steps on this page to complete the App Registration credential process for Azure metric collection and the Event Hub setup for sending Azure Platform Logs.

**US3**: If your organization is on the Datadog US3 site, you can use the Azure Native integration to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. Setup entails creating a [Datadog resource in Azure][14] to link your Azure subscriptions to your Datadog organization. This replaces the app registration credential process for metric collection and Event Hub setup for log forwarding. See the [Managing the Azure Native Integration guide][1] for more information.

## Datadog Azure integration

The standard Azure integration uses an app registration credential process for implementing metric collection, and an Azure Event Hub setup for sending Azure Platform Logs. Create the app registration in Azure before integrating Datadog with your Azure environment, and configure it with the **Monitoring Reader** permission for Datadog to monitor the provided scope (subscriptions or management groups). If you don't already have an app registration created, see [Integrating through the Azure Portal][6] or [Integrating through the Azure CLI][4] for setup instructions.

**Note**: You can assign read permissions at the management group level when creating the app registration in Azure, to monitor multiple subscriptions and have new subscriptions in the management group automatically monitored.

### Terraform

Follow these steps to deploy the integration through [Terraform][13].

1. Configure the [Datadog Terraform provider][15] to interact with the Datadog API through a Terraform configuration.

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:
    * `tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure application (client) ID.
    * `client_secret`: Your Azure web application secret key.

   See the [Datadog Azure integration resource][17] page in the Terraform registry for further example usage and the full list of optional parameters, as well as additional Datadog resources.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

#### Managing multiple subscriptions or tenants

You can use multiple provider blocks with aliases to manage Terraform resources across multiple subscriptions or tenants. Read [Provider Configuration][9] for more information.

### Monitor the integration status

Once the integration is configured, Datadog begins running a continuous series of calls to Azure APIs to collect critical monitoring data from your Azure environment. Sometimes these calls return errors (for example, if the provided credentials have expired). These errors can inhibit or block Datadog's ability to collect monitoring data.

When critical errors are encountered, the Azure integration generates events in the Datadog Events Explorer, and republishes them every five minutes. You can configure an Event Monitor to trigger when these events are detected and notify the appropriate team.

Datadog provides a recommended monitor you can use as a template to get started. To use the recommended monitor:

1. In Datadog, go to **Monitors** -> **New Monitor** and select the [Recommended Monitors][19] tab.
2. Select the recommended monitor titled `[Azure] Integration Errors`.
3. Make any desired modifications to the search query or alert conditions. By default, the monitor triggers whenever a new error is detected, and resolves when the error has not been detected for the past 15 minutes.
4. Update the notification and re-notification messages as desired. Note that the events themselves contain pertinent information about the event and are included in the notification automatically. This includes detailed information about the scope, error response, and common steps to remediate.
5. [Configure notifications][20] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

#### Sending logs

See the [Azure Logging guide][18] to set up log forwarding from your Azure environment to Datadog.

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
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
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
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

See the [Virtual Machine Extension resource][10] in the Terraform registry for more information about the available arguments.

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/integrations/guide/azure-portal/
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /getting_started/site/
[4]: /integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[5]: /integrations/azure/
[6]: /integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/recommended
[20]: /monitors/notify/#configure-notifications-and-automations