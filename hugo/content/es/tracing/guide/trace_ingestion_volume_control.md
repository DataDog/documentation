---
description: Aprenda a controlar el volumen de ingesta de tramos con mecanismos de
  rastreo de APM para gestionar los costos mientras mantiene la observabilidad.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Página de Ingestion Control
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
title: Control del volumen de ingesta con rastreo distribuido de APM
---
## Descripción general {#overview}

La [página de control de ingesta][1] proporciona visibilidad granular de la configuración de ingesta para todos los servicios, en el agente y en los SDKs. Todos los [Mecanismos de ingesta][2] están documentados públicamente y son configurables.

Con la página de control de ingesta, usted tiene visibilidad total y control completo de su volumen de tramos. En consecuencia, usted puede:
- Ingerir los datos que son más relevantes para su negocio y sus objetivos de observabilidad.
- Reducir los costos de red evitando enviar datos de trazas no utilizados a la plataforma de Datadog.
- Controlar y gestionar sus costos generales.

## Efectos de reducir el volumen de ingesta de trazas {#effects-of-reducing-trace-ingestion-volume}

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="Muestreo de ingesta de APM que muestra el 25 por ciento de las trazas completas ingeridas" style="width:70%;" >}}

Si decide reducir el volumen de ingesta para ciertos servicios, las **métricas de [solicitudes, errores y latencia][3]** (conocidas como métricas RED, por sus siglas en inglés de Requests, Errors, and Duration) permanecen 100% precisas, ya que se calculan basándose en el 100% del tráfico de la aplicación, independientemente de cualquier configuración de muestreo. Estas métricas se incluyen al adquirir Datadog APM. Para asegurarse de tener visibilidad total del tráfico de su aplicación, puede usar estas métricas para detectar posibles errores en un servicio o recurso, mediante la creación de paneles de control, monitores y SLOs.

**Nota**: Si sus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry y configura el muestreo a nivel de SDK y/o a nivel de colector, las métricas de APM se basan en el conjunto de datos **muestreado** de forma predeterminada. Consulte [Muestreo de ingesta con OpenTelemetry][4] para obtener más información.

<div class="alert alert-info">Para calcular las métricas de APM a partir de datos de OpenTelemetry no muestreados, coloque el <a href="/opentelemetry/setup/collector_exporter/#span-metrics-connector"><code>span_metrics</code> connector</a> antes de cualquier procesador de muestreo. El Datadog Connector logra el mismo resultado en configuraciones existentes. Para obtener más información, consulte <a href="/opentelemetry/ingestion_sampling/">Muestreo de ingesta con OpenTelemetry</a>.</div>

Los datos de traza son muy repetitivos, lo que significa que las muestras de traza para investigar cualquier problema siguen estando disponibles con el muestreo de ingesta. Para servicios de alto rendimiento, generalmente no es necesario que recopile cada solicitud: un problema lo suficientemente importante siempre debería mostrar síntomas en múltiples trazas. Ingestion Control le ayuda a tener la visibilidad que necesita para solucionar problemas mientras se mantiene dentro del presupuesto.

#### Métricas de tramos {#metrics-from-spans}

[Las métricas de tramos][5] se basan en tramos ingeridos.

Reducir las tasas de muestreo de ingesta afectará a cualquier métrica de tipo **recuento**. Las métricas de tipo **Distribución**, por ejemplo las medidas `duration`, no se ven afectadas ya que el muestreo es mayormente uniforme, la distribución de las latencias sigue siendo representativa del tráfico.

#### Monitores {#monitors}

Cualquier monitor de **métrica** que utilice [métricas de tramos](#metrics-from-spans) se ve afectado por la reducción del volumen de ingesta. Los monitores de métricas basados en métricas **trace.__** seguirán siendo precisos, porque estas métricas se calculan en función del 100% del tráfico.

Los monitores [{{< ui >}}Trace analytics{{< /ui >}}][6] basados en recuentos también se ven afectados. Verifique si tiene monitores de análisis de trazas creados buscando monitores `type:trace-analytics` en la página de administración de monitores.

## Evalúe la configuración de ingesta de sus servicios {#assess-your-services-ingestion-configuration}

Para evaluar el estado actual de la instrumentación de las aplicaciones, aproveche la [Trace Ingestion Control page][1] que proporciona información detallada sobre la configuración del agente y del SDK.

### Comprender si se encuentra dentro de su asignación mensual de ingesta {#understanding-if-you-are-within-your-monthly-ingestion-allocation}

Utilice el KPI de uso mensual de ingesta para obtener una estimación de su uso en comparación con la asignación mensual de 150 GB de tramos ingeridos por servidor APM (sumado en todos los servidores APM).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="KPI de exceso de ingesta que muestra un 170 por ciento de uso mensual estimado de 23.3 TB mensuales disponibles en toda la infraestructura" style="width:40%;" >}}

### Investigación avanzada de uso de APM {#advanced-apm-usage-investigation}

La configuración de ingesta se puede investigar para cada servicio. Haga clic en una fila de servicio para ver el Resumen de Ingesta del Servicio, que muestra:
- {{< ui >}}Ingestion reason breakdown{{< /ui >}}: ¿qué [mecanismo de ingesta][2] es responsable del volumen de ingesta?
- {{< ui >}}Top sampling decision makers{{< /ui >}}: ¿qué servicios ascendentes están tomando decisiones de muestreo para los tramos ingeridos con respecto al [mecanismo de ingesta predeterminado][7]

También hay disponible un [panel de control listo para usar][8] para obtener más información sobre las tendencias históricas relacionadas con el uso y el volumen de su ingesta. Clone este panel de control para poder editar widgets y realizar análisis adicionales.

## Reduzca su volumen de ingesta {#reduce-your-ingestion-volume}

### Identifique los servicios responsables de la mayor parte del volumen de ingesta {#identify-services-responsible-for-most-of-the-ingestion-volume}

Para identificar qué servicios son responsables de la mayor parte del volumen de ingesta, ordene la tabla por {{< ui >}}Downstream Bytes/s{{< /ui >}}. Esta columna le permite detectar qué servicios toman la mayoría de las decisiones de muestreo, lo que también afecta a los servicios descendentes.

Si el servicio está iniciando la traza, **Bytes/s descendentes** también abarca el volumen de tramos provenientes de servicios descendentes para los cuales el servicio tomó la decisión de muestreo.

La columna {{< ui >}}Traffic Breakdown{{< /ui >}} ofrece una buena indicación de la configuración de muestreo del servicio.

Si el servicio tiene una tasa alta de bytes/s descendentes y una tasa de muestreo alta (que se muestra como la sección rellena de azul de la columna de desglose de tráfico), se espera que reducir la tasa de muestreo para este servicio tenga un gran impacto en el volumen de ingesta.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="Muestreo de ingesta de APM que muestra el 99 por ciento de las trazas completas ingeridas, lo que significa que no hay muestreo" style="width:70%;" >}}

### Configure globalmente la tasa de muestreo de ingesta a nivel del Agent {#globally-configure-the-ingestion-sampling-rate-at-the-agent-level}

La columna {{< ui >}}Configuration{{< /ui >}} le indica si sus servicios están configurados con reglas de muestreo o no. Si los servicios principales están etiquetados con la configuración `AUTOMATIC`, cambiar la **configuración del Agent** reducirá el volumen globalmente en todos los servicios.

Para reducir el volumen de ingesta a nivel del Agent, configure `DD_APM_TARGET_TPS` (establecido en `10` de forma predeterminada) para reducir la proporción del volumen de muestreo basado en el inicio. Lea más sobre el [mecanismo de muestreo predeterminado][7].

**Nota**: Esta opción de configuración solo entra en vigor cuando se utilizan **Datadog SDKs**. Si la ingesta de OTLP en el Agent recopila datos de aplicaciones instrumentadas con OpenTelemetry, modificar `DD_APM_TARGET_TPS` no cambia las tasas de muestreo que se aplican en los SDKs.

Además, para reducir el volumen de trazas de [error][9] y [poco frecuentes][10]:
- Configure `DD_APM_ERROR_TPS` para reducir la proporción de muestreo de errores.
- Establezca `DD_APM_DISABLE_RARE_SAMPLER` en true para detener el muestreo de trazas poco frecuentes.

### Configure de forma independiente la tasa de muestreo de ingesta para los servicios a nivel de biblioteca {#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level}

Al configurar las tasas de muestreo para algunos servicios de alto rendimiento, se puede reducir la mayor parte del volumen de ingesta "excedente".

Haga clic en un servicio para visualizar el {{< ui >}}Service Ingestion Summary{{< /ui >}}. Observe el {{< ui >}}Ingestion reasons breakdown{{< /ui >}} en el panel lateral, que ofrece una descripción general de la proporción del volumen de ingesta atribuida a cada mecanismo.

