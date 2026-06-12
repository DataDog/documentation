---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de monitores
description: Guías que cubren las prácticas recomendadas para la configuración, la
  resolución de problemas y los casos de uso avanzados de monitores para la monitorización
  de Datadog.
disable_toc: true
private: true
title: Guías de monitores
---

{{< whatsnext desc="Empezando:" >}}
    {{< nextlink href="monitors/guide/monitor_best_practices" >}}Prácticas recomendadas para monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-set-up-rbac-for-monitors" >}}Configuración de RBAC para monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor_aggregators" >}}Agregadores de monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/history_and_evaluation_graphs" >}}Historial y gráfico de evaluación de monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/why-did-my-monitor-settings-change-not-take-effect" >}}Cambios de configuración del monitor que no surten efecto{{< /nextlink >}}
    {{< nextlink href="monitors/guide/recovery-thresholds" >}}Umbrales de recuperación{{< /nextlink >}}
    {{< nextlink href="monitors/guide/alert_aggregation" >}}Agregación de alertas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/notification-message-best-practices" >}}Práctica recomendada para los mensajes de notificación{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Tutorial:" >}}
    {{< nextlink href="monitors/guide/create-cluster-alert" >}}Crear alertas de cluster para la métrica monitor (noun){{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-monitor (noun)-dependencies" >}}Crear dependencias de monitor (noun) {{< /nextlink >}}
    {{< nextlink href="monitors/types/synthetic_monitoring" >}}Cómo crear monitores en pruebas sintéticas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/reduce-alert-flapping" >}}Reducir el aleteo de alertas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/clean_up_monitor_clutter" >}}Limpiar el desorden de monitor (noun) {{< /nextlink >}}
    {{< nextlink href="monitors/guide/troubleshooting-monitor (noun)-alerts" >}}Solución de problemas de las alertas de monitor (noun) {{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Monitor configuration:" >}}
    {{< nextlink href="monitors/guide/best-practices-for-live-process-monitoring" >}}Prácticas recomendadas para monitorización de procesos en vivo{{< /nextlink >}}
    {{< nextlink href="monitors/guide/non_static_thresholds" >}}Cómo monitorizar umbrales no estáticos{{< /nextlink >}}
    {{< nextlink href="monitors/guide/anomaly-monitor" >}}Monitores de anomalías{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitoring-sparse-metrics" >}}Monitorización de métricas ralas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-arithmetic-and-sparse-metrics" >}}Monitor de métricas aritméticas y ralas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitoring-available-disk-space" >}}Monitorización de espacio de disco disponible{{< /nextlink >}}
    {{< nextlink href="monitors/guide/adjusting-no-data-alerts-for-metric-monitors" >}}Ajustar alertas "Sin datos" para Monitores de métricas{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-update-anomaly-monitor-timezone" >}}Cómo actualizar un monitor de detección de anomalías para justificar la zona horaria local{{< /nextlink >}}
    {{< nextlink href="/monitors/guide/custom_schedules" >}}Añadir programaciones personalizadas para personalizar frecuencias de evaluación de monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/as-count-in-monitor-evaluations" >}}as_count() evaluaciones de monitores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/template-variable-evaluation" >}}Evaluación de variables de plantillas{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Caídas del sistema:" >}}
    {{< nextlink href="/monitors/guide/scoping_downtimes" >}}Alcances de las caídas del sistema{{< /nextlink >}}
    {{< nextlink href="monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime" >}}Prevenir alertas de monitores que estaban caídos{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="monitors/guide/monitor_api_options" >}}Monitorizar opciones de API{{< /nextlink >}}
    {{< nextlink href="monitors/guide/on_missing_data" >}}Migración a la configuración de Datos faltantes{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Use case specific:" >}}
    {{< nextlink href="monitors/guide/alert-on-no-change-in-value" >}}Alerta de ningún cambio en el valor{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-for-value-within-a-range" >}}Monitorizar rangos{{< /nextlink >}}
    {{< nextlink href="monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting" >}}Configurar una alerta para cuando una etiqueta (tag) específica deja de informar{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-ephemeral-servers-for-reboots" >}}Servidores efímeros de monitor para reinicios{{< /nextlink >}}
    {{< nextlink href="monitors/guide/integrate-monitors-with-statuspage" >}}Integrar monitores con page (página) de estado{{< /nextlink >}}
    {{< nextlink href="monitors/guide/github_gating" >}}Canalizar tus despliegues de acciones de GitHub con monitores de Datadog{{< /nextlink >}}
    {{< nextlink href="monitors/guide/add-a-minimum-request-threshold-for-error-rate-alerts" >}}Añadir un umbral mínimo de solicitudes para alertas de tasas de errores{{< /nextlink >}}
    {{< nextlink href="monitors/guide/export-monitor-alerts-to-csv" >}}Exportar alertas de monitores a CSV{{< /nextlink >}}
    {{< nextlink href="monitors/guide/composite_use_cases" >}}Casos de uso de monitor composite{{< /nextlink >}}
{{< /whatsnext >}}