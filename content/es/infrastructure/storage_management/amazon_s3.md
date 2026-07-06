---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimiza y soluciona problemas de almacenamiento en la nube a gran escala
    con Monitoreo de Almacenamiento
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduce los costos de almacenamiento en la nube y mejora la eficiencia operativa
    con Monitoreo de Almacenamiento de Datadog
title: Gestión de Almacenamiento para Amazon S3
---
## Configurar {#setup}

{{< tabs >}}
{{% tab "Configura el Inventario desde Datadog" %}}

La forma más rápida de configurar la Gestión de Almacenamiento es a través de la página [Habilitar Buckets][501], donde puedes habilitar el inventario de S3 y configurar el monitoreo para múltiples buckets a la vez.

Como alternativa, puedes configurar el inventario de S3 manualmente o con Terraform y habilitar la Gestión de Almacenamiento utilizando tu configuración existente. Para más detalles, consulta [Inventario S3 Existente][506].

{{< img src="infrastructure/storage_management/add-bucket.png" alt="Selecciona buckets para habilitar el Monitoreo de Almacenamiento" responsive="true">}}

{{% collapse-content title="1. Habilita la Integración de Amazon S3 y la recopilación de recursos para todas las cuentas de AWS que deseas monitorear" level="h4" expanded=false id="set-up-inventory-from-datadog-step1" %}}

Asegúrate de que se otorguen todos los permisos relacionados con S3 para [Recopilación de Recursos][509].

[509]: /es/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Habilita el Inventario de S3 para obtener monitoreo a nivel de prefijo" level="h4" expanded=false id="set-up-inventory-from-datadog-step2" %}}

  <div class="alert alert-info">
    - Bucket de origen: El bucket de S3 que deseas monitorear con la Gestión de Almacenamiento <br>
    - Bucket de destino: Utilizado para almacenar informes de inventario (uno por región de AWS, puede ser reutilizado entre cuentas)
  </div>


   1. Agrega todos los permisos de S3 requeridos para la Gestión de Almacenamiento a tu política IAM de Datadog. La Gestión de Almacenamiento depende de los permisos en [política IAM de Integración de AWS y política IAM de Recopilación de Recursos][508] para reunir los detalles del bucket. Además, los siguientes 3 permisos permiten a Datadog habilitar el inventario de S3 en tus buckets de origen y leer los informes generados desde los buckets de destino.
      - `s3:PutInventoryConfiguration`
      - `s3:GetObject` (alcanzado a los bucket(s) de destino)
      - `s3:ListBucket` (alcanzado a los bucket(s) de destino)

      Ejemplo de política IAM con todos los permisos requeridos para la gestión de almacenamiento:
        ```json
              {
                "Version": "2012-10-17",
                "Statement": [

                  {
                    "Sid": "DatadogS3BucketInfo",
                    "Effect": "Allow",
                    "Action": [
                      "s3:ListAllMyBuckets",
                      "s3:GetAccelerateConfiguration",
                      "s3:GetAnalyticsConfiguration",
                      "s3:GetBucket*",
                      "s3:GetEncryptionConfiguration",
                      "s3:GetInventoryConfiguration",
                      "s3:GetLifecycleConfiguration",
                      "s3:GetMetricsConfiguration",
                      "s3:GetReplicationConfiguration",
                      "s3:ListBucket",
                      "s3:GetBucketLocation",
                      "s3:GetBucketLogging",
                      "s3:GetBucketTagging",
                      "s3:PutInventoryConfiguration"
                    ],
                    "Resource": "*"
                  },
                  {
                    "Sid": "DatadogReadInventoryFromDestinationBucket",
                    "Effect": "Allow",
                    "Action": [
                      "s3:ListBucket",
                      "s3:GetObject"
                    ],
                    "Resource": [
                      "arn:aws:s3:::storage-management-inventory-destination",
                      "arn:aws:s3:::storage-management-inventory-destination/*"
                    ]
                  }
                ]
              }
        ```

   2. En la pestaña **Habilítalo para mí**, selecciona las regiones o cuentas que deseas habilitar y asigna un bucket de destino por región o por cuenta para almacenar los informes de inventario de S3. Puedes usar un bucket existente o crear uno en AWS.

      <div class="alert alert-info"><ul><li>Si seleccionas un bucket de destino que contiene inventarios de múltiples buckets de origen, todos esos buckets de origen se habilitan para monitoreo.</li><li>Los buckets de destino deben permitir que los buckets de origen escriban datos de inventario. Consulta <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html#configure-inventory-destination-bucket-policy">Creando una política de bucket de destino</a> en la documentación de AWS para más detalles.</li></ul></div>

       {{< img src="integrations/guide/storage_monitoring/enable-inventory.png" alt="Selecciona buckets para habilitar el Monitoreo de Almacenamiento" responsive="true">}}

   3. Completa la configuración del inventario en Datadog. El primer informe de inventario puede tardar hasta 24 horas en generarse.

   4. Navega a **S3** > **Bucket de destino** > **Permisos** > **Política de bucket**. Agrega o actualiza la política del bucket en el bucket de destino para permitir que el servicio S3 (`s3.amazonaws.com`) escriba objetos de inventario desde el/los bucket(s) de origen. 

      Usa el siguiente ejemplo de política de bucket para permitir que S3 escriba archivos de inventario en tu bucket de destino. Reemplaza `<DESTINATION_BUCKET>`, `<DESTINATION_PREFIX>` (opcional) y `<ACCOUNT_ID>` con el nombre real de tu bucket, el prefijo del bucket y el ID de cuenta de AWS. 

      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

