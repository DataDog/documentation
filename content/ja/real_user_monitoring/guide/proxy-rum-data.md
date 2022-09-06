---
aliases:
- /ja/real_user_monitoring/faq/proxy_rum_data/
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: リアルユーザーモニタリングについて
kind: ガイド
title: ブラウザの RUM データをプロキシする
---

## 概要

RUM ブラウザ SDK は、プロキシ経由でリクエストを送信するように構成することができます。この場合でも、リクエストは Datadog に転送される必要があります。

## SDK の初期化

`proxyUrl` [初期化パラメーター][1]を設定すると、すべての RUM データは指定した URL に POST メソッド (例: `https://www.proxy.com/foo`) で送信されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxyUrl: '<YOUR_PROXY_URL>',
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
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxyUrl: '<YOUR_PROXY_URL>',
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
        proxyUrl: '<YOUR_PROXY_URL>',
    });
```

{{% /tab %}}
{{< /tabs >}}

## プロキシ設定

プロキシが RUM ブラウザ SDK からデータを受信すると、それを Datadog に転送する必要があります。RUM ブラウザ SDK は、プロキシへのすべての POST リクエストに、`ddforward` クエリパラメーターを追加します。このクエリパラメーターには、すべてのデータの転送先となる URL が含まれています。

Datadog へのプロキシリクエストを成功させるには

1. 正確な geoIP のために、リクエストクライアント IP アドレスを含む `X-Forwarded-For` ヘッダーを追加します。
2. クエリパラメーター `ddforward` で指定した URL に、POST メソッドでリクエストを転送します。
4. リクエスト本文は変更されないままでなければなりません。

`ddforward` 属性が [Datadog サイト][2]の有効な Datadog エンドポイントを指していることを確認してください。これを行わないと、安全でない構成になる可能性があります。

サイトパラメータは、SDK の[初期化パラメータ][3]です。各サイトで有効な取り込み URL のパターンは以下の通りです。

{{< tabs >}}
{{% tab "最新バージョン" %}}

| サイト    | 有効な取り込み URL パターン                       | サイトパラメーター      |
|---------|------------------------------------------------|---------------------|
| US1     | `https://*.browser-intake-datadoghq.com/*`     | `datadoghq.com`     |
| US3     | `https://*.browser-intake-us3-datadoghq.com/*` | `us3.datadoghq.com` |
| US5     | `https://*.browser-intake-us5-datadoghq.com/*` | `us5.datadoghq.com` |
| EU1     | `https://*.browser-intake-datadoghq.eu/*`      | `datadoghq.eu`      |
| US1-FED | `https://*.browser-intake-ddog-gov.com/*`      | `ddog-gov.com`      |

{{% /tab %}}
{{% tab "`v4` より前" %}}

| サイト    | 有効な取り込み URL パターン             | サイトパラメーター      |
|---------|--------------------------------------|---------------------|
| US1     | `https://*.logs.datadoghq.com/*`     | `datadoghq.com`     |
| US3     | `https://*.logs.us3-datadoghq.com/*` | `us3.datadoghq.com` |
| EU1     | `https://*.logs.datadoghq.eu/*`      | `datadoghq.eu`      |
| US1-FED | `https://*.logs.ddog-gov.com/*`      | `ddog-gov.com`      |

{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#initialization-parameters
[2]: /ja/getting_started/site/
[3]: /ja/real_user_monitoring/browser/#initialization-parameters