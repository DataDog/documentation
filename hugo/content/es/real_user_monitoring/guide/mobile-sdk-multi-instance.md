---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualización de tus datos RUM en el Explorador RUM
title: Uso de varias instancias del SDK para móviles
---

## Información general


<div class="alert alert-info">Para utilizar varias instancias del SDK, deberás adoptar la versión <code>2.0.0</code> o posterior. Consulta la guía <a href="https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade">Actualizar los SDK móviles de RUM</a>.</div>

Sigue esta guía para utilizar varias instancias con nombre del SDK. Muchos métodos del SDK toman opcionalmente una instancia del SDK como argumento. Si no se proporciona ninguna, la llamada se asocia a la instancia del SDK predeterminada (sin nombre).

**Nota**: El nombre de la instancia del SDK debe ser constante entre ejecuciones de la aplicación. Las rutas de almacenamiento para eventos de SDK dependen de esto.

**Nota**: Session Replay sólo puede ejecutarse en un único núcleo a la vez. Para cambiar a otro, detén primero el núcleo que se está ejecutando.

{{< tabs >}}
{{% tab "Android" %}}

```kotlin
val namedSdkInstance = Datadog.initialize("myInstance", context, configuration, trackingConsent)

val userInfo = UserInfo(...)
Datadog.setUserInfo(userInfo, sdkCore = namedSdkInstance)

Logs.enable(logsConfig, namedSdkInstance)
val logger = Logger.Builder(namedSdkInstance)
    ...
    .build()

Trace.enable(traceConfig, namedSdkInstance)
val tracer = AndroidTracer.Builder(namedSdkInstance)
    ...
    .build()

Rum.enable(rumConfig, namedSdkInstance)
GlobalRumMonitor.get(namedSdkInstance)

NdkCrashReports.enable(namedSdkInstance)

WebViewTracking.enable(webView, allowedHosts, namedSdkInstance)

SessionReplay.enable(sessionReplayConfig, namedSdkInstance)
```

**Nota**:
Para que la instrumentación funcione en el componente WebView, es muy importante que JavaScript esté habilitado en el WebView. Para habilitarlo, puedes utilizar el siguiente fragmento de código:

```kotlin
    webView.settings.javaScriptEnabled = true
```

Puedes recuperar la instancia del SDK con nombre llamando a `Datadog.getInstance(<name>)` y utilizar el método `Datadog.isInitialized(<name>)` para comprobar si la instancia del SDK en particular está inicializada.

{{% /tab %}}
{{% tab "iOS" %}}

```swift
import DatadogCore
import DatadogRUM
import DatadogLogs
import DatadogTrace

let core = Datadog.initialize(
    with: configuration, 
    trackingConsent: trackingConsent, 
    instanceName: "my-instance"
)

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>"),
    in: core
)

Logs.enable(in: core)

Trace.enable(in: core)

SessionReplay.enable(with: sessionReplayConfig, in: core)
```

Una vez inicializada la instancia del SDK con nombre, puedes recuperarla llamando a `Datadog.sdkInstance(named: "<name>")` y utilizarla como se muestra a continuación.

```swift
import DatadogCore

let core = Datadog.sdkInstance(named: "my-instance")
```

### Logs
```swift
import DatadogLogs

let logger = Logger.create(in: core)
```

### Traza
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```

### RUM
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```


{{% /tab%}}
{{< /tabs>}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}