---
algolia:
  subcategory: Integraciones de Marketplace
app_id: zigiwave-micro-focus-opsbridge-integration
app_uuid: b904a102-65fe-4e4d-b693-e4ab98086277
assets:
  dashboards:
    ZigiWave Incidents Dashboard: assets/dashboards/ZigiWaveOpsBridge_DataDogIncidentDashboard.json
author:
  homepage: https://zigiwave.com
  name: ZigiWave
  sales_email: info@zigiwave.com
  support_email: support@zigiwave.com
  vendor_id: zigiwave
categories:
- gestión de eventos
- rum
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zigiwave_micro_focus_opsbridge_integration
integration_id: zigiwave-micro-focus-opsbridge-integration
integration_title: OpsBridge
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zigiwave_micro_focus_opsbridge_integration
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: micro-focus-opsbridge-integration
  short_description: Licencia mensual para un par de instancias de Datadog/MF OpsBridge
    conectadas
  unit_price: 750.0
public_title: OpsBridge
short_description: Integración sin código entre Datadog y OpsBridge
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Incidents
  - Category::Marketplace
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Incidents
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración sin código entre Datadog y OpsBridge
  media:
  - caption: Plantillas de integración disponibles con Datadog
    image_url: images/datadog_market_2.jpg
    media_type: imagen
  - caption: Dashboard de topología de ZigiOps
    image_url: images/datadog_marketplace_dashboard_6.jpg
    media_type: imagen
  - caption: Dashboard de métricas de ZigiOps
    image_url: images/datadog_marketplace_4.jpg
    media_type: imagen
  - caption: Integración de ZigiOps para transferir incidencias a Datadog
    image_url: images/OpsBridge-DataDog-Incidents.jpg
    media_type: imagen
  - caption: Dashboard de incidencias de Datadog
    image_url: images/ddog_mf_integration-dashboard.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: OpsBridge
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->



## Información general

ZigiOps es la plataforma de integración más flexible y sin código. El producto de ZigiOps
ayuda a tus empresas a identificar, informar y resolver problemas en tus entornos de TI 
más rápido que nunca. Integra ZigiOps en tu ecosistema de software para conectar con las herramientas de software 
empresarial populares para ITSM, ITOM y DevOps: Jira, ServiceNow, VMware 
vROps, Micro Focus Ops Bridge, BMC, Cherwell, Splunk, etc.

### Integración de Datadog y Micro Focus OBM con ZigiOps

Con la integración de ZigiWave Datadog y OpsBridge, puedes extraer incidencias de OpsBridge y rellenarlas en Datadog. ZigiOps sincroniza todos los campos como el resumen de la incidencia, el método de detección, la gravedad, el estado y más. Esta integración es bidireccional, por lo que siempre que haya una actualización en Datadog o en OpsBridge, ZigiOps enviará automáticamente esa actualización al sistema correspondiente.


Datadog Autodiscovery encuentra hosts que no están en
la base de datos de OpsBridge, pero que necesitan ser monitorizados. ZigiOps toma la información de host 
y la envía a OpsBridge RTSM, enriqueciendo la información de la topología con datos de Datadog. La topología se mantiene actualizada con 
los checks habituales de ZigiOps.

ZigiOps recopila eventos de Datadog y los comunica a OpsBridge como eventos.
La plataforma sincroniza todos los detalles relacionados de host como métricas, topología y más.

ZigiOps recopila métricas de Datadog y los comunica, junto con la información relacionada de host, al conector de operaciones 
MF. Se puede acceder a estas métricas 
mediante la Perspectiva de rendimiento de OpsBridge y utilizarlas para 
crear dashboards. 

Esta integración le dará a tu equipo de operaciones de TI una vista detallada de
tu infraestructura de OpsBridge y ayudará a detectar errores antes de que se conviertan en verdaderos 
problemas.

### Topología, métricas, eventos, incidencias

ZigiOps ofrece plantillas de integración totalmente personalizables para cuatro casos de uso de la integración de Datadog y Micro Focus OBM. Las plantillas permiten a los usuarios empezar a ver rápidamente el flujo de datos. Los usuarios pueden modificar las asignaciones de datos y los filtros proporcionados por las plantillas para adaptarlos a tu caso de uso. Actualmente disponemos de estas plantillas: eventos de OpsBridge, incidencias de Datadog, eventos de Datadog, eventos de OpsBridge, métricas de Datadog, métricas de OBM, hosts de Datadog y topología de OBM. Si tu caso de uso no se ajusta a ninguna de esas plantillas, también puedes crear tu propia integración desde cero. Los consultores de la integración te guiarán por el camino.

## Compatibilidad

ZigiWave se dedica a proporcionar la mejor experiencia de cliente 
para nuestros usuarios.  Si eres un usuario existente, puedes enviar un tique desde 
support.zigiwave.com o enviar un correo electrónico a nuestro equipo a support@zigiwave.com. 

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/zigiwave-micro-focus-opsbridge-integración" target="_blank">Haz clic aquí</a> para comprar esta aplicación.