---
algolia:
  subcategory: Integraciones de Marketplace
app_id: moovingon-moovingonai
app_uuid: a0d25aed-b2ca-43dc-b083-aaaa5165f603
assets: {}
author:
  homepage: https://www.moovingon.com/platform
  name: MoovingON
  sales_email: sales@moovingon.com
  support_email: support@moovingon.com
  vendor_id: moovingon
categories:
- incidentes
- alertas
- automatización
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: moovingon_moovingonai
integration_id: moovingon-moovingonai
integration_title: moovingon.ai
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: moovingon_moovingonai
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: moovingonai
  short_description: Los precios de moovingon.ai se basan en usuarios activos y alertas
    entrantes
  unit_price: 1799.0
public_title: moovingon.ai
short_description: Plataforma de orquestación, automatización y corrección de NOC
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Alerting
  - Category::Automation
  - Category::Marketplace
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Software License
  configuration: README.md#Setup
  description: Plataforma de orquestación, automatización y corrección de NOC
  media:
  - caption: Stream (flujo) central de alertas de moovingon.ai y gestión de libro
      de ejecución
    image_url: images/moovingon_ai-events.png
    media_type: imagen
  - caption: Arrastrar y soltar el creador de directrices de libro de ejecución
    image_url: images/moovingon_ai-guidelines.png
    media_type: imagen
  - caption: Dashboard de Datadog de moovingon.ai
    image_url: images/moovingon_ai-overview-dashbard.png
    media_type: imagen
  - caption: Panel de integraciones de moovingon.ai
    image_url: images/moovingon.ai-integrations.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: moovingon.ai
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

moovingon.ai Revoluciona la forma en que los equipos de operaciones en la nube y NOC gestionan la fiabilidad y resistencia de los sistemas de producción. Al fusionar y optimizar las alertas en tu marco de observabilidad y al conectar estas alertas con libros de ejecución automáticos, estás fomentando una operación más sencilla y eficiente. Este método garantiza que tus sistemas estén bajo estrecha vigilancia y que cualquier incidente se resuelva rápidamente y se reduzcan así las caídas del sistema y se mejore la eficiencia operativa.

A través de la [integración predefinida][1], moovingon.ai utiliza los monitores, logs y datos de eventos de Datadog para la correlación y agregación de alertas.

Todas las acciones de corrección realizadas en moovingon.ai se envían a Datadog como eventos para una mayor claridad en el cumplimiento y la corrección. Además, moovingon.ai proporciona análisis que permiten obtener información de las alertas de Datadog en Datadog. Esto ayuda a tomar decisiones proactivas y a analizar tendencias.

## Asistencia técnica

Para obtener asistencia técnica, ponte en contacto con MoovingON a través de los siguientes canales:

-   Teléfono: +972-4-9116000
-   Correo electrónico: <support@moovingon.com>
-   Página web: <https://www.moovingon.com/contact-us/>

[1]: https://app.datadoghq.com/integrations/moovingon-ai

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/moovingon-moovingonai" target="_blank">adquiere esta aplicación en el Marketplace</a>.