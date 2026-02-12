---
aliases:
- /ko/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: RUM을 설정하여 기능 플래그 데이터를 캡처하고 Datadog에서 성능을 분석하는 방법 알아뷰
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: 설명서
  text: Feature flag tracking(기능 플래그 추적)으로 기능 플래그 데이터를 분석합니다.
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에서 RUM 데이터 시각화
title: RUM에서 기능 플래그 데이터로 시작하기
---

## 개요
기능 플래그 데이터를 사용하면 어떤 사용자에게 특정 기능이 표시되는지, 도입한 변경 사항이 사용자 경험에 영향을 미치거나 성능에 부정적인 영향을 미치는지 확인할 수 있으므로 사용자 경험 및 성능 모니터링에 대한 가시성을 높일 수 있습니다.

기능 플래그 데이터로 RUM 데이터를 보강하면 의도치 않은 버그나 성능 저하를 일으키지 않고도 기능을 성공적으로 출시할 수 있다고 확신할 수 있습니다. 추가 인사이트 레이어로 기능 릴리스와 성능의 상관 관계를 파악하고, 특정 릴리스에 관한 문제를 정확히 찾아내며 해당 문제를 더 빠르게 해결할 수 있습니다.

## 설정

{{< tabs >}}
{{% tab "Browser" %}}

Feature flag tracking은 RUM Browser SDK에서 사용할 수 있습니다. 시작하려면 [RUM 브라우저 모니터링][1]을 설정합니다. RUM Browser SDK 버전 4.25.0 이상이 필요합니다.

<details>
  <summary><code>v5.17.0</code> 이전 버전</summary>

5.17.0 이전 버전을 사용하는 경우에는 RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`로 설정하여 기능 플래그 데이터 수집을 시작합니다.

{{% collapse-content title="NPM" level="h4" %}}
```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Initialize Datadog Browser SDK
  datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```
{{% /collapse-content %}}

{{% collapse-content title="CDN async" level="h4" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
})
```
{{% /collapse-content %}}

{{% collapse-content title="CDN sync" level="h4" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
```
{{% /collapse-content %}}

</details>
<br/>

[1]: /ko/real_user_monitoring/browser/setup/
{{% /tab %}}
{{% tab "Android" %}}

Feature flag tracking은 RUM Android SDK에서 사용할 수 있습니다. 시작하려면 [RUM Android 모니터링][1]을 설정합니다. Android RUM SDK 버전 1.18.0 이상이 필요합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

Feature flag tracking은 Flutter 애플리케이션에서 사용할 수 있습니다. 시작하려면 [RUM Flutter 모니터링][1]을 설정합니다. Flutter Plugin 버전 1.3.2 이상이 필요합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

Feature flag tracking은 RUM iOS SDK에서 사용할 수 있습니다. 시작하려면 [RUM iOS 모니터링][1]을 설정합니다. iOS RUM SDK 버전 1.16.0 이상이 필요합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

Feature flag tracking은 Kotlin Multiplatform 애플리케이션에서 사용할 수 있습니다. 시작하려면 [RUM Kotlin Multiplatform 모니터링][1]을 설정합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "React Native" %}}

Feature flag tracking은 React Native 애플리케이션에서 사용할 수 있습니다. 시작하려면 [RUM React Native 모니터링][1]을 설정합니다. React Native RUM SDK 버전 1.7.0 이상이 필요합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unity" %}}

Feature flag tracking은 Unity 애플리케이션에서 사용할 수 있습니다. 시작하려면 [RUM Unity 모니터링][1]을 설정합니다.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/unity/setup
{{% /tab %}}
{{< /tabs >}}

## 통합

[커스텀 기능 플래그 관리 솔루션](#custom-feature-flag-management)을 사용하거나 Datadog 통합 파트너 중 하나를 사용하여 기능 플래그 데이터 수집을 시작할 수 있습니다.

Datadog은 다음 통합을 지원합니다.
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Amplitude 통합

{{< tabs >}}
{{% tab "Browser" %}}

다음 코드 스니펫을 사용하여 Amplitude 소프트웨어 개발 키트(SDK)를 초기화하고 Datadog에 기능 플래그 평가를 보고하는 익스포저 리스너를 생성합니다.

Amplitude 초기화에 대한 자세한 내용은 Amplitude 소프트웨어 개발 키트(SDK), [JavaScript 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Amplitude에서 노출을 보고할 때 기능 플래그 전송
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Amplitude 소프트웨어 개발 키트(SDK)를 초기화하고 아래 코드 스니펫을 사용하여 Datadog로 기능 플래그 평가를 보고하는 인스팩터를 생성하세요.

Amplitude SDK 초기화에 대한 자세한 내용은 Amplitude의 [iOS 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Amplitude에서 노출을 보고할 때 기능 플래그 전송
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // In initialization:
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Amplitude 소프트웨어 개발 키트(SDK)를 초기화하고 아래 코드 스니펫을 사용하여 Datadog로 기능 플래그 평가를 보고하는 인스팩터를 생성하세요.

Amplitude SDK 초기화에 대한 자세한 내용은 Amplitude의 [Android 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```kotlin
  internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    override fun track(exposure: Exposure) {
        // Amplitude에서 노출을 보고할 때 기능 플래그 전송
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            exposure.flagKey,
            exposure.variant.orEmpty()
        )
    }
  }

  // In initialization:
  val config = ExperimentConfig.Builder()
      .exposureTrackingProvider(DatadogExposureTrackingProvider())
      .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude는 이 통합 기능을 지원하지 않습니다. 이 기능을 요청하려면 Amplitude를 통해 티켓을 생성하세요.


