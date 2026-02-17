---
beta: true
code_lang: servidor
code_lang_weight: 2
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el Explorador RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Información sobre el SDK del navegador para logs de Datadog
title: Instrumentación automática
type: lenguaje de código múltiple
---

<div class="alert alert-info">Para probar la vista previa de la Instrumentación automática RUM, sigue las instrucciones de esta página.</div>

## Información general

La Instrumentación automática te permite añadir RUM JS al HTML de tu aplicación web. Funciona inyectando el SDK del navegador RUM en las respuestas HTML que se sirven a través de un servidor web o proxy. Una vez configurada la instrumentación automática, puedes gestionar las configuraciones desde la interfaz de usuario.

## Empezando

Selecciona una plataforma para empezar a recopilar datos de RUM de tu aplicación:

<div class="alert alert-info">Para solicitar asistencia para un servidor web que no figura en esta lista, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">rellena este formulario.</a></div>

<br>
{{< partial name="rum/rum-browser-setup.html" >}}
<br>

## Limitaciones

Ten en cuenta las siguientes limitaciones al utilizar la instrumentación automática:

- Este método de instrumentación **no admite [configuraciones RUM avanzadas][1]**.
- Si tu servidor web actúa como proxy y el servidor ascendente utiliza el **cifrado de extremo a extremo (TLS)** o la **compresión de contenido** (gzip, zstd, Brotli), el SDK del navegador RUM **no podrá ser inyectado**. Para garantizar la correcta instrumentación:
  - **Desactiva la compresión de contenido** en el servidor ascendente.
  - **Activa la originación TLS** en el servidor web.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/advanced_configuration/