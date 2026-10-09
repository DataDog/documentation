---
aliases:
- /es/logs/historical-views
- /es/logs/archives/rehydrating/
description: Capture registros de sus archivos de vuelta a Datadog.
further_reading:
- link: logs/archives
  tag: Documentación
  text: Documentación de archivos de registro
- link: /logs/explorer/archive_search/
  tag: Documentación
  text: Archive Search
title: Log Rehydration desde archivos
---
<div class="alert alert-info">
<strong><a href="/logs/explorer/archive_search/">Archive Search</a> es la forma recomendada de acceder a registros archivados.</strong><br>
Transmite resultados en tiempo real directamente desde su archivo sin reindexar, y cobra solo por los datos escaneados. Cuando necesite acceso completo a la plataforma o una retención más larga, use el modo <strong>Search &amp; Rehydration</strong> de Archive Search.
</div>

## Descripción general {#overview}

Log Rehydration* le permite capturar registros desde archivos optimizados para almacenamiento de clientes de vuelta al [Log Explorer][1], para que pueda usar Datadog para analizar o investigar registros que sean antiguos o que fueron excluidos de la indexación.

### Vistas históricas {#historical-views}

Con las vistas históricas, los equipos rehidratan registros archivados por marco de tiempo y filtro de consulta para satisfacer casos de uso específicos e inesperados de manera eficiente. Al crear vistas históricas con consultas específicas (por ejemplo, sobre uno o más servicios, puntos finales de URL o ID de cliente), puede reducir el tiempo y el costo involucrados en la rehidratación de sus registros. Esto es especialmente útil al rehidratar sobre rangos de tiempo más amplios.

**Características clave:**
- Rehidrate hasta 1 mil millones de registros por vista histórica
- Los filtros de exclusión de índice no se aplican a las vistas históricas, por lo que no hay necesidad de modificar los filtros de exclusión cuando rehidrata desde archivos
- Si descarga vistas históricas como un CSV, los datos están limitados a los últimos 90 días

## Requisitos previos {#prerequisites}

Antes de que pueda rehidratar registros desde archivos, necesita completar los siguientes pasos de configuración:

### Configuración de archivo {#archive-configuration}

Debe tener un archivo externo configurado para rehidratar datos desde él. Para archivar sus registros en los destinos disponibles (Amazon S3, Azure Storage o Google Cloud Storage), consulte [Log Archives][8].

### Permisos y autenticación {#permissions-and-authentication}

Datadog requiere permiso para leer de sus archivos para rehidratar el contenido. Los archivos deben estar configurados con la autenticación adecuada:

- **S3**: Debe usar delegación de roles (roles de IAM)
- **Azure Storage**: Debe usar Microsoft Entra ID con el rol de Colaborador de datos de Storage Blob
- **Google Cloud Storage**: Debe usar una cuenta de servicio con el rol de Visor de objetos de almacenamiento

Solo los archivos con la autenticación adecuada están disponibles para la rehidratación. Para obtener instrucciones de configuración detalladas, consulte [Permisos específicos de la nube](#cloud-specific-permissions).

## Rehidratación de registros con vistas históricas {#rehydrating-logs-with-historical-views}

1. Vaya a la página [Rehydration][3].
2. Haga clic en {{< ui >}}New Historical View{{< /ui >}}.
3. Seleccione el período de tiempo para la rehidratación.
4. Elija el archivo del que desea rehidratar eventos de registro. Solo los archivos que están [configurados para usar delegación de roles](#permissions) están disponibles para la rehidratación.
5. (Opcional) Estime el tamaño del escaneo y obtenga la cantidad total de datos comprimidos que contiene su archivo para el período de tiempo seleccionado.
6. Asigne un nombre a su visualizar histórica. Los nombres deben comenzar con una letra minúscula y solo pueden contener letras minúsculas, números y el carácter `-`.
7. Establezca la consulta de indexación utilizando la [Log Explorer search syntax][4]. Asegúrese de que sus registros estén [archivados con sus etiquetas][5] si utiliza etiquetas (como `env:prod` o `version:x.y.z`) en la consulta de rehidratación.
8. Defina el límite de registros (máximo de registros a rehidratar). Cuando se alcanza el límite de la rehidratación, la recarga de registros se detiene, pero usted aún tiene acceso a los registros rehidratados.
9. Establezca el período de retención de los registros rehidratados. Esto define cuánto tiempo permanecen buscables los registros rehidratados. Las retenciones disponibles se basan en su contrato, el valor predeterminado es 15 días.
10. (Opcional) [Configure notificaciones de finalización](#rehydration-notifications) a través de [integrations][6] con la sintaxis @handle.

Para obtener más información sobre el tamaño de escaneo de rehidratación, consulte [Understanding rehydration scan sizes](#understanding-rehydration-scan-sizes).


## Gestión de las visualizar históricas {#historical-views-management}

### Contenido de la visualizar histórica {#viewing-historical-view-content}

**Desde la página de la visualizar histórica**:
Después de seleccionar "Rehydrate from Archive", la visualizar histórica se marca como "PENDING" hasta que su contenido esté listo para ser consultado.

Después de que el contenido se rehidrata, la visualizar histórica se marca como "ACTIVE", y el enlace en la columna de consulta lleva a la visualizar histórica en el Log Explorer.

**Desde el Log Explorer**:
En el Log Explorer, abra la {{< ui >}}Index{{< /ui >}} faceta en el selector de índices. Seleccione los índices históricos para incluir en su búsqueda.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Explorador de registros" width="90%">}}

### Cancelación de visualizar históricas en curso {#canceling-ongoing-historical-views}

Cancele las rehidrataciones en curso desde la página [Rehydration][3] para detener los trabajos con rangos de tiempo incorrectos o con errores tipográficos en la consulta de indexación.

Los registros que ya han sido indexados permanecen consultables hasta el final del período de retención seleccionado para la visualización histórica. Todos los registros escaneados e indexados seguirán siendo facturados.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration_settings.png" alt="Cancelación de rehidrataciones de visualizar históricas en curso en Datadog" width="90%" >}}

### Eliminación de las visualizar históricas {#deleting-historical-views}

Las visualizar históricas permanecen en Datadog hasta que exceden el período de retención seleccionado, a menos que elija eliminarlas antes. Para eliminar una visualizar histórica manualmente, seleccione el icono de eliminar en el extremo derecho de la visualizar y confirme la acción.

La visualizar histórica se elimina permanentemente un día después de que se inicia la eliminación. Hasta entonces, el equipo puede cancelar la eliminación de la visualizar.

### Visualizar históricas eliminadas {#viewing-deleted-historical-views}

Vea las visualizar históricas eliminadas hasta 1 año atrás usando el menú desplegable {{< ui >}}View{{< /ui >}}:

{{< img src="logs/archives/log_archives_deleted_rehydrations_settings.png" alt="Visualizar históricas eliminadas en Datadog" width="90%" >}}

## Configuración avanzada {#advanced-configuration}

### Notificaciones de rehidratación {#rehydration-notifications}

Los eventos se activan automáticamente cuando una rehidratación comienza y termina. Estos eventos están disponibles en su [Explorador de eventos][7].

Puede usar las variables de plantilla integradas para personalizar la notificación activada al final de la rehidratación:

| Variable                      | Descripción                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Name of the archives used for the rehydration.                           |
| `{{from}}`                    | Start of the time range selected for the rehydration.                    |
| `{{to}}`                      | End of the time range selected for the rehydration.                      |
| `{{scan_size}}`               | Total size of the files processed during the rehydration.                |
| `{{number_of_indexed_logs}}`  | Total number of rehydrated logs.                                         |
| `{{explorer_url}}`            | Enlace directo a los registros rehidratados.                                      |

### Límite predeterminado para visualizar históricas {#default-limit-for-historical-views}

Los administradores con el permiso `Logs Write Archives` pueden configurar controles predeterminados para garantizar un uso eficiente de Log Rehydration* en todos los equipos. Haga clic en {{< ui >}}Settings{{< /ui >}} para configurar:

- {{< ui >}}Default Rehydration volume limit{{< /ui >}}: Defina el número predeterminado de logs (en millones) que se pueden rehidratar por visualizar histórica. Si se alcanza el límite, la rehidratación se detiene automáticamente, pero los logs ya rehidratados permanecen accesibles en la visualizar. Los administradores también pueden permitir que este límite se anule durante la creación de la visualizar.

- {{< ui >}}Rehydration retention periods{{< /ui >}}: Elija qué períodos de retención están disponibles al crear rehidrataciones. Solo las duraciones seleccionadas (por ejemplo, 3, 7, 15, 30, 45, 60, 90 o 180 días) aparecen en el menú desplegable al seleccionar cuánto tiempo deben permanecer los logs buscables en Datadog.

### Permisos específicos de la nube {#cloud-specific-permissions}

Datadog requiere el permiso para leer de sus archivos para rehidratar contenido de ellos. Este permiso puede cambiarse en cualquier momento.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Para rehidratar eventos de registro de sus archivos, Datadog utiliza el rol de IAM en su cuenta de AWS que configuró para [su integración de AWS][1]. Si aún no ha creado ese rol, [siga estos pasos para hacerlo][2]. Si ese rol tiene la política de [Establecer permisos de archivo][4], omita la siguiente declaración. De lo contrario, agregue la siguiente declaración de permiso a las políticas de IAM del rol. Asegúrese de editar los nombres de los buckets y, si lo desea, especifique las rutas que contienen sus archivos de registro.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogRehydrateLogArchives",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1>",
        "arn:aws:s3:::<MY_BUCKET_NAME_2>"
      ]
    }
  ]
}
```

#### Adición de delegación de roles a archivos S3 {#adding-role-delegation-to-s3-archives}

Datadog admite la rehidratación solo desde archivos que utilizan delegación de roles para otorgar acceso. Después de modificar su rol de IAM de Datadog para incluir la política de IAM anterior, asegúrese de que cada archivo en su [página de configuración de archivos][3] tenga la combinación correcta de cuenta de AWS + rol.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Adición de delegación de roles a archivos S3" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /es/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
[4]: /es/logs/log_configuration/archives/?tab=awss3#set-permissions
{{% /tab %}}

{{% tab "Almacenamiento de Azure" %}}

Datadog utiliza un grupo de Microsoft Entra ID con el rol de Colaborador de datos de blobs de almacenamiento limitado a la cuenta de almacenamiento de sus archivos para rehidratar eventos de registro. Puede otorgar este rol a su cuenta de servicio de Datadog desde la página de Access Control (IAM) de su cuenta de almacenamiento [asignando el rol de Colaborador de datos de blobs de almacenamiento a su aplicación de integración de Datadog][1].

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="La rehidratación desde Almacenamiento de Azure requiere el rol de Colaborador de datos de blobs de almacenamiento" style="width:75%;">}}


[1]: /es/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Almacenamiento de Google Cloud" %}}

Para rehidratar eventos de registro desde sus archivos, Datadog utiliza una cuenta de servicio con el rol de Visualizador de objetos de almacenamiento. Puede otorgar este rol a su cuenta de servicio de Datadog desde la [página de administración de IAM de Google Cloud][1] editando los permisos de la cuenta de servicio, agregando otro rol y luego seleccionando {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="La rehidratación desde GCS requiere el rol de Visualizador de objetos de almacenamiento" style="width:75%;">}}

El rol {{< ui >}}Storage Object Viewer{{< /ui >}} es la configuración recomendada por Datadog. Si su organización requiere un rol personalizado de privilegios mínimos, se necesitan los siguientes permisos individuales para la rehidratación:

- `storage.objects.get`
- `storage.objects.list`

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}


## Comprender los tamaños de escaneo de rehidratación {#understanding-rehydration-scan-sizes}

La consulta se aplica _después_ de que los archivos que coinciden con el período de tiempo se descargan desde su archivo. Como resultado, el tamaño del escaneo de rehidratación se basa en el **volumen total de registros recuperados del archivo**, no en la cantidad de registros que coinciden con la consulta. El almacenamiento de archivos se basa en el tiempo, por lo que las consultas limitadas a filtros específicos (como `service:A`) aún recuperan todos los registros dentro de la ventana de tiempo seleccionada. Esto incluye registros de otros servicios (como `service:A` y `service:B`).

Reducir el rango de fechas es la forma más efectiva de limitar el tamaño del escaneo y minimizar los costos de transferencia de datos en la nube, porque los filtros de consulta se aplican después de que se descargan los datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca comercial de Datadog, Inc.

[1]: /es/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /es/logs/explorer/search/
[5]: /es/logs/archives/?tab=awss3#datadog-tags
[6]: /es/integrations/#cat-notification
[7]: /es/events/
[8]: /es/logs/archives/