{{% /tab %}}
{{< /tabs >}}

### ConfigCat 통합

{{< tabs >}}
{{% tab "Browser" %}}

ConfigCat 자바스크립트 소프트웨어 개발 키트(SDK)를 초기화하면 `flagEvaluated` 이벤트를 구독하고 기능 플래그 평가를 Datadog에 전송하게 됩니다.

```javascript
const configCatClient = configcat.getClient(
  '#YOUR-SDK-KEY#',
  configcat.PollingMode.AutoPoll,
  {
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        datadogRum.addFeatureFlagEvaluation(details.key, details.value);
      })
  }
);
```

ConfigCat 자바스크립트 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 ConfigCat [자바스크립트 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

ConfigCat Swift iOS 소프트웨어 개발 키트(SDK)를 초기화하면 `flagEvaluated` 이벤트를 구독하고 Datadog에 기능 플래그 평가를 전송하게 됩니다.

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

ConfigCat Swift (iOS) 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 ConfigCat Swift iOS 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

ConfigCat 안드로이드 소프트웨어 개발 키트(SDK)를 초기화하면 `flagEvaluated` 이벤트를 구독하고 기능 플래그 평가를 Datadog 에 보고하게 됩니다.

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

ConfigCat 안드로이드 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 ConfigCat [안드로이드 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

ConfigCat Dart 소프트웨어 개발 키트(SDK) 초기화 시`flagEvaluated` 이벤트를 구독하고 기능 플래그 평가를 Datadog에 보고합니다.

```dart
  final client = ConfigCatClient.get(
    sdkKey: '#YOUR-SDK-KEY#',
    options: ConfigCatOptions(
        pollingMode: PollingMode.autoPoll(),
        hooks: Hooks(
            onFlagEvaluated: (details) => {
              DatadogSdk.instance.rum?.addFeatureFlagEvaluation(details.key, details.value);
            }
        )
    )
  );
```

ConfigCat Dart (Flutter) 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은  ConfigCat [Dart 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

ConfigCat React 소프트웨어 개발 키트(SDK) 초기화 시 `flagEvaluated` 이벤트를 구독하고 Datadog에 기능 플래그 평가를 전송합니다.

```typescript
<ConfigCatProvider
  sdkKey="YOUR_SDK_KEY"
  pollingMode={PollingMode.AutoPoll}
  options={{
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        DdRum.addFeatureFlagEvaluation(details.key, details.value);
      }),
  }}
>
  ...
</ConfigCatProvider>
```

ConfigCat React 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 ConfigCat [React 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### 커스텀 기능 플래그 관리

{{< tabs >}}
{{% tab "Browser" %}}

기능 플래그가 평가될 때마다 다음 함수를 추가하여 기능 플래그 정보를 RUM으로 전송합니다.

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

기능 플래그가 평가될 때마다 다음 함수를 추가하여 기능 플래그 정보를 RUM으로 전송합니다.

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

기능 플래그가 평가될 때마다 다음 함수를 추가하여 기능 플래그 정보를 RUM으로 전송합니다.

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

기능 플래그가 평가될 때마다 다음 함수를 추가하여 기능 플래그 정보를 RUM으로 전송합니다.

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

기능 플래그가 평가될 때마다 다음 함수를 추가하여 기능 플래그 정보를 RUM으로 전송합니다.

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### DevCycle 통합

{{< tabs >}}
{{% tab "Browser" %}}

모든 변수 평가 `variableEvaluated:*` 또는 특정 변수 평가 `variableEvaluated:my-variable-key`를 구독하도록 선택하여 DevCycle 소프트웨어 개발 키트(SDK) 를 초기화하고 `variableEvaluated` 이벤트를 구독합니다.

DevCycle 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [DevCycle JavaScript 소프트웨어 개발 키트(SDK) 설명서][5]를 참조하고 DevCycle 이벤트 시스템에 대한 자세한 내용은 [DevCycle 소프트웨어 개발 키트(SDK) 이벤트 설명서][6]를 참조하세요.

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions);
...
dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        // track all variable evaluations
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        // track a particular variable evaluation
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 DevCycle을 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 DevCycle을 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 DevCycle을 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 DevCycle을 통해 티켓을 생성하세요.


{{% /tab %}}
{{< /tabs >}}

### Eppo 통합

{{< tabs >}}
{{% tab "Browser" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo 소프트웨어 개발 키트(SDK) 을 초기화하고 기능 플래그 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [Eppo 자바스크립트 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    datadogRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/javascript
{{% /tab %}}
{{% tab "iOS" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo 소프트웨어 개발 키트(SDK) 을 초기화하고 기능 플래그 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [Eppo iOS 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo 소프트웨어 개발 키트(SDK) 을 초기화하고 기능 플래그 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [Eppo 안드로이드 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```java
AssignmentLogger logger = new AssignmentLogger() {
    @Override
    public void logAssignment(Assignment assignment) {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(assignment.getFeatureFlag(), assignment.getVariation());
    }
};

EppoClient eppoClient = new EppoClient.Builder()
    .apiKey("YOUR_API_KEY")
    .assignmentLogger(logger)
    .application(application)
    .buildAndInit();
```


[1]: https://docs.geteppo.com/sdks/client-sdks/android

{{% /tab %}}
{{% tab "Flutter" %}}

Eppo는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [Eppo로 문의][1]하세요.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo 소프트웨어 개발 키트(SDK) 을 초기화하고 기능 플래그 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [Eppo의 React 네이티브 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    DdRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/react-native

{{% /tab %}}
{{< /tabs >}}

### Flagsmith 통합

{{< tabs >}}
{{% tab "Browser" %}}

아래 표시된 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 `datadogRum` 옵션으로 Flagsmith의 SDK를 초기화합니다.

   선택적으로 Flagsmith 특성이 `datadogRum.setUser()` 을 통해 Datadog 으로 전송되도록 클라이언트를 설정할 수 있습니다. Flagsmith 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [Flagsmith자바스크립트 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "iOS" %}}

Flagsmith는 이 통합 기능을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith를 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith는 이 통합 기능을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith를 통해 티켓을 생성하세요.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith는 이 통합 기능을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith를 통해 티켓을 생성하세요.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith는 현재 이 연동 기능을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith를 통해 티켓을 생성하세요.

{{% /tab %}}
{{< /tabs >}}

### GrowthBook 통합

{{< tabs >}}
{{% tab "Browser" %}}

GrowthBook 소프트웨어 개발 키트(SDK) 초기화 시 `onFeatureUsage` 콜백을 사용하여 Datadog로 기능 플래그 평가를 보고합니다.

GrowthBook 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [GrowthBook 자바스크립트 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/js#step-1-configure-your-app

{{% /tab %}}
{{% tab "iOS" %}}

GrowthBook은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 GrowthBook으로 문의하세요.

{{% /tab %}}
{{% tab "Android" %}}

GrowthBook 소프트웨어 개발 키트(SDK) 초기화 시 `setFeatureUsageCallback` 호출을 통해 Datadog에 기능 플래그 평가를 보고합니다.

GrowthBook 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [GrowthBook 안드로이드 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

[1]: https://docs.growthbook.io/lib/kotlin#quick-usage

{{% /tab %}}
{{% tab "Flutter" %}}

GrowthBook 소프트웨어 개발 키트(SDK) 초기화 시 `setFeatureUsageCallback` 호출을 통해 Datadog에 기능 플래그 평가를 보고합니다.

GrowthBook 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [GrowthBook Flutter 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```dart
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
```

[1]: https://docs.growthbook.io/lib/flutter#quick-usage

{{% /tab %}}
{{% tab "React Native" %}}

GrowthBook 소프트웨어 개발 키트(SDK) 초기화 시 `onFeatureUsage` 콜백을 사용하여 Datadog로 기능 플래그 평가를 보고합니다.

GrowthBook 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [GrowthBook GrowthBook 소프트웨어 개발 키트(SDK) 설명서[1]를 참조하세요.

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/react-native#step-1-configure-your-app

{{% /tab %}}
{{< /tabs >}}

### Kameleoon 통합

{{< tabs >}}
{{% tab "Browser" %}}

Kameleoon SDK를 생성 및 초기화한 후, `onEvent` 핸들러로 `Evaluation` 이벤트를 구독합니다.

SDK에 대한 자세한 내용은 [Kameleoon 자바스크립트 SDK 설명서][1]를 참조하세요.

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 product@kameleoon.com으로 문의하세요.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 product@kameleoon.com으로 문의하세요.


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 product@kameleoon.com으로 문의하세요.


{{% /tab %}}
{{% tab "React Native" %}}

Kameleoon 소프트웨어 개발 키트(SDK)를 생성 및 초기화한 후, `onEvent` 핸들러로 `Evaluation` 이벤트를 구독합니다.

SDK 초기화에 대한 자세한 내용은 [Kameleoon React Native SDK 설명서][1]를 참조하세요.

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}


### LaunchDarkly 통합

{{< tabs >}}
{{% tab "Browser" %}}

LaunchDarkly 소프트웨어 개발 키트(SDK) 를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 인스펙터를 생성합니다.

 LaunchDarkly 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 [LaunchDarkly 자바스크립트 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요

```javascript
const client = LDClient.initialize("<CLIENT_SIDE_ID>", "<CONTEXT>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "iOS" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly를 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly를 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly를 통해 티켓을 생성하세요.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly를 통해 티켓을 생성하세요.


{{% /tab %}}
{{< /tabs >}}


### Split 통합

{{< tabs >}}
{{% tab "Browser" %}}

Split 소프트웨어 개발 키트(SDK) 을 초기화하고 다음 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 노출 리스너를 생성합니다.

Split 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 Split [JavaScript 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {
          datadogRum
              .addFeatureFlagEvaluation(
                  impressionData.impression.feature,
                  impressionData.impression.treatment
              );
    },
  },
});

const client = factory.client();
```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "iOS" %}}

Split 소프트웨어 개발 키트(SDK) 을 초기화하고 아래 코드 스니펫을 사용하여 Datadog로 기능 플래그 평가를 보고하는 인스펙터를 만듭니다.

Split 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 Split [iOS 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```swift
  let config = SplitClientConfig()
  // Send the feature flag when Split reports the impression
  config.impressionListener = { impression in
      if let feature = impression.feature,
          let treatment = impression.treatment {
          RUMMonitor.shared().addFeatureFlagEvaluation(name: feature, value: treatment)
      }
  }
```


[1]: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK
{{% /tab %}}
{{% tab "Android" %}}

Split 소프트웨어 개발 키트(SDK) 을 초기화하고 아래 코드 스니펫을 사용하여 Datadog로 기능 플래그 평가를 보고하는 인스펙터를 만듭니다.

Split 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 Split [안드로이드 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```kotlin
  internal class DatadogSplitImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Send the feature flag when Split reports the impression
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            impression.split(),
            impression.treatment()
        )
    }
    override fun close() {
    }
  }

  // In initialization:
  val apikey = BuildConfig.SPLIT_API_KEY
  val config = SplitClientConfig.builder()
      .impressionListener(DatadogSplitImpressionListener())
      .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{% tab "Flutter" %}}

Split 소프트웨어 개발 키트(SDK) 을 초기화하고 아래 코드 스니펫을 사용하여 Datadog로 기능 플래그 평가를 보고하는 인스펙터를 만듭니다.

Split 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 Split의 [Flutter 플러그인 설명서][1]를 참조하세요.

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Send the feature flag when Split reports the impression
    final split = impression.split;
    final treatment = impression.treatment;
    if (split != null && treatment != null) {
      DatadogSdk.instance.rum?.addFeatureFlagEvaluation(split, treatment);
    }
  });
```


[1]: https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin
{{% /tab %}}
{{% tab "React Native" %}}

Split 소프트웨어 개발 키트(SDK) 을 초기화하고 다음 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 노출 리스너를 생성합니다.

Split 소프트웨어 개발 키트(SDK) 초기화에 대한 자세한 내용은 Split [React Native 소프트웨어 개발 키트(SDK) 설명서][1]를 참조하세요.

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {
          DdRum
              .addFeatureFlagEvaluation(
                  impressionData.impression.feature,
                  impressionData.impression.treatment
              );
    },
  },
});

const client = factory.client();
```


[1]: https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{< /tabs >}}

### Statsig 통합

{{< tabs >}}
{{% tab "Browser" %}}

Statsig의소프트웨어 개발 키트(SDK)를 `statsig.initialize`를 사용하여 초기화합니다.

1. 브라우저 RUM SDK 버전 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. Statsig의 SDK(`>= v4.34.0`)를 초기화하고 아래와 같이 `gateEvaluationCallback` 옵션을 구현합니다.

   ```javascript
    await statsig.initialize('client-<STATSIG CLIENT KEY>',
    {userID: '<USER ID>'},
    {
        gateEvaluationCallback: (key, value) => {
            datadogRum.addFeatureFlagEvaluation(key, value);
        }
    }
    );
   ```

[1]: https://docs.statsig.com/client/jsClientSDK
{{% /tab %}}
{{% tab "iOS" %}}

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com으로 문의하세요.

{{% /tab %}}
{{% tab "Android" %}}

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com으로 문의하세요.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com으로 문의하세요.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig는 현재 이 통합 기능을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com으로 문의하세요.

{{% /tab %}}
{{< /tabs >}}

## RUM에서 기능 플래그 성능 분석하기

기능 플래그는 RUM 세션, 뷰 및 오류의 컨텍스트에 목록으로 표시됩니다.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="RUM Explorer의 Feature Flag 속성 목록" style="width:75%;">}}

### RUM Explorer 기능 플래그 검색하기
[RUM Explorer][2]에서 RUM이 수집한 모든 데이터를 검색하여 기능 플래그의 추세를 파악하고, 더 많은 컨텍스트에서 패턴을 분석하거나, [대시보드][3] 및 [모니터][4]로 내보낼 수 있습니다. `@feature_flags.{flag_name}` 속성으로 RUM Explorer에서 세션, 뷰 또는 오류를 검색할 수 있습니다.

#### 세션
`@feature_flags.{flag_name}` 속성으로 **세션**을 필터링하면 지정된 타임 프레임 동안 기능 플래그가 평가된 모든 세션을 찾을 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="RUM Explorer에서 기능 플래그에 대한 세션 검색" style="width:75%;">}}

#### 보기
`@feature_flags.{flag_name}` 속성으로 **뷰**를 필터링하면 지정된 타임 프레임 동안 기능 플래그가 평가된 특정 뷰를 찾을 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="RUM Explorer에서 기능 플래그에 대한 뷰 검색" style="width:75%;">}}

#### 오류
`@feature_flags.{flag_name}` 속성으로 **오류**를 필터링하면 지정된 타임 프레임 동안 기능 플래그가 평가된 뷰에서 발생한 모든 오류를 찾을 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="RUM Explorer에서 기능 플래그에 대한 오류 검색" style="width:75%;">}}

## 트러블슈팅

### 내 기능 플래그 데이터가 예상한 것과 다르게 나타납니다.
기능 플래그는 평가되는 이벤트의 컨텍스트에 표시되기 때문에 기능 플래그 코드 로직이 실행되는 뷰에 표시됩니다.

코드를 구조화하고 기능 플래그를 설정한 방식에 따라 일부 이벤트의 컨텍스트에 예상치 못한 플래그가 표시될 수 있습니다.

예를 들어, 어떤 **뷰**에서 기능 플래그가 평가되고 있는지 확인하려면 RUM Explorer로 유사한 쿼리를 실행할 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="RUM Explorer에서 기능 플래그 뷰 검색" style="width:75%;">}}

다음은 관련이 없는 뷰에서 기능 플래그가 평가되는 이유에 대한 몇 가지 예시입니다. 조사에 사용하시기 바랍니다.

- 실행될 때마다 기능 플래그를 평가하는, 여러 페이지에 표시되는 일반적인 React 컴포넌트.
- 기능 플래그 평가가 있는 컴포넌트가 URL 변경 전/후에 렌더링되는 라우팅 문제.

조사할 때 기능 플래그와 관련된 `View Name`의 데이터 범위를 지정할 수도 있습니다.


## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ko/dashboards/
[4]: /ko/monitors/#create-monitors
[5]: /ko/real_user_monitoring/feature_flag_tracking