Si la razón principal de la mayor parte del volumen de ingesta es el muestreo basado en el inicio (`auto` o `rule`), el volumen se puede configurar estableciendo una regla de muestreo a nivel de SDK.

Haga clic en el botón {{< ui >}}Manage Ingestion Rate{{< /ui >}} para configurar una tasa de muestreo para el servicio. Seleccione el idioma del servicio y la tasa de muestreo de ingesta que desea aplicar.

**Nota:** Es necesario volver a implementar la aplicación para aplicar los cambios de configuración. Datadog recomienda aplicar los cambios configurando [variables de entorno][11].

### Muestreo de trazas con OpenTelemetry {#trace-sampling-with-opentelemetry}

Si sus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry y está utilizando el colector de OpenTelemetry, puede utilizar las siguientes capacidades de muestreo de OpenTelemetry:

- [TraceIdRatioBased][12] y [ParentBased][13] son 2 muestreadores integrados que le permiten implementar un muestreo basado en el encabezado determinista basado en el trace_id a nivel de **SDK**
- El [procesador de muestreo de seguimiento de las últimas líneas][14] y el [procesador de muestreo probabilístico][15] le permiten muestrear trazas basadas en un conjunto de reglas a nivel de **colector**

El uso de cualquiera de las dos opciones da como resultado [métricas de APM muestreadas](#effects-of-reducing-trace-ingestion-volume).

## Glosario de motivos de ingesta {#ingestion-reasons-glossary}

_Sepa qué mecanismos de ingesta son responsables de la mayor parte del volumen de ingesta_

El mecanismo predeterminado para muestrear trazas es el muestreo basado en el encabezado. La decisión de muestrear o no una traza se toma al principio de su ciclo de vida y se propaga hacia abajo en el contexto de las solicitudes para garantizar que siempre pueda visualizar y analizar trazas completas.

El muestreo basado en el encabezado se puede configurar en los SDK o desde el Datadog Agent:

| motivo de ingesta   | Dónde             | Descripción del mecanismo de ingesta | Predeterminado |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | El Datadog Agent distribuye las tasas de muestreo a los SDK.    | 10 trazas por segundo por Agent |
| `rule`             | [Bibliotecas de rastreo](#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level) | El porcentaje de muestreo definido por las bibliotecas para servicios específicos.   | null                 |


Otros motivos de ingesta aparecen en la página de Ingestion Control y como una etiqueta en la `datadog.estimated_usage.apm.ingested_bytes` métrica. Estos motivos de ingesta pueden ser responsables de su volumen de ingesta:

| motivo de ingesta   | Dónde             | Descripción del mecanismo de ingesta | Predeterminado |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Muestreo de errores no detectados por el muestreo basado en el encabezado.             | 10 trazas por segundo por Agent (null, si se definen reglas) |
| `rare`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             |  Muestreo de trazas poco frecuentes (captura todas las combinaciones de un conjunto de etiquetas de tramo).        | 5 trazas por segundo por Agent (null, si se definen reglas) |
| `manual`             | En el código         | Anulación de la decisión en el código para conservar/descartar un tramo y sus subtramos.    | null |
| `analytics`          | Agent y bibliotecas de rastreo | [Mecanismo de ingesta obsoleto][16] que muestrea tramos individuales sin la traza completa.   | null                 |

Además, otros productos pueden ser responsables del volumen de tramos muestreados:

- `synthetics` y `synthetics-browser`: Las pruebas de API y de navegador están conectadas a la traza generada por la prueba.
- `rum`: Las solicitudes de aplicaciones web y móviles están vinculadas a las trazas de backend correspondientes.
- `lambda` y `xray`: Trazas generadas a partir de funciones AWS lambda instrumentadas con bibliotecas de X-Ray o Datadog.

Lea más sobre los motivos de ingesta en la [documentación de Mecanismos de Ingesta][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_controls
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /es/tracing/metrics/metrics_namespace/
[4]: /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[5]: /es/tracing/trace_pipeline/generate_metrics/
[6]: /es/monitors/types/apm/?tab=analytics
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: /es/tracing/trace_pipeline/metrics/
[9]: /es/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[10]: /es/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[11]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
[12]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[13]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[16]: /es/tracing/legacy_app_analytics