---
aliases:
- /es/developers/metrics/metric_type_modifiers
- /es/graphing/faq/as_count_validation
- /es/developers/metrics/type_modifiers/
- /es/metrics/type_modifiers
further_reading:
- link: /developers/dogstatsd/
  tag: Documentación
  text: Obtener más información sobre DogStatsD
- link: /developers/community/libraries/
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas cliente DogStatsD
title: Modificadores de tipos de métricas
---

Un [tipo de métrica][1] es una indicación de lo que intentas representar con tu métrica y tu origen de emisión. Los tipos de métricas `COUNT` y `RATE` son bastante similares entre sí, ya que representan el mismo concepto: la variación de un valor de métrica a lo largo del tiempo. Sin embargo, utilizan una lógica diferente:

* `RATE`: Variación normalizada del valor en el tiempo (por segundo).
* `COUNT`: Variación del valor absoluto en un intervalo de tiempo determinado.

Dependiendo de tu caso de uso y del método de envío, un tipo de métrica puede ser más adecuado que otro para el envío. Por ejemplo:

| Tipo de métrica enviado | Caso de uso                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | Quieres monitorizar el número de solicitudes recibidas a lo largo del tiempo en varios hosts.                                                                                                    |
| `RATE`                | No tienes control sobre la coherencia de los envíos de recuentos temporales en tus orígenes, por lo que estás normalizando por cada intervalo individual para poder compararlos aguas arriba. |
| `COUNT`               | Quieres contar el número de veces que se llama a una función.                                                                                                                            |
| `COUNT`               | Contabilizar la cantidad de ingresos que se han tenido durante un periodo de tiempo determinado.                                                                                                        |

Debido a que `RATE` y `COUNT` no son el mismo tipo de métrica, no tienen el mismo comportamiento o forma dentro en los gráficos y monitores de Datadog. Para cambiar las métricas sobre la marcha entre las representaciones `RATE` y `COUNT`, utiliza las funciones del modificador en la aplicación de Datadog en tus gráficos y monitores.

## Modificadores en la aplicación

Los dos principales modificadores en la aplicación son `as_count()` y `as_rate()`.

| Modificadores    | Descripción                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Establece las operaciones necesarias para mostrar la métrica dada en forma de `COUNT`, lo que te proporciona la variación absoluta de un valor de métrica en un [intervalo de retroceso][2]. **Nota:** Debido a que depende del intervalo de retroceso, [crear gráficos de un intervalo de tiempo más prolongado cambia la forma de tu gráfico][3]. |
| `as_rate()`  | Establece las operaciones necesarias para mostrar la métrica dada en forma de`RATE`, lo que te proporciona la variación absoluta por segundo de un valor de métrica.                                                                                                                                     |

Dependiendo del tipo de métrica al que se apliquen, el comportamiento difiere:

{{< tabs >}}
{{% tab "COUNT" (Recuento) %}}

* Efecto de `as_count()`:
  * Desactiva cualquier [interpolación][1].
  * Configura el agregador de tiempo en `SUM`.
* Efecto de `as_rate()`:
  * Desactiva cualquier [interpolación][1].
  * Configura el agregador de tiempo en `SUM`.
  * Divide el resultado post-agregación por el intervalo de muestreo para normalizarlo. Por ejemplo, los siguientes puntos enviados cada segundo `[1,1,1,1].as_rate()` con un intervalo de retroceso de 20s darían como resultado `[0.05, 0.05, 0.05, 0.05]`.

**Nota**: No hay normalización en intervalos pequeños (cuando no hay agregación temporal), por lo que se devuelven los recuentos de valores brutos de métricas.

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Efecto de `as_count()`:
  * Desactiva cualquier [interpolación][1].
  * Configura el agregador de tiempo en SUM.
  * Multiplica el resultado post-agregación por el intervalo de muestreo. Por ejemplo, los siguientes puntos enviados cada segundo `[0.05, 0.05, 0.05, 0.05].as_count()` con un intervalo rollup de 20s darían como resultado `[1,1,1,1]`.
* Efecto de `as_rate()`:
  * Desactiva cualquier [interpolación][1].
  * Configura el agregador de tiempo en `SUM`.

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "GAUGE" (Indicador) %}}

Los tipos de métricas `GAUGE` representan el valor absoluto y final de una métrica. Los modificadores `as_count()` y `as_rate()` no tienen ningún efecto sobre ellos.

{{% /tab %}}
{{< /tabs >}}

### El modificador `weighted()`

Las etiquetas como `pod name` o `container_name` provocan una alta rotación de etiquetas, especialmente cuando se crean consultas para la gestión de costes, la planificación de las capacidades o el autoescalado para aplicaciones en contenedorizadas. Para garantizar la precisión matemática de las consultas en indicadores, independientemente de la rotación de etiquetas, puedes utilizar un modificador `.weighted()` en la aplicación. El modificador `.weighted()` permite a Datadog ponderar adecuadamente los valores de métricas en función de la vida útil de estas etiquetas de rotación frecuente. 

El modificador `.weighted()` se añade automáticamente a las consultas en indicadores sólo si se cumplen las dos condiciones siguientes:

- La métrica de indicador se envía regularmente, de modo que no hay interpolación entre las brechas.
- El intervalo de envío está correctamente definido y configurado. 

El Datadog Agent o la integración establecen el intervalo de envío para una métrica en el momento de la admisión. Modifica los intervalos de envío en la [página Resumen de métricas][4].

## Modificación del tipo de métrica de Datadog

Aunque normalmente no es necesario, es posible cambiar el tipo de métrica en la [página Resumen de métricas][4]:

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Tipo de métrica" style="width:70%;">}}

Ejemplo de caso de uso:

1. Tienes una métrica `app.requests.served` que cuenta las solicitudes cumplidas, pero accidentalmente la has enviado desde StatsD como un `GAUGE`. En este caso, el tipo de métrica de Datadog será `GAUGE`.

2. Querías enviar `app.requests.served` como una métrica `COUNT` de StatsD para la agregación de tiempo. Esto ayudaría a responder a preguntas como "¿Cuántas solicitudes totales se han cumplido en el último día?" consultando `sum:app.requests.served{*}` (esto no tendría sentido para un tipo de métrica `GAUGE`.)

3. Te gusta el nombre `app.requests.served`, así que en lugar de enviar un nuevo nombre métrica con un tipo de `COUNT` más apropiado, podrías cambiar el tipo de `app.requests.served` actualizándolo:
  * Tu código de envío, llamando a `dogstatsd.increment('app.requests.served', N)` después de que se cumplan N peticiones, y
  * El tipo in-app Datadog de la página de resumen de métricas a `RATE`.

Esto provoca que los datos enviados antes del cambio de tipo para `app.requests.served` se comporten incorrectamente. Esto se debe a que se almacenaron en un formato que debe interpretarse como un `GAUGE` en la aplicación (no como un `RATE`). Los datos enviados después del paso 3 se interpretan correctamente.

Si no quieres perder los datos históricos enviados como `GAUGE`, crea un nuevo nombre de métrica con el nuevo tipo, dejando inalterado el tipo de `app.requests.served`.

**Nota**: Para checks del Agent, `self.increment` no calcula el delta para un contador monótonamente creciente. En su lugar, informa el valor transferido en la ejecución del check. Para enviar el valor delta en un contador monótonamente creciente, utiliza `self.monotonic_count`.

[1]: /es/metrics/types/
[2]: /es/metrics/introduction/#time-aggregation
[3]: /es/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary