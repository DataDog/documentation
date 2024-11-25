---
categories:
- nube
- notificaciones
custom_kind: integración
dependencies: []
description: La integración Segment puede recopilar métricas de entrega de eventos
  para destinos de tus espacios de trabajo.
doc_link: https://docs.datadoghq.com/integrations/segment/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-segment-datadog/
  tag: Blog
  text: Monitorización de la infraestructura de datos de clientes con Segment y Datadog
git_integration_title: segment
has_logo: true
integration_id: ''
integration_title: Segment
integration_version: ''
is_public: true
manifest_version: '1.0'
name: segment
public_title: Integración de Datadog y Segment
short_description: Recopila métricas de entrega de eventos de Segment.
team: integraciones-web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Segment es una infraestructura de datos de clientes que facilita la limpieza, la recopilación y el control de los datos de clientes de origen. Segment recopila datos de fuentes como sitios web o aplicaciones móviles y los envía a uno o varios destinos (por ejemplo, Google Analytics y Amazon Redshift).

Utiliza el dashboard y los monitores predefinidos de Datadog para:
- Visualizar métricas de entrega de eventos para destinos de modo nube.
- Analizar datos (por ejemplo, dividiendo métricas por espacio de trabajo o por destino) mediante el sistema de etiquetas (tags) de Datadog.
- Automatizar alertas de cualquier problema de entrega para saber cuándo dejan de funcionar los pipelines de datos críticos.

**Nota**: Estas métricas están pensadas para la entrega a destinos como Snowflake o Amplitude, no para la entrega a Segment desde aplicaciones instrumentadas.

## Configuración

### Instalación

Ve al [cuadro de la integración][1] y concede a Datadog `workspace:read` acceso a un espacio de trabajo haciendo clic en el enlace `Add WorkSpace` para iniciar un flujo OAuth2.
El usuario de Segment que concede a Datadog acceso a un espacio de trabajo debe tener el rol `workspace owner`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "segment" >}}


### Eventos

La integración Segment no incluye eventos.

### Checks de servicios

La integración Segment no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/es/help/