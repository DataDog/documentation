---
categories:
- azure
- cloud
- log collection
- notifications
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Event Hub.
doc_link: https://docs.datadoghq.com/integrations/azure_event_hub/
draft: false
git_integration_title: azure_event_hub
has_logo: true
integration_id: azure-event-hub
integration_title: Microsoft Azure Event Hub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_event_hub
public_title: Integración de Datadog y Microsoft Azure Event Hub
short_description: Rastrea las métricas principales de Azure Event Hub.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Event Hub es un servicio gestionado de flujo (stream) de datos a gran escala.

Obtén métricas de Azure Event Hub para:

- Visualizar el rendimiento de tus Event Hubs
- Correlacionar el rendimiento de tus Event Hubs con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

En el [cuadro de integración de Azure][1], asegúrate de que `Event Hub` esté marcado en la recopilación de métricas.

### APM

Para recopilar logs de Event Hubs, sigue este proceso general:

- Crea un Azure Event Hub desde el portal de Azure, la CLI de Azure o PowerShell.
- Configura la función Azure de Datadog que reenvía logs desde su centro de eventos a Datadog.
- Reenvía tus logs de Event Hubs al Event Hub recién creado.

Para obtener instrucciones detalladas, consulta la [documentación principal sobre logs de Azure][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-event-hub" >}}


### Eventos

La integración Azure Event Hub no incluye eventos.

### Checks de servicios

La integración Azure Event Hub no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.datadoghq.com/es/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/es/help/