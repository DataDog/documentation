---
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
title: 모바일 SDK의 여러 인스턴스 사용
---

## 개요


<div class="alert alert-info">SDK의 여러 인스턴스를 사용하려면 버전 <code>2.0.0 이상</code>을 사용해야 합니다. <a href="https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade">RUM 모바일 SDK 업그레이드</a> 가이드를 참조하세요.</div>

SDK의 여러 명명된 인스턴스를 사용하려면 이 가이드를 참조하세요. SDK의 많은 메서드는 선택적으로 SDK 인스턴스를 인수로 사용합니다. 아무 것도 제공되지 않으면 호출은 기본(이름 없는) SDK 인스턴스와 연결됩니다.

**참고**: SDK 인스턴스 이름은 애플리케이션 실행 간에 일관성이 있어야 합니다. SDK 이벤트의 저장 경로는 이에 따라 달라집니다.

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

`Datadog.getInstance(<name>)`를 호출하여 명명된 SDK 인스턴스를 검색할 수 있습니다. 또한, `Datadog.isInitialized(<name>)`을 사용하여 특정 SDK 인스턴스가 초기화되었는지 확인합니다.

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

명명된 SDK 인스턴스가 초기화되면 아래와 같이 `Datadog.sdkInstance(named: "<name>")`을 호출하여 검색 및 사용할 수 있습니다.

```swift
import DatadogCore

let core = Datadog.sdkInstance(named: "my-instance")
```

### 로그
```swift
import DatadogLogs

let logger = Logger.create(in: core)
```

### 트레이스
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


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}