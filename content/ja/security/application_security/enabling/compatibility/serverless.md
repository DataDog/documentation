---
code_lang: サーバーレス
code_lang_weight: 90
kind: documentation
title: サーバーレス互換性要件
type: multi-code-lang
---

Application Security provides serverless capability for the following platforms and libraries:

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## AWS Lambda
**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ               | Threat Detection  |  Software Composition Analysis (SCA)  | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | {{< X >}}             |                               |                       |
| .NET      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | beta                          |                       |
| Python    | {{< X >}}             | beta                          |                       |
| Ruby      | {{< X >}}             |                               |                       |
| PHP       |                   |                           |                       |
| Go        | {{< X >}}             |                           |                       |

### 対応するトリガータイプ
Threat Detection supports HTTP requests as function input only, as that channel has the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- 関数 URL

<div class="alert alert-info">サポートされていない機能のサポート追加をご希望の場合は、こちらの<a href="https://forms.gle/gHrxGQMEnAobukfn7">フォーム</a>にご記入の上、フィードバックをお送りください。</div>


### 言語固有の互換性に関する追加情報

Node.js
: webpack や esbuild を使ってバンドルしている場合は、[特定のバンドラーの指示に従ってください][4]。

Python
: 

Java
: 分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数が Java 8 Corretto (`java8.al2`)、Java 11 (`java11`) または Java 17 (`java17`) ランタイムを使用し、少なくとも 1024MB のメモリを搭載している必要があります。
: Datadog Lambda レイヤーの `dd-trace-java:4` (またはそれ以前) と `Datadog-Extension:24` (またはそれ以前) を使用する場合、[Java Lambda 関数のインスツルメンテーションのアップグレード][3]の手順に従ってください。

Go
: 

.NET
: 


## Google Cloud Run

<div class="alert alert-info">Google Cloud Run support for Application Security serverless is in beta</a>.</div>

**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ               | Threat Detection  |  Software Composition Analysis    | Code Security     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | beta          | beta                              |                       |
| .NET      | beta          | beta                                  |                       |
| Node      | beta          | beta                          |                       |
| Python    | beta          | beta                          |                       |
| Ruby      | beta          |  beta                             |                       |
| PHP       |             |                         |                       |
| Go        | beta          | beta                          |                       |


## Azure App Service

Only *web applications* are supported. Azure Functions are not supported.

**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ       | OS                 |Threat Detection  |  Software Composition Analysis     | Code Security    |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| Java      | Windows、Linux     | {{< X >}}        | {{< X >}}                          | beta                                     |
| .NET      | Windows、Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | beta                                     |
| Python    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| Ruby      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| PHP       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /ja/serverless/distributed_tracing/
[2]: /ja/serverless/guide/datadog_forwarder_python
[3]: /ja/serverless/guide/upgrade_java_instrumentation
[4]: /ja/serverless/guide/serverless_tracing_and_bundlers/
[5]: /ja/service_management/workflows/
[6]: /ja/security/application_security/threats/inapp_waf_rules/