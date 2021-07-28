---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-reactnative/blob/main/README.md'
description: React Native プロジェクトから RUM データを収集します。
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-reactnative'
    tag: Github
    text: dd-sdk-reactnative ソースコード
  - link: real_user_monitoring/explorer/
    tag: ドキュメント
    text: RUM データの調査方法
  - link: 'https://www.datadoghq.com/blog/react-native-monitoring/'
    tag: ブログ
    text: react-native アプリケーションの監視
kind: documentation
title: React Native RUM の収集
---
<div class="alert alert-warning">
この機能はオープンベータ版です。この機能に関するご質問やフィードバックは、<a href="https://docs.datadoghq.com/help/">サポート</a> までお寄せください。
</div>

Datadog *Real User Monitoring (RUM)* を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install dd-sdk-reactnative
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add dd-sdk-reactnative
```

**React Native バージョン**: SDK は、React Native バージョン 0.63.4 以降をサポートします。それ以前のバージョンに対する互換性は、標準では保証されていません。

### UI でアプリケーションの詳細を指定

1. [Datadog アプリ][1]で、**UX Monitoring > RUM Applications > New Application** を選択します。
2. アプリケーションタイプとして `react-native` を選択します。
3. 新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

![image][2]

データの安全性を確保するため、クライアントトークンを使用する必要があります。API キーがクライアント側で公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-reactnative` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストでライブラリを初期化

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'dd-sdk-reactnative';


const config = new DdSdkReactNativeConfiguration(
    "<CLIENT_TOKEN>", 
    "<ENVIRONMENT_NAME>", 
    "<RUM_APPLICATION_ID>",
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ。'accessibilityLabel' 要素のプロパティを使用してタップアクションに名前を付けることが可能。その他の場合は要素タイプをレポート)
    true, // XHR リソースを追跡
    true // エラーを追跡
)
// オプション: Datadog ウェブサイトを選択 ("US"、"EU"、"GOV" のいずれか)
config.site = "US"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、セッションの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Once SDK が初期化されたら、RUM ダッシュボードのデータを確認するにはビュー追跡をセットアップする必要があります。
```

## ビューのナビゲーションを追跡

**注**: 自動ビュー追跡は、[React Navigation](https://reactnavigation.org/) パッケージに依存します (サポート対象のバージョンは `react-navigation/native@5.6.0` 以降)。アプリケーションで、別のパッケージを使用してナビゲーションに対応している場合は、以下に説明する手動インスツルメンテーションの方法を使用します。

ナビゲーションの変更を RUM Views として追跡するには、`NavigationContainer` コンポーネントに `onready` コールバックを設定します。

```js
import * as React from 'react';
import { DdRumReactNavigationTracking } from 'dd-sdk-reactnative';

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)
      }}>
        // …
      </NavigationContainer>
    </View>
  );
}
```
**注**: 一度に追跡できるのは 1 件の `NavigationContainer` のみです。別のコンテナを追跡する必要がある場合は、まず初めの追跡を停止します。

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
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from 'dd-sdk-reactnative';

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
DdLogs.debug("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.info("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.warn("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.error("Lorem ipsum dolor sit amet…", 0, {});

// RUM Views  を手動で追跡
DdRum.startView('<view-key>', 'View Url', Date.now(), {});
//…
DdRum.stopView('<view-key>', Date.now(), { 'custom': 42 });

// RUM Actions  を手動で追跡
DdRum.addAction('TAP', 'button name', Date.now(), {});
// 継続アクションの場合
DdRum.startAction('TAP', 'button name', Date.now(), {});
// 上記アクションの停止
DdRum.stopAction(Date.now(), {});

// カスタムタイミングを追加
DdRum.addTiming('<timing-name>');

// RUM Errors  を手動で追跡
DdRum.addError('<message>', 'source', '<stacktrace>', Date.now(), {});

// RUM Resource を手動で追跡
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', Date.now(), {} );
//…
DdRum.stopResource('<res-key>', 200, 'xhr', Date.now(), {});

// スパンを手動で送信
const spanId = await DdTrace.startSpan("foo", Date.now(), { 'custom': 42 });
//...
DdTrace.finishSpan(spanId, Date.now(), { 'custom': 21 });
```

## リソースのタイミング

リソースの追跡では、以下のタイミングを提供できます。

* `First Byte` - スケジュール済みのリクエストと応答の最初のバイトの間の時間。ネイティブレベルのリクエスト準備、ネットワークレイテンシー、およびサーバーの応答準備時間が含まれます。
* `Download` - 応答の受信にかかった時間。

## ライセンス

[Apache License, v2.0](LICENSE)

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens