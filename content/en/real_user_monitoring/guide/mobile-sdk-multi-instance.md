---
title: Use Multiple Instances of the Mobile SDK

further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
---

## Overview


<div class="alert alert-info">In order to use multiple instances of the SDK, you will need to adopt version <code>2.0.0</code> or higher. See the <a href="https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade">Upgrade RUM Mobile SDKs</a> guide.</div>

Follow this guide to use multiple named instances of the SDK. Many methods of the SDK optionally take an SDK instance as an argument. If none is provided, the call is associated with the default (nameless) SDK instance.

**Note**: The SDK instance name should be consistent between application runs. Storage paths for SDK events depend on this.

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

You can retrieve the named SDK instance by calling `Datadog.getInstance(<name>)` and use the `Datadog.isInitialized(<name>)` method to check if the particular SDK instance is initialized.

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
```

Once the named SDK instance is initialized, you can retrieve it by calling `Datadog.sdkInstance(named: "<name>")` and use it as shown below.

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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

