---
description: Aprende a capturar y reproducir visualmente la experiencia de navegación
  web de tus usuarios con Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliza Session Replay de Datadog para ver en tiempo real los recorridos de
    los usuarios
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilizar el análisis del embudo para comprender y optimizar los flujos de
    usuarios clave
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproducir visualmente los problemas de los usuarios con Zendesk y Datadog
    Session Replay
- link: /product_analytics/analytics_explorer
  tag: Documentación
  text: Visualizar tus datos de Análisis de productos en el Analytics Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detectar y agregar infracciones de CSP con Datadog
title: Session Replay de navegador
---


## Información general

Session Replay amplía tu experiencia de monitorización de usuarios, ya que te permite capturar y reproducir visualmente la experiencia de navegación web de tus usuarios. Combinada con los datos de rendimiento de RUM, Session Replay es útil para identificar, reproducir y solucionar errores, y proporciona información sobre los patrones de uso y los fallos de diseño de tu aplicación web.

El SDK del navegador RUM es de [código abierto][1] y aprovecha el proyecto de código abierto [rrweb][2].

## Grabador de Session Replay

El grabador de Session Replay forma parte del SDK del navegador RUM. El grabador toma una snapshot de DOM y CSS del navegador, mientras realiza un seguimiento y graba los eventos de una página web (como modificaciones de DOM, movimientos del cursor, clics y eventos de entradas) junto con estas marcas de tiempo de eventos.

Luego, Datadog vuelve a crear la página web y vuelve a aplicar los eventos grabados en la vista de la repetición en el momento adecuado. Session Replay sigue la misma política de conservación de 30 días que las sesiones RUM normales.

El grabador de Session Replay admite todos los navegadores compatibles con el SDK de navegador de RUM. Para obtener más información, consulta la [Tabla de compatibilidad de navegadores][3].

Para reducir el impacto de Session Replay en la red y garantizar que el grabador de Session Replay tenga una sobrecarga mínima en el rendimiento de tu aplicación, Datadog comprime los datos antes de enviarlos. Datadog también reduce la carga en el subproceso de interfaz de usuario de un navegador delegando la mayor parte del trabajo intensivo de CPU (como la compresión) a un worker web exclusivo. El impacto previsto en el ancho de banda de red es inferior a 100 kB/min.

## Configuración

Session Replay está disponible en el SDK del navegador RUM. Para empezar a recopilar datos para Session Replay, configura la [monitorización del navegador RUM de Datadog][4] al crear una aplicación de RUM, habilitar la generación de token de cliente e inicializar el SDK del navegador RUM. Para ver la configuración en entornos móviles, consulta [Session Replay para móviles][5].

<div class="alert alert-info">Session Replay es compatible con la versión 3.6.0 o posterior del SDK.</div>

## Uso

A partir de la versión 5.0.0 del SDK del navegador RUM, Session Replay comienza a grabar automáticamente al llamar a `init()`. Para iniciar condicionalmente la grabación, utiliza el parámetro de inicialización `startSessionReplayRecordingManually` y llama a `startSessionReplayRecording()`.

Por ejemplo, para registrar sólo las sesiones de usuarios autenticados:

```javascript
window.DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  startSessionReplayRecordingManually: true,
  ...
});

if (user.isAuthenticated) {
    window.DD_RUM.startSessionReplayRecording();
}
```

Para detener la grabación de Session Replay, llama a `stopSessionReplayRecording()`.

<div class="alert alert-danger">Cuando se utiliza una versión del SDK del navegador RUM anterior a v5.0.0, la grabación de Session Replay no comienza automáticamente. Para iniciar la grabación, llama a <code>startSessionReplayRecording()</code>.</div>

## Desactivar Session Replay

Para detener las grabaciones de sesión, establece `sessionReplaySampleRate` en `0`. Esto detiene la recopilación de datos para el [plan de navegador RUM y Session Replay][6].

<div class="alert alert-danger">Si estás utilizando una versión del SDK del navegador RUM anterior a v5.0.0, define <code>replaySampleRate</code> en <code>0</code>.</div>

## Historial de reproducción

Puedes ver quién ha visto la repetición de una sesión determinada haciendo clic en el recuento de **vistos** que aparece en la página del reproductor. Esta función te permite consultar si alguien con quien quieres compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Consultar quién ha visto la grabación de una sesión" style="width:100%;" >}}

El historial sólo incluye las reproducciones que se han realizado en la página del reproductor o en un reproductor integrado, como en un [notebook][8] o panel lateral. Las reproducciones incluidas también generan un evento de [Audit Trail][7]. Las previsualizaciones en miniatura no se incluyen en el historial.

Para ver tu propio historial de reproducción, consulta la lista de reproducción [Mi historial de vistas][9].

## Session Replay para móvil

Más información sobre [Session Replay para móviles][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /es/real_user_monitoring/browser/
[5]: /es/real_user_monitoring/session_replay/mobile/
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: https://docs.datadoghq.com/es/account_management/audit_trail/
[8]: https://docs.datadoghq.com/es/notebooks/
[9]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history