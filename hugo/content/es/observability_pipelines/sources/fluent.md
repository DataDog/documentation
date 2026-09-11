---
description: Aprenda a recopilar registros de un agente Fluentd o Fluent Bit usando
  el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuentes de Fluentd y Fluent Bit
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Fluentd o Fluent Bit de Observability Pipelines para recibir registros de su agente Fluentd o Fluent Bit.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/fluent %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección Fluent y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][3], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Fluent en la UI de la canalización, ingrese el identificador para su dirección Fluent. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección Fluent:
	- Hace referencia a la dirección en la que Observability Pipelines Worker escucha los mensajes de registro entrantes.
	- El identificador predeterminado es `SOURCE_FLUENT_ADDRESS`.
- Identificador de frase de contraseña TLS de Fluent (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_FLUENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe registros al Observability Pipelines Worker a través de Fluent {#send-logs-to-the-observability-pipelines-worker-over-fluent}

{{% observability_pipelines/log_source_configuration/fluent %}}

## Métricas de salud {#health-metrics}

Para [métricas de componente][6] y [métricas de búfer de fuente][7] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][8]. Para filtrar o agrupar por métricas de origen de Fluent, utilice la etiqueta `component_type:fluent`.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/