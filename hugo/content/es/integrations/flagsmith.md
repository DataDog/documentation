---
app_id: flagsmith
app_uuid: 0ad66873-2958-4ca5-ae25-ee893b4c6e31
assets:
  dashboards:
    Flagsmith Dashboard: assets/dashboards/flagsmith-dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: flagsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10137
    source_type_name: Flagsmith
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- seguimiento de problemas
- herramientas de desarrollo
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith
integration_id: flagsmith
integration_title: Flagsmith
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: flagsmith
public_title: Flagsmith
short_description: Los eventos de cambio de marcadores de Flagsmith aparecen en Datadog
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
  - Categoría::Seguimiento de incidencias
  - Categoría::Herramientas de desarrollo
  - Oferta::Extensión de la interfaz de usuario
  configuration: README.md#Configuración
  description: Los eventos de cambio de marcadores de Flagsmith aparecen en Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Flagsmith][1] facilita la gestión de características en aplicaciones web, móviles y del lado del servidor. La integración Flagsmith Datadog te permite ver información sobre cambios de marcadores directamente en Datadog.

Flagsmith proporciona las siguientes integraciones con Datadog:

### Integración de eventos

Todos los eventos de cambios de marcadores se envían a Datadog. Estos eventos se etiquetan con el entorno en el que se cambiaron.

### Widget de dashboard

El widget de dashboard de Flagsmith te permite ver tus marcadores y tus logs de auditorías de Flagsmith directamente en Datadog.

## Configuración

En el [dashboard de Flagsmith][2], selecciona el menú de integraciones y, a continuación, añade la integración Datadog. Introduce tu [clave de API Datadog][3]. Para la URL de base, introduce `https://api.datadoghq.com`, si utilizas el sitio Datadog US, o `https://api.datadoghq.eu`, si utilizas el sitio Datadog UE.

### Widget del dashboard de Flagsmith

1. En el [cuadro de la integración Flagsmith][4], asegúrate de que la integración está instalada.
1. Asegúrate de haber iniciado sesión en Flagsmith con la cuenta que quieres ver en Datadog.
1. En Datadog, ve a un dashboard existente o crea uno nuevo.
1. Pulsa el botón **Add widgets** (Añadir widgets) para abrir el cajón de widgets.
1. Busca **Flagsmith** para encontrar el widget de Flagsmith en la sección **Apps** (Aplicaciones) del cajón de widgets.
1. Selecciona el **icono del widget de Flagsmith** para añadirlo a tu dashboard y abre el modal del **Editor de Flagsmith**. Puedes elegir entre añadir el widget del visor de Marcadores o del Log de auditoría.
1. Selecciona la organización, el proyecto y el entorno Flagsmith que quieres añadir a tu dashboard.
1. Una vez seleccionados, copia y pega el **ID de proyecto** y el **ID de entorno** en Datadog.
1. Selecciona el tamaño de página y, opcionalmente, un título de widget y una etiqueta (tag) de Flagsmith para filtrar.
1. Haz clic en **Save** (Guardar) para finalizar la configuración del widget del dashboard.

## Datos recopilados

### Métricas

La integración Flagsmith no incluye métricas.

### Checks de servicio

La integración Flagsmith no incluye checks de servicio.

### Eventos

Todos los eventos Flagsmith se envían al flujo (stream) de eventos Datadog.

## Solucionar problemas

¿Necesitas ayuda? Consulta la [documentación de Flagsmith][5] o ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://www.flagsmith.com/
[2]: https://app.flagsmith.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/integrations/flagsmith
[5]: https://docs.flagsmith.com/integrations/datadog/
[6]: https://docs.datadoghq.com/es/help/