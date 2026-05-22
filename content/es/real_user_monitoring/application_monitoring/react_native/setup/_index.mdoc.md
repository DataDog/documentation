---
aliases:
- /es/real_user_monitoring/react-native/
- /es/real_user_monitoring/reactnative/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
- /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
- /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
- /es/real_user_monitoring/application_monitoring/react_native/setup/expo/
- /es/real_user_monitoring/reactnative/expo/
- /es/real_user_monitoring/reactnative-expo/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/expo
- /es/real_user_monitoring/mobile_and_tv_monitoring/expo/setup
- /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
content_filters:
- label: Setup Method
  option_group_id: rum_react_native_framework_options
  trait_id: platform
description: Recopile datos de RUM y Error Tracking de sus proyectos de React Native.
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: Documentación
  text: Configuración avanzada de RUM para React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente para dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitoree aplicaciones de React Native
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentación
  text: Monitoree aplicaciones híbridas de React Native
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprenda cómo explorar sus datos de RUM
title: Configuración de monitoreo de React Native
---
Esta página describe cómo instrumentar sus aplicaciones para [Real User Monitoring (RUM)][1] con el React Native SDK. RUM incluye Error Tracking por defecto, pero si ha adquirido Error Tracking como un producto independiente, consulte la [guía de configuración de Error Tracking][2] para pasos específicos.

La versión mínima soportada para el SDK de React Native es React Native v0.65+. La compatibilidad con versiones anteriores no está garantizada de forma predeterminada.

## Configuración {% #setup %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/setup/react-native.mdoc.md" /%}
{% /if %}

<!-- Expo -->
{% if equals($platform, "expo") %}
{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}
{% /if %}

## Enviando datos cuando el dispositivo está desconectado {% #sending-data-when-device-is-offline %}

El SDK de React Native ayuda a que los datos estén disponibles cuando el dispositivo del usuario está desconectado. En casos de áreas con baja red, o cuando la batería del dispositivo está demasiado baja, todos los eventos se almacenan primero en el dispositivo local en lotes. Se envían tan pronto como la red está disponible y la batería es lo suficientemente alta para que el SDK de React Native no afecte la experiencia del usuario final. Si la red no está disponible con su aplicación ejecutándose en primer plano, o si una carga de datos falla, el lote se mantiene hasta que se pueda enviar con éxito.

Esto significa que incluso si los usuarios abren su aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Los datos en el disco se eliminan automáticamente si se vuelven demasiado antiguos para que el SDK de React Native no use demasiado espacio en disco.

## Rastree eventos en segundo plano {% #track-background-events %}

{% alert level="info" %}
El seguimiento de eventos en segundo plano puede llevar a sesiones adicionales, lo que puede afectar la facturación. Para preguntas, [contacte al soporte de Datadog][12].
{% /alert %}

Puede rastrear eventos como fallos y solicitudes de red cuando su aplicación está en segundo plano (por ejemplo, cuando no hay una visualización activa disponible).

Agregue el siguiente fragmento durante la inicialización en su configuración de Datadog:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /es/real_user_monitoring/
[2]: /es/error_tracking/
[12]: https://docs.datadoghq.com/es/help/