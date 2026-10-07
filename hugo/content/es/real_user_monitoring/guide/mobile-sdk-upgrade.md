---
description: Guía de migración para actualizar entre versiones principales de los
  SDK móviles de RUM, Logs y Trace con cambios incompatibles y nuevas funciones.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualice sus datos de RUM en el explorador
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: Documentación
  text: Política de desaprobación para los SDK móviles de Datadog
title: Actualizar los SDK móviles de RUM
---
## Descripción general {#overview}

Siga esta guía para migrar entre versiones principales de los SDK móviles de RUM, Logs y Trace. Consulte la documentación de cada SDK para obtener detalles sobre sus funciones y capacidades.


**Migraciones más comunes**:
- [**v2 a v3**](#from-v2-to-v3): enfoque en la eliminación de Open Tracing y actualizaciones de API
- [**v1 a v2**](#from-v1-to-v2): cambios arquitectónicos importantes hacia un diseño modular

## De la v2 a la v3 {#from-v2-to-v3}
{{< tabs >}}
{{% tab "Android" %}}

La transición de la versión 2 a la versión 3 se centra en eliminar el soporte para el proyecto heredado Open Tracing, mejorando la estabilidad y la consistencia del SDK.

{{% /tab %}}

{{% tab "iOS" %}}

La migración de la v2 a la v3 se centra en optimizar los módulos, refinar los valores predeterminados y mejorar la confiabilidad en todas las funciones del producto.

Todos los productos del SDK (RUM, Trace, Logs, Session Replay, y así sucesivamente) siguen siendo modulares y están separados en bibliotecas distintas. El cambio principal es que el módulo `DatadogObjc` ha sido eliminado, integrando su contenido en los módulos de producto correspondientes.

{{% /tab %}}

{{% tab "React Native" %}}

La migración de la v2 a la v3 se centra en alinear la configuración con el comportamiento del SDK modular de la v3 y consolidar la propiedad de la configuración en `CoreConfiguration`, `RumConfiguration`, `LogsConfiguration` y `TraceConfiguration`.

Lea [la guía MIGRATION.md][1] en el repositorio oficial de React Native para obtener la lista completa de cambios.

<div class="alert alert-warning">
<strong>Importante:</strong> A diferencia de la v2.x (que siempre habilitaba todos los módulos de funciones al inicializar el SDK), la v3 <strong>no</strong> inicializa ni habilita un módulo de funciones a menos que pase explícitamente la configuración para él.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}
{{< /tabs >}}

### Módulos {#modules}
{{< tabs >}}
{{% tab "Android" %}}

<div class="alert alert-danger">
Datadog sigue la <a href="https://developer.android.com/jetpack/androidx/versions#version-table">política de versiones de la biblioteca AndroidX</a> de Google para el <code>AndroidX</code> bibliotecas, por lo que el nivel mínimo de API de Android compatible con el SDK v3 es <code>23</code>.
</div>

**Requisitos**:
- Se requiere Kotlin 1.9
- La dependencia `Open Tracing` se eliminó porque es obsoleta


{{% /tab %}}

{{% tab "iOS" %}}

Las bibliotecas continúan modularizándose en la v3. Adopte las siguientes bibliotecas:

- `DatadogCore`
- `DatadogCrashReporting`
- `DatadogLogs`
- `DatadogRUM`
- `DatadogSessionReplay`
- `DatadogTrace`
- `DatadogWebViewTracking`

<details>
  <summary>SPM (Recomendado)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "3.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
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
  pod 'DatadogCrashReporting'
  pod 'DatadogLogs'
  pod 'DatadogRUM'
  pod 'DatadogSessionReplay'
  pod 'DatadogTrace'
  pod 'DatadogWebViewTracking'
  ```
</details>

<details>
  <summary>Carthage</summary>

El `Cartfile` permanece igual:
  ```
  github "DataDog/dd-sdk-ios"
  ```

En Xcode, **debe** vincular los siguientes frameworks:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

Luego, puede seleccionar los módulos que desea utilizar:
  ```
  DatadogCrashReporting.xcframework
  DatadogLogs.xcframework
  DatadogRUM.xcframework
  DatadogSessionReplay.xcframework
  DatadogTrace.xcframework
  DatadogWebViewTracking.xcframework
  ```
</details>

{{% /tab %}}

{{% tab "React Native" %}}

Consulte [la guía MIGRATION.md][1] en el repositorio oficial de React Native para conocer los pasos de actualización recomendados y cualquier actualización de dependencia necesaria.

<div class="alert alert-warning">
<strong>Importante:</strong> En la v3, los módulos de funciones solo se habilitan si pasa su configuración durante la inicialización (por ejemplo, RUM / Logs / Trace). Si omite la configuración de un módulo de funciones, ese módulo no se inicializa ni se habilita.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

### Cambios requeridos y actualizaciones de API {#required-changes-and-api-updates}
{{< tabs >}}
{{% tab "Android" %}}

### Core {#core}

<div class="alert alert-info">
<strong>Acción requerida:</strong> En el SDK v3, el ID de información del usuario se vuelve obligatorio y el <code>null</code> valor ya no puede ser proporcionado.
</div>

Cambios en la API:

| `2.x`                                                         | `3.0`                                                              |
|---------------------------------------------------------------|--------------------------------------------------------------------|
| `Datadog.setUserInfo(null, "Jane Smith", "jane@example.com")` | `Datadog.setUserInfo("user123", "Jane Smith", "jane@example.com")` |

### RUM {#rum}

Realizamos mejoras menores en los módulos de RUM. No requieren cambios significativos en su código, pero vale la pena verificar si puede refactorizar algunos parámetros redundantes.

La URL proporcionada en el método `useCustomEndpoint` debe ser la URL completa del punto de conexión
(`https://example.com/rum/upload`), no solo el nombre de host:

```kotlin
Rum.enable(
  RumConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/rum/upload")
      .build()
)
```

Cambios en la API:

| `2.x`                                                                               | `3.0`                                                                                |
|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `DatadogRumMonitor.startResource(String, String, String,Map<String, Any?>)`         | Utilice el método `startResource` que toma `RumHttpMethod` como parámetro `method` en lugar de |
El objeto | `com.datadog.android.rum.GlobalRum`                                                 | `GlobalRum` fue renombrado a `com.datadog.android.rum.GlobalRumMonitor`         |
| `com.datadog.android.rum.RumMonitor.addAction()`                                    | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.RumMonitor.startAction()`                                  | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.RumMonitor.stopResource()`                                 | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.RumMonitor.addError()`                                     | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.RumMonitor.addErrorWithStacktrace()`                       | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | El parámetro `attributes: Map<String, Any?>` es opcional                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | El parámetro `attributes: Map<String, Any?>` es opcional                                |

### Registros {#logs}

El producto Logs ya no reporta errores fatales. Para habilitar Error Tracking para fallas, Crash Reporting debe estar habilitado junto con RUM.

La URL proporcionada en el método `useCustomEndpoint` debe ser la URL completa del punto de conexión
(`https://example.com/logs/upload`), no solo el nombre de host:

```kotlin
Logs.enable(
  LogsConfiguration.Builder()
      .useCustomEndpoint("https://example.com/logs/upload")
      .build()
)
```

### Trace {#trace}

La URL proporcionada en el método `useCustomEndpoint` debe ser la URL completa del punto de conexión
(p. ej.: `https://example.com/trace/upload`), no solo el nombre de host, es decir:

```kotlin
Trace.enable(
  TraceConfiguration.Builder()
      .useCustomEndpoint(`https://example.com/trace/upload`)
      .build()
)
```

El proyecto [`Open Tracing`](https://opentracing.io/) ha sido marcado como archivado y ya no es compatible. Las dependencias de `Open Tracing` se han eliminado del SDK v3.

El SDK de Datadog ya admite [`Open Telemetry`](https://opentelemetry.io/), que es la forma recomendada de usar la API de rastreo.

**Tenga en cuenta** que la biblioteca de especificaciones `Open Telemetry` [requiere](https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements) que el desugaring esté habilitado para proyectos con un `minSdk` < 26.

#### Migración del rastreo de `Open Tracing` a `Open Telemetry` (recomendado) {#migrating-tracing-from-open-tracing-to-open-telemetry-recommended}

1. Agregue la dependencia `Open Telemetry` a su `build.gradle.kts`:

```kotlin
implementation(project("com.datadoghq:dd-sdk-android-trace-otel:x.x.x"))
```

2. Reemplace la configuración `Open Tracing`:

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

con la configuración `Open Telemetry`:

```kotlin
GlobalOpenTelemetry.set(
  DatadogOpenTelemetry(BuildConfig.APPLICATION_ID)
)
```

Para acceder al objeto de rastreo para el rastreo manual (personalizado), utilice `io.opentelemetry.api.GlobalOpenTelemetry.get()` en lugar de `io.opentracing.util.GlobalTracer.get()`.
Por ejemplo:

```kotlin
val tracer: Tracer = GlobalOpenTelemetry
  .get()
  .getTracer("SampleApplicationTracer")

val span = tracer
  .spanBuilder("Executing operation")
  .startSpan()

// Code that should be instrumented

span.end()
```

Consulte la `Open Telemetry` [documentación](https://opentelemetry.io/docs/) oficial para obtener más detalles.

#### Migración del rastreo de `Open Tracing` a `DatadogTracing` (período de transición) {#migrating-tracing-from-open-tracing-to-datadogtracing-transition-period}

<div class="alert alert-danger">Esta opción se ha agregado por compatibilidad y para simplificar la transición de Open Tracing a Open Telemetry, pero es posible que no esté disponible en futuras versiones principales. Datadog recomienda usar Open Telemetry como estándar para las tareas de rastreo. Sin embargo, si no es posible habilitar el desugaring en su proyecto por alguna razón, puede usar este método.</div>
Reemplace la configuración `Open Tracing`:

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

con la configuración `DatadogTracing`:

```kotlin
GlobalDatadogTracer.registerIfAbsent(
  DatadogTracing.newTracerBuilder()
    .build()
)
```

Para el rastreo manual (personalizado), utilice `com.datadog.android.trace.GlobalDatadogTracer.get()` en lugar de `io.opentracing.util.GlobalTracer.get()` para acceder al objeto de rastreo.
Por ejemplo:

```kotlin
val tracer = GlobalDatadogTracer.get()

val span = tracer
  .buildSpan("Executing operation")
  .start()

// Code that should be instrumented

span.finish()
```
Consulte la [documentación](https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android?tab=kotlin) de Datadog para obtener más detalles.

Cambios en la API:

| `2.x`                                     | `3.0` `Open Telemetry`                     | `3.0` `Datadog API`                                     |
|-------------------------------------------|--------------------------------------------|---------------------------------------------------------|
| `io.opentracing.util.GlobalTracer`        | `io.opentelemetry.api.GlobalOpenTelemetry` | `com.datadog.android.trace.GlobalDatadogTracer`         |
| `com.datadog.android.trace.AndroidTracer` | `io.opentelemetry.api.trace.Tracer`        | `com.datadog.android.trace.api.tracer.DatadogTracer`    |
| `io.opentracing.Span`                     | `io.opentelemetry.api.trace.Span`          | `com.datadog.android.trace.api.span.DatadogSpan`        |
| `io.opentracing.Scope`                    | `io.opentelemetry.context.Scope`           | `com.datadog.android.trace.api.scope.DatadogScope`      |
| `io.opentracing.SpanContext`              | `io.opentelemetry.api.trace.SpanContext`   | `com.datadog.android.trace.api.span.DatadogSpanContext` |

Sugerencias de reemplazo:

| `2.x`                                         | `3.0` `Open Telemetry`                                | `3.0` `Datadog API`                               |
|-----------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| `AndroidTracer.Builder().build()`             |                                                       | `DatadogTracing.newTracerBuilder().build()`       |
| `AndroidTracer.setPartialFlushThreshold(Int)` | `OtelTracerProvider.setPartialFlushThreshold()`       | `DatadogTracerBuilder.withPartialFlushMinSpans()` |
| `io.opentracing.SpanContext.toTraceId()`      | `io.opentelemetry.api.trace.SpanContext.getTraceId()` | `DatadogSpanContext.traceId.toString()`           |
| `io.opentracing.Span.setError()`              | `io.opentelemetry.api.trace.recordException()`        | `DatadogSpan.addThrowable()`                      |

### Instrumentación OkHttp {#okhttp-instrumentation}

La instrumentación de OkHttp (`com.datadoghq:dd-sdk-android-okhttp:x.x.x`) no requiere soporte de desugaring. Sin embargo, es posible que sean necesarias algunas acciones de migración.

Cambios en la API:

| `2.x`                                                                                                                                  | `3.0`                                       |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `TracingInterceptor(String, List<String>, TracedRequestListener,Sampler<Span>)`                                                        | Utilice `TracingInterceptor.Builder()` en su lugar. |
| `TracingInterceptor(String?,Map<String, Set<TracingHeaderType>>, TracedRequestListener, Sampler<Span>)`                                | Utilice `TracingInterceptor.Builder()` en su lugar. |
| `TracingInterceptor(String?,TracedRequestListener,Sampler<Span>)`                                                                      | Utilice `TracingInterceptor.Builder()` en su lugar. |
| `DatadogInterceptor(String?, Map<String, Set<TracingHeaderType>>,TracedRequestListener, RumResourceAttributesProvider, Sampler<Span>)` | Utilice `DatadogInterceptor.Builder()` en su lugar. |
| `DatadogInterceptor(String?,List<String>,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>)`                           | Utilice `DatadogInterceptor.Builder()` en su lugar. |
| `DatadogInterceptor(String?,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>) `                                       | Utilice `DatadogInterceptor.Builder()` en su lugar. |


### Session Replay {#session-replay}

La URL proporcionada en el método `useCustomEndpoint` debe ser la URL completa del punto de conexión
(p. ej.: `https://example.com/session_replay/upload`), no solo el nombre de host, es decir:

```kotlin
SessionReplay.enable(
  SessionReplayConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/session_replay/upload")
      .build()
)
```

{{% /tab %}}
{{% tab "iOS" %}}

El SDK debe inicializarse lo antes posible en el ciclo de vida de la aplicación, específicamente en la devolución de llamada `AppDelegate` de `application(_:didFinishLaunchingWithOptions:)`. Esto garantiza una medición precisa de todas las métricas, incluida la duración del inicio de la aplicación. Para aplicaciones creadas con SwiftUI, utilice `@UIApplicationDelegateAdaptor` para acceder a `AppDelegate`.

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

**Nota**: Inicializar el SDK en otro lugar (por ejemplo, más tarde durante la carga de la vista) puede resultar en telemetría inexacta o faltante, especialmente en relación con el rendimiento del inicio de la aplicación.

<div class="alert alert-info">
<strong>Acción requerida:</strong> La API para establecer la información del usuario requiere el <code>id</code> parámetro, que era opcional en 2.x.
</div>

| `2.x`                               | `3.0`                              |
|-------------------------------------|------------------------------------|
| `Datadog.setUserInfo(id: nil, name: "Jane Smith", email: "jane@example.com")` | `Datadog.setUserInfo(id: "user123", name: "Jane Smith", email: "jane@example.com")` |

### RUM {#rum-1}

Los atributos a nivel de visualización de RUM se propagan automáticamente a todos los eventos secundarios relacionados, incluidos recursos, acciones de usuario, errores y tareas largas. Esto garantiza metadatos consistentes en todos los eventos, lo que facilita el filtrado y la correlación de datos en los paneles de Datadog.

Para gestionar de forma más efectiva los atributos a nivel de visualización, se agregaron nuevas API:
- `Monitor.addViewAttribute(forKey:value:)`
- `Monitor.addViewAttributes(_:)`
- `Monitor.removeViewAttribute(forKey:)`
- `Monitor.removeViewAttributes(forKeys:)`

Otros cambios notables:
- Todas las API de RUM de Objective-C se incluyen en `DatadogRUM`. El módulo separado `DatadogObjc` ya no está disponible.
- Los bloqueos de aplicaciones (App Hangs) y las terminaciones de Watchdog ya no se reportan desde extensiones de aplicaciones o widgets.
- Se agregó una nueva propiedad `trackMemoryWarnings` a `RUM.Configuration` para reportar advertencias de memoria como errores de RUM.

Cambios en la API:

|`2.x`|`3.0`|
|---|---|
|-|`RUM.Configuration.trackMemoryWarnings`|
|`RUMView(path:attributes:)`|`RUMView(name:attributes:isUntrackedModal:)`|
|-|`Monitor.addViewAttribute(forKey:value:)`|
|-|`Monitor.addViewAttributes(:)`|
|-|`Monitor.removeViewAttribute(forKey:)`|
|-|`Monitor.removeViewAttributes(forKeys:)`|

### Registros {#logs-1}

El producto Logs ya no reporta errores fatales. Para habilitar Error Tracking para fallas, Crash Reporting debe estar habilitado junto con RUM.

Además, todas las API de Logs de Objective-C se incluyen en `DatadogLogs`. El módulo separado `DatadogObjc` ya no está disponible.

### Traza {#trace-1}

El muestreo de trazas ahora es determinista cuando se utiliza junto con RUM. Utiliza el `session.id` de RUM para garantizar un muestreo consistente.

Además:
- La configuración `Trace.Configuration.URLSessionTracking.FirstPartyHostsTracing` establece el muestreo para todas las solicitudes de forma predeterminada y el contexto de la traza se inyecta solo en las solicitudes muestreadas.
- Todas las API de traza de Objective-C se incluyen en `DatadogTrace`. El módulo separado `DatadogObjc` ya no está disponible.

**Nota**: Existe una configuración similar en `RUM.Configuration.URLSessionTracking.FirstPartyHostsTracing`.

### Session Replay {#session-replay-1}

La configuración de privacidad es más granular. El parámetro `defaultPrivacyLevel` anterior ha sido reemplazado por:
- `textAndInputPrivacyLevel`
- `imagePrivacyLevel`
- `touchPrivacyLevel`

Obtenga más información sobre los [niveles de privacidad][1].

Cambios en la API:

|`2.x`|`3.0`|
|---|---|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|

### Instrumentación de URLSession {#urlsession-instrumentation}

Para habilitar la instrumentación de URLSession, asegúrese de habilitar también RUM y/o traza para informar a esos productos respectivamente.

Los tipos de delegado heredados han sido reemplazados por una API de instrumentación unificada:

|`2.x`|`3.0`|
|---|---|
|`DatadogURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDNSURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|

[1]: /es/session_replay/privacy_options?platform=ios

{{% /tab %}}

{{% tab "React Native" %}}

Lea [la guía MIGRATION.md][1] en el repositorio oficial de React Native.

<div class="alert alert-warning">
<strong>Importante:</strong> A diferencia de la v2.x (que siempre habilitaba todos los módulos de funciones al inicializar el SDK), la v3 <strong>no</strong> inicializa ni habilita un módulo de funciones a menos que pase explícitamente la configuración para él.
</div>

### Cambios en la configuración {#configuration-changes}

Ciertas propiedades de configuración han sido movidas, renombradas, eliminadas o divididas:

| Propiedad | Nueva ubicación | Cambios |
| :--- | :--- | :--- |
| `sampleRate` | *Eliminado* | Propiedad obsoleta eliminada. |
| `sessionSamplingRate` | `RumConfiguration` | Movido y renombrado a `sessionSampleRate`. |
| `resourceTracingSamplingRate` | `RumConfiguration` | Movido y renombrado a `resourceTraceSampleRate`. |
| `proxyConfig` | `CoreConfiguration` | Renombrado a `proxyConfiguration`. |
| `serviceName` | `CoreConfiguration` | Renombrado a `service`. |
| `customEndpoints` | *Dividido* | Dividido en `customEndpoint` dentro de `RumConfiguration`, `LogsConfiguration` y `TraceConfiguration`. |
| *(Nueva propiedad)* | `CoreConfiguration` | `attributeEncoders` agregada. |
| *(Nueva propiedad)* | `RumConfiguration` | `trackMemoryWarnings` agregada. |
| `nativeCrashReportEnabled` | `RumConfiguration` | Movido. |
| `nativeViewTracking` | `RumConfiguration` | Movido. |
| `nativeInteractionTracking` | `RumConfiguration` | Movido. |
| `firstPartyHosts` | `RumConfiguration` | Se forzó el uso del tipo `FirstPartyHost[]` y se movió. |
| `telemetrySampleRate` | `RumConfiguration` | Movido. |
| `nativeLongTaskThresholdMs` | `RumConfiguration` | Movido. |
| `longTaskThresholdMs` | `RumConfiguration` | Movido. |
| `vitalsUpdateFrequency` | `RumConfiguration` | Movido. |
| `trackFrustrations` | `RumConfiguration` | Movido. |
| `trackBackgroundEvents` | `RumConfiguration` | Movido. |
| `bundleLogsWithRum` | `LogsConfiguration` | Movido. |
| `bundleLogsWithTraces` | `LogsConfiguration` | Movido. |
| `trackNonFatalAnrs` | `RumConfiguration` | Movido. |
| `appHangThreshold` | `RumConfiguration` | Movido. |
| `initialResourceThreshold` | `RumConfiguration` | Movido. |
| `trackWatchdogTerminations` | `RumConfiguration` | Movido. |
| `actionNameAttribute` | `RumConfiguration` | Movido. |
| `logEventMapper` | `LogsConfiguration` | Movido. |
| `errorEventMapper` | `RumConfiguration` | Movido. |
| `resourceEventMapper` | `RumConfiguration` | Movido. |
| `actionEventMapper` | `RumConfiguration` | Movido. |
| `useAccessibilityLabel` | `RumConfiguration` | Movido. |
| `trackInteractions` | `RumConfiguration` | Movido. |
| `trackResources` | `RumConfiguration` | Movido. |
| `trackErrors` | `RumConfiguration` | Movido. |

### Estructuras renombradas {#renamed-structures}

| `2.x` | `3.x` |
|---|---|
| `DdSdkConfiguration` | `CoreConfiguration` |

### Actualizaciones de API {#api-updates}

Además de los cambios en la propiedad de la configuración (configuraciones principales frente a las de funciones), varios tipos y API públicos fueron renombrados o reubicados para coincidir con el diseño modular de la v3. Consulte [la guía MIGRATION.md][1] para obtener la lista autorizada y ejemplos de código.

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

## De v1 a v2 {#from-v1-to-v2}
{{< tabs >}}
{{% tab "Android" %}}

La migración de v1 a v2 representa una migración de un SDK monolítico a una arquitectura modular. RUM, Traza, Registros, Session Replay, entre otros, tienen módulos individuales, lo que le permite integrar solo lo que necesita en su aplicación.

El SDK v2 ofrece un diseño de API unificado y una alineación de nombres entre el SDK de iOS, el SDK de Android y otros productos de Datadog.

El SDK v2 permite el uso de [Mobile Session Replay][2] en aplicaciones de Android e iOS.

[2]: /es/session_replay/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

La migración de v1 a v2 representa una migración de un SDK monolítico a una arquitectura modular. RUM, Traza, Registros, Session Replay, entre otros, tienen módulos individuales, lo que le permite integrar solo lo que necesita en su aplicación.

El SDK v2 ofrece un diseño de API unificado y una alineación de nombres entre el SDK de iOS, el SDK de Android y otros productos de Datadog.

El SDK v2 permite el uso de [Mobile Session Replay][3] en aplicaciones de Android e iOS.

[3]: /es/session_replay/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

La migración de v1 a v2 viene con un rendimiento mejorado.

{{% /tab %}}
{{% tab "Flutter" %}}

La migración de v1 a v2 viene con un rendimiento mejorado y características adicionales proporcionadas por los SDK nativos de la v2.

{{% /tab %}}
{{< /tabs >}}

### Módulos {#modules-1}
{{< tabs >}}
{{% tab "Android" %}}

Los artefactos están modularizados en la v2. Adopte los siguientes artefactos:

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Registros: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Traza: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* Instrumentación de OkHttp: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**Nota**: Si utiliza NDK Crash Reporting y WebView Tracking, debe agregar los artefactos de RUM y Logs para reportar eventos a RUM y Logs respectivamente.

La referencia al artefacto `com.datadoghq:dd-sdk-android` debe eliminarse de su script de compilación de Gradle, ya que este artefacto ya no existe.

**Nota**: Las coordenadas de Maven de todos los demás artefactos permanecen iguales.

<div class="alert alert-danger">La v2 no es compatible con la API 19 de Android (KitKat). El SDK mínimo compatible ahora es la API 21 (Lollipop). Se requiere Kotlin 1.7. El SDK en sí está compilado con Kotlin 1.8, por lo que un compilador de Kotlin 1.6 o inferior no puede leer los metadatos de las clases del SDK.</div>

En caso de que encuentre un error como el siguiente:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

Añada las siguientes reglas a su script de compilación (más detalles en el [problema de Stack Overflow][4] correspondiente):

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

Consulte la [aplicación de ejemplo de Android][5] para ver un ejemplo de cómo configurar el SDK.

[4]: https://stackoverflow.com/a/75298544
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

Las bibliotecas están modularizadas en la v2. Adopte las siguientes bibliotecas:

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

Estas se añaden a las `DatadogCrashReporting` y `DatadogObjc` existentes.

<details>
  <summary>SPM (Recomendado)</summary>

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

El `Cartfile` permanece igual:
  ```
  github "DataDog/dd-sdk-ios"
  ```

En Xcode, **debe** vincular los siguientes frameworks:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

Luego, puede seleccionar los módulos que desea utilizar:
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

**Nota**: Al utilizar Crash Reporting y WebView Tracking, debe añadir los módulos RUM y Logs para reportar eventos a RUM y Logs respectivamente.

{{% /tab %}}

{{% tab "React Native" %}}

Actualice `@datadog/mobile-react-native` en su package.json:

```json
"@datadog/mobile-react-native": "2.0.0"
```

Actualice sus pods de iOS:

```bash
(cd ios && bundle exec pod update)
```

Si utiliza una versión de React Native estrictamente superior a `0.67`, utilice la versión 17 de Java. Si utiliza una versión de React Native igual o inferior a `0.67`, utilice la versión 11 de Java. Para verificar su versión de Java, ejecute lo siguiente en una terminal:

```bash
java --version
```

### Para React Native < 0.73 {#for-react-native-073}

En su archivo `android/build.gradle`, especifique `kotlinVersion` para evitar conflictos entre las dependencias de Kotlin:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### Para React Native < 0.68 {#for-react-native-068}

En su archivo `android/build.gradle`, especifique `kotlinVersion` para evitar conflictos entre las dependencias de Kotlin:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Si está utilizando una versión de `com.android.tools.build:gradle` inferior a `5.0` en su `android/build.gradle`, añada en su archivo `android/gradle.properties`:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### Solución de problemas {#troubleshooting}

#### La compilación de Android falla con `Unable to make field private final java.lang.String java.io.File.path accessible` {#android-build-fails-with-unable-to-make-field-private-final-javalangstring-javaiofilepath-accessible}

Si su compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

Está utilizando Java 17, el cual no es compatible con su versión de React Native. Cambie a Java 11 para resolver el problema.

#### La compilación de Android falla con `Unsupported class file major version 61` {#android-build-fails-with-unsupported-class-file-major-version-61}

Si su compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Usted utiliza una versión del complemento de Android para Gradle inferior a `5.0`. Para solucionar el problema, agregue en su archivo `android/gradle.properties`:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### La compilación de Android falla con `Duplicate class kotlin.collections.jdk8.*` {#android-build-fails-with-duplicate-class-kotlincollectionsjdk8}

Si su compilación de Android falla con un error como:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Debe establecer una versión de Kotlin para su proyecto para evitar conflictos entre las dependencias de Kotlin. En su archivo `android/build.gradle`, especifique `kotlinVersion`:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternativamente, puede agregar las siguientes reglas a su script de compilación en su archivo `android/app/build.gradle`:

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

Actualice `datadog_flutter_plugin` en su pubspec.yaml:

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## Solución de problemas {#troubleshooting-1}

### Interfaz duplicada (iOS) {#duplicate-interface-ios}

Si ve este error al compilar iOS después de actualizar a `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Intente realizar `flutter clean && flutter pub get` y volver a compilar. Esto suele resolver el problema.

