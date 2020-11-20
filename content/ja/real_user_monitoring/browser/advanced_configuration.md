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

### サンプリング

デフォルトでは、収集セッション数にサンプリングは適用されていません。収集セッション数に相対サンプリング (% 表示) を適用するには、RUM を初期化する際に `sampleRate` パラメーターを使用します。下記の例では、RUM アプリケーションの全セッションの 90% のみを収集します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    datacenter: Datacenter.US,
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
        clientToken: '<クライアントトークン>',
        applicationId: '<アプリケーション_ID>',
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

datadogRum.addRumGlobalContext('<コンテキストキー>', <コンテキスト値>);

// Code example
datadogRum.addRumGlobalContext('usr', {
    id: 123,
    plan: 'premium'
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', <CONTEXT_VALUE>);
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('usr', {
        id: 123,
        plan: 'premium'
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<コンテキストキー>', <コンテキスト値>);

// コード例
window.DD_RUM && window.DD_RUM.addRumGlobalContext('usr', {
    id: 123,
    plan: 'premium'
});
```

{{% /tab %}}
{{< /tabs >}}

**注**: 製品全体でデータの相関を高めるには [Datadog の命名規則][2]に従ってください。

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

**注**: 製品全体でデータの相関を高めるには [Datadog の命名規則][2]に従ってください。

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

リアルユーザーモニタリング (RUM) を初期化したら、`addUserAction(name: string, context: Context)` API を使用してアプリケーションページの特定のインタラクションを監視したり、カスタムタイミングを測定したりする場合のユーザーアクションを生成します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addUserAction('<名前>', '<JSON_オブジェクト>');

// Code example
datadogRum.addUserAction('checkout', {
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
    DD_RUM.addUserAction('<NAME>', '<JSON_OBJECT>');
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.addUserAction('checkout', {
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
window.DD_RUM && DD_RUM.addUserAction('<名前>', '<JSON_オブジェクト>');

// Code example
window.DD_RUM &&
    DD_RUM.addUserAction('checkout', {
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


### カスタムエラー
処理済みの例外、処理済みのプロミス拒否、および `addError()` API を使用した RUM SDK により自動的に追跡されないその他のエラーを監視します。

```javascript
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
```

**注**: [エラー追跡][3]機能では、`custom` または `source` に設定されたソースに送信され、スタックトレースを含むエラーが処理します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occured.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error, undefined, 'network');
})

// 処理済みの例外エラーを送信
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occured.');

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'network');
    });
})

// 処理済みの例外エラーを送信
try {
    //Some code logic
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occured.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: /ja/logs/processing/attributes_naming_convention/#user-related-attributes
[3]: /ja/real_user_monitoring/error_tracking