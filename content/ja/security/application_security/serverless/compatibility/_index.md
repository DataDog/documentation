---
aliases:
- /ja/security/application_security/enabling/compatibility/serverless
code_lang: serverless
code_lang_weight: 90
title: サーバーレス互換性要件
type: multi-code-lang
---

Application Security は以下のプラットフォームおよびライブラリでサーバーレス機能を提供します。

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## AWS Lambda
**注**: リモート構成 (Remote Configuration) を使用した脅威保護 (Threat Protection) には対応していません。[Workflows][5] を使用して、[WAF][6] で IP をブロックしてください。

|タイプ               | Threat Detection  |  Software Composition Analysis (SCA)  | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | {{< X >}}             |                               |                       |
| .NET      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | {{< X >}}                         |                       |
| Python    | {{< X >}}             | {{< X >}}                             |                       |
| Ruby      | {{< X >}}             |                               |                       |
| PHP       |                   |                           |                       |
| Go        | {{< X >}}             |                           |                       |

### 対応するトリガータイプ
脅威検出 (Threat Detection) は関数の入力として HTTP リクエストのみをサポートします。攻撃者がサーバーレスアプリケーションを悪用する可能性が最も高い経路であるためです。HTTP リクエストは通常、AWS のさまざまなサービスから送信されます。
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- 関数 URL

<div class="alert alert-info">サポートされていない機能のサポートを追加してほしい場合は、この<a href="https://forms.gle/gHrxGQMEnAobukfn7">フォーム</a>にご記入いただき、フィードバックをお送りください。</div>


### 追加の言語別互換性情報

Node.js
: webpack や esbuild を使ってバンドルしている場合は、[特定のバンドラーの指示に従ってください][4]。

Python
: 

Java
: 分散トレースを使用してサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数が Java 8 Corretto (`java8.al2`)、Java 11 (`java11`)、または Java 17 (`java17`) ランタイムを使用し、少なくとも 1024MB のメモリを割り当てている必要があります。
: Datadog Lambda レイヤー `dd-trace-java:4` (またはそれ以前) と `Datadog-Extension:24` (またはそれ以前) を使用している場合は、[Java Lambda 関数のインスツルメンテーションのアップグレード][3]の手順に従ってください。

Go
: 

.NET
: 


## Google Cloud Run

<div class="alert alert-info">Application Security サーバーレスの Google Cloud Run 対応は現在プレビュー版です。</div>

**注**: リモート構成 (Remote Configuration) を使用した脅威保護 (Threat Protection) には対応していません。[Workflows][5] を使用して、[WAF][6] で IP をブロックしてください。

|タイプ               | Threat Detection  |  Software Composition Analysis    | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | プレビュー           | プレビュー                               |                       |
| .NET      | プレビュー           | プレビュー                                   |                       |
| Node      | プレビュー           | プレビュー                           |                       |
| Python    | プレビュー           | プレビュー                           |                       |
| Ruby      | プレビュー           |  プレビュー                              |                       |
| PHP       |             |                         |                       |
| Go        | プレビュー           | プレビュー                           |                       |


## Azure App Service

*Web アプリケーション*のみサポートされています。Azure Functions はサポートされていません。

**注**: リモート構成 (Remote Configuration) を使用した脅威保護 (Threat Protection) には対応していません。[Workflows][5] を使用して、[WAF][6] で IP をブロックしてください。

|タイプ       | OS                 |Threat Detection  |  Software Composition Analysis     | コードセキュリティ    |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| Java      | Windows、Linux     | {{< X >}}        | {{< X >}}                          | {{< X >}}                                        |
| .NET      | Windows、Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | {{< X >}}                                        |
| Python    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| Ruby      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| PHP       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /ja/serverless/distributed_tracing/
[2]: /ja/serverless/guide/datadog_forwarder_python
[3]: /ja/serverless/guide/upgrade_java_instrumentation
[4]: /ja/serverless/guide/serverless_tracing_and_bundlers/
[5]: /ja/service_management/workflows/
[6]: /ja/security/application_security/threats/inapp_waf_rules/