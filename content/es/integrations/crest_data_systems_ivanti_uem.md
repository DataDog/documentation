---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-ivanti-uem
app_uuid: dcebef22-7079-4ba8-b741-ad90fe0b9138
assets:
  dashboards:
    Ivanti UEM (Cloud) - Device: assets/dashboards/crest_data_systems_ivanti_uem_cloud_device.json
    Ivanti UEM (Cloud) - User: assets/dashboards/crest_data_systems_ivanti_uem_cloud_user.json
    Ivanti UEM (On-Prem) - Device Details: assets/dashboards/crest_data_systems_ivanti_uem_onprem_device_details.json
    Ivanti UEM (On-Prem) - Overview: assets/dashboards/crest_data_systems_ivanti_uem_onprem_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems_ivanti_uem
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10365
    source_type_name: crest_data_systems_ivanti_uem
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- automatización
- gestión de eventos
- marketplace
- apm
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_ivanti_uem
integration_id: crest-data-systems-ivanti-uem
integration_title: Ivanti UEM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_ivanti_uem
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_ivanti_uem
  product_id: ivanti-uem
  short_description: Por dispositivo (endpoint) por mes.
  tag: dispositivo
  unit_label: Dispositivo Ivanti
  unit_price: 1.0
public_title: Ivanti UEM
short_description: Monitorizar el rendimiento y el uso de dispositivos Ivanti UEM
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Automatización
  - Categoría::Gestión de eventos
  - Categoría::Marketplace
  - Categoría::Móvil
  - Oferta::Integración
  - Tipo de datos enviados::Eventos
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar el rendimiento y el uso de dispositivos Ivanti UEM
  media:
  - caption: Ivanti UEM (On-Prem) - Información general
    image_url: images/ivanti-uem-on-prem-overview.png
    media_type: imagen
  - caption: Ivanti UEM (On-Prem) - Detalles del dispositivo
    image_url: images/ivanti-uem-on-prem-device-details.png
    media_type: imagen
  - caption: Ivanti UEM (Nube) - Dispositivo
    image_url: images/ivanti-uem-cloud-device.png
    media_type: imagen
  - caption: Ivanti UEM (Dispositivo) - Usuario
    image_url: images/ivanti-uem-cloud-user.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Ivanti UEM
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[Ivanti UEM][7] es una solución integral de Gestión unificada de endpoints (UEM) desarrollada por Ivanti. UEM hace referencia a la gestión de todo tipo de endpoints, como ordenadores de escritorio, portátiles, dispositivos móviles y máquinas virtuales, desde una única plataforma.

Ivanti UEM está diseñada para simplificar y agilizar la gestión de endpoints de una organización. Proporciona a los administradores de TI herramientas y funciones para gestionar de forma centralizada perfiles de usuario, aplicaciones, datos y políticas de seguridad en diferentes dispositivos y sistemas operativos.

Esta integración monitoriza `Devices` inscritos de Ivanti UEM (On-Prem), también conocido como Ivanti EPM, así como `Devices` y `Users` de Ivanti UEM (Cloud), también conocido como Ivanti MDM.

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

-   Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
-   Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
-   Página web: [crestdata.ai][3]
-   Preguntas frecuentes: [Preguntas frecuentes sobre integraciones Crest Data del Marketplace Datadog][11]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.ivanti.com/solutions/unified-endpoint-management
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Ivanti_UEM.pdf
[9]: https://docs.datadoghq.com/es/agent/?tab=Linux
[10]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-ivanti-uem" target="_blank">adquiere esta aplicación en el Marketplace</a>.