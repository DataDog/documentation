---
description: Aprenda a recopilar registros de cliente HTTP utilizando la fuente HTTP/S
  Server del Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente HTTP/S Server
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente HTTP/S Server de Observability Pipelines para recopilar registros de cliente HTTP.

También puede [enviar registros proporcionados por AWS con Datadog Lambda Forwarder a Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/http_server %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección del servidor HTTP/S y, si corresponde, el nombre de usuario y la contraseña para la autorización simple (también conocida como básica) y la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure un pipeline][3]. Puede configurar un pipeline en la [UI][1], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente HTTP/S Server en la pipeline UI:

1. Ingrese el identificador para su dirección de servidor HTTP/S. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
    - **Nota**: Ingrese únicamente el identificador para la dirección. **No** ingrese la dirección real.
1. Seleccione su estrategia de autorización. Si seleccionó {{< ui >}}Plain{{< /ui >}}:
    - Ingrese los identificadores para su nombre de usuario y contraseña del servidor HTTP/S. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. (Opcional) Configure tokens de autenticación. Consulte [Configurar tokens de autenticación](#configure-authentication-tokens) para obtener más detalles.
1. Seleccione el decodificador que desea utilizar en los mensajes HTTP. Sus registros de cliente HTTP deben estar en este formato. **Nota**: Si selecciona la decodificación `bytes`, el registro sin procesar se almacena en el campo `message`.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### Configurar tokens de autenticación {#configure-authentication-tokens}

Si almacena tokens como credenciales en el encabezado de autorización de su solicitud HTTP, puede configurar el Worker para verificar si las solicitudes HTTP entrantes tienen un token válido. Los eventos de solicitud que no tienen un token válido se descartan. El Worker también puede buscar un punto de conexión o una dirección IP en lugar de un encabezado.

**Nota**: No puede configurar tokens de autenticación con la estrategia de autorización {{< ui >}}Plain{{< /ui >}}.

{{% observability_pipelines/configure_authentication_tokens %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección del servidor HTTP/S:
	- Hace referencia a la dirección del socket, como `0.0.0.0:9997`, en la que Observability Pipelines Worker escucha para recibir registros de cliente HTTP.
	- El identificador predeterminado es `SOURCE_HTTP_SERVER_ADDRESS`.
- Identificador de frase de contraseña TLS del servidor HTTP/S (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_HTTP_SERVER_KEY_PASS`.
- Si utiliza autenticación simple:
	- Identificador de nombre de usuario del servidor HTTP/S:
		- El identificador predeterminado es `SOURCE_HTTP_SERVER_USERNAME`.
	- Identificador de contraseña del servidor HTTP/S:
		- El identificador predeterminado es `SOURCE_HTTP_SERVER_PASSWORD`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe registros proporcionados por AWS con el Datadog Lambda Forwarder a Observability Pipelines {#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines}

Para enviar registros proporcionados por AWS a Observability Pipelines con la fuente HTTP/S Server:

- [Configure un pipeline con la fuente HTTP/S Server](#set-up-a-pipeline).
- [Implemente el Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Nota**: Esto está disponible para versiones del Worker 2.15 o posteriores.

### Configure un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Implemente el Datadog Lambda Forwarder {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline