---
description: Reenvíe sus eventos de RUM y Product Analytics a su propio almacenamiento
  en la nube para cargarlos en un almacén de datos o para su retención a largo plazo.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: Obtenga más información sobre RUM without Limits
- link: /product_analytics/
  tag: Documentación
  text: Obtenga más información sobre Product Analytics
private: true
title: Export Pipelines
---
{{< callout url="https://www.datadoghq.com/product-preview/export-pipelines/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Export Pipelines está en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

Export Pipelines transmite sus eventos ingeridos de Real User Monitoring (RUM) y Product Analytics a un bucket de almacenamiento en la nube de su propiedad (Amazon S3, Azure Blob Storage o Google Cloud Storage) en formato JSON o Parquet.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="Lista de Export Pipelines en la página de configuración de la aplicación RUM" style="width:100%;">}}

Utilice Export Pipelines para:
- Cargar sus datos de eventos en su propio almacén de datos (como Snowflake, BigQuery o Databricks) para análisis e informes personalizados.
- Cumpla con los requisitos de cumplimiento o conserve eventos sin procesar para archivado a largo plazo e investigaciones ad-hoc.

Datadog solo gestiona la exportación desde su cuenta de Datadog a su sistema de almacenamiento en la nube.

## Cómo funciona {#how-it-works}

Export Pipelines es una función compartida entre [Real User Monitoring][4] y [Product Analytics][5]. Los Pipelines se configuran en dos niveles diferentes:

| Contexto | Fuente | Max Pipelines | Preajustes disponibles |
|---|---|---|---|
| Por aplicación | RUM | 1 | *Todos los tipos de eventos de RUM*, o *Solo sesiones, vistas y acciones* |
| Por aplicación | Product Analytics | 1 | *Todos los eventos de Product Analytics* (sesiones, vistas, acciones y eventos del lado del servidor) |
| Por organización | Product Analytics | 1 | *Perfiles de usuario y cuenta* |

El preajuste *Perfiles de usuario y cuenta* está limitado a una Pipeline por organización. Debido a que los datos de usuario y de perfil se comparten en todas sus aplicaciones, crear una Pipeline por aplicación resultaría en registros duplicados en su almacenamiento.

Cada Pipeline exporta de forma continua e independiente de los demás.

## Requisitos previos {#prerequisites}

- RUM está habilitado en la aplicación (o Product Analytics, o ambos).
- La integración de Datadog para su proveedor de nube está configurada: [Amazon Web Services][6], [Azure][7] o [Google Cloud][8].
- Su usuario de Datadog tiene el permiso `rum_write_archives`. Consulte [Role Based Access Control][1].

## Configure un Pipeline de exportación {#set-up-an-export-pipeline}

### 1. Configure su integración en la nube {#1-set-up-your-cloud-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si aún no está configurada, configure la [integración de AWS][1] para la cuenta que contiene su bucket de S3. Export Pipelines solo admite integraciones de AWS basadas en roles (STS) y no admite integraciones con claves de acceso.

[1]: /es/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Almacenamiento de Azure" %}}

Configure la [integración de Azure][1] en la suscripción que contiene su cuenta de almacenamiento, si aún no lo ha hecho. Esto implica [crear un registro de aplicación que Datadog pueda usar][2].

**Nota:** No se admite la exportación a Azure ChinaCloud ni a Azure GermanyCloud. La exportación a Azure GovCloud se admite en versión preliminar; comuníquese con el soporte de Datadog para solicitar acceso.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}
{{% tab "Almacenamiento de Google Cloud" %}}

Configure una [integración de Google Cloud][1] habilitada para STS para el proyecto que contiene su bucket de GCS, si aún no lo ha hecho. Esto implica [crear una cuenta de servicio de Google Cloud que Datadog pueda usar][2]. El destino también requiere un ID de proyecto de GCP.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /es/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 2. Crear un bucket de almacenamiento {#2-create-a-storage-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

En la [consola de AWS][1], [cree un bucket de S3][2] para sus exportaciones.

**Notas:**

- No haga que el bucket sea de lectura pública.
- Para los [sitios US1, US3 y US5][3], consulte los [precios de AWS][4] para conocer las tarifas de transferencia de datos entre regiones. Considere crear el bucket en `us-east-1` para minimizar los costos de transferencia.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /es/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Almacenamiento de Azure" %}}

- En el [Azure Portal][1], [crear una cuenta de almacenamiento][2]. Elija el rendimiento **Standard** o **Block blobs premium**, y seleccione el nivel de acceso **hot** o **cool**.
- Cree un **contenedor** dentro de esa cuenta de almacenamiento. Tome nota del nombre del contenedor; lo usará como referencia al configurar el Pipeline.

**Nota:** No establezca [políticas de inmutabilidad][3]. Algunos eventos necesitan ser reescritos ocasionalmente (normalmente al reintentar después de un tiempo de espera).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Almacenamiento de Google Cloud" %}}

En la [consola de Google Cloud][1], [cree un bucket de GCS][2] para sus exportaciones. En **Choose how to control access to objects** (Elija cómo controlar el acceso a los objetos), seleccione **Set object-level and bucket-level permissions.** (Establecer permisos a nivel de objeto y de bucket).

**Nota:** No agregue una [política de retención][3]. Algunos eventos necesitan ser reescritos ocasionalmente (normalmente al reintentar después de un tiempo de espera).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 3. Otorgue a Datadog acceso al bucket {#3-grant-datadog-access-to-the-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Cree una política][1] con las siguientes declaraciones:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogExportPipelineFiles",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       }
     ]
   }
   ```

   * `PutObject` es necesario para cargar archivos de exportación.
   * `GetObject` es necesario para ejecutar **Test Configuration**, que escribe un archivo de prueba y lo vuelve a leer para verificar el acceso.
   * El valor del recurso debe terminar con `/*` — estos permisos se aplican a los objetos dentro de los buckets.

2. Edite los nombres de los buckets.
3. Opcionalmente, restrinja la política a rutas específicas.
4. Adjunte la política al rol de integración de Datadog:
   * En la consola de AWS IAM, vaya a **Roles** y abra el rol utilizado por la integración de Datadog. De forma predeterminada se llama `DatadogIntegrationRole`, pero el nombre puede variar si su organización lo cambió.
   * Haga clic en **Add permissions**, luego en **Attach policies**.
   * Ingrese el nombre de la política que acaba de crear.
   * Haga clic en **Attach policies**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Almacenamiento de Azure" %}}

1. Otorgue a la aplicación de Datadog permiso para escribir en su cuenta de almacenamiento.
2. En la [Storage accounts page][1], seleccione su cuenta de almacenamiento, abra **Access Control (IAM)** y elija **Add → Add Role Assignment**.
3. Asigne el rol **Storage Blob Data Contributor** a la aplicación de Datadog que creó al integrarse con Azure, luego guarde.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Almacenamiento de Google Cloud" %}}

1. Otorgue a su cuenta de servicio de Google Cloud de Datadog permiso para escribir en su bucket.
2. En la [página de administración de IAM de Google Cloud][1], seleccione su cuenta de servicio de Datadog y haga clic en **Editar principal**.
3. Haga clic en **ADD ANOTHER ROLE**, seleccione **Storage Object Admin** y guarde.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

**Nota:** Si su bucket restringe el acceso a la red por IP, agregue los rangos de IP del webhook desde el {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.

### 4. Configure el Pipeline en Datadog {#4-configure-the-pipeline-in-datadog}

1. En Datadog, navegue a **Experiencia digital > Real User Monitoring > Administrar aplicaciones**.
2. Seleccione su aplicación, luego vaya a **Enrutamiento > Export Pipelines**.
3. Haga clic en **New Export Pipeline**.
4. Complete cada sección del panel lateral:

   **Definir datos para exportar**

   Elija los datos que desea exportar. Las opciones de fuente y preestablecidas están claramente etiquetadas en la interfaz de usuario.

   **Formato de archivo**

   {{< img src="real_user_monitoring/rum_export/rum-export-data-format.png" alt="Opciones de selección de datos y formato de archivo en el panel de configuración de Export Pipeline" style="width:85%;">}}

   - **Parquet**: ideal para cargar directamente en un almacén de datos como BigQuery, Snowflake o Databricks.
   - **JSON**: ideal cuando desea procesar los datos con su propio pipeline.

   **Seleccione tipo de almacenamiento y configure bucket**

   | Proveedor | Campos |
   |---|---|
   | **Amazon S3** | Cuenta y rol de AWS (de su integración de AWS); **Bucket** (obligatorio); **Ruta** (prefijo opcional) |
   | **Azure Blob Storage** | Inquilino y cliente de Azure (de su integración de Azure); **Cuenta de almacenamiento** (obligatorio); **Contenedor** (obligatorio); **Ruta** (prefijo opcional) |
   | **Google Cloud Storage** | Cuenta de servicio de GCP (de su integración de Google Cloud); **Bucket** (obligatorio); **Ruta** (prefijo opcional) |

5. Opcionalmente, haga clic en **Probar configuración**. Datadog escribe un pequeño archivo de prueba en su bucket y lo vuelve a leer para verificar el acceso. Corrija cualquier problema de permisos o nombres reportado antes de guardar.
6. Haga clic en **Add Export Pipeline** para iniciar el Pipeline.

## Estados del Pipeline {#pipeline-statuses}

Una vez creada, un Pipeline muestra uno de estos estados en la página de Export Pipelines:

| Estado   | Significado                                                                                                                        |
|----------|--------------------------------------------------------------------------------------------------------------------------------|
| Activo   | Datadog está exportando eventos correctamente.                                                                                      |
| Pendiente  | El Pipeline se acaba de crear o actualizar. Espere unos minutos antes de la primera carga.                                         |
| Error    | Datadog no pudo escribir en el bucket; generalmente es un problema de permisos o de nombres. Abra el Pipeline y ejecute **Probar configuración** para ver los detalles. |
| Pausado   | El Pipeline está deshabilitado. No se exportan eventos.                                                                              |

Si un Pipeline permanece en **Pendiente** durante más de 15 minutos, ejecute **Probar configuración** para detectar el problema subyacente.

## Formato de archivo {#file-format}

Los archivos están organizados en una estructura de directorios que facilita la consulta de archivos por fecha:

```
/<path>/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.<ext>
```

| Formato  | Extensión     | Notas                                                          |
|---------|---------------|----------------------------------------------------------------|
| JSON    | `.json.gz`    | JSON delimitado por nuevas líneas comprimido con Gzip.                        |
| Parquet | `.parquet`    | Codificación Parquet nativa (sin contenedor gzip). Una fila por evento con columnas tipadas. Se pueden cargar directamente en Snowflake, BigQuery y Databricks sin preprocesamiento. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /es/api/latest/rum/
[4]: /es/real_user_monitoring/
[5]: /es/product_analytics/
[6]: /es/integrations/amazon-web-services/
[7]: /es/integrations/azure/
[8]: /es/integrations/google_cloud_platform/