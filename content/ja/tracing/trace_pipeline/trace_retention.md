---
aliases:
- /ja/tracing/trace_retention/
- /ja/tracing/trace_queries/one_percent_flat_sampling/
description: 保持フィルターでトレース保持を制御する方法について説明します。
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: ドキュメント
  text: Ingestion Controls
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用量メトリクス
kind: documentation
title: トレースの保持
---

{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="保持フィルター" >}}

Datadog APM では、[トレースの取り込みと 15 日間の保持][1]を完全にカスタマイズすることができます。

取り込まれたデータとインデックス化されたデータの量を追跡または監視するには、[使用量メトリクス][2]のドキュメントを参照してください。

## Retention Filters

スパンが取り込まれた後、アカウントに設定された保持フィルターに従って、一部は 15 日間保持されます。

以下の保持フィルターはデフォルトで有効になっており、すべてのサービスやエンドポイント、エラーや高レイテンシーのトレースを確実に可視化することができます。
- [インテリジェント保持フィルター](#datadog-intelligent-retention-filter)は、環境、サービス、オペレーション、リソースごとに異なるレイテンシー分布のスパンを保持します。
- `Error Default` 保持フィルターは `status:error` を持つエラースパンをインデックス化します。保持率とクエリは構成することができます。例えば、本番環境のエラーを取得するには、クエリを `status:error, env:production` に設定します。デフォルトでエラーを捕捉したくない場合は、保持フィルターを無効にしてください。
- Application Security Management を使用している場合、`Application Security` 保持フィルターが有効になります。このフィルタは、アプリケーションセキュリティの影響 (攻撃の試み) があると識別されたトレース内のすべてのスパンの保持を保証します。
- Synthetic Monitoring を使用している場合、`Synthetics` 保持フィルターが有効になります。デフォルトでは、Synthetic API と Synthetic ブラウザテストから生成されたトレースが利用可能な状態に保たれます。トレースと Synthetic テストを相関付ける方法など、詳細は [Synthetic APM][15] を参照してください。


これらに加えて、サービスのための[カスタムタグベースの保持フィルター](#create-your-own-retention-filter)をいくつでも追加作成し、ビジネスにとって最も重要なデータをキャプチャすることが可能です。

**注**: 保持フィルターの作成、削除、変更、有効化、無効化には `apm_retention_filter_write` 権限が必要です。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="保持フィルターページ" >}}

Datadog では、[Retention Filters タブ][3]で、すべての保持フィルターのリストを見ることができます。

Filter Name
: スパンをインデックス化するために使用される各保持フィルターの名前。

Filter Query
: 各フィルターのタグベースのクエリ。

Retention Rate
: インデックス化されるマッチングスパンの数の 0～100% のパーセンテージを指定します。保持されるスパンは、フィルタークエリに一致するスパンの中から一律に選ばれます。

Spans Indexed
: 選択した期間中にフィルターによってインデックス化されたスパンの数。

Last Updated
: 最後に保持フィルターを変更したユーザーとその日付。

Enabled toggle
: フィルターのオンとオフを切り替えることができます。

**注**: 保持フィルターリストの順序は、インデックスの動作を変更します。スパンがリストの早い段階で保持フィルタに一致した場合、そのスパンは保持されるか削除されるかのどちらかです。リストの下位にある一致する保持フィルターは、すでに処理されたスパンを捕らえません。

各保持フィルターの `Spans Indexed` 列は、 `datadog.estimated_usage.apm.indexed_spans` メトリクスによって提供され、これを使用してインデックス化されたスパンの使用量を追跡することが可能です。詳細については、[使用量メトリクス][2]を読むか、アカウントで利用できる[ダッシュボード][4]を参照してください。

<div class="alert alert-info"><strong>注</strong>: 保持フィルターは、Agent によって収集され、Datadog に送信される (「取り込まれる」) トレースには影響しません。取り込まれるトレースデータの量を変更する唯一の方法は、<a href="/tracing/trace_ingestion/mechanisms">取り込みコントロール</a>を使用することです。</div>

### Datadog インテリジェント保持フィルター

Datadog のインテリジェント保持フィルターは、サービスに対して常にアクティブであり、何十ものカスタム保持フィルターを作成する必要なく、代表的なトレースの選択を保持します。これは以下で構成されます。
- [多様性サンプリング](#diversity-sampling)
- [1% フラットサンプリング](#one-percent-flat-sampling)

**注:** [Trace Queries][11] は、インテリジェント保持フィルターによってインデックス化されたデータに基づいています。

インテリジェント保持フィルターによってインデックス化されたスパン (多様性サンプリングと 1% フラットサンプリング) は、インデックス化されたスパンの**使用量にカウントされない**ため、**請求に影響を与えません**。

インテリジェント保持フィルターが保持するスパンよりも多くインデックス化したい特定のタグや属性がある場合、[独自の保持フィルターを作成](#create-your-own-retention-filter)してください。

#### 多様性サンプリング

多様性サンプリングは**サービスエントリースパン**をスキャンして、以下を 30 日間保持します。

- 環境、サービス、オペレーション、リソースの各組み合わせについて、最大 15 分ごとに少なくとも 1 つのスパン (および関連するトレース)。これにより、トラフィックの少ないエンドポイントでも、[サービス][9]と[リソース][10]のページに常にトレース例を見つけることができるようになっています。
- 環境、サービス、オペレーション、リソースの組み合わせごとに、`p75`、`p90`、`p95` のパーセンタイルスパン (および関連するトレース) の高レイテンシースパン。
- エラーの代表的な選択。これにより、エラーの多様性を保証します (たとえば、応答ステータスコード 400、500)。

多様性サンプリングでキャプチャされたデータセットは、一様にサンプリングされていません (つまり、全トラフィックを比例的に代表していません)。エラーやレイテンシーの高いトレースに偏ります。

#### 1% フラットサンプリング

フラット 1% サンプリングは[取り込まれたスパン][12]の**均一な 1% サンプル**です。これは `trace_id` に基づいて適用され、同じトレースに属するすべてのスパンが同じサンプリング決定を共有することを意味します。

このサンプリングメカニズムは均一であり、取り込まれたトラフィック全体を比例的に代表します。その結果、短い時間枠でフィルタリングすると、トラフィックの少ないサービスやエンドポイントがそのデータセットから欠落する可能性があります。

### 独自の Retention Filter を作成

タグに基づく追加フィルターの作成、変更、無効化により、どのスパンをインデックス化し、15 日間保持するかを決定することができます。各フィルターに一致するスパンの保持する割合を設定します。保持されたスパンは、対応するトレースも保存され、[トレースエクスプローラー][7]で表示すると、完全なトレースが利用可能です。

**注: ** トレースエクスプローラーでタグによる検索を行うには、検索対象のタグを直接含むスパンが保持フィルターによってインデックス化されている必要があります。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/create_retention_filter.png" style="width:90%;" alt="保持フィルターの作成">}}

1. 任意のスパンタグを追加して、保持クエリを定義します。定義されたタグを持つ_すべてのスパン_を保持するか、_[サービスエントリスパン][5]_のみを保持するか (デフォルトで選択)、または_[トレースルートスパン][8]_のみを保持するかを選択します。
2. インデックス化するこれらのタグに一致するスパンの割合を設定します。
3. フィルターに名前を付けます。
4. 新しいフィルターを保存します。

新しいフィルターを作成したり、既存のフィルターの保持率を編集すると、Datadog はグローバルインデックスボリュームの変化率の推定値を表示します。

フィルターは直列に保持されます。上流フィルターで `resource:POST /hello_world` というタグのスパンを保持している場合、同じタグのスパンを検索する下流フィルターの **Edit** ウィンドウには、上流フィルターによって保持されているため、それらのスパンは表示されません。

たとえば、フィルターを作成し、以下のすべてのトレースを保持することができます。

- $100 以上のクレジットカード取引。
- SaaS ソリューションのミッションクリティカルな機能を使用中の最重要顧客。
- オンラインのデリバリーサービスアプリケーションの特定バージョン。

## インデックス化されたスパンのトレース検索と分析

### トレースエクスプローラーで

デフォルトでは、カスタム保持フィルター**および**インテリジェント保持フィルターによってインデックス化されたスパンは、トレースエクスプローラーの[集計ビュー][6] (時系列、トップリスト、テーブル) に含まれます。

しかし、ダイバーシティサンプリングされたデータセットは、**一様にサンプリングされていない** (つまり、全トラフィックを比例して代表していない) ため、エラーや高レイテンシーのトレースに偏っているので、クエリに `-retained_by:diversity_sampling` クエリパラメーターを追加すれば、これらのスパンをこれらの表示から除外することができます。

`retained_by` 属性は、すべての保持されたスパンに存在します。その値は次の通りです。
- スパンがダイバーシティサンプリング ([インテリジェント保持フィルター](#datadog-intelligent-retention-filter)の一部) によってキャプチャされた場合は `retained_by:diversity_sampling`。
- スパンが 1% フラットサンプリングでインデックス化された場合は、`retained_by:flat_sampled`。
- スパンが、`Error Default` や `Application Security Default` などの[タグベースの保持フィルター](#create-your-own-retention-filter)によってキャプチャされていた場合は、`retained_by:retention_filter`。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="ファセットで保持" >}}

### ダッシュボード、ノートブック、モニターで

上記の理由により、インテリジェント保持フィルターによってインデックス化されたスパンは、ダッシュボードやノートブックに表示される APM クエリから**除外**され、トレース分析モニター評価から**除外**されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/
[2]: /ja/tracing/trace_pipeline/metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /ja/tracing/glossary/#service-entry-span
[6]: /ja/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /ja/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /ja/tracing/glossary/#trace-root-span
[9]: /ja/tracing/services/service_page/
[10]: /ja/tracing/services/resource_page/
[11]: /ja/tracing/trace_explorer/trace_queries
[12]: /ja/tracing/trace_pipeline/ingestion_controls/
[13]: /ja/tracing/trace_explorer/
[14]: /ja/monitors/types/apm/?tab=traceanalytics
[15]: /ja/synthetics/apm/