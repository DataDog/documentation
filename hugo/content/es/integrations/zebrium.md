---
app_id: cebrio
app_uuid: a1fa9510-af05-4950-ad67-4eed3f14d4bf
assets:
  dashboards:
    Zebrium Root Cause as a Service Sample Dashboard: assets/dashboards/root_cause_as_a_service_sample_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: zebrium.logs.all.count
      metadata_path: metadata.csv
      prefix: zebrium.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10272
    source_type_name: zebrium
author:
  homepage: https://www.zebrium.com
  name: Zebrium
  sales_email: hello@zebrium.com
  support_email: support@zebrium.com
categories:
- automatización
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zebrium/README.md
display_on_public_website: true
draft: false
git_integration_title: zebrium
integration_id: zebrium
integration_title: Zebrium RCaaS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zebrium
public_title: Zebrium RCaaS
short_description: Descubrir la causa raíz de los problemas directamente en tus dashboards
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Notificaciones
  - Offering::Integration
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Descubrir la causa raíz de los problemas directamente en tus dashboards
  media:
  - caption: Widget de Zebrium en el cual se muestran dos detecciones de causas raíz
      (punto rojo sobre líneas verticales).
    image_url: images/Zebrium_Root_Cause_Finder_Widget.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/
  support: README.md#Soporte
  title: Zebrium RCaaS
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Cuando sabes que hay un problema y no estás seguro de qué lo ha causado, [Zebrium][1] te muestra la causa raíz directamente en tus paneles de Datadog. Funciona mediante machine learning en los registros, sin necesidad de entrenamiento manual ni de establecer reglas, y alcanza la precisión en menos de 24 horas. Los eventos y métricas de detección de Zebrium se envían directamente a Datadog.

## Configuración

La integración de eventos y métricas de Zebrium utiliza una [clave de API Datadog][2] que debe ser creada por un administrador de Datadog. Una vez obtenida la clave de API Datadog, consulta la [documentación de Zebrium para la integración Datadog][3] para aprender a configurar la integración de eventos y métricas de Zebrium para Datadog.


## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Encuentra la causa raíz más rápidamente con Datadog y Zebrium][5]

[1]: https://www.zebrium.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.zebrium.com/docs/monitoring/datadog_autodetect/
[4]: http://docs.datadoghq.com/help
[5]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/