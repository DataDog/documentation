---
algolia:
  subcategory: Integraciones de Marketplace
app_id: iocs-dmi
app_uuid: d546c16a-7623-42dd-8158-c98bb9656d81
assets:
  dashboards:
    'IO Connect Services Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Services Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Services Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Services Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Services Operations: Private spaces': assets/dashboards/private_spaces.json
    'IO Connect Services Operations: RTF Infrastructure': assets/dashboards/rtf_infrastructure.json
    'IO Connect Services Operations: RTF Resource Allocation and Usage': assets/dashboards/rtf_resource_allocation.json
    'IO Connect Services Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390703
    source_type_name: IO_Connect_DMI
  monitors:
    A CloudHubTM Mule® application has a message in VM queue: assets/monitors/cloudhub_queue_overload_monitor.json
    A CloudHubTM Mule® application has very high CPU load: assets/monitors/cloudhub_cpu_load_monitor.json
    A CloudHubTM Mule® application is running out of memory: assets/monitors/cloudhub_memory_usage_monitor.json
    A CloudHubTM Mule® application is stopped: assets/monitors/cloudhub_app_stopped_monitor.json
    A Mule® server is disconnected: assets/monitors/server_disconnected_monitor.json
    An On-Premise Mule® application has very high CPU load: assets/monitors/onpremise_cpu_load_monitor.json
    An On-Premise Mule® application is presenting an error: assets/monitors/onpremise_app_error_monitor.json
    An On-Premise Mule® application is running out of memory: assets/monitors/onpremise_memory_usage_monitor.json
    An On-Premise Mule® application is stopped: assets/monitors/onpremise_app_stopped_monitor.json
    CPU Usage is high: assets/monitors/rtf_cpu_total_usage.json
    Memory is low: assets/monitors/rtf_memory_usage.json
    RTF Application is pending and temporarily inactive: assets/monitors/rtf_application_status_pending.json
    RTF Application is stopped: assets/monitors/rtf_applications_has_been_stopped.json
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- nube
- marketplace
- red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dmi
integration_id: iocs-dmi
integration_title: Mule®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: iocs_dmi
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.iocs_dmi
  product_id: dmi
  short_description: Precio unitario por vCore de producción y Sandbox
  tag: vcoreid
  unit_label: vCore de producción y Sandbox
  unit_price: 35
public_title: Mule®
short_description: Recopila métricas de los productos de MuleSoft y cárgalas en Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Recopila métricas de los productos de MuleSoft y cárgalas en Datadog.
  media:
  - caption: 'Operaciones: Dashboard de API'
    image_url: images/dmi_ops_apis.png
    media_type: imagen
  - caption: 'Operaciones: Dashboard de infraestructura'
    image_url: images/dmi_ops_infra.png
    media_type: imagen
  - caption: 'Operaciones: Dashboard de asignación y utilización de recursos'
    image_url: images/dmi_ops_allocation.png
    media_type: imagen
  - caption: 'Desarrollo: Dashboard de optimizaciones'
    image_url: images/dmi_dev_optimization.png
    media_type: imagen
  - caption: 'Ejecutivos: Dashboard de optimización de costos'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: imagen
  - caption: 'Operaciones: Información general del espacio privado'
    image_url: images/dmi_ops_spaces1.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[Nova][1] es una empresa especializada en servicios de consultoría de tecnologías de la información. Nuestras prácticas son tecnologías de la nube, integración de sistemas, big data, ciberseguridad e ingeniería de software. Proveemos servicios en toda América del Norte, Europa y América Latina. Nuestra sede está en el área metropolitana de Nueva York y también tenemos oficinas en Guadalajara, México y Madrid, España.

La integración de Datadog y Mule® es una aplicación basada en el Agent que recopila métricas de los productos de MuleSoft y las carga en Datadog. 

Puedes recopilar los siguientes métricas de los productos de MuleSoft:

- Mule Runtime para CloudHub, CloudHub 2.0 Runtime Fabric y servidores autónomos on-premise
- Anypoint Runtime Fabric
- Anypoint API Manager and API Analytics
- Anypoint Exchange 
- Anypoint Access Management 
- Object Store v2  

Puedes utilizar métricas para sacar partido de los dashboards y monitores predefinidos de Datadog o crear tus propias visualizaciones.

### **La observabilidad que necesitas para tus aplicaciones Mule**

#### Operaciones (_Dashboards de infraestructura, API, alertas y asignación de recursos_) 

- Monitoriza el estado de tus servidores, aplicaciones, API y otras infraestructuras de tecnologías de la información de Mule 
- Recibe y visualiza alertas sobre tu infraestructura de Mule
- Obtén información sobre la asignación de recursos de Anypoint Platform de tu organización 

{{< img src="marketplace/iocs_dmi/images/dmi_ops_infra.png" alt="Operaciones: Dashboard de infraestructura" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_apis.png" alt="Operaciones: Dashboard de API" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_allocation.png" alt="Operaciones: Dashboard de asignación y uso de recursos" >}}

#### Desarrollo (_Dashboard de optimización_) 

- Identifica rápidamente problemas de memoria, CPU y red en tus aplicaciones Mule. 
- Encuentra cuellos de botella en tus aplicaciones Mule para optimizar el rendimiento 

{{< img src="marketplace/iocs_dmi/images/dmi_dev_optimization.png" alt="Desarrollo: Dashboard de optimizaciones" >}}

#### Ejecutivo (_Dashboard de optimización de costos y caída del sistema_) 

- Analiza y predice tu ROI en función de los recursos utilizados y no utilizados 
- Obtén visibilidad del tiempo de actividad del sistema de tu inversión en Mule 

{{< img src="marketplace/iocs_dmi/images/dmi_exec_cost_optimization.png" alt="Executivos: Dashboard de optimización de costos" >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "iocs_dmi" >}}

### Eventos

La integración Datadog y Mule® no incluye eventos.

## Asistencia

Tómate un momento para conocer el proceso de configuración de la integración de Datadog y Mule® aquí: [Requisitos previos][12] e [Instalación][13]

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- Ventas: [products.sales@novacloud.io][9]
- Asistencia técnica: [support_ddp@novacloud.io][14]


[1]: https://www.novacloud.io
[2]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/datadog_checks/iocs_dmi/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/metadata.csv
[7]: https://docs.datadoghq.com/es/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/es/developers/guide/custom-python-package/?tab=linux
[9]: mailto:products.sales@novacloud.io
[10]: https://app.datadoghq.com/account/settings#agent/overview
[11]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/service_checks.json
[12]: https://docs.ioconnectservices.com/dmi/systemarchitecture
[13]: https://docs.ioconnectservices.com/dmi/installation
[14]: mailto:support_ddp@novacoud.io

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi" target="_blank">adquiere esta aplicación en el Marketplace</a>.