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
title: Gestión del almacenamiento de Google Cloud Storage
---

{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  La Gestión del almacenamiento está en vista previa. Solicita acceso para empezar a monitorizar tu almacenamiento de objetos
{{< /callout >}}

## Instalación

### Paso 1: Instalar la integración de Google Cloud y activar la recopilación de recursos

Para recopilar métricas de Google Cloud Storage desde tu proyecto de Google Cloud, instala la integración con Google Cloud en Datadog. Habilita la recopilación de recursos del proyecto que contiene los buckets que quieres monitorizar. La recopilación de recursos permite a Datadog asociar las etiquetas (labels) de tus buckets a las métricas recopiladas a través de la Gestión del almacenamiento.

**Nota**: Aunque puedes desactivar espacios de nombres de métricas específicos, mantén activado el espacio de nombres de almacenamiento en la nube (gcp.storage).

### Paso 2: Activar la API Storage Insights

Habilita la API [Storage Insights][2] en tu project (proyecto) de Google Cloud.

### Paso 3: Conceder permisos al agente de servicio

Tras habilitar la API Storage Insights, se crea automáticamente un agente de servicio de nivel project (proyecto) con el siguiente formato: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`

El agente de servicio requiere estos roles IAM:

1. `roles/storage.insightsCollectorService` en el bucket source (fuente) (incluye los permisos storage.buckets.getObjectInsights y storage.buckets.get)
2. `roles/storage.objectCreator` en el bucket de destino (incluye el permiso storage.objects.create)

### Paso 4: Crear una configuración de informe de inventario

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

{{% /tab %}}
{{< /tabs >}}

### Paso 5: Añadir la función Visor de objetos de almacenamiento a tu cuenta de servicio de Datadog 

Concede a Datadog permiso para acceder y extraer de Google los informes de inventario generados. Este permiso debe estar en el bucket de destino donde se almacenan los informes de inventario.

1. Selecciona el bucket de destino para tus informes de inventario
2. En la page (página) de los detalles del bucket, haz clic en la pestaña Permisos
3. En Permisos, haz clic en Conceder acceso para añadir una nueva entidad de seguridad.
4. Principal: Introduce el correo electrónico de la cuenta de servicio de Datadog 
5. Rol: Selecciona Visor de Objetos de Almacenamiento (`roles/storage.objectViewer`)

### Pasos posteriores a la instalación

Una vez finalizados los pasos de configuración, completa el formulario [después de la configuración][3] con la siguiente información necesaria:
1. Nombre del bucket de destino que contiene los archivos de inventario
2. Nombre de la cuenta de servicio con los permisos concedidos
3. Prefijo donde se almacenan los archivos en el bucket de destino (si existe)
4. Nombre del bucket source (fuente) que deseas monitorizar (el bucket que produce los archivos de inventario)
5. Ubicación en Google Cloud del bucket de destino que contiene los archivos de inventario
6. ID del project (proyecto) de Google Cloud que contiene los buckets
7. Nombre de la organización Datadog

### Validación

Para verificar tu configuración:
1. Espera a que se genere el primer informe de inventario (hasta 24 horas para informes diarios o 7 días para informes semanales).
2. Comprueba los archivos de inventario en el bucket de destino.
3. Confirma que la integración con Datadog puede acceder a los archivos.
4. Ve a **Infrastructure** > **Storage Management** > **Installation Recommendations** (Infraestructura > Gestión del almacenamiento > Recomendaciones de instalación) para ver si tu bucket configurado aparece en la lista.

### Solucionar problemas

Si tienes algún problema o necesitas ayuda:
- Utiliza un único bucket de destino para todos los archivos de inventario por cada proyecto de Google Cloud.
- Comprueba que todos los permisos están correctamente configurados.
- Si el problema persiste, [ponte en contacto con Datadog][1] e indícanos los datos de tu bucket, el ID del proyecto de Google Cloud project y el nombre de la organización Datadog.

[1]: mailto:storage-monitoring@datadoghq.com
[2]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#enable_the_api
[3]: https://forms.gle/c7b8JiLENDaUEqGk8