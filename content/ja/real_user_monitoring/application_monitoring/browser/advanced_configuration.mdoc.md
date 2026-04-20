---
aliases:
- /ja/real_user_monitoring/installation/advanced_configuration/
- /ja/real_user_monitoring/browser/modifying_data_and_context/
- /ja/real_user_monitoring/browser/advanced_configuration/
content_filters:
- option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_advanced_config_options
  trait_id: rum_browser_sdk_version
description: RUMブラウザSDKを設定して、データ収集を変更し、ビュー名を上書きし、ユーザーセッションを管理し、アプリケーションのニーズに応じてサンプリングを制御します。
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentation
  text: ユーザーアクションの追跡
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: リアルユーザーモニタリング
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentation
  text: 収集されたRUMブラウザデータ
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog内でビューを探索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントに視覚化を適用する
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: Datadogの標準属性
title: 高度な設定
---
## 概要

RUMによって収集された[data and context collected][1]を変更する方法はいくつかあり、あなたのニーズをサポートします：

- 個人を特定できる情報などの機密データを保護すること。
-サポートを助けるために、ユーザーの内部識別とユーザーセッションを接続すること。
-データをサンプリングすることで、収集するRUMデータの量を減らすこと。
-デフォルトの属性が提供する情報以上のコンテキストを提供すること。

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

## デフォルトのRUMビュー名を上書きする

[バージョン2.17.0][3]以降、ビュー名を追加し、`trackViewsManually`オプションを使用して手動でビューイベントを追跡することで、チームが所有する専用サービスに割り当てることができます。

RUMブラウザSDKは、ユーザーが訪れた新しいページごとに自動的に[ビューイベント][2]を生成します。または、ページURLが変更されたとき（シングルページアプリケーションの場合）。ビュー名は、現在のページURLから計算され、変数IDが自動的に削除されます。少なくとも1つの数字を含むパスセグメントは、変数IDと見なされます。例えば、`/dashboard/1234`と`/dashboard/9a`は`/dashboard/?`になります。

デフォルトのRUMビュー名を上書きするには：

1. RUMブラウザSDKを初期化する際に`trackViewsManually`をtrueに設定します。

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```
   {% /if %}
   <!-- ends NPM sync -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```
   {% /if %}
   <!-- ends CDN async -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```
   {% /if %}
   <!-- ends CDN sync -->
2. 新しいページまたはルートの変更ごとにビューを開始する必要があります（シングルページアプリケーションの場合）。RUMデータはビューが開始されると収集されます。
{% /if %}
<!-- Ends 2.17.0 -->


<!-- Version must meet 4.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.13.0") %}

### サービス名とバージョンを定義します。

[バージョン4.13.0][16]以降、関連するサービス名とバージョンをオプションで定義することもできます。

- **ビュー名**: デフォルトはページのURLパスです。
- **サービス**: RUMアプリケーションを作成する際に指定したデフォルトサービスがデフォルトです。
- **バージョン**: RUMアプリケーションを作成する際に指定したデフォルトバージョンがデフォルトです。
{% /if %}
<!-- ends 4.13.0 -->

<!-- version exclusive examples below-->

<!-- before 4.13 -->
{% if includes($rum_browser_sdk_version, ["lt_2_13_0", "gte_2_13_0", "gte_2_17_0"]) %}

##ページビューを手動で追跡します。

以下の例は、RUMアプリケーションの`checkout`ページでページビューを手動で追跡します。サービスまたはバージョンを指定することはできません。

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView('checkout')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
        window.DD_RUM.startView('checkout')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{% /if %}
{% /if %}
<!-- ends before 4.13 -->

<!-- Between 4.13 and 5.28 -->
{% if includes($rum_browser_sdk_version, ["gte_4_13_0", "gte_4_49_0", "gte_5_22_0"]) %}

以下の例は、RUMアプリケーションの`checkout`ページでページビューを手動で追跡します。`checkout`をビュー名として使用し、`purchase`サービスをバージョン`1.2.3`に関連付けます。

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}
{% /if %}
<!-- ends before 5.28 -->
<!-- ends version exclusive examples -->

<!-- Version must meet 5.28.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.28.0") %}

- **コンテキスト**: [バージョン5.28.0][19]以降、ビューとビューの子イベントにコンテキストを追加できます。

以下の例は、RUMアプリケーションの`checkout`ページでページビューを手動で追跡します。`checkout`をビュー名として使用し、`purchase`サービスをバージョン`1.2.3`に関連付けます。

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends NPM -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.startView({
            name: 'checkout',
            service: 'purchase',
            version: '1.2.3',
            context: {
                payment: 'Done'
            },
      })
   })
   ```
   {% /if %}
   <!-- ends CDN async  -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends CDN sync -->
{% /if %}
<!-- ends 5.28.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

### Reactルーターの計測

React、Angular、Vue、または他のフロントエンドフレームワークを使用している場合、Datadogはフレームワークのルーターのレベルで`startView`ロジックを実装することを推奨します。

デフォルトのRUMビュー名をオーバーライドして、Reactアプリケーションで定義した方法に合わせるには、以下の手順に従う必要があります。

**注意**: これらの指示は**React Router v6**ライブラリに特有です。

1.RUMブラウザSDKを初期化する際は、`trackViewsManually`を`true`に設定してください。[上記の通り](#override-default-rum-view-names)。

2.各ルート変更のためにビューを開始してください。
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';
   import { datadogRum } from "@datadog/browser-rum";

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         datadogRum.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         DD_RUM.onReady(function() {
            DD_RUM.startView({name: viewName});
         });
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         window.DD_RUM &&
            window.DD_RUM.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}
{% /if %}
<!-- Ends 2.17.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}
### ビュー名を設定する

`setViewName(name: string)`を使用して現在のビューの名前を更新してください。これにより、新しいビューを開始することなく、ビュー名を変更することができます。
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.setViewName('<VIEW_NAME>');

   // Code example
   datadogRum.setViewName('Checkout');
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('<VIEW_NAME>');
   })

   // Code example
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('Checkout');
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

   // Code example
   window.DD_RUM && window.DD_RUM.setViewName('Checkout');
   ```
   {% /if %}

**注意**: ビュー名を変更すると、そのメソッドが呼び出された時点からビューとその子イベントに影響を与えます。
{% /if %}
<!-- Ends 2.17.0 -->

詳細については、[ブラウザモニタリングの設定][4]を参照してください。


##RUMデータを豊かにし、制御する

RUMブラウザSDKはRUMイベントをキャプチャし、その主要属性を埋め込みます。`beforeSend`コールバック関数は、RUMブラウザSDKによって収集されたすべてのイベントにアクセスすることを可能にします。これらはDatadogに送信される前のものです。

RUMイベントを傍受することで、次のことが可能になります：

-追加のコンテキスト属性でRUMイベントを豊かにする
-RUMイベントを修正して、その内容を変更したり、機密のシーケンスを削除したりします（[編集可能なプロパティのリスト](#modify-the-content-of-a-rum-event)を参照）。
-選択したRUMイベントを破棄する

<!-- Version must meet 2.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.13.0") %}
[バージョン2.13.0][5]以降、`beforeSend`は2つの引数を取ります：RUMブラウザSDKによって生成された`event`と、RUMイベントの作成をトリガーした`context`です。

```javascript
function beforeSend(event, context)
```

潜在的な`context`の値は：

| RUMイベントタイプ   | コンテキスト                   |
|------------------|---------------------------|
| ビュー             | [位置][6]                  |
| アクション           | [イベント][7]および処理スタック                     |
| リソース（XHR）   | [XMLHttpRequest][8]、[PerformanceResourceTiming][9]、および処理スタック            |
| リソース (取得) | [リクエスト][10]、[レスポンス][11]、[パフォーマンスリソースタイミング][9]、およびスタックの処理 |
| リソース (その他) | [パフォーマンスリソースタイミング][9] |
| エラー | [エラー][12] |
| Long Task        | [PerformanceLongTaskTiming][13] |

詳細については、[RUMデータの強化と制御ガイド][14]を参照してください。
{% /if %}
<!-- ends 2.13.0 -->

### RUMイベントを強化する

[グローバルコンテキストAPI](#global-context)または[フィーチャーフラグデータ収集](#enrich-rum-events-with-feature-flags)で追加された属性に加えて、イベントに追加のコンテキスト属性を追加できます。例えば、フェッチレスポンスオブジェクトから抽出したデータでRUMリソースイベントにタグを付けます：
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event, context) => {
         // collect a RUM resource's response headers
         if (event.type === 'resource' && event.resource.type === 'fetch') {
               event.context.responseHeaders = Object.fromEntries(context.response.headers)
         }
         return true
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      });
   ```   
   {% /if %}

ユーザーが複数のチームに所属している場合は、グローバルコンテキストAPIへの呼び出しに追加のキーと値のペアを追加してください。

RUMブラウザSDKは、`event.context`の外部で追加された属性を無視します。

###フィーチャーフラグでRUMイベントを強化する

[フィーチャーフラグでRUMイベントデータを強化する][14]ことで、パフォーマンスモニタリングに関する追加のコンテキストと可視性を得ることができます。これにより、特定のユーザーエクスペリエンスがどのユーザーに表示されているか、またそれがユーザーのパフォーマンスに悪影響を与えているかを判断できます。

###RUMイベントの内容を変更する

例えば、ウェブアプリケーションのURLからメールアドレスを削除するには：
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event) => {
         // remove email from view url
         event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      });
   ```
   {% /if %}

次のイベントプロパティを更新できます：

| 属性 | タイプ | 説明 |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | 文字列 | アクティブなウェブページのURL。                                                                                                                                                          |
| `view.referrer`                | 文字列 | 現在要求されているページへのリンクがフォローされた前のウェブページのURL。                                                                                         |
| `view.name`                    | 文字列 | 現在のビューの名前。                                                                                                                                                            |
| `view.performance.lcp.resource_url` | 文字列 | 最大コンテンツフルペイントのリソースURL。                                                                                                                                |
| `service`                      | 文字列 | アプリケーションのサービス名。                                                                                                                                                   |
| `version`                      | 文字列 | アプリケーションのバージョン。例えば：1.2.3、6c44da20、または2020.02.13。                                                                                                                  |
| `action.target.name`           | 文字列 | ユーザーが操作した要素。自動収集されたアクションのみに適用されます。                                                                                                     |
| `error.message`                | 文字列 | エラーを説明する簡潔で人間が読みやすい1行のメッセージ。                                                                                                                        |
| `error.stack`                 | 文字列 | エラーに関するスタックトレースまたは補足情報。                                                                                                                            |
| `error.resource.url`           | 文字列 | エラーを引き起こしたリソースのURL。                                                                                                                                               |
| `resource.url`                 | 文字列 | リソースのURL。                                                                                                                                                                        |
| `long_task.scripts.source_url` | 文字列 | スクリプトリソースのURL                                                                                                                                                                   |
| `long_task.scripts.invoker`    | 文字列 | スクリプトが呼び出された方法を示す意味のある名前                                                                                                                                    |
| `context`                      | オブジェクト | [グローバルコンテキストAPI](#global-context)、[ビューコンテキストAPI](#view-context)、または手動でイベントを生成する際に追加された属性（例えば、`addError` と **`addAction`**）。|

RUMブラウザSDKは、上記にリストされていないイベントプロパティへの変更を無視します。イベントプロパティに関する詳細は、[RUMブラウザSDK GitHubリポジトリ][15]を参照してください。

**注意**: 他のイベントとは異なり、ビューイベントはライフサイクル中の更新を反映するためにDatadogに複数回送信されます。新しいビューがアクティブな間でも、以前のビューイベントの更新を送信することができます。Datadogは、ビューイベントの内容を変更する際にこの動作に注意することを推奨します。

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### RUMイベントを破棄する

`beforeSend` APIを使用して、`false`を返すことでRUMイベントを破棄します。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...,
   beforeSend: (event) => {
      if (shouldDiscard(event)) {
         return false
      }
      ...
   },
   ...
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
        },
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```
{% /if %}

**注意**: ビューイベントは破棄できません。

##ユーザーセッション

RUMセッションにユーザー情報を追加することで、次のことが可能になります：

- 特定のユーザーの旅を追跡する
- エラーの影響を最も受けているユーザーを把握する
- 最も重要なユーザーのパフォーマンスを監視する

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt=" RUM UIのユーザーAPI" /%}

<!-- Version must meet 6.4.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "6.4.0") %}
バージョン6.4.0以降では、次の属性が利用可能です：

| 属性 | タイプ | 必須 | 説明                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | はい | ユーザーの一意の識別子。                                                                                 |
| `usr.name`  | 文字列 | いいえ | ユーザーのフレンドリーな名前、デフォルトでRUM UIに表示されます。                                                 |
| `usr.email` | 文字列 | いいえ | ユーザーのメールアドレス、ユーザー名が存在しない場合にRUM UIに表示されます。これはGravatarを取得するためにも使用されます。 |
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(semverIsAtLeast($rum_browser_sdk_version, "6.4.0")) %}
以下の属性は、バージョン6.4.0以前ではオプションですが、Datadogは少なくとも1つの属性を提供することを強く推奨します。例えば、デフォルトのRUMダッシュボードの一部として`usr.id`に依存する関連データを表示するために、セッションにユーザーIDを設定する必要があります。

|属性 | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | ユーザーの一意の識別子。                                                                                 |
| `usr.name`  | 文字列 | ユーザーのフレンドリーな名前、デフォルトでRUM UIに表示されます。                                                 |
| `usr.email` | 文字列 | ユーザーのメールアドレス、ユーザー名が存在しない場合にRUM UIに表示されます。これはGravatarを取得するためにも使用されます。|

**注意**: `usr.name`が設定されていない場合、`usr.email`および`usr.id`が定義されていても、RUM UIには「公開ユーザー」と表示されます。

推奨される属性に追加の属性を加えることで、フィルタリング機能を向上させてください。例えば、ユーザープランやユーザーグループに関する情報を追加してください。

ユーザーセッションオブジェクトに変更を加えると、変更後に収集されたすべてのRUMイベントには更新された情報が含まれます。

**注意**: ログアウトのようにユーザーセッション情報を削除すると、ログアウト前の最後のビューのユーザー情報は保持されますが、後のビューやセッションレベルでは保持されません。セッションデータは最後のビューの値を使用します。
{% /if %}
<!-- ends not 6.4.0 -->

### ユーザーセッションを特定する

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

### ユーザーセッションにアクセスする

`datadogRum.getUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getUser()
```
{% /if %}

### ユーザーセッションプロパティを追加/上書きする

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```
{% /if %}

### ユーザーセッションプロパティを削除する

`datadogRum.removeUserProperty('<USER_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeUserProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{% /if %}

### ユーザーセッションプロパティをクリアする

`datadogRum.clearUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{% /if %}

## アカウント

ユーザーを異なるセットにグループ化するには、アカウントの概念を使用してください。

以下の属性が利用可能です：

| 属性      | タイプ   | 必須 | 説明                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | 文字列 | はい      | ユニークなアカウント識別子。                                |
| `account.name` | 文字列 | いいえ       | アカウントのフレンドリーネーム、デフォルトでRUM UIに表示されます。|

### アカウントを特定する

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

### アカウントにアクセスする

`datadogRum.getAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```
{% /if %}

### アカウントプロパティを追加/上書きする

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```
{% /if %}

### アカウントプロパティを削除する

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeAccountProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{% /if %}

### アカウントプロパティをクリアする

`datadogRum.clearAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{% /if %}

## サンプリング

デフォルトでは、収集されたセッションの数に対してサンプリングは適用されません。収集されたセッションの数に対して相対的なサンプリング（パーセント）を適用するには、RUMを初期化する際に`sessionSampleRate`パラメータを使用してください。

以下の例では、特定のRUMアプリケーションで全セッションの90%のみを収集します：
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{% /if %}

サンプリングから除外されたセッションでは、そのセッションに関連するすべてのページビューとテレメトリは収集されません。

##ユーザートラッキングの同意

GDPR、CCPA、および同様の規制に準拠するために、RUMブラウザSDKでは初期化時にトラッキング同意値を提供できます。トラッキング同意に関する詳細は、[データセキュリティ][17]を参照してください。

`trackingConsent`初期化パラメータは、以下のいずれかの値にすることができます：

1. `"granted"`（デフォルト）：RUMブラウザSDKはデータの収集を開始し、Datadogに送信します。
2. `"not-granted"`：RUMブラウザSDKはデータを収集しません。

RUMブラウザSDKが初期化された後にトラッキング同意値を変更するには、`setTrackingConsent()` APIコールを使用してください。RUMブラウザSDKは新しい値に応じて動作を変更します：

-が`"granted"`から`"not-granted"`に変更された場合、RUMセッションは停止し、データはもはやDatadogに送信されません。
-`"not-granted"`から`"granted"`に変更された場合、以前のセッションがアクティブでない場合は新しいRUMセッションが作成され、データ収集が再開されます。

この状態はタブ間で同期されず、ナビゲーション間で持続されません。RUMブラウザSDKの初期化時にユーザーの決定を提供する責任があります、または`setTrackingConsent()`を使用してください。

`setTrackingConsent()`が`init()`の前に使用されると、提供された値が初期化パラメータよりも優先されます。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{% /if %}

## ビューコンテキスト


[バージョン5.28.0][20]以降、ビューイベントのコンテキストは変更可能です。コンテキストは現在のビューにのみ追加でき、その子イベント（`action`、`error`、`timing`など）を`startView`、`setViewContext`、`setViewContextProperty`関数でポピュレートします。

###コンテキストでビューを開始する

オプションで、[`startView`オプション](#override-default-rum-view-names)を使用してビューを開始する際にコンテキストを定義できます。

###ビューコンテキストを追加する

RUMビューイベントと対応する子イベントのコンテキストを`setViewContextProperty(key: string, value: any)` APIで豊かにしたり、修正したりします。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### ビューコンテキストを置き換える

RUMビューイベントと対応する子イベントのコンテキストを`setViewContext(context: Context)` APIで置き換えます。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## エラーコンテキスト

### dd_contextを使用してローカルエラーコンテキストを添付する

エラーをキャプチャする際、エラーが生成される時点で追加のコンテキストを提供できます。`addError()` APIを通じて追加情報を渡す代わりに、エラーインスタンスに直接`dd_context`プロパティを添付できます。RUMブラウザSDKはこのプロパティを自動的に検出し、最終的なエラーイベントコンテキストに統合します。

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## グローバルコンテキスト

### グローバルコンテキストプロパティを追加する

RUMが初期化された後、`setGlobalContextProperty(key: string, value: any)` APIを使用してアプリケーションから収集されたすべてのRUMイベントに追加のコンテキストを追加します：
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### グローバルコンテキストプロパティを削除する

以前に定義されたグローバルコンテキストプロパティを削除できます。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### グローバルコンテキストを置き換える

すべてのRUMイベントのデフォルトコンテキストを`setGlobalContext(context: Context)` APIで置き換えます。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### グローバルコンテキストをクリアする

グローバルコンテキストは`clearGlobalContext`を使用してクリアできます。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### グローバルコンテキストを読む

RUMが初期化されると、`getGlobalContext()` APIを使用してグローバルコンテキストを読み取ります。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

## コンテキストのライフサイクル

デフォルトでは、グローバルコンテキストとユーザーコンテキストは現在のページメモリに保存されるため、次のようにはなりません：

- ページの完全なリロード後に保持されません
- 同じセッションの異なるタブやウィンドウ間で共有されません

それらをセッションのすべてのイベントに追加するには、各ページに添付する必要があります。

<!-- Version must meet 4.49.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.49.0") %}
バージョン4.49.0で`storeContextsAcrossPages`構成オプションが導入されたことで、これらのコンテキストは[`localStorage`][18]に保存でき、次の動作が可能になります：

- コンテキストは完全なリロード後も保持されます
- コンテキストは同じオリジンで開かれたタブ間で同期されます

ただし、この機能にはいくつかの**制限**があります：

- これらのコンテキストに個人を特定できる情報（PII）を設定することは推奨されません。なぜなら、`localStorage`に保存されたデータはユーザーセッションを超えて存続するからです。
- この機能は`trackSessionAcrossSubdomains`オプションと互換性がありません。なぜなら、`localStorage`データは同じオリジン間でのみ共有されるからです（login.site.com ≠ app.site.com）
- `localStorage` はオリジンごとに5 MiBに制限されているため、アプリケーション固有のデータ、Datadogコンテキスト、およびローカルストレージに保存された他のサードパーティデータは、この制限内に収める必要があります。そうしないと問題が発生します。

{% /if %}
<!-- ends  4.49.0 -->

## 内部コンテキスト

DatadogブラウザRUM SDKが初期化された後、SDKの内部コンテキストにアクセスできます。これにより、SDKが内部で使用するセッションIDやアプリケーションの詳細などのコア識別子とメタデータが提供されます。

次の属性を探索できます：

| 属性      | 説明                                                       |
| -------------- | ----------------------------------------------------------------- |
| アプリケーションID | アプリケーションのIDです。                                           |
| セッションID | セッションのIDです。                                               |
| ユーザーアクション | アクションIDを含むオブジェクト（アクションが見つからない場合は未定義）。|
| ビュー | 現在のビューイベントに関する詳細を含むオブジェクトです。          |

詳細については、[RUMブラウザデータ収集][2]を参照してください。

###例

```json
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

特定の時間のコンテキストを取得するために、`startTime` パラメータをオプションで使用できます。パラメータが省略された場合、現在のコンテキストが返されます。

```typescript
getInternalContext (startTime?: 'number' | undefined)
```
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}


## マイクロフロントエンド

RUMブラウザSDKは、`service` および `version` 属性を使用して、特定のマイクロフロントエンドにイベントを割り当てることで、マイクロフロントエンドアーキテクチャをサポートします。単一のRUM SDKインスタンスは、シェルレベルで実行されます。イベントは `service` および `version` によってセグメント化され、チームはダッシュボードをフィルタリングし、アラートを設定し、マイクロフロントエンドごとのパフォーマンスを追跡できます。

Datadogは、RUMイベントをマイクロフロントエンドに割り当てるための2つのアプローチを提供します：

1. **自動割り当て**: ソースコードコンテキストを注入するビルドプラグインを使用し、手動のスタックトレース解析を排除します。
2. **手動割り当て**: スタックトレースを解析し、サービス情報を抽出するために `beforeSend` コールバックを使用します。


### 自動サービスおよびバージョン割り当て

このアプローチは、ビルドプラグインを使用してソースコードコンテキストをバンドルに注入し、RUM SDKが自動的に読み取って正しい `service` および `version` でイベントを豊かにします。

####前提条件とサポートされているセットアップ

-   **分離されたバンドル**: 各マイクロフロントエンドは、異なるファイルパスを持つ独自のバンドルを持ちます。例えば、[モジュールフェデレーション][21]を使用します。
-   **サポートされているバンドラー**: [Datadogビルドプラグインによってサポートされているバンドラー][22]を使用します。
-   **ブラウザSDK**: ブラウザSDKのバージョンはv6.30.1以上です。

####セットアップガイド

**ステップ1 - 各マイクロフロントエンドのために[ビルドプラグイン][23]を設定します**

各マイクロフロントエンドのビルド設定で、ソースコードコンテキストのインジェクションを有効にします：

{% tabs %}
{% tab label="Webpack" %}

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
    plugins: [
        new datadogWebpackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Vite" %}

```javascript
import { datadogVitePlugin } from '@datadog/vite-plugin';

export default {
    plugins: [
        datadogVitePlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="esbuild" %}

```javascript
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
    plugins: [
        datadogEsbuildPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
});
```
{% /tab %}

{% tab label="ロールアップ" %}

```javascript
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
    plugins: [
        datadogRollupPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Rspack" %}

```javascript
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
    plugins: [
        new datadogRspackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}
{% /tabs %}

**ステップ2 - シェルレベルでブラウザSDKを設定する**

[シェルアプリケーション（メインエントリーポイント）でブラウザモニタリングを設定する][4]。ブラウザSDKは、コンテキストマップからの`service`と`version`を使用して、RUMイベント（エラー、カスタムアクション、XHR/Fetchリソース、長いタスク、バイタル）を自動的に強化します。

{% alert level="warning" %}
マイクロフロントエンドに一致しないイベントは、シェルレベルのサービスとバージョンにフォールバックします。
{% /alert %}

**ステップ3 - [Datadogでマイクロフロントエンドデータを探索する](#explore-micro-frontend-data-in-datadog)**


<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

###手動サービスおよびバージョンの帰属

`beforeSend`プロパティでは、サービスおよびバージョンのプロパティを上書きできます。イベントの発生元を特定するために、`context.handlingStack`プロパティを使用してください。
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

正規表現は、アプリケーションのファイルパス構造に一致する必要があります。パターンを調整して、バンドルURLからサービスとバージョンを抽出します。RUMエクスプローラーの任意のクエリは、サービス属性を使用してイベントをフィルタリングできます。
<!-- ends  5.22 -->

{% /if %}

###制限事項

一部のイベントは、関連するハンドリングスタックがないため、起源に帰属できません：

-自動的に収集されたアクションイベント
-XHRおよびFetch以外のリソースイベント
-自動的に収集されたビューイベント
-CORSおよびCSP違反

###Datadogでマイクロフロントエンドデータを探索する

セットアップ後、RUMイベントの`service`と`version`は、どのマイクロフロントエンドが各イベントを生成したかを特定します。これらの属性をDatadogのいくつかの場所で使用します：

-   **サイドパネル**：`service`および`version`属性は、RUMエクスプローラーのセッション、ビュー、エラー、リソース、アクション、長いタスクのサイドパネルに表示されます。
-   **RUMサマリーダッシュボード**：`service`および`version`を使用して、RUMサマリーダッシュボードで特定のマイクロフロントエンドにパフォーマンスメトリクスを絞り込みます。
-   **カスタムダッシュボード**：`service`および`version`を使用して、各マイクロフロントエンドを独立して監視するダッシュボードを作成します。

[1]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[17]: /ja/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[19]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[20]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration#override-default-rum-view-names
[21]: https://module-federation.io/
[22]: https://github.com/DataDog/build-plugins?tab=readme-ov-file#usage
[23]: https://github.com/DataDog/build-plugins