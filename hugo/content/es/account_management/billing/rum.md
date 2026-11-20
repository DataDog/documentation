---
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Aprenda sobre RUM y Session Replay
title: Facturación de RUM y Session Replay
---
## Descripción general {#overview}

Esta página contiene preguntas y respuestas frecuentes sobre temas de facturación para RUM y Session Replay.

## ¿Cómo se define una sesión? {#how-is-a-session-defined}

Una sesión es el recorrido de un usuario en su aplicación web o móvil. Una sesión generalmente incluye múltiples vistas de página con su telemetría asociada.

## ¿Cuándo expira una sesión? {#when-does-a-session-expire}

Una sesión expira después de 15 minutos de inactividad y su duración está limitada a 4 horas. Después de 4 horas, se crea automáticamente una nueva sesión.

## ¿Cuánto duran las grabaciones de Session Replay? {#how-long-are-session-replay-recordings}

Las grabaciones de Session Replay pueden variar según la duración de la sesión. Por ejemplo, si observa Session Replays breves de 5 a 8 segundos, significa que el usuario finalizó su sesión después de 5 a 8 segundos.

## ¿Qué datos recopila Datadog RUM y Session Replay? {#what-data-does-datadog-rum-session-replay-collect}

Datadog recopila todas las páginas visitadas por sus usuarios finales junto con la telemetría relevante, como la carga de recursos (XHR, imágenes, archivos CSS y scripts JS), errores de frontend, informes de fallos y tareas largas. Todo esto se incluye en la sesión de usuario. Para Session Replay, Datadog crea un iframe basado en instantáneas del DOM. Datadog cobra por cada mil (1,000) sesiones ingeridas en el servicio de Datadog Real User Monitoring (RUM).

## ¿Datadog maneja aplicaciones de una sola página? {#does-datadog-handle-single-page-applications}

Sí, sin ninguna configuración de su parte. Datadog RUM rastrea automáticamente los cambios de página.

## ¿Cómo se visualizan las solicitudes de punto de conexión de extremo a extremo? {#how-do-you-view-endpoint-requests-end-to-end}

Con la integración de APM lista para usar, puede vincular cualquier solicitud XHR o Fetch a su traza de backend correspondiente.

## ¿Cómo se visualizan los logs del recopilador del navegador en RUM? {#how-do-you-view-logs-from-the-browser-collector-in-rum}

Los logs del navegador se vinculan automáticamente a la sesión de RUM correspondiente, lo que le permite hacer un seguimiento de cuándo ocurren durante el recorrido del usuario final.

## ¿Datadog utiliza cookies? {#does-datadog-use-cookies}

Sí Datadog utiliza cookies para unir los diversos pasos de sus usuarios en una sesión. Este proceso no utiliza cookies entre dominios y no rastrea las acciones de sus usuarios fuera de sus aplicaciones.

## Mi página de Uso muestra sesiones de RUM facturadas bajo el plan Browser RUM & Session Replay, pero no he configurado la captura de grabaciones de sesión para mi aplicación. {#my-usage-page-shows-rum-sessions-billed-under-the-browser-rum-session-replay-plan-but-i-have-not-configured-capturing-session-recordings-for-my-application}

El plan **Browser RUM & Session Replay** desbloquea las grabaciones de sesión (Session Replay).

- Si está recopilando replays, se le facturarán las sesiones bajo el plan Replay.

- Si desea deshabilitar la captura de grabaciones de sesión, consulte la [documentación de Session Replay][1].

## ¿Cómo afectan los webviews en las aplicaciones móviles a las grabaciones de sesión y a la facturación? {#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing}

Cuando una aplicación móvil contiene webviews y usted ha instrumentado tanto sus aplicaciones web como móviles con los SDK de Datadog, se crea un puente. Todos los eventos registrados por el Browser SDK en la aplicación web que se cargan a través del webview se reenvían al Mobile SDK. Estos eventos están vinculados a la sesión que comenzó en la aplicación móvil.

En otras palabras, solo la sesión móvil de RUM es visible en Datadog y, por lo tanto, es la única que se factura.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="Si usted ha instrumentado tanto sus aplicaciones web como móviles con Datadog SDKs, solo se le facturará por la sesión móvil." >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/session_replay/