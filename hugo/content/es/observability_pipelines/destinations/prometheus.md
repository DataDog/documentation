---
description: Aprenda a enviar métricas a Prometheus utilizando el Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destino de Prometheus
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Prometheus de Observability Pipelines para enviar métricas a Prometheus.

## Configure el destino {#set-up-destination}

<div class="alert alert-danger">Para Secrets Management: ingrese solo los identificadores de la URL del punto de conexión y, si corresponde, del nombre de usuario y la contraseña para la autorización básica, del token de portador y de la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure el destino de Prometheus cuando [configure un pipeline][1]. Puede configurar una canalización en la [interfaz de usuario][2], utilizando la [API][3] o con [Terraform][4]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Prometheus en la interfaz de usuario del pipeline:

1. Ingrese el identificador para su {{< ui >}}Remote Write Endpoint URL{{< /ui >}}. Un ejemplo de una URL de punto de conexión a la que hace referencia el identificador: `http://localhost:9090/api/v1/write`. Si deja el campo de identificador en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione su estrategia de autorización ({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} o {{< ui >}}Bearer{{< /ui >}}). Si seleccionó:
    - {{< ui >}}Basic{{< /ui >}}: Ingrese el identificador para su nombre de usuario y contraseña. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
    - {{< ui >}}Bearer{{< /ui >}}: Ingrese el identificador para su token de portador. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Espacio de nombre por defecto {#default-namespace}

Ingrese el espacio de nombres predeterminado para cualquier métrica enviada. Este espacio de nombres solo se utiliza si una métrica no tiene un espacio de nombres existente. Se agrega como prefijo al nombre de la métrica, separado por un guion bajo (`_`). El espacio de nombres debe seguir la [convención de nomenclatura de Prometheus][5].

#### Tenant ID {#tenant-id}

Ingrese el ID de inquilino para agregar a las solicitudes salientes. Este campo admite [sintaxis de plantilla][6], pero la plantilla debe tener un prefijo literal, como `prefix-{{ tenant_id }}` or `prefix/{{ tenant_id }}`. Templates without a literal prefix, such as `{{ tenant_id }}`, son rechazados; el Worker registra un error y la canalización no se inicia.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}
- (Opcional) Ingrese el nombre del servidor que se utilizará para la validación del certificado. Si se deja en blanco, se utiliza el nombre de host de la URL del punto de conexión.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Permitir muestras predeterminadas {#allow-out-of-order-samples}

El Worker no siempre envía las métricas en el orden correcto para una serie determinada porque no reordena las métricas. Por ejemplo, si el primer lote de métricas contiene métricas con marcas de tiempo: `10:03`, `10:04`, `10:05` y el segundo lote contiene métricas con marcas de tiempo: `10:01`, `10:02`, `10:06`, el Worker no reordena esas métricas antes de enviarlas.

Debido a que el receptor de escritura remota (remote write) de Prometheus rechaza las muestras fuera de orden, el Worker registra un error Bad Request (`400`) y todo el segundo lote de métricas se descarta, incluso si el receptor de escritura remota aceptó algunas de las métricas válidas en el lote.

Datadog recomienda configurar su receptor de escritura remota para permitir muestras fuera de orden a fin de evitar que se descarten las muestras fuera de orden.

## Solución de problemas {#troubleshooting}

### Debug error logs {#debug-error-logs}

Si ve registros de error `400` o `500` de este destino, puede habilitar los registros de depuración para ver la respuesta devuelta por el servidor. Para habilitar los registros solo para este destino basado en HTTP y no para todos los módulos del Worker, establezca `VECTOR_LOG` en `info,vector::sinks::util::http=debug`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

Consulte [Habilitar registros de depuración][7] para obtener instrucciones sobre cómo habilitar los registros de depuración completos.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL del punto de conexión de Remote Write:
	- Hace referencia a la URL del punto de conexión de Remote Write. Un ejemplo de una URL de punto de conexión a la que hace referencia el identificador: `http://localhost:9090/api/v1/write`.
	- El identificador predeterminado es `DESTINATION_PROMETHEUS_REMOTE_WRITE_ENDPOINT`.
- Identificador de frase de contraseña TLS de Prometheus (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_PROMETHEUS_REMOTE_WRITE_KEY_PASS`.
- Si utiliza autenticación básica:
	- Identificador de nombre de usuario de Prometheus:
		- El identificador predeterminado es `DESTINATION_PROMETHEUS_REMOTE_WRITE_USERNAME`.
	- Identificador de contraseña de Prometheus:
		- El identificador predeterminado es `DESTINATION_PROMETHEUS_REMOTE_WRITE_PASSWORD`.
- Si utiliza autenticación de portador:
	- Identificador de token de portador (bearer token) de Prometheus:
		- El identificador predeterminado es `DESTINATION_PROMETHEUS_REMOTE_WRITE_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://prometheus.io/docs/practices/naming/
[6]: /es/observability_pipelines/destinations/#template-syntax
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs