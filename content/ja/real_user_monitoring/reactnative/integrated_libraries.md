---
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative のソースコード
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: RUM データの調査方法
kind: faq
title: React Native インテグレーションライブラリ
---
## React Navigation

### セットアップ

**注**: このパッケージは `react-navigation` ライブラリのインテグレーションであり、最初にコアとなる `mobile-react-native` SDK をインストールしてセットアップしてください。

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-navigation
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-navigation
```

### ビューのナビゲーションを追跡
ナビゲーションの変化を RUM ビューとして追跡するには、`NavigationContainer` コンポーネントの `onready` コールバックを次のように設定します。オプションの `ViewNamePredicate` パラメーターを使用すると、自動的に検出された View 名をユースケースに適したものに置き換えることができます。

`ViewNamePredicate` で `null` を返すと、新しい RUM View が作成されなくなります。以前の RUM View はアクティブなままです。

```js
import * as React from 'react';
import { DdRumReactNavigationTracking, ViewNamePredicate } from '@datadog/mobile-react-navigation';
import { Route } from "@react-navigation/native";

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(route: Route<string, any | undefined>, trackedName: string) {
  return "My custom View Name"
}

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current, viewNamePredicate)
      }}>
        // ...
      </NavigationContainer>
    </View>
  );
}
```

**注**: 一度に追跡できるのは 1 件の `NavigationContainer` のみです。別のコンテナを追跡する必要がある場合は、`DdRumReactNavigationTracking.stopTrackingViews()` を使用して、まず初めの追跡を停止します。

## React Native Navigation

**注**: このパッケージは `react-native-navigation` ライブラリのインテグレーションであり、最初にコアとなる `mobile-react-native` SDK をインストールしてセットアップしてください。

## セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native-navigation
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native-navigation
```

### ビューのナビゲーションを追跡

ナビゲーションイベントの追跡を開始するには、ナビゲーションを設定する前に、以下の行を追加して呼び出すだけです。オプションの `ViewNamePredicate` コールバックを使用すると、[`ComponentDidAppearEvent`][1] に基づいて自動的に検出された View 名を、ユースケースにより適切なものに置き換えることができます。

`ViewNamePredicate` で null を返すと、新しい RUM View が作成されなくなります。以前の RUM View はアクティブなままです。

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## RUM インテグレーション

### React Navigation とのインテグレーション
Datadog は、[React Navigation](https://reactnavigation.org/)  (最低対応バージョンは `react-navigation/native@5.6.0`) の自動インテグレーションを提供します。ソースコードに以下を追加してください。

```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear