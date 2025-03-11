---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer

title: Utiliser plusieurs instances du SDK Mobile
---

## Présentation


<div class="alert alert-info">Pour utiliser plusieurs instances du SDK, vous devrez adopter la version <code>2.0.0</code> ou une version ultérieure. Consultez le guide <a href="https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade">Mettre à niveau les SDK RUM Mobile</a>.</div>

Suivez ce guide pour utiliser plusieurs instances nommées du SDK. De nombreuses méthodes du SDK prennent éventuellement une instance du SDK comme argument. Si aucune instance n'est fournie, l'appel est associé à l'instance du SDK (sans nom) par défaut.

**Remarque** : le nom de l'instance du SDK doit être cohérent entre les exécutions de l'application, car les événements du SDK dépendent de ce nom.

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
```

Vous pouvez récupérer l'instance du SDK nommée en appelant `Datadog.getInstance(<nom>)` et utiliser la méthode `Datadog.isInitialized(<nom>)` pour vérifier cette instance spécifique du SDK est initialisée.

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
    with: RUM.Configuration(applicationID: "<ID_APPLICATION_RUM>"),
    in: core
)

Logs.enable(in: core)

Trace.enable(in: core)
```

Une fois que l'instance du SDK nommée est initialisée, vous pouvez la récupérer en appelant `Datadog.sdkInstance(named: "<nom>")` et en l'utilisant tel qu'indiqué ci-dessous.

```swift
import DatadogCore

let core = Datadog.sdkInstance(named: "my-instance")
```

### Logs
```swift
import DatadogLogs

let logger = Logger.create(in: core)
```

### Trace
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```

### RUM
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```


{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}