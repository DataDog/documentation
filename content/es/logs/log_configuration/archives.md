---
aliases:
- /es/logs/s3/
- /es/logs/gcs/
- /es/logs/archives/s3/
- /es/logs/archives/gcs/
- /es/logs/archives/gcp/
- /es/logs/archives/
description: Reenvía todos tus registros ingeridos a almacenamiento a largo plazo.
further_reading:
- link: /logs/archives/rehydrating
  tag: Documentación
  text: Aprende cómo acceder al contenido de tus registros archivados en Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Conoce el Explorador de Registros
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Conoce sobre Logging without Limits*
title: Archivos de Registros
---
## Resumen {#overview}

Configura tu cuenta de Datadog para reenviar todos los registros ingeridos—ya sean [indexados][1] o no—hacia un sistema de almacenamiento en la nube de tu elección. Mantén tus registros en un archivo optimizado para almacenamiento por períodos más largos y cumple con los requisitos de conformidad, mientras mantienes la auditabilidad para investigaciones ad-hoc, con [Rehidratación][2] o [Búsqueda de Archivos][16].

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Pestaña de Archivos en la página de Reenvío de Registros" style="width:100%;">}}

Navega a la página de [**Archivado y Reenvío de Registros**][3] para configurar un archivo para reenviar registros ingeridos a tu propio bucket de almacenamiento en la nube.

1. Si aún no lo has hecho, configura una [integración](#set-up-an-integration) de Datadog para tu proveedor de nube.
2. Crea un [bucket de almacenamiento](#create-a-storage-bucket).
3. Establece [permisos](#set-permissions) en `read` y/o `write` en ese archivo.
4. [Dirige tus registros](#route-your-logs-to-a-bucket) hacia y desde ese archivo.
5. Configura [ajustes avanzados](#advanced-settings) como cifrado, clase de almacenamiento y etiquetas.
6. [Valida](#validation) tu configuración y verifica posibles errores de configuración que Datadog podría detectar por ti.

Consulta cómo [archivar tus registros con Observability Pipelines][4] si deseas dirigir tus registros a un archivo optimizado para almacenamiento directamente desde tu entorno.

Las siguientes métricas informan sobre registros que han sido archivados con éxito, incluyendo registros que fueron enviados con éxito después de reintentos.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## Configura un archivo {#configure-an-archive}

### Configura una integración {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si aún no la has configurado, configura la [integración de AWS][1] para la cuenta de AWS que tiene tu bucket de S3.
   * En el caso general, esto implica crear un rol que Datadog pueda usar para integrarse con AWS S3.
   * Específicamente para cuentas de AWS en China, utiliza claves de acceso como alternativa a la delegación de roles.

[1]: /es/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Configura la [integración de Azure][1] dentro de la suscripción que tiene tu nueva cuenta de almacenamiento, si no lo has hecho ya. Esto implica [crear un registro de aplicación que Datadog pueda usar][2] para integrarse.

**Nota:** No se admite la archivación en Azure ChinaCloud y Azure GermanyCloud. La archivación en Azure GovCloud es compatible en vista previa. Para solicitar acceso, contacta al soporte de Datadog.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Configura la [integración de Google Cloud][1] para el proyecto que tiene tu bucket de almacenamiento GCS, si no lo has hecho ya. Esto implica [crear una cuenta de servicio de Google Cloud que Datadog pueda usar][2] para integrarse.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /es/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Crea un bucket de almacenamiento {#create-a-storage-bucket}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Enviar registros a un archivo está fuera del entorno de Datadog GovCloud, que está fuera del control de Datadog. Datadog no será responsable de ningún registro que haya salido del entorno de Datadog GovCloud, incluyendo, sin limitación, cualquier obligación o requisito que el usuario pueda tener relacionado con FedRAMP, niveles de impacto del DoD, ITAR, cumplimiento de exportación, residencia de datos o regulaciones similares aplicables a dichos registros.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Ingresa a tu [consola de AWS][1] y [crea un bucket de S3][2] para enviar tus archivos.

{{< site-region region="gov" >}}
<div class="alert alert-danger"> Los archivos de Datadog no admiten nombres de buckets con puntos (.) cuando se integran con un punto final S3 FIPS que depende de la dirección de estilo virtual-host. Aprende más en la documentación de AWS. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> y <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**Notas:**

- No hagas que tu bucket sea públicamente legible.
- Para [sitios US1, US3 y US5][3], consulta [AWS Pricing][4] para las tarifas de transferencia de datos entre regiones y cómo los costos de almacenamiento en la nube pueden verse afectados. Considera crear tu bucket de almacenamiento en `us-east-1` para gestionar las tarifas de transferencia de datos entre regiones.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /es/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* Ve a tu [Portal de Azure][1] y [crea una cuenta de almacenamiento][2] para enviar tus archivos. Asigna un nombre a tu cuenta de almacenamiento, selecciona rendimiento estándar o tipo de cuenta premium **Block blobs**, y elige el nivel de acceso **hot** o **cool**.
* Crea un servicio de **contenedor** en esa cuenta de almacenamiento. Toma nota del nombre del contenedor, ya que lo necesitarás en la página de archivos de Datadog.

**Nota:** No establezcas [políticas de inmutabilidad][3] porque los últimos datos necesitan ser reescritos en algunos casos raros (típicamente un tiempo de espera).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Ve a tu [cuenta de Google Cloud][1] y [crea un bucket GCS][2] para enviar tus archivos. Bajo **Elige cómo controlar el acceso a los objetos**, selecciona **Establecer permisos a nivel de objeto y de bucket**.

**Nota:** No agregues [política de retención][3] porque los últimos datos necesitan ser reescritos en algunos casos raros (típicamente un tiempo de espera).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Establece permisos{#set-permissions}

Solo los usuarios de Datadog con el [`logs_write_archive` permiso][5] pueden crear, modificar o eliminar configuraciones de archivo de registro.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Crea una política][1] con las siguientes declaraciones de permiso:

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
     * The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. Edita los nombres de los buckets.
3. Opcionalmente, especifica las rutas que contienen tus archivos de registro.
4. Adjunta la nueva política al rol de integración de Datadog.
   * Navega a **Roles** en la consola de AWS IAM.
   * Localiza el rol utilizado por la integración de Datadog. Por defecto, se llama **DatadogIntegrationRole**, pero el nombre puede variar si tu organización lo ha renombrado. Haz clic en el nombre del rol para abrir la página de resumen del rol.
   * Haz clic en **Agregar permisos**, y luego en **Adjuntar políticas**.
   * Ingresa el nombre de la política creada anteriormente.
   * Haz clic en **Adjuntar políticas**.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /es/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Concede a la aplicación de Datadog permiso para escribir y rehidratar desde tu cuenta de almacenamiento.
2. Selecciona tu cuenta de almacenamiento en la [Cuentas de Almacenamiento page][1], ve a **Control de Acceso (IAM)**, y selecciona **Agregar -> Asignación de rol**.
3. Ingresa el rol llamado **Contribuyente de Datos de Blob de Almacenamiento**, selecciona la aplicación de Datadog que creaste para integrar con Azure, y guarda.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Agrega el rol de Contribuyente de Datos de Blob de Almacenamiento a tu aplicación de Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Concede a tu cuenta de servicio de Datadog en Google Cloud permisos para escribir tus archivos en tu bucket.
2. Selecciona tu cuenta de servicio de Datadog en Google Cloud desde la [página de Administrador de IAM de Google Cloud][1] y selecciona **Editar principal**.
3. Haz clic en **AGREGAR OTRO ROL**, selecciona el rol de **Administrador de Objetos de Almacenamiento**, y guarda.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Agrega el rol de Administrador de Objetos de Almacenamiento a tu cuenta de servicio de Google Cloud de Datadog." style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Dirige tus registros a un bucket {#route-your-logs-to-a-bucket}

Navega a la [página de Archivado y Reenvío de Registros][6] y selecciona **Agregar un nuevo archivo** en la pestaña de **Archivos**.

**Notas:**
* Solo los usuarios de Datadog con el [`logs_write_archive` permiso][5] pueden completar este paso y el siguiente.
* Archivar registros en Azure Blob Storage requiere un Registro de Aplicación. Consulta las instrucciones [en la página de integración de Azure][7], y establece el "site" en el lado derecho de la página de documentación a "US." Los registros de aplicación creados para fines de archivado solo necesitan el rol de "Contribuyente de Datos de Blob de Almacenamiento". Si su bucket de almacenamiento está en una suscripción que se monitorea a través de un Recurso de Datadog, se muestra una advertencia sobre el registro de aplicación siendo redundante. Puede ignorar esta advertencia.
* Si su bucket restringe el acceso a la red a IPs especificadas, agregue las IPs del webhook de la {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.
* Para el **sitio US1-FED**, puede configurar Datadog para enviar registros a un destino fuera del entorno GovCloud de Datadog. Datadog no es responsable de ningún registro que salga del entorno GovCloud de Datadog. Además, Datadog no es responsable de ninguna obligación o requisito que pueda tener respecto a FedRAMP, Niveles de Impacto del DoD, ITAR, cumplimiento de exportación, residencia de datos, o regulaciones similares aplicables a estos registros después de que salgan del entorno GovCloud.

| Servicio                  | Pasos                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Seleccione la combinación de cuenta y rol de AWS apropiada para su bucket S3.<br>- Ingrese el nombre de su bucket.<br>**Opcional**: Ingrese un directorio de prefijo para todo el contenido de sus archivos de registro. |
| **Azure Storage**        | - Seleccione el tipo de archivo de **Azure Storage**, y el inquilino y cliente de Azure para la Aplicación de Datadog que tiene el rol de Contribuyente de Datos de Blob de Almacenamiento en su cuenta de almacenamiento.<br>- Ingrese el nombre de su cuenta de almacenamiento y el nombre del contenedor para su archivo de registro.<br>**Opcional**: Ingrese un directorio de prefijo para todo el contenido de sus archivos de registro. |
| **Google Cloud Storage** | - Seleccione el tipo de archivo de **Google Cloud Storage**, y la Cuenta de Servicio de GCS que tiene permisos para escribir en su bucket de almacenamiento.<br>- Ingrese el nombre de su bucket.<br>**Opcional**: Ingrese un directorio de prefijo para todo el contenido de sus archivos de registro. |

### Configuraciones avanzadas {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="Configuraciones avanzadas para agregar etiquetas opcionales y definir el tamaño máximo de escaneo" style="width:100%;" >}}

#### Etiquetas de Datadog {#datadog-tags}

Utilice este paso de configuración opcional para:

* Incluir todas las etiquetas de registro en sus archivos (activado por defecto en todos los nuevos archivos). **Nota**: Esto aumenta el tamaño de los archivos resultantes.
* Agregue etiquetas en los registros rehidratados de acuerdo con su política de Consultas de Restricción. Vea el permiso [`logs_read_data`][13].

#### Defina el tamaño máximo de escaneo {#define-maximum-scan-size}

Utilice este paso de configuración opcional para definir el volumen máximo de datos de registro (en GB) que se puede escanear para Rehidratación en sus Archivos de Registro.

Para Archivos con un tamaño máximo de escaneo definido, todos los usuarios deben estimar el tamaño de escaneo antes de que se les permita iniciar una Rehidratación. Si el tamaño de escaneo estimado es mayor que lo permitido para ese Archivo, los usuarios deben reducir el rango de tiempo sobre el cual están solicitando la Rehidratación. Reducir el rango de tiempo disminuirá el tamaño de escaneo y permitirá al usuario iniciar una Rehidratación.

#### Atributo de Partición de Archivo (Vista Previa) {#archive-search-partition-attribute}

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" header="¡Únase a la Vista Previa!" >}}
La Búsqueda de Archivos está en Vista Previa. Solicite acceso para buscar registros archivados en tiempo real. Sin rehidratación, sin demoras. Acceda instantáneamente a años de datos cuando los necesite.
{{< /callout >}}

Para optimizar cómo se organizan físicamente sus registros archivados en el almacenamiento (y acelerar [Búsqueda de Archivos][16]), configure atributos de partición en su Archivo de Datadog.

* **Atributos de Partición**: Agregue atributos de baja cardinalidad como `service`, `source`, `env` o `status` que utiliza frecuentemente como filtros de búsqueda.
* **Beneficio**: Los registros que comparten los mismos valores de atributos de partición están co-localizados en el almacenamiento. Al buscar, Datadog puede omitir particiones enteras que no coinciden con su consulta, reduciendo drásticamente el volumen de datos escaneados.

#### Atributo de Búsqueda de Archivo (Vista Previa) {#archive-search-lookup-attribute}

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" header="¡Únase a la Vista Previa!" >}}
La Búsqueda de Archivos está en Vista Previa. Solicite acceso para buscar registros archivados en tiempo real. Sin rehidratación, sin demoras. Acceda instantáneamente a años de datos cuando los necesite.
{{< /callout >}}

Para acelerar búsquedas e investigaciones en sus archivos (con [Búsqueda de Archivos][16]), configure atributos de búsqueda en su Archivo de Datadog.

* **Atributos de Búsqueda**: Agregue atributos de alta cardinalidad como `trace_id`, `container_id` o `customer_id`.
* **Beneficio**: Esto le permite identificar registros específicos dentro de su almacenamiento a largo plazo mucho más rápido, reduciendo el tiempo y los datos escaneados durante investigaciones ad-hoc.

**Atributos de partición vs. búsqueda**

| | Partición | Búsqueda |
|---|---|---|
| **Cardinalidad** | Baja (decenas a cientos de valores) | Alta (millones de valores) |
| **Atributos típicos** | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| **Cómo ayuda** | Elimina particiones enteras del escaneo | Identifica entradas de registro individuales dentro de su archivo |
| **Mejor utilizado para** | Filtrado amplio por entorno o servicio | Investigaciones ad-hoc sobre identificadores específicos |

Para un rendimiento de búsqueda máximo, combine ambos: los atributos de partición reducen el alcance de búsqueda a los segmentos de datos relevantes, mientras que los atributos de búsqueda le permiten encontrar registros específicos dentro de esos segmentos al instante.

{{< site-region region="us3" >}}

#### Reglas de firewall {#firewall-rules}

{{< tabs >}}
{{% tab "Almacenamiento de Azure" %}}

Las reglas de firewall no son compatibles.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### Clase de almacenamiento {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

Puede seleccionar una clase de almacenamiento para su archivo o [configurar una configuración de ciclo de vida en su bucket de S3][1] para transitar automáticamente sus archivos de registro a clases de almacenamiento óptimas.

[Rehidratación][2] solo admite las siguientes clases de almacenamiento:

* S3 Estándar
* S3 Estándar-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Inteligente-Tiering, solo si [los niveles de acceso a archivos asíncronos opcionales][3] están ambos deshabilitados.

Si desea rehidratar desde archivos en otra clase de almacenamiento, primero debe moverlos a una de las clases de almacenamiento compatibles mencionadas anteriormente.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /es/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

La archivación y la [Rehidratación][1] solo admiten los siguientes niveles de acceso:

- Nivel de acceso caliente
- Nivel de acceso frío

Si desea rehidratar desde archivos en otro nivel de acceso, primero debe moverlos a uno de los niveles de acceso compatibles mencionados anteriormente.

[1]: /es/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

La archivación y la [Rehidratación][1] admiten los siguientes niveles de acceso:

- Estándar
- Nearline
- Coldline
- Archivo

[1]: /es/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### Cifrado del lado del servidor (SSE) para archivos S3 {#server-side-encryption-sse-for-s3-archives}

Al crear o actualizar un archivo S3 en Datadog, puede configurar opcionalmente **Cifrado Avanzado**. Tres opciones están disponibles en el menú desplegable **Tipo de Cifrado**:

- **Cifrado por Defecto a Nivel de Bucket S3** (Por Defecto): Datadog no anula la configuración de cifrado por defecto de su bucket S3.
- **Claves gestionadas por Amazon S3**: Obliga al cifrado del lado del servidor utilizando claves gestionadas por Amazon S3 ([SSE-S3][17]), independientemente de la configuración de cifrado por defecto del bucket S3.
- **Servicio de Gestión de Claves de AWS**: Obliga al cifrado del lado del servidor utilizando una clave gestionada por el cliente (CMK) de [AWS KMS][18], independientemente de la configuración de cifrado por defecto del bucket S3. Deberá proporcionar el ARN de la CMK.

{{< tabs >}}
{{% tab "Cifrado por Defecto a Nivel de Bucket S3" %}}

Cuando se selecciona esta opción, Datadog no especifica ningún encabezado de cifrado en la solicitud de carga. Se aplicará el cifrado por defecto de su bucket S3.

Para establecer o verificar la configuración de cifrado de su bucket S3:

1. Navegue a su bucket de S3.
2. Haga clic en la pestaña **Propiedades**.
3. En la sección **Cifrado Predeterminado**, configure o confirme el tipo de cifrado. Si su cifrado utiliza [AWS KMS][1], asegúrese de tener un CMK válido y una política de CMK adjunta a su CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Claves gestionadas por Amazon S3" %}}

Esta opción asegura que todos los objetos de archivo se suban con [SSE_S3][1], utilizando claves gestionadas por Amazon S3. Esto anula cualquier configuración de cifrado predeterminado en el bucket de S3.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "Servicio de Gestión de Claves de AWS" %}}

Esta opción asegura que todos los objetos de archivo se suban utilizando una clave administrada por el cliente (CMK) de [AWS KMS][1]. Esto anula cualquier configuración de cifrado predeterminado en el bucket de S3.

Asegúrate de haber completado los siguientes pasos para crear un CMK y una política de CMK válidos. Luego, proporciona el ARN del CMK para configurar exitosamente este tipo de cifrado.

1. Crea tu CMK.
2. Adjunta una política de CMK a tu CMK con el siguiente contenido, reemplazando el número de cuenta de AWS y el nombre del rol IAM de Datadog apropiadamente:

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

3. Después de seleccionar **Servicio de Gestión de Claves de AWS** como tu **Tipo de Cifrado** en Datadog, ingresa el ARN de tu clave KMS de AWS.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### Validación {#validation}

Una vez que tus configuraciones de archivo se hayan configurado correctamente en tu cuenta de Datadog, tus canalizaciones de procesamiento comenzarán a enriquecer todos los registros ingeridos en Datadog. Estos registros se envían posteriormente a tu archivo.

Sin embargo, después de crear o actualizar tus configuraciones de archivo, puede tardar varios minutos antes de que se intente la próxima carga de archivo. La frecuencia con la que se cargan los archivos puede variar. **Revisa tu bucket de almacenamiento en 15 minutos** para asegurarte de que los archivos se estén subiendo exitosamente desde tu cuenta de Datadog.

Después de eso, si el archivo sigue en un estado pendiente, verifica tus filtros de inclusión para asegurarte de que la consulta sea válida y coincida con los eventos de registro en [Live Tail][14]. Cuando Datadog no puede subir registros a un archivo externo, debido a cambios no intencionales en la configuración o permisos, el Archivo de Registro correspondiente se resalta en la página de configuración.

{{< img src="logs/archives/archive_errors_details.png" alt="Verifica que tus archivos estén configurados correctamente." style="width:100%;">}}

Pasa el cursor sobre el archivo para ver los detalles del error y las acciones a tomar para resolver el problema. También se genera un evento en el [Event Explorer][15]. Puedes crear un monitor para estos eventos para detectar y remediar fallas rápidamente.

## Múltiples archivos {#multiple-archives}

Si se definen múltiples archivos, los registros ingresan al primer archivo basado en el filtro.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Los registros ingresan al primer archivo cuyo filtro coincida." style="width:100%;">}}

Es importante ordenar tus archivos cuidadosamente. Por ejemplo, si creas un primer archivo filtrado por la etiqueta `env:prod` y un segundo archivo sin ningún filtro (el equivalente a `*`), todos tus registros de producción irían a un solo bucket o ruta de almacenamiento, y el resto iría al otro.

## Formato de los archivos {#format-of-the-archives}

Los archivos de registro que Datadog reenvía a tu bucket de almacenamiento están en formato JSON comprimido (`.json.gz`). Usando el prefijo que indiques (o `/` si no hay ninguno), los archivos se almacenan en una estructura de directorio que indica en qué fecha y a qué hora se generaron los archivos, como los siguientes:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

Esta estructura de directorio simplifica el proceso de consulta de tus archivos de registro históricos según su fecha.

## Lectura Adicional {#further-reading}

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
[16]: /es/logs/log_configuration/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html