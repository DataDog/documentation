---
algolia:
  subcategory: Integraciones del Marketplace
app_id: agentil-software-sap-hana
app_uuid: 75784ba6-6a1a-4059-849e-c4cbdb56f258
assets:
  dashboards:
    SAP HANA DB services overview: assets/dashboards/agentil_software_sap_hana_services_overview.json
    SAP HANA DB tables overview: assets/dashboards/agentil_software_sap_hana_tables_overview.json
    SAP HANA databases overview: assets/dashboards/agentil_software_sap_hana_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_hana.system
      metadata_path: metadata.csv
      prefix: agentil_software.hana
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10388
    source_type_name: AGENTIL Software SAP HANA
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
- almacenes de datos
- gestión de eventos
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_hana
integration_id: agentil-software-sap-hana
integration_title: SAP HANA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_hana
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_hana.system
  product_id: sap-hana
  short_description: Contar una unidad de licencia por sistema SAP HANA monitorizado
    (identificado por SID)
  tag: uri
  unit_label: ID del sistema SAP (SID)
  unit_price: 190
public_title: SAP HANA
short_description: Monitorizar bases de datos SAP HANA de forma centralizada desde
  un único recopilador
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::SAP
  - Oferta::Integración
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Categoría::Gestión de eventos
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Monitorizar bases de datos SAP HANA de forma centralizada desde un
    único recopilador
  media:
  - caption: Información general de la base de datos SAP HANA
    image_url: images/dashboard_db_overview.png
    media_type: imagen
  - caption: Información general de las tablas SAP HANA
    image_url: images/hana_tables_overview.png
    media_type: imagen
  - caption: Información general de los servicios SAP HANA
    image_url: images/hana_services_overview.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: SAP HANA
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
La integración SAP HANA monitoriza sistemas de bases de datos en memoria SAP HANA.
Un sistema puede alojar varios esquemas de base de datos y puede desplegarse en varios nodos.

Utilizando una conexión remota **sin Agent** y plantillas de monitorización preconfiguradas, esta integración puede ponerse en marcha en sólo **unos minutos**.

La monitorización se basa en la [plataforma Pro.monitor][1] de AGENTIL Software. Está configurado de forma predefinida para cubrir los indicadores clave de rendimiento (KPI) más relevantes de tu base de datos, incluyendo **copias de seguridad, transacciones, recursos de servicios, crecimiento de tablas y mucho más**.

Esta integración recopila y analiza los datos de los sistemas en tiempo real y envía métricas y eventos a Datadog. Puedes ajustar las alertas configurando Pro.monitor y creando monitores de Datadog directamente en las métricas.

A diferencia de las soluciones basadas en el Agent, toda la configuración de monitorización de esta plataforma está centralizada en una única localización, lo que elimina la necesidad de modificar o instalar elementos adicionales en los sistemas monitorizados.

### Módulos monitorizados

- Nodos HANA
- Alertas
- Copias de seguridad
- CPU de servicio
- Memoria de servicio
- Disco de servicio
- Transacciones bloqueadas
- Conexiones
- Subprocesos
- Estado de la replicación
- Estadísticas de replicación
- Tamaño de la tabla (registros, tamaño de fusión, tamaño del disco)
- Solicitudes SQL personalizadas
- Monitores a pedido

## Agent

En AGENTIL Software, nuestro equipo de expertos y desarrolladores SAP está a tu disposición para ofrecerte soporte y aceptar solicitudes de mejoras o funcionalidades adicionales.
Ponte en contacto con nosotros a través del siguiente canal:

- Correo electrónico: [support@agentil-software.com][2]

*Si buscas un socio de confianza para integraciones específicas con SAP u otras plataformas, estás en el lugar adecuado: ponte en contacto con nosotros.*

---
Este producto se diseñó y desarrolló en Ginebra (Suiza). 

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[4]: https://wiki.agentil-software.com/doku.php?id=products:cockpit:1.0:installguide:installjava
[5]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-hana" target="_blank">adquiere esta aplicación en el Marketplace</a>.