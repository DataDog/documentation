---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-hpux-agent
app_uuid: 5e611b0d-a099-4823-a4ba-e42b1012b3b5
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.hpux_agent
      metadata_path: metadata.csv
      prefix: rapdev.hpux_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10185
    source_type_name: RapDev HP-UX Agent
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_hpux_agent
integration_id: rapdev-hpux-agent
integration_title: HP-UX Agent
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_hpux_agent
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.hpux_agent
  product_id: hpux-agent
  short_description: Precio unitario por host
  tag: host
  unit_label: HP-UX Agent
  unit_price: 100.0
public_title: HP-UX Agent
short_description: Agent del sistema que proporciona métricas para HP-UX 11.31 para
  hppa e itanium
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Agent del sistema que proporciona métricas para HP-UX 11.31 para hppa
    e itanium
  media:
  - caption: Lista de infraestructuras
    image_url: images/1.png
    media_type: imagen
  - caption: Métricas de host
    image_url: images/2.png
    media_type: imagen
  - caption: Logs
    image_url: images/3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: HP-UX Agent
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->

## Información general

El HP-UX Agent te permite recopilar y generar informes sobre métricas del sistema dentro de Datadog. La integración es compatible con HP-UX 11.31 en las arquitecturas PA-RISC e Itanium. El HP-UX Agent usa la distribución del sistema Perl de HP-UX predeterminada y no requiere dependencias de librerías adicionales, lo que simplifica la instalación y la compatibilidad.

El HP-UX Agent proporciona los metadatos de host necesarios para admitir la lista de infraestructuras de Datadog, lo que permite que tu organización trabaje con sistemas host de HP-UX similares a otros sistemas operativos host de Datadog compatibles.

El HP-UX Agent usa las mismas URLs y puertos que los Agents nativos. Actualmente, el HP-UX Agent admite métricas de infraestructura central, checks de procesos y colas de log. No admite checks del Agente personalizados, integraciones ni checks de servicio.

## Ayuda

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

 - Correo electrónico: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent" target="_blank">adquiere esta aplicación en el Marketplace</a>.
