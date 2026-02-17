---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-zscaler
app_uuid: d5380f02-9141-4dd3-8053-e13bb501b7e8
assets:
  dashboards:
    'Zscaler ZIA: Audit': assets/dashboards/crest_data_systems_zscaler_zia_audit.json
    'Zscaler ZIA: DNS': assets/dashboards/crest_data_systems_zscaler_zia_dns.json
    'Zscaler ZIA: Endpoint': assets/dashboards/crest_data_systems_zscaler_zia_endpoint.json
    'Zscaler ZIA: Firewall': assets/dashboards/crest_data_systems_zscaler_zia_firewall.json
    'Zscaler ZIA: Tunnel': assets/dashboards/crest_data_systems_zscaler_zia_tunnel.json
    'Zscaler ZIA: Web': assets/dashboards/crest_data_systems_zscaler_zia_web.json
    'Zscaler ZPA: App Connector': assets/dashboards/crest_data_systems_zscaler_zpa_app_connector.json
    'Zscaler ZPA: App Protection': assets/dashboards/crest_data_systems_zscaler_zpa_app_protection.json
    'Zscaler ZPA: Audit': assets/dashboards/crest_data_systems_zscaler_zpa_audit.json
    'Zscaler ZPA: Browser Access': assets/dashboards/crest_data_systems_zscaler_zpa_browser_access.json
    'Zscaler ZPA: Private Service Edge': assets/dashboards/crest_data_systems_zscaler_zpa_private_service_edge.json
    'Zscaler ZPA: User Activity': assets/dashboards/crest_data_systems_zscaler_zpa_user_activity.json
    'Zscaler ZPA: User Status': assets/dashboards/crest_data_systems_zscaler_zpa_user_status.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31633910
    source_type_name: crest_data_systems_zscaler
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- network
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_zscaler
integration_id: crest-data-systems-zscaler
integration_title: Zscaler
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_zscaler
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: zscaler
  short_description: Tarifa plana mensual para la integración de Zscaler.
  unit_price: 995.0
public_title: Zscaler
short_description: Monitorizar y obtener información sobre los logs de Zscaler Private
  Access y Zscaler Internet Access
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
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorizar y obtener información sobre los logs de Zscaler Private
    Access y Zscaler Internet Access
  media:
  - caption: 'Zscaler ZIA: auditoría'
    image_url: images/crest_data_systems_zscaler_zia_audit.png
    media_type: imagen
  - caption: 'Zscaler ZIA: DNS'
    image_url: images/crest_data_systems_zscaler_zia_dns.png
    media_type: imagen
  - caption: 'Zscaler ZIA: endpoint'
    image_url: images/crest_data_systems_zscaler_zia_endpoint.png
    media_type: imagen
  - caption: 'Zscaler ZIA: Web'
    image_url: images/crest_data_systems_zscaler_zia_web.png
    media_type: imagen
  - caption: 'Zscaler ZPA: estado del usuario'
    image_url: images/crest_data_systems_zscaler_zpa_user_status.png
    media_type: imagen
  - caption: 'Zscaler ZPA: auditoría'
    image_url: images/crest_data_systems_zscaler_zpa_audit.png
    media_type: imagen
  - caption: 'Zscaler ZPA: actividad del usuario'
    image_url: images/crest_data_systems_zscaler_zpa_user_activity.png
    media_type: imagen
  - caption: 'Zscaler ZPA: App Connector'
    image_url: images/crest_data_systems_zscaler_zpa_app_connector.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Zscaler
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Zscaler proporciona capacidades avanzadas de seguridad a través de tu plataforma Zero Trust Exchange, permitiendo el acceso seguro a aplicaciones y recursos de Internet. Con **Zscaler Private Access (ZPA)** y **Zscaler Internet Access (ZIA)**, las organizaciones pueden agilizar la conectividad remota segura y la gestión del tráfico de Internet. 

Esta integración recopila los siguientes tipos y subtipos de logs:

| Tipo                    | Descripción                                                                 | Subtipo                                             |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| ZPA: App Connector       | Métricas e información de estado relacionada con el rendimiento y la disponibilidad de un App Connector | Métricas, Estado                                     |
| ZPA: Private Service Edge| Métricas e información de estado relacionada con el rendimiento y la conexión de un Private Service Edge. | Métricas, Estado                                     |
| ZPA: usuario                | Información sobre solicitudes de usuarios finales, disponibilidad y estado de la conexión       | Actividad, Estado                                    |
| ZPA: acceso por navegador      | Detalles de log de HTTP para las actividades de acceso al navegador                              | Logs de acceso                                         |
| ZPA: auditoría               | Información de sesión para todas las actividades de administración en el Portal de administración de ZPA        | Logs de auditoría                                          |
| ZPA: AppProtection       | Detalles de las actividades de política de AppProtection                                  | AppProtection                                       |
| ZIA: Web                 | Logs relacionados con el tráfico y el acceso web                                      | Logs web                                            |
| ZIA: Firewall            | Logs detallando la actividad del firewall                                            | Logs del firewall                                       |
| ZIA: DNS                 | Información sobre consultas y respuestas DNS                                 | Logs de DNS                                            |
| ZIA: túnel              | Logs relacionados con la actividad del túnel                                             | Logs del túnel                                         |
| ZIA: auditoría               | Logs de auditoría administrativa que capturan acciones administrativas                           | Logs de auditoría                                          |
| ZIA: DLP                 | Logs de Data Loss Prevention que capturan infracciones de política                        | Logs del endpoint DLP                                            |

La integración incluye las siguientes reglas de detección listas para usar de [Datadog Cloud SIEM][12] para una mejor monitorización y seguridad:

1. Zscaler ZPA: anomalía de error de autenticación de App Connector
2. Zscaler ZPA: detección de actividad desde una localización nueva o sospechosa
3. Zscaler ZPA: anomalía en el error del nombre de dominio completamente cualificado
4. Zscaler ZPA: anomalía de error de autenticación de usuario
5. Zscaler ZIA: violación de política de DLP con gravedad alta o crítica o de emergencia
6. Zscaler ZIA: alerta DLP por modo zdp exento en 1 hora
7. Zscaler ZIA: cantidad inusual de autenticaciones fallidas
8. Zscaler ZIA: múltiples violaciones de política por un solo usuario

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración pertinente debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][7]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][8]
- Página web: [crestdata.ai][9]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][3]




[1]: https://docs.datadoghq.com/es/agent/?tab=Linux
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Zscaler.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://www.crestdata.ai/
[10]: https://help.zscaler.com/zpa/configuring-log-receiver
[11]: https://help.zscaler.com/zia/documentation-knowledgebase/analytics/nss/nss-feeds
[12]: https://docs.datadoghq.com/es/security/cloud_siem/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-zscaler" target="_blank">adquiere esta aplicación en el Marketplace</a>.