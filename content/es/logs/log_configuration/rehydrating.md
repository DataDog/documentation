---
aliases:
- /es/logs/historical-views
- /es/logs/archives/rehydrating/
description: Recupera eventos de logs de tus archivos en Datadog.
title: Recuperación de archivos
---

## Información general

La recuperación de logs* te permite recuperar eventos de logs en archivos del cliente optimizados para el almacenamiento y devolverlos al [Explorador de logs][1] optimizado para la búsqueda, de modo que puedas utilizar Datadog para analizar o investigar eventos de logs antiguos o que han sido excluidos de la indexación.

## Vistas históricas

Gracias a las vistas históricas, los equipos pueden recuperar con precisión eventos de logs archivados, utilizando periodos de tiempo y filtros de consulta, para responder de forma eficaz a casos de uso específicos e inesperados.

Para crear una vista histórica:

1. Ve a la página [Recuperar a partir de archivos][3].
3. Haz clic en **New Historical View** (Nueva vista histórica).

Los filtros de exclusión de índices no se aplican a las vistas históricas, por lo que no es necesario modificar los filtros de exclusión cuando la recuperación se realiza a partir de archivos.

Si descargas vistas históricas como CSV, los datos se limitan a los últimos 90 días.

### Añadir nuevas vistas históricas

1. **Elige el periodo de tiempo** durante el cual quieres recuperar eventos de logs.

2. **Selecciona el archivo** desde el que quieres recuperar eventos de logs. Sólo los archivos que están [configurados para utilizar la delegación de roles](#permissions) están disponibles para la recuperación.

3. (Opcional) **Calcula el tamaño del análisis** y obtén la cantidad total de datos comprimidos que contiene tu archivo para el periodo de tiempo seleccionado.

4. **Ponle un nombre a tu vista histórica**. Los nombres deben empezar por una letra minúscula y sólo pueden contener letras minúsculas, números y el carácter `-`.

5. **Introduce la consulta**. La sintaxis de la consulta es la misma que la de las [búsquedas del Explorador de logs][4]. Asegúrate de que tus logs están [archivados con sus etiquetas (tags)][5], si utilizas etiquetas (como `env:prod` o `version:x.y.z`) en la consulta de recuperación.

6. Define el número máximo de logs que deben recuperarse en esta vista histórica. Si se alcanza el límite de recuperación, la recarga se detiene pero sigues teniendo acceso a los logs recuperados.

7. Define el periodo de conservación de logs recuperados (las opciones de conservación disponibles se basan en tu contrato, por defecto son 15 días).

8. (Opcional) **Notifica** cuando finalice la recuperación utilizando [integraciones][6] con la sintaxis @handle.

{{< img src="logs/archives/log_rehydration_setup.png" alt="Recarga a partir de un archivo" style="width:75%;">}}

**Nota**: La consulta se aplica después de que los archivos que coinciden con el periodo de tiempo se descargan de tu archivo. Para reducir el coste de transferencia de datos en la nube, reduce el intervalo de fechas seleccionado.

#### Recuperación mediante consultas

Al crear vistas históricas con consultas específicas (por ejemplo, sobre uno o más servicios, endpoints de URL o ID de clientes), puedes reducir el tiempo y el coste que supone recuperar tus logs. Esto resulta especialmente útil cuando se recuperan logs utilizando intervalos de tiempo más amplios. Puedes recuperar hasta 1000 millones de eventos de logs por cada vista histórica que crees.

#### Notificar

Los eventos se activan automáticamente cuando comienza y termina una recuperación.
Estos eventos están disponibles en tu [Explorador de eventos][7].

Durante la creación de una vista histórica, puedes utilizar las variables de plantilla incorporadas, para personalizar la notificación activada al final de la recuperación:

| Variable                      | Descripción                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Nombre de los archivos utilizados para la recuperación.                           |
| `{{from}}`                    | Inicio del intervalo de tiempo seleccionado para la recuperación.                    |
| `{{to}}`                      | Fin del intervalo de tiempo seleccionado para la recuperación.                      |
| `{{scan_size}}`               | Tamaño total de los archivos procesados durante la recuperación.                |
| `{{number_of_indexed_logs}}`  | Número total de logs recuperados.                                         |
| `{{explorer_url}}`            | Enlace directo a la página de logs recuperados.                                      |

### Ver el contenido de las vistas históricas

#### Desde la página de la vista histórica

Luego de seleccionar "Rehydrate from Archive" (Rehidratar desde archivo), la vista histórica se marca como "pendiente" hasta que su contenido esté listo para ser consultado.

Una vez recuperado el contenido, la vista histórica se marca como activa y el enlace de la columna de consultas envía a la vista histórica del Explorador de logs.

#### Desde el Explorador de logs

También puedes buscar la vista histórica en el Explorador de logs, directamente desde el selector de índices.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Explorador de logs" width="75%">}}

### Cancelación de las vistas históricas en curso

Cancele las recuperaciones en curso directamente en la página Rehidratar desde archivos, para evitar iniciar recuperaciones con un intervalo de tiempo incorrecto o si cometes accidentalmente errores tipográficos en tu consulta de indexación.

Los logs ya indexados seguirán siendo consultables hasta el final del periodo de conservación seleccionado para esa vista histórica y todos los logs analizados e indexados seguirán siendo facturados.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration.png" alt="Cancelación de recuperaciones en curso" width="75%" >}}

### Eliminación de vistas históricas

Las vistas históricas permanecen en Datadog hasta que hayan superado el periodo de conservación seleccionado. También puedes eliminarlas antes, si ya no necesitas la vista. Puedes marcar una vista histórica para eliminarla seleccionando y confirmando el icono de eliminación situado en el extremo derecho de la vista histórica.

La vista histórica se elimina definitivamente una hora después. Antes de que esto suceda, el equipo puede cancelar la eliminación.

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt=Vídeo "Eliminación de vistas históricas"="true" width="75%" >}}

