---
app_id: onelogin
app_uuid: e895d126-f1a3-421a-96d7-03e870447e23
assets:
  dashboards:
    OneLogin-Overview: assets/dashboards/OneLogin-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 617
    source_type_name: OneLogin
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
description: OneLogin
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/onelogin/
draft: false
git_integration_title: onelogin
has_logo: false
integration_id: onelogin
integration_title: OneLogin
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: onelogin
public_title: OneLogin
short_description: Integración con logs de eventos OneLogin.
supported_os:
- Linux
- Windows
- macOS
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: Integración con logs de eventos OneLogin.
  media: []
  overview: README.md#Información general
  support: README.md#Solucionar problemas
  title: OneLogin
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conecta Datadog a OneLogin para ver los logs publicado por OneLogin. La integración OneLogin recopila logs para realizar un seguimiento de cualquier [evento][1] en OneLogin, incluyendo inicios de sesión, acceso a archivos y actualizaciones de privilegios de administrador. Puedes utilizar esta integración para el cumplimiento y la seguridad junto con las [reglas SIEM predefinidas][2] de OneLogin.

## Configuración

### Recopilación de logs
#### Generar ID de cliente y secreto de cliente

1. Inicia sesión en tu cuenta de OneLogin.
2. Ve a **Administration** > **Developers** > **Api Credentials** (Administración > Desarrolladores > Credenciales API).
3. Haz clic en **New Credential** (Nueva credencial) y asigna un nombre significativo a tu credencial.
4. Concede a tu nueva credencial el acceso **Leer todo**.
5. Haz clic en tu nueva credencial para ver el ID de cliente y el secreto de cliente.

#### Instalación y configuración

1. Abre el [cuadro de la integración OneLogin][3].
2. Introduce el ID de cliente y el secreto de cliente en los campos correspondientes.
3. También puedes añadir etiquetas (tags) separadas por comas para asociar a tus logs.

### Métricas

La integración OneLogin no incluye métricas.

### Eventos

La integración OneLogin no incluye eventos.

### Checks de servicio

La integración OneLogin no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://developers.onelogin.com/api-docs/1/events/event-resource
[2]: https://docs.datadoghq.com/es/security/default_rules/?search=onelogin
[3]: https://app.datadoghq.com/account/settings#integrations/onelogin
[4]: https://docs.datadoghq.com/es/help/