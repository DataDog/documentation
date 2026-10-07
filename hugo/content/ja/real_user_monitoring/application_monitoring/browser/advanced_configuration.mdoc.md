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
description: RUM ブラウザ SDK を構成して、アプリケーションのニーズに対応できるよう、データ収集に変更を加え、ビュー名をオーバーライドし、ユーザーセッションを管理し、サンプリングを制御します。
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: ユーザーアクションの追跡
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: ドキュメント
  text: RUM ブラウザデータ収集
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: ドキュメント
  text: イベントへの視覚化の適用
- link: /logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: Datadog 標準属性
- link: https://learn.datadoghq.com/courses/configure-rum-javascript
  tag: ラーニングセンター
  text: JavaScript Web アプリケーション向けに RUM (Real User Monitoring) を構成します。
title: 高度なコンフィギュレーション
---
## 概要 {% #overview %}

RUM によって[収集されたデータおよびコンテキスト][1]を、次のニーズをサポートするために変更する方法は、さまざまあります。

- 個人を特定できる情報などの機密データを保護します。
- サポートを支援するために、ユーザーセッションをそのユーザーの内部 ID に接続します。
- データをサンプリングすることにより、収集する RUM データの量を削減します。
- データの送信元について、デフォルトの属性が提供するものよりも多くのコンテキストを提供します。

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

## デフォルトの RUM ビュー名をオーバーライドする {% #override-default-rum-view-names %}

[バージョン 2.17.0][3] からは、`trackViewsManually` オプションでビューイベントを手動で追跡することにより、ビュー名を追加して、チームが所有する専用サービスに割り当てることができます。

RUM ブラウザ SDK は、ユーザーが訪れた新しいページごとに[ビューイベント][2]を自動生成します。また、ページ URL が変更された場合 (シングルページアプリケーションの場合) にも生成されます。ビュー名は現在のページ URL から計算され、可変 ID は自動的に削除されます。少なくとも 1 つの数字を含むパスセグメントは、可変 ID と見なされます。たとえば、`/dashboard/1234` と `/dashboard/9a` は `/dashboard/?` になります。

デフォルトの RUM ビュー名をオーバーライドするには、次のようにします。

1. RUM ブラウザ SDK を初期化する際に、`trackViewsManually` を true に設定します。

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
2. 新しいページまたはルート変更 (シングルページアプリケーションの場合) のたびにビューを開始する必要があります。ビューが開始されると、RUM データが収集されます。
{% /if %}
<!-- Ends 2.17.0 -->


<!-- Version must meet 4.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.13.0") %}

### サービス名とバージョンを定義する {% #define-service-name-and-version %}

[バージョン 4.13.0][16] 以降は、関連するサービス名とバージョンもオプションとして定義できます。

- **ビュー名**: デフォルトはページの URL パスです。
- **サービス**: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのサービスです。
- **バージョン**: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのバージョンです。
{% /if %}
<!-- ends 4.13.0 -->

<!-- version exclusive examples below-->

<!-- before 4.13 -->
{% if includes($rum_browser_sdk_version, ["lt_2_13_0", "gte_2_13_0", "gte_2_17_0"]) %}

## ページビューを手動で追跡する {% #manually-track-pageviews %}

次の例は、RUM アプリケーションの `checkout` ページでページビューを手動で追跡します。サービスとバージョンはどちらも指定できません。

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

次の例は、RUM アプリケーションの `checkout` ページでページビューを手動で追跡します。ビュー名には `checkout` を使用し、`purchase` サービスをバージョン `1.2.3` に関連付けます。

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

- **コンテキスト**: [バージョン 5.28.0][19] から、ビューおよびその子イベントにコンテキストを追加できます。

次の例は、RUM アプリケーションの `checkout` ページでページビューを手動で追跡します。ビュー名には `checkout` を使用し、`purchase` サービスをバージョン `1.2.3` に関連付けます。

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

### React ルーターのインスツルメンテーション {% #react-router-instrumentation %}

React、Angular、Vue、またはその他のフロントエンドフレームワークを使用している場合、Datadog はフレームワークルーターレベルで `startView` ロジックを実装することをお勧めします。

デフォルトの RUM ビュー名をオーバーライドして、React アプリケーションで定義したビュー名と一致させるには、以下の手順に従う必要があります。

**注**: これらの手順は、**React Router v6** ライブラリに固有のものです。

1. [前述](#override-default-rum-view-names)のようにして、RUM ブラウザ SDK を初期化する際に、`trackViewsManually` を `true` に設定します。

2. ルート変更ごとのビューを開始します。
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
### ビュー名を設定する {% #set-view-name %}

現在のビューの名前を更新するには、`setViewName(name: string)` を使用します。これにより、新しいビューを開始することなく、ビュー表示中にビュー名を変更できます。
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

**注**: ビュー名を変更すると、そのメソッドが呼び出された後、当該時点以降のビューおよびその子イベントに影響します。
{% /if %}
<!-- Ends 2.17.0 -->

詳しくは、[ブラウザモニタリングの設定][4]をご覧ください。


## RUM データを強化および制御する {% #enrich-and-control-rum-data %}

RUM ブラウザ SDK は RUM イベントをキャプチャし、主要な属性を設定します。コールバック関数 `beforeSend` を使用することにより、RUM SDK によって収集されたすべてのイベントを Datadog に送信する前に、それにアクセスすることができます。

RUM イベントをインターセプトすると、次のことが可能になります。

- 追加のコンテキスト属性で RUM イベントを強化する
- RUM イベントを変更してコンテンツを変更するか、機密性の高いシーケンスを編集する ([編集可能なプロパティのリスト](#modify-the-content-of-a-rum-event)を参照)
- 選択した RUM イベントを破棄する

<!-- Version must meet 2.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.13.0") %}
[バージョン 2.13.0][5] 以降、`beforeSend` は 2 つの引数を取ります。RUM ブラウザ SDK によって生成された `event` と、RUM イベントの作成をトリガーした `context` です。

```javascript
function beforeSend(event, context)
```

潜在的な `context` 値は次のとおりです。

| RUM イベントタイプ   | コンテキスト                   |
|------------------|---------------------------|
| ビュー             | [場所][6]                  |
| アクション           | [イベント][7] とハンドリングスタック                     |
| リソース (XHR)   | [XMLHttpRequest][8]、[PerformanceResourceTiming][9]、およびハンドリングスタック            |
| リソース (フェッチ) | [リクエスト][10]、[応答][11]、[PerformanceResourceTiming][9]、およびハンドリングスタック      |
| リソース (その他) | [PerformanceResourceTiming][9] |
| エラー            | [エラー][12]                     |
| Long Task        | [PerformanceLongTaskTiming][13] |

詳細については、[RUM データの強化と制御ガイド][14]を参照してください。
{% /if %}
<!-- ends 2.13.0 -->

### RUM イベントを強化する {% #enrich-rum-events %}

イベントには、[グローバルコンテキスト API](#global-context) または [Feature Flag データ収集](#enrich-rum-events-with-feature-flags)で追加された属性に加えて、追加のコンテキスト属性を設定できます。たとえば、RUM リソースイベントに、フェッチ応答オブジェクトから抽出したデータのタグを付けます。
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

ユーザーが複数のチームに所属している場合は、グローバルコンテキスト API を呼び出す際に、Key-Value ペアを追加してください。

RUM Browser SDK は `event.context` 以外に追加された属性を無視します。

### 機能フラグで RUM イベントをリッチ化する {% #enrich-rum-events-with-feature-flags %}

[フィーチャーフラグで RUM イベントデータを強化する][14]ことにより、パフォーマンスモニタリングについての追加のコンテキストや可視性を得ることができます。これにより、どのユーザーに特定のユーザーエクスペリエンスが表示されるかを判別でき、またそれがユーザーのパフォーマンスに悪影響を与えているかどうかを判断することができます。

### RUM イベントのコンテンツを変更 {% #modify-the-content-of-a-rum-event %}

たとえば、Web アプリケーションの URL からメールアドレスを編集するには
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

次のイベントプロパティを更新できます。

| 属性                      | 型   | 説明                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | 文字列 | アクティブな Web ページの URL。                                                                                                                                                          |
| `view.referrer`                | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。                                                                                         |
| `view.name`                    | 文字列 | 現在のビューの名前。                                                                                                                                                            |
| `view.performance.lcp.resource_url` | 文字列 |   Largest Contentful Paint のリソース URL。                                                                                                                                |
| `service`                      | 文字列 | アプリケーションのサービス名。                                                                                                                                                   |
| `version`                      | 文字列 | アプリケーションのバージョン。たとえば: 1.2.3、6c44da20、または2020.02.13。                                                                                                                  |
| `action.target.name`           | 文字列 | ユーザーがやり取りした要素。自動的に収集されたアクションのみ。                                                                                                     |
| `error.message`                | 文字列 | エラーについて簡潔にわかりやすく説明する 1 行メッセージ。                                                                                                                        |
| `error.stack`                 | 文字列 | スタックトレースまたはエラーに関する補足情報。                                                                                                                            |
| `error.resource.url`           | 文字列 | エラーをトリガーしたリソース URL。                                                                                                                                               |
| `resource.url`                 | 文字列 | リソース URL。                                                                                                                                                                        |
| `long_task.scripts.source_url` | 文字列 | スクリプト リソース URL                                                                                                                                                                   |
| `long_task.scripts.invoker`    | 文字列 | スクリプトがどのように呼び出されたかを示す意味のある名前                                                                                                                                    |
| `context`                      | オブジェクト | [Global Context API](#global-context)、[View Context API](#view-context)、またはイベントを手動で生成する際 (`addError` や **`addAction`**) に追加される属性。|

RUM ブラウザ SDK は、上記のリストにないイベントプロパティに加えられる変更を無視します。イベントプロパティについて詳しくは、[RUM ブラウザ SDK GitHub リポジトリ][15]を参照してください。

**注**: 他のイベントとは異なり、ビューのイベントはライフサイクル中に発生する更新を反映するために Datadog に複数回送信されます。新しいビューがアクティブな間も、過去のビューイベントに関する更新を送信することが可能です。Datadog では、ビューイベントの内容を変更する際にこの動作に注意することが推奨されています。

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### RUM イベントを破棄 {% #discard-a-rum-event %}

`beforeSend` API で、`false` を返し RUM イベントを破棄します。
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

**注**: ビューイベントは破棄できません。

## ユーザーセッション {% #user-session %}

RUM セッションにユーザー情報を追加することで、以下が可能になります。

- 特定のユーザーのジャーニーをたどる
- エラーの影響を最も受けているユーザーを把握する
- 最も重要なユーザーのパフォーマンスを監視する

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI 内のユーザー API" /%}

<!-- Version must meet 6.4.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "6.4.0") %}
バージョン6.4.0 以上では、以下の属性が利用可能です。

| 属性  | 型 | 必須 |  説明                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | Yes | 一意のユーザー識別子。                                                                                 |
| `usr.name`  | 文字列 | No| RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                 |
| `usr.email` | 文字列 | No | ユーザーのメール。ユーザー名が存在しない場合に RUM UI に表示されます。Gravatars を取得するためにも使用されます。|
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(semverIsAtLeast($rum_browser_sdk_version, "6.4.0")) %}
以下の属性は、バージョン6.4.0 より前はオプションでしたが、Datadog では少なくとも 1 つを指定することが強く推奨されています。たとえば、一部のデフォルト RUM ダッシュボードで関連データを表示する場合、クエリの一部として `usr.id` に依存するため、セッションにユーザー ID を設定する必要があります。

| 属性  | 型 | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | 一意のユーザー識別子。                                                                                 |
| `usr.name`  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                 |
| `usr.email` | 文字列 | ユーザーのメール。ユーザー名が存在しない場合に RUM UI に表示されます。Gravatars を取得するためにも使用されます。|

**注**: `usr.name` が設定されていない場合は、`usr.email` や `usr.id` が定義されていても、RUM UI には 'Public User' と表示されます。

推奨される属性に加えて、追加属性を加えることでフィルタリング機能を向上させてください。たとえば、ユーザープランや所属するユーザーグループに関する情報を追加します。

ユーザーセッションオブジェクトに変更を加えた場合、変更後に収集されるすべての RUM イベントには、更新された情報が含まれます。

**注**: ログアウトのようにユーザーセッション情報を削除すると、ログアウト前の最後のビューではユーザー情報が保持されますが、それ以降のビューやセッションレベルでは、セッションデータは最後のビューの値を使用するため保持されません。
{% /if %}
<!-- ends not 6.4.0 -->

### ユーザーセッションを特定する {% #identify-user-session %}

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

### ユーザーセッションにアクセスする {% #access-user-session %}

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

### ユーザーセッションプロパティの追加/オーバーライド {% #addoverride-user-session-property %}

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

### ユーザーセッションプロパティを削除する {% #remove-user-session-property %}

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

### ユーザーセッションプロパティをクリアする {% #clear-user-session-property %}

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

## アカウント {% #account %}

ユーザーを別のセットに分類するには、アカウントの概念を使用します。

次の属性を利用できます:

| 属性      | 型   | 必須 | 説明                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | 文字列 | Yes      | 一意のアカウント識別子。                                |
| `account.name` | 文字列 | No      | RUM UI にデフォルトで表示されるユーザーフレンドリーなアカウント。|

### アカウントを特定する {% #identify-account %}

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

### アカウントにアクセスする {% #access-account %}

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

### アカウントプロパティの追加/オーバーライド {% #addoverride-account-property %}

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

### アカウントプロパティを削除する {% #remove-account-property %}

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

### アカウントプロパティをクリアする {% #clear-account-properties %}

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

## サンプリング {% #sampling %}

デフォルトの場合、収集されたセッションの数にはサンプリングが適用されません。収集されたセッションの数に対して相対サンプリング (パーセント) を適用するには、RUM 初期化時に `sessionSampleRate` パラメーターを使用します。

下記の例では、RUM アプリケーションの全セッションの 90% のみを収集します。
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

サンプルとして抽出したセッションでは、すべてのページビューとそのセッションに紐付くテレメトリーは収集されません。

## ユーザー追跡の同意 {% #user-tracking-consent %}

GDPR、CCPA、および同様の規制に準拠するために、RUM Browser SDK では初期化時に追跡に関する同意を提供できます。追跡に関する同意について詳しくは、[データセキュリティ][17]を参照してください。

`trackingConsent` の初期化パラメーターは次のいずれかの値で示されます。

1. `"granted"` (デフォルト): RUM Browser SDK はデータの収集を開始し、それをDatadog に送信します。
2. `"not-granted"`: RUM Browser SDK はデータを収集しません。

RUM Browser SDK の初期化後に追跡同意値を変更するには、`setTrackingConsent()` API 呼び出しを使用します。RUM Browser SDK は新しい値に応じて動作を変更します。

- `"granted"` から `"not-granted"` に変更すると、RUM セッションは停止し、データは Datadog に送信されなくなります。
- `"not-granted"` から `"granted"` に変更すると、以前のセッションがアクティブでない場合、新しい RUM セッションが作成され、データ収集が再開されます。

この状態はタブ間で同期されず、ナビゲーション間で永続化されません。RUM Browser SDK の初期化時や、`setTrackingConsent()` を使用して、ユーザーの決定を提供するのはユーザーの責任です。

`setTrackingConsent()` が `init()` の前に使用された場合、指定された値が初期化パラメーターよりも優先されます。
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

## ビューコンテキスト {% #view-context %}


[バージョン 5.28.0][20] 以降、ビューイベントのコンテキストは変更可能です。コンテキストは現在のビューにのみ追加でき、その子イベント (`action`、`error`、`timing` など) が `startView`、`setViewContext`、および `setViewContextProperty` 関数を使用して設定されます。

### コンテキストを使用してビューを開始 {% #start-view-with-context %}

オプションとして、[`startView` のオプション ](#override-default-rum-view-names) を使用することにより、ビュー開始時にコンテキストを定義できます。

### ビューコンテキストを追加 {% #add-view-context %}

`setViewContextProperty(key: string, value: any)` API を使用して、RUM ビューイベントおよび対応する子イベントのコンテキストを拡充または変更します。
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

### ビューコンテキストを置き換える {% #replace-view-context %}

`setViewContext(context: Context)` API を使用して、RUM ビューイベントおよび対応する子イベントのコンテキストを置換します。
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

## エラー コンテキスト {% #error-context %}

### dd_context を使用したローカル エラー コンテキストの添付 {% #attaching-local-error-context-with-dd-context %}

エラーをキャプチャする際、エラー生成時点で追加のコンテキストを提供できます。`addError()` APIを通じて追加情報を渡す代わりに、`dd_context` プロパティをエラーインスタンスに直接添付できます。RUM Browser SDK がこのプロパティを自動的に検出し、最終的なエラーイベントコンテキストに統合します。

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## グローバルコンテキスト {% #global-context %}

### グローバルコンテキストプロパティを追加する {% #add-global-context-property %}

RUM を初期化した後、`setGlobalContextProperty(key: string, value: any)` API を使用してアプリケーションから収集したすべての RUM イベントにコンテキストを追加します。
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

### グローバルコンテキストプロパティを削除する {% #remove-global-context-property %}

以前に定義したグローバルコンテキストプロパティを削除することができます。
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

### グローバルコンテキストを置換 {% #replace-global-context %}

`setGlobalContext(context: Context)` API を使用してすべての RUM イベントのデフォルトコンテキストを置換します。
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

### グローバルコンテキストをクリアする {% #clear-global-context %}

グローバルコンテキストをクリアするには、`clearGlobalContext` を使用します。
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

### グローバルコンテキストを読み取る {% #read-global-context %}

RUM を初期化したら、`getGlobalContext()` API を使用してグローバルコンテキストを読み取ります。
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

## コンテキストのライフサイクル {% #contexts-life-cycle %}

デフォルトでは、グローバルコンテキストとユーザーコンテキストは現在のページメモリに格納されます。つまり、これらは

- ページのフルリロード後に保持されません
- 同じセッションの異なるタブまたはウィンドウ間で共有されません

セッションのすべてのイベントに追加するには、すべてのページにアタッチする必要があります。

<!-- Version must meet 4.49.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.49.0") %}
バージョン 4.49.0 で `storeContextsAcrossPages` 構成オプションが導入されたことにより、これらのコンテキストは [`localStorage`][18] に保存でき、以下の動作が可能になります。

- フルリロード後にコンテキストが保持される
- 同じオリジンで開かれたタブ間でコンテキストが同期される

しかし、この機能にはいくつかの**制限**があります。

- `localStorage` に格納されたデータはユーザーセッションよりも長続きするため、これらのコンテキストで個人を特定できる情報 (PII) を設定することは推奨されません
- この機能は `trackSessionAcrossSubdomains` のオプションと互換性がありません。なぜなら `localStorage` のデータは同じオリジン間 (login.site.com ≠ app.site.com) でしか共有されないからです
- `localStorage` はオリジンごとに 5 MiB に制限されているため、ローカルストレージに格納されているアプリケーション固有のデータ、 Datadog コンテキスト、およびその他のサードパーティデータは、問題を避けるためにこの制限内に収める必要があります

{% /if %}
<!-- ends  4.49.0 -->

## 内部コンテキスト {% #internal-context %}

Datadog ブラウザ RUM SDK が初期化されると、SDK の内部コンテキストにアクセスすることができます。これにより、SDK が内部で使用するセッション ID やアプリケーションの詳細などのコア識別子とメタデータが提供されます。

以下の属性を調べることができます。

| 属性      | 説明                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | アプリケーションの ID。                                           |
| session_id     | セッションの ID。                                               |
| user_action    | アクション ID を含むオブジェクト (アクションが見つからなかった場合は未定義)。|
| ビュー           | 現在のビューイベントに関する詳細を含むオブジェクト。          |

詳細については、[RUM ブラウザデータ収集][2]を参照してください。

### 例 {% #example %}

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

オプションで、`startTime` パラメーターを使用して、特定の時間のコンテキストを取得することができます。パラメーターが省略された場合、現在のコンテキストが返されます。

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


## マイクロフロントエンド {% #micro-frontend %}

RUM Browser SDKは、`service` と `version` の属性を使用して特定のマイクロフロントエンドにイベントを割り当てることにより、マイクロフロントエンドアーキテクチャをサポートします。単一の RUM SDK インスタンスは、シェルレベルで実行されます。イベントは `service` と `version` によってセグメント化されるので、チームはダッシュボードをフィルタリングし、アラートを設定し、マイクロフロントエンドごとのパフォーマンスを追跡することができます。

Datadog には、RUM イベントをマイクロフロントエンドに割り当てるために、以下の2つのアプローチが用意されています。

1. **自動割り当て**: ソースコードコンテキストを取り込むビルドプラグインを使用し、手動のスタックトレース解析を排除します。
2. **手動割り当て**: `beforeSend` コールバックを使用してスタックトレースを解析し、サービス情報を抽出します。


### 自動サービスとバージョン割り当て {% #automatic-service-and-version-attribution %}

このアプローチでは、ビルドプラグインを使用してソースコードコンテキストをバンドルに取り込み、RUM SDK が自動的に読み取って適切な `service` および `version` によりイベントを強化します。

#### 前提条件とサポートされているセットアップ {% #prerequisites-and-supported-setups %}

-   **別個のバンドル**: 各マイクロフロントエンドには、[モジュールフェデレーション][21]を使うなど、ファイルパスが異なる独自のバンドルがあります。
-   **サポートされているバンドラー**: [Datadog ビルドプラグインによってサポートされている][22]バンドラーを使用します。
-   **ブラウザ SDK**: Browser SDK バージョンv6.30.1 以上。

#### セットアップガイド {% #setup-guide %}

**ステップ 1 - [マイクロフロントエンドごとにビルドプラグイン][23]を構成する**

各マイクロフロントエンドのビルド構成で、ソースコードコンテキストの取り込みを有効にします。

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

{% tab label="Rollup" %}

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

**ステップ2 - シェルレベルで Browser SDK をセットアップする**

シェルアプリケーション (メインエントリポイント) で[ブラウザのモニタリングをセットアップ][4]します。Browser SDK は、コンテキストマップからの `service` と `version` を使用することにより、RUM イベント (エラー、カスタムアクション、XHR/Fetch リソース、長時間タスク、バイタル) を自動的に機能拡張します。

{% alert level="warning" %}
マイクロフロントエンドに一致しないイベントは、シェルレベルのサービスおよびバージョンにフォールバックします。
{% /alert %}

**ステップ 3 - [Datadog でマイクロフロントエンドデータを探索する](#explore-micro-frontend-data-in-datadog)**


<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

### サービスとバージョンの手動割り当て {% #manual-service-and-version-attribution %}

`beforeSend` プロパティで、サービスとバージョンのプロパティをオーバーライドできます。`context.handlingStack` プロパティを使用すれば、イベントの発生元を特定する助けになります。
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

正規表現は、アプリケーションのファイルパス構造と一致する必要があります。バンドル URL からサービスとバージョンを抽出するよう、パターンを調整してください。RUM エクスプローラー内のクエリでは、サービス属性を使用してイベントをフィルタリングできます。
<!-- ends  5.22 -->

{% /if %}

### 制限事項 {% #limitations %}

#### 発生元が割り当てられていないイベント {% #events-without-an-attributed-origin %}

一部のイベントには関連するハンドリングスタックがないため、発生元に割り当てることができません。

-   自動的に収集されたアクションイベント
-   XHR および Fetch 以外のリソースイベント
-   自動的に収集されたビューイベント
-   CORS や CSP の違反

#### 複数マイクロフロントエンド間でのソースマップ解決 {% #source-map-resolution-across-micro-frontends %}

スタックトレース内に複数のマイクロフロントエンドのフレームが含まれている場合、イベントは、(エラー送出元の) 最上位フレームから、単一の `service` と `version` を受け取ります。その単一のサービスではイベントのソースマップが解決されるため、他のマイクロフロントエンドのフレームは、それぞれの `service` の下でソースマップが正しくアップロードされていた場合でも、縮小化されたままになります。

どのマイクロフロントエンドのソースマップを使用するかを制御するには、[手動割り当て](#manual-service-and-version-attribution)アプローチを使用し、`beforeSend` により `event.service` と `event.version` を設定します。縮小化解除されるのは、選択されたマイクロフロントエンドに属するフレームだけです。

### Datadog でマイクロフロントエンドデータを探索する {% #explore-micro-frontend-data-in-datadog %}

セットアップ後、RUM イベントの `service` と `version` により、どのマイクロフロントエンドが各イベントを生成したかが特定されます。これらの属性は Datadog のさまざまな場所で使用されます。

-   **サイドパネル**: `service` と `version` の属性は、RUM エクスプローラーのセッション、ビュー、エラー、リソース、アクション、長時間タスクのサイドパネルに表示されます。
-   **RUM サマリーダッシュボード**: RUM サマリーダッシュボードで `service` と `version` を使用することにより、パフォーマンスメトリクスをフィルタリングしてそのスコープを限定し、特定のマイクロフロントエンドに絞り込みます。
-   **カスタムダッシュボード**: `service` と `version` を使用することにより、各マイクロフロントエンドを個別にモニターできるダッシュボードを作成します。

各マイクロフロントエンドを表す `service` と `version` のタグは、以下の[無制限 RUM][24] メトリクスにも含まれています。

- `rum.measure.error`
- `rum.measure.operation`
- `rum.measure.operation.duration`

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
[24]: /ja/real_user_monitoring/rum_without_limits/