---
app_id: launchdarkly
categories:
- configuración y despliegue
- notificaciones
custom_kind: integración
description: Controla con confianza los lanzamientos de características y los cambios
  en la infraestructura.
further_reading:
- link: https://launchdarkly.com
  tag: otros
  text: og:title
- link: https://docs.launchdarkly.com/integrations/datadog/events
  tag: documentación
  text: Uso de la integración de eventos Datadog | LaunchDarkly | Documentación
media:
- caption: Breve descripción general de LaunchDarkly.
  image_url: images/video-thumbnail.png
  media_type: vídeo
  vimeo_id: 637675972
supported_os:
- Linux
- Windows
- macOS
title: LaunchDarkly
---
## Información general

{{% site-region region="gov" %}}

**La integración de LaunchDarkly no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}**.

{{% /site-region %}}

LaunchDarkly proporciona las siguientes integraciones con Datadog:

### Integración de eventos

La integración de eventos [LaunchDarkly](https://launchdarkly.com) para Datadog aporta marcadores de eventos de marca a tus dashboards de monitorización, para que puedas ver los efectos de tus despliegues de funciones de LaunchDarkly en los servicios o sistemas de tus clientes. Por ejemplo, si una función desplegada hace que un servicio se haga lento, puedes ver la causa en Datadog.

### Integración para el seguimiento de indicadores de funciones

La integración del seguimiento de indicadores de características LaunchDarkly enriquece tus datos RUM con tus indicadores de características para ofrecer una visibilidad de la monitorización del rendimiento y de los cambios de comportamiento. Determina a qué usuarios se les muestra una experiencia de usuario y si está afectando negativamente al rendimiento del usuario.

### Integración de métricas de proxy de retransmisión

Si utilizas [LaunchDarkly Relay Proxy](https://docs.launchdarkly.com/home/relay-proxy), puedes configurarlo para exportar métricas, como conexiones activas y acumuladas, a Datadog.

## Configuración

### Integración de eventos

La integración de eventos de LaunchDarkly utiliza una [clave de la API de Datadog](https://app.datadoghq.com/organization-settings/api-keys), que puede ser creada por un administrador de Datadog. Una vez que obtengas una clave de la API de Datadog, consulta la [documentación de LaunchDarkly para la integración de Datadog ](https://docs.launchdarkly.com/integrations/datadog/events) para aprender a configurar la integración de eventos de LaunchDarkly para Datadog.

### Configuración del seguimiento de indicadores de características

Feature Flag Tracking está disponible en el kit de desarrollo de software (SDK) el navegador RUM. Para obtener instrucciones detalladas de configuración, visita los [datos  de Empezando con la marca de función in RUM](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/).

1. Actualiza tu versión de SDK del Navegador RUM a la versión 4.25.0 o posterior.
1. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
1. Inicializa el SDK de LaunchDarkly y crea un inspector que informe de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

```
const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```

### Métricas del proxy de retransmisión

Sigue la [Documentación sobre integraciones de métricas] de Relay Proxy (https://github.com/launchdarkly/ld-relay/blob/v6/docs/metrics.md) para configurar esta función.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **launchdarkly_relay.connections_env_platformCategory_userAgent** <br>(medidor) | El número de conexiones de streaming proxy actuales.<br>_Mostrado como connection (conexión)_ |
| **launchdarkly_relay.newconnections_env_platformCategory_relayId_userAgent** <br>(medidor) | El número de conexiones de streaming creadas.<br>_Mostrado en connection (conexión)_ |
| **launchdarkly_relay.requests_env_method_platformCategory_route_userAgent** <br>(medidor) | Número de solicitudes recibidas.<br>_Mostrado como solicitud_ |

### Eventos

La integración de eventos de LaunchDarkly envía eventos de indicadores, proyectos y entornos desde LaunchDarkly a Datadog.

### Checks de servicio

La integración de LaunchDarkly no incluye checks de servicios.

## Soporte

¿Necesitas ayuda? Ponte en contacto con [Asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Más información sobre [LaunchDarkly](https://launchdarkly.com) y la [integración de eventos de Datadog](https://docs.launchdarkly.com/integrations/datadog/events).