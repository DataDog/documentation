---
aliases:
- /es/integrations/azure_containerservice
categories:
- nube
- contenedores
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Kubernetes Service.
doc_link: https://docs.datadoghq.com/integrations/azure_container_service/
draft: false
git_integration_title: azure_container_service
has_logo: true
integration_id: azure-containerservice
integration_title: Microsoft Azure Kubernetes Service
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_service
public_title: Integración de Datadog y Microsoft Azure Kubernetes Service
short_description: Rastrea las métricas clave de Azure Kubernetes Service.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Kubernetes Service te permite implementar rápidamente un clúster de Kubernetes listo para la producción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Kubernetes Service.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_container_service" >}}


### Eventos

La integración Azure Kubernetes Service no incluye eventos.

### Checks de servicios

La integración Azure Kubernetes Service no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/es/help/