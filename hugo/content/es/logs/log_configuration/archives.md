---
aliases:
- /es/logs/s3/
- /es/logs/gcs/
- /es/logs/archives/s3/
- /es/logs/archives/gcs/
- /es/logs/archives/gcp/
- /es/logs/archives/
description: Reenvíe todos sus registros ingeridos al almacenamiento a largo plazo.
further_reading:
- link: /logs/archives/rehydrating
  tag: Documentación
  text: Obtenga información sobre cómo acceder a su contenido de registro archivado
    en Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Obtenga información sobre Log Explorer
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Obtenga más información sobre Logging without Limits*
title: Archivos de registros
---
## Descripción general {#overview}

Configure su cuenta de Datadog para reenviar todos los registros ingeridos, ya sean [indexados][1] o no, a un sistema de almacenamiento en la nube propio. Mantenga sus registros en un archivo optimizado para almacenamiento durante períodos más largos y cumpla con los requisitos de cumplimiento, sin perder la capacidad de auditoría para investigaciones ad hoc, con [Rehydration][2] o [Archive Search][16].

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Pestaña Archives en la página Log Forwarding" style="width:100%;">}}

Navegue a la [página {{< ui >}}Log Archiving & Forwarding{{< /ui >}}][3] para configurar un archivo para reenviar los registros ingeridos a su propio bucket de almacenamiento alojado en la nube.

1. Si aún no lo ha hecho, configure una [integración](#set-up-an-integration) de Datadog para su proveedor de nube.
2. Cree un [bucket de almacenamiento](#create-a-storage-bucket).
3. Establezca [permisos](#set-permissions) para `read` y/o `write` en ese archivo.
4. [Dirija sus registros](#route-your-logs-to-a-bucket) hacia y desde ese archivo.
5. Configure [ajustes avanzados](#advanced-settings) como cifrado, clase de almacenamiento y etiquetas.
6. [Valide](#validation) su configuración y verifique posibles errores de configuración que Datadog podría detectar por usted.

Consulte cómo [archivar sus registros con Observability Pipelines][4] si desea dirigir sus registros a un archivo optimizado para almacenamiento directamente desde su entorno.

Las siguientes métricas informan sobre los registros que se han archivado correctamente, incluidos los registros que se enviaron correctamente después de los reintentos.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## Configurar un archivo {#configure-an-archive}

### Configurar una integración {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si aún no está configurado, configure la [integración de AWS][1] para la cuenta de AWS que contiene su bucket de S3.
   * En el caso general, esto implica crear un rol que Datadog pueda usar para integrarse con AWS S3.
   * Específicamente para cuentas de AWS China, use claves de acceso como alternativa a la delegación de roles.

[1]: /es/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Almacenamiento de Azure" %}}

Configure la [integración de Azure][1] dentro de la suscripción que contiene su nueva cuenta de almacenamiento, si aún no lo ha hecho. Esto implica [crear un registro de aplicación que Datadog pueda usar][2] para integrarse.

**Nota:** No se admite el archivado en Azure ChinaCloud ni en Azure GermanyCloud. El archivado en Azure GovCloud se admite en Preview. Para solicitar acceso, contacte a soporte de Datadog.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Almacenamiento de Google Cloud" %}}

Configure la [integración de Google Cloud][1] para el proyecto que contiene su bucket de almacenamiento de GCS, si aún no lo ha hecho. Esto implica [crear una cuenta de servicio de Google Cloud que Datadog pueda usar][2] para integrarse.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /es/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Crear un bucket de almacenamiento {#create-a-storage-bucket}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El envío de registros a un archivo se realiza fuera del entorno Datadog GovCloud, el cual está fuera del control de Datadog. Datadog no será responsable de ningún registro que haya salido del entorno Datadog GovCloud, incluyendo, sin limitación, cualquier obligación o requisito que el usuario pueda tener relacionado con FedRAMP, niveles de impacto del DoD, ITAR, cumplimiento de exportaciones, residencia de datos o regulaciones similares aplicables a dichos registros.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Vaya a su [consola de AWS][1] y [cree un bucket de S3][2] al cual enviar sus archivos.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> Los archivos de Datadog no admiten nombres de buckets con puntos (.) cuando se integran con un punto de conexión FIPS de S3 que utiliza direccionamiento de estilo de servidor virtual. Obtenga más información en la documentación de AWS. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> y <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**Notas:**

- No haga que su bucket sea de lectura pública.
- Para los [sitios US1, US3 y US5][3], consulte [AWS Pricing][4] para conocer las tarifas de transferencia de datos entre regiones y cómo pueden verse afectados los costos de almacenamiento en la nube. Considere crear su bucket de almacenamiento en `us-east-1` para gestionar sus tarifas de transferencia de datos entre regiones.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /es/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Almacenamiento de Azure" %}}

* Vaya a [Azure Portal][1] y [cree una cuenta de almacenamiento][2] a la cual enviar sus archivos. Asigne un nombre a su cuenta de almacenamiento, seleccione el tipo de cuenta de rendimiento estándar o {{< ui >}}Block blobs{{< /ui >}} premium, y seleccione el nivel de acceso {{< ui >}}hot{{< /ui >}} o {{< ui >}}cool{{< /ui >}}.
* Cree un servicio {{< ui >}}container{{< /ui >}} en esa cuenta de almacenamiento. Tome nota del nombre del contenedor, ya que deberá agregarlo en la página de archivos de Datadog.

**Nota:** No establezca [políticas de inmutabilidad][3] porque los datos más recientes deben sobrescribirse en algunos casos poco frecuentes (normalmente una incidencia de tiempo de espera).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Almacenamiento de Google Cloud" %}}

Vaya a su [cuenta de Google Cloud][1] y [cree un bucket de GCS][2] al cual enviar sus archivos. En {{< ui >}}Choose how to control access to objects{{< /ui >}}, seleccione {{< ui >}}Set object-level and bucket-level permissions{{< /ui >}}.

**Nota:** No agregue una [política de retención][3] porque los datos más recientes deben sobrescribirse en algunos casos poco frecuentes (normalmente una incidencia de tiempo de espera).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Establezca los permisos {#set-permissions}

Solo los usuarios de Datadog con el [permiso `logs_write_archive`][5] pueden crear, modificar o eliminar configuraciones de archivos de registros.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Cree una política][1] con las siguientes declaraciones de permisos:

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
     * The `GetObject` and `ListBucket` permissions allow for [searching archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. Edite los nombres de los buckets.
3. Opcionalmente, especifique las rutas que contienen sus archivos de registro.
4. Adjunte la nueva política al rol de integración de Datadog.
   * Navegue a {{< ui >}}Roles{{< /ui >}} en la consola de IAM de AWS.
   * Localice el rol utilizado por la integración de Datadog. De forma predeterminada se llama **DatadogIntegrationRole**, pero el nombre puede variar si su organización lo ha cambiado. Haga clic en el nombre del rol para abrir la página de resumen del rol.
   * Haga clic en {{< ui >}}Add permissions{{< /ui >}} y luego en {{< ui >}}Attach policies{{< /ui >}}.
   * Ingrese el nombre de la política creada anteriormente.
   * Haga clic en {{< ui >}}Attach policies{{< /ui >}}.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /es/logs/explorer/archive_search/
{{% /tab %}}
{{% tab "Almacenamiento de Azure" %}}

1. Otorgue permiso a la aplicación de Datadog para escribir y leer en su cuenta de almacenamiento.
2. Seleccione su cuenta de almacenamiento en la [página Storage Accounts][1], vaya a {{< ui >}}Access Control (IAM){{< /ui >}} y seleccione {{< ui >}}Add{{< /ui >}} > {{< ui >}}Add Role Assignment{{< /ui >}}.
3. Ingrese el rol llamado **Storage Blob Data Contributor**, seleccione la aplicación de Datadog que creó para integrarse con Azure y guarde.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Agregue el rol Storage Blob Data Contributor a su aplicación de Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Almacenamiento de Google Cloud" %}}

1. Otorgue a su cuenta de servicio de Google Cloud de Datadog permisos para escribir sus archivos en su bucket.
2. Seleccione el principal de su cuenta de servicio de Google Cloud de Datadog en la [página Google Cloud IAM Admin][1] y seleccione {{< ui >}}Edit principal{{< /ui >}}.
3. Haga clic en {{< ui >}}ADD ANOTHER ROLE{{< /ui >}}, seleccione el rol {{< ui >}}Storage Object Admin{{< /ui >}} y guarde.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Agregue el rol Storage Object Admin a su cuenta de servicio de Google Cloud de Datadog." style="width:75%;">}}

El rol {{< ui >}}Storage Object Admin{{< /ui >}} es la configuración recomendada por Datadog. Si su organización requiere un rol personalizado de privilegios mínimos, se necesitan los siguientes permisos individuales para las cargas de registros archivados:

- `storage.objects.create`
- `storage.objects.get`
- `storage.objects.list`
- `storage.objects.delete`

`storage.objects.delete` es necesario para admitir reintentos de escritura de archivo, donde Datadog sobrescribe un objeto existente en el bucket. Los permisos de carga multipart (`storage.multipartUploads.*`) no son necesarios.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Dirija sus registros a un bucket {#route-your-logs-to-a-bucket}

Navegue a la [página Log Archiving & Forwarding][6] y seleccione {{< ui >}}Add a new archive{{< /ui >}} en la pestaña {{< ui >}}Archives{{< /ui >}}.

**Notas:**
* Solo los usuarios de Datadog con el [`logs_write_archive`permiso ][5] pueden completar este y el siguiente paso.
* Archivar registros en Azure Blob Storage requiere una App Registration. Consulte las instrucciones [en la página de integración de Azure][7] y establezca "site" en "US" en el lado derecho de la página de documentación. Las App Registrations creadas solo para archivar registros necesitan únicamente el rol "Storage Blob Data Contributor". Si su bucket de almacenamiento se encuentra en una suscripción supervisada a través de un Datadog Resource, se muestra una advertencia que indica que la App Registration es redundante. Puede ignorar esta advertencia.
* Si su bucket restringe el acceso a la red a direcciones IP específicas, agregue las direcciones IP del webhook desde el {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.
* Para los **sitios US1-FED y US2-FED**, puede configurar Datadog para enviar registros a un destino fuera del entorno Datadog GovCloud. Datadog no es responsable de ningún registro que salga del entorno Datadog GovCloud. Además, Datadog no es responsable de ninguna obligación o requisito que usted pueda tener con respecto a FedRAMP, DoD Impact Levels, ITAR, cumplimiento de exportaciones, residencia de datos o regulaciones similares aplicables a estos registros después de que abandonen el entorno GovCloud.

| Servicio                  | Pasos                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Seleccione la combinación de cuenta y rol de AWS apropiada para su bucket de S3.<br>- Ingrese el nombre de su bucket.<br>**Opcional**: Ingrese un directorio como prefijo para todo el contenido de sus archivos de registro. |
| **Azure Storage**        | - Seleccione el tipo de archivo {{< ui >}}Azure Storage{{< /ui >}}, y el tenant y el cliente de Azure para la Datadog App que tiene el rol Storage Blob Data Contributor en su cuenta de almacenamiento.<br>- Ingrese el nombre de su cuenta de almacenamiento y el nombre del contenedor para su archivo.<br>**Opcional**: Ingrese un directorio como prefijo para todo el contenido de sus archivos de registro. |
| **Google Cloud Storage** | - Seleccione el tipo de archivo {{< ui >}}Google Cloud Storage{{< /ui >}} y la cuenta de servicio de GCS que tiene permisos para escribir en su bucket de almacenamiento.<br>- Ingrese el nombre de su bucket.<br>**Opcional**: Ingrese un directorio como prefijo para todo el contenido de sus archivos de registro. |

### Configuración avanzada {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="Configuración avanzada para agregar etiquetas opcionales y definir el tamaño máximo de escaneo" style="width:100%;" >}}

#### Etiquetas de Datadog {#datadog-tags}

Utilice este paso de configuración opcional para:

* Incluir todas las etiquetas de registro en sus archivos (opción activada de forma predeterminada en todos los archivos nuevos). **Nota**: Esto aumenta el tamaño de los archivos resultantes.
* Agregar etiquetas a los registros rehidratados de acuerdo con su política de Restriction Queries. Consulte el permiso [`logs_read_data`][13].

#### Definir tamaño máximo de escaneo {#define-maximum-scan-size}

Utilice este paso de configuración opcional para definir el volumen máximo de datos de registro (en GB) que se puede escanear durante Archive Search o Rehydration en sus archivos de registro.

Para los archivos con un tamaño máximo de escaneo definido, todos los usuarios deben estimar el tamaño del escaneo antes de poder iniciar Archive Search o Rehydration. Si el tamaño de escaneo estimado es mayor que lo permitido para ese archivo, los usuarios deben reducir el rango de tiempo de su solicitud. Reducir el rango de tiempo disminuirá el tamaño del escaneo y permitirá al usuario iniciar Archive Search o Rehydration.

**Nota**: Para reducir el volumen de datos escaneados durante [Archive Search][16], configure [Partition Attributes](#archive-partition-attribute) y [Lookup Attributes](#archive-lookup-attribute) en su archivo. Los atributos de partición reducen el contexto de la búsqueda al omitir segmentos de datos irrelevantes, mientras que los atributos de búsqueda aceleran la localización de entradas de registro específicas.

Para ambos tipos de atributos, ingrese etiquetas y [atributos reservados][19] como `env`, `service` o `trace_id` sin el prefijo `@`. Anteponga el prefijo `@` a todos los demás atributos.

#### Atributo de partición de archivo {#archive-partition-attribute}

Los atributos de partición organizan los registros archivados en grupos basados en valores de campo comunes. Úselos para filtros amplios con el fin de omitir segmentos de archivo irrelevantes y reducir el volumen de escaneo durante [Archive Search][16].

Puede configurar hasta **2 atributos de partición** por archivo.

* **Usar para**: Atributos de baja cardinalidad como `service`, `source`, `env` o `status` que utiliza con frecuencia como filtros de búsqueda.
* **Cómo funciona**: Los registros que comparten los mismos valores de atributo de partición se ubican juntos en el almacenamiento. Datadog omite particiones completas que no coinciden con su consulta, lo que reduce drásticamente el volumen de datos escaneados.

#### Atributo de búsqueda de archivo {#archive-lookup-attribute}

Los atributos de búsqueda crean una ruta rápida hacia los registros con valores específicos. Úselos para identificadores de alta cardinalidad para acelerar las investigaciones dirigidas con [Archive Search][16].

Puede configurar hasta **2 atributos de búsqueda** por archivo.

* **Usar para**: Atributos de alta cardinalidad como `trace_id`, `@usr.id`, `@http.request_id` o `@transaction_id`.
* **Cómo funciona**: Datadog crea un índice para estos atributos al momento de la escritura, lo que permite que Archive Search localice registros específicos sin escanear el archivo completo.

**Atributos de partición frente a atributos de búsqueda**

| | Partición | Búsqueda |
|---|---|---|
| **Cardinalidad** | Baja (decenas a cientos de valores) | Alta (millones de valores) |
| **Atributos típicos** | `service`, `source`, `env`, `status` | `trace_id`, `@usr.id`, `@http.request_id`, `@transaction_id` |
| **Cómo ayuda** | Omite particiones completas que no coinciden con su consulta | Localiza entradas de registro específicas sin escanear el archivo completo |
| **Se usa principalmente para** | Filtrado amplio por entorno o servicio | Investigaciones puntuales sobre identificadores específicos |
| **Límite** | Hasta 2 por archivo | Hasta 2 por archivo |

Para obtener el máximo rendimiento de búsqueda, combine ambos: los atributos de partición reducen el contexto de búsqueda a los segmentos de datos relevantes, mientras que los atributos de búsqueda le permiten encontrar registros específicos dentro de esos segmentos al instante.

{{< site-region region="us3" >}}

#### Reglas de firewall {#firewall-rules}

{{< tabs >}}
{{% tab "Almacenamiento de Azure" %}}

Las reglas de firewall no son compatibles.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}

#### Compression {#compression}

De forma predeterminada, Datadog archiva los registros mediante compresión **zstd** (Zstandard) (`.json.zst`), la cual ofrece mejores tasas de compresión y velocidades de descompresión más rápidas en comparación con gzip. También puede configurar la compresión **gzip** (`.json.gz`).


Para configurar la compresión, seleccione {{< ui >}}Compression Type{{< /ui >}} al crear o editar un archivo en la [página de Log Archiving & Forwarding][6]:

- {{< ui >}}zstd{{< /ui >}} (predeterminado): Mejor tasa de compresión y velocidad de descompresión. Recomendado para archivos nuevos, especialmente si planea utilizar [Archive Search][16].
- {{< ui >}}gzip{{< /ui >}}: Ampliamente admitido y compatible con la mayoría de las herramientas.

**Nota**: Cambiar el formato de compresión de un archivo existente solo afecta a los nuevos archivos que se almacenen en él. Los archivos que ya están almacenados en su bucket permanecen en su formato original.

#### Clase de almacenamiento {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

Puede seleccionar una clase de almacenamiento para su archivo o [establecer una configuración de ciclo de vida en su bucket de S3][1] para transferir automáticamente sus archivos de logs a las clases de almacenamiento óptimas.

[Archive Search][2] solo admite las siguientes clases de almacenamiento:

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering, solo si [los dos niveles opcionales de acceso asincrónico al archivo][3] están deshabilitados.

Si su archivo utiliza otra clase de almacenamiento, primero debe moverlo a una de las clases de almacenamiento admitidas anteriormente.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /es/logs/explorer/archive_search/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Almacenamiento de Azure" %}}

El archivado y [Archive Search][1] solo admiten los siguientes niveles de acceso:

- Nivel de acceso Hot
- Nivel de acceso Cool

Si su archivo utiliza otro nivel de acceso, primero debe moverlo a uno de los niveles admitidos anteriormente.

[1]: /es/logs/explorer/archive_search/
{{% /tab %}}
{{% tab "Almacenamiento de Google Cloud" %}}

El archivado y [Archive Search][1] admiten los siguientes niveles de acceso:

- Standard
- Nearline
- Coldline
- Archive

[1]: /es/logs/explorer/archive_search/
{{% /tab %}}

{{< /tabs >}}

#### Cifrado del lado del servidor (SSE) para archivos S3 {#server-side-encryption-sse-for-s3-archives}

Al crear o actualizar un archivo S3 en Datadog, puede configurar opcionalmente {{< ui >}}Advanced Encryption{{< /ui >}}. Hay tres opciones disponibles en el menú desplegable {{< ui >}}Encryption Type{{< /ui >}}:

- {{< ui >}}Default S3 Bucket-Level Encryption{{< /ui >}} (Predeterminado): Datadog no anula la configuración de cifrado predeterminada de su bucket de S3.
- {{< ui >}}Amazon S3 managed keys{{< /ui >}}: Fuerza el cifrado del lado del servidor mediante claves administradas por Amazon S3 ([SSE-S3][17]), independientemente del cifrado predeterminado del bucket de S3.
- {{< ui >}}AWS Key Management Service{{< /ui >}}: Fuerza el cifrado del lado del servidor mediante una clave administrada por el cliente (CMK) de [AWS KMS][18], independientemente del cifrado predeterminado del bucket de S3. Deberá proporcionar el ARN de la CMK.

{{< tabs >}}
{{% tab "Cifrado predeterminado a nivel de bucket de S3" %}}

Cuando se selecciona esta opción, Datadog no especifica ningún encabezado de cifrado en la solicitud de carga. Se aplicará el cifrado predeterminado de su bucket de S3.

Para establecer o verificar la configuración de cifrado de su bucket de S3:

1. Vaya a su bucket de S3.
2. Haga clic en la pestaña {{< ui >}}Properties{{< /ui >}}.
3. En la sección {{< ui >}}Default Encryption{{< /ui >}}, configure o confirme el tipo de cifrado. Si su cifrado utiliza [AWS KMS][1], asegúrese de tener una CMK válida y una política de CMK adjunta a su CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Claves administradas por Amazon S3" %}}

Esta opción garantiza que todos los objetos de archivo se carguen con [SSE_S3][1], utilizando claves administradas por Amazon S3. Esto anula cualquier configuración de cifrado predeterminada en el bucket de S3.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

Esta opción garantiza que todos los objetos de archivo se carguen utilizando una clave administrada por el cliente (CMK) de [AWS KMS][1]. Esto anula cualquier configuración de cifrado predeterminada en el bucket de S3.

Asegúrese de haber completado los siguientes pasos para crear una CMK válida y una política de CMK. Luego, proporcione el ARN de la CMK para configurar correctamente este tipo de cifrado.

1. Cree su CMK.
2. Adjunte una política de CMK a su CMK con el siguiente contenido, reemplazando el número de cuenta de AWS y el nombre del rol de IAM de Datadog de forma adecuada:

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

3. Después de seleccionar {{< ui >}}AWS Key Management Service{{< /ui >}} como su {{< ui >}}Encryption Type{{< /ui >}} en Datadog, ingrese el ARN de su clave de AWS KMS.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### Validación {#validation}

Una vez que configure correctamente los ajustes de archivo en su cuenta de Datadog, sus pipelines de procesamiento comienzan a enriquecer todos los logs ingeridos en Datadog. Estos logs se reenvían posteriormente a su archivo.

Sin embargo, después de crear o actualizar sus configuraciones de archivo, pueden pasar varios minutos antes de que se intente la siguiente carga de archivo. La frecuencia con la que se cargan los archivos puede variar. **Vuelva a consultar su bucket de almacenamiento en 15 minutos** para asegurarse de que los archivos se estén cargando correctamente desde su cuenta de Datadog.

Después de eso, si el archivo aún está en estado pendiente, verifique sus filtros de inclusión para asegurarse de que la consulta sea válida y coincida con los eventos de log en [Live Tail][14]. Cuando Datadog no puede cargar logs a un archivo externo, debido a cambios involuntarios en la configuración o los permisos, el archivo de log correspondiente se resalta en la página de configuración.

{{< img src="logs/archives/archive_errors_details.png" alt="Verifique que sus archivos estén configurados correctamente" style="width:100%;">}}

Pase el cursor sobre el archivo para ver los detalles del error y las medidas que debe tomar para resolver el problema. También se genera un evento en el [Events Explorer][15]. Puede crear un monitor para hacer un seguimiento de estos eventos y detectar y solucionar fallas rápidamente.

## Múltiples archivos {#multiple-archives}

Si se definen múltiples archivos, los logs ingresan al primer archivo según el filtro.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Los logs ingresan al primer archivo cuyo filtro coincida con ellos." style="width:100%;">}}

Es importante ordenar sus archivos cuidadosamente. Por ejemplo, si crea un primer archivo filtrado con la etiqueta `env:prod` y un segundo archivo sin ningún filtro (el equivalente a `*`), todos sus logs de producción irían a un bucket o una ruta de almacenamiento, y el resto iría al otro.

## Formato de los archivos {#format-of-the-archives}

Los archivos de logs que Datadog reenvía a su bucket de almacenamiento están en formato JSON comprimido. Dependiendo de su [configuración de compresión](#compression), los archivos utilizan compresión zstd (`.json.zst`, predeterminada) o gzip (`.json.gz`). Con el prefijo que indique (o `/` si no indica ninguno), los archivos se almacenan en una estructura de directorios que muestra la fecha y la hora en que se generaron, como la siguiente:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

Esta estructura de directorios simplifica la consulta de sus archivos históricos de logs por fecha.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/indexes/#exclusion-filters
[2]: /es/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
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
[15]: /es/events/explorer/
[16]: /es/logs/explorer/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[19]: /es/logs/explorer/search_syntax/#reserved-attributes