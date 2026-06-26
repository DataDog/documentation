---
app_id: flagsmith-rum
app_uuid: a88f10b6-aef7-41df-979e-d70b720c6752
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- configuración y despliegue
- seguimiento de problemas
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith-rum
integration_id: flagsmith-rum
integration_title: Flagsmith
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: flagsmith-rum
public_title: Flagsmith
short_description: Enriquece tus datos RUM con indicadores de características de Flagsmith
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Enriquece tus datos RUM con indicadores de características de Flagsmith
  media:
  - caption: Información general de Datadog RUM con indicadores de Flagsmith
    image_url: images/flag_rum_overview.png
    media_type: imagen
  - caption: Detalles de Datadog RUM con indicadores de Flagsmith
    image_url: images/flag_rum_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Flagsmith][1] facilita la gestión de funciones en aplicaciones web, móviles y del lado del servidor.

La integración de Datadog Flagsmith RUM enriquece tus datos RUM con sus indicadores de características para proporcionar visibilidad de la monitorización del rendimiento y cambios de comportamiento. Determina a qué usuarios se les muestra una experiencia de usuario y si está afectando negativamente al rendimiento del usuario.

## Configuración

El seguimiento de indicadores de características está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de configuración, consulta la guía [Empezando con datos de indicadores de características en RUM][2].

1. Actualiza la versión del SDK de tu navegador RUM a la versión 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK de Flagsmith con la opción `datadogRum`, que informa de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

```javascript
flagsmith.init({
     datadogRum: {
        client: datadogRum,
        trackTraits: true,
    },
    ...
})
```

## Resolución de problemas

¿Necesitas ayuda? Consulta la [documentación de Flagsmith][3] o ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://flagsmith.com/
[2]: https://docs.datadoghq.com/es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.flagsmith.com/clients/javascript#datadog-rum-javascript-sdk-integration
[4]: https://docs.datadoghq.com/es/help/