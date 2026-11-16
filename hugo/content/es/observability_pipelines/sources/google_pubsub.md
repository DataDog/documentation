---
description: Aprenda a extraer registros de Google Cloud Pub/Sub utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente de Google Pub/Sub
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de Google Pub/Sub de Observability Pipelines para extraer registros del sistema de mensajería de Google Cloud Pub/Sub.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/google_pubsub %}}

## Configuración {#setup}

Configure esta fuente cuando [configure una canalización][1]. Puede configurar un pipeline en la [UI][5], utilizando la [API][6] o con [Terraform][7]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente de Google Pub/Sub en la pipeline UI:

1. Ingrese el nombre del proyecto fuente.
1. Si tiene un archivo JSON de credenciales, ingrese la ruta a su archivo JSON de credenciales. El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. Alternativamente, puede usar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta de la credencial.
    - Si está utilizando [workload identity][2] en Google Kubernetes Engine (GKE), el `GOOGLE_APPLICATION_CREDENTIALS` se proporciona para usted.
    - El Worker utiliza los [Google authentication methods] estándar.
1. Ingrese el nombre de la suscripción.
1. Seleccione el decodificador que desea utilizar (Bytes, GELF, JSON, syslog).

### Configuración de TLS opcional {#optional-tls-settings}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador de la frase de contraseña de la clave TLS. <b>No</b> ingrese el valor real.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secreto predeterminados para esta fuente.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [métricas de componente][8] y [métricas de búfer de fuente][9] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][10]. Para filtrar o agrupar por métricas de fuente de Google Pub/Sub, utilice la etiqueta `component_type:gcp_pubsub`.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/