---
app_id: gke
app_uuid: 66d0227c-6e8f-4639-a0d9-aefb147da71d
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Google Kubernetes Engine
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gke/README.md
display_on_public_website: true
draft: false
git_integration_title: gke
integration_id: gke
integration_title: Google Kubernetes Engine, Agent
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gke
public_title: Google Kubernetes Engine, integración con el Agent
short_description: GKE es una plataforma para la ejecución y la orquestación de aplicaciones
  en contenedores.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Contenedores
  - Categoría::Orquestación
  - Oferta::Integración
  configuration: README.md#Configuración
  description: GKE es una plataforma para la ejecución y la orquestación de aplicaciones
    en contenedores.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  support: README.md#Soporte
  title: Google Kubernetes Engine, integración con el Agent
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Google Kubernetes Engine (GKE), un servicio en Google Cloud Platform (GCP), es una plataforma alojada para ejecutar y orquestar aplicaciones en contenedores, respaldadas por Kubernetes. Los clústeres GKE se pueden monitorizar mediante [Google Cloud Platform][1], así como mediante el Datadog Agent, ejecutándose como cargas de trabajo dentro del clúster.

## Configuración

### Requisitos previos

1. Asegúrate de que tu rol en tu [proyecto GCP][2] tiene los permisos adecuados para utilizar GKE. 

2. Habilita la [API de Google Contenedor Engine][3] para tu proyecto. 

3. Instala el [SDK de Google Cloud][4] y la herramienta de línea de comandos `kubectl` en tu máquina local. Una vez que hayas [emparejado el SDK de Google Cloud con tu cuenta de GCP][5], podrás controlar tus clústeres directamente desde tu máquina local mediante `kubectl`.

### Configuración de la integración CME

Instala la integración [Google Cloud Platform][1].

A continuación, podrás acceder a un [dashboard de Google Compute Engine][6] predefinido que muestra métricas, como E/S de disco, uso de CPU y tráfico de red.

### Configurar la integración Kubernetes

Para monitorizar con mayor profundidad tu clúster GKE, instala el Datadog Agent utilizando el Datadog Helm Chart o el Datadog Operator. Una vez desplegado, el Datadog Agent y el Datadog Cluster Agent monitorizan tu clúster y las cargas de trabajo en él.

GKE admite dos [modos principales de operación][7] que pueden cambiar el nivel de flexibilidad, responsabilidad y control que tienes sobre tu clúster. Estos diferentes modos cambian la forma de desplegar los componentes de Datadog.

- **Standard** (Estándar): tú gestionas la infraestructura subyacente del clúster, proporcionándole flexibilidad a la configuración de tu nodo.

- **Autopilot**: Google provee y gestiona la totalidad de la infraestructura de clúster subyacente, incluyendo nodos y grupos de nodos, y te proporciona un clúster optimizado con una experiencia de manos libres.

{{< tabs >}}
{{% tab "Estándar" %}}a

#### Standard (Estándar)

Despliega una [versión en contenedor del Datadog Agent][1] en tu clúster Kubernetes. Consulta [Instalar el Datadog Agent en Kubernetes][2].


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/es/containers/kubernetes/installation?tab=operator
{{% /tab %}}
{{% tab "Autopilot" %}}

#### Autopilot

Autopilot requiere una configuración más distinta para la instalación de Kubernetes. en comparación con la instalación estándar. Este tipo de clúster requiere el uso del Datadog Helm chart.

Despliega una [versión contenedorizada del Datadog Agent][1] en tu clúster Kubernetes con la [instalación del Datadog Agent en Kubernetes][2] de Helm. Cuando realices tu configuración de Helm `datadog-values.yaml`, consulta la [sección de GKE Autopilot sobre distribuciones Kubernetes][3] para ver los cambios de configuración necesarios. En particular, configura`providers.gke.autopilot` como `true`.

#### Controlador de admisiones (Admission Controller)

Para utilizar el [Controlador de admisión][4] con Autopilot, configura el [`configMode`][5] del Controlador de admisión como `service` o `hostip`. 

Dado que Autopilot no permite el modo `socket`, Datadog recomienda utilizar `service` (con `hostip` como alternativa) para proporcionar una capa de abstracción más robusta para el controlador. 



[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/es/containers/kubernetes/installation?tab=helm
[3]: https://docs.datadoghq.com/es/containers/kubernetes/distributions/?tab=helm#autopilot
[4]: https://docs.datadoghq.com/es/containers/cluster_agent/admission_controller/?tab=operator
[5]: https://github.com/DataDog/helm-charts/blob/datadog-3.110.0/charts/datadog/values.yaml#L1284-L1293
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

- [Monitorizar GKE Autopilot con Datadog][8]
- [Monitorizar GKE con Datadog][9]
- [Monitorizar tus cargas de trabajo GKE de tecnología T2A con Datadog][10]
- [Los nuevos dashboards y métricas GKE proporcionan una mayor visibilidad de tu entorno][11]


[1]: https://app.datadoghq.com/integrations/google_cloud_platform/
[2]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[3]: https://console.cloud.google.com/apis/api/container.googleapis.com
[4]: https://cloud.google.com/sdk/docs/
[5]: https://cloud.google.com/sdk/docs/initializing
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode
[8]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
[9]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[10]: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
[11]: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/