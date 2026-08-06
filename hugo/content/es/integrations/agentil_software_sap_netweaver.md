---
algolia:
  subcategory: Integraciones de Marketplace
app_id: agentil-software-sap-netweaver
app_uuid: 5b070928-c509-4826-93db-8b5e9206c355
assets:
  dashboards:
    ABAP transactions response times: assets/dashboards/agentil_software_abap_transactions_response_times.json
    SAP ABAP Transactions Details: assets/dashboards/agentil_software_abap_transactions_details.json
    SAP Netweaver overview: assets/dashboards/agentil_software_sap_global_overview.json
    SAP Netweaver system dashboard: assets/dashboards/agentil_software_sap_netweaver_system.json
    SAP System IDOCS: assets/dashboards/agentil_software_system_idocs.json
    SAP System Shortdumps: assets/dashboards/agentil_software_system_shortdumps.json
    SAP jobs details: assets/dashboards/agentil_software_sap_jobs_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10218
    source_type_name: AGENTIL Software SAP NetWeaver
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_netweaver
integration_id: agentil-software-sap-netweaver
integration_title: SAP S/4HANA y NetWeaver
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_netweaver
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_netweaver.system
  product_id: sap-netweaver
  short_description: Cuenta una unidad de licencia por sistema SAP monitorizado (identificado
    por SID)
  tag: uri
  unit_label: ID del sistema SAP (SID)
  unit_price: 250
public_title: SAP S/4HANA y NetWeaver
short_description: Monitorizar stacks de ABAP y J2EE de tus sistemas S/4HANA y NetWeaver
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitor stacks de ABAP y J2EE de tus sistemas S/4HANA y NetWeaver
  media:
  - caption: Información global de SAP NetWeaver
    image_url: images/dashboard_overview.png
    media_type: imagen
  - caption: Dashboard de sistema SAP NetWeaver
    image_url: images/dashboard_netweaver.png
    media_type: imagen
  - caption: Logs de trabajo en SAP NetWeaver
    image_url: images/logs_example_jobs.png
    media_type: imagen
  - caption: Tiempos de transacción SAP ABAP
    image_url: images/abap_transaction_response_time.png
    media_type: imagen
  - caption: Detalles de la transacción SAP ABAP
    image_url: images/abap_transaction_details.png
    media_type: imagen
  - caption: Mensajes SAP IDOC
    image_url: images/abap_idocs.png
    media_type: imagen
  - caption: Trabajos SAP en segundo plano
    image_url: images/abap_background_jobs.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
  support: README.md#Support
  title: SAP S/4HANA y NetWeaver
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
La integración de SAP NetWeaver monitoriza stacks de ABAP y J2EE de las plataformas de aplicaciones SAP **NetWeaver** y **S/4HANA**.

Gracias a la conexión remota **sin agent** y a las plantillas de monitorización preconfiguradas, esta integración puede ponerse en marcha en tan sólo **unos minutos**.

La monitorización se basa en la [plataforma Pro.Monitor][1] de AGENTIL Software. Está configurada para cubrir los módulos y transacciones más relevantes de tus sistemas SAP: **shortdumps, trabajos SAP, tiempos de respuesta de transacciones, procesos de trabajo y más**.

Esta integración recopila y analiza datos de los sistemas en tiempo real y produce métricas y eventos procesables. Puedes ajustar con precisión las alertas configurando Pro.Monitor y crear monitores de Datadog directamente en las métricas.

### Módulos monitorizados

- Memoria de instancia ABAP
- Tiempo de respuesta de la instancia ABAP
- Bloqueos ABAP
- Parámetros ABAP
- Shortdumps ABAP
- Logs de aplicación
- Entradas por lotes
- Certificados
- Monitorización personalizada de CCMS
- Copias de seguridad de la base de datos
- Tamaño de la base de datos
- Bloqueos exclusivos de base de datos
- Colas de expedidores
- Estado y uso de ICM
- Monitorización de intercambio de IDOC
- Disponibilidad de instancias
- Rangos de números
- Mensajes PI/XI ABAP
- Monitorización de cadenas de proceso
- QRFC/TRFC
- Datos en tiempo real
- Disponibilidad de destinos RFC
- Buffers de SAP
- Los clientes de SAP cambian la configuración
- SAPconnect (SCOT/SOST)
- Monitorización de trabajos SAP
- Tiempos de transacción SAP
- Transportes SAP
- Usuarios de SAP
- Carretes
- Logs de sistema
- Solicitudes de actualización
- Servicio de actualización
- Procesos de trabajo

## Soporte

Para soporte o solicitudes de función, contacta con AGENTIL Software a través del siguiente canal:

- Correo electrónico: [support@agentil-software.com][2]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorizar SAP NetWeaver con la oferta de Agentil en el Marketplace de Datadog][5]

*Si buscas un socio de confianza para integraciones específicas con SAP u otras plataformas, estás en el lugar adecuado: ponte en contacto con nosotros.*

---
Este producto se diseña y desarrolla en Ginebra (Suiza). 

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-netweaver" target="_blank">Haz clic aquí</a> para comprar esta aplicación.