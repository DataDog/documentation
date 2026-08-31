---
description: Aprenda a enviar registros a un contenedor de Azure Storage, opcionalmente
  para archivado y rehidratación en Datadog.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Azure Storage
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Azure Storage para enviar registros a un contenedor de Azure Storage. Si desea enviar registros a Azure Storage para [archivado][1] y [rehidratación][2], debe [configurar Archivos de registro](#configure-log-archives). Si no desea rehidratar registros en Datadog, pase a [Configurar el destino para su canalización](#set-up-the-destination-for-your-pipeline).

## Configurar Archivos de registro {#configure-log-archives}

Este paso solo es necesario si desea enviar registros a Azure Storage en un formato rehidratable por Datadog para [archivado][1] y [rehidratación][2], y aún no tiene un Datadog Log Archive configurado para Observability Pipelines. Si ya tiene un Datadog Log Archive configurado o no desea rehidratar registros en Datadog, pase a [Configurar el destino para su canalización](#set-up-the-destination-for-your-pipeline).

Necesita tener instalada la [integración de Azure][3] de Datadog para configurar Datadog Log Archives.

#### Cree una cuenta de almacenamiento {#create-a-storage-account}

Cree una [cuenta de almacenamiento de Azure][13] si aún no tiene una.

1. Navegue a [Cuentas de almacenamiento][14].
1. Haga clic en **Create**.
1. Seleccione el nombre de la suscripción y el nombre del recurso que desea utilizar.
1. Ingrese un nombre para su cuenta de almacenamiento.
1. Seleccione una región en el menú desplegable.
1. Seleccione el tipo de cuenta de rendimiento **Estándar** o **Premium**.
1. Haga clic en **Next**.
1. En la sección **Blob storage**, seleccione **Hot** o **Cool**.
1. Haga clic en **Review + create**.

#### Cree un contenedor de almacenamiento {#create-a-storage-bucket}

1. En su cuenta de almacenamiento, haga clic en **Contenedores** en **Almacenamiento de datos** en el menú de navegación izquierdo.
1. Haga clic en **+ Container** en la parte superior para crear un contenedor.
1. Ingrese un nombre para el nuevo contenedor. Este nombre se utiliza más adelante cuando configura el destino de Azure Storage de Observability Pipelines.

**Nota**: No establezca [políticas de inmutabilidad][15] porque es posible que los datos más recientes deban sobrescribirse en casos excepcionales (normalmente cuando hay un tiempo de espera).

#### Conecte el contenedor de Azure a Datadog Log Archives {#connect-the-azure-container-to-datadog-log-archives}

1. Navegue a [Log Forwarding][16] de Datadog.
1. Haga clic en **New archive**.
1. Ingrese un nombre descriptivo para el archive.
1. Agregue una consulta que filtre todos los registros que pasan por las canalizaciones de registros para que ninguno de esos registros vaya a este archivo. Por ejemplo, agregue la consulta `observability_pipelines_read_only_archive`, asumiendo que ningún registro que pasa por la canalización tiene esa etiqueta agregada.
1. Seleccione **Azure Storage**.
1. Seleccione el inquilino y el cliente de Azure en los que se encuentra su cuenta de almacenamiento.
1. Ingrese el nombre de la cuenta de almacenamiento.
1. Ingrese el nombre del contenedor que creó anteriormente.
1. Opcionalmente, ingrese una ruta.
1. Opcionalmente, establezca permisos, agregue etiquetas y defina el tamaño máximo de escaneo para la rehidratación. Consulte [Configuración avanzada][17] para obtener más información.
1. Haga clic en **Guardar**.

Consulte la [documentación de Archivos de registro][1] para obtener información adicional.

## Configure el destino para su canalización {#set-up-the-destination-for-your-pipeline}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese el identificador de la cadena de conexión de Azure. <b>No</b> ingrese el valor real.</div>

Configure el destino de Azure Storage cuando [configure una canalización][4]. Puede configurar una canalización en la [UI][7], usando la [API][8] o con [Terraform][9]. Los pasos en esta sección se configuran en la UI.

Después de seleccionar el destino de Azure Storage en la UI de la canalización:

1. Ingrese el identificador de su cadena de conexión de Azure. Si lo deja en blanco, se utiliza el [default](#secret-defaults).
1. Ingrese el nombre del contenedor de Azure que creó anteriormente.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Prefijo para aplicar a todos los objetos clave {#prefix-to-apply-to-all-key-objects}

Ingrese un prefijo que desee aplicar a todos los objetos clave.

- Los prefijos son útiles para particionar objetos. Por ejemplo, puede usar un prefijo como clave de objeto para almacenar objetos en un directorio en particular. Si usa un prefijo para este propósito, debe terminar en `/` para actuar como una ruta de directorio; una `/` al final no se agrega automáticamente.
- Consulte la [sintaxis de plantilla][6] si desea enrutar registros a diferentes claves de objeto según campos específicos en sus registros.
	- **Nota**: Datadog recomienda que comience sus prefijos con el nombre del directorio y sin una barra diagonal inicial (`/`). Por ejemplo, `app-logs/` o `service-logs/`.

#### Buffering{#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de cadena de conexión de Azure:
	- Hace referencia a la cadena de conexión que le da al Worker acceso a su contenedor de Azure Storage.
	- El identificador predeterminado es `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud{#health-metrics}

Para [métricas de componente][10] y [métricas de búfer de destino][11] emitidas por todos los destinos, consulte la documentación de [métricas de uso de Pipelines][12]. Para filtrar o agrupar por métricas de destino de Azure Storage, utilice la etiqueta `component_type:datadog_archives_azure_blob`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][5] para obtener más información.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 100               | 900                 |

[1]: /es/logs/log_configuration/archives/
[2]: /es/logs/log_configuration/rehydrating/
[3]: /es/integrations/azure/#setup
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/observability_pipelines/destinations/#event-batching
[6]: /es/observability_pipelines/destinations/#template-syntax
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /es/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[14]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[15]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[16]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[17]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings