---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cyberark-pam
app_uuid: ababa86d-29f6-4503-b70a-40ef3772d764
assets:
  dashboards:
    'CDS CyberArk PAM : Application Details': assets/dashboards/crest_data_systems_cyberark_pam_application_details.json
    'CDS CyberArk PAM : Audit Logs': assets/dashboards/crest_data_systems_cyberark_pam_audit_logs.json
    'CDS CyberArk PAM : Inventory Overview': assets/dashboards/crest_data_systems_cyberark_pam_inventory_overview.json
    'CDS CyberArk PAM : Safe Details': assets/dashboards/crest_data_systems_cyberark_pam_safe_details.json
    'CDS CyberArk PAM : User, Account, Group Details': assets/dashboards/crest_data_systems_cyberark_pam_user_account_group_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.cyberark.pam.safe.retention_days
      metadata_path: metadata.csv
      prefix: cds.cyberark.pam
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7095797
    source_type_name: crest_data_systems_cyberark_pam
author:
  homepage: https://crestdata.ai
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
git_integration_title: crest_data_systems_cyberark_pam
integration_id: crest-data-systems-cyberark-pam
integration_title: CyberArk PAM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cyberark_pam
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cyberark_pam
  product_id: cyberark-pam
  short_description: Por usuario de CyberArk PAM al mes
  tag: user_id
  unit_label: Usuario de CyberArk PAM
  unit_price: 0.5
public_title: CyberArk PAM
short_description: Monitorizar los datos de CyberArk PAM mediante API y syslog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitorizar los datos de CyberArk PAM mediante API y syslog
  media:
  - caption: 'CDS CyberArk PAM: logs de auditoría'
    image_url: images/crest_data_systems_cyberark_pam_audit_logs_details.png
    media_type: imagen
  - caption: 'CDS CyberArk PAM: detalles de seguridad'
    image_url: images/crest_data_systems_cyberark_pam_safe_details.png
    media_type: imagen
  - caption: 'CDS CyberArk PAM: detalles de la aplicación'
    image_url: images/crest_data_systems_cyberark_pam_application_details.png
    media_type: imagen
  - caption: 'CDS CyberArk PAM: descripción general del inventario'
    image_url: images/crest_data_systems_cyberark_pam_inventory_overview.png
    media_type: imagen
  - caption: 'CDS CyberArk PAM: detalles de usuario, cuenta y grupo'
    image_url: images/crest_data_systems_cyberark_pam_users_groups_accounts_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: CyberArk PAM
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

CyberArk Privileged Access Manager (PAM) es una solución de ciclo de vida completo para la gestión de credenciales privilegiadas y secretos, así como claves SSH para empresas. Permite a las organizaciones proteger, aprovisionar, gestionar, controlar y monitorizar todas las actividades asociadas a todo tipo de identidades privilegiadas.

Entre las características de CyberArk PAM se incluyen las siguientes:

* **Gestionar cuentas privilegiadas:** gestionar cuentas privilegiadas y sus actividades.
* **SSO privilegiado:** conéctate a sistemas y aplicaciones remotas sin conocer o especificar la contraseña o clave requerida.
* **Monitorizar sesiones:** asegura, controla y monitoriza acceso privilegiado a sistemas y aplicaciones críticos utilizando tecnología de vault para administrar cuentas privilegiadas y crear auditorías de sesión detalladas y grabaciones de vídeo de todas las sesiones privilegiadas del administrador de TI en máquinas remotas.
* **Seguridad:** busca indicios de abuso o uso indebido de la plataforma CyberArk mediante la monitorización del uso de cuentas privilegiadas, que son gestionadas por la plataforma CyberArk PAM, así como cuentas que aún no son gestionadas.
* **Informes y auditoría:** genera informes de las actividades de vault y exporta estos datos a herramientas de terceros.

Esta integración utiliza CyberArk Privileged Access Manager (PAM) como fuente para recopilar los datos relacionados con cajas fuertes, usuarios, grupos, cuentas y aplicaciones desde el portal utilizando las API REST v13.2 de CyberArk PAM. La integración también recopila los logs de auditoría del portal con Syslog.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][5]
- Ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][12]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/PAS/Latest/en/Content/PASIMP/DV-Integrating-with-SIEM-Applications.htm#ConfigureSIEMintegration
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.datadoghq.com/es/help/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_PAM.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[13]: https://api-docs.cyberark.com/docs/ispss-api-auth/2c297daca8a97-api-token-authentication-for-cyber-ark-identity-security-platform-shared-services#step-1-create-an-ispss-service-account
[14]: https://docs.cyberark.com/ispss-access/latest/en/content/ispss/ispss-api-authentication.htm#Overview
[15]:https://docs.cyberark.com/privilege-cloud-standard/latest/en/content/privilege%20cloud/privcloud-deploy-st.htm
[16]:https://docs.cyberark.com/privilege-cloud-standard/latest/en/content/privilege%20cloud/privcloud-connect-siem.htm#ConfigureSIEMintegration
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-pam" target="_blank">adquiere esta aplicación en el Marketplace</a>.