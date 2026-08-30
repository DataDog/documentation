---
description: Obtenga información sobre los componentes de fuente, procesador y destino
  que conforman una canalización, y cómo crearlos e implementarlos.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure canalizaciones
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

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="La página de canalizaciones con una fuente que va a dos grupos de procesadores y dos destinos" style="width:100%;" >}}

Observability Pipelines le permite recopilar y procesar {{< tooltip text="logs, metrics, and traces" tooltip="Comuníquese con su administrador de cuenta para analizar los casos de uso y los precios." >}} dentro de su propia infraestructura, y luego diríjalos a diferentes destinos. Una canalización consta de tres componentes principales:

- [Fuente][1]: Recibe datos de una herramienta como el Datadog Agent.
- [Procesadores][2]: Transforman, enriquecen o filtran datos.
- [Destinos][3]: Donde se envían los datos (por ejemplo, Datadog, Amazon S3, Splunk, Google Security Operations y Microsoft Sentinel).

Cree e implemente canalizaciones para recopilar, transformar y dirigir sus datos mediante uno de estos métodos:

 - [Pipeline UI][4]
 - [API][5]
 - [Terraform][6]

## Tipos de canalización {#pipeline-types}

Existen dos tipos de canalizaciones:

{{< tabs >}}
{{% tab "Registros" %}}

Utilice una de las [plantillas de registros][1] para crear una canalización de registros.

- Archivar registros
- Envío doble de registros
- Generar métricas basadas en registros
- Enriquecimiento de registros
- Control de volumen de registros
- Redacción de datos confidenciales
- Dividir registros

Consulte [Configurar canalizaciones][2] para obtener más información sobre cómo configurar una fuente, procesadores y destinos.

[1]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /es/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "Métricas" %}}

Utilice la plantilla [Gobernanza de etiquetas de métricas][1] para crear una canalización de métricas.

Consulte [Configurar canalizaciones][2] para obtener más información sobre cómo configurar una fuente, procesadores y destinos.

### Datos de métricas {#metrics-data}

Las métricas enviadas a Observability Pipelines incluyen lo siguiente:

- `name`: El nombre de la métrica.
- `kind`: Existen dos tipos de métricas:
  - `absolute` métricas: Representa el valor actual de una medición en el momento en que se informa.
  - `incremental` métricas: Representa el cambio en una medición desde el último valor reportado, el cual el sistema agrega con el tiempo.
- `value`: El [tipo de métrica](#metric-types):
	- `counter`
	- `gauge`: La fecha y hora en que se crea la métrica.
	- `distribution`
	- `histogram`
- `timestamp`: La fecha y hora en que se crea la métrica.
- `tags`: Incluye etiquetas como `host`.

Si una métrica recibida es `incremental` o `absolute` depende de la fuente. Por ejemplo, las métricas de OpenTelemetry pueden ser incrementales o absolutas según su [temporalidad][4]. La siguiente tabla es un ejemplo de una métrica de contador de OTel enviada con temporalidad delta versus acumulativa.

| Tipo de métrica | Incremental                      | Absoluta                               |
|-------------|----------------------------------|----------------------------------------|
| Contador     | Enviado como deltas: `+2`, `+4`, `+6` | Enviado como suma acumulativa: `2`, `6`, `10` |

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

### Tipos de métricas {#metric-types}

Los tipos de métricas disponibles:

| Tipo de métrica  | Descripción                                                                                                                                                       | Ejemplo                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER      | El número total de ocurrencias de eventos en un intervalo de tiempo. Se puede restablecer a cero, pero no se puede disminuir.                                                        | Desea contar el número de registros con `status:error`.                                     |
| GAUGE        | Una instantánea de un valor en el momento en que se informa.                                                                                                                 | Desea realizar un seguimiento de la utilización de CPU más reciente para cada host.                                   |
| HISTOGRAM    | Agregaciones estadísticas (`avg`, `min`, `max`, `count`, `median`, percentiles) calculadas por host por el Datadog Agent en un intervalo de tiempo y luego enviadas a Datadog. | Desea agregaciones de latencia de solicitud por host de cada servidor web.                          |
| DISTRIBUTION | Valores sin procesar enviados a Datadog para que las agregaciones de percentiles se calculen en el lado del servidor, globalmente en todos los hosts que informan la métrica en un intervalo de tiempo.             | Desea la latencia p95 global de un punto de conexión de API, calculada en todos los hosts que lo sirven.  |

Consulte [Metric Types][3] para obtener más información.

[1]: /es/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: /es/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

{{% /tab %}}

{{% tab "Trazas" %}}

Puede ingerir, procesar y enviar {{< tooltip text="traces" tooltip="Comuníquese con su administrador de cuenta para solicitar acceso." >}} a diferentes destinos utilizando la plantilla de [Trace Sampling][1].

Consulte [Configurar canalizaciones][2] para obtener más información sobre cómo configurar una fuente, procesadores y destinos.

[1]: /es/observability_pipelines/configuration/explore_templates/?tab=traces#trace-sampling
[2]: /es/observability_pipelines/configuration/set_up_pipelines/

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