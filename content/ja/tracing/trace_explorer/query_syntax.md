---
aliases:
- /ja/tracing/trace_search_analytics/
- /ja/tracing/trace_search/
- /ja/tracing/search
- /ja/tracing/getting_further/apm_events/
- /ja/tracing/trace_search_and_analytics/search/
- /ja/tracing/search/
- /ja/tracing/advanced/search/
- /ja/tracing/app_analytics/search
- /ja/tracing/live_search_and_analytics/search
- /ja/tracing/trace_search_analytics/analytics
- /ja/tracing/analytics
- /ja/tracing/visualization/analytics
- /ja/tracing/trace_search_and_analytics/analytics/
- /ja/tracing/app_analytics/analytics
- /ja/tracing/trace_search_and_analytics/query_syntax
description: タグを使用したすべてのトレースのグローバル検索
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
- link: /tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
title: 検索構文
---

## 検索バー

すべての検索パラメーターは、ページの URL に含まれているので、ビューを共有するのに便利です。

### 検索構文

クエリは*条件*と*演算子*で構成されます。

*条件*には 2 種類あります。

* [**ファセット**](#facet-search)

* [**タグ**](#tags-search)

複合クエリで複数の*条件*を組み合わせるには、以下のブール演算子のいずれかを使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | authentication AND failure   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                            | authentication OR password   |
| `-`          | **排他**: 後続の条件はイベントに含まれません。                                                  | authentication AND -password |

### ファセット検索

特定の[ファセット](#facets)を検索するには、[まずそれをファセットとして追加](#create-a-facet)し、次に `@` を追加してファセット検索を指定します。

たとえば、ファセット名が **url** で、**url** の値 *www.datadoghq.com* で絞り込む場合は、次のように入力します。

`@url:www.datadoghq.com`

### タグ検索

トレースは、タグを生成するホストと[インテグレーション][1]からタグを引き継ぎます。これらも、ファセットとして検索で使用できます。

| クエリ                                                          | 一致                                                                       |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------|
| `("env:prod" OR test)`                                         | タグ `#env:prod` またはタグ `#test` を持つすべてのトレース                      |
| `(service:srvA OR service:srvB)` または `(service:(srvA OR srvB))` | タグ `#service:srvA` または `#service:srvB` を含むすべてのトレース。            |
| `("env:prod" AND -"version:beta")`                             | `#env:prod` を含み、`#version:beta` を含まないすべてのトレース |

タグが[タグのベストプラクティス][2]に従わず、`key:value` 構文も使用していない場合は、次の検索クエリを使用します。

* `tags:<MY_TAG>`

### ワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのトレースに一致します
* `@url:data*` は、`data` で始まる `url` を持つすべてのトレースに一致します。

### 数値

`<`、`>`、`<=`、または `>=` を使用して、数値属性の検索を実行します。たとえば、100ms を超える応答時間を持つすべてのトレースを取得するには、次のようにします。

`@http.response_time:&gt;100`

特定の範囲内にある数値属性を検索することもできます。たとえば、4xx エラーをすべて取得するには、次のようにします。

`@http.status_code:[400 TO 499]`

### オートコンプリート

複雑なクエリを入力するのは面倒です。検索バーのオートコンプリート機能を使用すると、既存の値を使用してクエリを完成させることができます。

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="検索バーのオートコンプリート" style="width:60%;">}}

### 特殊文字のエスケープ

`?`、`>`、`<`、`:`、`=`、`"`、`~`、`/`、および `\` は特殊属性と見なされ、`\` を使用してエスケープする必要があります。
たとえば、`url` に `user=JaneDoe` を含むトレースを検索するには、次の検索を入力する必要があります。

`@url:*user\=JaneDoe*`

同じロジックはトレース属性内のスペースにも適用する必要があります。トレース属性にスペースを含めることはお勧めしませんが、含まれている場合は、スペースをエスケープする必要があります。
属性の名前が `user.first name` の場合、スペースをエスケープしてこの属性で検索を実行します。

`@user.first\ name:myvalue`

### 検索の保存

同じビューを毎日作成するのは時間の無駄です。保存された検索には、検索クエリ、列、期間が含まれます。検索名やクエリにかかわらず、オートコンプリートの一致により、これは検索バーで利用できます。

{{< img src="tracing/app_analytics/search/saved_search.png" alt="保存された検索" style="width:80%;">}}

保存された検索を削除するには、Trace search ドロップダウンメニューの下にあるごみ箱のアイコンをクリックします。

## タイムレンジ

タイムレンジを使用すると、特定の期間内のトレースを表示できます。タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンメニューから選択します（または、[カスタムタイムフレームを入力します][3]):

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="タイムフレームを選択" >}}

## トレースストリーム

トレースストリームは、選択されたコンテキストに一致するトレースのリストです。コンテキストは、[検索バー](#search-bar)のフィルターと[タイムレンジ](#time-range)で定義されます。

### 完全なトレースの表示

トレースをクリックして、詳細を表示します。

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="トレースストリームのトレース" style="width:80%;">}}

### 列

リストにトレースの詳細を追加するには、**Options** ボタンをクリックして、表示するファセットを選択します。

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="列を含むトレースリスト" style="width:80%;">}}

### 複数行表示

{{< img src="tracing/app_analytics/search/multi_line_display.png" alt="複数行表示" style="width:30%;">}}

トレースの表示行数を 1 行、3 行、10 行 から選択します。3 行と 10 行で表示すると、`error.stack` 属性に関する情報をより多く得ることができます。

* 1 行表示の場合
{{< img src="tracing/app_analytics/search/1_multi_line.png" alt="1 行の複数行表示" style="width:80%;">}}

* 3 行表示の場合
{{< img src="tracing/app_analytics/search/3_multi_line.png" alt="2 行の複数行表示" style="width:80%;">}}

* 10 行表示の場合
{{< img src="tracing/app_analytics/search/10_multi_line.png" alt="10 行の複数行表示" style="width:80%;">}}

## ファセット

ファセットは、1 つの属性またはタグの個別値をすべて表示すると共に、示されたトレースの量などのいくつかの基本分析も提供します。また、データを絞り込むためのスイッチにもなります。

ファセットを使用すると、特定の属性に基づいてデータセットを絞り込んだり、データセットの切り口を変えることができます。ファセットには、ユーザーやサービスなどがあります。

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="ファセットデモ" style="width:80%;">}}

### 定量 (メジャー)

**必要に応じてメジャーを使用します。**
* 複数のトレースから値を集計する。たとえば、Cassandra の行数にメジャーを作成し、リクエストされたファイルサイズの合計ごとに最上位の参照元または P95 を表示します。
* ショッピングカートの値が $1000 を超えるサービスの最もレイテンシーの高いものを数値的に計算します。
* 連続する値をフィルタリングします。たとえば、ビデオストリームの各ペイロードチャンクのサイズ（バイト単位）。

**タイプ**

メジャーには、同等の機能のために、（長）整数またはダブル値が付属しています。

**単位**

メジャーは、クエリ時間と表示時間の桁数を処理するための単位（秒単位の時間またはバイト単位のサイズ）をサポートします。単位は、フィールドではなく、メジャー自体のプロパティです。たとえば、ナノ秒単位の duration メジャーを考えてみます。`duration:1000` が 1000 ミリ秒を表す `service:A` からのスパンタグと、`duration:500` が 500 マイクロ秒を表す `service:B` からの他のスパンタグがあるとします。
算術演算プロセッサーで流入するすべてのスパンタグの期間をナノ秒にスケーリングします。`service:A` のスパンタグには `*1000000` 乗数を使用し、`service:B` のスパンタグには `*1000` 乗数を使用します。
`duration:>20ms`（検索構文を参照）を使用して、両方のサービスから一度に一貫してスパンタグにクエリを実行し、最大 1 分の集計結果を確認します。

### ファセットの作成

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成" style="width:50%;">}}

これで、この属性の値が**すべての新しいトレースに**格納され、[検索バー](#search-bar)、[ファセットパネル](#facet-panel)、およびトレースグラフクエリで使用できるようになります。

### ファセットパネル

ファセットを使用し、トレースをフィルタリングします。検索バーと URL には、選択内容が自動的に反映されます。

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="ファセットパネル" style="width:30%;">}}

## Analytics の概要

[Analytics][4] を使用して、アプリケーション性能メトリクスや [Indexed Span][5] をタグで絞り込むことができます。これにより、サービスを流れるウェブリクエストを詳細に調べることができます。

Analytics は、15 分間 (ローリングウィンドウ) で収集されたデータを 100% 有するすべての APM [サービス][6]に対して自動的に有効化されます。カスタム [Retention Filter][7] およびレガシー版の App Analytics でインデックス化されたスパンは Analytics で 15 日間利用可能です。

データベースやキャッシュレイヤーなどのダウンストリームのサービスは、トレースを生成しないため利用可能なサービス一覧には含まれませんが、それらの情報は呼び出し側の上位レベルのサービスから取得されます。

## Analytics クエリ

クエリを使用して、Analytics に表示させるデータを制御できます。

1. 分析する `Duration` メトリクスまたは [ファセット][8]を選択します。`Duration` メトリクスを選択した場合は、集計関数を選択します。ファセットを選択した場合は、ユニーク数が表示されます。

    {{< img src="tracing/app_analytics/analytics/choose_measure_facet.png" alt="メジャーファセットを選択" style="width:50%;">}}

2. `Duration` メトリクスには集計関数を選択します。

    {{< img src="tracing/app_analytics/analytics/agg_function.png" alt="集計関数" style="width:50%;">}}

3. タグまたはファセットを使用して、分析を分割します。

    {{< img src="tracing/app_analytics/analytics/split_by.png" alt="分割条件" style="width:50%;">}}

4. 選択したファセットに応じて、上位 (**top**) X 個と下位 (**bottom**) X 個のどちらの値を表示するかを選択します。

    {{< img src="tracing/app_analytics/analytics/top_bottom_button.png" alt="上位下位ボタン" style="width:20%;">}}

5. 分析タイムステップを選択します。
 グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストも変更されます。

    {{< img src="tracing/app_analytics/analytics/timesteps.png" alt="タイムステップ" style="width:30%;">}}

## 視覚化

分析セレクターを使用して、Analytics の可視化タイプを選択します。

* [Timeseries](#timeseries)
* [トップリスト](#top-list)
* [テーブル](#table)

### Timeseries

選択したタイムフレーム内での `Duration` メトリクス（またはファセットのユニーク値数）の動きを可視化し、使用可能なファセットで分割します (オプション) 。

次の時系列 Analytics は、各**サービス**における **pc99** の **5 分**おきの**継続時間**の動きを示しています。

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="時系列例" style="width:90%;">}}

### Toplist

`継続時間`（またはファセットのユニーク値数）に基づいて、ファセットの上位の値を可視化します。

以下の Analytics トップリストは、**pc99** の**サービス**の**継続時間**を上から示しています。

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="トップリストの例" style="width:90%;">}}

### 表

選択した[メジャー][9] (リストで選択した最初のメジャー) に基づいてファセットから上位の値を可視化し、この上位のリストに現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応するログを調査することができます。

* 複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の 2 番めのディメンション、次に 2 番目のディメンション内の上位値内の 3 番めのディメンションに基づき決定されます。
* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

**注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、上位リストと同じです。

次のテーブルログ分析は、**スループット**に基づいて、過去 15 分間の**上位ステータスコード**の動きをユニーク**クライアント IP** の数と共に示しています。

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="上位リストの例" style="width:90%;">}}

## 関連トレース

グラフの一部を選択またはクリックすると、グラフをズームインしたり、選択範囲に対応する[トレース][10]のリストを表示したりすることができます。

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="トレースを確認" style="width:40%;">}}

## エクスポート

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="分析をエクスポートボタン" style="width:40%;">}}

Analyticsをエクスポート

* 新しい[APMモニター][11]宛
* 既存の[タイムボード][12]宛。この機能はベータ版です。組織内でこれを有効にするには、[Datadogのサポートチームまでお問い合わせ][13]ください。

**注:** Analytics は [Indexed Span][14] ベースでのみエクスポートできます。

## ダッシュボード内のトレース

トレース検索から [Analytics][4] をエクスポートするか、[ダッシュボード][15]でメトリクスおよびログと共に直接構築します。 

[時系列ウィジェットに関する詳細][16]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/java/#integrations
[2]: /ja/getting_started/tagging/#tags-best-practices
[3]: /ja/dashboards/guide/custom_time_frames/
[4]: /ja/tracing/trace_search_and_analytics/
[5]: /ja/tracing/glossary/#apm-event
[6]: /ja/tracing/glossary/#services
[7]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /ja/tracing/trace_search_and_analytics/query_syntax/#facets
[9]: /ja/tracing/trace_search_and_analytics/query_syntax/#measures
[10]: /ja/tracing/glossary/#trace
[11]: /ja/monitors/types/apm/
[12]: /ja/dashboards/#timeboards
[13]: /ja/help/
[14]: /ja/tracing/glossary/#indexed-span
[15]: /ja/dashboards/
[16]: /ja/dashboards/widgets/timeseries/