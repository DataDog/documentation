---
disable_toc: false
title: Destino de Amazon S3
---

El destino de Amazon S3 se encuentra disponible para la [plantilla de Archivar logs][1]. Usa este destino a fin de enviar tus logs en un formato que pueda volver a usar Datadog a un bucket de Amazon S3 para archivarlos. Debes configurar los [archivos de log de Datadog][2] si aún no lo has hecho y, a continuación, configurar el destino en la interfaz de usuario del pipeline.

## Configurar los archivos de log

Si ya tienes un archivo de log de Datadog configurado para Observability Pipelines, pasa a [Configurar el destino para tu pipeline](#set-up-the-destination-for-your-pipeline).

Debes tener instalada la [integración de AWS][3] de Datadog para configurar los archivos de log de Datadog.

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/configure_log_archive/amazon_s3/connect_s3_to_datadog_log_archives %}}

## Configurar el destino para tu pipeline

Configura el destino de Amazon S3 y sus variables de entorno cuando [configures un pipeline de Archivar logs][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

### Establecer las variables de entorno

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

## Funcionamiento del destino

### Procesamiento por lotes de eventos

Se elimina un lote de eventos cuando se cumple uno de estos parámetros. Consulta el [procesamiento por lotes de eventos][4] para obtener más información.

| Máximo de eventos     | Máximo de bytes       | Tiempo de espera (segundos)   |
|----------------| ----------------| --------------------|
| Ninguno           | 100,000,000     | 900                 |

[1]: /es/observability_pipelines/archive_logs/
[2]: /es/logs/log_configuration/archives/
[3]: /es/integrations/amazon_web_services/#setup
[4]: /es/observability_pipelines/destinations/#event-batching