---
description: React Native のセットアップのための高度な構成オプションについて説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative のソースコード
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

## 初期化パラメーター

SDK 初期化時の構成で、以下のパラメーターを指定することができます。

`clientToken`
: 必須<br/>
**タイプ**: 文字列<br/>
[Datadog クライアントトークン][8]。

`env`
: 必須<br/>
**タイプ**: 文字列<br/>
アプリケーションの環境 (例: prod、pre-prod、staging)。[タグの構文要件][15]に従います。

`applicationId`
: 必須<br/>
**種類**: 文字列<br/>
RUM アプリケーションの ID。

`trackInteractions`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false` <br/>
ユーザーアクションの自動収集を有効にします。

`trackResources`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false` <br/>
リソースイベントの収集を可能にします。

`trackErrors`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false` <br/>
React Native のクラッシュの収集を有効にします。

`site`
: オプション<br/>
**タイプ**: 文字列<br/>
**デフォルト**: `US1`<br/>
[組織の Datadog のサイトパラメーター][9]。

`serviceName`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのサービス名。[タグの構文要件][15]に従います。

`version`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのバージョン。例: 1.2.3、6c44da20、2020.02.13。[タグの構文要件][15]に従います。

`versionSuffix`
: オプション<br/>
**タイプ**: 文字列<br/>
報告されたアプリのバージョンにサフィックスを追加します。使用できる文字は、英数字と `_`、`-`、`:`、`.`、`/` です。その他の特殊文字はアンダースコアに変換されます。バージョンとサフィックスの間には、自動的にダッシュ (`-`) が追加されます。[タグの構文要件][15]に従います。

`trackFrustrations`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `true` <br/>
[ユーザーのフラストレーションの自動収集][11]を有効にします。`trackInteractions: true` を意味します。

`nativeCrashReportEnabled`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false` <br/>
ネイティブプラットフォーム (iOS、Android) のクラッシュレポートを有効にします。

`sampleRate`
: オプション - **非推奨**<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
`sessionSampleRate` を参照してください。

`sessionSampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
追跡するセッションの割合: すべてなら `100`、なければ `0` です。追跡されたセッションのみが RUM イベントを送信します。

`resourceTracingSamplingRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `20`<br/>
トレースするリクエストの割合: すべてなら `100`、なければ `0` です。詳細は、[RUM とトレースの接続][12]を参照してください。

`verbosity`
: オプション<br/>
**タイプ**: SdkVerbosity<br/>
**デフォルト**: `undefined`<br/>
内部 SDK のロギングに使用する Verbosity。SDK の実装をデバッグするには、`SdkVerbosity.DEBUG` に設定します。

`nativeViewTracking`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false`<br/>
ネイティブビューの追跡を有効にします。ネイティブビューに依存するカスタムナビゲーションシステムを使用する場合は、`true` に設定します。

`nativeInteractionTracking`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false`<br/>
ネイティブインタラクションの追跡を有効にします。ネイティブ画面でのインタラクションを追跡したい場合は、`true` に設定します。

`firstPartyHosts`
: オプション<br/>
**タイプ**: リスト<br/>
**デフォルト**: `[]`<br/>
ネイティブビューの追跡を有効にします。ネイティブビューに依存するカスタムナビゲーションシステムを使用する場合は、`true` に設定します。詳しくは、[RUM とトレースの接続][12]を参照してください。

`telemetrySampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `20`<br/>
SDK の実行に関するテレメトリーデータ (エラーやデバッグログなど) は、潜在的な問題を検出して解決するために、Datadog に送信されます。このオプションを `0` に設定すると、テレメトリー収集がオプトアウトされます。

`longTaskThresholdMs`
: オプション<br/>
**タイプ**: 数値 | false<br/>
**デフォルト**: `0`<br/>
javascript のロングタスク報告のしきい値 (ミリ秒単位)。`0` または `false` に設定すると、javascript のロングタスクの報告が無効になります。`100` 未満の値は `100` に引き上げられます。`5000` 以上の値は `5000` に下げられます。

`nativeLongTaskThresholdMs`
: オプション<br/>
**タイプ**: 数値 | false<br/>
**デフォルト**: `200`<br/>
ネイティブロングタスク報告のしきい値 (ミリ秒単位)。`0` または `false` に設定すると、javascript のロングタスクの報告が無効になります。`100` 未満の値は `100` に引き上げられます。`5000` 以上の値は `5000` に下げられます。

`vitalsUpdateFrequency`
: オプション<br/>
**タイプ**: VitalsUpdateFrequency<br/>
**デフォルト**: `VitalsUpdateFrequency.AVERAGE`<br/>
モバイルバイタルを収集する際の好ましい頻度を設定します。

`uploadFrequency`
: オプション<br/>
**タイプ**: UploadFrequency<br/>
**デフォルト**: `UploadFrequency.AVERAGE`<br/>
データのバッチをアップロードする際の好ましい頻度を設定します。

`batchSize`
: オプション<br/>
**タイプ**: BatchSize<br/>
**デフォルト**: `BatchSize.MEDIUM`<br/>
Datadog サーバーにアップロードする前にデータをまとめてバッチ処理する際の Datadog SDK のポリシーを定義します。小さなバッチは、より小さいがより多くのネットワークリクエストを意味し、大きなバッチは、より少ないがより大きなネットワークリクエストを意味します。

`trackBackgroundEvents`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false`<br/>
RUM View がアクティブでない場合に、RUM イベントの追跡を有効にします。デフォルトでは、バックグランドイベントは追跡されません。この機能を有効にすると、追跡されるセッション数が増加し、請求に影響を与える可能性があります。

`proxyConfig`
: オプション<br/>
**タイプ**: ProxyConfiguration<br/>
オプションのプロキシ構成。

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
|               | `resourceEvent.additionalInformation.userInfo`   | `DdSdkReactNative.setUser` で設定されたグローバルユーザー情報を格納します。        |
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

Datadog の非同期初期化の設定に問題がある場合は、弊社の[サンプルアプリケーション][7]をご確認ください。

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
[2]: /ja/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[8]: /ja/account_management/api-app-keys/#client-tokens
[9]: /ja/getting_started/site/
[11]: /ja/real_user_monitoring/frustration_signals/
[12]: /ja/real_user_monitoring/connect_rum_and_traces?tab=reactnativerum
[15]: /ja/getting_started/tagging/#defining-tags