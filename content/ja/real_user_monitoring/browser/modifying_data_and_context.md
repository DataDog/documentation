---
aliases:
- /ja/real_user_monitoring/installation/advanced_configuration/
- /ja/real_user_monitoring/browser/advanced_configuration/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: /real_user_monitoring/browser/data_collected/
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: ドキュメント
  text: イベントへの視覚化の適用
- link: /logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: Datadog 標準属性
kind: documentation
title: RUM データとコンテキストの変更
---

## 概要

RUM によって[収集されたデータ][1]を変更して、次のニーズをサポートするには、さまざまな方法があります。

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

    ```
    import { datadogRum } from '@datadog/browser-rum';

    datadogRum.init({
        ...,
        trackViewsManually: true,
        ...
    });
    ```
    {{% /tab %}}
    {{% tab "CDN 非同期" %}}
    ```
    DD_RUM.onReady(function() {
        DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
        })
    })
    ```
    {{% /tab %}}
    {{% tab "CDN 同期" %}}
    ```
    window.DD_RUM &&
        window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
        });
    ```
    {{% /tab %}}
    {{< /tabs >}}

2. 新しいページまたはルート変更 (単一ページアプリケーションの場合) ごとにビューを開始する必要があります。RUM データは、ビューの開始時に収集されます。オプションで、関連するビュー名、サービス名、およびバージョンを定義します。

   - ビュー: デフォルトは、ページの URL パスです。
   - サービス: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのサービスです。
   - バージョン: デフォルトは、RUM アプリケーションの作成時に指定されたデフォルトのバージョンです。

   詳しくは、[ブラウザモニタリングの設定][4]をご覧ください。

次の例は、RUM アプリケーションの `checkout` ページにおけるページビューを手動で追跡するものです。ビュー名には `checkout` を使用し、`purchase` サービスとバージョン `1.2.3` を関連付けます。

{{< tabs >}}
{{% tab "NPM" %}}
```
datadogRum.startView('checkout', 'purchase', '1.2.3')
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.startView('checkout', 'purchase', '1.2.3')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.startView('checkout', 'purchase', '1.2.3')
```
{{% /tab %}}
{{< /tabs >}}

React、Angular、Vue、またはその他のフロントエンドフレームワークを使用している場合、Datadog はフレームワークルーターレベルで `startView` ロジックを実装することをお勧めします。

## RUM データを強化および制御する

RUM ブラウザ SDK は RUM イベントをキャプチャし、それらの主な属性を設定します。`beforeSend` コールバック関数を使用すると、RUM ブラウザ SDK によって収集されたすべてのイベントにアクセスしてから Datadog に送信できます。

RUM イベントをインターセプトすると、次のことが可能になります。

- 追加のコンテキスト属性で RUM イベントを強化する
- RUM イベントを変更して、コンテンツを変更したり、機密性の高いシーケンスを編集したりします ([編集可能なプロパティのリスト](#modify-the-content-of-a-rum-event)を参照してください)
- 選択した RUM イベントを破棄する

[バージョン 2.13.0][5] 以降、`beforeSend` は 2 つの引数を取ります。RUM ブラウザ SDK によって生成された `event` と、RUM イベントの作成をトリガーした `context` です。

```
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
| エラー            | [エラー][12]                     |
| ロングタスク        | [PerformanceLongTaskTiming][13] |

詳細については、[RUM データの強化と制御ガイド][14]を参照してください。

### RUM イベントを強化する

[グローバルコンテキスト API](#global-context) で追加された属性に加えて、イベントにコンテキスト属性を追加できます。たとえば、フェッチ応答オブジェクトから抽出されたデータで RUM リソースイベントにタグを付けます。

{{< tabs >}}
{{% tab "NPM" %}}

```
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // RUM リソースの応答ヘッダーを収集します
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context = {...event.context, responseHeaders: context.response.headers}
        }
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM リソースの応答ヘッダーを収集します
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM リソースの応答ヘッダーを収集します
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
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

### RUM イベントのコンテンツを変更

たとえば、Web アプリケーションの URL からメールアドレスを編集するには

{{< tabs >}}
{{% tab "NPM" %}}

```
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
```
DD_RUM.onReady(function() {
    DD_RUM.init({
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

```
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

```
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
```
DD_RUM.onReady(function() {
    DD_RUM.init({
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

```
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

## ユーザーセッション

RUM セッションにユーザー情報を追加すると、次の役に立ちます。
* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API"  >}}

次の属性はオプションですが、Datadog は少なくとも 1 つを指定することを推奨しています。

| 属性  | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | 一意のユーザー識別子。                                                                                  |
| `usr.name`  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| `usr.email` | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

推奨される属性に加えてさらに属性を追加することで、フィルタリング機能を向上できます。たとえば、ユーザープランに関する情報や、所属するユーザーグループなどを追加します。

ユーザーセッションオブジェクトに変更を加えた場合、変更後に収集されるすべての RUM イベントには、更新された情報が含まれます。

### ユーザーセッションを特定する

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```
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
```
DD_RUM.onReady(function() {
    DD_RUM.setUser({
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

```
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
```
datadogRum.getUser()
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティの追加/オーバーライド

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```
datadogRum.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティを削除する

`datadogRum.removeUserProperty('<USER_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```
datadogRum.removeUserProperty('name')
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```

{{% /tab %}}
{{< /tabs >}}

### ユーザーセッションプロパティをクリアする

`datadogRum.clearUser()`

<div class="alert alert-info">RUM ブラウザ SDK v4.17.0 で `clearUser` が導入され、`removeUser` が廃止されました。</div>

{{< tabs >}}
{{% tab "NPM" %}}
```
datadogRum.clearUser()
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
DD_RUM.onReady(function() {
    DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.clearUser()
```

{{% /tab %}}
{{< /tabs >}}

## サンプリング

デフォルトでは、収集セッション数にサンプリングは適用されていません。収集セッション数に相対サンプリング (% 表示) を適用するには、RUM を初期化する際に `sampleRate` パラメーターを使用します。

下記の例では、RUM アプリケーションの全セッションの 90% のみを収集します。

{{< tabs >}}
{{% tab "NPM" %}}

```
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sampleRate: 90,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sampleRate: 90,
    })
  })
</script>
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

サンプルとして抽出したセッションでは、すべてのページビューとそのセッションに紐付くテレメトリーは収集されません。

## グローバルコンテキスト

### グローバルコンテキストプロパティを追加する

RUM を初期化した後、`setGlobalContextProperty(key: string, value: any)` API を使用してアプリケーションから収集したすべての RUM  イベントにコンテキストを追加します。

<div class="alert alert-info">RUM ブラウザ SDK v4.17.0 で `setGlobalContextProperty` が導入され、`addRumGlobalContext` が廃止されました。</div>

{{< tabs >}}
{{% tab "NPM" %}}

```
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
```
DD_RUM.onReady(function() {
    DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// コード例
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{< /tabs >}}

製品全体でデータの相関を高めるには [Datadog の命名規則][16]に従ってください。

### グローバルコンテキストプロパティを削除する

以前に定義したグローバルコンテキストプロパティを削除することができます。

<div class="alert alert-info">RUM ブラウザ SDK v4.17.0 で `removeGlobalContextProperty` が導入され、`removeRumGlobalContext` が廃止されました。</div>

製品全体でデータの相関を高めるには [Datadog の命名規則][16]に従ってください。

### グローバルコンテキストを置換

`setGlobalContext(context: Context)` API を使用してすべての RUM イベントのデフォルトコンテキストを置換します。

<div class="alert alert-info">RUM ブラウザ SDK v4.17.0 で `setGlobalContext` が導入され、`setRumGlobalContext` が廃止されました。</div>

製品全体でデータの相関を高めるには [Datadog の命名規則][16]に従ってください。

### グローバルコンテキストをクリアする

グローバルコンテキストをクリアするには、`clearGlobalContext` を使用します。

### グローバルコンテキストを読み取る

RUM を初期化したら、`getGlobalContext()` API を使用してグローバルコンテキストを読み取ります。

<div class="alert alert-info">RUM ブラウザ SDK v4.17.0 で `getGlobalContext` が導入され、`getRumGlobalContext` が廃止されました。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /ja/real_user_monitoring/browser/#setup
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