---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /logs/live_tail/
  tag: Documentación
  text: Función Live Tail de Datadog
kind: Guía
title: Correlacionar logs con métricas
---

## Información general

En la aplicación Datadog existen varias formas de correlacionar logs con métricas. Vistas como las del [Explorador de logs][1], los [dashboards][2] y el [Explorador de métricas][3] ofrecen paneles detallados y el cambio instantáneo de vistas para ayudarte a entender rápidamente el contexto de un problema y abordarlo a lo largo de tu servicio.

Esta guía te muestra cómo correlacionar logs y métricas a través de estas vistas.

## Explorador de logs

Para correlacionar logs y métricas en el [Explorador de logs][4]:

1. Haz clic en cualquier log de la columna **Content** (Contenido). Se abre un panel con información detallada del log.
2. Haz clic en la pestaña **Metrics** (Métricas) del panel.

{{< img src="logs/guide/correlate-logs-with-metrics/log-explorer-metrics-tab.jpg" alt="Métricas del Explorador de logs" >}}

## Dashboards

Para correlacionar logs y métricas en un [dashboard][5]:

1. Ve a tu dashboard.
2. Haz clic en cualquier punto de datos de cualquier widget para rellenar el [menú de gráficos][6].
3. Si tu widget contiene **eventos de logs que quieres correlacionar con métricas**:
    1. Selecciona **View related logs** (Ver logs relacionados) para rellenar un panel con información detallada de los logs relacionados.
    2. Selecciona un evento de log específico.
    3. Haz clic en la pestaña **Metrics** (Métricas).
4. Si tu widget contiene **métricas que quieres correlacionar con logs**:
    1. Selecciona **View related logs** (Ver logs relacionados).

## Explorador de métricas

Para correlacionar logs y métricas en la página del [Explorador de métricas][7]:

1. Selecciona una métrica para realizar el gráfico.
2. Haz clic en cualquier punto del gráfico para que aparezca el menú de gráficos.
3. Selecciona **View related logs** (Ver logs relacionados).

## Leer más
{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/explorer/
[2]: /es/dashboards/
[3]: /es/metrics/explorer/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /es/dashboards/widgets/#graph-menu
[7]: https://app.datadoghq.com/metric/explorer