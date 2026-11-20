---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_cyberark_identity
app_id: crest-data-systems-cyberark-identity
categories:
- marketplace
- seguridad
- gestión de eventos
custom_kind: integración
description: Monitoriza la información sobre MFA, dispositivos, usuarios y aplicaciones
  de CyberArk Identity.
integration_version: 1.1.1
media:
- caption: Dashboard de MFA de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_mfa_details.png
  media_type: imagen
- caption: Dashboard de usuario y endpoint de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_user_and_endpoint_details.png
  media_type: imagen
- caption: Dashboard de aplicación de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_application_overview.png
  media_type: imagen
- caption: Dashboard de eventos de rol de acceso de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_access_role_event_details_overview.png
  media_type: imagen
- caption: Dashboard de eventos de inicio de sesión de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_login_details_overview.png
  media_type: imagen
- caption: Dashboard de eventos de modificación de usuarios de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_modify_user_event_details_overview.png
  media_type: imagen
- caption: Dashboard de información general de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_overview.png
  media_type: imagen
- caption: Dashboard de eventos de contraseña de CyberArk Identity
  image_url: images/crest_data_systems_cyberark_identity_password_event_details_overview.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: CyberArk Identity
---
## Información general

CyberArk Identity proporciona una plataforma segura para gestionar el acceso a aplicaciones, endpoints e infraestructura de red. CyberArk Identity también ofrece análisis adaptables, auditoría de la actividad de los usuarios e informes integrados y personalizados, que están disponibles a través del portal de administración de Identity.

**Entre las características de CyberArk Identity se encuentran las siguientes:**

- **Aprovisionamiento de acceso automatizado:** aprovisionamiento y revocación dinámica del acceso a los recursos corporativos.

- **Orquestación de identidades:** simplifica y automatiza los procesos de identidades complejas.

- **Controles de cumplimiento:** establece controles de cumplimiento y certificación de acceso en toda la organización.

- **Informes exhaustivos:** utiliza informes de auditoría y dashboards detallados para obtener visibilidad de los permisos de acceso y los derechos.

- Esta integración utiliza CyberArk Identity como fuente para recopilar datos relacionados con usuarios, dispositivos, aplicaciones, eventos MFA, eventos de inicio de sesión, eventos de contraseñas, eventos de modificación de usuarios y eventos de roles de acceso. Utiliza el endpoint de consulta RedRock de CyberArk Identity para recuperar estos datos del portal.

La integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para mejorar la monitorización y la seguridad:

- Restablecimiento manual de la contraseña de la cuenta de administrador
- Inicio de sesión nativo en CyberArk
- Cambio en el tipo de sufijo de usuario
- Usuario añadido al rol de administrador de nube privada
- Usuario añadido al rol de administrador del sistema

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración relevante debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de soporte: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Crest Data Datadog Marketplace Integrations FAQ](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-identity" target="_blank">Haz clic aquí</a> para comprar esta aplicación.