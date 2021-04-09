---
title: RUM の高度なコンフィギュレーション
kind: ドキュメント
aliases:
  - /ja/real_user_monitoring/installation/advanced_configuration/
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: NPM
    text: datadog/browser-rum NPM package
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: イベントに関する分析論を組み立てる
---
## 初期化

このページでは、[Datadog Browser SDK][1] で利用可能なさまざまな初期化オプションを説明します。

### RUM データから機密データをスクラブする
RUM データに編集が必要な機密情報が含まれている場合は、RUM を初期化するときに `beforeSend` コールバックを使用して、機密シーケンスをスクラブするように Browser SDK を構成します。

このコールバック関数を使用すると、RUM SDK によって収集されたすべてのイベントにアクセスしてから Datadog に送信できます。

たとえば、Web アプリケーションの URL からメールアドレスを編集します。

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
|   `view.url`            |   文字列  |   アクティブな Web ページの URL。                                                                   |
|   `view.referrer`       |   文字列  |   現在リクエストされているページへのリンクがたどられた前のウェブページの URL。  |
|   `action.target.name`  |   文字列  |   ユーザーが操作した要素。自動的に収集されたアクションの場合のみ。              |
|   `error.message`       |   文字列  |   エラーについて簡潔にわかりやすく説明する 1 行メッセージ。                                 |
|   `error.stack `        |   文字列  |   スタックトレースまたはエラーに関する補足情報。                                     |
|   `error.resource.url`  |   文字列  |   エラーをトリガーしたリソース URL。                                                        |
|   `resource.url`        |   文字列  |   リソースの URL。                                                                                 |

**注**: RUM SDK は、上記にリストされていないイベントプロパティに加えられた変更を無視します。すべてのイベントプロパティについては、[Browser SDK リポジトリ][2]を参照してください。

### ユーザーセッションを特定する
RUM セッションにユーザー情報を追加すると、次のことが簡単になります。
* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API"  >}}

次の属性は**オプション**ですが、**少なくとも 1 つ**を指定することをお勧めします。

| 属性  | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | 文字列 | 一意のユーザー識別子。                                                                                  |
| usr.name  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| usr.email | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

ユーザーセッションを識別するには、`setUser` API を使用します。

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com'
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{< /tabs >}}

### サンプリング

デフォルトでは、収集セッション数にサンプリングは適用されていません。収集セッション数に相対サンプリング (% 表示) を適用するには、RUM を初期化する際に `sampleRate` パラメーターを使用します。下記の例では、RUM アプリケーションの全セッションの 90% のみを収集します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
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
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
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

```javascript
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

**注**: サンプルとして抽出したセッションでは、すべてのページビューとそのセッションに紐付くテレメトリーは収集されません。

## 利用可能な API

### グローバルコンテキストを追加

リアルユーザーモニタリング (RUM) を初期化したら、`addRumGlobalContext(key: string, value: any)` API を使用してアプリケーションから収集したすべての RUM  イベントにコンテキストを追加します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addRumGlobalContext('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// コード例
datadogRum.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// コード例
window.DD_RUM && window.DD_RUM.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{< /tabs >}}

**注**: 製品全体でデータの相関を高めるには [Datadog の命名規則][3]に従ってください。

### グローバルコンテキストを置換

リアルユーザーモニタリング (RUM) を初期化したら、`setRumGlobalContext(context: Context)` API を使用してすべての RUM イベントのデフォルトコンテキストを置換します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setRumGlobalContext({ '<コンテキストキー>', <コンテキスト値>' });

// Code example
datadogRum.setRumGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({ '<コンテキストキー>', <コンテキスト値>' });

// Code example
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

**注**: 製品全体でデータの相関を高めるには [Datadog の命名規則][3]に従ってください。

### グローバルコンテキストを読み取る

リアルユーザーモニタリング (RUM) を初期化したら、`getRumGlobalContext()` API を使用してグローバルコンテキストを読み取ります。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getRumGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
  var context = DD_RUM.getRumGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
var context = window.DD_RUM && DD_RUM.getRumGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### カスタムユーザーアクション

リアルユーザーモニタリング (RUM) を初期化したら、`addAction(name: string, context: Context)` API を使用してアプリケーションページの特定のインタラクションを監視したり、カスタムタイミングを測定したりする場合のユーザーアクションを生成します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<名前>', '<JSON_オブジェクト>');

// Code example
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<名前>', '<JSON_オブジェクト>');

// Code example
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

上記の例では、RUM SDK がカート内のアイテム数、中身、カート全体の総額を収集します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/browser-sdk
[2]: https://github.com/DataDog/browser-sdk/blob/master/packages/rum/src/rumEvent.types.ts
[3]: /ja/logs/processing/attributes_naming_convention/#user-related-attributes
