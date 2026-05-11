---
aliases:
- /ja/real_user_monitoring/guide/getting-started-feature-flags/
- /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: RUM をセットアップして Feature Flag データをキャプチャし、Datadog でパフォーマンスを分析する方法をご紹介します。
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: RUM エクスプローラーについて
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Datadog RUM の Feature Flag Tracking によるリリースの安全性の確保
title: Feature Flag Tracking の設定
---
Feature Flag データは、ユーザーエクスペリエンスおよびパフォーマンスモニタリングへの可視性を向上させます。これにより、特定の機能がどのユーザーに表示されているかを判断し、導入された変更がユーザーエクスペリエンスに影響を与えているか、パフォーマンスに悪影響を及ぼしているかを評価できます。

Feature Flag データで RUM データを強化することで、バグやパフォーマンス回帰を意図せず引き起こすことなく、機能が正しくリリースされることができます。この追加のインサイトにより、機能リリースとパフォーマンスを相関させ、特定のリリースに問題を絞り込み、迅速にトラブルシューティングできます。

##RUM モニタリングの設定

Feature Flag Trackingは、RUM Browser、iOS、Android、Flutter、React Native SDK で利用可能です。

{{< tabs >}}
{{% tab "Browser" %}}

Browser SDK の Feature Flag データ収集を有効にするには、以下の手順に従います。

1. [RUM Browser Monitoring][1] を設定します。Browser RUM SDK バージョンは 4.25.0 以降である必要があります。

2. RUM SDK を初期化し、`enableExperimentalFeatures` 初期化パラメーターに`["feature_flags"]` を設定します。

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
     <summary>CDN 非同期</summary>

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
     <summary>CDN 同期</summary>

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

[1]: /ja/real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

iOS アプリケーションで Feature Flag データの収集を有効にするには、以下の手順に従います。

1. [RUM iOS Monitoring][1] を設定します。iOS RUM SDK バージョンは 1.16.0 以降である必要があります。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Android アプリケーションで Feature Flag データの収集を有効にするには、以下の手順に従います。

1. [RUM Android Monitoring][1] を設定します。Android RUM SDK バージョンは 1.18.0 以降である必要があります。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Flutter アプリケーションで Feature Flag データの収集を有効にするには、以下の手順に従います。

1. [RUM Flutter Monitoring][1] を設定します。Flutter プラグインのバージョンは 1.3.2 以降である必要があります。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

React Native アプリケーションで Feature Flag データ収集を有効にするには、以下の手順に従います。

1. [RUM React Native Monitoring][1] を設定します。React Native RUM SDK のバージョンは 1.7.0 以降である必要があります。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

##Feature Flag インテグレーションの設定

[カスタム Feature Flag 管理ソリューション](#customfeatureflagmanagement) を使用するか、以下に示す Datadog のインテグレーションパートナーのいずれかを使用して Feature Flag データの収集を開始できます。

<div class="alert alert-danger">

**注意**: Feature Flag Tracking には次の特殊文字はサポートされていません: `.`、`:`、`+`、``、`=`、`&amp;&amp;`、`||`、`>`、`&lt;`、`!`、`(`、`)`、`{`、`}`、`[`、`]`、`^`、`"`、`“`、`”`、`~`、`*`、`?`、`\`。Datadog は、可能な限りこれらの文字を Feature Flag 名に使用しないことを推奨します。これらの文字のいずれかを使用する必要がある場合は、データを Datadog に送信する前にその文字を置き換えてください。たとえば、以下のとおりです。

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

### Amplitude インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Amplitude の SDK を初期化し、次のコードスニペットを使用して Datadog に Feature Flag の評価を報告するエクスポージャリスナーを作成します。

Amplitude の SDK の初期化については、[Amplitude の JavaScript SDK ドキュメント][1] を参照してください。

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

Amplitude の SDK を初期化し、以下に示すコードスニペットを使用して、インスペクターで Feature Flag の評価を Datadog にレポートする機能を作成します。

Amplitude の SDK の初期化については、[Amplitude の iOS SDK ドキュメント][1] を参照してください。

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

Amplitude の SDK を初期化し、以下に示すコードスニペットを使用して、インスペクターで Feature Flag の評価を Datadog にレポートする機能を作成します。

Amplitude の SDK の初期化については、[Amplitude の Android SDK ドキュメント][1] を参照してください。

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

Amplitude はこのインテグレーションをサポートしていません。Amplitude にチケットを作成して、この機能をリクエストしてください。


{{% /tab %}}
{{< /tabs >}}

###ConfigCat インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

ConfigCat JavaScript SDK を初期化する際は、`flagEvaluated` イベントにサブスクライブし、Datadog に Feature Flag の評価を報告してください。

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

ConfigCat JavaScript SDK の初期化については、[ConfigCat の JavaScript SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdkreference/js


{{% /tab %}}
{{% tab "iOS" %}}

ConfigCat Swift iOS SDK を初期化する際は、`flagEvaluated` イベントにサブスクライブし、Datadog に Feature Flag の評価を報告してください。

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

ConfigCat Swift (iOS) SDK の初期化については、[ConfigCat の Swift iOS SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdkreference/ios


{{% /tab %}}
{{% tab "Android" %}}

ConfigCat Android SDK を初期化する際は、`flagEvaluated` イベントにサブスクライブし、Datadog に Feature Flag の評価を報告してください。

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

ConfigCat Android SDK の初期化については、[ConfigCat の Android SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdkreference/android


{{% /tab %}}
{{% tab "Flutter" %}}

ConfigCat Dart SDK を初期化する際は、`flagEvaluated` イベントにサブスクライブし、Datadog に Feature Flag の評価を報告してください。

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

ConfigCat Dart (Flutter) SDK の初期化については、[ConfigCat の Dart SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdkreference/dart


{{% /tab %}}


{{% tab "React Native" %}}

ConfigCat React SDK を初期化する際は、`flagEvaluated` イベントに登録し、Feature Flag の評価を Datadog に報告してください。

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

ConfigCat React SDK の初期化についての詳細は、ConfigCat の [React SDK ドキュメント][1] を参照してください。

[1]: https://configcat.com/docs/sdkreference/react

{{% /tab %}}
{{< /tabs >}}

###カスタム Feature Flag 管理

カスタム Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Feature Flag が評価されるたびに、以下の関数を追加して、Feature Flag の情報を RUM に送信します。

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Feature Flag が評価されるたびに、以下の関数を追加して、Feature Flag の情報を RUM に送信します。

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Feature Flag が評価されるたびに、以下の関数を追加して、Feature Flag の情報を RUM に送信します。

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Feature Flag が評価されるたびに、以下の関数を追加して、Feature Flag の情報を RUM に送信します。

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Feature Flag が評価されるたびに、以下の関数を追加して、Feature Flag の情報を RUM に送信します。

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### DevCycle インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

DevCycle の SDK を初期化し、`variableEvaluated` イベントに登録します。すべての変数評価 `variableEvaluated:*` に登録することも、特定の変数評価 `variableEvaluated:myvariablekey` に登録することもできます。

DevCycle の SDK の初期化についての詳細は、[DevCycle の JavaScript SDK ドキュメント][5] を参照し、DevCycle のイベントシステムについての詳細は、[DevCycle の SDK イベントドキュメント][6] を参照してください。

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

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするために、[DevCycle][1] にチケットを作成してください。

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "Android" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするために、[DevCycle][1] にチケットを作成してください。

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするために、[DevCycle][1] にチケットを作成してください。

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle はこのインテグレーションをサポートしていません。この機能をリクエストするために、[DevCycle][1] にチケットを作成してください。

[1]: https://devcycle.com/contact/requestsupport

{{% /tab %}}
{{< /tabs >}}

### Eppo インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Eppo の SDK を初期化し、以下に示すコードスニペットを使用して、Feature Flag の評価を Datadog に報告する追加のアサインメントロガーを作成します。

Eppo の SDK の初期化についての詳細は、[Eppo の JavaScript SDK ドキュメント][1] を参照してください。

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

Eppo の SDK を初期化し、以下に示すコードスニペットを使用して、Feature Flag の評価を Datadog に報告する追加のアサインメントロガーを作成します。

Eppo の SDK の初期化についての詳細は、[Eppo の iOS SDK ドキュメント][1] を参照してください。

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/clientsdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Eppo の SDK を初期化し、以下に示すコードスニペットを使用して、Feature Flag の評価を Datadog に報告する追加のアサインメントロガーを作成します。

Eppo の SDK の初期化についての詳細は、[Eppo の Android SDK ドキュメント][1] を参照してください。

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

Eppo はこのインテグレーションをサポートしていません。この機能をリクエストするには、[Eppo にお問い合わせください][1]。

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Eppo の SDK を初期化し、以下に示すコードスニペットを使用して、Feature Flag の評価を Datadog に報告する追加のアサインメントロガーを作成します。

Eppo の SDK の初期化については、[Eppo の React Native SDK ドキュメント][1] を参照してください。

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

###Flagsmith インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に Feature Flag の評価を報告することができるようになります。

   必要に応じて、Flagsmith の特性を `datadogRum.setUser()` を使って Datadog に送信するようにクライアントを構成できます。Flagsmith の SDK の初期化については、[Flagsmith の JavaScript SDK ドキュメント][1] をご確認ください。

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

Flagsmith はこのインテグレーションをサポートしていません。Flagsmith にチケットを作成してこの機能をリクエストしてください。


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith はこのインテグレーションをサポートしていません。Flagsmith にチケットを作成してこの機能をリクエストしてください。

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith はこのインテグレーションをサポートしていません。Flagsmith にチケットを作成してこの機能をリクエストしてください。

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith は現在このインテグレーションをサポートしていません。Flagsmith にチケットを作成してこの機能をリクエストしてください。

{{% /tab %}}
{{< /tabs >}}

###GrowthBook インテグレーション

{{< tabs >}}
{{% tab "Browser" %}}

GrowthBook SDK を初期化する際には、`onFeatureUsage` コールバックを使用して Datadog に Feature Flag の評価を報告します。

GrowthBook の SDK の初期化については、[GrowthBook の JavaScript SDK ドキュメント][1] を参照してください。

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

GrowthBook はこのインテグレーションをサポートしていません。この機能をリクエストするには、GrowthBook にお問い合わせください。

{{% /tab %}}
{{% tab "Android" %}}

GrowthBook SDK を初期化する際は、`setFeatureUsageCallback` を呼び出して、Datadog に Feature Flag の評価を報告してください。

GrowthBook の SDK の初期化については、[GrowthBook の Android SDK ドキュメント][1] を参照してください。

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

GrowthBook SDK を初期化する際は、`setFeatureUsageCallback` を呼び出して、Datadog に Feature Flag の評価を報告してください。

GrowthBook の SDK の初期化については、[GrowthBook の Flutter SDK ドキュメント][1] を参照してください。

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

GrowthBook SDK を初期化する際には、`onFeatureUsage` コールバックを使用して Datadog に Feature Flag の評価を報告します。

GrowthBook の SDK の初期化については、[GrowthBook の React Native SDK ドキュメント][1] を参照してください。

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

###Kameleoon インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Kameleoon SDK を作成して初期化した後、`Evaluation` イベントに `onEvent` ハンドラーを使用してサブスクライブしてください。

SDK に関する詳細は、[Kameleoon JavaScript SDK ドキュメント][1] を参照してください。

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/jssdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon はこのインテグレーションをサポートしていません。product@kameleoon.com に連絡して、この機能をリクエストしてください。

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon はこのインテグレーションをサポートしていません。product@kameleoon.com に連絡して、この機能をリクエストしてください。

{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon はこのインテグレーションをサポートしていません。product@kameleoon.com に連絡して、この機能をリクエストしてください。

{{% /tab %}}
{{% tab "React Native" %}}

Kameleoon SDK を作成して初期化した後、`Evaluation` イベントに `onEvent` ハンドラーを使用してサブスクライブしてください。

[Kameleoon React Native SDK ドキュメント][1] に SDK の初期化の詳細が書かれています。

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/reactjssdk
{{% /tab %}}
{{< /tabs >}}

###LaunchDarkly インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

LaunchDarkly の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に Feature Flag の評価を報告するインスペクターを作成します。

 LaunchDarkly の SDK の初期化については、[LaunchDarkly の JavaScript SDK ドキュメント][1] を参照してください。

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

LaunchDarkly はこのインテグレーションをサポートしていません。LaunchDarkly にチケットを作成して、この機能をリクエストしてください。


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly はこのインテグレーションをサポートしていません。LaunchDarkly にチケットを作成して、この機能をリクエストしてください。


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly はこのインテグレーションをサポートしていません。LaunchDarkly にチケットを作成して、この機能をリクエストしてください。


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly は現在このインテグレーションをサポートしていません。LaunchDarkly にチケットを作成して、この機能をリクエストしてください。


{{% /tab %}}
{{< /tabs >}}


###Split インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Split の SDK を初期化し、以下のコードスニペットを使用して、Feature Flag の評価を Datadog に報告するインプレッションリスナーを作成します。

Split の SDK の初期化については、[Split の JavaScript SDK ドキュメント][1] を参照してください。

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

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に Feature Flag の評価を報告するインスペクターを作成します。

Split の SDK の初期化については、[Split の iOS SDK ドキュメント][1] を参照してください。

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

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に Feature Flag の評価を報告するインスペクターを作成します。

Split の SDK の初期化については、[Split の Android SDK ドキュメント][1] を参照してください。

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

Split の SDK を初期化し、以下に示すコードスニペットを使用して、Datadog に Feature Flag の評価を報告するインスペクターを作成します。

Split の SDK の初期化については、[Split の Flutter プラグインドキュメント][1] を参照してください。

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

Split の SDK を初期化し、以下のコードスニペットを使用して、Feature Flag の評価を Datadog に報告するインプレッションリスナーを作成します。

Split の SDK の初期化については、Split の [React Native SDK ドキュメント][1] を参照してください。

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

###Statsig インテグレーション

この Feature Flag インテグレーションを初期化する前に、[RUM Monitoring をセットアップしてください](#setuprummonitoring)。

{{< tabs >}}
{{% tab "Browser" %}}

Statsig の SDK を `statsig.initialize` で初期化します。

1. ブラウザ RUM SDK バージョン 4.25.0 以降に更新します。
2. RUM SDK を初期化し、`enableExperimentalFeatures` 初期化パラメーターを `["feature_flags"]` で構成します。
3. Statsig の SDK (`v4.34.0 以降`) を初期化し、以下のように `gateEvaluationCallback` オプションを実装します。

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

Statsig はこのインテグレーションをサポートしていません。support@statsig.com に連絡してこの機能をリクエストしてください。

{{% /tab %}}
{{% tab "Android" %}}

Statsig はこのインテグレーションをサポートしていません。support@statsig.com に連絡してこの機能をリクエストしてください。

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig はこのインテグレーションをサポートしていません。support@statsig.com に連絡してこの機能をリクエストしてください。

{{% /tab %}}
{{% tab "React Native" %}}

Statsig は現在このインテグレーションをサポートしていません。support@statsig.com に連絡してこの機能をリクエストしてください。

{{% /tab %}}
{{< /tabs >}}

###次のステップ

Feature Flag の [表示と分析][1]。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/feature_flag_tracking/using_feature_flags