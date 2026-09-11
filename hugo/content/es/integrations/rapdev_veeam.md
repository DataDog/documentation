---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-veeam
app_uuid: 2d85c606-5d60-11ee-8c99-0242ac120002
assets:
  dashboards:
    RapDev Veeam Overview Dashboard: assets/dashboards/overview_dashboard.json
    RapDev Veeam Session Dashboard: assets/dashboards/session_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.veeam.overview.backup_servers
      metadata_path: metadata.csv
      prefix: rapdev.veeam.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10404
    source_type_name: RapDev Veeam
  monitors:
    Backup Job Session Failed: assets/monitors/veeam_backup_job_failed.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_veeam
integration_id: rapdev-veeam
integration_title: Veeam Backup
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_veeam
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.veeam
  product_id: veeam
  short_description: Precio unitario por máquina virtual
  tag: mv
  unit_label: MV
  unit_price: 1
public_title: Veeam Backup
short_description: Monitorizar informes resumidos de Veeam Enterprise y hacer copias
  de seguridad de las sesiones de trabajo
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Herramientas de desarrollo
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar informes resumidos de Veeam Enterprise y hacer copias de
    seguridad de las sesiones de trabajo
  media:
  - caption: Dashboard de información general - General y máquinas virtuales
    image_url: images/general_vms_overview.png
    media_type: imagen
  - caption: Dashboard de información general - Trabajos y repositorios
    image_url: images/job_repo_overview.png
    media_type: imagen
  - caption: Dashboard de sesión - Sesiones del sistema
    image_url: images/system_sessions.png
    media_type: imagen
  - caption: Dashboard de sesión - Hacer copias de seguridad de sesiones de trabajo
    image_url: images/backup_job_sessions.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Veeam Backup
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Veeam Backup Enterprise Manager es un componente de gestión y generación de informes que permite gestionar varias instalaciones de Veeam Backup & Replication desde una única consola web. Veeam Backup Enterprise Manager te ayuda a optimizar el rendimiento en despliegues remotos de oficinas/sucursales (ROBO) y a gran escala, y a conservar una visibilidad de todo tu entorno virtual. 

La integración Veeam permite a las organizaciones monitorizar su estado general de Veeam Backup mediante la presentación de métricas en los informes resumidos producidos dentro de Veeam, los estados y la duración de la sesión de trabajo de copia de seguridad del sistema y los archivos de copias de seguridad.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][6]
- Ventas: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://helpcenter.veeam.com/docs/backup/em/em_managing_accounts.html?ver=120#add
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-veeam" target="_blank">adquiere esta aplicación en el Marketplace</a>.