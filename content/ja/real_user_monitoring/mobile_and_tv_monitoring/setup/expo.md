---
aliases:
- /ja/real_user_monitoring/reactnative/expo/
- /ja/real_user_monitoring/reactnative-expo/
code_lang: expo
code_lang_weight: 50
description: Expo と Expo Go を使用して React Native プロジェクトを Datadog で監視します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: ドキュメント
  text: RUM React Native の高度な構成
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
title: RUM Expo のセットアップ
type: multi-code-lang
---

## 概要

RUM React Native SDK は Expo と Expo Go をサポートしています。使用するには、`expo-datadog` と `@datadog/mobile-react-native` をインストールします。

`expo-datadog` は SDK 45 から Expo をサポートしており、プラグインのバージョンは Expo のバージョンに従います。例えば、Expo SDK 45 を使用している場合は、`expo-datadog` のバージョン `45.x.x` を使用します。Datadog では、最小バージョンとして **Expo SDK 45** を使用することを推奨しており、それ以前のバージョンでは手動による手順が必要になる場合があります。

Datadog SDK を Expo アプリケーションで設定する際に問題が発生した場合は、弊社の[サンプルアプリケーション][1]を参考にすることができます。

## セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install expo-datadog @datadog/mobile-react-native
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

### ビューのナビゲーションを追跡

Datadog に RUM セッションを表示するには、ビューの追跡を実装する必要があります。これは手動または自動で初期化できます。

#### 手動追跡

次の `startView()` および `stopView()` メソッドを使用して、ビューを手動で開始および停止できます。

```js
import {
    DdRum
} from 'expo-datadog';

// 一意のビュー識別子、カスタムビュー名、オブジェクトを使用してビューを開始し、ビューに追加の属性をアタッチします
DdRum.startView(
    '<view-key>', // <view-key> は一意でなければなりません。例えば ViewName-unique-id とすることができます
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// 同じ一意のビュー識別子と、ビューに追加の属性をアタッチするオブジェクトを使用して、以前に開始したビューを停止します
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

#### 自動追跡

以下のモジュールでは、自動ビュー追跡がサポートされています。

- React Navigation: [@Datadog/mobile-react-navigation][2]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][3]

この Datadog のプロジェクト例では、View Tracking は `@datadog/mobile-react-navigation` によって実現され、 `NavigationContainer` を使用して構成されています。

```tsx
<NavigationContainer
          ref={navigationRef}
          onReady={() => {
            DdRumReactNavigationTracking.startTrackingViews(
              navigationRef.current,
            );
          }}>
```

## 使用方法

### アプリケーションのコンテキストでライブラリを初期化

初期化ファイルに以下のコードスニペットを追加します。

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ボタンをタップするなどのユーザーインタラクションを追跡します。'accessibilityLabel' 要素プロパティを使用してタップアクションに名前を付けることができます。それ以外の場合は、要素タイプが報告されます。
    true, // XHR リソースを追跡します。
    true // エラーを追跡します。
);
// オプション: Datadog の Web サイトを選択します (“US1"、”US3"、”US5"、"EU1"、または "US1_FED")。デフォルトは "US1 "です。
config.site = 'US1';
// オプション: ネイティブクラッシュレポートを有効または無効にします。
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル。例: セッションの 80％ が Datadog に送信されます。デフォルトは 100% です。
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのサンプルトレーシングインテグレーション。例: インスツルメンテーションされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされています。デフォルトは 20% です。
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります。
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします。
// オプション: Datadog SDK に、提供されたレベル以上の内部ログを印刷させます。デフォルトは undefined で、これはログを出力しないことを意味します。
config.verbosity = SdkVerbosity.WARN;

await DdSdkReactNative.initialize(config);

// Datadog SDK が初期化されると、RUM ダッシュボードでデータを見るために、ビュー追跡をセットアップする必要があります。
```

#### RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[RUM Expo SDK を初期化][4]し、RUM セッションのサンプリングレートを 0～100 の間に指定します。このレートを設定するには、`config.sessionSamplingRate` パラメーターを使用します。

### EAS ビルドでソースマップをアップロード

<div class="alert alert-info"><p>クラッシュレポートを有効にしていない場合は、この手順をスキップすることができます。<p></div>

`app.json` ファイルにあるプラグインに `expo-datadog` を追加します。

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

このプラグインは、EAS のビルドごとに、dSYM、ソースマップ、Proguard マッピングファイルのアップロードを行います。

開発依存として `@datadog/datadog-ci` を追加します。このパッケージには、ソースマップをアップロードするためのスクリプトが含まれています。NPM でインストールすることができます。

```sh
npm install @datadog/datadog-ci --save-dev
```

または、Yarn でインストールすることができます。

```sh
yarn add -D @datadog/datadog-ci
```

`eas secret:create` を実行して、`DATADOG_API_KEY` を Datadog API キーに、`DATADOG_SITE` を Datadog サイトのホスト (例: `datadoghq.com`) に設定します。

Expo のクラッシュの追跡については、[Expo のクラッシュレポートとエラーの追跡][5]を参照してください。

## Expo Router 画面の追跡

[Expo Router][6] を使用している場合は、`app/_layout.js` ファイルで画面を追跡してください。

```javascript
import { useEffect } from 'react';
import { usePathname, useSearchParams, useSegments, Slot } from 'expo-router';

export default function Layout() {
    const pathname = usePathname();
    const segments = useSegments();
    const viewKey = segments.join('/');

    useEffect(() => {
        DdRum.startView(viewKey, pathname);
    }, [viewKey, pathname]);

    // 最も基本的な方法で、すべての子ルートをエクスポートします。
    return <Slot />;
}
```

## Expo Go

Expo Go を使用している場合は、開発ビルドに切り替えるか (推奨)、スタンドアロンアプリケーションで実行させながら Datadog なしで Expo Go を使い続けます (非推奨)。

### Expo Go から開発ビルドへの切り替え

アプリケーションの[開発ビルド][7]は、`expo-dev-client` パッケージを含むデバッグ用ビルドです。

1. [カスタムネイティブコードの実行][8]は、`expo run:android` と `expo run:ios` で有効化します。
2. 開発用アプリケーションの使用を開始するには、`expo install expo-dev-client` と `expo start --dev-client` を実行します。これにより、追加されたネイティブコードを開発モードで実行するための [`expo-dev-client` パッケージ][9]がインストールされ、起動されます。

### Expo Go で開発する<br>

Expo Go 内部でアプリケーションを実行する場合、Expo Go アプリケーションの一部でないカスタムネイティブコードを追加することはできません。RUM React Native SDK は、実行するためにいくつかのカスタムネイティブコードに依存しているため、Datadog を使用せずに Expo Go 内部でアプリケーションを開発し、スタンドアロンビルドで Datadog を使用することが可能です。

Expo Go で、(含まれていない) いくつかのネイティブコードが呼び出されると、アプリケーションがクラッシュします。スタンドアロンアプリケーションで Datadog を使用し、開発では Expo Go を使い続けるには、以下の TypeScript ファイルをプロジェクトに追加してください。

```typescript
// mockDatadog.ts
// Datadog はこの方法を推奨していませんので、代わりに Expo 開発ビルドへの移行を検討してください。
// このファイルは公式にはメンテナンスされておらず、新しいリリースに対応していない可能性があります。

import { DdLogs, DdTrace, DdRum, DdSdkReactNative } from 'expo-datadog';

if (__DEV__) {
    const emptyAsyncFunction = () => new Promise<void>(resolve => resolve());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        new Promise<string>(resolve => resolve('fakeSpanId'));
    DdTrace.finishSpan = emptyAsyncFunction;
    DdRum.startView = emptyAsyncFunction;
    DdRum.stopView = emptyAsyncFunction;
    DdRum.startAction = emptyAsyncFunction;
    DdRum.stopAction = emptyAsyncFunction;
    DdRum.addAction = emptyAsyncFunction;
    DdRum.startResource = emptyAsyncFunction;
    DdRum.stopResource = emptyAsyncFunction;
    DdRum.addError = emptyAsyncFunction;
    DdRum.addTiming = emptyAsyncFunction;

    DdSdkReactNative.initialize = emptyAsyncFunction;
    DdSdkReactNative.setUser = emptyAsyncFunction;
    DdSdkReactNative.setAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
}
```

そして、Datadog React Native SDK を初期化する前にインポートしてください。

```typescript
import './mockDatadog';
import { DdSdkReactNative } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。

各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないようにするため、ディスク上のデータは、古すぎる場合自動的に破棄されます。

## トラブルシューティング

### アプリが大量の /logs RUM リソースを生成する

Resource tracking が有効で SDK verbosity が `DEBUG` に設定されている場合、各 RUM リソースはログを出力するために Expo 開発サーバーへの `/logs` 呼び出しをトリガーし、それ自体が新しい RUM リソースを作成するため、無限ループが発生します。
Expo 開発サーバーのホスト URL のほとんどの一般的なパターンは SDK によってフィルタリングされるため、ほとんどの状況でこのエラーが発生することはありません。
このエラーが発生する場合は、次の RUM リソースマッパーを追加して呼び出しをフィルタリングします。

```js
import { DdSdkReactNativeConfiguration } from 'expo-datadog';
import Constants from 'expo-constants';

const config = new DdSdkReactNativeConfiguration(/* your config */);
config.resourceEventMapper = event => {
  if (
    event.resourceContext?.responseURL ===
    `http://${Constants.expoConfig.hostUri}/logs`
  ) {
    return null;
  }
  return event;
};
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation
[2]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[3]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[4]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/expo#initialize-the-library-with-application-context
[5]: /ja/real_user_monitoring/error_tracking/mobile/expo/
[6]: https://expo.github.io/router/docs/
[7]: https://docs.expo.dev/development/introduction/
[8]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[9]: https://docs.expo.dev/development/getting-started/