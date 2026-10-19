---
description: Aprenda a extraer registros de una fuente HTTP/S ascendente utilizando
  Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente HTTP/S Client
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente HTTP/S Client de Observability Pipelines para extraer registros del servidor HTTP/S ascendente.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/http_client %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Ingrese solo los identificadores para la URL de punto de conexión del cliente HTTP/S y, si corresponde, los secretos de su estrategia de autorización y la contraseña de clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][3], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente HTTP/S Client en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su URL de punto de conexión del cliente HTTP/S. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione su estrategia de autorización. Si seleccionó:
   - {{< ui >}}Basic{{< /ui >}}:
      - Ingrese el identificador para su nombre de usuario de cliente HTTP/S. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
      - Ingrese el identificador para su contraseña de cliente HTTP/S. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
   - {{< ui >}}Bearer{{< /ui >}}: Ingrese el identificador para su token de portador. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione el decodificador que desea utilizar en los mensajes HTTP. Los registros extraídos de la fuente HTTP deben estar en este formato.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Configuración de raspado {#scrape-settings}

- Ingrese el intervalo entre raspados.
   - Su servidor HTTP debe ser capaz de manejar solicitudes GET en este intervalo.
   - Dado que las solicitudes se ejecutan simultáneamente, si un raspado tarda más que el intervalo dado, se inicia un nuevo raspado, lo que puede consumir recursos adicionales. Establezca el tiempo de espera en un valor inferior al intervalo de raspado para evitar que esto suceda.
- Ingrese el tiempo de espera para cada solicitud de raspado.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL de punto de conexión del cliente HTTP/S:
	- Hace referencia al punto de conexión desde el cual Observability Pipelines Worker recopila eventos de registro.
	- El identificador predeterminado es `SOURCE_HTTP_CLIENT_ENDPOINT_URL`.
- Identificador de frase de contraseña TLS del cliente HTTP/S (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_HTTP_CLIENT_KEY_PASS`.
- Si utiliza autenticación básica:
	- Identificador de nombre de usuario del cliente HTTP/S:
		- El identificador predeterminado es `SOURCE_HTTP_CLIENT_USERNAME`.
	- Identificador de contraseña del cliente HTTP/S:
		- El identificador predeterminado es `SOURCE_HTTP_CLIENT_PASSWORD`.
- Si utiliza autenticación de portador:
	- Identificador de token de portador del cliente HTTP/S:
		- El identificador predeterminado es `SOURCE_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline