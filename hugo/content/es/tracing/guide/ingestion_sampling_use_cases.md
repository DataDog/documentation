---
description: Explore diferentes casos de uso y estrategias para el muestreo de trazas
  que le permitan optimizar el volumen de ingesta y mantener la capacidad de solucionar
  problemas.
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: Guía
  text: Cómo controlar los volúmenes ingeridos
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
title: Casos de uso de muestreo de trazas
---
## Descripción general {#overview}

Los datos de trazas tienden a ser repetitivos. Un problema en su aplicación rara vez se identifica en una sola traza y ninguna otra. Para servicios de alto rendimiento, particularmente para incidentes que requieren su atención, un problema muestra síntomas repetidamente en múltiples trazas. En consecuencia, generalmente no es necesario que recopile cada traza para un servicio o punto de conexión, ni cada tramo dentro de una traza. Los [mecanismos de Ingestion Control][1] de Datadog APM le ayudan a mantener la visibilidad que necesita para solucionar problemas, mientras reduce el ruido y gestiona los costos.

Los mecanismos de ingesta son configuraciones dentro del Datadog Agent y los SDK de Datadog. Si utiliza SDK de OpenTelemetry para instrumentar sus aplicaciones, lea [Ingestion Sampling with OpenTelemetry][2].

Esta guía le ayuda a comprender cuándo y cómo utilizar las configuraciones de Ingestion Control según los casos de uso principales que pueda encontrar. Cubre:

