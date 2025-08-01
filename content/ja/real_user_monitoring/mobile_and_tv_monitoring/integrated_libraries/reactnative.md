---
aliases:
- /ja/real_user_monitoring/reactnative/integrated_libraries/
code_lang: reactnative
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: ドキュメント
  text: 統合ライブラリ
title: RUM 用 React Native ライブラリ
type: multi-code-lang
---

このページでは、React Native アプリケーションで使用できる統合ライブラリを一覧表示しています。

## React Navigation

### セットアップ

**注**: このパッケージは [`react-navigation`][1] ライブラリの統合機能です。まずはコア `mobile-react-native` SDK をインストールしてセットアップしてください。

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-navigation
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-navigation
```

### ビューのナビゲーションを追跡
ナビゲーションの変更を RUM View として追跡するには、`NavigationContainer` コンポーネントの `onReady` コールバックを次のように設定します。自動検出された View 名を、ユースケースにより適した名前に置き換えるため、オプションの `ViewNamePredicate` パラメーターを使用できます。

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

**注**: このパッケージは `react-native-navigation` ライブラリのインテグレーションです。最初にコアとなる `mobile-react-native` SDK をインストールしてセットアップしてください。

### セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native-navigation
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native-navigation
```

### ビューのナビゲーションを追跡

ナビゲーション イベントの追跡を開始するには、ナビゲーションを設定する前に次の行を追加します。[`ComponentDidAppearEvent`][2] に基づいて、自動検出された View 名をユースケースにより適した名前に置き換えるために、オプションの `ViewNamePredicate` コールバックを使用できます。

`ViewNamePredicate` で null を返すと、新しい RUM View が作成されなくなります。以前の RUM View はアクティブなままです。

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## Apollo Client

**注**: このパッケージは `@apollo/client` ライブラリのインテグレーションです。最初にコアとなる `mobile-react-native` SDK をインストールしてセットアップしてください。

### セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native-apollo-client
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native-apollo-client
```

### HttpLink への移行

`uri` パラメーターで `ApolloClient` を初期化する場合は、`HttpLink` で初期化します。

```javascript
import { ApolloClient, HttpLink } from '@apollo/client';

// 前
const apolloClient = new ApolloClient({
    uri: 'https://my.api.com/graphql'
});

// 後
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://my.api.com/graphql' })
});
```

### Datadog Apollo Client Link を使用して情報を収集する

`DatadogLink` を `@datadog/mobile-react-native-apollo-client` からインポートし、`ApolloClient` の初期化で使用します。

```javascript
import { ApolloClient, from, HttpLink } from '@apollo/client';
import { DatadogLink } from '@datadog/mobile-react-native-apollo-client';

const apolloClient = new ApolloClient({
    link: from([
        new DatadogLink(),
        new HttpLink({ uri: 'https://my.api.com/graphql' }) // 常に最後尾
    ])
});
```

Apollo Client Link についての詳細は、[公式ドキュメント][3] を参照してください。

### GraphQL 情報の削除

Datadog の構成で `resourceEventMapper` を使用して、GraphQL 変数から機密データを削除します。

```javascript
const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

datadogConfiguration.resourceEventMapper = event => {
    // 存在する場合、変数は event.context['_dd.graphql.variables’] に JSON 文字列として格納されます
    if (event.context['_dd.graphql.variables']) {
        const variables = JSON.parse(event.context['_dd.graphql.variables']);
        if (variables.password) {
            variables.password = '***';
        }
        event.context['_dd.graphql.variables'] = JSON.stringify(variables);
    }

    return event;
};
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://reactnavigation.org/
[2]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear
[3]: https://www.apollographql.com/docs/react/api/link/introduction/