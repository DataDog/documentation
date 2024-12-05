---
aliases:
- /ja/real_user_monitoring/installation/advanced_configuration/
- /ja/real_user_monitoring/browser/modifying_data_and_context/
further_reading:
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: ユーザーアクションの追跡
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: /real_user_monitoring/browser/data_collected/
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
title: 高度な構成
---

## 概要

RUM によって[収集されたデータおよびコンテキスト][1]を、次のニーズをサポートするために変更する方法は、さまざまあります。

- 個人を特定できる情報などの機密データを保護します。
- サポートを支援するために、ユーザーセッションをそのユーザーの内部 ID に接続します。
- データをサンプリングすることにより、収集する RUM データの量を削減します。
- データの送信元について、デフォルトの属性が提供するものよりも多くのコンテキストを提供します。

## デフォルトの RUM ビュー名をオーバーライドする

RUM SDK は、ユーザーが新しいページにアクセスするたびに、またはページの URL が変更されたときに (シングルページアプリケーションの場合)、[ビューイベント][2]を自動的に生成します。ビュー名は現在のページの URL から計算され、可変英数字 ID は自動的に削除されます。たとえば、`/dashboard/1234` は `/dashboard/?` になります。

[バージョン 2.17.0][3] からは、`trackViewsManually` オプションでビューイベントを手動で追跡することにより、ビュー名を追加して、チームが所有する専用サービスに割り当てることができます。

1. RUM ブラウザ SDK を初期化する際に、`trackViewsManually` を true に設定します。

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
       ...,
       trackViewsManually: true,
       ...
   });
   ```
   {{% /tab %}}
   {{% tab "CDN 非同期" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN 同期" %}}
   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       });
   ```
   {{% /tab %}}
   {{< /tabs >}}

2. 新しいページまたはルート変更 (単一ページアプリケーションの場合) ごとにビューを開始する必要があります。RUM データは、ビューの開始時に収集されます。[バージョン 4.13.0][17] からは、オプションで、関連するサービス名およびバージョンを定義できます。

   - ビュー名: デフォルトは、ページの URL パスです。
   - サービス: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのサービスです。
   - バージョン: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのバージョンです。

   詳しくは、[ブラウザモニタリングの設定][4]をご覧ください。

   <details open>
     <summary>Latest version</summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. Use <code>checkout</code> for the view name and associate the <code>purchase</code> service with version <code>1.2.3</code>.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView({
     name: 'checkout',
     service: 'purchase',
     version: '1.2.3'
   })
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView({
         name: 'checkout',
         service: 'purchase',
         version: '1.2.3'
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
     name: 'checkout',
     service: 'purchase',
     version: '1.2.3'
   })
   ```
   {{% /tab %}}
   {{< /tabs >}}
   </details>

   <details>
     <summary>before <code>v4.13.0</code></summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. No service or version can be specified.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView('checkout')
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView('checkout')
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView('checkout')
   ```
   {{% /tab %}}
   {{< /tabs >}}

   </details>

React、Angular、Vue、またはその他のフロントエンドフレームワークを使用している場合、Datadog はフレームワークルーターレベルで `startView` ロジックを実装することをお勧めします。

### React ルーターのインスツルメンテーション

デフォルトの RUM ビュー名をオーバーライドして、React アプリケーションで定義したビュー名と一致させるには、以下の手順に従う必要があります。

**注**: これらの手順は、**React Router v6** ライブラリに固有のものです。

