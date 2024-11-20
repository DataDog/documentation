---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrear las métricas de Azure Service Fabric
doc_link: https://docs.datadoghq.com/integrations/azure_service_fabric/
draft: false
git_integration_title: azure_service_fabric
has_logo: true
integration_id: azure-service-fabric
integration_title: Microsoft Azure Service Fabric
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_service_fabric
public_title: Integración de Datadog y Microsoft Azure Service Fabric
short_description: Rastrear las métricas de Azure Service Fabric
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Service Fabric es una plataforma de sistemas distribuidos que se utiliza para empaquetar, desplegar y gestionar microservicios y contenedores escalables y confiables.

## Configuración
### Instalación

Si todavía no lo hiciste, configura primero la [integración de Microsoft Azure][1].

Monitoriza el estado de tu clúster de Azure Service Fabric en Datadog ejecutando un comando en la [interfaz de línea de comandos de Azure][2].

Para ejecutar el comando de instalación, toma nota de lo siguiente:

- El sistema operativo que utiliza tu clúster (Windows o Linux)
- El grupo de recursos para tu clúster
- El nombre del conjunto de escala de máquinas virtuales (VMSS) que administra los nodos subyacentes en el clúster
- Tu [clave de API Datadog][3]

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

Un método de instalación alternativo es añadir la extensión Azure Virtual Machine de Datadog directamente a la [plantilla ARM][4] de tu clúster de Service Fabric.

## Datos recopilados
### Métricas

Debido a que el Datadog Agent está instalado en los nodos de tu clúster de Service Fabric, las métricas se informan a Datadog desde los [checks principales][5] del Agent.

Si estás ejecutando aplicaciones en contenedores en Service Fabric, el Agent informa [métricas de Service Fabric Mesh][6].

### Eventos
La integración Azure Service Fabric no incluye ningún evento.

### Checks de servicios
La integración Azure Service Fabric no incluye ningún check de servicio.

## Resolución de problemas
¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/service-fabric-datadog
[5]: https://docs.datadoghq.com/es/getting_started/agent/#checks
[6]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications
[7]: https://docs.datadoghq.com/es/help/