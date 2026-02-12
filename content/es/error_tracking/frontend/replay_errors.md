---
description: Aprende a recopilar fragmentos de repeticiones para asegurarte de ver
  los problemas que te interesan.
further_reading:
- link: /error_tracking/suspect_commits
  tag: Documentación
  text: Descubre cómo el seguimiento de errores puede identificar commits sospechosos
- link: /error_tracking
  tag: Documentación
  text: Más información sobre el seguimiento de errores
is_beta: true
private: false
title: Seguimiento de errores de fragmentos de repeticiones
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
El seguimiento de errores de fragmentos de repeticiones está en vista previa.
{{< /beta-callout >}}

## Información general

Como ingeniero de frontend, una parte esencial y a menudo lenta de un proceso de depuración es la reproducción de errores. Pero puede ser difícil hacerlo sin una comprensión clara de las acciones que un usuario realizó antes de que tu aplicación generara un error.

El seguimiento de errores de fragmentos de repeticiones te permite ver una recreación en píxeles perfectos del recorrido de un usuario, 15 segundos antes y después de que se produzca un error, para que puedas reproducir errores, ahorrar tiempo y eliminar cualquier conjetura.

## Configuración

1. Si no configuraste el seguimiento de errores frontend en Datadog, sigue las [instrucciones de configuración de la aplicación][1] o consulta la documentación de configuración para [navegadores][2] y [móviles][3].
2. Durante la inicialización del SDK, configura la frecuencia de muestreo de reproducción de tu aplicación.

   {{< tabs >}}
   {{% tab "Navegador" %}}

   Configura la `sessionReplaySampleRate` entre 1 y 100.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      applicationId: '<APP_ID>',
      clientToken: '<CLIENT_TOKEN>',
      service: '<SERVICE>',
      env: '<ENV_NAME>',
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
   });
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}
   Sigue [estos pasos][4] para configurar la repetición de errores de tu aplicación móvil para esta plataforma.

   [4]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   Sigue [estos pasos][5] para configurar la repetición de errores de tu aplicación móvil para esta plataforma.

   [5]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   Sigue [estos pasos][6] para configurar la repetición de errores de tu aplicación móvil para esta plataforma.

   [6]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=kotlinmultiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   Sigue [estos pasos][7] para configurar la repetición de errores de tu aplicación móvil para esta plataforma.

   [7]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=reactnative
   {{% /tab %}}
   {{</tabs>}}

## Repetición de errores
Después de revisar la información clave sobre el error, como el mensaje de error y la traza (trace) de stack tecnológico, puedes pasar directamente del resumen del problema a una reproducción en directo de la sesión más reciente en la que se produjo el error. Desplázate hacia abajo, debajo de la traza de stack tecnológico, y haz clic en la vista previa de la reproducción para ver las acciones de un usuario antes de que se produjera el error. 

{{< img src="error_tracking/error-replay.png" alt="Seguimiento de errores de fragmentos de repeticiones" style="width:90%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /es/error_tracking/frontend/browser#setup
[3]: /es/error_tracking/frontend/mobile