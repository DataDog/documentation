---
aliases:
- /ja/real_user_monitoring/reactnative/expo/
- /ja/real_user_monitoring/reactnative-expo/
code_lang: expo
code_lang_weight: 50
description: Monitor your React Native projects using Expo and Expo Go with Datadog.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: Source code for dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
kind: documentation
title: RUM Expo Setup
type: multi-code-lang
---

## Overview

The RUM React Native SDK supports Expo and Expo Go. To use it, install `expo-datadog` and `@datadog/mobile-react-native`.

`expo-datadog` supports Expo starting from SDK 45 and the plugin's versions follow Expo versions. For example, if you use Expo SDK 45, use `expo-datadog` version `45.x.x`. Datadog recommends using **Expo SDK 45** as a minimum version; previous versions may require manual steps.

If you experience any issues setting up the Datadog SDK with an Expo application, you can see our [example application][1] as a reference.

## Setup

To install with NPM, run:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

### ビューのナビゲーションを追跡

To see RUM sessions populate in Datadog, you need to implement view tracking, which can be initialized manually or automatically.

#### Manual tracking

You can manually start and stop a view using the following `startView()` and `stopview()` methods.

```js
import {
    DdRum
} from 'expo-datadog';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

#### Automatic tracking

Automatic view tracking is supported for the the following modules:

- React Navigation: [@Datadog/mobile-react-navigation][2]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][3]

In this Datadog example project, View Tracking is achieved through `@datadog/mobile-react-navigation` and is configured using the `NavigationContainer`:

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
// オプション: Datadog の Web サイトを選択します (“US1"、”US3"、”US5"、EU1"、または "US1_FED")。デフォルトは "US1 "です。
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

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM Expo SDK][4] as a percentage between 0 and 100. To set this rate, use the `config.sessionSamplingRate` parameter. 

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

For information about tracking Expo crashes, see [Expo Crash Reporting and Error Tracking][5].

## Expo Router 画面の追跡

If you are using [Expo Router][6], track your screens in your `app/_layout.js` file:

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

Your application's [development builds][7] are debug builds that contain the `expo-dev-client` package.

1. Enable the [custom native code to run][8] with `expo run:android` and `expo run:ios`.
2. To start using your development application, run `expo install expo-dev-client` and `expo start --dev-client`. This installs and starts the [`expo-dev-client` package][9] to execute the added native code in dev mode.

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

## トラブルシューティング

### アプリが大量の /logs RUM リソースを生成する

When Resource tracking is enabled and SDK verbosity is set to `DEBUG`, each RUM Resource triggers a `/logs` call to the Expo dev server to print the log, which itself creates a new RUM resource, creating an infinite loop.
The most common patterns of Expo dev server host URL are filtered by the SDK, therefore, you may not encounter this error in most situations.
If this error occurs, add the following RUM Resource mapper to filter out the calls:

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