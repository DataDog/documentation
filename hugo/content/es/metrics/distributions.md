---
aliases:
- /es/developers/faq/characteristics-of-datadog-histograms/
- /es/graphing/metrics/distributions/
description: Calcula percentiles globales en todo tu conjunto de datos.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentación
  text: Uso de distribuciones en DogStatsD
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: Documentación
  text: Tipos de métricas OTLP
title: Distribuciones
---
## Resumen {#overview}

Las distribuciones son un tipo de métrica que agrega valores enviados desde múltiples servidores durante un intervalo de vaciado para medir distribuciones estadísticas en toda tu infraestructura.

Las distribuciones globales instrumentan objetos lógicos, como servicios, independientemente de los servidores subyacentes. A diferencia de los [histogramas][1] que se agregan del lado del agente, las distribuciones globales envían todos los datos crudos recopilados durante el intervalo de vaciado y la agregación ocurre del lado del servidor utilizando la [estructura de datos DDSketch][2] de Datadog.

Si utilizas OpenTelemetry, las métricas de histograma OTLP se mapean a distribuciones de Datadog por defecto. Consulta [Tipos de métricas OTLP][5] para obtener detalles sobre este mapeo y las opciones de configuración disponibles.

Las distribuciones proporcionan funcionalidades de consulta mejoradas y opciones de configuración que no se ofrecen con otros tipos de métricas (conteo, tasa, medidor, histograma):
* **Cálculo de agregaciones percentiles**: Las distribuciones se almacenan como estructuras de datos DDSketch que representan datos crudos, no agregados, de tal manera que se pueden calcular agregaciones percentiles globalmente precisas (p50, p75, p90, p95, p99 o cualquier percentil de tu elección con hasta dos puntos decimales) a partir de los datos crudos de todos tus servidores. Habilitar agregaciones percentiles puede desbloquear funcionalidades avanzadas de consulta como: 

  * **Valor percentil único sobre cualquier periodo de tiempo**:
  
     _"¿Cuál ha sido el tiempo de carga del percentil 99.9 para mi aplicación en la última semana?"_

  * **Desviación estándar sobre cualquier periodo de tiempo**:
  
     _"¿Cuál es la desviación estándar (stddev) del consumo de CPU de mi aplicación en el último mes?"_

  * **Umbrales percentiles en seguimientos de métricas**:
  
    _"Alérteme cuando el p95 de la latencia de solicitudes de mi aplicación sea mayor a 200 ms en los últimos 5 minutos."_

  * **Consultas de umbral**:
  
    _"Me gustaría definir un SLO de 30 días donde el 95% de las solicitudes a mi servicio se completen en menos de 5 segundos."_


* **Personalización de etiquetado**: Esta funcionalidad te permite controlar el esquema de etiquetado para métricas personalizadas para las cuales no es necesaria una granularidad a nivel de host (por ejemplo, transacciones por segundo para un servicio de pago).

**Nota:** Debido a que los datos métricos de distribuciones se almacenan de manera diferente a otros tipos, cualquier nombre de métrica utilizado para un `distribution` no debe ser utilizado para ningún otro tipo de métricas.

## Habilitando funcionalidad avanzada de consultas {#enabling-advanced-query-functionality}

Al igual que otros tipos de métricas, como `gauges` o `histograms`, las distribuciones tienen las siguientes agregaciones disponibles: `count`, `min`, `max`, `sum` y `avg`. Las distribuciones se etiquetan inicialmente de la misma manera que otras métricas, con etiquetas personalizadas establecidas en el código. Luego se resuelven a etiquetas de host basadas en el host que reportó la métrica. 

Sin embargo, puede habilitar la funcionalidad avanzada de consultas, como el cálculo de agregaciones percentiles globalmente precisas para todas las etiquetas consultables en su distribución en la página de Resumen de Métricas. Esto proporciona agregaciones para `p50`, `p75`, `p90`, `p95` y `p99` o cualquier percentil definido por el usuario de tu elección (con hasta dos puntos decimales, como 99.99). Habilitar consultas avanzadas también desbloquea consultas de umbral y desviación estándar.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="Un usuario habilitando percentiles avanzados y funcionalidad de consultas de umbral al hacer clic en configurar en la sección avanzada de un panel de detalles de métrica." video=true width=80% >}}

Después de optar por aplicar agregaciones percentiles en una métrica de distribución, estas agregaciones están automáticamente disponibles en la interfaz de usuario de gráficos:

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agregaciones de métricas de distribución" video=true" >}}

