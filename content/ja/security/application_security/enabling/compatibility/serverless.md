---
code_lang: サーバーレス
code_lang_weight: 90
kind: documentation
title: サーバーレス互換性要件
type: multi-code-lang
---

ASM は以下のプラットフォームとライブラリに対してサーバーレス機能を提供します。

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## APM に Datadog Agent を構成する
**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ               | Threat Detection  |  Software Composition Analysis (SCA)  | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| テスト結果          | {{< X >}}             |                               |                       |
| ステップの高度なオプション      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | beta                          |                       |
| ブラウザテスト    | {{< X >}}             | beta                          |                       |
| 構成      | {{< X >}}             |                               |                       |
| ディメンショニング       |                   |                           |                       |
| プライベートロケーション        | {{< X >}}             |                           |                       |

### 対応するトリガータイプ
ASM Threat Detection は、HTTP リクエストを関数の入力としてのみサポートします。これは、攻撃者がサーバーレスアプリケーションを悪用する可能性が最も高いチャンネルだからです。HTTP リクエストは通常、次のような AWS サービスからやってきます。
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


## Kubernetes Resource Utilization

<div class="alert alert-info">ASM サーバーレスの Google Cloud Run サポートはベータ版です</a>。</div>

**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ               | Threat Detection  |  OSS の脆弱性管理 | コードレベルの脆弱性管理   |
| ---       |   ---                     |           ----                    |           ----                            |
| テスト結果          | beta          | beta                              |                       |
| モニタリング      | beta          | beta                                  |                       |
| Node      | beta          | beta                          |                       |
| プライベートロケーション    | beta          | beta                          |                       |
| ステップの記録      | beta          |  beta                             |                       |
| テスト結果       |             |                         |                       |
| ブラウザテスト        | beta          | beta                          |                       |


## インフラストラクチャーリスト

サポートされるのは *Web アプリケーション*のみです。Azure 関数は、ASM ではサポートされていません。

**注**: リモート構成による Threat Protection はサポートされていません。[WAF][6] で IP をブロックするには、[ワークフロー][5]を使用してください。

|タイプ       | OS                 |Threat Detection  |  OSS の脆弱性管理  | コードレベルの脆弱性管理  |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| GRPC      | Windows、Linux     | {{< X >}}        | {{< X >}}                          | beta                                     |
| モニタリング      | Windows、Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | beta                                     |
| プライベートロケーション    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| ステップの記録      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| テスト結果       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /ja/serverless/distributed_tracing/
[2]: /ja/serverless/guide/datadog_forwarder_python
[3]: /ja/serverless/guide/upgrade_java_instrumentation
[4]: /ja/serverless/guide/serverless_tracing_and_bundlers/
[5]: /ja/service_management/workflows/
[6]: /ja/security/application_security/threats/inapp_waf_rules/