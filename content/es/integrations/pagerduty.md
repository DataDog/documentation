---
categories:
- collaboration
- incidents
- notifications
custom_kind: integration
dependencies: []
description: Generar alertas PagerDuty a partir de métricas y eventos de Datadog
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gestionar los incidentes sobre la marcha con la aplicación móvil de Datadog
- link: https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/
  tag: Blog
  text: Para desplegar PagerDuty de forma segura con Datadog
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration
  tag: Blog
  text: Uso de integraciones con el catálogo de servicios
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_pagerduty
  tag: Terraform
  text: Crear y gestionar la integración Pagerduty en Datadog con Terraform
git_integration_title: pagerduty
has_logo: true
integration_id: ''
integration_title: PagerDuty
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pagerduty
public_title: Integración de PagerDuty en Datadog
short_description: Generar alertas PagerDuty a partir de métricas y eventos de Datadog
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">La integración de PagerDuty en Datadog tiene soporte limitado en el sitio de Datadog para el gobierno. La integración del catálogo de servicios y la resolución automática de la Gestión de Incidentes y la Automatización de flujos (flows) de trabajo no son compatibles.</div>
{{< /site-region >}}

## Información general

Conecta PagerDuty a Datadog para:

- Activar y resolver incidentes de tu flujo mencionando `@pagerduty` en tu mensaje
- Visualizar los incidentes y las escaladas en tu flujo a medida que se producen
- Recibir un recordatorio diario de quién está de guardia

## Configuración

Consulta la [guía de la integración en Datadog][1] de Pagerduty.

{{< site-region region="us" >}}
Una vez que tengas Pagerduty integrado, puedes verificar tendencias personalizadas de incidentes de PagerDuty.
{{< /site-region >}}

## Datos recopilados

### Métricas

La integración de PagerDuty no incluye métricas.

### Eventos

Tus eventos PagerDuty activados/resueltos aparecen en el [Explorador de eventos][2].

### Checks de servicio

La integración de PagerDuty no incluye checks de servicio.

## Resolución de problemas

### Enviar una notificación a un servicio de PagerDuty específico

Para enviar un mensaje o notificación a un servicio de PagerDuty específico, cuando hay varios servicios integrados, utiliza `@pagerduty-[serviceName]` en el mensaje del monitor. Si empiezas a escribirlo en la sección **Di lo que pasa** del monitor, deberías verlo autocompletado.

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" popup="true">}}

Cuando un monitor se recupera, resuelve automáticamente el servicio de Pagerduty, si se incluye el manejador de notificaciones en el mensaje de recuperación del monitor, pero no lo hará si sólo se incluye en el contexto`{{#is_alert}}`.

### Asignación de las gravedades de incidentes de PagerDuty

La gravedad de los incidentes de PagerDuty es determinada por el estado del monitor que está causando la alerta. La siguiente tabla ilustra cómo se asigna el estado de la alerta a la gravedad de un incidente de PagerDuty.

| Estado del monitor     | Gravedad de un incidente de PagerDuty             |
|--------------------|-----------------------------------------|
| `ALERT`            | `error`                                 |
| `NODATA`           | `error`                                 |
| `WARNING`          | `warning`                               |
| `OK` u otros     | `info`                                  |

Por ejemplo, si el monitor pasa de `OK` a `WARNING` y notifica un `@pagerduty-[serviceName]`, la gravedad del incidente de PagerDuty creado será `warning`.

**Nota**: Esta asignación se realiza automáticamente y no puede modificarse.

### Descripción de una alerta truncada

Datadog tiene un límite superior para la longitud de los notificaciones del monitor enviadas a PagerDuty. El límite es de **1024 caracteres**.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/es/events/explorer/