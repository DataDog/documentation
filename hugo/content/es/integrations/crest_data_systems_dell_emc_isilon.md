---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-dell-emc-isilon
app_uuid: 1c1b7c48-0c7c-46f2-9f0c-f68c74419244
assets:
  dashboards:
    Crest Dell EMC Isilon - Cluster Information: assets/dashboards/dell_emc_isilon_cluster_information.json
    Crest Dell EMC Isilon - Events: assets/dashboards/dell_emc_isilon_events.json
    Crest Dell EMC Isilon - File System: assets/dashboards/dell_emc_isilon_file_system.json
    Crest Dell EMC Isilon - Monitors Summary: assets/dashboards/dell_emc_isilon_monitors_summary.json
    Crest Dell EMC Isilon - NFS Export Stats: assets/dashboards/dell_emc_isilon_nfs_export_stats.json
    Crest Dell EMC Isilon - Node Details: assets/dashboards/dell_emc_isilon_node_details.json
    Crest Dell EMC Isilon - Protocol Details: assets/dashboards/dell_emc_isilon_protocol_details.json
    Crest Dell EMC Isilon - Quota Information: assets/dashboards/dell_emc_isilon_quota_information.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.emc.isilon.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.emc.isilon.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10225
    source_type_name: crest_data_systems_dell_emc_isilon
  logs: {}
  monitors:
    CPU usage is high: assets/monitors/cds_cpu_usage_for_each_node_and_cluster.json
    Disk usage is high: assets/monitors/cds_disk_usage_for_each_node_and_cluster.json
    Memory usage is high: assets/monitors/cds_memory_usage_for_each_node_and_cluster.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data Systems
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- almacenamiento en caché
- almacenes de datos
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dell_emc_isilon
integration_id: crest-data-systems-dell-emc-isilon
integration_title: Dell EMC Isilon
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dell_emc_isilon
pricing:
- billing_type: recuento_etiquetas(tags)
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.dell_emc_isilon
  product_id: dell-emc-isilon
  short_description: El coste especificado es por clúster por mes.
  tag: cds.emc.isilon.cluster
  unit_label: Clúster Dell EMC Isilon
  unit_price: 995.0
public_title: Dell EMC Isilon
short_description: Monitorización del rendimiento y el uso del clúster Dell EMC Isilon
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Categoría::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorización del rendimiento y el uso del clúster Dell EMC Isilon
  media:
  - caption: Dell EMC Isilon - Información del clúster
    image_url: images/cds-dell-emc-isilon-cluster-information.png
    media_type: imagen
  - caption: Dell EMC Isilon - Detalles del nodo
    image_url: images/cds-dell-emc-isilon-node-details.png
    media_type: imagen
  - caption: Dell EMC Isilon - Detalles del protocolo
    image_url: images/cds-dell-emc-isilon-protocol-details.png
    media_type: imagen
  - caption: Dell EMC Isilon - Sistema de archivos
    image_url: images/cds-dell-emc-isilon-file-system.png
    media_type: imagen
  - caption: Dell EMC Isilon - Información sobre cuotas
    image_url: images/cds-dell-emc-isilon-quota-information.png
    media_type: imagen
  - caption: Dell EMC Isilon - Resumen de monitores
    image_url: images/cds-dell-emc-isilon-monitors-summary.png
    media_type: imagen
  - caption: Estadísticas de exportación NFS de Dell EMC Isilon
    image_url: images/cds-dell-emc-isilon-nfs-export-stats.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
  support: README.md#Soporte
  title: Dell EMC Isilon
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Esta integración monitoriza el rendimiento y el uso del clúster y los nodos Dell EMC Isilon. Captura métricas esenciales y proporciona información sobre el estado y el funcionamiento de clúster Dell EMC Isilon. Esta integración también admite monitores para alertar sobre el uso de CPU, memoria y disco de cada nodo y clúster.

| Nombre del dashboard      | Descripción                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| Información del clúster | Este dashboard proporciona información a nivel de clúster.                                      |
| Detalles del nodo        | Este dashboard proporciona información a nivel de nodo.                                         |
| Detalles del protocolo    | Este dashboard proporciona detalles del protocolo en toda su extensión.                                  |
| Sistema de archivos         | Este dashboard proporciona detalles del sistema de archivos a nivel de nodo.                          |
| Información sobre cuotas   | Este dashboard proporciona información sobre cuotas.                                              |
| Resumen de monitores    | Este dashboard ofrece un resumen de los monitores compatibles con esta integración. |

## Compatibilidad

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][10]
- Correo electrónico para ventas: [datadog-sales@crestdata.ai][11]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ sobre las integraciones Crest Data en el Marketplace Datadog][8]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de Dell EMC Isilon con la integración Crest Data en el Marketplace Datadog][1]
- [Guía de configuración: Monitores Dell EMC Isilon en la plataforma Datadog][2]

[1]: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
[2]: https://www.crestdata.ai/data_sheet/datadog-setup-monitor/
[3]: https://www.crestdata.ai/
[4]: https://www.dell.com/support/manuals/en-in/isilon-onefs/ifs_pub_administration_guide_cli/administrative-roles-and-privileges
[5]: https://docs.crestdata.ai/datadog-integrations-readme/Dell_EMC_Isilon.pdf
[6]: https://docs.datadoghq.com/es/agent/?tab=Linux
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dell-emc-isilon" target="_blank">adquiere esta aplicación en el Marketplace</a>.