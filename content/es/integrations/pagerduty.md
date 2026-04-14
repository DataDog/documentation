---
app_id: pagerduty
categories:
- collaboration
- incidents
- notifications
custom_kind: integración
description: PagerDuty añade alertas por teléfono y SMS a tus herramientas de monitorización
  existentes.
further_reading:
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: blog
  text: Gestionar incidentes sobre la marcha con la aplicación móvil Datadog
- link: https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/
  tag: blog
  text: Cómo se despliega PagerDuty de forma segura con Datadog
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration
  tag: blog
  text: Blog de PagerDuty
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_pagerduty
  tag: otros
  text: PagerDuty
media: []
title: PagerDuty
---
{{< site-region region="gov" >}}

<div class="alert alert-warning">La integración de PagerDuty en Datadog tiene soporte limitado en el sitio de Datadog para el gobierno. La integración del catálogo de servicios y la resolución automática de la Gestión de Incidentes y la Automatización de flujos de trabajo no son compatibles.</div>
{{< /site-region >}}

## Información general

Conecta PagerDuty a Datadog para:

- Activar y resolver incidentes de tu flujo (stream) mencionando `@pagerduty` en tu mensaje
- Visualizar los incidentes y las escaladas en tu flujo a medida que se producen
- Recibir un recordatorio diario de quién está de guardia

## Configuración

Consulta la [guía de integración de Datadog](http://www.pagerduty.com/docs/guides/datadog-integration-guide) de PagerDuty.

{{< site-region region="us" >}}
Una vez que tengas Pagerduty integrado, puedes verificar tendencias personalizadas de incidentes de PagerDuty.
{{< /site-region >}}

## Datos recopilados

### Métricas

La integración de PagerDuty no incluye métricas.

### Eventos

Tus eventos de PagerDuty activados/resueltos aparecen en el [Explorador de eventos](https://docs.datadoghq.com/events/explorer/).

### Checks de servicio

La integración de PagerDuty no incluye checks de servicio.

## Solucionar problemas

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}