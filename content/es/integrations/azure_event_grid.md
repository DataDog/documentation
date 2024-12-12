---
aliases:
- /es/integrations/azure_eventgrid
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Event Grid.
doc_link: https://docs.datadoghq.com/integrations/azure_event_grid/
draft: false
git_integration_title: azure_event_grid
has_logo: true
integration_id: azure-eventgrid
integration_title: Microsoft Azure Event Grid
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_event_grid
public_title: Integración de Datadog y Microsoft Azure Event Grid
short_description: Rastrea las métricas principales de Azure Event Grid.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Event Grid es un servicio de enrutamiento de eventos inteligente y totalmente gestionado que permite un consumo uniforme de eventos utilizando un modelo de publicación y suscripción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Event Grid.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_event_grid" >}}


### Eventos

La integración Azure Event Grid no incluye eventos.

### Checks de servicios

La integración Azure Event Grid no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/es/help/