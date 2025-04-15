---
disable_toc: false
title: Destino Google Cloud Storage
---

El destino Google Cloud Storage está disponible para la plantilla [Logs de archivos][1]. Utiliza este destino para enviar tus logs en formato rehidratable en Datadog a un bucket de Google Cloud Storage para archivarlos. Debes configurar [logs de archivos de Datadog][2], si aún no lo has hecho y, a continuación, debes configurar el destino en la interfaz de usuario del pipeline.

## Configurar archivos de logs

Si ya tienes un archivo de log de Datadog configurado para Observability Pipelines, ve directamente a [Configurar el destino de tu pipeline](#set-up-the-destination-for-your-pipeline).

Para configurar archivos de logs de Datadog necesitas tener instalada la [integración Google Cloud Platform][3] de Datadog.

{{% observability_pipelines/configure_log_archive/google_cloud_storage/instructions %}}

## Configurar el destino de tu pipeline

Configura el destino Amazon S3 y sus variables de entorno cuando [configures un pipeline de logs de archivos][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

{{% observability_pipelines/destination_settings/datadog_archives_google_cloud_storage %}}

### Configurar las variables de entorno 

{{% observability_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

## Cómo funciona el destino

### Colocación de eventos en lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Para obtener más información, consulta la [colocación de eventos en lotes][4].

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------| ----------------| --------------------|
| Ninguno           | 100,000,000     | 900                 |

[1]: /es/observability_pipelines/archive_logs/
[2]: /es/logs/log_configuration/archives/
[3]: /es/integrations/google_cloud_platform/#setup
[4]: /es/observability_pipelines/destinations/#event-batching