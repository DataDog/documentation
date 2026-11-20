---
description: Aprende a conectar eventos de RUM con la telemetría recopilada por otros
  productos de Datadog.
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentación
  text: Facilitar la resolución de problemas a través de la correlación entre productos
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Correlaciona la telemetría de eventos de RUM y APM sin problemas para obtener
    una visibilidad completa del stack tecnológico.
title: Correlacionar eventos de RUM con otra telemetría
---

La correlación de datos por varios productos de Datadog proporciona contexto para estimar el impacto empresarial y encontrar la causa raíz de un problema en unos pocos clics. Establece conexiones entre los datos entrantes para facilitar los cambios rápidos en tus exploradores y dashboards.

## Correlacionar RUM y logs

Correlaciona los datos recopilados de las sesiones de usuario y consulta eventos con logs para obtener información más detallada sobre el comportamiento de las aplicaciones y agilizar la solución de problemas. Para configurarlo, consulta [Conectar logs y RUM][1].

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Logs de navegador en una acción de RUM" style="width:100%;" >}}

## Correlacionar RUM y trazas

Correlaciona los datos recopilados en las vistas del frontend con trazas y tramos en el backend conectando RUM y trazas. Localiza los problemas en cualquier punto de tu stack tecnológico y comprende lo que experimentan tus usuarios. Para obtener más información, consulta [Conectar RUM y trazas][2].

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM y trazas" style="width:100%;">}}


## Correlacionar los tests de RUM y Synthetic

Sigue los datos de los tests de Synthetic directamente hasta la causa raíz profundizando en los eventos de RUM relacionados. [Conecta Synthetics y RUM][3] para tener una mejor visibilidad de tus tests de Synthetic.

{{< img src="synthetics/guide/rum_in_synthetics/sessions_details_panel.png" alt="Panel lateral con detalles de las sesiones" style="width:100%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/correlate_with_other_telemetry/logs/
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /es/synthetics/guide/explore-rum-through-synthetics/