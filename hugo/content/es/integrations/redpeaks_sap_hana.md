---
algolia:
  subcategory: Integraciones de Marketplace
app_id: redpeaks-sap-hana
app_uuid: 38708fc8-5c40-41c5-9511-867aa1b1692c
assets:
  dashboards:
    HANA services overview: assets/dashboards/redpeaks_sap_hana_services_overview.json
    HANA systems overview: assets/dashboards/redpeaks_sap_hana_overview.json
    HANA tables overview: assets/dashboards/redpeaks_sap_hana_tables_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_hana.system
      metadata_path: metadata.csv
      prefix: redpeaks.hana
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10998
    source_type_name: redpeaks_sap_hana
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
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
git_integration_title: redpeaks_sap_hana
integration_id: redpeaks-sap-hana
integration_title: SAP HANA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_hana
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_hana.system
  product_id: sap-hana
  short_description: Contar una unidad de licencia por sistema SAP HANA monitorizado
    (identificado por SID)
  tag: uri
  unit_label: ID del sistema SAP (SID)
  unit_price: 190.0
public_title: SAP HANA
short_description: Monitorizar bases de datos SAP HANA de forma centralizada desde
  un único recopilador
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Categoría::SAP
  - Oferta::Integración
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Categoría::Gestión de eventos
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Submitted Data Type::Events
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
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
La integración SAP HANA monitoriza sistemas de bases de datos SAP HANA en la memoria.
Un sistema puede alojar diferentes esquemas de base de datos y puede desplegarse en varios nodos.

Utilizando una conexión remota **sin agentes** y plantillas de monitorización preconfiguradas, esta integración puede ponerse en marcha en solo unos minutos.

La monitorización utiliza la tecnología [Redpeaks][1] (anteriormente conocido como Agentil Software - Pro.Monitor). Está configurada de forma predefinida para cubrir los KPI más relevantes de tu base de datos, incluyendo copias de seguridad, transacciones, recursos de servicios, crecimiento de tablas y replicaciones.

Esta integración recopila y analiza datos de los sistemas en tiempo real y produce métricas y eventos procesables. Puedes ajustar con precisión las alertas configurando Redpeaks y crear monitores de Datadog directamente para las métricas.

A diferencia de las soluciones basadas en agentes, la configuración de monitorización de esta plataforma está centralizada en una única localización, lo que elimina la necesidad de modificar o instalar elementos adicionales en los sistemas monitorizados.

Redpeaks se integra con despliegues SAP de todo tipo y tamaño, ya sea que gestiones un único sistema o cientos de ellos. Es compatible con configuraciones on-premises, nubes privadas, entornos híbridos y SAP RISE, por lo que ofrece flexibilidad para satisfacer tus necesidades específicas.

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
- SDI
- Solicitudes SQL personalizadas
- Monitores a pedido

## Soporte técnico 

Para solicitar asistencia o funciones, ponte en contacto con Redpeaks por correo electrónico en [support@redpeaks.io][2].

### Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar SAP NetWeaver con la oferta de Redpeaks en el Marketplace de Datadog][5]

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
[9]: https://mvnrepository.com/artifact/com.sap.cloud.db.jdbc/ngdbc



---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizar esta aplicación, <a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-hana" target="_blank">adquiérela en el Marketplace</a>.