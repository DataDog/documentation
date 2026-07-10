---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-proofpoint-email-security
app_uuid: 4e419332-b689-486b-ae36-09abecd41a9e
assets:
  dashboards:
    Crest Proofpoint - Isolation Dashboard: assets/dashboards/cds_proofpoint_isolation.json
    Crest Proofpoint - TAP Dashboard: assets/dashboards/cds_proofpoint_tap.json
    Crest Proofpoint On Demand - Email Security: assets/dashboards/cds_proofpoint_on_demand_email_security.json
    Crest Proofpoint On Demand - TLS Overview: assets/dashboards/cds_proofpoint_on_demand_tls_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.proofpoint.tap.messages_blocked.spamScore
      metadata_path: metadata.csv
      prefix: cds.proofpoint
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10379
    source_type_name: crest_data_systems_proofpoint_email_security
  monitors:
    Proofpoint Email Security Service Check Monitor: assets/monitors/cds_service_check_monitor.json
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- almacenes de datos
- gestión de eventos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_proofpoint_email_security
integration_id: crest-data-systems-proofpoint-email-security
integration_title: Proofpoint Email Security
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_proofpoint_email_security
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_proofpoint_email_security
  product_id: proofpoint-email-security
  short_description: Por usuario registrado de Proofpoint
  tag: usuarios
  unit_label: Usuarios registrados de Proofpoint
  unit_price: 1.0
public_title: Proofpoint Email Security
short_description: Monitoriza Proofpoint TAP, Proofpoint On-Demand y Proofpoint Isolation
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
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza Proofpoint TAP, Proofpoint On-Demand y Proofpoint Isolation
  media:
  - caption: 'Crest Proofpoint: dashboard de TAP'
    image_url: images/crest_data_systems_proofpoint_tap_1.png
    media_type: imagen
  - caption: 'Crest Proofpoint: dashboard de TAP'
    image_url: images/crest_data_systems_proofpoint_tap_2.png
    media_type: imagen
  - caption: 'Crest Proofpoint On Demand: seguridad del correo electrónico'
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_1.png
    media_type: imagen
  - caption: 'Crest Proofpoint On Demand: seguridad del correo electrónico'
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_2.png
    media_type: imagen
  - caption: 'Crest Proofpoint On Demand: seguridad del correo electrónico'
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_3.png
    media_type: imagen
  - caption: 'Crest Proofpoint On Demand: información general de TLS'
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_1.png
    media_type: imagen
  - caption: 'Crest Proofpoint On Demand: información general de TLS'
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_2.png
    media_type: imagen
  - caption: 'Crest Proofpoint: aislamiento'
    image_url: images/crest_data_systems_proofpoint_isolation.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Proofpoint Email Security
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La integración de Proofpoint Email Security supervisa y visualiza [Proofpoint TAP][7], [Proofpoint on Demand][8] y [Proofpoint Isolation][9].

### Proofpoint Targeted Attack Protection (TAP)

**Proofpoint Targeted Attack Protection (TAP)** es una solución de protección contra amenazas avanzadas diseñada para proteger a las organizaciones de los ataques dirigidos en el cambiante panorama de seguridad actual. TAP combina tecnologías avanzadas, inteligencia sobre amenazas y análisis en tiempo real para proporcionar una protección completa contra las amenazas basadas en el correo electrónico, incluido el malware avanzado, los ataques de phishing y las técnicas de ingeniería social. También ayuda a detectar, mitigar y bloquear las amenazas avanzadas que se dirigen a las personas a través del correo electrónico. La solución detecta los ataques que utilizan archivos adjuntos y URL maliciosos para instalar malware o engañar a los usuarios para que compartan sus contraseñas y otra información confidencial.

### Proofpoint on Demand

**Proofpoint on Demand** es una completa plataforma de ciberseguridad basada en la nube diseñada para proteger a las empresas de diversas ciberamenazas. Ofrece una amplia gama de servicios, como seguridad del correo electrónico, inteligencia sobre amenazas, protección de la información y cumplimiento de normativas. Te permite tomar decisiones informadas y adoptar las medidas necesarias para mejorar tu seguridad general. Además, la aplicación proporciona información detallada sobre el estado de cifrado de tus comunicaciones, lo que mejora aún más tu comprensión de las medidas de protección de datos.

#### Características principales de Proofpoint on Demand

* **Monitorización del tráfico de correo electrónico:** monitoriza el flujo de mensajes para identificar y prevenir proactivamente el spam, los intentos de phishing y otras amenazas relacionadas con el correo electrónico.
* **Monitorización de cumplimiento:** monitoriza comunicaciones por correo electrónico para garantizar el cumplimiento de las políticas internas y las normativas externas, como la prevención de pérdida de datos (DLP), la autenticación, notificación y conformidad de mensajes basada en dominios (DMARC) y otras directrices aplicables.
* **Investigación de incidencias:** realiza investigaciones exhaustivas de posibles incidencias de seguridad aprovechando la seguridad del correo electrónico y los datos de cumplimiento. Esto incluye rastrear los orígenes de las amenazas de seguridad y evaluar su impacto.
* **Monitorización del comportamiento del usuario:** vigila de cerca el comportamiento relacionado con el correo electrónico para detectar cualquier indicio de amenazas internas o intentos de acceso no autorizado.

### Proofpoint Isolation

**Proofpoint Isolation** está diseñado para mejorar la ciberseguridad aislando y protegiendo a los usuarios de contenidos potencialmente maliciosos. El objetivo principal es evitar que los usuarios interactúen directamente con contenidos dañinos o sospechosos, reduciendo así el riesgo de ciberamenazas.

Esta integración monitoriza:
- `Messages Blocked and Delivered` y `Clicks Blocked and Permitted` que son procesados por el servidor de Proofpoint TAP.
- Los datos de tipo de mensaje que utilizan el servicio de log de Proofpoint on Demand como fuente y utilizan el protocolo seguro WebSocket (WSS).
- Actividad de navegación web y correo electrónico del usuario por parte del servidor de Proofpoint Isolation.


## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ de integraciones de Crest Data Datadog Marketplace][14]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.proofpoint.com/us/products/advanced-threat-protection/targeted-attack-protection
[8]: https://www.proofpoint.com/us/products/email-security-and-protection/email-protection
[9]: https://www.proofpoint.com/us/products/cloud-security/isolation
[10]: https://proofpointisolation.com
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Proofpoint_Email_Security.pdf
[12]: https://docs.datadoghq.com/es/agent/?tab=Linux
[13]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-proofpoint-email-security" target="_blank">adquiere esta aplicación en el Marketplace</a>.