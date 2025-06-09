---
app_id: feed
app_uuid: 182613d4-64f4-458a-bf1c-defc27129758
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14
    source_type_name: Feed
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- gestión de eventos
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: feed
integration_id: feed
integration_title: Feed
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: feed
public_title: Feed
short_description: Recopilar eventos de RSS Feed en Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilar eventos de RSS Feed en Datadog
  media:
  - caption: Configuración de RSS Feed
    image_url: images/rss_setup.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/service_management/events/usage
  support: README.md#Support
  title: Feed
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

![Un evento RSS en el Datadog Events Explorer][1]

La integración de RSS Feed te permite recopilar todos tus eventos de RSS Feed en Datadog, como los feeds de estado del proveedor de la nube o el feed de notas de la versión de Datadog. Utiliza tus eventos de RSS Feed para:

- Establecer alertas para actividades nuevas o inesperadas
- Visualizar y analizar eventos en dashboards
- Debatir eventos de feed con tu equipo

## Configuración

Puedes configurar esta integración utilizando URLs tanto `http://` como `https://`. Sin embargo, sólo las URLs de `https://` con TLS validado cumplen los requisitos de conformidad. Aunque las URLs de `http://` funcionarán correctamente, no cumplen las normas de conformidad.

Para los entornos que deben prestar conformidad, asegúrate de utilizar URLs `https://` en lugar de `http://`.

### Instalación

La configuración requiere:

- Una URL completa a un feed RSS o ATOM
- Al menos una etiqueta personalizada por feed

Si lo deseas, introduce un nombre de usuario y una contraseña para acceder al RSS feed.

![Configuración RSS][2]

### Validación

Comprueba el [Events Explorer][3] para ver la actividad de los RSS feeds en Datadog.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Uso de eventos][5]

[1]: images/rss_event.png
[2]: images/rss_setup_2.png
[3]: https://app.datadoghq.com/event/explorer
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/service_management/events/usage