### Visualización de vistas históricas eliminadas

Visualiza vistas históricas eliminadas durante hasta 1 año en el pasado, utilizando el menú desplegable `View`:

{{< img src="logs/archives/log_archives_deleted_rehydrations.png" alt="Eliminación de vistas históricas" width="75%" >}}

## Configuración de la recuperación de archivos

### Definir un archivo de Datadog 

Es necesario configurar un archivo externo para poder recuperar datos a partir de él. [Consulta la guía][8] para archivar tus logs en los destinos disponibles.

### Permisos

Datadog requiere el permiso para leer desde tus archivos, con el fin de recuperar el contenido de ellos. Este permiso puede cambiarse en cualquier momento.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Para recuperar eventos de logs desde tus archivos, Datadog utiliza el rol IAM configurado en tu cuenta AWS para tu [integración AWS][1]. Si aún no has creado ese rol, [sigue estos pasos para hacerlo][2]. Para permitir a ese rol recuperar eventos de logs desde tus archivos, añade la siguiente declaración de permiso a tus políticas IAM. Asegúrate de editar los nombres de los buckets y, si lo prefieres, especifica las rutas que contienen tus archivos de logs.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogUploadAndRehydrateLogArchives",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
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

#### Añadir la delegación de roles a archivos de S3

Datadog sólo admite la recuperación de archivos que se hayan configurado para utilizar la delegación de roles para conceder acceso. Una vez que hayas modificado tu rol IAM Datadog para incluir la política de rol IAM anterior, asegúrate de que cada archivo de tu [página de configuración de archivos][3] tenga la combinación correcta de cuenta + rol AWS.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Agregar la delegación de roles a archivos de S3" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /es/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog utiliza un grupo Azure AD con el rol de colaborador de almacenamiento de datos blob limitado a tu cuenta de almacenamiento de archivos para recuperar eventos de logs. Puedes asignar este rol a tu cuenta de servicio Datadog desde la página de control de acceso (IAM) de tu cuenta de almacenamiento [asignando el rol de colaborador de almacenamiento de datos blob a tu aplicación de integración de Datadog][1].

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="La recuperación desde el almacenamiento de Azure requiere el rol de colaborador de almacenamiento de datos blob" style="width:75%;">}}


[1]: /es/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Para recuperar eventos de logs de tus archivos, Datadog utiliza una cuenta servicio con el rol de visor de objetos de almacenamiento. Puedes asignar este rol a tu cuenta de servicio Datadog desde la [página de administración IAM de Google Cloud][1], editando los permisos de la cuenta de servicio, añadiendo otro rol y luego seleccionando Storage > Storage Object Viewer (Almacenamiento > Visor de objetos de almacenamiento).

{{< img src="logs/archives/log_archives_gcs_role.png" alt="La recuperación desde GCS requiere el rol de visor de objetos de almacenamiento" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

*Log Rehydration es una marca comercial de Datadog, Inc.

[1]: /es/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /es/logs/explorer/search/
[5]: /es/logs/archives/?tab=awss3#datadog-tags
[6]: /es/integrations/#cat-notification
[7]: /es/events/
[8]: /es/logs/archives/