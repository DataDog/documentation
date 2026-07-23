---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-ansible-automation-platform
app_uuid: fe1cdb5a-023a-4489-80df-cf5e30031389
assets:
  dashboards:
    RapDev Ansible Automation Jobs Dashboard: assets/dashboards/rapdev_ansible_automation_jobs_dashboard.json
    RapDev Ansible Automation Overview Dashboard: assets/dashboards/rapdev_ansible_automation_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.ansible_automation_platform.organization_count
      metadata_path: metadata.csv
      prefix: plataforma_automatización_rapdev.ansible.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094161
    source_type_name: Plataforma de automatización RapDev Ansible
  monitors:
    Ansible Job Failed: assets/monitors/ansible_job_failed.json
    Ansible Node has reached maximum capacity: assets/monitors/ansible_node_capacity.json
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
git_integration_title: plataforma_automatización_rapdev_ansible
integration_id: rapdev-ansible-automation-platform
integration_title: Plataforma de automatización Ansible
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: plataforma_automatización_rapdev_ansible
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: plataforma_automatización_datadog.marketplace.rapdev.ansible
  product_id: ansible-automation-platform
  short_description: Precio unitario por nodo de ejecución de Ansible
  tag: uuid_node_ansible
  unit_label: Nodo de ejecución de Ansible
  unit_price: 10
public_title: Plataforma de automatización Ansible
short_description: Monitorizar uso, trabajos y eventos de la plataforma de automatización
  Ansible
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Herramientas de desarrollo
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar uso, trabajos y eventos de la plataforma de automatización
    Ansible
  media:
  - caption: Plataforma de automatización Ansible - Dashboard de información general
    image_url: images/overview_dashboard.png
    media_type: imagen
  - caption: Plataforma de automatización Ansible - Dashboard de trabajos
    image_url: images/jobs_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Plataforma de automatización Ansible
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La plataforma de automatización Ansible permite a los usuarios de una organización compartir, revisar y gestionar contenido de automatización mediante una implementación técnica sencilla, potente y sin agentes. Esta integración está preconfigurada con dos dashboards que muestran el estado general de los distintos componentes de los controladores de automatización de Ansible. Además, incluye métricas del estado de los distintos tipos de trabajos ejecutados por los nodos de ejecución del controlador de automatización. 

Para ayudarte a comenzar a monitorizar el entorno de tu plataforma de automatización, se incluye un monitor que te avisa cuando falla la ejecución de un trabajo de Ansible.


## Soporte
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][6]
- Ventas: sales@rapdev.io
- Chat: [rapdev.io][7]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.ansible.com/automation-controller/4.0.0/html/quickstart/create_user.html
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: mailto:support@rapdev.io
[7]: https://www.rapdev.io/#Get-in-touch
[8]: mailto:sales@rapdev.io

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-ansible-automation-platform" target="_blank">adquiere esta aplicación en el Marketplace</a>.