---
app_id: harness-cloud-cost-management
app_uuid: 3eb2e9ef-2c9c-45b6-8f1c-8a900910f948
assets:
  dashboards:
    harness_cloud_cost_management_overview: assets/dashboards/harness_cloud_cost_management_overview.json
author:
  homepage: https://www.harness.io
  name: Harness IO
  sales_email: akash.bhardwaj@harness.io
  support_email: akash.bhardwaj@harness.io
categories:
- gestión de costes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/harness_cloud_cost_management/README.md
display_on_public_website: true
draft: false
git_integration_title: harness_cloud_cost_management
integration_id: harness-cloud-cost-management
integration_title: Gestión de costes de la nube Harness
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: harness_cloud_cost_management
public_title: Gestión de costes de la nube Harness
short_description: Visualización de tus métricas de costes de la nube y del clúster
  Harness en un rango de fechas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Gestión de costes
  - Oferta::Extensión de la interfaz de usuario
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Visualización de tus métricas de costes de la nube y del clúster Harness
    en un rango de fechas
  media:
  - caption: Vídeo con información general de la gestión de costes en la nube
    image_url: images/ccm_dashboard_video_thumbnail.png
    media_type: vídeo
    vimeo_id: 637675885
  - caption: Dashboard de gestión de costes en la nube en Datadog
    image_url: images/ccm_dashboard_on_datadog.png
    media_type: imagen
  - caption: Dashboard de Harness Cloud Cost Management
    image_url: images/ccm_dashboard_on_harness.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Gestión de costes de la nube Harness
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Harness ofrece la gestión y la transparencia de los costes de la nube a través de infraestructuras, equipos de ingeniería y finanzas con una sólida inteligencia empresarial y la capacidad de reducir los costes desperdiciados de la nube con Intelligent Cloud AutoStopping y recomendaciones basadas en Machine Learning.

Con Datadog y Harness, puedes:

- Visualizar datos de costes de la nube y del clúster de Harness
- Identificar las tendencias de costes y previsión de costes
- Obtener recomendaciones para reducir los recursos de forma pertinente
- Revisar los principales recursos de gastos


## Configuración

1. Si aún no ha empezado a utilizar Harness Cloud Cost Management, [regístrate][1] para obtener una prueba de 14 días.

2. Instale el sitio integración.
3. Ve al dashboard de Harness Cloud Cost Management y conéctate en cualquiera de los widgets iniciando sesión con tu ID de usuario de Harness. Esto te autentica para todos los widgets.

### Eventos

El check de Harness Cloud Cost Management no incluye eventos.

### Checks de servicio

El check de Harness Cloud Cost Management no incluye checks de servicio.

## Agent

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://app.harness.io/auth/#/signup/
[2]: https://docs.datadoghq.com/es/help/