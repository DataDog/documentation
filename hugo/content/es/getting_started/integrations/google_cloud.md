---
description: Configure un seguimiento integral para su entorno de Google Cloud. Configure
  cuentas de servicio, habilite la recopilación de métricas y explore el reenvío de
  registro y la instalación del Agent.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
  tag: Documentación
  text: Integración de Google Cloud
- link: https://docs.datadoghq.com/account_management/billing/google_cloud/
  tag: Guía
  text: Facturación de la integración de Google Cloud
- link: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
  tag: Guía
  text: Retraso de métricas en la nube
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?
- link: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  tag: Blog
  text: Los nuevos paneles y métricas de GKE brindan una visibilidad más profunda
    de su entorno
- link: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
  tag: Blog
  text: Acceda a Datadog de forma privada y haga un seguimiento de su uso de Google
    Cloud Private Service Connect
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: Blog
  text: Haga un seguimiento de BigQuery con Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Faculte a los ingenieros para que se hagan cargo de los costos de Google Cloud
    con Datadog
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopile trazas, registros y métricas personalizadas de sus servicios de Google
    Cloud Run con Datadog
- link: https://learn.datadoghq.com/courses/getting-started-gcp
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad en Google Cloud con Datadog
title: Introducción a Google Cloud
---
## Descripción general {#overview}

Utilice esta guía para comenzar a hacer un seguimiento de su entorno de Google Cloud. Este enfoque simplifica la configuración para entornos de Google Cloud con múltiples proyectos, lo que le permite maximizar su cobertura de seguimiento.

## Cómo llegan los datos de Google Cloud a Datadog {#how-google-cloud-data-reaches-datadog}

{{% google-cloud-data-collection-paths %}}

## Configuración {#setup}

### Requisitos previos {#prerequisites}
1) Cree una [cuenta de Datadog][1]
2) Configure una [cuenta de servicio][2] en cualquiera de sus proyectos de Google Cloud
3) Revise estos requisitos previos de Google Cloud:

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Si su organización restringe las identidades por dominio, debe agregar la identidad de cliente de Datadog `C0147pk0i` como un valor permitido en su política.
{{% /site-region %}}
La integración de Google Cloud requiere que las siguientes API estén habilitadas **para cada uno de los proyectos** que desea hacer un seguimiento:

<div class="alert alert-danger">Asegúrese de que los proyectos que se están haciendo un seguimiento no estén configurados como <a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">proyectos de alcance</a> que extraigan métricas de otros proyectos.</div>

[Cloud Monitoring API][3]
: Permite que Datadog consulte los datos de métricas de Google Cloud.

[Compute Engine API][4]
: Permite que Datadog descubra datos de instancias de cómputo.

[Cloud Asset API][5]
: Permite que Datadog solicite recursos de Google Cloud y vincule etiquetas relevantes a las métricas como etiquetas.

[Cloud Resource Manager API][6]
: Permite que Datadog añada métricas con los recursos y etiquetas correctos.

[IAM API][7]
: Permite que Datadog se autentique con Google Cloud.

[Cloud Billing API][8]
: Permite a los desarrolladores administrar la facturación de sus proyectos de Google Cloud Platform mediante programación. Consulte la sección [Cloud Cost Management (CCM)](#cloud-cost-management-ccm) para obtener más información.

<div class="alert alert-info">Puede confirmar si estas API están habilitadas yendo a <a href="https://console.cloud.google.com/apis/dashboard">Enabled APIs & Services</a>.</div>

### Recopilación de métricas {#metric-collection}

{{% google-cloud-collection-scope %}}

<div class="alert alert-info">Si su organización de Google Cloud utiliza <a href="https://cloud.google.com/vpc-service-controls/docs/overview">Controles de servicio de VPC</a>, debe permitir explícitamente que las cuentas de servicio de Datadog accedan a los recursos protegidos. Si estas cuentas de servicio no tienen permiso dentro de su perímetro de servicio, la recopilación de métricas, recursos y metadatos podría fallar. Comuníquese con <a href="/help/">Soporte de Datadog</a> para obtener los identificadores de cuenta de servicio para su sitio o región.</div>

{{< tabs >}}

{{% tab "A nivel de organización" %}}

Se recomienda hacer un seguimiento a nivel de organización para una cobertura integral de todos los proyectos, incluidos los proyectos futuros que puedan crearse en una organización.

**Nota**: Su cuenta de usuario de [Google Cloud Identity][408] debe tener asignado el rol `Admin` en el contexto deseado para completar la configuración en Google Cloud (por ejemplo, `Organization Admin`).

{{% collapse-content title="1. Cree una cuenta de servicio de Google Cloud en el proyecto predeterminado" level="h4" %}}
1. Open your [Google Cloud console][401].
2. Navegue a {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}Service Accounts{{< /ui >}}.
3. Haga clic en {{< ui >}}Create service account{{< /ui >}} en la parte superior.
4. Asigne un nombre único a la cuenta de servicio.
5. Haga clic en {{< ui >}}Done{{< /ui >}} para completar la creación de la cuenta de servicio.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. Agregue la cuenta de servicio a nivel de organización o carpeta" level="h4" %}}
1. En el Google Cloud console, vaya a la página {{< ui >}}IAM{{< /ui >}}.
2. Seleccione una carpeta u organización.
3. Para otorgar un rol a un principal que aún no tenga otros roles en el recurso, haga clic en {{< ui >}}Grant Access{{< /ui >}} y luego ingrese el correo electrónico de la cuenta de servicio que creó anteriormente.
4. Ingrese la dirección de correo electrónico de la cuenta de servicio.
5. Asigne los siguientes roles:
   - [Compute Viewer][402] proporciona acceso de **solo lectura** para obtener y listar recursos de Compute Engine
   - [Monitoring Viewer][403] proporciona acceso de **solo lectura** a los datos de seguimiento disponibles en su entorno de Google Cloud.
   - [Cloud Asset Viewer][404] proporciona acceso de **solo lectura** a los metadatos de los recursos en la nube
   - [Browser][405] proporciona acceso de **solo lectura** para explorar la jerarquía de un proyecto
   - [Service Usage Consumer][406] (**opcional**, para entornos de múltiples proyectos) proporciona [atribución de costos y cuotas de API por proyecto](#enable-per-project-cost-and-api-quota-attribution)
6. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: El `Browser`rol solo es necesario en el proyecto predeterminado de la cuenta de servicio. Los demás proyectos solo requieren los otros roles enumerados.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Agregue el principal de Datadog a su cuenta de servicio" level="h4" %}}
**Nota**: Si configuró previamente el acceso mediante un principal de Datadog compartido, puede revocar el permiso para ese principal después de completar estos pasos.

1. En Datadog, navegue a {{< ui >}}Integrations{{< /ui >}} > [{{< ui >}}Google Cloud Platform{{< /ui >}}][407].
2. Haga clic en {{< ui >}}Add Google Cloud Account{{< /ui >}}.
Si no tiene proyectos configurados, se le redirigirá automáticamente a esta página.
3. Copie su principal de Datadog y guárdelo para la siguiente sección.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="La página para agregar una nueva cuenta de Google Cloud en el mosaico de integración de Google Cloud de Datadog" style="width:70%;">}}

**Nota**: Mantenga esta ventana abierta para la Sección 4.

4. En [Google Cloud console][409], en el menú {{< ui >}}Service Accounts{{< /ui >}}, busque la cuenta de servicio que creó en la Sección 1.
5. Vaya a la pestaña {{< ui >}}Permissions{{< /ui >}} y haga clic en {{< ui >}}Grant Access{{< /ui >}}.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interfaz de la consola de Google Cloud, que muestra la pestaña Permisos en Cuentas de servicio." style="width:70%;">}}

6. Pegue su principal de Datadog en el cuadro de texto {{< ui >}}New principals{{< /ui >}}.
7. Asigne el rol de {{< ui >}}Service Account Token Creator{{< /ui >}}.
8. Haga clic en {{< ui >}}Save{{< /ui >}}.

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Complete la configuración de la integración en Datadog" level="h4" %}}
1. In your Google Cloud console, navigate to the {{< ui >}}Service Account{{< /ui >}} > {{< ui >}}Details{{< /ui >}} tab. En esta página, busque el correo electrónico asociado con esta cuenta de servicio de Google. Tiene el formato `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
2. Copie este correo electrónico.
3. Regrese al mosaico de configuración de integración en Datadog (donde copió su principal de Datadog en la sección anterior).
4. Pegue el correo electrónico que copió en {{< ui >}}Add Service Account Email{{< /ui >}}.
5. Haga clic en {{< ui >}}Verify and Save Account{{< /ui >}}.
{{% /collapse-content %}}

Las métricas aparecen en Datadog aproximadamente **15 minutos** después de la configuración.

[408]: https://cloud.google.com/identity/docs/overview

{{% /tab %}}

{{% tab "A nivel de proyecto y carpeta" %}}

{{% collapse-content title="Inicio rápido (recomendado)" level="h4" expanded=false id="quickstart-setup" %}}

### Requisitos previos {#prerequisites-1}

Para usar el método de Inicio rápido, su rol de usuario de Datadog debe tener permisos para crear claves de API y de aplicación. Si utiliza un [rol administrado por Datadog][202], debe tener {{< ui >}}Datadog Admin role{{< /ui >}}. Si utiliza un [rol personalizado][203], su rol debe tener al menos los permisos `api_keys_write` y `user_app_keys`.

### Elija la configuración de Inicio rápido si... {#choose-quick-start-setup-if}

- Está configurando la integración de Google Cloud por primera vez.
- Prefiere un flujo de trabajo basado en la interfaz de usuario y desea minimizar el tiempo necesario para crear una cuenta de servicio con los permisos de seguimiento requeridos.
- Desea automatizar los pasos de configuración en scripts o canalizaciones de CI/CD.

### Instrucciones{#instructions}

1. En la [página de integración de Google Cloud][200], seleccione {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Haga clic en {{< ui >}}Quick Start{{< /ui >}}.
3. Haga clic en {{< ui >}}Copy{{< /ui >}} en la sección de script de configuración.<br>
   **Nota**: Datadog recomienda ejecutar este script localmente a través de la [CLI de gcloud][201], ya que puede ser más rápido. Esto requiere tener sus credenciales de Google Cloud disponibles localmente y tener instalada la gcloud CLI en su máquina.
4. Haga clic en {{< ui >}}Open Google Cloud Shell{{< /ui >}}, o vaya a [Google Cloud Shell][204].
5. Pegue el script en el símbolo del sistema del shell y ejecútelo.
6. Seleccione las carpetas y proyectos sobre los cuales desee hacer un seguimiento. Solo puede ver los proyectos y carpetas para los que tiene el acceso y los permisos necesarios.
7. En {{< ui >}}Provide Service Account Details{{< /ui >}}:
   1. Asigne un nombre a la cuenta de servicio.
   2. Seleccione el proyecto que contendrá la cuenta de servicio.
8. Configure {{< ui >}}Metric Collection{{< /ui >}} (opcional).
   1. Elija si desea deshabilitar la opción para silenciar monitores para apagados de instancias de GCE esperados y eventos de escalado automático.
   2. Elija si desea aplicar etiquetas a las métricas asociadas con la cuenta de servicio creada.
   3. Elija si desea deshabilitar la recopilación de métricas para servicios específicos de Google Cloud para ayudar a controlar los costos de Google Cloud Monitoring.
   4. Elija si desea aplicar filtros de métricas granulares para cualquier servicio de Google Cloud habilitado para la recopilación de métricas.
   5. Elija si desea filtrar métricas por etiquetas para tipos de recursos de GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costos de Datadog.
   **Nota**: `VM Instance` el filtrado no afecta a las métricas de `gcp.logging.*` relacionadas y no causa ningún impacto en la facturación de esas métricas.
9. Configure {{< ui >}}Resource Collection{{< /ui >}} (atributos e información de configuración de los recursos en su entorno de Google Cloud, opcional).
10. Se muestra un resumen de los cambios que se realizarán. Si se confirma, el script:
    - Habilita las API necesarias
    - Asigna los permisos necesarios para hacer un seguimiento de cada proyecto y carpeta seleccionados
    - Completa la configuración de la integración en Datadog

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /es/account_management/rbac/permissions/#managed-roles
[203]: /es/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### Elija la configuración de Terraform si... {#choose-terraform-setup-if}

- Usted administra la infraestructura como código y desea mantener la integración de Datadog con Google Cloud bajo control de versiones.
- Necesita configurar varias carpetas o proyectos de manera consistente con bloques de proveedor reutilizables.
- Desea un proceso de implementación repetible y auditable que se ajuste a su entorno administrado por Terraform.

### Instrucciones{#instructions-1}

1. En la [página de integración de Google Cloud][500], seleccione {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Seleccione {{< ui >}}Terraform{{< /ui >}}.
3. En {{< ui >}}Provide GCP Resources{{< /ui >}}, agregue los ID de proyecto y de carpeta sobre los cuales desee hacer un seguimiento.
4. Seleccione las carpetas y los proyectos sobre los cuales desee hacer un seguimiento.
5. En {{< ui >}}Provide Service Account Details{{< /ui >}}:
   1. Asigne un nombre a la cuenta de servicio.
   2. Seleccione el proyecto que contendrá la cuenta de servicio.
6. Configure {{< ui >}}Metric Collection{{< /ui >}} (opcional).
   1. Elija si desea deshabilitar la opción para silenciar monitores para apagados de instancias de GCE esperados y eventos de escalado automático.
   2. Elija si desea aplicar etiquetas a las métricas asociadas con la cuenta de servicio creada.
   3. Elija si desea deshabilitar la recopilación de métricas para servicios específicos de Google Cloud para ayudar a controlar los costos de Google Cloud Monitoring.
   4. Elija si desea aplicar filtros de métricas granulares para cualquier servicio de Google Cloud habilitado para la recopilación de métricas.
   5. Elija si desea filtrar métricas por etiquetas para tipos de recursos de GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costos de Datadog.
7. Configure {{< ui >}}Resource Collection{{< /ui >}} (atributos e información de configuración de los recursos en su entorno de Google Cloud).
8. Copie el {{< ui >}}Terraform Code{{< /ui >}} proporcionado.
9. Pegue el código en un archivo `.tf` y ejecute el comando {{< ui >}}Initialize and apply the Terraform{{< /ui >}}. Si tiene éxito, el comando:
   - Habilita las API necesarias
   - Asigna los permisos necesarios para hacer un seguimiento de cada proyecto y carpeta seleccionados
   - Completa la configuración de la integración en Datadog

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="Manual" level="h4" expanded=false id="manual-setup" %}}

### Elija la configuración manual si... {#choose-manual-setup-if}

- Necesita configurar el acceso manualmente para una cantidad menor de proyectos o carpetas.
- Desea tener más control paso a paso sobre la asignación de permisos y credenciales dentro de la interfaz de usuario de GCP.

### Instrucciones{#instructions-2}

1. En la [página de integración de Google Cloud][600], seleccione {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Haga clic en {{< ui >}}Manual{{< /ui >}}.
3. Copie el valor {{< ui >}}Datadog Principal{{< /ui >}} y haga clic en {{< ui >}}Open the Google Console{{< /ui >}}.
4. Cree una cuenta de servicio:
   1. Asigne a la cuenta de servicio un nombre descriptivo y haga clic en {{< ui >}}Create and continue{{< /ui >}}.
   2. En {{< ui >}}Permissions{{< /ui >}}, busque y agregue el rol {{< ui >}}Service Account Token Creator{{< /ui >}} desde el menú desplegable, y haga clic en {{< ui >}}Continue{{< /ui >}}.
   3. En {{< ui >}}Principals with access{{< /ui >}}, pegue el valor {{< ui >}}Datadog Principal{{< /ui >}} en el campo {{< ui >}}Service account users role{{< /ui >}} y haga clic en {{< ui >}}Done{{< /ui >}}.
5. Haga clic en el enlace de la cuenta de servicio en la columna {{< ui >}}Email{{< /ui >}}.
6. Copie el valor {{< ui >}}Email{{< /ui >}}.
7. En Datadog, pegue el correo electrónico de la cuenta de servicio en la sección {{< ui >}}Add Service Account Email{{< /ui >}}.
8. Configure {{< ui >}}Metric Collection{{< /ui >}} (opcional).
   1. Elija si desea deshabilitar la opción para silenciar monitores para apagados de instancias de GCE esperados y eventos de escalado automático.
   2. Elija si desea aplicar etiquetas a las métricas asociadas con la cuenta de servicio creada.
   3. Elija si desea deshabilitar la recopilación de métricas para servicios específicos de Google Cloud para ayudar a controlar los costos de Google Cloud Monitoring.
   4. Elija si desea aplicar filtros de métricas granulares para cualquier servicio de Google Cloud habilitado para la recopilación de métricas.
   5. Elija si desea filtrar métricas por etiquetas para tipos de recursos de GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costos de Datadog.
9. Configure {{< ui >}}Resource Collection{{< /ui >}} (atributos e información de configuración de los recursos en su entorno de Google Cloud, opcional).
10. Haga clic en {{< ui >}}Verify and Save Account{{< /ui >}}.

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### Validación {#validation}

Para visualizar sus métricas, use el menú de la izquierda para navegar a {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} y busque `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="La página de Resumen de métricas en Datadog filtrada para métricas que comienzan con GCP" style="width:100%;" >}}

### Integraciones de Google Cloud {#google-cloud-integrations}

La integración de Google Cloud recopila todas las [métricas de Google Cloud][12] disponibles de sus proyectos a través de la Google Cloud Monitoring API. Integrations se instalan automáticamente cuando Datadog reconoce que se están ingiriendo datos desde su cuenta de Google Cloud, como BigQuery.

{{% collapse-content title="Vea las Integrations de Google Cloud de las que Datadog recopila métricas" level="h4" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

Para obtener información detallada sobre el monitoreo de muchos de los servicios más populares, verifique los blogs vinculados a continuación.

{{% collapse-content title="Blogs de Integrations" level="h4" %}}
[Cloud Armor][20]
: Google Cloud Armor es un servicio de seguridad de red que protege contra ataques DDoS y de aplicaciones.

[BigQuery][21]
: BigQuery es un almacén de datos sin servidor y multinube que puede proporcionarle información valiosa a partir de sus datos empresariales.

[Cloud Run][22]
: Cloud Run es una plataforma totalmente administrada que le permite ejecutar su código directamente en una infraestructura escalable en Google Cloud.

[Cloud SQL][23]
: Cloud SQL es un servicio de base de datos relacional totalmente administrado que funciona con MySQL, PostgreSQL y SQL Server.

[Compute Engine][24]
: Compute Engine es un servicio de computación y alojamiento que le brinda la capacidad de crear y ejecutar máquinas virtuales en Google Cloud.

[Dataflow][25]
: Dataflow es un servicio de análisis de streaming totalmente administrado que utiliza escalado automático y procesamiento de datos en tiempo real.

[Eventarc][26]
: Eventarc es un servicio totalmente administrado que le permite crear arquitecturas basadas en eventos.

[Google Kubernetes Engine (GKE)][27]
: GKE es un servicio de Kubernetes totalmente administrado.

[Private Service Connect][28]
: Private Service Connect le permite acceder a servicios administrados de Google de forma privada desde su red de VPC.

[Security Command Center][29]
: Security Command Center proporciona gestión de postura y detección de amenazas para código, identidades y datos.

[Vertex AI][30]
: Vertex AI es una plataforma de desarrollo de IA generativa totalmente administrada.
{{% /collapse-content %}}

### Limitar filtros de recopilación de métricas {#limit-metric-collection-filters}

Puede elegir de qué servicios y recursos recopilar métricas. Esto puede ayudar a controlar los costos al reducir la cantidad de llamadas a la API realizadas en su nombre.

{{% collapse-content title="Limite la recopilación de métricas por servicio de Google Cloud y mediante filtros de métricas granulares" level="h4" %}}

En la pestaña {{< ui >}}Metric Collection{{< /ui >}} de la [página de integración de Google Cloud][11] de Datadog, deseleccione los espacios de nombres de métricas que desea excluir.

Para aplicar un filtrado de métricas granular para los servicios habilitados, haga clic en el servicio en cuestión y aplique sus filtros en el campo `Add filters for gcp.<service>`.

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="La pestaña de recopilación de métricas en la página de integración de Google Cloud de Datadog, con el servicio AI Platform expandido para mostrar el campo Add filters for gcp.ml" style="width:80%;">}}

**Ejemplos de filtros**:

`subscription.*` `topic.*`
: Limitar la recopilación a métricas **que coincidan con** `gcp.<service>.subscription.*` **o** `gcp.<service>.topic.*`

`!*_cost` `!*_count`
: Limitar la recopilación a métricas que **no coincidan con** `gcp.<service>.*_cost` **ni con** `gcp.<service>.*_count`

`snapshot.*` `!*_by_region`
: Limitar la recopilación a métricas que **coincidan con** `gcp.<service>.snapshot.*` **pero que no coincidan con** `gcp.<service>.*_by_region`

{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por región de Google Cloud y por recursos globales" level="h4" %}}

En la pestaña {{< ui >}}Metric Collection{{< /ui >}} de la [página de integración de Google Cloud][11] de Datadog, deseleccione las regiones que desea excluir de la recopilación de métricas.

Si un valor de región o ubicación no aparece en las casillas de verificación, agréguelo en el campo {{< ui >}}Additional Locations{{< /ui >}}. El filtro realiza una coincidencia exacta con el valor de la etiqueta reportado por Google Cloud, así que ingrese los valores exactamente como aparecen en sus recursos (por ejemplo, `us-central`).

También puede deshabilitar cualquier métrica global que no esté asociada con una región.

{{< img src="integrations/google_cloud_platform/metric_region_filtering.png" alt="La pestaña de recopilación de métricas en la página de integración de Google Cloud de Datadog, con la opción Habilitar métricas globales resaltada y un subconjunto de regiones seleccionado. La opción Ubicaciones adicionales también está resaltada con un filtro multirregión definido" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por servidor o instancia de Cloud Run" level="h4" %}}
1. Asigne una etiqueta (como `datadog:true`) a los servidores o instancias de Cloud Run a las que desea hacer un seguimiento con Datadog.
2. En la pestaña {{< ui >}}Metric Collection{{< /ui >}} de la [página de integración de Google Cloud][11] de Datadog, ingrese las etiquetas en el cuadro de texto {{< ui >}}Limit Metric Collection Filters{{< /ui >}}. Solo se importan a Datadog los servidores que coinciden con una de las etiquetas definidas. Puede usar comodines (`?` para un solo carácter, `*` para varios caracteres) para hacer coincidir muchos servidores, o `!` para excluir ciertos servidores. Este ejemplo incluye todas las instancias de tamaño `c1*`, pero excluye los servidores de staging:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consulte la documentación de Google sobre [Creación y gestión de etiquetas][44] para obtener más detalles.
{{% /collapse-content %}}

En el siguiente ejemplo, solo los servidores de Google Cloud con la etiqueta `datadog:true` son monitoreados por Datadog:

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="Los campos para limitar la recopilación de métricas en el mosaico de integración de Google Cloud" style="width:100%;" >}}

#### Habilitar la atribución de costos y cuotas de API por proyecto {#enable-per-project-cost-and-api-quota-attribution}

De forma predeterminada, Google Cloud atribuye el costo de las llamadas a la API de monitoreo, así como el uso de la cuota de la API, al proyecto que contiene la cuenta de servicio para esta integración. Como práctica recomendada para entornos de Google Cloud con múltiples proyectos, habilite la atribución de costos por proyecto de las llamadas a la API de monitoreo y el uso de la cuota de la API. Con esto habilitado, los costos y el uso de la cuota se atribuyen al proyecto que se está *consultando*, en lugar del proyecto que contiene la cuenta de servicio. Esto proporciona visibilidad sobre los costos de monitoreo incurridos por cada proyecto y también ayuda a evitar alcanzar los límites de tasa de la API.

Para habilitar esta función:
1. Asegúrese de que la cuenta de servicio de Datadog tenga el rol [Consumidor de uso de servicio][410] en el contexto deseado (carpeta u organización).
2. Haga clic en el interruptor {{< ui >}}Enable Per Project Quota{{< /ui >}} en la pestaña {{< ui >}}Projects{{< /ui >}} de la [página de integración de Google Cloud][411].

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## Recopilación de registros {#log-collection}

El reenvío de registros desde su entorno de Google Cloud permite el monitoreo casi en tiempo real de los recursos y actividades que tienen lugar en su organización o carpeta. Puede configurar [monitores de registros][37] para recibir notificaciones sobre problemas, usar [Cloud SIEM][38] para detectar amenazas o aprovechar [Watchdog][39] para identificar problemas desconocidos o comportamiento anómalo.

Utilice la [plantilla de Dataflow de Datadog][14] para procesar por lotes y comprimir sus eventos de registro antes de reenviarlos a Datadog a través de [Google Cloud Dataflow][15]. Esta es la forma más eficiente en cuanto a red para reenviar sus registros. Para especificar qué registros se reenvían, configure el [receptor de registros de Google Cloud][40] con cualquier consulta de inclusión o exclusión utilizando el [lenguaje de consulta de registros][56] de Google Cloud. Consulte la [página de configuración de reenvío de registros de Google Cloud][67] para conocer las opciones de configuración de reenvío de registros (incluido Terraform) e instrucciones.

<div class="alert alert-danger">La <b>API de Dataflow</b> debe estar habilitada para usar Google Cloud Dataflow. Consulte <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Habilitación de API</b></a> en la documentación de Google Cloud para obtener más información.</div>

## Aproveche el Datadog Agent {#leveraging-the-datadog-agent}

Una vez configurada la integración de Google Cloud, Datadog comienza a recopilar automáticamente las métricas de Google Cloud. Sin embargo, puede utilizar el Datadog Agent para obtener información más detallada sobre su infraestructura.

El [Datadog Agent][31] proporciona las [métricas más granulares y de baja latencia][32] de su infraestructura, ofreciendo información en tiempo real sobre la CPU, la memoria, el uso del disco y más para sus servidores de Google Cloud.
El Agent se puede instalar en cualquier servidor, incluido [GKE][33].

El Agent también admite una amplia gama de [integraciones][34], lo que le permite ampliar la visibilidad a servicios y bases de datos específicos que se ejecutan en sus servidores.

Los [rastreos][35] recopilados a través del Agent permiten una Application Performance Monitoring (APM) integral, lo que le ayuda a comprender el rendimiento del servicio de extremo a extremo.

Los [registros][57] recopilados a través del Agent brindan visibilidad de sus recursos de Google Cloud y de las actividades que tienen lugar en su entorno de Google Cloud.

Para obtener la lista completa de beneficios de instalar el Agent en sus instancias en la nube, consulte [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][36]

## Recopilación de cambios de recursos {#resource-changes-collection}

La recopilación de cambios de recursos le permite hacer un seguimiento de los cambios de infraestructura en su entorno de Google Cloud. Cuando Cloud Asset Inventory de Google detecta cambios en sus recursos en la nube, se reenvía un evento a la [Event Management][62] de Datadog a través de un tema y una suscripción de Cloud Pub/Sub. Utilice estos eventos para recibir notificaciones proactivas sobre cambios riesgosos en su infraestructura y para ayudar con la resolución de problemas.

Para obtener instrucciones de configuración detalladas, consulte la [sección de recopilación de cambios de recursos][18] de la documentación de integración de Google Cloud.

## Explorar servicios relacionados {#explore-related-services}

### Private Service Connect {#private-service-connect}

<div class="alert alert-info">Private Service Connect solo está disponible para los sitios de Datadog US5 y EU.</div>

Utilice la [integración de Google Cloud Private Service Connect][58] para visualizar las conexiones, los datos transferidos y los paquetes descartados a través de Private Service Connect. Esto le brinda visibilidad de métricas importantes de sus conexiones de Private Service Connect, tanto para productores como para consumidores.
[Private Service Connect (PSC)][59] es un producto de red de Google Cloud que le permite acceder a [servicios de Google Cloud][60], [servicios de socios externos][61] y aplicaciones propias de la empresa directamente desde su Virtual Private Cloud (VPC).

Consulte [Acceda a Datadog de forma privada y haga un seguimiento de su uso de Google Cloud Private Service Connect][28] en el blog de Datadog para obtener más información.

### Google Cloud Run {#google-cloud-run}

Utilice la [integración de Google Cloud Run][42] para obtener información detallada sobre sus contenedores de Cloud Run, como métricas y registros de auditoría.

### Cloud Cost Management (CCM) {#cloud-cost-management-ccm}

[Google Cloud Cost Management][45] de Datadog proporciona información para que los equipos de ingeniería y finanzas comprendan cómo los cambios en la infraestructura afectan los costos, asignen el gasto en toda su organización e identifiquen posibles mejoras.

### Cloud SIEM {#cloud-siem}

Cloud SIEM proporciona análisis en tiempo real de registros operativos y de seguridad, mientras utiliza integraciones y reglas listas para usar para detectar e investigar amenazas.
Para usar esta función, consulte [Introducción a Cloud SIEM][46].

Para visualizar los hallazgos de seguridad de [Google Cloud Security Command Center][47] en Cloud SIEM, active la opción {{< ui >}}Enable collection of security findings{{< /ui >}} en la pestaña {{< ui >}}Security Findings{{< /ui >}} y siga las instrucciones de configuración en la [guía de Google Cloud Security Command Center][48].

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="La pestaña de hallazgos de seguridad en el mosaico de integración de Google Cloud" style="width:90%;" >}}

### Cloud Security {#cloud-security}

Datadog Cloud Security ofrece detección de amenazas en tiempo real y auditorías de configuración continuas en toda su infraestructura en la nube.
Consulte la [guía de configuración de Cloud Security][49] para comenzar.

Después de configurar Cloud Security, active la opción {{< ui >}}Enable Resource Collection{{< /ui >}} en la pestaña {{< ui >}}Resource Collection{{< /ui >}} para comenzar a recopilar datos de configuración para el [Resource Catalog][50] y Cloud Security. Luego, siga estas instrucciones para habilitar [Misconfigurations and Identity Risks (CIEM)][51] en Google Cloud.

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="La pestaña de recopilación de recursos en el mosaico de integración de Google Cloud" style="width:100%;" >}}

### Monitoreo ampliado de BigQuery {#expanded-bigquery-monitoring}

El monitoreo ampliado de BigQuery proporciona visibilidad granular de sus entornos de BigQuery. Consulte la documentación de [BigQuery Data Observability][68] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[4]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[5]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[6]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[7]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[8]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[10]: https://console.cloud.google.com/
[11]: https://app.datadoghq.com/integrations/google-cloud-platform
[12]: https://cloud.google.com/monitoring/api/metrics_gcp
[13]: https://cloud.google.com/compute/docs/labeling-resources
[14]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[15]: https://cloud.google.com/dataflow
[18]: /es/integrations/google_cloud_platform/#resource-changes-collection
[19]: /es/help/
[20]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[21]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[22]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[23]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[24]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[25]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[26]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[27]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[28]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[29]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[30]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[31]: /es/agent/
[32]: /es/extend/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[33]: /es/integrations/gke/?tab=standard
[34]: /es/integrations/
[35]: /es/tracing/
[36]: /es/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[37]: /es/monitors/types/log/
[38]: /es/security/cloud_siem/
[39]: /es/watchdog/
[40]: https://cloud.google.com/logging/docs/routing/overview#sinks
[41]: /es/integrations/google_cloud_platform/#setup
[42]: /es/integrations/google_cloud_run/
[43]: /es/integrations/google_cloud_run/#log-collection
[44]: /es/cloud_cost_management/
[45]: /es/cloud_cost_management/setup/google_cloud/
[46]: /es/getting_started/cloud_siem/
[47]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[48]: /es/integrations/google_cloud_security_command_center/#installation
[49]: /es/security/cloud_security_management/setup/
[50]: /es/infrastructure/resource_catalog/
[51]: /es/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[52]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[53]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[54]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[55]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[56]: https://cloud.google.com/logging/docs/view/logging-query-language
[57]: /es/logs/
[58]: /es/integrations/google_cloud_private_service_connect/
[59]: https://cloud.google.com/vpc/docs/private-service-connect
[60]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[61]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[62]: https://app.datadoghq.com/event/overview
[63]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/es/logs/guide/google-cloud-log-forwarding
[68]: https://docs.datadoghq.com/es/data_observability/quality_monitoring/data_warehouses/bigquery/