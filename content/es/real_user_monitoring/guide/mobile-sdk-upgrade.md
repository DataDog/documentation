---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualiza tus datos RUM en el Explorer
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: Documentación
  text: Política de obsolescencia para los SDKs móviles de Datadog
title: Actualizar los SDKs móviles de RUM
---

## Información general

Sigue esta guía para migrar entre las principales versiones de los SDKs móviles de RUM, SDKs de logs y SDKs de trazas (traces). Consulta la documentación de cada SDK para obtener información detallada sobre sus características y capacidades.

## De v1 a v2
{{< tabs >}}
{{% tab "Android" %}}

La migración de v1 a v2 representa una migración de un SDK monolito a una arquitectura modular. RUM, trazas, Logs, Session Replay, etc., cada uno tiene módulos individuales, lo que te permite integrar solo lo que se necesita en tu aplicación.

SDK v2 ofrece un diseño de API unificado y una alineación de nombres entre el SDK de iOS, el SDK de Android y otros productos de Datadog.

SDK v2 permite el uso de [Mobile Session Replay][1] en aplicaciones Android e iOS.

[1]: /es/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "iOS" %}}

La migración de v1 a v2 representa una migración de un SDK monolito a una arquitectura modular. RUM, trazas, logs, Session Replay, etc., cada uno tiene módulos individuales, lo que te permite integrar solo lo que se necesita en tu aplicación.

SDK v2 ofrece un diseño de API unificado y una alineación de nombres entre el SDK de iOS, el SDK de Android y otros productos de Datadog.

SDK v2 permite el uso de [Mobile Session Replay][1] en aplicaciones Android e iOS.

[1]: /es/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "React Native" %}}

La migración de v1 a v2 viene con un rendimiento mejorado.

{{% /tab %}}
{{% tab "Flutter" %}}

La migración de v1 a v2 viene con un rendimiento mejorado y funciones adicionales suministradas por los SDK nativos de v2.

{{% /tab %}}
{{< /tabs >}}
### Módulos
{{< tabs >}}
{{% tab "Android" %}}

Los artefactos se modularizan en la v2. Adopta los siguientes artefactos:

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Traza: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* Instrumentación de OkHttp: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**Nota**: Si utilizas NDK Crash Reporting y WebView Tracking, debes añadir artefactos RUM y logs para informar de eventos a RUM y logs respectivamente.

La referencia al artefacto `com.datadoghq:dd-sdk-android` debería ser eliminada de tu script de compilación Gradle, ya que este artefacto ya no existe.

**Nota**: Las coordenadas Maven de todos los demás artefactos siguen siendo las mismas.

<div class="alert alert-danger">v2 no es compatible con Android API 19 (KitKat). El SDK mínimo compatible es ahora API 21 (Lollipop). Se requiere Kotlin 1.7. El propio SDK se compila con Kotlin 1.8, por lo que un compilador de Kotlin 1.6 e inferior no puede leer los metadatos de las clases del SDK.</div>

Si te encuentras con un error como el siguiente:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

Añade las siguientes reglas a tu script de compilación (más detalles en el [Problema de sobrecarca del stack][2]):

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

Consulta la [aplicación de muestra de Android][3] para ver un ejemplo de cómo configurar el SDK.

[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

Las bibliotecas se modularizan en la v2. Adopta las siguientes bibliotecas:

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

Estas se suman a las ya existentes `DatadogCrashReporting` y `DatadogObjc`.

<details>
  <summary>SPM (recomendado)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

  El `Cartfile` se mantiene igual:
  ```
  github "DataDog/dd-sdk-ios"
  ```

  In Xcode, you **must** link the following frameworks:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  Then you can select the modules you want to use:
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**Nota**: Cuando utilices Crash Reporting y WebView Tracking, debes añadir los módulos RUM y logs para informar de eventos a RUM y logs respectivamente.

{{% /tab %}}

{{% tab "React Native" %}}

Actualiza `@datadog/mobile-react-native` en tu package.json:

```json
"@datadog/mobile-react-native": "2.0.0"
```

Actualiza tus pods de iOS:

```bash
(cd ios && bundle exec pod update)
```

Si utilizas una versión de React Native estrictamente superior a `0.67`, utiliza Java versión 17. Si utilizas una versión de React Native igual o inferior a `0.67`, utiliza Java versión 11. Para comprobar tu versión de Java, ejecuta lo siguiente en un terminal:

```bash
java --version
```

### Para React Native < 0.73

En tu archivo `android/build.gradle`, especifica `kotlinVersion` para evitar conflictos entre las dependencias de Kotlin:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### Para React Native < 0.68

En tu archivo `android/build.gradle`, especifica `kotlinVersion` para evitar conflictos entre las dependencias de Kotlin:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Si utilizas una versión de `com.android.tools.build:gradle` inferior a `5.0` en tu `android/build.gradle`, añádela en tu archivo `android/gradle.properties`:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### Solucionar problemas

#### La compilación de Android falla con `Unable to make field private final java.lang.String java.io.File.path accessible`

Si tu compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

Estás usando Java 17, que no es compatible con tu versión de React Native. Cambia a Java 11 para resolver el problema.

#### La compilación de Android falla con `Unsupported class file major version 61`

Si tu compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Utilizas una versión de Android Gradle Plugin inferior a `5.0`. Para solucionar el problema, añade en tu archivo `android/gradle.properties`:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### La compilación de Android falla con `Duplicate class kotlin.collections.jdk8.*`

Si tu compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Necesitas establecer una versión de Kotlin para tu proyecto para evitar conflictos entre las dependencias de Kotlin. En tu archivo `android/build.gradle`, especifica la versión `kotlinVersion`:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternativamente, puedes añadir las siguientes reglas a tu script de compilación en tu archivo `android/app/build.gradle`:

```groovy
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

{{% /tab %}}
{{% tab "Flutter" %}}

Actualiza `datadog_flutter_plugin` en tu pubspec.yaml:

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## Solucionar problemas

### Duplicar interfaz (iOS)

Si aparece este error al compilar iOS después de actualizar a `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Prueba realizar `flutter clean && flutter pub get` y volver a compilar. Esto suele resolver el problema.

### Clases duplicadas (Android)

Si aparece este error al compilar Android tras la actualización a `datadog_flutter_plugin` v2.0:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Asegúrate de que has actualizado tu versión de Kotlin al menos a la 1.8 en tu archivo `build.gradle`.

{{% /tab %}}

{{< /tabs >}}

### Inicialización del SDK
{{< tabs >}}
{{% tab "Android" %}}
Con la extracción de productos diferentes en módulos independientes, la configuración del SDK está organizada por módulo.

`com.datadog.android.core.configuration.Configuration.Builder` tiene los siguientes cambios:

* El token del cliente, el nombre del entorno, el nombre de la variante (el valor por defecto es una cadena vacía) y el nombre de servicio (el valor por defecto es el ID de la aplicación tomado del manifiesto) deben proporcionarse en el constructor.
* Se elimina la clase `com.datadog.android.core.configuration.Credentials`.
* `logsEnabled`, `tracesEnabled` y `rumEnabled` se eliminan del constructor en favor de la configuración del producto individual (consulta más adelante).
* Se elimina el argumento del constructor `crashReportsEnabled`. Puedes activar o desactivar el informe de fallos de JVM con el método `Configuration.Builder.setCrashReportsEnabled`. Por defecto, el informe de fallos de JVM está activado.
* Los métodos de configuración de productos de RUM, logs y trazas se eliminan de `Configuration.Builder` en favor de la configuración de productos individuales (consulta más abajo).

El método `Datadog.initialize` tiene la clase `Credentials` eliminada de la lista de los argumentos.

Se elimina el paquete `com.datadog.android.plugin` y todas las clases/métodos relacionados.

### Logs

Todas las clases relacionadas con el producto de logs están estrictamente contenidas en el paquete `com.datadog.android.log`.

Para utilizar el producto de logs, importa el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

Puedes activar el producto de logs con el siguiente fragmento:

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|Este método ha sido eliminado. Utiliza `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` en su lugar para desactivar el envío de logs a Datadog.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Traza

Todas las clases relacionadas con el producto de traza están estrictamente contenidas en el paquete `com.datadog.android.trace` (esto significa que todas las clases que antes residían en `com.datadog.android.tracing` se han desplazado).

Para utilizar el producto de traza, importa el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

Puedes activar el producto de traza con el siguiente fragmento:

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

Todas las clases relacionadas con el producto RUM están estrictamente contenidas en el paquete `com.datadog.android.rum`.

Para utilizar el producto RUM, importa el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

Puedes activar el producto RUM con el siguiente fragmento:

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|Esta clase ha sido eliminada. El monitor RUM se crea y registra durante la llamada a `Rum.enable`.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|Este método ha sido eliminado. El monitor RUM se crea y registra durante la llamada a `Rum.enable`.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting

El nombre del artefacto sigue siendo el mismo que antes: `com.datadoghq:dd-sdk-android-ndk:x.x.x`.

Puedes activar NDK Crash Reporting con el siguiente fragmento:

```kotlin
NdkCrashReports.enable()
```

Esta configuración sustituye a la llamada `com.datadog.android.core.configuration.Configuration.Builder.addPlugin`.

**Nota**: Debes tener habilitados los productos RUM y logs para recibir informes de fallos del NDK en RUM y logs respectivamente.

### WebView Tracking

El nombre del artefacto sigue siendo el mismo que antes: `com.datadoghq:dd-sdk-android-webview:x.x.x`

Puedes activar WebView Tracking con el siguiente fragmento de código:

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**Nota**: Debes tener habilitados los productos RUM y logs para recibir eventos procedentes de WebView en RUM y logs respectivamente.

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|Este método se convirtió en una clase `internal`. Utiliza `WebViewTracking` en su lugar.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|Esta clase ha sido eliminada. Utiliza `WebViewTracking` en su lugar.|
|`com.datadog.android.rum.webview.RumWebViewClient`|Esta clase ha sido eliminada. Utiliza `WebViewTracking` en su lugar.|

### OkHttp Tracking

Para utilizar OkHttp Tracking, importa el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

La instrumentación de OkHttp admite la inicialización del SDK de Datadog después del cliente OkHttp, permitiendo crear `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor` y `com.datadog.android.okhttp.trace.TracingInterceptor` antes que el SDK de Datadog. La instrumentación de OkHttp comienza a informar eventos a Datadog una vez que el SDK de Datadog es inicializado.

Tanto `com.datadog.android.okhttp.DatadogInterceptor` como `com.datadog.android.okhttp.trace.TracingInterceptor` permiten controlar el muestreo de forma dinámica a través de la integración con un sistema de configuración remoto.

Para ajustar dinámicamente el muestreo, proporciona tu propia implementación de la interfaz `com.datadog.android.core.sampling.Sampler` en el constructor `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor`. Se consulta para cada solicitud para tomar la decisión de muestreo.

### Extracción del módulo `dd-sdk-android-ktx`

Para mejorar el nivel de detalle de las bibliotecas del SDK de Datadog utilizadas, se elimina el módulo `dd-sdk-android-ktx`. El código se distribuye entre los demás módulos para proporcionar métodos de extensión tanto para las funciones RUM como para trazas.

| `1.x`                                                                                     | '2.0'                                                                                       | Nombre del módulo                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### Session Replay

Para obtener instrucciones sobre la configuración de Mobile Session Replay, consulta [Configuración de Mobile Session Replay][4].

[4]: /es/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

Con la extracción de diferentes productos en módulos independientes, la configuración del SDK se organiza por módulos.

> El SDK debe inicializarse antes de habilitar cualquier producto.

El patrón Builder (compilador) de la inicialización del SDK se ha eliminado en favor de las definiciones de estructura. El siguiente ejemplo muestra cómo una inicialización `1.x` se traduciría en `2.0`.

**Inicialización V1**
```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**Inicialización V2**
```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### Logs

Todas las clases relacionadas con logs se encuentran estrictamente en el módulo `DatadogLogs`. Primero tienes que habilitar el producto:

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

A continuación, puedes crear una instancia del registrador:

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### Traza

Todas las clases relacionadas con trazas se encuentran estrictamente en el módulo `DatadogTrace`. Primero tienes que habilitar el producto:

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

A continuación, puedes acceder a la instancia compartida del rastreador:

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM

Todas las clases relacionadas con RUM se encuentran estrictamente en el módulo `DatadogRUM`. Primero debes habilitar el producto:

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

A continuación, podrás acceder a la instancia de monitor RUM compartida:

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### Crash Reporting

Para habilitar Crash Reporting, asegúrate de habilitar RUM y logs para informar a esos productos respectivamente.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking

Para habilitar WebViewTracking, asegúrate de habilitar también RUM y logs para informar a esos productos respectivamente.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay

Para obtener instrucciones sobre la configuración de Mobile Session Replay, consulta [Configuración de Mobile Session Replay][5].

[5]: /es/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{% tab "React Native" %}}

