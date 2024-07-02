---
aliases:
- /ja/tracing/runtime_metrics/ruby
code_lang: ruby
code_lang_weight: 30
description: Ruby アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: ログとトレースの接続
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
title: Ruby ランタイムメトリクス
type: multi-code-lang
---

<div class="alert alert-warning">
これは公開ベータ版の機能です。
</div>

## 自動コンフィギュレーション

ランタイムメトリクスの収集は [`dogstatsd-ruby`][1] gemを使用し、DogStatsD を介して Agent にメトリクスを送信します。ランタイムメトリクスを収集するには、この gem を Ruby アプリケーションに追加し、[DogStatsD が Agent に対して有効になっていること][2]を確認する必要があります。

メトリクス収集は初期設定では無効になっています。`DD_RUNTIME_METRICS_ENABLED` 環境変数を `true` に設定するか、Ruby アプリケーションで次のコンフィギュレーションを行うと有効にできます。

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # ランタイムメトリクス収集を有効にするには、`true` を設定します。デフォルトは `false` です。
  # DD_RUNTIME_METRICS_ENABLED=true に設定して構成することもできます。
  c.runtime_metrics.enabled = true

  # 必要に応じて、ランタイムメトリクスの送信に使用される DogStatsD インスタンスを構成できます。
  # `dogstatsd-ruby` が利用可能な場合、DogStatsD は自動的にデフォルト設定になります。
  # Datadog Agent のホストとポートを使用して構成できます。デフォルトは 'localhost:8125' です。
 c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

ランタイムメトリクスは、Ruby サービスと相関して表示できます。Datadog の[サービス詳細画面][3]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][4]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][5]し、ECS では[タスク定義で適切なフラグを設定][6]します。

## 収集データ

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "ruby" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Ruby ランタイムダッシュボード][7]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[6]: /ja/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics