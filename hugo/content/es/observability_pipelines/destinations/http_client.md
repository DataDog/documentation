---
description: Aprenda a enviar registros a un cliente HTTP, como una plataforma de
  registro o SIEM, utilizando el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destino del cliente HTTP
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de cliente HTTP de Observability Pipelines para enviar registros a un cliente HTTP, como una plataforma de registro o SIEM.

## Configure el destino {#set-up-destination}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para el URI del cliente HTTP y, si corresponde, el nombre de usuario y la contraseña para la autorización básica y la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure el destino del cliente HTTP cuando [configure un pipeline][3]. Puede configurar un pipeline en la [UI][1], utilizando la [API][4] o con [Terraform][5]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino del cliente HTTP en la UI del pipeline:

1. Ingrese el identificador para su URI de cliente HTTP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione su estrategia de autorización ({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} o {{< ui >}}Bearer{{< /ui >}}). Si seleccionó:
	- {{< ui >}}Basic{{< /ui >}}:
		- Ingrese el identificador para su nombre de usuario de cliente HTTP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
		- Ingrese el identificador para su contraseña de cliente HTTP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
	- {{< ui >}}Bearer{{< /ui >}}:
		- Ingrese el identificador para su token de cliente HTTP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. JSON es el único codificador disponible.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilite compresión {#enable-compression}

Cambie el interruptor a {{< ui >}}Enable Compression{{< /ui >}}. Si está habilitado:
1. GZIP es el único algoritmo de compresión disponible.
1. Seleccione el nivel de compresión que desea utilizar.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de punto de conexión URI del cliente HTTP:
	- El identificador predeterminado es `DESTINATION_HTTP_CLIENT_URI`.
- Identificador de frase de contraseña TLS del cliente HTTP (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_HTTP_CLIENT_KEY_PASS`.
- Si utiliza autenticación básica:
	- Identificador de nombre de usuario del cliente HTTP:
		- El identificador predeterminado es `DESTINATION_HTTP_CLIENT_USERNAME`.
	- Identificador de contraseña del cliente HTTP:
		- El identificador predeterminado es `DESTINATION_HTTP_CLIENT_PASSWORD`.
- Si utiliza autenticación de portador:
	- Identificador de token de portador del cliente HTTP:
		- El identificador predeterminado es `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][6] y [métricas de búfer de destino][7] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][8]. Para filtrar o agrupar por métricas de destino del cliente HTTP, utilice la etiqueta `component_type:http`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando ocurre una de estas condiciones. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 1,000          | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/