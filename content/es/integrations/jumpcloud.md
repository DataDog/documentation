---
app_id: jumpcloud
app_uuid: 37f8026f-e2ac-4a71-9270-0b03fab814cc
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 613
    source_type_name: Jumpcloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- gestión de eventos
- seguridad
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jumpcloud
integration_id: jumpcloud
integration_title: Jumpcloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jumpcloud
public_title: Jumpcloud
short_description: Ver eventos de Jumpcloud en Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Ver eventos de Jumpcloud en Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jumpcloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

JumpCloud es una plataforma de directorio basada en la nube que proporciona un enfoque unificado de Active Directory y servicios LDAP centrado en la autenticación de usuarios y la gestión de red. 

Con JumpCloud, las empresas pueden gestionar y proporcionar acceso de usuario a software, sistemas y redes; imponer el cumplimiento con registros de auditoría; y proporcionar una experiencia de inicio de sesión unificada a través del inicio de sesión único (SSO). Como plataforma nativa en la nube, JumpCloud permite una forma remota y flexible de gestionar la TI, ofreciendo soluciones de seguridad sin dominio para las necesidades tradicionales de directorio.

La integración de JumpCloud proporciona acceso a lo siguiente:

- Eventos de directorio: logs sobre la actividad en el portal, incluidos los cambios de administrador en
  el directorio y las autenticaciones de administrador/usuario en el portal.

- Eventos de SAML: logs sobre autenticaciones de usuarios en aplicaciones SAML.

- Eventos de RADIUS: logs sobre autenticaciones de usuarios a RADIUS utilizadas para WiFi y VPNs.

- Eventos de MacOS, Windows, y Linux: logs sobre autenticaciones de usuarios en sistemas
  incluidos eventos relacionados con el Agent en actualizaciones claves de bloqueo, cambios de contraseña y File Disk
  Encription.

- Eventos de LDAP: logs sobre autenticaciones de usuarios en LDAP, incluidos tipos de eventos de LDAP de unión y
  búsqueda.

- Eventos de MDM: logs sobre los resultados del comando MDM.

Para obtener más información, consulta [Monitorizar tu directorio de JumpCloud con Datadog][1] y la [Referencia de la API Insights][2].

## Configuración

### Instalación

No requiere instalación.

### Configuración

Consulta el cuadro de integración para más detalles. Se requiere una clave de API del Portal de administrador de
JumpCloud.

## Datos recopilados

### Logs

Los logs se recopilan desde un único endpoint de la API. Consulta la [API Insights][2].

### Métricas

La integración de JumpCloud no incluye ninguna métrica.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://www.datadoghq.com/blog/monitor-jumpcloud-directory/
[2]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[3]: https://docs.datadoghq.com/es/help/