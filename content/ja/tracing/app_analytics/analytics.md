---
title: ビュー分析
kind: documentation
description: 無制限のカーディナリティでの APM データの分析
aliases:
  - /ja/tracing/trace_search_analytics/analytics
  - /ja/tracing/analytics
  - /ja/tracing/visualization/analytics
  - /ja/tracing/trace_search_and_analytics/analytics/
further_reading:
  - link: /tracing/setup/
    tag: ドキュメント
    text: アプリケーションで APM トレースをセットアップする方法
  - link: /tracing/visualization/services_list/
    tag: ドキュメント
    text: Datadog に報告するサービスの一覧
  - link: /tracing/visualization/service/
    tag: ドキュメント
    text: Datadog のサービスについて
  - link: /tracing/visualization/resource/
    tag: ドキュメント
    text: リソースのパフォーマンスとトレースの詳細
  - link: /tracing/visualization/trace/
    tag: ドキュメント
    text: Datadog トレースの読み方を理解する
  - link: /tracing/app_analytics/search/
    tag: ドキュメント
    text: タグを使用したすべてのトレースのグローバル検索
---
## 概要

[App Analytics][1]を使用して、アプリケーション性能メトリクスや [Analyzed Span][2] をユーザー定義タグで絞り込むことができます。これにより、サービスを流れるウェブリクエストを詳細に調べることができます。

App Analytics は、APM [サービス][3] またはホストごとに有効にできます。App Analyticsが有効にされたサービスは全ての Analyzed Span を Datadog に公開します。

データベースやキャッシュレイヤーなどのダウンストリームのサービスは、トレースを生成しないため利用可能なサービス一覧には含まれませんが、それらの情報は呼び出し側の上位レベルのサービスから取得されます。

## App Analyticsクエリ

クエリを使用して、App Analyticsに何を表示するかを制御できます。

1. 分析する `Duration` メトリクスまたは [ファセット][4]を選択します。`Duration` メトリクスを選択した場合は、集計関数を選択します。[ファセット][4]を選択した場合は、ユニーク数が表示されます。

    {{< img src="tracing/app_analytics/analytics/choose_measure_facet.png" alt="メジャーファセットを選択"  style="width:50%;">}}

2. `Duration` メトリクスには集計関数を選択します。

    {{< img src="tracing/app_analytics/analytics/agg_function.png" alt="集計関数"  style="width:50%;">}}

3. [タグ][5]または[ファセット][4]を使用して、分析を分割します。

    {{< img src="tracing/app_analytics/analytics/split_by.png" alt="分割条件"  style="width:50%;">}}

4. 選択した[ファセット][4]に応じて、上位 (**top**) X 個と下位 (**bottom**) X 個のどちらの値を表示するかを選択します。

    {{< img src="tracing/app_analytics/analytics/top_bottom_button.png" alt="上位下位ボタン"  style="width:20%;">}}

5. 分析タイムステップを選択します。
  グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストも変更されます。

    {{< img src="tracing/app_analytics/analytics/timesteps.png" alt="タイムステップ"  style="width:30%;">}}

## 可視化方法

分析セレクターを使用して、App Analyticsの可視化タイプを選択します。

使用できる可視化タイプは以下のとおりです。

* [Timeseries](#timeseries)
* [トップリスト](#top-list)
* [表](#table)

### Timeseries

選択したタイムフレーム内での`Duration`メトリクス（または[ファセット][4]のユニーク値数）の動きを可視化し、オプションで、使用可能な[ファセット][4]で分割します。

次の時系列App Analyticsは、
各**サービス**における**pc99**の**5分**おきの**継続時間**の動きを示しています。

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="時系列例"  style="width:90%;">}}

### トップリスト

`継続時間`（または[ファセット][4]のユニーク値数）に基づいて、[ファセット][4]の上位の値を可視化します。

次の App Analytics トップリストは、
**pc99** の**サービス**の**継続時間**を上から示しています。

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="トップリストの例"  style="width:90%;">}}

### 表

選択した[メジャー][6] (リストで選択した最初のメジャー) に基づいて[ファセット][4]から上位の値を可視化し、この上位の値に現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応するログをドリルスルーすることができます。

* 複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の2番めのディメンション、次に2番目のディメンション内の上位値内の3番めのディメンションに基づき決定されます。
* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンに使用されるテーブルの可視化では表示の仕方が異なりますが、内容は上位リストと同じです。

 次のテーブルログ分析は、**スループット**に基づいて、過去 15 分間の**上位ステータスコード**の動きをユニーク**クライアント IP** の数と共に示しています。

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="上位リストの例"  style="width:90%;">}}

## 関連トレース

グラフの一部を選択またはクリックすると、グラフをズームインしたり、選択範囲に対応する[トレース][7]のリストを表示したりすることができます。

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="トレースを確認"  style="width:40%;">}}

## エクスポート

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="分析をエクスポートボタン"  style="width:40%;">}}

App Analyticsをエクスポート

* 新しい[APMモニター][8]宛
* 既存の[タイムボード][9]宛
  この機能はベータ版です。組織のために有効にするには、[Datadogのサポートチームまでお問い合わせ][10]ください。

## ダッシュボード内のトレース

トレース検索から[App Analytics][1]をエクスポートするか、[ダッシュボード][11]でメトリクスおよびログと共に直接構築します。

[時系列ウィジェットに関する詳細][12]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/app_analytics/
[2]: /ja/tracing/visualization/#apm-event
[3]: /ja/tracing/visualization/#services
[4]: /ja/tracing/app_analytics/search/#facets
[5]: /ja/getting_started/tagging/
[6]: /ja/tracing/app_analytics/search/#measures
[7]: /ja/tracing/visualization/#trace
[8]: /ja/monitors/monitor_types/apm/
[9]: /ja/dashboards/timeboard/
[10]: /ja/help/
[11]: /ja/dashboards/
[12]: /ja/dashboards/widgets/timeseries/