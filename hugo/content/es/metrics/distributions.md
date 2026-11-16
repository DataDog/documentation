---
aliases:
- /es/developers/faq/characteristics-of-datadog-histograms/
- /es/graphing/metrics/distributions/
description: Calcule percentiles globales en todo su conjunto de datos.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentación
  text: Uso de Distributions en DogStatsD
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: Documentación
  text: Tipos de métricas OTLP
title: Distribuciones
---
## Descripción general {#overview}

Las distribuciones son un tipo de métrica que agrega valores enviados desde múltiples servidores durante un intervalo de vaciado para medir distribuciones estadísticas en toda su infraestructura.

Las distribuciones globales instrumentan objetos lógicos, como servicios, independientemente de los servidores subyacentes. A diferencia de los [histogramas][1], que se agregan en el Agent, las distribuciones globales envían todos los datos sin procesar recopilados durante el intervalo de vaciado, y la agregación se realiza en el servidor mediante la [estructura de datos DDSketch][2] de Datadog.

Si utiliza OpenTelemetry, las métricas OTLP Histogram se asignan a las distribuciones de Datadog de forma predeterminada. Consulte [Tipos de métricas OTLP][5] para obtener detalles sobre esta asignación y las opciones de configuración disponibles.

Las distribuciones ofrecen funciones de consulta mejoradas y opciones de configuración que no están disponibles para otros tipos de métricas (conteo, tasa, gauge, histograma):
* **Cálculo de agregaciones de percentiles**: Las distribuciones se almacenan como estructuras de datos DDSketch que representan datos sin procesar y no agregados, de modo que se pueden calcular agregaciones de percentiles globalmente precisas (p50, p75, p90, p95, p99 o cualquier percentil que elija con hasta dos decimales) a partir de los datos sin procesar de todos sus servidores. Habilitar las agregaciones de percentiles puede desbloquear funcionalidades de consulta avanzadas como: 

  * **Valor de percentil único durante cualquier período de tiempo**:
  
     _"¿Cuál ha sido el tiempo de carga correspondiente al percentil 99.9 de mi aplicación durante la última semana?"_

  * **Desviación estándar durante cualquier período de tiempo**:
  
     _"¿Cuál es la desviación estándar (stddev) del consumo de CPU de mi aplicación durante el último mes?"_

  * **Umbrales de percentil en monitores de métricas**:
  
    _"Alérteme cuando el p95 de la latencia de las solicitudes de mi aplicación supere los 200 ms durante los últimos 5 min."_

  * **Consultas de umbral**:
  
    _"Me gustaría definir un SLO de 30 días en el que el 95 % de las solicitudes a mi servicio se completen en menos de 5 segundos."_


* **Personalización del etiquetado**: Esta funcionalidad le permite controlar el esquema de etiquetado de las Custom Metrics para las que no es necesaria la granularidad a nivel de servidor (por ejemplo, las transacciones por segundo de un servicio de pago).

**Nota:** Debido a que los datos de las métricas de distribución se almacenan de manera diferente a los de otros tipos, cualquier nombre de métrica utilizado para una `distribution` no debe utilizarse para ningún otro tipo de métrica. Consulte [Conflictos y ocultamiento de nombres de métricas](#metric-name-conflicts-and-overshadowing) para obtener más información.

## Habilitación de la funcionalidad de consulta avanzada {#enabling-advanced-query-functionality}

Al igual que otros tipos de métricas, como `gauges` o `histograms`, las distribuciones tienen disponibles las siguientes agregaciones: `count`, `min`, `max`, `sum` y `avg`. Las métricas de distribución se etiquetan inicialmente de la misma manera que otras métricas, con etiquetas personalizadas configuradas en el código. Luego se asocian con las etiquetas del servidor que informó la métrica. 

Sin embargo, puede habilitar la funcionalidad de consulta avanzada, como el cálculo de agregaciones de percentiles globalmente precisas para todas las etiquetas consultables en su distribución, en la página Metrics Catalog. Esto proporciona agregaciones para `p50`, `p75`, `p90`, `p95` y `p99` o cualquier percentil definido por el usuario de su elección (con hasta dos cifras decimales, como 99.99). Habilitar consultas avanzadas también desbloquea consultas de umbral y desviación estándar.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="Un usuario que habilita la funcionalidad de percentiles avanzados y consultas de umbral haciendo clic en Configure en la sección avanzada de un panel de detalles de una métrica" video=true width=80% >}}

Después de elegir aplicar agregaciones de percentiles en una métrica de distribución, estas agregaciones están disponibles automáticamente en la interfaz de usuario de gráficos:

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agregaciones de métricas de distribución" video=true" >}}

Puede utilizar agregaciones de percentiles en una variedad de otros widgets y para alertas: 
* **Valor de percentil único durante cualquier período de tiempo**

   _"¿Cuál ha sido la duración de las solicitudes en el percentil 99.9 de mi aplicación durante la última semana?"_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget de valor de consulta que muestra un valor único (7.33 s) para la agregación del percentil 99.99 de una sola métrica" style="width:80%;">}}

* **Umbrales de percentil en monitores de métricas**
  _"Alérteme cuando el p95 de la latencia de las solicitudes de mi aplicación supere los 200 ms durante los últimos 5 min."_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Umbral de percentil configurado con un menú desplegable para condiciones de alerta en un monitor " style="width:80%;">}}

### Configuración masiva para múltiples métricas {#bulk-configuration-for-multiple-metrics}

Puede habilitar o deshabilitar las agregaciones de percentiles para múltiples métricas a la vez, en lugar de tener que configurar cada una individualmente.

1. Navegue a la [página del Catálogo de métricas][4] y haga clic en el menú desplegable {{< ui >}}Configure Metrics{{< /ui >}}.
1. Seleccione {{< ui >}}Enable percentiles{{< /ui >}}.
1. Especifique un prefijo de espacio de nombres de métrica para seleccionar todas las métricas que coincidan con ese espacio de nombres.
1. (Opcional) Para deshabilitar los percentiles para todas las métricas en el espacio de nombres, haga clic en el interruptor {{< ui >}}Percentile aggregations{{< /ui >}}.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="Alternar para administrar agregaciones de percentiles" style="width:100%;" >}}

### Consultas de umbral {#threshold-queries}

Habilitar percentiles calculados por DDSketch con precisión global en sus métricas de distribución desbloquea consultas de umbral donde puede contar el número de valores de métricas de distribución sin procesar si exceden o caen por debajo de un umbral numérico. Puede usar esta funcionalidad para contar el número de errores o violaciones en comparación con un umbral numérico anómalo en los Dashboards. O también puede usar consultas de umbral para definir SLOs como "el 95% de las solicitudes se completaron en menos de 10 segundos durante los últimos 30 días". 

Con las consultas de umbral para distribuciones con percentiles, no necesita predefinir un valor de umbral antes del envío de la métrica, y tiene total flexibilidad para ajustar el valor del umbral en Datadog.

Para usar consultas de umbral: 

1. Habilite los percentiles en su métrica de distribución en la página Metrics Catalog.
2. Grafique la métrica de distribución elegida usando el agregador {{< ui >}}count values...{{< /ui >}}.
3. Especifique un valor de umbral y un operador de comparación.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="Un gráfico de series temporales visualizado usando el agregador de valores de recuento, con un umbral mayor a 8 segundos" style="width:80%;" >}}

De manera similar, puede crear un SLO basado en métricas usando consultas de umbral: 
1. Habilite los percentiles en su métrica de distribución en la página Metrics Catalog.
2. Cree un nuevo SLO basado en métricas y defina el numerador como el número de eventos "buenos" con una consulta en su métrica de distribución elegida usando el agregador {{< ui >}}count values...{{< /ui >}}.
3. Especifique un valor de umbral y un operador de comparación.
{{< img src="metrics/distributions/threshold_SLO.png" alt="Consultas de umbral para SLOs" style="width:80%;">}}

## Personalizar etiquetado {#customize-tagging}

