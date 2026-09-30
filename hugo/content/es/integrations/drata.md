---
app_id: drata-integration
app_uuid: c06736af-282f-4b3c-a9e6-2b049dbc0e2a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10311
    source_type_name: Drata
author:
  homepage: https://www.drata.com/
  name: Drata
  sales_email: sales@drata.com
  support_email: support@drata.com
categories:
- conformidad
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/drata/README.md
display_on_public_website: true
draft: false
git_integration_title: drata
integration_id: drata-integration
integration_title: Drata
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: drata
public_title: Drata
short_description: Ingesta de información de conformidad de Datadog en Drata
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Cumplimiento
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Configuración
  description: Ingesta de información de conformidad de Datadog en Drata
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Drata
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Drata es una plataforma de automatización de la seguridad y la conformidad que supervisa y recopila continuamente evidencias de los controles de seguridad de una empresa, al tiempo que agiliza de forma integral los flujos de trabajo de conformidad para garantizar la preparación para las auditorías.

Esta integración permite a los clientes de [Drata][1] reenviar sus logs y eventos relacionados con la conformidad con la normativa desde Datadog a Drata, a través de una integración de API.

## Configuración

Para configurar esta integración, debes tener una [cuenta de Drata][2] activa. También debes tener [permisos de administrador][3] adecuados en Datadog.

### Instalación

1. Para instalar esta integración, necesitas crear una clave de API y de aplicación.
2. Recomendamos crear una cuenta de servicio en Datadog y aplicar el rol "Datadog Read Only" para dar a esta conexión permisos limitados.
3. Ve a tus parámetros de organización para [crear una clave de API][4] en Datadog. Asigna a la clave un nombre significativo, como `Drata`.
4. Copia y guarda tu `Key` de API.
5. En tus parámetros de organización, [crea una clave de aplicación][5]. 
6. Copia y guarda tu clave de aplicación.
7. Pega tu clave de API y tu clave de aplicación en el cuadro de conexión de Drata para Datadog.
8. Drata empezará a sincronizar los datos de usuario y de configuración desde la API de Datadog y te notificará si algún monitor de conformidad falla.


## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6] o [support@drata.com][7].


[1]: https://www.drata.com
[2]: https://drata.com/demo
[3]: https://docs.datadoghq.com/es/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-application-keys
[6]: https://docs.datadoghq.com/es/help/
[7]: mailto:support@drata.com