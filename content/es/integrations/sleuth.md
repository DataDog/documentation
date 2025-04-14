---
app_id: sleuth
app_uuid: 7923b3ef-2436-4315-bf2e-7631a6975886
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sleuth.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10118
    source_type_name: Sleuth
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sleuth
  sales_email: support@sleuth.io
  support_email: support@sleuth.io
categories:
- configuración y despliegue
- seguimiento de problemas
- orquestación
- control de fuentes
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sleuth/README.md
display_on_public_website: true
draft: false
git_integration_title: sleuth
integration_id: sleuth
integration_title: Sleuth
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sleuth
public_title: Sleuth
short_description: Rastreador de despliegue de Sleuth
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Orchestration
  - Category::Source Control
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastreador de despliegue de Sleuth
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sleuth
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Sleuth es una herramienta de rastreo de despliegues que te permite realizar un seguimiento de los despliegues de software a través de todo tu stack tecnológico de DevOps. Con una integración de Datadog, Sleuth te proporciona datos en tiempo real útiles, significativos y procesables que te permiten a ti y a tu equipo ver, con claridad, el impacto de los cambios que realizas en tu código.

## Configuración

Para añadir la integración de Datadog:

1. Inicia sesión en tu [cuenta de Sleuth][1].
2. Haz clic en **Integrations** (Integraciones) en la barra lateral.
3. Haz clic en la pestaña _Metric Trackers_ (Rastreadores de métricas), luego **enable** (activar) en la tarjeta de Datadog.
4. Introduce tu clave de API de Datadog y clave de aplicación en los campos correspondientes.
5. Si tus servidores de Datadog están en la UE, activa la casilla _My Datadog servers are in the EU_ (Mis servidores de Datadog están en la UE). No la marques si no estás seguro.
6. Pulsa **Save** (Guardar).

> Tu clave de API y clave de Aplicación de Datadog se encuentran en **Integrations** > **API** (Integraciones > API). También puedes hacer clic en el enlace **generate** (generar) del cuadro de diálogo de Sleuth (como se muestra a continuación), que te llevará al área de Claves de API/aplicaciones de tu consola de Datadog.

![][2]

> Una vez que la instalación de la integración de Datadog se ha realizado correctamente, aparece el mensaje **Datadog is connected** (Datadog está conectado).

![][3]

### Instalación

La integración de Datadog y Sleuth se instala exclusivamente desde tu cuenta de Sleuth. No hay ajustes ni configuración adicionales necesarios desde tu cuenta de Datadog, excepto para proporcionar tu clave de API y claves de aplicación de Datadog en Sleuth.

### Configuración

- Haz clic en el menú desplegable **Add metric** (Añadir métrica) y selecciona un proyecto de Sleuth para procesar métricas de Datadog entrantes. Todos los proyectos dentro de tu organización de Sleuth se muestran en el desplegable.

![][4]

> Las integraciones se realizan a nivel de la organización de Sleuth y están disponibles para todos los proyectos dentro de esa organización. Los ajustes individuales de integración se realizan a nivel de proyecto.

Una vez completada la configuración, Sleuth muestra métricas de Datadog en tus despliegues. Consulta [**Dashboard**][5] para más información sobre cómo las métricas se comunican en las tarjetas de despliegue de Sleuth.


## Datos recopilados

### Métricas

La integración de Sleuth no incluye ninguna métrica.

### Checks de servicio

La integración de Sleuth no incluye ningún check de servicio.

### Eventos

La integración de Sleuth no incluye ningún evento.

## Eliminación

1. En tu dashboard de Sleuth, haz clic en **Integrations** (Integraciones) en la barra lateral izquierda, luego en **Metric Trackers** (Rastreadores de métrica).
2. En la tarjeta de integración de Datadog, haz clic en **disable** (desactivar).

La integración de Datadog se desconecta y ya no está disponible para ningún proyecto dentro de esa organización. Cualquier modificación a nivel de proyecto que hayas realizado en la integración de Datadog se perderá.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [encargado de mantenimiento][6] de esta integración.

[1]: https://app.sleuth.io/accounts/login/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration-api-key.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-enabled-metric-pick.png
[5]: https://help.sleuth.io/dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/sleuth/manifest.json