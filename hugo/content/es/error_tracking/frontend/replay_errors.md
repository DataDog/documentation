---
description: Obtenga información sobre cómo recopilar fragmentos de reproducción para
  asegurarse de ver los problemas que le interesan.
further_reading:
- link: /error_tracking/suspect_commits
  tag: Documentación
  text: Obtenga información sobre cómo Error Tracking puede identificar commits sospechosos
- link: /error_tracking
  tag: Documentación
  text: Obtenga información sobre Error Tracking
is_beta: true
private: false
title: Fragmentos de reproducción de Error Tracking
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Los fragmentos de reproducción de Error Tracking están en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

Como ingeniero frontend, una parte esencial y que a menudo consume mucho tiempo del proceso de depuración es reproducir errores. Pero puede ser difícil hacerlo sin una comprensión clara de las acciones que realizó un usuario antes de que su aplicación arroje un error.

Los fragmentos de reproducción de Error Tracking le permiten visualizar una recreación perfecta de la trayectoria de un usuario 15 segundos antes y después de que ocurriera un error, para que pueda reproducir errores, ahorrar tiempo y eliminar cualquier suposición.

## Configuración {#setup}

1. Si no ha configurado Datadog Frontend Error Tracking, siga las [instrucciones de configuración en la aplicación][1] o consulte la documentación de configuración para [navegador][2] y [móvil][3].
2. Durante la inicialización del SDK, configure la tasa de muestreo de reproducción de su aplicación. 

   {{< tabs >}}
   {{% tab "Navegador" %}}

   Establezca el `sessionReplaySampleRate` entre 1 y 100. 

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
   Siga [estos pasos][4] para configurar la reproducción de errores de su aplicación móvil para esta plataforma.

   [4]: /session_replay/setup_and_configuration/?platform=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   Siga [estos pasos][5] para configurar la reproducción de errores de su aplicación móvil para esta plataforma.

   [5]: /session_replay/setup_and_configuration/?platform=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   Siga [estos pasos][6] para configurar la reproducción de errores de su aplicación móvil para esta plataforma.

   [6]: /session_replay/setup_and_configuration/?platform=kotlin_multiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   Siga [estos pasos][7] para configurar la reproducción de errores de su aplicación móvil para esta plataforma.

   [7]: /session_replay/setup_and_configuration/?platform=react_native
   {{% /tab %}}
   {{</tabs>}}

## Reproducir errores {#replay-errors}
Después de revisar la información clave sobre el error, como el mensaje de error y la traza de pila, puede pasar directamente desde el resumen del problema a una reproducción en vivo de la sesión más reciente que experimentó el error. Desplácese hacia abajo debajo de la traza de pila y haga clic en la vista previa de la reproducción para ver las acciones del usuario antes de que ocurriera el error. 

{{< img src="error_tracking/error-replay-2.png" alt="Fragmento de reproducción de Error Tracking" style="width:90%" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /es/error_tracking/frontend/browser#setup
[3]: /es/error_tracking/frontend/mobile