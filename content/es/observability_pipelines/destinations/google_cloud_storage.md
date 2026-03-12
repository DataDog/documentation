---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino Google Cloud Storage
---

{{< product-availability >}}

<div class="alert alert-info">Para las versiones 2.7 y posteriores del worker, el destino Google Cloud admite el <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">acceso uniforme a nivel de bucket</a>. Google <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">recomienda</a> utilizar el acceso uniforme a nivel de bucket. <br>Para las versiones del worker anteriores a la 2.7, solo se admiten <a href = "https://cloud.google.com/storage/docs/access-control/lists">listas de control de acceso</a>.</div>

Utiliza el destino Google Cloud Storage para enviar tus logs a un bucket de Google Cloud Storage. Si quieres enviar logs a Google Cloud Storage para [archivar][1] y [rehidratar][2], debes [configurar archivos de logs](#configure-log-archives). Si no quieres rehidratar logs en Datadog, ve directamente a [Configurar el destino de tu pipeline](#set-up-the-destinations).

El worker de Observability Pipelines utiliza los métodos de autenticación estándar de Google. Consulta [Métodos de autenticación en Google][6] para obtener más información sobre cómo elegir el método de autenticación para tu uso caso.

## Configurar archivos de logs

Este paso solo es necesario si quieres enviar logs a Google Cloud Storage para [archivar][1] y [rehidratar][2] y aún no tienes un archivo de logs de Datadog configurado para Observability Pipelines. Si ya tienes configurado un archivo de logs de Datadog o no quieres rehidratar tus logs en Datadog, ve directamente a [Configurar el destino de tu pipeline](#set-up-the-destinations).

Si ya tienes un archivo de log de Datadog configurado para Observability Pipelines, ve directamente a [Configurar el destino de tu pipeline](#set-up-the-destination-for-your-pipeline).

Para configurar archivos de logs de Datadog necesitas tener instalada la [integración Google Cloud Platform][3] de Datadog.

{{% observability_pipelines/configure_log_archive/google_cloud_storage/instructions %}}

## Configurar el destino de tu pipeline {#set-up-the-destinations}

Configura el destino Google Cloud Storage y sus variables de entorno cuando [configures un pipeline de archivo de logs][4]. La siguiente información se configura en la interfaz de usuario del pipeline.

1. Introduce el nombre de tu bucket de Google Cloud Storage. Si configuraste archivos de logs, es el bucket que creaste anteriormente.
1. Si tienes un archivo JSON de credenciales, introduce la ruta de acceso a tu archivo JSON de credenciales. Si configuraste archivos de logs, son las credenciales que descargaste [anteriormente](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. Alternativamente, puedes utilizar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta de acceso a credenciales.
    - Si utilizas la [identidad de cargas de trabajo][9] en Google Kubernetes Engine (GKE), se te proporcionará la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS`.
    - El worker utiliza [métodos de autenticación de Google][8] estándar.
1. Selecciona la clase de almacenamiento para los objetos creados.
1. Selecciona el nivel de acceso de los objetos creados.
1. Opcionalmente, introduce el prefijo.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes utilizar un prefijo como clave de objeto para almacenar objetos en un directorio concreto. Si se utiliza un prefijo con este fin, debe terminar en `/` para que actúe como una ruta de directorio; no se añade automáticamente un `/` al final.
    - Consulta la [sintaxis de plantillas][7] si quieres dirigir los logs a diferentes claves de objeto en función de campos específicos de tus logs.
     - **Nota**: Datadog recomienda empezar los prefijos con el nombre del directorio y sin barra oblicua (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Si lo deseas, haz clic en **Add Header** (Añadir encabezado) para añadir metadatos.
{{% observability_pipelines/destination_buffer_numbered %}}

### Configurar secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores secretos que configurar.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta [lote de eventos][5] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------| ----------------| --------------------|
| Ninguno           | 100,000,000     | 900                 |

[1]: /es/logs/log_configuration/archives/
[2]: /es/logs/log_configuration/rehydrating/
[3]: /es/integrations/google_cloud_platform/#setup
[4]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /es/observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /es/observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity