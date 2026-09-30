---
aliases:
- /es/integrations/google_cloud_platform
app_id: google-cloud-platform
categories:
- nube
- google cloud
- iot
- recopilación de logs
- red
custom_kind: integración
description: Google Cloud Platform es un conjunto de servicios web que juntos conforman
  una plataforma de computación en la nube.
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: blog
  text: Mejorar la conformidad y la seguridad de tu entorno de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: blog
  text: Monitorizar Google Cloud Vertex AI con Datadog
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: blog
  text: Monitorización de tus pipelines de Dataflow con Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  tag: otros
  text: Google Cloud Platform
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: blog
  text: Monitorizar BigQuery con Datadog
- link: https://www.datadoghq.com/blog/recent-changes-tab/
  tag: blog
  text: Solucionar los cambios en la infraestructura de forma más rápida con Recent
    Changes en el Resource Catalog
media: []
title: Google Cloud Platform
---
## Información general

Utiliza esta guía para empezar a monitorizar tu entorno de Google Cloud. Esta estrategia simplifica la configuración de los entornos de Google Cloud con varios proyectos, lo que te permite maximizar la cobertura de la monitorización.

{{% collapse-content title="Consultar la lista completa de integraciones Google Cloud" level="h4" %}}

<div class="alert alert-warning">
La integración Google Cloud de Datadog recopila <a href="https://cloud.google.com/monitoring/api/metrics_gcp">todas las métricas de Google Cloud</a>. Datadog actualiza continuamente los documentos para mostrar todas las integraciones dependientes, pero la lista de integraciones a veces queda atrasada con respecto a las últimas métricas y servicios en la nube.

Si no ves una integración para un servicio Google Cloud específico, ponte en contacto con <a href="https://www.datadoghq.com/support/">el servicio de asistencia de Datadog </a>.

</div>

| Integración                         | Descripción                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine](https://docs.datadoghq.com/integrations/google-app-engine/)                     | PaaS (plataforma como servicio) para crear aplicaciones escalables                           |
| [BigQuery](https://docs.datadoghq.com/integrations/google-cloud-bigquery/)                       | Almacén de datos empresariales                                                             |
| [Bigtable](https://docs.datadoghq.com/integrations/google-cloud-bigtable/)                       | Servicio de base de datos NoSQL Big Data                                                       |
| [Cloud SQL](https://docs.datadoghq.com/integrations/google-cloudsql/)                      | Servicio de base de datos MySQL                                                                |
| [API en la nube](https://docs.datadoghq.com/integrations/google-cloud-apis/)                     | Interfaces programáticas para todos los servicios de Google Cloud Platform                        |
| [Cloud Armor](https://docs.datadoghq.com/integrations/google-cloud-armor/)                   | Servicio de seguridad de red para proteger contra ataques de denegación de servicio y ataques web    |
| [Cloud Composer](https://docs.datadoghq.com/integrations/google-cloud-composer/)                 | Servicio de orquestación del flujo de trabajo totalmente gestionado                                        |
| [Cloud Dataproc](https://docs.datadoghq.com/integrations/google-cloud-dataproc/)                 | Servicio de nube para la ejecución de clústeres Apache Spark y Apache Hadoop                   |
| [Cloud Dataflow](https://docs.datadoghq.com/integrations/google-cloud-dataflow/)                | Servicio totalmente gestionado para transformar y enriquecer datos en los modos de flujo (stream) y lote. |
| [Cloud Filestore](https://docs.datadoghq.com/integrations/google-cloud-filestore/)                | Almacenamiento de archivos totalmente gestionado y de alto rendimiento                                          |
| [Cloud Firestore](https://docs.datadoghq.com/integrations/google-cloud-firestore/)                | Base de datos flexible y escalable para el desarrollo móvil, web y de servidor                 |
| [Cloud Interconnect](https://docs.datadoghq.com/integrations/google-cloud-interconnect/)            | Conectividad híbrida                                                                   |
| [Cloud IoT](https://docs.datadoghq.com/integrations/google-cloud-iot/)                     | Conexión y gestión seguras de dispositivos                                               |
| [Cloud Load Balancing](https://docs.datadoghq.com/integrations/google-cloud-loadbalancing/)          | Distribuir recursos informáticos de carga balanceada                                            |
| [Cloud Logging](https://docs.datadoghq.com/integrations/google-stackdriver-logging/)                 | Gestión y análisis de logs en tiempo real                                                 |
| [Cloud Memorystore for Redis](https://docs.datadoghq.com/integrations/google-cloud-redis/)   | Servicio de almacenamiento de datos en memoria totalmente gestionado                                          |
| [Cloud Router](https://docs.datadoghq.com/integrations/google-cloud-router/)                  | Intercambiar rutas entre tu VPC y las redes on-premises mediante BGP                |
| [Cloud Run](https://docs.datadoghq.com/integrations/google-cloud-run/)                     | Plataforma de computación gestionada que ejecuta contenedores sin estado a través de HTTP                  |
| [Cloud Security Command Center](https://docs.datadoghq.com/integrations/google-cloud-security-command-center/) | Security Command Center es un servicio de información sobre amenazas                                |
| [Cloud Tasks](https://docs.datadoghq.com/integrations/google-cloud-tasks/)                   | Colas de tareas distribuidas                                                               |
| [Cloud TPU](https://docs.datadoghq.com/integrations/google-cloud-tpu/)                     | Entrenar y ejecutar modelos de Machine Learning                                                  |
| [Compute Engine](https://docs.datadoghq.com/integrations/google-compute-engine/)                | Máquinas virtuales de alto rendimiento                                                     |
| [Container Engine](https://docs.datadoghq.com/integrations/google-container-engine/)              | Kubernetes, gestionado por Google                                                         |
| [Datastore](https://docs.datadoghq.com/integrations/google-cloud-datastore/)                     | Base de datos NoSQL                                                                        |
| [Firebase](https://docs.datadoghq.com/integrations/google-cloud-firebase/)                      | Plataforma móvil para el desarrollo de aplicaciones                                           |
| [Functions](https://docs.datadoghq.com/integrations/google-cloud-functions/)                     | Plataforma serverless para crear microservicios basados en eventos                            |
| [Kubernetes Engine](https://docs.datadoghq.com/integrations/google-kubernetes-engine/)             | Gestor de clústeres y sistema de orquestación                                              |
| [Machine Learning](https://docs.datadoghq.com/integrations/google-cloud-ml/)              | Servicios de Machine Learning                                                             |
| [Private Service Connect](https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/)       | Servicios de acceso gestionado con conexiones VPC privadas                                  |
| [Pub/Sub](https://docs.datadoghq.com/integrations/google-cloud-pubsub/)                       | Servicio de mensajería en tiempo real                                                           |
| [Spanner](https://docs.datadoghq.com/integrations/google-cloud-spanner/)                       | Servicio de base de datos relacional de escalabilidad horizontal y coherencia global               |
| [Storage](https://docs.datadoghq.com/integrations/google-cloud-storage/)                       | Almacenamiento unificado de objetos                                                                |
| [Vertex AI](https://docs.datadoghq.com/integrations/google-cloud-vertex-ai/)                     | Crear, entrenar y desplegar modelos personalizados de Machine Learning (ML)                          |
| [VPN](https://docs.datadoghq.com/integrations/google-cloud-vpn/)                           | Funcionalidad gestionada de red                                                         |

{{% /collapse-content %}}

## Configuración

Configura la integración Google Cloud en Datadog para recopilar métricas y logs de tus servicios Google Cloud.

### Requisitos previos

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1\. Si tu organización restringe las identidades por dominio, debes añadir la identidad de cliente de Datadog como valor autorizado en tu política. Identidad de cliente de Datadog: `C0147pk0i`
{{< /site-region >}}

{{< site-region region="gov" >}}
1\. Si tu organización restringe las identidades por dominio, debes añadir la identidad de cliente de Datadog como valor autorizado en tu política. Identidad de cliente de Datadog: `C03lf3ewa`
{{< /site-region >}}

2\. La suplantación de cuentas de servicio y la detección automática de proyectos dependen de que tengas habilitados ciertos roles y API para monitorizar proyectos. Antes de empezar, asegúrate de que las siguientes API están habilitadas para **cada uno de los proyectos** que quieres monitorizar:

[API de monitorización de la nube](https://console.cloud.google.com/apis/library/monitoring.googleapis.com)
: Permite a Datadog consultar datos de métricas de Google Cloud.

[API de Compute Engine](https://console.cloud.google.com/apis/library/compute.googleapis.com)
: Permite a Datadog detectar datos de instancias de cálculo.

[API de recursos en la nube](https://console.cloud.google.com/apis/library/cloudasset.googleapis.com)
: Permite a Datadog solicitar recursos de Google Cloud y vincular etiquetas (labels) relevantes a métricas como etiquetas (tags).

[API del gestor de recursos en la nube](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
: Permite a Datadog añadir métricas con los recursos y etiquetas (tags) correctos.

[API IAM](https://console.cloud.google.com/apis/library/iam.googleapis.com)
: Permite a Datadog autenticarse con Google Cloud.

[API de facturación de la nube](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
: Permite a los desarrolladores gestionar la facturación de sus proyectos de Google Cloud Platform mediante programación. Consulta la documentación [Cloud Cost Management (CCM)](https://docs.datadoghq.com/cloud_cost_management/setup/google_cloud/) para obtener más información.

3\. Asegúrate de que los proyectos que se están monitorizando no están configurados como [proyectos de contexto](https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.) que extraen métricas de otros múltiples proyectos.

### Recopilación de métricas

#### Instalación

{{< tabs >}}

{{% tab "Detección de proyectos a nivel de organización y de carpeta" %}}

Se recomienda la monitorización a nivel de organización (o a nivel de carpeta) para una cobertura completa de todos los proyectos, incluidos los futuros proyectos que puedan crearse en una organización o carpeta.

**Nota**: Tu cuenta de usuario de [Google Cloud Identity](https://cloud.google.com/identity/docs/overview) debe tener asignado el rol `Admin` en el contexto deseado para completar la configuración en Google Cloud (por ejemplo, `Organization Admin`).

{{% collapse-content title="1. Crear una cuenta de servicio de Google Cloud en el proyecto por defecto" level="h5" %}}

1. Abre tu [consola de Google Cloud](https://console.cloud.google.com/).
1. Ve a **IAM & Admin** > **Cuentas de servicio**.
1. Haz clic en **Create service account** (Crear cuenta de servicio) en la parte superior.
1. Asigna un nombre único a la cuenta de servicio.
1. Haz clic en **Done** (Listo) para finalizar la creación de la cuenta de servicio.

{{% /collapse-content %}}

{{% collapse-content title="2. Añadir la cuenta de servicio a nivel de organización o de carpeta" level="h5" %}}

1. En la consola de Google Cloud, ve a la página **IAM**.
1. Selecciona una carpeta u organización.
1. Para conceder un rol a una entidad que aún no tenga otros roles en el recurso, haz clic en **Grant Access** (Conceder acceso) e introduce el correo electrónico de la cuenta de servicio que creaste anteriormente.
1. Introduce la dirección de correo electrónico de la cuenta de servicio.
1. Asigna los siguientes roles:

- [Visor de cálculos](https://cloud.google.com/compute/docs/access/iam#compute.viewer) proporciona acceso de **solo lectura** para obtener y enumerar recursos de Compute Engine
- [Visor de monitorización](https://cloud.google.com/monitoring/access-control#monitoring_roles) proporciona acceso de **solo lectura** a los datos de monitorización disponibles en tu entorno de Google Cloud
- [Visor de recursos en la nube](https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer) proporciona acceso de **solo lectura** a los metadatos de recursos en la nube
- [Navegador](https://cloud.google.com/resource-manager/docs/access-control-proj#browser) proporciona **acceso de solo lectura** para navegar por la jerarquía de un proyecto
- [Consumidor del uso de servicios](https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer) (**opcional**, para entornos con varios proyectos) proporciona una [asignación de costes por proyecto y de cuotas de API](#enable-per-project-cost-and-api-quota-attribution) una vez que esta función haya sido activada por el servicio de asistencia de Datadog.

6. Haz clic en **Save** (Guardar).

**Nota**: El rol `Browser` sólo es necesario en el proyecto por defecto proyecto de la cuenta de servicio. Otros proyectos sólo requieren los otros roles mencionados.

{{% /collapse-content %}}

{{% collapse-content title="3. Añadir el elemento principal de Datadog a tu cuenta de servicio" level="h5" %}}

**Nota**: Si previamente configuraste el acceso utilizando una entidad compartida de Datadog, puedes revocar el permiso de esa entidad después de completar estos pasos.

1. En Datadog, ve a **Integrations** > [**Google Cloud Platform**] Integraciones > Google Cloud Platform) (https://app.datadoghq.com/integrations/google-cloud-platform).
1. Haz clic en **Add Google Cloud Account** (Añadir cuenta de Google Cloud).
   Si no tienes proyectos configurados, se te redirigirá automáticamente a esta página.
1. Copia tu entidad de Datadog y guárdala para la siguiente sección.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Página para añadir una nueva cuenta de Google Cloud, en el cuadro de la integración Google Cloud de Datadog" style="width:70%;">}}

**Nota**: Mantén esta ventana abierta para la sección 4.

4. En la [consola de Google Cloud](https://console.cloud.google.com/), en el menú **Service Accounts** (Cuentas de servicio), busca la cuenta de servicio que creaste en la sección 1.
1. Ve a la pestaña **Permisos** y haz clic en **Grant Access** (Conceder acceso).

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interfaz de la consola de Google Cloud que muestra la pestaña Permisos en Cuentas de servicio." style="width:70%;">}}

6. Pega tu entidad de Datadog en el cuadro de texto **Nuevas entidades**.
1. Asigna el rol de **Creador de token de cuenta de servicio**.
1. Haz clic en **Save** (Guardar).

{{% /collapse-content %}}

{{% collapse-content title="4. Finalizar la configuración de la integración en Datadog" level="h5" %}}

1. En su consola de Google Cloud, ve a la pestaña **Cuenta de servicio** > **Detalles**. En esta página, busca el correo electrónico asociado a esta cuenta de servicio de Google. Tiene el formato `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
1. Copia este correo electrónico.
1. Vuelve al cuadro de configuración de la integración en Datadog (donde copiaste tu entidad de Datadog en la sección anterior).
1. Pega el correo electrónico que copiaste en **Añadir correo electrónico de cuenta de servicio**.
1. Haz clic en **Verify and Save Account** (Verificar y guardar cuenta).

{{% /collapse-content %}}

Las métricas aparecen en Datadog aproximadamente **15 minutos** después de la configuración.

#### Prácticas recomendadas para monitorizar varios proyectos

##### Permitir la asignación de costes y cuotas de API por proyecto 

Por defecto, Google Cloud asigna el coste de monitorización de llamadas de API, así como el uso de cuotas de API, al proyecto que contiene la cuenta de servicio de esta integración. Como práctica recomendada para entornos Google Cloud con varios proyectos, habilita la asignación de costes por proyecto de monitorización de las llamadas de API y del uso de cuotas de API. Con esta opción habilitada, los costes y el uso de cuotas se asignan al proyecto que se *consulta*, en lugar del proyecto que contiene la cuenta de servicio. Esto proporciona visibilidad de los costes de monitorización generados por cada proyecto y también ayuda a prevenir que se alcancen los límites de tasa de API.

Para habilitar esta función:

1. Asegúrate de que la cuenta de servicio Datadog tiene el rol [Consumidor de uso de servicios](https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer) en el contexto deseado (carpeta u organización).
1. Haz clic en el conmutador **Enable Per Project Quota** (Habilitar cuota por proyecto) en la pestaña **Projects** (Proyectos) de la [página de la integración Google Cloud](https://app.datadoghq.com/integrations/google-cloud-platform).

{{% /tab %}}

{{% tab "Project-level metric collection" %}}

Puedes utilizar la [suplantación de cuentas de servicio](https://cloud.google.com/iam/docs/service-account-impersonation) y la detección automática de proyectos para integrar Datadog con [Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/).

Este método te permite monitorizar todos los proyectos visibles para una cuenta de servicio, asignando roles IAM en los proyectos pertinentes. Puedes asignar estos roles a proyectos individualmente o puedes configurar Datadog para monitorizar grupos de proyectos, asignando estos roles a nivel de organización o de carpeta. Asignar roles de esta manera permite a Datadog detectar automáticamente y monitorizar todos los proyectos en el contexto determinado, incluyendo los nuevos proyectos que puedan añadirse al grupo en el futuro. 

{{% collapse-content title="1. Crear una cuenta de servicio de Google Cloud" level="h5" id="create-service-account" %}}

1. Abre tu [consola de Google Cloud](https://console.cloud.google.com/).
1. Ve a **IAM & Admin** > **Cuentas de servicio**.
1. Haz clic en **Create service account** (Crear cuenta de servicio) en la parte superior.
1. Asigna un nombre único a la cuenta de servicio y haz clic en **Create and continue** (Crear y continuar).
1. Añade los siguientes roles a la cuenta de servicio:
   - [Visor de monitorización](https://cloud.google.com/monitoring/access-control#monitoring_roles) proporciona acceso de **solo lectura** a los datos de monitorización disponibles en tu entorno de Google Cloud
   - [Visor de cálculos](https://cloud.google.com/compute/docs/access/iam#compute.viewer) proporciona acceso de **solo lectura** para obtener y enumerar recursos de Compute Engine
   - [Visor de recursos en la nube](https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer) proporciona acceso de **solo lectura** a los metadatos de recursos en la nube
   - [Navegador](https://cloud.google.com/resource-manager/docs/access-control-proj#browser) proporciona **acceso de solo lectura** para detectar proyectos accesibles
1. Haz clic en **Continue** (Continuar) y luego en **Done** (Listo) para finalizar la creación de la cuenta de servicio.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Interfaz de la consola de Google Cloud que muestra el flujo 'Crear cuenta de servicio'. En 'Conceder a esta cuenta de servicio acceso al proyecto', se añaden los cuatro roles de la instrucción." style="width:70%;">}}

{{% /collapse-content %}}

{{% collapse-content title="2. Añadir la entidad de Datadog a tu cuenta de servicio" level="h5" id="add-principal-to-service-account" %}}

1. En Datadog, ve a [**Integrations** > **Google Cloud Platform** (Integraciones > Google Cloud Platform)] (https://app.datadoghq.com/integrations/google-cloud-platform).

1. Haz clic en **Add GCP Account** (Añadir cuenta de GCP). Si no tienes proyectos configurados, se te redirigirá automáticamente a esta página.

1. Si no generaste una entidad de Datadog para tu organización, haz clic en el botón **Generate Principal** (Generar entidad).

1. Copia tu entidad de Datadog y guárdala para la siguiente sección.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interfaz Datadog que muestra el flujo 'Añadir nueva cuenta de GCP'. El primer paso, 'Añadi entidad de Datadog a Google', presenta un cuadro de texto donde un usuario puede generar una entidad de Datadog y copiarla en su portapapeles. El segundo paso, 'Añadir correo electrónico de la cuenta de servicio', presenta un cuadro de texto que el usuario puede rellenar en la sección 3." style="width:70%;">}}

   **Nota**: Mantén esta ventana abierta para la siguiente sección.

1. En la [consola de Google Cloud](https://console.cloud.google.com/), en el menú **Service Accounts** (Cuentas de servicio), busca la cuenta de servicio que creaste en la [primera sección](#create-service-account).

1. Ve a la pestaña **Permisos** y haz clic en **Grant Access** (Conceder acceso).
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interfaz de la consola de Google Cloud que muestra la pestaña Permisos en Cuentas de servicio." style="width:70%;">}}

1. Pega tu entidad de Datadog en el cuadro de texto **Nuevas entidades**.

1. Asigna el rol de **Creador de token de cuenta de servicio** y haz clic en **SAVE** (Guardar).
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Interfaz de la consola de Google Cloud que muestra el cuadro 'Añadir entidades' y la interfaz 'Asignar roles'." style="width:70%;">}}

**Nota**: Si previamente configuraste el acceso utilizando una entidad compartida de Datadog, puedes revocar el permiso de esa entidad después de completar estos pasos.

{{% /collapse-content %}}

{{% collapse-content title="3. Finalizar la configuración de la integración en Datadog" level="h5" %}}

1. En tu consola de Google Cloud, ve a la pestaña **Cuenta de servicio** > **Detalles**. Una vez allí, busca el correo electrónico asociado a esta cuenta de servicio de Google. Tiene un formato parecido a `<sa-name>@<project-id>.iam.gserviceaccount.com`.
1. Copia este correo electrónico.
1. Vuelve al cuadro de configuración de la integración en Datadog [donde copiaste tu entidad de Datadog en la sección anterior](#add-principal-to-service-account)).
1. En el cuadro **Añadir correo electrónico de cuenta de servicio**, pega el correo electrónico que copiaste anteriormente.
1. Haz clic en **Verify and Save Account** (Verificar y guardar cuenta).

En aproximadamente quince minutos, las métricas aparecerán en Datadog.

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### Validación

Para ver tus métricas, utiliza el menú de la izquierda para ir a **Métricas** > **Resumen** y busca `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="Página de resumen de métricas en Datadog filtrada para mostrar las métricas que empiezan con GCP" style="width:100%;" >}}

#### Configuración

{{% collapse-content title="Limitar la recopilación de métricas por espacio de nombres de métricas" level="h5" %}}

Opcionalmente, puedes elegir qué servicios de Google Cloud monitorizar con Datadog. La configuración de la recopilación de métricas de servicios específicos de Google te permite optimizar los costes de la API de monitorización de Google Cloud y, al mismo tiempo, conservar la visibilidad de tus servicios críticos.

En la pestaña **Metric Collection** (Recopilación de métricas) de la [página de la integración Google Cloud](https://app.datadoghq.com/integrations/google-cloud-platform) de Datadog, desmarca los espacios de nombres de métricas que quieres excluir. También puedes desactivar la recopilación de todos los espacios de nombres de métricas.

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="Pestaña de recopilación de métricas en la página de la integración de Datadog y Google Cloud" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por etiqueta (tag)" level="h5" %}}

Por defecto, verás todas tus instancias de Google Compute Engine (GCE) en la información general de la infraestructura Datadog. Datadog las etiqueta automáticamente con etiquetas (tags) de host GCE y con cualquier etiqueta (label) GCE que hayas añadido.

Opcionalmente, puedes utilizar etiquetas (tags) para limitar las instancias que se extraen en Datadog. En la pestaña **Recopilación de métricas** del proyecto, introduce las etiquetas (tags) en el cuadro de texto **Limitar filtros de recopilación de métricas**. Sólo se importarán a Datadog los hosts que coincidan con una de las etiquetas (tags) definidas. Puedes utilizar comodines (`?` para un solo carácter, `*` para varios caracteres), para buscar varios hosts coincidentes, o `!`, para excluir determinados hosts. Este ejemplo incluye todas las instancias de tamaño `c1*`, pero excluye los hosts de staging:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Para obtener más información, consulta la página [Organizar recursos mediante etiquetas (labels)](https://cloud.google.com/compute/docs/labeling-resources).

{{% /collapse-content %}}

#### Aprovechar las ventajas del Datadog Agent

Utiliza el [Datadog Agent ](https://docs.datadoghq.com/agent/) para recopilar las [métricas de baja latencia más específicas](https://docs.datadoghq.com/data_security/data_retention_periods/) de tu infraestructura. Instala el Agent en cualquier host, incluido [GKE](https://docs.datadoghq.com/integrations/google-kubernetes-engine/), para obtener información más detallada de las [trazas (traces)](https://docs.datadoghq.com/tracing/) y los [logs](https://docs.datadoghq.com/logs/) que puede recopilar. Para obtener más información, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?](https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/)

## Recopilación de logs

{{< tabs >}}

{{% tab "Método de flujo de datos (recomendado)" %}}

Reenvía los logs de tus servicios de Google Cloud a Datadog utilizando [Google Cloud Dataflow](https://cloud.google.com/dataflow) y la [plantilla de Datadog](https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog). Este método permite comprimir y agrupar los eventos antes de reenviarlos a Datadog.

Puedes utilizar el módulo [terraform-gcp-datadog-integration](https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration) para gestionar esta infraestructura a través de Terraform, o seguir las instrucciones de esta sección para:

1. Crear un [tema](https://docs.datadoghq.com/integrations/google-cloud-pubsub/) y una [suscripción pull](https://cloud.google.com/pubsub/docs/create-subscription) Pub/Sub para recibir logs de un sumidero de logs configurado
1. Crear una cuenta de servicio del worker de Dataflow personalizada para proporcionar [mínimo privilegio](https://www.datadoghq.com/blog/datadog-recommended-monitors/) a tus workers del pipeline de Dataflow
1. Crear un [sumidero de logs](https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink) para publicar logs en el tema Pub/Sub
1. Crear un trabajo de Dataflow utilizando la [plantilla de Datadog](https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog) para transmitir logs desde la suscripción Pub/Sub a Datadog

Tienes un control total sobre qué logs se envían a Datadog a través de los filtros de generación de logs que creas en el sumidero de logs, incluidos los logs de GCE y GKE. Consulta la página [Lenguaje de consulta de generación de logs](https://cloud.google.com/logging/docs/view/logging-query-language) de Google para obtener información sobre la escritura de filtros. Para un examen detallado de la arquitectura creada, consulta [Transmitir logs desde Google Cloud a Datadog](https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog) en el Centro de arquitectura de la nube.

**Nota**: Debea habilitar la **API de flujo de datos** para utilizar Google Cloud Dataflow. Consulta [Habilitación de las API](https://cloud.google.com/apis/docs/getting-started#enabling_apis) en la documentación de Google Cloud para obtener más información.

Para recopilar logs de aplicaciones que se ejecutan en GCE o GKE, también puedes utilizar el [Datadog Agent](https://docs.datadoghq.com/agent/).

#### 1. Crear un tema y una suscripción Cloud Pub/Sub

1. Ve a la [consola de Cloud Pub/Sub](https://console.cloud.google.com/cloudpubsub/topicList) y crea un nuevo tema. Selecciona la opción **Add a default subscription** (Añadir una suscripción por defecto) para simplificar la configuración.

   **Nota**: También puedes configurar manualmente una [suscripción Cloud Pub/Sub](https://console.cloud.google.com/cloudpubsub/subscription/) con el tipo de entrega **Pull**. Si creas tu suscripción Pub/Sub manualmente, deja la casilla `Enable dead lettering` **desmarcada**. Para obtener más información, consulta [Funciones de Pub/Sub no compatibles](https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer).

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Página Crear un tema en la consola de Google Cloud con la casilla Añadir una suscripción por defecto seleccionada" style="width:80%;">}}

2. Proporciona un nombre explícito para ese tema como `export-logs-to-datadog` y haz clic en **Create** (Crear).

1. Crea un tema adicional y una suscripción por defecto para gestionar cualquier mensaje de log rechazado por la API de Datadog. El nombre de este tema se utiliza en la plantilla de Datadog Dataflow como parte de la configuración de la ruta para el [parámetro de plantilla](https://cloud.google.com/apis/docs/getting-started#enabling_apis) `outputDeadletterTopic`. Una vez que hayas inspeccionado y corregido cualquier problema en los mensajes fallidos, reenvíalos al tema `export-logs-to-datadog` original ejecutando un trabajo de [plantilla Pub/Sub a Pub/Sub](https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub).

1. Datadog recomienda crear un secreto en [Secret Manager](https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/) con el valor válido de tu clave de API de Datadog, para utilizarlo posteriormente en la plantilla de Datadog Dataflow.

**Advertencia**: Las Cloud Pub/Subs están sujetas a [cuotas y limitaciones de Google Cloud](https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink). Si el número de logs que tienes supera estas limitaciones, Datadog te recomienda dividir tus logs en diferentes temas. Para obtener información sobre cómo configurar tus notificaciones de monitor si te acercas a esos límites, consulta la [sección Monitorizar el reenvío de logs Pub/Sub](#monitor-the-cloud-pubsub-log-forwarding).

#### 2. Crear una cuenta de servicio de worker de Dataflow personalizada

El comportamiento predeterminado de los workers de pipelines de Dataflow consiste en utilizar la [cuenta de servicio de Compute Engine por defecto](https://console.cloud.google.com/dataflow/createjob) de tu proyecto, que concede permisos a todos los recursos del proyecto. Si estás reenviando logs desde un entorno de **Producción**, deberías crear una cuenta de servicio de worker personalizada con solo los roles y permisos necesarios, y asignar esta cuenta de servicio a tus workers de pipelines de Dataflow.

1. Ve a la página [Cuentas de servicio](https://console.cloud.google.com/iam-admin/serviceaccounts) en la consola de Google Cloud y selecciona tu proyecto.
1. Haz clic en **CREATE SERVICE ACCOUNT** (Crear cuenta de servicio) y asigna un nombre descriptivo a la cuenta de servicio. Haz clic en **CREATE AND CONTINUE** (Crear y continuar).
1. Añade los roles en la tabla de permisos necesarios y haz clic en **DONE** (Listo).

##### Permisos necesarios

[Administrador de Dataflow](https://cloud.google.com/kms/docs)
: `roles/dataflow.admin` <br> Permite que esta cuenta de servicio realice tareas administrativas de Dataflow.

[Worker de Dataflow](https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared)
: `roles/dataflow.worker` <br> Permite que esta cuenta de servicio realice operaciones de trabajos de Dataflow.

[Visor Pub/Sub](https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker)
: `roles/pubsub.viewer` <br> Permite que esta cuenta de servicio vea mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Suscriptor Pub/Sub](https://console.cloud.google.com/logs/viewer)
: `roles/pubsub.subscriber` <br> Permite que esta cuenta de servicio consuma mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Editor de Pub/Sub](https://cloud.google.com/dataflow)
: `roles/pubsub.publisher`<br> Permite que esta cuenta de servicio publique mensajes fallidos en una suscripción independiente, lo que permite analizar o reenviar los logs.

[Secret Manager Secret Accessor](https://cloud.google.com/logging/docs/view/logging-query-language#sample)
: `roles/secretmanager.secretAccessor` <br> Permite que esta cuenta de servicio acceda a la clave de API de Datadog en Secret Manager.

[Administrador de objetos de almacenamiento](https://app.datadoghq.com/logs)
: `roles/storage.objectAdmin`<br> Permite que esta cuenta de servicio lea y escriba en el bucket de almacenamiento en la nube especificado para archivos de staging.

**Nota**: Si no creas una cuenta de servicio personalizada para los workers de pipelines de Dataflow, asegúrate de que la cuenta de servicio predeterminada de Compute Engine tenga los permisos requeridos anteriores.

#### 3. Exportar logs desde un tema Google Cloud Pub/Sub

1. Ve a la [página del Logs Explorer](https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber) en la consola de Google Cloud.

1. En la pestaña de **Log Router** (Enrutador de logs), selecciona **Create Sink** (Crear sumidero de datos).

1. Indica un nombre para el sumidero de datos.

1. Elige _Cloud Pub/Sub_ como destino y selecciona el tema Cloud Pub/Sub creado para tal fin. **Nota**: El tema Cloud Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Elige los logs que quieres incluir en el sumidero con un filtro opcional de inclusión o exclusión. Puedes filtrar los logs con una consulta de búsqueda o utilizar la [función de muestreo](https://cloud.google.com/pubsub/docs/create-subscription). Por ejemplo, para incluir solo el 10% de los logs con un nivel de `severity` de `ERROR`, crea un filtro de inclusión con `severity="ERROR" AND sample(insertId, 0.1)`.

   {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="Filtro de inclusión de un sumidero de generación de logs de Google Cloud con una consulta de gravedad=ERROR y muestra(insertId, 0.1)" >}}

1. Haz clic en **Create Sink** (Crear sink).

**Nota**: Es posible crear varias exportaciones desde Google Cloud Logging al mismo tema Cloud Pub/Sub con diferentes sumideros.

#### 4. Crear y ejecutar el trabajo de Dataflow

1. Ve a la página [Crear trabajo a partir de una plantilla](https://console.cloud.google.com/dataflow/createjob) en la consola de Google Cloud.

1. Asigna un nombre al trabajo y selecciona un endpoint regional de Dataflow.

1. Selecciona `Pub/Sub to Datadog` en el desplegable **Plantilla de Dataflow**. Aparecerá la sección **Parámetros requeridos**.
   a. Selecciona la suscripción de entrada en el desplegable **Suscripción de entrada Pub/Sub**.
   b. Introduce lo siguiente en el campo **URL de la API de logs de Datadog**:

   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **Nota**: Asegúrate de que el selector de sitios de Datadog a la derecha de la página está configurado con tu [sitio de Datadog](https://console.cloud.google.com/logs/viewer) antes de copiar la URL de arriba.

   c. Selecciona el tema creado para recibir fallos de mensajes en el desplegable **Tema Pub/Sub de salida de mensajes muertos**.
   d. Especifica una ruta para los archivos temporales en tu bucket de almacenamiento en el campo **Ubicación temporal**.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Parámetros requeridos en la plantilla de Datadog Dataflow" style="width:80%;">}}

4. En **Parámetros opcionales**, marca `Include full Pub/Sub message in the payload`.

1. Si creaste un secreto en Secret Manager con el valor de tu clave de API Datadog, como se menciona en el [paso 1](#1-create-a-cloud-pubsub-topic-and-subscription), introduce el **nombre de recurso** del secreto en el campo **ID de Google Cloud Secret Manager**.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con los campos ID de Google Cloud Secret Manager y Fuente de la clave de API pasada, resaltados" style="width:80%;">}}

Consulta [Parámetros de plantilla](https://cloud.google.com/apis/docs/getting-started#enabling_apis) en la plantilla de Dataflow para obtener más información sobre el uso de las demás opciones disponibles:

- `apiKeySource=KMS` con `apiKeyKMSEncryptionKey` configurado con tu ID de clave de [Cloud KMS](https://cloud.google.com/kms/docs) y `apiKey` configurado con la clave de API encriptada.
- **No recomendado**: `apiKeySource=PLAINTEXT` con `apiKey` configurada con la clave de API en texto sin formato.

6. Si creaste una cuenta de servicio de worker personalizada, selecciónala en el desplegable **Correo electrónico de cuenta de servicio**.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con el correo electrónico de la cuenta de servicio resaltado" style="width:80%;">}}

7. Haz clic en **RUN JOB** (Ejecutar trabajo).

**Nota**: Si tienes una VPC compartida, consulta la página [Especificar una red y subred](https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared) en la documentación de Dataflow para obtener directrices sobre cómo especificar los parámetros `Network` y `Subnetwork`.

#### Validación

Los nuevos eventos de generación de logs enviados al tema Cloud Pub/Sub aparecen en el [Datadog Log Explorer](https://app.datadoghq.com/logs).

**Nota**: Puedes utilizar la [Calculadora de precios de Google Cloud](https://cloud.google.com/products/calculator) para calcular los posibles costes.

#### Monitorizar el reenvío de logs de Cloud Pub/Sub

La [integración de Google Cloud Pub/Sub](https://docs.datadoghq.com/integrations/google-cloud-pubsub/) proporciona métricas útiles para monitorizar el estado del reenvío de logs:

- `gcp.pubsub.subscription.num_undelivered_messages` para el número de mensajes pendientes de entrega
- `gcp.pubsub.subscription.oldest_unacked_message_age` para la antigüedad del mensaje no confirmado más antiguo de una suscripción

Utiliza las métricas anteriores con un [monitor de métricas](https://docs.datadoghq.com/monitors/types/metric/) para recibir alertas de mensajes en tus suscripciones de entrada y de mensajes no entregados.

#### Monitorizar el pipeline de Dataflow

Utiliza la [integración de Google Cloud Dataflow](https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher) de Datadog para monitorizar todos los aspectos de tus pipelines de Dataflow. Puedes ver todas tus métricas claves de Dataflow en el dashboard predefinido, enriquecido con datos contextuales, como información sobre las instancias de GCE que ejecutan tus cargas de trabajo de Dataflow y el rendimiento de tu Pub/Sub.

También puedes utilizar un [monitor recomendado](https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor) preconfigurado para definir notificaciones sobre aumentos en el tiempo de backlog de tu pipeline. Para obtener más información, consulta [Monitorizar tus pipelines de Dataflow con Datadog](https://cloud.google.com/storage/docs/access-control/iam-roles/) en el blog de Datadog.

{{% /tab %}}

{{% tab "Método Pub/Sub Push (legacy)" %}}

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La recopilación de logs de Google Cloud con una suscripción Pub/Sub Push</a> pronto estará **obsoleta**.

La documentación anterior de la suscripción **Push** sólo se mantiene para solucionar problemas o modificar configuraciones legacy.

Utiliza una suscripción **Pull** con la plantilla de Datadog Dataflow, como se describe en [Método Dataflow](http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended), para reenviar tus logs desde Google Cloud a Datadog.

{{% /tab %}}

{{< /tabs >}}

## Monitorización ampliada de BigQuery

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Únete a la vista previa" >}}
La monitorización ampliada de BigQuery está en vista previa. Utiliza este formulario para inscribirte y empezar a obtener información sobre el rendimiento de tus consultas. 
{{< /callout >}}

La monitorización ampliada de BigQuery te proporciona una visibilidad granular de tus entornos BigQuery.

### Monitorización del rendimiento de trabajos de BigQuery

Para monitorizar el rendimiento de tus trabajos de BigQuery, concede el rol [BigQuery Resource Viewer]](https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer) a la cuenta de servicio de Datadog para cada proyecto de Google Cloud.

**Notas**:

- Necesitas haber verificado tu cuenta de servicio Google Cloud en Datadog, como se indica en la [sección de configuración](#setup).
- **No** es necesario configurar Dataflow para recopilar logs de la monitorización ampliada de BigQuery.

1. En la consola de Google Cloud, ve a la [página de IAM](https://console.cloud.google.com/iam-admin/).
1. Haz clic en **Grant access** (Conceder acceso).
1. Introduce el correo electrónico de tu cuenta de servicio en **Nuevas entidades**.
1. Asigna el rol [BigQuery Resource Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer).
1. Haz clic en **SAVE** (Guardar).
1. En la [página de la integración de Google Cloud](https://app.datadoghq.com/integrations/google-cloud-platform) de Datadog, haz clic en la pestaña **BigQuery**.
1. Haz clic en el conmutador **Enable Query Performance** (Habilitar consulta del rendimiento).

### Monitorización de la calidad de los datos de BigQuery

La monitorización de la calidad de los datos de BigQuery proporciona métricas de calidad de tus tablas de BigQuery (desde la relevancia y las actualizaciones al recuento de filas y el tamaño). Explora los datos de tus tablas en profundidad en la [página de monitorización de la calidad de los datos](https://app.datadoghq.com/datasets/tables/explore).

Para recopilar métricas de calidad, concede el rol [BigQuery Metadata Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer) a la cuenta de servicio Datadog para cada tabla de BigQuery que estés utilizando.

**Nota**: El BigQuery Metadata Viewer puede aplicarse a nivel de tabla, conjunto de datos, proyecto u organización de BigQuery.

- Para la monitorización de la calidad de los datos de todas las tablas de un conjunto de datos, concede acceso a nivel de conjunto de datos.
- Para la monitorización de la calidad de los datos de todos los conjuntos de datos de un proyecto, concede acceso a nivel de proyecto.

1. Ve a [BigQuery](https://console.cloud.google.com/bigquery).
1. En el Explorador, busca el recurso BigQuery deseado.
1. Haz clic en el menú de tres puntos situado junto al recurso y luego haz clic en **Share -> Manage Permissions** (Compartir -> Gestionar permisos).

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="Opción de menú de gestión de permisos, de un recurso de conjunto de datos de BigQuery" style="width:80%;">}}

4. Haz clic en **ADD PRINCIPAL** (Añadir entidad).
1. En el cuadro de nuevas entidades, introduce la cuenta de servicio Datadog configurada para la integración Google Cloud.
1. Asigna el rol [BigQuery Metadata Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer).
1. Haz clic en **SAVE** (Guardar).
1. En la [página de la integración de Google Cloud](https://app.datadoghq.com/integrations/google-cloud-platform) de Datadog, haz clic en la pestaña **BigQuery**.
1. Haz clic en el conmutador **Enable Data Quality** (Habilitar calidad de los datos).

### Conservación de logs de trabajos de BigQuery

Datadog recomienda crear un nuevo [índice de logs](https://app.datadoghq.com/logs/pipelines/indexes) llamado `data-observability-queries` e indexar tus logs de trabajos de BigQuery durante 15 días. Utiliza el siguiente filtro de índice para extraer los logs:

```bash
service:data-observability @platform:*
```

Para calcular los costes, consulte [la página de precios de Log Management](https://www.datadoghq.com/pricing/?product=log-management#products).

## Recopilación de cambios de recursos

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
<strong>La recopilación de cambios de recursos</strong> está en vista previa. Para solicitar acceso, utiliza el formulario adjunto.
{{< /callout >}}

Seleccione **Habilitar recopilación de recursos** en la [pestaña Recopilación de recursos](https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources) de la integración de Google Cloud Page ( página). Esto le permite recibir eventos de recursos en Datadog cuando el [Inventario de activos en la nube](https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes) de Google detecta cambios en sus recursos en la nube.

Luego, sigue los pasos que se indican a continuación para reenviar eventos de cambio de un tema Pub/Sub al [Event Explorer](https://app.datadoghq.com/event/explorer) de Datadog.

{{% collapse-content title="CLI Google Cloud" level="h4" %}}

### Crear un tema y una suscripción Cloud Pub/Sub

#### Crear un tema

1. En la [página de temas Google Cloud Pub/Sub](https://console.cloud.google.com/cloudpubsub/topicList), haz clic en **CREATE TOPIC** (Crear tema).
1. Asigna un nombre descriptivo al tema.
1. **Desmarca** la opción de añadir una suscripción por defecto.
1. Haz clic en **CREATE** (Create).

#### Crear una suscripción

1. En la [página de suscripciones Google Cloud Pub/Sub](https://console.cloud.google.com/cloudpubsub/subscription/), haz clic en **CREATE SUSCRIPTION** (Crear suscripción).
1. Introduce `export-asset-changes-to-datadog` para el nombre de la suscripción.
1. Selecciona el tema Cloud Pub/Sub creado anteriormente.
1. Selecciona **Pull** como tipo de entrega.
1. Haz clic en **CREATE** (Create).

### Conceder acceso

Para leer desde esta suscripción Pub/Sub, la cuenta de servicio Google Cloud utilizada por la integración necesita el permiso `pubsub.subscriptions.consume` para la suscripción. Un rol predeterminado con permisos mínimos que permite esto es el rol **Suscriptor Pub/Sub**. Sigue los pasos que se indican a continuación para conceder este rol:

1. En la [página de suscripciones Google Cloud Pub/Sub](https://console.cloud.google.com/cloudpubsub/subscription/), haz clic en la suscripción `export-asset-changes-to-datadog`.
1. En el **panel de información** situado a la derecha de la página, haz clic en la pestaña **Permisos**. Si no ves el panel de información, haz clic en **SHOW INFO PANEL** (Mostrar panel de información).
1. Haz clic en **ADD PRINCIPAL** (Añadir entidad).
1. Introduce el **correo electrónico de la cuenta de servicio** utilizada por la integración Datadog Google Cloud. Puedes encontrar una lista de las cuentas de servicio a la izquierda de la pestaña **Configuration** (Configuración) en la [página de la integración Google Cloud](https://app.datadoghq.com/integrations/google-cloud-platform) en Datadog.

### Crear un flujo de recursos

Ejecuta el siguiente comando en [Cloud Shell](https://cloud.google.com/shell) o la [CLI gcloud](https://cloud.google.com/sdk/gcloud) para crear un flujo de Cloud Asset Inventory que envíe eventos de cambios al tema Pub/Sub creado anteriormente.

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos] (https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

{{% /tab %}}

{{% tab "Carpeta" %}}

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos](https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos](https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

{{% /tab %}}

{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" %}}

### Crear un flujo de recursos

Copia la siguiente plantilla de Terraform y sustituye los argumentos necesarios:

{{< tabs >}}

{{% tab "Project" %}}

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos](https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos](https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

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
- `<ASSET_NAMES>`: Lista separada por comas de [nombres completos](https://cloud.google.com/asset-inventory/docs/resource-name-format) de recursos de los que recibir eventos de cambio. **Opcional** si se especifica `asset-types`.
- `<ASSET_TYPES>`: Lista separada por comas de [tipos de recursos](https://cloud.google.com/asset-inventory/docs/supported-asset-types) de los que recibir eventos de cambio. **Opcional** si se especifica `asset-names`.
- `<CONTENT_TYPE>`: **Opcional** [tipo de contenido](https://cloud.google.com/asset-inventory/docs/overview#content_types) de recursos del que recibir eventos de cambio.

{{% /tab %}}

{{< /tabs >}}

{{% /collapse-content %}}

Datadog recomienda configurar el parámetro `asset-types` con la expresión regular `.*` para recopilar los cambios de todos los recursos.

**Nota**: Debes especificar al menos un valor para los parámetros `asset-names` o `asset-types`.

Consulta la referencia [gcloud asset feeds create](https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create) para ver la lista completa de parámetros configurables.

### Activar la recopilación de cambios de recursos

Haz clic en **Enable Resource Changes Collection** (Habilitar recopilación de cambios de recursos) en la [pestaña de recopilación de recursos](https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources) de la página de la integración Google Cloud.

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="Conmutador 'Habilitar recopilación de cambios de recursos' en el cuadro de la integración Datadog Google Cloud" popup="true" style="width:80%;">}}

#### Validación

Busca tus eventos de cambio de recursos en el [Datadog Event Explorer](https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory).

## Private Service Connect

{{< site-region region="us,us3,ap1,gov" >}}

<div class="alert alert-info">Private Service Connect sólo está disponible para los sitios US5 y EU de Datadog.</div>
{{< /site-region >}}

Utiliza la [integración Google Cloud Private Service Connect](https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/) para visualizar conexiones, datos transferidos y paquetes descartados a través de Private Service Connect. Esto te proporciona una visibilidad de las métricas importantes de tus conexiones de Private Service Connect, tanto de productores como de consumidores.
[Private Service Connect (PSC)](https://cloud.google.com/vpc/docs/private-service-connect) es un producto de red de Google Cloud que te permite acceder a [servicios de Google Cloud](https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services), a [servicios de socios externos](https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services) y a aplicaciones de propiedad de la empresa directamente desde tu Virtual Private Cloud (VPC).

Consulta [Acceder a Datadog de forma privada y monitorizar tu uso de Google Cloud Private Service Connect](https://www.datadoghq.com/blog/google-cloud-private-service-connect/) en el blog de Datadog para obtener más información.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.gce.instance.cpu.utilization** <br>(gauge) | Fracción de la CPU asignada que está actualmente en uso en la instancia. Ten en cuenta que algunos tipos de máquinas permiten ráfagas por encima del 100% de uso.<br>_Se muestra como fracción_ |

#### Métricas acumulativas

Las métricas acumulativas se importan a Datadog con una métrica `.delta` para cada nombre de métrica. Una métrica acumulativa es una métrica cuyo valor aumenta constantemente con el tiempo. Por ejemplo, una métrica para `sent bytes` podría ser acumulativa. Cada valor registra el número total de bytes enviados por un servicio en ese momento. El valor delta representa el cambio desde la medición anterior.

Por ejemplo:

`gcp.gke.container.restart_count` es una métrica ACUMULATIVA. Al importar esta métrica como una métrica acumulativa, Datadog añade la métrica `gcp.gke.container.restart_count.delta` que incluye los valores delta (a diferencia del valor agregado emitido como parte de la métrica ACUMULATIVA). Consulta los [tipos de métricas de Google Cloud](https://cloud.google.com/monitoring/api/v3/kinds-and-types) para obtener más información.

### Eventos

Todos los eventos de servicio generados por tu Google Cloud Platform se reenvían a tu [Datadog Events Explorer](https://app.datadoghq.com/event/stream).

### Checks de servicio

La integración Google Cloud Platform no incluye checks de servicios.

### Etiquetas (Tags)

Las etiquetas (tags) se asignan automáticamente en función de diferentes opciones de configuración de Google Cloud Platform y Google Compute Engine. La etiqueta (tag) `project_id` se añade a todas las métricas. Las etiquetas (tags) adicionales se recopilan de Google Cloud Platform cuando están disponibles y varían en función del tipo de métrica.

Además, Datadog recopila lo siguiente como etiquetas (tags):

- Cualquier host con las etiquetas (labels) `<key>:<value>`.
- Etiquetas (labels) personalizadas de Google Pub/Sub, GCE, Cloud SQL y Cloud Storage.

## Solucionar problemas

### ¿Metadatos incorrectos para las métricas _gcp.logging_ definidas por el usuario?

En el caso de las métricas _gcp.logging_ no estándar, como las métricas que van más allá de las [métricas de generación de logs predefinidas de Datadog](https://docs.datadoghq.com/integrations/google-stackdriver-logging/#metrics), es posible que los metadatos aplicados no sean coherentes con Google Cloud Logging.

En estos casos, los metadatos deben definirse manualmente yendo a la [página de resumen de métricas](https://app.datadoghq.com/metric/summary), buscando y seleccionando la métrica en cuestión, y haciendo clic en el icono del lápiz situado junto a los metadatos.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- Mejorar la conformidad y la postura de seguridad de tu entorno Google Cloud con Datadog](https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/)
- Monitorizar Google Cloud Vertex AI con Datadog](https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/)
- Monitorizar tus pipelines de Dataflow con Datadog](https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/)
- [Crear y gestionar tu integración Google Cloud con Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts)
- [Monitorizar BigQuery con Datadog](https://www.datadoghq.com/blog/track-bigquery-costs-performance/)
- [Solucionar los cambios de infraestructura más rápidamente con los cambios recientes en el Resource Catalog](https://www.datadoghq.com/blog/recent-changes-tab/)
- [Transmitir logs desde Google Cloud a Datadog](https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog)