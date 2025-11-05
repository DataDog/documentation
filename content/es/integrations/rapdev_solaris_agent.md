---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-solaris-agent
app_uuid: a994f2cf-1f77-4e74-803d-fb833455e224
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.solaris_agent
      metadata_path: metadata.csv
      prefix: rapdev.solaris_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10135
    source_type_name: RapDev Solaris Agent
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_solaris_agent
integration_id: rapdev-solaris-agent
integration_title: Solaris Agent
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_solaris_agent
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.solaris_agent
  product_id: solaris-agent
  short_description: Precio unitario por host
  tag: host
  unit_label: Solaris Agent
  unit_price: 100.0
public_title: Solaris Agent
short_description: Agent que proporciona métricas para Solaris 10 y 11 en SPARC e
  i86pc
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Categoría::Oracle
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Agent que proporciona métricas para Solaris 10 y 11 en SPARC e i86pc
  media:
  - caption: Lista de infraestructuras
    image_url: images/1.png
    media_type: imagen
  - caption: Detalles de la infraestructura del host
    image_url: images/2.png
    media_type: imagen
  - caption: Métricas de host
    image_url: images/3.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Solaris Agent
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->

## Información general

El Solaris Agent te permite recopilar y generar informes sobre métricas del sistema de Solaris dentro de Datadog. La integración es compatible con Solaris 10 y 11, así como con las arquitecturas SPARC e i86pc. El Solaris Agent usa la distribución del sistema Perl de Solaris predeterminada y no requiere dependencias de librerías adicionales, lo que simplifica la instalación y la compatibilidad.

El Solaris Agent proporciona los metadatos de host necesarios para admitir la lista de infraestructuras de Datadog, lo que permite que tu organización trabaje con sistemas host de Solaris similares a otros sistemas operativos host de Datadog compatibles.

El Solaris Agent usa las mismas URLs y puertos que los Agents nativos. El Solaris Agent admite métricas de infraestructura central, checks de procesos y colas de log. No admite integraciones ni checks de servicio.

## Ayuda

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

 - Correo electrónico: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent" target="_blank">adquiere esta aplicación en el Marketplace</a>.
