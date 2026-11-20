---
aliases:
- /es/developers/metrics/metric_type_modifiers
- /es/graphing/faq/as_count_validation
- /es/developers/metrics/type_modifiers/
- /es/metrics/type_modifiers
description: Utilice los modificadores en la aplicación as_count y as_rate para cambiar
  las métricas entre representaciones de recuento y tasa.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentación
  text: Obtenga más información sobre DogStatsD
- link: /extend/community/libraries/
  tag: Documentación
  text: Bibliotecas de cliente para API y DogStatsD oficiales y creadas por la comunidad
title: Modificadores de tipo de métrica
---
Un [tipo de métrica][1] indica qué intenta representar con su métrica y cuál es su fuente de emisión. Los tipos de métrica `COUNT` y `RATE` son bastante similares entre sí, ya que representan el mismo concepto: la variación de un valor métrico a lo largo del tiempo. Sin embargo, utilizan una lógica diferente:

* `RATE`: Variación normalizada del valor a lo largo del tiempo (_por segundo_).
* `COUNT`: Variación absoluta del valor durante un intervalo de tiempo determinado.

Dependiendo de su caso de uso y método de envío, un tipo de métrica puede ser más adecuado que el otro para el envío. Por ejemplo:

| Tipo de métrica enviado | Caso de uso                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | Desea monitorear la cantidad de solicitudes recibidas a lo largo del tiempo en varios hosts.                                                                                                    |
| `RATE`                | No tiene control sobre la uniformidad de los envíos de recuentos a lo largo del tiempo entre sus fuentes, por lo que normaliza los valores por cada intervalo individual para poder compararlos en etapas posteriores. |
| `COUNT`               | Desea contar la cantidad de veces que se llama a una función.                                                                                                                            |
| `COUNT`               | Contar los ingresos generados durante un período de tiempo determinado.                                                                                                        |

Dado que `RATE` y `COUNT` no son el mismo tipo de métrica, no tienen el mismo comportamiento o forma dentro de los gráficos y monitores de Datadog. Para cambiar las métricas sobre la marcha entre las representaciones `RATE` y `COUNT`, utilice las funciones modificadoras en la aplicación de Datadog dentro de sus gráficos y monitores.

## Modificadores en la aplicación {#in-application-modifiers}

Los dos modificadores principales en la aplicación son `as_count()` y `as_rate()`.

| Modificadores    | Descripción                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Establece las operaciones necesarias para mostrar la métrica dada como `COUNT`, lo que permite obtener la variación absoluta del valor de una métrica durante [un intervalo de resumen][2]. **Nota:** Debido a que depende del intervalo de resumen, [graficar un intervalo de tiempo más largo cambia la forma de su gráfico][3]. |
| `as_rate()`  | Establece las operaciones necesarias para mostrar la métrica dada como `RATE`, lo que permite obtener la variación absoluta del valor de una métrica por segundo.                                                                                                                                     |

Dependiendo del tipo de métrica al que los haya aplicado, el comportamiento difiere:

{{< tabs >}}
{{% tab "RECUENTO" %}}

* Efecto de `as_count()`:
  * Deshabilita cualquier [interpolación][1].
  * Establece el agregador de tiempo en `SUM`.
* Efecto de `as_rate()`:
  * Deshabilita cualquier [interpolación][1].
  * Establece el agregador de tiempo en `SUM`.
  * Divide el resultado posterior a la agregación por el intervalo de muestreo para normalizarlo. Por ejemplo, los siguientes puntos enviados cada segundo `[1,1,1,1].as_rate()` con un intervalo de resumen de 20 s producirían `[0.05, 0.05, 0.05, 0.05]`.

**Nota**: No hay normalización en intervalos pequeños (cuando no se realiza ningún desglose temporal), por lo que se devuelven los recuentos de los valores sin procesar de la métrica.

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Efecto de `as_count()`:
  * Deshabilita cualquier [interpolación][1].
  * Establece el agregador de tiempo en SUM.
  * Multiplica el resultado posterior a la agregación por el intervalo de muestreo. Por ejemplo, los siguientes puntos enviados cada segundo `[0.05, 0.05, 0.05, 0.05].as_count()` con un intervalo de resumen de 20 s producirían `[1,1,1,1]`.
* Efecto de `as_rate()`:
  * Deshabilita cualquier [interpolación][1].
  * Establece el agregador de tiempo en `SUM`.
  * Redondea hacia abajo el intervalo de resumen de la consulta al intervalo de metadatos de la métrica. Las consultas solicitadas con un intervalo de resumen menor que el intervalo de envío de la métrica se ajustan sin notificación para que coincidan con el intervalo de metadatos.
  * Vuelve a escalar cada bucket completo posterior a la agregación por `min(metadata_interval, rollup_interval) / rollup_interval`. Cuando el intervalo de resumen es igual al intervalo de metadatos, esto no realiza ninguna operación y el valor del bucket es igual al `SUM` posterior a la agregación. Cuando el intervalo de resumen es mayor que el intervalo de metadatos, el valor se convierte en la media temporal de las muestras de tasa `per-second` en ese bucket. Por ejemplo, para una métrica enviada cada `60 seconds` consultada con un intervalo de resumen de `1800 second`, `as_rate()` devuelve `post_aggregation / 30` para cada bucket completo.
  * Vuelve a escalar el bucket parcial más a la derecha (cuando la hora de finalización de la consulta no está alineada con un límite de resumen) para que represente la media de las muestras observadas realmente en esa ventana parcial, en lugar de un valor artificialmente bajo.

  **Nota**: Si una métrica `RATE` no tiene un intervalo de metadatos establecido, no se aplica ninguno de los pasos de reescalado anteriores y el agregador de tiempo vuelve a `AVG` en lugar de `SUM`.

  **Nota**: Por ejemplo, al validar esto, utilice la fórmula `(post_aggregation / rollup_interval) * min(metadata_interval, rollup_interval)` en [Advanced graphing][2]. La expresión no se puede graficar directamente en un widget de consulta de series temporales básico, porque depende del intervalo de resumen activo como un valor numérico.

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /es/dashboards/querying/#advanced-graphing
{{% /tab %}}
{{% tab "GAUGE" %}}

Los tipos de métrica `GAUGE` representan el valor absoluto y final de una métrica; los modificadores `as_count()` y `as_rate()` no afectan cómo se almacena o muestra un gauge en Metrics Explorer.

**Nota**: En los monitores, aplicar `as_count()` a una métrica gauge cambia la ruta de evaluación para funciones que dependen del resumen como `pct_change()`:
- Sin `as_count()`: la función se aplica por bucket y esos valores se suman durante la ventana de evaluación, lo que puede producir valores negativos grandes para gauges dispersos.
- Con `as_count()`: la serie temporal se divide en buckets y se agrega antes de aplicar la función, lo que coincide con el cálculo previsto a nivel de ventana.

{{% /tab %}}
{{< /tabs >}}

### El modificador `weighted()` {#the-weighted-modifier}

Las etiquetas como `pod name` o `container_name` provocan una alta rotación de etiquetas, especialmente al crear consultas para la gestión de costos, la planificación de capacidad o el escalado automático para aplicaciones en contenedores. Para garantizar la precisión matemática de las consultas en gauges independientemente de la rotación de etiquetas, puede utilizar un modificador en la aplicación `.weighted()`. El modificador `.weighted()` permite a Datadog ponderar correctamente los valores de las métricas en función de la vida útil de estas etiquetas de rotación frecuente. 

El modificador `.weighted()` se añade automáticamente a las consultas en gauges solo si se cumplen las dos condiciones siguientes:

- La métrica gauge se envía regularmente, de modo que no hay interpolación sobre los vacíos.
- El intervalo de envío está definido y configurado correctamente. 

El Datadog Agent o una integración establece el intervalo de envío de una métrica en el momento de la ingesta. Modifique los intervalos de envío en la [página de Metrics Catalog][4].

## Modificar el tipo de una métrica dentro de Datadog {#modify-a-metrics-type-within-datadog}

Aunque normalmente no es necesario, es posible cambiar el tipo de una métrica en la [página de Metrics Catalog][4]:

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Metric Type" style="width:70%;">}}

Ejemplo de caso de uso:

1. Tiene una métrica `app.requests.served` que cuenta las solicitudes atendidas, pero accidentalmente la envió desde StatsD como un `GAUGE`. Por lo tanto, el tipo de Datadog de la métrica es `GAUGE`.

2. Usted quería enviar `app.requests.served` como una métrica `COUNT` de StatsD para el desglose temporal. Esto ayudaría a responder preguntas como _"¿Cuántas solicitudes totales se atendieron en el último día?"_ al consultar `sum:app.requests.served{*}` (esto no tendría sentido para una métrica de tipo `GAUGE`).

3. Le gusta el nombre `app.requests.served`, así que en lugar de enviar un nombre de métrica nuevo con un tipo `COUNT` más apropiado, puede cambiar el tipo de `app.requests.served` actualizando:
  * Su código de envío, llamando a `dogstatsd.increment('app.requests.served', N)` después de que se atiendan N solicitudes, y
  * El tipo en la aplicación de Datadog, en la página Metrics Catalog, a `RATE`.

Esto provoca que los datos enviados antes del cambio de tipo para `app.requests.served` se comporten de manera incorrecta. Esto se debe a que se almacenaron en un formato para ser interpretados como un `GAUGE` en la aplicación (no un `RATE`). Los datos enviados después del paso 3 se interpretan correctamente.

Si no está dispuesto a perder los datos históricos enviados como `GAUGE`, cree un nombre de métrica nuevo con el tipo nuevo, dejando el tipo de `app.requests.served` sin cambios.

**Nota**: Para AgentCheck, `self.increment` no calcula el delta de un contador que aumenta de forma monótona; en su lugar, informa el valor enviado en la ejecución de la verificación. Para enviar el valor delta de un contador que aumenta de forma monótona, use `self.monotonic_count`.

[1]: /es/metrics/types/
[2]: /es/metrics/introduction/#time-aggregation
[3]: /es/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/catalog