[508]: /es/integrations/amazon-web-services/#aws-iam-permissions
{{% /collapse-content %}}

{{% collapse-content title="3. Habilita los registros de acceso de S3 para métricas de solicitudes y latencia a nivel de prefijo" level="h4" expanded=false id="set-up-inventory-from-datadog-step3" %}}

Para obtener métricas de acceso a nivel de prefijo, incluyendo conteos de solicitudes, latencia del lado del servidor e identificación de datos fríos para optimización de costos, sigue estos pasos adicionales:

   1. **Configura el Datadog Lambda Forwarder** (si no está configurado ya):
      - Sigue las [instrucciones de instalación del Forwarder de Datadog][503] para desplegar la función Lambda de Datadog en tu cuenta de AWS
      - Esta función Lambda recopila y reenvía tus registros de acceso de S3 a Datadog

   2. **Configura los registros de acceso de S3** para cada bucket de origen:
      - Ve a las propiedades de tu bucket de S3 en la Consola de AWS
      - Navega a **Registro de acceso del servidor**
      - Habilita el registro y especifica tu bucket de destino (para simplificar, puedes usar el bucket de destino para tus archivos de inventario)
      - Establezca el prefijo de destino en `access-logs/` para organizar los archivos de registro por separado de los datos de inventario

   3. **Configure el disparador de Lambda**:

      **Opción A: Automático (Recomendado)**
        - En la página de integración de Datadog AWS, navegue a la pestaña **[Recolección de Registros][504]**
        - Habilite la recolección automática de registros para S3 marcando la casilla de verificación de Registros de Acceso de S3
        - Datadog [configura automáticamente los disparadores][505] en su función Lambda de Forwarder para los registros de acceso de S3

       **Opción B: Manual**
        - En la consola de AWS, vaya a su función Lambda de Forwarder de Datadog
        - Haga clic en **Agregar disparador** y seleccione **S3**
        - Seleccione el bucket que contiene sus registros de acceso
        - Establezca el tipo de evento en **Todos los eventos de creación de objetos**
        - Establezca el prefijo en `access-logs/` (que coincida con su prefijo de registro de acceso)

       <div class="alert alert-info"> Después de enviar, los Registros de Acceso de S3 también están disponibles en <a href="/logs/#explore">Gestión de Registros de Datadog</a>. </div>

[503]: /es/logs/guide/forwarder/?tab=cloudformation
[504]: https://app.datadoghq.com/integrations/amazon-web-services
[505]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
{{% /collapse-content %}}

{{% collapse-content title="4. Regrese a la página de Gestión de Almacenamiento para ver cualquier nuevo bucket" level="h4" expanded=false id="set-up-inventory-from-datadog-step4" %}}

El proceso de generación de inventario comienza en AWS dentro de las 24 horas posteriores al primer informe. Los datos de sus buckets son visibles después de este período.

{{% /collapse-content %}}

[501]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[506]: /es/infrastructure/storage_management/amazon_s3/?tab=existings3inventory
[507]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}
{{% tab "CloudFormation" %}}

También puede configurar la Gestión de Almacenamiento utilizando las plantillas de CloudFormation proporcionadas. Este proceso implica dos pasos:

{{% collapse-content title="1. Configure la generación de inventario" level="h4" expanded=false id="cloudformation-setup-step1" %}}

Esta plantilla configura su bucket S3 existente para generar informes de inventario, que Datadog utiliza para generar métricas detalladas sobre los prefijos de su bucket.

1. Descargue la plantilla [source-bucket-inventory-cfn.yaml][101].
2. En [AWS CloudFormation][102], haga clic en **Crear pila** en la esquina superior derecha y seleccione **Con recursos existentes (importar recursos)**.
3. En el paso **Especificar plantilla**, seleccione **Cargar un archivo de plantilla**.
4. Haga clic en **Elegir archivo** y seleccione el `source-bucket-inventory-cfn.yaml` archivo, luego haga clic en **Siguiente**.
5. Ingrese el nombre del bucket para el cual desea que AWS comience a generar inventarios, y haga clic en **Siguiente**.

 {{< img src="infrastructure/storage_management/identify_resources.png" alt="Identifique los recursos S3 para comenzar a generar inventario" responsive="true" style="width:90%;" >}}

6. Complete los parámetros requeridos:
   - **DestinationBucketName**: El bucket para almacenar archivos de inventario. **Nota**: Solo debe usar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **SourceBucketName**: El bucket que desea monitorear y comenzar a generar archivos de inventario.

   Parámetros opcionales:
   - **SourceBucketPrefix**: (Opcional) Limitar el monitoreo a una ruta específica en el bucket de origen.
   - **DestinationBucketPrefix**: Ruta específica dentro del bucket de destino. Asegúrese de que esta ruta no incluya barras inclinadas finales (`/`).

{{< img src="infrastructure/storage_management/specify_stack_details.png" alt="Especifique los detalles de la pila" responsive="true" style="width:90%;" >}}

7. Haga clic en **Siguiente**.
8. Espere a que AWS localice su bucket de origen y haga clic en **Importar recursos** en la esquina inferior derecha.

**Notas**:
   - Esta plantilla de CloudFormation se puede revertir, pero revertir no elimina los recursos creados. Esto es para asegurar que el bucket existente no sea eliminado. Puedes eliminar manualmente las configuraciones de inventario yendo a la pestaña **Administración** en la vista del bucket.
   - Revisa [los precios de Amazon S3][106] para los costos relacionados con la generación de inventario.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[106]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="2. Configura los permisos requeridos" level="h4" expanded=false id="cloudformation-setup-step2" %}}

Esta plantilla crea dos políticas de IAM:
  - Una política para permitir que Datadog lea archivos de inventario del bucket de destino
  - Una política para permitir que tu bucket de origen escriba archivos de inventario en el bucket de destino

1. Descarga la plantilla [cloud-inventory-policies-cfn.yaml][103].
2. En [AWS CloudFormation][104], haz clic en **Crear pila** en la esquina superior derecha y selecciona **Con nuevos recursos (estándar)**.
3. En el paso **Especificar plantilla**, selecciona **Subir un archivo de plantilla**.
4. Haz clic en **Elegir archivo** y selecciona el `cloud-inventory-policies-cfn.yaml` archivo, luego haz clic en **Siguiente**.
5. Completa los parámetros requeridos:
   - **DatadogIntegrationRole**: El nombre de tu rol de integración de Datadog en AWS
   - **DestinationBucketName**: El nombre del bucket que recibe tus archivos de inventario. **Nota**: Solo debes usar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **SourceBucketName**: El nombre del bucket para el cual deseas comenzar a generar archivos de inventario

   Parámetros opcionales:
   - **SourceBucketPrefix**: Este parámetro limita la generación de inventario a un prefijo específico en el bucket de origen
   - **DestinationBucketPrefix**: Si deseas reutilizar un bucket existente como destino, este parámetro permite que los archivos de inventario se envíen a un prefijo específico en ese bucket. Asegúrate de que ningún prefijo incluya barras diagonales finales (`/`)

    {{< img src="infrastructure/storage_management/bucket_policy_stack_details.png" alt="Parámetros de pila para la política del bucket" responsive="true" style="width:90%;" >}}

6. En el paso **Revisar y crear**, verifica que los parámetros se hayan ingresado correctamente y haz clic en **Enviar**.

### Termina de configurar los buckets S3 para la Gestión de Almacenamiento {#finish-setting-up-s3-buckets-for-storage-management}
  Después de completar la configuración de CloudFormation, habilita los buckets para la Gestión de Almacenamiento desde la interfaz de usuario de Datadog:
  - Navega a **Gestión de Almacenamiento** → [Habilitar Buckets][105].
  - En el paso 2, bajo **Habilitar Inventario S3 para obtener monitoreo a nivel de prefijo**, selecciona **Usar inventarios existentes**.
  - Elige los buckets de destino que contienen los archivos de inventario para los buckets de origen que deseas monitorear y haz clic en **Confirmar**.

{{< img src="infrastructure/storage_management/enable-it-for-me.png" alt="Selecciona buckets de destino para habilitar el Monitoreo de Almacenamiento" responsive="true">}}

[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Utiliza el [módulo oficial de Terraform para la Gestión de Almacenamiento de Datadog][401] para configurar el Inventario S3 y enviar los registros de acceso S3 para la Gestión de Almacenamiento. Este módulo configura todos los permisos requeridos en el rol IAM de Integración de AWS, agrega una política de bucket para permitir que Datadog lea los archivos de inventario desde la ruta del bucket de destino y habilita la recolección de registros de acceso S3 si ya tienes un Forwarder configurado.

Para usar este ejemplo:
   - Reemplaza `<AWS_REGION>` con tu región de AWS.
   - Reemplaza `<MODULE_NAME>` con un nombre único para esta instancia del módulo.
   - Reemplaza `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` con el nombre de tu rol IAM de Integración de AWS de Datadog.
   - Reemplaza `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, etc. con los nombres de los buckets que se van a monitorear.
   - Reemplaza `<DESTINATION_BUCKET_NAME>` con el nombre del bucket que recibe tus archivos de inventario.
   - Reemplaza `<DATADOG_FORWARDER_FUNCTION_NAME>` con el nombre de tu función Lambda Forwarder de Datadog (solo requerido si habilitas los registros de acceso).

Para más opciones, consulta la [documentación del módulo][401].

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure via environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 Access Logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

Después de habilitar el inventario S3, puede tardar hasta 24 horas en generarse los primeros informes de inventario. Para verificar que se están creando inventarios, ve a la Consola de AWS, navega a tu bucket de destino y verifica que los archivos de inventario aparezcan en el prefijo de destino que especificaste durante la configuración. 

Una vez que hayas confirmado que los archivos de inventario están presentes, verifica que la Gestión de Almacenamiento esté habilitada en tus buckets navegando a **Gestión de Almacenamiento** > [**Habilitar Buckets**][402] > **Usar inventarios existentes** y confirmando que tu bucket de destino esté listado y habilitado.

[401]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[402]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3

{{% /tab %}}

{{% tab "Consola de AWS" %}}

Para configurar manualmente el [Inventario de Amazon S3][206] y la configuración relacionada, sigue estos pasos:

{{% collapse-content title="1. Crea un bucket de destino" level="h4" expanded=false id="aws-console-setup-step1" %}}

1. [Crea un bucket S3][201] para almacenar tus archivos de inventario. Este bucket actúa como la ubicación central para los informes de inventario.
   **Nota**: Solo debes usar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
2. Crea un prefijo dentro del bucket de destino (opcional).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configura las políticas del bucket y del rol de integración" level="h4" expanded=false id="aws-console-setup-step2" %}}

1. Asegúrate de que el rol de integración de Datadog AWS tenga `s3:GetObject` y `s3:ListBucket` permisos en el bucket de destino. Estos permisos permiten a Datadog leer los archivos de inventario generados.

2. Asegúrate de que la política del bucket de destino permita a S3 escribir archivos de inventario en tu bucket de destino. 

      Ejemplo de política de bucket:
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. Sigue los pasos en la [Guía del Usuario de Amazon S3][202] para agregar una política de bucket a tu bucket de destino que permita a Amazon S3 escribir objetos de inventario (`s3:PutObject`) desde tu bucket o buckets de origen.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configura la generación de inventario" level="h4" expanded=false id="aws-console-setup-step3" %}}

Para cada bucket que desees monitorear:
1. Ve a la [página de buckets de Amazon S3][203] en la consola de AWS y selecciona el bucket.
2. Navega a la pestaña **Gestión** del bucket.
3. Haz clic en **Crear configuración de inventario**.
4. Configura los siguientes ajustes:
   - Establecer un nombre de configuración
   - (Opcional) Especificar un prefijo de bucket de origen
   - **Versiones de objetos**: Datadog recomienda seleccionar **Incluir todas las versiones** (requerido para ver métricas de versiones no actuales)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Selecciona buckets de destino para habilitar el Monitoreo de Almacenamiento" responsive="true">}}
   - **Destino**: Seleccione el bucket de destino común para archivos de inventario en su cuenta de AWS. Por ejemplo, si el bucket se llama `destination-bucket`, ingrese `s3://your-destination-bucket`

      **Nota**: Si desea usar un prefijo en el bucket de destino, añada esto también
   - **Frecuencia**: Datadog recomienda elegir **Diario**. Esta configuración determina con qué frecuencia se actualizan sus métricas a nivel de prefijo en Datadog
   - **Formato de salida**: CSV
   - **Estado**: Habilitado
   - **Cifrado del lado del servidor**: No especifique una clave de cifrado
   - Seleccione todos los **Campos de metadatos adicionales** disponibles. Mínimamente, se requieren los siguientes campos:

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Campos de metadatos adicionales. Tamaño, Última modificación, Carga multipart, Estado de replicación, Cifrado, ACL de objeto, Clase de almacenamiento, Inteligente-Tiering: Nivel de acceso, ETag y función de suma de verificación están todos seleccionados. Estado de clave de bucket, Propietario del objeto y Todas las configuraciones de bloqueo de objeto están deseleccionadas." responsive="true">}}

**Nota**: Revise [precios de Amazon S3][204] para costos relacionados con la generación de inventario.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

### Pasos posteriores a la configuración {#post-setup-steps}

  Después de que la configuración de inventario esté configurada y sus archivos de inventario comiencen a aparecer en el bucket de destino, habilite los buckets para la Gestión de Almacenamiento desde la interfaz de usuario de Datadog:
  - Navegue a **Gestión de Almacenamiento** → [Habilitar Buckets][205].
  - En el Paso 2, bajo **Habilitar S3 Inventory para obtener monitoreo a nivel de prefijo**, selecciona **Usar inventarios existentes**.
  - Elige los buckets de destino que contienen los archivos de inventario para los buckets de origen que deseas monitorear y haz clic en **Confirmar**.

   **Nota**: Si no ves una lista de tus buckets de destino existentes bajo **Usar inventarios existentes**, necesitas proporcionar los permisos S3 requeridos como parte de [AWS Resource Collection][207].

{{< img src="infrastructure/storage_management/enabled-it-myself.png" alt="Selecciona buckets de destino para habilitar el Monitoreo de Almacenamiento" responsive="true">}}

[205]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
[207]: /es/integrations/amazon-web-services/#resource-collection
{{% /tab %}}

{{% tab "Inventario S3 existente" %}}

  Si ya has configurado S3 Inventory para los buckets que deseas monitorear, habilita los buckets para Monitoreo de Almacenamiento desde la interfaz de usuario de Datadog.

  **Nota**: La Gestión de Almacenamiento solo admite formato CSV para inventarios.

  1. Navega a **Gestión de Almacenamiento** > [**Habilitar Buckets**][603].
  2. En el Paso 2, bajo **Habilitar S3 Inventory para obtener monitoreo a nivel de prefijo**, selecciona **Usar inventarios existentes**.
  3. Elige los buckets de destino que contienen los archivos de inventario para los buckets de origen que deseas monitorear y haz clic en **Confirmar**.

**Nota**: Si no ves una lista de tus buckets de destino existentes bajo **Usar inventarios existentes**, necesitas proporcionar los permisos S3 requeridos como parte de [AWS Resource Collection][604].

{{< img src="infrastructure/storage_management/enabled-it-myself.png" alt="Selecciona buckets de destino para habilitar el Monitoreo de Almacenamiento" responsive="true">}}

[601]: https://forms.gle/dhDbSxTvCUDXg1QR7
[602]: mailto:storage-monitoring@datadoghq.com
[603]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[604]: /es/integrations/amazon-web-services/#resource-collection
{{% /tab %}}

{{< /tabs >}}

### Validación {#validation}

Para verificar tu configuración:
1. Espera a que se genere el primer informe de inventario (hasta 24 horas para inventarios diarios).
2. Navega a **Infraestructura** > [**Gestión de Almacenamiento**][3] para ver si el(los) bucket(s) que configuraste están apareciendo en la lista del explorador cuando se selecciona "Buckets monitoreados".

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Valida que el bucket esté habilitado para monitoreo" responsive="true">}}

### Mejores prácticas {#best-practices}

Sigue estas mejores prácticas para optimizar la configuración de Gestión de Almacenamiento:
- **Configura políticas de ciclo de vida para los buckets de destino de inventario**: Los informes de S3 Inventory se generan diariamente y se almacenan en tu bucket de destino. Para evitar que los archivos de inventario antiguos se acumulen y generen costos de almacenamiento, agrega una política de ciclo de vida para eliminar automáticamente los informes de inventario que tengan más de tres días.
   
- **Configura políticas de ciclo de vida para los registros de acceso de S3**: Si has habilitado los registros de acceso de S3 para métricas de solicitudes a nivel de prefijo, los archivos de registro en bruto se acumulan en tu bucket de destino. Después de que estos registros se envían a Datadog, los archivos en bruto ya no son necesarios para fines de gestión de almacenamiento. Para eliminar automáticamente los archivos de registro de acceso después de enviarlos a Datadog, agregue una regla de ciclo de vida.

  **Nota**: Antes de habilitar la eliminación automática, verifique que no existan requisitos de cumplimiento o auditoría en su organización que exijan conservar los registros de acceso S3 en bruto durante un período específico.

### Solución de problemas {#troubleshooting}

Si no ve datos para los buckets que configuró para la gestión de almacenamiento, use la página de [Configuraciones de Gestión de Almacenamiento][9] para ver todos los buckets configurados, su estado de inventario y cualquier error de configuración. La página muestra problemas con pasos de remediación accionables.
Si tiene alguna pregunta, [contacte a Datadog][1].

## Visualice el uso granular de S3 con métricas de inventario {#visualize-granular-s3-usage-with-inventory-metrics}

| Nombre de la métrica                                            | Etiquetas notables                                                                                  | Descripción                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Cantidad total de datos, en bytes, almacenados en un prefijo.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Tamaño promedio de objeto, en bytes, para objetos en un prefijo.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | El número total de objetos almacenados en un prefijo.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Conteos de objetos agregados a niveles de prefijo jerárquicos, utilizados para visualizaciones de treemap.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Tamaño de prefijo agregado a niveles de prefijo jerárquicos, utilizado para visualizaciones de treemap.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Edad, en días, del objeto más antiguo en el bucket o prefijo.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Tamaño total, en bytes, de objetos menores de 128KB en un prefijo. Ayuda a identificar costos adicionales en niveles de almacenamiento como Glacier y Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Número de objetos menores de 128KB en un prefijo. Ayuda a identificar costos adicionales en niveles de almacenamiento como Glacier y Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Número total de solicitudes para objetos en un prefijo, opcionalmente dividido por método de solicitud (por ejemplo, GET o PUT). Requiere registros de acceso S3 en Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | El tiempo de respuesta del servidor para las solicitudes en un prefijo, opcionalmente dividido por método de solicitud. Requiere registros de acceso S3 en Datadog.                          |

  *`prefixN` se refiere a niveles de prefijo como `prefix0`, `prefix1`, `prefix2`, y así sucesivamente.

  **Nota:** Para el monitoreo y visualización más precisos, asegúrese de que los informes de inventario de S3 utilicen el formato CSV e incluyan todas las versiones de los objetos si desea ver recomendaciones o métricas de objetos no actuales. 

Un [template de panel de gestión de almacenamiento S3][8] está disponible para ayudarle a visualizar estas métricas. Puede clonarlo y personalizarlo para adaptarlo a sus necesidades.

## Actúe sobre las optimizaciones con las recomendaciones de gestión de almacenamiento {#act-on-optimizations-with-storage-management-recommendations}

La gestión de almacenamiento analiza sus datos de inventario y registros de acceso para presentar recomendaciones a nivel de prefijo para reducir los costos de almacenamiento en S3. Estas recomendaciones están disponibles para todos los clientes de gestión de almacenamiento. Los ahorros potenciales se estiman utilizando los precios de lista de AWS. Si tiene habilitado [Cloud Cost Management][7], las recomendaciones también aparecen en Recomendaciones de Costos en la Nube, y puede rastrear los ahorros reales de las optimizaciones.

Las recomendaciones se ejecutan a diario y se actualizan automáticamente en su cuenta tan pronto como se publican las recomendaciones.

### Requisitos previos {#prerequisites}
Ver recomendaciones requiere los siguientes requisitos previos:
1. Asegúrese de haber configurado los buckets de S3 para la gestión de almacenamiento siguiendo los pasos anteriores en esta página.
2. Si desea ver recomendaciones para mover datos de acceso poco frecuente a niveles más económicos por prefijo, habilite y reenvíe los registros de acceso de S3 a Datadog (se aplican tarifas de gestión de registros de Datadog).
3. Si desea ver recomendaciones para identificar versiones no actuales en los prefijos, asegúrese de incluir "Todas las versiones" como parte de la configuración del inventario de S3.

### Recomendaciones disponibles {#available-recommendations}
- Transitar datos de S3 no accedidos en el prefijo a Acceso Poco Frecuente
- Expirar objetos de versiones no actuales antiguas en el prefijo del bucket de S3
- Consolidar archivos pequeños en el prefijo para minimizar los costos de almacenamiento por objeto

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Recomendaciones para la Gestión de Almacenamiento" responsive="true">}}

[1]: mailto:storage-monitoring@datadoghq.com
[2]: /es/integrations/amazon-web-services/#resource-types-and-permissions
[3]: https://app.datadoghq.com/storage-monitoring
[4]: https://docs.datadoghq.com/es/infrastructure/storage_management/recommendations
[5]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-s3-inventory
[6]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[7]: /es/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings