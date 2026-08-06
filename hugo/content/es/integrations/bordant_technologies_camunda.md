---
algolia:
  subcategory: Integraciones de Marketplace
app_id: bordant-technologies-camunda
app_uuid: a8413249-3027-48ad-b5bd-2ac72edd7ded
assets:
  dashboards:
    Camunda 8 - Overview: assets/dashboards/camunda_8_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: camunda8.broker.zeebe.health
      metadata_path: metadata.csv
      prefix: camunda8.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11136032
    source_type_name: Camunda 8
author:
  homepage: https://www.bordant.com
  name: Bordant Technologies
  sales_email: contact@bordant.com
  support_email: support@bordant.com
  vendor_id: bordant-technologies
categories:
- marketplace
- métricas
- orquestación
- Kubernetes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bordant_technologies_camunda
integration_id: bordant-technologies-camunda
integration_title: Camunda 8
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: bordant_technologies_camunda
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: camunda8
  short_description: Tarifa plana mensual para la integración de Camunda 8
  unit_price: 600
public_title: Camunda 8
short_description: Monitoriza el mantenimiento y el rendimiento de tu motor de flujo
  de trabajo de Camunda 8.
supported_os:
- linux
- MacOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Metrics
  - Category::Orchestration
  - Offering::Integration
  - Category::Kubernetes
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza el mantenimiento y el rendimiento del motor de flujo de
    trabajo de Camunda 8.
  media:
  - caption: Monitoriza el mantenimiento general de tu motor de proceso con el dashboard
      de Camunda 8.
    image_url: images/Camunda_8-Overview_1.png
    media_type: imagen
  - caption: El dashboard permite monitorizar individualmente varios componentes de
      tu motor de flujo de trabajo de Camunda 8.
    image_url: images/Camunda_8-Overview_2.png
    media_type: imagen
  - caption: Las métricas que se muestran en el dashboard incluyen las métricas del
      rendimiento, las estadísticas de ejecución, el uso de recursos y el rendimiento
      del motor.
    image_url: images/Camunda_8-Overview_3.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/bordant-technologies-camunda-8-datadog-marketplace/
  support: README.md#Support
  title: Camunda 8
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Camunda 8 es una plataforma de automatización de decisiones y flujos de trabajo diseñada para ayudar a los desarrolladores a administrar los procesos empresariales en todos los microservicios. La plataforma facilita la colaboración entre los equipos empresariales y de TI, admite amplias opciones de integración y permite la monitorización de la ejecución en tiempo real de proceso.

Desbloquea las capacidades avanzadas de monitorización para tu motor de flujo de trabajo de Camunda 8. Esta integración se adapta sin problemas a tu monitorización y ofrece a los administradores de sistemas y a los ingenieros de DevOps, una información profunda de Camunda 8. Monitoriza el mantenimiento de tu motor, optimiza su rendimiento o identifica cuellos de botella en tu configuración de Camunda.

### Funciones
- **Monitorización del mantenimiento del motor**: Asegúrate de que tu motor esté funcionando sin problemas.

- **Optimización del rendimiento**: Comprende mejor la presión ejercida sobre tu motor observando la ejecución de proceso en tiempo real para saber si puede soportar la carga.

- **Identificación de cuellos de botella**: Obtén información sobre la interacción entre los distintos componentes de los motores e identifica los factores que limitan el rendimiento, ya que cada componente se monitoriza en forma individual.

### Información destacada

- **Fácil instalación**: Configura rápidamente la integración, sin necesidad de grandes ajustes técnicos ni de configuración. Inicia la monitorización de Camunda 8 con todas las capacidades de Datadog.

- **Monitorización 360 grados**: Comprende tu motor de Camunda 8 más allá de la monitorización básica. Una amplia gama de métricas de Camunda 8 se informa a Datadog, incluidas las métricas del rendimiento, las estadísticas de ejecución, el uso de recursos y el rendimiento del motor.

- **Información intuitiva**: Utiliza las visualizaciones predefinidas o crea las tuyas propias. El dashboard de Camunda 8 te permite empezar a trabajar rápidamente y, al mismo tiempo, es fácilmente ampliable.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Bordant Technologies a través de los siguientes canales:

- Asistencia: [support@bordant.com][2]

### Referencias adicionales
Más enlaces, artículos y documentación útiles:

- [Obtén visibilidad de tus componentes de Camunda 8 con la integración de Datadog de Bordant Technologies ][6]

[1]: https://docs.camunda.io/docs/self-managed/platform-deployment/overview/
[2]: mailto:support@bordant.com
[3]: https://docs.datadoghq.com/es/agent/
[4]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=kubernetesadv2
[6]: https://www.datadoghq.com/blog/bordant-technologies-camunda-8-datadog-marketplace/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/bordant-technologies-camunda" target="_blank">adquiere esta aplicación en el Marketplace</a>.