Puede usar agregaciones percentiles en una variedad de otros widgets y para alertas: 
* **Valor de percentil único sobre cualquier período de tiempo**

   _"¿Cuál ha sido la duración de solicitud del percentil 99.9 para mi aplicación en la última semana?"_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget de valor de consulta que muestra un solo valor (7.33s) para la agregación del percentil 99.99 de una sola métrica." style="width:80%;">}}

* **Umbrales de percentil en monitores de métricas**
  _"Alérteme cuando el p95 de la latencia de solicitud de mi aplicación sea mayor a 200 ms durante los últimos 5 minutos."_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Se establece un umbral percentil con un menú desplegable para las condiciones de alerta en un monitor " style="width:80%;">}}

### Configuración masiva para múltiples métricas {#bulk-configuration-for-multiple-metrics}

Puede habilitar o deshabilitar las agregaciones percentiles para múltiples métricas a la vez, en lugar de tener que configurar cada una individualmente.

1. Navegue a la [Página de Resumen de Métricas][4] y haga clic en el menú desplegable **Configurar Métricas**.
1. Seleccione **Habilitar percentiles**.
1. Especifique un prefijo de espacio de nombres de métrica para seleccionar todas las métricas que coincidan con ese espacio de nombres.
1. (Opcional) Para deshabilitar los percentiles para todas las métricas en el espacio de nombres, haga clic en el interruptor **Agregaciones percentiles**.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="Alternar para gestionar las agregaciones percentiles" style="width:100%;" >}}

### Consultas de Umbral {#threshold-queries}

Habilitar percentiles calculados por DDSketch, que son globalmente precisos en sus métricas de distribución, desbloquea consultas de umbral donde puede contar el número de valores de métricas de distribución en bruto si superan o caen por debajo de un umbral numérico. Puede utilizar esta funcionalidad para contar el número de errores o violaciones en comparación con un umbral numérico anómalo en los paneles. O también puede utilizar consultas de umbral para definir SLOs como "el 95% de las solicitudes se completaron en menos de 10 segundos en los últimos 30 días". 

Con consultas de umbral para distribuciones con percentiles, no necesita predefinir un valor de umbral antes de la presentación de métricas, y tiene total flexibilidad para ajustar el valor del umbral en Datadog.

Para utilizar consultas de umbral: 

1. Habilite percentiles en su métrica de distribución en la página de Metrics Summary.
2. Grafique su métrica de distribución elegida utilizando el agregador "contar valores...".
3. Especifique un valor de umbral y un operador de comparación.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="Un gráfico de series temporales visualizado utilizando el agregador de contar valores, con un umbral de más de 8 segundos" style="width:80%;" >}}

Puede crear de manera similar un SLO basado en métricas utilizando consultas de umbral: 
1. Habilite percentiles en su métrica de distribución en la página de Resumen de Métricas.
2. Crea un nuevo SLO basado en métricas y define el numerador como el número de eventos "buenos" con una consulta sobre tu métrica de distribución elegida utilizando el agregador "contar valores...".
3. Especifica un valor umbral y un operador de comparación.
{{< img src="metrics/distributions/threshold_SLO.png" alt="Consultas de umbral para SLOs" style="width:80%;">}}

## Personaliza la etiquetación {#customize-tagging}

Las distribuciones proporcionan funcionalidad que te permite controlar la etiquetación para métricas personalizadas donde la granularidad a nivel de host no tiene sentido. Las configuraciones de etiquetas son _listas permitidas_ de las etiquetas que te gustaría mantener. 

Para personalizar la etiquetación:

1. Haz clic en el nombre de tu métrica de distribución personalizada en la tabla de Metrics Summary para abrir el panel lateral de detalles de métricas.
2. Haz clic en el botón **Administrar Etiquetas** para abrir el modal de configuración de etiquetas.
3. Haz clic en **Personalizado...** pestaña para personalizar las etiquetas que te gustaría mantener disponibles para consulta. 

**Nota**: La exclusión de etiquetas no es compatible en la personalización de etiquetas basada en listas permitidas. No se aceptan etiquetas que comiencen con `!`.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configurar etiquetas en una distribución con el botón Administrar Etiquetas" style="width:80%;">}}

## Eventos de auditoría {#audit-events}
Cualquier cambio en la configuración de etiquetas o en la agregación de percentiles crea un evento en el [explorador de eventos][3]. Este evento explica el cambio y muestra al usuario que realizó el cambio.

Si creaste, actualizaste o eliminaste una configuración de etiquetas en una métrica de distribución, puedes ver ejemplos con la siguiente búsqueda de eventos:

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si agregaste o eliminaste agregaciones de percentiles a una métrica de distribución, puedes ver ejemplos con la siguiente búsqueda de eventos:

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /es/metrics/open_telemetry/otlp_metric_types/