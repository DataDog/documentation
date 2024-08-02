---
aliases:
- /ja/real_user_monitoring/faq/proxy_rum_data/
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: リアルユーザーモニタリングについて
title: ブラウザの RUM データをプロキシする
---

## 概要

RUM ブラウザ SDK は、プロキシ経由でリクエストを送信するように構成することができます。この場合でも、リクエストは Datadog に転送される必要があります。

## SDK の初期化

`proxy` [初期化パラメーター][1]を設定すると、すべての RUM データは指定した URL に POST メソッド (例: `https://www.proxy.com/foo`) で送信されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxy: '<YOUR_PROXY_URL>',
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
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
        proxy: '<YOUR_PROXY_URL>'
    });
```

{{% /tab %}}
{{< /tabs >}}

## プロキシ設定

プロキシが RUM ブラウザ SDK からデータを受信すると、それを Datadog に転送する必要があります。RUM ブラウザ SDK は、プロキシへのすべての POST リクエストに、`ddforward` クエリパラメーターを追加します。このクエリパラメーターには、すべてのデータの転送先となる URL パスとパラメーターが含まれています。

Datadog へのプロキシリクエストを成功させるには

1. 以下を使用して最終的な Datadog インテーク URL を構築します。
    - サイトに対応する Datadog のインテークオリジン。以下の表を参照してください。
    - `ddforward` が提供するパスとパラメーター。
2. 正確な geoIP のために、リクエストクライアント IP アドレスを含む `X-Forwarded-For` ヘッダーを追加します。
3. POST メソッドで Datadog インテーク URL にリクエストを転送します。
4. リクエスト本文は変更しないでください。

サイトパラメータは、SDK の[初期化パラメータ][1]です。各サイトの Datadog インテークオリジンは以下の通りです。

| サイト    | サイトパラメーター            | Datadog インテークオリジン                      |
| ------- | ------------------------- | ------------------------------------------ |
| US1     | `datadoghq.com` (デフォルト) | `https://browser-intake-datadoghq.com`     |
| US3     | `us3.datadoghq.com`       | `https://browser-intake-us3-datadoghq.com` |
| US5     | `us5.datadoghq.com`       | `https://browser-intake-us5-datadoghq.com` |
| EU1     | `datadoghq.eu`            | `https://browser-intake-datadoghq.eu`      |
| US1-FED | `ddog-gov.com`            | `https://browser-intake-ddog-gov.com`      |

サイトパラメーターに対応する Datadog インテークオリジンは、プロキシ実装で定義する必要があります。

## レガシーなプロキシ設定

Browser SDK v4.34.0 以前では、`proxyUrl` 初期化パラメーターが使用され、Datadog インテークオリジンが <code>ddforward</code> 属性に含まれていました。プロキシ実装はこのホストの検証を担当し、これに失敗すると様々な脆弱性が発生しました。

Datadog インテークオリジンは、セキュリティを確保するために、プロキシ実装で定義する必要があります。

<strong>古いバージョンの Browser SDK でプロキシを使用している場合、新しいバージョンの Browser SDK にアップグレードすることをお勧めします。</strong>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#initialization-parameters