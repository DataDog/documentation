---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-netapp-aiqum
app_uuid: b96cf12b-48c7-473f-9aac-3f1132a98402
assets:
  dashboards:
    NetApp AIQUM - Aggregate: assets/dashboards/crest_data_systems_netapp_aiqum_aggregate.json
    NetApp AIQUM - Cluster: assets/dashboards/crest_data_systems_netapp_aiqum_cluster.json
    NetApp AIQUM - Interfaces: assets/dashboards/crest_data_systems_netapp_aiqum_interfaces.json
    NetApp AIQUM - LUN: assets/dashboards/crest_data_systems_netapp_aiqum_lun.json
    NetApp AIQUM - Overview: assets/dashboards/crest_data_systems_netapp_aiqum_overview.json
    NetApp AIQUM - Port: assets/dashboards/crest_data_systems_netapp_aiqum_port.json
    NetApp AIQUM - QTree: assets/dashboards/crest_data_systems_netapp_aiqum_qtree.json
    NetApp AIQUM - Volume: assets/dashboards/crest_data_systems_netapp_aiqum_volume.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.aiqum.cluster_storage_details.dc
      metadata_path: metadata.csv
      prefix: cds.netapp.aiqum
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10326
    source_type_name: crest_data_systems_netapp_aiqum
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- almacenes de datos
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_aiqum
integration_id: crest-data-systems-netapp-aiqum
integration_title: NetApp AIQUM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_aiqum
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_aiqum
  product_id: netapp-aiqum
  short_description: Por instancia de Active IQ Unified Manager al mes.
  tag: cds_netapp_aiqum_instance
  unit_label: Instancia de NetApp AIQUM
  unit_price: 495.0
public_title: NetApp AIQUM
short_description: Monitorización del rendimiento y el uso del clúster de NetApp AIQUM
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitorización del rendimiento y el uso del clúster de NetApp AIQUM
  media:
  - caption: 'NetApp AIQUM: agregado'
    image_url: images/crest_data_systems_netapp_aiqum_aggregate.png
    media_type: imagen
  - caption: 'NetApp AIQUM: clúster'
    image_url: images/crest_data_systems_netapp_aiqum_cluster.png
    media_type: imagen
  - caption: 'NetApp AIQUM: interfaces'
    image_url: images/crest_data_systems_netapp_aiqum_interfaces.png
    media_type: imagen
  - caption: 'NetApp AIQUM: LUN'
    image_url: images/crest_data_systems_netapp_aiqum_lun.png
    media_type: imagen
  - caption: 'NetApp AIQUM: descripción general'
    image_url: images/crest_data_systems_netapp_aiqum_overview.png
    media_type: imagen
  - caption: 'NetApp AIQUM: puerto'
    image_url: images/crest_data_systems_netapp_aiqum_port.png
    media_type: imagen
  - caption: 'NetApp AIQUM: QTree'
    image_url: images/crest_data_systems_netapp_aiqum_qtree.png
    media_type: imagen
  - caption: 'NetApp AIQUM: volumen'
    image_url: images/crest_data_systems_netapp_aiqum_volume.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp AIQUM
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Esta integración supervisa el rendimiento y el uso de clúster, agregado, QTree, interfaz, puerto, FibreChannel y volumen de NetApp AIQUM. Captura métricas cruciales y proporciona información sobre el almacenamiento y el rendimiento de los datos de NetApp AIQUM.

### Monitores

Esta integración monitoriza clúster, agregado, QTree, interfaz, puerto, FibreChannel y volumen de NetApp AIQUM.

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][9]
- Correo electrónico para ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][8]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_AIQUM.pdf
[6]: https://docs.datadoghq.com/es/agent/?tab=Linux
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-aiqum" target="_blank">adquiere esta aplicación en el Marketplace</a>.