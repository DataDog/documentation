---
aliases: []
categories:
- azure
- nube
- contenedores
custom_kind: integración
dependencies: []
description: Obtén métricas de Azure Container Apps.
doc_link: https://docs.datadoghq.com/integrations/azure_container_apps/
draft: false
git_integration_title: azure_container_apps
has_logo: true
integration_id: azure-container-apps
integration_title: Microsoft Azure Container Apps
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_apps
public_title: Integración de Datadog y Microsoft Azure Container Apps
short_description: Obtén métricas de Azure Container Apps.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Container Apps te permite crear y desplegar aplicaciones y microservicios modernos utilizando contenedores serverless. Para obtener más información, consulta la [documentación de Microsoft][1] para Azure Container Apps.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Microsoft Azure][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_container_apps" >}}


### Eventos

La integración Azure Container Apps no incluye eventos.

### Checks de servicios

La integración Azure Container Apps no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/es/help/