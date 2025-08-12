---
algolia:
  subcategory: Integraciones de Marketplace
app_id: bigpanda-bigpanda
app_uuid: 98cf782f-3d6c-4ea8-8e7b-353da5623794
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.marketplace.bigpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10163
    source_type_name: BigPanda SaaS
author:
  homepage: https://bigpanda.io
  name: BigPanda
  sales_email: ddogmarketplace@bigpanda.io
  support_email: support@bigpanda.io
  vendor_id: bigpanda
categories:
- events
- automatización
- rum
- marketplace
- notificaciones
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bigpanda_saas
integration_id: bigpanda-bigpanda
integration_title: Plataforma SaaS BigPanda
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: bigpanda_saas
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.bigpanda.bigpanda
  product_id: bigpanda
  short_description: Plataforma de automatización y correlación de eventos, impulsada
    por AIOps
  tag: nodo
  unit_label: Nodo monitorizado
  unit_price: 9.0
public_title: Plataforma SaaS BigPanda
short_description: Plataforma de automatización y correlación de eventos, impulsada
  por AIOps
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Plataforma de automatización y correlación de eventos, impulsada por
    AIOps
  media:
  - caption: 'Feed de incidentes de BigPanda: el feed de BigPanda muestra todos los
      incidentes en tu vista y cómo evolucionan con el tiempo.'
    image_url: images/b480d24-Incidents_tab_overview_0.1.png
    media_type: imagen
  - caption: 'Análisis de BigPanda: los dashboards de análisis unificados de BigPanda
      brindan informes y rastrean los KPI para que tu equipo pueda mejorar continuamente.'
    image_url: images/61454f7-The_Unified_Analytics_Tab.png
    media_type: imagen
  - caption: 'Arquitectura de BigPanda: la arquitectura de BigPanda permite una vista
      unificada de 360 ​​grados de todos los datos de monitorización, cambios y topología.'
    image_url: images/958addd-arch.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/bigpanda-datadog-marketplace/
  - resource_type: Documentación
    url: https://docs.bigpanda.io/docs/datadog
  support: README.md#Support
  title: Plataforma SaaS BigPanda
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
BigPanda ayuda a las empresas a prevenir y resolver interrupciones de TI con nuestra plataforma SaaS para la automatización y correlación de eventos, impulsada por AIOps. BigPanda recopila automáticamente alertas de Datadog, así como de cualquier herramienta de terceros, y las correlaciona con incidentes ricos en contexto que ayudan a prevenir interrupciones y reducir los problemas de gestión de incidentes.

BigPanda tiene integraciones listas para usar con todos los productos de monitorización de Datadog, incluidos [Infrastructure][5], [Log Management][6] y [APM][7]. Estas integraciones permiten la ingesta de alertas e información topológica completa para impulsar la correlación y el análisis de causa raíz antes de que los incidentes se conviertan en interrupciones. BigPanda también ingiere datos de CMDB de plataformas ITSM para proporcionar un enriquecimiento de alertas adicional y una vista de stack tecnológico completa de la relación entre los servicios dentro y fuera de Datadog.

El resultado final: los equipos de IT Ops, NOC, DevOps y SRE pueden obtener rápidamente una visión holística de sus alertas y comprender la causa raíz de una aplicación, sistema o servicio de bajo rendimiento, al mismo tiempo que reducen significativamente el ruido de alertas en los entornos de los usuarios y mejoran el MTTR.

Esta oferta en el Marketplace de Datadog brinda acceso a la plataforma BigPanda. Si ya es cliente de BigPanda y necesita conectar su instancia a Datadog, [configure la integración][1].

## Soporte

Para soporte o solicitudes de funciones, ponte en contacto con BigPanda a través del siguiente canal:

- Correo electrónico: [support@bigpanda.io][2]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Optimiza la gestión de incidentes con la oferta de BigPanda en el Marketplace de Datadog][3]
- [Documentación de BigPanda][4]

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: mailto:support@bigpanda.io
[3]: https://www.datadoghq.com/blog/bigpanda-datadog-marketplace/
[4]: https://docs.bigpanda.io/docs/datadog
[5]: https://docs.datadoghq.com/es/infrastructure
[6]: https://docs.datadoghq.com/es/logs
[7]: https://docs.datadoghq.com/es/tracing

---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/bigpanda-bigpanda" target="_blank">adquiere esta aplicación en el Marketplace</a>.