---
aliases:
- /es/logs/guide/enrichment-tables/
- /es/logs/guide/reference-tables/
- /es/integrations/guide/reference-tables
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Uso del procesador de búsquedas para enriquecer logs a partir de una tabla
    de referencia
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: Documentación
  text: Filtrar logs a partir de tablas de referencia
- link: /sheets/#lookup
  tag: Documentación
  text: Consulta de hojas
- link: /service_management/events/pipelines_and_processors/lookup_processor/
  tag: Documentación
  text: Procesador de búsqueda de eventos
- link: '/cloud_cost_management/tag_pipelines/#map-multiple-tags'
  tag: Documentación
  text: Uso de las tablas de referencia para añadir varias etiquetas (tags) a los
    datos de costes
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Añade más contexto a tus logs con tablas de referencia
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: Blog
  text: Enriquecer tu telemetría existente en Datadog con metadatos personalizados
    mediante tablas de referencia
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: Blog
  text: Añadir más contexto a las detecciones e investigaciones de Cloud SIEM con
    las tablas de referencia de Datadog
title: Tablas de referencia
---

## Información general

Las tablas de referencia te permiten combinar metadatos personalizados con información ya existente en Datadog. Puedes definir nuevas entidades como detalles de clientes, nombres e información de servicios o direcciones IP cargando un archivo CSV que contenga una tabla de información. Las entidades están representadas por una clave primaria en una tabla de referencia y los metadatos asociados.

{{< img src="reference_tables/reference-table.png" alt="Tabla de referencia con datos rellenados en las columnas de id de organización, nombre de organización, organización principal, propietario de cuenta y csm" style="width:100%;">}}

Por ejemplo, podrás:

- **Enriquecer los logs y los datos de seguridad para agilizar las investigaciones:** Correlaciona logs, trazas y eventos de seguridad con el contexto empresarial actualizado, como nombres de clientes, propietarios de cuentas, información sobre amenazas o descripciones de códigos de error, para acelerar la resolución de problemas y los análisis.
- **Agrupar usuarios y recursos para el análisis y la gestión de costes orientados:** Agrupa usuarios, clientes o recursos en la nube en segmentos significativos (como niveles de usuario, equipos o unidades de negocios) para un análisis de productos más profundos y una atribución de costes precisa utilizando herramientas como Tag Pipelines.
- **Mejorar los datos para realizar consultas e informes avanzados:** Une datos externos de Tablas de referencia en Hojas, Editor DDSQL o Espacios de trabajo de logs para realizar consultas complejas, agregaciones y crear informes personalizados sin conocimientos técnicos.

## Reglas de validación

Los nombres de las tablas de referencia y los encabezados de las columnas se validan utilizando las siguientes convenciones de nomenclatura y, si es necesario, se actualizan o normalizan automáticamente.

| Regla     | Normalización |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Los nombres y las cabeceras no pueden duplicarse.                                           | Los nombres duplicados se enumeran. Por ejemplo, si `fileid` se utiliza dos veces como nombre, la primera instancia se convierte en `fileid1` y la segunda instancia en `fileid2`. Si se enumera un nombre o encabezado y supera los 56 caracteres, se rechaza y es necesario cambiar su nombre. |
| Los nombres y encabezados no pueden contener letras mayúsculas.                               | Los nombres con letras mayúsculas se convierten a minúsculas. Esta conversión puede dar lugar a nombres duplicados, que luego se enumeran. Por ejemplo, `Fileid` y `FileID` se convierten en `fileid` y se enumeran en `fileid1` y `fileid2` respectivamente. |
| Los nombres y los encabezados no pueden contener espacios.                                          | Los espacios que no sean iniciales ni finales se sustituyen por caracteres de subrayado `_`. Se eliminan los espacios iniciales y finales. Por ejemplo, `customer names` se sustituye por `customer_names`. |
| Los nombres y los encabezados deben empezar por minúscula.                             | Los caracteres en mayúsculas se convierten a minúsculas. Se eliminan los caracteres iniciales que no sean letras. Por ejemplo, `23Two_three` se convierte en `two_three`.   |
| Los nombres y los encabezados sólo admiten letras minúsculas, números y el carácter `_`. | Los caracteres no admitidos se sustituyen por el carácter de subrayado `_`, a menos que incumpla alguna de las reglas anteriores. En ese caso, los caracteres no admitidos se normalizan mediante la regla correspondiente.               |
| Los nombres y los encabezados deben tener 56 caracteres o menos.                                  | No se realiza ninguna normalización. Los nombres y los encabezados que tienen más de 56 caracteres se rechazan y es necesario cambiar sus nombres. |

## Crear una tabla de referencia

Datadog admite las siguientes fuentes de datos, incluyendo las integraciones y la carga manual de CSV:

{{< tabs >}}
{{% tab "Cloud storage" %}}

{{% collapse-content title="Carga manual" level="h4" expanded=true %}}

Haz clic en **New Reference Table +** (Nueva tabla de referencia +) y luego carga un archivo CSV. Asigna un nombre a las columnas correspondientes y define la clave principal para las búsquedas.

{{< img src="reference_tables/enrichment-table-setup.png" alt="Sección Definir elesquema que muestra una tabla con org_id marcado como clave primaria y las columnas con datos de id de organización, nombre de organización, organización principal, propietario de cuenta y csm" style="width:100%;">}}

**Nota**: El método de carga manual de CSV admite archivos de hasta 4 MB.

{{% /collapse-content %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

Las tablas de referencia pueden extraer automáticamente un archivo CSV de un bucket de Amazon S3 para mantener los datos actualizados. La integración busca cambios en el archivo CSV en S3 y, cuando el archivo se actualiza, sustituye la tabla de referencia con los nuevos datos. Esto también permite la actualización de la API con la API de S3, una vez configurada la tabla de referencia inicial. **Nota**: Las tablas de referencia no se sustituyen si el contenido del archivo CSV no se modifica.

Para actualizar las tablas de referencia desde S3, Datadog utiliza el rol IAM de tu cuenta AWS que configuraste para la [integración AWS][1]. Si aún no has creado ese rol, [sigue estos pasos][2] para hacerlo. Para permitir que ese rol actualice tus tablas de referencia, agregue la siguiente declaración de permiso a tus políticas IAM. Asegúrate de editar los nombres de los buckets para que coincidan con tu entorno.

**Nota**: Si utilizas el cifrado del lado del servidor, puedes cargar tablas de referencia cifradas con claves gestionadas por Amazon S3 (SSE-S3) o claves del servicio AWS Key Management (SSE-KMS).

```json
{
    "Statement": [
        {
            "Sid": "EnrichmentTablesS3",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                // Grant KMS decrypt permissions if uploading KMS-encrypted object
                // "kms:Decrypt",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
                "arn:aws:s3:::<MY_BUCKET_NAME_2>"
            ]
        }
    ],
    "Version": "2012-10-17"
}
```
#### Definir la tabla

Haz clic en **New Reference Table +** (Nueva tabla de referencia +), selecciona Amazon S3, rellena todos los campos, haz clic para importar y define la clave principal para las búsquedas.

{{< img src="reference_tables/configure-s3-reference-table.png" alt="Sección Cargar tus datos con el cuadro Amazon S3 seleccionado y los datos de cuenta, bucket y ruta de AWS rellenados" style="width:100%;">}}

**Nota**: El método de carga desde un bucket S3 admite archivos de hasta 200 MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}} 
{{% collapse-content title="Azure Storage" level="h4" id="azure-storage" %}}

1. Si aún no lo has hecho, configura la [integración Azure][1] dentro de la suscripción que contiene la cuenta de almacenamiento desde la que quieres importar tu tabla de referencia. Esto implica la [creación de un registro de aplicación con el que Datadog pueda][2] integrarse.
2. En el portal Azure, selecciona la cuenta de almacenamiento que almacena los archivos de tu tabla de referencia.
3. Dentro de tu cuenta de almacenamiento, ve a **Control de acceso (IAM)** y selecciona **Añadir** > **Añadir asignación de roles**.
4. Introduce y selecciona el rol **Lector de datos blob de almacenamiento**. El rol de [lector de datos blob de almacenamiento][3] permite a Datadog leer y listar contenedores y blobs de almacenamiento.
5. En la pestaña **Miembros**, haz clic en **+ Select members** (+ Seleccionar miembros). Selecciona el registro de la aplicación que creaste en el paso 1.

   {{< img src="reference_tables/add_members.png" alt="Sección Miembros en el portal Azure que muestra un miembro seleccionado y los datos de nombre, id de objeto y tipo rellenados" style="width:85%;">}}

Después de revisar y asignar el rol, puedes importar a las tablas de referencia desde Azure. La actualización de la configuración de Azure en Datadog puede tardar unos minutos.

{{< img src="reference_tables/azure_storage.png" alt="Cuadro de Azure Storage en la sección Cargar o importar datos del flujo de trabajo de una nueva tabla de referencia" style="width:80%;">}}

Para obtener más información, consulta la [documentación de la integración Azure][4].

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /es/integrations/azure/

{{% /collapse-content %}} 
{{% collapse-content title="Google Cloud storage" level="h4" id="google-cloud-storage" %}}

### Google Cloud Storage

