---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/README.md
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Github
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
kind: documentation
title: React Native のモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

Datadog React Native SDK をサポートする最低バージョンは、React Native v0.63.4 以降です。それ以前のバージョンに対する互換性は、標準では保証されていません。

## セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native
```

### UI でアプリケーションの詳細を指定

1. [Datadog アプリ][1]で、**UX Monitoring** > **RUM Applications** > **New Application** へ移動します。
2. アプリケーションタイプとして `react-native` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

{{< img src="real_user_monitoring/react_native/image_reactnative.png" alt="Datadog ワークフローで RUM アプリケーションを作成" style="width:90%;">}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。`@datadog/mobile-react-native` ライブラリの構成に [Datadog API キー][3]のみを使用した場合、クライアント側で React Native アプリケーションのコード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストでライブラリを初期化

{{< site-region region="us" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)。
    true, // XHR リソースを追跡
    true // エラーを追跡
)
config.site = "US1"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```
{{< /site-region >}}

Azure Datadog インテグレーションをセットアップするには、Azure サブスクリプションの **Owner** 権限が必要です。セットアップを開始する前に、適切な権限を所有していることをご確認ください。
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)。
    true, // XHR リソースを追跡
    true // エラーを追跡
)
config.site = "US3"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)。
    true, // XHR リソースを追跡
    true // エラーを追跡
)
config.site = "US5"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)。
    true, // XHR リソースを追跡
    true // エラーを追跡
)
config.site = "US1"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```
{{< /site-region >}}

{{< site-region region="gov" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)。
    true, // XHR リソースを追跡
    true // エラーを追跡
)
config.site = "US1_FED"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```
{{< /site-region >}}



### ユーザーインタラクションの追跡

上記のコード例のようにユーザーインタラクションの追跡が有効になっている場合、SDK は、タップを受け取ったコンポーネントから始まるコンポーネントの階層をトラバースし、`dd-action-name` プロパティを探します。見つかったら、報告されたアクションの名前として使用されます。

または、`accessibilityLabel` 要素プロパティを使用して、タップアクションに名前を付けることもできます。それ以外の場合は、要素タイプが報告されます。サンプルアプリで使用例を確認できます。

### ビューのナビゲーションを追跡

React Native は、画面ナビゲーションを作成するためのさまざまなライブラリを提供しているため、デフォルトでは手動のビュートラッキングのみがサポートされています。Datadog で RUM セッションの入力を表示するには、ビュートラッキングを実装する必要があります。

次の `startView()` および `stopView` メソッドを使用して、ビューを手動で開始および停止できます。

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from '@datadog/mobile-react-native';


// 一意のビュー識別子、カスタムビューの URL、オブジェクトを使用してビューを開始し、ビューに追加の属性をアタッチします
DdRum.startView('<view-key>', '/view/url', { 'custom.foo': "something" }, Date.now());
// 同じ一意のビュー識別子と、ビューに追加の属性をアタッチするオブジェクトを使用して、以前に開始したビューを停止します
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

次のライブラリには、Datadog のインテグレーションの 1 つを使用して、ビューを自動的に追跡します。

- [`react-native-navigation`][5] ライブラリを使用する場合は、`@datadog/mobile-react-native-navigation` パッケージを追加し、[セットアップ手順][6]に従います。
- [`react-navigation`][7] ライブラリを使用する場合は、`@datadog/mobile-react-navigation` パッケージを追加し、[セットアップ手順][8]に従います。

## カスタム属性の追跡

すべての RUM イベントにユーザー情報をアタッチして、RUM セッションのより詳しい情報を入手することができます。

### ユーザー情報

ユーザー特有の情報については、必要に応じてアプリで以下のコードを使用します（SDK の初期化後）。`id`、`name`、`email` 属性は Datadog に組み込まれていますが、アプリに適したその他の属性を追加できます。

```js
DdSdkReactNative.setUser({
    id: "1337", 
    name: "John Smith", 
    email: "john@example.com", 
    type: "premium"
})
```

### グローバル属性

また、グローバル属性を維持して A/B テストのコンフィギュレーション、広告キャンペーン元、カートのステータスなど指定したセッションに関する情報を追跡することも可能です。

```js
DdSdkReactNative.setAttributes({
    profile_mode: "wall",
    chat_enabled: true,
    campaign_origin: "example_ad_network"
})
```

## 手動インスツルメンテーション

自動インスツルメンテーションがニーズに合わない場合は、手動で RUM イベントとログを作成できます。

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from '@datadog/mobile-react-native';

// SDK を初期化
const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>",
    "<ENVIRONMENT_NAME>",
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)
    true, // XHR リソースを追跡
    true // エラーを追跡
)
DdSdkReactNative.initialize(config);

// ログを送信 (debug、info、warn、error メソッドを使用)
DdLogs.debug("Lorem ipsum dolor sit amet…", {});
DdLogs.info("Lorem ipsum dolor sit amet…", {});
DdLogs.warn("Lorem ipsum dolor sit amet…", {});
DdLogs.error("Lorem ipsum dolor sit amet…", {});

// RUM Views を手動で追跡
DdRum.startView('<view-key>', 'View Url', {}, Date.now());
//…
DdRum.stopView('<view-key>', { 'custom': 42 }, Date.now());

// RUM Actions を手動で追跡
DdRum.addAction('TAP', 'button name', {}, Date.now());
// 継続アクションの場合
DdRum.startAction('TAP', 'button name', {}, Date.now());
// 上記アクションの停止
DdRum.stopAction({}, Date.now());

// カスタムタイミングを追加
DdRum.addTiming('<timing-name>');

// RUM Errors を手動で追跡
DdRum.addError('<message>', 'source', '<stacktrace>', {}, Date.now());

// RUM Resource を手動で追跡
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//…
DdRum.stopResource('<res-key>', 200, 'xhr', {}, Date.now());

// スパンを手動で送信
const spanId = await DdTrace.startSpan("foo", { 'custom': 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { 'custom': 21 }, Date.now());
```

## リソースのタイミング

リソースの追跡では、以下のタイミングを提供できます。

* `First Byte` - スケジュール済みのリクエストと応答の最初のバイトの間の時間。ネイティブレベルのリクエスト準備、ネットワークレイテンシー、およびサーバーの応答準備時間が含まれます。
* `Download` - 応答の受信にかかった時間。

## 開発モード

開発モードでは、アプリケーションは、コード変換エラー、ローカル開発サーバーへの要求など、React Native ツールに関連する追加のイベントを送信できます。

これらのイベントがダッシュボードに表示されないようにするには、`__DEV__` フラグを使用して、開発モードでのエラーとリソースの追跡を無効にします。

```
const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources は DEV モードでは false になり、それ以外の場合は true になります */,
    !__DEV__  /* trackErrors は DEV モードでは false になり、それ以外の場合は true になります */,
    trackingConsent
)
```

## ライセンス

詳細については、[Apache ライセンス、v2.0][9]を参照

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[7]: https://github.com/react-navigation/react-navigation
[8]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE