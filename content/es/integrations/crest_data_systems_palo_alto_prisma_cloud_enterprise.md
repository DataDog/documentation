---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-palo-alto-prisma-cloud-enterprise
app_uuid: 80470a28-fc81-4b4c-8d35-e5287b4edee4
assets:
  dashboards:
    Palo Alto Prisma Cloud Enterprise - Cloud Security Alerts: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_alerts.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Applications: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_applications.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Assets: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_assets.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Audit: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_audit.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Compliances: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_compliances.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Vulnerabilities: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_vulnerabilities.json
    Palo Alto Prisma Cloud Enterprise - Overview: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_overview.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Compliances: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_compliances.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Containers: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_containers.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Hosts: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_hosts.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Images: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_images.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Packages: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_packages.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Vulnerabilities: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cd.palo.alto.prisma.cloud.enterprise.application_stats.newly_discovered_apps
      metadata_path: metadata.csv
      prefix: cd.palo.alto.prisma.cloud.enterprise
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30878647
    source_type_name: crest_data_systems_palo_alto_prisma_cloud_enterprise
  logs:
    source: crest-data-systems-palo-alto-prisma-cloud-enterprise
  monitors:
    Applications with Critical Alerts Detected: assets/monitors/crest_data_systems_applications_with_critical_alerts_detected.json
    Applications with Critical Vulnerabilities Detected: assets/monitors/crest_data_systems_applications_with_critical_vulnerabilities_detected.json
    Total Critical Alerts Exceeds Limit: assets/monitors/crest_data_systems_total_critical_alerts_exceeds_limit.json
    Total Critical Compliances Exceeds Limit: assets/monitors/crest_data_systems_total_critical_compliances_exceeds_limit.json
    Total Open Critical Vulnerabilities Exceeds Limit: assets/monitors/crest_data_systems_total_open_critical_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- nube
- marketplace
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_palo_alto_prisma_cloud_enterprise
integration_id: crest-data-systems-palo-alto-prisma-cloud-enterprise
integration_title: Palo Alto Prisma Cloud Enterprise
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_palo_alto_prisma_cloud_enterprise
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.palo_alto_prisma_cloud_enterprise
  product_id: palo-alto-prisma-cloud-enterprise
  short_description: Por crédito utilizado en Prisma Cloud al mes.
  tag: credit_usage_count
  unit_label: Uso del crédito de Prisma Cloud
  unit_price: 1.0
public_title: Palo Alto Prisma Cloud Enterprise
short_description: Logs y métricas de monitor de integración para Palo Alto Prisma
  Cloud para seguridad en la nube y en tiempo de ejecución.
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
  - Category::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Logs y métricas de monitor de integración para Palo Alto Prisma Cloud
    para seguridad en la nube y en tiempo de ejecución.
  media:
  - caption: Palo Alto Prisma Cloud Enterprise - Activos de seguridad en la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-assets.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Alertas de seguridad en la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-alerts.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Aplicaciones de seguridad en la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-applications.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Auditoría de seguridad en la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-audit.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Cumplimiento de seguridad en la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-compliances.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Vulnerabilidades de seguridad en
      la nube
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-vulnerabilities.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise - Información general
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-overview.png
    media_type: imagen
  - caption: Palo Alto Prisma Cloud Enterprise -  Hosts de seguridad en tiempo de
      ejecución
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-runtime-security-hosts.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Prisma Cloud Enterprise
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[Palo Alto Prisma Cloud Enterprise][1] es una completa plataforma de seguridad nativa de la nube diseñada para proteger aplicaciones, datos y todo el stack tecnológico nativo de la nube a lo largo del ciclo de vida de desarrollo. Prisma Cloud proporciona visibilidad y control sobre los recursos seguros de la nube, cargas de trabajo y aplicaciones en todos los entornos híbridos y varias nubes.

Esta integración te permite recopilar y visualizar datos de Palo Alto Prisma Cloud como logs y métricas en Datadog. Al aprovechar las potentes capacidades de exploración de Palo Alto Prisma Cloud, puedes ver:

- **Seguridad en la nube**: activos, alertas, vulnerabilidades, aplicaciones, conformidad, identidad y logs de auditoría.
- **Seguridad en tiempo de ejecución**: hosts, imágenes, contenedores, vulnerabilidades, conformidad y paquetes.

### Dashboards
Esta integración proporciona trece dashboards predefinidos.

El dashboard de **Palo Alto Prisma Cloud Enterprise - Información general** proporciona información general de la plataforma Palo Alto Prisma Cloud Enterprise. Incluye detalles sobre activos, alertas, vulnerabilidades, aplicaciones, cumplimiento, identidad y auditorías de seguridad en la nube. Además, cubre la seguridad en tiempo de ejecución para hosts, imágenes, contenedores, vulnerabilidades, cumplimiento y paquetes.

Otros dashboards disponibles:

- Palo Alto Prisma Cloud Enterprise - Alertas de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Vulnerabilidades de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Activos de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Aplicaciones de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Cumplimiento de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Auditoría de seguridad en la nube
- Palo Alto Prisma Cloud Enterprise - Vulnerabilidades de seguridad en tiempo de ejecución
- Palo Alto Prisma Cloud Enterprise - Hosts de seguridad en tiempo de ejecución
- Palo Alto Prisma Cloud Enterprise - Contenedores de seguridad en tiempo de ejecución
- Palo Alto Prisma Cloud Enterprise - Imágenes de seguridad en tiempo de ejecución
- Palo Alto Prisma Cloud Enterprise - Cumplimientos de seguridad en tiempo de ejecución
- Palo Alto Prisma Cloud Enterprise - Paquetes de seguridad en tiempo de ejecución

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Dirección de correo electrónico de asistencia: [datadog.integrations@crestdata.ai][9]
- Dirección de correo electrónico de ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][11]
- FAQ: [FAQ de integraciiones de Crest Data Datadog Marketplace][3]


[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Palo_Alto_Prisma_Cloud_Enterprise.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
[12]: https://app.ind.prismacloud.io/home/runtime?computeState=%252Fmanage%252Fsystem%252Futilities

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-palo-alto-prisma-cloud-enterprise" target="_blank">adquiere esta aplicación en el Marketplace</a>.