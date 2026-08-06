---
algolia:
  subcategory: Integraciones del Marketplace
app_id: ioconnect-mulesoft-anypoint
app_uuid: fdb057e7-9be6-459f-ab3e-e745766e9158
assets:
  dashboards:
    'IO Connect Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Operations: RTF Infrastructure': assets/dashboards/rtf_infrastructure.json
    'IO Connect Operations: RTF Resource Allocation and Usage': assets/dashboards/rtf_resource_allocation.json
    'IO Connect Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10117
    source_type_name: IO Connect MuleSoft Anypoint
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
    '[RTF] App Status Pending': assets/monitors/rtf_application_status_pending.json
    '[RTF] App Status Stopped': assets/monitors/rtf_applications_has_been_stopped.json
    '[RTF] CPU Total Usage': assets/monitors/rtf_cpu_total_usage.json
    '[RTF] Memory Total Usage': assets/monitors/rtf_memory_usage.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- nube
- marketplace
- red
dependencies: []
display_on_public_website: true
draft: true
git_integration_title: mulesoft_anypoint
integration_id: ioconnect-mulesoft-anypoint
integration_title: Mule®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: mulesoft_anypoint
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.mulesoft_anypoint
  product_id: mulesoft-anypoint
  short_description: Precio unitario por vCore de producción
  tag: vcoreid
  unit_label: vCore de producción
  unit_price: 200
public_title: Mule®
short_description: Recopila métricas de los productos MuleSoft y los carga en Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Marketplace
  - Categoría::Red
  - Oferta:Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados:Métricas
  configuration: README.md#Configuración
  description: Recopila métricas de los productos MuleSoft y los carga en Datadog
  media:
  - caption: 'Operaciones: Dashboard de API'
    image_url: images/dmi_ops_apis.png
    media_type: imagen
  - caption: 'Operaciones: Dashboard de infraestructura'
    image_url: images/dmi_ops_infra.png
    media_type: imagen
  - caption: 'Operaciones: Dashboard de asignación y uso de recursos'
    image_url: images/dmi_ops_allocation.png
    media_type: imagen
  - caption: 'Desarrollo: Dashboard de optimizaciones'
    image_url: images/dmi_dev_optimization.png
    media_type: imagen
  - caption: 'Ejecutivos: Dashboard de optimización de costes'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: imagen
  - caption: Datadog Connector para Mule 4
    image_url: images/dmi_mule_connector.png
    media_type: imagen
  - caption: APM de Datadog
    image_url: images/dmi_apm_traces.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Mule®
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

La integración Mule® en Datadog es una integración basada en el Agent que recopila métricas de los productos MuleSoft y los carga en Datadog.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_bundle.png" alt="Paquete de integración Mule® en Datadog" >}}

Puedes utilizar estas métricas para aprovechar las ventajas de los dashboards y los monitores predefinidos o puedes crear tus propias visualizaciones.

### **La observabilidad que necesitas para tus aplicaciones Mule**

#### Operaciones (infraestructura, API, alertas y dashboards de asignación de recursos)

- Monitorizar el estado de tus servidores, aplicaciones, API y otras infraestructura TI de Mule
- Recibir y visualizar alertas sobre tu infraestructura Mule
- Obtener información sobre la asignación de recursos de la plataforma Anypoint de tu organización

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_infra.png" alt="Operaciones: Dashboard de infraestructuras" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_apis.png" alt="Operaciones: Dashboard de API" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_allocation.png" alt="Operaciones: Dashboard de asignación y uso de recursos" >}}

#### Desarrollo (Dashboard de optimización)

- Identificar rápidamente los problemas de memoria, de CPU y de red en tus aplicaciones Mule
- Encontrar cuellos de botella en tus aplicaciones Mule para optimizar el rendimiento
- Instrumentar sus aplicaciones Mule con nuestro Datadog Connector para Mule 4 para solucionar problemas

{{< img src="marketplace/mulesoft_anypoint/images/dmi_dev_optimization.png" alt="Desarrollo: Dashboard de optimizaciones" >}}

#### Ejecutivo (Dashboard de optimización de costes y tiempos de inactividad)

- Analizar y predecir tu retorno de inversión (ROI) en función de los recursos utilizados y no utilizados
- Obtener visibilidad del tiempo de actividad del sistema de tu inversión en Mule

{{< img src="marketplace/mulesoft_anypoint/images/dmi_exec_cost_optimization.png" alt="Ejecutivos: Dashboard de optimización de costes" >}}

#### Las métricas se recopilan de los siguientes productos MuleSoft:

- Tiempo de ejecución de Mule para CloudHub, Runtime Fabric y servidores autónomos locales
- Runtime Fabric Anypoint
- Gestor de API y Analytics de API Anypoint
- Intercambio Anypoint
- Gestión de acceso Anypoint
- Object Store v2

### **Instrumentar tus aplicaciones Mule con nuestro Datadog Connector para Mule 4**

{{< img src="marketplace/mulesoft_anypoint/images/dmi_mule_connector.png" alt="Datadog Connector para Mule 4" >}}

Utiliza el Datadog Connector para Mule 4 con el rastreo de Datadog APM para obtener visibilidad utilizando los dashboards de rendimiento predefinidos.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_traces.png" alt="Datadog APM" >}}

Mide el rendimiento de las operaciones en tus flujos (flows) de forma tan granular como sea necesario, utilizando tramos (spans).

Además, correlaciona los logs generados en una transacción en una única traza (trace) para acotar cualquier optimización del rendimiento o solución de problemas.

### **Solucionar problemas**

¿Necesitas ayuda? Ponte en contacto con [support_ddp@ioconnectservices.com][9].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mulesoft-anypoint" >}}


### Checks de servicio

El mulesoft_anypoint incluye los siguientes checks de servicio:

1. MuleSoft Anypoint. Este check de servicio muestra si las métricas se recopilaron correctamente de MuleSoft Anypoint.
2. Licencia de la integración MuleSoft. Este check de servicio ayuda a comprender si la licencia de esta integración MuleSoft para Datadog es válida.

### Eventos

La integración Mule® en Datadog no incluye eventos.

## Asistencia

Para cualquier consulta de asistencia, ponte en contacto con el servicio de asistencia de IO Connect Services en [support_ddp@ioconnectservices.com][9].

## Acerca de IO Connect Services

IO Connect Services es una empresa especializada en servicios de consultoría de tecnologías de la Información. Nuestras áreas son: Tecnologías en la nube, Integración de sistemas, Big Data, Ciberseguridad e Ingeniería de software. Ofrecemos nuestros servicios en toda América del Norte, Europa y América Latina. Nuestra sede se encuentra en el área metropolitana de la ciudad de Nueva York y también tenemos oficinas en Guadalajara, México y Madrid (España).

Visita [https://www.ioconnectservices.com][10]

[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/datadog_checks/mulesoft_anypoint/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/metadata.csv
[7]: https://docs.datadoghq.com/es/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/es/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com

---
Esta aplicación está disponible a través del Marketplace y cuenta con el soporte de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/ioconnect-mulesoft-anypoint" target="_blank">Haz clic aquí</a> para comprar esta aplicación.
