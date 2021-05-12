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
    true, // ユーザーインタラクションを追跡 (例: ボタンのタップ)
    true, // XHR リソースを追跡
    true // エラーを追跡
)
// オプション: Datadog ウェブサイトを選択 ("US"、"EU"、"GOV" のいずれか)
config.site = "US"
// オプション: ネイティブのクラッシュレポートを有効化または無効化
config.nativeCrashReportEnabled = true
// オプション: サンプル RUM セッション (ここでは、せしょんの 80% を Datadog に送信。デフォルト = 100%)
config.sampleRate = 80

DdSdkReactNative.initialize(config)
```

## ビューのナビゲーションを追跡

**注**: 自動ビュー追跡は、[React Navigation](https://reactnavigation.org/) パッケージに依存します。アプリケーションで、別のパッケージを使用してナビゲーションに対応している場合は、以下に説明する手動インスツルメンテーションの方法を使用します。

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

// ログを送信 (use the debug、info、warn、error メソッドを使用)
DdLogs.debug("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.info("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.warn("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.error("Lorem ipsum dolor sit amet…", 0, {});

// RUM Views を手動で追跡
DdRum.startView('<view-key>', 'View Url', new Date().getTime(), {});
//…
DdRum.stopView('<view-key>', new Date().getTime(), { custom: 42});

// RUM Actions を手動で追跡
DdRum.addAction('TAP', 'button name', new Date().getTime(), {});

// RUM Errors を手動で追跡
DdRum.addError('<message>', 'source', '<stacktrace>', new Date().getTime(), {});


// RUM Resource を手動で追跡
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', new Date().getTime(), {} );
//…
DdRum.stopResource('<res-key>', 200, 'xhr', new Date().getTime(), {});
```
## ライセンス

[Apache License, v2.0](LICENSE)

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens