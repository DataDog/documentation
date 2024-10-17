---
aliases: null
description: Instala y configura Session Replay para móviles.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentación
  text: Session Replay para móviles
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentación
  text: Cómo afecta Session Replay en móviles al rendimiento de las aplicaciones
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentación
  text: Opciones de privacidad de Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Session Replay en móviles
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
- link: /real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking
  tag: Documentación
  text: Rastreo de vistas web
title: Instalación y configuración de Session Replay para móviles
---

## Configuración

{{< tabs >}}
{{% tab "Android" %}}

Puedes encontrar todas las versiones de SDK de Session Replay en el [repositorio de snapshots de Maven][1].

Para configurar Session Replay para móviles en Android:

1. Asegúrate de haber [configurado e inicializado el SDK Android de Datadog RUM][2] con la instrumentación de vistas habilitada.

2. Declara Datadog Session Replay como dependencia:
  {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // en caso de que necesites asistencia material
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
   {{< /code-block >}}

3. Habilita Session Replay en tu aplicación:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // en caso de que necesites soporte de ampliación de material
    .addExtensionSupport(MaterialExtensionSupport()) 
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://oss.sonatype.org/content/repositories/snapshots/com/datadoghq/dd-sdk-android/
[2]: https://docs.datadoghq.com/es/real_user_monitoring/android/?tab=kotlin
[3]: https://docs.datadoghq.com/es/real_user_monitoring/android/?tab=kotlin#declare-the-sdk-as-a-dependency

{{% /tab %}}
{{% tab "iOS" %}}

Para configurar Session Replay para móviles en iOS:

1. Asegúrate de haber [configurado e inicializado el SDK iOS de Datadog RUM][1] con la instrumentación de vistas habilitada.

2. Vincula la biblioteca Session Replay de Datadog con tu proyecto, en función de tu gestor de paquetes:

   | Gestor de paquetes            | Etapa de instalación                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2] | Añade `pod 'DatadogSessionReplay'` a tu `Podfile`.                                         |
   | [Swift paquete Manager][3] | Añade la biblioteca `DatadogSessionReplay` como dependencia a tu aplicación de destino.                      |
   | [Carthage][4]               | Añade `DatadogSessionReplay.xcframework` como dependencia a tu aplicación de destino.                  |

3. Habilita Session Replay en tu aplicación:

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   import DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate
       )
   )
   {{< /code-block >}}

[1]: https://docs.datadoghq.com/es/real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

## Instrumentación de vistas web

Puedes grabar todo el recorrido del usuario tanto en [vistas web como nativas][1] en iOS o Android y verlo en una única reproducción de sesión.

La reproducción de la sesión se graba en el SDK del navegador y luego el SDK móvil se encarga de la agrupación y carga de la grabación de la vista web.

{{< tabs >}}
{{% tab "Android" %}}

Para instrumentar tu web consolidada y las vistas nativas Session Replay para Android:

1. Asegúrate de que estás utilizando la versión [`2.8.0`][2] o posterior del SDK de Android.
2. Habilita el [rastreo de vistas web][3] para tu aplicación móvil.
3. Habilita [Session Replay][4] para tu aplicación web.
4. Habilita la reproducción de la sesiones para tu aplicación móvil (consulta las instrucciones de configuración anteriores).

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=android#instrument-your-web-views
[4]: /es/real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "iOS" %}}

Para instrumentar tu web consolidada y las vistas nativas Session Replay para iOS:

1. Asegúrate de que estás utilizando la versión [`2.13.0`][2] o posterior del SDK de iOS.
2. Habilita el [rastreo de vistas web][2] para tu aplicación móvil.
3. Habilita [Session Replay][3] para tu aplicación web.
4. Habilita la reproducción de la sesiones para tu aplicación móvil (consulta las instrucciones de configuración anteriores).

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=ios#instrument-your-web-views
[3]: /es/real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{< /tabs >}}

## Configuración adicional
### Configuración de la frecuencia de muestreo para las sesiones grabadas

La frecuencia de muestreo es un parámetro obligatorio en la configuración de Session Replay. Debe ser un número entre 0.0 y 100.0, donde 0 significa que no se graban repeticiones y 100 significa que todas las sesiones RUM contienen repeticiones.

Esta frecuencia de muestreo se aplica además de la frecuencia de muestreo de RUM. Por ejemplo, si RUM utiliza una frecuencia de muestreo del 80% y Session Replay utiliza una frecuencia de muestreo del 20%, significa que, de todas las sesiones de usuario, el 80% están incluidas en RUM, y que, dentro de esas sesiones, sólo el 20% tienen repeticiones.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
 ...
.build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
var sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Confirmar si se están enviando datos de Session Replay

Para confirmar si los datos de Session Replay se están enviando desde la aplicación, puedes habilitar la opción de depuración en el SDK de Datadog:

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(Log.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
Datadog.verbosityLevel = .debug
{{< /code-block >}}

Si todo va bien, deberían aparecer los siguientes logs en la consola de depuración Xcode, unos 30 segundos después de iniciar la aplicación:

{{< code-block lang="bash" filename="Xcode console" disable_copy="true" >}}

[SDK DATADOG] 🐶 → 10:21:29.812 ⏳ (session-replay) Carga de lote en curso...
[SDK DATADOG] 🐶 → 10:21:30.442    → (session-replay) aceptado, no se volverá a transmitir: [código de la respuesta: 202 (aceptado), ID de la solicitud: BD445EA-...-8AFCD3F3D16]

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Opciones de privacidad

Consulta [Opciones de privacidad][2].



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking
[2]: /es/real_user_monitoring/session_replay/mobile/privacy_options