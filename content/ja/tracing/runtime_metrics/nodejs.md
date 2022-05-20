---
description: Nodejs アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: tracing/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/manual_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/opentracing
  tag: ドキュメント
  text: アプリケーション全体に Opentracing を実装します。
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: ドキュメント
title: NodeJS ランタイムメトリクス
---

<div class="alert alert-warning">
この機能はクローズドベータ版です。ご使用のアカウントでこの機能を有効にするには、<a href="https://docs.datadoghq.com/help/">サポートチームまでお問い合わせください。</a>
</div>

## 自動コンフィギュレーション

ランタイムメトリクスの収集は、トレースクライアントの設定パラメーターで、トレーサーオプション `tracer.init({ runtimeMetrics: true })` または環境変数 `DD_RUNTIME_METRICS_ENABLED=true` を使用して有効にすることができます。

ランタイムメトリクスは、Node サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][3]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][4]し、ECS では[タスク定義で適切なフラグを設定][5]します。

## 収集データ

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "node" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Node ランタイムダッシュボード][6]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/metrics/dogstatsd_metrics_submission/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics