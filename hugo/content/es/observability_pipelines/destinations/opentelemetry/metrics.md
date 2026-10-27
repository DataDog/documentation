---
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destino de métricas de OpenTelemetry
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino OpenTelemetry de Observability Pipelines para enviar métricas a través de HTTP/S a un colector de OpenTelemetry (OTel) u otro punto de conexión compatible con el protocolo OpenTelemetry (OTLP).

## Configure el destino {#set-up-destination}

<div class="alert alert-danger">Para Secrets Management: ingrese solo el identificador de HTTP/S Client URI y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure el destino de OpenTelemetry cuando [configure un pipeline][3]. Puede configurar un pipeline en la [UI][1], utilizando la [API][4] o con [Terraform][5]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de OpenTelemetry en la interfaz de usuario del pipeline, ingrese el identificador de HTTP/S Client URI. Un ejemplo del punto de conexión URI HTTP/S al que hace referencia el identificador: `http://localhost:4319/v1/metrics`. Si deja el campo de identificador en blanco, se utiliza el [predeterminado](#secret-defaults).

**Notas**:
- El Worker solo puede enviar métricas de contador, gauge y histograma a OpenTelemetry. OpenTelemetry no admite otros tipos de métricas, por lo que el Worker las descarta. Consulte [Filtrar métricas no admitidas](#filter-out-unsupported-metrics) para obtener más información.
- Datadog recomienda configurar su receptor OTLP para permitir muestras fuera de orden, ya que el Worker no reordena las métricas y algunos receptores OTLP rechazan las muestras fuera de orden. Consulte [Permitir muestras fuera de orden](#allow-out-of-order-samples) para obtener más información.
- Si ingresa identificadores de secretos y luego elige usar variables de entorno, la variable de entorno es el identificador ingresado con `DD_OP_` antepuesto. Por ejemplo, si ingresó `PASSWORD_1` para un identificador de contraseña, la variable de entorno para esa contraseña es `DD_OP_PASSWORD_1`.

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Filtrar métricas no admitidas {#filter-out-unsupported-metrics}

El Worker solo puede enviar métricas de contador, gauge y histograma a OpenTelemetry. Las siguientes métricas de Datadog no son compatibles porque no se pueden convertir al formato OTLP:

- Métricas de tipo StatsD
- Métricas de distribución
- Métricas de sketch

Si una de estas métricas se encuentra en un lote que se va a codificar y enviar a OpenTelemetry, el Worker descarta la métrica no admitida, registra un error y actualiza la métrica `component_error_total`. Datadog recomienda usar un [procesador de filtros][9] para filtrar los tipos de métricas no admitidos.

## Permitir muestras fuera de orden {#allow-out-of-order-samples}

El Worker no siempre envía las métricas en el orden correcto para una serie determinada porque no reordena las métricas. Por ejemplo, si el primer lote de métricas contiene métricas con marcas de tiempo: `10:03`, `10:04`, `10:05` y el segundo lote contiene métricas con marcas de tiempo: `10:01`, `10:02`, `10:06`, el Worker no reordena esas métricas antes de enviarlas.

Debido a que algunos receptores OTLP, como el receptor OTLP de Prometheus, rechazan las muestras fuera de orden, el segundo lote de métricas es rechazado por el receptor. Como resultado, el Worker registra un error Bad Request (`400`) y se descarta todo el lote rechazado, incluso si el receptor OTLP aceptó algunas de las métricas válidas del lote.

Datadog recomienda configurar su receptor OTLP para permitir muestras fuera de orden a fin de evitar que se descarten las muestras fuera de orden.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador del punto de conexión HTTP/S Client URI
  - Hace referencia al punto de conexión URI HTTP/S al que el Worker envía datos de OpenTelemetry. Un ejemplo del punto de conexión URI HTTP/S al que hace referencia el identificador: `http://localhost:4319/v1/metrics`.
  - El identificador predeterminado es `DESTINATION_OTEL_HTTP_CLIENT_URI`.
- Identificador de frase de contraseña TLS del cliente HTTP/S (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_OTEL_HTTP_CLIENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Consulte [Métricas de componentes][6] y [Métricas de búfer de destino][7] para obtener más información sobre las métricas emitidas por todos los destinos. Para filtrar o agrupar por métricas de destino de OpenTelemetry, utilice la etiqueta `component_type:opentelemetry`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando ocurre una de estas condiciones. Consulte [procesamiento por lotes de eventos][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| N/A            | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/?tab=destinations#buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /es/observability_pipelines/processors/filter/