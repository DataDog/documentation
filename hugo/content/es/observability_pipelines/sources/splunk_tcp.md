---
description: Aprenda a recopilar registros de Splunk Heavy o Universal Forwarders
  a través de TCP utilizando el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente de Splunk Heavy o Universal Forwarders (TCP)
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Splunk Heavy y Universal Forwarders (TCP) de Observability Pipelines para recibir registros enviados a sus Splunk Forwarders.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección de Splunk TCP y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][2], utilizando la [API][3] o con [Terraform][4]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Splunk TCP en la interfaz de usuario de la canalización, ingrese el identificador para su dirección de Splunk TCP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

**Notas**:
- De forma predeterminada, la fuente Splunk TCP no limita el tamaño de un evento. Para evitar un consumo de memoria ilimitado, como el causado por conexiones mal formadas o conexiones que permanecen abiertas indefinidamente, utilice la variable de entorno `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` para establecer una longitud máxima de trama en bytes.
- Si ingresa identificadores de secretos y luego elige usar variables de entorno, la variable de entorno es el identificador ingresado y antepuesto con `DD_OP_`. Por ejemplo, si ingresó <code>PASSWORD_1</code> para un identificador de contraseña, la variable de entorno para esa contraseña es `DD_OP_PASSWORD_1`.

### Configuración opcional {#optional-settings}

#### Duración máxima de la conexión {#maximum-connection-duration}

Ingrese la cantidad máxima de segundos para mantener abierta una conexión. Si se deja sin configurar, las conexiones pueden permanecer abiertas indefinidamente.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de Splunk TCP:
	- Hace referencia a la dirección del socket, como `0.0.0.0:9997`, en la que el Observability Pipelines Worker escucha para recibir registros del Splunk Forwarder.
	- El identificador predeterminado es `SOURCE_SPLUNK_TCP_ADDRESS`.
- Identificador de frase de contraseña TLS de Splunk TCP (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_SPLUNK_TCP_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline