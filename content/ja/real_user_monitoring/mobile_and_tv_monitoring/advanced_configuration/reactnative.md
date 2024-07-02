---
title: RUM React Native Advanced Configuration
kind: documentation
description: Learn about advanced configuration options for your React Native setup.
code_lang: reactnative
type: multi-code-lang
code_lang_weight: 40
aliases:
    - /real_user_monitoring/react-native/advanced_configuration/
    - /real_user_monitoring/reactnative/advanced_configuration/
further_reading:
    - link: "https://github.com/DataDog/dd-sdk-reactnative"
      tag: Source Code
      text: Source code for dd-sdk-reactnative
    - link: real_user_monitoring/reactnative/
      tag: Documentation
      text: Learn about React Native monitoring
    - link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
      tag: Documentation
      text: Monitor hybrid React Native applications
---

## Overview

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [React Native RUM setup documentation][2].

## Testing with Jest

Testing apps using `'@datadog/mobile-react-native'` might require completing extra steps, since Native Modules do not exist in testing environments.

Datadog provides mocks for the `'@datadog/mobile-react-native'` package. To use them with [Jest][4], add the following in your Jest setup file:

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

Interaction, error, and resource automated tracking is disabled in your tests if you initialize the SDK with the `DatadogProvider` component.

All SDK methods are mocked by `jest.fn()`, so you can assert that a Datadog SDK method was called:

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

If you use a test runner other than Jest, you need to create the mocks for your test runner.

## Initialization parameters

You can specify the following parameters in your configuration when initializing the SDK:

`clientToken`
: Required<br/>
**Type**: String<br/>
A [Datadog client token][8].

`env`
: Required<br/>
**Type**: String<br/>
The application's environment, for example: prod, pre-prod, and staging. Follows the [tag syntax requirements][15].

`applicationId`
: Required<br/>
**Type**: String<br/>
The RUM application ID.

`trackInteractions`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables automatic collection of user actions.

`trackResources`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of resource events.

`trackErrors`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of React Native crashes.

`site`
: Optional<br/>
**Type**: String<br/>
**Default**: `US1`<br/>
[The Datadog site parameter of your organization][9].

`serviceName`
: Optional<br/>
**Type**: String<br/>
The service name for your application. Follows the [tag syntax requirements][15].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version. For example: 1.2.3, 6c44da20, and 2020.02.13. Follows the [tag syntax requirements][15].

`versionSuffix`
: Optional<br/>
**Type**: String<br/>
Add a suffix to the reported version of the app. Accepted characters are alphanumerics and `_`, `-`, `:`, `.`, `/`. Other special characters are converted to underscores. A dash (`-`) is automatically added between the version and the suffix. Follows the [tag syntax requirements][15].

`trackFrustrations`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true` <br/>
Enables [automatic collection of user frustrations][11]. Only error taps are supported. Implies `trackInteractions: true`.

`nativeCrashReportEnabled`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables crash reporting for native plaforms (iOS, Android).

`sampleRate`
: Optional - **Deprecated**<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
See `sessionSampleRate`.

`sessionSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events.

`resourceTracingSamplingRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
The percentage of requests to trace: `100` for all, `0` for none. For more information, see [Connect RUM and Traces][12].

`verbosity`
: Optional<br/>
**Type**: SdkVerbosity<br/>
**Default**: `undefined`<br/>
Verbosity for internal SDK logging. Set to `SdkVerbosity.DEBUG` to debug your SDK implementation.

`nativeViewTracking`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables native views tracking. Set to `true` if you use a custom navigation system relying on native views.

`nativeInteractionTracking`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables native interaction tracking. Set to `true` if you want to track interactions on native screens.

`firstPartyHosts`
: Optional<br/>
**Type**: List<br/>
**Default**: `[]`<br/>
List of your backends hosts to enable tracing with. For more information, see [Connect RUM and Traces][12].

`telemetrySampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
Telemetry data (such as errors and debug logs) about SDK execution is sent to Datadog in order to detect and solve potential issues. Set this option to `0` to opt out from telemetry collection.

`longTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `0`<br/>
The threshold for javascript long tasks reporting in milliseconds. Setting it to `0` or `false` disables javascript long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

`nativeLongTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `200`<br/>
The threshold for native long tasks reporting in milliseconds. Setting it to `0` or `false` disables javascript long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

`vitalsUpdateFrequency`
: Optional<br/>
**Type**: VitalsUpdateFrequency<br/>
**Default**: `VitalsUpdateFrequency.AVERAGE`<br/>
Sets the preferred frequency for collecting mobile vitals.

`uploadFrequency`
: Optional<br/>
**Type**: UploadFrequency<br/>
**Default**: `UploadFrequency.AVERAGE`<br/>
Sets the preferred frequency for uploading batches of data.

`batchSize`
: Optional<br/>
**Type**: BatchSize<br/>
**Default**: `BatchSize.MEDIUM`<br/>
Defines the Datadog SDK policy when batching data together before uploading it to Datadog servers. Smaller batches mean smaller but more network requests, whereas larger batches mean fewer but larger network requests.

`trackBackgroundEvents`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables tracking of RUM event when no RUM View is active. By default, background events are not tracked. Enabling this feature might increase the number of sessions tracked and impact your billing.

`proxyConfig`
: Optional<br/>
**Type**: ProxyConfiguration<br/>
Optional [proxy configuration][13].

## Manual instrumentation

If automatic instrumentation doesn't suit your needs, you can manually create RUM Events and Logs:

### ログを送信
When you instrument your code to send logs, it can include debug, info, warn, or error details:

```javascript
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});
```

### Manually track RUM Views
To manually track RUM Views, provide a `view key`, `view name`, and `action name` at initialization. Depending on your needs, you can choose one of the following strategies:

```javascript
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//...
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());

// Track RUM Actions manually
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
// Or in case of continuous action
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
// To stop action above
DdRum.stopAction({}, Date.now());
```

### Manually track RUM Errors
You can manually track RUM errors:

```javascript
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());
```

### Manually track RUM Resources
You can manually track RUM resources:

```javascript
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());
```

### Add custom timings
You can add custom timings:

```javascript
DdRum.addTiming('<timing-name>');
```

### Manually send spans
You can send spans manually:

```javascript
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## カスタムグローバル属性の追跡

すべての RUM イベントにユーザー情報をアタッチして、RUM セッションのより詳しい情報を入手することができます。

### ユーザー情報

ユーザー特有の情報については、必要に応じてアプリで以下のコードを使用します（SDK の初期化後）。`id`、`name`、`email` 属性は Datadog に組み込まれていますが、アプリに適したその他の属性を追加できます。

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

ユーザー情報を消去したい場合 (例えば、ユーザーがサインアウトしたとき)、以下のように空のオブジェクトを渡すことで消去できます。

```js
DdSdkReactNative.setUser({});
```

### グローバル属性

また、グローバル属性を維持して A/B テストのコンフィギュレーション、広告キャンペーン元、カートのステータスなど指定したセッションに関する情報を追跡することも可能です。

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## RUM イベントの変更または削除

Datadog に送信される前に RUM イベントの属性を変更したり、イベントを完全に削除したりするには、RUM React Native SDK を構成するときに Event Mappers API を使用します。

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons)
    true, // track XHR resources
    true // track errors
);
config.logEventMapper = (event) => event;
config.errorEventMapper = (event) => event;
config.resourceEventMapper = (event) => event;
config.actionEventMapper = (event) => event;
```

各マッパーは `(T) -> T?` というシグネチャを持つ関数で、 `T` は具象的な RUM イベントの型です。これは、送信される前にイベントの一部を変更したり、イベントを完全に削除したりすることができます。

例えば、RUM のエラー `message` から機密情報を削除するには、カスタム `redacted` 関数を実装して、それを `errorEventMapper` で使用します。

```javascript
config.errorEventMapper = (event) => {
    event.message = redacted(event.message);
    return event;
};
```

エラー、リソース、アクションのマッパーから `null` を返すと、イベントは完全に削除され、Datadog に送信されません。

イベントタイプに応じて、一部の特定のプロパティのみを変更できます。

| イベントタイプ    | 属性キー            | 説明                        |
| ------------- | ------------------------ | ---------------------------------- |
| LogEvent      | `logEvent.message`       | ログのメッセージ。                |
|               | `logEvent.context`       | ログのカスタム属性。      |
| ActionEvent   | `actionEvent.context`    | アクションのカスタム属性。   |
| ErrorEvent    | `errorEvent.message`     | エラーメッセージ。                     |
|               | `errorEvent.source`      | エラーのソース。               |
|               | `errorEvent.stacktrace`  | エラーのスタックトレース。           |
|               | `errorEvent.context`     | エラーのカスタム属性。    |
|               | `errorEvent.timestampMs` | エラーのタイムスタンプ。            |
| ResourceEvent | `resourceEvent.context`  | リソースのカスタム属性。 |

イベントには、追加のコンテキストが含まれます。

| イベントタイプ    | コンテキスト属性キー                            | 説明                                                             |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| LogEvent      | `logEvent.additionalInformation.userInfo`        | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報を格納します。        |
|               | `logEvent.additionalInformation.attributes`      | `DdSdkReactNative.setAttributes` で設定されたグローバル属性を格納します。 |
| ActionEvent   | `actionEvent.actionContext`                      | アクションまたは `undefined` に対応する [GestureResponderEvent][5]。  |
|               | `actionEvent.additionalInformation.userInfo`     | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報を格納します。        |
|               | `actionEvent.additionalInformation.attributes`   | `DdSdkReactNative.setAttributes` で設定されたグローバル属性を格納します。 |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報を格納します。        |
|               | `errorEvent.additionalInformation.attributes`    | `DdSdkReactNative.setAttributes` で設定されたグローバル属性を格納します。 |
| ResourceEvent | `resourceEvent.resourceContext`                  | リソースまたは `undefined` に対応する [XMLHttpRequest][6]。       |
|               | `resourceEvent.additionalInformation.userInfo`   | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報を格納します。        |
|               | `resourceEvent.additionalInformation.attributes` | `DdSdkReactNative.setAttributes` で設定されたグローバル属性を格納します。 |

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
   fun getCurrentSessionId(promise: Promise) {
       datadog.getRumMonitor().getCurrentSessionId {
           promise.resolve(it)
        }
    }
```

## リソースのタイミング

リソースの追跡では、以下のタイミングを提供します。

-   `First Byte`: スケジュール済みのリクエストと応答の最初のバイトの間の時間。ネイティブレベルのリクエスト準備、ネットワークレイテンシー、およびサーバーの応答準備時間が含まれます。
-   `Download`: 応答の受信にかかった時間。

## 非同期での初期化

アプリの起動時に多くのアニメーションが含まれている場合、これらのアニメーション中にコードを実行すると、一部のデバイスでアニメーションが遅延する可能性があります。Datadog React Native SDK for RUM の実行を、現在のアニメーションが全て開始された後に遅延させるには、構成で `initializationMode` を `InitializationMode.ASYNC` に設定します。

```js
import { DatadogProvider, DatadogProviderConfiguration, InitializationMode } from '@datadog/mobile-react-native';

const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);
datadogConfiguration.initializationMode = InitializationMode.ASYNC;

export default function App() {
    return (
        <DatadogProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogProvider>
    );
}
```

これは、React Native の [InteractionManager.runAfterInteractions][3] を使って、アニメーションを遅延させます。

RUM SDK とのすべてのインタラクション (ビュー追跡、アクション、リソース追跡など) は引き続き記録され、100 イベントを上限とするキューに保持されます。

ログは記録されないので、実際の初期化の前に `DdLogs` メソッドを呼び出すとロギングが中断される可能性があります。

Datadog の非同期初期化の設定に問題がある場合は、弊社の[サンプルアプリケーション][7]をご確認ください。

## 初期化の遅延

SDK を初期化する前に待ちたい状況があるかもしれません。例えば、ユーザーのロールに応じて異なる構成を使用したい場合や、サーバーの 1 つから構成を取得する場合などです。

その場合、アプリを最初から自動インスツルメンテーション (ユーザーインタラクション、XHR リソース、エラーを自動的に収集) し、SDK を初期化する前に最大 100 の RUM およびスパンイベントを記録することが可能です。

```js
import { DatadogProvider, DatadogProviderConfiguration } from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // Fetches the configuration from one of your servers
    await DatadogProvider.initialize(configuration);
};

export default function App() {
    useEffect(() => initializeApp(), []);

    return (
        <DatadogProvider configuration={datadogAutoInstrumentation}>
            <Navigation />
        </DatadogProvider>
    );
}
```

構成に次のキーがある場合:

```js
import { ProxyConfig, SdkVerbosity, TrackingConsent } from '@datadog/mobile-react-native';

const configuration = {
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENVIRONMENT_NAME>',
    applicationId: '<RUM_APPLICATION_ID>',
    sessionSamplingRate: 80, // オプション: RUM セッションのサンプル (ここでは、セッションの 80% が Datadog に送信されます)。デフォルト = 100%
    site: 'US1', // オプション: Datadog サイトを指定します。デフォルト = 'US1'
    verbosity: SdkVerbosity.WARN, // オプション: SDK が内部ログを出力するようにします (指定されたレベル以上)。デフォルト = undefined (ログを出力しない)
    serviceName: 'com.myapp', // オプション: 報告されたサービス名を設定します。デフォルト = Android / iOS アプリのパッケージ名 / bundleIdentifier
    nativeCrashReportEnabled: true, // オプション: ネイティブクラッシュレポートを有効にします。デフォルト = false
    version: '1.0.0', // オプション: ドキュメントで報告されたバージョンのオーバーライドを参照してください。デフォルト = Android / iOS アプリの VersionName / バージョン
    versionSuffix: 'codepush.v3', // オプション: ドキュメントで報告されたバージョンのオーバーライドを参照してください。デフォルト = undefined
    trackingConsent: TrackingConsent.GRANTED, // オプション: ユーザーが追跡の同意を与えていない場合、収集を無効にします。デフォルト = TrackingConsent.GRANTED
    nativeViewTracking: true, // オプション: ネイティブビューの追跡を有効にします。デフォルト = false
    proxyConfig: new ProxyConfig() // オプション: プロキシを経由してリクエストを送信します。デフォルト = undefined
};
```


## Monitoring hybrid React Native applications

See [Monitor hybrid React Native applications][16].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[8]: /account_management/api-app-keys/#client-tokens
[9]: /getting_started/site/
[11]: /real_user_monitoring/browser/frustration_signals/
[12]: /real_user_monitoring/platform/connect_rum_and_traces?tab=reactnativerum
[13]: /real_user_monitoring/guide/proxy-mobile-rum-data/
[15]: /getting_started/tagging/#define-tags
[16]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications