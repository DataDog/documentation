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

Los SDK de OpenTelemetry y el OpenTelemetry Collector proporcionan capacidades de muestreo, ya que ingerir el 100% de las trazas suele ser innecesario para obtener visibilidad sobre el estado de sus aplicaciones. Configure las tasas de muestreo antes de enviar trazas a Datadog para ingerir los datos que sean más relevantes para su negocio y sus objetivos de observabilidad, mientras controla y gestiona los costos generales.

Este documento demuestra dos métodos principales para enviar trazas a Datadog con OpenTelemetry:

- Envíe trazas al **[OpenTelemetry Collector][1]** y utilice el exportador OTLP HTTP para reenviarlas a Datadog.
- Envíe trazas a **[Datadog Agent OTLP ingest][3]**, que las reenvía a Datadog.

**Nota**: Datadog no admite la ejecución del OpenTelemetry Collector y el Datadog Agent en el mismo servidor.

### Uso del OpenTelemetry Collector {#using-the-opentelemetry-collector}

Con este método, el OpenTelemetry Collector recibe trazas de los SDK de OpenTelemetry y las exporta a Datadog a través de OTLP HTTP:

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Un SDK de OpenTelemetry envía datos de OTLP a un OpenTelemetry Collector, el cual los exporta a Datadog a través de OTLP HTTP." style="width:100%;" >}}

En la configuración recomendada del Collector, el conector `span_metrics` calcula las [métricas de traza de APM][4] antes de que el Collector aplique el muestreo.

Elija este método si requiere capacidades de procesamiento avanzadas del OpenTelemetry Collector, como el muestreo basado en el seguimiento de las últimas líneas. Para configurar el Collector, siga [Configure el OpenTelemetry Collector][1].

### Uso de la ingesta de OTLP del Datadog Agent {#using-datadog-agent-otlp-ingestion}

Con este método, el Datadog Agent recibe trazas directamente de los SDK de OpenTelemetry mediante el protocolo OTLP. Esto le permite enviar trazas a Datadog sin ejecutar un servicio de OpenTelemetry Collector independiente. En este escenario, el Agent calcula las métricas de traza de APM:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_agent.png" alt="Cálculo de métricas de APM de OpenTelemetry mediante el Datadog Agent" style="width:100%;" >}}

Elija este método si prefiere una configuración más sencilla sin la necesidad de un servicio de OpenTelemetry Collector independiente. Para configurar el Datadog Agent para recibir trazas mediante OTLP, siga las instrucciones en [Ingesta de OTLP del Datadog Agent][15].

## Reducción del volumen de ingesta {#reducing-ingestion-volume}

Con OpenTelemetry, puede configurar el muestreo tanto en las bibliotecas de OpenTelemetry como en el OpenTelemetry Collector:

- **Muestreo basado en el inicio** en los SDK de OpenTelemetry
- **Muestreo basado en el seguimiento de las últimas líneas** en el OpenTelemetry Collector
- **Muestreo probabilístico** en el Datadog Agent

### Muestreo basado en el inicio {#head-based-sampling}

A nivel de SDK, puede implementar _muestreo basado en el inicio_. Esto ocurre cuando la decisión de muestreo se toma al principio de la traza. Este tipo de muestreo es particularmente útil para aplicaciones de alto rendimiento, donde tiene una comprensión clara de qué trazas son más importantes para ingerir y desea tomar decisiones de muestreo al principio del proceso de rastreo.

#### Configuración {#configuring}

Para configurar el muestreo basado en el inicio, utilice los muestreadores [TraceIdRatioBased][5] o [ParentBased][6] proporcionados por los SDK de OpenTelemetry. Estos le permiten implementar un muestreo determinista basado en el inicio según el `trace_id` a nivel de SDK.

#### Consideraciones {#considerations}

El muestreo basado en el inicio afecta el cálculo de las métricas de APM. Solo las trazas muestreadas se envían al OpenTelemetry Collector o al Datadog Agent, que calculan las métricas.

Para aproximar las métricas no muestreadas a partir de las métricas muestreadas, utilice [fórmulas y funciones][7] con la tasa de muestreo configurada en el SDK.

Utilice la [guía de control de volumen de ingesta][8] para leer más sobre las implicaciones de configurar el muestreo de trazas en los monitores de análisis de trazas y en las métricas de los spans.


### Muestreo basado en el seguimiento de las últimas líneas {#tail-based-sampling}

A nivel del OpenTelemetry Collector, puede realizar _muestreo basado en el seguimiento de las últimas líneas_, lo que le permite definir reglas más avanzadas para mantener la visibilidad sobre las trazas con errores o alta latencia.

#### Configuración {#configuring-1}

Para configurar el muestreo basado en el seguimiento de las últimas líneas, utilice el [Tail Sampling Processor][9] o el [Probabilistic Sampling Processor][10] para muestrear trazas según un conjunto de reglas a nivel del Collector.

#### Consideraciones {#considerations-1}

Una limitación del muestreo basado en el seguimiento de las últimas líneas es que todos los spans de una traza determinada deben ser recibidos por la misma instancia del collector para tomar decisiones de muestreo efectivas. Si una traza se distribuye entre varias instancias del collector y se utiliza el muestreo basado en el seguimiento de las últimas líneas, es posible que algunas partes de esa traza no se envíen a Datadog.

La configuración recomendada del Collector utiliza el patrón de despliegue del agente y no proporciona enrutamiento consciente de las trazas a través de múltiples Collectors. Para el muestreo distribuido basado en el seguimiento de las últimas líneas, utilice un [despliegue de gateway][19] y configure el enrutamiento de modo que todos los spans de una traza lleguen al mismo Collector de gateway.

Para calcular las métricas de APM a partir del 100 % del tráfico de la aplicación mientras utiliza el muestreo basado en el seguimiento de las últimas líneas a nivel de Collector, configure el [conector `span_metrics`][20] antes del procesador de muestreo.

Consulte la [guía de control de volumen de ingesta][8] para obtener información sobre las implicaciones de configurar el muestreo de trazas en los monitores de análisis de trazas y las métricas de los spans.

### Muestreo probabilístico {#probabilistic-sampling}

Al utilizar la ingesta OTLP del Datadog Agent, hay disponible un muestreador probabilístico para la versión 7.70.0 del Agent y posteriores.

<div class="alert alert-danger">El muestreo probabilístico se introdujo en la versión v7.54.0 del Agent, pero las versiones del Agent anteriores a v7.70.0 pueden descartar todos los datos de trazas OTLP entrantes cuando el muestreador está habilitado. Actualice a la versión v7.70.0 o posterior antes de usar el muestreo probabilístico con la ingesta OTLP.</div>

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
- Si envía spans tanto al Datadog Agent **como** a las instancias del Collector de OTel, configure el Agent para que tome las mismas decisiones de muestreo que el Collector:
  1. Establezca la misma semilla en el Agent (`DD_APM_PROBABILISTIC_SAMPLER_HASH_SEED`) y en el Collector (`hash_seed`).
  2. Agregue `probabilistic_sampler_full_trace_id` a las funciones de APM del Agent. Establezca `DD_APM_FEATURES` en `probabilistic_sampler_full_trace_id`, o agregue `features: ["probabilistic_sampler_full_trace_id"]` bajo `apm_config`. Si ya configuró las funciones de APM, agregue el indicador a la lista existente.

  De forma predeterminada, el Agent aplica hash solo a los 64 bits inferiores del ID de traza, y el Collector aplica hash a los 128 bits completos. Sin el indicador, ambos toman decisiones diferentes para la misma traza, incluso con la misma semilla. El Agent coincide con el Collector solo en el modo `hash_seed` del Collector, que es el predeterminado.

<div class="alert alert-danger"><code>DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> está obsoleto y ha sido reemplazado por <code>DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code>.</div>

#### Consideraciones {#considerations-2}

- El muestreador probabilístico ignorará la prioridad de muestreo de los spans que se establezcan a nivel de SDK. Como resultado, el muestreo probabilístico es **incompatible con el [muestreo basado en el inicio][16]**. Esto significa que las trazas seleccionadas mediante el muestreo basado en el inicio aún podrían ser descartadas por el muestreo probabilístico.
- Los spans que no sean capturados por el muestreador probabilístico aún pueden ser capturados por los [muestreadores de errores y casos poco frecuentes][12] del Datadog Agent.
- Si habilita `probabilistic_sampler_full_trace_id`, todos los SDK deben generar y propagar [ID de traza de 128 bits][17]. Si un SDK descarta los 64 bits superiores del ID de traza, el Agent toma una decisión de muestreo diferente para los spans de ese SDK y las trazas quedan incompletas.

## Monitoreo de volúmenes ingeridos en Datadog {#monitoring-ingested-volumes-in-datadog}

Utilice el [APM Estimated Usage dashboard][13] y la métrica `datadog.estimated_usage.apm.ingested_bytes` para consultar los volúmenes ingeridos durante un período específico. Filtre el panel de control por entornos y servicios específicos para ver qué servicios son responsables de la mayor parte del volumen ingerido.

Si el volumen de ingesta es mayor de lo esperado, considere ajustar sus tasas de muestreo.

## Unified service tagging {#unified-service-tagging}

Al enviar datos de OpenTelemetry a Datadog, es importante vincular los datos de las trazas mediante unified service tagging.

Configurar las etiquetas de unified service tagging garantiza que las trazas se vinculen con precisión a sus servicios y entornos correspondientes. Esto evita que los hosts se atribuyan incorrectamente, lo que puede provocar aumentos inesperados en el uso y los costos.

Para obtener más información, consulte [Unified Service Tagging][18].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/otlp_ingest_in_the_agent
[4]: /es/tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /es/dashboards/functions/#add-a-function
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