---
algolia:
  subcategory: Integraciones del Marketplace
app_id: insightfinder-insightfinder-license
app_uuid: 6f2fcb70-c087-412a-b221-360ba6a1c68f
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10299
    source_type_name: Licencia de InsightFinder
author:
  homepage: https://insightfinder.com/
  name: InsightFinder
  sales_email: info@insightfinder.com
  support_email: support@insightfinder.com
  vendor_id: insightfinder
categories:
- events
- marketplace
- notificaciones
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: insightfinder_insightfinder
integration_id: insightfinder-insightfinder-license
integration_title: InsightFinder
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: insightfinder_insightfinder
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.insightfinder.insightfinder
  product_id: insightfinder
  short_description: Plataforma de predicción e investigación de incidentes con tecnología
    AIOps
  tag: nodo
  unit_label: Nodo monitorizado
  unit_price: 10
public_title: InsightFinder
short_description: Plataforma de IA centrada en el ser humano para la investigación
  y la prevención de incidentes
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Marketplace
  - Categoría::Notificaciones
  - Categoría::IA/ML
  - Oferta::Licencia de software
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Plataforma de IA centrada en el ser humano para la investigación y
    la prevención de incidentes
  media:
  - caption: Plataforma AIOps InsightFinder para la predicción y la investigación
      de incidentes.
    image_url: images/InsightFinder_healthview.png
    media_type: imagen
  - caption: Dashboard de la plataforma AIOps InsightFinder para una vista holística
      del estado.
    image_url: images/InsightFinder_dashboard.png
    media_type: imagen
  - caption: Investigación de incidentes y acciones InsightFinder.
    image_url: images/InsightFinder_investigation.png
    media_type: imagen
  - caption: Predicción InsightFinder.
    image_url: images/InsightFinder_prediction.png
    media_type: imagen
  - caption: Detección de anomalías de métricas InsightFinder.
    image_url: images/InsightFinder_metric.png
    media_type: imagen
  - caption: Análisis de logs InsightFinder.
    image_url: images/InsightFinder_log.png
    media_type: imagen
  - caption: Dashboard predefinido de InsightFinder rellenado por Datadog.
    image_url: images/InsightFinder_dd_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
  support: README.md#Soporte
  title: InsightFinder
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Los equipos de DevSecOps, DataOps, MLOps, operaciones de TI e ingeniería de fiabilidad del sitio (SRE) confían en [InsightFinder][1] como el motor de inteligencia de IA integral para predecir y evitar problemas de infraestructura, datos y seguridad en las complejas arquitecturas de TI modernas. Gracias a sus exclusivas funciones patentadas de predicción de incidentes, Machine Learning sin supervisión y corrección automática basada en patrones, la plataforma InsightFinder aprende continuamente de los datos de las máquinas para identificar y solucionar todos los problemas antes de que afecten a la empresa.

Los clientes ganan en valor rápidamente, comenzando con una prueba gratuita de InsightFinder y de las integraciones preconstruidas de la empresa con Datadog y otras herramientas populares para DevSecOps, gestión de operaciones de TI (ITOM) y gestión de servicios de TI (ITSM).

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con InsightFinder a través de los siguientes canales:

- Correo electrónico: [support@insightfinder.com][4]
- Ponerse en contacto con el [servicio de asistencia de Datadog][5]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Identificar y resolver incidentes más rápidamente con la oferta de InsightFinder en el Marketplace de Datadog][6].

[1]: https://insightfinder.com/
[2]: https://app.insightfinder.com/
[3]: https://insightfinder.com/datadog-integration/
[4]: mailto:support@insightfinder.com
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/insightfinder-insightfinder-license" target="_blank">adquiere esta aplicación en el Marketplace</a>.