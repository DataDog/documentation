---
description: Obtenga información sobre los componentes source, processor y destination
  que forman un pipeline, y cómo construirlo e implementarlo.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure Pipelines
- link: observability_pipelines/configuration/install_the_worker/
  tag: Documentación
  text: Instale el Worker
- link: observability_pipelines/configuration/live_capture/
  tag: Documentación
  text: Obtenga más información sobre Live Capture
- link: observability_pipelines/troubleshooting
  tag: Documentación
  text: Solución de problemas
title: Configuración
---
## Descripción general {#overview}

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="La página de pipelines con una source que se dirige a dos processor groups y dos destinations" style="width:100%;" >}}

Observability Pipelines le permite recopilar y procesar registros y métricas dentro de su propia infraestructura, y luego enrutarlos a diferentes destinos. Una canalización consta de tres componentes principales:

- [Source][1]: Recibe datos de una herramienta como el Datadog Agent.
- [Processors][2]: Transforman, enriquecen o filtran datos.
- [Destinations][3]: Donde se envían los datos (por ejemplo, Datadog, Amazon S3, Splunk, Google Security Operations y Microsoft Sentinel).

Cree e implemente pipelines para recopilar, transformar y enrutar sus datos mediante uno de estos métodos:

 - [Pipeline UI][4]
 - [API][5]
 - [Terraform][6]

## Pipeline types {#pipeline-types}

Existen dos tipos de pipelines:

{{< tabs >}}
{{% tab "Registros" %}}

Utilice una de las [logs templates][1] para crear un pipeline de registros.

- Archive Logs
- Dual Ship Logs
- Generate Log-based Metrics
- Log Enrichment
- Log Volume Control
- Sensitive Data Redaction
- Split Logs

Consulte [Set Up Pipelines][2] para obtener más información sobre cómo configurar una source, processors y destinations.

[1]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /es/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "Métricas" %}}

Utilice la plantilla [Metric Tag Governance][1] para crear un pipeline de métricas.

Consulte [Set Up Pipelines][2] para obtener más información sobre cómo configurar una source, processors y destination.

### Metrics data {#metrics-data}

Las métricas enviadas a Observability Pipelines incluyen lo siguiente:

- `name`: El nombre de la métrica.
- `kind`: Existen dos tipos de métricas:
  - `absolute` métricas: Representan el valor actual de una medición en el momento en que se informa.
  - `incremental` métricas: Representan el cambio en una medición desde el último valor informado, que el sistema agrega con el tiempo.
- `value`: El [tipo de métrica](#metric-types):
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp`: La fecha y hora en que se crea la métrica.
- `tags`: Incluye etiquetas como `host`.

Si una métrica recibida es `incremental` o `absolute` depende del servidor. Por ejemplo, las métricas de OpenTelemetry pueden ser incrementales o absolutas según su [temporalidad][4]. La siguiente tabla es un ejemplo de una métrica de contador OTel enviada con temporalidad delta frente a acumulativa.

| Tipo de métrica | Incremental                      | Absoluta                               |
|-------------|----------------------------------|----------------------------------------|
| Counter     | Enviado como deltas: `+2`, `+4`, `+6` | Enviado como suma acumulativa: `2`, `6`, `10` |

Un ejemplo de una métrica:

```
{
  "name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
    "agent":"core",
    "domain":"https://7-72-3-app.agent.datadoghq.com",
    "host":"COMP-YGVQDJG75L",
    "source_type_name":"System",
    "env:prod"
  },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

### Metric types {#metric-types}

Los tipos de métrica disponibles:

| Tipo de métrica  | Descripción                                                                                                                                                       | Ejemplo                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER      | El número total de ocurrencias de eventos en un intervalo de tiempo. Se puede restablecer a cero, pero no se puede disminuir.                                                        | Desea contar el número de registros con `status:error`.                                     |
| GAUGE        | Una instantánea de un valor en el momento en que se informa.                                                                                                                 | Desea realizar un seguimiento de la última utilización de CPU por cada servidor.                                   |
| HISTOGRAM    | Agregaciones estadísticas (`avg`, `min`, `max`, `count`, `median`, percentiles) calculadas por cada servidor por el Datadog Agent en un intervalo de tiempo, y luego enviadas a Datadog. | Desea agregaciones de latencia de solicitudes por cada servidor de cada servidor web.                          |
| DISTRIBUTION | Valores sin procesar enviados a Datadog para que las agregaciones de percentiles se calculen en el servidor, globalmente en cada servidor que reporta la métrica en un intervalo de tiempo.             | Desea la latencia p95 global de un punto de conexión de API, calculada en cada servidor que lo sirve.  |

Consulte [Metric Types][3] para obtener más información.

[1]: /es/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: /es/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/sources/
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs