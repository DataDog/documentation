---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-reporter
app_uuid: debb66b8-6675-4273-85a2-55d806e68e1b
assets:
  dashboards:
    Reporter: assets/dashboards/reporter_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ''
    service_checks:
      metadata_path: service_checks.json
    source_type_id: 10110
    source_type_name: Reporter
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
git_integration_title: reporter
integration_id: rapdev-reporter
integration_title: Reporter
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: reporter
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: reporter
  short_description: Tarifa plana de esta integración
  unit_price: 299
public_title: Reporter
short_description: Generar informes por correo electrónico para cualquier dashboard
  de Datadog
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: Generar informes por correo electrónico para cualquier dashboard de
    Datadog
  media:
  - caption: Presentación del Reporter
    image_url: images/video.png
    media_type: vídeo
    vimeo_id: 630489700
  - caption: Ejemplo de informe por correo electrónico
    image_url: images/3.png
    media_type: imagen
  - caption: Página de configuración del Reporter
    image_url: images/1.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Reporter
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[{{< img src="marketplace/reporter/images/video.png" alt="Presentación del Reporter" >}}](https://www.youtube.com/watch?v=GK5cGDUr1CA)

El Reporter de Datadog te permite programar informes y enviarlos por correo electrónico en un intervalo determinado. Puedes elegir cualquiera de tus dashboards, añadir la URL a la aplicación web del Reporter y establecer el intervalo para su envío. El informe se enviará por correo electrónico a los usuarios en forma de archivo adjunto que pueden abrir y visualizar. Actualmente no hay límite en el número de informes que puedes generar y enviar.

Esta integración configurará un nuevo dashboard en tu instancia Datadog llamado **Datadog Reporter**. Se puede acceder directamente a la aplicación yendo al dashboard y creando un nuevo usuario desde ese iFrame.  *Tu cuenta de Datadog NO funcionará en la aplicación DD Reporter. Debes registrar una cuenta separada*.

## Ayuda

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales: 

 - Correo electrónico: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222 

---
 Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-reporter" target="_blank">adquiere esta aplicación en el Marketplace</a>.