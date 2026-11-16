---
aliases:
- /ja/opentelemetry/setup/intake_endpoint/
- /ja/opentelemetry/setup/agentless/
further_reading:
- link: /opentelemetry/setup
  tag: ドキュメント
  text: データを Datadog に送信する
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: ブログ
  text: インジェストから調査まで、Datadog で OpenTelemetry ネイティブのオブザーバビリティを活用します。
title: Datadog OTLP インテークエンドポイント
---
## 概要 {#overview}

本番環境のワークロードでは、[Datadog Agent][1] または [OpenTelemetry Collector][2] を介して OpenTelemetry データを送信することを推奨します。これらのコンポーネントは、メタデータのエンリッチメント、シグナル処理、および一元化されたサンプリングを提供します。推奨される Collector のセットアップでは、OTLP を介して Datadog にテレメトリをエクスポートします。

Collector や Agent のデプロイが困難な場合は、このページに記載されている直接 OTLP インテークエンドポイントを使用します。例としては、サーバーレス関数、ユーザーに代わってテレメトリをエクスポートするマネージドプラットフォーム、リソース制約が厳しい環境などが挙げられます。

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="図: OpenTelemetry SDK がインテークエンドポイントを介して Datadog に直接データを送信します。" style="width:100%;" >}}

セットアップ方法は、テレメトリの送信元によって異なります。まずは[マネージドプラットフォーム][6]のリストを確認し、プラットフォームに専用のエンドポイントがある場合はそれを使用します。それ以外の場合は、サーバーレスまたはシグナル固有のページを使用します。

| テレメトリの送信元... | ここから開始|
|---|---|
| マネージドプラットフォーム (Cloudflare、Vercel、Heroku、Netlify、Modal、および [その他][6]) | [マネージドプラットフォーム][6] |
| トレースを送信するサーバーレス環境 (Lambda、ECS Fargate、Azure Functions、Cloud Run、GKE Autopilot) | [サーバーレス][7] |
| 独自のアプリ、ホスト、またはコンテナ | [ログ][3]、[メトリクス][4]、または [トレース][8] |

参照: [Agent Observability のためのインスツルメンテーション][5]

## インテーク制限 {#intake-limits}

Datadog では、各 OTLP インテークエンドポイントにおいて、リクエストごとの最大ペイロードサイズが制限されています。制限を超えるリクエストは、`HTTP 413 Request Entity Too Large` 応答で拒否されます。413 エラーを受け取った場合は、エクスポートのバッチサイズを減らすか、より頻繁にフラッシュして、各リクエストが制限内に収まるようにします。

| シグナル  | エンドポイントパス   | 最大ペイロードサイズ    |
|---------|-----------------|-------------------------|
| メトリクス | `/v1/metrics`   | 512 KiB (圧縮後)    |
| ログ    | `/v1/logs`      | 5.1 MiB (非圧縮時)  |
| トレース  | `/v1/traces`    | 15 MiB (非圧縮時)   |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ja/opentelemetry/setup/collector_exporter/
[3]: /ja/opentelemetry/setup/otlp_ingest/logs/
[4]: /ja/opentelemetry/setup/otlp_ingest/metrics/
[5]: /ja/llm_observability/instrument/otel_instrumentation/?tab=python#setup
[6]: /ja/opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /ja/opentelemetry/setup/otlp_ingest/serverless/
[8]: /ja/opentelemetry/setup/otlp_ingest/traces/