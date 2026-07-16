---
app_id: eppo
categories:
- configuración y despliegue
- herramientas de desarrollo
- evento gestión
- nube
custom_kind: integración
description: Enriquecer tus datos Datadog RUM con información de marcadores de características
  de Eppo
integration_version: 1.0.0
media:
- caption: Información general sobre Datadog RUM con marcadores de Eppo
  image_url: images/eppo_datadog1.png
  media_type: imagen
- caption: Detalles de Datadog RUM con marcadores de Eppo
  image_url: images/eppo_datadog2.png
  media_type: imagen
- caption: Datadog RUM con vista de la sesión de marcadores de Eppo
  image_url: images/eppo_datadog3.png
  media_type: imagen
supported_os:
- linux
- Windows
- macOS
title: Eppo
---
## Información general

[Eppo](https://www.geteppo.com/) es la plataforma de experimentación y gestión de funciones que pone los tests A/B avanzados al alcance de todos los miembros de tu organización.

La integración Datadog RUM Eppo enriquece tus datos de Datadog RUM con la información de tu marcador de características, incluido el nombre y la variación del marcador, para proporcionarte una visibilidad de la monitorización del rendimiento y de los cambios de comportamiento. Puedes utilizarla para determinar a qué usuarios se les muestra una característica y si esta afecta negativamente al rendimiento del usuario.

## Configuración

Feature Flag Tracking está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de configuración, consulta la guía [Empezando con datos de Feature Flag en RUM](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/).

1. Actualiza la versión de tu Browser RUM SDK a 4.25.0 o superior.
1. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
1. Inicializa el kit de desarrollo de software (SDK) de Eppo con la opción `datadogRum`, que informa de las evaluaciones de los indicadores de características a Datadog.

El siguiente es un ejemplo de JavaScript:

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    // Send the assignment event to customers' event logging
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomized Assignment",
      type: "track",
      properties: { ...assignment },
    });

    // Assuming `exposure` is defined in this context and has a property `variation`
    datadogRum.addFeatureFlagEvaluation(assignment.experiment, exposure.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

## Solucionar problemas

¿Necesitas ayuda? Consulta la [documentación de Eppo](https://docs.geteppo.com/sdks/datadog).