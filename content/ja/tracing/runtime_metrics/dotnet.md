---
title: .NET ランタイムメトリクス
kind: documentation
description: .NET アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: アプリケーションを手動でインストルメントしてトレースを作成します。
  - link: tracing/opentracing
    tag: Documentation
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/dotnet-runtime-metrics/'
    tag: ブログ
    text: Datadog を使用した .NET ランタイムメトリクスの監視
---
## ランタイムメトリクスの互換性

- .NET フレームワーク 4.5+ 
- .NET Core 3.1
- .NET 5

## 自動コンフィギュレーション

`DD_RUNTIME_METRICS_ENABLED=true` 環境変数を使用して、.NET Tracer 1.23.0+ でランタイムメトリクス収集を有効にします。

ランタイムメトリクスを .NET サービスと相関して表示します。Datadog の[サービス詳細画面][1]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは、ポート `8125` を介して DogStatsD と共に Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][3]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][4] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][5]。

## 収集データ

以下のメトリクスは .NET メトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "dotnet" >}}

Datadog では、APM サービス詳細画面にこれらのメトリクスを表示し、これらのメトリクスに適用された `service` および `runtime-id` タグ付きの[デフォルトの .NET ランタイムダッシュボード][6]を提供します。

## IIS の追加のアクセス許可

.NET フレームワークでは、メトリクスはパフォーマンスカウンターを使用して収集されます。非対話型ログオンセッションのユーザー (IIS アプリケーションプールアカウントと一部のサービスアカウントを含む) は、カウンターデータにアクセスするために **Performance Monitoring Users** グループに追加する必要があります。

IIS アプリケーションプールは、ユーザーのリストに表示されない特別なアカウントを使用します。それらを Performance Monitoring Users グループに追加するには、`IIS APPPOOL\<name of the pool>` を探します。たとえば、DefaultAppPool のユーザーは `IIS APPPOOL\DefaultAppPool` になります。

これは、"Computer Management" UI から、または管理者コマンドプロンプトから実行できます。

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/developers/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics