---
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Página de control de la ingesta
title: Control del volumen de ingesta con el Rastreo distribuido de APM
---

## Información general

La [Página de control de la ingesta][1] proporciona una visibilidad detallada de la configuración de la ingesta para todos los servicios, en el Agent y en las bibliotecas de rastreo. Todos los [Mecanismos de ingesta][2] están documentados públicamente y son configurables.

Con la página de control de la ingesta, tendrás una visibilidad total y un control completo del volumen de tramos (spans). En consecuencia, puedes:
- Ingerir los datos más relevantes para tu empresa y tus objetivos de observabilidad.
- Reducir los costes de red evitando el envío de datos no utilizados de traza a la plataforma de Datadog.
- Controlar y gestionar tus costes globales.

## Efectos de reducir el volumen de ingesta de trazas

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="Muestra de ingesta de APM que exhibe un avance del 25 por ciento de trazas ingeridas" style="width:70%;" >}}

Si decides reducir el volumen de ingesta para determinados servicios, las **[métricas][3] de solicitudes, errores y latencia** (conocidas como métricas RED de solicitudes, errores y duración) siguen siendo 100% exactas, ya que se calculan basándose en el 100% del tráfico de la aplicación, independientemente de cualquier configuración de muestreo. Estas métricas se incluyen al comprar Datadog APM. Para asegurarte de que tiene una visibilidad completa del tráfico de tu aplicación, puedes utilizar estas métricas para detectar posibles errores en un servicio o un recurso, creando dashboards, monitores y SLOs.

**Nota**: Si tus aplicaciones y servicios están instrumentadas con bibliotecas de OpenTelemetry y configuras el muestreo en el nivel de SDK o en el nivel de Collector, las métricas de APM se basan en el conjunto **muestreado** de datos de forma predeterminada. Consulta [Muestreo de ingesta con OpenTelemetry][4] para obtener más información.

<div class="alert alert-info"><strong>Fase beta</strong>: alternativamente, utiliza el <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector">Datadog Connector</a> para calcular métricas de APM sobre los datos no muestreados. Lee <a href="/opentelemetry/guide/switch_from_processor_to_connector">Cambiar de Datadog Processor a Datadog Connector para métricas de APM con OpenTelemetry</a> para obtener más información.</div>

Los datos de traza son muy repetitivos, lo que significa que las muestras de traza para investigar cualquier problema siguen estando disponibles con el muestreo de ingesta. En el caso de servicios de alto rendimiento, no suele ser necesario recopilar todas y cada una de las solicitudes: un problema lo suficientemente importante siempre debería mostrar indicios en varias trazas. Los controles de ingesta te ayudan a tener la visibilidad que necesitas para solucionar problemas sin salirse del presupuesto.

#### Métricas de tramos

Las [métricas de tramos][5] se basan en la ingesta de tramos.

La reducción de las frecuencias de muestreo de la ingesta afectará a cualquier métrica de tipo **count** (recuento). Las métricas de tipo **distribution** (distribución), por ejemplo `duration`, no se ven afectadas ya que el muestreo es mayoritariamente uniforme, la distribución de latencias sigue siendo representativa del tráfico.

#### Monitores

Cualquier monitor de **métrica** que utilice [métricas de tramos](#metrics-from-spans) se ve afectado por la reducción del volumen de ingesta. Los monitores de métrica basados en métricas **trace.__** seguirán siendo precisos, porque estas métricas se calculan basándose en el 100% del tráfico.

Los monitores de [**análisis de traza**][6] basados en el recuento también se ven afectados. Comprueba si tienes monitores de análisis de traza creados al buscar monitores `type:trace-analytics` en la página Gestionar monitores.

## Evalúa la configuración de ingesta de tu servicio

Para evaluar el estado actual de la instrumentación de aplicaciones, aprovecha la [página de Control de ingesta de traza][1] que brinda información detallada sobre la configuración del Agent y la biblioteca de rastreo.

### Comprende si estás dentro de la asignación de ingesta mensual

Utiliza el KPI de uso mensual de la ingesta para obtener una estimación de tu uso en comparación con la asignación mensual de 150 GB de tramos ingeridos por host de APM (sumados todos los hosts de APM).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="KPI de exceso de ingesta que muestra un 170 por ciento de uso mensual estimado de los 23.3 TB mensuales disponibles en toda la infraestructura" style="width:40%;" >}}

### Investigación avanzada del uso de APM

La configuración de la ingesta puede ser investigada para cada servicio. Haz clic en una fila de servicio para ver el resumen de ingesta del servicio, que muestra lo siguiente:
- **Desglose del motivo de la ingesta**: qué [mecanismo de ingesta][2] es responsable del volumen de ingesta.
- **Encargados de la toma de decisiones de muestreo**: qué servicios de carga están tomando decisiones de muestreo para los tramos ingeridos con respecto al [mecanismo de ingesta por defecto][7].

También está disponible un [dashboard predeterminado][8] para obtener más información sobre las tendencias históricas relacionadas con el uso y el volumen de ingesta. Clona este dashboard para poder editar widgets y realizar más análisis.

## Reduce tu volumen de ingesta

### Identificar servicios responsables de la mayor parte del volumen de ingesta

Para identificar qué servicios son responsables de la mayor parte del volumen de ingesta, ordena la tabla por **Downstream Bytes/s** (Bytes/segundo de descarga). Esta columna permite detectar qué servicios toman la mayoría de las decisiones de muestreo, que también repercuten en servicios de descarga.

Si el servicio está iniciando la traza, **Downstream Bytes/s** (Bytes/segundo de descarga) también engloba el volumen de tramos procedentes de servicios de descarga para los que el servicio tomó la decisión de muestreo.

La columna **Traffic Breakdown** (Desglose del tráfico) da una buena indicación de la configuración del muestreo del servicio.

Si el servicio tiene una alta tasa de Bytes/segundo de descarga y una alta tasa de muestreo (mostrada como la sección rellena de azul de la columna de desglose de tráfico), se espera que reducir la frecuencia de muestreo de este servicio tenga un alto impacto en el volumen de ingesta.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="Muestreo de ingesta de APM que muestra un avance del 99 por ciento de trazas ingeridas, lo que significa que no hay muestreo" style="width:70%;" >}}

### Configura globalmente la frecuencia de muestreo de la ingesta a nivel del Agent

La columna **Configuration** (Configuración) te indica si tus servicios están configurados con reglas de muestreo. Si los servicios superiores están etiquetados con la configuración `AUTOMATIC`, al cambiar la **Agent Configuration** (Configuración del Agent) se reduce el volumen globalmente en los servicios.

Para reducir el volumen de ingesta en el nivel del Agent, configura `DD_APM_MAX_TPS` (establecido en `10` por defecto) para reducir la parte del volumen de muestreo basada en el título. Lee más información sobre el [mecanismo de muestreo por defecto][7].

**Nota**: Esta opción de configuración solo tiene efecto cuando se utilizan **bibliotecas de rastreo de Datadog**. Si la ingesta de OTLP en el Agent recopila datos de aplicaciones instrumentadas con OpenTelemetry, la modificación de `DD_APM_MAX_TPS` no cambia las frecuencias de muestreo que se aplican en las bibliotecas de rastreo.

Además, para reducir el volumen de [error][9] y trazas [poco frecuentes][10]:
- Configura `DD_APM_ERROR_TPS` para reducir la cuota de error de muestreo.
- Establece `DD_APM_DISABLE_RARE_SAMPLER` en true para dejar de muestrear las trazas poco frecuentes.

### Configura independientemente la frecuencia de muestreo de la ingesta para los servicios a nivel de biblioteca

Al configurar las frecuencias de muestreo para unos pocos servicios de alto rendimiento, la mayor parte del volumen de ingesta "excedente" puede reducirse.

Haz clic en un servicio para ver el **Service Ingestion Summary** (Resumen de ingesta del servicio). Observa el **Ingestion reasons breakdown** (Desglose de motivos de ingesta) en el panel lateral, que ofrece una descripción general de la parte de volumen de ingesta atribuida a cada mecanismo.

Si el motivo principal de la mayor parte del volumen de ingesta es el muestreo basado en títulos (`auto` o `rule`), el volumen puede configurarse estableciendo una regla de muestreo en el nivel de la biblioteca de rastreo.

Haz clic en el botón **Manage Ingestion Rate** (Gestionar tasa de ingesta) para configurar una tasa de muestreo para el servicio. Selecciona el lenguaje de servicio y la frecuencia de muestreo de ingesta que deseas aplicar.

**Nota:** La aplicación debe volverse a desplegar para poder aplicar los cambios de configuración. Datadog recomienda aplicar los cambios configurando [variables de entorno][11].

### Muestreo de trazas con OpenTelemetry

Si tus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry y estás utilizando OpenTelemetry Collector, puedes utilizar las siguientes capacidades de muestreo de OpenTelemetry:

- [TraceIdRatioBased][12] y [ParentBased][13] son 2 muestreadores incorporados que te permiten implementar un muestreo determinista basado en el título y en el trace_id a nivel del **SDK**.
- El [Procesador de muestreo de colas][14] y el [Procesador de muestreo probabilístico][15] permiten muestrear trazas basándose en un conjunto de reglas a nivel **Collector**.

Con cualquiera de las dos opciones se obtienen muestras de [métricas de APM](#effects-of-reducing-trace-ingestion-volume).

## Glosario de motivos de la ingesta

_Saber qué mecanismos de ingesta son responsables de la mayor parte del volumen ingerido_

El mecanismo por defecto para muestrear trazas es el muestreo basado en la fase inicial. La decisión de muestrear o no una traza se toma al principio de su ciclo de vida, y se propaga de forma descendente en el contexto de las solicitudes para asegurar que siempre puedas ver y analizar trazas completas.

El muestreo basado en la fase inicial es configurable en las bibliotecas de rastreo o desde el Datadog Agent:

| Motivo de la ingesta   | Dónde             | Descripción del mecanismo de ingesta | Predeterminado |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | El Datadog Agent distribuye las frecuencias de muestreo a las bibliotecas de rastreo.    | 10 trazas por segundo por Agent |
| `rule`             | [Bibliotecas de rastreo](#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level) | El porcentaje de muestreo definido por las bibliotecas para servicios específicos.   | nulo                 |


Otros motivos de ingesta aparecen en la página Control de la ingesta y como una etiqueta en la métrica `datadog.estimated_usage.apm.ingested_bytes`. Estas razones de ingesta pueden ser responsables de tu volumen de ingesta:

| Motivo de la ingesta   | Dónde             | Descripción del mecanismo de ingesta | Predeterminado |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Muestreo de errores no detectados por el muestreo basado en la fase inicial.             | 10 trazas por segundo por Agent (nulo, si se definen reglas) |
| `rare`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             |  Muestreo de trazas poco frecuentes (captura de todas las combinaciones de un conjunto de etiquetas de tramo).        | 5 trazas por segundo por Agent (nulo, si se definen reglas) |
| `manual`             | En el código         | Anulación de decisión en código para mantener/descartar un tramo y sus secundarios.    | nulo |
| `analytics`          | Agent y bibliotecas de rastreo | [Mecanismo de ingesta obsoleto][16] que muestrea tramos únicos sin la traza completa.   | nulo                 |

Además, otros productos pueden ser responsables del volumen de tramos muestreados:

- `synthetics` y `synthetics-browser`: las pruebas de API y de navegador están conectadas a la traza generada por la prueba.
- `rum`: las solicitudes de las aplicaciones web y móviles se vinculan a las trazas backend correspondientes.
- `lambda` y `xray`: trazas generadas a partir de funciones de AWS Lambda instrumentada con bibliotecas de X-Ray o Datadog.

Más información sobre los motivos de ingesta en la [documentación sobre Mecanismos de ingesta][2].

## Leer más

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