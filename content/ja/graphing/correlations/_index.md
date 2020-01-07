---
title: Metric Correlations
kind: documentation
beta: true
further_reading:
- link: graphing/dashboards
  tag: ドキュメント
  text: Datadog ダッシュボード
- link: graphing/notebooks
  tag: ドキュメント
  text: Datadog ノートブック
- link: /tracing/visualization/service
  tag: ドキュメント
  text: APM サービス詳細画面
- link: /watchdog
  tag: ドキュメント
  text: Watchdog
---

<div class="alert alert-warning">
Correlations は公開ベータ版です。アクセス権をリクエストする場合は、<a href="/help">Datadog Support</a> にお問い合わせください。
</div>

## 概要

Metric Correlations は、検出した問題の潜在的な根本原因を突き止める際に、同じ時間帯に不規則な挙動を示した他のメトリクスを検索することでその作業を支援します。ダッシュボード、インテグレーション、APM、カスタムメトリクスなど、さまざまなソースからのメトリクスをスキャンします。

## 検索

メトリクスの相関性の探索は、任意のダッシュボード、ノートブック、APM、Watchdog ストーリー、モニターステータスページから開始できます。

* 任意のグラフを左クリックし、**Find correlated metrics** を選択します。
* グラフを全画面表示にして、**Correlations** タブをクリックします。
* Correlations は、メトリクスの関心領域 (異常な挙動) の自動検出を試みます。
* 関心領域が自動的に選択されない場合や調整を必要とする場合は、[Edit Search](#edit) オプションから手動で関心領域を取得できます。
* Datadog は、関心領域の時間帯に異常な挙動を示した他のメトリクスを検索します。

{{< img src="graphing/correlations/dashboard_search1.png" alt="Dashboard search"  style="width:80%;" >}}

{{< img src="graphing/correlations/dashboard_search2.png" alt="Dashboard search"  style="width:80%;" >}}

**注**: 相関性検索は 1 つのメトリクスに対してのみ使用できます。複数のメトリクスを持つグラフの場合は、一連の関心を選択します。グラフを全画面表示にし、グラフ凡例から 1 つの系列を選択して、**Correlations** タブをクリックしてください。

### 編集

**Edit Search** ボタンをクリックすることで、デフォルトの検索パラメーターをカスタマイズできます。

* グラフ上でクリックしてドラッグし、相関性検索のタイムフレームを設定します。領域が既に選択されている場合は (ピンク色のボックス)、それを移動またはサイズ変更できます。
* Correlations の検索ソースを定義します (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス)。
* 特定のカテゴリからの `Auto-select` または `Custom select` を実行します。カスタムメトリクスの場合は、少なくとも 1 つ選択する必要があります。
* デフォルトで選択されないカテゴリは、カスタムメトリクスだけです。相関性を検索する対象となるメトリクスのネームスペースまたは 1 つのメトリクスを選択します。

{{< img src="graphing/correlations/edit_search.png" alt="Edit search"  style="width:80%;" >}}

### 結果

検索グラフの下に、次の情報と共に検索結果のリストが表示されます。

* **Type**: ソースタイプ (APM サービス、インテグレーション、ダッシュボード、またはカスタムメトリクス) を表す画像。
* **Source**: 相関性のあるメトリクスのソースの名前。
* **Correlations**: 検索によって見つかった相関性のあるメトリクスの数。
* **Preview**: 相関性のあるメトリクスのプレビューグラフ。

{{< img src="graphing/correlations/search_results.png" alt="Search results"  style="width:80%;" >}}

すべての結果が表示されるまで待たなくても、結果の読み込み中に詳細を探索できます。検索が終了すると、「Search completed!」というメッセージが表示されます。

## 調査

結果リストから行を選択して、詳細を調査します。

* ダッシュボードと同様に、グラフにカーソルを置くと、時間同期されたラインが他のすべてのグラフに作成されます。
* すべてのソースを確認するには、メニューのフィルターを削除します。
* 各メトリクスのソースは、名前によってリンクされています。たとえば、ダッシュボード名はダッシュボードにリンクしています。
* エクスポートアイコンを使用すると、ダッシュボードやノートブックにグラフをエクスポートしたり、クエリをコピーすることができます。

{{< img src="graphing/correlations/detail_view.png" alt="Detail view"  style="width:90%;" >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}
