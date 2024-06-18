---
aliases:
- /es/monitors/monitor_types/
- /es/monitors/create/types/
- /es/monitors/create/#monitor-types
- /es/monitors/create/
description: Tipos de monitores
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitores
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar los monitores
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Detectar fallos de checks de calidad con las reglas de protección de despliegues
    de GitHub y Datadog
kind: Documentación
title: Tipos de monitores
---

{{< whatsnext desc="Elige tu tipo de monitor:">}}
{{< nextlink href="/monitors/types/host" >}}<strong>Host</strong>: comprueba si uno o más hosts informan a Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/metric" >}}<strong>Métrica</strong>: compara los valores de una métrica con el umbral definido por el usuario.{{< /nextlink >}}
{{< nextlink href="/monitors/types/anomaly" >}}<strong>Anomalía</strong>: detecta comportamientos anómalos de una métrica teniendo en cuenta los datos históricos.{{< /nextlink >}}
{{< nextlink href="/monitors/types/apm" >}}<strong>APM</strong>: monitoriza métricas de APM o consultas de trazas.{{< /nextlink >}}
{{< nextlink href="/monitors/types/audit_trail" >}}<strong>Audit Trail</strong>: crea alertas para cuando un tipo específico de log de auditoría supera un umbral definido por el usuario, durante un determinado periodo de tiempo.{{< /nextlink >}}
{{< nextlink href="/monitors/types/change-alert" >}}<strong>Alert de cambios</strong>: crea alertas para cuando el valor absoluto o relativo cambia con respecto al umbral definido por el usuario, durante un determinado periodo de tiempo.{{< /nextlink >}}
{{< nextlink href="/monitors/types/ci" >}}<strong>CI</strong>: monitoriza pipelines CI y datos de tests recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/cloud_cost" >}}<strong>Costes de nube</strong>: monitoriza cambios en los costes asociados a plataformas en la nube.{{< /nextlink >}}
{{< nextlink href="/monitors/types/composite" >}}<strong>Compuesto</strong>: crea alertas sobre una expresión que combina varios monitores.{{< /nextlink >}}
{{< nextlink href="/monitors/types/database_monitoring" >}}<strong>Monitorización de bases de datos</strong>: monitoriza los datos de ejecución de consultas y de explain plans recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/error_tracking" >}}<strong>Seguimiento de errores</strong>: monitoriza problemas en tus aplicaciones recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/event" >}}<strong>Evento</strong>: monitoriza eventos recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/forecasts" >}}<strong>Previsión</strong>: crea alertas para cuando se prevé que una métrica cruce un umbral.{{< /nextlink >}}
{{< nextlink href="/monitors/types/integration" >}}<strong>Integración</strong>: monitoriza valores de métricas o estados de una integración específica.{{< /nextlink >}}
{{< nextlink href="/monitors/types/process" >}}<strong>Live Process</strong>: comprueba si uno o más procesos se están ejecutando en un host.{{< /nextlink >}}
{{< nextlink href="/monitors/types/log" >}}<strong>Logs</strong>: crea alertas para cuando un tipo de log específico supera el umbral definido por el usuario, durante un determinado periodo de tiempo.{{< /nextlink >}}
{{< nextlink href="/monitors/types/network" >}}<strong>Red</strong>: comprueba el estado de endpoints TCP/HTTP.{{< /nextlink >}}
{{< nextlink href="/monitors/types/network_performance" >}}<strong>Rendimiento de la red</strong>: configura alertas sobre el tráfico en tu red.{{< /nextlink >}}
{{< nextlink href="/monitors/types/netflow" >}}<strong>NetFlow</strong>: monitoriza registros de flujo en tus servicios que utilizan la tecnología NetFlow.{{< /nextlink >}}
{{< nextlink href="/monitors/types/outlier" >}}<strong>Outlier</strong>: crea alertas sobre los miembros de un grupo que no se comportan igual que el resto.{{< /nextlink >}}
{{< nextlink href="/monitors/types/process_check" >}}<strong>Check de proceso</strong>: observa el estado generado por el check de servicio process.up.{{< /nextlink >}}
{{< nextlink href="/monitors/types/real_user_monitoring" >}}<strong>Real User Monitoring (RUM)</strong>: monitoriza datos reales de usuarios recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/service_check" >}}<strong>Check de servicios</strong>: monitoriza el estado de checks personalizados arbitrarios.{{< /nextlink >}}
{{< nextlink href="/monitors/types/slo" >}}<strong>Alertas de SLOs</strong>: monitoriza el total de errores y el índice de gastos de tus SLOs.{{< /nextlink >}}
{{< nextlink href="/synthetics/guide/synthetic-test-monitors" >}}<strong>Monitorización Synthetic</strong>: monitoriza valores de métricas o estados de tests a partir de ejecuciones de tests Synthetic.{{< /nextlink >}}
{{< nextlink href="/monitors/types/watchdog" >}}<strong>Watchdog</strong>: recibe notificaciones cuando Watchdog detecta comportamientos anómalos.{{< /nextlink >}}
{{< /whatsnext >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}