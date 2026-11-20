---
algolia:
  subcategory: Integraciones de Marketplace
app_id: flagsmith-platform
app_uuid: ad6a3059-12b6-4a11-a72c-336d732add15
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
  vendor_id: flagsmith
categories:
- Configuración y despliegue
- marketplace
- pruebas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: flagsmith_flagsmith
integration_id: flagsmith-platform
integration_title: Flagsmith
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: flagsmith_flagsmith
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.flagsmith.seat
  product_id: flagsmith-license
  short_description: El precio es de $75 al mes por asiento.
  tag: asiento
  unit_label: Asiento
  unit_price: 75
public_title: Flagsmith
short_description: Flagsmith es un servicio de marca de función y de configuración
  remota de código abierto
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Category::Testing
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Flagsmith es un servicio de marca de función y de configuración remota
    de código abierto
  media:
  - caption: Gestiona funciones y configuración remota. Desacopla el despliegue y
      la publicación.
    image_url: images/dashboard_home.png
    media_type: imagen
  - caption: Realiza tests A/B y multivariantes con Flagsmith.
    image_url: images/dashboard_mv_flags.png
    media_type: imagen
  - caption: Integra y controla las marcas de Flagsmith y logs de auditoría directamente
      desde tus dashboards de Datadog.
    image_url: images/dashboard_widget.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/flagsmith-datadog-marketplace/
  support: README.md#Support
  title: Flagsmith
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[Flagsmith][1] te ayuda a publicar funciones con confianza y gestiona los marcas de funciones en aplicaciones web, móviles y del lado del servidor. Utiliza la API alojada en Flagsmith, despliégala en tu propia nube privada o ejecútala on-premise.

Flagsmith proporciona una plataforma todo en uno para desarrollar, implementar y gestionar tus marcas de funciones. Tanto si estás dejando atrás una solución interna como si es la primera vez que utilizas alternancias, Flagsmith te proporcionará potencia y eficacia.

### Gestión de marcas en varias plataformas

Flagsmith facilita la creación y gestión de funciones de alternancia en aplicaciones web, móviles y del lado del servidor. Ajusta una sección de código con una marca y, a continuación, utiliza Flagsmith para gestionar esa función.

### Potentes reglas de segmentación

Gestiona las marcas de funciones por entorno de desarrollo y por grupo de usuarios, ya sean usuarios individuales, un segmento de usuarios o un porcentaje. Esto te permite implementar prácticas como los despliegues canarios.

### Realiza tests A/B y multivariantes

Las marcas multivariante te permiten utilizar una división porcentual entre dos o más variaciones para pruebas A/B/n y experimentación precisas.

### Dashboards

Visualiza y controla las marcas de Flagsmith directamente desde tus dashboards de Datadog.

### Eventos

Envía eventos de cambio de marcas desde Flagsmith a tu stream (flujo) de eventos de Datadog con la [integración de Datadog y Flagsmith][2].

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Flagsmith a través del siguiente canal:

- [Asistencia técnica de Flagsmith][4]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Publica funciones más rápidamente y rastrea su efecto con la integración de Flagsmith y la oferta de Datadog Marketplace][5]

[1]: https://flagsmith.com/
[2]: https://app.datadoghq.com/integrations/flagsmith
[3]: https://docs.flagsmith.com/integrations/datadog
[4]: https://flagsmith.com/contact-us/
[5]: https://www.datadoghq.com/blog/flagsmith-datadog-marketplace/

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/flagsmith-platform" target="_blank">adquiere esta aplicación en el Marketplace</a>.