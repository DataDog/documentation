---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/expo_development.md
description: Expo と Expo Go を使用して React Native プロジェクトを Datadog で監視します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: Expo
---
## 概要

RUM React Native SDK は、Expo および Expo Go をサポートしています。最小サポートバージョンは [**@datadog/dd-sdk-reactnative:1.0.0-rc9**][1] です。

Datadog では、最小バージョンとして **Expo SDK 45** を使用することを推奨しています。

## セットアップ

構成プラグインは必要ありません。はじめに、[React Native モニタリング][2]をご覧ください。

## Expo Go

Expo Go を使用している場合は、開発ビルドに切り替えるか (推奨)、スタンドアロンアプリケーションで実行させながら Datadog なしで Expo Go を使い続けます (非推奨)。

### Expo Go から開発ビルドへの切り替え

アプリケーションの[開発ビルド][3]は、`expo-dev-client` パッケージを含むデバッグ用ビルドです。

1. [カスタムネイティブコードの実行][4]は、`expo run:android` と `expo run:ios` で有効化します。
2. 開発用アプリケーションの使用を開始するには、`expo install expo-dev-client` と `expo start --dev-client` を実行します。これにより、追加されたネイティブコードを開発モードで実行するための [`expo-dev-client` パッケージ][5]がインストールされ、起動されます。

### Expo Go で開発する<br>

Expo Go 内部でアプリケーションを実行する場合、Expo Go アプリケーションの一部でないカスタムネイティブコードを追加することはできません。RUM React Native SDK は、実行するためにいくつかのカスタムネイティブコードに依存しているため、Datadog を使用せずに Expo Go 内部でアプリケーションを開発し、スタンドアロンビルドで Datadog を使用することが可能です。

Expo Go で、(含まれていない) いくつかのネイティブコードが呼び出されると、アプリケーションがクラッシュします。スタンドアロンアプリケーションで Datadog を使用し、開発では Expo Go を使い続けるには、以下の TypeScript ファイルをプロジェクトに追加してください。

```typescript
// mockDatadog.ts
// Datadog はこの方法を推奨していませんので、代わりに Expo 開発ビルドへの移行を検討してください。
// このファイルは公式にはメンテナンスされておらず、新しいリリースに対応していない可能性があります。

import {
    DdLogs,
    DdTrace,
    DdRum,
    DdSdkReactNative
} from '@datadog/mobile-react-native';

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

そして、SDK を初期化する前にインポートしてください。

```typescript
import './mockDatadog';
import { DdSdkReactNative } from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0-rc9
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/#setup
[3]: https://docs.expo.dev/development/introduction/
[4]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[5]: https://docs.expo.dev/development/getting-started/