---
app_id: kameleoon
app_uuid: d47149c7-b559-43f5-a4c8-2dc2480fcd4d
assets: {}
author:
  homepage: https://www.kameleoon.com
  name: Kameleoon
  sales_email: product@kameleoon.com
  support_email: product@kameleoon.com
categories:
- configuración y despliegue
- herramientas de desarrollo
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kameleoon/README.md
display_on_public_website: true
draft: false
git_integration_title: kameleoon
integration_id: kameleoon
integration_title: Kameleoon
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: kameleoon
public_title: Kameleoon
short_description: Integra Kameleoon con Datadog RUM para monitorizar despliegues
  y lanzamientos de funciones con datos de rendimiento en tiempo real.
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
  description: Integra Kameleoon con Datadog RUM para monitorizar despliegues y lanzamientos
    de funciones con datos de rendimiento en tiempo real.
  media:
  - caption: Datadog RUM con información general de marcas de funciones de Kameleoon
    image_url: images/rum_dashboard.png
    media_type: imagen
  - caption: Datadog RUM con detalles de las marcas de funciones de Kameleoon
    image_url: images/rum_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Kameleoon
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->
## Información general

Kameleoon permite a los equipos gestionar y optimizar con precisión los lanzamientos de funciones en aplicaciones web, móviles y del lado del servidor.

Intégrelo con Datadog RUM para monitorizar despliegues y lanzamientos de funciones con datos de rendimiento en tiempo real, lo que te ayudará a comprender el efecto directo de funciones específicas en el comportamiento de los usuarios y en las métricas de la aplicación.

## Configuración

El rastreo de las marcas de funciones está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de la configuración, visita [Empezando con datos de marcas de funciones en RUM][1].

1. Actualiza la versión de tu Browser RUM SDK a 4.25.0 o superior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa [SDK de Kameleoon][2] y define un manejador `onEvent` para ver eventos `Evaluation`.

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

## Asistencia técnica

Para obtener más información, consulta la [documentación del SDK de Kameleoon][2] o únete a la [comunidad de Kameleoon Slack][3] para obtener asistencia técnica sobre la integración de Kameleoon Datadog.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk/
[3]: https://join.slack.com/t/kameleooncommunity/shared_invite/zt-1s6m8s09e-~yA1EUgn5pLWW_mrgf8TrQ