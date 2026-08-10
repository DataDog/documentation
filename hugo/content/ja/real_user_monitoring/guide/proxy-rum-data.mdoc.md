---
aliases:
- /ja/real_user_monitoring/faq/proxy_rum_data/
content_filters:
- label: SDK source
  option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_proxying_options
  trait_id: rum_browser_sdk_version
description: SDK のソースオプションおよびバージョン固有の設定を使用して、カスタムネットワークルーティングのためにブラウザ RUM データのプロキシ経由の送信を構成します。
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: Real User Monitoring について
title: ブラウザの RUM データをプロキシする
---
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
プロキシ設定のセキュリティ脆弱性を回避するために、Browser SDK `4.34.0` 以降にアップグレードしてください。
{% /alert %}
{% /if %}

## 概要 {% #overview %}

RUM ブラウザ SDK は、プロキシを介してリクエストを送信するように構成できます。SDK の `proxy` [初期化パラメータ][1] を `https://www.example-proxy.com/any-endpoint` のような URL に設定すると、すべての RUM データが POST メソッドを使用してその URL に送信されます。RUM データは、プロキシから Datadog に転送する必要があります。

## 前提条件プロキシ設定 {% #prerequisite-proxy-setup %}

リクエストを Datadog に正常に転送するには、プロキシが次の要件を満たしている必要があります。

1. [Datadog インテイク URL を構築します](#build-the-datadog-intake-url)。
2. 正確な geoIP のために、リクエストクライアント IP アドレスを含む `X-Forwarded-For` ヘッダーを追加します。
3. POST メソッドで Datadog インテーク URL にリクエストを転送します。
4. リクエスト本文は変更しないでください。

{% alert level="warning" %}
- セキュリティ上の理由から、`cookie` ヘッダーなど、機密情報を含む可能性のある HTTP ヘッダーは削除してください。
- リクエストボディにはバイナリデータを含めることができ、文字列に変換してはいけません。プロキシの実装が変換なしで生のボディを転送することを確認してください。
- プロキシの実装が悪意のあるアクターが異なるサーバーにリクエストを送信することを許可しないことを確認してください。たとえば: `https://browser-intake-datadoghq.com.malicious.com`。
{% /alert %}

### Datadog インテイク URL {% #build-the-datadog-intake-url %} を構築します。

Datadog インテイク URL は `<INTAKE_ORIGIN>/<PATH><PARAMETERS>` の形式である必要があります (例: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`)。

{% table %}
---
* インテイクオリジン
* 
    Datadog インテイクオリジンは、あなたの `site` [初期化パラメータ][1] に対応します。サイトパラメーターに対応する Datadog インテークオリジンは、プロキシ実装で定義する必要があります。

    {% site-region region="us" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us3" %}
    The intake origin for your Datadog site is `https://browser-intake-us3-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us5" %}
    The intake origin for your Datadog site is `https://browser-intake-us5-datadoghq.com`.
    {% /site-region %}

    {% site-region region="eu" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.eu`.
    {% /site-region %}

    {% site-region region="ap1" %}
    The intake origin for your Datadog site is `https://browser-intake-ap1-datadoghq.com`.
    {% /site-region %}

    {% site-region region="ap2" %}
    The intake origin for your Datadog site is `https://browser-intake-ap2-datadoghq.com`.
    {% /site-region %}

    {% site-region region="gov" %}
    The intake origin for your Datadog site is `https://browser-intake-ddog-gov.com`.
    {% /site-region %}

    {% site-region region="gov2" %}
    The intake origin for your Datadog site is `https://browser-intake-us2-ddog-gov.com`.
    {% /site-region %}
---
* パス
* 
    パスには API バージョンと製品が含まれています (例えば、RUM データの場合は `/api/v2/rum`、セッションリプレイデータの場合は `/api/v2/replay`)。 
    
    The path for each request can be accessed in the request's `ddforward` parameter (for example, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* パラメーター
* 
    リクエストパラメータ (例えば、`ddsource=browser&...`) は、リクエストの `ddforward` パラメータからアクセスできます (例えば、`https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`)。

{% /table %}

## SDK セットアップ {% #sdk-setup %}

<!-- SDK version >4.34.0以上 -->
{% if includes($rum_browser_sdk_version, ["gte_5_4_0", "gte_4_34_0"]) %}

`proxy`初期化パラメーターにプロキシのURLを設定してください:

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: '<YOUR_PROXY_URL>',
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```

{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```
{% /if %}
<!-- end CDN sync -->

RUM Browser SDK は、すべてのリクエストに `ddforward` クエリパラメーターを追加します。このクエリパラメーターには、すべてのデータが転送されるべきURLパスとパラメーターが含まれています。

例えば、`site`が`datadoghq.eu`に設定され、`proxy`が`https://example.org/datadog-intake-proxy`に設定されている場合、RUM Browser SDK は次のような URL にリクエストを送信します:`https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`。プロキシはリクエストを`https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`に転送します。

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### `proxy` 初期化パラメーター {% #passing-a-function-to-the-proxy-initialization-parameter %} に関数を渡す

`proxy` 初期化パラメーターは関数入力もサポートしています。この関数を使用すると、パスとパラメータをプロキシ URL に追加する方法をより制御できます。

この関数は、次のプロパティを持つオブジェクトを受け取ります:

- `path`: Datadog リクエストのパス (例: `/api/v2/rum`)
- `parameters`: Datadog リクエストのパラメータ (例: `ddsource=browser&...`)

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```
{% /if %}
<!-- end CDN sync -->

**注:**
- 一部のプライバシーブロッカーはすでにインテーク [URL パターン][2] をターゲットにしているため、プロキシ URL を構築する際にそれを考慮することをお勧めします。
- `proxy` 関数は各リクエストに対して呼び出されるため、重い計算を避けるべきです。
- **JSP ウェブアプリケーション** は、これらのパラメータをブラウザに適切に伝播させるために `\` エスケープ文字を使用する必要があります。たとえば、次のとおりです。
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0以上 -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
Browser SDK v4.34.0 より前は、`proxyUrl` 初期化パラメータが使用され、Datadog インテークオリジンは `ddforward` 属性に含まれていました。プロキシ実装はこのホストの検証を担当しており、これを行わないとさまざまな脆弱性が発生しました。

Datadog インテークオリジンは、セキュリティを確保するために、プロキシ実装で定義する必要があります。

**セキュリティの脆弱性を避けるために、Browser SDK `4.34.0` 以降にアップグレードする必要があります。**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /ja/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840