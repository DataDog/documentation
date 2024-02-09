---
aliases:
- /ja/tracing/runtime_metrics/dotnet
code_lang: dotnet
code_lang_weight: 50
description: .NET アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
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
- link: https://www.datadoghq.com/blog/dotnet-runtime-metrics/
  tag: GitHub
  text: Datadog を使用した .NET ランタイムメトリクスの監視
kind: documentation
title: .NET ランタイムメトリクス
type: multi-code-lang
---

## ランタイムメトリクスの互換性

- .NET Framework 4.6.1+ 
- .NET Core 3.1
- .NET 5
- .NET 6
- .NET 7
- .NET 8

## 自動コンフィギュレーション

`DD_RUNTIME_METRICS_ENABLED=true` 環境変数を使用して、.NET Tracer 1.23.0+ でランタイムメトリクス収集を有効にします。

ランタイムメトリクスを .NET サービスと相関して表示します。Datadog の[サービスカタログ][1]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは、ポート `8125` を介して DogStatsD と共に Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][3]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][4] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][5]。

または、Agent は UDP トランスポートの代わりに Unix Domain Socket (UDS) を使用してメトリクスを取り込むこともできます。詳細については、[Unix Domain Socket 経由の DogStatsD][7] を参照してください。

## リアルユーザーモニタリング

以下のメトリクスは .NET メトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "dotnet" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの .NET ランタイムダッシュボード][6]を提供します。

## IIS の追加のアクセス許可

.NET フレームワークでは、メトリクスはパフォーマンスカウンターを使用して収集されます。非対話型ログオンセッションのユーザー (IIS アプリケーションプールアカウントと一部のサービスアカウントを含む) は、カウンターデータにアクセスするために **Performance Monitoring Users** グループに追加する必要があります。

IIS アプリケーションプールは、ユーザーのリストに表示されない特別なアカウントを使用します。それらを Performance Monitoring Users グループに追加するには、`IIS APPPOOL\<name of the pool>` を探します。たとえば、DefaultAppPool のユーザーは `IIS APPPOOL\DefaultAppPool` になります。

これは、"Computer Management" UI から、または管理者コマンドプロンプトから実行できます。

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/developers/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics
[7]: /ja/developers/dogstatsd/unix_socket/