1. RUM Browser SDK を初期化する際に、[上記](#override-default-rum-view-names)の説明に従って `trackViewsManually` を `true` に設定します。

2. ルート変更ごとのビューを開始します。

   {{< tabs >}}
   {{% tab "NPM" %}}
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

   {{% /tab %}}
   {{% tab "CDN 非同期" %}}
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
   {{% /tab %}}
   {{% tab "CDN 同期" %}}
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
   {{% /tab %}}
   {{< /tabs >}}

## RUM データを強化および制御する

RUM ブラウザ SDK は RUM イベントをキャプチャし、それらの主な属性を設定します。`beforeSend` コールバック関数を使用すると、RUM ブラウザ SDK によって収集されたイベントが Datadog に送信される前に、そのすべてのイベントにアクセスできます。

RUM イベントをインターセプトすると、次のことが可能になります。

- 追加のコンテキスト属性で RUM イベントを強化する
- RUM イベントを変更して、コンテンツを変更したり、機密性の高いシーケンスを編集したりします ([編集可能なプロパティのリスト](#modify-the-content-of-a-rum-event)を参照してください)
- 選択した RUM イベントを破棄する

[バージョン 2.13.0][5] 以降、`beforeSend` は 2 つの引数を取ります。RUM ブラウザ SDK によって生成された `event` と、RUM イベントの作成をトリガーした `context` です。

```javascript
function beforeSend(event, context)
```

潜在的な `context` 値は次のとおりです。

| RUM イベントタイプ   | コンテキスト                   |
|------------------|---------------------------|
| ビュー             | [場所][6]                  |
| アクション           | [イベント][7]                     |
| リソース (XHR)   | [XMLHttpRequest][8] と [PerformanceResourceTiming][9]            |
| リソース (フェッチ) | [リクエスト][10]、[リソース][11]、[PerformanceResourceTiming][9]      |
| リソース (その他) | [PerformanceResourceTiming][9] |
| Error            | [エラー][12]                     |
| ロングタスク        | [PerformanceLongTaskTiming][13] |

詳細については、[RUM データの強化と制御ガイド][14]を参照してください。

### RUM イベントを強化する

[グローバルコンテキスト API](#global-context) や [機能フラグのデータ収集](#enrich-rum-events-with-feature-flags)で追加された属性に加えて、イベントにコンテキスト属性を追加できます。たとえば、フェッチ応答オブジェクトから抽出されたデータで RUM リソースイベントにタグを付けます。

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // RUM リソースの応答ヘッダーを収集します
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context.responseHeaders = Object.fromEntries(context.response.headers)
        }
        return true
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM リソースの応答ヘッダーを収集します
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context.responseHeaders = Object.fromEntries(context.response.headers)
            }
            return true
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM リソースの応答ヘッダーを収集します
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context.responseHeaders = Object.fromEntries(context.response.headers)
            }
            return true
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

ユーザーが複数のチームに所属している場合は、グローバルコンテキスト API を呼び出す際に、Key-Value ペアを追加してください。

RUM ブラウザ SDK は以下を無視します。

- `event.context` の外に追加された属性
- RUM ビューイベントコンテキストに加えられた変更

### 機能フラグで RUM イベントをリッチ化する

[RUM イベントデータを機能フラグでリッチ化する][14]ことで、パフォーマンスモニタリングにさらなるコンテキストと可視性を得ることができます。これにより、どのユーザーに特定のユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断することができます。

### RUM イベントのコンテンツを変更

たとえば、Web アプリケーションの URL からメールアドレスを編集するには

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // ビューの URL からメールを削除します
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // ビューの URL からメールを削除します 
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // ビューの URL からメールを削除します
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

次のイベントプロパティを更新できます。

|   属性           |   タイプ    |   説明                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   文字列  |   アクティブな Web ページの URL。                            |
|   `view.referrer`       |   文字列  |   現在リクエストされているページへのリンクがたどられた前のウェブページの URL。  |
|   `view.name`           |   文字列  |   現在のビューの名前。                            |
|   `action.target.name`  |   文字列  |   ユーザーが操作した要素。自動的に収集されたアクションの場合のみ。              |
|   `error.message`       |   文字列  |   エラーについて簡潔にわかりやすく説明する 1 行メッセージ。                                 |
|   `error.stack `        |   文字列  |   スタックトレースまたはエラーに関する補足情報。                                     |
|   `error.resource.url`  |   文字列  |   エラーをトリガーしたリソース URL。                                                        |
|   `resource.url`        |   文字列  |   リソースの URL。                                                                                 |
|   `context`        |   オブジェクト  |   [グローバルコンテキスト API](#global-context) を使って、またはイベントを手動で生成するときに追加される属性 (例: `addError` および `addAction`)。RUM ビューイベント `context` は読み取り専用です。                                                                                 |

RUM ブラウザ SDK は、上記にリストされていないイベントプロパティに加えられた変更を無視します。イベントプロパティの詳細については、[RUM ブラウザ SDK GitHub リポジトリ][15]を参照してください。

### RUM イベントを破棄

`beforeSend` API で、`false` を返し RUM イベントを破棄します。

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

**注**: ビューイベントは破棄できません。

## ユーザーセッション

RUM セッションにユーザー情報を追加すると、次の役に立ちます。
* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API" >}}

次の属性はオプションですが、Datadog は少なくとも 1 つを指定することを推奨しています。

| 属性  | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | 一意のユーザー識別子。                                                                                  |
| `usr.name`  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| `usr.email` | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

推奨される属性に加えてさらに属性を追加することで、フィルタリング機能を向上できます。たとえば、ユーザープランに関する情報や、所属するユーザーグループなどを追加します。

ユーザーセッションオブジェクトに変更を加えた場合、変更後に収集されるすべての RUM イベントには、更新された情報が含まれます。

**注**: ログアウトのようにユーザーセッション情報を削除すると、ログアウト前の最後のビューではユーザー情報が保持されますが、それ以降のビューやセッションレベルでは、セッションデータは最後のビューの値を使用するため保持されません。

### ユーザーセッションを特定する

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションにアクセスする

`datadogRum.getUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティの追加/オーバーライド

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティを削除する

`datadogRum.removeUserProperty('<USER_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUserProperty('name')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティをクリアする

`datadogRum.clearUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{{% /tab %}}
{{< /tabs >}}

## サンプリング

デフォルトでは、収集セッション数にサンプリングは適用されていません。収集セッション数に相対サンプリング (% 表示) を適用するには、RUM を初期化する際に `sessionSampleRate` パラメーターを使用します。

下記の例では、RUM アプリケーションの全セッションの 90% のみを収集します。

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{{% /tab %}}
{{< /tabs >}}

サンプルとして抽出したセッションでは、すべてのページビューとそのセッションに紐付くテレメトリーは収集されません。

## ユーザー追跡に関する同意

GDPR、CCPA や同様の規制に準拠するため、RUM Browser SDK では初期化時に追跡に関する同意を提供することができます。追跡に関する同意の詳細については、[データセキュリティ][18]を参照してください。

`trackingConsent` の初期化パラメーターは以下のいずれかの値で示されます。

1. `"granted"`: RUM Browser SDK はデータの収集を開始し、Datadog に送信します。
2. `"not-granted"`: RUM Browser SDK はデータを収集しません。

RUM Browser SDK の初期化後に追跡同意値を変更するには、`setTrackingConsent()` API 呼び出しを使用します。RUM Browser SDK は、新しい値に応じて動作を変更します。

* `"granted"` から `"not-granted"` に変更すると、RUM セッションは停止し、データは Datadog に送信されなくなります。
* `"not-granted"` から `"granted"` に変更すると、以前のセッションがアクティブでない場合、新しい RUM セッションが作成され、データ収集が再開されます。

この状態はタブ間で同期されず、ナビゲーション間で永続化されません。RUM Browser SDK の初期化時や、`setTrackingConsent()` を使用して、ユーザーの決定を提供するのはあなたの責任です。

`setTrackingConsent()` が `init()` の前に使用された場合、指定された値が初期化パラメーターよりも優先されます。

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{< /tabs >}}

## グローバルコンテキスト

### グローバルコンテキストプロパティを追加する

RUM を初期化した後、`setGlobalContextProperty(key: string, value: any)` API を使用してアプリケーションから収集したすべての RUM イベントにコンテキストを追加します。

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// コード例
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// コード例
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// コード例
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}

### グローバルコンテキストプロパティを削除する

以前に定義したグローバルコンテキストプロパティを削除することができます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// コード例
datadogRum.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// コード例
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// コード例
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{< /tabs >}}


### グローバルコンテキストを置換

`setGlobalContext(context: Context)` API を使用してすべての RUM イベントのデフォルトコンテキストを置換します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// コード例
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// コード例
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// コード例
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

### グローバルコンテキストをクリアする

グローバルコンテキストをクリアするには、`clearGlobalContext` を使用します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### グローバルコンテキストを読み取る

RUM を初期化したら、`getGlobalContext()` API を使用してグローバルコンテキストを読み取ります。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## コンテキストのライフサイクル

デフォルトでは、グローバルコンテキストとユーザーコンテキストは現在のページメモリに格納されます。つまり、これらは

- ページのフルリロード後に保持されません
- 同じセッションの異なるタブまたはウィンドウ間で共有されません

セッションのすべてのイベントに追加するには、すべてのページにアタッチする必要があります。

ブラウザ SDK の v4.49.0 で `storeContextsAcrossPages` 構成オプションが導入され、これらのコンテキストを [`localStorage`][19] に格納できるようになり、以下の動作が可能になりました。

- フルリロード後にコンテキストが保持される
- 同じオリジンで開かれたタブ間でコンテキストが同期される

しかし、この機能にはいくつかの**制限**があります。

- `localStorage` に格納されたデータはユーザーセッションを超えて残るため、これらのコンテキストで個人を特定できる情報 (PII) を設定することは推奨されません
- この機能は `trackSessionAcrossSubdomains` オプションと互換性がありません。なぜなら `localStorage` データは同じオリジン間でしか共有されないからです (login.site.com ≠ app.site.com)
- `localStorage` is limited to 5 MiB by origin, so the application-specific data, Datadog contexts, and other third-party data stored in local storage must be within this limit to avoid any issues

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /ja/real_user_monitoring/browser/setup
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web//Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: /ja/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[17]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[18]: /ja/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage