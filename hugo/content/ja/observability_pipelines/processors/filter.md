---
description: Filter プロセッサーを使用して、フィルタリングクエリに一致するログ、メトリクス、またはトレースのみをパイプラインの次のステップに送信する方法を学びます。
disable_toc: false
further_reading:
- link: /getting_started/search/
  tag: ドキュメント
  text: Datadog での検索の開始
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: Log Management 検索構文
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Filter Processor
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサーは、フィルタリングクエリに一致するすべてのログまたはメトリクスをパイプラインの次のステップに送信します。フィルタリングクエリに一致しないイベントは破棄され、後続のプロセッサーや送信先には送信されません。

**注**: その他のすべてのプロセッサーのクエリでは、クエリに一致しないイベントはパイプラインの後続のステップに送信されます。これらは破棄されません。

## セットアップ {#setup}

フィルタープロセッサーをセットアップするには、以下を実行します。

- {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログ検索構文][1]または[メトリクス検索構文][2]を参照してください。
  - クエリに一致するイベントは、次のコンポーネントに送信されます。
  - クエリに一致しないイベントは破棄されます。

## 健全性メトリクス {#health-metrics}

すべてのプロセッサーから送信される[コンポーネントメトリクス][3]および[プロセッサーバッファメトリクス][4]については、[Pipelines 使用状況メトリクス][5]のドキュメントを参照してください。フィルタープロセッサーメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:opw_filter` を使用します。

[1]: /ja/observability_pipelines/search_syntax/logs
[2]: /ja/observability_pipelines/search_syntax/metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}