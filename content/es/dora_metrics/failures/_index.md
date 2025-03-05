---
aliases:
- /es/continuous_integration/dora_metrics/setup/incidents
- /es/dora_metrics/setup/incidents
description: Aprende a enviar eventos de incidencias para métricas de DORA.
further_reading:
- link: /continuous_integration/dora_metrics/setup/deployments
  tag: Documentación
  text: Más información sobre la configuración de los datos de despliegue en métricas
    de DORA
- link: /tracing/service_catalog
  tag: Documentación
  text: Más información sobre el Catálogo de servicios
- link: https://github.com/DataDog/datadog-ci
  tag: Código fuente
  text: Más información sobre la herramienta Datadog-ci CLI
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Consulta las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
is_beta: true
title: Cómo configurar los datos de incidencias para métricas de DORA
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Las métricas de DORA no están disponibles en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

<div class="alert alert-warning">Las métricas de DORA están en fase beta pública.</div>

## Información general

Los eventos de despliegues fallidos, actualmente interpretados a través de eventos de incidencia, se utilizan para calcular la [change failure rate (tasa de fallo en el cambio)](#calculating-change-failure-rate) y [mean time to restore (tiempo medio de restauración, MTTR)](#calculating-mean-time-to-restore).

## Selección de una fuente de datos de incidencia

{{< whatsnext desc="Las métricas de DORA admiten las siguientes fuentes de datos para los eventos de despliegue. Consulta la documentación correspondiente para configurar una fuente de datos para tus eventos de despliegue:" >}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}API de eventos de incidencias{{< /nextlink >}}
{{< /whatsnext >}}

## Cálculo de la tasa de fallo en el cambio 
La tasa de fallo en el cambio requiere tanto [datos de despliegue][7] como [datos de incidencias](#configuring-failure-data-sources).

La tasa de fallo en el cambio se calcula como el porcentaje de eventos de incidencia sobre el número total de despliegues. Datadog divide `dora.incidents.count` entre `dora.deployments.count` para los mismos servicios o equipos asociados tanto a un fallo como a un evento de despliegue.

## Cálculo del tiempo de restauración
El tiempo de restauración se calcula como la distribución de la duración de los eventos de *incidencia resuelta*.

Las métricas de DORA generan la métrica `dora.time_to_restore` registrando las horas de inicio y fin de cada evento de incidencia. Calcula el tiempo medio de restauración (MTTR) como la media de estos puntos de datos `dora.time_to_restore` en un periodo seleccionado. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /es/tracing/service_catalog
[4]: /es/tracing/service_catalog/setup
[5]: /es/tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /es/dora_metrics/deployments