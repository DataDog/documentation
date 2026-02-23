---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-redhat-satellite
app_uuid: fad53c37-82aa-466c-a2b6-cfa27a6c7d45
assets:
  dashboards:
    RapDev RedHat Satellite Inventory Dashboard: assets/dashboards/inventory_dashboard.json
    RapDev RedHat Satellite OpenMetrics Dashboard: assets/dashboards/openmetrics_dashboard.json
    RapDev RedHat Satellite Tasks & Jobs Dashboard: assets/dashboards/tasks_&_jobs_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - rapdev.redhat_satellite.openmetrics.http_requests.count
      - rapdev.redhat_satellite.organization.count
      metadata_path: metadata.csv
      prefix: rapdev.redhat_satellite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094169
    source_type_name: RapDev RedHat Satellite
  logs:
    source: rapdev_redhat_satellite
  monitors:
    RedHat Satellite Foreman Task Failed: assets/monitors/foreman_task_failure.json
    RedHat Satellite HTTP has 5xx Errors: assets/monitors/5xx_errors.json
    RedHat Satellite Job has failed: assets/monitors/job_invocation_failure.json
    RedHat Satellite Prometheus Connection Failing: assets/monitors/openmetrics_connection.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- herramientas de desarrollo
- configuración y despliegue
- recopilación de logs
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_redhat_satellite
integration_id: rapdev-redhat-satellite
integration_title: RedHat Satellite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_redhat_satellite
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.redhat_satellite
  product_id: redhat-satellite
  short_description: Precio unitario por instancia de RedHat Satellite
  tag: satellite_host
  unit_label: RedHat Satellite Instance
  unit_price: 1000
public_title: RedHat Satellite
short_description: Monitorizar el estado y el rendimiento de RedHat Satellite
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::Herramientas de desarrollo
  - Categoría::Configuración y despliegue
  - Categoría::Recopilación de logs
  - Categoría::Métricas
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de RedHat Satellite
  media:
  - caption: Dashboard de OpenMetrics Satellite
    image_url: images/openmetrics_dashboard.png
    media_type: imagen
  - caption: Dashboard del inventario Satellite
    image_url: images/inventory_dashboard.png
    media_type: imagen
  - caption: Dashboard de tareas y trabajos Satellite
    image_url: images/tasks_jobs_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: RedHat Satellite
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

RedHat Satellite es un producto de gestión de infraestructuras que mantiene la infraestructura RedHat funcionando de forma eficiente, con seguridad y en conformidad con los estándares de gestión de tu organización. Esta integración viene con varios dashboards predefinidos que muestran el estado general de los diferentes componentes de RedHat Satellite, incluyendo erratas de hosts de contenido, estados de invocación de tareas y trabajos de Foreman, estados de servicios Satellite y más.

Para ayudarte a empezar a monitorizar tu aplicación RedHat Satellite, esta integración también incluye monitores predefinidos y un pipeline de logs para procesar archivos de logs relacionados con Satellite.

Esta integración fue probada en Satellite v6.7.5 ejecutando Foreman v1.24.1.32 y no se garantiza que funcione en versiones anteriores.


## Soporte
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][7]
- Ventas: sales@rapdev.io
- Chat: [rapdev.io][8]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][7] a RapDev y la crearemos!*

[0]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[1]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html/monitoring_red_hat_satellite/installing-pcp-packages_monitoring-guide#configure-pcp-data-collection_monitoring-guide
[2]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-user_admin
[3]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-role_admin
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: mailto:support@rapdev.io
[8]: https://www.rapdev.io/#Get-in-touch
[9]: mailto:sales@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-redhat-satellite" target="_blank">adquiere esta aplicación en el Marketplace</a>.