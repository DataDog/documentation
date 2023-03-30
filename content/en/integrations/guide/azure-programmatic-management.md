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

### Azure and Azure Native integrations

This guide provides an overview of ways to programmatically manage the Azure integration with Datadog, enabling you to streamline the process of managing multiple accounts in bulk.

If your Datadog account is hosted on Datadog's [US3 site][3], you can use the Datadog resource in Azure to create and manage the integration between your Azure environment and Datadog. This is referred to as the Azure Native integration, and enables you to configure log and metric collection settings, deploy the Datadog Agent, and manage account settings. See [Managing the Azure Native Integration][4] for additional information.

If your Datadog account is hosted on any other [Datadog site][3], use the [Azure integration][5] to collect monitoring data from your Azure environment.

If you prefer to use CLI, see the [Azure CLI for Datadog][2].

## Datadog Azure integration

### Terraform

{{% site-region region="us3" %}}

You can use [Terraform][1] to deploy the Azure Native integration, which uses the Datadog resource to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. This is possible through creation of a Datadog resource in Azure to link your Azure subscription(s) to your Datadog organization. This replaces the App Registration credential process for metric collection and Event Hub setup for log forwarding. 

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "example-datadog"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "example-datadog-resource"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "Example"
    email = "abc@xyz.com"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

[1]: https://www.terraform.io
[2]: /integrations/guide/azure-portal/
{{% /site-region %}}

{{% site-region region="us,eu,us5,gov" %}}

1. Configure the [Datadog Terraform provider][2] to interact with the Datadog API through a Terraform configuration. 

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:  
    * `azure_tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure web application secret key.
    * `client_secret`: Your Azure web application secret key.

See the [Terraform Registry][4] for further example usage and the full list of optional parameters, as well as additional Datadog resources. 

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<azure_tenant_name>"
  client_id     = "<azure_client_id>"
  client_secret = "<azure_client_secret_key>"
  host_filters  = "examplefilter:true,example:true"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

[1]: https://www.terraform.io
[2]: https://docs.datadoghq.com/integrations/terraform/#overview
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /site-region %}}

#### Managing multiple subscriptions or tenants

You can use multiple provider blocks with aliases to manage Terraform resources across multiple subscriptions or tenants. Read [Provider Configuration][9] for more information.

### API

Datadog's [Azure integration endpoints][8] enable you to create and manage the Azure integration with Datadog's APIs.

## Logs

{{% site-region region="us3" %}}

{{% /site-region %}}

{{% site-region region="us,eu,us5,gov" %}}

The best method for submitting logs from Azure to Datadog is with the Agent or DaemonSet. For some resources it may not be possible. In these cases, Datadog recommends creating a log forwarding pipeline using an Azure Event Hub to collect Azure Platform Logs. For resources that cannot stream Azure Platform Logs to an Event Hub, you can use the Blob Storage forwarding option.

To get started, click the button below and fill in the form on Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account are deployed for you.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Use the Azure CLI to create diagnostic settings that forward logs to your event hub:

az monitor diagnostic-settings create --name
                                      --resource
                                      [--event-hub]

See the [az monitor diagnostic-settings create][1] section in the Azure CLI reference for more information.

[1]: https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest#az-monitor-diagnostic-settings-create
{{% /site-region %}}

## Best practices in Datadog

{{% site-region region="us3" %}}

### Containers 

Use the [Microsoft Azure Kubernetes Service integration][1] and its out-of-the-box [dashboard][2] to monitor and analyze data from your Kubernetes workloads in Azure. Explore the [containers page][3] in Datadog for detailed insights.

### Databases

The [Microsoft Azure Cosmos DB for PostgreSQL][4] and [Microsoft Azure SQL Database][5] integrations provide additional data from Azure database services. Use [Datadog Database Monitoring][6] to better understand the health and performance of your databases.

### Serverless

Datadog provides monitoring capabilities for serverless resources with the [Microsoft Azure App Service Extension][7]. Access the data on the [Azure App Service view][8] in Datadog.

[1]: /integrations/azure_container_service/
[2]: https://us3.datadoghq.com/dash/integration/524/azure-kubernetes-service
[3]: https://us3.datadoghq.com/containers
[4]: /integrations/azure_cosmosdb_for_postgresql/
[5]: /integrations/azure_sql_database/
[6]: /getting_started/database_monitoring/
[7]: /serverless/azure_app_services
[8]: https://us3.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
{{% /site-region %}}

{{% site-region region="us,eu,us5,gov" %}}

### Containers

Use the [Microsoft Azure Kubernetes Service integration][1] and its out-of-the-box [dashboard][2] to monitor and analyze data from your Kubernetes workloads in Azure. Explore the [containers page][3] in Datadog for detailed insights.

### Databases

The [Microsoft Azure Cosmos DB for PostgreSQL][4] and [Microsoft Azure SQL Database][5] integrations provide additional data from Azure database services. Use [Datadog Database Monitoring][6] to better understand the health and performance of your databases.

### Serverless

Datadog provides monitoring capabilities for serverless resources with the [Microsoft Azure App Service Extension][7]. Access the data on the [Azure App Service view][8] in Datadog.

[1]: /integrations/azure_container_service/
[2]: https://app.datadoghq.com/dash/integration/30699/azure-kubernetes-service
[3]: https://app.datadoghq.com/containers
[4]: /integrations/azure_cosmosdb_for_postgresql/
[5]: /integrations/azure_sql_database/
[6]: /getting_started/database_monitoring/
[7]: /serverless/azure_app_services
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/#create-datadog-resource
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /getting_started/site/
[4]: /integrations/guide/azure-portal/
[5]: /integrations/azure/
[6]: /agent/basic_agent_usage/ansible/
[7]: /integrations/azure_container_service/
[8]: /api/latest/azure-integration/
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration