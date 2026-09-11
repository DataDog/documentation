---
"app_id": "google-cloud-platform"
"app_uuid": "8516e126-1eac-45e5-8e34-ff43db45f362"
"assets":
  "dashboards":
    "gce": "assets/dashboards/gce.json"
    "gcp_overview": "assets/dashboards/gcp_overview.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": verdadero
    "metrics":
      "check": "gcp.gce.instance.cpu.utilization"
      "metadata_path": "metadata.csv"
      "prefix": "gcp"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "61"
    "source_type_name": "Google Cloud Platform"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
- "iot"
- "log collection"
- "network"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "google_cloud_platform"
"integration_id": "google-cloud-platform"
"integration_title": "Google Cloud Platform"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_platform"
"public_title": "Google Cloud Platform"
"short_description": "Google Cloud Platform es un grupo de servicios web que en conjunto conforman una plataforma de computación en la nube"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Category::IoT"
  - "Category::Recopilación de logs"
  - "Category::Network"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Google Cloud Platform es un grupo de servicios web que en conjunto conforman una plataforma de computación en la nube"
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/"
  - "resource_type": "otro"
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/track-bigquery-costs-performance/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/recent-changes-tab/"
  "support": "README.md#Soporte"
  "title": "Google Cloud Platform"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->

{{< site-region region="gov" >}}
<div class="alert alert-danger"><a href="https://cloud.google.com/iam/docs/service-account-impersonation">La suplantación de cuenta de servicio</a> no está disponible para el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}})</div>
{{< /site-region >}}


## Resumen

Utiliza esta guía para empezar a monitorizar tu entorno de Google Cloud. Este enfoque simplifica la configuración de los entornos de Google Cloud con varios proyectos, lo que permite maximizar la cobertura de la monitorización.

{{% collapse-content title="Ver la lista completa de integraciones de Google Cloud" level="h4" %}}
<div class="alert alert-danger">
La integración de Google Cloud de Datadog recopila <a href="https://cloud.google.com/monitoring/api/metrics_gcp">todas las métricas de Google Cloud</a>. Datadog actualiza continuamente los documentos para mostrar todas las integraciones dependientes, pero la lista de integraciones a veces no está actualizada con las últimas métricas y servicios en la nube.

 Si no ves una integración para un servicio específico de Google Cloud, ponte en contacto con <a href="https://www.datadoghq.com/support/">el servicio de asistencia de Datadog </a>.
</div>

| Integración                         | Descripción                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | PaaS (plataforma como servicio) para crear aplicaciones escalables                           |
| [BigQuery][2]                       | Almacén de datos empresariales                                                             |
| [Bigtable][3]                       | Servicio de base de datos NoSQL Big Data                                                       |
| [Cloud SQL][4]                      | Servicio de base de datos MySQL                                                                |
| [Cloud APIs][5]                     | Interfaces programáticas para todos los servicios de Google Cloud Platform                        |
| [Cloud Armor][6]                   | Servicio de seguridad de red para proteger contra ataques de denegación de servicio y ataques web    |
| [Cloud Composer][7]                 | Servicio de orquestación del flujo de trabajo totalmente gestionado                                        |
| [Cloud Dataproc][8]                 | Servicio de nube para la ejecución de clústeres Apache Spark y Apache Hadoop                   |
| [Cloud Dataflow][9]                | Servicio totalmente gestionado para transformar y enriquecer datos en los modos de flujo (stream) y lote. |
| [Cloud Filestore][10]                | Almacenamiento de archivos totalmente gestionado y de alto rendimiento                                          |
| [Cloud Firestore][11]                | Base de datos flexible y escalable para el desarrollo móvil, web y de servidor                 |
| [Cloud Interconnect][12]            | Conectividad híbrida                                                                   |
| [Cloud IoT][13]                     | Conexión y gestión seguras de dispositivos                                               |
| [Cloud Load Balancing][14]          | Distribuir recursos informáticos de carga balanceada                                            |
| [Cloud Logging][15]                 | Gestión y análisis de logs en tiempo real                                                 |
| [Cloud Memorystore para Redis][16]   | Servicio de almacenamiento de datos en memoria totalmente gestionado                                          |
| [Cloud Router][17]                  | Intercambiar rutas entre tu VPC y las redes on-premises mediante BGP                |
| [Cloud Run][18]                     | Plataforma de computación gestionada que ejecuta contenedores sin estado a través de HTTP                  |
| [Cloud Security Command Center][19] | Security Command Center es un servicio de información sobre amenazas                                |
| [Cloud Tasks][20]                   | Colas de tareas distribuidas                                                               |
| [Cloud TPU][21]                     | Entrenar y ejecutar modelos de Machine Learning                                                  |
| [Compute Engine][22]                | Máquinas virtuales de alto rendimiento                                                     |
| [Container Engine][23]              | Kubernetes, gestionado por Google                                                         |
| [Datastore][24]                     | Base de datos NoSQL                                                                        |
| [Firebase][25]                      | Plataforma móvil para el desarrollo de aplicaciones                                           |
| [Functions][26]                     | Plataforma serverless para crear microservicios basados en eventos                            |
| [Kubernetes Engine][27]             | Gestor de clústeres y sistema de orquestación                                              |
| [Machine Learning][28]              | Servicios de Machine Learning                                                             |
| [Private Service Connect][29]       | Servicios de acceso gestionado con conexiones VPC privadas                                  |
| [Pub/Sub][30]                       | Servicio de mensajería en tiempo real                                                           |
| [Spanner][31]                       | Servicio de base de datos relacional de escalabilidad horizontal y coherencia global               |
| [Almacenamiento][32]                       | Almacenamiento unificado de objetos                                                                |
| [Vertex AI][33]                     | Crear, entrenar y desplegar modelos personalizados de Machine Learning (ML)                          |
| [VPN][34]                           | Funcionalidad gestionada de red                                                         |
{{% /collapse-content %}}

## Configuración

Configura la integración Google Cloud en Datadog para recopilar métricas y logs de tus servicios Google Cloud.

### Requisitos previos

1. Si tu organización restringe las identidades por dominio, debes añadir la identidad del cliente de Datadog como valor permitido en tu política. Identidad del cliente de Datadog: `C0147pk0i`

2. La suplantación de cuentas de servicio y la detección automática de proyectos dependen de que tengas habilitados ciertos roles y ciertas API para monitorizar proyectos. Antes de empezar, asegúrate de que las siguientes API están habilitadas para **cada uno de los proyectos** que quieres monitorizar:

[API de Cloud Monitoring][35] 
: Permite a Datadog consultar tus datos de métricas de Google Cloud.

[API de Compute Engine][36] 
: Permite a Datadog detectar datos de instancias de computación.

[API de Cloud Asset][37]
: Permite a Datadog solicitar recursos de Google Cloud y vincular etiquetas (labels) relevantes a métricas como etiquetas (tags).

[API de Cloud Resource Manager][38] 
: Permite a Datadog añadir métricas con los recursos y las etiquetas (tags) correctos.

[API de IAM][39]
: Permite a Datadog autenticarse con Google Cloud.

[API de Cloud Billing][40] 
: Permite a los desarrolladores gestionar la facturación de sus proyectos de Google Cloud Platform mediante programación. Para obtener más información, consulta la documentación de [Cloud Cost Management (CCM)][41].

3. Asegúrate de que los proyectos monitorizados no están configurados como [proyectos de contexto][42] que extraen métricas de muchos otros proyectos.

### Recopilación de métricas

#### Instalación

{{< tabs >}}
{{% tab "Org- and Folder-level project discovery" %}}


{{< site-region region="gov" >}}
La recopilación de métricas a nivel de organización no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
Se recomienda la monitorización a nivel de organización (o a nivel de carpeta) para una cobertura completa de todos los proyectos, incluyendo los futuros proyectos que puedan crearse en una organización o carpeta.

**Nota**: Tu cuenta de usuario de [Google Cloud Identity][408] debe tener asignado el rol `Admin` en el contexto deseado para completar la configuración en Google Cloud (por ejemplo, `Organization Admin`).

{{% collapse-content title="1. Crear una cuenta de servicio de Google Cloud en el proyecto por defecto" level="h5" %}}
1. Abre tu [consola de Google Cloud][401].
2. Ve a **IAM & Admin** > **Cuentas de servicio**.
3. Haz clic en **Create service account** (Crear cuenta de servicio) en la parte superior.
4. Asigna un nombre único a la cuenta de servicio.
5. Haz clic en **Done** (Listo) para finalizar la creación de la cuenta de servicio.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}} 

{{% collapse-content title="2. Añadir la cuenta de servicio a nivel de organización o de carpeta" level="h5" %}}
1. En la consola de Google Cloud, ve a la página **IAM**.
2. Selecciona una carpeta u organización.
3. Para conceder un rol a una entidad que aún no tenga otros roles en el recurso, haz clic en **Grant Access** (Conceder acceso) e introduce el correo electrónico de la cuenta de servicio que creaste anteriormente.
4. Introduce la dirección de correo electrónico de la cuenta de servicio.
5. Asigna los siguientes roles:
  - [Visor de cálculos][402] proporciona acceso de **sólo lectura** a los recursos Get y List de Compute Engine
  - [Visor de monitorización][403] proporciona acceso de **sólo lectura** a los datos de monitorización disponibles en su entorno Google Cloud
  - [Visor de recursos en la nube][404] proporciona acceso de **sólo lectura** a los metadatos de recursos en la nube
  - [Navegador][405] proporciona acceso de **sólo lectura** para navegar por la jerarquía de un proyecto
  - [Consumidor de uso de servicios][406] (**opcional**, para entornos con varios proyectos) proporciona una [asignación de costes y cuotas de API por proyecto](#enable-per-project-cost-and-api-quota-attribution) después de que esta función haya sido activada por el servicio de asistencia de Datadog.
6. Haz clic en **Save** (Guardar).

**Nota**: El rol `Browser` sólo es necesario en el proyecto por defecto proyecto de la cuenta de servicio. Otros proyectos sólo requieren los otros roles mencionados.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Añadir la entidad de Datadog a tu cuenta de servicio" level="h5" %}}
**Nota**: Si previamente configuraste el acceso utilizando una entidad compartida de Datadog, puedes revocar el permiso de esa entidad después de completar estos pasos.

1. En Datadog, ve a **Integraciones** > [**Google Cloud Platform**][407].
2. Haz clic en **Add Google Cloud Account** (Añadir cuenta de Google Cloud).
Si no tienes proyectos configurados, se te redirigirá automáticamente a esta página.
3. Copia tu entidad de Datadog y guárdala para la siguiente sección.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Página para añadir una nueva cuenta de Google Cloud, en el cuadro de la integración Google Cloud de Datadog" style="width:70%;">}}

**Nota**: Mantén esta ventana abierta para la sección 4.

4. En la [consola de Google Cloud][409], en el menú **Cuentas de servicio**, busca la cuenta de servicio que creaste en la sección 1.
5. Ve a la pestaña **Permisos** y haz clic en **Grant Access** (Conceder acceso).

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interfaz de la consola de Google Cloud que muestra la pestaña Permisos en Cuentas de servicio." style="width:70%;">}}

6. Pega tu entidad de Datadog en el cuadro de texto **Nuevas entidades**.
7. Asigna el rol de **Creador de token de cuenta de servicio**.
8. Haz clic en **Save** (Guardar).

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Finalizar la configuración de la integración en Datadog" level="h5" %}}
1. En su consola de Google Cloud, ve a la pestaña **Cuenta de servicio** > **Detalles**. En esta página, busca el correo electrónico asociado a esta cuenta de servicio de Google. Tiene el formato `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
2. Copia este correo electrónico.
3. Vuelve al cuadro de configuración de la integración en Datadog (donde copiaste tu entidad de Datadog en la sección anterior).
4. Pega el correo electrónico que copiaste en **Añadir correo electrónico de cuenta de servicio**.
5. Haz clic en **Verify and Save Account** (Verificar y guardar cuenta).
{{% /collapse-content %}}

Las métricas aparecen en Datadog aproximadamente **15 minutos** después de la configuración.

[408]: https://cloud.google.com/identity/docs/overview
{{< /site-region >}}


#### Prácticas recomendadas para monitorizar varios proyectos

##### Permitir la asignación de costes y cuotas de API por proyecto 

Por defecto, Google Cloud asigna el coste de monitorización de llamadas de API, así como el uso de cuotas de API, al proyecto que contiene la cuenta de servicio de esta integración. Como práctica recomendada para entornos Google Cloud con varios proyectos, habilita la asignación de costes por proyecto de monitorización de las llamadas de API y del uso de cuotas de API. Con esta opción habilitada, los costes y el uso de cuotas se asignan al proyecto que se *consulta*, en lugar del proyecto que contiene la cuenta de servicio. Esto proporciona visibilidad de los costes de monitorización generados por cada proyecto y también ayuda a prevenir que se alcancen los límites de tasa de API.

Para habilitar esta función:
1. Asegúrate de que la cuenta de servicio Datadog tiene el rol [Consumidor de uso de servicios][1] en el contexto deseado (carpeta u organización).
2. Haz clic en el conmutador **Enable Per Project Quota** (Habilitar cuota por proyecto) en la pestaña **Proyectos** de la [página de la integración Google Cloud][2].

[1]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /tab %}}

{{% tab "Project-level metric collection" %}}


{{< site-region region="gov" >}}
La integración Datadog Google Cloud para el sitio {{< region-param key="dd_site_name" >}} utiliza cuentas de servicio para crear una conexión de API entre Google Cloud y Datadog. Sigue las instrucciones que se indican a continuación para crear una cuenta de servicio y proporcionar a Datadog las credenciales de la cuenta de servicio para que comience a realizar llamadas de API en tu nombre.

La [suplantación de cuentas de servicio][201] no está disponible para el sitio {{< region-param key="dd_site_name" >}}.

**Nota**: La [facturación de Google Cloud][204], la [API de Cloud Monitoring][205], la [API de Compute Engine][206] y la [API de Cloud Asset][207] deben estar habilitadas para cualquier proyecto que quieras monitorizar.

1. Ve a la [página de credenciales de Google Cloud][202] del proyecto de Google Cloud que quieres integrar con Datadog.
2. Haz clic en **Create credentials** (Crear credenciales).
3. Selecciona **Cuenta de servicio**.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="settings" popup="true" style="width:80%;">}}

4. Asigna a la cuenta de servicio un nombre único y una descripción opcional.
5. Haz clic en **Create and continue** (Crear y continuar).
6. Añade los siguientes roles:
    - Visor de cálculos
    - Visor de monitorización
    - Visor de recursos en la nube
7.  Haz clic en **Done** (Listo).
    **Nota**: Debes tener el rol de administrador de claves de cuentas de servicio para seleccionar los roles Compute Engine y Cloud Asset. Todos los roles seleccionados permiten a Datadog recopilar métricas, etiquetas (tags), eventos y etiquetas (labels) de usuario en tu nombre.
8. En la parte inferior de la página, busca tus cuentas de servicio y selecciona la que acabas de crear.
9. Haz clic en **Add Key** -> **Create new key** (Añadir clave -> Crear nueva clave) y elige **JSON** como tipo.
10. Haz clic en **Create** (Crear). Se descargará un archivo de clave JSON en tu ordenador. Recuerda dónde se guarda, ya que es necesario para finalizar la instalación.
11. Ve a la [página de la integración Datadog Google Cloud][203].
12. En la pestaña **Configuración**, selecciona **Cargar archivo de clave** para integrar este proyecto con Datadog.
13. Opcionalmente, puedes utilizar etiquetas (tags) para filtrar hosts y evitar que se incluyan en esta integración. Encontrarás instrucciones detalladas en la [sección de configuration](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings" popup="true" style="width:80%;">}}

14. Haz clic en _Install/Update_ (Instalar/Actualizar).
15. Si quieres monitorizar varios proyectos, utiliza uno de los siguientes métodos:

    - Repite el proceso anterior para utilizar varias cuentas de servicio.
    - Utiliza la misma cuenta de servicio actualizando el `project_id` en el archivo JSON descargado en el paso 10. A continuación, carga el archivo en Datadog como se describe en los pasos 11 a 14.

[201]: https://cloud.google.com/iam/docs/service-account-impersonation
[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
Puedes utilizar la [suplantación de cuentas de servicio][301] y la detección automática de proyectos para integrar Datadog con [Google Cloud][302].

Este método te permite monitorizar todos los proyectos visibles para una cuenta de servicio, asignando roles IAM en los proyectos pertinentes. Puedes asignar estos roles a proyectos individualmente o puedes configurar Datadog para monitorizar grupos de proyectos, asignando estos roles a nivel de organización o de carpeta. Asignar roles de esta manera permite a Datadog detectar automáticamente y monitorizar todos los proyectos en el contexto determinado, incluyendo los nuevos proyectos que puedan añadirse al grupo en el futuro. 

{{% collapse-content title="1. Crear una cuenta de servicio de Google Cloud" level="h5" id="create-service-account" %}}
1. Abre tu [consola de Google Cloud][303].
2. Ve a **IAM & Admin** > **Cuentas de servicio**.
3. Haz clic en **Create service account** (Crear cuenta de servicio) en la parte superior.
4. Asigna un nombre único a la cuenta de servicio y haz clic en **Create and continue** (Crear y continuar).
5. Añade los siguientes roles a la cuenta de servicio:
   * Visor de monitorización
   * Visor de cálculos
   * Visor de recursos en la nube
   * Navegador
6. Haz clic en **Continue** (Continuar) y luego en **Done** (Listo) para finalizar la creación de la cuenta de servicio.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Interfaz de la consola de Google Cloud que muestra el flujo 'Crear cuenta de servicio'. En 'Conceder a esta cuenta de servicio acceso al proyecto', se añaden los cuatro roles de la instrucción." style="width:70%;">}}

[303]: https://console.cloud.google.com/
{{% /collapse-content %}} 

{{% collapse-content title="2. Añadir la entidad de Datadog a tu cuenta de servicio" level="h5" id="add-principal-to-service-account" %}}
1. En Datadog, ve a [**Integraciones** > **Google Cloud Platform**][305].
2. Haz clic en **Add GCP Account** (Añadir cuenta de GCP). Si no tienes proyectos configurados, se te redirigirá automáticamente a esta página.
3. Si no generaste una entidad de Datadog para tu organización, haz clic en el botón **Generate Principal** (Generar entidad).
4. Copia tu entidad de Datadog y guárdala para la siguiente sección.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interfaz Datadog que muestra el flujo 'Añadir nueva cuenta de GCP'. El primer paso, 'Añadi entidad de Datadog a Google', presenta un cuadro de texto donde un usuario puede generar una entidad de Datadog y copiarla en su portapapeles. El segundo paso, 'Añadir correo electrónico de la cuenta de servicio', presenta un cuadro de texto que el usuario puede rellenar en la sección 3." style="width:70%;">}}

   **Nota**: Mantén esta ventana abierta para la siguiente sección.
5. En la [consola de Google Cloud][304], en el menú **Cuentas de servicio**, busca la cuenta de servicio que creaste en la [primera sección](#create-service-account).
6. Ve a la pestaña **Permisos** y haz clic en **Grant Access** (Conceder acceso).
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interfaz de la consola de Google Cloud que muestra la pestaña Permisos en Cuentas de servicio." style="width:70%;">}}
7. Pega tu entidad de Datadog en el cuadro de texto **Nuevas entidades**.
8. Asigna el rol de **Creador de token de cuenta de servicio** y haz clic en **SAVE** (Guardar).
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Interfaz de la consola de Google Cloud que muestra el cuadro 'Añadir entidades' y la interfaz 'Asignar roles'." style="width:70%;">}}

**Nota**: Si previamente configuraste el acceso utilizando una entidad compartida de Datadog, puedes revocar el permiso de esa entidad después de completar estos pasos.

[304]: https://console.cloud.google.com/
[305]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}} 

{{% collapse-content title="3. Finalizar la configuración de la integración en Datadog" level="h5" %}}
1. En tu consola de Google Cloud, ve a la pestaña **Cuenta de servicio** > **Detalles**. Una vez allí, busca el correo electrónico asociado a esta cuenta de servicio de Google. Tiene un formato parecido a `<sa-name>@<project-id>.iam.gserviceaccount.com`.
2. Copia este correo electrónico.
3. Vuelve al cuadro de configuración de la integración en Datadog [donde copiaste tu entidad de Datadog en la sección anterior](#add-principal-to-service-account)).
4. En el cuadro **Añadir correo electrónico de cuenta de servicio**, pega el correo electrónico que copiaste anteriormente.
5. Haz clic en **Verify and Save Account** (Verificar y guardar cuenta).

Las métricas aparecerán en Datadog en aproximadamente quince minutos.
{{% /collapse-content %}} 

[301]: https://cloud.google.com/iam/docs/service-account-impersonation
[302]: https://docs.datadoghq.com/integrations/google_cloud_platform/
{{< /site-region >}}


{{% /tab %}}
{{< /tabs >}}

#### Validación

Para ver tus métricas, utiliza el menú de la izquierda para ir a **Métricas** > **Resumen** y busca `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="Página de resumen de métricas en Datadog filtrada para mostrar las métricas que empiezan con GCP" style="width:100%;" >}}

#### Configuración

{{% collapse-content title="Limitar la recopilación de métricas por espacio de nombres de métricas" level="h5" %}}

Opcionalmente, puedes elegir qué servicios de Google Cloud monitorizar con Datadog. La configuración de la recopilación de métricas de servicios específicos de Google te permite optimizar los costes de la API de monitorización de Google Cloud y, al mismo tiempo, conservar la visibilidad de tus servicios críticos.

En la pestaña **Recopilación de métricas** de la [página de la integración Google Cloud][43] de Datadog, desmarca los espacios de nombres de métricas que quieres excluir. También puedes desactivar la recopilación de todos los espacios de nombres de métricas.

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="Pestaña de recopilación de métricas en la página de la integración Datadog Google Cloud" style="width:80%;">}}
{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por etiqueta (tag)" level="h5" %}}

Por defecto, verás todas tus instancias de Google Compute Engine (GCE) en la información general de la infraestructura Datadog. Datadog las etiqueta automáticamente con etiquetas (tags) de host GCE y con cualquier etiqueta (label) GCE que hayas añadido.

Opcionalmente, puedes utilizar etiquetas (tags) para limitar las instancias que se extraen en Datadog. En la pestaña **Recopilación de métricas** del proyecto, introduce las etiquetas (tags) en el cuadro de texto **Limitar filtros de recopilación de métricas**. Sólo se importarán a Datadog los hosts que coincidan con una de las etiquetas (tags) definidas. Puedes utilizar comodines (`?` para un solo carácter, `*` para varios caracteres), para buscar varios hosts coincidentes, o `!`, para excluir determinados hosts. Este ejemplo incluye todas las instancias de tamaño `c1*`, pero excluye los hosts de staging:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Para obtener más información, consulta la página de Google [Organizar recursos mediante etiquetas (labels)][44].

{{% /collapse-content %}}

#### Aprovechar las ventajas del Datadog Agent

Utiliza el [Datadog Agent][45] para recopilar [métricas más granulares y de baja latencia][46] de tu infraestructura. Instala el Agent en cualquier host, incluyendo [GKE][47], para obtener información más detallada sobre las [trazas (traces)][48] y los [logs][49] que puede recopilar. Para obtener más información, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][50]

## Recopilación de logs

{{< tabs >}}
{{% tab "Dataflow Method (Recommended)" %}}

Reenvía los logs de tus servicios de Google Cloud a Datadog utilizando [Google Cloud Dataflow][1] y la [plantilla de Datadog][2]. Este método permite comprimir y agrupar los eventos antes de reenviarlos a Datadog.

Puedes utilizar el módulo [terraform-gcp-datadog-integration][3] para gestionar esta infraestructura a través de Terraform, o seguir las instrucciones de esta sección para:

1. Crear un [tema][4] Pub/Sub y una [suscripción pull][5] para recibir logs de un sink de logs configurado
2. Crear una cuenta de servicio del worker de Dataflow personalizada para proporcionar [mínimo privilegio][6] a tus workers del pipeline de Dataflow
3. Crear un [sink de logs][7] para publicar logs en el tema Pub/Sub
4. Crear un trabajo de Dataflow utilizando la [plantilla de Datadog][2] para transmitir logs desde la suscripción Pub/Sub a Datadog

Tienes control total sobre qué logs se envían a Datadog a través de los filtros de registro que creas en el sink de logs, incluidos logs de GCE y GKE. Consulta la [página Lenguaje de consulta de registro][8] de Google para obtener información sobre cómo escribir filtros. Para un examen detallado de la arquitectura creada, consulta [Stream logs from Google Cloud to Datadog][9] en el Centro de arquitectura de la nube.

**Nota**: Debes habilitar la **API de Dataflow** para utilizar Google Cloud Dataflow. Para obtener más información, consulta [Habilitación de API][10] en la documentación de Google Cloud.

Para recopilar logs de aplicaciones que se ejecutan en GCE o GKE, también puedes utilizar el [Datadog Agent][11].

#### 1. Crear un tema y una suscripción Cloud Pub/Sub

1. Ve a la [consola de Cloud Pub/Sub][12] y crea un nuevo tema. Selecciona la opción **Añadir una suscripción predeterminada** para simplificar la configuración.

   **Nota**: También puedes configurar manualmente una [suscripción Cloud Pub/Sub][13] con el tipo de entrega **Pull**. Si creas tu suscripción Pub/Sub manualmente, deja la casilla `Enable dead lettering` **desmarcada**. Para obtener más información, consulta [Características de Pub/Sub no compatibles][14].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Página Crear un tema en la consola de Google Cloud con la casilla Añadir una suscripción por defecto seleccionada" style="width:80%;">}}

2. Proporciona un nombre explícito para ese tema como `export-logs-to-datadog` y haz clic en **Create** (Crear).

3. Crea un tema adicional y una suscripción por defecto para gestionar cualquier mensaje de log rechazado por la API de Datadog. El nombre de este tema se utiliza en la plantilla de Datadog Dataflow como parte de la configuración de la ruta del [parámetro de plantilla][10] `outputDeadletterTopic`. Cuando hayas inspeccionado y corregido cualquier problema en los mensajes fallidos, envíalos de nuevo al tema `export-logs-to-datadog` original ejecutando un trabajo de [plantilla Pub/Sub a Pub/Sub][15].

4. Datadog recomienda crear un secreto en [Secret Manager][16], con el valor válido de tu clave de API Datadog, para utilizarlo posteriormente en la plantilla de Datadog Dataflow.

**Advertencia**: Las Cloud Pub/Subs están sujetas a [cuotas y limitaciones de Google Cloud][7]. Si el número de logs que tienes supera estas limitaciones, Datadog te recomienda dividir tus logs en diferentes temas. Para obtener información sobre cómo configurar tus notificaciones de monitor si te acercas a esos límites, consulta la [sección Monitorizar el reenvío de logs Pub/Sub](#monitor-the-cloud-pubsub-log-forwarding).

#### 2. Crear una cuenta de servicio de worker de Dataflow personalizada

El comportamiento predeterminado de los workers de pipelines de Dataflow consiste en utilizar la [cuenta de servicio de Compute Engine por defecto][17] de tu proyecto, que concede permisos a todos los recursos del proyecto. Si estás reenviando logs desde un entorno de **Producción**, deberías crear una cuenta de servicio de worker personalizada con sólo los roles y permisos necesarios, y asignar esta cuenta de servicio a tus workers de pipelines de Dataflow.

1. Ve a la página [Cuentas de servicio][18] en la consola de Google Cloud y selecciona tu proyecto.
2. Haz clic en **CREATE SERVICE ACCOUNT** (Crear cuenta de servicio) y asigna un nombre descriptivo a la cuenta de servicio. Haz clic en **CREATE AND CONTINUE** (Crear y continuar).
3. Añade los roles en la tabla de permisos necesarios y haz clic en **DONE** (Listo).

##### Permisos necesarios

[Administrador de Dataflow][19]
: `roles/dataflow.admin` <br> Permitir que esta cuenta de servicio realice tareas administrativas de Dataflow.

[Worker de Dataflow][20]
: `roles/dataflow.worker` <br> Permitir que esta cuenta de servicio realice operaciones de trabajos de Dataflow.

[Visor de Pub/Sub][21]
: `roles/pubsub.viewer` <br> Permitir que esta cuenta de servicio vea mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Suscriptor de Pub/Sub][22]
: `roles/pubsub.subscriber` <br> Permitir que esta cuenta de servicio consuma mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Editor de Pub/Sub][1]
: `roles/pubsub.publisher`<br> Permitir que esta cuenta de servicio publique los mensajes fallidos en una suscripción independiente, lo que permite analizar o reenviar los logs.

[Secret Manager Secret Accessor][23]
: `roles/secretmanager.secretAccessor` <br> Permitir que esta cuenta de servicio acceda a la clave de API de Datadog en Secret Manager.

[Administrador de almacenamiento de objetos][24]
: `roles/storage.objectAdmin`<br> Permitir que esta cuenta de servicio lea y escriba en el bucket de almacenamiento en la nube especificado para los archivos de staging.

**Nota**: Si no creas una cuenta de servicio personalizada para los workers de pipelines de Dataflow, asegúrate de que la cuenta de servicio predeterminada de Compute Engine tenga los permisos requeridos anteriores.

#### 3. Exportar logs desde un tema Google Cloud Pub/Sub

1. Ve a la [página del Logs Explorer][25] en la consola de Google Cloud.
2. En la pestaña de **Log Router** (Enrutador de logs), selecciona **Create Sink** (Crear sumidero de datos).
3. Indica un nombre para el sumidero de datos.
4. Elige _Cloud Pub/Sub_ como destino y selecciona el tema Cloud Pub/Sub creado para tal fin. **Nota**: El tema Cloud Pub/Sub puede encontrarse en un proyecto diferente.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

5. Elige los logs que quieres incluir en el sink con un filtro opcional de inclusión o exclusión. Puedes filtrar los logs con una consulta de búsqueda o utilizar la [función de muestra][5]. Por ejemplo, para incluir sólo el 10% de los logs con un nivel de `severity` de `ERROR`, crea un filtro de inclusión con `severity="ERROR" AND sample(insertId, 0.1)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="Filtro de inclusión para un sumidero de logs de Google Cloud Logging con una consulta de gravedad=ERROR y muestra(insertId, 0.1)" >}}

6. Haz clic en **Create Sink** (Crear sink).

**Nota**: Es posible crear varias exportaciones desde Google Cloud Logging al mismo tema Cloud Pub/Sub con diferentes sumideros.

#### 4. Crear y ejecutar el trabajo de Dataflow

1. Ve a la página [Crear trabajo a partir de una plantilla][17] en la consola de Google Cloud.
2. Asigna un nombre al trabajo y selecciona un endpoint regional de Dataflow.
3. Selecciona `Pub/Sub to Datadog` en el desplegable **Plantilla de Dataflow**. Aparecerá la sección **Parámetros requeridos**.
   a. Selecciona la suscripción de entrada en el desplegable **Suscripción de entrada Pub/Sub**.
   b. Introduce lo siguiente en el campo **URL de la API de logs de Datadog**:
   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **Nota**: Asegúrate de que el selector de sitios de Datadog a la derecha de la página esté configurado con tu [sitio de Datadog][22] antes de copiar la URL de arriba.

   c. Selecciona el tema creado para recibir fallos de mensajes en el desplegable **Tema Pub/Sub de salida de mensajes muertos**.
   d. Especifica una ruta para los archivos temporales en tu bucket de almacenamiento en el campo **Ubicación temporal**.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Parámetros requeridos en la plantilla de Datadog Dataflow" style="width:80%;">}}

4. En **Parámetros opcionales**, marca `Include full Pub/Sub message in the payload`.

5. Si creaste un secreto en Secret Manager con el valor de tu clave de API Datadog, como se menciona en el [paso 1](#1-create-a-cloud-pubsub-topic-and-subscription), introduce el **nombre de recurso** del secreto en el campo **ID de Google Cloud Secret Manager**.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con los campos ID de Google Cloud Secret Manager y Fuente de la clave de API pasada, resaltados" style="width:80%;">}}

Para obtener información detallada sobre el uso de las demás opciones disponibles, consulta [Parámetros de plantilla][10] en la plantilla de Dataflow:

   - `apiKeySource=KMS` con `apiKeyKMSEncryptionKey` configurada con tu ID de clave de [Cloud KMS][19] y `apiKey` configurada con la clave de API cifrada.
   - **No recomendado**: `apiKeySource=PLAINTEXT` con `apiKey` configurada con la clave de API en texto sin formato.

6. Si creaste una cuenta de servicio de worker personalizada, selecciónala en el desplegable **Correo electrónico de cuenta de servicio**.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con el correo electrónico de la cuenta de servicio resaltado" style="width:80%;">}}

7. Haz clic en **RUN JOB** (Ejecutar trabajo).

**Nota**: Si tienes una VPC compartida, consulta la página [Especificar una red y subred][20] en la documentación de Dataflow para obtener directrices sobre cómo especificar los parámetros `Network` y `Subnetwork`.

#### Validación

Los nuevos eventos de generación de logs enviados al tema Cloud Pub/Sub aparecen en el [Datadog Log Explorer][24].

**Nota**: Puedes utilizar la [Calculadora de precios de Google Cloud][26] para calcular los posibles costes.

#### Monitorizar el reenvío de logs de Cloud Pub/Sub

La [integración de Google Cloud Pub/Sub][4] proporciona métricas útiles para monitorizar el estado del reenvío de logs:

   - `gcp.pubsub.subscription.num_undelivered_messages` para el número de mensajes pendientes de entrega
   - `gcp.pubsub.subscription.oldest_unacked_message_age` para la antigüedad del mensaje no confirmado más antiguo de una suscripción

Utiliza las métricas anteriores con un [monitor de métricas][27] para recibir alertas de mensajes en tus suscripciones de entrada y de mensajes no entregados.

#### Monitorizar el pipeline de Dataflow

Utiliza la [integración de Google Cloud Dataflow][28] de Datadog para monitorizar todos los aspectos de tus pipelines de Dataflow. Puedes ver todas tus métricas claves de Dataflow en el dashboard predefinido, enriquecido con datos contextuales, como información sobre las instancias de GCE que ejecutan tus cargas de trabajo de Dataflow y el rendimiento de tu Pub/Sub.

También puedes utilizar un [monitor recomendado][29] preconfigurado para definir notificaciones sobre aumentos en el tiempo de backlog de tu pipeline. Para obtener más información, consulta [Monitorizar tus pipelines de Dataflow con Datadog][30] en el blog de Datadog.


[1]: https://cloud.google.com/dataflow
[2]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[3]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration
[4]: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
[5]: https://cloud.google.com/pubsub/docs/create-subscription
[6]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[7]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[8]: https://cloud.google.com/logging/docs/view/logging-query-language
[9]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[10]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[11]: https://docs.datadoghq.com/agent/
[12]: https://console.cloud.google.com/cloudpubsub/topicList
[13]: https://console.cloud.google.com/cloudpubsub/subscription/
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[16]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[17]: https://console.cloud.google.com/dataflow/createjob
[18]: https://console.cloud.google.com/iam-admin/serviceaccounts
[19]: https://cloud.google.com/kms/docs
[20]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[21]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[22]: https://console.cloud.google.com/logs/viewer
[23]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[24]: https://app.datadoghq.com/logs
[25]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[26]: https://cloud.google.com/products/calculator
[27]: https://docs.datadoghq.com/monitors/types/metric/
[28]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[29]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[30]: https://cloud.google.com/storage/docs/access-control/iam-roles/
{{% /tab %}}
{{% tab "Método Pub/Sub Push (legacy)" %}}

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La recopilación de logs de Google Cloud con una suscripción Pub/Sub Push</a> pronto estará **obsoleta**.

La documentación anterior de la suscripción **Push** sólo se mantiene para solucionar problemas o modificar configuraciones legacy.

Utiliza una suscripción **Pull** con la plantilla de Datadog Dataflow, como se describe en [Método Dataflow][1], para reenviar tus logs de Google Cloud a Datadog.


[1]: http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
{{% /tab %}}
{{< /tabs >}}

## Monitorización ampliada de BigQuery 

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Join the Preview!" >}}
   La monitorización ampliada de BigQuery está en Vista previa. Utiliza este formulario para registrarte y empezar a obtener información sobre el rendimiento de tus consultas. 
{{< /callout >}}

La monitorización ampliada de BigQuery te proporciona una visibilidad granular de tus entornos BigQuery.

### Monitorización del rendimiento de trabajos de BigQuery

Para monitorizar el rendimiento de tus trabajos de BigQuery, concede el rol [Visor de recursos BigQuery][51] a la cuenta de servicio de Datadog de cada proyecto de Google Cloud.

**Notas**:
   - Necesitas haber verificado tu cuenta de servicio Google Cloud en Datadog, como se indica en la [sección de configuración](#setup).
   - **No** es necesario configurar Dataflow para recopilar logs de la monitorización ampliada de BigQuery.

1. En la consola de Google Cloud, ve a la [página de IAM][52].
2. Haz clic en **Grant access** (Conceder acceso).
3. Introduce el correo electrónico de tu cuenta de servicio en **Nuevas entidades**.
4. Asigna el rol [Visor de recursos BigQuery][51].
5. Haz clic en **SAVE** (Guardar).
6. En la [página de la integración Google Cloud][43] de Datadog haz clic en la pestaña **BigQuery**.
7. Haz clic en el conmutador **Enable Query Performance** (Habilitar consulta del rendimiento).

### Monitorización de la calidad de los datos de BigQuery

La monitorización de la calidad de los datos de BigQuery proporciona métricas de calidad de tus tablas de BigQuery (desde la relevancia y las actualizaciones al recuento de filas y el tamaño). Explora los datos de tus tablas en profundidad en la [página de monitorización de la calidad de los datos][53].

Para recopilar métricas de calidad, concede el rol [Visor de metadatos de BigQuery][54] a la cuenta de servicio de Datadog para cada tabla de BigQuery que estés utilizando.

**Nota**: El Visor de metadatos de BigQuery puede aplicarse a nivel de tabla, conjunto de datos, proyecto u organización de BigQuery.
   - Para la monitorización de la calidad de los datos de todas las tablas de un conjunto de datos, concede acceso a nivel de conjunto de datos.
   - Para la monitorización de la calidad de los datos de todos los conjuntos de datos de un proyecto, concede acceso a nivel de proyecto.

1. Ve a [BigQuery][55].
2. En el Explorador, busca el recurso BigQuery deseado.
3. Haz clic en el menú de tres puntos situado junto al recurso y luego haz clic en **Share -> Manage Permissions** (Compartir -> Gestionar permisos).

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="Opción de menú de gestión de permisos, de un recurso de conjunto de datos de BigQuery" style="width:80%;">}}

4. Haz clic en **ADD PRINCIPAL** (Añadir entidad).
5. En el cuadro de nuevas entidades, introduce la cuenta de servicio Datadog configurada para la integración Google Cloud.
6. Asigna el rol [Visor de metadatos de BigQuery][54].
7. Haz clic en **SAVE** (Guardar).
8. En la [página de la integración Google Cloud][43] de Datadog haz clic en la pestaña **BigQuery**.
9. Haz clic en el conmutador **Enable Data Quality** (Habilitar calidad de los datos).

### Conservación de logs de trabajos de BigQuery

Datadog recomienda crear un nuevo [índice de logs][56] llamado `data-observability-queries` e indexar tus logs de trabajos de BigQuery durante 15 días. Utiliza el siguiente filtro de índice para extraer los logs:

```bash
service:data-observability @platform:*
```

Consulta el cálculo de costes en la [página de tarifas de Log Management][57].

## Recopilación de cambios de recursos

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
  ¡La <strong>recopilación de cambios de recursos</strong> está en Vista previa! Para solicitar acceso, utiliza el formulario adjunto.
{{< /callout >}}

Selecciona **Habilitar recopilación de recursos** en la [pestaña Recopilación de recursos][58] de la página de la integración Google Cloud Page. Esto te permite recibir eventos de recursos en Datadog cuando [Cloud Asset Inventory][59] de Google detecta cambios en tus recursos en la nube.

A continuación, sigue los pasos que se indican a continuación para reenviar eventos de cambios de un tema Pub/Sub al [Explorador de eventos][60] de Datadog.

{{% collapse-content title="CLI Google Cloud" level="h4" %}}
### Crear un tema y una suscripción Cloud Pub/Sub

#### Crear un tema

1. En la [página de temas Google Cloud Pub/Sub][61], haz clic en **CREATE TOPIC** (Crear tema).
2. Asigna un nombre descriptivo al tema.
3. **Desmarca** la opción de añadir una suscripción por defecto.
4. Haz clic en **CREATE** (Create).

#### Crear una suscripción

1. En la [página de suscripciones Google Cloud Pub/Sub][62], haz clic en **CREATE SUBSCRIPTION** (Crear suscripción).
2. Introduce `export-asset-changes-to-datadog` para el nombre de la suscripción.
3. Selecciona el tema Cloud Pub/Sub creado anteriormente.
4. Selecciona **Pull** como tipo de entrega.
5. Haz clic en **CREATE** (Create).

### Conceder acceso

Para leer desde esta suscripción Pub/Sub, la cuenta de servicio Google Cloud utilizada por la integración necesita el permiso `pubsub.subscriptions.consume` para la suscripción. Un rol predeterminado con permisos mínimos que permite esto es el rol **Suscriptor Pub/Sub**. Sigue los pasos que se indican a continuación para conceder este rol:

1. En la [página de suscripciones Google Cloud Pub/Sub][62], haz clic en la suscripción `export-asset-changes-to-datadog`.
2. En el **panel de información** situado a la derecha de la página, haz clic en la pestaña **Permisos**. Si no ves el panel de información, haz clic en **SHOW INFO PANEL** (Mostrar panel de información).
3. Haz clic en **ADD PRINCIPAL** (Añadir entidad).
4. Introduce el **correo electrónico de la cuenta de servicio** utilizada por la integración Datadog Google Cloud. Puedes encontrar una lista de las cuentas de servicio a la izquierda de la pestaña **Configuración** en la [página de la integración Google Cloud][43] en Datadog.

### Crear un flujo de recursos

Ejecuta el siguiente comando en [Cloud Shell][63] o la [CLI gcloud][64] para crear un flujo de Cloud Asset Inventory que envíe eventos de cambios al tema Pub/Sub creado anteriormente.

{{< tabs >}}

{{% tab "Project" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Actualiza los valores de los parámetros como se indica:

   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<PROJECT_ID>`: tu ID de proyecto de Google Cloud.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub vinculado a la suscripción `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.

[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{% tab "Folder" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Actualiza los valores de los parámetros como se indica:

   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<FOLDER_ID>`: Tu ID de carpeta de Google Cloud.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub vinculado a la suscripción `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Organización" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Actualiza los valores de los parámetros como se indica:

   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<ORGANIZATION_ID>`: Tu ID de organización de Google Cloud.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub vinculado a la suscripción `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" %}}
### Crear un flujo de recursos

Copia la siguiente plantilla de Terraform y sustituye los argumentos necesarios:

{{< tabs >}}
{{% tab "Proyecto" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_project_feed" "project_feed" {
  project      = local.project_id
  feed_id      = "<FEED_NAME>"
  content_type = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Actualiza los valores de los parámetros como se indica:

   - `<PROJECT_ID>`: tu ID de proyecto de Google Cloud.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub que se vinculará a la suscripción `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>`: Correo electrónico de la cuenta de servicio utilizada por la integración Datadog Google Cloud.
   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Carpeta" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>" 
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_folder_feed" "folder_feed" {
  billing_project = local.project_id
  folder          = "<FOLDER_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Actualiza los valores de los parámetros como se indica:

   - `<PROJECT_ID>`: tu ID de proyecto de Google Cloud.
   - `<FOLDER_ID>`: ID de la carpeta en la que debe crearse este flujo.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub que se vinculará a la suscripción `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>`: Correo electrónico de la cuenta de servicio utilizada por la integración Datadog Google Cloud.
   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Organización" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_organization_feed" "organization_feed" {
  billing_project = local.project_id
  org_id          = "<ORGANIZATION_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Actualiza los valores de los parámetros como se indica:

   - `<PROJECT_ID>`: tu ID de proyecto de Google Cloud.
   - `<TOPIC_NAME>`: Nombre del tema Pub/Sub que se vinculará a la suscripción `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>`: Correo electrónico de la cuenta de servicio utilizada por la integración Datadog Google Cloud.
   - `<ORGANIZATION_ID>`: Tu ID de organización de Google Cloud.
   - `<FEED_NAME>`: Nombre descriptivo del flujo de Cloud Asset Inventory.
   - `<ASSET_NAMES>`: Lista separada por comas de [nombres completos][1] de recursos de los que recibir eventos de cambios. **Opcional** si se especifica `asset-types`.
   - `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos][2] de los que recibir eventos de cambios. **Opcional** si se especifica `asset-names`.
   - `<CONTENT_TYPE>`: [Tipo de contenido][3] de recurso **opcional** del que recibir eventos de cambios.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

Datadog recomienda configurar el parámetro `asset-types` con la expresión regular `.*` para recopilar los cambios de todos los recursos.

**Nota**: Debes especificar al menos un valor para los parámetros `asset-names` o `asset-types`.

Para ver la lista completa de parámetros configurables, consulta la referencia para la [creación de flujos de recursos gcloud][65].

### Activar la recopilación de cambios de recursos

Haz clic en **Enable Resource Changes Collection** (Habilitar recopilación de cambios de recursos) en la [pestaña Recopilación de recursos][58] de la página de la integración Google Cloud.

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="Conmutador 'Habilitar recopilación de cambios de recursos' en el cuadro de la integración Datadog Google Cloud" popup="true" style="width:80%;">}}

#### Validación

Busca tus eventos de cambios de recursos en el [Explorador de eventos de Datadog][66].

## Private Service Connect 


{{< site-region region="us,us3,ap1,gov" >}}
<div class="alert alert-info">Private Service Connect sólo está disponible para los sitios US5 y EU de Datadog.</div>
{{< /site-region >}}


Utiliza la [integración Google Cloud Private Service Connect][29] para visualizar conexiones, datos transferidos y paquetes descartados a través de Private Service Connect. Esto te proporciona una visibilidad de las métricas importantes de tus conexiones de Private Service Connect, tanto para los productores como para los consumidores.
[Private Service Connect (PSC)][67] es un producto de red de Google Cloud que te permite acceder a [servicios de Google Cloud][68], a [servicios de socios externos][69] y a aplicaciones de propiedad de la empresa directamente desde tu Virtual Private Cloud (VPC).

Para obtener más información, consulta [Acceder a Datadog de forma privada y monitorizar tu uso de Google Cloud Private Service Connect][70] en el blog de Datadog.

## Datos recopilados

### Métricas

Para ver las métricas, consulta las páginas individuales de la integración Google Cloud.

#### Métricas acumulativas

Las métricas acumulativas se importan a Datadog con una métrica `.delta` para cada nombre de métrica. Una métrica acumulativa es una métrica cuyo valor aumenta constantemente con el tiempo. Por ejemplo, una métrica para `sent bytes` podría ser acumulativa. Cada valor registra el número total de bytes enviados por un servicio en ese momento. El valor delta representa el cambio desde la medición anterior.

Por ejemplo:

 `gcp.gke.container.restart_count` es una métrica ACUMULATIVA. Al importar esta métrica como una métrica acumulativa, Datadog añade la métrica `gcp.gke.container.restart_count.delta` que incluye los valores delta (a diferencia del valor agregado emitido como parte de la métrica ACUMULATIVA). Para obtener más información, consulta los [tipos de métricas de Google Cloud][71].

### Eventos

Todos los eventos de servicios generados por tu Google Cloud Platform se reenvían a tu [Explorador de eventos de Datadog][72].

### Checks de servicio

La integración Google Cloud Platform no incluye checks de servicios.

### Etiquetas (Tags)

Las etiquetas (tags) se asignan automáticamente en función de diferentes opciones de configuración de Google Cloud Platform y Google Compute Engine. La etiqueta (tag) `project_id` se añade a todas las métricas. Las etiquetas (tags) adicionales se recopilan de Google Cloud Platform cuando están disponibles y varían en función del tipo de métrica.

Además, Datadog recopila lo siguiente como etiquetas (tags):

- Cualquier host con las etiquetas (labels) `<key>:<value>`.
- Etiquetas (labels) personalizadas de Google Pub/Sub, GCE, Cloud SQL y Cloud Storage.

## Solucionar problemas

### ¿Metadatos incorrectos para las métricas _gcp.logging_ definidas por el usuario?

En el caso de las métricas _gcp.logging_ no estándar, como las métricas que van más allá de las [métricas de generación de logs predefinidas de Datadog][73], es posible que los metadatos aplicados no se correspondan con Google Cloud Logging.

En estos casos, los metadatos deben definirse manualmente yendo a la [página de resumen de métricas][74], buscando y seleccionando la métrica en cuestión, y haciendo clic en el icono del lápiz situado junto a los metadatos.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][75].

## Referencias adicionales
Documentación útil adicional, enlaces y artículos:

- [Mejorar el cumplimiento y la postura de seguridad de tu entorno Google Cloud con Datadog][76].
- [Monitorizar Google Cloud Vertex AI con Datadog][77]
- [Monitorizar tus pipelines Dataflow con Datadog][78]
- [Crear y gestionar tu integración Google Cloud con Terraform][79]
- [Monitorizar BigQuery con Datadog][80]
- [Solucionar más rápidamente los cambios en la infraestructura con Cambios recientes del Catálogo de recursos][81]
- [Transmitir logs desde Google Cloud a Datadog][82]


[1]: https://docs.datadoghq.com/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/integrations/google_cloud_bigquery/
[3]: https://docs.datadoghq.com/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/integrations/google_cloud_armor/
[7]: https://docs.datadoghq.com/integrations/google_cloud_composer/
[8]: https://docs.datadoghq.com/integrations/google_cloud_dataproc/
[9]: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
[10]: https://docs.datadoghq.com/integrations/google_cloud_filestore/
[11]: https://docs.datadoghq.com/integrations/google_cloud_firestore/
[12]: https://docs.datadoghq.com/integrations/google_cloud_interconnect/
[13]: https://docs.datadoghq.com/integrations/google_cloud_iot/
[14]: https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/
[15]: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
[16]: https://docs.datadoghq.com/integrations/google_cloud_redis/
[17]: https://docs.datadoghq.com/integrations/google_cloud_router/
[18]: https://docs.datadoghq.com/integrations/google_cloud_run/
[19]: https://docs.datadoghq.com/integrations/google_cloud_security_command_center/
[20]: https://docs.datadoghq.com/integrations/google_cloud_tasks/
[21]: https://docs.datadoghq.com/integrations/google_cloud_tpu/
[22]: https://docs.datadoghq.com/integrations/google_compute_engine/
[23]: https://docs.datadoghq.com/integrations/google_container_engine/
[24]: https://docs.datadoghq.com/integrations/google_cloud_datastore/
[25]: https://docs.datadoghq.com/integrations/google_cloud_firebase/
[26]: https://docs.datadoghq.com/integrations/google_cloud_functions/
[27]: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
[28]: https://docs.datadoghq.com/integrations/google_cloud_ml/
[29]: https://docs.datadoghq.com/integrations/google_cloud_private_service_connect/
[30]: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
[31]: https://docs.datadoghq.com/integrations/google_cloud_spanner/
[32]: https://docs.datadoghq.com/integrations/google_cloud_storage/
[33]: https://docs.datadoghq.com/integrations/google_cloud_vertex_ai/
[34]: https://docs.datadoghq.com/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[36]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[37]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[38]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[39]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[40]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[41]: https://docs.datadoghq.com/cloud_cost_management/setup/google_cloud/
[42]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[43]: https://app.datadoghq.com/integrations/google-cloud-platform
[44]: https://cloud.google.com/compute/docs/labeling-resources
[45]: https://docs.datadoghq.com/agent/
[46]: https://docs.datadoghq.com/data_security/data_retention_periods/
[47]: https://docs.datadoghq.com/integrations/gke/
[48]: https://docs.datadoghq.com/tracing/
[49]: https://docs.datadoghq.com/logs/
[50]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[51]: https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[52]: https://console.cloud.google.com/iam-admin/
[53]: https://app.datadoghq.com/datasets/tables/explore
[54]: https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer
[55]: https://console.cloud.google.com/bigquery
[56]: https://app.datadoghq.com/logs/pipelines/indexes
[57]: https://www.datadoghq.com/pricing/?product=log-management#products
[58]: https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources
[59]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[60]: https://app.datadoghq.com/event/explorer
[61]: https://console.cloud.google.com/cloudpubsub/topicList
[62]: https://console.cloud.google.com/cloudpubsub/subscription/
[63]: https://cloud.google.com/shell
[64]: https://cloud.google.com/sdk/gcloud
[65]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[66]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[67]: https://cloud.google.com/vpc/docs/private-service-connect
[68]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[69]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[70]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[71]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[72]: https://app.datadoghq.com/event/stream
[73]: https://docs.datadoghq.com/integrations/google_stackdriver_logging/#metrics
[74]: https://app.datadoghq.com/metric/summary
[75]: https://docs.datadoghq.com/help/
[76]: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
[77]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[78]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[79]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[80]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[81]: https://www.datadoghq.com/blog/recent-changes-tab/
[82]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
