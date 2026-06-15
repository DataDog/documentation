---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-infoblox
app_uuid: 7712bdf0-a2eb-487c-8d1e-595c74b99e47
assets:
  dashboards:
    Infoblox Overview Dashboard: assets/dashboards/infoblox_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.infoblox.utilization
      metadata_path: metadata.csv
      prefix: rapdev.infoblox.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10432
    source_type_name: RapDev Infoblox
  monitors:
    DHCP is not working: assets/monitors/infoblox_dhcp_monitor.json
    DNS has failed: assets/monitors/infoblox_dns_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_infoblox
integration_id: rapdev-infoblox
integration_title: Infoblox
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_infoblox
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: infoblox
  short_description: Tarifa plana para esta integración
  unit_price: 100
public_title: Infoblox
short_description: Monitorizar el estado de tus nodos Infoblox y del sistema IPAM
  como métricas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::Seguridad
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar el estado de tus nodos Infoblox y del sistema IPAM como
    métricas
  media:
  - caption: Dashboard de información general de RapDev Infoblox
    image_url: images/infoblox_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Infoblox
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Infoblox ofrece soluciones de red y seguridad con la estrategia nube primero. Se centran en servicios de red centrales como DNS, DHCP y gestión de direcciones IP (IPAM). Sus soluciones ayudan a automatizar y proteger estas funciones de red críticas.

Network Identity Operating System (NIOS) es el sistema operativo que alimenta los servicios de red centrales de Infoblox. NIOS es la base de Next Level Networking y garantiza el funcionamiento ininterrumpido de la infraestructura de red. NIOS automatiza las tareas manuales propensas a errores y que consumen mucho tiempo, asociadas al despliegue y la gestión de DNS, DHCP y la gestión de direcciones IP (IPAM), necesarias para una disponibilidad de red y un tiempo de actividad empresarial continuos.

Con esta integración, monitoriza el estado del nodo Infoblox y el rendimiento IPAM, presentando checks de métricas y servicio en los informes de resumen que Infoblox produce.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][6]
- Ventas: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-infoblox-rest-api
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-infoblox" target="_blank">adquiere esta aplicación en el Marketplace</a>.