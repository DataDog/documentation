---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-zoom
app_uuid: a79217b7-6499-4de5-8ebd-73a91d227644
assets:
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Phones Overview: assets/dashboards/rapdev_zoom_phones_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.zoom.meetings.count
      metadata_path: metadata.csv
      prefix: rapdev.zoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10150
    source_type_name: RapDev Zoom
  logs: {}
  monitors:
    API usage has hit the rate limit: assets/monitors/zoom_api_rate_limit.json
    Zoom Room has a problem: assets/monitors/zoom_room_has_problem.json
    Zoom Room's Component has a problem: assets/monitors/zoom_room_component_has_problem.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- nube
- colaboración
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_zoom
integration_id: rapdev-zoom
integration_title: Zoom
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_zoom
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.zoom
  product_id: zoom
  short_description: Precio unitario por usuario o dispositivo
  tag: zoom_user_email
  unit_label: Usuario registrado y dispositivo telefónico de Zoom
  unit_price: 1
public_title: Zoom
short_description: Monitoriza tus cuentas de Zoom y optimiza tu licencia
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza tus cuentas de Zoom y optimiza tu licencia
  media:
  - caption: Información general sobre reuniones
    image_url: images/meetings.png
    media_type: imagen
  - caption: Dashboard de salas de Zoom
    image_url: images/rooms.png
    media_type: imagen
  - caption: Información general de la calidad de las reuniones
    image_url: images/meeting_quality.png
    media_type: imagen
  - caption: Dashboard de detalles del usuario
    image_url: images/user_details.png
    media_type: imagen
  - caption: Información general de geolocalización
    image_url: images/geo.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La integración de Zoom tiene la capacidad de monitorizar reuniones, salas, usuarios, estadísticas de red e información general de geolocalización para ofrecer una experiencia óptima a tus empleados, independientemente de dónde se encuentren en el mundo. La integración viene preconfigurada con cuatro dashboards totalmente personalizables que sacan a la superficie la información más crucial. Además, hemos diseñado nuestros visuales para que lleguen sin cambios a altos ejecutivos, gerentes, líderes técnicos, ingenieros ¡y mucho más!

### Monitores

1. La sala de Zoom tiene un problema
2. El componente de la sala de Zoom tiene un problema

### Dashboards

1. Información general de reuniones de RapDev Zoom
2. Dashboard de salas de RapDev Zoom
3. Calidad de la reunión de RapDev Zoom
4. Detalles del usuario de RapDev Zoom
5. Descripción general de la geolocalización de RapDev Zoom
6. Información general de teléfonos de RapDev Zoom

## Ayuda
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information


---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-zoom" target="_blank">adquiere esta aplicación en el Marketplace</a>.