---
app_id: statsig-rum
app_uuid: 86a69c7d-8042-4f93-96b1-f139b2058644
assets:
  dashboards:
    statsig_rum: assets/dashboards/statsig_rum_overview.json
author:
  homepage: https://statsig.com
  name: Statsig
  sales_email: support@statsig.com
  support_email: support@statsig.com
categories:
- configuración y despliegue
- herramientas de desarrollo
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig_rum/README.md
display_on_public_website: true
draft: false
git_integration_title: statsig_rum
integration_id: statsig-rum
integration_title: Statsig - RUM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statsig_rum
public_title: Statsig - RUM
short_description: Enriquecer tus datos de Datadog RUM con la información sobre las
  puertas de características de Statsig
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Event Management
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Enriquecer tus datos de Datadog RUM con la información sobre las puertas
    de características de Statsig
  media:
  - caption: El dashboard de Datadog que muestra la inspección de la sesión de usuario
      y sus puertas de características habilitadas
    image_url: images/dd-view-1.jpg
    media_type: imagen
  - caption: El dashboard de Datadog mostrando un resumen de todas las puertas y los
      volúmenes de usuarios asignados a cada una de ellas
    image_url: images/dd-view-2.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Statsig - RUM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

La integración de seguimiento de indicadores de características de Statsig enriquece los datos de Datadog RUM con información sobre las características, lo que permite medir la causalidad entre las características del producto y las métricas de sistema y rendimiento.

## Configuración

### Configuración del seguimiento de indicadores de características

El seguimiento de indicadores de características está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de configuración, visita [Empezando con datos de indicadores de características en RUM][1].

1. Actualiza la versión del SDK de tu navegador RUM a la versión 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK de Statsig (`>= v4.34.0`) e implementa la opción `gateEvaluationCallback` como se muestra a continuación:

```js
await statsig.initialize('client-<STATSIG CLIENT KEY>',
  {userID: '<USER ID>'},
  {     
    gateEvaluationCallback: (key, value) => {
      datadogRum.addFeatureFlagEvaluation(key, value);
    }
  }
); 
```

## Soporte

Únete a la [comunidad en Slack de Statsig][2] para obtener ayuda sobre la activación de esta integración. [1]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection
[2]: https://join.slack.com/t/statsigcommunity/shared_invite/zt-pbp005hg-VFQOutZhMw5Vu9eWvCro9g