---
app_id: data-runner
app_uuid: ad7b5a3c-497d-45e0-9bcf-50f2d1365247
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://datadoghq.com
  name: Datadog
  sales_email: sales@datadog.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/data_runner/README.md
display_on_public_website: true
draft: false
git_integration_title: data_runner
integration_id: data-runner
integration_title: Data Runner
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: data_runner
public_title: Data Runner
short_description: Juego de clics de métricas a la caza del dashboard de Datadog.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Extensión de la interfaz de usuario
  configuration: README.md#Configuración
  description: Juego de clics de métricas a la caza del dashboard de Datadog.
  media:
  - caption: Data Runner
    image_url: images/data-runner.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Data Runner
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

El Data Runner es un juego en el que tu personaje busca una métrica especificada por el jugador en un entorno de librería. Cuando el personaje encuentra la métrica especificada, el valor de la métrica se añade a la puntuación del jugador. Puedes añadir el Data Runner a tu dashboard de Datadog como widget.

Esta extensión es posible gracias a las [aplicaciones Datadog][1] que amplían la interfaz de usuario con contenidos de terceros no compatibles de forma nativa. Si te interesa ampliar tu experiencia en Datadog, ya sea por negocios o por diversión, puedes [crear tu propia aplicación o juego][1].

Para obtener más detalles sobre Data Runner, consulta [stuartlangridge/data-runner][2] en GitHub.

## Configuración

1. Para mostrar Data Runner en tu dashboard, abre el [dashboard][3] al que quieres añadir tu widget.

2. Utiliza el botón **+ Add Widgets** (+ Añadir widgets) para abrir una lista de widgets disponibles. Arrastra y suelta el widget de Data Runner en la posición que hayas elegido en el dashboard.

3. Elige una métrica para que el personaje del juego la encuentre.

## Datos recopilados

### Métricas

Data Runner no proporciona métricas.

### Eventos

Data Runner no incluye eventos.

### Checks de servicio

Data Runner no incluye checks de servicio.

## Agent

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

Para crear tu propia aplicación Datadog, consulta la [documentación para desarrolladores de aplicaciones de Datadog][1].

[1]: https://docs.datadoghq.com/es/developers/datadog_apps
[2]: https://github.com/stuartlangridge/data-runner
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://www.datadoghq.com/support/