Las distribuciones proporcionan una funcionalidad que le permite controlar el etiquetado de Custom Metrics cuando la granularidad a nivel de servidor no tiene sentido. Las configuraciones de etiquetas son _listas de elementos permitidos_ que indican qué etiquetas desea conservar. 

Para personalizar el etiquetado:

1. Haga clic en el nombre de su métrica de distribución personalizada en la tabla de Metrics Catalog para abrir el panel lateral de detalles de la métrica.
2. Haga clic en el botón {{< ui >}}Manage Tags{{< /ui >}} para abrir el modal de configuración de etiquetas.
3. Haga clic en la pestaña {{< ui >}}Custom...{{< /ui >}} para personalizar las etiquetas que desea mantener disponibles para las consultas. 

**Nota**: La exclusión de etiquetas no es compatible con la personalización de etiquetas basada en listas de permitidos. No se aceptan etiquetas que comiencen con `!`.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configuración de etiquetas en una distribución con el botón Manage Tags" style="width:80%;">}}

## Conflictos de nombres de métricas y ocultamiento {#metric-name-conflicts-and-overshadowing}

Las métricas de distribución almacenan los datos de manera diferente a los tipos que no son de distribución (recuento, tasa, gauge, histograma). Si el mismo nombre de métrica recibe datos de distribución y datos que no son de distribución, el sistema de consultas de Datadog prioriza los datos de distribución. Este comportamiento se denomina **ocultamiento**.

No se pierde ningún dato, ya que ambas series temporales se almacenan. Sin embargo, las consultas devuelven solo los datos de distribución, por lo que la serie temporal que no es de distribución es invisible. El ocultamiento entra en vigor desde el momento en que llega el primer punto de datos de distribución.

### Síntomas del ocultamiento {#symptoms-of-overshadowing}

El ocultamiento suele presentarse de una de las siguientes maneras:

* Las etiquetas o los datos de una métrica parecen cambiar repentinamente, sin que usted realice ningún cambio en la configuración.
* Recibe este error al actualizar una configuración de etiquetas a través de la API de métricas:

    ```text
    New tag-configuration conflicts with existing configuration for <METRIC_NAME>
    ```
* Una métrica se reporta como un tipo diferente al esperado (por ejemplo, usted espera `count` pero ve `distribution`).

Para confirmar el tipo actual de una métrica, consulte la [página de Metrics Catalog][4].

### Evite el ocultamiento {#avoid-overshadowing}

Los nombres de las métricas deben ser únicos entre tipos, en cualquier dirección. A menudo se pasan por alto dos casos:

* **Métricas basadas en logs**: debido a que las métricas basadas en logs siempre se envían como distribuciones, verifique que el nombre de métrica que elija no exista ya como una métrica de conteo, gauge, tasa o histograma.
* **Nombres retirados**: un nombre que ya no recibe datos sigue reservado para su tipo original. No lo reutilice para un tipo diferente.

### Resuelva el ocultamiento {#resolve-overshadowing}

Si su métrica ya está oculta, debe elegir conservar los datos de **distribución** o los datos **que no son de distribución**. No puede conservar ambos bajo el mismo nombre de métrica.

Comuníquese con [Datadog Support][6] y proporcione:

* Los nombres de métricas afectados
* El tipo de datos que desea conservar

Una vez resuelto el conflicto, cambie el nombre de la métrica en cualquier envío futuro para ayudar a garantizar que cada nombre de métrica se utilice para un solo tipo.

## Eventos de auditoría {#audit-events}
Cualquier cambio en la configuración de etiquetas o en la agregación de percentiles crea un evento en [Event Explorer][3]. Este evento explica el cambio y muestra al usuario que lo realizó.

Si creó, actualizó o eliminó una configuración de etiquetas en una métrica de distribución, puede ver ejemplos con la siguiente búsqueda de eventos:

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si agregó o eliminó agregaciones de percentiles en una métrica de distribución, puede ver ejemplos con la siguiente búsqueda de eventos:

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/catalog
[5]: /es/metrics/open_telemetry/otlp_metric_types/
[6]: https://www.datadoghq.com/support/