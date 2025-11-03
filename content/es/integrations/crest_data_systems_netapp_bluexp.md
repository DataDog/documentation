---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-netapp-bluexp
app_uuid: 3f01fc26-b405-4956-9b64-f7fa2c7ee05c
assets:
  dashboards:
    'NetApp BlueXP: Aggregate': assets/dashboards/crest_data_netapp_bluexp_aggregate.json
    'NetApp BlueXP: Cluster': assets/dashboards/crest_data_netapp_bluexp_cluster.json
    'NetApp BlueXP: Disk': assets/dashboards/crest_data_netapp_bluexp_disk.json
    'NetApp BlueXP: Inventory': assets/dashboards/crest_data_netapp_bluexp_inventory.json
    'NetApp BlueXP: Network': assets/dashboards/crest_data_netapp_bluexp_network.json
    'NetApp BlueXP: Node': assets/dashboards/crest_data_netapp_bluexp_node.json
    'NetApp BlueXP: Volume': assets/dashboards/crest_data_netapp_bluexp_volume.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.bluexp.cluster.dc
      metadata_path: metadata.csv
      prefix: cds.netapp.bluexp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11493382
    source_type_name: crest_data_systems_netapp_bluexp
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- almacenes de datos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_bluexp
integration_id: crest-data-systems-netapp-bluexp
integration_title: NetApp BlueXP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_bluexp
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_bluexp
  product_id: netapp-bluexp
  short_description: Por instancia de Netapp al mes
  tag: netapp_bluexp_serial_number
  unit_label: Número de serie del servidor de Netapp BlueXP
  unit_price: 495.0
public_title: NetApp BlueXP
short_description: Monitorización del inventario de NetApp BlueXP y los logs y métricas
  del asesor digital
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
  - Category::Data Stores
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitorización del inventario de NetApp BlueXP y los logs y métricas
    del asesor digital
  media:
  - caption: 'NetApp BlueXP: agregado'
    image_url: images/crest_data_netapp_bluexp_aggregate.png
    media_type: imagen
  - caption: 'NetApp BlueXP: clúster'
    image_url: images/crest_data_netapp_bluexp_cluster.png
    media_type: imagen
  - caption: 'NetApp BlueXP: inventario'
    image_url: images/crest_data_netapp_bluexp_inventory.png
    media_type: imagen
  - caption: 'NetApp BlueXP: disco'
    image_url: images/crest_data_netapp_bluexp_disk.png
    media_type: imagen
  - caption: 'NetApp BlueXP: red'
    image_url: images/crest_data_netapp_bluexp_network.png
    media_type: imagen
  - caption: 'NetApp BlueXP: nodo'
    image_url: images/crest_data_netapp_bluexp_node.png
    media_type: imagen
  - caption: 'NetApp BlueXp: volumen'
    image_url: images/crest_data_netapp_bluexp_volume.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp BlueXP
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

NetApp BlueXP proporciona a tu organización un único plano de control que te ayuda a crear, proteger y gobernar los datos en tus instalaciones y entornos en la nube. La plataforma SaaS de BlueXP incluye servicios que proporcionan gestión de almacenamiento, movilidad de datos, protección de datos y análisis y control de datos.

La integración de Datadog y NetApp BlueXP obtiene las estadísticas de servidores y componentes y las envía periódicamente a Datadog. Admite las versiones clúster, nodo, red, agregado, volumen, disco y firmware, junto con las referencias del asesor digital. También incluye datos de inventario como recursos, espacios de trabajo, usuarios y auditorías, con dashboards preconfigurados y monitores para una rápida comprensión y una gestión eficiente de los datos.

### Tipos de datos

Los siguientes tipos de datos se recopilan en la integración de Datadog de Netapp BlueXP:

| Tipo de datos                   | Detalles obtenidos                         |
| -------------------------- | ------------------------------------ |
| Inventario                  | Cuenta, Espacio de trabajo, Recursos, Auditoría | 
| Asesoría digital           | Clúster, Nodo, Agregado, Disco, Volumen, Interfaz de red, Puertos de red  | 

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: datadog.integrations@crestdata.ai
- Correo electrónico de ventas: datadog-sales@crestdata.ai
- Página web: [crestdata.ai][8]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][9]

[1]: https://docs.datadoghq.com/es/agent/?tab=Linux
[2]: https://docs.netapp.com/us-en/bluexp-setup-admin/task-managing-netapp-accounts.html#manage-a-workspace-admins-workspaces
[3]: https://docs.netapp.com/us-en/active-iq/task_generate_tokens_API_services.html
[4]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: https://www.crestdata.ai/
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_BlueXP.pdf

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-bluexp" target="_blank">adquiere esta aplicación en el Marketplace</a>.