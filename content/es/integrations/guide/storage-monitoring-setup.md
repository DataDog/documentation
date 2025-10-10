---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimiza y soluciona los problemas de almacenamiento en la nube a escala con
    Storage Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduce los costos de almacenamiento en la nube y mejora la eficiencia operativa
    con Datadog Storage Monitoring
private: true
title: Storage Monitoring para Amazon S3, Google Cloud Storage y Azure Blob Storage
---

<div class="alert alert-info">Storage Monitoring está en Vista previa.</div>

## Información general

Storage Monitoring para Amazon S3, Google Cloud Storage y Azure Blob Storage proporciona análisis profundos a nivel de prefijo para ayudarte a comprender exactamente cómo se está utilizando tu almacenamiento. Detecta posibles problemas antes de que afecten a las operaciones y te ayuda a tomar decisiones basadas en datos sobre la optimización del almacenamiento. Utiliza esta información para rastrear el crecimiento del almacenamiento, investigar los patrones de acceso y optimizar los costos.

En esta guía se explica cómo configurar la Storage Monitoring en Datadog para tus buckets de Amazon S3, Google Cloud Storage y cuentas de almacenamiento de Azure. Para acceder a tus datos de Storage Monitoring ve a **Infraestructura > Storage Monitoring**.

Selecciona tu servicio de almacenamiento en la nube para acceder a las instrucciones de configuración.

{{< partial name="cloud_storage_monitoring/storage-monitoring-setup.html" >}}

## Configuración para Amazon S3

{{< tabs >}}
{{% tab "Recommended: Storage Monitoring UI" %}}

La forma más rápida de configurar la Storage Monitoring es a través de la page (página) [Añadir buckets][501] en Datadog, donde puedes configurar varios buckets de S3 al mismo tiempo.

1. Ve a Datadog > **Infraestructura** > **Storage Monitoring**.
2. Haz clic en [Añadir buckets][501].

{{< img src="integrations/guide/storage_monitoring/add-buckets.png" alt="Seleccionar buckets para activar Storage Monitoring" responsive="true">}}

3. Habilita la integración con Amazon S3 y la recopilación de recursos para todas las cuentas de AWS que desees monitorizar.

   1. **Permite que Datadog lea desde tus buckets de destino.** Añade los siguientes permisos al rol de integración IAM Datadog para la cuenta propietaria de los buckets de destino:
      - `s3:GetObject`
      - `s3:ListBucket`

      Aplica estos permisos de sólo lectura únicamente a los buckets de destino que contengan tus archivos de inventario de S3.

   1. **Permite que los buckets source (fuente) escriban en los buckets de destino.** Los buckets de destino deben incluir una política que permita a los buckets source (fuente) escribir datos de inventario. Consulta [Creación de una política de buckets de destino][502] en la documentación de AWS para obtener más detalles.

   Ejemplo de política de bucket source (fuente):

      ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "AllowListInventoryBucket",
              "Effect": "Allow",
              "Action": "s3:ListBucket",
              "Resource": "arn:aws:s3:::storage-monitoring-s3-inventory-destination"
            },
            {
              "Sid": "AllowGetInventoryObjects",
              "Effect": "Allow",
              "Action": "s3:GetObject",
              "Resource": "arn:aws:s3:::storage-monitoring-s3-inventory-destination/*"
            }
          ]
        }

      ```

4. Selecciona los buckets de S3 que desees monitorizar con Storage Monitoring. Puedes seleccionar buckets de varias cuentas de AWS a la vez.

{{< img src="integrations/guide/storage_monitoring/step-2.png" alt="Seleccionar buckets para habilitar Storage Monitoring" responsive="true">}}

5. Asigna un bucket de destino por región para almacenar los informes de inventario de S3 de los buckets source (fuente). Puede ser un bucket de AWS existente o uno nuevo.

   - Bucket source (fuente): El bucket de S3 que deseas monitorizar con Storage Monitoring.
   - Bucket de destino: Se utiliza para almacenar informes de inventario (uno por región AWS, se puede reutilizar)
6. Completa la configuración. El proceso de generación de inventario se iniciará en AWS en las 24 horas siguientes al primer informe.
7. Vuelve a **Infraestructura > Storage Monitoring** para ver aparecer tus buckets.

[501]: https://app.datadoghq.com/storage-monitoring?mConfigure=true
[502]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html#configure-inventory-destination-bucket-policy
{{% /tab %}}
{{% tab "CloudFormation" %}}

También puedes configurar Storage Monitoring utilizando las plantillas de CloudFormation proporcionadas. Este proceso consta de dos pasos:

### Paso 1: Configurar la generación de inventarios

Esta plantilla configura tu bucket de S3 existente para generar informes de inventario, que Datadog utiliza para generar métricas detalladas sobre tus prefijos de bucket.

1. Descarga la plantilla [source-bucket-inventory-cfn.yaml][101].
2. En [AWS CloudFormation][102], haz clic en **Crear stack tecnológico** en la esquina superior derecha y selecciona **Con recursos existentes (importar recursos)**.
3. En el paso **Especificar plantilla**, selecciona **Cargar un archivo de plantilla**.
4. Haz clic en **Seleccionar archivo** y selecciona el archivo `source-bucket-inventory-cfn.yaml`, a continuación, haz clic en **Siguiente**.
5. Introduce el nombre del bucket para el que deseas que AWS empiece a generar inventarios y haz clic en **Siguiente**.

 {{< img src="integrations/guide/storage_monitoring/identify_resources.png" alt="Identificar recursos de S3 para comenzar a generar inventario" responsive="true" style="width:90%;" >}}

6. Completa los parámetros necesarios:
   - **DestinationBucketName**: el bucket para almacenar los archivos de inventario. **Nota**: Sólo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **DestinationBucketName**: el bucket que deseas monitorizar y para el que deseas empezar a generar archivos de inventario.

   Parámetros opcionales:
   - **SourceBucketPrefix**: (opcional) limita la monitorización a una ruta específica en el bucket de origen.
   - **DestinationBucketPrefix**: ruta específica dentro del bucket de destino. Asegúrate de que esta ruta no incluya barras finales (`/`).

{{< img src="integrations/guide/storage_monitoring/specify_stack_details.png" alt="Especificar detalles de stack tecnológico" responsive="true" style="width:90%;" >}}

7. Haz clic en **Siguiente**.
8. Espera a que AWS localice tu bucket de origen y haz clic en **Importar recursos** en la esquina inferior derecha.

**Nota:** Esta plantilla de CloudFormation se puede revertir, pero la reversión no elimina los recursos creados. Esto es para asegurar que el bucket existente no se elimina. Puedes eliminar manualmente las configuraciones de inventario yendo a la pestaña **Management** (Gestión) en la vista del bucket.

**Nota:** Revisa los [precios de Amazon S3][106] para conocer los costes relacionados con la generación de inventario.
### Paso 2: Configurar permisos necesarios

Esta plantilla crea dos políticas de IAM:
  - Una política para permitir que Datadog lea los archivos de inventario del bucket de destino.
  - Una política para permitir que tu bucket source (fuente) escriba archivos de inventario en el bucket de destino.

1. Descarga la plantilla [cloud-inventory-policies-cfn.yaml][103].
2. En [AWS CloudFormation][104], haz clic en **Crear stack tecnológico** en la esquina superior derecha y selecciona **Con nuevos recursos (estándar)**.
3. En el paso **Especificar plantilla**, selecciona **Cargar archivo de plantilla**.
4. Haz clic en **Seleccionar archivo** y selecciona el archivo `cloud-inventory-policies-cfn.yaml`, a continuación, haz clic en **Siguiente**.
5. Completa los parámetros necesarios:
   - **DatadogIntegrationRole**: tu nombre de rol de la integración de Datadog y AWS
   - **DestinationBucketName**: el nombre del bucket que recibe los archivos de inventario. **Nota**: Sólo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **SourceBucketName**: el nombre del bucket para el que deseas empezar a generar archivos de inventario

   Parámetros opcionales:
   - **SourceBucketPrefix**: este parámetro limita la generación de inventario a un prefijo específico en el bucket source (fuente)
   - **DestinationBucketPrefix**: si deseas reutilizar un bucket existente como destino, este parámetro permite que los archivos de inventario se envíen a un prefijo específico de ese bucket. Asegúrate de que los prefijos no incluyan barras finales (`/`).

{{< img src="integrations/guide/storage_monitoring/bucket_policy_stack_details.png" alt="Parámetros de stack tecnológico para la política de bucket" responsive="true" style="width:90%;" >}}

6. En el paso **Revisar y crear**, comprueba que los parámetros se hayan introducido correctamente y haz clic en **Enviar**.

### Pasos posteriores a la instalación

Después de completar la configuración de CloudFormation, completa el [formulario posterior a la configuración][105] con la siguiente información necesaria:
1. Nombre del bucket de destino que contiene los archivos de inventario.
2. Prefijo donde se almacenan los archivos en el bucket de destino (si existe).
3. Nombre del bucket source (fuente) que deseas monitorizar (el bucket que produce los archivos de inventario).
4. Región de AWS del bucket de destino que contiene los archivos de inventario.
5. ID de la cuenta de AWS que contiene los buckets.
6. ID de la organización de Datadog.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://forms.gle/L97Ndxr2XLen1GBs7
[106]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Terraform" %}}

Puedes utilizar el recurso Terraform [aws_s3_bucket_inventory][403] para configurar Storage Monitoring 

En el siguiente ejemplo se muestra cómo habilitar el inventario diario en un bucket de S3 para la monitorización de Datadog. Para utilizar este ejemplo:

   - Sustituye `<MY_MONITORED_BUCKET>` por el nombre del bucket que desees monitorizar.
   - Sustituye `<MY_INVENTORY_DESTINATION>` por el nombre del bucket que recibe tus archivos de inventario.
   - Sustituye `<DESTINATION_ACCOUNT_ID>` por el ID de la cuenta de AWS a la que pertenece el bucket de destino.

```tf
resource "aws_s3_bucket" "monitored" {
  bucket = "<MY_MONITORED_BUCKET>"
}

resource "aws_s3_bucket" "inventory_destination" {
  bucket = "<MY_INVENTORY_DESTINATION>"
}

resource "aws_s3_bucket_inventory" "daily_inventory" {
  bucket = aws_s3_bucket.monitored.id
  name   = "datadog-daily-inventory"


  included_object_versions = "All"
  schedule {
    frequency = "Daily"
  }
  destination {
    bucket {
      account_id = "<DESTINATION_ACCOUNT_ID>"
      bucket_arn = aws_s3_bucket.inventory_destination.arn
      format     = "CSV"
      prefix     = "datadog-inventory/"
    }
  }
  optional_fields = [
    "Size",
    "StorageClass",
    "LastModifiedDate"
  ]
}
```

**Notas**:

   - El bucket de destino puede ser tu bucket source (fuente), pero por seguridad y separación lógica, muchas organizaciones utilizan un bucket separado.
   - La sección `optional_fields` se recomienda para las métricas de prefijo Datadog.

### Pasos posteriores a la instalación

Una vez que la configuración del inventario esté configurada y tus archivos de inventario empiecen a aparecer en el bucket de destino, completa [este formulario][401] para proporcionar los detalles de tu configuración de S3. Esto permite a Datadog empezar a generar métricas de prefijo para tu almacenamiento.

### Utiliza módulos para configuraciones complejas

Si necesitas gestionar varios buckets, políticas de inventario complejas, cifrado o configuraciones entre cuentas, puedes utilizar el  [módulo terraform-aws-s3-bucket][402].

### Solucionar problemas

- Los archivos del Inventario de S3 se entregan diariamente y pueden tardar hasta 24 horas en aparecer después de la configuración.
- Asegúrate de que los permisos de IAM permitan a S3 escribir archivos de inventario en tu bucket de destino.
- Si es necesario el acceso entre cuentas, confirma que el prefijo de destino del inventario (`datadog-inventory/` en el ejemplo) sea correcto y accesible para Datadog.

[401]: https://docs.google.com/forms/d/e/1FAIpQLScd0xor8RQ76N6BemvvMzg9UU7Q90svFrNGY8n83sMF2JXhkA/viewform
[402]: https://github.com/terraform-aws-modules/terraform-aws-s3-bucket/tree/master/examples/s3-inventory
[403]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_inventory
{{% /tab %}}

{{% tab "AWS Console" %}}

Para configurar manualmente el [Inventario de Amazon S3][206] necesario y la configuración relacionada, sigue estos pasos:

### Paso 1: Crear un bucket de destino

1. [Crea un bucket S3][201] para almacenar tus archivos de inventario. Este bucket funciona como la localización central para los informes de inventario. **Nota**: Solo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
2. Crear un prefijo en el bucket de destino (opcional).

### Paso 2: Configurar el bucket y las políticas de rol de la integración

1. Sigue los pasos indicados en la [Guía del usuario de Amazon S3][202] para añadir una política de bucket a tu bucket de destino que permita el acceso de escritura (`s3:PutObject`) desde tus buckets source (fuente).

2. Asegúrate de que el rol de la integración de Datadog y AWS tenga permisos `s3:GetObject` y `s3:ListObjects` en el bucket de destino. Estos permisos permiten a Datadog leer los archivos de inventario generados.

### Paso 3: Configurar la generación de inventarios

Para cada bucket que desees monitorizar:
1. Ve a la [page (página) de buckets de Amazon S3][203] en la consola de AWS y selecciona el bucket.
2. Ve a la pestaña **Management** (Gestión) del bucket.
3. Haz clic en **Crear configuración de inventario**.
4. Configura los siguientes ajustes:
  - Establece un nombre de configuración 
  - (Opcional) Especifica un prefijo de bucket source (fuente)
  - **Versiones de objetos**: Datadog recomienda seleccionar **Sólo versiones actuales**.
  - **Destino**: selecciona el bucket de destino común para los archivos de inventario de tu cuenta de AWS. Por ejemplo, si el bucket se llama `destination-bucket`, introduce `s3://your-destination-bucket`
  **Nota**: Si deseas utilizar un prefijo en el bucket de destino, añade esto también
  - **Frecuencia**: Datadog recomienda elegir **Diaria**. Esta opción determina la frecuencia con la que se actualizan las métricas de prefijo en Datadog
  - **Formato de salida**: CSV
  - **Estado**: Activado
  - **Cifrado del lado del servidor**: no especifiques una clave de cifrado
  - Selecciona los siguientes **Campos de metadatos adicionales**:
      1. Tamaño
      2. Última modificación
      3. Clase de almacenamiento

**Nota**: Revisa los [precios de Amazon S3][204] para conocer los costes relacionados con la generación de inventario.

### Pasos posteriores a la instalación

Después de completar estos pasos, completa el [formulario posterior a la configuración][205] con la siguiente información necesaria:

1. Nombre del bucket de destino donde se almacenan los inventarios.
2. Prefijo donde se almacenan los archivos en el bucket de destino (opcional).
3. Región del bucket de destino.
4. ID de la cuenta de AWS que contiene el bucket.
5. Nombre del rol de Datadog que tiene los permisos para leer objetos en el bucket de destino.
6. ID de la organización de Datadog.

[201]: https://console.aws.amazon.com/s3/bucket/create
[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
[205]: https://forms.gle/L97Ndxr2XLen1GBs7
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}

{{% tab "Existing S3 inventory" %}}

Si ya has configurado el inventario de S3 para los buckets que deseas monitorizar,  elige **una** de las siguientes opciones:

- Completa [este formulario][601] para compartir tus configuraciones con Datadog
- [Ponte en contacto con nosotros][602] para utilizar una API para configurar varios buckets

[601]: https://forms.gle/dhDbSxTvCUDXg1QR7
[602]: mailto:storage-monitoring@datadoghq.com
{{% /tab %}}

{{< /tabs >}}

### Validación

Para verificar tu configuración:
   - Espera a que se genere el primer informe de inventario (hasta 24 horas para inventarios diarios)
   - Comprueba el bucket de destino para los archivos de inventario
   - Confirma que la integración de Datadog pueda acceder a los archivos:
       - Ve a **Infraestructura -> Storage Monitoring -> Recomendaciones de instalación** para ver si el bucket que has configurado aparece en la lista

