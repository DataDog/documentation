---
aliases:
- /es/logs/guide/enrichment-tables/
- /es/logs/guide/reference-tables/
- /es/integrations/guide/reference-tables
description: Combine metadatos personalizados con datos de Datadog cargando archivos
  CSV o conectando almacenamiento en la nube para enriquecer registros, datos de seguridad
  y análisis.
further_reading:
- link: /reference_tables/guide/create-update-delete-reference-table-with-api/
  tag: Guía
  text: Creación, actualización y eliminación de una Reference Table con la API
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Use el procesador de búsqueda para enriquecer registros desde una Reference
    Table
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: Documentación
  text: Filtre registros basados en Reference Tables
- link: /sheets/#lookup
  tag: Documentación
  text: Búsqueda en Sheets
- link: /events/pipelines_and_processors/lookup_processor/
  tag: Documentación
  text: Procesador de búsqueda para eventos
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: Documentación
  text: Use Reference Tables para agregar múltiples etiquetas a los datos de costos
- link: /metrics/reference_table_joins_with_metrics/
  tag: Documentación
  text: Obtenga información sobre las uniones de Reference Table con métricas
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Agregue contexto de actualización dinámica a los registros con tablas de referencia
    y Observability Pipelines
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Agregue más contexto a sus registros con Reference Tables
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: Blog
  text: Enriquezca su telemetría de Datadog existente con metadatos personalizados
    mediante Reference Tables.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: Blog
  text: Agregue más contexto a las detecciones e investigaciones de Cloud SIEM con
    Datadog Reference Tables.
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enriquezca los registros con contexto de ServiceNow CMDB antes de enrutarlos
    a cualquier SIEM o herramienta de registro.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
title: Reference Tables
---
## Descripción general {#overview}

Reference Tables le permite combinar metadatos personalizados con información que ya está en Datadog. Puede definir nuevas entidades como detalles de clientes, nombres de servicio e información, o direcciones IP cargando un archivo CSV que contenga una tabla de información. Las entidades están representadas por una clave principal en una Reference Table y los metadatos asociados.

{{< img src="reference_tables/reference_table.png" alt="Una reference table con datos poblados en las columnas para id de organización, nombre de organización, organización principal, propietario de cuenta y csm" style="width:100%;">}}

Por ejemplo, puede:

- **Enriquezca registros y datos de seguridad para investigaciones más rápidas:** Correlacione registros, trazas y eventos de seguridad con contexto empresarial actualizado (como nombres de clientes, propietarios de cuentas, inteligencia de amenazas o descripciones de códigos de error) para acelerar la resolución de problemas y el análisis.
- **Segmente usuarios y recursos para análisis específicos y gestión de costos:** Agrupe usuarios, clientes o recursos en la nube en segmentos significativos (como niveles de usuario, equipos o unidades de negocio) para obtener análisis de productos más profundos y una atribución de costos precisa mediante herramientas como Pipelines de etiquetas.
- **Mejore los datos para consultas e informes avanzados:** Combine datos externos de Reference Tables en Sheets, DDSQL Editor o Notebooks para realizar consultas complejas, agregaciones y crear informes personalizados sin necesidad de conocimientos técnicos.

## Crear una Reference Table {#create-a-reference-table}

Datadog admite las siguientes fuentes de datos, incluidas las integraciones y la carga manual de CSV:

{{< tabs >}}
{{% tab "Carga manual" %}}

Haga clic en {{< ui >}}New Reference Table +{{< /ui >}}, luego cargue un archivo CSV, asigne un nombre a las columnas correspondientes y defina la clave principal para las búsquedas.

{{< img src="reference_tables/schema_setup.png" alt="La sección Definir el esquema que muestra una tabla con org_id marcado como la clave principal y columnas con datos para id de la organización, nombre de la organización, organización principal, propietario de la cuenta y csm " style="width:100%;">}}

**Nota**: El método de carga manual de CSV admite archivos de hasta 4 MB.

{{% /tab %}}
{{% tab "Almacenamiento en la nube" %}}

{{% collapse-content title="Amazon S3" level="h3" id="amazon-s3" %}}

Reference Tables pueden extraer automáticamente un archivo CSV de un bucket de Amazon S3 para mantener sus datos actualizados. La integración busca cambios en el archivo CSV en S3 y, cuando el archivo se actualiza, reemplaza la Reference Table con los nuevos datos. Esto también permite la actualización mediante API con la API de S3 una vez que se configura la Reference Table inicial. **Nota**: Reference Tables no se reemplazan si el contenido del archivo CSV no ha cambiado.

Para actualizar las Reference Tables desde S3, Datadog utiliza el rol de IAM en su cuenta de AWS que configuró para la [integración de AWS][1]. Si aún no ha creado ese rol, [siga estos pasos][2] para hacerlo. Para permitir que ese rol actualice sus Reference Tables, agregue la siguiente declaración de permiso a sus políticas de IAM. Asegúrese de editar los nombres de los buckets para que coincidan con su entorno.

**Nota**: Si utiliza cifrado del lado del servidor, puede cargar Reference Tables cifradas con claves administradas por Amazon S3 (SSE-S3) o claves de AWS Key Management Service (SSE-KMS).

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
#### Definir la tabla {#define-the-table}

Haga clic en {{< ui >}}New Reference Table +{{< /ui >}}, luego agregue un nombre, seleccione {{< ui >}}Amazon S3{{< /ui >}}, complete todos los campos, haga clic en importar y defina la clave principal para las búsquedas.

{{< img src="reference_tables/s3_table.png" alt="La sección de carga de datos con el mosaico de Amazon S3 seleccionado y los datos completados para la cuenta de AWS, el bucket y la ruta" style="width:100%;">}}

**Nota**: El método de carga desde un bucket de S3 admite archivos de hasta 200 MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento de Azure" level="h3" id="azure-storage" %}}

1. Si aún no lo ha hecho, configure la [integración de Azure][1] dentro de la suscripción que contiene la cuenta de almacenamiento desde la que desea importar su Reference Table. Esto implica [crear un registro de aplicación con el que Datadog pueda][2] integrarse.
2. En el Portal de Azure, seleccione la cuenta de almacenamiento que almacena los archivos de su Reference Table.
3. Dentro de su cuenta de almacenamiento, navegue a {{< ui >}}Access Control (IAM){{< /ui >}} y seleccione {{< ui >}}Add{{< /ui >}} > {{< ui >}}Add Role Assignment{{< /ui >}}.
4. Ingrese y seleccione el rol {{< ui >}}Storage Blob Data Reader{{< /ui >}}. El [rol {{< ui >}}Storage Blob Data Reader{{< /ui >}}][3] permite a Datadog leer y listar contenedores y blobs de almacenamiento.
5. En la pestaña {{< ui >}}Members{{< /ui >}}, haga clic en {{< ui >}}+ Select members{{< /ui >}}. Seleccione el registro de la aplicación que creó en el paso 1.

   {{< img src="reference_tables/add_members.png" alt="La sección Miembros en el Portal de Azure donde se selecciona un miembro y se completan los datos de Nombre, ID de objeto y Tipo" style="width:85%;">}}

Después de revisar y asignar el rol, puede importar a Reference Tables desde Azure. Es posible que la configuración de Azure tarde unos minutos en actualizarse en Datadog.

{{< img src="reference_tables/azure_table.png" alt="Un mosaico de Azure Storage en la sección Cargar o importar datos de un nuevo flujo de trabajo de tabla" style="width:80%;">}}

Para obtener más información, consulte la documentación de [integración de Azure][4].

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /es/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento de Google Cloud" level="h3" id="google-cloud-storage" %}}

### Almacenamiento de Google Cloud {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Reference Tables no están disponibles para su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. Si no ha configurado una integración de Google Cloud con Datadog o está utilizando archivos de ID de proyecto de Google heredados (los proyectos heredados se indican en su mosaico de integración de GCP), siga las instrucciones para configurar la [integración de Google Cloud Platform][1]. Esto implica crear una [cuenta de servicio de Google Cloud][2].

1. Desde la consola de Google Cloud, navegue a la página {{< ui >}}Cloud Storage{{< /ui >}}.

1. Busque el bucket al que desea otorgar acceso y haga clic en él.

1. Haga clic en la pestaña {{< ui >}}Permissions{{< /ui >}}. En "View By Principals", haga clic en el botón {{< ui >}}Grant Access{{< /ui >}}.

1. En la ventana que aparece, debajo del campo \"New principals\", ingrese el correo electrónico de la cuenta de servicio que creó y agregó al mosaico de GCP en el Paso 1. Debajo de \"Assign roles\", seleccione el rol {{< ui >}}Storage Object Viewer{{< /ui >}}. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="reference_tables/grant_access.png" alt="Consola de Google Cloud que muestra la configuración para otorgar acceso" style="width:100%;" >}}

Después de revisar y asignar el rol, puede importar a Reference Tables desde Google Cloud. Es posible que la configuración tarde unos minutos en actualizarse en Datadog.

{{< img src="reference_tables/gcp_table.png" alt="Seleccione GCP Storage en Upload or import data al crear una nueva reference table" style="width:100%;" >}}

**Nota**: La carga desde el almacenamiento de objetos en la nube admite archivos de hasta 200 MB.

[1]: /es/integrations/google_cloud_platform/#setup
[2]: /es/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="terraform" %}}

Utilice el recurso [`datadog_reference_table`][9] para administrar Reference Tables como infraestructura como código. Configure el recurso con el esquema de su tabla, las claves principales y los detalles de acceso al almacenamiento en la nube.

**Nota**: Terraform admite los mismos límites de tamaño de archivo que las cargas de almacenamiento en la nube. Consulte [Límites de una Reference Table](#reference-table-limits) para obtener más detalles.

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

Cree Reference Tables mediante programación utilizando la [Datadog API][8].

Utilice el [punto de conexión Create Reference Table][10] para crear Reference Tables a partir de almacenamiento en la nube o archivos locales.
- Para fuentes de almacenamiento en la nube (S3, Azure, GCS), proporcione `access_details` en `file_metadata` que apunte a un archivo CSV en el almacenamiento en la nube.
- Para archivos locales, llame a `POST /api/latest/reference-tables/uploads` para obtener un ID de carga y cargar sus datos CSV. Luego, llame al punto de conexión Create Reference Table con el `upload_id` en `file_metadata`.

**Nota**: La API admite los mismos límites de tamaño de archivo que las cargas de almacenamiento en la nube. Consulte [Límites de una Reference Table](#reference-table-limits) para obtener más detalles.

Consulte [Creación, actualización y eliminación de una Reference Table con la API][11] para obtener un tutorial completo sobre la administración de una Reference Table respaldada por un archivo CSV local con la API.

[8]: /es/api/latest/reference-tables/
[10]: /es/api/latest/reference-tables/#create-reference-table
[11]: /es/reference_tables/guide/create-update-delete-reference-table-with-api/

{{% /tab %}}
{{% tab "Integrations" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

Esta Reference Table se puede utilizar para agregar atributos adicionales a los registros con el [Lookup Processor][1].

## Reglas de validación {#validation-rules}

Los nombres de Reference Table y los encabezados de columna se validan utilizando las siguientes convenciones de nomenclatura y se actualizan o normalizan automáticamente, si es necesario.

| Regla     | Normalización |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Los nombres y encabezados no pueden estar duplicados.											| Los nombres duplicados se enumeran. Por ejemplo, si `fileid` se utiliza dos veces como nombre, la primera instancia se convierte en `fileid1` y la segunda instancia se convierte en `fileid2`. Si un nombre o encabezado se enumera y supera los 56 caracteres, se rechaza y debe cambiarse el nombre. |
| Los nombres y encabezados no pueden contener letras mayúsculas. 								| Los nombres con letras mayúsculas se convierten a minúsculas. Esta conversión puede resultar en nombres duplicados, los cuales son enumerados posteriormente. Por ejemplo, `Fileid` y `FileID` se convierten en `fileid` y se enumeran como `fileid1` y `fileid2` respectivamente. |
| Los nombres y encabezados no pueden contener espacios. 											| Los espacios que no sean iniciales ni finales se reemplazan con caracteres de subrayado `_`. Los espacios iniciales y finales se eliminan. Por ejemplo, `customer names` se reemplaza con `customer_names`. |
| Los nombres y encabezados deben comenzar con una letra minúscula. 							| Los caracteres en mayúsculas se convierten a minúsculas. Los caracteres iniciales que no sean letras se eliminan. Por ejemplo, `23Two_three` se convierte en `two_three`.	|
| Los nombres y encabezados solo admiten letras minúsculas, números y el carácter `_`. | Los caracteres no admitidos se reemplazan con el carácter de subrayado `_`, a menos que infrinjan una de las reglas anteriores. En ese caso, los caracteres no admitidos se normalizan mediante la regla respectiva.				|
| Los nombres y encabezados deben tener 56 caracteres o menos. 									| No se realiza ninguna normalización. Los nombres y encabezados que tengan más de 56 caracteres son rechazados y deben ser renombrados. |

## Modificar una Reference Table {#modify-a-reference-table}

Para modificar una Reference Table existente con datos nuevos, seleccione una tabla y haga clic en {{< ui >}}Update Config{{< /ui >}} en la esquina superior derecha.
El CSV seleccionado se inserta o actualiza en la tabla, lo que significa que:

* Todas las filas existentes con la misma clave principal se actualizan
* Todas las filas nuevas se agregan
* Todas las filas antiguas que no están en el archivo nuevo se eliminan

Una vez que se guarda la tabla, las filas insertadas se procesan de forma asíncrona y se actualizan en la vista previa. Puede tomar hasta 10 minutos para que la actualización se complete.

## Exportar una Reference Table {#export-a-reference-table}

Para exportar una Reference Table, seleccione una tabla y haga clic en {{< ui >}}Query in DDSQL Editor{{< /ui >}}. Desde allí, puede usar el [DDSQL Editor][7] para exportar a CSV, Dashboard y más.

{{< img src="reference_tables/query_ddsql.png" alt="Vista previa de la tabla con un botón azul etiquetado como Query in DDSQL Editor posicionado sobre los resultados" style="width:100%;" >}}

## Eliminar una Reference Table {#delete-a-reference-table}

Para eliminar una Reference Table, seleccione una tabla, haga clic en el icono de engranaje en la esquina superior derecha y luego haga clic en {{< ui >}}Delete Table{{< /ui >}}.
La tabla y todas las filas asociadas se eliminan.

Si hay un Lookup Processor que utiliza una Reference Table para el enriquecimiento de registros, entonces el enriquecimiento se detiene. Puede tomar hasta 10 minutos para que el enriquecimiento se detenga.

## Hacer un seguimiento la actividad de la Reference Table{#monitor-reference-table-activity}

Puede hacer un seguimiento de la actividad de la Reference Table con [Audit Trail][2] o [Change Events][3]. Para visualizar Audit Trail y los eventos de cambio para una Reference Table específica, seleccione la tabla y haga clic en el icono de Configuración junto a {{< ui >}}Update Config{{< /ui >}}. Necesita permisos de administración de la organización para visualizar el registro de auditoría.

### Audit Trail {#audit-trail}

Utilice Audit Trail para Reference Table para rastrear las acciones iniciadas por el usuario. Los eventos de Audit Trail se envían cuando un usuario carga o importa inicialmente un archivo CSV, o cuando un usuario crea, modifica o elimina una Reference Table.

El tipo de activo `reference_table_file` muestra eventos de importación/carga y el tipo de activo `reference_table` muestra eventos de Reference Table. Audit Trail proporciona observabilidad sobre el contenido de una Reference Table.

### Eventos de cambio {#change-events}

Utilice eventos de cambio para Reference Table para rastrear acciones automatizadas o activadas por el usuario. Se envían cuando un archivo en la nube se importa desde un usuario o una actualización automática. (La carga de un archivo local no genera un evento de cambio.) Aunque los eventos pueden rastrear acciones activadas por el usuario, se utilizan principalmente para rastrear importaciones activadas cuando una Reference Table extrae automáticamente un nuevo archivo CSV.

Los eventos contienen información sobre el estado de éxito, la ruta y el nombre de la Reference Table de la importación. Si ocurre un error, se proporciona información sobre el tipo de error.

### Alerting {#alerting}

Para recibir alertas sobre errores encontrados durante las importaciones, utilice [Event Monitors][4] para eventos de cambio de Reference Table. Los eventos de cambio de Reference Table se envían desde la fuente `reference_tables`.

Puede crear monitores desde la pestaña {{< ui >}}Monitors{{< /ui >}}, o hacer clic en el icono de Configuración junto a {{< ui >}}New Reference Table +{{< /ui >}} para generar un monitor precargado.

## Límites de Reference Table {#reference-table-limits}
- Una Reference Table puede tener hasta 200 columnas
- Una sola fila no puede ser mayor a 500KiB
- El tamaño de un archivo de Reference Table cargado a través de la interfaz de usuario puede ser de hasta 200 MB
- El tamaño de un archivo de Reference Table cargado a través de un archivo de bucket en la nube puede ser de hasta 200 MB
- El tamaño de un archivo de Reference Table cargado a través de una integración puede ser de hasta 200 MB
- Puede tener hasta 100 Reference Table por organización

Comuníquese con [support][5] si tiene un caso de uso que exceda estos límites.

## Frecuencia de actualización automática {#automatic-update-frequency}

Las Reference Table se pueden actualizar automáticamente, dependiendo de la fuente de datos:

- **Almacenamiento de archivos en la nube** (Amazon S3, Azure Storage, Google Cloud Storage): Cada 5 minutos
- **Integraciones**: Cada hora
- **Cargas manuales de CSV**: Las actualizaciones automáticas no son compatibles

## Permisos {#permissions}

### Acceso basado en roles {#role-based-access}
Para visualizar una Reference Table, los usuarios requieren el permiso `reference_tables_read`. Para crear o modificar Reference Table, los usuarios requieren el permiso `reference_tables_write`.

Para obtener más información sobre los permisos, consulte la [documentación de RBAC][6].

### Controles de acceso granulares {#granular-access-controls}
Restrinja el acceso a tablas individuales especificando una lista de equipos, roles o usuarios que tienen permitido visualizar o editarlas.

{{< img src="reference_tables/granular_permissions.png" alt="La opción de engranaje de Permisos que permite configurar permisos de acceso granulares en una tabla" style="width:100%;">}}

1. Haga clic en una tabla para abrir su página de detalles.
2. Haga clic en el icono de engranaje en la esquina superior derecha.
3. Seleccione {{< ui >}}Permissions{{< /ui >}} en el menú.
4. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
5. Utilice el menú desplegable para seleccionar uno o más equipos, roles o usuarios.
6. Haga clic en {{< ui >}}Add{{< /ui >}}.
7. Seleccione {{< ui >}}Editor{{< /ui >}} o {{< ui >}}Viewer{{< /ui >}}.
8. Haga clic en {{< ui >}}Save{{< /ui >}} para aplicar los cambios.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/lookup_processor/
[2]: /es/account_management/audit_trail/
[3]: /es/events/
[4]: /es/monitors/types/event/
[5]: /es/help/
[6]: /es/account_management/rbac/permissions/#reference-tables
[7]: /es/ddsql_editor/#save-and-share-queries