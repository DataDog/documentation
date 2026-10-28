---
description: Aprenda a recopilar registros de Amazon S3 utilizando Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente de Amazon S3
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de Amazon S3 de Observability Pipelines para recibir registros de Amazon S3.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la URL de Amazon S3 y, si corresponde, la contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][3], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente de Amazon S3 en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su URL de Amazon S3. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese la región de AWS.

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

- Identificador de URL de Amazon S3:
	- Hace referencia a la URL de la cola SQS a la que el bucket de S3 envía los eventos de notificación.
	- El identificador predeterminado es `SOURCE_AWS_S3_SQS_URL`.
- Identificador de frase de contraseña de TLS de Amazon S3 (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_AWS_S3_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Autenticación de AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### Permisos{#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Métricas de estado {#health-metrics}

Para [métricas de componente][6] y [métricas de búfer de fuente][7] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][8]. Para filtrar o agrupar por métricas de fuente de Amazon S3, utilice la etiqueta `component_type:aws_s3`.

### Métricas de Amazon S3 {#amazon-s3-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- Use la etiqueta `component_type` para filtrar o agrupar por el tipo de fuente.

`pipelines.sqs_message_received_messages_total`
: **Descripción**: La cantidad de mensajes de SQS recibidos.
: **Tipo de métrica**: conteo

`pipelines.sqs_message_processing_succeeded_total`
: **Descripción**: La cantidad de mensajes de SQS procesados correctamente.
: **Tipo de métrica**: conteo

`pipelines.sqs_message_delete_succeeded_total`
: **Descripción**: La cantidad de eliminaciones correctas de mensajes de SQS.
: **Tipo de métrica**: conteo

`pipelines.sqs_message_defer_succeeded_total`
: **Descripción**: La cantidad de mensajes de SQS para los cuales el aplazamiento del tiempo de espera de visibilidad fue exitoso.
: **Tipo de métrica**: count

`pipelines.sqs_s3_event_record_ignored_total`
: **Descripción**: La cantidad de registros de eventos de S3 en un mensaje de SQS que se ignoraron porque no eran tipos de eventos `ObjectCreated`.
: **Tipo de métrica**: count

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **Descripción**: Tiempo, en segundos, necesario para procesar correctamente un objeto de S3.
: **Tipo de métrica**: distribución

`pipelines.s3_object_processing_failed_duration_seconds`
: **Descripción**: Tiempo, en segundos, necesario para procesar un objeto de S3 que falló.
: **Tipo de métrica**: distribución

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/