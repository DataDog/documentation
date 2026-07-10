---
app_id: adaptive-shield
app_uuid: 0c72bf61-1de6-4408-8a24-86f8e3413e07
assets:
  dashboards:
    adaptive_shield_overview: assets/dashboards/adaptive_shield_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10310
    source_type_name: adaptive_shield
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.adaptive-shield.com/
  name: Adaptive Shield
  sales_email: info@adaptive-shield.com
  support_email: support@adaptive-shield.com
categories:
- nube
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/adaptive_shield/README.md
display_on_public_website: true
draft: false
git_integration_title: adaptive_shield
integration_id: adaptive-shield
integration_title: Adaptive Shield
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: adaptive_shield
public_title: Adaptive Shield
short_description: Seguimiento de las alertas de postura de SaaS
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Seguridad
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Seguimiento de las alertas de postura de SaaS
  media:
  - caption: Postura de entornos SaaS en Adaptive Shield
    image_url: images/posture.png
    media_type: imagen
  - caption: Comprobaciones de seguridad de configuraciones SaaS en Adaptive Shield
    image_url: images/security_checks.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Adaptive Shield
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Información general
Las aplicaciones SaaS como Office 365, Slack, Zoom y Salesforce son vitales para las operaciones diarias de una empresa, pero a menudo pueden introducir nuevos retos de seguridad. La solución Security Posture Management solution (SSPM) SaaS de Adaptive Shield cuenta con una monitorización y una gestión proactiva, profunda, continua y automatizada de las aplicaciones SaaS críticas para la empresa. Al integrarse con las aplicaciones SaaS, Adaptive Shield permite a los equipos de seguridad tener el control de sus aplicaciones SaaS, lo que ayuda a reforzar sus políticas de seguridad y reducir los riesgos.

Con la integración Adaptive Shield, puedes realizar un seguimiento y monitorizar alertas de postura SaaS, como derivas de la configuración, fallos de la integración y degradaciones de comprobaciones de seguridad, en forma de eventos Datadog.

## Configuración

1. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar la autorización de esta integración. A continuación, se te redirigirá a [Adaptive Shield][1].
2. Proporciona el nombre del alias.
3. Elige el sitio Datadog correspondiente.
4. Haz clic en **OAuth** para autorizar.


## Desinstalación

Al desinstalar esta integración, se revocan todas las autorizaciones anteriores. 

Además, asegúrate de que todas las claves de API asociadas a esta integración se han deshabilitado, buscando el nombre de la integración en la [página de gestión de las claves de API][2].


## Agent
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Adaptive Shield][3].

[1]: https://dashboard.adaptive-shield.com/settings/alerts/add/63230b73c9624b93dadf38d4
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=Adaptive%20Shield
[3]: mailto:support@adaptive-shield.com