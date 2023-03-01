---
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/advanced_configuration.md
description: React Native のセットアップのための高度な構成オプションについて説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/reactnative/
  tag: ドキュメント
  text: React Native のモニタリングについて
kind: documentation
title: RUM React Native の高度な構成
---
## 概要

まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[React Native セットアップドキュメント][2]を参照してください。

## Jest を使ったテスト

`'@datadog/mobile-react-native'` を使用したアプリのテストでは、テスト環境に Native Modules が存在しないため、余分なステップを完了する必要があるかもしれません。

Datadog は `'@datadog/mobile-react-native'` パッケージのモックを提供しています。[Jest][4] で使用するには、Jest のセットアップファイルに以下を追加してください。

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

`DatadogProvider` コンポーネントで SDK を初期化すると、インタラクション、エラー、リソースの自動追跡はテストでは無効になります。

すべての SDK メソッドは `jest.fn()` によってモック化されているので、Datadog SDK のメソッドが呼び出されたことをアサートすることができます。

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

Jest 以外のテストランナーを使用する場合、テストランナー用のモックを作成する必要があります。

## 手動インスツルメンテーション

自動インスツルメンテーションがニーズに合わない場合は、手動で RUM イベントとログを作成できます。

```javascript
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// SDK を初期化
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションを追跡 (ボタンのタップなど)
    true, // XHR リソースを追跡
    true // エラーを追跡
);
DdSdkReactNative.initialize(config);

// ログを送信 (debug、info、warn、error メソッドを使用)
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});

// RUM Views を手動で追跡
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//...
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());

// RUM Actions を手動で追跡
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
// 継続アクションの場合
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
// 上記アクションの停止
DdRum.stopAction({}, Date.now());

// カスタムタイミングを追加
DdRum.addTiming('<timing-name>');

// RUM Errors を手動で追跡
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());

// RUM Resource を手動で追跡
DdRum.startResource(
    '<res-key>',
    'GET',
    'http://www.example.com/api/v1/test',
    {},
    Date.now()
);
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());

// スパンを手動で送信
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## RUM イベントの変更または削除

Datadog に送信される前に RUM イベントの属性を変更したり、イベントを完全に削除したりするには、RUM React Native SDK を構成するときに Event Mappers API を使用します。

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.logEventMapper = event => event;
config.errorEventMapper = event => event;
config.resourceEventMapper = event => event;
config.actionEventMapper = event => event;
```

各マッパーは `(T) -> T?` というシグネチャを持つ関数で、 `T` は具象的な RUM イベントの型です。これは、送信される前にイベントの一部を変更したり、イベントを完全に削除したりすることができます。

例えば、RUM のエラー `message` から機密情報を削除するには、カスタム `redacted` 関数を実装して、それを `errorEventMapper` で使用します。

```javascript
config.errorEventMapper = event => {
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
|               | `resourceEvent.additionalInformation.userInfo`   | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報をコンテナで格納します。        |
|               | `resourceEvent.additionalInformation.attributes` | `DdSdkReactNative.setAttributes` で設定されたグローバル属性を格納します。 |

## リソースのタイミング

リソースの追跡では、以下のタイミングを提供します。

-   `First Byte`: スケジュール済みのリクエストと応答の最初のバイトの間の時間。ネイティブレベルのリクエスト準備、ネットワークレイテンシー、およびサーバーの応答準備時間が含まれます。
-   `Download`: 応答の受信にかかった時間。

## 非同期での初期化

アプリの起動時に多くのアニメーションが含まれている場合、これらのアニメーション中にコードを実行すると、一部のデバイスでアニメーションが遅延する可能性があります。Datadog React Native SDK for RUM の実行を、現在のアニメーションが全て開始された後に遅延させるには、構成で `initializationMode` を `InitializationMode.ASYNC` に設定します。

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration,
    InitializationMode
} from '@datadog/mobile-react-native';

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

## 初期化の遅延

SDK を初期化する前に待ちたい状況があるかもしれません。例えば、ユーザーのロールに応じて異なる構成を使用したい場合や、サーバーの 1 つから構成を取得する場合などです。

その場合、アプリを最初から自動インスツルメンテーション (ユーザーインタラクション、XHR リソース、エラーを自動的に収集) し、SDK を初期化する前に最大 100 の RUM およびスパンイベントを記録することが可能です。

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // サーバーの 1 つから構成をフェッチする
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
import {
    ProxyConfig,
    SdkVerbosity,
    TrackingConsent
} from '@datadog/mobile-react-native';

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


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest