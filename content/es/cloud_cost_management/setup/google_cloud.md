---
aliases:
- /es/cloud_cost_management/google_cloud/
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentación
  text: Obtener información sobre tu factura de AWS
- link: /cloud_cost_management/azure
  tag: Documentación
  text: Obtener información sobre tu factura de Azure
title: Google Cloud
---


## Información general

Para utilizar Google Cloud Cost Management en Datadog, sigue estos pasos:
1. Configura la [integración Google Cloud Platform][12].
2. Configura la [exportación de costes detallados de uso][13] con los permisos necesarios (API de Google Service, acceso a la exportación de proyectos y acceso a conjuntos de datos de BigQuery).
3. Crea o selecciona un [bucket de Google Cloud Storage][15] con los permisos necesarios (acceso a buckets).

## Configuración

### Configurar la integración Google Cloud Platform
Ve a [Configuración][3] y selecciona una integración Google Cloud Platform.
Si no ves la cuenta de servicio que buscas en la lista, ve a la [integración Google Cloud Platform][4] para configurarla.

<div class="alert alert-danger">
La integración Datadog Google Cloud Platform permite a Cloud Cost monitorizar automáticamente todos los proyectos a los que esta cuenta de servicio tiene acceso.
Para limitar los hosts de monitorización de infraestructuras a estos proyectos, aplica etiquetas (tags) a los hosts. Luego, decide si las etiquetas deben incluirse o excluirse de la monitorización, en la sección <strong>Limitar los filtros para la recopilación de métricas</strong> de la página de la integración.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Sección Limitar los filtros para la recopilación de métricas, configurada en la página de la integración Google Cloud Platform" >}}

### Habilitar la exportación de costes detallados de uso
<div class="alert alert-info">
Los <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">datos de costes detallados de uso</a> proporcionan toda la información incluida en los datos de costes de uso estándar, junto con campos adicionales que proporcionan datos granulares de costes a nivel de los recursos.
</div>

 1. Ve a [Exportación de la facturación][1] en la consola de Google Cloud *Facturación*.
 2. Habilita la exportación de [costes detallados de uso][2] (selecciona o crea un proyecto y un conjunto de datos de BigQuery).
 3. Documenta el `Billing Account ID` de la cuenta de facturación donde se configuró la exportación, así como la exportación `Project ID` y `Dataset Name`.

{{< img src="cloud_cost/billing_export.png" alt="Información resaltada del conjunto de datos y del proyecto de Google Cloud" >}}

_La exportación de conjuntos de datos de facturación de BigQuery recién creada sólo contiene los datos de los dos meses más recientes. Estos datos pueden tardar uno o dos días en rellenarse en BigQuery._

#### Habilitar las API de Google Service
Los siguientes permisos permiten a Datadog acceder a la exportación de la facturación y transferirla al bucket de almacenamiento mediante una consulta programada a BigQuery.

- Habilita la [API de BigQuery][5].
  1. En la consola de Google Cloud, ve a la página del selector de proyectos y selecciona tu proyecto de Google Cloud.
  2. Habilita la facturación en tu proyecto para todas las transferencias.

- Habilita el [servicio de transferencia de datos de BigQuery][5].
  1. Abre la página de la API de transferencia de datos de BigQuery en la librería de la API.
  2. En el menú desplegable, selecciona el proyecto que contiene la cuenta de servicio.
  3. Haz clic en el botón ENABLE (Habilitar).

  **Nota:** La API de transferencia de datos de BigQuery debe estar habilitada en el proyecto de Google que contiene la cuenta de servicio.


#### Configurar el acceso a la exportación de proyectos
[Añade la cuenta de servicio como elemento principal en el recurso del proyecto de exportación de conjuntos de datos][7]:
1. Ve a la página de IAM en la consola de Google Cloud y selecciona el proyecto de exportación de conjuntos de datos.
2. Selecciona la cuenta de servicio como elemento principal.
3. Selecciona un rol con los siguientes permisos para otorgar desde la lista desplegable:
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **Nota:** Puede ser un rol personalizado o puedes utilizar el rol de Google Cloud `roles/bigquery.admin` existente.

#### Configurar el acceso a la exportación de conjuntos de datos de BigQuery
[Añade la cuenta de servicio como elemento principal en el recurso de exportación de conjuntos de datos de BigQuery][8]:
1. En el panel del Explorador de la página de BigQuery, expande tu proyecto y selecciona la exportación de conjuntos de datos de BigQuery.
2. Haz clic en **Sharing > Permissions** (Compartir > Permisos) y luego en **add principal** (añadir elemento principal).
3. En el campo de nuevos elementos principales, introduce la cuenta de servicio.
4. Utilizando la lista de selección de un rol, asigna un rol con los siguientes permisos:
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **Nota:** Puede ser un rol personalizado o puedes utilizar el rol de Google Cloud `roles/bigquery.dataEditor` existente.

### Crear o seleccionar un bucket de Google Cloud Storage
Utiliza un bucket de Google Cloud Storage existente o crea uno nuevo.
Los datos se extraen periódicamente de tu conjunto de datos detallados de uso de BigQuery y se transfieren al bucket seleccionado, que tiene el prefijo `datadog_cloud_cost_detailed_usage_export`.

**Nota:** El bucket [debe estar ubicado junto][9] al conjunto de datos de exportación de BigQuery.

#### Configurar el acceso al bucket
[Añade la cuenta de servicio como elemento principal en el recurso del bucket de GCS][6]:
1. Accede a la página de buckets de Cloud Storage en la consola de Google Cloud y selecciona tu bucket.
2. Selecciona la pestaña de permisos y haz clic en el botón **grant access** (conceder acceso).
3. En el campo de nuevos elementos principales, introduce la cuenta de servicio.
4. Asigna un rol con los siguientes permisos:
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Nota:** Puede ser un rol personalizado o puedes utilizar los roles de Google Cloud `roles/storage.legacyObjectReader` y `roles/storage.legacyBucketWriter` existentes.

### (Opcional) Configura la autorización de servicios entre proyectos:
Si tu cuenta de servicio integrada ya existe en un proyecto de Google Cloud Platform diferente al de exportación del conjunto de datos de la facturación, debes [conceder una autorización de cuenta de servicio entre proyectos][10]:

1. Activa la creación del agente de servicio siguiendo la [documentación oficial][11] y utilizando los siguientes valores:
   * ENDPOINT: `bigquerydatatransfer.googleapis.com`
   * TIPO_DE_RECURSO: `project`
   * ID_DE_RECURSO: exportar el proyecto de conjunto de datos</br></br>

     Esto crea un nuevo agente de servicio similar a `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Añade el rol de cuenta de servicio de transferencia de datos de BigQuery creado por el activador como elemento principal en tu cuenta de servicio.
3. Asígnale el rol `roles/iam.serviceAccountTokenCreator`.

### Configurar Cloud Cost
Sigue los pasos indicados en [Configuración][3].

**Nota**: Los datos pueden tardar entre 48 y 72 horas en estabilizarse en Datadog.

## Tipos de costes
Puedes visualizar tus datos ingeridos utilizando los siguientes tipos de costes:

| Tipo de coste                                       | Descripción |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Coste total de los recursos asignados en el momento del uso en un intervalo. Los costes incluyen los créditos de promoción, así como los créditos de descuento por compromiso de uso. |
| `gcp.cost.amortized.shared.resources.allocated` | Todos tus costes de Google Cloud Platform amortizados, con desgloses e información adicional de las cargas de trabajo de contenedor. Requiere la [asignación de costes de contenedor][14].|
| `gcp.cost.ondemand`                             | Coste total público y a la carta de los recursos antes de aplicar los descuentos públicos y privados en un intervalo. |

### Etiquetas predefinidas
Datadog añade etiquetas a los datos de costes ingeridos para ayudarte a desglosar y asignar mejor tus costes. Estas etiquetas provienen de tu [informe de costes detallados de uso][16] y facilitan la detección y la comprensión de los datos de costes.

Las siguientes etiquetas predefinidas están disponibles para filtrar y agrupar datos:

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `google_product`             | Servicio Google que se está facturando.|
| `google_cost_type`           | Tipo de cargo cubierto por esta partida (por ejemplo, regular, impuesto, ajuste o error de redondeo).|
| `google_usage_type`          | Detalles de uso de la partida (por ejemplo, Almacenamiento estándar US).|
| `google_location`            | Localización asociada a la partida a nivel de varias regiones, país, región o zona.|
| `google_region`              | Región asociada a la partida.|
| `google_zone`                | Zona de disponibilidad asociada a la partida.|
| `google_pricing_usage_unit`  | Unidad de precio utilizada para calcular el coste de uso (por ejemplo, gibibyte, tebibyte o año).|
| `google_is_unused_reservation`| Si el uso se reservó pero no se utilizó.|
| `service_description` | Servicio Google Cloud (como Compute Engine o BigQuery). |
| `project_id` | ID del proyecto de Google Cloud que generó los datos de facturación de Cloud. |
| `project_name` | Nombre del proyecto de Google Cloud que generó los datos de facturación de Cloud. |
| `cost_type` | Tipo de coste que representa esta partida: `regular`, `tax`, `adjustment` o `rounding error`. |
| `sku_description` | Descripción del tipo de recurso utilizado, que describe los detalles de uso del recurso. |
| `resource_name` | Nombre que los clientes añaden a los recursos. Puede que no aparezca en todos los recursos. |
| `global_resource_name` | Identificador de recurso único global generado por Google Cloud. |

#### Correlación entre costes y observabilidad

Visualizar los costes en el contexto de los datos de observabilidad es importante para comprender cómo afectan los cambios de infraestructura a los costes, identificar por qué cambian los costes y optimizar la infraestructura, tanto en los costes como en el rendimiento. Datadog actualiza el recurso identificando etiquetas en los datos de costes de los principales productos Google para simplificar la correlación entre la observabilidad y las métricas de costes.

Por ejemplo, para ver el coste y el uso de cada base de datos Cloud SQL, puedes crear una tabla con `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` y `gcp.cloudsql.database.memory.utilization` (o cualquier otra métrica de Cloud SQL) y agrupar por `database_id`. O, para ver el uso y los costes de Cloud Function uno al lado del otro, puedes hacer un gráfico con `gcp.cloudfunctions.function.execution_count` y `gcp.cost.amortized` agrupados por `function_name`.

Están disponibles las siguientes etiquetas predefinidas:
| Producto Google     | Etiqueta(s)                         |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`   |
| Cloud Functions     | `function_name`                  |
| Cloud Run           | `job_name`, `service_name`    |
| Cloud SQL           | `database_id`                    |
| Cloud Spanner      | `instance_id`                      |
| App Engine          | `module_id`                      |
| BigQuery            | `project_id`, `dataset_id`       |
| Kubernetes Engine  | `cluster_name`                   |

### Asignación de contenedor
Las métricas de **Asignación de contenedor** contienen todos los mismos costes que las métricas de Google Cloud Platform, pero con desgloses e información adicional de las cargas de trabajo de contenedor. Para obtener más información, consulta [Asignación de costes de contenedor][14].

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup?cloud=gcp
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /es/integrations/google_cloud_platform/
[13]: /es/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /es/cloud_cost_management/container_cost_allocation/
[15]: /es/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