No es necesario ningún cambio en la inicialización del SDK.

{{% /tab %}}

{{% tab "Flutter" %}}

## Cambios de configuración del SDK

Algunas propiedades de configuración se han movido o renombrado para respaldar la modularidad en los SDKs nativos de Datadog.

Se ha cambiado el nombre de las siguientes estructuras:

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguartion` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

Las siguientes propiedades han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| Eliminada | Parte de `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | Eliminada | Ahora se configura por característica | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

Además, han cambiado las siguientes API:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `Verbosity` | Eliminada | Consulta `CoreLoggerLevel` o `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | Tipo cambiado |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | Tipo cambiado
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | Se ha añadido el parámetro `trackingConsent`  |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | Se ha añadido el parámetro `trackingConsent`  |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | Movido |

## Cambios de Flutter Web

Los clientes que utilicen Flutter Web deben actualizarse para utilizar el SDK de navegador de Datadog v5. Cambia la siguiente importación en tu `index.html`:

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**Nota**: Datadog proporciona un paquete CDN por sitio. Consulta [README del SDK de navegador](https://github.com/DataDog/browser-sdk/#cdn-bundles) para obtener una lista de todas las URLs de los sitios.

## Cambios en los productos de logs

Al igual que en v1, el registro de Datadog puede activarse configurando el miembro `DatadogConfiguration.loggingConfiguration`. Sin embargo, a diferencia de v1, Datadog no crea un registrador por defecto para ti. `DatadogSdk.logs` es ahora una instancia de `DatadogLogging`, que puede usarse para crear logs. Muchas opciones se han movido a `DatadogLoggerConfiguration` para dar a los desarrolladores una compatibilidad más detallada sobre registradores individuales.

Las siguientes API han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | La mayoría de los miembros renombrados están ahora en `DatadogLoggerConfiguration` |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | Eliminado. Utiliza `remoteLogThreshold` en su lugar | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## Cambios en los productos de RUM

Las siguientes API han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | Tipo renombrado |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | Establecer en `null` para desactivar las actualizaciones vitales |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | Tipo renombrado |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

Además, los asignadores de evento ya no permiten modificar los nombres de sus vistas. Para cambiar el nombre de una vista, utiliza en su lugar un [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) personalizado.


{{% /tab %}}

{{< /tabs >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}