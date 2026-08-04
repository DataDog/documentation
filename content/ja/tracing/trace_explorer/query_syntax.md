---
aliases:
- /ja/tracing/search_syntax/
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
- /ja/tracing/trace_explorer/trace_groups
description: タグを使用したすべてのトレースのグローバル検索
further_reading:
- link: /getting_started/search/
  tag: よくあるご質問
  text: Datadog での検索の開始
- link: /tracing/trace_collection/
  tag: よくあるご質問
  text: アプリケーションで APM トレーシングをセットアップする方法
- link: /tracing/trace_explorer/trace_view/
  tag: よくあるご質問
  text: Datadog トレースの読み取り方を理解する
- link: /tracing/software_catalog/
  tag: よくあるご質問
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: よくあるご質問
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: よくあるご質問
  text: リソースのパフォーマンスとトレースの詳細
title: 検索構文
---
## 検索クエリ {#search-query}

すべての検索パラメーターは、ページの URL に含まれているので、ビューを共有するのに便利です。

### 検索構文 {#search-syntax}

クエリは*条件*と*演算子*で構成されます。

*条件*には 2 種類あります。

* **スパン属性**: アプリケーション内で自動または手動のインスツルメントによって収集されたスパンの内容を指します。
* **スパンタグ**: スパンに関連するコンテキストを拡張するためのタグです。たとえば、サービスが稼働しているインフラストラクチャーを示すホストやコンテナタグなどが含まれます。
  
複合クエリで複数の*条件*を組み合わせるには、以下のブール演算子のいずれかを使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルト) | 認証 AND 失敗|
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                            | 認証 OR パスワード   |
| `-`          | **排他**: 指定した条件を含まないイベントが選択されます                                                  | 認証 AND パスワード |

### 属性検索 {#attribute-search}

スパン属性を検索するには、属性キーの先頭に `@` を追加する必要があります。

たとえば、以下の属性を持つスパンにアクセスしたい場合は、次のクエリを使用します。

`@git.commit.sha:12345`

```json
  "git": {
    "commit": {
      "sha": "12345"
    },
    "repository": {
      "id": "github.com/datadog/datadog"
    }
  }
```

スパン属性はトレースサイドパネルの [**Overview**] (概要) タブに表示されます。

**注:** [予約属性][17] (`env`、`operation_name`、`resource_name`、`service`、`status`、`span_id`、`timestamp`、`trace_id`、`type`、`link`) については、`@` を使用する必要はありません。

### タグ検索 {#tags-search}

スパンは、それらを生成するホストやインテグレーションからタグを継承します。

たとえば、次のとおりです。

| クエリ                                                        | 一致                                                                                             |
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | インフラストラクチャータグ `hostname:web-server` または予約済み属性 `env:prod` | が付与されたすべてのトレース
| `(availability-zone:us-east OR container_name:api-frontend)` | これらのインフラストラクチャータグのいずれかが付与されたすべてのトレース|
| `(service:api AND -kube_deployment:canary)`                  | `api` サービスで、`canary` デプロイメントにデプロイされていないすべてのトレース                |

スパンタグはトレースサイドパネルの [**Infrastructure**] (インフラストラクチャー) タブに表示されます。

#### 標準外のタグ形式 {#non-standard-tag-formats}

タグが [タグのベストプラクティス][2] に従っていない場合は、`key:value` 構文を使用しないでください。代わりに、次の検索クエリを使用してください。

`tags:<MY_TAG>`

たとえば、次のタグはベストプラクティスに従っていません: 
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

このタグを検索するには、次のクエリを使用します: 
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### ワイルドカード {#wildcards}

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのトレースに一致します。
* `@url:data*` は、`data` で始まる `url` を持つすべてのトレースに一致します。

### 数値 {#numerical-values}

数値属性の検索を実行するには、`<`、`>`、`<=`、または `>=` を使用します。たとえば、応答時間が 100ms を超えるすべてのトレースを取得するには、次のように指定します。

`@http.response_time:>100`

特定の範囲内にある数値属性を検索することもできます。たとえば、すべての 4xx エラーを取得するには、次のように指定します。

`@http.status_code:[400 TO 499]`

### オートコンプリート {#autocomplete}

複雑なクエリを入力するには手間がかかることがあります。検索バーのオートコンプリート機能を使用すると、既存の値を使用してクエリを完成させることができます。

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="検索バーのオートコンプリート " style="width:60%;">}}

### 特殊文字のエスケープ {#escaping-of-special-characters}

`?`、`>`、`<`、`:`、`=`、`"`、`~`、`/`、および `\` は特殊属性と見なされ、エスケープする必要があります。
たとえば、`url` に `user=JaneDoe` を含むトレースを検索するには、次の検索条件を入力する必要があります。

`@url:*user\=JaneDoe*`

同じロジックはトレース属性内のスペースにも適用する必要があります。トレース属性にスペースを含めることはお勧めしませんが、含まれている場合は、スペースをエスケープする必要があります。
属性の名前が `user.first name` の場合、スペースをエスケープしてこの属性で検索を実行します。

`@user.first\ name:myvalue`

### 保存された検索 {#saved-searches}

同じビューを毎日作成するのは時間を無駄にすることはありません。保存された検索には、使用した検索クエリ、列、期間が保存されます。検索名やクエリにかかわらず、これらの情報がオートコンプリート機能によって検出され、検索バーで使用できるようになります。

{{< img src="tracing/app_analytics/search/saved_search.png" alt="保存された検索" style="width:80%;">}}

保存された検索を削除するには、[トレース検索] ドロップダウンメニューの下にあるごみ箱のアイコンをクリックします。

### サービスおよびエンティティの検索 {#search-for-services-and-entities}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
サービスを検索するには、`service` 属性を使用します。別の [エンティティタイプ][20] (たとえば、データベース、キュー、サードパーティプロバイダーなど) を検索する場合は、Datadog が APM でインスツルメントされていない依存関係を表すために使用するその他の [ピア属性][21] を利用します。たとえば、Postgres データベースの `users` テーブルへの呼び出しを表すスパンを見つけるには、次のクエリを使用します: `@peer.db.name:users @peer.db.system:postgres`

**注**: [グローバルサービスネーミング][22] へ移行し、`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true` を設定している場合、スパンの `service` タグはそのスパンを**発行している**サービスを表します。

[20]: /ja/tracing/services/inferred_services
[21]: /ja/tracing/services/inferred_services#peer-tags
[22]: /ja/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## タイムレンジ {#time-range}

タイムレンジを使用すると、特定の期間内のトレースを表示できます。タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンメニューから選択します (または [カスタムタイムフレームを入力します][3])。

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="タイムフレームの選択" >}}

## Span テーブル {#span-table}

Span テーブルは、選択されたコンテキストに一致するスパンのリストです。コンテキストは、[検索バー](#search-bar)フィルターおよび[時間範囲](#time-range)によって定義されます。

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### Service 列 {#the-service-column}

デフォルトでは、Service 列はスパンの `service` 予約属性を表示します。

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="Span テーブルの Service 列" >}}

スパンがインスツルメント済みサービスから推論されたサービスへのクライアント呼び出しを表す場合、Service 列には以下が表示されます。
- `service` 予約属性で識別される**サービス**。
- **[推論サービス][4]**: ベースサービスから呼び出される推論先エンティティ名で、[ピア属性][5] のいずれかで識別されます。

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="inferred service が示されている、Span テーブルの Service 列" >}}

サービス名がベースサービス名からオーバーライドされている場合、Service 列には以下が表示されます。
- **[基本サービス][2]**: `@base_service` 属性によって識別されるスパン発行元のサービス。
- **[サービスオーバーライド][3]**: Datadog インテグレーションによって自動設定、またはプログラマティック API によって変更されたベースサービス名とは異なるサービス名。service override は、`service` 予約属性によって識別されます。

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="service override が示されている、Span テーブルの Service 列" >}}

[2]: /ja/tracing/guide/service_overrides#base-service
[3]: /ja/tracing/guide/service_overrides
[4]: /ja/tracing/services/inferred_services
[5]: /ja/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### 完全なトレースの表示 {#displaying-a-full-trace}

任意のスパンをクリックすると、関連するトレースの詳細を確認できます。

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="トレースストリームのトレース" style="width:80%;">}}

### 列 {#columns}

リストにほかの [スパンタグや属性][23] を列として追加するには、[**Options**] (オプション) ボタンをクリックして、追加する任意のディメンションを選択します。

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="列が示されているトレースリスト" style="width:80%;">}}

### トレースグループ {#trace-groups}

任意のスパンタグまたは属性でクエリをグループ化し、リクエスト数、エラーレート、レイテンシー分布をリストビューで確認できます。**Group by** 句では、最大 4 つのディメンションを選択できます。

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Group by 句" style="width:90%;" >}}

#### 高度な「Group By」クエリ {#advanced-group-by-queries}

グループ化するディメンションを選択したら、[**from**] (取得元) ドロップダウンを使用して、ディメンションの値の取得元を指定できます。
- **Span** (スパン): クエリ対象のスパンのディメンションでグループ化します (デフォルト)。たとえば、`a` です。
- **Parent of span** (スパンの親): クエリに一致するスパンの親スパンから、指定したディメンションの値を取得してグループ化します。たとえば、API エンドポイントのパフォーマンスを呼び出し元のサービスを基準に視覚化するには、`parent(a)` から `service` でグループ化します。
- **Root span** (ルートスパン): トレースのルートスパンから、指定したディメンションでグループ化します。たとえば、リクエストの発生元であるフロントエンドページを基準にバックエンドのリクエストパターンを分析するには、`root` から `@view.name` でグループ化します。

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="root からのグループ化" style="width:90%;" >}}

#### グループリストでトレースグループを表示する {#view-trace-groups-in-the-group-list}

トレースグループは、選択したディメンションの一意の値として表示されます。各グループは、次の 3 つの主要なメトリクスと共に表示されます。
- **REQUESTS** (リクエスト): グループ内のスパンの数。
- **ERRORS** (エラー): エラーレートとエラー数。
- **P95 Latency** (P95 レイテンシー): スパンの p95 レイテンシー。

これらのメトリクスを、クエリ対象のスパンではなく親スパンまたはルートスパンに集約して表示するには、**Show metrics from** 文で `parent(a)` または `root` を選択します。

また、`Latency Breakdown` により、各グループからのリクエスト内で、異なるサービス間でどのように時間が費やされるかが表示されるため、指定したグループについてレイテンシーのボトルネックを視覚的に見つけることができます。

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="グループリスト" style="width:90%;" >}}

より詳細な分析を行うには、任意のグループをクリックして、集計されたメトリクスを構成する個々のスパンイベントを調べます。

## ファセット {#facets}

ファセットは、1 つの属性またはタグの個別値をすべて表示すると共に、示されたトレースの量などのいくつかの基本分析も提供します。また、データを絞り込むためのスイッチにもなります。

ファセットを使用すると、特定の属性に基づいてデータセットを絞り込んだり、データセットの切り口を変えたりすることができます。ファセットには、ユーザーやサービスなどがあります。

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="ファセットのデモ" style="width:80%;">}}

### メジャー {#measures}

メジャー (Measures) は定量的な値に対応する特定のファセットです。

次が必要な場合は、メジャーを使用します。
* 複数のトレースから値を集計します。たとえば、Cassandra の行数にメジャーを作成し、リクエストされたファイルサイズの合計ごとに最上位の参照元または P95 を表示します。
* ショッピングカートの値が $1000 を超えるサービスの最もレイテンシーの高いものを数値的に計算します。
* 連続する値をフィルタリングします。たとえば、ビデオストリームの各ペイロードチャンクのサイズ (バイト単位)。

**タイプ**

メジャーには、同等の機能のために、(長) 整数またはダブル値が付属しています。

**単位**

メジャーは、クエリ時間と表示時間の桁数を処理するための単位 (秒単位の時間またはバイト単位のサイズ) をサポートします。単位は、フィールドではなく、メジャー自体のプロパティです。たとえば、ナノ秒単位の duration メジャーを考えてみます。`duration:1000` が `1000 milliseconds` を表す `service:A` からのスパンタグと、`duration:500` が `500 microseconds` を表す `service:B` からの別のスパンタグがあるとします。
算術演算プロセッサーで流入するすべてのスパンタグの期間をナノ秒にスケーリングします。`service:A` からのスパンタグには `*1000000` 乗数を使用し、`service:B` からのスパンタグには `*1000` 乗数を使用します。
`duration:>20ms` (検索構文を参照) を使用して、両方のサービスから一度に一貫してスパンタグにクエリを実行し、最大 1 分の集計結果を確認します。

### ファセットの作成 {#create-a-facet}

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成" style="width:50%;">}}

新しいファセットを作成すると、フィルタリングや基本分析のために、そのファセットがファセットパネルで利用可能になります。

### ファセットパネル {#facet-panel}

ファセットを使用して、トレースをフィルタリングします。検索バーと URL には、選択内容が自動的に反映されます。

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="ファセットパネル" style="width:30%;">}}

## 可視化 {#visualizations}

分析セレクターを使用して、Analytics の可視化タイプを選択します。

* [時系列](#timeseries)
* [トップリスト](#top-list)
* [テーブル](#table)

### 時系列 {#timeseries}

選択したタイムフレーム内での `Duration` メトリクス (またはファセットのユニーク値数) の動きを可視化し、必要に応じて、使用可能なファセットで分割します。

次の時系列 Analytics は、各**サービス**における **pc99** の **5 分**ごとの **継続時間**の動きを示しています。

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="時系列の例" style="width:90%;">}}

### トップリスト {#top-list}

`Duration` (またはファセットのユニーク値数) に基づいて、ファセットの上位の値を可視化します。

以下の Analytics トップリストは、**pc99** の**サービス**の**継続時間**を上位のものから順に示しています。

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="トップリストの例" style="width:90%;">}}

### テーブル {#table}

選択した [メジャー][9] (リストで選択した最初のメジャー) に基づいてファセットから上位の値を可視化し、このトップリストに示される要素のほかのメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応するログを調査したりすることができます。

* 複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の 2 番目のディメンション、次に 2 番目のディメンション内の上位値内の 3 番目のディメンションに基づき決定されます。
* メジャーが複数ある場合、最初のメジャーに応じて上位または下位のリストが決定されます。
* サブセット (上位または下位) のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンションの値が null または空のイベントは、サブグループとして表示されません。

**注**: 単一のメジャーと単一のディメンションで使用されるテーブルの可視化は、表示は異なりますが、トップリストと同じです。

次のテーブルログ分析は、**スループット**に基づいて、過去 15 分間の**上位ステータスコード**の動きをユニーク**クライアント IP** の数と共に示しています。

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="トップリストの例" style="width:90%;">}}

## 関連トレース {#related-traces}

グラフの一部を選択またはクリックすると、グラフをズームインしたり、選択範囲に対応する [トレース][10] のリストを表示したりすることができます。

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="トレースの表示" style="width:40%;">}}

## エクスポート {#export}

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Analytics のエクスポートボタン" style="width:40%;">}}

クエリのエクスポート先:

* [モニター][11]
* [ダッシュボード][12]
* [ノートブック][18]

また、このクエリから新たなメトリクスを生成することも可能です。

**注**: ダッシュボードおよびノートブック内の APM クエリは、すべての [インデックス化されたスパン][14] に基づいています。モニター内の APM クエリは、[カスタム保持フィルター][19] でインデックス化されたスパンにのみ基づきます。

## 参考資料 {#further-reading}

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
[12]: /ja/dashboards/#get-started
[13]: /ja/help/
[14]: /ja/tracing/glossary/#indexed-span
[15]: /ja/dashboards/
[16]: /ja/dashboards/widgets/timeseries/
[17]: /ja/monitors/notify/variables/?tab=is_alert#reserved-attributes
[18]: /ja/notebooks/
[19]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /ja/tracing/trace_explorer/span_tags_attributes