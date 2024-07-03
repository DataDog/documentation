---
aliases:
- /ja/tracing/runtime_metrics/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Node.js アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
title: Node.js ランタイムメトリクス
type: multi-code-lang
---

<div class="alert alert-warning">
これは公開ベータ版の機能です。
</div>

## 自動コンフィギュレーション

ランタイムメトリクスの収集は、トレースクライアントの設定パラメーターで、トレーサーオプション `tracer.init({ runtimeMetrics: true })` または環境変数 `DD_RUNTIME_METRICS_ENABLED=true` を使用して有効にすることができます。


   {{< tabs >}}
{{% tab "環境変数" %}}

```shell
export DD_RUNTIME_METRICS_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

```js
const tracer = require('dd-trace').init({
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3',
  runtimeMetrics: true
})
```

{{% /tab %}}
{{< /tabs >}}

ランタイムメトリクスは、Node サービスと相関して表示できます。Datadog の[サービスカタログ][1]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][3]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][4]し、ECS では[タスク定義で適切なフラグを設定][5]します。

または、Agent は UDP トランスポートの代わりに Unix Domain Socket (UDS) を使用してメトリクスを取り込むこともできます。詳細については、[Unix Domain Socket 経由の DogStatsD][7] を参照してください。

## CoScreen

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "node" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Node ランタイムダッシュボード][6]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
[7]: /ja/developers/dogstatsd/unix_socket/