---
description: Aprenda a enviar registros a un bucket de Google Cloud Storage, opcionalmente
  para archivado y rehidratación en Datadog.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Google Cloud Storage
---
{{< product-availability >}}

## Descripción general {#overview}

<div class="alert alert-info">Para las versiones 2.7 y posteriores de Worker, el destino de Google Cloud admite <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">acceso uniforme a nivel de bucket</a>. Google <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">recomienda</a> usar el acceso uniforme a nivel de bucket. <br>Para versiones de Worker anteriores a la 2.7, solo se admiten <a href = "https://cloud.google.com/storage/docs/access-control/lists">Access</a> Control Lists.</div>

Utilice el destino de Google Cloud Storage para enviar sus registros a un bucket de Google Cloud Storage. Si desea enviar registros a Google Cloud Storage para [archiving][1] y [rehydration][2], debe [configurar Log Archives](#configure-log-archives). Si no desea rehidratar registros en Datadog, salte a [Configurar el destino para su canalización](#set-up-the-destinations).

El Observability Pipelines Worker utiliza métodos de autenticación estándar de Google. Consulte [Authentication methods at Google][6] para obtener más información sobre cómo elegir el método de autenticación para su caso de uso.

## Configurar Log Archives {#configure-log-archives}

Este paso solo es necesario si desea enviar registros a Google Cloud Storage para [archiving][1] y [rehydration][2], y aún no tiene un Datadog Log Archive configurado para Observability Pipelines. Si ya tiene un Datadog Log Archive configurado o no desea rehidratar sus registros en Datadog, salte a [Configurar el destino para su canalización](#set-up-the-destinations).

Si ya tiene un Datadog Log Archive configurado para Observability Pipelines, salte a [Configurar el destino para su canalización](#set-up-the-destination-for-your-pipeline).

Necesita tener instalada la integración de Google Cloud Platform de Datadog para configurar Datadog Log Archives.

### Crear un bucket de almacenamiento {#create-a-storage-bucket}

1. Navegue a [Google Cloud Storage][16].
1. En la página Buckets, haga clic en **Crear** para crear un bucket para sus archivos.
1. Ingrese un nombre para el bucket y elija dónde almacenar sus datos.
1. Seleccione **Fine-grained** en la sección **Choose how to control access to objects**.
1. No agregue una política de retención porque los datos más recientes deben sobrescribirse en algunos casos poco frecuentes (normalmente un caso de tiempo de espera).
1. Haga clic en **Create**.

### Cree una cuenta de servicio para permitir que los Workers escriban en el bucket {#create-a-service-account-to-allow-workers-to-write-to-the-bucket}

1. Cree una [cuenta de servicio][17] de Google Cloud Storage.
    - Otorgue a la cuenta de servicio permisos para su bucket con los permisos `Storage Admin` y `Storage Object Admin`.
    - Si desea autenticarse con un archivo de credenciales, descargue el archivo de clave de la cuenta de servicio y colóquelo en `DD_OP_DATA_DIR/config`. Usted hace referencia a este archivo cuando configura el [destino de Google Cloud Storage](#set-up-the-destinations) más adelante.
1. Siga estas [instrucciones][18] para crear una clave de cuenta de servicio. Elija `json` para el tipo de clave.

### Conecte el bucket de almacenamiento a Datadog Log Archives {#connect-the-storage-bucket-to-datadog-log-archives}

1. Vaya a [Log Forwarding][19] de Datadog.
1. Haga clic en **New archive**.
1. Ingrese un nombre descriptivo para el archivo.
1. Agregue una consulta que filtre todos los registros que pasan por las canalizaciones de registros para que ninguno de esos registros vaya a este archivo. Por ejemplo, agregue la consulta `observability_pipelines_read_only_archive`, asumiendo que ningún registro que pase por la canalización tiene esa etiqueta agregada.
1. Seleccione **Google Cloud Storage**.
1. Seleccione la cuenta de servicio en la que se encuentra su bucket de almacenamiento.
1. Seleccione el proyecto.
1. Ingrese el nombre del bucket de almacenamiento que creó anteriormente.
1. Opcionalmente, ingrese una ruta.
1. Opcionalmente, establezca permisos, agregue etiquetas y defina el tamaño máximo de escaneo para la rehidratación. Consulte [Configuración avanzada][20] para obtener más información.
1. Haga clic en **Guardar**.

Consulte la [documentación de Log Archives][1] para obtener información adicional.

## Configure el destino para su canalización {#set-up-the-destinations}

Configure el destino de Google Cloud Storage cuando [configure una canalización][4]. Puede configurar una canalización en el [UI][10], usando la [API][11] o con [Terraform][12]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Google Cloud Storage en el pipeline UI:

1. Ingrese el nombre de su bucket de almacenamiento de Google Cloud. Si configuró Log Archives, es el bucket que creó anteriormente.
1. Si tiene un archivo JSON de credenciales, ingrese la ruta a su archivo JSON de credenciales. Si configuró Log Archives, son las credenciales que descargó [anteriormente](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. Alternativamente, puede usar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta de la credencial.
    - Si está utilizando [workload identity][9] en Google Kubernetes Engine (GKE), la `GOOGLE_APPLICATION_CREDENTIALS` se proporciona para usted.
    - El Worker utiliza métodos de autenticación de [Google estándar][8].
1. Seleccione la clase de almacenamiento para los objetos creados.
1. Seleccione el nivel de acceso de los objetos creados.

### Configuración opcional {#optional-settings}

#### Prefijo para aplicar a todos los objetos clave {#prefix-to-apply-to-all-key-objects}

Ingrese un prefijo que desee aplicar a todos los objetos clave.

- Los prefijos son útiles para particionar objetos. Por ejemplo, puede usar un prefijo como clave de objeto para almacenar objetos en un directorio particular. Si usa un prefijo para este propósito, debe terminar en `/` para actuar como una ruta de directorio; no se añade automáticamente un `/` al final.
- Consulte la [sintaxis de plantilla][7] si desea enrutar registros a diferentes claves de objeto según campos específicos en sus registros.
  - **Nota**: Datadog recomienda que comience sus prefijos con el nombre del directorio y sin una barra diagonal inicial (`/`). Por ejemplo, `app-logs/` o `service-logs/`.

#### Metadatos {#metadata}

1. Haga clic en {{< ui >}}Add Header{{< /ui >}} para agregar metadatos.
1. Ingrese los valores para el nombre y el valor del encabezado.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secretos para configurar.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de estado {#health-metrics}

Para [component metrics][13] y [destination buffer metrics][14] emitidas por todos los destinos, consulte la documentación de [Pipelines Usage Metrics][15]. Para filtrar o agrupar por métricas de destino de Google Cloud Storage, use la etiqueta `component_type:datadog_archives_gcs`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][5] para obtener más información.

| Eventos máximos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 100               | 900                 |

[1]: /es/logs/log_configuration/archives/
[2]: /es/logs/log_configuration/rehydrating/
[3]: /es/integrations/google_cloud_platform/#setup
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /es/observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /es/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[15]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://console.cloud.google.com/storage
[17]: https://console.cloud.google.com/iam-admin/serviceaccounts
[18]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[19]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[20]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings