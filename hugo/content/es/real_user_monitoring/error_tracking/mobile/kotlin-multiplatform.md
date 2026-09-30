---
aliases:
- /es/real_user_monitoring/error_tracking/kotlin-multiplatform
- /es/real_user_monitoring/error_tracking/kotlin_multiplatform
- /es/error_tracking/frontend/mobile/kotlin_multiplatform/
code_lang: kotlin-multiplatform
code_lang_weight: 50
description: Configura Error Tracking para tus aplicaciones de Kotlin Multiplataform.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Para empezar con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualizar los datos de Error Tracking en el Explorer
title: Informes de bloqueo y Error Tracing de Kotlin Multiplatform
type: multi-code-lang
---

## Información general

Errores de procesos de Error Tracking recopilados del kit de desarrollo de software (SDK) de Kotlin Multiplatform. 

Activa el informe de bloqueos y Error Tracking de Kotlin Multiplatform para obtener informes completos de bloqueos y tendencias de errores. Con esta función, puedes acceder a:

- Dashboards y atributos de bloqueos agregados de Kotlin Multiplatform
- Informes de bloqueos desofuscados de Kotlin Multiplataform (iOS y Android)
- Análisis de tendencias con Error Tracking de Kotlin Multiplatform

Tus informes de bloqueos aparecen en [**Error Tracking**][1].

## Configuración

Si aún no has configurado el kit de desarrollo de software (SDK) de Kotlin Multiplataform, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de Kotlin Multiplataform][3].

Para cualquier error, puedes acceder a la ruta del archivo, al número de línea y a un fragmento de código para cada marco de la trace (traza) de stack tecnológico.

### Android

Todas las excepciones y ANR no capturadas que den lugar a un bloqueo son informadas por el kit de desarrollo de software (SDK) de Kotlin Multiplatform (consulta las [limitaciones](#limitations)). Además de estos bloqueos, puedes configurar para que el SDK notifique los bloqueos del NDK y controle la notificación de ANR no fatales.

#### Añadir la notificación de bloqueos de NDK

Es posible que tu aplicación de Android ejecute el código nativo (C/C++) por motivos de rendimiento o reutilización del código. Para activar los informes de bloqueos del NDK, utiliza la biblioteca de NDK de Datadog. 

1. Añade la dependencia de Gradle a tu conjunto de sources (fuentes) de Android declarando la biblioteca como dependencia en tu archivo `build.gradle.kts`:

```kotlin
kotlin {
  sourceSets {
    androidMain.dependencies {
      implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
    }
  }
}
```

2. Luego de inicializar el kit de desarrollo de software (SDK), activa la recopilación de bloqueos de NDK.

``` kotlin
// in Android source set
NdkCrashReports.enable()
```

#### Añadir informes de ANR

Una "Aplicación que no responde" ([ANR][4]) es un tipo de error específico de Android que se activa cuando la aplicación no responde durante demasiado tiempo.

Para cualquier versión de Android, puedes sustituir la configuración predeterminada para informar de ANR no fatales configurando `trackNonFatalAnrs` (disponible solo desde el conjunto de sources (fuentes) de Android) en `true` o `false` al inicializar el kit de desarrollo de software (SDK).

Las ANR solo se notifican a través de RUM (no a través de logs). Para obtener más información, consulta [Informes de bloqueos y Error Tracking de Android - Añadir Informes de ANR][5].

### iOS

**Nota**: Se requiere Kotlin 2.0.20 o superior si el rastreo de bloqueos está activado en iOS. De lo contrario, debido a la compatibilidad con `PLCrashReporter`, la aplicación puede colgarse si el rastreo de bloqueos está activado. Consulta otras dependencias en las instrucciones de [configuración][10].

El kit de desarrollo de software (SDK) de Kotlin Multiplatform informa de todas las excepciones no capturadas que provocan un bloqueo.

#### Añadir la notificación de cuelgues de aplicaciones

Los cuelgues de aplicaciones son un tipo de error específico de iOS que se producen cuando la aplicación no responde durante demasiado tiempo.

En forma predeterminada, la notificación de cuelgues de aplicaciones está **desactivada**, pero puedes activarla y configurar tu propio umbral para monitorizar cuelgues de aplicaciones que duren más de una duración especificada utilizando el método de inicialización `setAppHangThreshold` (disponible solo desde el conjunto de sources (fuentes) de iOS).

Los cuelgues de aplicaciones solo se informan a través de RUM (no a través de logs). Para obtener más información, consulta [Informes de bloqueos y Error Tracking de iOS  - Añadir Informes de ANR][6].

## Obtener traces (trazas) de stack tecnológico desofuscadas

Los archivos de asignación se utilizan para desofuscar traces (trazas) de stack tecnológico, lo que ayuda a depurar errores. Mediante el ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la compilación de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

Utiliza las siguientes guías para consultar cómo puedes cargar archivos de asignación (Android) o dSYM (iOS) en Datadog: [Android][7], [iOS][8].

## Limitaciones

### Tamaño de los archivos

El tamaño de los archivos de asignación está limitado a **500 MB** cada uno, mientras que los archivos dSYM pueden llegar a **2 GB** cada uno.

### Recopilación

El kit de desarrollo de software (SDK) gestiona los informes de bloqueos con los siguientes comportamientos:

- El bloqueo solo puede detectarse una vez inicializado el kit de desarrollo de software (SDK). Por este motivo, Datadog recomienda inicializar el SDK lo antes posible en la aplicación.
- Los bloqueos de RUM deben estar asociados a una vista de RUM. Si se produce un bloqueo antes de que una vista sea visible o después de que la aplicación se envía al fondo por el usuario final que sale de ella, el bloqueo se silencia y no se informa para su recopilación. Para mitigar esto, utiliza el [método][9] `trackBackgroundEvents()` en tu creador de `RumConfiguration`.
- Solo se conservan los bloqueos que se producen en las sesiones muestreadas.

## Para test tu implementación

Para verificar tu configuración de informes de bloqueos y Error Tracking de Kotlin Multiplatform, necesitas activar un bloqueo en tu aplicación y confirmar que el error aparece en Datadog.

Para test tu implementación

1. Ejecuta tu aplicación en un emulador de Kotlin Multiplataform o en un dispositivo real.
2. Ejecuta un código que contenga un error o bloqueo. Por ejemplo:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Después de que se produzca el bloqueo, reinicia tu aplicación y espera a que el kit de desarrollo de software (SDK) de Kotlin Multiplatform cargue el informe del bloqueo en [**Error Tracking**][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: /es/real_user_monitoring/error_tracking/mobile/android/#add-anr-reporting
[6]: /es/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[7]: /es/real_user_monitoring/error_tracking/mobile/android/#get-deobfuscated-stack-traces
[8]: /es/real_user_monitoring/error_tracking/mobile/ios/#get-deobfuscated-stack-traces
[9]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#track-background-events
[10]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#add-native-dependencies-for-ios