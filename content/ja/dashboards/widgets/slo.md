---
aliases:
- /ja/monitors/monitor_uptime_widget/
- /ja/monitors/slo_widget/
- /ja/graphing/widgets/slo/
- /ja/dashboards/faq/how-can-i-graph-host-uptime-percentage/
description: SLO の追跡
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: ブログ
  text: Datadog ですべての SLO のステータスを追跡する
- link: /dashboards/guide/slo_graph_query
  tag: Documentation
  text: メトリクスベースの SLO クエリをスコープする
title: SLO サマリーウィジェット
---

## セットアップ

SLO サマリーウィジェットを使用して、ダッシュボード上で [サービスレベル目標 (SLO)][1] を視覚化します。

{{< img src="/dashboards/widgets/slo/metric_slo_filter_by.png" alt="メトリクスベースの SLO サマリーウィジェットグラフエディタ " >}}

### コンフィギュレーション


1. ドロップダウンメニューから SLO を選択します。
2. ** メトリクスベースの SLO の場合**: タグでクエリをフィルタリングし、[テンプレート変数][2]を活用して動的に結果をスコープすることができます。
    - テンプレート変数を活用するには、*filter by* フィールドを使用して、ウィジェットが表示する SLO ステータスをスコープします。たとえば、`filter by $datacenter` は、ダッシュボードで *datacenter* テンプレート変数に選択したすべての値に SLO クエリをスコープします。
    - タグが元の SLO 構成に含まれていない場合でも、SLO メトリクスクエリに追加のスコープとコンテキストを追加します。例えば、元の SLO クエリが `sum:trace.flask.request.hits{*} by {resource_name}.as_count()` で、ウィジェットで `env:prod` でフィルターした場合、データは `prod` 環境からのもののみにスコープされます。
3. タイムウィンドウは 3 つまで選択できます。

### オプション

#### タイムウィンドウを設定する

最大 3 つの異なるローリングタイムウィンドウを選択します。オプションで、カレンダーのタイムウィンドウを選択するか、**Global Time** を選択することができます。

`Global Time` では、過去 90 日以内の任意の期間で SLO のステータスやエラーバジェットを表示することができます。

任意の時間帯に、オプションで固有の SLO ターゲットを指定することができます。エラーバジェットを表示し、SLO ステータス値を緑または赤で色分けするには、SLO ターゲットを指定する必要があります。

**注**: SLO 入力ターゲットが指定されていない場合、SLO ステータスのみが表示され、文字色はグレーのままです。

#### 表示設定

`Show error budget` オプションのトグルで、残りのエラーバジェットの表示/非表示を操作します。複数のグループまたはモニターでモニターベースの SLO を閲覧している場合は、`View mode` を選択します。

- 複数のグループに分割された単一モニターでモニターベースの SLO を構成している場合は、以下の 3 つのビューモードが利用可能です。
  - `Overall`: 全体の SLO ステータスのパーセンテージとターゲットを表示します
  - `Groups`: 各グループのステータス割合を表形式で表示します
  - `Both`: 総合 SLO ステータスの割合と目標、各グループのステータス割合表の両方を表示します

- 複数モニターでモニターベースの SLO を構成している場合は、以下の 3 つのビューモードが利用可能です。
  - `Overall`: 全体の SLO ステータスのパーセンテージとターゲットを表示します
  - `Groups`: 各グループのステータス割合を表形式で表示します
  - `Both`: 総合 SLO ステータスの割合と目標、各モニターのステータス割合表の両方を表示します

**注:** `Global Time` のタイムウィンドウオプションが選択されている場合、`Overall` ビューモードのみを使用できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][3] ドキュメントをご参照ください。

SLO サマリーウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/service_level_objectives/
[2]: /ja/dashboards/template_variables/
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/