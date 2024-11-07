---
title: Azure Native Integration Programmatic Management Guide

description: "Steps for programmatically managing the Azure Native integration with Datadog"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Documentation"
  text: "Azure Integration"
- link: "https://docs.datadoghq.com/integrations/guide/azure-portal"
  tag: "Documentation"
  text: "Managing the Azure Native Integration"
---

{{< site-region region="us3" >}}

## Overview

The Azure Native integration uses the Datadog resource in Azure to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. This method involves creating the [azurerm_datadog_monitor][3] resource and assigning it the [Monitoring Reader role][4] to link your Azure subscription(s) to your Datadog organization. This replaces the App Registration credential process for metric collection and Event Hub setup for log forwarding.

## Setup

**Note**: To set up the Azure Native integration, you must be an Owner on any Azure subscriptions you want to link, and Admin for the Datadog org you are linking them to. 

### Terraform

1. Ensure that you have configured the [Terraform Azure provider][1].

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

## Log collection

Once the Datadog resource is set up in your Azure account, configure log collection through the Azure Portal. See [Configure metrics and logs][5] in the Azure documentation for more information.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[2]: /integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{< /site-region >}}

{{< site-region region="us,us5,eu,ap1,gov" >}}

<div class="alert alert-info">The Azure Native integration is only available for organizations on Datadog's US3 site. If you're using a different <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">Datadog site</a>, see the standard <a href="https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/" target="_blank">Azure Programmatic Management guide</a>. If you're using the Datadog US3 site, <a href="?site=us3" target="_blank">change the site selector</a> on the right of this page.</div>

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}