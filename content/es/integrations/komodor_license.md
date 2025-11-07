---
algolia:
  subcategory: Integraciones del Marketplace
app_id: komodor-komodor
app_uuid: d62310ba-c7a8-4c5b-ab9f-60bb46527f1b
assets: {}
author:
  homepage: https://komodor.com
  name: Komodor
  sales_email: datadogsales@komodor.com
  support_email: support@komodor.com
  vendor_id: komodor
categories:
- configuración y despliegue
- contenedores
- seguimiento de problemas
- kubernetes
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: licencia_komodor
integration_id: komodor-komodor
integration_title: Komodor
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: licencia_komodor
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.komodor.komodor
  product_id: komodor
  short_description: Niveles de tarifas basados en el volumen de nodos
  tag: nodo
  unit_label: Nodo monitorizado
  unit_price: 30.0
public_title: Komodor
short_description: Plataforma Kubernetes para la resolución de problemas
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Contenedores
  - Categoría::Seguimiento de incidentes
  - Categoría::Kubernetes
  - Categoría::Marketplace
  - Oferta::Licencia de software
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Plataforma Kubernetes para la resolución de problemas
  media:
  - caption: Vista principal del servicio Komodor y visibilidad completa de la carga
      de trabajo
    image_url: images/Komodor_screen_01.png
    media_type: imagen
  - caption: Correlacionar diferentes servicios y agrupar la cadena de eventos en
      una única línea de tiempo
    image_url: images/Komodor_screen_02.png
    media_type: imagen
  - caption: Comparar fácilmente los cambios de manifiesto y configuración de Kubernetes
      a través de Komodor
    image_url: images/Komodor_screen_03.png
    media_type: imagen
  - caption: Profundizar en estados y logs de pods sin un solo comando kubectl
    image_url: images/Komodor_screen_04.png
    media_type: imagen
  - caption: Conectar alertas de Datadog, eventos de Kubernetes y problemas de disponibilidad
      en una vista sencilla
    image_url: images/Komodor_screen_06.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Komodor
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Komodor realiza un seguimiento de los cambios en la totalidad de tu stack tecnológico de K8s, analiza sus efectos dominó y te proporciona el contexto que necesitas para solucionar los problemas de forma eficaz e independiente. Komodor te ofrece información de tus despliegues Kubernetes en una línea de tiempo con detalles relevantes como qué cambió, qué código se envió y quién lo envió. También puedes ver datos de Git, mapas de configuración, tu infraestructura, alertas y otras herramientas como Datadog en una pantalla centralizada y fácil de entender.

Esta oferta del Marketplace de Datadog proporciona acceso a la plataforma Komodor. Si ya eres cliente de Komodor y necesitas conectar tu instancia a Datadog, [configura la integración][1].

## Agent
En Komodor, nos comprometemos a proporcionarte las herramientas y la información que necesitas para tener éxito. Para ello, te ofrecemos diferentes formas de obtener la ayuda que necesitas, cuando la necesitas. Puedes enviarnos mensajes desde dentro de la aplicación Komodor (botón de comunicación en la parte inferior derecha), utilizar los documentos y las FAQ para encontrar información, o abrir un ticket de asistencia enviando un correo electrónico a [support@komodor.com](mailto:support@komodor.com).


[1]: https://app.datadoghq.com/integrations/komodor
---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/komodor-komodor" target="_blank">adquiere esta aplicación en el Marketplace</a>.