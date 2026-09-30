---
aliases:
- /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin-multiplatform
- /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin_multiplatform
description: Aprende a solucionar problemas con la monitorización multiplataforma
  de Kotlin.
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: Código fuente
  text: Código fuente dd-sdk-kotlin-multiplatform
- link: /real_user_monitoring
  tag: Documentación
  text: Explora Real User Monitoring (RUM)
title: Solucionar problemas con el SDK multiplataforma de Kotlin
---

## Información general

Si experimentas un comportamiento inesperado con el SDK multiplataforma de Datadog Kotlin, utiliza esta guía para resolver los problemas. Si sigues teniendo problemas, ponte en contacto con el [soporte de Datadog][1] para obtener más ayuda.

## Comprueba si Datadog RUM está inicializado
Utiliza el método de utilidad `isInitialized` para comprobar si el SDK está correctamente inicializado:

```kotlin
if (Datadog.isInitialized()) {
    // your code here
}
```

## Depuración
Al escribir tu aplicación, puedes habilitar los logs de desarrollo llamando al método `setVerbosity`. Todos los mensajes internos en la librería con una prioridad igual o superior al nivel proporcionado se registran en Logcat de Android o en la consola del depurador en Xcode:

```kotlin
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
```

## Configurar el consentimiento de rastreo (cumplimiento de GDPR)

Para cumplir con GDPR, el SDK requiere el valor de consentimiento de seguimiento en la inicialización.
El consentimiento de seguimiento puede ser uno de los siguientes valores:

- `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar los datos y a procesarlos por lotes, pero no los envía al
 endpoint de recopilación. El SDK espera el nuevo valor del consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No puedes enviar manualmente ningún log, traza ni
 evento de RUM.

Para actualizar el consentimiento de rastreo después de inicializar el SDK, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK cambia de comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de rastreo actual es `TrackingConsent.PENDING` y lo actualizas a:

- `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.

## Problemas comunes

### Enlace binario de iOS

#### Faltan los símbolos `PLCrashReporter`

Si durante el paso de vinculación se produce un error debido a que faltan símbolos `PLCrashReporter` en las rutas de búsqueda del enlazador, como el siguiente:

```
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_PLCrashReport", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReportBinaryImageInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportStackFrameInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportThreadInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReporter", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReporterConfig", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
```

A continuación, deberá pasar explícitamente el nombre del framework `CrashReporter` al enlazador:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-framework CrashReporter"
               )
           )
       }
   }
}

```

#### Faltan los símbolos `swiftCompatibility`

Si durante el paso de vinculación se produce un error debido a que faltan símbolos `swiftCompatibility` en las rutas de búsqueda del enlazador, como el siguiente:

```
Undefined symbols for architecture arm64:
  "__swift_FORCE_LOAD_$_swiftCompatibility56", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibility56_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
  "__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
```

Entonces, podrás suprimir este error:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibility56",
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibilityConcurrency"
               )
           )
       }
   }
}

```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
