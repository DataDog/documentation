---
description: Aprenda a enviar registros a un punto de conexión de socket usando el
  Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de socket
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de socket de Observability Pipelines para enviar registros a un punto de conexión de socket.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: ingrese únicamente el identificador para la dirección del socket y, si corresponde, el key pass. <b>No</b> ingrese los valores reales.</div>

Configure el destino de socket cuando [configure un pipeline][2]. Puede configurar un pipeline en la [UI][1], utilizando la [API][3] o con [Terraform][4]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de socket en la UI del pipeline:

1. Ingrese el identificador para su dirección. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1.  En el menú desplegable {{< ui >}}Mode{{< /ui >}}, seleccione el tipo de socket que desea utilizar.
1.  En el menú desplegable {{< ui >}}Encoding{{< /ui >}}, seleccione {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw message{{< /ui >}} como formato de salida.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de socket:
	- Hace referencia a la dirección a la que el Observability Pipelines Worker envía los registros procesados.
	- El identificador predeterminado es `DESTINATION_SOCKET_ADDRESS`.
- Identificador de frase de contraseña TLS del socket (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

El destino de socket no agrupa eventos.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline