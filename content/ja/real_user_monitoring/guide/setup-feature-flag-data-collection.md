---
aliases:
- /ja/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: RUM をセットアップして機能フラグデータをキャプチャし、Datadog でパフォーマンスを分析する方法をご紹介します。
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: ドキュメント
  text: 機能フラグ追跡で機能フラグデータを分析する
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: RUM エクスプローラーで RUM データを視覚化する
title: RUM の機能フラグデータの概要
---

## 概要
機能フラグデータにより、どのユーザーに特定の機能が表示されているか、導入した変更がユーザー体験に影響を与えているか、パフォーマンスに悪影響を与えているかを判断できるため、ユーザー体験やパフォーマンス監視の可視性が高まります。

RUM データを機能フラグデータでリッチ化することにより、意図せずにバグやパフォーマンスの低下を引き起こすことなく、その機能が正常に起動することを確信することができます。この追加的な洞察により、機能のリリースとパフォーマンスを関連付け、問題を特定のリリースにピンポイントで特定し、より迅速にトラブルシューティングを行うことができます。

## セットアップ

{{< tabs >}}
{{% tab "ブラウザ" %}}

機能フラグの追跡は、RUM ブラウザ SDK で利用可能です。開始するには、[RUM ブラウザモニタリング][1]をセットアップします。ブラウザ RUM SDK バージョン >= 4.25.0 が必要です。

<details>
  <summary><code>v5.17.0</code> より前</summary>

5.17.0 より前のバージョンを使用している場合は、RUM SDK を初期化し、初期化パラメーター `enableExperimentalFeatures` に `["feature_flags"]` を設定して、フィーチャー フラグのデータ収集を開始してください。

{{% collapse-content title="NPM" level="h4" %}}
```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Datadog Browser SDK を初期化します
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

[1]: /ja/real_user_monitoring/browser/setup/
{{% /tab %}}
{{% tab "Android" %}}

機能フラグの追跡は、RUM Android SDK で利用可能です。開始するには、[RUM Android モニタリング][1]をセットアップします。Android RUM SDK バージョン 1.18.0 以上が必要です。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

機能フラグの追跡は、Flutter アプリケーションで利用可能です。開始するには、[RUM Flutter モニタリング][1]をセットアップします。Flutter プラグインバージョン 1.3.2 以上が必要です。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

機能フラグの追跡は、RUM iOS SDK で利用可能です。開始するには、[RUM iOS モニタリング][1]をセットアップします。iOS RUM SDK バージョン 1.16.0 以上が必要です。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

フィーチャー フラグのトラッキングは Kotlin Multiplatform アプリケーションで利用できます。開始するには、[RUM Kotlin Multiplatform 監視][1] をセットアップしてください。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "React Native" %}}

機能フラグ追跡は、React Native アプリケーションで利用可能です。まずは、[RUM React Native モニタリング][1]をセットアップしてください。React Native RUM SDK のバージョン >= 1.7.0 が必要です。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unity" %}}

フィーチャー フラグのトラッキングは Unity アプリケーションで利用できます。開始するには、[RUM Unity 監視][1] をセットアップしてください。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/unity/setup
{{% /tab %}}
{{< /tabs >}}

## インテグレーション

機能フラグデータの収集は、[カスタム機能フラグ管理ソリューション](#custom-feature-flag-management)、または Datadog のインテグレーションパートナーのいずれかを使用して開始することができます。

Datadog は、以下とのインテグレーションをサポートしています。
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Amplitude インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Amplitude の SDK を初期化し、以下のコード スニペットを使用して、フィーチャー フラグの評価を Datadog にレポートするエクスポージャー リスナーを作成します:

Amplitude の SDK の初期化については、[Amplitude の JavaScript SDK ドキュメント][1]を参照してください。

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Amplitude がエクスポージャーを報告したときにフィーチャー フラグを送信します
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Amplitude の SDK を初期化し、以下のコード スニペットを使用して、フィーチャー フラグの評価を Datadog にレポートするインスペクターを作成します。

Amplitude の SDK の初期化についての詳細は、Amplitude の [iOS SDK ドキュメント][1] を参照してください。

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Amplitude がエクスポージャーを報告したときにフィーチャー フラグを送信します
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // 初期化時:
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Amplitude の SDK を初期化し、以下のコード スニペットを使用して、フィーチャー フラグの評価を Datadog にレポートするインスペクターを作成します。

Amplitude の SDK の初期化についての詳細は、Amplitude の [Android SDK ドキュメント][1] を参照してください。

```kotlin
  internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    override fun track(exposure: Exposure) {
        // Amplitude で露出が報告された際に機能フラグを送信します
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            exposure.flagKey,
            exposure.variant.orEmpty()
        )
    }
  }

  // 初期化時:
  val config = ExperimentConfig.Builder()
      .exposureTrackingProvider(DatadogExposureTrackingProvider())
      .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude はこのインテグレーションをサポートしていません。この機能をリクエストするには Amplitude にサポート チケットを作成してください。


{{% /tab %}}
{{< /tabs >}}

### ConfigCat インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

ConfigCat JavaScript SDK を初期化する際は、イベント `flagEvaluated` を購読し、フィーチャー フラグの評価を Datadog にレポートします:

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

ConfigCat JavaScript SDK の初期化の詳細は、ConfigCat の [JavaScript SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

ConfigCat Swift iOS SDK を初期化する際は、イベント `flagEvaluated` を購読し、フィーチャー フラグの評価を Datadog にレポートします:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

ConfigCat Swift (iOS) SDK の初期化の詳細は、ConfigCat の [Swift iOS SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

ConfigCat Android SDK を初期化する際は、イベント `flagEvaluated` を購読し、フィーチャー フラグの評価を Datadog にレポートします:

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

ConfigCat Android SDK の初期化の詳細は、ConfigCat の [Android SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

ConfigCat Dart SDK を初期化する際は、イベント `flagEvaluated` を購読し、フィーチャー フラグの評価を Datadog にレポートします:

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

ConfigCat Dart (Flutter) SDK の初期化の詳細は、ConfigCat の [Dart SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

ConfigCat React SDK を初期化する際は、イベント `flagEvaluated` を購読し、フィーチャー フラグの評価を Datadog にレポートします:

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

ConfigCat React SDK の初期化の詳細は、ConfigCat の [React SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### カスタム機能フラグ管理

{{< tabs >}}
{{% tab "ブラウザ" %}}

機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

機能フラグが評価されるたびに、以下の関数を追加して、機能フラグの情報を RUM に送信します。

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### DevCycle インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

DevCycle の SDK を初期化し、`variableEvaluated` イベントを購読します。すべての変数評価に対して購読する場合は `variableEvaluated:*`、特定の変数評価に対して購読する場合は `variableEvaluated:my-variable-key` を選択します。

DevCycle の SDK の初期化の詳細は [DevCycle の JavaScript SDK ドキュメント][5] を、DevCycle のイベント システムの詳細は [DevCycle の SDK イベント ドキュメント][6] を参照してください。

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions);
...
dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        // すべての変数評価を追跡します
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        // 特定の変数評価を追跡します
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするには DevCycle にサポート チケットを作成してください。


{{% /tab %}}
{{% tab "Android" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするには DevCycle にサポート チケットを作成してください。


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするには DevCycle にサポート チケットを作成してください。


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするには DevCycle にサポート チケットを作成してください。


{{% /tab %}}
{{< /tabs >}}

### Eppo インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Eppo の SDK を初期化し、下記のコード スニペットを使用して、フィーチャー フラグの評価を Datadog に追加でレポートするアサインメント ロガーを作成します。

Eppo の SDK の初期化の詳細は、[Eppo の JavaScript SDK ドキュメント][1] を参照してください。

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

Eppo の SDK を初期化し、下記のコード スニペットを使用して、フィーチャー フラグの評価を Datadog に追加でレポートするアサインメント ロガーを作成します。

Eppo の SDK の初期化の詳細は、[Eppo の iOS SDK ドキュメント][1] を参照してください。

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Eppo の SDK を初期化し、下記のコード スニペットを使用して、フィーチャー フラグの評価を Datadog に追加でレポートするアサインメント ロガーを作成します。

Eppo の SDK の初期化の詳細は、[Eppo の Android SDK ドキュメント][1] を参照してください。

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

Eppo はこのインテグレーションをサポートしていません。この機能をリクエストするには、[Eppo に問い合わせてください][1]。

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Eppo の SDK を初期化し、下記のコード スニペットを使用して、フィーチャー フラグの評価を Datadog に追加でレポートするアサインメント ロガーを作成します。

Eppo の SDK の初期化の詳細は、[Eppo の React Native SDK ドキュメント][1] を参照してください。

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

### Flagsmith インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に機能フラグの評価を報告することができるようになります。

 オプションとして、`datadogRum.setUser()` を介して Flagsmith の Trait が Datadog に送信されるようにクライアントを構成することができます。Flagsmith の SDK の初期化についての詳細は、[Flagsmith の JavaScript SDK ドキュメント][1]を参照してください。

   ```javascript
    // Flagsmith SDK を初期化します
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

Flagsmith はこのインテグレーションをサポートしていません。この機能をリクエストするには Flagsmith にチケットを作成してください。


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith はこのインテグレーションをサポートしていません。この機能をリクエストするには Flagsmith にチケットを作成してください。

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith はこのインテグレーションをサポートしていません。この機能をリクエストするには Flagsmith にチケットを作成してください。

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith は現在、このインテグレーションをサポートしていません。この機能をリクエストするには、Flagsmith でチケットを作成してください。

{{% /tab %}}
{{< /tabs >}}

### GrowthBook インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

GrowthBook SDK を初期化する際は、`onFeatureUsage` コールバックを使用して、フィーチャー フラグの評価を Datadog にレポートします。

GrowthBook の SDK の初期化の詳細は、[GrowthBook の JavaScript SDK ドキュメント][1] を参照してください。

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

GrowthBook はこのインテグレーションをサポートしていません。この機能をリクエストするには GrowthBook に連絡してください。

{{% /tab %}}
{{% tab "Android" %}}

GrowthBook SDK を初期化する際は、`setFeatureUsageCallback` を呼び出して、フィーチャー フラグの評価を Datadog にレポートします。

GrowthBook の SDK の初期化の詳細は、[GrowthBook の Android SDK ドキュメント][1] を参照してください。

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

GrowthBook SDK を初期化する際は、`setFeatureUsageCallback` を呼び出して、フィーチャー フラグの評価を Datadog にレポートします。

GrowthBook の SDK の初期化の詳細は、[GrowthBook の Flutter SDK ドキュメント][1] を参照してください。

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

GrowthBook SDK を初期化する際は、`onFeatureUsage` コールバックを使用して、フィーチャー フラグの評価を Datadog にレポートします。

GrowthBook の SDK の初期化の詳細は、[GrowthBook の React Native SDK ドキュメント][1] を参照してください。

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

### Kameleoon インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Kameleoon SDK を作成して初期化した後、`onEvent` ハンドラーを使用して `Evaluation` イベントを購読します。

SDK の詳細は、[Kameleoon JavaScript SDK ドキュメント][1] を参照してください。

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon はこのインテグレーションをサポートしていません。この機能をリクエストするには、product@kameleoon.com に連絡してください。

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon はこのインテグレーションをサポートしていません。この機能をリクエストするには、product@kameleoon.com に連絡してください。


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon はこのインテグレーションをサポートしていません。この機能をリクエストするには、product@kameleoon.com に連絡してください。


{{% /tab %}}
{{% tab "React Native" %}}

Kameleoon SDK を作成して初期化した後、`onEvent` ハンドラーを使用して `Evaluation` イベントを購読します。

SDK の初期化については [Kameleoon React Native SDK ドキュメント][1] を参照してください。

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}


### LaunchDarkly インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

LaunchDarkly の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に機能フラグの評価を報告するインスペクターを作成します。

LaunchDarkly の SDK の初期化については、[LaunchDarkly の JavaScript SDK ドキュメント][1]を参照してください。

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

LaunchDarkly はこのインテグレーションをサポートしていません。この機能をリクエストするには LaunchDarkly にチケットを作成してください。


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly はこのインテグレーションをサポートしていません。この機能をリクエストするには LaunchDarkly にチケットを作成してください。


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly はこのインテグレーションをサポートしていません。この機能をリクエストするには LaunchDarkly にチケットを作成してください。


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly は現在、このインテグレーションをサポートしていません。この機能をリクエストするには、LaunchDarkly でチケットを作成してください。


{{% /tab %}}
{{< /tabs >}}


### Split インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Split の SDK を初期化し、以下のコード スニペットを使用して、フィーチャー フラグの評価を Datadog にレポートするインプレッション リスナーを作成します:

Split の SDK の初期化については、[Split の JavaScript SDK ドキュメント][1]を参照してください。

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

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に機能フラグの評価を報告するインスペクターを作成します。

Split の SDK の初期化については、[Split の iOS SDK ドキュメント][1]を参照してください。

```swift
  let config = SplitClientConfig()
  // Split がインプレッションを報告したときにフィーチャー フラグを送信します
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

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に機能フラグの評価を報告するインスペクターを作成します。

Split の SDK の初期化については、[Split の Android SDK ドキュメント][1]を参照してください。

```kotlin
  internal class DatadogSplitImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Split でインフレが報告された際に機能フラグを送信
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            impression.split(),
            impression.treatment()
        )
    }
    override fun close() {
    }
  }

  // 初期化時:
  val apikey = BuildConfig.SPLIT_API_KEY
  val config = SplitClientConfig.builder()
      .impressionListener(DatadogSplitImpressionListener())
      .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{% tab "Flutter" %}}

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に機能フラグの評価を報告するインスペクターを作成します。

Split の SDK の初期化についての詳細は、Split の [Flutter プラグイン ドキュメント][1] を参照してください。

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Split がインプレッションを報告したときにフィーチャー フラグを送信します
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

Split の SDK を初期化し、以下のコード スニペットを使用して、フィーチャー フラグの評価を Datadog にレポートするインプレッション リスナーを作成します:

Split の SDK の初期化については、Split の [React Native SDK ドキュメント][1]を参照してください。

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

### Statsig インテグレーション

{{< tabs >}}
{{% tab "ブラウザ" %}}

Statsig の SDK を `statsig.initialize` で初期化します。

1. ブラウザ RUM SDK バージョン 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Statsig の SDK (`>= v4.34.0`) を初期化し、以下のように `gateEvaluationCallback` オプションを実装します。

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

Statsig はこのインテグレーションをサポートしていません。この機能のリクエストは、support@statsig.com までご連絡ください。

{{% /tab %}}
{{% tab "Android" %}}

Statsig はこのインテグレーションをサポートしていません。この機能のリクエストは、support@statsig.com までご連絡ください。

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig はこのインテグレーションをサポートしていません。この機能のリクエストは、support@statsig.com までご連絡ください。

{{% /tab %}}
{{% tab "React Native" %}}

Statsig は現在このインテグレーションをサポートしていません。この機能のリクエストは、support@statsig.com までご連絡ください。

{{% /tab %}}
{{< /tabs >}}

## RUM で機能フラグのパフォーマンスを分析する

機能フラグは、RUM のセッション、ビュー、およびエラーのコンテキストにリストとして表示されます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="RUM エクスプローラーの属性の機能フラグリスト" style="width:75%;">}}

### RUM エクスプローラーを使用した機能フラグの検索
[RUM エクスプローラー][2]で RUM が収集したすべてのデータを検索し、機能フラグの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][3]や[モニター][4]にエクスポートしたりすることが可能です。RUM エクスプローラーでは、`@feature_flags.{flag_name}` 属性でセッション、ビュー、またはエラーを検索することができます。

#### セッション
**Sessions** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価されたすべてのセッションを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのセッション検索" style="width:75%;">}}

#### ビュー
**Views** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価された特定のビューを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのビュー検索" style="width:75%;">}}

#### エラー
**Errors** を `@feature_flags.{flag_name}` 属性でフィルタリングすると、指定した時間枠で機能フラグが評価されたビューで発生したすべてのエラーを見つけることができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="RUM エクスプローラーでの機能フラグのエラー検索" style="width:75%;">}}

## トラブルシューティング

### フィーチャー フラグのデータが期待どおりに反映されません
機能フラグは、それが評価されるイベントのコンテキストに表示されます。つまり、機能フラグのコードロジックが実行されるビューに表示されるはずです。

コードの構成や機能フラグの設定によっては、予期せぬ機能フラグがイベントのコンテキストに表示されることがあります。

例えば、機能フラグがどの**ビュー**で評価されているかを確認するには、RUM エクスプローラーを使用して同様のクエリを行うことができます。

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="RUM エクスプローラーでの機能フラグのビュー検索" style="width:75%;">}}

機能フラグが無関係なビューで評価されている理由の例をいくつか紹介しますので、調査の参考にしてください。

- 実行されるたびに機能フラグを評価する、複数のページに表示される共通のリアクトコンポーネント。
- 機能フラグを評価したコンポーネントが、URL の変更前/変更後にレンダリングされるルーティングの問題。

調査を行う際、機能フラグに関連する `View Name` のデータをスコープすることも可能です。


## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/dashboards/
[4]: /ja/monitors/#create-monitors
[5]: /ja/real_user_monitoring/feature_flag_tracking