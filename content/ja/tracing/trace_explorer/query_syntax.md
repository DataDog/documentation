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
  text: Datadog に報告するサービスを発見し、カタログ化します
- link: /tracing/services/service_page/
  tag: よくあるご質問
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: よくあるご質問
  text: リソースのパフォーマンスとトレースの詳細
title: 検索構文
---
## 検索クエリ{#search-query}

すべての検索パラメーターは、ページの URL に含まれているので、ビューを共有するのに便利です。

### 検索構文{#search-syntax}

クエリは*条件*と*演算子*で構成されます。

条件には*2種類*あります。

* **スパン属性**: アプリケーション内で自動または手動のインスツルメンテーションによって収集されたスパンの内容を指します。
* **スパンタグ**: スパンに関連するコンテキストの強化情報です。例えば、サービスが実行されているインフラストラクチャーを説明するホストやコンテナのタグです。
  
複合クエリで複数の*条件*を組み合わせるには、以下のブール演算子のいずれかを使用します：

| **演算子** | **説明**                                                                                        | **例**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **積**: 両方の条件が選択されたイベントに含まれます（何も追加しなければ、AND がデフォルトです）| 認証 AND 失敗|
| `OR`         | **和**: いずれかの条件が選択されたイベントに含まれます| 認証 OR パスワード|
| `-`          | **除外**: 次の条件はイベントに含まれません| 認証 AND -パスワード|

### 属性検索{#attribute-search}

スパン属性を検索するには、属性キーの先頭に`@`を追加する必要があります。

例えば、以下の属性を持つスパンにアクセスしたい場合は、次のクエリを使用します:

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

スパン属性はトレースサイドパネルの**概要**タブに表示されます。

**注意:**予約属性に対して`@`を使用する必要はありません：[予約属性][17]: `env`、`operation_name`、`resource_name`、`service`、`status`、`span_id`、`timestamp`、`trace_id`、`type`、`link`

### タグ検索{#tags-search}

スパンは、それらを生成するホストやインテグレーションからタグを継承します。

たとえば、以下のとおりです。

| クエリ| 一致|
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | インフラストラクチャータグ`hostname:web-server`または予約属性`env:prod` |が付与されたすべてのトレース
| `(availability-zone:us-east OR container_name:api-frontend)` | これらのインフラストラクチャータグのいずれかが付与されたすべてのトレース|
| `(service:api AND -kube_deployment:canary)`                  |  `api` サービスから、`canary` デプロイメントにデプロイされていないすべてのトレース |

スパンタグはトレースサイドパネルの**Infrastructure**タブに表示されます。

#### 標準外のタグ形式{#non-standard-tag-formats}

タグが [タグのベストプラクティス][2] に従っていない場合は、`key:value` 構文を使用しないでください。代わりに、次の検索クエリを使用してください:

`tags:<MY_TAG>`

例えば、このタグはベストプラクティスに従っていません: 
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

このタグを検索するには、次のクエリを使用してください: 
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### ワイルドカード{#wildcards}

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します:

* `service:web*` は、`web` で始まるサービスを持つすべてのトレースに一致します。
* `@url:data*` は、`url` で始まる `data` を持つすべてのトレースに一致します。

### 数値{#numerical-values}

`<`、`>`、`<=`、または `>=` を使用して、数値属性に対して検索を実行します。例えば、応答時間が 100ms を超えるすべてのトレースを取得するには:

`@http.response_time:>100`

特定の範囲内で数値属性を検索することも可能です。例えば、すべての 4xx エラーを取得するには:

`@http.status_code:[400 TO 499]`

### オートコンプリート{#autocomplete}

複雑なクエリを入力するのは面倒です。検索バーのオートコンプリート機能を使用すると、既存の値を使用してクエリを完成させることができます。

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="検索バーのオートコンプリート " style="width:60%;">}}

### 特殊文字のエスケープ{#escaping-of-special-characters}

次の属性は特殊と見なされ、エスケープが必要です: `?`、`>`、`<`、`:`、`=`、`"`、`~`、`/`、および `\`。
例えば、`user=JaneDoe`を含む`url`のトレースを検索するには、次の検索を入力する必要があります。

`@url:*user\=JaneDoe*`

トレース属性内のスペースにも同じ論理を適用する必要があります。トレース属性にスペースを含めることは推奨されませんが、そのような場合はスペースをエスケープする必要があります。
属性が`user.first name`と呼ばれている場合、スペースをエスケープしてこの属性で検索を実行します。

`@user.first\ name:myvalue`

### 検索の保存 {#saved-searches}

毎日同じビューを構築するのに時間を無駄にしないでください。保存された検索には、検索クエリ、列、および時間の範囲が含まれています。それらは、検索名またはクエリに一致するオートコンプリートのおかげで、検索バーで利用可能になります。

{{< img src="tracing/app_analytics/search/saved_search.png" alt="保存された検索" style="width:80%;">}}

保存された検索を削除するには、Trace search ドロップダウンメニューの下にあるごみ箱のアイコンをクリックします。

### サービスおよびエンティティの検索 {#search-for-services-and-entities}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
サービスを検索するには、`service`属性を使用します。別の[エンティティタイプ][20]（例えば、データベース、キュー、またはサードパーティプロバイダー）を検索するには、DatadogがAPMで計測されていない依存関係を説明するために使用する他の[ピア属性][21]に依存します。例えば、Postgresデータベースから`users`テーブルへの呼び出しを表すスパンを見つけるには、次のクエリを使用します：`@peer.db.name:users @peer.db.system:postgres`

**注意**：スパンの`service`タグは、を設定して[グローバルサービス名付け][22]に移行した場合にスパンを**発行している**サービスを表します。`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true`

[20]: /ja/tracing/services/inferred_services
[21]: /ja/tracing/services/inferred_services#peer-tags
[22]: /ja/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## タイムレンジ {#time-range}

タイムレンジを使用すると、特定の時間期間内のトレースを表示できます。ドロップダウンメニューからプリセット範囲を選択するか、[カスタムタイムフレームを入力する][3]ことで、タイムレンジをすばやく変更できます。

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="時間範囲を選択" >}}

## スパンテーブル {#span-table}

スパンテーブルは、選択したコンテキストに一致するスパンのリストです。コンテキストは、[検索バー](#search-bar)フィルターと[時間範囲](#time-range)によって定義されます。

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### サービス列 {#the-service-column}

デフォルトでは、サービス列はスパンの`service`予約属性を表示します。

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="スパンテーブルサービス列" >}}

スパンがインスツルメント済みサービスから推論されたサービスへのクライアント呼び出しを表す場合、Service 列には以下が表示されます。
- その**サービス**は、`service`予約属性によって識別されます。
- その**[推論サービス][4]**：ベースサービスから呼び出される推論エンティティの名前で、[ピア属性][5]のいずれかで識別されます。

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="推論サービスを持つスパンテーブルサービス列" >}}

サービス名がベースサービス名からオーバーライドされている場合、Service 列には以下が表示されます:
- その**[ベースサービス][2]**：スパンが発行されるサービスで、`@base_service`属性によって識別されます。
- その**[サービスオーバーライド][3]**：ベースサービス名とは異なるサービス名で、Datadogの統合で自動的に設定されるか、プログラムAPIを介して変更されます。サービスオーバーライドは、`service`予約属性によって識別されます。

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="サービスオーバーライドを持つスパンテーブルサービス列" >}}

[2]: /ja/tracing/guide/service_overrides#base-service
[3]: /ja/tracing/guide/service_overrides
[4]: /ja/tracing/services/inferred_services
[5]: /ja/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### 完全なトレースの表示 {#displaying-a-full-trace}

任意のスパンをクリックすると、関連するトレースの詳細を確認できます。

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="トレースイントレースストリーム" style="width:80%;">}}

### 列 {#columns}

リストに他の[スパンタグや属性][23]を列として追加するには、**オプション**ボタンをクリックして、追加したい任意のディメンションを選択します。

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="列を持つトレースリスト" style="width:80%;">}}

### トレースグループ {#trace-groups}

リストビューでリクエスト数、エラーレート、レイテンシ分布を観察するために、任意のスパンタグや属性でクエリをグループ化します。**グループ化**句で最大4つのディメンションを選択できます。

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="グループ化句" style="width:90%;" >}}

#### 高度な「グループ化」クエリ {#advanced-group-by-queries}

次元をグループ化するために選択した後、**from** ドロップダウンを使用して次元の値を取得する場所を指定できます:
- **スパン**: クエリされたスパンの次元でグループ化します（デフォルト）。たとえば、 `a`。
- **スパンの親**: クエリに一致するスパンの親スパンから指定された次元でグループ化します。例えば、APIエンドポイントのパフォーマンスを、その呼び出し元のサービスに基づいて視覚化するために、`service`を`parent(a)`でグループ化します。
- **ルートスパン**: トレースのルートスパンから指定された次元でグループ化します。例えば、フロントエンドページから発信されるリクエストに基づいてバックエンドリクエストパターンを分析するために、`@view.name`の`root`でグループ化します。

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="ルートからグループ化" style="width:90%;" >}}

#### グループリストでトレースグループを表示 {#view-trace-groups-in-the-group-list}

トレースグループは、選択した次元のユニークな値として表示されます。各グループは、3 つの主要なメトリクスで表示されます:
- **リクエスト**: グループ内のスパンのカウント。
- **エラー**: エラー率とエラーのカウント。
- **P95 レイテンシ**: スパンの p95 レイテンシ。

クエリされたスパンの代わりに親またはルートスパン全体でこれらのメトリクスを表示するには、**「メトリクスを表示する」**文で`parent(a)`または`root`を選択します。

さらに、`Latency Breakdown` は、各グループからのリクエスト内で異なるサービス間で時間がどのように使われているかを示し、特定のグループのレイテンシボトルネックを視覚的に特定できるようにします。

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="グループリスト" style="width:90%;" >}}

より深い分析のために、任意のグループをクリックして集約されたメトリクスを構成する個々のスパンイベントを調べます。

## ファセット {#facets}

ファセットは、1 つの属性またはタグのユニークな値をすべて表示するとともに、代表となるトレース数などの基本的な分析情報も提供します。これはデータをフィルタリングするためのスイッチでもあります。

ファセットを使用すると、特定の属性に基づいてデータセットをピボットまたはフィルタリングできます。ファセットの例には、ユーザー、サービスなどが含まれます...

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="ファセットデモ" style="width:80%;">}}

### メジャー {#measures}

メジャー (Measures) は定量的な値に対応する特定のファセットです。

次が必要な場合は、メジャーを使用します。
* 複数のトレースから値を集計します。たとえば、Cassandra の行数にメジャーを作成し、リクエストされたファイルサイズの合計ごとに P95 または最上位の参照元を表示します。
* ショッピングカートの値が $1000 を超えるサービスの最もレイテンシーの高いものを数値的に計算します。
* 連続する値をフィルタリングします。たとえば、ビデオストリームの各ペイロードチャンクのサイズ（バイト単位）です。

**タイプ**

メジャーには、同等の機能のために、（長）整数またはダブル値が付属しています。

**単位**

メジャーは、クエリ時間と表示時間で桁違いの処理を容易にするために、（秒単位の時間またはバイト単位のサイズの）単位をサポートします。単位は、フィールドのものではなく、メジャー自体のプロパティです。たとえば、ナノ秒単位の期間メジャーを考慮してください：`service:A` からのスパンタグがあり、`duration:1000` は `1000 milliseconds` を表し、`service:B` からの別のスパンタグがあり、`duration:500` は `500 microseconds` を表します。
算術プロセッサを使用して、すべてのスパンタグの期間をナノ秒にスケールします。`*1000000` の乗数を `service:A` からのスパンタグに、`*1000` の乗数を `service:B` からのスパンタグに使用します。
`duration:>20ms` を使用して（検索構文を参照）、両方のサービスから一度に一貫してスパンタグにクエリを実行し、最大1分の集計結果を確認します。

### ファセットを作成 {#create-a-facet}

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成" style="width:50%;">}}

新しいファセットを作成すると、フィルタリングや基本分析のために、そのファセットがファセットパネルで利用可能になります。

### ファセットパネル {#facet-panel}

ファセットを使用してトレースをフィルタリングします。検索バーとURLは、自動的に選択内容を反映します。

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="ファセットパネル" style="width:30%;">}}

## 可視化 {#visualizations}

分析セレクターを使用して、Analyticsの可視化タイプを選択します。

* [時系列](#timeseries)
* [トップリスト](#top-list)
* [テーブル](#table)

### 時系列 {#timeseries}

選択したタイムフレーム内での`Duration`メトリクス（またはファセットのユニーク値数）の動きを可視化し、オプションで使用可能なファセットで分割します。

次の時系列Analyticsは、各**サービス**における**pc99**の**継続時間**の5分ごとの動きを示しています。

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="時系列の例" style="width:90%;">}}

### トップリスト {#top-list}

ファセットからの上位の値を`Duration`（またはファセットのユニーク値数）に基づいて可視化します。

以下のトップリストAnalyticsは、**pc99**の**期間**を**サービス**の上位を示しています。

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="トップリストの例" style="width:90%;">}}

### テーブル {#table}

選択した[メジャー][9]（リストで選択した最初のメジャー）に基づいてファセットから上位の値を可視化し、この上位のリストに現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかの次元に対応するログを調査します。

* 複数の次元がある場合、上位の値は最初の次元に基づき決定され、その後最初の次元内の上位値内の2番目の次元、次に2番目の次元内の上位値内の3番目の次元に基づき決定されます。
* メジャーが複数ある場合、最初のメジャーに応じてトップリストまたは下位リストが決定されます。
* 小計は、表示されるのがサブセット（上位または下位）のみであるため、グループ内の値の実際の合計と異なる場合があります。この次元の値がnullまたは空の場合、サブグループとして表示されません。

**注**: 単一のメジャーと単一の次元で使用されるテーブルの可視化は、表示が異なりますが、トップリストと同じです。

次のテーブルログ分析は、**上位ステータスコード**の動きを、**スループット**に基づいて、ユニークな**クライアントIP**の数と共に、過去15分間で示しています。

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="トップリストの例" style="width:90%;">}}

## 関連トレース {#related-traces}

グラフの一部を選択またはクリックすると、グラフをズームインしたり、選択範囲に対応する[トレース][10]のリストを表示したりすることができます。

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="トレースを表示" style="width:40%;">}}

## エクスポート {#export}

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Analyticsをエクスポートするボタン" style="width:40%;">}}

クエリのエクスポート先:

* To [monitor][11]
* [ダッシュボード][12]へ
* To [notebook][18]

また、このクエリから新たなメトリクスを生成することも可能です。

**注**: ダッシュボードやノートブックのAPMクエリは、すべての[インデックスされたスパン][14]に基づいています。モニターのAPMクエリは、[カスタム保持フィルター][19]によってインデックスされたスパンのみに基づいています。

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