---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-webex
app_uuid: f05f455f-3793-408c-8a8d-7a19a4d3b844
assets:
  dashboards:
    Rapdev Webex Dashboard: assets/dashboards/dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.webex.meetings
      metadata_path: metadata.csv
      prefix: rapdev.webex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643593
    source_type_name: RapDev Webex
  monitors:
    Webex Integration Failed to Connect: assets/monitors/monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- colaboración
- gestión de eventos
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_webex
integration_id: rapdev-webex
integration_title: Webex
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_webex
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.webex
  product_id: webex
  short_description: Precio unitario por usuario activo
  tag: mostrar_nombre
  unit_label: Usuario activo
  unit_price: 1
public_title: Webex
short_description: Visualizar información de licencias, reuniones y participantes
  de Webex en forma de métricas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Colaboración
  - Categoría::Gestión de eventos
  - Categoría::Mercado
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Visualizar información de licencias, reuniones y participantes de Webex
    en forma de métricas
  media:
  - caption: Dashboard de RapDev Webex
    image_url: images/dashboard_example.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Webex
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Webex, de Cisco, es una aplicación de conferencias web y vídeo. El paquete Webex incluye aplicaciones como Webex Meetings, Webex Teams y Webex Devices.

La integración Webex informa sobre reuniones, participantes, licencias, personas, localizaciones, dispositivos,
espacios de trabajo y grupos de tu organización. La información recopilada incluye lo siguiente:
- Número de reuniones actualmente activas por host de reunión
- Visualización del número y de los nombres de los participantes en cada reunión
- Alertas sobre el uso de licencias y dispositivos Webex
- Depuración de problemas con invitaciones pendientes o inicios de sesión desactivados
- Visualización geográfica de localizaciones Webex

Nota: La integración Webex no admite actualmente funciones de calidad de las llamadas, ya que no se admite el contexto necesario para obtener esta información.


## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][4]
- Ventas: [sales@rapdev.io][1]
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222
---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][4] a RapDev y la crearemos!*

[1]: mailto:sales@rapdev.io
[2]: https://developer.webex.com/docs/integrations#scopes
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: mailto:support@rapdev.io
[5]: https://www.rapdev.io/#Get-in-touch

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-webex" target="_blank">adquiera esta aplicación en el Marketplace</a>.