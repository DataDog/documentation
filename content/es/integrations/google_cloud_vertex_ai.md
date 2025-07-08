---
app_id: google-cloud-vertex-ai
app_uuid: f0fb4feb-2d9d-467b-ad18-d2d2d1b21144
assets:
  dashboards:
    gcp_vertex_ai_screen: assets/dashboards/gcp_vertex_ai_screen.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.aiplatform.prediction.online.prediction_count
      metadata_path: metadata.csv
      prefix: gcp.aiplatform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 368
    source_type_name: Google Cloud Vertex AI
  monitors:
    Fluctuating Replica Count: assets/monitors/fluctuating_replica_count_monitor.json
    High CPU Utilization: assets/monitors/high_cpu_util_monitor.json
    High Memory Usage: assets/monitors/high_memory_usage_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies: []
description: Google Cloud Vertex AI permite a los desarrolladores de Machine Learning
  entrenar modelos de Machine Learning personalizados de alta calidad con un mínimo
  de experiencia en Machine Learning y de esfuerzo.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_vertex_ai/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitorización-Datadog/
  tag: Blog
  text: Monitorizar Google Cloud Vertex AI con Datadog
git_integration_title: google_cloud_vertex_ai
has_logo: true
integration_id: google-cloud-vertex-ai
integration_title: Google Cloud Vertex AI
integration_version: ''
is_public: true
manifest_version: 2.0.0
monitors:
  Fluctuating Replica Count: assets/monitors/fluctuating_replica_count_monitor.json
  High CPU Utilization: assets/monitors/high_cpu_util_monitor.json
  High Memory Usage: assets/monitors/high_memory_usage_monitor.json
name: google_cloud_vertex_ai
public_title: Google Cloud Vertex AI
short_description: Permite a los desarrolladores entrenar modelos de Machine Learning
  personalizados de alta calidad con un mínimo de experiencia y de esfuerzo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Data Stores
  - Category::Google Cloud
  - Category::Log Collection
  - Category::AI/ML
  - Offering::Integration
  configuration: README.md#Configuración
  description: Permite a los desarrolladores entrenar modelos de Machine Learning
    personalizados de alta calidad con un mínimo de experiencia y de esfuerzo.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitorización-Datadog/
  support: README.md#Soporte
  title: Google Cloud Vertex AI
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Vertex AI permite a los desarrolladores, científicos de datos e ingenieros de datos de Machine Learning llevar sus proyectos desde
la ideación hasta el despliegue, de forma rápida y rentable. Entrena modelos de Machine Learning personalizados de alta calidad con un mínimo
de experiencia en Machine Learning y de esfuerzo.

## Configuración

### Instalación

#### Recopilación de métricas

Google Cloud Vertex AI se incluye en el paquete de la [integración Google Cloud Platform][1]. 
Si aún no lo has hecho, configura primero la [integración Google Cloud Platform][1] para empezar a recopilar métricas predefinidas.

#### Configuración

Para recopilar etiquetas (labels) de Vertex AI como etiquetas (tags), activa el rol de Visor de recursos en la nube.

Puedes utilizar la [suplantación de cuentas de servicio][2] y la detección automática de proyectos para integrar Datadog con [Google Cloud][1].

Este método te permite monitorizar todos los proyectos visibles para una cuenta de servicio, asignando roles IAM 
en los proyectos pertinentes. Puedes asignar estos roles a proyectos individualmente o puedes configurar 
Datadog para monitorizar grupos de proyectos, asignando estos roles a nivel de organización o de carpeta. 
Asignar roles de esta manera permite a Datadog detectar automáticamente y monitorizar todos los proyectos en el 
contexto determinado, incluyendo los nuevos proyectos que puedan añadirse al grupo en el futuro. 

#### Recopilación de logs

Los logs de Google Cloud Vertex AI se recopilan con Google Cloud Logging y se envían a un trabajo Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow Datadog][3].

Una vez hecho esto, exporta tus logs de Google Cloud Vertex AI desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][4] y filtra los logs de Google Cloud Vertex AI.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-vertex-ai" >}}

### Checks de servicios

Google Cloud Vertex AI no incluye checks de servicios.

### Eventos

Google Cloud Vertex AI no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[3]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[4]: https://console.cloud.google.com/logs/viewer
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vertex_ai/metadata.csv
[6]: https://docs.datadoghq.com/es/help/