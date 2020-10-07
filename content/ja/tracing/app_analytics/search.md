---
title: トレース検索
kind: documentation
description: タグを使用したすべてのトレースのグローバル検索
aliases:
  - /ja/tracing/trace_search_analytics/
  - /ja/tracing/trace_search/
  - /ja/tracing/search
  - /ja/tracing/getting_further/apm_events/
  - /ja/tracing/trace_search_and_analytics/search/
  - /ja/tracing/search/
  - /ja/tracing/advanced/search/
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
  - link: /tracing/app_analytics/analytics/
    tag: ドキュメント
    text: 無制限のカーディナリティでの APM データの分析
---
## 検索バー

すべての検索パラメーターはページの URL に含まれているため、ビューは非常に簡単に共有できます。

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

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="検索バーのオートコンプリート"  style="width:60%;">}}

### 特殊文字のエスケープ

`?`、`>`、`<`、`:`、`=`、`"`、`~`、`/`、および `\` は特殊属性と見なされ、`\` を使用してエスケープする必要があります。
たとえば、`url` に `user=JaneDoe` を含むトレースを検索するには、次の検索を入力する必要があります。

`@url:*user\=JaneDoe*`

同じロジックはトレース属性内のスペースにも適用する必要があります。トレース属性にスペースを含めることはお勧めしませんが、含まれている場合は、スペースをエスケープする必要があります。
属性の名前が `user.first name` の場合、スペースをエスケープしてこの属性で検索を実行します。

`@user.first\ name:myvalue`

### 検索の保存

同じビューを毎日作成するのは時間の無駄です。保存された検索には、検索クエリ、列、期間が含まれます。検索名やクエリにかかわらず、オートコンプリートの一致により、これは検索バーで利用できます。

{{< img src="tracing/app_analytics/search/saved_search.png" alt="保存された検索"  style="width:80%;">}}

保存された検索を削除するには、Trace search ドロップダウンの下にあるごみ箱のアイコンをクリックします。

## タイムレンジ

タイムレンジを使用すると、特定の期間内のトレースを表示できます。タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンから選択します（または、[カスタムタイムフレームを入力します][3]):

{{< img src="tracing/app_analytics/search/time_frame.png" style="width:50%;" alt="タイムフレームを選択" >}}

## トレースストリーム

トレースストリームは、選択されたコンテキストに一致するトレースのリストです。コンテキストは、[検索バー](#search-bar)のフィルターと[タイムレンジ](#time-range)で定義されます。

### トレースと indexed span

トレースストリームで、**App Analytics で表示**を選択しトレースと indexed span を表示します。右上の **Traces** ボタンをクリックし、indexed span に関連付けられたサンプリングトレースを表示することを選択します。

{{< img src="tracing/app_analytics/search/trace_analysed_span.png" style="width:40%;" alt="trace_analysed_span"  >}}

**Traces** が選択された場合、トレースストリームにリストされている indexed span には、サンプリングトレースが関連付けられています。**indexed spans** が選択された場合、indexed span のみがトレースストリームにリストされます。

リクエストが[サービス][4]（ウェブサーバー、データベースなど）にヒットすると、Datadog Agent は indexed span を作成します。これは期間、応答コード、[カスタムメタデータ][5]を含むリクエストの記録です。indexed span は、処理されたリクエストのメタデータが添付された単一のスパンで表されます。リクエストを受け取った各サービスに対して、Agent は indexed span を作成します。リクエストがウェブサービス、リストサービス、データベースサービスを介して実行される場合、リクエストは 3 つの indexed span を生成します。生成される indexed span の量を減らすには、[特定のサービスの indexed span コレクションを明示的にオン/オフにします][6]。indexed span の収集を開始するには、[サービスの App Analytics を有効にします][6]。

### 完全なトレースの表示

トレースをクリックして、詳細を表示します。

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="トレースストリームのトレース"  style="width:80%;">}}

### 列

リストにトレースの詳細を追加するには、**Options** ボタンをクリックして、表示するファセットを選択します。

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="列を含むトレースリスト"  style="width:80%;">}}

オリジンリソースは、指定されたトレースのルートにあるリソースを表示するデフォルトの列です。オリジンサーバーまたはオリジンオペレーション名を追加するには、**Options** ボタンをクリックし `@trace.origin.operation_name` または `@trace.origin.service` を選択します。

{{< img src="tracing/app_analytics/search/trace_origin_column.png" alt="オリジン列を含むトレースリスト"  style="width:80%;">}}

### 複数行表示

{{< img src="tracing/app_analytics/search/multi_line_display.png" alt="複数行表示"  style="width:30%;">}}

トレースの表示行数を 1 行、3 行、10 行 から選択します。3 行と 10 行で表示すると、`error.stack` 属性に関する情報をより多く得ることができます。

* 1 行表示の場合
{{< img src="tracing/app_analytics/search/1_multi_line.png" alt="1 行の複数行表示"  style="width:80%;">}}

* 3 行表示の場合
{{< img src="tracing/app_analytics/search/3_multi_line.png" alt="2 行の複数行表示"  style="width:80%;">}}

* 10 行表示の場合
{{< img src="tracing/app_analytics/search/10_multi_line.png" alt="10 行の複数行表示"  style="width:80%;">}}

## ファセット

ファセットは、1 つの属性またはタグの個別値をすべて表示すると共に、示されたトレースの量などのいくつかの基本分析も提供します。また、データを絞り込むためのスイッチにもなります。

ファセットを使用すると、特定の属性に基づいてデータセットを絞り込んだり、データセットの切り口を変えることができます。ファセットには、ユーザーやサービスなどがあります。

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="ファセットデモ"  style="width:80%;">}}

### 定量的ファセット：メジャー

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

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成"  style="width:50%;">}}

これで、この属性の値が**すべての新しいトレースに**格納され、[検索バー](#search-bar)、[ファセットパネル](#facet-panel)、およびトレースグラフクエリで使用できるようになります。

### ファセットパネル

ファセットを使用し、トレースをフィルタリングします。検索バーと URL には、選択内容が自動的に反映されます。

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="ファセットパネル"  style="width:30%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/java/#integrations
[2]: /ja/getting_started/tagging/#tags-best-practices
[3]: /ja/dashboards/guide/custom_time_frames
[4]: /ja/tracing/visualization/#services
[5]: /ja/tracing/guide/adding_metadata_to_spans/
[6]: /ja/tracing/app_analytics/#configure-additional-services-optional
