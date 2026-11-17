---
aliases:
- /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control
  tag: Guía
  text: Control del volumen de ingesta de trazas
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Ingestion Control
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Muestreo de ingesta con OpenTelemetry
---
## Descripción general {#overview}

Los SDK de OpenTelemetry y el OpenTelemetry Collector proporcionan capacidades de muestreo, ya que ingerir el 100 % de las trazas a menudo es innecesario para obtener visibilidad sobre el estado de sus aplicaciones. Configure las tasas de muestreo antes de enviar trazas a Datadog para ingerir los datos que sean más relevantes para sus objetivos de negocio y observabilidad, mientras controla y gestiona los costos generales.

Este documento demuestra dos métodos principales para enviar trazas a Datadog con OpenTelemetry:

- Envíe trazas al **[OpenTelemetry Collector][1]** y utilice el exportador HTTP de OTLP para reenviarlas a Datadog.
- Envíe trazas a **[Datadog Agent OTLP ingest][3]**, que las reenvía a Datadog.

**Nota**: Datadog no admite la ejecución del OpenTelemetry Collector y el Datadog Agent en el mismo servidor.

### Uso del OpenTelemetry Collector {#using-the-opentelemetry-collector}

Con este método, el OpenTelemetry Collector recibe trazas de los SDK de OpenTelemetry y las exporta a Datadog a través de OTLP HTTP:

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Un SDK de OpenTelemetry envía datos de OTLP a un OpenTelemetry Collector, el cual los exporta a Datadog a través de OTLP HTTP." style="width:100%;" >}}

En la configuración recomendada del Collector, el conector `span_metrics` calcula [métricas de traza de APM][4] antes de que el Collector aplique el muestreo.

Elija este método si requiere capacidades de procesamiento avanzadas del OpenTelemetry Collector, como el muestreo basado en el seguimiento de las últimas líneas. Para configurar el Collector, siga [Configure el OpenTelemetry Collector][1].

### Uso de la ingesta de OTLP del Datadog Agent {#using-datadog-agent-otlp-ingestion}

Con este método, el Datadog Agent recibe trazas directamente de los SDK de OpenTelemetry utilizando el protocolo OTLP. Esto le permite enviar trazas a Datadog sin ejecutar un servicio de OpenTelemetry Collector por separado. En este escenario, las métricas de traza de APM son calculadas por el Agent:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_agent.png" alt="Cálculo de métricas de APM de OpenTelemetry utilizando el Datadog Agent" style="width:100%;" >}}

Elija este método si prefiere una configuración más sencilla sin la necesidad de un servicio de OpenTelemetry Collector por separado. Para configurar el Datadog Agent para recibir trazas utilizando OTLP, siga las instrucciones en [Configure el punto de conexión de OTLP del Agent][15].

## Reducción del volumen de ingesta {#reducing-ingestion-volume}

Con OpenTelemetry, puede configurar el muestreo tanto en las bibliotecas de OpenTelemetry como en el OpenTelemetry Collector:

- **Muestreo basado en el inicio** en los SDK de OpenTelemetry
- **Muestreo basado en el seguimiento de las últimas líneas** en el OpenTelemetry Collector
- **Muestreo probabilístico** en el Datadog Agent

### Muestreo basado en el inicio {#head-based-sampling}

A nivel de SDK, puede implementar el _muestreo basado en el inicio_. Esto ocurre cuando la decisión de muestreo se toma al inicio de la traza. Este tipo de muestreo es particularmente útil para aplicaciones de alto rendimiento, donde tiene una comprensión clara de qué trazas son más importantes para ingerir y desea tomar decisiones de muestreo al principio del proceso de rastreo.

#### Configuración {#configuring}

Para configurar el muestreo basado en el inicio, utilice los muestreadores [TraceIdRatioBased][5] o [ParentBased][6] proporcionados por los SDK de OpenTelemetry. Estos le permiten implementar un muestreo determinista basado en el inicio según el `trace_id` a nivel de SDK.

#### Consideraciones {#considerations}

El muestreo basado en el inicio reduce los tramos disponibles para el cálculo de métricas de APM. Para los SDK de DDOT, consulte [extrapolación de métricas de traza][27].

Utilice la [guía de control de volumen de ingesta][8] para leer más sobre las implicaciones de configurar el muestreo de trazas en los monitores de análisis de trazas y las métricas de los tramos.

#### Extrapolación de métricas de traza para los SDK de Datadog {#trace-metric-extrapolation-for-datadog-sdks}

Los SDK de DDOT (SDK de Datadog en modo OpenTelemetry) registran la probabilidad de muestreo en los `tracestate` de los tramos exportados. Los receptores compatibles lo utilizan para estimar el tráfico total a partir de las trazas muestreadas. Para saber cómo funciona la extrapolación (sobremuestreo), consulte la [especificación de OpenTelemetry][21] y la [propuesta detallada de umbral de muestreo (OTEP 235)][22].

Utilice estas versiones mínimas para la extrapolación automática:

| Componente que calcula métricas de traza | Versión mínima |
| --- | --- |
| Span Metrics Connector (SMC) en OpenTelemetry Collector Contrib | [0.148.0][24] |
| Datadog connector en OpenTelemetry Collector Contrib | [0.159.0][25] |
| Datadog connector en DDOT, o Datadog Agent OTLP receiver | [7.82.0][26] |

Para configurar métricas de traza a partir de tramos muestreados:

1. Utilice una [versión de SDK de DDOT compatible][23].
2. Conserve `tracestate` y coloque el conector de métricas antes de cualquier procesador de muestreo de Collector.

La extrapolación es automática cuando hay presente un umbral `ot.th` válido. Para obtener conteos precisos, la probabilidad registrada debe coincidir con los tramos que realmente se exportan.

### Muestreo basado en el seguimiento de las últimas líneas {#tail-based-sampling}

A nivel de OpenTelemetry Collector, puede realizar _muestreo basado en el seguimiento de las últimas líneas_, lo que le permite definir reglas más avanzadas para mantener la visibilidad de las trazas con errores o alta latencia.

#### Configuración de {#configuring-1}

Para configurar el muestreo basado en el seguimiento de las últimas líneas, utilice el [Tail Sampling Processor][9] o el [Probabilistic Sampling Processor][10] para muestrear trazas según un conjunto de reglas a nivel de Collector.

#### Consideraciones {#considerations-1}

Una limitación del muestreo basado en el seguimiento de las últimas líneas es que todos los tramos de una traza determinada deben llegar a la misma instancia de Collector para tomar decisiones de muestreo efectivas. Si una traza se distribuye entre varias instancias de Collector y se utiliza el muestreo basado en el seguimiento de las últimas líneas, es posible que algunas partes de esa traza no se envíen a Datadog.

La configuración recomendada de Collector utiliza el patrón de implementación de agentes y no proporciona enrutamiento basado en trazas entre múltiples instancias de Collector. Para el muestreo distribuido basado en el seguimiento de las últimas líneas, utilice una [implementación de puerta de enlace][19] y configure el enrutamiento de modo que todos los tramos de una traza lleguen a la misma instancia de Collector de puerta de enlace.

Configure el [conector `span_metrics`][20] antes del procesador de muestreo. Para los SDK de DDOT que muestrean trazas antes de la exportación, siga los [requisitos de extrapolación de métricas de traza][27].

Consulte la [guía de control de volumen de ingesta][8] para obtener información sobre las implicaciones de configurar el muestreo de trazas en los monitores de análisis de trazas y las métricas derivadas de tramos.

### Muestreo probabilístico {#probabilistic-sampling}

Al utilizar Datadog Agent OTLP ingest, hay un muestreador probabilístico disponible para la versión 7.70.0 del Agent y posteriores.

<div class="alert alert-danger">El muestreo probabilístico se introdujo con el Agent v7.54.0, pero las versiones del Agent anteriores a la v7.70.0 pueden descartar todos los datos de traza OTLP entrantes cuando el muestreador está habilitado. Actualice a la v7.70.0 o posterior antes de utilizar el muestreo probabilístico con la ingesta OTLP.</div>

#### Configuración {#configuring-2}

Para configurar el muestreo probabilístico, realice una de las siguientes acciones:

- Establezca `DD_APM_PROBABILISTIC_SAMPLER_ENABLED` en `true` y `DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE` en el porcentaje de trazas que desea muestrear (entre `0` y `100`).
- Agregue el siguiente YAML al archivo de configuración de su Agent:

  ```yaml
  apm_config:
    # ...
    # features: ["probabilistic_sampler_full_trace_id"] #Uncomment if you also sample with the OTel Collector.
    probabilistic_sampler:
        enabled: true
        sampling_percentage: 51 #In this example, 51% of traces are captured.
        hash_seed: 22 #A seed used for the hash algorithm. This must match other agents and OTel
  ```

