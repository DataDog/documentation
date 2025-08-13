---
algolia:
  subcategory: Integraciones de Marketplace
app_id: cloudnatix-cloudnatix
app_uuid: 96ab2cb5-ce57-48ea-9a19-e065261c7430
assets: {}
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix Inc.
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
  vendor_id: cloudnatix
categories:
- nube
- kubernetes
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudnatix_inc_cloudnatix
integration_id: cloudnatix-cloudnatix
integration_title: CloudNatix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: cloudnatix_inc_cloudnatix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.cloudnatix
  product_id: cloudnatix
  short_description: CloudNatix tiene un precio mensual por núcleo de CPU y existen
    incentivos adicionales para compromisos mayores.
  tag: cpu_core
  unit_label: Núcleo de CPU
  unit_price: 37.96
public_title: CloudNatix
short_description: CloudNatix proporciona información sobre el coste, la capacidad
  y el gasto de k8s
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Kubernetes
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: CloudNatix proporciona información sobre el coste, la capacidad y el
    gasto de k8s
  media:
  - caption: Dashboard de CloudNatix
    image_url: images/cloudnatix-app-dashboard.png
    media_type: imagen
  - caption: Carga de trabajo de CloudNatix
    image_url: images/cloudnatix-app-workload.png
    media_type: imagen
  - caption: Piloto automático de cargas de trabajo de CloudNatix
    image_url: images/cloudnatix-app-autopilot.png
    media_type: imagen
  - caption: Piloto automático de clúster de CloudNatix
    image_url: images/cloudnatix-app-cluster.png
    media_type: imagen
  - caption: dashboard
    image_url: images/cloudnatix-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: CloudNatix
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[CloudNatix][1] monitoriza las máquinas virtuales, los nodos y las cargas de trabajo en clústeres de k8s y proporciona información sobre la optimización de las operaciones para sus gastos, por ejemplo, modificando las configuraciones de las solicitudes de CPU/memoria o cambiando los tipos de instancia para los nodos de modo que se pueda reducir el coste total del clúster.

La integración predefinida visualiza los gastos monitorizados y las perspectivas de optimización operativa de CloudNatix en un dashboard.


## Agent

Para solicitar asistencia o funciones, ponte en contacto con CloudNatix a través de los siguientes canales:

- Correo electrónico: [Soporte de CloudNatix][4] 
- Slack: [Comunidad de CloudNatix][3]

[1]: https://cloudnatix.com/
[2]: mailto:support@cloudnatix.com
[3]: https://join.slack.com/t/a7t/shared_invite/zt-1fooygi86-wefZeBK_pGcBr_4_WhntnQ
[4]: mailto:support@cloudnatix.com
[5]: https://app.datadoghq.com/integrations/cloudnatix

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/cloudnatix-cloudnatix" target="_blank">adquiere esta aplicación en el Marketplace</a>.