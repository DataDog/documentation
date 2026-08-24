---
code_lang: traces
description: Aprenda a enviar trazas a un OpenTelemetry Collector utilizando el Observability
  Pipelines Worker.
disable_toc: false
title: Destino de trazas de OpenTelemetry
type: multi-code-lang
weight: 2
---
## Descripción general {#overview}

Utilice Observability Pipelines' {{< tooltip text="OpenTelemetry Traces destination" tooltip="Comuníquese con su administrador de cuenta para solicitar acceso." >}} para enviar trazas a un OpenTelemetry (OTel) Collector.

<div class="alert alert-info">Debe utilizar una fuente de OpenTelemetry para usar el destino de trazas de OpenTelemetry.</div>

## Configure el destino {#set-up-destination}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese el identificador para el URI de cliente HTTP/S y, si corresponde, la contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure el destino de trazas de OpenTelemetry cuando [configure una canalización][3]. Esta sección cubre cómo hacerlo en la [UI][1], pero también puede configurar una canalización utilizando la [API][4] o con [Terraform][5].

Después de seleccionar el destino de trazas de OpenTelemetry en la canalización [UI], ingrese el identificador para su clave de URI de cliente HTTP/S. Un ejemplo del punto de conexión de URI al que hace referencia el identificador: `http://localhost:4319/v1/traces`. Si deja el campo del identificador en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Permitir muestras fuera de orden {#allow-out-of-order-samples}

El Worker no siempre envía métricas en el orden correcto para una serie determinada porque no reordena las métricas. Por ejemplo, si el primer lote de métricas contiene métricas con marcas de tiempo: `10:03`, `10:04`, `10:05` y el segundo lote contiene métricas con marcas de tiempo: `10:01`, `10:02`, `10:06`, el Worker no reordena esas métricas antes de enviarlas.

Debido a que el receptor OTLP rechaza las muestras fuera de orden, el Worker registra un error de Bad Request (`400`) y todo el segundo lote de métricas se descarta, incluso si el receptor OTLP aceptó algunas de las métricas válidas en el lote.

Datadog recomienda configurar su receptor OTLP para permitir muestras fuera de orden a fin de evitar que se descarten.

## Solución de problemas {#troubleshooting}

### Registros de error de depuración {#debug-error-logs}

Si ve registros de error `400` o `500` de este destino, puede habilitar los registros de depuración para ver la respuesta devuelta por el servidor. Para habilitar los registros solo para este destino basado en HTTP y no para cada módulo del Worker, establezca `VECTOR_LOG` en `info,vector::sinks::util::http=debug`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

Consulte [Habilitar registros de depuración][6] para obtener instrucciones sobre cómo habilitar los registros de depuración completos.

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador del punto de conexión de URI del cliente HTTP/S:
  - Hace referencia al punto de conexión de URI HTTP/S al que el Worker envía datos de OpenTelemetry. Un ejemplo del punto de conexión de URI al que hace referencia el identificador: `http://localhost:4319/v1/traces`.
	- El identificador predeterminado es `DESTINATION_OTEL_HTTP_CLIENT_URI`.
- Identificador de frase de contraseña TLS de trazas de OpenTelemetry (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_OTEL_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_traces %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs