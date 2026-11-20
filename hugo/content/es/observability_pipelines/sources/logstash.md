---
description: Aprenda a recopilar registros de un agente Logstash usando el Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Logstash
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Logstash de Observability Pipelines para recibir registros de su agente Logstash.

También puede utilizar la fuente Logstash para [enviar registros a Observability Pipelines usando Filebeat][2].

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/logstash%}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección de Logstash y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar un pipeline en la [UI][4], utilizando la [API][5] o con [Terraform][6]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Logstash en la pipeline UI, ingrese el identificador para su dirección de Logstash. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración de TLS opcional {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de Logstash:
	- Hace referencia a la dirección en la que Observability Pipelines Worker escucha los mensajes de registro entrantes.
	- El identificador predeterminado es `SOURCE_LOGSTASH_ADDRESS`.
- Identificador de frase de contraseña TLS de Logstash (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_LOGSTASH_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe registros al Observability Pipelines Worker a través de Logstash {#send-logs-to-the-observability-pipelines-worker-over-logstash}

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: /es/observability_pipelines/sources/filebeat/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /es/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline