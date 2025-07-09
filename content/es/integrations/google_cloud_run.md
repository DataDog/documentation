---
app_id: google-cloud-run
app_uuid: 20ba733c-60a3-4c78-9c54-0f86025d6ea6
assets:
  dashboards:
    gcp_cloudrun: assets/dashboards/gcp_cloudrun.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.run.container.cpu.allocation_time
      metadata_path: metadata.csv
      prefix: gcp.run.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 233
    source_type_name: Google Cloud Run
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- contenedores
- nube de Google
- colección de logs
- orquestación
custom_kind: integración
dependencies: []
description: Recopila métricas, trazas (traces) y logs de todos tus clústeres y analízalos
  en Datadog.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  tag: Blog
  text: Monitorizar Cloud Run con Datadog
- link: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  tag: Blog
  text: Cómo recopilar métricas de Google Cloud Run
- link: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  tag: Blog
  text: Métricas clave para monitorizar Google Cloud Run
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: Documentación
  text: Google Cloud Run para Anthos
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_run
public_title: Google Cloud Run
short_description: Ejecuta contenedores sin estado invocados mediante solicitudes
  HTTP en una plataforma informática gestionada.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Category::Containers
  - Categoría::Google Cloud
  - Category::Log Collection
  - Category::Orchestration
  - Offering::Integration
  configuration: README.md#Setup
  description: Ejecuta contenedores sin estado invocados mediante solicitudes HTTP
    en una plataforma informática gestionada.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  - resource_type: Documentación
    url: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  support: README.md#Support
  title: Google Cloud Run
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Cloud Run es una plataforma de computación administrada que permite ejecutar contenedores sin estado que se pueden invocar mediante solicitudes HTTP.

Habilita esta integración e instrumenta tu contenedor para ver todas tus métricas, trazas (traces) y logs de Cloud Run en Datadog.

Para más información sobre Cloud Run para Anthos, consulta la [documentación de Google Cloud Run para Anthos][1].

## Configuración

### Recopilación de métricas

#### Instalación

Configura la [integración de Google Cloud Platform][2] para empezar a recopilar métricas de forma predefinida. Para configurar métricas personalizadas, consulta la [documentación serverless][3]. 

### Recopilación de logs

#### Integración
Google Cloud Run también expone [logs de auditoría][4].
Los logs de Google Cloud Run se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema de Cloud Pub/Sub. Si todavía no lo has hecho, [configura el registro con la plantilla Datadog Dataflow][5].

Una vez hecho esto, exporta tus logs de Google Cloud Run de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][6] y filtra los logs de Google Cloud Run.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

#### Registro directo
Para más información sobre el registro directo de aplicaciones en Datadog desde tus servicios de Cloud Run, consulta la [documentación serverless][3].

### Rastreo

Para obtener más información sobre las instrucciones de configuración especializadas del Agent para Google Cloud Run totalmente administrado, consulta la [documentación serverless][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-run" >}}


### Eventos

La integración Google Cloud Functions no incluye eventos.

### Checks de servicios

La integración Google Cloud Functions no incluye checks de servicio.


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/es/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/es/help/