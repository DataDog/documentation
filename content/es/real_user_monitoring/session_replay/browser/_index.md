---
aliases:
- /es/real_user_monitoring/guide/session-replay-getting-started/
- /es/real_user_monitoring/session_replay/
description: Aprende a capturar y reproducir visualmente la experiencia de navegación
  web de tus usuarios con Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliza Datadog Session Replay para ver los recorridos de los usuarios en
    tiempo real.
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Uso del análisis de embudo para comprender y optimizar los flujos (flows)
    de usuarios clave
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproducir visualmente los problemas de los usuarios con Zendesk y Datadog
    Session Replay
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualizar tus datos RUM en el Explorador
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detectar y agregar infracciones de CSP con Datadog
title: Session Replay de navegador
---

## Información general

Session Replay amplía tu experiencia de monitorización de usuarios, ya que te permite capturar y reproducir visualmente la experiencia de navegación web de tus usuarios. Combinada con los datos de rendimiento de RUM, Session Replay es útil para identificar, reproducir y solucionar errores, y proporciona información sobre los patrones de uso y los fallos de diseño de tu aplicación web.

El SDK del Navegador RUM es de [código abierto][1] y aprovecha el proyecto de código abierto [rrweb][2].

## Cómo funciona el grabador de Session Replay 

El grabador de Session Replay forma parte del SDK del Navegador RUM. El grabador toma una snapshot de DOM y CSS del navegador, mientras realiza un seguimiento y graba los eventos de una página web (como modificaciones de DOM, movimientos del cursor, clics y eventos de entradas) junto con estas marcas de tiempo de eventos.

Datadog, a continuación, reconstruye la página web y vuelve a aplicar los eventos registrados en el momento adecuado en la vista de reproducción.

El grabador de Session Replay admite todos los navegadores compatibles con el SDK del Navegador RUM, con la excepción de IE11. Para obtener más información, consulta la [tabla de compatibilidad de navegadores][3].

Para reducir el impacto de Session Replay en la red y garantizar que el grabador de Session Replay tenga una sobrecarga mínima en el rendimiento de tu aplicación, Datadog comprime los datos antes de enviarlos. Datadog también reduce la carga en el subproceso de interfaz de usuario de un navegador delegando la mayor parte del trabajo intensivo de CPU (como la compresión) a un worker web exclusivo. El impacto previsto en el ancho de banda de red es inferior a 100 kB/min.

## Configuración

Session Replay está disponible en el SDK del Navegador RUM. Para empezar a recopilar datos para Session Replay, configura la [monitorización del Navegador RUM Datadog][4] creando una aplicación RUM, habilitando la generación de token de cliente e inicializando el el SDK del Navegador RUM. Para ver la configuración en entornos móviles, consulta [Session Replay para móviles][5].

<div class="alert alert-info">Session Replay es compatible con la versión 3.6.0 o posterior del SDK.</div>

## Utilización

A partir de la versión 5.0.0 del SDK del Navegador RUM, Session Replay comienza a grabar automáticamente al llamar a `init()`. Para iniciar condicionalmente la grabación, utiliza el parámetro de inicialización `startSessionReplayRecordingManually` y llama a `startSessionReplayRecording()`.

Por ejemplo, para grabar sólo las sesiones de usuarios autenticados:

```javascript
window.DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  servicio: 'my-web-application',
  //  entorno: 'production',
  //  versión: '1.0.0',
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

<div class="alert alert-danger">Cuando se utiliza una versión del SDK del Navegador RUM anterior a v5.0.0, la grabación de Session Replay no comienza automáticamente. Para iniciar la grabación, llama a <code>startSessionReplayRecording()</code>.</div>

## Forzar Session Replay

En algunos casos, es posible que desees iniciar la grabación de una sesión después de que haya comenzado, incluso si inicialmente se muestreó fuera de la reproducción. Por ejemplo, es posible que desees forzar Session Replay en una página recién desplegada para una monitorización más detallada, o iniciar la grabación después de detectar un error para garantizar datos de reproducción completos.

Para forzar la grabación de Session Replay para el resto de la sesión actual, llama a `startSessionReplayRecording({ force: true })`

Cuando se utiliza la opción de forzar, la sesión se actualiza a una sesión reproducida durante el resto de su duración, independientemente de su decisión de muestreo inicial.

<div class="alert alert-danger">La opción forzar sólo convierte una sesión existente en una repetición si ya se está muestreando. En otras palabras, si aún no se ha iniciado el muestreo, el uso de la opción forzar no lo inicia y no se graba ninguna repetición.</div>

## Desactivar Session Replay

Para detener las grabaciones de sesión, establece `sessionReplaySampleRate` en `0`. Esto detiene la recopilación de datos para el [plan de navegador RUM y Session Replay][6].

<div class="alert alert-danger">Si estás utilizando una versión del SDK del navegador RUM anterior a v5.0.0, define <code>replaySampleRate</code> en <code>0</code>.</div>

## Conservación

Por defecto, los datos de Session Replay se conservan durante 30 días.

Para ampliar el periodo de conservación a 15 meses, puedes habilitar la conservación ampliada en las repeticiones de sesiones individuales. Estas sesiones no deben estar activas (el usuario ha completado su experiencia).

La conservación ampliada sólo se aplica a Session Replay y no incluye los eventos asociados. Los 15 meses comienzan cuando se habilita la conservación ampliada, no cuando se recopila la sesión.

Puedes deshabilitar la conservación ampliada en cualquier momento. Si la reproducción de sesiones todavía está dentro de los 30 días de conservación predeterminados, la reproducción caduca al final de la ventana inicial de 30 días. Si deshabilitas la conservación ampliada en una reproducción de sesión que tiene más de 30 días, la reproducción caduca inmediatamente.

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="Habilitar la conservación ampliada" style="width:100%;" >}}

Consulta el siguiente diagrama para comprender qué datos se conservan con la conservación ampliada.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="Diagrama de los datos que se conservan mediante la conservación ampliada" style="width:100%;" >}}

## Historial de reproducción

Puedes ver quién ha visto la repetición de una sesión determinada haciendo clic en el recuento de **vistos** que aparece en la página del reproductor. Esta función te permite consultar si alguien con quien quieres compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Consultar quién ha visto la grabación de una sesión" style="width:100%;" >}}

El historial sólo incluye las reproducciones que se han realizado en la página del reproductor o en un reproductor integrado, como en un [notebook][8] o panel lateral. Las reproducciones incluidas también generan un evento de [Audit Trail][7]. Las previsualizaciones en miniatura no se incluyen en el historial.

Para ver tu propio historial de reproducción, consulta la lista de reproducción [Mi historial de vistas][9].

## Session Replay para móviles

Más información sobre [Session Replay para móviles][5].

## Referencias adicionales

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