---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-rudder
app_uuid: ce24a620-979e-4954-ac5d-f90b66061e1f
assets:
  dashboards:
    Rudder - Change Requests: assets/dashboards/crest_data_systems_rudder_change_requests.json
    Rudder - Directives: assets/dashboards/crest_data_systems_rudder_directives.json
    Rudder - Groups: assets/dashboards/crest_data_systems_rudder_groups.json
    Rudder - Nodes: assets/dashboards/crest_data_systems_rudder_nodes.json
    Rudder - Rules: assets/dashboards/crest_data_systems_rudder_rules.json
    Rudder - Techniques: assets/dashboards/crest_data_systems_rudder_techniques.json
    Rudder Overview: assets/dashboards/crest_data_systems_rudder_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cd.rudder.compliance_stats.compliance_error
      metadata_path: metadata.csv
      prefix: cd.rudder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35801079
    source_type_name: crest_data_systems_rudder
  logs:
    source: crest-data-systems-rudder
  monitors:
    A system security update is available: assets/monitors/crest_data_systems_a_system_security_update_is_available.json
    CPU Usage Exceeds Limit: assets/monitors/crest_data_systems_cpu_usage_exceeds_limit.json
    Global Compliance Fell Below Defined Limit: assets/monitors/crest_data_systems_global_compliance_fell_below_defined_limit.json
    Total Critical Vulnerabilities Exceed Limit: assets/monitors/crest_data_systems_total_critical_vulnerabilities_exceed_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- recopilación de logs
- automatización
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_rudder
integration_id: crest-data-systems-rudder
integration_title: Rudder
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_rudder
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.rudder
  product_id: rudder
  short_description: Por cada nodo de Rudder al mes
  tag: node_id
  unit_label: Nodos Rudder
  unit_price: 1.0
public_title: Rudder
short_description: Recopila datos de cumplimiento, directivas, grupos, técnicas, reglas,
  nodos, vulnerabilidades y telemetría de usuario de Rudder.
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
  - Category::Marketplace
  - Category::Log Collection
  - Category::Automation
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Recopila datos de cumplimiento, directivas, grupos, técnicas, reglas,
    nodos, vulnerabilidades y telemetría de usuario de Rudder.
  media:
  - caption: Información general de Rudder
    image_url: images/crest_data_systems_rudder_overview.png
    media_type: imagen
  - caption: Rudder - Nodos
    image_url: images/crest_data_systems_rudder_nodes.png
    media_type: imagen
  - caption: Rudder - Grupos
    image_url: images/crest_data_systems_rudder_groups.png
    media_type: imagen
  - caption: Rudder - Directivas
    image_url: images/crest_data_systems_rudder_directives.png
    media_type: imagen
  - caption: Rudder - Solicitudes de cambio
    image_url: images/crest_data_systems_rudder_change_requests.png
    media_type: imagen
  - caption: Rudder - Reglas
    image_url: images/crest_data_systems_rudder_rules.png
    media_type: imagen
  - caption: Rudder - Técnicas
    image_url: images/crest_data_systems_rudder_techniques.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Rudder
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[**Rudder**][1] es una solución web sólida y fácil de utilizar diseñada para la automatización y el cumplimiento de infraestructuras IT. Monitoriza continuamente las configuraciones, garantiza el cumplimiento y ofrece actualizaciones del estado de las infraestructuras en tiempo real. Tanto si gestionas servidores, instancias en la nube o dispositivos IoT integrados, Rudder centraliza la gestión de la configuración en una única plataforma.

Esta integración ingiere los siguientes eventos de Rudder como logs y métricas en Datadog:

### Métricas ###
  - Cumplimiento global

### Logs ###
  - Cumplimiento de los nodos
  - Directivas
  - Grupos
  - Técnicas
  - Reglas
  - Vulnerabilidades de los nodos
  - Solicitudes de cambio
  - Gestión de usuarios

> **Nota**: Por defecto, se recopila logs para los nodos, capturando información clave como el inventario, detalles del sistema operativo y datos relacionados con la máquina.

### Dashboards
Esta integración incluye **siete dashboards predefinidos**:

 1. **Información general de Rudder**: Muestra información general completa de áreas clave (cumplimiento global, directivas, grupos, técnicas, reglas, nodos, solicitudes de cambio, gestión de usuarios) y sobre las vulnerabilidades y el cumplimiento asociados a los nodos.
 2. **Rudder - Nodos**
 3. **Rudder - Directivas**
 4. **Rudder - Técnicas**
 5. **Rudder - Grupos**
 6. **Rudder - Reglas**
 7. **Rudder - Solicitudes de cambio**

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][9]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][11]
- FAQ: [FAQ sobre integraciones Crest Data Datadog Marketplace][3]


[1]: https://www.rudder.io/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Rudder.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
---
Esta aplicación está disponible a través del Datadog Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-rudder" target="_blank">adquiere esta aplicación en el Marketplace</a>.