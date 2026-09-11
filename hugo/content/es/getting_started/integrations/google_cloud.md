---
description: Configura una monitorización exhaustiva de tu entorno de Google Cloud.
  Configura cuentas de servicio, activa la recopilación de métricas, y explora el
  reenvío de logs y la instalación del Agent.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
  tag: Documentación
  text: Integración de Google Cloud
- link: https://docs.datadoghq.com/account_management/billing/google_cloud/
  tag: Guía
  text: Facturación de la integración de Google Cloud
- link: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
  tag: Guía
  text: Tiempo de respuesta de las métricas en la nube
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
- link: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  tag: Blog
  text: Los nuevos dashboards y métricas de GKE permiten una mayor visibilidad de
    tu entorno
- link: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
  tag: Blog
  text: Acceder a Datadog de forma privada y monitorizar tu uso de Google Cloud Private
    Service Connect
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: Blog
  text: Monitorizar BigQuery con Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permitir a los ingenieros hacerse cargo de los costes de Google Cloud con
    Datadog
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopilar trazas (traces), logs y métricas personalizadas de servicios de
    Google Cloud Run con Datadog
- link: https://learn.datadoghq.com/courses/getting-started-gcp
  tag: Centro de aprendizaje
  text: Empezando con la observabilidad en Google Cloud con Datadog
title: Empezando con Google Cloud
---

## Información general

Utiliza esta guía para empezar a monitorizar tu entorno de Google Cloud. Esta estrategia simplifica la configuración de los entornos de Google Cloud con varios proyectos, lo que te permite maximizar la cobertura de la monitorización.

## Configuración

### Requisitos previos
1) Crear una [cuenta de Datadog][1]
2) Configurar una [cuenta de servicio][2] en cualquiera de tus proyectos de Google Cloud
3) Revisar estos requisitos previos de Google Cloud:

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Si tu organización restringe las identidades por dominio, debes añadir un `C0147pk0i`de identidad de cliente de Datadog como valor permitido en tu política.
{{% /site-region %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● La integración de Google Cloud requiere que las siguientes API estén activadas **para cada uno de los proyectos** que quieres monitorizar:

<div class="alert alert-danger">Asegúrate de que los proyectos que se están monitorizando no están configurados como <a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">proyectos de contexto</a> que extraen métricas de otros muchos proyectos.</div>

[API de Cloud Monitoring][3]
: Permite a Datadog consultar datos de métricas de Google Cloud.

[API de Compute Engine][4]
: Permite a Datadog detectar datos de instancias de cálculo.

[API de Cloud Asset][5]
: Permite a Datadog solicitar recursos de Google Cloud y vincular etiquetas (labels) relevantes a métricas como etiquetas (tags).

[API de Cloud Resource Manager][6]
: Permite a Datadog añadir métricas con recursos y etiquetas (tags) correctos.

[API IAM][7]
: Permite a Datadog autenticarse con Google Cloud.

[API de Cloud Billing][8]
: Permite a los desarrolladores gestionar la facturación de sus proyectos de Google Cloud Platform mediante programación. Consulta la sección [Cloud Cost Management (CCM)](#cloud-cost-management-ccm) para obtener más información.

<div class="alert alert-info">Puedes confirmar si estas API están activadas accediendo a <a href="https://console.cloud.google.com/apis/dashboard">API y servicios activados</a>.</div>

### Recopilación de métricas

{{< tabs >}}

{{% tab "Nivel de organización" %}}

Se recomienda la monitorización a nivel de organización para una cobertura completa de todos los proyectos, incluidos los futuros proyectos que puedan crearse en una organización.

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
   - [Visor de cálculos][402] proporciona acceso de **solo lectura** a los recursos Get y List de Compute Engine
   - [Visor de monitorización][403] proporciona acceso de **sólo lectura** a los datos de monitorización disponibles en su entorno Google Cloud
   - [Visor de recursos en la nube][404] proporciona acceso de **sólo lectura** a los metadatos de recursos en la nube
   - [Navegador][405] proporciona acceso de **sólo lectura** para navegar por la jerarquía de un proyecto
   - [Consumidor de uso de servicios][406] (**opcional**, para entornos con varios proyectos) proporciona [una atribución de costes y cuotas de API por proyecto](#enable-per-project-cost-and-api-quota-attribution)
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

1. En Datadog, ve a **Integrations** (Integraciones) > [**Google Cloud Platform**][407].
2. Haz clic en **Add Google Cloud Account** (Añadir cuenta de Google Cloud).
Si no tienes proyectos configurados, se te redirigirá automáticamente a esta página.
3. Copia tu entidad de Datadog y guárdala para la siguiente sección.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Página para añadir una nueva cuenta de Google Cloud, en el cuadro de la integración de Google Cloud de Datadog" style="width:70%;">}}

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

{{% /tab %}}

{{% tab "Nivel de proyecto y carpeta" %}}

{{% collapse-content title="Inicio rápido (recomendado)" level="h4" expanded=false id="quickstart-setup" %}}

### Requisitos previos

Para utilizar el método de inicio rápido, tu rol de usuario Datadog debe poder crear claves de API y de aplicación. Si utilizas un [rol gestionado por Datadog][202], debe tener el rol **Administrador Datadog**. Si utilizas un [rol personalizado][203], tu rol debe tener al menos los permisos `api_keys_write` y `user_app_keys`.

### Selecciona la configuración de inicio rápido si...

- Estás configurando la integración de Google Cloud por primera vez.
- Prefieres un flujo de trabajo basado en una interfaz de usuario y quieres minimizar el tiempo que se tarda en crear una cuenta de servicio con los permisos de monitorización necesarios.
- Quieres automatizar los pasos de configuración en scripts o pipelines de CI/CD.

### Instrucciones

1. En la [página de la integración de Google Cloud][200], selecciona **+ Add GCP Account** (+ Añadir cuenta de GCP).
2. Haz clic en **Quick Start** (Inicio rápido).
3. Haz clic en **Copy** (Copiar) en la sección del script de configuración.<br>
   **Nota**: Datadog recomienda ejecutar este script localmente a través de la [CLI de gcloud][201], ya que puede ser más rápido. Para ello, necesitas tener tus credenciales de Google Cloud disponibles localmente y la CLI de gcloud instalada en tu máquina.
4. Haz clic en **Open Google Cloud Shell** (Abrir Google Cloud Shell) o ve a [Google Cloud Shell][204].
5. Pega el script en el intérprete de comandos y ejecútalo.
6. Selecciona las carpetas y los proyectos que quieres monitorizar. Solo podrás ver los proyectos y las carpetas para los que tienes el acceso y los permisos necesarios.
7. En **Provide Service Account Details** (Proporcionar detalles de la cuenta de servicio):
   1. Asigna un nombre a la cuenta de servicio.
   2. Selecciona el proyecto que contendrá la cuenta de servicio.
8. Configura la **Recopilación de métricas** (opcional).
   1. Elige si quieres desactivar la opción de silenciar los monitores en caso de cierres de instancias y eventos de autoescalado GCE previstos.
   2. Elige si quieres aplicar etiquetas (tags) a las métricas asociadas a la cuenta de servicio creada.
   3. Elige si quieres desactivar la recopilación de métricas de servicios específicos de Google Cloud para ayudar a controlar los costes de Google Cloud Monitoring.
   4. Elige si quieres aplicar filtros de métricas granulares para cualquier servicio de Google Cloud activado para la recopilación de métricas.
   5. Elige si quieres filtrar las métricas por etiquetas (tags) de los tipos de recursos GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costes de Datadog.
   **Nota**: El filtrado `VM Instance` no afecta a las métricas `gcp.logging.*` relacionadas y no causa ningún impacto en la facturación de estas métricas.
9. Configura la **Recopilación de recursos** (atributos e información de configuración de los recursos en tu entorno de Google Cloud, opcional).
10. Se muestra un resumen de los cambios que se van a realizar. Si se confirma, el script:
    - Activa las API necesarias
    - Asigna los permisos necesarios para monitorizar cada proyecto y carpeta seleccionados.
    - Finaliza la configuración de la integración en Datadog

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /es/account_management/rbac/permissions/#managed-roles
[203]: /es/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### Elige la configuración de Terraform si...

- Gestionas la infraestructura como código y quieres mantener la integración de Google Cloud y Datadog bajo el control de versiones.
- Necesitas configurar varias carpetas o proyectos de forma coherente con bloques de proveedores reutilizables.
- Quieres un proceso de despliegue repetible y auditable que se adapte a tu entorno gestionado por Terraform.

### Instrucciones

1. En la [página de la integración de Google Cloud][500], selecciona **+ Add GCP Account** (+ Añadir cuenta de GCP).
2. Selecciona **Terraform**.
3. En **Provide GCP Resources** (Proporcionar recursos GCP), añade cualquier ID de proyecto y cualquier ID de carpeta que quieras monitorizar.
4. Selecciona las carpetas y los proyectos que quieres monitorizar.
5. En **Provide Service Account Details** (Proporcionar detalles de la cuenta de servicio):
   1. Asigna un nombre a la cuenta de servicio.
   2. Selecciona el proyecto que contendrá la cuenta de servicio.
6. Configura la **Recopilación de métricas** (opcional).
   1. Elige si quieres desactivar la opción de silenciar los monitores en caso de cierres de instancias y eventos de autoescalado GCE previstos.
   2. Elige si quieres aplicar etiquetas (tags) a las métricas asociadas a la cuenta de servicio creada.
   3. Elige si quieres desactivar la recopilación de métricas de servicios específicos de Google Cloud para ayudar a controlar los costes de Google Cloud Monitoring.
   4. Elige si quieres aplicar filtros de métricas granulares para cualquier servicio de Google Cloud activado para la recopilación de métricas.
   5. Elige si quieres filtrar las métricas por etiquetas (tags) de los tipos de recursos GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costes de Datadog.
7. Configura la **Recopilación de recursos** (atributos e información de configuración de los recursos en tu entorno de Google Cloud).
8. Copia el **código de Terraform** proporcionado.
9. Pega el código en un archivo `.tf` y ejecuta el comando **Initialize and apply the Terraform** (Inicializar y aplicar Terraform). Si todo sale bien, el comando:
   - Activa las API necesarias
   - Asigna los permisos necesarios para monitorizar cada proyecto y carpeta seleccionados
   - Finaliza la configuración de la integración en Datadog

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="Manual" level="h4" expanded=false id="manual-setup" %}}

### Elige la configuración manual si...

- Necesitas configurar manualmente el acceso para un número más reducido de proyectos o carpetas.
- Quieres un mayor control paso a paso de la asignación de permisos y credenciales dentro de la interfaz de usuario de GCP.

### Instrucciones

1. En la [página de la integración de Google Cloud][600], selecciona **+ Add GCP Account** (+ Añadir cuenta de GCP).
2. Haz clic en **Manual**.
3. Copia el valor del **principal de Datadog** y haz clic en **Open the Google Console** (Abrir la consola de Google).
4. Crea una cuenta de servicio:
   1. Asigna un nombre descriptivo a la cuenta de servicio y haz clic en **Create and continue** (Crear y continuar).
   2. En **Permissions** (Permisos), busca y añade el rol **Service Account Token Creator** (Creador de tokens de cuentas de servicio) en el menú desplegable y haz clic en **Continue** (Continuar).
   3. En **Principals with access** (Principales con acceso), pega el valor del **principal de Datadog** en el campo **Service account users role** (Rol de los usuarios de cuentas de servicio) y haz clic en **Done** (Listo).
5. Haz clic en el enlace de la cuenta de servicio bajo la columna **Email** (Correo electrónico).
6. Copia el valor del **correo electrónico**.
7. En Datadog, pega el correo electrónico de la cuenta de servicio en la sección **Add Service Account Email** (Añadir correo electrónico de la cuenta de servicio).
8. Configura la **Recopilación de métricas** (opcional).
   1. Elige si quieres desactivar la opción de silenciar los monitores en caso de cierres de instancias y eventos de autoescalado GCE previstos.
   2. Elige si quieres aplicar etiquetas (tags) a las métricas asociadas a la cuenta de servicio creada.
   3. Elige si quieres desactivar la recopilación de métricas de servicios específicos de Google Cloud para ayudar a controlar los costes de Google Cloud Monitoring.
   4. Elige si quieres aplicar filtros de métricas granulares para cualquier servicio de Google Cloud activado para la recopilación de métricas.
   5. Elige si quieres filtrar las métricas por etiquetas (tags) de los tipos de recursos GCP `Cloud Run Revision`, `VM Instance` o `Cloud Function` para ayudar a controlar los costes de Datadog.
9. Configura la **Recopilación de recursos** (atributos e información de configuración de los recursos en tu entorno de Google Cloud, opcional).
10. Haz clic en **Verify and Save Account** (Verificar y guardar cuenta).

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### Validación

Para ver tus métricas, utiliza el menú de la izquierda para ir a **Métricas** > **Resumen** y busca `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="Página de resumen de métricas en Datadog filtrada para mostrar las métricas que empiezan con GCP" style="width:100%;" >}}

### Integraciones de Google Cloud

La integración de Google Cloud recopila todas las [métricas de Google Cloud][12] disponibles de tus proyectos a través de la API de Google Cloud Monitoring. Las integraciones se instalan automáticamente cuando Datadog reconoce que se están ingiriendo datos desde tu cuenta de Google Cloud, como BigQuery.

{{% collapse-content title="Ver las integraciones de Google Cloud de las que Datadog recopila métricas" level="h5" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

Para profundizar en la monitorización de varios de los servicios más populares, consulta los enlaces de blogs a continuación.

{{% collapse-content title="Blogs de integración" level="h5" %}}
[Cloud Armor][20]
: Google Cloud Armor es un servicio de seguridad de red que protege contra ataques DDoS y a aplicaciones.

[BigQuery][21]
: BigQuery es un almacén de datos sin servidor y multinube que puede proporcionarte información valiosa a partir de tus datos empresariales.

[Cloud Run][22]
: Cloud Run es una plataforma totalmente gestionada que te permite ejecutar tu código directamente en una infraestructura escalable en Google Cloud.

[Cloud SQL][23]
: Cloud SQL es un servicio de base de datos relacional totalmente gestionado que funciona con MySQL, PostgreSQL y SQL Server.

[Compute Engine][24]
: Compute Engine es un servicio de cálculo y alojamiento que permite crear y ejecutar máquinas virtuales en Google Cloud.

[Dataflow][25]
: Dataflow es un servicio de análisis de flujos totalmente gestionado que utiliza el autoescalado y el procesamiento de datos en tiempo real.

[Eventarc][26]
: Eventarc es un servicio totalmente gestionado que permite crear arquitecturas basadas en eventos.

[Google Kubernetes Engine (GKE)][27]
: GKE es un servicio totalmente gestionado de Kubernetes.

[Private Service Connect][28]
: Private Service Connect te permite acceder de forma privada a los servicios gestionados de Google desde tu red de VPC.

[Security Command Center][29]
: Security Command Center proporciona gestión de posturas y detección de amenazas a códigos, identidades y datos.

[Vertex AI][30]
: Vertex AI es una plataforma de desarrollo de IA generativa totalmente gestionada.
{{% /collapse-content %}}

### Limitar los filtros de recopilación de métricas

Puedes elegir de qué servicios y recursos recopilar métricas. Esto puede ayudar a controlar los costes al reducir el número de llamadas a la API realizadas en tu nombre.

{{% collapse-content title="Limitar la recopilación de métricas por servicio de Google Cloud y por filtros granulares de métricas" level="h4" %}}

En la pestaña **Metric Collection** (Recopilación de métricas) de la [página de la integración de Google Cloud][11] de Datadog, deselecciona los espacios de nombres de métricas que quieres excluir.

Para aplicar un filtrado granular de métricas a los servicios activos, haz clic en el servicio en cuestión y aplica tus filtros en el campo `Add filters for gcp.<service>`.

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="Pestaña de recopilación de métricas en la página de la integración de Google Cloud de Datadog, con el servicio AI Platform expandido para mostrar el campo para añadir filtros para gcp.ml" style="width:80%;">}}

**Filtros de ejemplo**:

`subscription.*` `topic.*`
: Limitar la recopilación a las métricas **que coincidan con** `gcp.<service>.subscription.*` **o** `gcp.<service>.topic.*`

`!*_cost` `!*_count`
: Limitar la recopilación a las métricas **que no coincidan con** `gcp.<service>.*_cost` **ni** `gcp.<service>.*_count`

`snapshot.*` `!*_by_region`
: Limitar la recopilación a las métricas **que coincidan con** `gcp.<service>.snapshot.*` **pero que no coincidan con** `gcp.<service>.*_by_region`

{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por región de Google Cloud y por recursos globales" level="h4" %}}

En la pestaña **Metric Collection** (Recopilación de métricas) de la [página de la integración de Google Cloud][11] de Datadog, deselecciona las regiones que quieres excluir de la recopilación de métricas.

También puedes especificar ubicaciones adicionales no incluidas en la lista y desactivar cualquier métrica global no asociada a una región.

{{< img src="integrations/google_cloud_platform/metric_region_filtering.png" alt="Pestaña de recopilación de métricas en la página de la integración de Google Cloud de Datadog, con la opción para activar métricas globales resaltada y un subconjunto de regiones seleccionada. La opción para ubicaciones adicionales también está resaltada con un filtro multirregión definido" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="Limitar la recopilación de métricas por host o instancia de Cloud Run" level="h4" %}}
1. Asigna una etiqueta (tag) (como `datadog:true`) a los hosts o instancias de Cloud Run que quieres monitorizar con Datadog.
2. En la pestaña **Metric Collection** (Recopilación de métricas) de la [página de la integración de Google Cloud][11] de Datadog, introduce las etiquetas (tags) en el cuadro de texto **Limit Metric Collection Filters** (Limitar filtros de recopilación de métricas). Solo se importarán a Datadog los hosts que coincidan con una de las etiquetas (tags) definidas. Puedes utilizar comodines (`?` para un solo carácter, `*` para varios caracteres), para emparejar varios hosts, o `!`, para excluir determinados hosts. Este ejemplo incluye todas las instancias de tamaño `c1*`, pero excluye los hosts de staging:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consulta la documentación de Google sobre [creación y gestión de etiquetas (labels)][44] para obtener más información.
{{% /collapse-content %}}

En el siguiente ejemplo, solo los hosts de Google Cloud con la etiqueta (label) `datadog:true` son monitorizados por Datadog:

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="Campos para limitar la recopilación de métricas en el cuadro de la integración de Google Cloud" style="width:100%;" >}}

#### Prácticas recomendadas para monitorizar varios proyectos

##### Permitir la asignación de costes y cuotas de API por proyecto 

Por defecto, Google Cloud asigna el coste de monitorización de llamadas de API, así como el uso de cuotas de API, al proyecto que contiene la cuenta de servicio de esta integración. Como práctica recomendada para entornos Google Cloud con varios proyectos, activa la asignación de costes por proyecto de monitorización de las llamadas de API y del uso de cuotas de API. Con esta opción activada, los costes y el uso de cuotas se asignan al proyecto que se *consulta*, en lugar del proyecto que contiene la cuenta de servicio. Esto proporciona visibilidad de los costes de monitorización generados por cada proyecto y también ayuda a prevenir que se alcancen los límites de tasa de API.

Para activar esta función:
1. Asegúrate de que la cuenta de servicio Datadog tiene el rol [Consumidor de uso de servicios][410] en el contexto deseado (carpeta u organización).
2. Haz clic en el conmutador **Enable Per Project Quota** (Habilitar cuota por proyecto) en la pestaña **Projects** (Proyectos) de la [página de la integración de Google Cloud][411].

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## Recopilación de logs

El reenvío de logs desde tu entorno de Google Cloud permite la monitorización casi en tiempo real de los recursos y las actividades que tienen lugar en tu organización o carpeta. Puedes configurar [monitores de logs][37] para recibir notificaciones de problemas, utilizar [Cloud SIEM][38] para detectar amenazas o aprovechar [Watchdog][39] para identificar incidentes desconocidos o comportamientos anómalos.

Utiliza la [plantilla Datadog Dataflow][14] para agrupar y comprimir tus eventos de logs antes de reenviarlos a Datadog a través de [Google Cloud Dataflow][15]. Esta es la forma más eficiente de reenviar logs. Para especificar qué logs se reenvían, configura el [sumidero de logs de Google Cloud][40] con cualquier consulta de inclusión o exclusión, utilizando el [lenguaje de consulta de logs][56] de Google Cloud. Consulta la [página de configuración del reenvío de logs de Google Cloud][67] para ver las opciones de configuración del reenvío de logs (incluido Terraform) y las instrucciones.

<div class="alert alert-danger">La <b>API de Dataflow</b> debe estar activada para utilizar Google Cloud Dataflow. Consulta <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Activación de las API</b></a> en la documentación de Google Cloud para obtener más información.</div>

## Aprovechar las ventajas del Datadog Agent

Una vez configurada la integración de Google Cloud, Datadog empieza a recopilar automáticamente métricas de Google Cloud. Sin embargo, puedes aprovechar el Datadog Agent para obtener información más detallada sobre tu infraestructura.

El [Datadog Agent][31] proporciona [métricas más granulares y de baja latencia][32] de tu infraestructura, ofreciendo información en tiempo real sobre el uso de CPU, memoria y disco, entre otros, de tus hosts de Google Cloud.
El Agent puede instalarse en cualquier host, incluido [GKE][33].

El Agent también admite una amplia gama de [integraciones][34], que te permiten ampliar la visibilidad a aquellos servicios y bases de datos específicos que se ejecutan en tus hosts.

Las [trazas][35] recopiladas a través del Agent permiten una monitorización exhaustiva del rendimiento de las aplicaciones (APM) para ayudarte a comprender el rendimiento de un servicio de extremo a extremo.

Los [logs][57] recopilados a través del Agent proporcionan una visibilidad de los recursos de Google Cloud y de las actividades que tienen lugar en el entorno de Google Cloud.

Para consultar la lista completa de las ventajas de instalar el Agent en tus instancias en la nube, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][36].

## Recopilación de cambios de recursos

La recopilación de cambios en recursos te permite monitorizar cambios de infraestructura en tu entorno de Google Cloud. Cuando el Inventario de recursos en la nube de Google detecta cambios en tus recursos en la nube, se envía un evento a [Event Management][62] de Datadog a través de un tema y una suscripción Cloud Pub/Sub. Utiliza estos eventos para recibir notificaciones proactivas sobre cambios riesgosos en tu infraestructura y para solucionar problemas.

Para obtener instrucciones de configuración detalladas, consulta la [sección de recopilación de cambios en recursos][18] en la documentación de la integración de Google Cloud.

## Explorar servicios relacionados

### Private Service Connect

<div class="alert alert-info">Private Service Connect solo está disponible para los sitios Datadog US5 y EU.</div>

Utiliza la [integración de Google Cloud Private Service Connect][58] para visualizar conexiones, datos transferidos y paquetes descartados a través de Private Service Connect. Esto te proporciona una visibilidad de las métricas importantes de tus conexiones de Private Service Connect, tanto de productores como de consumidores.
[Private Service Connect (PSC)][59] es un producto de red de Google Cloud que te permite acceder a [servicios de Google Cloud][60], a [servicios de socios externos][61] y a aplicaciones de propiedad de la empresa directamente desde tu Virtual Private Cloud (VPC).

Consulta [Acceder a Datadog de forma privada y monitorizar tu uso de Google Cloud Private Service Connect][28] en el blog de Datadog para obtener más información.

### Google Cloud Run

Utiliza la [integración de Google Cloud Run][42] para obtener información detallada sobre tus contenedores Cloud Run, como métricas y logs de auditoría.

### Cloud Cost Management (CCM)

Datadog Google Cloud Cost Management][45] proporciona información para que los departamentos de ingeniería y los equipos de finanzas comprendan cómo afectan los cambios en la infraestructura a los costes, asignen los gastos en toda la organización e identifiquen posibles mejoras.

### Cloud SIEM

Cloud SIEM proporciona análisis en tiempo real de logs operativos y de seguridad, al tiempo que utiliza integraciones y reglas predefinidas para detectar e investigar amenazas.
Para utilizar esta función, consulta [Empezando con Cloud SIEM][46].

Para ver los resultados de seguridad del [Security Command Center de Google][47] en Cloud SIEM, activa la opción **Enable collection of security findings** (Activar la recopilación de hallazgos de seguridad) en la pestaña **Security Findings** (Hallazgos de seguridad) y sigue las instrucciones de configuración de la [guía del Security Command Center de Google][48].

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="Pestaña de los hallazgos de seguridad en el cuadro de la integración de Google Cloud" style="width:90%;" >}}

### Cloud Security

Datadog Cloud Security ofrece detección de amenazas en tiempo real y auditorías de configuración continuas en toda tu infraestructura de nube.
Consulta la [guía de configuración de Cloud Security][49] para empezar.

Después de configurar Cloud Security, activa la opción **Enable Resource Collection** (Activar la recopilación de recursos) en la pestaña **Resource Collection** (Recopilación de recursos) para empezar a recopilar datos de configuración del [Catálogo de recursos][50] y Cloud Security. A continuación, sigue estas instrucciones para activar [Misconfigurations and Identity Risks (CIEM)][51] en Google Cloud.

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="Pestaña de recopilación de recursos en el cuadro de la integración de Google Cloud" style="width:100%;" >}}

### Monitorización ampliada de BigQuery

Puedes obtener una visibilidad granular de tus entornos de BigQuery para monitorizar el rendimiento de tus trabajos de BigQuery y la calidad de tus datos de BigQuery. Consulta la [sección de monitorización ampliada de BigQuery][65] en la página principal de la integración de Google Cloud para obtener más información e instrucciones de configuración.

## Referencias adicionales

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
[65]: /es/integrations/google_cloud_platform/#expanded-bigquery-monitoring
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/es/logs/guide/google-cloud-log-forwarding