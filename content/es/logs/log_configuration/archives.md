---
aliases:
- /es/logs/s3/
- /es/logs/gcs/
- /es/logs/archives/s3/
- /es/logs/archives/gcs/
- /es/logs/archives/gcp/
- /es/logs/archives/
description: Reenvía todos tus logs ingeridos al almacenamiento a largo plazo.
further_reading:
- link: /logs/archives/rehydrating
  tag: Documentación
  text: Aprende a acceder a tu contenido de logs archivados en Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Más información sobre Log Explorer
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Más información sobre Logging without Limits*
title: Archivos de log
---

## Información general

Configura tu cuenta de Datadog para reenviar todos los logs ingestados (ya sea que esté [indexado][1] o no) a un sistema de almacenamiento en la nube de tu propiedad. Conserva tus logs en un archivo optimizado para el almacenamiento durante más tiempo y cumple los requisitos de conformidad, al tiempo que mantienes la auditabilidad para investigaciones ad hoc, con [Recuperación][2].

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Pestaña de Archivos en la página Reenvío de logs" style="width:100%;">}}

Ve a la [page (página) **Log Archiving & Forwarding** (Archivo y reenvío de logs)][3] para configurar un archivo para reenviar loga su propio bucket de almacenamiento alojado en la nube.

1. Si aún no lo has hecho, configura una [integración] de Datadog (#set-up-an-integration) para tu proveedor de nube.
2. Crea un [bucket de almacenamiento](#create-a-storage-bucket).
3. Establece [permisos](#set-permissions) en `read` o `write` en ese archivo.
4. [Enruta tus logs](#route-your-logs-to-a-bucket) hacia y desde ese archivo.
5. Establece la [configuración avanzada](#advanced-settings) como cifrado, clase de almacenamiento y etiquetas (tags).
6. [Valida](#validation) tu configuración y busca posibles errores de configuración que Datadog podría detectar por ti.

Consulta cómo [archivar tus logs con Pipelines de observabilidad][4] si deseas dirigir tus logs a un archivo optimizado para el almacenamiento directamente desde tu entorno.

Las siguientes métricas informan sobre los logs que se han archivado correctamente, incluidos los logs que se enviaron correctamente tras reintentos.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## Configurar un archivo

### Establecer una integración

{{< tabs >}}
{{% tab "AWS S3" %}}

Si aún no está configurada, configura [la integración de AWS][1] para la cuenta de AWS que contiene tu bucket de S3.
   * En el caso general, se trata de crear un rol que Datadog pueda utilizar para integrarse con AWS S3.
   * En el caso específico de las cuentas de AWS China, utiliza claves de acceso como alternativa a la delegación de roles.

[1]: /es/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Configura [la integración de Azure][1] dentro de la suscripción que contiene tu nueva cuenta de almacenamiento, si aún no lo has hecho. Esto implica [crear un registro de aplicación que Datadog pueda utilizar][2] para integrarla.

**Nota:** El archivado en Azure ChinaCloud y Azure GermanyCloud no es compatible. El archivado en Azure GovCloud es compatible con la versión preliminar. Para solicitar acceso, ponte en contacto con el servicio de asistencia de Datadog.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Configura la [integración de Google Cloud][1] para el proyecto que contiene tu bucket de almacenamiento de GCS, si aún no lo has hecho. Esto implica [crear una cuenta de servicio de Google Cloud que Datadog pueda utilizar][2] para integrarla.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /es/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Crear un bucket de almacenamiento

{{< site-region region="gov" >}}
<div class="alert alert-danger">El envío de logs a un archivo queda fuera del entorno de Datadog GovCloud, que está fuera del control de Datadog. Datadog no será responsable de ningún log que haya salido del entorno de Datadog GovCloud, incluidas, entre otras, las obligaciones o requisitos que el usuario pueda tener en relación con FedRAMP, DoD Impact Levels, ITAR, cumplimiento de las normas de exportación, residencia de datos o normativas similares aplicables a dichos logs.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Entra en tu [consola de AWS][1] y [crea un bucket de S3][2] al que enviar tus archivos.

{{< site-region region="gov" >}}
<div class="alert alert-danger"> Los archivos de Datadog no admiten nombres de bucket con puntos (.) cuando se integran con un endpoint de FIPS de S3 que se basa en el direccionamiento de estilo de host virtual. Obtén más información en la documentación de AWS. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> y <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**Notas:**

- No pongas tu bucket a disposición del público.
- Para los sitios [US1, US3 y US5][3], consulta [Precios de AWS][4] para conocer las tarifas de transferencia de datos entre regiones y cómo pueden verse afectados los costes de almacenamiento en la nube. Considera la posibilidad de crear tu bucket de almacenamiento en `us-east-1` para gestionar tus tarifas de transferencia de datos entre regiones.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /es/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* Ve a tu [Portal de Azure][1] y [crea una cuenta de almacenamiento][2] a la que enviar tus archivos. Asigna un nombre a tu cuenta de almacenamiento, selecciona el tipo de cuenta de rendimiento estándar o **Block blobs** premium y selecciona el nivel de acceso **hot** (activo) o **cool** (inactivo).
* Crea un servicio de **contenedor** en esa cuenta de almacenamiento. Toma nota del nombre del contenedor ya que necesitarás añadirlo en la Página de archivo de Datadog.

**Nota:** No establezcas [políticas de inmutabilidad][3] porque los últimos datos deben ser reescritos en algunos casos poco frecuentes (típicamente un tiempo de inactividad).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Accede a tu [cuenta de Google Cloud][1] y [crea un bucket de GCS][2] al que enviar tus archivos. En **Choose how to control access to objects** (Elige cómo controlar el acceso a los objetos), selecciona **Set object-level and bucket-level permissions** (Configurar permisos a nivel de objeto y a nivel de bucket).

**Nota:** No añadas una [política de retención][3] porque los últimos datos deben ser reescritos en algunos casos poco frecuentes (típicamente un tiempo de inactividad).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Establecer permisos

Solo los usuarios de Datadog con el [permiso`logs_write_archive`][5] pueden crear, modificar o eliminar configuraciones de archivo de log.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Crear una política][1] con las siguientes declaraciones de permiso:

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
     * Los permisos `GetObject` y `ListBucket` permiten [recuperar a partir de archivos][2].
     * El permiso `PutObject` es suficiente para cargar archivos.
     * Asegúrate de que el valor del recurso en las acciones `s3:PutObject` y `s3:GetObject` termina con `/*` porque estos permisos se aplican a objetos dentro de los buckets.

2. Edita los nombres de los buckets.
3. Opcionalmente, especifica las rutas que contienen tus archivos de log.
4. Adjunta la nueva política al rol de integración de Datadog.
   * Ve a **Roles** en la consola IAM en AWS.
   * Localiza el rol utilizado por la integración Datadog. Por defecto se llama **DatadogIntegrationRole**, pero el nombre puede variar si tu organización le ha cambiado el nombre. Haz clic en el nombre del rol para abrir la página de resumen del rol.
   * Haz clic en **Add permissions** (Añadir permisos) y, luego, en **Attach policies** (Adjuntar políticas).
   * Introduce el nombre de la política creada anteriormente.
   * Haz clic en **Attach policies** (Adjuntar políticas).


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /es/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Concede a la aplicación de Datadog el permiso para escribir y recuperar desde tu cuenta de almacenamiento.
2. Selecciona tu cuenta de almacenamiento en la [página Cuentas de almacenamiento][1], ve a **Access Control (IAM)** (Control de acceso (IAM)) y selecciona**Add -> Add Role Assignment** (Añadir -> Añadir asignación del rol).
3. Introduce el rol denominado **Storage Blob Data Contributor**, selecciona la aplicación de Datadog que creaste para integrarse con Azure y selecciona guardar.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Añadir el rol Storage Blob Data Contributor a tu aplicación de Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Concede a tu cuenta de servicio de Datadog Google Cloud permisos para escribir tus archivos en tu bucket.
2. Selecciona la entidad principal de la cuenta de servicio de Datadog Google Cloud en la [página de administración de Google Cloud IAM][1] y selecciona **Edit principal** (Editar entidad principal).
3. Haz clic en **ADD ANOTHER ROLE** (AÑADIR OTRO ROL), selecciona el rol **Storage Object Admin** y selecciona guardar.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Añade el rol Storage Object Admin a tu cuenta de servicio de Datadog Google Cloud." style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Dirige tus logs a un bucket

Ve a la [page (pagina) Archivo y reenvío de logs][6] y selecciona **Add new archive** (Añadir nuevo archivo) en la pestaña **Archives** (Archivos).

**Notas:**
* Solo los usuarios de Datadog con el [permiso `logs_write_archive`][5] pueden completar este paso y el siguiente.
* Para archivar logs en Azure Blob Storage es necesario registrarse en la aplicación. Consulta las instrucciones [en la página de integración de Azure][7], y establece el "sitio" en la parte derecha de la página de documentación en "US". Los Registros de aplicación creados con fines de archivado solo necesitan el rol "Storage Blob Data Contributor". Si tu bucket de almacenamiento se encuentra en una suscripción que está siendo supervisada a través de un recurso de Datadog, se mostrará una advertencia acerca de que el Registro de aplicación es redundante. Puedes ignorar esta advertencia.
* Si tu bucket restringe el acceso de red a las IP especificadas, añade las IP de los webhooks de {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.
* Para el **sitio US1-FED**, puedes configurar Datadog para que envíe los logs a un destino fuera del entorno de GovCloud de Datadog. Datadog no es responsable de ningún log que salga del entorno de GovCloud de Datadog. Además, Datadog no es responsable de ninguna obligación o requisito que puedas tener en relación con FedRAMP, DoD Impact Levels, ITAR, cumplimiento de las normas de exportación, residencia de datos o normativas similares aplicables a estos logs una vez que abandonan el entorno de GovCloud.

| Servicio                  | Pasos                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Selecciona la combinación de la cuenta y rol de AWS adecuada para tu bucket de S3.<br>- Introduce el nombre de tu bucket.<br>**Opcional**: introduce un directorio prefijo para todo el contenido de tus archivos de log. |
| **Almacenamiento de Azure**        | - Selecciona el tipo de archivo **Azure Storage** (Almacenamiento de Azure), y el inquilino y cliente de Azure para la aplicación de Datadog que tiene el rol Storage Blob Data Contributor en tu cuenta de almacenamiento.<br>- Introduce el nombre de tu cuenta de almacenamiento y el nombre de contenedor para tu archivo.<br>**Opcional**: introduce un directorio prefijo para todo el contenido de tus archivos de log. |
| **Google Cloud Storage** | - Seleccione el tipo de archivo **Google Cloud Storage** (Almacenamiento de Google Cloud) y la cuenta de servicio de GCS que tiene permisos para escribir en tu bucket de almacenamiento.<br>- Introduce el nombre de tu bucket.<br>**Opcional**: introduce un directorio prefijo para todo el contenido de tus archivos de log. |

### Configuración avanzada

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="Configuración avanzada para añadir etiquetas opcionales y definir el tamaño máximo de análisis" style="width:100%;" >}}

#### Etiquetas de Datadog

Utiliza este paso de configuración opcional para:

* Incluir todas las etiquetas de log en tus archivos (activado por defecto en todos los archivos nuevos). **Nota**: Esto aumenta el tamaño de los archivos resultantes.
* Añadir etiquetas en los logs recuperados de acuerdo con tu política de Consultas de restricción. Consulta el permiso [`logs_read_data`][13].

#### Definir el tamaño máximo de escaneado

Utiliza este paso de configuración opcional para definir el volumen máximo de datos de log (en GB) que se pueden escanear para la recuperación en tus archivos de log.

Para los archivos con un tamaño máximo de escaneado definido, todos los usuarios deben estimar el tamaño del escaneado antes de que se les permita iniciar una recuperación. Si el tamaño de escaneado estimado es superior al permitido para ese archivo, los usuarios deben reducir el intervalo en el que solicitan la recuperación. La reducción del intervalo reducirá el tamaño del escaneado y permitirá al usuario iniciar una recuperación.

{{< site-region region="us3" >}}
#### Reglas del cortafuegos

{{< tabs >}}
{{% tab "Azure storage" %}}

No se admiten reglas de cortafuegos.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### Clase de almacenamiento

{{< tabs >}}
{{% tab "AWS S3" %}}

Puedes seleccionar una clase de almacenamiento para tu archivo o [establecer una configuración de ciclo de vida en tu bucket de S3][1] para realizar una transición automática de tus archivos de log a clases de almacenamiento óptimas.

La [recuperación][2] solo admite las siguientes clases de almacenamiento:

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* Recuperación instantánea de S3 Glacier
* S3 Intelligent-Tiering, sólo si [los niveles opcionales de acceso asíncrono a los archivos][3] están ambos desactivados.

Si deseas recuperar a partir de archivos de otra clase de almacenamiento, primero debes moverlos a una de las clases de almacenamiento admitidas mencionadas anteriormente.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /es/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

El archivado y la [recuperación][1] solo admiten los siguientes niveles de acceso:

- Nivel de acceso activo
- Nivel de acceso inactivo

Si deseas recuperar a partir de archivos de otro nivel de acceso, primero debes moverlos a uno de los niveles admitidos mencionados anteriormente.

[1]: /es/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Archivo y [rehidratación][1] admite los siguientes niveles de acceso:

- Standard (Estándar)
- Nearline
- Coldline
- Archivo

[1]: /es/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### Cifrado del lado del servidor (SSE) para archivos de S3

Al crear o actualizar un archivo de S3 en Datadog, puedes optar por configurar **Advanced Encryption** (Cifrado avanzado). Hay tres opciones disponibles en el menú desplegable **Encryption Type** (Tipo de cifrado):

- **Cifrado predeterminado a nivel de bucket de S3** (predeterminado): Datadog no anula la configuración de cifrado predeterminado de tu bucket de S3.
- **Claves gestionadas de Amazon S3**: fuerza el cifrado del lado del servidor utilizando claves administradas de Amazon S3 ([SSE-S3][1]), independientemente del cifrado predeterminado del bucket de S3.
- **AWS Key Management Service**: fuerza el cifrado del lado del servidor utilizando una clave gestionada por el cliente (CMK) de [AWS KMS][2], independientemente del cifrado predeterminado del bucket de S3. Deberás proporcionar el ARN de la CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
{{< tabs >}}
{{% tab "Default S3 Bucket-Level Encryption" %}}

Cuando se selecciona esta opción, Datadog no especifica ningún encabezado de cifrado en la solicitud de carga. Se aplicará el cifrado predeterminado de tu bucket de S3.

Para configurar o comprobar la configuración del cifrado de tu bucket S3:

1. Navega hasta tu bucket de S3.
2. Haz clic en la pestaña **Propiedades**.
3. En la sección **Default Encryption** (Cifrado por defecto), configura o confirma el tipo de cifrado. Si tu cifrado utiliza [AWS KMS][1], asegúrate de que tienes una CMK válida y una política de CMK adjunta a tu CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Amazon S3 managed keys" %}}

Esta opción garantiza que todos los objetos de archivo se carguen con [SSE_S3][1], mediante claves administradas de Amazon S3. Esto sustituye cualquier configuración de cifrado predeterminada en el bucket de S3.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

Esta opción garantiza que todos los objetos de archivo se carguen mediante una clave gestionada por el cliente (CMK) de [AWS KMS][1]. Esto sustituye cualquier configuración de cifrado predeterminada en el bucket de S3.

Asegúrate de haber completado los siguientes pasos para crear una CMK y una política de CMK válidas. A continuación, proporciona el ARN de CMK para configurar correctamente este tipo de cifrado.

1. Crea tu CMK.
2. Adjunta una política de CMK a tu CMK con el siguiente contenido, sustituyendo según corresponda el número de cuenta de AWS y el nombre de rol de Datadog IAM:

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

3. Después de seleccionar **AWS Key Management Service** como tu **Encryption Type** (Tipo de cifrado) en Datadog, introduce tu ARN de la clave de AWS KMS.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
{{% /tab %}}
{{< /tabs >}}

### Validación

Una vez que los ajustes del archivo se hayan configurado correctamente en tu cuenta de Datadog, tus pipelines de procesamiento comenzarán a enriquecer todos los logs que se ingieran en Datadog. Estos logs se reenvían posteriormente a tu archivo.

Sin embargo, después de crear o actualizar las configuraciones de los archivos, pueden pasar varios minutos antes de que se intente la siguiente carga de archivos. La frecuencia con la que se cargan los archivos puede variar. **Consulta tu bucket de almacenamiento de nuevo en 15 minutos** para asegurarte de que los archivos se están cargando correctamente desde tu cuenta de Datadog. 

Después, si el archivo sigue en estado pendiente, comprueba tus filtros de inclusión para asegurarte de que la consulta es válida y coincide con eventos de log en [Live Tail][14]. Cuando Datadog no consigue cargar logs en un archivo externo, debido a cambios involuntarios en la configuración o los permisos, el archivo de log correspondiente aparece resaltado en la página de configuración.

{{< img src="logs/archives/archive_errors_details.png" alt="Comprueba que tus archivos están correctamente configurados" style="width:100%;">}}

Pasa el ratón por encima del archivo para ver los detalles del error y las acciones a realizar para resolver el problema. También se genera un evento en el [Log Explorer][15]. Puedes crear un monitor para estos eventos con el fin de detectar y solucionar fallos rápidamente.

## Múltiples archivos

Si se definen múltiples archivos, los logs introducen el primer archivo en función del filtro.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Los logs introducen el primer archivo con el que coincide el filtro." style="width:100%;">}}

Es importante ordenar los archivos con cuidado. Por ejemplo, si creas un primer archivo filtrado con la etiqueta `env:prod` y un segundo archivo sin ningún filtro (el equivalente a `*`), todos tus logs de producción irían a un bucket o ruta de almacenamiento, y el resto iría al otro.

## Formato de los archivos

Los archivos de log que Datadog reenvía a tu bucket de almacenamiento están en formato JSON comprimido (`.json.gz`). Utilizando el prefijo que indiques (o `/` si no hay ninguno), los archivos se almacenan en una estructura de directorios que indica en qué fecha y a qué hora se generaron los archivos de almacenamiento, como la siguiente:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

Esta estructura de directorios simplifica el proceso de consulta de tus archivos de log históricos en función de su fecha.

Dentro del archivo JSON comprimido, el contenido de cada evento tiene el siguiente formato:

```json
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
    "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
    "tags": [ "env:prod", "team:acme" ]
}
```

**Nota**: Los logs se almacenan como JSON delimitado por nuevas líneas (NDJSON), lo que significa que cada línea del archivo es un objeto JSON válido que representa un evento de log.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/indexes/#exclusion-filters
[2]: /es/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /es/observability_pipelines/archive_logs/
[5]: /es/account_management/rbac/permissions/?tab=ui#logs_write_archives
[6]: https://app.datadoghq.com/logs/pipelines/archives
[7]: /es/integrations/azure/
[8]: https://ip-ranges.datadoghq.com/
[9]: /es/account_management/rbac/permissions#logs_write_archives
[10]: /es/account_management/rbac/permissions#logs_read_archives
[11]: /es/account_management/rbac/permissions#logs_write_historical_view
[12]: /es/account_management/rbac/permissions#logs_read_index_data
[13]: /es/account_management/rbac/permissions#logs_read_data
[14]: /es/logs/explorer/live_tail/
[15]: /es/service_management/events/explorer/