### Solucionar problemas

Si tienes algún problema o necesitas ayuda:
- Asegúrate de utilizar un único bucket de destino para todos los archivos de inventario por cuenta de AWS 
- Verifica que todos los permisos estén correctamente configurados
- Si sigues teniendo problemas, [ponte en contacto][1] con los datos de tu bucket, el ID de cuenta de AWS y el ID de organización de Datadog.

## Configuración para Google Cloud Storage

El proceso consta de los siguientes pasos:

#### Paso 1: Instalar la integración de Google Cloud y activar la recopilación de recursos

Para recopilar métricas de Google Cloud Storage desde tu project (proyecto) de Google Cloud, instala la integración de Google Cloud en Datadog. Habilita la recopilación de recursos para el project (proyecto) que contiene los buckets que deseas monitorizar. La recopilación de recursos permite a Datadog asociar las etiquetas de tus buckets con las métricas recopiladas a través de la monitorización del almacenamiento.

**Nota**: Aunque puedes desactivar espacios de nombres de métricas específicos, mantén activado el espacio de nombres de almacenamiento en la nube (gcp.storage).

#### Paso 2: Activar la API Storage Insights

Habilita la API [Storage Insights][2] en tu project (proyecto) de Google Cloud.

#### Paso 3: Conceder permisos al agente de servicio

Tras habilitar la API Storage Insights, se crea automáticamente un agente de servicio de nivel project (proyecto) con el siguiente formato: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`

El agente de servicio requiere estos roles IAM:

1. `roles/storage.insightsCollectorService` en el bucket source (fuente) (incluye los permisos storage.buckets.getObjectInsights y storage.buckets.get)
2. `roles/storage.objectCreator` en el bucket de destino (incluye el permiso storage.objects.create)

#### Paso 4: Crear una configuración de informe de inventario

Puedes crear una configuración de informe de inventario de varias maneras. Los métodos más rápidos utilizan las plantillas de Google Cloud CLI o de Terraform. Independientemente del método, asegúrate de que la configuración:

1. Incluye estos campos de metadatos: `"bucket", "name", "project (proyecto)", "size", "updated", "storageClass"`
2. Genera informes CSV con `'\n'` como delimitador y `','` como separador.
3. Utiliza este formato de ruta de destino: `<BUCKET>/{{date}}`, donde `<BUCKET>` es el nombre del bucket monitorizado

{{< tabs >}}
{{% tab "Google Cloud CLI" %}}

Utiliza la [Google Cloud CLI][301] para ejecutar el siguiente comando:

```
gcloud storage insights inventory-reports create <SOURCE_BUCKET_URL> \
  --no-csv-header \
  --display-name=datadog-storage-monitoring \
  --destination=gs://<DESTINATION_BUCKET>/<SOURCE_BUCKET>/{{date}}> \
  --metadata-fields=project,bucket,name,size,updated,storageClass \
  --schedule-starts=<YYYY-MM-DD> \
  --schedule-repeats=<DAILY|WEEKLY> \
  --schedule-repeats-until=<YYYY-MM-DD>
```

[301]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#create-config-cli

{{% /tab %}}
{{% tab "Terraform" %}}

Copia la siguiente plantilla de Terraform, sustituye los argumentos necesarios y aplícala en el project (proyecto) de Google Cloud que contiene tu bucket.

<!-- vale off -->
{{% collapse-content title="Terraform configuration for inventory reports" level="h4" expanded=true %}}

```hcl
locals {
  source_bucket      = "" # The name of the bucket you want to monitor
  destination_bucket = "" # The bucket where inventory reports are written
  frequency          = "" # Possible values: Daily, Weekly (report generation frequency)
  location           = "" # The location of your source and destination buckets
}

data "google_project" "project" {
}

resource "google_storage_insights_report_config" "config" {
  display_name = "datadog-storage-monitoring"
  location     = local.location
  frequency_options {
    frequency = local.frequency
    start_date {
      day   = "" # Fill in the day
      month = "" # Fill in the month
      year  = "" # Fill in the year
    }
    end_date {
      day   = "" # Fill in the day
      month = "" # Fill in the month
      year  = "" # Fill in the year
    }
  }
  csv_options {
    record_separator = "\n"
    delimiter        = ","
    header_required  = false
  }
  object_metadata_report_options {
    metadata_fields = ["bucket", "name", "project", "size", "updated", "storageClass"]
    storage_filters {
      bucket = local.source_bucket
    }
    storage_destination_options {
      bucket           = google_storage_bucket.report_bucket.name
      destination_path = "${local.source_bucket}/{{date}}"
    }
  }

  depends_on = [
    google_storage_bucket_iam_member.admin
  ]
}

resource "google_storage_bucket" "report_bucket" {
  name                        = local.destination_bucket
  location                    = local.location
  force_destroy               = true
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_iam_member" "admin" {
  bucket = google_storage_bucket.report_bucket.name
  role   = "roles/storage.admin"
  member = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-storageinsights.iam.gserviceaccount.com"
}
```

{{% /collapse-content %}}
<!-- vale on -->

{{% /tab %}}
{{% tab "Permitir a Datadog crear la configuración en su nombre" %}}

Puedes permitir que Datadog gestione la configuración del informe de inventario proporcionando los permisos adecuados a tu cuenta de servicio:

1. Ve a IAM & Admin -> Cuentas de servicio
2. Busca tu cuenta de servicio Datadog y añade el rol `roles/storageinsights.Admin` 
3. Ve al bucket source (fuente) que desees monitorizar y concede estos permisos:
   - `roles/storage.insightsCollectorService`
   - `roles/storage.ObjectViewer`
4. Ve al bucket de destino y concede estos permisos:
   - `roles/storage.objectCreator`
   - `roles/storage.insightsCollectorService`

Alternativamente, puedes crear un rol personalizado específicamente para Datadog con estos permisos necesarios:

```
storage.buckets.get
storage.objects.list
storage.buckets.getObjectInsights
storage.buckets.get
storage.objects.create
storageinsights.reportConfigs.get
storageinsights.reportConfigs.create
storageinsights.reportConfigs.list
storageinsights.reportConfigs.update
storage.objects.get
storageinsights.reportDetails.get
storageinsights.reportDetails.list
```

Después de conceder los permisos necesarios, Datadog puede crear la configuración del informe de inventario con los detalles de tu configuración.

#### Paso 5: Añadir la función Visor de objetos de almacenamiento a tu cuenta de servicio de Datadog 

Concede a Datadog permiso para acceder y extraer de Google los informes de inventario generados. Este permiso debe estar en el bucket de destino donde se almacenan los informes de inventario.

1. Selecciona el bucket de destino para tus informes de inventario
2. En la page (página) de los detalles del bucket, haz clic en la pestaña Permisos
3. En Permisos, haz clic en Conceder acceso para añadir una nueva entidad de seguridad.
4. Principal: Introduce el correo electrónico de la cuenta de servicio de Datadog 
5. Rol: Selecciona Visor de Objetos de Almacenamiento (`roles/storage.objectViewer`)

{{% /tab %}}
{{< /tabs >}}

### Pasos posteriores a la instalación

Una vez finalizados los pasos de configuración, completa el formulario [después de la configuración][3] con la siguiente información necesaria:
1. Nombre del bucket de destino que contiene los archivos de inventario
2. Nombre de la cuenta de servicio con los permisos concedidos
3. Prefijo donde se almacenan los archivos en el bucket de destino (si existe)
4. Nombre del bucket source (fuente) que deseas monitorizar (el bucket que produce los archivos de inventario)
5. Ubicación en Google Cloud del bucket de destino que contiene los archivos de inventario
6. ID del project (proyecto) de Google Cloud que contiene los buckets
7. ID de la organización de Datadog

### Validación

Para verificar tu configuración:
1. Espera a que se genere el primer informe de inventario (hasta 24 horas para informes diarios o 7 días para informes semanales).
2. Check el bucket de destino para buscar los archivos de inventario
3. Confirma que la integración de Datadog pueda acceder a los archivos
4. Ve a Infraestructura -> Storage Monitoring -> Recomendaciones de instalación para ver si tu bucket configurado aparece en la lista

### Solucionar problemas

Si tienes algún problema o necesitas ayuda:
- Utiliza un único bucket de destino para todos los archivos de inventario por project (proyecto) de Google Cloud
- Verifica que todos los permisos estén correctamente configurados
- Si el problema persiste, [ponte en contacto][1] con los datos de tu bucket, el ID del project (proyecto) de Google Cloud y el ID de la organización de Datadog.

[1]: mailto:storage-monitoring@datadoghq.com
[2]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#enable_the_api
[3]: https://forms.gle/c7b8JiLENDaUEqGk8

## Configuración para Azure Blob Storage

{{< tabs >}}
{{% tab "CLI de Azure" %}}

Habilita los inventarios para las cuentas de almacenamiento seleccionadas en cada suscripción ejecutando la siguiente secuencia de scripts en tu [Azure Cloud Shell][301]:

```shell
curl https://datadogstoragemonitoring.blob.core.windows.net/scripts/install.sh \
  | bash -s -- <CLIENT_ID> <SUBSCRIPTION_ID> <COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>
```

Antes de ejecutar el script, configura tu [entorno shell][302] en Bash y sustituye las distintas entradas de marcador de posición por los valores correctos:
- `<CLIENT_ID>`: El ID del cliente de un registro de aplicación ya configurado mediante la [integración de Datadog Azure][302]
- `<SUBSCRIPTION_ID>`: El ID de la suscripción de Azure que contiene las cuentas de almacenamiento
- `<COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>`: Una lista separada por comas de las cuentas de almacenamiento que deseas monitorizar (por ejemplo, `storageaccount1,storageaccount2`)

[301]: https://shell.azure.com
[302]: /es/integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
{{% /tab %}}

{{% tab "Azure Portal" %}}

Para cada cuenta de almacenamiento que desees monitorizar, sigue todos los pasos que se indican a continuación:

### Crear una política de inventario de blobs
1. En el portal de Azure, ve a tu cuenta de almacenamiento.
2. Ve a **Gestión de datos** > **Inventario de blobs**.
3. Haz clic en **Add** (Añadir).
4. Configura la política:
   - Nombre: **datadog-storage-monitoring**
   - Contenedor de destino:
      - Haz clic en **Crear nuevo** e introduce el nombre `datadog-storage-monitoring`.
   - Tipo de objeto a inventariar: **Blob**
   - Schedule (horario): **Diario**
   - Tipos de blobs: Selecciona **Block blobs**, **Append blobs** y **Page blobs**.
   - Subtipos: Selecciona **Incluir versiones de blobs**
   - Campos de esquema: Selecciona Todos o asegúrate de que al menos los siguientes están seleccionados:
      - **Nombre**
      - **Nivel de acceso**
      - **Última modificación**
      - **Longitud del contenido**
      - **Servidor cifrado**
      - **Estado de la versión actual**
      - **ID de la versión**
   - Prefijo de exclusión: datadog-storage-monitoring
5. Haz clic en **Add** (Añadir).

### Añadir la asignación de roles
1. En el portal de Azure, ve a tu cuenta de almacenamiento.
2. Ve a **Almacenamiento de datos** > **Contenedores**.
3. Haz clic en el contenedor **datadog-storage-monitoring**.
4. Haz clic en **Control de acceso (IAM)** en el menú de la izquierda.
5. Haz clic en **Añadir** > **Añadir asignación de roles**.
6. Completa la asignación de roles:
    - Rol: Selecciona **Lector de Datos de Blob de Almacenamiento**. Haz clic en **Siguiente**.
    - Asignar acceso a: **Usuario, grupo o entidad de servicio**.
    - Miembros: Haz clic en **+ Seleccionar miembros** y busca tu Registro de aplicación por su nombre y selecciónalo.
    - **Nota**: Esto debería ser un Registro de aplicación configurado en la integración de Azure de Datadog. Recuerda el ID del cliente para más adelante.
7.  Haz clic en **Revisar + asignar**.

{{% /tab %}}
{{< /tabs >}}

### Después de la instalación

Una vez finalizados los pasos anteriores, completa el [formulario de después de la configuración][310].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[310]: https://forms.gle/WXFbGyBwWfEo3gbM7