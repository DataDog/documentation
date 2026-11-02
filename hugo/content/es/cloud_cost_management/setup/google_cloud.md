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
## Descripción general {#overview}

Para usar Google Cloud Cost Management en Datadog, siga estos pasos:
1. Configure la [integración de Google Cloud Platform][12]
2. Configure la [exportación detallada de costos de uso][13] con los permisos necesarios (API de servicios de Google, acceso al proyecto de exportación y acceso al conjunto de datos de BigQuery)
3. Cree o seleccione un [bucket de Google Cloud Storage][15] con los permisos necesarios (acceso al bucket)

## Configuración {#setup}

Puede realizar la configuración mediante la [API][18], [Terraform][19] o directamente en Datadog siguiendo las instrucciones a continuación.

### Configure la integración de Google Cloud Platform {#configure-the-google-cloud-platform-integration}
Navegue a [Setup & Configuration][3], agregue una cuenta de Google Cloud Platform y siga los pasos para configurar la integración de Google Cloud Platform.

<div class="alert alert-danger">
La integración de Datadog con Google Cloud Platform permite que se haga un seguimiento automático de todos los proyectos a los que tiene acceso esta cuenta de servicio para los costos en la nube.
Para limitar los servidores que se supervisan en la infraestructura para estos proyectos, aplique etiquetas a los servidores. Luego, defina si las etiquetas deben incluirse o excluirse del monitoreo en la sección {{< ui >}}Limit Metric Collection Filters{{< /ui >}} de la página de integración.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Sección de filtros de límite de recolección de métricas configurada en la página de integración de Google Cloud Platform" >}}

### Habilite la exportación detallada de costos de uso {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
Los <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">datos detallados de costos de uso</a> proporcionan toda la información incluida en los datos estándar de costos de uso, junto con campos adicionales que ofrecen datos de costos granulares a nivel de recurso.
</div>

 1. Navegue a [Billing Export][1] en la consola de Google Cloud *Billing*.
 2. Habilite la exportación de [Detailed Usage cost][2] (seleccione o cree un proyecto y un conjunto de datos de BigQuery).
 3. Documente el {{< ui >}}Billing Account ID{{< /ui >}} de la cuenta de facturación donde se configuró la exportación, así como el {{< ui >}}Project ID{{< /ui >}} y el {{< ui >}}Dataset Name{{< /ui >}} de la exportación.

{{< img src="cloud_cost/billing_export.png" alt="Información del proyecto y conjunto de datos de Google Cloud resaltada" >}}

_Los conjuntos de datos de exportación de facturación de BigQuery recién creados solo contienen los datos de los dos meses más recientes. Puede tomar uno o dos días para que estos datos se completen en BigQuery._

#### Habilite las API de Google Service {#enable-google-service-apis}
Los siguientes permisos permiten a Datadog acceder a la exportación de facturación y transferirla al bucket de almacenamiento mediante una consulta programada de BigQuery.

- Habilite la [API de BigQuery][5].
  1. En la consola de Google Cloud, vaya a la página del selector de proyectos y seleccione su proyecto de Google Cloud.
  2. Habilite la facturación en su proyecto para todas las transferencias.

- Habilite el [Servicio de transferencia de datos de BigQuery][5].
  1. Abra la página de la API de BigQuery Data Transfer en la biblioteca de API.
  2. En el menú desplegable, seleccione el proyecto que contiene la cuenta de servicio.
  3. Haga clic en el botón {{< ui >}}ENABLE{{< /ui >}}.

  **Nota:** La API de BigQuery Data Transfer debe estar habilitada en el proyecto de Google que contiene la cuenta de servicio.

### (Opcional) Habilite la exportación de metadatos de descuentos por uso comprometido {#optional-enable-committed-use-discounts-metadata-export}

Habilite la [exportación de metadatos de descuentos por uso comprometido (CUD)][20] para ver las fechas de inicio y finalización, los importes comprometidos y otras propiedades de sus [descuentos por uso comprometido basados en el gasto][21] en el [Inventario de compromisos][22]. La exportación incluye los CUD adquiridos en proyectos vinculados a la cuenta de facturación, incluidos los compromisos caducados.

Para habilitar la exportación de metadatos de CUD:

1. En la consola de Google Cloud, vaya a **Facturación > [Exportación de facturación][1]**.
2. Habilite la [Exportación de descuentos por uso comprometido][2]. Seleccione un proyecto e ingrese un nombre nuevo para el conjunto de datos vinculado. Google Cloud crea el conjunto de datos vinculado.
3. Seleccione el {{< ui >}}Location Type{{< /ui >}} y la región o multirregión que coincida con su conjunto de datos de exportación de costos de uso detallados. No puede cambiar la ubicación después de crear el conjunto de datos.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.
5. Registre la exportación {{< ui >}}Project ID{{< /ui >}} y {{< ui >}}Linked Dataset Name{{< /ui >}}. Ingrese estos como el {{< ui >}}CUD Metadata Project ID{{< /ui >}} y el {{< ui >}}CUD Metadata Dataset ID{{< /ui >}} cuando [configure Cloud Cost](#configure-cloud-cost).

{{< img src="cloud_cost/commitments/cud_metadata_export.png" alt="Configuración de exportación de CUD de Google Cloud con los campos de proyecto, conjunto de datos vinculado, tipo de ubicación y multirregión resaltados." >}}

Seleccione la pestaña que coincida con su método de configuración para otorgar a Datadog los permisos necesarios.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo Terraform" style="width:100%" >}}

### Defina detalles de configuración {#define-configuration-details}

Ingrese los siguientes detalles para su configuración:

* **Bucket de almacenamiento de GCP**: Seleccione **Sí** para crear un bucket de almacenamiento, o seleccione **No** para usar un bucket existente.

    **Nota**: Si usa un bucket existente, verifique que el bucket esté ubicado en la misma región que el conjunto de datos exportados de BigQuery.

* **Nombre del bucket**: El nombre de su bucket de almacenamiento de GCP nuevo o existente.
* **Región**: La región de GCP de su bucket. Por ejemplo, `northamerica-northeast1`.
* **ID de cuenta de facturación**: El ID de la cuenta de facturación para la cual sus informes de exportación de costos de uso reportan los costos.
* **Nombre e ID del proyecto de exportación**: El nombre y el ID de su proyecto de exportación.
* **Nombre e ID del conjunto de datos de exportación**: El nombre y el ID de su conjunto de datos de exportación.

### Crear exportación de costos y habilitar las API de servicios de Google {#create-cost-export-and-enable-google-service-apis}

Complete los pasos [Habilitar exportación detallada de costos de uso](#enable-detailed-usage-cost-export) y [Habilitar las API de servicios de Google](#enable-google-service-apis) anteriores y luego regrese a CCM.

### Copie el HCL de Terraform generado y aplique los cambios {#copy-generated-terraform-hcl-and-apply-changes}

En la interfaz de usuario de configuración de Terraform de CCM, siga las instrucciones en el paso **Aplicar configuración de Terraform**. Resuelva cualquier problema que aparezca al ejecutar `terraform plan` o `terraform apply` antes de regresar a CCM para confirmar la creación de la cuenta.

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup_cud_metadata.png" alt="Formulario de configuración de Cloud Cost Management en modo manual" style="width:100%" >}}

#### Configure el acceso al proyecto de exportación {#configure-export-project-access}
[Agregue la cuenta de servicio como principal en el recurso del proyecto del conjunto de datos de exportación][7]:
1. Navegue a la página de IAM en la consola de Google Cloud y seleccione el proyecto del conjunto de datos de exportación.
2. Seleccione la cuenta de servicio como principal.
3. Otorgue uno o más roles que en conjunto contengan los siguientes permisos:
    * `bigquery.jobs.create`
    * `bigquery.transfers.get`
    * `bigquery.transfers.update`

  **Nota:** Este puede ser un rol personalizado, o puede usar el rol de Google Cloud existente `roles/bigquery.admin`.

#### Configure el acceso al conjunto de datos de BigQuery de exportación {#configure-export-bigquery-dataset-access}
[Agregue la cuenta de servicio como principal en el recurso del conjunto de datos de BigQuery de exportación][8]:
1. En el panel Explorador de la página de BigQuery, expanda su proyecto y seleccione el conjunto de datos de BigQuery de exportación.
2. Haga clic en {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}} y luego en {{< ui >}}add principal{{< /ui >}}.
3. En el campo de nuevos principales, ingrese la cuenta de servicio.
4. Otorgue uno o más roles que en conjunto contengan los siguientes permisos:
    * `bigquery.datasets.get`
    * `bigquery.tables.create`
    * `bigquery.tables.delete`
    * `bigquery.tables.export`
    * `bigquery.tables.get`
    * `bigquery.tables.getData`
    * `bigquery.tables.list`
    * `bigquery.tables.update`
    * `bigquery.tables.updateData`

  **Nota:** Puede ser un rol personalizado, o puede usar el rol de Google Cloud existente `roles/bigquery.dataEditor`.

#### (Opcional) Configure el acceso al proyecto de metadatos de CUD {#optional-configure-cud-metadata-project-access}
[Agregue la cuenta de servicio como principal en el recurso del proyecto de metadatos de CUD][7]:
1. Vaya a la página de IAM en la consola de Google Cloud y seleccione el proyecto de metadatos de CUD.
2. Seleccione la cuenta de servicio como principal.
3. Otorgue uno o más roles que en conjunto contengan los siguientes permisos:
    * `bigquery.datasets.get`
    * `bigquery.readsessions.create`
    * `bigquery.readsessions.getData`
    * `bigquery.readsessions.update`
    * `bigquery.tables.get`
    * `bigquery.tables.getData`
    * `bigquery.tables.list`

  **Nota:** Puede ser un rol personalizado, o puede usar los roles de Google Cloud existentes `roles/bigquery.dataViewer` y `roles/bigquery.readSessionUser`.

#### Configure el acceso al bucket {#configure-bucket-access}
[Agregue la cuenta de servicio como principal en el recurso del bucket de GCS][6]:
1. Vaya a la página de Buckets de Cloud Storage en la consola de Google Cloud y seleccione su bucket.
2. Seleccione la pestaña de permisos y haga clic en el botón {{< ui >}}grant access{{< /ui >}}.
3. En el campo de nuevos principales, ingrese la cuenta de servicio.
4. Otorgue uno o más roles que en conjunto contengan los siguientes permisos:
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Nota:** Este puede ser un rol personalizado, o puede usar los roles existentes de Google Cloud `roles/storage.legacyObjectReader` y `roles/storage.legacyBucketWriter`.

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Cree o seleccione un bucket de Google Cloud Storage {#create-or-select-a-google-cloud-storage-bucket}
Cloud Cost Management utiliza un bucket de almacenamiento de GCP para recibir los datos extraídos de su conjunto de datos de Costos de uso detallado de BigQuery (con el prefijo `datadog_cloud_cost_detailed_usage_export`). Puede crear un bucket nuevo o usar uno existente.

**Nota:** El bucket [debe estar ubicado en la misma región][9] que el conjunto de datos de exportación de BigQuery.

### (Opcional) Configure la autorización de servicio entre proyectos: {#optional-configure-cross-project-service-authorization}
Si su cuenta de servicio integrada existe en un proyecto de Google Cloud Platform diferente al de su conjunto de datos de exportación de facturación, debe [otorgar autorización de cuenta de servicio entre proyectos][10]:

1. Active la creación del agente de servicio siguiendo la [documentación oficial][11] con los siguientes valores:
   * PUNTO DE CONEXIÓN: `bigquerydatatransfer.googleapis.com`
   * TIPO DE RECURSO: `project`
   * ID_DE_RECURSO: proyecto del conjunto de datos de exportación<br><br>

     Esto crea un nuevo agente de servicio que se ve como `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Agregue el rol de Cuenta de servicio de transferencia de datos de BigQuery creado por el activador como principal en su cuenta de servicio
3. Asígnele el rol `roles/iam.serviceAccountTokenCreator`.

### Configure Cloud Cost {#configure-cloud-cost}
Continúe siguiendo los pasos indicados en [Setup & Configuration][3].

**Nota**: Los datos pueden tardar entre 48 y 72 horas después de la configuración en estabilizarse en Datadog.

### Obtención de datos históricos {#getting-historical-data}

Los conjuntos de datos de exportación de facturación de BigQuery recién creados solo contienen los datos de los últimos 2 meses. Estos datos pueden tardar uno o dos días en retrollenarse en BigQuery. Datadog ingiere automáticamente hasta 15 meses de datos históricos de costos disponibles una vez que aparecen en la tabla de BigQuery.

Google Cloud no proporciona un proceso para retrollenar datos históricos adicionales más allá de los 2 meses incluidos automáticamente cuando se crea por primera vez la exportación de BigQuery.

## Tipos de costo {#cost-types}
Puede visualizar sus datos ingeridos utilizando los siguientes tipos de costo:

| Tipo de costo                                       | Descripción |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Costo total de los recursos asignados en el momento del uso durante un intervalo. Los costos incluyen créditos de promoción, así como créditos por descuentos de uso comprometido. |
| `gcp.cost.amortized.shared.resources.allocated` | Todos sus costos amortizados de Google Cloud Platform, con desgloses e información adicional para cargas de trabajo de contenedores. Requiere [asignación de costos de contenedores][14].|
| `gcp.cost.ondemand`                             | Costo público total bajo demanda de los recursos antes de que se apliquen los descuentos públicos y privados durante un intervalo. |

### Etiquetas predeterminadas {#out-of-the-box-tags}

Datadog enriquece automáticamente sus datos de costos de Google Cloud con etiquetas de múltiples fuentes. Para obtener una descripción general completa de cómo se aplican las etiquetas a los datos de costos, consulte [Tags][17].

Las siguientes etiquetas predeterminadas se derivan de su [informe detallado de costos de uso][16] y facilitan la detección y comprensión de los datos de costos:

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `google_product`             | El servicio de Google que se está facturando.|
| `google_cost_type`           | El tipo de cargo cubierto por este elemento (por ejemplo, regular, impuesto, ajuste o error de redondeo).|
| `google_usage_type`          | Los detalles de uso del elemento (por ejemplo, Standard Storage US).|
| `google_location`            | La ubicación asociada con el elemento a nivel de multirregión, país, región o zona.|
| `google_region`              | La región asociada con el elemento.|
| `google_zone`                | La zona de disponibilidad asociada con el elemento.|
| `google_pricing_usage_unit`  | La unidad de precios utilizada para calcular el costo de uso (por ejemplo, gibibyte, tebibyte o año).|
| `google_is_unused_reservation`| Si el uso fue reservado pero no utilizado.|
| `service_description` | El servicio de Google Cloud (como Compute Engine o BigQuery). |
| `project_id` | El ID del proyecto de Google Cloud que generó los datos de Cloud Billing. |
| `project_name` | El nombre del proyecto de Google Cloud que generó los datos de Cloud Billing. |
| `cost_type` | El tipo de costo que representa este elemento de línea: `regular`, `tax`, `adjustment` o `rounding error`. |
| `sku_description` | Una descripción del tipo de recurso utilizado, que describe los detalles de uso del recurso. |
| `resource_name` | Un nombre que los clientes agregan a los recursos. Es posible que esto no esté en todos los recursos. |
| `global_resource_name` | Un identificador de recurso único a nivel global generado por Google Cloud. |

#### Correlación de costos y observabilidad {#cost-and-observability-correlation}

Ver los costos en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura afectan los costos, identificar por qué cambian los costos y optimizar la infraestructura tanto para los costos como para el rendimiento. Datadog actualiza las etiquetas de identificación de recursos en los datos de costos para los principales productos de Google a fin de simplificar la correlación de las métricas de observabilidad y costos.

Por ejemplo, para ver el costo y la utilización de cada base de datos Cloud SQL, puede crear una tabla con `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` y `gcp.cloudsql.database.memory.utilization` (o cualquier otra métrica de Cloud SQL) y agrupar por `database_id`. O, para ver el uso y los costos de Cloud Function lado a lado, puede graficar `gcp.cloudfunctions.function.execution_count` y `gcp.cost.amortized` agrupados por `function_name`.

Las siguientes etiquetas predeterminadas están disponibles:
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
Las métricas de **asignación de contenedores** contienen todos los mismos costos que las métricas de Google Cloud Platform, pero con desgloses y perspectivas adicionales para las cargas de trabajo de contenedores. Consulte [Asignación de costos de contenedores][14] para obtener más detalles.

## Lecturas adicionales {#further-reading}
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
[20]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/cud-export
[21]: https://cloud.google.com/docs/cuds-spend-based
[22]: /es/cloud_cost_management/planning/commitment_programs/#commitments-inventory