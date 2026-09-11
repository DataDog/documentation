---
aliases:
- /ja/opentelemetry/setup/agentless/managed_platforms
description: Cloudflare、Vercel、Heroku などのマネージドプラットフォームから、専用の OTLP エンドポイントを通じて Datadog
  に直接トレース、メトリクス、ログを送信します。
further_reading:
- link: /opentelemetry/compatibility/
  tag: ドキュメント
  text: Datadog における OpenTelemetry の互換性
- link: /opentelemetry/setup/otlp_ingest/
  tag: ドキュメント
  text: Datadog OTLP インテークエンドポイント
title: マネージドプラットフォーム向け OTLP インテーク
---
## 概要 {#overview}

Datadog はマネージドプラットフォーム専用の OTLP エンドポイントを提供しており、トレース、メトリクス、ログを最小限の構成で Datadog に直接送信できます。サポート対象の各プラットフォームには、独自の OTLP サブドメインがあります (例: `cloudflare.integrations.otlp.datadoghq.com`)。これらの専用エンドポイントにより、Datadog はトラフィックソースを特定し、プラットフォーム固有の処理と属性を適用できます。汎用 OTLP エンドポイントはホストが存在することを前提としているため、マネージドプラットフォームのトラフィックでは予期しない動作が発生する可能性があります。

[Datadog Agent][1] や [OpenTelemetry Collector][2] のインストールが困難なマネージドプラットフォームでワークロードを実行する場合は、このオプションを使用してください。お使いのプラットフォームが以下の表になく、AWS、Azure、または GCP のサーバーレスコンピューティングで実行している場合は、[Serverless][5] を参照してください。

<div class="alert alert-danger">マネージドプラットフォームのエンドポイントに送信されたホストメタデータは、<a href="/infrastructure/list/">インフラストラクチャーホストリスト</a>には反映されません。</div>

各エンドポイントは、以下のシグナルパスをサポートしています。

| シグナル  | パス          |
|---------|---------------|
| トレース  | `/v1/traces`  |
| メトリクス | `/v1/metrics` |
| ログ    | `/v1/logs`    |

シグナル固有の構成 (メトリクスの変換、ログ処理) については、[ログ][6] および [メトリクス][7] エンドポイントのページを参照してください。

## 構成 {#configuration}

マネージドプラットフォームのエンドポイント経由で OTLP データを Datadog に送信するには、以下の環境変数を使用して OpenTelemetry エクスポーターを構成します。`{platform}` を[サポート対象のプラットフォーム](#supported-platforms)のテーブルにあるプラットフォームのサブドメインに置き換えてください。

```shell
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}"
export OTEL_EXPORTER_OTLP_HEADERS="dd-api-key=${DD_API_KEY}"
```

トレースのみを送信する場合:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY}"
```

<div class="alert alert-info">マネージドプラットフォームのエンドポイントは、 <code>dd-otlp-source</code> ヘッダーを使用しません。汎用 OTLP エンドポイントから移行する場合は、構成からこのヘッダーを削除してください。</div>

## サポート対象のプラットフォーム {#supported-platforms}

すべてのエンドポイントは `https://{subdomain}.integrations.otlp.{{< region-param key="dd_site" >}}/` というパターンに従います。

| プラットフォーム | サブドメイン | セットアップガイド |
|---|---|---|
| AWX | `awx` | — |
| Claude | `claude` | — |
| Cloudflare | `cloudflare` | [Cloudflare Workers の監視可能性][11] |
| Cribl | `cribl` | — |
| GitHub Actions | `github-actions` | — |
| Grafbase | `grafbase` | [Grafbase の監視可能性][12] |
| Heroku | `heroku` | [Heroku テレメトリ][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livekit` | — |
| Modal | `modal` | [Modal OpenTelemetry][14] |
| MuleSoft | `mulesoft` | [MuleSoft Telemetry Exporter][15] |
| Netlify | `netlify` | — |
| OpenTofu | `opentofu` | — |
| Retool | `retool` | [Retool パフォーマンスモニタリング][16] |
| RWX | `rwx` | [RWX OpenTelemetry][17] |
| Salesforce | `sfdc` | — |
| Shopify | `shopify` | — |
| Solace | `solace` | — |
| Spacelift | `spacelift` | — |
| Supabase | `supabase` | — |
| Svix | `svix` | — |
| Trigger.dev | `triggerdev` | — |
| Vercel | `vercel` | [Vercel Marketplace][18] |

上記に記載されていないマネージドプラットフォームから OTLP エクスポートを有効にするには、カスタマーサクセスマネージャーにお問い合わせください。

## 制限事項 {#limitations}

### メタデータのリッチ化なし {#no-metadata-enrichment}

コレクターやエージェントがない場合、テレメトリはホストメタデータでリッチ化されません。このメタデータに依存する機能 (例: [インフラストラクチャーホストリスト][8]) は使用できません。影響を受ける機能の一覧については、[OpenTelemetry 互換性リスト][4] を参照してください。

### 限定的な正規化 {#limited-normalization}

コレクターや Agent が自動的に実行する一部のシグナル処理は、ダイレクトインジェストでは行われません。例えば、累積-デルタメトリクス変換には、ステートフルなコンポーネントが必要です。プラットフォームが累積メトリクスをエクスポートする場合は、デルタ一時性をエクスポートするように SDK またはパイプラインを構成してください。

### トレースメトリクス {#trace-metrics}

[トレースメトリクス][3] は、マネージドプラットフォームエンドポイントに対してデフォルトで計算されます。マネージドプラットフォームはエクスポート前にトラフィックをサンプリングする場合があり、これがトレースメトリクスの精度に影響を与える可能性があります。

### サンプリング {#sampling}

コレクターで使用可能なサンプリング制御 (テールベースサンプリング、確率的サンプリング) は、ダイレクトインジェストでは使用できません。マネージドプラットフォームは、エクスポート前に独自のサンプリングを適用する場合があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ja/opentelemetry/setup/collector_exporter/
[3]: /ja/tracing/metrics/
[4]: /ja/opentelemetry/compatibility/
[5]: /ja/opentelemetry/setup/otlp_ingest/serverless/
[6]: /ja/opentelemetry/setup/otlp_ingest/logs/
[7]: /ja/opentelemetry/setup/otlp_ingest/metrics/
[8]: /ja/infrastructure/list/
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://www.rwx.com/docs/observability/datadog
[18]: https://vercel.com/marketplace/datadog