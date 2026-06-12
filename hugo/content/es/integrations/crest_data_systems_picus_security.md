---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-picus-security
app_uuid: 770decf4-4d68-442d-87fe-6e4b2ec3fed4
assets:
  dashboards:
    Picus Security - Activity: assets/dashboards/crest_data_systems_picus_security_activity.json
    Picus Security - Inventory: assets/dashboards/crest_data_systems_picus_security_inventory.json
    Picus Security - Threats: assets/dashboards/crest_data_systems_picus_security_threats.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35190397
    source_type_name: crest_data_systems_picus_security
  logs:
    source: crest_data_systems_picus_security
author:
  homepage: https://crestdata.ai
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
git_integration_title: crest_data_systems_picus_security
integration_id: crest-data-systems-picus-security
integration_title: Picus Security
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_picus_security
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: picus-security
  short_description: Cuota fija mensual.
  unit_price: 95
public_title: Picus Security
short_description: Recopila logs de datos de inventario, así como logs de amenazas
  y actividad de Picus Security.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Categoría::Red
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Oferta::Integración
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Recopila logs de datos de inventario, así como logs de amenazas y actividad
    de Picus Security.
  media:
  - caption: Picus Security - Inventario
    image_url: images/crest_data_systems_picus_security_inventory.png
    media_type: imagen
  - caption: Picus Security - Amenazas
    image_url: images/crest_data_systems_picus_security_threats.png
    media_type: imagen
  - caption: Picus Security - Actividad
    image_url: images/crest_data_systems_picus_security_activity.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Picus Security
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[**Picus Security**][1] es una plataforma de validación de la seguridad que evalúa y mejora las defensas de una organización. Simula ciberataques del mundo real (por ejemplo, phishing, malware) para evaluar los controles de seguridad como cortafuegos, sistemas de prevención de intrusiones y soluciones de seguridad para endpoints.

- La **integración Picus Security Datadog** permite recopilar y visualizar datos de Picus Security **como logs** en Datadog. Los datos recopilados incluyen:

- **Datos de inventario**: Agents, integraciones, Agents de integraciones, dispositivos de mitigación, simulaciones de Picus.
- **Datos de amenazas**
- **Datos de actividad**

La integración incluye las siguientes reglas de detección predefinidas de [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para mejorar la monitorización y la seguridad:

  1. Cantidad anómala de intentos de inicio de sesión fallidos detectados en Picus Security
  2. Detección de actividad en una localización nueva o sospechosa en Picus Security

### Dashboards
Esta integración incluye **tres dashboards predefinidos**:

1. **Picus Security - Inventario**: Visualiza Agents, integraciones, Agents de integraciones, dispositivos de mitigación y datos de simulaciones de Picus recopilados en un `interval_for_inventory` definido por el usuario.
2. **Picus Security - Amenazas**: Muestra datos sobre amenazas recopilados en un `min_collection_interval`.
3. **Picus Security - Actividad**: Monitoriza las actividades realizadas en la aplicación web Picus Security.

## Ayuda

Para solicitar asistencia o características, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][9]
- Ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][11]
- PREGUNTAS FRECUENTES: [Preguntas frecuentes sobre integraciones Crest Data en Datadog Marketplace][3]

[1]: https://app.picussecurity.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Picus_Security.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
[12]: https://docs.datadoghq.com/es/security/cloud_siem/

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-picus-security" target="_blank">adquiérela en el Marketplace</a>.