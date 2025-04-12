---
aliases:
- /es/integrations/azure_containerinstances
categories:
- azure
- nube
- rastreo
- suministro
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Container Instances.
doc_link: https://docs.datadoghq.com/integrations/azure_container_instances/
draft: false
git_integration_title: azure_container_instances
has_logo: true
integration_id: azure-containerinstances
integration_title: Microsoft Azure Container Instances
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_instances
public_title: Integración de Datadog y Microsoft Azure Container Instances
short_description: Rastrea las métricas clave de Azure Container Instances.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Container Instances es un servicio que permite a los desarrolladores desplegar contenedores sin la necesidad de aprovisionar o gestionar ninguna infraestructura subyacente.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Container Instances.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_container_instances" >}}


### Eventos

La integración Azure Container Instances no incluye eventos.

### Checks de servicio

La integración Azure Container Instances no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/es/help/