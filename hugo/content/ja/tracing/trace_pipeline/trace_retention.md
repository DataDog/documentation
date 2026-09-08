---
aliases:
- /ja/tracing/trace_retention/
- /ja/tracing/trace_queries/one_percent_flat_sampling/
description: 保持フィルターを使用してトレース保持を制御する方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: ブログ
  text: 保持フィルターを使用してフロントエンドとバックエンドのデータを統合し、関連付けます。
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: ドキュメント
  text: 取り込みメカニズム
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: ドキュメント
  text: 取り込み制御
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用状況メトリクス
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: ラーニングセンター
  text: APM レート制限と保持
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: アーキテクチャセンター
  text: '分散トレーシングの習得: データ量の課題、Datadog の効率的なサンプリングへのアプローチ'
title: トレース保持
---
{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="保持フィルター" >}}

Datadog APM では、[トレースの取り込みと 15 日間の保持][1] を完全にカスタマイズできます。

取り込まれたデータとインデックス化されたデータの量を確認または監視するには、[使用状況メトリクス][2] のドキュメントを参照してください。

## 保持フィルター {#retention-filters}

スパンが取り込まれた後、アカウントに設定された保持フィルターに従って一部のスパンが 15 日間保持されます。
1. **[インテリジェント保持フィルター](#datadog-intelligent-retention-filter)**は、すべての環境、サービス、オペレーション、リソースについて、異なるレイテンシー分布ごとにスパンを保持します。
2. いくつかの**[デフォルト保持フィルター](#default-retention-filters)**が作成されており、すべてのサービスとエンドポイント、さらにエラーや高レイテンシーのトレースに対する可視性を確実に維持できます。
3. 任意の数の追加の**[カスタム保持フィルター](#create-your-own-retention-filter)**をサービスに対して作成し、スパン属性やタグフィルターに基づいて、ビジネスにとって最も重要なトレースを取得できます。

**注**: 保持フィルターを作成、削除、変更、有効化、または無効化するには、`apm_retention_filter_write` 権限が必要です。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="保持フィルターページ" >}}

Datadog の [保持フィルター][3] 設定ページでは、すべての保持フィルターを一覧表示できます。

フィルター名
: スパンのインデックス化に使用される各保持フィルターの名前。

フィルタークエリ
: 各フィルターのタグベースのクエリ。

保持率
: 一致するスパンのうち、インデックス化される割合 (0〜100%)。保持されるスパンは、フィルタークエリに一致するスパンの中から均一に選択されます。

インデックス化されたスパン
: 選択した期間中にフィルターによってインデックス化されたスパンの数。

最終更新日
: 保持フィルターを最後に変更した日付とユーザー。

有効化トグル
: フィルターのオン/オフを切り替えることができます。

**注**: 保持フィルター一覧の順序は、インデックス化動作に影響します。スパンが保持フィルター一覧の上位に一致した場合、そのスパンは保持されるか、破棄されます。保持フィルター一覧の下位にある一致するカスタム保持フィルターは、すでに処理されたスパンをキャッチしません。

各保持フィルターの `Spans Indexed` 列は、`datadog.estimated_usage.apm.indexed_spans` メトリクスによって提供されており、これを使用してインデックス化されたスパンの使用状況を追跡できます。詳細については、[使用状況メトリクス][2] をお読みいただくか、アカウントで利用可能な [すぐに使える使用状況ダッシュボード][4] をご覧ください。

<div class="alert alert-info">保持フィルターは、Agent によって収集されて Datadog に送信 (「インジェスト」) されるトレースには影響しません。取り込みを制御するには、専用の<a href="/tracing/trace_pipeline/ingestion_controls/">取り込み制御</a>を使用します。</div>


### 保持フィルターの種類 {#retention-filter-types}

保持フィルターには 2 つのタイプがあります。

1. **スパンレベルの保持フィルター** - フィルター条件に一致する特定のスパンのみをインデックス化します。
2. **トレースレベルの保持フィルター** - フィルター条件に一致するスパンを含むトレース全体をインデックス化し、Trace Queries で完全なトレースを検索できるようにします。

| 機能 | 標準の保持フィルター | トレースレベルの保持フィルター|
| ------- | ------------------------- | ----------------------------- |
| **構成** | スパンクエリ + スパン保持率 | スパンクエリ + スパン保持率 + トレース保持率 |
| **インデックス対象** | クエリで指定されたスパンのみ | クエリに一致するスパンを含むトレースに属するすべてのスパン |
| **クエリ可能な場所** | スパンエクスプローラー | スパンエクスプローラーおよびトレースクエリ |

**注**: トレースレベルの保持フィルターによって保持される間接的にインデックス化されたスパン (つまり、クエリには直接一致しないが、一致するトレースに属するスパン) は、[トレース分析モニター][19] では評価されません。

### デフォルトの保持フィルター {#default-retention-filters}

以下の保持フィルターがデフォルトで有効になっています。
- `Error Default`保持フィルターは、`status:error` でエラーのスパンをインデックス化します。保持率とクエリは構成可能です。たとえば、本番環境のエラーをキャプチャするには、クエリを `status:error, env:production` に設定します。エラーをデフォルトでキャプチャしたくない場合は、保持フィルターを無効にします。
- [App and API Protection][16] を使用している場合、`App and API Protection Default` 保持フィルターが有効になっています。これにより、アプリケーションセキュリティへの影響 (攻撃の試み) があると特定されたトレース内のすべてのスパンが確実に保持されます。
- Synthetic Monitoring を使用している場合、`Synthetics Default` 保持フィルターが有効になっています。これにより、Synthetic API テストやブラウザテストから生成されたトレースがデフォルトで利用可能な状態に保たれます。トレースと Synthetic テストを関連付ける方法など、詳細については [Synthetic APM][15] を参照してください。
- [Dynamic Instrumentation][17] を使用している場合、`Dynamic Instrumentation Default` 保持フィルターが有効になっています。これにより、Dynamic Instrumentation で動的に作成されたスパンがデフォルトで長期的に利用可能な状態に保たれます。

### Datadog インテリジェント保持フィルター {#datadog-intelligent-retention-filter}

Datadog インテリジェント保持フィルターは利用中のサービスに対して常にアクティブであり、数十ものカスタム保持フィルターを作成することなく代表的なトレースの選択を保持します。これは以下で構成されています。
- [多様性サンプリング](#diversity-sampling)
- [1% のフラットサンプリング](#one-percent-flat-sampling)

**注:** [トレースクエリ][11] は、インテリジェント保持フィルターによってインデックス化されたデータに基づいています。

インテリジェント保持フィルター (多様性サンプリングおよび 1% のフラットサンプリング) によってインデックス化されたスパンは、インデックス化されたスパンの**使用量としてカウントされず**、**請求額に影響しません**。

インテリジェント保持フィルターが保持する以上のスパンを特定のタグや属性に対してインデックス化したい場合は、[独自の保持フィルターを作成](#create-your-own-retention-filter)します。

#### 多様性サンプリング {#diversity-sampling}

多様性サンプリングは**サービスエントリスパン**をスキャンし、以下を 30 日間保持します。

- 環境、サービス、オペレーション、リソースの各組み合わせについて、最大 15 分ごとに少なくとも 1 つのスパン (および関連するトレース) を保持します。これにより、トラフィックが少ないエンドポイントであっても、[サービス][9] ページや [リソース][10] ページで常にトレースの例を見つけることができます。
- 環境、サービス、オペレーション、リソースの各組み合わせにおける、`p75`、`p90`、および `p95` パーセンタイルの高レイテンシースパン (および関連するトレース)。
- エラーの多様性を確保するための代表的なエラーの選択 (例: レスポンスステータスコード 400 番台、500 番台)。

多様性サンプリングによってキャプチャされたデータセットは、均一にサンプリングされたものではありません (つまり、全トラフィックを比例的に代表するものではありません)。エラーや高レイテンシートレースに偏ったデータとなっています。

#### 1% のフラットサンプリング {#one-percent-flat-sampling}

フラット 1% サンプリングは以下をキャプチャします。
1. トレースが取り込まれた RUM セッションの 1% と相関するすべての**トレース**。これにより、インデックス化された一部のセッションに必ず関連するトレースデータが存在するようになります。これにより [APM と RUM の相関][20] が向上し、フロントエンドセッションとバックエンドトレースの両方を一緒に表示することで、ユーザーの問題をデバッグできるようになります。サンプルは `session_id` に基づいて適用されるため、同じ RUM セッションにリンクされているすべてのトレースは、一貫したインデックス化の決定を共有します。
2. [取り込まれたスパン][12] の**均一な 1% サンプル**は、`trace_id` に基づいて適用されるため、同じトレース内のすべてのスパンが同じサンプリング決定を共有します。このサンプルを一般的なシステムヘルスモニタリングおよび傾向分析に使用します。

このサンプリングメカニズムは均一であり、取り込まれた全トラフィックを比例的に代表しています。その結果、短い時間枠でフィルタリングすると、トラフィックの少ないサービスやエンドポイントがそのデータセットから欠落する可能性があります。

### 独自の保持フィルターを作成する {#create-your-own-retention-filter}

特定のトレースデータを 15 日間保持するためのカスタム保持フィルターを作成します。フィルタークエリでスパンタグや属性を使用して、ビジネスにとって最も重要なスパンをターゲットにし、保持します。

たとえば、以下のようなすべてのトレースを保持するフィルターを作成できます。

- 100 ドルを超えるクレジットカード取引: `@transaction_amount:>100`
- 本番環境で 2 秒を超える期間のチェックアウト操作スパン: `resource_name:"GET /checkout" @duration:>2s env:prod`
- オンラインデリバリーサービスアプリケーションの特定のバージョン: `service:delivery-api @version:v2.0`

保持フィルターを使用してスパンをインデックス化すると、以下のようになります。

- **検索可能性**: インデックス化されたスパンは、Trace Explorer やダッシュボードで検索でき、15 日間監視されます。

- **可視化コンテキスト**: Trace Explorer でインデックス化されたスパンをクリックすると、他のスパンがインデックス化されていたかどうかにかかわらず、常にその完全なトレースコンテキスト (すべての親スパンと子スパン) をフレームグラフまたはウォーターフォールビューで確認できます。

- **検索コンテキスト**: 完全なトレースを可視化することはできますが、Trace Explorer で検索できるのは保持フィルターによって明示的にインデックス化されたスパンのみです。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="保持フィルターを作成する">}}

保持フィルターを作成するには、以下の手順に従います。
1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}][18] に移動します。
1. {{< ui >}}Add Retention Filter{{< /ui >}} をクリックします。
1. 保持したいスパンをターゲットにするための {{< ui >}}Retention Query{{< /ui >}} 定義します。[Trace Explorer][7] でクエリを作成する場合と同様、任意のスパンまたは属性を使用してスパンをフィルタリングします。
1. このクエリに一致するスパンのうち、インデックス化する割合を定義する {{< ui >}}Span rate{{< /ui >}} を設定します。
1. オプションで {{< ui >}}Trace rate{{< /ui >}} を設定して、インデックス化するスパンに関連付けられた完全なトレースの割合を定義します。これにより、保持クエリによってターゲットにされたスパンに関連付けられたトレースの他のスパンも確実にインデックス化され、インデックス化されたデータが [トレースクエリ][11] でクエリ可能になります。
1. フィルターの名前を設定します。
1. {{< ui >}}Add Filter{{< /ui >}} をクリックして保持フィルターを保存します。

<div class="alert alert-warning">トレース率を構成すると、インデックス化されるスパンの使用量が大幅に増加する可能性があります。</div>

たとえば、`service:my-service` からのスパンをインデックス化するように保持フィルターを設定した場合:
- `50%` のスパン率を構成すると、`service:my-service` に一致するスパンを含むトレースの約 50% が選択されるようにする上で役立ちます。選択されたトレースについては、`service:my-service` に一致するすべてのスパンがインデックス化されます。
- `10%` のトレース率を構成すると、スパン率によって選択されたトレースのうち 10% が完全にインデックス化されるようにする上で役立ちます。それらのトレースについては、トレース内の (`service:my-service` からのものだけでなく) すべてのスパンがインデックス化されます。トレースの平均スパン数が 100 で、`service:my-service` からのスパンが 5 つあると仮定すると、トレース率を構成することで、選択されたトレースの構成された割合に対してトレースの残りの 95 のスパンがインデックス化されます。
- スパン率が最初に評価され、トレース率はスパン率によって選択されたトレースにのみ適用されます。

新しいフィルターを作成する場合や既存のフィルターの保持率を編集する場合、Datadog はグローバルインデックス化ボリュームの推定変化率を表示します。

フィルターはシリアル順に保持されます。`resource:POST /hello_world` タグを持つスパンを保持するアップストリームフィルターがある場合、同じタグを持つスパンを検索するダウンストリームフィルターの {{< ui >}}Edit{{< /ui >}} ウィンドウにはそれらのスパンは表示されません。なぜなら、それらはアップストリームフィルターによって保持されているからです。

## インデックス化されたスパンのトレース検索と分析 {#trace-search-and-analytics-on-indexed-spans}

### Trace Explorer、ダッシュボード、およびノートブック内 {#in-the-trace-explorer-dashboards-and-notebooks}

デフォルトでは、カスタム保持フィルター**および**インテリジェント保持フィルターによってインデックス化されたスパンは、トレースエクスプローラーの [集計ビュー][6] (時系列、トップリスト、テーブル) のほか、ダッシュボードやノートブックのクエリにも含まれます。


`retained_by` 属性は、保持されたすべてのスパンに存在します。その値は次のとおりです。
- `retained_by:retention_filter`[カスタム保持フィルター](#create-your-own-retention-filter)によってスパンがキャプチャされた場合 ([デフォルトの保持フィルター](#default-retention-filters)を含み、**トレースレートなし**が構成されていた場合)。これらのスパンはトレースクエリには含まれません。トレースクエリでは、トレースのすべてのスパンがインデックス化されている必要があるためです。
- `retained_by:trace_retention_filter`トレースレートが設定された保持フィルターによってスパンがキャプチャされた場合。
- `retained_by:diversity_sampling`[多様性サンプリング](#diversity-sampling) ([インテリジェント保持フィルター](#datadog-intelligent-retention-filter)の一部) によってスパンがキャプチャされた場合。
- `retained_by:flat_sampled`[1% フラットサンプリング](#one-percent-flat-sampling)によってスパンがインデックス化された場合。保持理由でさらに絞り込みます。
  - `@retention_reason:rum` `session_id` に基づいてサンプリングされた RUM セッションにリンクされたトレース。これを使用して、ユーザーセッションと相関するトレースを分析します。
  - `@retention_reason:trace` `trace_id` に基づいて均一にサンプリングされたトレース。これを使用して、一般的なパフォーマンスの傾向とシステム全体の分析を行います。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="ファセットによる保持" >}}

### トレース分析モニター内 {#in-trace-analytics-monitors}

インテリジェント保持フィルターによってインデックス化されたスパンは、APM トレース分析モニターの評価から**除外**されます。

## 関連資料{#further-reading}

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