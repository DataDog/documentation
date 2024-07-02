---
title: Quick Graphs
---

## 概要

クイックグラフを使えば、Datadog のどこからでもデータをグラフ化することができます。

以下のいずれかの方法でクイックグラフエディターを開きます。

* 任意のページで `G` をクリック
* グローバル検索 (MacOS では `Cmd+K`、Windows では `Ctrl+K`) メニューです。
* ダッシュボードのサブメニュー

{{< img src="dashboards/guide/quick_graph_editor.png" alt="クイックグラフエディター" style="width:80%;">}}


## データのグラフ化

### グラフ作成のメトリクス

メトリクスへのクエリは、[ダッシュボードのクエリ][1]で説明したプロセスに従って行います。
1. [グラフ化するメトリクスを選択する][1]
2. [フィルターを適用する][2]
3. [集計、ロールアップする][3]
4. [追加の関数を適用する][4]

### イベントのグラフ化
このセクションでは、[ログ][5]、[APM][6]、[RUM][7]、[セキュリティ][8]、[イベント][9]、[CI パイプライン][10]、[CI テスト][11]、[診断結果][12]など、イベントプラットフォームのデータソースへのクエリについて簡単にご説明します。イベントのデータソースをドロップダウンから選択してください (デフォルトは **Metrics** に設定されています)。

イベントデータにクエリを行うには、このプロセスに従ってください。
1. **フィルタリング:** 現在関心のあるデータのサブセットを絞り込んだり、拡大・シフトしたりすることができます。一番上のフィールドには、key:value とフルテキスト検索を組み合わせた検索クエリを入力できます。

{{< img src="dashboards/guide/quick_graph_event_filter.png" alt="イベントのフィルタリング" style="width:80%;">}}

2. **メジャーとファセットの選択:** メジャーを選ぶと、集計関数を選択できます。ファセットを選ぶと、ユニーク数が表示されます。

{{< img src="dashboards/guide/quick_graph_event_measure.png" alt="メジャーの選択" style="width:80%;">}}

3. **集計:** メジャーをグラフ化する場合は、グラフ化するメジャーの集約関数を選択し、ファセットを使用してグラフを分割します。

{{< img src="dashboards/guide/quick_graph_event_group.png" alt="集計の選択" style="width:80%;">}}

4. **Rollup:** グラフの時間間隔を選択します。グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストが変わります。

5. **[その他の関数を適用します][4]** (メトリクスと同様)。

## 視覚化に使用するウィジェットを選択する

クイックグラフは次のウィジェットに対応しています。
* [時系列][3]
* [トップリスト][14]
* [クエリ値][15]
* [ジオマップ][16]

## グラフにタイトルをつける

タイトルを入力しなくても、選択内容に基づいてタイトルが自動的に生成されますが、グラフの内容を表すタイトルをご自身で作成することをお勧めします。

## エクスポート & シェア

**Export** をクリックして、ダッシュボードやノートブックに保存します。グラフの変更は、いつでもエディターに戻って行うことができます。ダッシュボードやノートブックを使わずにグラフへのリンクを直接共有したい場合は、**Copy to Clipboard** をクリックしてください。

[1]: /dashboards/querying/#define-the-metric
[2]: /dashboards/querying/#filter
[3]: /dashboards/querying/#aggregate-and-rollup
[4]: /dashboards/querying/#advanced-graphing
[5]: /logs/explorer/
[6]: /tracing/trace_explorer/
[7]: /real_user_monitoring/explorer/search/
[8]: /security/
[9]: /events/
[10]: /continuous_integration/pipelines/
[11]: /continuous_integration/tests/
[12]: /security/cloud_security_management/misconfigurations/findings/
[13]: /dashboards/widgets/timeseries/
[14]: /dashboards/widgets/top_list/
[15]: /dashboards/widgets/query_value/
[16]: /dashboards/widgets/geomap/
