---
aliases:
- /es/logs/guide/enrichment-tables/
- /es/logs/guide/reference-tables/
- /es/integrations/guide/reference-tables
description: Combina metadatos personalizados con datos de Datadog al subir archivos
  CSV o conectar almacenamiento en la nube para enriquecer registros, datos de seguridad
  y análisis.
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Utiliza el procesador de búsqueda para enriquecer registros a partir de una
    tabla de referencia
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: Documentación
  text: Filtra registros basados en tablas de referencia
- link: /sheets/#lookup
  tag: Documentación
  text: Búsqueda en Sheets
- link: /events/pipelines_and_processors/lookup_processor/
  tag: Documentación
  text: Procesador de búsqueda para Eventos
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: Documentación
  text: Utiliza tablas de referencia para agregar múltiples etiquetas a los datos
    de costos
- link: /metrics/reference_table_joins_with_metrics/
  tag: Documentación
  text: Aprende sobre uniones de tablas de referencia con métricas
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Agregue más contexto a sus registros con tablas de referencia.
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: Blog
  text: Enriquezca su telemetría existente de Datadog con metadatos personalizados
    utilizando tablas de referencia.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: Blog
  text: Agregue más contexto a las detecciones e investigaciones de Cloud SIEM con
    tablas de referencia de Datadog.
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enriquezca los registros con contexto de CMDB de ServiceNow antes de enrutar
    a cualquier herramienta de SIEM o de registro.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recolección y agregación de registros para MSSPs con Observability
    Pipelines de Datadog.
title: Tablas de Referencia
---
## Resumen {#overview}

Las tablas de referencia le permiten combinar metadatos personalizados con la información ya existente en Datadog. Puede definir nuevas entidades, como detalles de clientes, nombres e información de servicios, o direcciones IP, al subir un archivo CSV que contenga una tabla de información. Las entidades están representadas por una clave primaria en una tabla de referencia y los metadatos asociados.

{{< img src="reference_tables/reference_table.png" alt="Una tabla de referencia con datos poblados en las columnas para id de org, nombre de org, org padre, propietario de cuenta y csm" style="width:100%;">}}

Por ejemplo, puede:

- **Enriquecer registros y datos de seguridad para investigaciones más rápidas:** Correlacionar registros, trazas y eventos de seguridad con el contexto empresarial actualizado, como nombres de clientes, propietarios de cuentas, inteligencia de amenazas o descripciones de códigos de error, para agilizar la resolución de problemas y el análisis.
- **Segmentar usuarios y recursos para análisis y gestión de costos específicos:** Agrupar usuarios, clientes o recursos en la nube en segmentos significativos (como niveles de usuario, equipos o unidades de negocio) para un análisis más profundo del producto y una atribución de costos precisa utilizando herramientas como Tag Pipelines.
- **Mejorar datos para consultas y reportes avanzados:** Unir datos externos de tablas de referencia en Sheets, DDSQL Editor o Notebooks para realizar consultas complejas, agregaciones y construir reportes personalizados sin necesidad de experiencia técnica.

## Crear una tabla de referencia {#create-a-reference-table}

Datadog admite las siguientes fuentes de datos, incluidas integraciones y carga manual de archivos CSV:

{{< tabs >}}
{{% tab "Carga manual" %}}

Haga clic en **Nueva tabla de referencia +**, luego cargue un archivo CSV, nombre las columnas apropiadas y defina la clave primaria para las búsquedas.

{{< img src="reference_tables/schema_setup.png" alt="La sección Definir el Esquema muestra una tabla con org_id marcado como la clave primaria y columnas con datos para id de org, nombre de org, org padre, propietario de cuenta y csm. " style="width:100%;">}}

**Nota**: El método de carga manual de CSV admite archivos de hasta 4MB.

{{% /tab %}}
{{% tab "Almacenamiento en la nube" %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

Las Tablas de Referencia pueden extraer automáticamente un archivo CSV de un bucket de Amazon S3 para mantener sus datos actualizados. La integración busca cambios en el archivo CSV en S3, y cuando el archivo se actualiza, reemplaza la Tabla de Referencia con los nuevos datos. Esto también permite la actualización a través de API con la API de S3 una vez que la Tabla de Referencia inicial está configurada. **Nota**: Las Tablas de Referencia no se reemplazan si el contenido del archivo CSV no ha cambiado.

Para actualizar las Tablas de Referencia desde S3, Datadog utiliza el rol IAM en su cuenta de AWS que configuró para la [integración de AWS][1]. Si aún no ha creado ese rol, [siga estos pasos][2] para hacerlo. Para permitir que ese rol actualice sus Tablas de Referencia, agregue la siguiente declaración de permiso a sus políticas IAM. Asegúrese de editar los nombres de los buckets para que coincidan con su entorno.

**Nota**: Si utiliza cifrado del lado del servidor, puede cargar Tablas de Referencia cifradas con claves gestionadas por Amazon S3 (SSE-S3) o claves del Servicio de Gestión de Claves de AWS (SSE-KMS).

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
#### Defina la tabla {#define-the-table}

Haga clic en **Nueva Tabla de Referencia +**, luego agregue un nombre, seleccione Amazon S3, complete todos los campos, haga clic en importar y defina la clave primaria para las búsquedas.

{{< img src="reference_tables/s3_table.png" alt="La sección de carga de sus datos con el mosaico de Amazon S3 seleccionado y datos completados para la Cuenta de AWS, Bucket y Ruta" style="width:100%;">}}

**Nota**: El método de carga desde un bucket de S3 admite archivos de hasta 200MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento de Azure" level="h4" id="azure-storage" %}}

1. Si aún no lo ha hecho, configure la [integración de Azure][1] dentro de la suscripción que tiene la cuenta de almacenamiento desde la cual desea importar su Tabla de Referencia. Esto implica [crear un registro de aplicación con el que Datadog pueda][2] integrarse.
2. En el Portal de Azure, seleccione la cuenta de almacenamiento que almacena sus archivos de Tabla de Referencia.
3. Dentro de su cuenta de almacenamiento, navegue a **Control de Acceso (IAM)** y seleccione **Agregar** > **Agregar Asignación de Rol**.
4. Ingrese y seleccione el **Rol de Lector de Datos de Blob de Almacenamiento**. El [rol de Lector de Datos de Blob de Almacenamiento][3] permite a Datadog leer y listar contenedores de almacenamiento y blobs.
5. En la pestaña **Miembros**, haga clic en **+ Seleccionar miembros**. Seleccione el registro de aplicación que creó en el Paso 1.

   {{< img src="reference_tables/add_members.png" alt="La sección de Miembros en el Portal de Azure donde se selecciona un miembro y se completan los datos para el Nombre, ID de Objeto y Tipo" style="width:85%;">}}

Después de revisar y asignar el rol, puede importar a las tablas de referencia desde Azure. Puede tardar unos minutos en que su configuración de Azure se actualice en Datadog.

{{< img src="reference_tables/azure_table.png" alt="Un mosaico de Almacenamiento de Azure en la sección de Carga o importación de datos de un nuevo flujo de trabajo de tabla de referencia" style="width:80%;">}}

Para más información, consulte la [documentación de integración de Azure][4].

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /es/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento de Google Cloud" level="h4" id="google-cloud-storage" %}}

### Almacenamiento de Google Cloud {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Las Tablas de Referencia no están disponibles para su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. Si no ha configurado una integración de Google Cloud con Datadog o está utilizando archivos de ID de proyecto de Google heredados (los proyectos heredados se indican en su mosaico de integración de GCP), siga las instrucciones para configurar la [integración de Google Cloud Platform][1]. Esto implica crear una [cuenta de servicio de Google Cloud][2].

1. Desde la consola de Google Cloud, navegue a la página de **Almacenamiento en la Nube**.

1. Encuentre el bucket al que le gustaría otorgar acceso y haga clic en él.

1. Haga clic en la pestaña **Permisos**. Bajo "Ver por Principales", haga clic en el botón **Otorgar Acceso**.

1. En la ventana que aparece, en el campo "Nuevos principales", ingrese el correo electrónico de la cuenta de servicio que creó y agregó al mosaico de GCP en el Paso 1. Bajo "Asignar roles", seleccione el rol de **Visualizador de Objetos de Almacenamiento**. Haga clic en **Guardar**.

{{< img src="reference_tables/grant_access.png" alt="Consola de Google Cloud mostrando la configuración para otorgar acceso" style="width:100%;" >}}

Después de revisar y asignar el rol, puede importar a las tablas de referencia desde Google Cloud. Puede tardar unos minutos en que su configuración se actualice en Datadog.

{{< img src="reference_tables/gcp_table.png" alt="Seleccione Almacenamiento de GCP en Cargar o importar datos al crear una nueva tabla de referencia." style="width:100%;" >}}

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: /es/integrations/google_cloud_platform/#setup
[2]: /es/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="terraform" %}}

Utilice el recurso [`datadog_reference_table`][9] para gestionar tablas de referencia como infraestructura como código. Configure el recurso con el esquema de su tabla, claves primarias y detalles de acceso al almacenamiento en la nube.

**Nota**: Terraform soporta los mismos límites de tamaño de archivo que las cargas de almacenamiento en la nube. Consulte [límites de la tabla de referencia](#reference-table-limits) para más detalles.

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

Cree tablas de referencia programáticamente utilizando la [API de Datadog][8].

Utilice el [punto final Crear Tabla de Referencia][10] para crear tablas de referencia desde almacenamiento en la nube o archivos locales.
- Para fuentes de almacenamiento en la nube (S3, Azure, GCS), proporcione `access_details` en `file_metadata` apuntando a un archivo CSV en el almacenamiento en la nube.
- Para archivos locales, llame a `POST /api/latest/reference-tables/uploads` para obtener un ID de carga y cargue sus datos CSV. Luego, llame al punto de conexión Crear Tabla de Referencia con el `upload_id` en `file_metadata`.

**Nota**: La API soporta los mismos límites de tamaño de archivo que las cargas de almacenamiento en la nube. Consulte [límites de la tabla de referencia](#reference-table-limits) para más detalles.

[8]: /es/api/latest/reference-tables/
[10]: /es/api/latest/reference-tables/#create-reference-table

{{% /tab %}}
{{% tab "Integrations" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

Esta Tabla de Referencia puede ser utilizada para agregar atributos adicionales a los registros con el [Procesador de Búsqueda][1].

## Reglas de validación {#validation-rules}

Los nombres de las Tablas de Referencia y los encabezados de las columnas son validados utilizando las siguientes convenciones de nomenclatura y se actualizan o normalizan automáticamente, si es necesario.

| Regla     | Normalización |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Los nombres y encabezados no pueden ser duplicados.											| Los nombres duplicados son enumerados. Por ejemplo, si `fileid` se usa dos veces como nombre, la primera instancia se convierte en `fileid1` y la segunda instancia se convierte en `fileid2`. Si un nombre o encabezado está enumerado y excede los 56 caracteres, es rechazado y necesita ser renombrado. |
| Los nombres y encabezados no pueden contener letras mayúsculas. 								| Los nombres con letras mayúsculas se convierten a minúsculas. Esta conversión puede resultar en nombres duplicados, que luego son enumerados. Por ejemplo, `Fileid` y `FileID` se convierten en `fileid` y son enumerados como `fileid1` y `fileid2` respectivamente. |
| Los nombres y encabezados no pueden contener espacios. 											| Los espacios que no son iniciales o finales son reemplazados por caracteres de subrayado `_`. Los espacios iniciales y finales son eliminados. Por ejemplo, `customer names` es reemplazado por `customer_names`. |
| Los nombres y encabezados deben comenzar con una letra minúscula. 							| Los caracteres en mayúscula se convierten a minúsculas. Los caracteres no alfabéticos al inicio son eliminados. Por ejemplo, `23Two_three` se convierte en `two_three`.	|
| Los nombres y encabezados solo admiten letras minúsculas, números y el carácter `_`. | Los caracteres no soportados son reemplazados por el carácter guion bajo `_`, a menos que rompa alguna de las reglas anteriores. En ese caso, los caracteres no soportados son normalizados por la regla respectiva.				|
| Los nombres y encabezados deben tener 56 caracteres o menos. 									| No se realiza ninguna normalización. Los nombres y encabezados que tienen más de 56 caracteres son rechazados y necesitan ser renombrados. |

## Modificar una Tabla de Referencia {#modify-a-reference-table}

Para modificar una Tabla de Referencia existente con nuevos datos, seleccione una tabla y haga clic en **Update Config** en la esquina superior derecha.
El CSV seleccionado se inserta o actualiza en la tabla, lo que significa que:

* Todas las filas existentes con la misma clave primaria son actualizadas
* Todas las nuevas filas son añadidas
* Todas las filas antiguas que no están en el nuevo archivo son eliminadas

Una vez que la tabla es guardada, las filas insertadas son procesadas de manera asíncrona y actualizadas en la vista previa. Puede tardar hasta 10 minutos para que la actualización se complete.

## Exportar una tabla de referencia {#export-a-reference-table}

Para exportar una Tabla de Referencia, seleccione una tabla y haga clic en **Query in DDSQL Editor**. Desde allí, puede usar el [Editor DDSQL][7] para exportar a CSV, tableros y más.

{{< img src="reference_tables/query_ddsql.png" alt="Vista previa de la tabla con un botón azul etiquetado Consulta en el Editor DDSQL posicionado sobre los resultados" style="width:100%;" >}}

## Eliminar una Tabla de Referencia {#delete-a-reference-table}

Para eliminar una Tabla de Referencia, seleccione una tabla, haga clic en el ícono de engranaje en la esquina superior derecha y luego haga clic en **Eliminar Tabla**.
La tabla y todas las filas asociadas son eliminadas.

Si hay un Procesador de Búsqueda utilizando una Tabla de Referencia para el enriquecimiento de registros, entonces el enriquecimiento se detiene. Puede tardar hasta 10 minutos en detenerse el enriquecimiento.

## Monitorear actividad de tabla de referencia {#monitor-reference-table-activity}

Puede monitorear la actividad de la Tabla de Referencia con [Audit Trail][2] o [Eventos de Cambio][3]. Para ver el Audit Trail y los eventos de cambio para una tabla de referencia específica, seleccione la tabla y haga clic en el ícono de Configuración junto a **Actualizar Configuración**. Necesita permisos de gestión de la organización para ver el Audit Trail.

### Audit Trail {#audit-trail}

Utilice el Audit Trail para las Tablas de Referencia para rastrear acciones desencadenadas por el usuario. Los eventos del Audit Trail se envían cuando un usuario carga o importa inicialmente un archivo CSV, o cuando un usuario crea, modifica o elimina una Tabla de Referencia.

El `reference_table_file` tipo de activo muestra eventos de importación/carga y el `reference_table` tipo de activo muestra eventos de tabla de referencia. El Audit Trail proporciona visibilidad sobre el contenido de una tabla de referencia.

### Eventos de cambio {#change-events}

Utilice eventos de cambio para las Tablas de Referencia para rastrear acciones automatizadas o desencadenadas por el usuario. Se envían cuando un archivo en la nube es importado por un usuario o por una actualización automática. (Cargar un archivo local no genera un evento de cambio.) Mientras que los eventos pueden rastrear acciones desencadenadas por el usuario, se utilizan principalmente para rastrear importaciones desencadenadas cuando una tabla de referencia extrae automáticamente un nuevo archivo CSV.

Los eventos contienen información sobre el estado de éxito, la ruta y el nombre de la tabla de la importación. Si ocurre un error, se proporciona información sobre el tipo de error.

### Alerting {#alerting}

Para ser alertado sobre errores encontrados durante las importaciones, utilice [Monitores de Eventos][4] para eventos de cambio de la Tabla de Referencia. Los eventos de cambio de la Tabla de Referencia se envían desde la `reference_tables` fuente.

Puede crear monitores desde la pestaña **Monitores**, o hacer clic en el ícono de Configuración junto a **Nueva Tabla de Referencia +** para generar un monitor prellenado.

## Límites de la Tabla de Referencia {#reference-table-limits}
Una Tabla de Referencia puede tener hasta 50 columnas.
El tamaño de un archivo de Tabla de Referencia subido a través de la interfaz de usuario puede ser de hasta 4 MB.
El tamaño de un archivo de Tabla de Referencia subido a través de un archivo de bucket en la nube puede ser de hasta 200 MB.
El tamaño de un archivo de Tabla de Referencia subido a través de una integración puede ser de hasta 200 MB.
- Puede tener hasta 100 Tablas de Referencia por organización.

Contacte a [soporte][5] si tiene un caso de uso que excede estos límites.

## Frecuencia de actualización automática {#automatic-update-frequency}

Las Tablas de Referencia pueden actualizarse automáticamente, dependiendo de la fuente de datos:

- **Almacenamiento de archivos en la nube** (Amazon S3, Azure Storage, Google Cloud Storage): Cada 5 minutos
- **Integrations**: Cada hora.
- **Subidas manuales de CSV**: Las actualizaciones automáticas no son compatibles

## Permisos {#permissions}

### Acceso basado en roles {#role-based-access}
Para ver Tablas de Referencia, los usuarios requieren el `reference_tables_read` permiso. Para crear o modificar Tablas de Referencia, los usuarios requieren el `reference_tables_write` permiso.

Para más información sobre permisos, consulte la [documentación de RBAC][6].

### Controles de acceso granulares {#granular-access-controls}
Restringa el acceso a tablas individuales especificando una lista de equipos, roles o usuarios que están autorizados a ver o editarlas.

{{< img src="reference_tables/granular_permissions.png" alt="La opción de engranaje de Permisos que admite la configuración de permisos de acceso granulares en una tabla" style="width:100%;">}}

1. Haga clic en una tabla para abrir su página de detalles.
2. Haga clic en el ícono de engranaje en la esquina superior derecha.
3. Seleccione **Permisos** del menú.
4. Haga clic en **Restringir Acceso**.
5. Utilice el menú desplegable para seleccionar uno o más equipos, roles o usuarios.
6. Haga clic en **Agregar**.
7. Seleccione ya sea **Editor** o **Viewer**.
8. Haga clic en **Guardar** para aplicar los cambios.

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/lookup_processor/
[2]: /es/account_management/audit_trail/
[3]: /es/events/
[4]: /es/monitors/types/event/
[5]: /es/help/
[6]: /es/account_management/rbac/permissions/#reference-tables
[7]: /es/ddsql_editor/#save-and-share-queries