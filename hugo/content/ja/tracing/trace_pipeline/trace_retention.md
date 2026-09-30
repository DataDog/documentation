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
  text: Ingestion Control
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用量メトリクス
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: ラーニングセンター
  text: APM レート制限と保持
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: ブログ
  text: 保持フィルターを使用してフロントエンドとバックエンドのデータを統合し、関連付けます。
- link: https://www.datadoghq.com/blog/trace-aws-lambda-durable-functions/
  tag: ブログ
  text: Datadog で AWS Lambda Durable Functions をトレースする
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: '分散型トレーシングの習得: データ量の課題と、Datadog の効率的なサンプリングのアプローチ'
title: トレースの保持
---
{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="保持フィルター" >}}

Datadog APM では、[トレースの取り込みと 15 日間の保持][1] を完全にカスタマイズすることができます。

取り込まれたデータとインデックス化されたデータの量を追跡または監視するには、[使用量メトリクス][2] のドキュメントを参照してください。

## 保持フィルター {#retention-filters}

スパンが取り込まれた後、アカウントに設定された保持フィルターに従って、一部は 15 日間保持されます。
1. **[インテリジェント保持フィルター](#datadog-intelligent-retention-filter)**は、環境、サービス、オペレーション、リソースごとに異なるレイテンシー分布のスパンを保持します。
2. いくつかの**[デフォルト保持フィルター](#default-retention-filters)**は、すべてのサービスやエンドポイント、エラーや高レイテンシートレースの可視性を維持するために作成されています。
3. ビジネスにとって最も重要なトレースをキャプチャするために、スパン属性やタグフィルターに基づいて、サービスごとに**[カスタム保持フィルター](#create-your-own-retention-filter)**をいくつでも作成できます。

**注**: 保持フィルターの作成、削除、変更、有効化、無効化には `apm_retention_filter_write` 権限が必要です。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="[Retention Filters] (保持フィルター) ページ" >}}

Datadog では、[[Retention Filters] (保持フィルター)][3] 設定ページですべての保持フィルターのリストを確認できます。

Filter Name (フィルター名)
: スパンをインデックス化するために使用される各保持フィルターの名前。

Filter Query (フィルタークエリ)
: 各フィルターのタグベースのクエリ。

Retention Rate (保持率)
: インデックス化される一致するスパンの数の割合 (0〜100%)。保持されるスパンは、フィルタークエリに一致するスパンの中から均一に選択されます。

Spans Indexed (インデックス付けされたスパン)
: 選択した期間中にフィルターによってインデックス化されたスパンの数。

Last Updated (最終更新)
: 最後に保持フィルターを変更したユーザーとその日付。

Enabled toggle (トグル有効化)
: フィルターのオンとオフを切り替えることができます。

**注**: 保持フィルターリストの順序は、インデックス化の動作に影響します。リストの上位にある保持フィルターに一致するスパンは、保持されるかまたは破棄されます。リストの下位にある保持フィルターに一致する場合は、すでに処理されたスパンはキャッチされません。

各保持フィルターの `Spans Indexed` 列は `datadog.estimated_usage.apm.indexed_spans` メトリクスを使用しています。このメトリスを使用して、インデックス化されたスパンの使用状況を追跡できます。詳細については、[メトリクス][2] を参照するか、アカウントで利用可能な [標準装備の使用量ダッシュボード][4] を確認してください。

<div class="alert alert-info">保持フィルターは、Agent によって収集され、Datadog に送信される (「取り込まれる」) トレースには影響しません。取り込みを制御するには、専用の <a href="/tracing/trace_pipeline/ingestion_controls/">Ingestion Control</a> を使用してください。</div>


### 保持フィルターの種類 {#retention-filter-types}

2 種類の保持フィルターがあります。

1. **スパンレベルの保持フィルター** - フィルター条件に一致する特定のスパンのみをインデックス化します。
2. **トレースレベルの保持フィルター** - フィルター条件に一致するスパンを含むトレース全体をインデックス化し、Trace Queries で完全なトレースを検索可能にします。

| 機能 | 標準保持フィルター | トレースレベルの保持フィルター |
| ------- | ------------------------- | ----------------------------- |
| **構成** | スパンクエリ + スパン保持率 | スパンクエリ + スパン保持率 + トレース保持率 |
| **インデックス化対象** | クエリの対象として指定されたスパンのみ | クエリに一致するスパンを含むトレースに属するすべてのスパン |
| **クエリ可能な場所** | Span Explorer | Span Explorer および Trace Queries |

**注**: トレースレベルの保持フィルターによって保持される間接的にインデックス化されたスパン (つまり、クエリには直接一致しないが、一致するトレースに属するスパン) は、[トレース分析モニター][19] によって評価されません。

### デフォルトの保持フィルター {#default-retention-filters}

以下の保持フィルターがデフォルトで有効になっています。
- `Error Default` 保持フィルターは、`status:error` を含むエラースパンをインデックス化します。保持率とクエリは構成可能です。たとえば、本番環境のエラーをキャプチャするには、クエリを `status:error, env:production` に設定します。エラーをデフォルトでキャプチャしない場合には、保持フィルターを無効にします。
- [App and API Protection][16] を使用している場合、`App and API Protection Default` 保持フィルターが有効になります。これは、アプリケーションセキュリティへの影響 (攻撃の試行) があると特定されたトレース内のすべてのスパンが確実に保持されるようにします。
- Synthetic Monitoring を使用している場合、`Synthetics Default` 保持フィルターが有効になります。これにより、合成 API テストやブラウザテストから生成されたトレースが、デフォルトで利用可能な状態に保たれます。トレースと Synthetic テストを関連付ける方法など、詳細については [Synthetic APM][15] を参照してください。
- [Dynamic Instrumentation][17] を使用している場合、`Dynamic Instrumentation Default` 保持フィルターが有効になります。これにより、ダイナミックインスツルメンテーションで動的に作成されたスパンが、デフォルトで長期的に利用可能な状態に保たれます。

### Datadog インテリジェント保持フィルター {#datadog-intelligent-retention-filter}

Datadog のインテリジェント保持フィルターは、サービスに対して常にアクティブであり、何十ものカスタム保持フィルターを作成する必要なく、代表的なトレースの選択を保持します。このフィルターは以下で構成されています。
- [多様性サンプリング](#diversity-sampling)
- [1% フラットサンプリング](#one-percent-flat-sampling)

**注:** [Trace Queries][11] は、インテリジェント保持フィルターによってインデックス化されたデータに基づいています。

インテリジェント保持フィルターによってインデックス化されたスパン (多様性サンプリングと 1% フラットサンプリング) は、インデックス化されたスパンの**使用量にカウントされない**ため、**請求に影響しません**。

インテリジェント保持フィルターが保持するスパンよりも多くのスパンをインデックス化したい特定のタグや属性がある場合は、[独自の保持フィルターを作成](#create-your-own-retention-filter)してください。

#### 多様性サンプリング {#diversity-sampling}

多様性サンプリングは**サービスエントリースパン**をスキャンして、以下を 30 日間保持します。

- 環境、サービス、オペレーション、リソースの各組み合わせについて、最大 15 分ごとに少なくとも 1 つのスパン (および関連するトレース)。これにより、トラフィックの少ないエンドポイントでも、[サービス][9] と [リソース][10] のページに常にトレース例を見つけることができるようになっています。
- 環境、サービス、オペレーション、リソースの各組み合わせごとに、`p75`、`p90`、`p95` のパーセンタイルスパン (および関連するトレース) の高レイテンシースパン。
- エラーの代表的な選択。これにより、エラーの多様性を保証します (たとえば、応答ステータスコード 400、500)。

多様性サンプリングでキャプチャされたデータセットは、一様にサンプリングされていません (つまり、全トラフィックを比例的に代表していません)。エラーやレイテンシーの高いトレースに偏ります。

#### 1% フラットサンプリング {#one-percent-flat-sampling}

1% フラットサンプリングでは以下のデータがキャプチャされます。
1. トレースが取り込まれた RUM セッションの 1% に関連付けられているすべての **トレース**。これにより、インデックス化された一部のセッションに、関連するトレースデータが常に含まれるようになります。これにより [APM と RUM の相関][20] が向上し、フロントエンドセッションとバックエンドトレースの両方をまとめて確認してユーザーの問題をデバッグできるようになります。サンプルは `session_id` に基づいて適用されるため、同じ RUM セッションにリンクされているすべてのトレースは、一貫したインデックス化の決定を共有します。
2. [取り込まれたスパン][12] の **均一な 1% のサンプル**。`trace_id` に基づいて適用されるため、同じトレース内のすべてのスパンは同じサンプリング決定を共有します。このサンプルは、一般的なシステムヘルスのモニタリングと傾向分析に使用します。

このサンプリングメカニズムは均一であり、取り込まれたすべてのトラフィックを比例的に代表するものです。その結果、短い時間枠でフィルタリングすると、トラフィックの少ないサービスやエンドポイントがそのデータセットから欠落する可能性があります。

### 独自の保持フィルターの作成 {#create-your-own-retention-filter}

特定のトレースデータを 15 日間保持するカスタム保持フィルターを作成します。フィルタークエリでスパンタグや属性を使用して、ビジネスにとって最も重要なスパンを対象に設定して保持します。

たとえば、フィルターを作成し、以下の目的のためにすべてのトレースを保持することができます。

- $100 以上のクレジットカード取引: `@transaction_amount:>100`
- 本番環境で 2 秒以上かかるチェックアウト操作のスパン: `resource_name:"GET /checkout" @duration:>2s env:prod`
- オンラインのデリバリーサービスアプリケーションの特定バージョン: `service:delivery-api @version:v2.0`

保持フィルターを使用してスパンをインデックス化する場合は、次のようになります。

- **検索可能性**: インデックス化されたスパンは、Trace Explorer やダッシュボードで確認でき、15 日間にわたって監視できます。

- **可視化コンテキスト**: Trace Explorer でインデックス化されたスパンをクリックすると、他のスパンがインデックス化されているかどうかにかかわらず、常にその完全なトレースコンテキスト (すべての親スパンと子スパン) がフレームグラフまたはウォーターフォールビューで表示されます。

- **検索コンテキスト**: 完全なトレースを可視化できますが、Trace Explorer で検索できるのは、保持フィルターによって明示的にインデックス化されたスパンのみです。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="保持フィルターの作成">}}

保持フィルターを作成するには、次のようにします。
1. [[{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Retention Filters{{< /ui >}}] (保持フィルター)][18] に移動します。
1.  [{{< ui >}}Add Retention Filter{{< /ui >}}] (保持フィルターを追加) をクリックします。
1. 保持するスパンを対象とする {{< ui >}}Retention Query{{< /ui >}} を定義します。[Trace Explorer][7] でクエリを作成する場合と同様に、任意のスパンまたは属性を使用してスパンをフィルタリングします。
1. このクエリに一致するスパンのうち、インデックス化するスパンの割合を定義する {{< ui >}}Span rate{{< /ui >}} を設定します。
1. 必要に応じて、インデックス化するスパンに関連付けられている完全なトレースの割合を定義する {{< ui >}}Trace rate{{< /ui >}} を設定します。これにより、保持クエリの対象として指定されたスパンに関連付けられているトレースの他のスパンも確実にインデックス化され、インデックス化されたデータが [Trace Queries][11] でクエリで検索できるようになります。
1. フィルターの名前を設定します。
1.  [{{< ui >}}Add Filter{{< /ui >}}] (フィルターを追加) をクリックしてフィルターを保存します。

<div class="alert alert-warning">トレースレートを構成すると、インデックス化されたスパンの使用量が大幅に増加する可能性があります。</div>

たとえば、`service:my-service` からのスパンをインデックス化するように保持フィルターを構成した場合は、次のようになります。
- `50%` のスパンレートを設定すると、`service:my-service` に一致するスパンを含むトレースの約 50% が選択されます。選択されたトレースで、`service:my-service` に一致するすべてのスパンがインデックス化されます。
- `10%` のトレースレートを構成すると、スパンレートによって選択されたトレースの 10% が完全にインデックス化されます。それらのトレースで、(`service:my-service` からのスパンに限らず) トレース内のすべてのスパンがインデックス化されます。トレースに平均 100 個のスパンがあり、`service:my-service` からのスパンが 5 個あるとすると、トレースレートを構成することで、選択されたトレースの構成済みの割合に対して、トレースの残りの 95 個のスパンがインデックス化されます。
- スパンレートが最初に評価され、トレースレートはスパンレートによって選択されたトレースにのみ適用されます。

新しいフィルターを作成するか、既存のフィルターの保持率を編集すると、Datadog はグローバルインデックスボリュームの変化率の推定値を表示します。

フィルターは順序に従って保持されます。`resource:POST /hello_world` タグを持つスパンを保持するアップストリームフィルターを使用している場合、これらのスパンはアップストリームフィルターによって保持されているため、スパンを検索するダウンストリームフィルターの [{{< ui >}}Edit{{< /ui >}}] (編集) ウィンドウには表示されません。

## インデックス化されたスパンのトレース検索と分析 {#trace-search-and-analytics-on-indexed-spans}

### Trace Explorer、ダッシュボード、ノートブック内{#in-the-trace-explorer-dashboards-and-notebooks}

デフォルトでは、カスタム保持フィルター**および**インテリジェント保持フィルターによってインデックス化されたスパンは、Trace Explorer の [集計ビュー][6] (時系列、トップリスト、テーブル) の他に、ダッシュボードやノートブックのクエリにも含まれます。


`retained_by` 属性は、保持されたすべてのスパンに存在します。その値は次のとおりです:
- `retained_by:retention_filter`: スパンが[カスタム保持フィルター](#create-your-own-retention-filter) ([デフォルトの保持フィルター](#default-retention-filters)を含む) によってキャプチャされ、**トレースレートが構成されていない**場合)。これらのスパンはトレースクエリには含まれません。これは、トレースクエリでは、トレースのすべてのスパンがインデックス化されている必要があるためです。
- `retained_by:trace_retention_filter`トレースレートが構成されている保持フィルターによってスパンがキャプチャされた場合。
- `retained_by:diversity_sampling`スパンが[多様性サンプリング](#diversity-sampling) ([インテリジェント保持フィルター](#datadog-intelligent-retention-filter)の一部) によってキャプチャされた場合。
- `retained_by:flat_sampled`スパンが [1% フラットサンプリング](#one-percent-flat-sampling)によってインデックス化された場合。保持理由でさらに絞り込みます。
  - `@retention_reason:rum`: `session_id`に基づいてサンプリングされた RUM セッションにリンクされたトレース。これを使用して、ユーザーセッションと相関するトレースを分析します。
  - `@retention_reason:trace`: `trace_id`に基づいて均一にサンプリングされたトレース。これを使用して、一般的なパフォーマンスの傾向やシステム全体の分析を行います。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="[Retained By] (保持基準) ファセット" >}}

### トレース分析モニター{#in-trace-analytics-monitors}

インテリジェント保持フィルターによってインデックス化されたスパンは、APM トレース分析モニターの評価から**除外**されます。

## 参考資料 {#further-reading}

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
[16]: /ja/security/application_security/
[17]: /ja/dynamic_instrumentation/
[18]: https://app.datadoghq.com/apm/traces/retention-filters
[19]: /ja/monitors/types/apm/?tab=traceanalytics
[20]: /ja/tracing/other_telemetry/rum/