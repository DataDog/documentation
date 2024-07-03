---
aliases:
- /ja/real_user_monitoring/reactnative/integrated_libraries/
code_lang: reactnative
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: Source code for dd-sdk-reactnative
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
title: React Native Libraries for RUM
type: multi-code-lang
---

This page lists integrated libraries you can use for React Native applications.

## React Navigation

### セットアップ

**Note**: This package is an integration for [`react-navigation`][1] library, please make sure you first install and setup the core `mobile-react-native` SDK.

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

To start tracking your navigation events, add the following lines before setting up your navigation. You can use the optional `ViewNamePredicate` callback to replace the automatically detected View name with something more relevant to your use case, based on the [`ComponentDidAppearEvent`][2].

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

For more information on Apollo Client Links, see the [official documentation][3].

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