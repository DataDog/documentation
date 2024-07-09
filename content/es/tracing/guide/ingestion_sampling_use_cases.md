---
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: Guía
  text: Cómo controlar los volúmenes ingeridos
title: Casos de uso del muestreo de trazas
---

## Información general

Los datos de traza (trace) tienden a ser repetitivos. Rara vez se identifica un problema en tu aplicación en una sola traza y en ninguna otra. Para servicios de alto rendimiento, en especial para incidencias que requieren tu atención, un problema muestra indicios repetidamente en múltiples trazas (traces). En consecuencia, no suele ser necesario recopilar todas y cada una de las trazas de un servicio o endpoint, ni todos y cada uno de los tramos (spans) dentro de una traza. Los [mecanismos de control de la ingesta][1] de Datadog APM ayudan a mantener la visibilidad que necesitas para solucionar problemas, al tiempo que reduce el ruido y gestiona los costes.

Los mecanismos de ingesta son configuraciones dentro del Datadog Agent y las bibliotecas de rastreo de Datadog. Si estás utilizando SDKs de OpenTelemetry para instrumentar tus aplicaciones, lee [Muestreo de ingesta con OpenTelemetry][2].

Esta guía te ayuda a comprender cuándo y cómo utilizar las configuraciones de control de la ingesta, en función de los principales casos de uso con los que te puedes encontrar. Abarca lo siguiente:

- [Determinar qué mecanismos de ingesta se utilizan](#determining-which-ingestion-mechanisms-are-used) para un servicio específico
- [Casos de uso centrados en la conservación de determinados tipos de trazas](#keeping-certain-types-of-traces)
- [Casos de uso centrados en la reducción de la ingesta de trazas](#reducing-ingestion-for-high-volume-services)


## Determinar qué mecanismos de ingesta se utilizan

Para identificar qué mecanismos de ingesta se utilizan actualmente en tu entorno de Datadog, navega hasta la [Página de control de la ingesta][3].

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Página de control de la ingesta" style="width:90%;" >}}

La tabla ofrece información sobre los volúmenes ingeridos *por servicio*. La columna Configuration (Configuración) proporciona una primera indicación de la configuración actual. Muestra lo siguiente:
- `AUTOMATIC` si la frecuencia de muestreo calculada en el Datadog Agent se aplica a las trazas que parten del servicio. Lee más sobre los detalles de [la lógica de ingesta de Datadog Agent][5].
- `CONFIGURED` si se aplica una frecuencia de muestreo personalizado de trazas configurada en la biblioteca de rastreo a las trazas que parten del servicio.

Haz clic en los servicios para ver detalles sobre los responsables de la toma de decisiones de muestreo (por ejemplo, Agent o biblioteca de rastreo, reglas o frecuencias de muestreo) que se utilizan para cada servicio, así como los [mecanismos de muestreo de ingesta][1] que se aprovechan para los servicios de tramos ingeridos.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="Resumen de ingesta del servicio" style="width:90%;" >}}

En el ejemplo anterior del resumen de ingesta del servicio, la tabla **Ingestion reasons breakdown** (Desglose de motivos de la ingesta) muestra que la mayoría de los motivos de ingesta de este servicio proceden de `rule` ([regla de muestreo definida por el usuario][6]).

Los principales responsables de la toma de decisiones de muestreo para este servicio muestran que el servicio `web-store` obtiene decisiones de muestreo de `web-store`, `shopist-web-ui`, `shipping-worker`, `synthetics-browser` y `product-recommendation`. Estos cinco servicios contribuyen a las decisiones generales de muestreo que afectan a tramos de servicio de`web-store`. A la hora de determinar cómo ajustar la ingesta para la tienda web, deben tenerse en cuenta los cinco servicios.

## Mantener ciertos tipos de trazas

### Mantener las trazas completas de la transacción

La ingesta de las trazas completas de transacciones garantiza la visibilidad sobre el **flujo de solicitudes de servicio de extremo a extremo** para solicitudes individuales específicas.

#### Solución: muestreo basado en la fase inicial

Las trazas completas pueden ser ingeridas con mecanismos de [muestreo basado en la fase inicial][4]: la decisión de mantener o descartar la traza se determina a partir del primer tramo de la traza, la *fase inicial* (head), cuando se crea la traza. Esta decisión se propaga a través del contexto de la solicitud a los siguientes servicios de descarga.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en la fase inicial" style="width:100%;" >}}

Para decidir qué trazas conservar y cuáles descartar, el Datadog Agent calcula [frecuencias de muestreo predeterminadas][5] para cada servicio para aplicar en la creación de trazas, basándose en el tráfico de la aplicación:
- Para aplicaciones con poco tráfico, se aplica una frecuencia de muestreo del 100%.
- Para aplicaciones con mucho tráfico, se aplica una frecuencia de muestreo más baja con un objetivo de 10 trazas completas por segundo por Agent.

También puedes anular la frecuencia de muestreo predeterminada del Agent al configurar la frecuencia de muestreo por servicio. Consulta cómo [mantener más trazas para servicios específicos (#keeping-more-traces-for-specific-services-or-resources) para obtener más información.

#### Configuración del muestreo basado en la fase inicial

Las frecuencias de muestreo predeterminadas se calculan para alcanzar 10 trazas completas por segundo, por Agent. Este es un número *objetivo* de trazas y es el resultado de promediar trazas durante un periodo. *No* es un límite estricto, y los picos de tráfico pueden hacer que se envíe un número significativamente mayor de trazas a Datadog durante breves periodos.

Puedes aumentar o disminuir este objetivo configurando el parámetro del Datadog Agent `max_traces_per_second` o la variable de entorno `DD_APM_MAX_TPS`. Más información sobre [mecanismos de ingesta del muestreo basado en la fase inicial][5].

**Nota:** Cambiar una configuración del Agent afecta a los porcentajes de muestreo de *todos los servicios* que informan trazas a este Datadog Agent.

Para la mayoría de los casos, esta configuración a nivel de Agent se mantiene dentro de la cuota asignada, proporciona suficiente visibilidad del rendimiento de tu aplicación y te ayuda a tomar las decisiones adecuadas para tu negocio.

### Mantener más trazas para servicios o recursos específicos

Si algunos servicios o solicitudes son críticos para tu negocio, querrás tener una mayor visibilidad de ellos. Es posible que desees enviar todas las trazas relacionadas a Datadog para analizar cualquiera de las transacciones individuales.

#### Solución: reglas de muestreo

Por defecto, la frecuencia de muestreo se calcula para 10 trazas por segundo por Datadog Agent. Puedes anular la frecuencia de muestreo calculada por defecto al configurar [reglas de muestreo][6] en la biblioteca de rastreo.

Puedes configurar reglas de muestreo por servicio. Para trazas que comienzan a partir del servicio especificado en la regla, se aplica la frecuencia de muestreo porcentual definida en lugar de la frecuencia de muestreo predeterminada del Agent.

#### Configuración de una regla de muestreo

Puedes configurar reglas de muestreo estableciendo la variable de entorno `DD_TRACE_SAMPLING_RULES` .

Por ejemplo, para enviar el 20% de las trazas para el servicio denominado `my-service`:

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

Más información sobre [mecanismos de ingesta de reglas de muestreo][6].

### Mantener más trazas relacionadas con errores

Las trazas con tramos de error suelen ser síntomas de fallos del sistema. Mantener una mayor proporción de transacciones con errores garantiza que siempre se tenga acceso a algunas solicitudes individuales relevantes.

#### Solución: frecuencia de muestreo de errores

Además de las trazas de muestreo basado en la fase inicial, puedes aumentar la tasa de muestreo de errores para que cada Agent conserve tramos de errores adicionales, aunque las trazas relacionadas no se conserven mediante el muestreo basado en la fase inicial.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-tramos (spans)-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Notas:**
- Es posible que los fragmentos distribuidos de las partes de trazas no se ingieran, ya que el muestreo se realiza localmente a nivel del Datadog Agent.
- A partir del **Datadog Agent 6/7.41.0 y versiones posteriores**, `DD_APM_FEATURES=error_rare_sample_tracer_drop` puede configurarse para incluir tramos descartados mediante reglas de biblioteca de rastreo o `manual.drop`. Encontrarás más detalles en la sección [Trazas de errores del documento Mecanismos de ingesta][9].

#### Configuración del muestreo de errores

Puedes configurar el número a capturar de partes de error por segundo, por Agent, configurando la variable de entorno `DD_APM_ERROR_TPS` . El valor por defecto es `10` errores por segundo. Para ingerir **todos los errores**, ajústalo a un valor alto arbitrario. Para desactivar el muestreo de errores, establece `DD_APM_ERROR_TPS` en `0`.

## Reducción de la ingesta para servicios de gran volumen

### Reducción del volumen desde base de datos o servicios en caché

Las llamadas a la base de datos rastreadas pueden representar una gran cantidad de datos ingeridos, mientras que las métricas de rendimiento de la aplicación (como recuento de errores, recuento de los resultados de la solicitud y latencia) son suficientes para monitorizar el estado de la base de datos.

#### Solución: reglas de muestreo para trazas con llamadas a bases de datos

Para reducir el volumen de tramo creado por el rastreo de llamadas a la base de datos, configura el muestreo en la fase inicial (head) de la traza.

Los servicios de base de datos rara vez inician una traza. Normalmente, los tramos de base de datos del cliente son secundarios de un tramo de servicio backend instrumentado.

Para saber **qué servicios inician trazas de base de datos**, utiliza el gráfico de lista principal `Top Sampling Decision Makers` del [Resumen de la ingesta del servicio][7] en la página de control de la ingesta. Configurar el muestreo basado en la fase inicial para estos servicios reduce el volumen de los tramos de base de datos ingeridos, a la vez que se asegura que no se ingieran ninguna traza incompleta. Las trazas distribuidas se conservan o se descartan por completo.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="Responsables de la toma de decisiones de muestreo" style="width:90%;" >}}

Por ejemplo, para las llamadas a la base de datos rastreadas de `web-store-mongo`, las trazas se originan en servicios `web-store` y `shipping-worker` el 99% de las veces. En consecuencia, para reducir el volumen para `web-store-mongo`, configura el muestreo para los servicios `web-store` y `shipping-worker`.

#### Configuración del muestreo para eliminar tramos de la base de datos

Consulta la sección [Configuración de la regla de muestreo](#configuring-a-sampling-rule) para obtener más información sobre la sintaxis de las reglas de muestreo.

El servicio backend `web-store` está llamando a una base de datos Mongo múltiples veces por traza, y está creando mucho volumen de tramos no deseado:

- Configura una **regla de muestreo de traza** para el servicio backend `web-store`, que garantiza que se conserve el 10% de la totalidad de trazas, incluidos tramos de Mongo.

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- Opcionalmente, si deseas conservar todos los tramos `web-store`, configura una **regla de muestreo de tramo único** para conservar el 100 por ciento de los tramos para el servicio backend `web-store`. Este muestreo no ingiere ningún tramo de llamada a la base de datos fuera del 10 por ciento identificado anteriormente.

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **Nota**: Configurar una regla de muestreo de tramo único es especialmente útil si estás utilizando [métricas basadas en tramos][8], que se derivan de tramos ingeridos.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling3.png" alt="Muestreo de tramos de base de datos" style="width:100%;" >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[2]: /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[7]: /es/tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary
[8]: /es/tracing/trace_pipeline/generate_metrics/
[9]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java#error-and-rare-traces