---
aliases:
- /es/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
- /es/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
further_reading:
- link: /metrics/types/
  tag: Documentación
  text: Descubrir los tipos de métricas de Datadog
- link: /dashboards/functions/rollup/
  tag: Documentación
  text: Obtener más información sobre la función rollup
title: ¿Por qué al reducir un periodo de tiempo también se suavizan mis gráficos?
---

En Datadog, un gráfico sólo puede contener un número determinado de puntos y, a medida que aumenta el periodo de tiempo en el que se visualiza una métrica, se produce una agregación entre puntos para que el número de puntos se mantenga por debajo de ese número determinado. De esta forma, se pierde granularidad a medida que aumenta el periodo de tiempo. Por ejemplo, para un periodo de tiempo de cuatro horas, los datos se agregan para tener un valor por minuto para un gráfico de líneas y un valor por dos minutos para un gráfico de barras. A medida que te alejas, seleccionando un periodo de tiempo mayor, los datos mostrados en el gráfico representan un periodo de tiempo más largo.

{{< img src="metrics/guide/smooth_line.mp4" alt="Suavizar un gráfico de líneas" video="true" width="90%" >}}

Cuando se muestran barras, el intervalo de rollup es más obvio:

{{< img src="métricas/guide/smoothing.mp4" alt="Suavizar un gráfico de barras" vídeo="true" width="90%" >}}

Puedes añadir manualmente la función `.rollup()` a tu consulta para ajustar el método y la granularidad de la agregación temporal. Datadog realiza un rollup de los puntos de datos automáticamente por defecto, promediando los valores en el intervalo de rollup para los tipos de métricas `GAUGE`, `RATE` y `COUNT`.

**Nota**: Si consultas tus métricas a través de la interfaz de usuario de un widget de Datadog, se añade automáticamente un [modificador de tipos de métricas en la aplicación][1] a tus tipos de métricas `RATE` y `COUNT`. Esto cambia el comportamiento de `.rollup()`: los valores se suman sin ninguna interpolación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/type_modifiers/