- [Determinar qué mecanismos de ingesta se utilizan](#determining-which-ingestion-mechanisms-are-used) para un servicio determinado
- [Casos de uso que se centran en conservar tipos particulares de trazas](#keeping-certain-types-of-traces)
- [Casos de uso que se centran en reducir las trazas ingeridas](#reducing-ingestion-for-high-volume-services)


## Determinar qué mecanismos de ingesta se utilizan {#determining-which-ingestion-mechanisms-are-used}

Para identificar qué mecanismos de ingesta se utilizan actualmente en su entorno de Datadog, navegue a la [página de Ingestion Control][3].

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Página de Ingestion Control" style="width:90%;" >}}

La tabla ofrece información sobre los volúmenes ingeridos *por servicio*. La columna Configuration proporciona una primera indicación de la configuración actual. Muestra:
- `AUTOMATIC` si la tasa de muestreo calculada en el Datadog Agent se aplica a las trazas que comienzan desde el servicio. Lea más sobre los detalles de la [lógica de ingesta del Datadog Agent][5].
- `CONFIGURED` si una tasa de muestreo de trazas personalizada configurada en el SDK se aplica a las trazas que comienzan desde el servicio.

Haga clic en los servicios para ver detalles sobre qué responsables de la decisión de muestreo (por ejemplo, Agent o SDK, reglas o tasas de muestreo) se utilizan para cada servicio, así como qué [mecanismos de muestreo de ingesta][1] se aprovechan para los servicios de los tramos ingeridos.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="Resumen de ingesta de servicio" style="width:90%;" >}}

En el ejemplo de Resumen de ingesta de servicio anterior, la tabla {{< ui >}}Ingestion reasons breakdown{{< /ui >}} muestra que la mayoría de las razones de ingesta para este servicio provienen de `rule` ([regla de muestreo definida por el usuario][6]).

Los principales responsables de la decisión de muestreo para este servicio muestran que el servicio `web-store` obtiene decisiones de muestreo de `web-store`, `shopist-web-ui`, `shipping-worker`, `synthetics-browser` y `product-recommendation`. Estos cinco servicios contribuyen en las decisiones de muestreo generales que afectan a los tramos del servicio `web-store`. Al determinar cómo ajustar la ingesta para web-store, se deben considerar los cinco servicios.

## Conservar ciertos tipos de trazas {#keeping-certain-types-of-traces}

### Conservar trazas de transacciones completas {#keeping-entire-transaction-traces}

Ingestar trazas de transacciones completas garantiza la visibilidad sobre el **flujo de solicitud de servicio de extremo a extremo** para solicitudes individuales específicas.

#### Solución: Muestreo basado en el inicio {#solution-head-based-sampling}

Se pueden ingestar trazas completas con mecanismos de [muestreo basado en el inicio][4]: la decisión de conservar o descartar la traza se determina a partir del primer tramo de la traza, el *inicio*, cuando se crea la traza. Esta decisión se propaga a través del contexto de la solicitud a los servicios descendentes.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en el inicio" style="width:100%;" >}}

Para decidir qué trazas conservar y descartar, el Datadog Agent calcula [tasas de muestreo predeterminadas][5] para cada servicio que se aplican en la creación de la traza, según el tráfico de la aplicación:
- Para aplicaciones con poco tráfico, se aplica una tasa de muestreo del 100%.
- Para aplicaciones con mucho tráfico, se aplica una tasa de muestreo más baja con un objetivo de 10 trazas completas por segundo por Agent.

También puede anular la tasa de muestreo predeterminada del Datadog Agent configurando la tasa de muestreo por servicio. Consulte cómo [mantener más trazas para servicios específicos](#keeping-more-traces-for-specific-services-or-resources) para obtener más información.

#### Configuración del muestreo basado en el inicio {#configuring-head-based-sampling}

Las tasas de muestreo predeterminadas se calculan para apuntar a 10 trazas completas por segundo, por Datadog Agent. Este es un número *objetivo* de trazas y es el resultado de promediar las trazas durante un período de tiempo. *No* es un límite estricto, y los picos de tráfico pueden causar que se envíen significativamente más trazas a Datadog durante períodos cortos de tiempo.

Puede aumentar o disminuir este objetivo configurando el parámetro del Datadog Agent `target_traces_per_second` o la variable de entorno `DD_APM_TARGET_TPS`. Lea más sobre [head-based sampling ingestion mechanisms][5].

**Nota:** Cambiar una configuración del Datadog Agent afecta las tasas de muestreo porcentuales para *todos los servicios* que reportan trazas a este Datadog Agent.

Para la mayoría de los escenarios, esta configuración a nivel de Datadog Agent se mantiene dentro de la cuota asignada, proporciona suficiente visibilidad sobre el rendimiento de su aplicación y le ayuda a tomar decisiones adecuadas para su negocio.

### Mantener más trazas para servicios o recursos específicos {#keeping-more-traces-for-specific-services-or-resources}

Si algunos servicios y solicitudes son críticos para su negocio, desea tener una mayor visibilidad sobre ellos. Es posible que desee enviar todas las trazas relacionadas a Datadog para que pueda examinar cualquiera de las transacciones individuales.

#### Solución: Reglas de muestreo {#solution-sampling-rules}

De forma predeterminada, las tasas de muestreo se calculan para apuntar a 10 trazas por segundo por Datadog Agent. Puede anular la tasa de muestreo calculada predeterminada configurando [sampling rules][6] en el SDK.

Puede configurar reglas de muestreo por servicio. Para las trazas que comienzan desde el servicio especificado en la regla, se aplica la tasa de muestreo porcentual definida en lugar de la tasa de muestreo predeterminada del Agent.

#### Configuración de una regla de muestreo {#configuring-a-sampling-rule}

Puede configurar reglas de muestreo estableciendo la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 20 por ciento de las trazas para el servicio llamado `my-service`:

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

Lea más sobre los [mecanismos de ingestión de reglas de muestreo][6].

### Conservar más trazas relacionadas con errores {#keeping-more-error-related-traces}

Las trazas con tramos de error suelen ser síntomas de fallas del sistema. Conservar una mayor proporción de transacciones con errores garantiza que siempre tenga acceso a algunas solicitudes individuales relevantes.

#### Solución: Tasa de muestreo de errores {#solution-error-sampling-rate}

Además de las trazas muestreadas basadas en el inicio, puede aumentar la tasa de muestreo de errores para que cada Datadog Agent conserve tramos de error adicionales, incluso si las trazas relacionadas no se conservan mediante el muestreo basado en el inicio.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Notas:**
- Es posible que los fragmentos distribuidos de las trazas no se ingieran, ya que el muestreo ocurre localmente a nivel del Datadog Agent.
- A partir de **Datadog Agent 6/7.41.0 y versiones superiores**, `DD_APM_FEATURES=error_rare_sample_tracer_drop` se puede configurar para incluir tramos descartados por reglas de SDK o `manual.drop`. Puede encontrar más detalles en la [sección de trazos de error del documento de Mecanismos de ingestión][9].

#### Configuración del muestreo de errores {#configuring-error-sampling}

Puede configurar la cantidad de fragmentos de error por segundo por Datadog Agent que se capturarán configurando la variable de entorno `DD_APM_ERROR_TPS`. El valor predeterminado es `10` errores por segundo. Para ingerir **todos los errores**, establézcalo en un valor arbitrariamente alto. Para deshabilitar el muestreo de errores, establezca `DD_APM_ERROR_TPS` en `0`.

## Reducción de la ingestión para servicios de alto volumen {#reducing-ingestion-for-high-volume-services}

### Reducción del volumen de servicios de base de datos o caché {#reducing-volume-from-database-or-cache-services}

Las llamadas a bases de datos rastreadas pueden representar una gran cantidad de datos ingeridos, mientras que las métricas de rendimiento de la aplicación (como los conteos de errores, los conteos de aciertos de solicitudes y la latencia) son suficientes para hacer un seguimiento del estado de la base de datos.

#### Solución: Reglas de muestreo para trazos con llamadas a bases de datos {#solution-sampling-rules-for-traces-with-database-calls}

Para reducir el volumen de tramos creado al rastrear llamadas a bases de datos, configure el muestreo al inicio de la traza.

Los servicios de base de datos rara vez inician una traza. Por lo general, los tramos de base de datos del cliente son hijos de un tramo de servicio de backend instrumentado.

Para saber **qué servicios inician trazas de base de datos**, utilice el gráfico de lista principal `Top Sampling Decision Makers` en la página de control de ingesta [Resumen de Ingesta de Servicios][7]. Configurar el muestreo basado en el inicio para estos servicios específicos reduce el volumen de tramos de base de datos ingeridos, al tiempo que garantiza que no se ingieran trazas incompletas. Las trazas distribuidas se conservan o se descartan por completo.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="Principales responsables de la toma de decisiones de muestreo" style="width:90%;" >}}

Por ejemplo, para las llamadas a bases de datos trazadas de `web-store-mongo`, las trazas se originan en los servicios `web-store` y `shipping-worker` el 99% de las veces. Como resultado, para reducir el volumen de `web-store-mongo`, configure el muestreo para los servicios `web-store` y `shipping-worker`.

#### Configure el muestreo para descartar tramos de base de datos {#configure-sampling-to-drop-database-spans}

Consulte la [sección de configuración de reglas de muestreo](#configuring-a-sampling-rule) para obtener más información sobre la sintaxis de las reglas de muestreo.

El servicio de backend `web-store` está llamando a una base de datos Mongo varias veces por traza, y está creando una gran cantidad de volumen de tramos no deseados:

- Configure una **regla de muestreo de traza** para el servicio de backend `web-store`, asegurando que se conserve el 10 por ciento de las trazas completas, incluidos los tramos de Mongo.

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- Opcionalmente, si desea conservar todos los tramos `web-store`, configure una **regla de muestreo de un solo tramo** para conservar el 100 por ciento de los tramos para el servicio de backend `web-store`. Este muestreo no ingiere ningún tramo de llamada a base de datos fuera del 10 por ciento identificado anteriormente.

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **Nota**: Configurar una regla de muestreo de un solo tramo es especialmente útil si está utilizando [métricas basadas en tramos][8], las cuales se derivan de los tramos ingeridos.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling3.png" alt="Muestreo de tramos de base de datos" style="width:100%;" >}}


## Lecturas adicionales {#further-reading}

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