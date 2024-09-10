---
aliases:
- /es/developers/faq/characteristics-of-datadog-histograms/
- /es/graphing/metrics/distributions/
description: Calcula los percentiles globales de todo el conjunto de datos.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentación
  text: Uso de distribuciones en DogStatsD
title: Distribuciones
---
## Información general

Las distribuciones son un tipo de métrica que agrega valores enviados desde varios hosts durante un intervalo de descarga para medir distribuciones estadísticas en toda tu infraestructura.

Las distribuciones globales instrumentan objetos lógicos, como <txprotected>servicios</txprotected>independientemente de los hosts subyacentes. A diferencia de los [histogramas][1], que se agregan del lado del Agent, las distribuciones globales envían todos los datos sin procesar recopilados durante el intervalo de descarga y la agregación se produce del lado del servidor utilizando la [estructura de datos DDSketch][2] de Datadog. 

Las distribuciones proporcionan una funcionalidad de consulta mejorada y opciones de configuración que no se ofrecen con otros tipos de métrica (count, tasa, gauge, histograma):
* **Cálculo de agregaciones de percentiles**: Las distribuciones se almacenan como estructuras de datos DDSketch que representan datos sin procesar y no agregados, de modo que pueden calcularse agregaciones de percentiles globalmente precisas (p50, p75, p90, p95, p99 o cualquier percentil de tu elección con hasta dos decimales) a través de los datos sin procesar de todos tus hosts. La activación de agregaciones de percentiles puede desbloquear funcionalidades de consulta avanzadas como: 

  * **Valor de percentil único en cualquier periodo de tiempo**:

    _“¿Cuál ha sido el percentil 99,9 del tiempo de carga de mi aplicación en la última semana?”_

  * **Desviación estándar en cualquier periodo de tiempo**:

    _“¿Cuál es la desviación estándar (stddev) del consumo de la CPU de mi aplicación en el último mes?”_

  * **Los umbrales de percentil en los monitores de métrica **:

    _“Alértame cuando el p95 de la latencia de la solicitud de mi aplicación sea superior a 200 ms durante los últimos 5 min"._

  * **Consultas sobre umbrales**:

    Me gustaría definir un SLO de 30 días en el que el 95 % de las solicitudes a mi servicio se completen en menos de 5 segundos".


* **Personalización de etiquetado**: Esta funcionalidad permite controlar el esquema etiquetado para métricas personalizadas para el que no es necesaria la granularidad a nivel del host (por ejemplo, transacciones por segundo para una servicio de marcado).

Consulta la [sección Herramientas de desarrollo][1] para más detalles de la implementación. 

**Nota:** Debido a que los datos de las métricas de las distribuciones se almacenan de forma diferente a otros tipos, no se debe utilizar ningún nombre de métrica utilizado para un `distribution` para ningún otro tipo de métrica.

## Activación de funciones avanzadas de consulta

Al igual que otros tipos de métrica, como `gauges` o `histograms`, las distribuciones disponen de las siguientes agregaciones: `count`, `min`, `max`, `sum`, y `avg`. Las distribuciones se etiquetan inicialmente del mismo modo que otras <txprotected>métricas</txprotected>, con las etiquetas (tags) personalizadas establecidas en el código. A continuación, se resuelven en el host etiquetas (tags) basándose en el host que informó la métrica. 

Sin embargo, puedes activar la funcionalidad de consulta avanzada, como el cálculo de agregaciones de percentiles globalmente precisas para todas los etiquetas (tags) consultables de tu distribución en la página Resumen de métricas. Esto proporciona agregaciones para `p50`, `p75`, `p90`, `p95`, y `p99` o cualquier percentil definido por el usuario de tu elección (con hasta dos puntos decimales como 99,99). Al activar las consultas avanzadas también se desbloquean las consultas de umbral y la desviación estándar.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="Un usuario activa la funcionalidad de consulta avanzada de percentiles y umbrales haciendo clic en Configurar en la sección avanzada de un panel de detalle de métricas" vídeo=true width=80% >}}

Después de elegir aplicar agregaciones de percentiles en una métrica de distribución, estas agregaciones están disponibles automáticamente en la interfaz de usuario de creación de gráficas:

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agregaciones de métricas de distribuciones" video=true" >}}

Puedes utilizar agregaciones de percentiles en una variedad de otros widgets y para alertar: 
* **Valor de percentil único en cualquier periodo**

  _“¿Cuál ha sido el percentil 99,9 de duración de las solicitudes de mi aplicación durante la última semana?”_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget de valor de consulta que muestra un único valor (7,33 s) para la agregación del percentil 99,99 de una única métrica" style="width:80%;">}}

* **Umbrales de percentil en los monitores de métricas**
  _“Alértame cuando el p95 de la latencia de solicitud de mi aplicación sea superior a 200 ms durante los últimos 5 min". 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Umbral del percenti que se configura con un menú desplegable para alertar las condiciones en un monitor" style="width:80%;">}}

### Consultas sobre umbrales

<div class="alert alert-warning">
Las consultas de umbral están en beta pública.
</div>

La activación de los percentiles calculados globalmente por DDSketch en tus métricas de distribuciones desbloquea las consultas de umbral en las que puedes contar el número de valores sin procesar de las métricas de distribuciones si superan o quedan por debajo de un umbral numérico. Puedes utilizar esta funcionalidad para contar el número de errores o violaciones en comparación con un umbral numérico anómalo en dashboards. O también puedes utilizar las consultas de umbral para definir SLOs como "el 95 % de las solicitudes se completaron en menos de 10 segundos en los últimos 30 días". 

Con las consultas de umbral para distribuciones con percentiles, no es necesario predefinir un valor de umbral antes del envío de las métricas y se dispone de total flexibilidad para ajustar el valor de umbral en Datadog.

Para utilizar consultas de umbral: 

1. Activa los percentiles en tu métrica de distribución en la página Resumen de métricas.
2. Representa gráficamente la métrica de distribución elegida utilizando el agregador de "valores de count..."
3. Especifica un valor umbral y un operador de comparación.

{{< img src="metrics/distributions/threshold_queries.mp4" vídeo=true alt="Se está visualizando un gráfico de series temporales utilizando el agregador de los valores de count, con un umbral superior a 8 segundos" style="width:80%;" >}}

También puedes crear un SLO basado en métricas utilizando consultas de umbral: 
1. Activa los percentiles en tu métrica de distribución en la página Resumen de métricas.
2. Crea un nuevo SLO basado en métricas y define el numerador como el número de "buenos" eventos con una consulta sobre tu métrica de distribución elegida utilizando agregador "valores de count...".
3. Especifica un valor umbral y un operador de comparación.
{{< img src="metrics/distributions/threshold_SLO.jpg" alt="Consultas de umbrales para SLOs" style="width:80%;">}}

## Personaliza el etiquetado

Las distribuciones proporcionan una funcionalidad que te permite controlar el etiquetado para <txprotected><txprotected>métricas</txprotected> personalizadas</txprotected> donde la granularidad a nivel de host no tiene sentido. Las configuraciones de etiquetas (tags) son _listas de permisos_ de las etiquetas (tags) que te gustaría mantener. 

Para personalizar el etiquetado:

1. Haz clic en el nombre de tu métrica de distribución personalizada en la tabla Resumen de ,métricas para abrir el panel lateral de detalles de métricas.
2. Haz clic en el botón **Gestionar etiquetas (tags)** para abrir el modal de configuración de etiquetas.
3. Haz clic en la pestaña **Personalizar...** para personalizar las etiquetas (tags) que deseas mantener disponibles para la consulta. 

**Nota**: La exclusión de etiquetas (tags) no se admite en la personalización basada en la lista de permisos de etiquetas (tags). No se acepta la adición de etiquetas (tags) que empiecen con `!`.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configurar etiquetas (tags) en una distribución con el botón Gestionar etiquetas" style="width:80%;">}}

## Eventos de audioría
Cualquier cambio en la configuración de etiquetas o en la agregación de percentiles crea un evento en el [explorador de eventos][3]. Este evento explica el cambio y muestra el usuario que lo ha realizado.

Si has creado, actualizado o eliminado una configuración de etiqueta en una métrica de distribución, puedes ver ejemplos con la siguiente búsqueda de eventos:
```texto
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si has añadido o eliminado agregaciones de percentiles a una métrica de distribución, puedes ver ejemplos con la siguiente búsqueda de eventos:
```texto
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer