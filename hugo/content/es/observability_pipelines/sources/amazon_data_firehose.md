---
description: Aprenda a recopilar registros de Amazon Data Firehose mediante el Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente de Amazon Data Firehose
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de Amazon Data Firehose de Observability Pipelines para recibir registros de Amazon Data Firehose.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección de Amazon Data Firehose y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][3], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente de Amazon Data Firehose en la pipeline UI, ingrese el identificador para su dirección de Amazon Data Firehose. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Autenticación de AWS {#aws-authentication}

Seleccione una opción de {{< ui >}}AWS authentication{{< /ui >}}. Si selecciona {{< ui >}}Assume role{{< /ui >}}:
1. Ingrese el ARN del rol de IAM que desea asumir.
1. Opcionalmente, ingrese el nombre de la sesión del rol asumido y el ID externo.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Administración de secretos" %}}

- Identificador de la dirección de Amazon Data Firehose:
	- Hace referencia a la dirección del socket en la que Observability Pipelines Worker escucha para recibir registros.
	- El identificador predeterminado es `SOURCE_AWS_DATA_FIREHOSE_ADDRESS`.
- Identificador de la frase de contraseña TLS de Amazon Data Firehose (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_AWS_DATA_FIREHOSE_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe registros al Observability Pipelines Worker a través de Amazon Data Firehose {#send-logs-to-the-observability-pipelines-worker-over-amazon-data-firehose}

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## Autenticación de AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### Permisos{#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Métricas de estado {#health-metrics}

Para [métricas de componente][6] y [métricas de búfer de fuente][7] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][8]. Para filtrar o agrupar por las métricas de la fuente de Amazon Data Firehose, utilice la etiqueta `component_type:aws_kinesis_firehose`.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/