---
aliases:
- /ja/graphing/correlations/
further_reading:
- link: /dashboards/
  tag: ドキュメント
  text: Datadog ダッシュボード
- link: /notebooks/
  tag: ドキュメント
  text: Datadog ノートブック
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: APM サービス詳細画面
- link: /watchdog/
  tag: ドキュメント
  text: Watchdog
title: Metric Correlations
---

## 概要

<div class="alert alert-info">Metric Correlations は、<strong>メトリクス</strong>データソースを持つ<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

Metric Correlations は、観測された問題の潜在的な根本原因を突き止める際に、同じ時間帯に不規則な挙動を示した他のメトリクスを検索することでその作業を支援します。ダッシュボード、インテグレーション、APM、カスタムメトリクスなど、さまざまなソースからのメトリクスをスキャンします。

## 検索

メトリクス相関の探索は、任意のダッシュボード、ノートブック、APM、Watchdog アラート、またはモニターステータスページから開始できます。

* 任意のグラフを左クリックし、**Find correlated metrics** を選択します。
* グラフを全画面表示にして、**Correlations** タブをクリックします。

{{< img src="dashboards/correlations/find_correlated_metrics.png" alt="ダッシュボードグラフメニューオプションで相関関係のあるメトリクスを検索" style="width:80%;">}}

{{< img src="dashboards/correlations/correlations_tab.png" alt="ダッシュボード検索" style="width:80%;">}}

Correlations は、メトリクスの関心領域 (異常な挙動) の自動検出を試みます。関心領域が自動的に選択されない場合や調整を必要とする場合は、[Edit Search](#edit) オプションから手動で関心領域を取得できます。 Datadog は、関心領域に一致する時間帯に異常な挙動を示す他のメトリクスを検索します。

**注**: 相関性検索は 1 つのメトリクスに対してのみ使用できます。複数のメトリクスを持つグラフの場合は、一連の関心を選択します。グラフを全画面表示にし、グラフ凡例から 1 つの系列を選択して、**Correlations** タブをクリックしてください。

### 編集

相関性のデフォルトの検索パラメーターをカスタマイズできます。グラフを全画面表示にして、*Correlations* タブで **Edit Search** ボタンをクリックするか、グラフを直接クリックします。

* グラフ上でクリックしてドラッグし、相関性検索のタイムフレームを設定します。領域が既に選択されている場合は (ピンク色のボックス)、それを移動またはサイズ変更できます。
* Correlations の検索ソースを定義します (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス)。
* 特定のカテゴリからの `Auto-select` または `Custom select` を実行します。カスタムメトリクスの場合は、少なくとも 1 つ選択する必要があります。
* デフォルトで未選択の唯一のカテゴリーはカスタムメトリクスです。相関性を検索する対象となるメトリクスのネームスペースまたは 1 つのメトリクスを選択します。
* タグフィルターボックスを使って、タグに基づく検索範囲を指定します。

### 結果

検索グラフの下に、次の情報と共に検索結果のリストが表示されます。

* **Type**: ソースタイプ (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス) を表す画像。
* **Source**: 相関性のあるメトリクスのソースの名前。
* **Correlations**: 検索によって見つかった相関性のあるメトリクスの数。
* **Preview**: 相関性のあるメトリクスのプレビューグラフ。

{{< img src="dashboards/correlations/search_results.png" alt="検索結果" style="width:80%;">}}

結果が読み込まれると、すべての結果を待たずに詳細を探索できます。検索が終了すると、「Search completed!」というメッセージが表示されます。

## 調査

[結果リスト](#results)から行を選択し、その相関性の詳細を調査します。

* ダッシュボードと同様に、グラフにカーソルを置くと、時間同期されたラインが他のすべてのグラフに作成されます。
* すべてのソースを確認するには、メニューのフィルターを削除します。
* 各メトリクスのソースは、名前によってリンクされています。たとえば、ダッシュボード名はダッシュボードにリンクしています。
* エクスポートアイコンを使用すると、ダッシュボードやノートブックにグラフをエクスポートしたり、クエリをコピーすることができます。

{{< img src="dashboards/correlations/correlated_metric_source_details.png" alt="相関関係のあるメトリクスソースの詳細表示" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}