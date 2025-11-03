---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-fortigate
app_uuid: 161092c6-b52c-465b-b46b-442b82768e67
assets:
  dashboards:
    CDS FortiGate Overview: assets/dashboards/crest_data_systems_fortigate_overview.json
    CDS FortiGate System: assets/dashboards/crest_data_systems_fortigate_system.json
    CDS FortiGate Traffic: assets/dashboards/crest_data_systems_fortigate_traffic.json
    CDS FortiGate UTM: assets/dashboards/crest_data_systems_fortigate_utm.json
    CDS FortiGate User Audit: assets/dashboards/crest_data_systems_fortigate_user_audit.json
    CDS FortiGate Wireless Network and VPN: assets/dashboards/crest_data_systems_fortigate_wireless_network_and_vpn.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.fortigate.system_metrics
      metadata_path: metadata.csv
      prefix: cds.fortigate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10362
    source_type_name: crest_data_systems_fortigate
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- la red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_fortigate
integration_id: crest-data-systems-fortigate
integration_title: FortiGate
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_fortigate
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: fortigate
  short_description: Tarifa plana mensual de la integración FortiGate.
  unit_price: 995.0
public_title: FortiGate
short_description: Monitoriza todos los logs de FortiGate reenviados.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::Seguridad
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitoriza todos los logs de FortiGate reenviados.
  media:
  - caption: CDS FortiGate - Información general
    image_url: images/crest_data_systems_fortigate_overview.png
    media_type: imagen
  - caption: CDS FortiGate - Sistema
    image_url: images/crest_data_systems_fortigate_system.png
    media_type: imagen
  - caption: CDS FortiGate - Tráfico
    image_url: images/crest_data_systems_fortigate_traffic.png
    media_type: imagen
  - caption: CDS FortiGate - Auditoría de usuarios
    image_url: images/crest_data_systems_fortigate_user_audit.png
    media_type: imagen
  - caption: CDS FortiGate - UTM
    image_url: images/crest_data_systems_fortigate_utm.png
    media_type: imagen
  - caption: CDS FortiGate - Red inalámbrica y VPN
    image_url: images/crest_data_systems_fortigate_wireless_network_and_vpn.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: FortiGate
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

- FortiGate proporciona una gama completa de funciones de protección frente a amenazas, como cortafuegos, prevención de intrusiones, antivirus, inspección SSL y control de aplicaciones. FortiGate reduce la complejidad mediante una visibilidad automatizada de aplicaciones, usuarios y redes, y proporciona calificaciones de seguridad para adoptar prácticas de seguridad recomendadas.

  Esta integración recopila los siguientes tipos y subtipos de logs:

  | Tipo | Descripción | Subtipo |
  | ------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
  | Tráfico | Registra información de flujo de tráfico como una solicitud HTTP/HTTPS y su respuesta, si la hay | FORWARD, LOCAL |
  | Evento | Registra eventos del sistema y administrativos | SYSTEM, USER, VPN, WIRELESS |
  | UTM | Registra eventos UTM | IPS, WEB |


**NOTA**: El soporte para métricas fue interrumpido y sus paneles relacionados están obsoletos en la v1.1.0 y posteriores de la integración. Tenemos previsto eliminarlos por completo en las próximas versiones de la integración.

Esta integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM][11] para una monitorización y seguridad mejoradas:

1. FortiGate detectó el acceso a sitios web maliciosos o peligrosos
2. Actividad de FortiGate detectada en localizaciones nuevas o sospechosas
3. FortiGate detectó un punto de acceso no autorizado
4. Evento de FortiGate recibido con gravedad crítica
5. FortiGate detectó la transferencia frecuente de grandes cantidades de datos a sitios de intercambio de archivos
6. FortiGate detectó un elevado número de acciones bloqueadas
7. FortiGate detectó múltiples fallos de autenticación
8. FortiGate recibió múltiples eventos de prevención de intrusiones de una sola fuente
9. FortiGate detectó un tráfico de red inusual

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración relevante debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][6]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][7]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ sobre integraciones Crest Data Datadog Marketplace][10]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://community.fortinet.com/t5/FortiGate/Technical-Tip-How-to-configure-logging-in-memory-in-later/ta-p/193637
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Fortigate.pdf
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://docs.datadoghq.com/es/security/cloud_siem/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-fortigate" target="_blank">adquiere esta aplicación en el Marketplace</a>.