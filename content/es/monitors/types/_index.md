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
  text: Detectar fallos en checks de calidad con las reglas de protección de despliegues
    de GitHub y Datadog
- link: https://learn.datadoghq.com/courses/getting-started-monitors
  tag: Centro de aprendizaje
  text: Crea, Configura y utiliza monitores de Datadog para anticiparte a los problemas.
title: Tipos de monitores
---

{{< whatsnext desc="Choose your monitor type:">}}
{{< nextlink href="/monitors/types/host" >}}<strong>Host</strong>: Check si uno o más hosts están enviando informes a Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/metric" >}}<strong>Métrica</strong>: Compara valores de una métrica con un umbral definido por el usuario.{{< /nextlink >}}
{{< nextlink href="/monitors/types/anomaly" >}}<strong>Anomalía</strong>: Detecta un comportamiento anómalo para una métrica basado en datos históricos.{{< /nextlink >}}
{{< nextlink href="/monitors/types/apm" >}}<strong>APM</strong>: Monitoriza métricas de APM o rastrea consultas.{{< /nextlink >}}
{{< nextlink href="/monitors/types/audit_trail" >}}<strong>Rastro de auditoría</strong>: Alerta cuando un tipo especificado de log de auditoría supera un umbral definido por el usuario durante un período de tiempo determinado.{{< /nextlink >}}
{{< nextlink href="/monitors/types/change-alert" >}}<strong>Alerta de cambio</strong>: Alerta cuando el valor absoluto o relativo cambia comparado con un umbral definido por el usuario durante un período de tiempo determinado.{{< /nextlink >}}
{{< nextlink href="/monitors/types/ci" >}}<strong>CI</strong>: Monitoriza pipelines de CI y datos de tests recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/cloud_cost" >}}<strong>Costos en la nube</strong>: Monitoriza cambios de costos asociados con plataformas en la nube.{{< /nextlink >}}
{{< nextlink href="/monitors/types/composite" >}}<strong>Composite (compuesto)</strong>: Alerta sobre una expresión que combina varios monitores.{{< /nextlink >}}
{{< nextlink href="/monitors/types/database_monitoring" >}}<strong>Monitorización de base de datos</strong>: Monitoriza la ejecución de consultas y explica datos de planes recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/error_tracking" >}}<strong>Rastreo de errores</strong>: Monitoriza problemas en tus aplicaciones recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/event" >}}<strong>Evento</strong>: Monitoriza eventos recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/forecasts" >}}<strong>Predicción</strong>: Alerta cuando se prevé que una métrica cruce el umbral.{{< /nextlink >}}
{{< nextlink href="/monitors/types/integration" >}}<strong>Integración</strong>: Monitoriza valores de métricas o el estado de mantenimiento desde una integración específica.{{< /nextlink >}}
{{< nextlink href="/monitors/types/process" >}}<strong>Proceso en tiempo real</strong>: Check si uno o más procesos se están ejecutando en un host.{{< /nextlink >}}
{{< nextlink href="/monitors/types/log" >}}<strong>Logs</strong>: Alerta cuando un tipo especificado de log excede un umbral definido por el usuario durante un período de tiempo determinado.{{< /nextlink >}}
{{< nextlink href="/monitors/types/network" >}}<strong>Red</strong>: Check el estado de los endpoints de TCP/HTTP.{{< /nextlink >}}
{{< nextlink href="/monitors/types/cloud_network_monitoring" >}}<strong>Monitorización de la red en la nube</strong>: Configura alertas en tu tráfico de red.{{< /nextlink >}}
{{< nextlink href="/monitors/types/netflow" >}}<strong>NetFlow</strong>: Monitoriza registros de flujo desde tus dispositivos activados por NetFlow.{{< /nextlink >}}
{{< nextlink href="/monitors/types/outlier" >}}<strong>Outlier (valor atípico)</strong>: Alerta sobre miembros de un grupo que se comportan de un modo diferente a los demás.{{< /nextlink >}}
{{< nextlink href="/monitors/types/process_check" >}}<strong>Check de proceso</strong>: Mira el estado producido por el check de servicio process.up.{{< /nextlink >}}
{{< nextlink href="/monitors/types/real_user_monitoring" >}}<strong>Real User Monitoring</strong>: Monitoriza datos reales del usuario recopilados por Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/types/service_check" >}}<strong>Check de servicio</strong>: Monitoriza el estado de checks personalizados arbitrarios.{{< /nextlink >}}
{{< nextlink href="/monitors/types/slo" >}}<strong>Alertas de SLOs</strong>: Monitoriza tu budget (presupuesto) de errores de SLOs y la tasa de grabación.{{< /nextlink >}}
{{< nextlink href="/synthetics/guide/synthetic-test-monitors" >}}<strong>Synthetic Monitoring</strong>: Monitoriza valores de métricas o el estado de tests desde ejecuciones de tests de Synthetic Monitoring.{{< /nextlink >}}
{{< nextlink href="/monitors/types/watchdog" >}}<strong>Watchdog</strong>: Recibe notificaciones cuando Watchdog detecta un comportamiento anómalo.{{< /nextlink >}}
{{< /whatsnext >}}


## Para leer más

{{< partial name="whats-next/whats-next.html" >}}