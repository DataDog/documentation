---
aliases:
- /es/error_tracking/standalone_frontend/logs
description: Aprende a realizar un resumen de los errores de navegador y móvil desde
  tus logs.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entender los problemas de las aplicaciones con el seguimiento de errores de
    Datadog
- link: /logs/error_tracking/explorer/
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
is_beta: false
title: Seguimiento de logs de errores de navegadores y móviles
---

## Información general

Error Tracking procesa errores los recopilados de los SDK de logs de navegadores y móviles de Datadog. Cada vez que se recopila un error que contiene una traza (trace) de stack tecnológico, Error Tracking lo procesa y lo agrupa como un _problema_, que es una agrupación de errores similares.

Un atributo esencial para los errores de log es la traza de stack tecnológico en una `error.stack` de un log. Si envías trazas de stack tecnológico a Datadog, pero no están en `error.stack`, puedes configurar un [reasignador genérico de log][6] para reasignar la traza de stack tecnológico al atributo correcto en Datadog.

Tus informes de fallos aparecen en [**Rastreo de errores**][2].

## Configuración

{{< tabs >}}
{{% tab "Navegador" %}}

Si aún no configuraste el SDK de logs del navegador de Datadog, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de logs de navegadores][2].

1. Descarga la última versión del SDK del navegador de logs. El rastreo de errores requiere al menos `v4.36.0`.
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][3]. Por ejemplo, con NPM:

   ```javascript
   import { datadogLogs } from '@datadog/browser-logs'

   datadogLogs.init({
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<MY_SERVICE>',
     env: '<MY_ENV>',
     forwardErrorsToLogs: true,
     sessionSampleRate: 100,
   })
   ```

3. Para registrar una excepción capturada por ti mismo, puedes utilizar [el parámetro de error opcional][4]:

   ```javascript
   try {
     throw new Error('wrong behavior');
   } catch(err) {
     datadogLogs.logger.error("an error occurred", {usr: {id: 123}}, err);
   }
   ```

**Nota**: El seguimiento de errores sólo tiene en cuenta los errores que son instancias de `Error`.

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /es/logs/log_collection/javascript/#setup
[3]: /es/logs/log_collection/javascript/#choose-the-right-installation-method
[4]: /es/logs/log_collection/javascript/#error-tracking

{{% /tab %}}
{{% tab "Android" %}}

Si aún no configuraste el SDK de logs Android de Datadog, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de logs Android][2].

1. Descarga la última versión del [SDK de Android de Datadog para logs][3].
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][4].
3. Para registrar una excepción capturada manualmente, también puedes utilizar:

   ```kotlin
   try {
     doSomething()
   } catch (e: IOException) {
     logger.e("an exception occurred", e)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /es/logs/log_collection/android/#setup
[3]: https://github.com/Datadog/dd-sdk-android
[4]: /es/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

Si aún no configuraste el SDK de logs iOS de Datadog, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de logs iOS][2].

1. Descarga la última versión del [SDK de iOS de Datadog para logs][3].
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][4].
3. Para registrar una excepción capturada manualmente, también puedes utilizar:

   ```swift
   do {
     // ...
   } catch {
     logger.error("an exception occurred", error)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /es/logs/log_collection/ios/#setup
[3]: https://github.com/Datadog/dd-sdk-ios
[4]: /es/logs/log_collection/ios/?tab=cocoapods#setup

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

Si aún no configuraste el SDK de logs Kotlin Multiplatform de Datadog, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de logs Kotlin Multiplatform][2].

1. Descarga la última versión del [SDK Kotlin Multiplatform Datadog para logs][3].
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][2].
3. Para registrar una excepción capturada manualmente, también puedes utilizar:

   ```kotlin
   try {
     doSomething()
   } catch (e: IOException) {
     logger.error("an exception occurred", e)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /es/logs/log_collection/kotlin_multiplatform/#setup
[3]: https://github.com/Datadog/dd-sdk-kotlin-multiplatform

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/logs/error-tracking
[3]: https://app.datadoghq.com/logs/onboarding/client
[4]: /es/logs/log_collection/javascript/#setup
[5]: /es/logs/log_collection/javascript/#choose-the-right-installation-method
[6]: /es/logs/log_configuration/processors/?tab=ui#remapper