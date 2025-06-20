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

Google Kubernetes Engine (GKE), servicio de Google Cloud Platform (GCP), es una plataforma alojada para la ejecución y la orquestación de aplicaciones en contenedores De forma similar a Elastic Container Service (ECS) de Amazon, GKE gestiona contenedores Docker desplegados en un clúster de equipo. Pero, a diferencia de ECS, GKE utiliza Kubernetes.

## Configuración

### Requisitos previos

1. Asegúrate de que tu rol en tu [proyecto GCP][1] tiene los permisos adecuados para utilizar GKE. 

2. Habilita la [API Google Container Engine][2] para tu proyecto. 

3. Instala el [SDK de Google Cloud][3] y la herramienta de línea de comandos `kubectl` en tu equipo local. Una vez que hayas [emparejado el SDK de Google Cloud con tu cuenta de GCP][4], podrás controlar tus clústeres directamente desde tu equipo local mediante `kubectl`.

4. Crea un pequeño clúster GKE llamado `doglib` capaz de acceder al Cloud Datastore ejecutando el siguiente comando:

```
$  gcloud container clusters create doglib --num-nodes 3 --zone "us-central1-b" --scopes "cloud-platform"
```

### Configuración de la integración CME

Instala la integración [Google Cloud Platform][5].

A continuación, podrás acceder a un [dashboard de Google Compute Engine][6] predefinido que muestra métricas, como E/S de disco, uso de CPU y tráfico de red.

### Configuración de la integración GKE

Elige un modo de funcionamiento. El *modo de funcionamiento* se refiere al nivel de flexibilidad, responsabilidad y control que tienes sobre tu clúster. GKE ofrece dos modos de funcionamiento:

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

Sigue las instrucciones de la [sección Autopilot][1] GKE en la página de distribuciones Kubernetes.

#### Controlador de admisiones (Admission Controller)

Para utilizar el [Controlador de admisión][2] con Autopilot, ajusta el [`configMode`][3] del Controlador de admisión a `service` o `hostip`. 

Dado que Autopilot no permite el modo `socket`, Datadog recomienda utilizar `service` (con `hostip` como alternativa) para proporcionar una capa de abstracción más robusta para el controlador. 



[1]: https://docs.datadoghq.com/es/containers/kubernetes/distributions/?tab=helm#autopilot
[2]: https://docs.datadoghq.com/es/containers/cluster_agent/admission_controller/?tab=operator
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1046
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

- [Monitorización de Autopilot GKE con Datadog][7]
- [Monitorización de GKE con Datadog][8]
- [Monitorización de tus cargas de trabajo GKE impulsadas por T2A con Datadog][9]
- [Los nuevos dashboards y métricas de GKE te proporcionan una visibilidad más profunda de tu entorno][10]


[1]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[2]: https://console.cloud.google.com/apis/api/container.googleapis.com
[3]: https://cloud.google.com/sdk/docs/
[4]: https://cloud.google.com/sdk/docs/initializing
[5]: /es/integrations/google_cloud_platform/
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
[8]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[9]: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
[10]: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/