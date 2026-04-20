---
aliases:
- /ko/real_user_monitoring/guide/getting-started-feature-flags/
- /ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: RUM을 설정하여 Feature Flag 데이터를 캡처하고 Datadog에서 성능을 분석하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: RUM Explorer에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Datadog RUM의 Feature Flag Tracking을 통해 릴리스 안전성 보장
title: Feature Flag Tracking 설정
---
Feature Flag 데이터는 사용자 환경 및 성능 모니터링의 가시성을 높여줍니다. 이를 통해 어떤 사용자에게 특정 기능이 표시되는지 파악하고 도입된 변경 사항이 사용자 경험에 영향을 미치는지, 또는 성능에 부정적인 영향을 미치는지 평가할 수 있습니다.

feature flag 데이터로 RUM 데이터를 보강하면 의도치 않은 버그나 성능 저하를 일으키지 않고도 기능을 성공적으로 출시할 수 있다고 확신할 수 있습니다. 추가 인사이트 레이어로 기능 릴리스와 성능의 상관 관계를 파악하고, 특정 릴리스에 관한 문제를 정확히 찾아내며 해당 문제를 더 빠르게 해결할 수 있습니다.

## RUM 모니터링 설정

Feature Flag Tracking은 RUM Browser, iOS, Android, Flutter 및 React Native SDK에서 사용할 수 있습니다.

{{< tabs >}}
{{% tab "브라우저" %}}

Browser SDK의 Feature Flag 데이터 수집을 활성화하는 방법:

1. [RUM 브라우저 모니터링][1]을 설정합니다. Browser RUM SDK 버전 >= 4.25.0이 필요합니다.

2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 ` ["feature_flags"]`로 구성합니다.

   <details open>
     <summary>npm</summary>

   ```javascript
     import { datadogRum } from '@datadog/browser-rum';

     // Initialize Datadog Browser SDK
     datadogRum.init({
       ...
       enableExperimentalFeatures: ["feature_flags"],
       ...
   });
   ```

   </details>

   <details>
     <summary>CDN async</summary>

   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   })
   ```
   </details>

   <details>
     <summary>CDN sync</summary>

   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   ```
   </details>
   <br/>

[1]: /ko/real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

iOS 애플리케이션의 Feature Flag 데이터 수집을 활성화하는 방법:

1. [RUM iOS 모니터링][1]을 설정합니다. iOS RUM SDK 버전 >= 1.16.0이 필요합니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Android 애플리케이션의 Feature Flag 데이터 수집을 활성화하는 방법:

1. [RUM Android 모니터링][1]을 설정합니다. Android RUM SDK 버전 >= 1.18.0이 필요합니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Flutter 애플리케이션의 Feature Flag 데이터 수집을 활성화하는 방법:

1. [RUM Flutter 모니터링][1]을 설정합니다. Flutter Plugin 버전 >= 1.3.2가 필요합니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

React Native 애플리케이션의 Feature Flag 데이터 수집을 활성화하는 방법:

1. [RUM React Native Monitoring][1]을 설정합니다. React Native RUM SDK 버전 >= 1.7.0이 필요합니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Feature Flag 통합 설정

[커스텀 Feature Flag 관리 솔루션](#customfeatureflagmanagement)을 사용하거나 아래 나열된 Datadog 통합 파트너 중 하나를 사용하여 feature flag 데이터 수집을 시작할 수 있습니다.

<div class="alert alert-danger">

**참고**: Feature Flag Tracking에서는 다음 특수 문자를 지원하지 않습니다. `.`, `:`, `+`, ``, `=`, `&amp;&amp;`, `||`, `>`, `&lt;`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`. Datadog은 Feature Flag 이름에서 이러한 문자를 사용하지 않기를 권장합니다. 이 문자를 꼭 사용해야 하는 경우, Datadog에 데이터를 전송하기 전에 해당 문자를 바꾸세요. 예:

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

### Amplitude 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

다음 코드 스니펫을 사용하여 Amplitude SDK를 초기화하고 Datadog에 Feature Flag 평가를 보고하는 익스포저 리스너를 생성합니다.

Amplitude 초기화에 대한 자세한 내용은 Amplitude SDK, [JavaScript SDK 설명서][1]를 참조하세요.

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Send the feature flag when Amplitude reports the exposure
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascriptsdk/

{{% /tab %}}
{{% tab "iOS" %}}

Amplitude SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

Amplitude SDK 초기화에 대한 자세한 내용은 Amplitude의 [iOS SDK 설명서][1]를 참조하세요.

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
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

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/iossdk/


{{% /tab %}}
{{% tab "Android" %}}

Amplitude SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

Amplitude SDK 초기화에 대한 자세한 내용은 Amplitude의 [Android SDK 설명서][1]를 참조하세요.

```kotlin
internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
  override fun track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
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

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/androidsdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 Amplitude에 티켓을 생성하세요.


{{% /tab %}}
{{< /tabs >}}

### ConfigCat 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

ConfigCat JavaScript SDK 초기화 시 `flagEvaluated` 이벤트를 구독하고 Feature Flag 평가를 Datadog에 보고하세요.

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

ConfigCat JavaScript SDK 초기화에 대한 자세한 내용은 ConfigCat [JavaScript SDK 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdkreference/js


{{% /tab %}}
{{% tab "iOS" %}}

ConfigCat Swift iOS SDK 초기화 시 `flagEvaluated` 이벤트를 구독하고 Feature Flag 평가를 Datadog에 보고하세요.

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

ConfigCat Swift(iOS) SDK 초기화에 대한 자세한 내용은 ConfigCat의 [Swift iOS SDK 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdkreference/ios


{{% /tab %}}
{{% tab "Android" %}}

ConfigCat Android SDK 초기화 시 `flagEvaluated` 이벤트를 구독하고 Feature Flag 평가를 Datadog에 보고하세요.

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

ConfigCat Android SDK 초기화에 대한 자세한 내용은 ConfigCat [Android SDK 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdkreference/android


{{% /tab %}}
{{% tab "Flutter" %}}

ConfigCat Dart SDK 초기화 시 `flagEvaluated` 이벤트를 구독하고 Feature Flag 평가를 Datadog에 보고하세요.

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

ConfigCat Dart(Flutter) SDK 초기화에 대한 자세한 내용은 ConfigCat [Dart SDK 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdkreference/dart


{{% /tab %}}


{{% tab "React Native" %}}

ConfigCat React SDK 초기화 시 `flagEvaluated` 이벤트를 구독하고 Feature Flag 평가를 Datadog에 보고하세요.

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

ConfigCat React SDK 초기화에 대한 자세한 내용은 ConfigCat [React SDK 설명서][1]를 참조하세요.

[1]: https://configcat.com/docs/sdkreference/react

{{% /tab %}}
{{< /tabs >}}

### 커스텀 Feature Flag 관리

커스텀 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#setuprummonitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

Feature Flag가 평가될 때마다 다음 함수를 추가하여 Feature Flag 정보를 RUM으로 전송합니다.

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Feature Flag가 평가될 때마다 다음 함수를 추가하여 Feature Flag 정보를 RUM으로 전송합니다.

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Feature Flag가 평가될 때마다 다음 함수를 추가하여 Feature Flag 정보를 RUM으로 전송합니다.

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Feature Flag가 평가될 때마다 다음 함수를 추가하여 Feature Flag 정보를 RUM으로 전송합니다.

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Feature Flag가 평가될 때마다 다음 함수를 추가하여 Feature Flag 정보를 RUM으로 전송합니다.

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### DevCycle 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

DevCycle SDK를 초기화하고, `variableEvaluated` 이벤트를 구독합니다. 모든 변수 평가를 구독하려면 `variableEvaluated:*`를 선택하고, 특정 변수 평가만 구독하려면 `variableEvaluated:myvariablekey`를 선택합니다.

DevCycle SDK 초기화에 대한 자세한 내용은 [DevCycle JavaScript SDK 설명서][5]를 참조하고 DevCycle 이벤트 시스템에 대한 자세한 내용은 [DevCycle SDK이벤트 설명서][6]를 참조하세요.

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


[5]: https://docs.devcycle.com/sdk/clientsidesdks/javascript/javascriptinstall
[6]: https://docs.devcycle.com/sdk/clientsidesdks/javascript/javascriptusage#subscribingtosdkevents
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [DevCycle][1]에 티켓을 생성하세요.

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "Android" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [DevCycle][1]에 티켓을 생성하세요.

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [DevCycle][1]에 티켓을 생성하세요.

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [DevCycle][1]에 티켓을 생성하세요.

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{< /tabs >}}

### Eppo 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo SDK를 초기화하고 Feature Flag 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo SDK 초기화에 대한 자세한 내용은 [Eppo JavaScript SDK 설명서][1]를 참조하세요.

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

[1]: https://docs.geteppo.com/sdks/clientsdks/javascript
{{% /tab %}}
{{% tab "iOS" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo SDK를 초기화하고 Feature Flag 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo SDK 초기화에 대한 자세한 내용은 [Eppo iOS SDK 설명서][1]를 참조하세요.

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/clientsdks/ios

{{% /tab %}}
{{% tab "Android" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo SDK를 초기화하고 Feature Flag 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo SDK 초기화에 대한 자세한 내용은 [Eppo Adnroid SDK 설명서][1]를 참조하세요.

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


[1]: https://docs.geteppo.com/sdks/clientsdks/android

{{% /tab %}}
{{% tab "Flutter" %}}

Eppo는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 [Eppo에 문의][1]하세요.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

아래 표시된 코드 스니펫을 사용하여 Eppo SDK를 초기화하고 Feature Flag 평가를 Datadog 에 추가로 보고하는 할당 로거를 생성합니다.

Eppo SDK 초기화에 대한 자세한 내용은 [Eppo의 React Native SDK 설명서][1]를 참조하세요.

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

[1]: https://docs.geteppo.com/sdks/clientsdks/reactnative

{{% /tab %}}
{{< /tabs >}}

### Flagsmith 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

아래 표시된 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 `datadogRum` 옵션으로 Flagsmith의 SDK를 초기화합니다.

   선택적으로, 클라이언트를 구성하여 Flagsmith 특성을 `datadogRum.setUser()`를 통해 Datadog으로 전송할 수 있습니다. Flagsmith의 SDK 초기화에 대한 자세한 내용은 [Flagsmith의 JavaScript SDK 설명서][1]를 참조하세요.

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

Flagsmith는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith에 티켓을 생성하세요.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith에 티켓을 생성하세요.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith에 티켓을 생성하세요.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith는 현재 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 Flagsmith에 티켓을 생성하세요.

{{% /tab %}}
{{< /tabs >}}

### GrowthBook 통합

{{< tabs >}}
{{% tab "브라우저" %}}

GrowthBook SDK 초기화 시 `onFeatureUsage` 콜백을 사용하여 Datadog에 Feature Flag 평가를 보고하세요.

GrowthBook SDK 초기화에 대한 자세한 내용은 [GrowthBook JavaScript SDK 설명서][1]를 참조하세요.

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/js#step1configureyourapp

{{% /tab %}}
{{% tab "iOS" %}}

GrowthBook은 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 GrowthBook에 문의하세요.

{{% /tab %}}
{{% tab "Android" %}}

GrowthBook SDK 초기화 시 `setFeatureUsageCallback`을 호출하여 Datadog에 Feature Flag 평가를 보고하세요.

GrowthBook SDK 초기화에 대한 자세한 내용은 [GrowthBook Adnroid SDK 설명서][1]를 참조하세요.

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

[1]: https://docs.growthbook.io/lib/kotlin#quickusage

{{% /tab %}}
{{% tab "Flutter" %}}

GrowthBook SDK 초기화 시 `setFeatureUsageCallback`을 호출하여 Datadog에 Feature Flag 평가를 보고하세요.

GrowthBook SDK 초기화에 대한 자세한 내용은 [GrowthBook Flutter SDK 설명서][1]를 참조하세요.

```dart
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
```

[1]: https://docs.growthbook.io/lib/flutter#quickusage

{{% /tab %}}
{{% tab "React Native" %}}

GrowthBook SDK 초기화 시 `onFeatureUsage` 콜백을 사용하여 Datadog에 Feature Flag 평가를 보고하세요.

GrowthBook SDK 초기화에 대한 자세한 내용은 [GrowthBook Ract Native SDK 설명서][1]를 참조하세요.

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/reactnative#step1configureyourapp

{{% /tab %}}
{{< /tabs >}}

### Kameleoon 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

Kameleoon SDK를 생성 및 초기화한 후, `onEvent` 핸들러로 `Evaluation` 이벤트를 구독합니다.

SDK에 대한 자세한 내용은 [Kameleoon JavaScript SDK 설명서][1]를 참조하세요.

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/jssdk
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

Kameleoon SDK를 생성 및 초기화한 후, `onEvent` 핸들러로 `Evaluation` 이벤트를 구독합니다.

SDK 초기화에 대한 자세한 내용은 [Kameleoon React Native SDK 설명서][1]를 참조하세요.

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/reactjssdk
{{% /tab %}}
{{< /tabs >}}

### LaunchDarkly 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

LaunchDarkly SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

 LaunchDarkly SDK 초기화에 대한 자세한 내용은 [LaunchDarkly JavaScript SDK 설명서][1]를 참조하세요.

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


[1]: https://docs.launchdarkly.com/sdk/clientside/javascript#initializingtheclient
{{% /tab %}}
{{% tab "iOS" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly에 티켓을 제출하세요.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly에 티켓을 제출하세요.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly에 티켓을 제출하세요.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly는 현재 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 LaunchDarkly에 티켓을 제출하세요.


{{% /tab %}}
{{< /tabs >}}


### Split 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

Split SDK를 초기화하고 다음 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 노출 리스너를 생성합니다.

Split SDK 초기화에 대한 자세한 내용은 Split [JavaScript SDK 설명서][1]를 참조하세요.

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


[1]: https://help.split.io/hc/enus/articles/360020448791JavaScriptSDK#2instantiatethesdkandcreateanewsplitclient
{{% /tab %}}
{{% tab "iOS" %}}

Split SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

Split SDK 초기화에 대한 자세한 내용은 Split [iOS SDK 설명서][1]를 참조하세요.

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


[1]: https://help.split.io/hc/enus/articles/360020401491iOSSDK
{{% /tab %}}
{{% tab "Android" %}}

Split SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

Split SDK 초기화에 대한 자세한 내용은 Split [Adnroid SDK 설명서][1]를 참조하세요.

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


[1]: https://help.split.io/hc/enus/articles/360020343291AndroidSDK
{{% /tab %}}
{{% tab "Flutter" %}}

Split SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 인스펙터를 만듭니다.

Split SDK 초기화에 대한 자세한 내용은 Split의 [Flutter 플러그인 설명서][1]를 참조하세요.

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


[1]: https://help.split.io/hc/enus/articles/8096158017165Flutterplugin
{{% /tab %}}
{{% tab "React Native" %}}

Split SDK를 초기화하고 다음 코드 스니펫을 사용하여 Datadog에 Feature Flag 평가를 보고하는 노출 리스너를 생성합니다.

Split SDK 초기화에 대한 자세한 내용은 Split [React Native SDK 설명서][1]를 참조하세요.

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


[1]: https://help.split.io/hc/enus/articles/4406066357901ReactNativeSDK#2instantiatethesdkandcreateanewsplitclient
{{% /tab %}}
{{< /tabs >}}

### Statsig 통합

이 Feature Flag 통합을 초기화하기 전에 [RUM 모니터링 설정](#set-up-rum-monitoring)을 완료했는지 확인하세요.

{{< tabs >}}
{{% tab "브라우저" %}}

Statsig의 SDK를 `statsig.initialize`로 초기화합니다.

1. Browser RUM SDK 버전을 4.25.0 이상으로 업데이트합니다.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`로 구성합니다.
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

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com에 문의하세요.

{{% /tab %}}
{{% tab "Android" %}}

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com에 문의하세요.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig는 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com에 문의하세요.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig는 현재 이 통합을 지원하지 않습니다. 이 기능을 요청하려면 support@statsig.com에 문의하세요.

{{% /tab %}}
{{< /tabs >}}

### 다음 단계

Feature Flag를 [조회하고 분석][1]하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/feature_flag_tracking/using_feature_flags