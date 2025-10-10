---
aliases:
- /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control
  tag: Guía
  text: Control del volumen de ingesta de trazas (traces)
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Controles de la ingesta
- link: /opentelemetry/
  tag: Documentación
  text: Compatibilidad de OpenTelemetry en Datadog
title: Muestreo por ingesta con OpenTelemetry
---

## Información general

Los SDK de OpenTelemetry y OpenTelemetry Collector proporcionan capacidades de muestreo, ya que la ingesta del 100% de trazas (traces) es a menudo innecesaria para obtener visibilidad del estado de tus aplicaciones. Configura las tasas de muestreo antes de enviar trazas (traces) a Datadog para ingerir los datos que sean más relevantes para tus objetivos empresariales y de observabilidad, al tiempo que controlas y gestionas los costos generales.

En este documento se demuestran dos métodos principales para enviar trazas (traces) a Datadog con OpenTelemetry:

- Envía trazas (traces) al **[OpenTelemetry Collector][1]** y utiliza el exportador de Datadog para reenviarlas a Datadog.
- Envía trazas (traces) a la **[Ingesta del Datadog Agent OTLP][3]**, que las reenvía a Datadog.

**Nota**: Datadog no permite ejecutar el OpenTelemetry Collector y el Datadog Agent en el mismo host.

### Uso de OpenTelemetry Collector

Con este método, el OpenTelemetry Collector recibe trazas (traces) de SDK de OpenTelemetry y las exporta a Datadog utilizando el Exportador de Datadog. En este escenario, las [métricas de trazas (traces) de APM][4] se calculan mediante el conector de Datadog:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_collector.png" alt="Cálculo de métricas de OpenTelemetry APM con el Collector" style="width:100%;" >}}

Elige este método si necesitas las capacidades de procesamiento avanzadas de OpenTelemetry Collector, como el muestreo basado en tail (seguimiento de logs). Para configurar el Collector para recibir trazas (traces), sigue las instrucciones de [OpenTelemetry Collector y Datadog Exporter][1].

### Utilizar la ingesta del Datadog Agent OTLP

Con este método, el Datadog Agent recibe trazas (traces) directamente de los SDK de OpenTelemetry utilizando el protocolo de OTLP. Esto te permite enviar trazas (traces) a Datadog sin ejecutar un servicio de OpenTelemetry Collector separado. En este escenario, las métricas de trazas (traces) de APM se calculan con el Agent:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_agent.png" alt="Cálculo de métricas de OpenTelemetry APM con el Datadog Agent" style="width:100%;" >}}

Elige este método si prefieres una configuración más sencilla sin necesidad de un servicio de OpenTelemetry Collector separado. Para Configurar el Datadog Agent para recibir trazas (traces) usando OTLP, sigue las instrucciones en [Ingesta de OTLP con el Datadog Agent][15].

## Reducir el volumen de ingesta

Con OpenTelemetry, puedes configurar el muestreo tanto en las bibliotecas de OpenTelemetry como en el OpenTelemetry Collector:

- **Muestreo basado en la fase inicial** en los SDK de OpenTelemetry
- **Muestreo basado en tail (seguimiento de logs)** en OpenTelemetry Collector
- **Muestreo probabilístico** en el Datadog Agent

### Muestreo basado en la fase inicial

A nivel del SDK, se puede implementar el _muestreo basado en la fase inicial_. Esto es cuando la decisión del muestreo se toma al principio del rastreo. Este tipo de muestreo es particularmente útil para aplicaciones de alto rendimiento, en las que se tiene una comprensión clara de qué trazas (traces) es más importante ingerir y se desea tomar decisiones de muestreo al principio del proceso de rastreo.

#### Configuración

Para configurar el muestreo basado en la fase inicial, utiliza los muestreadores [TraceIdRatioBased][5] o [ParentBased][6] proporcionados por los SDK de OpenTelemetry. Estos te permiten implementar el muestreo determinista basado en la fase inicial basado en el `trace_id` en el nivel de SDK.

#### Consideraciones

El muestreo basado en la fase inicial afecta al cálculo de las métricas de APM. Sólo las trazas (traces) muestreadas se envían a OpenTelemetry Collector o al Datadog Agent, que realizan el cálculo de métricas.

Para aproximar métricas sin muestrear a partir de métricas muestreadas, utiliza [fórmulas y funciones][7] con la frecuencia de muestreo configurada en SDK.

Utiliza la [guía de control del volumen de ingesta][8] para obtener más información sobre las implicaciones de configurar el muestreo de trazas (traces) en monitores analíticos de trazas (traces) y métricas de tramos (spans).


### Muestreo basado en tail (seguimiento de logs)

En el nivel de OpenTelemetry Collector, puedes realizar un _muestreo basado en tail (seguimiento de logs)_, que te permite definir reglas más avanzadas para mantener la visibilidad sobre trazas (traces) con errores o alta latencia.

#### Configuración

Para configurar muestreo basado en tail (seguimiento de logs), utiliza el [Procesador de muestreo de tail (seguimiento de logs)][9] o el [Procesador de muestreo probabilístico][10] para muestrear trazas (traces) basándose en un conjunto de reglas en el nivel del collector.

#### Consideraciones

Una limitación del muestreo basado en tail (seguimiento de logs) es que todos los tramos (spans) de una determinada traza (trace) deben ser recibidos por la misma instancia del collector para que las decisiones de muestreo sean efectivas. Si una traza (trace) se distribuye entre varias instancias de collector y se utiliza el muestreo basado en tail (seguimiento de logs), es posible que algunas partes de esa traza (trace) no se envíen a Datadog.

Para garantizar que las métricas de APM se calculen basándose en el 100% del tráfico de las aplicaciones mientras se utiliza el muestreo basado en tail (seguimiento de logs) de nivel de collector, utiliza el [Datadog Connector][11].

<div class="alert alert-info">El Datadog Connector está disponible a partir de la versión 0.83.0. Lee <a href="/opentelemetry/guide/switch_from_processor_to_connector">Cambiar del procesador de Datadog al Datadog Conector para métricas de OpenTelemetry APM si se migra desde una versión anterior.</a> </div>

Consulta la [guía de control del volumen de ingesta][8] para obtener información sobre las implicaciones de configurar el muestreo de trazas (traces) en monitores analíticos de trazas (traces) y métricas de tramos (spans).

### Muestreo probabilístico

Cuando se utiliza la ingesta del Datadog Agent OTLP, se dispone de un muestreador probabilístico a partir del Agent v7.54.0.

#### Configuración

Para configurar el muestreo probabilístico, realiza una de las siguientes acciones:

- Configura `DD_APM_PROBABILISTIC_SAMPLER_ENABLED` en `true` y `DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE` en el porcentaje de trazas (traces) que desees muestrear (entre `0` y `100`).
- Añade el siguiente YAML a tu archivo configuración del Agent:

  ```yaml
  apm_config:
    # ...
    probabilistic_sampler:
        enabled: true
        sampling_percentage: 51 #In this example, 51% of traces are captured.
        hash_seed: 22 #A seed used for the hash algorithm. This must match other agents and OTel
  ```

**Si utilizas una configuración mixta de librerías de muestreo de Datadog y SDK de OTel**:

- El muestreo probabilístico se aplicará a tramos (spans) procedentes tanto de Datadog como de librerías de rastreo de OTel.
- Si envías tramos (spans) tanto a las instancias del Datadog Agent **como** a OTel Collector, configura la misma inicialización entre el Datadog Agent (`DD_APM_PROBABILISTIC_SAMPLER_HASH_SEED`) y OTel Collector (`hash_seed`) para garantizar un muestreo coherente.

<div class="alert alert-danger"><code>DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> está obsoleto y se ha sustituido por <code>DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code>.</div>

#### Consideraciones

- El muestreador probabilístico ignorará la prioridad de muestreo de tramos (spans) que se configuren en el nivel de la librería de rastreo. Como resultado, el muestreo probabilístico es **incompatible con el [muestreo basado en la fase inicial][16]**. Esto significa que el muestreo probabilístico puede omitir las trazas (traces) muestreadas sobre la base de la fase inicial.
- Los tramos (spans) no capturados por el muestreador probabilístico aún pueden capturarse con los [muestreadores de errores y eventos raros][12].
- Para un muestreo coherente, todos los rastreadores deben admitir los [ID de trazas (traces) de 128 bits][17].

## Monitorización de volúmenes ingeridos en Datadog

Utiliza el [dashboard de uso estimado de APM][13] y la métrica `datadog.estimated_usage.apm.ingested_bytes` para obtener visibilidad de tus volúmenes ingeridos durante un periodo de tiempo específico. Filtra el dashboard a entornos y servicios específicos para consultar cuáles servicios son responsables de la mayor parte del volumen ingerido.

Si el volumen de ingesta es superior al esperado, considera la posibilidad de ajustar tus frecuencias de muestreo.

## Etiquetado de servicios unificado

Al enviar datos de OpenTelemetry a Datadog, es importante vincular los datos de trazas (traces) con el etiquetado de servicios unificado.

La configuración de etiquetas (tags) de servicio unificado garantiza que las trazas (traces) estén vinculadas con precisión a tus servicios y entornos correspondientes. Esto evita que los hosts se atribuyan erróneamente, lo que puede dar lugar a un aumento inesperado del uso y los costos.

Para obtener más información, consulta [Etiquetado de servicio unificado][18].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otel_collector_datadog_exporter
[2]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=alongsidetheagent#step-5---run-the-collector
[3]: /es/opentelemetry/otlp_ingest_in_the_agent
[4]: /es/tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /es/dashboards/functions/#add-a-function
[8]: /es/tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector#datadog-connector
[12]: /es/tracing/trace_pipeline/ingestion_mechanisms/#error-and-rare-traces
[13]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[14]: /es/opentelemetry/guide/migration/
[15]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /es/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling
[17]: /es/opentelemetry/interoperability/otel_api_tracing_interoperability/#128-bit-trace-ids
[18]: /es/getting_started/tagging/unified_service_tagging/#opentelemetry
