---
app_id: azure_service_fabric
categories:
- nube
- azure
custom_kind: integración
description: Rastrear las métricas de Azure Service Fabric
title: Microsoft Azure Service Fabric
---
## Información general

Azure Service Fabric es una plataforma de sistemas distribuidos que se utiliza para empaquetar, desplegar y gestionar microservicios y contenedores escalables y confiables.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/).

Monitoriza el estado de tu clúster de Azure Service Fabric en Datadog ejecutando un comando en la [interfaz de línea de comandos de Azure](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest).

Para ejecutar el comando de instalación, toma nota de lo siguiente:

- El sistema operativo que utiliza tu clúster (Windows o Linux)
- El grupo de recursos para tu clúster
- El nombre del conjunto de escala de máquinas virtuales (VMSS) que administra los nodos subyacentes en el clúster
- Tu [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys)

Actualiza el siguiente comando según la información recopilada:

{{< tabs >}}

{{% tab "Windows" %}}

```shell
az vmss extension set --name DatadogWindowsAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}

{{% tab "Linux" %}}

```shell
az vmss extension set --name DatadogLinuxAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}

{{< /tabs >}}

Inicia sesión en la CLI de Azure y ejecuta el comando actualizado para desplegar el Datadog Agent en los nodos de tu clúster.

### Extensión de VM

Un método de instalación alternativo es añadir la extensión de Azure Virtual Machine de Datadog directamente a la [plantilla de ARM](https://github.com/DataDog/service-fabric-datadog) de tu clúster de Service Fabric.

## Datos recopilados

### Métricas

Dado que el Datadog Agent está instalado en los nodos de tu clúster de Service Fabric, las métricas se informan a Datadog desde los [core checks] del Agent(https://docs.datadoghq.com/getting_started/agent/#checks).

Si estás ejecutando aplicaciones en contenedores en Service Fabric, el Agent informa de [métricas de Service Fabric Mesh](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications).

### Eventos

La integración Azure Service Fabric no incluye ningún evento.

### Checks de servicio

La integración Azure Service Fabric no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).