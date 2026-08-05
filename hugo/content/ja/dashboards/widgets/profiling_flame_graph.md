---
aliases:
- /ja/video-categories/flamegraph/
description: 消費量の多いコード行の内訳をグラフ化 (CPU、メモリ、...)
further_reading:
- link: /profiler/profile_visualizations/
  tag: ドキュメント
  text: プロファイルの視覚化について
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: プロファイリングフレームグラフウィジェット
widget_type: flame_graph
---

## 概要

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="プロファイリングフレームグラフ" >}}

[プロファイリングフレームグラフの視覚化][1]は、CPU やメモリなどの消費が多いコード行の内訳を表します。このウィジェットを追加して、プロファイルされたアプリケーションのスタックトレースを視覚化し、頻繁なリソース要求を正確に特定します。

## セットアップ

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="プロファイリングフレームグラフウィジェット構成のデータをグラフ化するセクション" style="width:100%;" >}}

### 構成

1. タグでプロファイリングデータの範囲を指定します。例: `host`、`container_name`、`service`、`env`、`version`。
2. リソースを選択するには、**Show** の横にあるドロップダウンメニューをクリックします。オプションには `CPU Time`、`Allocated Memory`、`Thrown Exceptions` などがあります。
3. **by** と **for** の横にあるドロップダウンメニューをクリックして、フレームの粒度とコードの出所をそれぞれ選択します。
4. グラフにタイトルを付けるか、提案されたタイトルを使用するにはボックスを空白のままにします。
5. **Save** をクリックします。

### オプション

#### 高度なオプションとフィルタリング

3 つのドットの省略記号をクリックして高度なオプションを開き、カラーリングや解像度を指定します。

フレームグラフをカスタマイズします。*Filter flame graph* フィールドにグラフアクションやフィルターを追加します。

#### エンドポイントへのスコープ

特定のエンドポイントでフィルタリングし、総消費量 (`per Minute by Endpoint`) またはリクエストごと (`per Endpoint Call`) を指定します。

#### 関数へのスコープ

`Method`、`Package`、`Thread name`、`Trace Operation` などの他の条件でフィルタリングします。

#### グローバルタイム

ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェットの JSON スキーマ定義][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/profile_visualizations/#flame-graph
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/