---
code_lang: サーバーレス
code_lang_weight: 90

title: サーバーレス互換性要件
type: multi-code-lang
---

<div class="alert alert-info">AWS Lambda の ASM サポートはベータ版です。脅威検出は Datadog の Lambda 拡張機能を利用します。<br><br>ご希望の技術がここに掲載されていませんか？Datadog は継続的にサポートを追加しています。<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォームに必要事項を記入して、詳細を送信してください</a>。</div>

## 言語とフレームワークの互換性

### 対応クラウド環境

- AWS Lambda (ベータ版)

### バージョン依存関係

- Lambda 拡張機能のバージョン: `39`
- サーバーレスプラグインのバージョン: `5.20.0`

### 対応言語とその要件

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

### ASM の機能
以下の ASM 機能は、Lambda 関数ではサポートされていません。
 - ASM Risk Management
 - IP、ユーザー、不審リクエストの遮断
 - 1 クリックで ASM を有効にする

## ASM の機能サポート

指定された Datadog Lambda 拡張機能のバージョンで、以下の ASM 機能がサーバーレスでサポートされます。

| ASM の機能                   | 拡張機能の最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> ビジネスロジック API  | Lambda Extension バージョン 39、Serverless プラグインバージョン 5.20.0 で、Node.js、Java、Python、Go、.NET に対応します。 <br/> --> ビジネスロジックの機能は、サービスが構築された言語固有のバージョンに従います。 |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 非対応<br/><br/><br/> |
| Vulnerability Management <br/> --> オープンソースの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 非対応<br/> |


<div class="alert alert-info">サポートされていない機能のサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

## 対応するトリガータイプ

ASM Threat Detection は、関数の入力としてのみ HTTP リクエストをサポートします。これらは通常、以下のような AWS サービスから来るものです。

- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- 関数 URL


[1]: /ja/serverless/distributed_tracing/
[2]: /ja/serverless/guide/datadog_forwarder_python
[3]: /ja/serverless/guide/upgrade_java_instrumentation
[4]: /ja/serverless/guide/serverless_tracing_and_bundlers/