{{% site-region region="gov" %}}
<div class="alert alert-danger">Las tablas de referencia no están disponibles para el <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. Si no has configurado la integración Google Cloud con Datadog o si estás utilizando archivos de ID de proyectos Google legacy (los proyectos legacy se indican en el cuadro de tu integración GCP), sigue las instrucciones para configurar la [integración Google Cloud Platform][1]. Esto implica la creación de una [cuenta de servicio Google Cloud][2].

1. Desde la consola de Google Cloud, ve a la página **Cloud Storage**.

1. Busca el bucket al que quieres conceder acceso y haz clic en él.

1. Haz clic en la pestaña **Permisos**. En "Ver por elementos principales", haz clic en el botón **Grant Access** (Conceder acceso).

1. En la ventana que aparece, en el campo "Nuevos elementos principales", introduce el correo electrónico de la cuenta de servicio que creaste y añadiste al cuadro de GCP en el paso 1. En "Asignar roles", selecciona el rol **Visor de objetos de almacenamiento** y haz clic en **Save** (Guardar).

{{< img src="reference_tables/grant_access.png" alt="Consola de Google Cloud que muestra la configuración para conceder acceso" style="width:100%;" >}}

Después de revisar y asignar el rol, puedes importar a las tablas de referencia desde Google Cloud La actualización de la configuración en Datadog puede tardar unos minutos.

{{< img src="reference_tables/gcp_upload_import_ui.png" alt="Seleccionar Almacenamiento GCP en Cargar o importar datos al crear una nueva tabla de referencia" style="width:100%;" >}}

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: /es/integrations/google_cloud_platform/#setup
[2]: /es/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Integraciones" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

Esta tabla de referencia puede utilizarse para añadir atributos adicionales a logs con el [Procesador de búsquedas][1].

## Reglas de validación

Los nombres de las tablas de referencia y los encabezados de las columnas se validan utilizando las siguientes convenciones de nomenclatura y, si es necesario, se actualizan o normalizan automáticamente.

| Regla     | Normalización |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Los nombres y las cabeceras no pueden duplicarse.                                           | Los nombres duplicados se enumeran. Por ejemplo, si `fileid` se utiliza dos veces como nombre, la primera instancia se convierte en `fileid1` y la segunda instancia en `fileid2`. Si se enumera un nombre o encabezado y supera los 56 caracteres, se rechaza y es necesario cambiar su nombre. |
| Los nombres y encabezados no pueden contener letras mayúsculas.                               | Los nombres con letras mayúsculas se convierten a minúsculas. Esta conversión puede dar lugar a nombres duplicados, que luego se enumeran. Por ejemplo, `Fileid` y `FileID` se convierten en `fileid` y se enumeran en `fileid1` y `fileid2` respectivamente. |
| Los nombres y los encabezados no pueden contener espacios.                                          | Los espacios que no sean iniciales ni finales se sustituyen por caracteres de subrayado `_`. Se eliminan los espacios iniciales y finales. Por ejemplo, `customer names` se sustituye por `customer_names`. |
| Los nombres y los encabezados deben empezar por minúscula.                             | Los caracteres en mayúsculas se convierten a minúsculas. Se eliminan los caracteres iniciales que no sean letras. Por ejemplo, `23Two_three` se convierte en `two_three`.   |
| Los nombres y los encabezados sólo admiten letras minúsculas, números y el carácter `_`. | Los caracteres no admitidos se sustituyen por el carácter de subrayado `_`, a menos que incumpla alguna de las reglas anteriores. En ese caso, los caracteres no admitidos se normalizan mediante la regla correspondiente.               |
| Los nombres y los encabezados deben tener 56 caracteres o menos.                                  | No se realiza ninguna normalización. Los nombres y los encabezados que tienen más de 56 caracteres se rechazan y es necesario cambiar sus nombres. |

## Modificar una tabla de referencia

Para modificar una tabla de referencia existente con nuevos datos, selecciona una tabla y haz clic en **Update Config** (Actualizar configuración) en la esquina superior derecha.
El CSV seleccionado se inserta en la tabla, lo que significa que:

* Se actualizan todas las filas existentes con la misma clave primaria
* Se añaden todas las filas nuevas
* Se eliminan todas las filas antiguas que no están en el nuevo archivo

Una vez guardada la tabla, las filas insertadas se procesan de forma asíncrona y se actualizan en la vista previa. La actualización puede tardar hasta 10 minutos en completarse.

## Eliminar una tabla de referencia

Para eliminar una tabla de referencia, selecciona una tabla, haz clic en el icono del engranaje en la esquina superior derecha y luego haz clic en **Delete Table** (Eliminar tabla).
Se eliminará la tabla junto a todas las filas asociadas.

Si hay un Procesador de búsquedas que utiliza una tabla de referencia para el enriquecimiento de los logs, el enriquecimiento se detiene. El enriquecimiento puede tardar hasta 10 minutos en detenerse.

## Monitorizar la actividad de una tabla de referencia

Puedes monitorizar la actividad de una tabla de referencia con [Audit Trail][2] o [Change Events][3]. Para ver el registro de auditoría y los eventos de cambios de una tabla de referencia específica, selecciona la tabla y haz clic en el icono Configuración junto a **Update Config** (Actualizar configuración). Para ver el registro de auditoría, necesitas permisos de gestión de la organización.

### Audit Trail

Utiliza el registro de auditoría de las tablas de referencia para realizar un seguimiento de las acciones activadas por el usuario. Los eventos de Audit Trail se envían cuando un usuario carga o importa inicialmente un archivo CSV o cuando un usuario crea, modifica o elimina una tabla de referencia.

El tipo de recurso `reference_table_file` muestra eventos de importación/carga y el tipo de recurso `reference_table` muestra eventos de la tabla de referencia. El registro de auditoría permite observar el contenido de una tabla de referencia.

### Eventos de cambios

Utiliza los eventos de cambios de las tablas de referencia para realizar un seguimiento de las acciones automatizadas o activadas por el usuario. Se envían cuando se importa un archivo de nube desde un usuario o una actualización automática. (La carga de un archivo local no genera un evento de cambio). Si bien los eventos pueden realizar un seguimiento de las acciones activadas por el usuario, se utilizan principalmente para realizar un seguimiento de las importaciones activadas cuando una tabla de referencia extrae automáticamente un nuevo archivo CSV.

Los eventos contienen información sobre el estado de éxito, la ruta y el nombre de la tabla de la importación. Si se produce un error, se proporciona información sobre el tipo de error.

### Alertas

Para recibir alertas sobre los errores encontrados durante las importaciones, utiliza [monitores de eventos][4] para eventos de cambios de la tabla de referencia. Los eventos de cambios de la tabla de referencia se envían desde la fuente `reference_tables`.

Puedes crear monitores a partir de la pestaña **Monitores** o hacer clic en el icono de configuración situado junto a **New Reference Table +** (Nueva tabla de referencia +) para generar un monitor ya rellenado.

## Límites de la tabla de referencia
- Una tabla de referencia puede tener hasta 50 columnas
- El tamaño de un archivo de tabla de referencia cargado a través de la interfaz de usuario puede ser de hasta 4 MB
- El tamaño de un archivo de tabla de referencia cargado a través de un archivo de bucket de nube puede ser de hasta 200 MB
- El tamaño de un archivo de tabla de referencia cargado a través de una integración puede ser de hasta 200 MB
- Puedes tener hasta 100 tablas de referencia por organización

Si tienes un caso de uso que supera estos límites, ponte en contacto con el [servicio de asistencia][5].

## Frecuencia de actualización automática

Las tablas de referencia pueden actualizarse automáticamente, en función de la fuente de los datos:

- **Almacenamiento de archivos en la nube** (Amazon S3, Azure Storage, Google Cloud Storage): cada 5 minutos
- **Integraciones**: cada hora
- **Carga manual de archivos CSV**: no se admiten actualizaciones automáticas

## Permisos

### Acceso basado en roles
Para ver las tablas de referencia, los usuarios necesitan el permiso `reference_tables_read`. Para crear o modificar Tablas de referencia, los usuarios necesitan el permiso `reference_tables_write`.

Para obtener más información sobre permisos, consulta la [documentación RBAC][6].

### Controles de acceso detallados
Restringe el acceso a tablas individuales especificando una lista de equipos, roles o usuarios que pueden verlas o editarlas.

{{< img src="reference_tables/granular_access_permissions.png" alt="La opción del engranaje de permisos que permite configurar permisos de acceso granulares en una tabla" style="width:100%;">}}

1. Haz clic en una tabla para abrir su página de información.
2. Haz clic en el icono de engranaje de la esquina superior derecha.
3. Selecciona **Permisos** en el menú.
4. Haz clic en **Restrict Access** (Restringir el acceso).
5. Utiliza el menú desplegable para seleccionar uno o más equipos, roles o usuarios.
6. Haz clic en **Add** (Añadir).
7. Selecciona **Editor** o **Visor**.
8. Haz clic en **Save** (Guardar) para aplicar los cambios.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/#lookup-processor
[2]: /es/account_management/audit_trail/
[3]: /es/events/
[4]: /es/monitors/types/event/
[5]: /es/help/
[6]: /es/account_management/rbac/permissions/#reference-tables