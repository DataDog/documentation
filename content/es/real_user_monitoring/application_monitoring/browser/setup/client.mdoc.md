---
aliases:
- /es/real_user_monitoring/setup
- /es/real_user_monitoring/browser/setup/client
description: Configura el SDK del navegador RUM utilizando instrumentación del lado
  del cliente con NPM o CDN para monitorear la experiencia del usuario, el rendimiento
  y los errores en aplicaciones web.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  tag: Documentación
  text: Configuración avanzada
- link: /session_replay/browser/
  tag: Documentación
  text: Configura la reproducción de sesión
- link: /real_user_monitoring/error_tracking/browser/
  tag: Documentación
  text: Configura el seguimiento de errores
- link: /real_user_monitoring/correlate_with_other_telemetry/
  tag: Documentación
  text: Correlaciona eventos RUM con otra telemetría
title: Configuración del monitoreo del navegador en el lado del cliente
---
## Descripción general {% #overview %}

El SDK del navegador de Datadog habilita el Real User Monitoring (RUM) para tus aplicaciones web, proporcionando una visibilidad integral de la experiencia del usuario y el rendimiento de la aplicación. Con RUM, puedes monitorear los tiempos de carga de páginas, las interacciones del usuario, la carga de recursos y los errores de la aplicación en tiempo real.

RUM te ayuda a:

- Monitorea la experiencia del usuario con métricas de rendimiento detalladas para cargas de página, acciones del usuario y solicitudes de recursos
- Realiza el seguimiento del recorrido del usuario a través de tu aplicación con capacidades de reproducción de sesión
- Identifica cuellos de botella en el rendimiento y correlaciona el rendimiento del frontend y del backend con trazas de APM

El SDK del navegador es compatible con todos los navegadores modernos de escritorio y móviles y proporciona la recolección automática de métricas clave de rendimiento, interacciones del usuario y errores de la aplicación. Después de la configuración, puedes gestionar tus configuraciones de RUM por aplicación en Datadog y visualizar los datos recolectados en tableros y en el RUM Explorer.

{% partial file="sdk/setup/browser.mdoc.md" /%}

#### Establecer tasas de muestreo de sesiones {% #set-session-sampling-rates %}

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una tasa de muestreo para las sesiones RUM al inicializar el SDK del navegador. Por ejemplo, para muestrear el 80% de las sesiones, establece `sessionSampleRate` en 80:

```javascript
datadogRum.init({
  applicationId: '<APP_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  sessionSampleRate: 80,
  sessionReplaySampleRate: 20,
  // ... other configuration options
});
```

Para más información, consulte [Browser RUM & Session Replay Sampling][1].

## Comienza a monitorear tu aplicación {% #start-monitoring-your-application %}

Ahora que has completado la configuración básica para RUM, tu aplicación está recopilando errores del navegador y puedes comenzar a monitorear y depurar problemas en tiempo real.

Visualiza los [datos recopilados][2] en [tableros][3] o crea una consulta de búsqueda en el [RUM Explorer][4].

Tu aplicación aparece como pendiente en la página de Aplicaciones hasta que Datadog comience a recibir datos.

## Próximos pasos {% #next-steps %}

Consulta [Configuración Avanzada][5].


[1]: /es/real_user_monitoring/guide/sampling-browser-plans/
[2]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[3]: /es/real_user_monitoring/platform/dashboards/
[4]: https://app.datadoghq.com/rum/explorer
[5]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/