### Clases duplicadas (Android) {#duplicate-classes-android}

Si ve este error al compilar Android después de la actualización a `datadog_flutter_plugin` v2.0:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Asegúrese de haber actualizado su versión de Kotlin a al menos 1.8 en su archivo `build.gradle`.

{{% /tab %}}

{{< /tabs >}}

### Inicialización del SDK {#sdk-initialization}
{{< tabs >}}
{{% tab "Android" %}}
Con la extracción de diferentes productos en módulos independientes, la configuración del SDK está organizada por módulo.

`com.datadog.android.core.configuration.Configuration.Builder` La clase tiene los siguientes cambios:

* Se deben proporcionar el token de cliente, el nombre del entorno, el nombre de la variante (el valor predeterminado es una cadena vacía) y el nombre del servicio (el valor predeterminado es el ID de la aplicación tomado del manifiesto) en el constructor.
* La clase `com.datadog.android.core.configuration.Credentials` ha sido eliminada.
* `logsEnabled`, `tracesEnabled` y `rumEnabled` se eliminaron del constructor a favor de la configuración individual del producto (ver más abajo).
* `crashReportsEnabled` El argumento del constructor se eliminó. Puede habilitar o deshabilitar el informe de fallos de la JVM con el método `Configuration.Builder.setCrashReportsEnabled`. De forma predeterminada, el informe de fallos de la JVM está habilitado.
Los métodos de configuración del producto * RUM, Logs y Trace se eliminaron de `Configuration.Builder` a favor de la configuración individual del producto (ver más abajo).

