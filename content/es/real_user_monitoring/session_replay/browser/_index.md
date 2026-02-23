---
aliases:
- /es/real_user_monitoring/guide/session-replay-getting-started/
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

El SDK del navegador RUM es de [código abierto][1] y aprovecha el proyecto de código abierto [rrweb][2].

## Cómo funciona el grabador de Session Replay 

El grabador de Session Replay forma parte del SDK del navegador RUM. El grabador toma una snapshot de DOM y CSS del navegador, mientras realiza un seguimiento y graba los eventos de una página web (como modificaciones de DOM, movimientos del cursor, clics y eventos de entradas) junto con estas marcas de tiempo de eventos.

Datadog, a continuación, reconstruye la página web y vuelve a aplicar los eventos registrados en el momento adecuado en la vista de reproducción.

El grabador de Session Replay admite todos los navegadores compatibles con el SDK del Navegador RUM, con la excepción de IE11. Para obtener más información, consulta la [tabla de compatibilidad de navegadores][3].

Para reducir el impacto de Session Replay en la red y garantizar que el grabador de Session Replay tenga una sobrecarga mínima en el rendimiento de tu aplicación, Datadog comprime los datos antes de enviarlos. Datadog también reduce la carga en el subproceso de interfaz de usuario de un navegador delegando la mayor parte del trabajo intensivo de CPU (como la compresión) a un worker web exclusivo. El impacto previsto en el ancho de banda de red es inferior a 100 kB/min.

## Configuración

Aprende a [instalar y configurar el navegador de Session Replay][4].

## Opciones de privacidad

Consulta [Opciones de privacidad][5].

## Solucionar problemas

Aprende a [solucionar problemas del navegador de Session Replay][7].

## Session Replay para móviles

Más información sobre [Session Replay para móviles][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /es/real_user_monitoring/session_replay/browser/setup_and_configuration
[5]: /es/real_user_monitoring/session_replay/browser/privacy_options
[7]: /es/real_user_monitoring/session_replay/browser/troubleshooting
[8]: /es/real_user_monitoring/session_replay/mobile/