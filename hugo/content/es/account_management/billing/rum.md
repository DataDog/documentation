---
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Obtén información sobre RUM y la reproducción de sesiones
title: Facturación de RUM y la reproducción de sesiones
---

## Información general

Esta página contiene preguntas y respuestas comunes sobre temas de facturación de RUM y Session Replay.

## ¿Cómo se define una sesión?

Una sesión es el recorrido de un usuario por tu aplicación web o móvil. Una sesión suele incluir varias vistas de páginas con su telemetría asociada.

## ¿Cuándo caduca una sesión?

Una sesión expira luego de 15 minutos de inactividad y su duración está limitada a 4 horas. Una vez transcurridas las 4 horas, se crea una nueva sesión automáticamente.

## ¿Cuánto duran las grabaciones de Session Replay?

Las grabaciones de Session Replay pueden variar en función de la duración de la sesión. Por ejemplo, si observas repeticiones de sesión cortas, de 5 a 8 segundos, significa que el usuario finalizó la sesión después de 5 a 8 segundos.

## ¿Qué datos recopilan Datadog RUM y Session Replay?

Datadog recopila todas las páginas visitadas por tus usuarios finales, junto con la telemetría que te interesa, como la carga de recursos (XHR, imágenes, archivos CSS y scripts JS), errores de frontend, informes de fallos y tareas largas. Todo ello se incluye en la sesión del usuario. Para Session Replay, Datadog crea un iframe basado en snapshots del DOM. Datadog cobra por cada mil (1000) sesiones ingeridas en el servicio Real User Monitoring (RUM) de Datadog.

## ¿Puede Datadog gestionar aplicaciones de una sola página?

Sí, sin que tengas que configurar nada. Datadog RUM rastrea automáticamente los cambios de página.

## ¿Cómo se ven las solicitudes a endpoints extremo a extremo?

Con la integración APM predefinida puede vincular cualquier solicitud XHR o Fetch a tu traza (trace) de backend correspondiente.

## ¿Cómo se ven los logs desde el collector del navegador en RUM?

Los logs del navegador se vinculan automáticamente a la sesión RUM correspondiente, lo que te permite monitorizar cuándo se producen durante el recorrido del usuario final.

## ¿Datadog utiliza cookies?

Sí. Datadog utiliza cookies para agrupar los distintos pasos de tus usuarios en una sesión. Este proceso no utiliza cookies entre dominios y no rastrea las acciones de tus usuarios fuera de tus aplicaciones.

## Mi página de uso muestra sesiones RUM facturadas con el plan Browser RUM y Session Replay, pero no he configurado la captura de grabaciones de sesión para mi aplicación.

El plan **Browser RUM y Session Replay** desbloquea grabaciones de sesiones (repeticiones).

- Si estás recopilando repeticiones, se te facturarán las sesiones con el plan Replay.

- Si quieres desactivar la grabación de sesiones, consulta la [Documentación sobre la reproducción de sesiones][1].

## ¿Cómo afectan a las grabaciones de sesiones y a la facturación las vistas web en aplicaciones móviles?

Cuando una aplicación móvil contiene vistas web y has instrumentado tanto tu aplicación web como tu aplicación móvil con SDK de Datadog, se crea un puente. Todos los eventos registrados por el SDK del navegador en la aplicación web y que se cargan a través de la vista web se reenvían al SDK móvil. Estos eventos están vinculados a la sesión que se inició en la aplicación móvil.

En otras palabras, sólo la sesión RUM móvil es visible en Datadog y, por lo tanto, es la única facturable.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="Si has instrumentado tanto tu aplicación web como tu aplicación móvil con SDK de Datadog, sólo se te facturará por la sesión móvil." >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/session_replay/browser#disable-session-replay