El método `Datadog.initialize` tiene la clase `Credentials` eliminada de la lista de argumentos.

El paquete `com.datadog.android.plugin` y todas las clases/métodos relacionados se eliminaron.

### Logs {#logs-2}

Todas las clases relacionadas con el producto Logs están estrictamente contenidas en el paquete `com.datadog.android.log`.

Para usar el producto Logs, importe el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

Puede habilitar el producto Logs con el siguiente fragmento:

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
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|Este método ha sido eliminado. Use `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` en su lugar para deshabilitar el envío de Logs a Datadog.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace {#trace-2}

Todas las clases relacionadas con el producto Trace están estrictamente contenidas en el paquete `com.datadog.android.trace` (esto significa que todas las clases que residían en `com.datadog.android.tracing` anteriormente se han movido).

Para usar el producto Trace, importe el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

Puede habilitar el producto Trace con el siguiente fragmento:

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

### RUM {#rum-2}

Todas las clases relacionadas con el producto RUM están estrictamente contenidas en el paquete `com.datadog.android.rum`.

Para usar el producto RUM, importe el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

Puede habilitar el producto RUM con el siguiente fragmento:

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
|`com.datadog.android.rum.RumMonitor.Builder`|Esta clase ha sido eliminada. El monitor RUM se crea y registra durante la llamada `Rum.enable`.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|Este método ha sido eliminado. El monitor RUM se crea y registra durante la llamada `Rum.enable`.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting {#ndk-crash-reporting}

El nombre del artefacto sigue siendo el mismo que antes: `com.datadoghq:dd-sdk-android-ndk:x.x.x`.

Puede habilitar NDK Crash Reporting con el siguiente fragmento:

```kotlin
NdkCrashReports.enable()
```

Esta configuración reemplaza la llamada `com.datadog.android.core.configuration.Configuration.Builder.addPlugin`.

**Nota**: Debe tener habilitados los productos RUM y Logs para recibir informes de fallos NDK en RUM y Logs, respectivamente.

### Seguimiento de WebView {#webview-tracking}

El nombre del artefacto sigue siendo el mismo que antes: `com.datadoghq:dd-sdk-android-webview:x.x.x`

Puede habilitar el seguimiento de WebView con el siguiente fragmento:

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**Nota**: Debe tener habilitados los productos RUM y Logs para recibir eventos provenientes de WebView en RUM y Logs, respectivamente.

Cambios en la API:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|Este método se convirtió en una `internal` clase. Use `WebViewTracking` en su lugar.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|Esta clase fue eliminada. Use `WebViewTracking` en su lugar.|
|`com.datadog.android.rum.webview.RumWebViewClient`|Esta clase fue eliminada. Use `WebViewTracking` en su lugar.|

### OkHttp Tracking {#okhttp-tracking}

Para usar OkHttp Tracking, importe el siguiente artefacto:

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

La instrumentación de OkHttp admite la inicialización del SDK de Datadog después del cliente de OkHttp, lo que le permite crear `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor` y `com.datadog.android.okhttp.trace.TracingInterceptor` antes del SDK de Datadog. La instrumentación de OkHttp comienza a informar eventos a Datadog una vez que se inicializa el SDK de Datadog.

Tanto `com.datadog.android.okhttp.DatadogInterceptor` como `com.datadog.android.okhttp.trace.TracingInterceptor` le permiten controlar el muestreo de forma dinámica mediante la integración con un sistema de configuración remota.

Para ajustar el muestreo de forma dinámica, proporcione su propia implementación de la interfaz `com.datadog.android.core.sampling.Sampler` en el constructor de `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor`. Se consulta para cada solicitud con el fin de tomar la decisión de muestreo.

### `dd-sdk-android-ktx` eliminación del módulo {#dd-sdk-android-ktx-module-removal}

Para mejorar la granularidad de los SDK de Datadog utilizados, se elimina el módulo `dd-sdk-android-ktx`. El código se distribuye entre los otros módulos para proporcionar métodos de extensión tanto para las funciones de RUM como de traza.

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

### Session Replay {#session-replay-2}

Para obtener instrucciones sobre cómo configurar Mobile Session Replay, consulte [Mobile Session Replay Setup and Configuration][6].

[6]: /es/session_replay/setup_and_configuration/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

Con la extracción de diferentes productos en módulos independientes, la configuración del SDK está organizada por módulo.

> El SDK debe inicializarse antes de habilitar cualquier producto.

El patrón Builder de la inicialización del SDK se ha eliminado en favor de las definiciones de estructura. El siguiente ejemplo muestra cómo se traduciría una inicialización de `1.x` en `2.0`.

**Inicialización de V1**

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
**Inicialización de V2**

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

### Registros {#logs-3}

Todas las clases relacionadas con Logs están estrictamente en el módulo `DatadogLogs`. Primero debe habilitar el producto:

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

Luego, puede crear una instancia de logger:

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

### traza {#trace-3}

Todas las clases relacionadas con traza están estrictamente en el módulo `DatadogTrace`. Primero debe habilitar el producto:

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

Luego, puede acceder a la instancia compartida de Tracer:

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

### RUM {#rum-3}

Todas las clases relacionadas con RUM están estrictamente en el módulo `DatadogRUM`. Primero debe habilitar el producto:

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

Luego, puede acceder a la instancia compartida de seguimiento de RUM:

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

### Crash Reporting {#crash-reporting}

Para habilitar Crash Reporting, asegúrese de habilitar RUM y Logs para informar a esos productos respectivamente.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### Seguimiento de WebView {#webview-tracking-1}

Para habilitar WebViewTracking, asegúrese también de habilitar RUM y Logs para informar a esos productos respectivamente.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay {#session-replay-3}

Para obtener instrucciones sobre cómo configurar Mobile Session Replay, consulte [Mobile Session Replay Setup and Configuration][7].

[7]: /es/session_replay/setup_and_configuration/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

No se necesita ningún cambio en la inicialización del SDK.

{{% /tab %}}

{{% tab "Flutter" %}}

## Cambios en la configuración del SDK {#sdk-configuration-changes}

Ciertas propiedades de configuración se han movido o renombrado para admitir la modularidad en los SDK nativos de Datadog.

Las siguientes estructuras han sido renombradas:

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

Las siguientes propiedades han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| Eliminado | Parte de `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | Eliminado | Ahora configurado por función | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

Además, las siguientes API han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `Verbosity` | Eliminado | Ver `CoreLoggerLevel` o `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | Tipo cambiado |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | Tipo cambiado
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | Se agregó el parámetro `trackingConsent` |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | Se agregó el parámetro `trackingConsent` |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | Movido |

## Cambios en Flutter Web {#flutter-web-changes}

Los clientes que usan Flutter Web deben actualizarse al uso del SDK de navegador de Datadog v5. Cambie la siguiente importación en su `index.html`:

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**Nota**: Datadog proporciona un paquete CDN por sitio. Consulte el [README del SDK del navegador](https://github.com/DataDog/browser-sdk/#cdn-bundles) para obtener una lista de todas las URL del sitio.

## Cambios en el producto Logs {#logs-product-changes}

Al igual que en la v1, Datadog Logs se puede habilitar configurando el miembro `DatadogConfiguration.loggingConfiguration`. Sin embargo, a diferencia de la v1, Datadog no crea un logger predeterminado para usted. `DatadogSdk.logs` ahora es una instancia de `DatadogLogging`, que se puede usar para crear Logs. Muchas opciones se movieron a `DatadogLoggerConfiguration` para brindar a los desarrolladores un soporte más granular sobre los loggers individuales.

Las siguientes API han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | La mayoría de los miembros renombrados ahora están en `DatadogLoggerConfiguration` |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | Eliminado. Use `remoteLogThreshold` en su lugar | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## Cambios en el producto RUM {#rum-product-changes}

Las siguientes API han cambiado:

| 1.x | 2.x | Notas |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | Tipo renombrado |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | Establezca en `null` para deshabilitar las actualizaciones de signos vitales |
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

Además, los asignadores de eventos ya no le permiten modificar los nombres de visualización. Para cambiar el nombre de una visualización, utilice un [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) personalizado en su lugar.


{{% /tab %}}

{{< /tabs >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}