---
app_id: split-rum
app_uuid: 750d9e38-2856-44fe-98d0-9fbbc617d876
assets: {}
author:
  homepage: https://split.io/
  name: Split
  sales_email: partners@split.io
  support_email: support@split.io
categories:
- configuración y despliegue
- seguimiento de problemas
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: split-rum
integration_id: split-rum
integration_title: Split - RUM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: split-rum
public_title: Split - RUM
short_description: Enriquece tus datos RUM con tus indicadores de características
  de Split
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
  description: Enriquece tus datos RUM con tus indicadores de características de Split
  media:
  - caption: Datadog RUM con información general de Indicadores de características
      de Split (lista de indicadores)
    image_url: images/split-feature-flags-list-in-dd-rum.png
    media_type: imagen
  - caption: Datadog RUM con detalles de Indicadores de características de Split
    image_url: images/split-feature-flag-detail-in-dd-rum.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Split - RUM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->

## Información general

[Split][1] es una [plataforma][2] de gestión inteligente de funciones que combina la velocidad y la fiabilidad de los indicadores de características con datos para medir el impacto de cada característica. Con Split, las organizaciones disponen de una forma segura de publicar características, orientarlas a los clientes y medir el impacto de las características en las métricas de experiencia del cliente.

Con la integración de Datadog Split RUM, los equipos de producto pueden ver la información de indicadores de características superpuesta a los datos RUM. Esto permite una monitorización proactiva de la actividad en tiempo real y la experiencia de los usuarios individuales y, si es necesario, un rápido retroceso o cierre de las características que pueden estar causando degradaciones.

## Configuración

El seguimiento de los indicadores de características está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de configuración, consulta la guía [Empezando con los datos del Indicador de características en RUM][3].

1. Actualiza la versión de tu SDK del navegador RUM a 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK de Split y crea un receptor de impresiones para informar de las evaluaciones de los indicadores de características a Datadog utilizando el siguiente fragmento de código:


```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {              
          datadogRum
              .addFeatureFlagEvaluation(
                   impressionData.impression.feature,
                   impressionData.impression.treatment
              );
     },
  },
});

const client = factory.client();
```

## Resolución de problemas

¿Necesitas ayuda? Consulta la [página del SDK de JavaScript][4] en la documentación de Split o ponte en contacto con el [soporte de Datadog][5].

[1]: https://split.io
[2]: https://www.split.io/product/
[3]: https://docs.datadoghq.com/es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[4]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
[5]: https://docs.datadoghq.com/es/help/