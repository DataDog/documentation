---
categories:
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md
description: Datadog で CSP 違反の検出と集計を行う
doc_link: /integrations/content_security_policy_logs/
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: 統合サービスタグ付けについて
has_logo: true
integration_id: content_security_policy_logs
integration_title: Content Security Policy ログ
is_public: true
kind: integration
name: content_security_policy_logs
public_title: Datadog-Content Security Policy ログ
short_description: CSP 違反の検出
version: '1.0'
---

## 概要

Datadog Content Security Policy (CSP) インテグレーションは、Web ブラウザが CSP を解釈して違反を検出すると、そのログを Datadog に送信します。CSP インテグレーションを使用すると、CSP データを集計するための専用エンドポイントをホストまたは管理する必要がありません。

CSP の詳細については、[Google の web.dev 投稿][1]を参照してください。

## 前提条件

CSP ヘッダーにディレクティブを追加する前に、[Datadog アカウントでクライアントトークンを生成][2]します。

<div class="alert alert-info">セキュリティ上の理由から、Web ブラウザからログを収集するには、クライアントトークンを使用する必要があります。Datadog Browser Logs SDK の構成に Datadog API キーを使用すると、クライアント側に公開されるため、使用することができません。詳細については、<a href="https://docs.datadoghq.com/logs/log_collection/?tab=host#setup">クライアントトークンのドキュメント</a>を参照してください。</div>

## CSP の URL を用意する

ブラウザがポリシー違反のレポートを送信できる URL が必要です。URL は以下の形式である必要があります。

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

オプションとして、URL に `ddtags` キー (サービス名、環境、サービスバージョン) を追加して、[統合サービスタグ付け][3]を設定します。
- `env`: アプリケーションの環境。
- `service`: アプリケーションのサービス名。
- `version`: アプリケーションのバージョン。

`ddtags` の値をフォーマットする場合、以下を行う必要があります。
- キーと値をコロン (`:`) でグループ化する
- キーと値をカンマ (`,`) で連結する
- URL エンコーディングを使用する

例えば、キーと値のペア `{"service": "billingService", "env": "production"}` の場合、URL エンコードされた文字列は次のようになります。

```
service%3AbillingService%2Cenv%3Aproduction
```

そして、タグを使った最終的な URL はこうなります。

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## CSP に URL を追加する

HTTP ヘッダーに URL を埋め込むか (推奨)、`<meta>` HTML タグに埋め込むことができます。

### ポリシーを HTTP ヘッダーに埋め込む

Datadog は、HTTP ヘッダーにコンテンツセキュリティポリシーを埋め込むことを推奨しています。`report-uri` ディレクティブまたは `report-to` ディレクティブのどちらかを使用することができます。`report-to` ディレクティブは最終的には `report-uri` に取って代わりますが、まだすべてのブラウザでサポートされているわけではありません。

- `report-uri` ディレクティブを使用している場合
  ```bash
  Content-Security-Policy: ...; report-uri https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
  ```

- `report-to` ディレクティブを使用している場合
  ```json
  Content-Security-Policy: ...; report-to browser-intake-datadoghq
  Report-To: { "group": "browser-intake-datadoghq",
              "max_age": 10886400,
              "endpoints": [
                  { "url": " https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report" }
              ] }
  ```

### HTML タグ `<meta>` に埋め込まれたポリシー

また、`<meta>` HTML タグの中に URL を埋め込むこともできます。

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## 違反レポートの例

各ブラウザは、レポートの形式を異なる方法で解釈します。

{{< tabs >}}
{{% tab "Firefox" %}}
```json
{
  'csp-report': {
    'blocked-uri': 'https://evil.com/malicious.js',
    'document-uri': 'http://localhost:8000/',
    'original-policy': 'script-src http://good.com; report-uri http://127.0.0.1:8000/csp_reports',
    referrer: '',
    'violated-directive': 'script-src'
  }
}
```
{{% /tab %}}

{{% tab "Chrome" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src-elem',
    'effective-directive': 'script-src-elem',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    disposition: 'enforce',
    'blocked-uri': 'https://evil.com/malicious.js',
    'status-code': 200,
    'script-sample': ''
  }
}
```
{{% /tab %}}

{{% tab "Safari" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src good.com',
    'effective-directive': 'script-src',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    'blocked-uri': 'https://evil.com',
    'status-code': 200
  }
}
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/csp/
[2]: https://app.datadoghq.com/organization-settings/client-tokens
[3]: /ja/getting_started/tagging/unified_service_tagging