---
aliases:
- /ja/graphing/metrics/
- /ja/metrics/introduction/
- /ja/graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
- /ja/dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
  algolia:
    rank: 70
    tags:
    - submit metrics
    - metrics submission
title: メトリクス
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Custom Metrics の Foundation Enablement セッションを確認し、登録してください。訪問者数、顧客の平均バスケットサイズ、リクエストのレイテンシー、カスタムアルゴリズムのパフォーマンス分布などのアプリケーションの KPI の追跡に、Custom Metrics がどのように役立つかを学びます。
{{< /learning-center-callout >}}

ここでは、Datadog における Metrics の概要と、Metrics が役に立つ理由について説明します。このセクションには下記のトピックが含まれています。

{{< whatsnext desc="メトリクスを Datadog に送信" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Custom Metrics の送信</u> - Custom Metrics とは何かと、その送信方法について学びます。{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>OpenTelemetry Metrics の送信</u> - Datadog Agent または OpenTelemetry コレクターを設定します。{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>メトリクスタイプ</u> - Datadog に送信できるメトリクスのタイプ。{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>ディストリビューションメトリクス</u> - ディストリビューションメトリクスについて、およびグローバルに正確なパーセンタイルについて学びます。{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>メトリクスの単位</u> - メトリクスに関連付けることができる単位について学びます。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="メトリクスを視覚化し、クエリします。" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - すべてのメトリクスを調べて、分析を実行します。{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> - アクティブに報告されている Datadog のメトリクスについて理解します。{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>高度なフィルタリング</u> - データをフィルタリングして、返されるメトリクスのスコープを絞り込みます。{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>ネストされたクエリ</u> - 追加の集約レイヤーを適用して、高度なクエリ機能を利用可能にします。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Custom Metrics のボリュームとコストを理解し、管理します。" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Metrics without Limits™ を使用して、タグの設定により Custom Metrics の量を制御する方法を学びます。{{< /nextlink >}}
{{< /whatsnext >}}

## 概要 {#overview}
### メトリクスとは何か{#what-are-metrics}

メトリクスは、レイテンシーからエラー率、ユーザーのサインアップまで、環境に関するあらゆる情報を経時的に追跡できる数値です。

Datadog では、メトリクスデータは値とタイムスタンプを持つデータポイントとして収集され、格納されます。

```text
[ 17.82,  22:11:01 ]
```

一連のデータポイントが 1 つの時系列として格納されます。

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

小数点以下の秒数のタイムスタンプを持つメトリクスは、最も近い秒に丸められます。同じタイムスタンプのポイントが複数ある場合は、最新のポイントで以前のポイントが上書きされます。

### メトリクスが役に立つ理由{#why-are-metrics-useful}

メトリクスによって、システムの全体像を把握できます。メトリクスを使用することで、環境の健全性を一目で評価できます。たとえば、ユーザーによる Web サイトの読み込み速度や、サーバーの平均メモリ消費量などを可視化できます。問題を特定したら、[ログ][1] や [トレーシング][2] を使用してさらに詳しくトラブルシューティングすることができます。

システムの健全性を追跡するメトリクスは、Datadog の {{< translate key="integration_count" >}} 以上のサービスとのインテグレーションにより自動的に取得されます。自社のビジネス固有のメトリクス (Custom Metrics とも呼ばれます) を追跡することもできます。ユーザーのログイン数やユーザーのカートサイズから、チームのコードコミットの頻度まで、さまざまな事柄を追跡できます。

さらに、メトリクスを使用して、顧客からの要望に対応できるように環境の規模を調整することもできます。必要なリソース使用量を正確に把握して、費用の節約やパフォーマンスの向上に役立てることができます。

### Datadog へのメトリクスの送信 {#submitting-metrics-to-datadog}

メトリクスは、いくつかの場所から Datadog に送信できます。

- [Datadog がサポートするインテグレーション][8]: Datadog の {{< translate key="integration_count" >}}+ インテグレーションには、すぐに使用できるメトリクスが含まれています。これらのメトリクスにアクセスするには、ご利用のサービスの特定のインテグレーションページに移動し、示されているインストール手順に従ってください。たとえば、EC2 インスタンスをモニターする必要がある場合は、[Amazon EC2 インテグレーションドキュメント][9] をご覧ください。

- Datadog プラットフォーム内で直接メトリクスを生成することができます。たとえば、ログに表示されるエラーステータスコードをカウントし、Datadog に [新しいメトリクスとして保存][10] することができます。

- 多くの場合、自社のビジネスに関連するメトリクス (たとえば、ユーザーのログイン数や登録数) を追跡する必要が生じます。そのような場合は、[Custom Metrics][11] を作成できます。Custom Metrics は、[Agent][12]、[DogStatsD][13]、または [HTTP API][14] を通じて送信できます。

- さらに、[Datadog Agent][15] は、いくつかの標準メトリクス (CPU やディスク使用量など) を自動的に送信します。

すべてのメトリクス送信ソースとメソッドの概要については、[メトリクスタイプのドキュメント][16] をお読みください。

### メトリクスタイプとリアルタイムメトリクスの可視性 {#metric-types-and-real-time-metrics-visibility}

#### メトリクスタイプ {#metric-types}

Datadog は、カウント、ゲージ、レート、ヒストグラム、分布など、異なるユースケースに対応するいくつかの異なるメトリクスタイプをサポートしています。メトリクスタイプによって、アプリ内でメトリクスと共に使用できるグラフや関数が決まります。

Datadog Agent は、ユーザーがデータポイントを送信するたびに、Datadog のサーバーに個別のリクエストを送信するのではありません。そうではなく、_フラッシュ時間間隔_に収集された値を報告します。メトリクスのタイプによって、この間隔にホストから収集された値がどのように集計されて送信されるかが決まります。

[**_count_**](カウント) タイプは、時間間隔内に送信されたすべての値を加算します。これは、Web サイトのヒット数を追跡するメトリクスなどに適しています。

[**_rate_**] (レート) タイプは、count の値を取得し、それを時間間隔の長さで除算します。これは、1 秒あたりのヒット数を知りたい場合に役立ちます。

[**_gauge_**] (ゲージ) タイプは、時間間隔内に報告された最後の値を取得します。このタイプは、RAM や CPU の使用状況の追跡に適しています。この場合、最後の値を取得すれば、その時間間隔におけるホストの動作の全体像を把握できるためです。この場合、[_count_] などの別のタイプを使用すると、大抵は不正確な値や極端な値を取得することになります。正しいメトリクスタイプを選択することで、正確なデータを得ることができます。

[**_histogram_**] (ヒストグラム) は、送信された値を要約する 5 種類の値 (平均、総数、中央値、95 パーセンタイル、最大値) を報告します。これにより、5 種類の時系列が生成されます。このメトリクスタイプは、平均値を知るだけでは不十分な、レイテンシーなどのデータに適しています。histogram を使用すると、すべてのデータポイントを記録することなく、データがどのように分散しているかを理解できます。

[**_distribution_**] (分布) は histogram に似ていますが、環境のすべてのホストについて、時間間隔内に送信された値を要約します。複数のパーセンタイル (p50、p75、p90、p95、p99) を報告するよう選択することもできます。この強力な機能の詳細については、[分布のドキュメント][19] を参照してください。

各メトリクスタイプの詳細な例と送信手順については、[メトリクスタイプ][16] のドキュメントを参照してください。

## メトリクスのクエリ {#querying-metrics}

[Metrics Explorer][3]、[Dashboards][4]、または [Notebooks][5] の Datadog 全体でメトリクスを視覚化してグラフを作成できます。

**ヒント**: Datadog のグローバル検索から [Metrics Summary] ページを開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> キーを押しながら <kbd>K</kbd> キーを押して、`metrics` を検索します。

以下は、時系列を視覚化した場合の例です。

{{< img src="metrics/introduction/timeseries_example.png" alt="時系列グラフでは、レイテンシーメトリクスを 1 本の青い線で表し、いくつかのスパイクを付けて表示します。" >}}

この折れ線グラフは、x 軸の時間に対して、y 軸のユーザーが経験したレイテンシー (ミリ秒単位) をプロットします。

#### 追加の視覚化 {#additional-visualizations}

Datadog は、メトリクスを簡単にグラフ化して表示できるように、さまざまな視覚化オプションを提供しています。

メトリクスクエリは、開始時に同じ 2 つの評価ステップ、時間集計とスペース集計で構成されています。詳しくは [メトリクスクエリの構造][6] を参照してください。

{{< whatsnext desc="Metrics ユーザーの多くが役立つと感じる 2 つの視覚化方法には、次のものがあります。">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>クエリ値ウィジェット</u> - これらの 2 つのステップの結果を縮小して、1 つの値にします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>トップリスト</u> - グループごとに 1 つの値を返します。{{< /nextlink >}}
{{< /whatsnext >}}

Datadog にはほかにも、視覚化に利用できるさまざまな種類のグラフやウィジェットがあります。それらの詳細については、Datadog の [メトリクスグラフに関するブログシリーズ][7] で学ぶことができます。

グラフの作成環境は、ダッシュボード、ノートブック、モニターのいずれを使用していても同じです。グラフを作成するには、グラフエディターの UI を使用するか、生のクエリ文字列を直接変更します。クエリ文字列を編集するには、右端の `</>` ボタンを使用します。

### メトリクスクエリの構造 {#anatomy-of-a-metric-query}

Datadog のメトリクスクエリは次のようになります。

{{< img src="metrics/introduction/newanatomy.jpg" alt="セクションが色分けされているクエリの例" style="width:70%;">}}

このクエリはいくつかのステップに分けることができます。

#### メトリクス名 {#metric-name}

まず、グラフを作成する特定のメトリクスを検索して選択するか、[**Metric**] の隣にあるドロップダウンから選択します。どのメトリクスを使用すべきかわからない場合は、Metrics Explorer またはノートブックから始めます。[Metrics Summary] ページで、アクティブに報告されているメトリクスのリストを確認することもできます。

#### メトリクスのフィルタリング {#filter-your-metric}

メトリクスを選択した後、タグに基づいてクエリをフィルタリングすることができます。たとえば、`account:prod` を使用して、本番環境のホストのメトリクスのみを含めるようにクエリの_スコープ_を設定できます。詳細については、[タグ付けに関するドキュメント][17] をお読みください。

#### 時間集計の構成 {#configure-time-aggregation}

次に、時間のロールアップを使用してデータの粒度を選択します。この例では、毎時 (3600 秒) に 1 つのデータポイントがあることを定義しています。各時間バケット内でデータをどのように集計するかを選択できます。デフォルトでは _avg_ が適用されますが、その他の使用可能なオプションとして、_sum_、_min_、_max_、および _count_ があります。関数またはアプリ内モディファイアーを使用して、メトリクスデータがどのように集計およびバケット化されるのかをカスタマイズすることもできます。たとえば、max を適用し、メトリクスデータがカレンダーに沿ったクエリにより、ロールアップされて時間にバケット化される方法をカスタマイズする場合は、`.rollup(max, 60)` を使用します。詳細については、[関数][24]、[ロールアップ][23]、および [アプリ内モディファイアー][25] のドキュメントを参照してください。

#### スペース集計の構成 {#configure-space-aggregation}

Datadog では、“スペース”とは、メトリクスが異なるホストやタグにどのように分配されるかを指します。スペースで制御できる要素には、アグリゲーターとグループ化の 2 つがあります。

_アグリゲーター_は、各グループ内のメトリクスがどのように結合されるかを定義します。利用可能な集計には、sum、min、max、および avg の 4 つがあります。

_グループ化_は、グラフ上の直線の構成要素を定義します。たとえば、4 つのリージョンに数百のホストが分散している場合、リージョンごとのグループ化によって、各リージョンに 1 つの直線をグラフ化することができます。こうすると、時系列の数が 4 つに減少します。

#### 関数の適用 (任意) {#apply-functions-optional}

数学 [関数][18] を使用して、グラフの値を変更できます。これは、整数とメトリクス間の算術演算の実行を意味する場合があります (たとえば、メトリクスを 2 で乗算します)。または、2 つのメトリクス間の算術演算の実行である場合もあります (たとえば、次のようなメモリ使用率の新しい時系列の作成: `jvm.heap_memory / jvm.heap_memory_max`)。

### 時間集計とスペース集計 {#time-and-space-aggregation}

_時間集計_と_スペース集計_は、すべてのクエリで重要な 2 つのコンポーネントです。これらの集計がどのように機能するかを理解すると、グラフの誤解釈の防止に役立つため、これらの集計の概念について以下で詳しく説明します。

#### 時間集計 {#time-aggregation}

Datadog は大量のポイントを保存しており、ほとんどの場合、それらのすべてをグラフに表示することはできません。ピクセルより多くのデータポイントが存在することになります。Datadog は、時間集計を使用してデータポイントを時間バケットにまとめることで、この問題を解決します。たとえば、調べる時間が 4 時間である場合、データポイントは 2 分のバケットにまとめられます。これを_ロールアップ_と呼びます。クエリに対して定義した時間間隔が増えると、データの粒度は減少します。

各タイムバケットのデータを組み合わせるために適用できる集計には、sum、min、max、avg、および count の 5 つがあります。

クエリを実行するたびに_常に_時間集計が適用されることに注意する必要があります。

#### スペース集計 {#space-aggregation}

スペース集計は、ホスト、コンテナ、リージョンなどのタグによって単一のメトリクスを複数の時系列に分割します。たとえば、リージョンごとの EC2 インスタンスのレイテンシーを表示する場合は、スペース集計のグループ化機能を使用して各リージョンのホストを組み合わせる必要があります。

スペース集計を使用する際に適用できるアグリゲーターには、_sum_、_min_、_max_、および _avg_ の 4 つがあります。上記の例で、ホストが us-east-1、us-east-2、us-west-1、および us-west-2 の 4 つのリージョンに分散されているとします。各リージョンのホストを、アグリゲーター関数を使用して結合する必要があります。_max_ アグリゲーターを使用すると、各リージョンのすべてのホストで発生した中で最大のレイテンシーが返されます。_avg_ アグリゲーターを使用すると、リージョンごとの平均レイテンシーが返されます。

#### ネストされたクエリ {#nested-queries}
UI のネストされたクエリまたは [API][27] を使用して、時間とスペースにおける既存のクエリの結果にさらに集計のレイヤーを追加します。詳細については、[ネストされたクエリ][26] のドキュメントを参照してください。


### メトリクスに関するリアルタイム情報の表示 {#view-real-time-information-about-metrics}

[Metrics Summary ページ][20] には、過去 1 時間、1 日、または 1 週間の指定されたタイムフレームに Datadog に報告されたメトリクスのリストが表示されます。メトリクスは、メトリクス名またはタグでフィルタリングできます。

任意のメトリクス名をクリックすると、詳細情報を含むサイドパネルが表示されます。詳細サイドパネルには、特定のメトリクスに関する主な情報が表示されます。これには、メタデータ (タイプ、単位、間隔)、個別メトリクスの数、報告ホストの数、送信されたタグの数、およびメトリクスについて送信されたすべてのタグを含むテーブルが含まれます。メトリクスについてどのタグが送信されているかを確認すると、そこから報告される個別メトリクスの数がわかります。これはこの数が、タグ値の組み合わせによって決定されるためです。

**注:** Metrics Summary の詳細サイドパネルで報告される個別メトリクスの数によって、請求金額が決まることはありません。先月の使用量に対する正確な会計は、[使用量の詳細][21] を参照してください。

詳細については、[メトリクスの概要ドキュメント][22] をお読みください。

## 参考資料 {#further-reading}

{{< whatsnext desc="さらにメトリクスについて知るには、以下を確認してください。">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>高度なフィルタリング</u> - データをフィルタリングして、返されるメトリクスのスコープを絞り込みます。{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>ディストリビューションメトリクス</u> - データセット全体のグローバルパーセンタイルを計算します。{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Metrics without Limits™ を使用して、タグの設定により Custom Metrics の量を制御する方法を学びます。{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u> - インタラクティブなセッションに参加して、メトリクスの持つ力を最大限に活用します。{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>メトリクスの使用を開始する</u> - Datadog で初めてのメトリクスを送信および視覚化する方法を学びます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/logs
[2]: /ja/tracing/
[3]: /ja/metrics/explorer/
[4]: /ja/dashboards/
[5]: /ja/notebooks/
[6]: https://docs.datadoghq.com/ja/metrics/#anatomy-of-a-metric-query
[7]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[8]: /ja/integrations/
[9]: /ja/integrations/amazon_ec2/
[10]: /ja/logs/logs_to_metrics/
[11]: /ja/metrics/custom_metrics/
[12]: /ja/agent/
[13]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[14]: /ja/api/
[15]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/
[16]: /ja/metrics/types/
[17]: /ja/getting_started/tagging/using_tags/
[18]: /ja/dashboards/functions/
[19]: /ja/metrics/distributions/
[20]: https://app.datadoghq.com/metric/summary
[21]: /ja/account_management/plan_and_usage/usage_details/
[22]: /ja/metrics/summary/
[23]: /ja/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /ja/dashboards/functions/
[25]: /ja/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /ja/metrics/nested_queries
[27]: https://docs.datadoghq.com/ja/api/latest/metrics/#query-timeseries-data-across-multiple-products