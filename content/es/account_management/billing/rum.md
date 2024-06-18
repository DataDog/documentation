---
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Obtén información sobre RUM y la reproducción de sesiones
title: Facturación de RUM y la reproducción de sesiones
---

## Información general

Esta página contiene preguntas y respuestas frecuentes sobre temas de facturación para RUM y la reproducción de sesiones.

## ¿Cómo se define una sesión?

Una sesión es el recorrido que hace un usuario por tu aplicación web o móvil. Suele incluir varias páginas visitadas con la telemetría asociada.

## ¿Cuándo caduca una sesión?

Una sesión caduca tras 15 minutos de inactividad y su duración está limitada a 4 horas. Transcurridas 4 horas, se crea una nueva sesión de forma automática.

## ¿Cuánto dura la reproducción de una sesión?

Las grabaciones varían según lo que dure la sesión. Por ejemplo, si observas reproducciones de sesiones cortas (entre 5 y 8 segundos), significa que el usuario ha finalizado la sesión al cabo de 5-8 segundos.

## ¿Qué datos recopila Datadog RUM y la reproducción de sesiones?

Datadog recopila todas las páginas visitadas por tus usuarios finales junto con la telemetría importante, como la carga de recursos (XHR, imágenes, archivos CSS y scripts JS), errores de frontend, informes de caídas y tareas largas. Todo esto se incluye en la sesión del usuario. Para la reproducción de sesiones, Datadog crea un iframe basado en snapshots del DOM. Datadog cobra por cada mil (1.000) sesiones extraídas en el servicio Datadog Real User Monitoring (RUM).

## ¿Datadog gestiona aplicaciones de una sola página?

Sí, sin que tengas que configurar nada. Datadog RUM rastrea automáticamente los cambios de página.

## ¿Cómo se ven las solicitudes endpoint de extremo a extremo?

Con la integración de APM lista para usar, puedes vincular cualquier solicitud XHR o Fetch a su traza backend correspondiente.

## ¿Cómo se ven los logs desde el collector del navegador en RUM?

Los logs del navegador se vinculan automáticamente a la sesión RUM correspondiente, lo que te permite monitorizar cuándo se producen durante el recorrido del usuario final.

## ¿Datadog utiliza cookies?

Sí. Datadog utiliza cookies para enlazar los distintos pasos de tus usuarios en una sesión. Este proceso no usa cookies entre dominios ni rastrea las acciones de tus usuarios fuera de tus aplicaciones.

## La página de mi uso muestra sesiones RUM facturadas en el plan Browser RUM & Session Replay, pero no he configurado el registro de grabaciones de sesiones para mi aplicación.

El plan **Browser RUM & Session Replay** da acceso a las grabaciones de sesiones (reproducciones).

- Si estás recopilando reproducciones, se te facturarán las sesiones conforme al plan de reproducciones.

- Si quieres desactivar la grabación de sesiones, consulta la [Documentación sobre la reproducción de sesiones][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/session_replay/#how-do-you-disable-session-replay