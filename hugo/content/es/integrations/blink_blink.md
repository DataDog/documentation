---
algolia:
  subcategory: Integraciones de Marketplace
app_id: blink-blink
app_uuid: eaa3426f-383b-44b4-a7f9-ff9706ed37f8
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10327
    source_type_name: Blink_blink
author:
  homepage: https://blinkops.com
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
  vendor_id: blink-subscription
categories:
- orquestación
- notificaciones
- automatización
- nube
- seguridad
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: blink_blink
integration_id: blink-blink
integration_title: Blink
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: blink_blink
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: blink
  short_description: Hasta 5000 acciones y 10 usuarios.
  unit_price: 500
public_title: Blink
short_description: Blink es una plataforma de automatización sin código para la seguridad
  y la infraestructura
supported_os:
- linux
- Windows
- MacOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Orchestration
  - Category::Notifications
  - Category::Automation
  - Category::Cloud
  - Category::Security
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Blink es una plataforma de automatización sin código para la seguridad
    y la infraestructura
  media:
  - caption: Crea y actualiza automáticamente los incidentes de Datadog mediante flujos
      de trabajo interactivos de Blink.
    image_url: images/incident.png
    media_type: imagen
  - caption: Consulta rápidamente una lista de todas las incidencias activas de Datadog
      desde tu automatización de Blink.
    image_url: images/list-incidents.png
    media_type: imagen
  - caption: Conecta la integración de Blink para empezar a crear automatizaciones
      que tomen medidas en respuesta a los incidentes de Datadog.
    image_url: images/connection-creation.png
    media_type: imagen
  - caption: Utilice automatizaciones programadas de Blink para crear automáticamente
      incidentes de Datadog para eventos periódicos.
    image_url: images/new-incident.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

[Blink][1] es una plataforma de bajo código/sin código (LNCN) que permite la respuesta automatizada a incidentes, operaciones nativas en la nube y flujos de trabajo de operaciones de seguridad. Blink transforma las tareas manuales en automatizaciones interactivas respaldadas por la seguridad y fiabilidad de una plataforma nativa en la nube. Cada script o ticket se convierte en una automatización totalmente gestionada. 

La interfaz de usuario y la [biblioteca de automatizaciones][2] vienen con 5000 flujos de trabajo nativos de la nube que facilitan la creación de nuevas automatizaciones. Blink te ayuda a lograr una mayor eficiencia de la nube y unos SLA más competitivos, con menos cuellos de botella operativos.

Visita nuestra [integración lista para usar][6], que te permite lo siguiente:

- Activar automatizaciones de Blink basadas en eventos mediante incidentes de Datadog 
- Crear y actualizar automáticamente incidentes en Datadog desde Blink
- Ver incidentes o eventos desde el explorador de eventos de Datadog en Blink
- Enriquecer y corregir automáticamente los incidentes de Datadog mediante automatizaciones de Blink.

Para obtener más información sobre Blink, consulta la [documentación sobre Blink][3].

## Soporte técnico 

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][3].

[1]: https://blinkops.com/
[2]: https://library.blinkops.com/
[3]: https://www.docs.blinkops.com/
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://docs.datadoghq.com/es/help/
[6]: https://app.datadoghq.com/integrations/blink
[7]: https://app.blinkops.com/signup
[8]: mailto:support@blinkops.com

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/blink-blink" target="_blank">adquiere esta aplicación en el Marketplace</a>.