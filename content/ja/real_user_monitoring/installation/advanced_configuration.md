---
title: RUM の高度なコンフィギュレーション
kind: documentation
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: NPM
    text: datadog/browser-rum NPM package
  - link: /real_user_monitoring/rum_explorer
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/rum_analytics
    tag: ドキュメント
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
{{% tab "Bundle" %}}

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
{{% tab "Bundle" %}}

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
{{% tab "Bundle" %}}

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
{{% tab "Bundle" %}}

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
[2]: /ja/logs/processing/attributes_naming_convention/#user-related-attributes
