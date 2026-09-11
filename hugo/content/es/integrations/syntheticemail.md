---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-syntheticemail
app_uuid: c3b29bd1-fb32-44ed-aaf5-34d6b8d84bbb
assets:
  dashboards:
    Synthetic Email: assets/dashboards/synthetic_email.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.syntheticemail.rtt
      metadata_path: metadata.csv
      prefix: rapdev.syntheticemail.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10111
    source_type_name: Correo electrónico Synthetic
  monitors:
    Hop-count is changing: assets/monitors/hop_count_change.json
    RTT time is experiencing degradation: assets/monitors/performance_degraded.json
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
git_integration_title: syntheticemail
integration_id: rapdev-syntheticemail
integration_title: Correo electrónico Synthetic
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: syntheticemail
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.syntheticemail
  product_id: syntheticemail
  short_description: Precio unitario por buzón
  tag: buzón
  unit_label: Buzón
  unit_price: 350.0
public_title: Correo electrónico Synthetic
short_description: Monitorización del rendimiento de buzones de correo electrónico
  de ida y vuelta en todo el mundo
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
  - Category::Marketplace
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorización del rendimiento de buzones de correo electrónico de
    ida y vuelta en todo el mundo
  media:
  - caption: Introducción al correo electrónico Synthetic
    image_url: images/video.png
    media_type: vídeo
    vimeo_id: 630489712
  - caption: Correo electrónico Synthetic y tiempos de respuesta
    image_url: images/1.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Correo electrónico Synthetic
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Información general

Esta integración monitoriza los buzones de correo electrónico y mide las entregas completas de mensajes de envío-recepción Synthetic. La integración utiliza tres orígenes geográficos para las entregas de correos electrónicos Synthetic: Virginia (EE.UU.), Frankfurt (UE) y Sydney (AP). El check funciona enviando un correo electrónico de test desde la dirección `probe@synth-rapdev.io` y luego esperando una respuesta automática de tu buzón de salida.  La integración mide el número de saltos, el tiempo de ida y vuelta y los resultados del test (correcto/incorrecto).

## Agent
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales: 

 - Correo electrónico: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222 

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-syntheticemail" target="_blank">adquiere esta aplicación en el Marketplace</a>.