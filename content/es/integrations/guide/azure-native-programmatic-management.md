---
description: Pasos para la gestión mediante programación de la integración Azure Native
  con Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentación
  text: Integración Azure
- link: https://docs.datadoghq.com/integrations/guide/azure-portal
  tag: Documentación
  text: Gestión de la integración Azure Native
title: Guía de gestión mediante programación de la integración Azure Native
---

{{< site-region region="us3" >}}

## Información general

La integración Azure Native utiliza el recurso Datadog en Azure para agilizar la gestión y la recopilación de datos de tu entorno Azure. Datadog recomienda utilizar este método siempre que sea posible. Este método implica crear el recurso [azurerm_datadog_monitor][3] y asignarle el [rol de lector de la monitorización][4] para vincular tus suscripciones Azure a tu organización Datadog. Esto sustituye el proceso de las credenciales de registro de aplicaciones para la recopilación de métricas y la configuración de Event Hub para el reenvío de logs.

## Configuración

**Nota**: Para configurar la integración Azure Native, debes contar con suscripciones Azure de tu propiedad que quieras vincular y administrar la organización Datadog a la que quieres vincularlas.

### Terraform

1. Asegúrate de que has configurado el [proveedor Terraform Azure][1].

2. Utiliza las plantillas siguientes para crear el recurso `azurerm_datadog_monitor` y realizar la asignación de roles `Monitoring Reader` con Terraform:

#### Recurso de monitor Azure Datadog

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

#### Rol de lector de la monitorización

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Lector de monitorización"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. Ejecuta `terraform apply`.

## Recopilación de logs

Una vez configurado el recurso Datadog en tu cuenta de Azure, configura la recopilación de logs a través del portal Azure. Para obtener más información, consulta [Configurar métricas y logs][5] en la documentación de Azure.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[2]: /es/integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{< /site-region >}}

{{< site-region region="us,us5,eu,ap1,gov" >}}

<div class="alert alert-info">La integración Azure Native sólo está disponible para organizaciones en el sitio Datadog US3. Si utilizas un <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">sitio de Datadog</a> diferente, consulta la <a href="https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/" target="_blank">guía estándar Gestión mediante programación de Azure</a>. Si estás utilizando el sitio Datadog US3, <a href="?site=us3" target="_blank">cambia el selector de sitio</a> a la derecha de esta página.</div>

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}