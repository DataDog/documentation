---
title: Metric Correlations
aliases:
    - /graphing/correlations/
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Datadog Dashboards
- link: /notebooks/
  tag: Documentation
  text: Datadog Notebooks
- link: /tracing/services/service_page/
  tag: Documentation
  text: APM Service Page
- link: /watchdog/
  tag: Documentation
  text: Watchdog
---

## 概要

<div class="alert alert-info">Metric Correlations is available for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">Timeseries widgets</a> with the <strong>Metric</strong> data source.</div>

Metric Correlations can help you find potential root causes for an observed issue by searching for other metrics that exhibited irregular behavior around the same time. Correlations scans your metrics from different sources such as dashboards, integrations, APM, and custom metrics.

## 検索

メトリクス相関の探索は、任意のダッシュボード、ノートブック、APM、Watchdog アラート、またはモニターステータスページから開始できます。

* 任意のグラフを左クリックし、**Find correlated metrics** を選択します。
* グラフを全画面表示にして、**Correlations** タブをクリックします。

{{< img src="dashboards/correlations/find_correlated_metrics.png" alt="Dashboard graph menu option find correlated metrics" style="width:80%;">}}

{{< img src="dashboards/correlations/correlations_tab.png" alt="Dashboard search" style="width:80%;">}}

Correlations *tries* to automatically detect the area of interest (anomalous behavior) for your metric. If the area of interest is not selected automatically or needs adjustment, you can manually draw the area of interest from the [edit search](#edit) option. Datadog searches for other metrics that exhibit anomalous behavior at times matching the area of interest.

**注**: 相関性検索は 1 つのメトリクスに対してのみ使用できます。複数のメトリクスを持つグラフの場合は、一連の関心を選択します。グラフを全画面表示にし、グラフ凡例から 1 つの系列を選択して、**Correlations** タブをクリックしてください。

### 編集

You can customize the default search parameters of correlations. From a full-screen graph, on the *Correlations* tab, click the **Edit Search** button, or click directly on the graph.

* グラフ上でクリックしてドラッグし、相関性検索のタイムフレームを設定します。領域が既に選択されている場合は (ピンク色のボックス)、それを移動またはサイズ変更できます。
* Correlations の検索ソースを定義します (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス)。
* 特定のカテゴリからの `Auto-select` または `Custom select` を実行します。カスタムメトリクスの場合は、少なくとも 1 つ選択する必要があります。
* Custom metrics is the only category not selected by default. Choose metric namespaces or single metrics to search correlations upon.
* Use the tag filter box to scope the search by a tag.

### 結果

検索グラフの下に、次の情報と共に検索結果のリストが表示されます。

* **Type**: ソースタイプ (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス) を表す画像。
* **Source**: 相関性のあるメトリクスのソースの名前。
* **Correlations**: 検索によって見つかった相関性のあるメトリクスの数。
* **Preview**: 相関性のあるメトリクスのプレビューグラフ。

{{< img src="dashboards/correlations/search_results.png" alt="検索結果" style="width:80%;">}}

As results load, you can explore the details without waiting for all results. When the search is finished, the message "Search completed!" appears.

## 調査

From the [results list](#results), select a row to investigate the details of that correlation.

* ダッシュボードと同様に、グラフにカーソルを置くと、時間同期されたラインが他のすべてのグラフに作成されます。
* すべてのソースを確認するには、メニューのフィルターを削除します。
* 各メトリクスのソースは、名前によってリンクされています。たとえば、ダッシュボード名はダッシュボードにリンクしています。
* エクスポートアイコンを使用すると、ダッシュボードやノートブックにグラフをエクスポートしたり、クエリをコピーすることができます。

{{< img src="dashboards/correlations/correlated_metric_source_details.png" alt="Detail view of correlated metric source" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
