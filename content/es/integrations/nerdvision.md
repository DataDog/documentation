---
algolia:
  subcategory: Integraciones de Marketplace
app_id: nerdvision
app_uuid: dace6217-8e5b-4b96-ae65-b0b58d44cc3e
assets:
  dashboards:
    NerdVision Overview: assets/dashboards/overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nerdvision.clients
      metadata_path: metadata.csv
      prefix: nerdvision.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10140
    source_type_name: NerdVision
author:
  homepage: https://nerd.vision
  name: NerdVision
  sales_email: support@nerd.vision
  support_email: support@nerd.vision
  vendor_id: nerdvision
categories:
- recopilación de logs
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: nerdvision
integration_id: nerdvision
integration_title: NerdVision
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: nerdvision
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.nerdvision.clients
  product_id: clientes
  short_description: Herramienta de depuración y recopilación de datos.
  tag: hostname
  unit_label: cliente
  unit_price: 2
public_title: NerdVision
short_description: Depurador en directo para .NET, Java, Python y Node
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Depurador en directo para .NET, Java, Python y Node
  media:
  - caption: Depurador interactivo en NerdVision.
    image_url: images/debugger.png
    media_type: imagen
  - caption: Lista de errores capturados en NerdVision.
    image_url: images/error_list.png
    media_type: imagen
  - caption: Dashboard de NerdVision en Datadog.
    image_url: images/screenshot_datadog.png
    media_type: imagen
  - caption: Detalles de snapshot en NerdVision.
    image_url: images/snapshot_details.png
    media_type: imagen
  - caption: Lista de snapshots en NerdVision.
    image_url: images/snapshot_list.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: NerdVision
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

### ¿Qué es NerdVision?

NerdVision es una plataforma de depuración en directo que te permite obtener una visión detallada de tu aplicación en cualquier momento. NerdVision
te permite instalar puntos de traza en tu aplicación para recopilar datos sobre el estado de tus aplicaciones sin reiniciar o
cambiar el código.

Después de registrarte, esta integración crea un dashboard y sincroniza todos los eventos y logs del grupo de NerdVision a tu organización
de Datadog.

#### Observadores y condicionales

Utiliza condicionales para limitar la activación de tu punto de traza al caso específico que te interese. Añade observadores para mejorar el
contexto e incluir los datos más importantes para el problema o que no forman parte de la captura de variables.

### Dashboard de NerdVision Datadog

El dashboard de Datadog te ofrece la información que necesitas para ver en qué parte de tu código se activan los puntos de traza. Lo que te permite
identificar los hotspots de la actividad de depuración.

### Eventos

Cada punto de traza que se active será enviado a Datadog como un evento, conteniendo las etiquetas (tags) apropiadas y un enlace para ver los
datos en NerdVision. Los puntos de traza te permiten reunir el stack tecnológico completo y las variables que están activas en el marco en que el punto de traza
se activa.

### Logs

Con el registro dinámico, puedes inyectar nuevos mensajes de log en cualquier punto de tu código para añadir esos datos adicionales que necesitabas. Cada mensaje de log
que se activa será sincronizado con Datadog tan pronto como haya sido procesado por NerdVision.

### Métricas

NerdVision produce métricas para clientes en línea y activadores del punto de traza.

### Checks de servicios

NerdVision no incluye ningún check de servicio.

## Agent

Para soporte o solicitudes de funciones, contacta con NerdVision a través del siguiente canal:

- Correo electrónico: [support@nerd.vision][4]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorizar datos de depuración con la integración de NerdVision en el Datadog Marketplace][5]
- [Documentación de NerdVision][6]

[1]: https://app.nerd.vision
[2]: https://app.nerd.vision/setup
[3]: https://app.nerd.vision
[4]: mailto:support@nerd.vision
[5]: https://www.datadoghq.com/blog/monitor-nerdvision-datadog-marketplace/
[6]: https://docs.nerd.vision/
---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/nerdvision" target="_blank">Haz clic aquí</a> para comprar esta aplicación.