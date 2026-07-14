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
  text: Obtenga información sobre su factura de AWS
- link: /cloud_cost_management/azure
  tag: Documentación
  text: Obtenga información sobre su factura de Azure
- link: /cloud_cost_management/oracle
  tag: Documentación
  text: Obtenga información sobre su factura de Oracle
title: Google Cloud
---
## Resumen {#overview}

Para usar Cloud Cost Management en Datadog, siga estos pasos:
1. Configure la [Integración de Google Cloud Platform][12]
2. Configure la [exportación de costos de uso detallados][13] con los permisos necesarios (Google Service APIs, acceso al proyecto de exportación y acceso al conjunto de datos de BigQuery)
3. Cree o seleccione un [bucket de Google Cloud Storage][15] con los permisos necesarios (acceso al bucket)

## Configuración {#setup}

Puede configurar usando la [API][18], [Terraform][19], o directamente en Datadog siguiendo las instrucciones a continuación.

### Configure la integración de Google Cloud Platform {#configure-the-google-cloud-platform-integration}
Navegue a [Setup & Configuration][3], agregue una cuenta de Google Cloud Platform y siga los pasos para configurar la integración de Google Cloud Platform.

<div class="alert alert-danger">
La integración de Google Cloud Platform de Datadog permite que Cloud Cost realice el seguimiento automático de todos los proyectos a los que esta cuenta de servicio tiene acceso.
Para limitar los hosts de monitoreo de infraestructura para estos proyectos, aplique etiquetas a los hosts. Luego defina si las etiquetas deben ser incluidas o excluidas del monitoreo en la sección {{< ui >}}Limit Metric Collection Filters{{< /ui >}} de la página de integración.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Limite la sección de filtros de colección de métricas configurada en la página de integración de Google Cloud Platform" >}}

### Habilite la exportación detallada de costos de uso {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
Los datos de <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">costos de uso detallados</a> proporcionan toda la información incluida en los datos estándar de costos de uso, junto con campos adicionales que ofrecen datos de costos a nivel de recurso.
</div>

 1. Navegar a [Exportación de Facturación][1] en la consola de Google Cloud *Facturación*.
 2. Habilitar la exportación de [Costo de Uso Detallado][2] (seleccionar o crear un proyecto y un conjunto de datos de BigQuery).
 3. Documente el {{< ui >}}Billing Account ID{{< /ui >}} para la cuenta de facturación donde se configuró la exportación, así como la exportación {{< ui >}}Project ID{{< /ui >}} y {{< ui >}}Dataset Name{{< /ui >}}.

{{< img src="cloud_cost/billing_export.png" alt="Información del proyecto de Google Cloud y del conjunto de datos resaltada" >}}

_Los conjuntos de datos de exportación de facturación de BigQuery recién creados solo contienen los dos meses más recientes de datos. Puede tardar uno o dos días en que estos datos se completen en BigQuery._

#### Habilitar las API de Servicios de Google {#enable-google-service-apis}
Los siguientes permisos permiten a Datadog acceder y transferir la exportación de facturación al bucket de almacenamiento utilizando una consulta programada de BigQuery.

- Habilitar la [API de BigQuery][5].
  1. En la consola de Google Cloud, vaya a la página de selección de proyecto y seleccione su proyecto de Google Cloud.
  2. Habilite la facturación en su proyecto para todas las transferencias.

- Habilite el [Servicio de Transferencia de Datos de BigQuery][5].
  1. Abra la página de la API de Transferencia de Datos de BigQuery en la biblioteca de API.
  2. En el menú desplegable, seleccione el proyecto que contiene la cuenta de servicio.
  3. Haga clic en el botón {{< ui >}}ENABLE{{< /ui >}}.

  **Nota:** La API de Transferencia de Datos de BigQuery debe habilitarse en el proyecto de Google que contiene la cuenta de servicio.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo Terraform" style="width:100%" >}}

### Defina detalles de configuración {#define-configuration-details}

Ingrese los siguientes detalles para su configuración:

* **Bucket de almacenamiento de GCP**: Seleccione **Sí** para crear un bucket de almacenamiento, o seleccione **No** para usar un bucket existente.

    **Nota**: Si utiliza un bucket existente, verifique que el bucket esté ubicado junto con el conjunto de datos de exportación de BigQuery.

* **Nombre del bucket**: El nombre de su nuevo bucket de almacenamiento de GCP o de uno existente.
* **Región**: La región de GCP de su bucket. Por ejemplo, `northamerica-northeast1`.
* **ID de cuenta de facturación**: El ID de la cuenta de facturación que reporta los costos de su exportación de uso.
* **Nombre e ID del proyecto de exportación**: El nombre y el ID de su proyecto de exportación.
* **Nombre e ID del conjunto de datos de exportación**: El nombre y el ID de su conjunto de datos de exportación.

### Crear exportación de costos y habilitar APIs de Google Service {#create-cost-export-and-enable-google-service-apis}

Complete los pasos de [Habilitar exportación de costos de uso detallado](#enable-detailed-usage-cost-export) y [Habilitar APIs de Google Service](#enable-google-service-apis) anteriores, luego regrese a CCM.

### Copie el HCL de Terraform generado y aplique los cambios {#copy-generated-terraform-hcl-and-apply-changes}

En la interfaz de usuario de configuración de Terraform de CCM, siga las instrucciones en el paso **Aplicar configuración de Terraform**. Resuelva cualquier problema que aparezca al ejecutar `terraform plan` o `terraform apply` antes de regresar a CCM para confirmar la creación de la cuenta.

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo manual" style="width:100%" >}}

#### Configure el acceso al proyecto de exportación {#configure-export-project-access}
[Agregue la cuenta de servicio como un principal en el recurso del proyecto del conjunto de datos de exportación][7]:
1. Navegue a la página de IAM en la consola de Google Cloud y seleccione el proyecto del conjunto de datos de exportación.
2. Seleccione la cuenta de servicio como un principal.
3. Seleccione un rol con los siguientes permisos para otorgar desde la lista desplegable:
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **Nota:** Esto puede ser un rol personalizado, o puede usar el rol existente de Google Cloud `roles/bigquery.admin`.

#### Configure el acceso al conjunto de datos de exportación de BigQuery {#configure-export-bigquery-dataset-access}
[Agregue la cuenta de servicio como un principal en el recurso del conjunto de datos de exportación de BigQuery][8]:
1. En el panel del explorador en la página de BigQuery, expanda su proyecto y seleccione el conjunto de datos de exportación de BigQuery.
2. Haz clic en {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}} y luego en {{< ui >}}add principal{{< /ui >}}.
3. En el nuevo campo de principales, ingrese la cuenta de servicio.
4. Usando la lista de selección de roles, asigne un rol con los siguientes permisos:
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **Nota:** Esto puede ser un rol personalizado, o puede usar el rol existente de Google Cloud `roles/bigquery.dataEditor`.

#### Configure el acceso al bucket {#configure-bucket-access}
[Agregue la cuenta de servicio como un principal en el recurso del bucket de GCS][6]:
1. Navegue a la página de Buckets de Cloud Storage en la consola de Google Cloud y seleccione su bucket.
2. Seleccione la pestaña de permisos y haga clic en el botón {{< ui >}}grant access{{< /ui >}}.
3. En el nuevo campo de principales, ingrese la cuenta de servicio.
4. Asigne un rol con los siguientes permisos:
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Nota:** Esto puede ser un rol personalizado, o puedes usar los roles existentes de Google Cloud `roles/storage.legacyObjectReader` y `roles/storage.legacyBucketWriter`.

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Cree o seleccione un bucket de Google Cloud Storage {#create-or-select-a-google-cloud-storage-bucket}
Cloud Cost Management utiliza un bucket de GCP para recibir datos extraídos de su conjunto de datos de costos de uso detallado de BigQuery (prefijado con `datadog_cloud_cost_detailed_usage_export`). Puedes crear un nuevo bucket o usar uno existente.

**Nota:** El bucket [debe estar co-localizado][9] con el conjunto de datos de exportación de BigQuery.

### (Opcional) Configure la autorización de servicio entre proyectos: {#optional-configure-cross-project-service-authorization}
Si su Cuenta de Servicio integrada existe en un proyecto diferente de Google Cloud Platform que su conjunto de datos de exportación de facturación, necesita [otorgar autorización de cuenta de servicio entre proyectos][10]:

1. Active la creación del agente de servicio siguiendo la [documentación oficial][11] utilizando los siguientes valores:
   * PUNTO DE CONEXIÓN: `bigquerydatatransfer.googleapis.com`
   * TIPO DE RECURSO: `project`
   * ID DE RECURSO: proyecto del conjunto de datos de exportación<br><br>

     Esto crea un nuevo agente de servicio que se parece a `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Agregue el rol de Cuenta de Servicio del Servicio de Transferencia de Datos de BigQuery creado por el disparador como un principal en su cuenta de servicio
3. Asigne el rol `roles/iam.serviceAccountTokenCreator`.

### Configure el Cloud Cost {#configure-cloud-cost}
Siga los pasos indicados en [Setup & Configuration][3].

**Nota**: Los datos pueden tardar de 48 a 72 horas después de la configuración para estabilizarse en Datadog.

### Obteniendo datos históricos {#getting-historical-data}

Los conjuntos de datos de exportación de facturación de BigQuery recién creados solo contienen los 2 meses más recientes de datos. Puede tardar uno o dos días en que estos datos se rellenen en BigQuery. Datadog ingiere automáticamente hasta 15 meses de datos históricos de costos disponibles una vez que aparecen en la tabla de BigQuery.

Google Cloud no proporciona un proceso para rellenar datos históricos adicionales, más allá de los 2 meses que se incluyen automáticamente cuando se crea por primera vez la exportación de BigQuery.

## Tipos de costo {#cost-types}
Puede visualizar sus datos ingeridos utilizando los siguientes tipos de costo:

| Tipo de Costo                                       | Descripción |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Costo total de los recursos asignados en el momento de uso durante un intervalo. Los costos incluyen créditos de promoción así como créditos de descuento por uso comprometido. |
| `gcp.cost.amortized.shared.resources.allocated` | Todos sus costos amortizados de Google Cloud Platform, con desgloses e información adicional para cargas de trabajo en contenedores. Requiere [Asignación de Costos de Contenedores][14].|
| `gcp.cost.ondemand`                             | Costo total público y bajo demanda de los recursos antes de que se apliquen los descuentos públicos y privados durante un intervalo. |

### Etiquetas predeterminadas {#out-of-the-box-tags}

Datadog enriquece automáticamente sus datos de costos de Google Cloud con etiquetas de múltiples fuentes. Para una visión general completa de cómo se aplican las etiquetas a los datos de costos, consulte [Etiquetas][17].

Las siguientes etiquetas predeterminadas se derivan de su [informe detallado de costos de uso][16] y facilitan el descubrimiento y la comprensión de los datos de costos:

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `google_product`             | El servicio de Google que se está facturando.|
| `google_cost_type`           | El tipo de cargo cubierto por este ítem (por ejemplo, regular, impuesto, ajuste o error de redondeo).|
| `google_usage_type`          | Los detalles de uso del ítem (por ejemplo, Almacenamiento Estándar EE. UU.).|
| `google_location`            | La ubicación asociada con el ítem a nivel de multi-región, país, región o zona.|
| `google_region`              | La región asociada con el ítem.|
| `google_zone`                | La zona de disponibilidad asociada con el ítem.|
| `google_pricing_usage_unit`  | La unidad de precio utilizada para calcular el costo de uso (por ejemplo, gibibyte, tebibyte o año).|
| `google_is_unused_reservation`| Si el uso fue reservado pero no utilizado.|
| `service_description` | El servicio de Google Cloud (como Compute Engine o BigQuery). |
| `project_id` | El ID del proyecto de Google Cloud que generó los datos de facturación en la nube. |
| `project_name` | El nombre del proyecto de Google Cloud que generó los datos de facturación en la nube. |
| `cost_type` | El tipo de costo que representa este ítem: `regular`, `tax`, `adjustment` o `rounding error`. |
| `sku_description` | Una descripción del tipo de recurso utilizado, que detalla el uso del recurso. |
| `resource_name` | Un nombre que los clientes añaden a los recursos. Esto puede no estar en todos los recursos. |
| `global_resource_name` | Un identificador de recurso globalmente único generado por Google Cloud. |

#### Correlación de costos y observabilidad {#cost-and-observability-correlation}

Ver los costos en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura impactan los costos, identificar por qué cambian los costos y optimizar la infraestructura tanto para costos como para rendimiento. Datadog actualiza las etiquetas identificativas de recursos en los datos de costos para los principales productos de Google para simplificar la correlación entre métricas de observabilidad y costos.

Por ejemplo, para ver el costo y la utilización de cada base de datos de Cloud SQL, puede crear una tabla con `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` y `gcp.cloudsql.database.memory.utilization` (o cualquier otra métrica de Cloud SQL) y agrupar por `database_id`. O, para ver el uso y los costos de Cloud Functions lado a lado, puede graficar `gcp.cloudfunctions.function.execution_count` y `gcp.cost.amortized` agrupados por `function_name`.

Las siguientes etiquetas listas para usar están disponibles:
| Producto de Google     | Etiqueta(s)                        |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`|
| Cloud Functions    | `function_name`               |
| Cloud Run          | `job_name`, `service_name`    |
| Cloud SQL          | `database_id`                 |
| Cloud Spanner      | `instance_id`                 |
| App Engine         | `module_id`                   |
| BigQuery           | `project_id`, `dataset_id`    |
| Kubernetes Engine  | `cluster_name`                |

### Asignación de contenedores {#container-allocation}
**Las métricas de asignación de contenedores** contienen todos los mismos costos que las métricas de Google Cloud Platform, pero con desgloses e información adicional para cargas de trabajo de contenedores. Consulte [Asignación de Costos de Contenedores][14] para más detalles.

## Lectura adicional {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /es/integrations/google_cloud_platform/
[13]: /es/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /es/cloud_cost_management/container_cost_allocation/
[15]: /es/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
[17]: /es/cloud_cost_management/tags
[18]: /es/api/latest/cloud-cost-management/#create-google-cloud-usage-cost-config
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/gcp_uc_config