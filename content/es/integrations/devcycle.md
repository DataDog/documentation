---
app_id: devcycle
app_uuid: a550d328-e35d-445b-8d13-d12b2c7da5d2
assets: {}
author:
  homepage: https://devcycle.com
  name: DevCycle
  sales_email: sales@devcycle.com
  support_email: support@devcycle.com
categories:
- configuración y despliegue
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/devcycle/README.md
display_on_public_website: true
draft: false
git_integration_title: devcycle
integration_id: devcycle
integration_title: DevCycle
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: devcycle
public_title: DevCycle
short_description: Indicadores de funciones que determinan cómo codificas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Notificaciones
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Indicadores de funciones que determinan cómo codificas
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://devcycle.com
  - resource_type: Documentación
    url: https://docs.devcycle.com/tools-and-integrations/datadog-rum
  support: README.md#Soporte
  title: DevCycle
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

DevCycle proporciona las siguientes integraciones con Datadog:

### Integración para el seguimiento de indicadores de funciones

La integración para el seguimiento de indicadores de funciones de DevCycle enriquece tus datos RUM con las evaluaciones de variables de tus características para proporcionar visibilidad de la monitorización del rendimiento y los cambios de comportamiento. Determina a qué usuarios se les muestra una experiencia de usuario específica y si está afectando negativamente al rendimiento del usuario.

## Configuración

### Configuración del seguimiento de indicadores de funciones

El seguimiento de indicadores de funciones está disponible en el SDK del Navegador RUM. Para obtener instrucciones de configuración detalladas, consulta la guía [Empezando con los datos de indicadores de características en RUM][1].

1. Actualiza tu versión de SDK del Navegador RUM a la versión 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK DevCycle y suscríbete al evento `variableEvaluated`, llamando a `addFeatureFlagEvaluation` desde la devolución de llamada de suscripción.

```
// initialize the dvcClient

const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 

// for all variable evaluations

dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)

// for a particular variable's evaluations

dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

## Datos recopilados

### Métricas

La integración DevCycle no incluye métricas.

### Eventos

La integración DevCycle no incluye eventos.

### Checks de servicio

La integración DevCycle no incluye checks de servicio.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][2].

## Leer más

Más información sobre [DevCycle][3] y la [integración RUM Datadog][4].

[1]: https://docs.datadoghq.com/es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: https://docs.datadoghq.com/es/help/
[3]: https://devcycle.com
[4]: https://docs.devcycle.com/tools-and-integrations/datadog-rum