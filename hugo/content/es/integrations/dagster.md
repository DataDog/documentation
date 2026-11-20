---
app_id: dagster-plus
app_uuid: 019635d0-d25c-7e1b-86de-83baaac55b5e
assets:
  dashboards:
    Dagster+ Overview: assets/dashboards/dagster__overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 44669257
    source_type_name: dagster-plus
    supports_ddr_coordinated_failover: false
  logs:
    source: dagster-plus
  oauth: assets/oauth_clients.json
author:
  homepage: https://dagster.io
  name: Dagster+
  sales_email: sales@dagster.cloud
  support_email: support@dagster.cloud
  vendor_id: dagster
categories:
- orquestación
- recopilación de logs
- nube
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/dagster/README.md
display_on_public_website: true
draft: false
git_integration_title: dagster
integration_id: dagster-plus
integration_title: Dagster+
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dagster
public_title: Dagster+
short_description: Recopilar logs de eventos de tus despliegues de Dagster+
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Orquestación
  - Category::Log Collection
  - Categoría::Nube
  - Category::AI/ML
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Recopilar logs de eventos de tus despliegues de Dagster+
  media:
  - caption: Dashboard de información general de Dagster
    image_url: images/Screenshot 2025-04-15 at 2.33.38 PM.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Dagster+
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Dagster es una plataforma open-source de última generación diseñada para crear, ejecutar y monitorizar flujos de trabajo de recursos de datos. La integración de Dagster+ transmite [logs de eventos][1] a Datadog e incluye un pipeline de logs y un dashboard predefinidos.

## Configuración

1. En Datadog, ve al cuadro de la integración de Dagster y haz clic en **Connect Accounts** (Conectar cuentas) para iniciar el flujo de OAuth.

2. Inicia sesión en Dagster+ utilizando la cuenta que quieres utilizar para esta integración.

3. Cuando se te redirija a Datadog, haz clic en **Authorize** (Autorizar) para conceder a Dagster+ permiso para crear una clave de API para enviar logs a tu cuenta de Datadog.

### Validación

Luego de 10 minutos de finalizar la configuración de la integración, el dashboard de información general de Dagster empieza a mostrar nuevos eventos de logs, siempre que haya trabajos de Dagster activos emitiendo eventos.

## Desinstalación

1. Ve al cuadro de la integración de Dagster+ y haz clic en **Uninstall Integration** (Desinstalar integración).

2. Luego de desinstalar la integración, se revocan todas las autorizaciones anteriores.

3. Desactiva todas las claves de API asociadas a esta integración buscando el nombre de la integración en la [página de claves de API][2].

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Dagster][3].


[1]: https://docs.dagster.io/guides/monitor/logging
[2]: https://github.com/DataDog/integrations-extras/blob/master/organization-settings/api-keys?filter=Dagster
[3]: https://dagster.io/support