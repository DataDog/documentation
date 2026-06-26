---
aliases:
- /es/integrations/azure_containerservice
categories:
- nube
- rastreo
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

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Kubernetes Service te permite implementar rápidamente un clúster de Kubernetes listo para la producción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Kubernetes Service.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-containerservice" }}


### Eventos

La integración Azure Kubernetes Service no incluye eventos.

### Checks de servicio

La integración Azure Kubernetes Service no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/es/help/