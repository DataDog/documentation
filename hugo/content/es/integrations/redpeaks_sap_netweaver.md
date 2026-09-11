---
algolia:
  subcategory: Integraciones del Marketplace
app_id: redpeaks-sap-netweaver
app_uuid: f65f3026-11a2-4ee9-8a19-4e99dd52ca2a
assets:
  dashboards:
    SAP ABAP Transactions Overview: assets/dashboards/redpeaks_abap_transactions_details.json
    SAP ABAP transactions response times: assets/dashboards/redpeaks_abap_transactions_response_times.json
    SAP IDOCS Overview: assets/dashboards/redpeaks_system_idocs.json
    SAP Jobs Overview: assets/dashboards/redpeaks_sap_jobs_details.json
    SAP NetWeaver Overview: assets/dashboards/redpeaks_sap_global_overview.json
    SAP NetWeaver System: assets/dashboards/redpeaks_sap_netweaver_system.json
    SAP Shortdumps Overview: assets/dashboards/redpeaks_system_shortdumps.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: redpeaks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10997
    source_type_name: Redpeaks SAP NetWeaver
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_netweaver
integration_id: redpeaks-sap-netweaver
integration_title: SAP S/4HANA y NetWeaver
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_netweaver
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_netweaver.system
  product_id: sap-netweaver
  short_description: Cuenta una unidad de licencia por sistema SAP monitorizado (identificado
    por SID)
  tag: uri
  unit_label: ID del sistema SAP (SID)
  unit_price: 250
public_title: SAP S/4HANA y NetWeaver
short_description: Monitor stacks de ABAP y J2EE de tus sistemas S/4HANA y NetWeaver
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
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
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
  support: README.md#Soporte
  title: SAP S/4HANA y NetWeaver
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
La integración de SAP NetWeaver monitoriza stacks de ABAP y J2EE de las plataformas de aplicaciones SAP **NetWeaver** y **S/4HANA**.

Utilizando una conexión remota **sin Agent** y plantillas de monitorización preconfiguradas, esta integración puede ponerse en marcha en sólo **unos minutos**.

La monitorización utiliza la tecnología [Redpeaks][1] (anteriormente conocido como Agentil Software - Pro.Monitor). Está configurado de forma predefinida para cubrir los módulos y las transacciones más relevantes de tus sistemas SAP: **volcados cortos, trabajos SAP, tiempos de respuesta de transacciones, procesos de trabajos y más**.

Esta integración recopila y analiza datos de los sistemas en tiempo real y produce métricas y eventos procesables. Puedes ajustar con precisión las alertas configurando Redpeaks y crear monitores de Datadog directamente para las métricas.

Redpeaks se integra con despliegues SAP de todo tipo y tamaño, ya sea que gestiones un único sistema o cientos de ellos. Es compatible con configuraciones on-premises, nubes privadas, entornos híbridos y SAP RISE, por lo que ofrece flexibilidad para satisfacer tus necesidades específicas.

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
- Proceso e instancias J2EE
- Métricas de instancias J2EE
- Métricas de bases de datos externas: Oracle, Sybase/ASE, DB2, MaxDB, MSSQL
- Endpoints web

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Redpeaks a través del siguiente canal:

- Correo electrónico: [support@redpeaks.io][2]

### Para leer más

Más enlaces, artículos y documentación útiles:

- [Monitor SAP NetWeaver con la oferta de Redpeaks en Datadog Marketplace][5]

*Si buscas un socio de confianza para integraciones específicas con SAP u otras plataformas, estás en el lugar adecuado: ponte en contacto con nosotros.*

---
Este producto se diseñó y desarrolló en Ginebra (Suiza). 

[1]: https://www.redpeaks.io
[2]: mailto:support@redpeaks.io
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
[6]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:installguide:prerequisites
[7]: https://wiki.redpeaks.io/doku.php?id=products:cockpit:1.0:installguide:installjava
[8]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-netweaver" target="_blank">adquiera esta aplicación en el Marketplace</a>.