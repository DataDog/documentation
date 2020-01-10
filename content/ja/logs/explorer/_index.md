---
title: ログエクスプローラー
kind: documentation
description: すべてのログを検索し、ログ分析を実行します
aliases:
  - /ja/logs/explore
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer/saved_views
    tag: Documentation
    text: ログエクスプローラーの自動構成
  - link: logs/explorer/patterns
    tag: Documentation
    text: ログ内のパターン検出
---
ログエクスプローラーを起点として、トラブルシューティングと調査を行うことができます。

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Explore view with comments"  >}}

このビューで、以下の処理を行うことができます。

* [ログ調査のコンテキストを構築する](#context)。
* [ログをフィルターしてログストリームまたはログ分析として視覚化する](#visualization)。
* [ファセットを作成してログエクスプローラービューを設定し、ログを評価する](#setup)。
* [ログエクスプローラービューの内容をモニター、ダッシュボード、または CSV ファイルにエクスポートする。](#export)

## コンテキスト

最初に、ログエクスプローラービューでログを調査するためのコンテキストを構築します。それには、適切なタイムレンジを選択し、検索バーを使用してログストリームやログ分析を絞り込みます。

### タイムレンジ

<mrk mid="27" mtype="seg">タイムレンジ機能を使用して、特定の期間内のログをログストリームやログ分析に表示できます。</mrk>
<mrk mid="28" mtype="seg">タイムレンジは、検索バーのすぐ下にタイムラインとして表示されます。</mrk><mrk mid="29" mtype="seg">タイムラインは、ログストリームオプションパネルの **Show timeline** チェックボックスを使用して、展開したり折りたたんだりすることができます。</mrk>

タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンから選択します。

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Timerange"  >}}

### 検索

ファセット、メジャー、タグ、または[フリーテキスト検索][1]を使用して、ログストリームやログ分析をコンテキストで絞り込むことができます。検索バーと URL には、選択内容が自動的に反映されます。

ログエクスプローラーのすべての検索機能 (ワイルドカードの使用、数値のクエリなど) の詳細は、[ログ検索ガイド][1]を参照してください。

{{< img src="logs/explorer/search_your_logs.gif" alt="Search your logs"  >}}

### 保存済みビュー

保存ビューを使用すると、事前に選択したファセット、メジャー、検索、タイムレンジ、および可視化方法の組み合わせで、自動的にログエクスプローラーを構成できます。

詳細については、[保存ビューに関するドキュメント][2]を参照してください。

## 可視化方法

ログストリームモードとログ分析モードを切り替えるには、ページの左上にある **Log Mode** ボタンをクリックします。

{{< tabs >}}
{{% tab "Logstream" %}}

ログストリームは、選択されたコンテキストに一致するログのリストです。コンテキストは、[検索バー][1]のフィルターと[タイムレンジ](#time-range)で定義されます。


### ログテーブル

<mrk mid="44" mtype="seg">ログストリームはログテーブルに表示されます。</mrk> 

"Options" ボタンを使用して、ログテーブルの内容をニーズと好みに合わせて構成します。カスタム属性のうち列として使用できる属性は、ファセットとメジャーだけです。

ログの結果は日付順で並べ替えられ、デフォルトでは最新の結果が先頭に表示されます。日付のソート順を逆にして、タイムレンジ内で最も古い結果を先頭に表示することもできます。

{{< img src="logs/explorer/logtable_config.png" alt="configure display table"  style="width:50%;">}}



### ログパネル

任意のログ行をクリックするとログパネルが開き、ログの元メッセージ、抽出された属性、タグ (先頭にホスト、サービス、ソースのタグ) などの詳細が表示されます。

ログパネルは、`error.stack`、`http.method`、`duration` などの一部の標準属性がハイライトされ、読みやすくなっています。ログから対応する情報を抽出し、[標準の属性リマッパー][2]を使用して属性を再マップしてください。


下部の JSON セクションで、属性の名前と値を利用して以下の操作を行います。

* 属性からファセットまたはメジャーを作成/編集します。このアクションは、前のログには適用されません。
* ログテーブルに列を追加または削除します。
* 検索リクエストに特定の値 (include または exclude) を付加します。

{{< img src="logs/explorer/attribute_actions.png" alt="configure display table"  style="width:20%;">}}


上部の予約済み属性セクションで、以下の操作を行います。

* <mrk mid="57" mtype="seg">**Host**: ホストダッシュボードにアクセスするか、検索リクエストにログの `host` を付加します。</mrk> 
* **Service**: APM にトレースを表示するか、検索リクエストにトレース ID を付加するか (どちらの場合も、ログに `trace_id` 属性が必要。[ログへのトレース挿入][3]を参照)、検索リクエストにログの `service` を付加します。
* **Source**: 検索リクエストにログの `source` を付加します。


**View in context** ボタンをクリックすると、検索リクエストが更新され、選択したログの直前と直後の日付のログ行が、フィルターに一致しないログ行も含めて表示されます。Datadog は、ログの適切なコンテキストを探すために、タグと共に `Hostname`、`Service`、`filename`、`container_id` の各属性を使用するため、このコンテキストは状況によって異なります。

**Export** ボタンまたはキーボード操作（Ctrl + C / Cmd + C）を介してJSONログの内容をクリップボードへコピーします。

{{< img src="logs/explorer/upper_log_panel.png" alt="configure display table"  style="width:50%;">}}


[1]: /ja/logs/explorer/search
[2]: /ja/logs/processing/attributes_naming_convention
[3]: /ja/tracing/connect_logs_and_traces
{{% /tab %}}
{{% tab "Log Analytics" %}}

[Datadog の処理][1] (ログのパース) が終了し、重要な属性に対して[ファセット](#facets)と[メジャー](#measures)を設定したら、ログクエリをグラフにしたり、最大値、平均値、パーセンタイル、ユニーク数などを表示することができます。

すべてのグラフ作成オプションについては、[ログのグラフ作成ガイド][2]を参照してください。

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics"  style="width:70%;">}}


[1]: /ja/logs/processing
[2]: /ja/logs/explorer/analytics
{{% /tab %}}
{{% tab "Log Patterns" %}}

大量のログデータを調査するには、膨大な時間がかかることがあります。調査に数時間かけても、ログの一部しか解析できないこともあります。ただし実際のログは、その一部が異なる他は、ほぼ内容が同じであることがよくあります。これをパターンと呼びます。

ログエクスプローラーでは、パターンを自動的に表面化し、問題を浮き彫りにすることができます。これは、重要な事項をすばやく明らかにすると共に、無関係な事項を除外します。

詳細については、[ログパターンのセクション][1]を参照してください。

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns"  style="width:70%;">}}


[1]: /ja/logs/explorer/patterns
{{% /tab %}}
{{< /tabs >}}

## セットアップ

パイプラインとプロセッサーを使用して処理を行うと、ログ属性にファセットまたはメジャーのインデックスを付けることで、[コンテキスト](#context)の作成時または[ログの分析][3]時に利用できるようになります。

メモ: ログエクスプローラービューを最大限に活用するには、ログ属性が[Datadog の属性命名規則][4]に従っていることを確認してください。

{{< tabs >}}
{{% tab "Facets" %}}

ファセットは、1 つの属性またはタグの個別メンバーをすべて表示すると共に、示されたログの数などのいくつかの基本分析も提供します。また、データを簡単に絞り込むためのスイッチにもなります。

ファセットを使用すると、特定の属性に基づいてデータセットを絞り込んだり、データセットの切り口を変えることができます。ファセットには、ユーザーやサービスなどがあります。

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo"  style="width:80%;">}}

**ファセットの作成**:

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:30%;">}}

これで、この属性の値が**すべての新しいログに**格納され、[検索バー][1]、[ファセットパネル](#facet-panel)、および[ログ分析クエリ][2]で使用できるようになります。


[1]: /ja/logs/explorer/search
[2]: /ja/logs/explorer/analytics
{{% /tab %}}


{{% tab "Measures" %}}

メジャーは、ログに格納される数値を持つ属性です。これは "ログメトリクス" と考えることができます。

**メジャーの作成**:

属性をメジャーとして使用するには、ログの数値属性をクリックします。

{{< img src="logs/explorer/create_a_mesure.png" alt="Create a measure"  style="width:30%;">}}

これで、この属性の値が**すべての新しいログに**格納され、[検索バー][1]、ファセットパネル、および[ログ分析クエリ][2]で使用できるようになります。

**メジャー単位の選択**:

各メジャーは独自の単位を持ち、ログエクスプローラーの列、ダッシュボードのログストリームウィジェット、およびログ分析への表示に使用されます。

{{< img src="logs/explorer/edit_a_measure.png" alt="Edit a measure"  style="width:50%;">}}


[1]: /ja/logs/explorer/search
[2]: /ja/logs/explorer/analytics
{{% /tab %}}
{{< /tabs >}}

## エクスポート

以下のエクスポート機能を使用して、現在のログ表示をエクスポートします。

{{< tabs >}}
{{% tab "Logstream" %}}

{{< img src="logs/explorer/export.png" alt="view logs button"  style="width:30%;">}}

| ボタン                | 説明                                                                                                          |
| ----                  | -----                                                                                                                |
| Export to Monitor     | 新しい[ログモニター][1]用のログモニタークエリを作成するために、ログストリームに適用されるクエリをエクスポートします。       |
| Export to CSV         | 選択された列と共に現在のログストリームビューを CSV ファイルにエクスポートします。一度に最大 5000 個のログをエクスポートできます。 |


[1]: /ja/monitors/monitor_types/log
{{% /tab %}}
{{% tab "Log Analytics" %}}

{{< img src="logs/explorer/export_log_analytics.png" alt="view logs button"  style="width:30%;">}}

| ボタン              | 説明                                                                                                                                                                  |
| ----                | -----                                                                                                                                                                        |
| Export to Monitor   | 新しい[ログモニター][1]用のログモニタークエリを作成するために、ログ分析に適用されるクエリをエクスポートします。この機能は、まだ使用できません。                |
| Export to Timeboard | ログ分析をウィジェットとして[タイムボード][2]にエクスポートします。 |


[1]: /ja/monitors/monitor_types/log
[2]: /ja/graphing/dashboards/timeboard
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search
[2]: /ja/logs/explorer/saved_views
[3]: /ja/logs/explorer/analytics
[4]: /ja/logs/processing/attributes_naming_convention