**Si utiliza una configuración mixta de SDK de Datadog y SDK de OTel**:

- El muestreo probabilístico se aplica a los spans tanto de los SDK de Datadog como de los de OTel.
- Si envía spans tanto al Datadog Agent **como** a instancias de OTel Collector, configure el Agent para que tome las mismas decisiones de muestreo que el Collector:
  1. Establezca la misma semilla en el Agent (`DD_APM_PROBABILISTIC_SAMPLER_HASH_SEED`) y en el Collector (`hash_seed`).
  2. Agregue `probabilistic_sampler_full_trace_id` a las características de APM del Agent. Establezca `DD_APM_FEATURES` en `probabilistic_sampler_full_trace_id`, o agregue `features: ["probabilistic_sampler_full_trace_id"]` bajo `apm_config`. Si ya configuró las características de APM, agregue la bandera a la lista existente.

  De forma predeterminada, el Agent solo aplica hash a los 64 bits inferiores del ID de traza, y el Collector aplica hash a los 128 bits completos. Sin la bandera, ambos toman decisiones diferentes para la misma traza, incluso con la misma semilla. El Agent coincide con el Collector solo en el modo `hash_seed` del Collector, que es el predeterminado.

<div class="alert alert-danger"><code>DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> está obsoleto y ha sido reemplazado por <code>DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code>.</div>

#### Consideraciones {#considerations-2}

- El muestreador probabilístico ignorará la prioridad de muestreo de los spans que se establecen a nivel de SDK. Como resultado, el muestreo probabilístico es **incompatible con el [muestreo al inicio de la traza][16]**. Esto significa que las trazas muestreadas al inicio aún podrían ser descartadas por el muestreo probabilístico.
- Los spans no capturados por el muestreador probabilístico aún pueden ser capturados por los [muestreadores de errores y casos raros][12] del Datadog Agent.
- Si habilita `probabilistic_sampler_full_trace_id`, todos los SDK deben generar y propagar [IDs de traza de 128 bits][17]. Si un SDK descarta los 64 bits superiores del ID de traza, el Agent toma una decisión de muestreo diferente para los spans de ese SDK y las trazas quedan incompletas.

## Monitoreo de volúmenes ingeridos en Datadog {#monitoring-ingested-volumes-in-datadog}

Utilice el [APM Estimated Usage dashboard][13] y la métrica `datadog.estimated_usage.apm.ingested_bytes` para obtener visibilidad de sus volúmenes ingeridos durante un período de tiempo específico. Filtre el panel de control por entornos y servicios específicos para ver qué servicios son responsables de la mayor parte del volumen ingerido.

Si el volumen de ingesta es mayor de lo esperado, considere ajustar sus tasas de muestreo.

## Etiquetado unificado de servicios {#unified-service-tagging}

Al enviar datos de OpenTelemetry a Datadog, es importante vincular los datos de traza mediante el etiquetado unificado de servicios.

Configurar etiquetas de servicio unificadas garantiza que las trazas se vinculen con precisión a sus servicios y entornos correspondientes. Esto evita que los hosts se atribuyan incorrectamente, lo que puede provocar aumentos inesperados en el uso y los costos.

Para obtener más información, consulte [Unified Service Tagging][18].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/otlp_ingest_in_the_agent
[4]: /es/tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[8]: /es/tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[12]: /es/tracing/trace_pipeline/ingestion_mechanisms/#error-and-rare-traces
[13]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[15]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /es/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling
[17]: /es/opentelemetry/interoperability/otel_api_tracing_interoperability/#128-bit-trace-ids
[18]: /es/getting_started/tagging/unified_service_tagging/#opentelemetry
[19]: https://opentelemetry.io/docs/collector/deploy/gateway/
[20]: /es/opentelemetry/setup/collector_exporter/#span-metrics-connector
[21]: https://opentelemetry.io/docs/specs/otel/trace/tracestate-handling/#sampling-threshold-value-th
[22]: https://github.com/open-telemetry/oteps/blob/main/text/trace/0235-sampling-threshold-in-trace-state.md
[23]: /es/opentelemetry/instrument/dd_sdks/otlp_trace_export/#sampling-and-trace-metrics
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.148.0
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.159.0
[26]: https://github.com/DataDog/datadog-agent/releases/tag/7.82.0
[27]: /es/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks