---
title: Tracing Without Limits
kind: ドキュメント
description: "Live Analytics、取り込みルール、保持フィルターのベータ版ドキュメント。"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

## Tracing Without Limits 概要

{{< alert >}}
Live Analytics、取り込みルール、カスタム保持フィルターのベータ版を使用している場合は、<a href="https://docs.datadoghq.com/tracing/guide/trace_sampling_and_storage/?tab=java#trace-sampling">トレースサンプリングガイド</a>の代わりにこちらの手順を使用してください。
</div>

[トレース検索と分析][1]を使用すると、任意のスパンの任意のタグを使用して、取り込まれたかインデックス化されたすべてのスパンを検索できます。Live (過去 15 分間、ローリング) モードまたは Historical (すべてのインデックス化されたスパン) モードのどちらを使用しているかに応じて、クエリの実行に使用されるデータは変化します。

Live データはすべての[取り込まれたスパン](#ingestion-controls)で、過去 15 分間に対してリアルタイムで利用できます。また、Datadog UI には、Live モードのときはいつでも、タイムセレクターの横に 'Live' インジケーターが表示されます。Historical データはすべての[インデックス化されたスパン](#indexing-controls)です。 [取り込みとインデックス化](#ingestion-and-indexing-overview)はどちらも設定をカスタマイズできます。

気になるスパンを正確に送信して保持します。インデックス化されたスパンには、Datadog 内で完全に表示できるように、関連するトレース全体が自動的に保持されます。


### Live Search モード

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Live Search モードでは、スパンは、Datadog Agent から送信された時点で、Datadog がインデックス化する前に Datadog に表示されます。スパンを利用できるのは 15 分間です。Datadog によって取り込まれたすべてのスパンはサンプリングなしで表示されます（Tracing without Limits\*）。APM の Live Search では以下のことができます。

- 検索クエリを記述し、任意のスパンの任意のタグでトレースのストリームを絞り込みます。たとえば、すべてのタグの `version_id` でフィルタリングすることで、新しいデプロイがスムーズに行われたかを監視します。
- トレーススパンが取り込まれる度に 100% 表示されます。たとえば、子スパンに関連付けられた特定の `org_id` または `customer_id` に関連して発生するシステム中断に関する情報をリアルタイムに確認できます。収集されたスパンには 15 分間サンプリングが行われないことに注意してください。
- リアルタイムでオートコンプリートする検索クエリを実行します。たとえば、プロセスが正常に開始されたかをチェックするには、子スパンタグの `process_id` を入力すると、ID を自動補完します。
- RED のキーメトリクス（秒ごとのリクエスト、エラー、レイテンシ）をライブの時系列可視化機能で確認します。たとえば、子リソースの持続時間でフィルタリングし、エンドポイントでの負荷テストやパフォーマンスへの影響を監視します。
- トレースパネルビューから、直接スパンやタグに対する検索クエリをワンクリックで実行できます。
- スパンタグから列を追加、削除、並び替えてビューをカスタマイズできます。

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

1 秒間に受け取ったスパンの数とサンプリングレートがトレーステーブルの上部に表示されます。1 秒間に数千のスパンのストリームを受け取るような場合は、人間の目では確認できないため、スループットが高いスパンストリームは確認しやすいようにサンプリングされますが、検索は可能です。Live Search のクエリバーフィルター機能を使用して、スパンストリームを絞り込んだり、画面右上の **Pause/Play** ボタンを使用して、ストリームを一時停止または再開したりできます。

Live Search モードは Traces ページのデフォルトのビューで、履歴モードになっている場合は、時間範囲セレクターで **LIVE** オプションを選択して、過去 15 分間の Live Search モードに切り替えることができます。

**注**: スパンを選択すると、ストリームが一時停止し、そのスパンの詳細がトレース側のパネルに表示されます。

### トレースストリームと検索クエリの絞り込み
{{< img src="tracing/live_search/toplevespan.gif" alt="Live Search クエリ" >}}

検索バーに有効なクエリを入力すると、**すべてのスパン**にわたり検索条件に一致するトレースが表示されます。Live Search ビューの検索構文は他のトレースビューのものと同じですが、クエリはインデックス化されたトレースだけでなく、任意のスパンとタグで収集されたすべてのトレースと照合されます。

**注**: トレーステーブル上部のチェックボックスをオンにすることで、`top-level spans of the service` のみの選択ができます。この機能を高トラフィックのアプリケーションで使用して、表示されるスパンの数を減らし、サービスのエントリーポイントスパンのみを表示することができます。このボックスを選択しても、表示されるスパンを_視覚的に_フィルタリングするだけです。それらはすべてまだ存在しています。

ファセットとして定義されていない属性でも絞り込むことができます。たとえば、`customer.id` 属性で絞り込むには、以下の 2 つの方法があります。

- トレースパネルで属性をクリックし、検索クエリ `@customer.id:584959` に追加します。
{{< img src="tracing/live_search/livesearch_query2.png" alt="Live Search フィルター" >}}


- 検索クエリバー、`@customer.id:584959` に "customer.id" と入力して、すべてのスパンを `customer.id` 属性で絞り込みます。
{{< img src="tracing/live_search/livesearch_query1.png" alt="Live Search フィルター" >}}

### Historical Search モード

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Historical Search モードには、Live Search モードと同じ方法でアクセスします。Live モードから Historical モードに切り替えるには、タイムセレクターを 15 分を超える期間に変更します。これにより、検索されるデータが Live Search モードからインデックス化されたスパンに変更されます。

Historical Search モードでは、検索されるデータは、インデックス化されたスパンと、少なくとも 1 つのインデックス化されたスパンを持つトレースのルートスパンです。これらのスパンは、インデックス化されてから 15 日間 Datadog によって保持されます。

{{< img src="tracing/live_search/livesearch_mode.gif" alt="Live Search モード" >}}

**注:** インデックス化されたスパンに関連付けられたフレームグラフを表示すると、関連付けられたトレース全体が常に表示されますが、Historical Search モードではインデックス化されたスパンのみが検索可能です。

たとえば、インデックス化されていないスパンにのみ表示されるタグでフィルタリングした場合、検索結果は返されません。

インデックス化されるスパンと保持率をカスタマイズできます。デフォルトでは、[Datadog Intelligent Sampling](#datadog-intelligent-sampling-filter) を適用して、インデックス化するスパンを決定します。これは、Historical クエリを実行するデータです。デフォルトのスパン保持フィルターの詳細と独自の追加フィルターの作成方法については、このページの[インデックス化](#indexing-controls)セクション、または Datadog の [Span Indexing][2] ページにアクセスしてください。

### Live Analytics モード

<div class="alert alert-warning">
これらの機能は現在非公開ベータ版です。<a href="https://forms.gle/1FParyX49eNFPDsg9">フォームに記入</a>して、ベータ版への追加をリクエストしてください。
</div>

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Live Analytics モードでは、過去 15 分間に取り込まれたトレースの 100% で分析を実行できます。分析は、カートの金額が少なくとも `$100` の `ShoppingCart##checkout` サービスやエンドポイントのエラーなど、指定された基準に対応するリクエストまたはエラーをグラフ化するために使用されます。これらの基準に一致するトレースに直接ドリルダウンできます 。

Live Analytics は、任意のクエリに一致するリクエストの分析を表示するだけでなく、停止または調査中に最も影響を受けた顧客、アベイラビリティーゾーン、またはその他のタグの上位リストを提供することもできます。

Live Analytics を使用すると、15 分のローリングウィンドウで取り込まれたすべてのスパンのすべてのタグをクエリに使用できます。

{{< img src="tracing/live_search/LiveAnalytics2.gif" alt="Live Analytics" >}}

**注:** ダッシュボードとモニターへのエクスポートは、Historical モードでのみ可能です。

### Historical Analytics モード

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Historical Analytics モードには、Live Analytics モードと同じ方法でアクセスします。Live Analytics から Historical Analytics に切り替えるには、タイムセレクターを 15 分を超える期間に変更します。これにより、検索されるデータがインデックス化されたスパンに変更され、データはライブフィードではなくなります。

インデックス化されたスパンが少なくとも 1 つあるトレースのルートスパンはインデックス化されます。つまり、ルートスパンまたはインデックス化された子スパンでタグを検索できます。これらのスパンは、インデックス化された後 15 日間 Datadog によって保持されます。

**注:** インデックス化されたスパンに関連付けられたフレームグラフを表示すると、関連付けられたトレース全体が常に表示されますが、インデックス化されたスパンのみが検索可能です。

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Historical Analytics" >}}

**注:** Historical Analytics モードで検索できるのは、インデックス化されたスパンのみです。

インデックス化されるスパンと保持率をカスタマイズできます。デフォルトでは、Datadog Intelligent Sampling を適用して、インデックス化するスパンを決定します。これは、Historical クエリを実行するデータです。デフォルトのスパン保持フィルターの詳細と独自の追加フィルターの作成方法については、[インデックス化][3] ページにアクセスしてください。

## 取り込みとインデックス化の概要

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Tracing without Limits™ を使用すると、Datadog へのトレースの取り込みとそのトレースの 15 日間のインデックス化の両方を完全にカスタマイズできます。

<div class="alert alert-warning">
これらの機能は現在ベータ版です。ベータ版への追加については、<a href="https://docs.datadoghq.com/help/">サポートにご連絡ください</a>。
{{< /alert >}}

### Ingestion Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Ingestion Controls は、アプリケーションから Datadog に送信される内容に影響します。

#### スパンの取り込み

{{< img src="tracing/trace_indexing_and_ingestion/DataIngestion2.png" style="width:100%;" alt="データの取り込み" >}}

多くのインスツルメントされたサービスは、デフォルトでトラフィックの 100% を Datadog に送信します。ボリュームが大きいサービスまたは断続的なトラフィックが発生するサービスは、デフォルトでスパンの 100% を送信しない可能性が高くなります。

**注:** Ingestion Rate の数値が 100% 未満の場合は、Agent 6.19 以降または 7.19 以降を使用していることを確認してください。これらのバージョンではデフォルトの率が高くなっています。

Datadog アプリの ['Data Ingestion' ビュー][4]で、次の情報を確認できます。

| 列                | Data |
| ----------------------- | ---------- |
| サービス                 | インスツルメントされた、Datadog にトレースを送信する各サービスの名前。   |
| Data Ingested             | 選択した期間中に Datadog によって取り込まれたデータの量。      |
| Ingestion Rate                 | サービスによって生成されたスパンのうち、Datadog が取り込んでいるスパンの割合 (0〜100%)。数値が 100% 未満の場合、取り込み前に Datadog Agent でサンプリングが行われていることを意味します。      |
| ステータス             | アプリ内の指示を使用してトレーサーを構成することで変更しない限り、`Default` が表示されます。詳細については、[デフォルトの取り込み率の変更](#change-the-default-ingestion-rate)を参照してください。    |
| Requests per second                 |   選択した期間中にサービスが受信した 1 秒あたりの平均リクエスト数。断続的なトラフィックが発生する、またはボリュームが大きいサービスでは、デフォルトでスパンの 100% を送信しない可能性が高くなります。    |
| Spans Ingested            | 選択した期間中に Datadog によって取り込まれたスパンの数。        |

#### デフォルトの取り込み率の変更

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate2.gif" style="width:100%;" alt="データ取り込み率を変更する" >}}

サービスのトラフィックの特定の割合を送信するように指定するには、そのサービスのトレーサー構成に生成されたコードスニペットを追加します。

1. 取り込まれたスパンのパーセントを変更するサービスを選択します。
2. サービス言語を選択します。
3. 必要な取り込み率を選択します。
4. これらの選択から生成された適切なコンフィギュレーションを、示されたサービスに適用し、再デプロイします。
5. Data Ingestion ページで、新しい割合が適用されたことを確認します。

### Indexing Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Indexing Controls は、Datadog が 15 日間保存する内容に影響します。

#### Retention Filters

スパンが Datadog によって取り込まれた後、アカウントに設定されているインデックスフィルターに従って、スパンは 15 日間保持されます。デフォルトでは、サービスごとに有効になっている唯一の保持フィルターは [Intelligent Sampling Filter](#datadog-intelligent-sampling-filter) で、エラートレースとさまざまなレイテンシー分布からのトレースを保持します。

また、サービスに追加の[タグベースの保持フィルター](#create-your-own-filter)をいくつでも作成できます。

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing2.png" style="width:100%;" alt="Span Indexing" >}}

| 列                | Data |
| ----------------------- | ---------- |
| Filter Name                | スパンのインデックス化に使用される各フィルターの名前。デフォルトでは、唯一のフィルターは [Datadog Intelligent Sampling](#datadog-intelligent-sampling-filter) です。   |
| Filter Query             | 各フィルターのタグベースのクエリ。      |
| Retention Rate                | Datadog によってインデックス化される一致するスパンの数の割合 (0〜100%)。 |
| Spans Indexed             | 選択した期間中にフィルターによってインデックス化されたスパンの数。   |
| Enabled トグル                 |  フィルターのオンとオフを切り替えることができます。  |

#### Datadog Intelligent Sampling Filter

Intelligent Sampling は常にサービスに対してアクティブで、アプリケーションの健全性を監視するのに役立つさまざまなトレースを保持します。

Intelligent Sampling は以下を保持します。

 - エラー多様性を含むエラー (応答コード 400、500 など)。
 - さまざまな四分位数 `p75`、`p90`、`p95` の高レイテンシー。
 - 任意のトラフィックを持つすべてのリソースには、任意のタイムウィンドウ選択の過去のトレースが関連付けられます。
 - 各タイムウィンドウの真の最大期間トレース。

#### 独自のフィルターを作成する

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

インデックス化され、15 日間保持されるスパンをカスタマイズするには、タグに基づいて追加のフィルターを作成、変更、無効化し、保持する各フィルターに一致するスパンの割合を設定します。保持されているスパンには、対応するトレースも保存され、表示すると、完全なトレースコンテキストを利用できます。ただし、[Historical Search と Analytics][3] でタグで検索するには、関連するタグを含むスパンがインデックス化されている必要があります。

1. フィルターに名前を付けます。
2. ALL に一致するスパンをインデックス化する関連タグを設定します。
3. インデックス化するこれらのタグに一致するスパンの割合を設定します。
4. 新しいフィルターを保存します。

## 使用量メトリクスの概要


APM とインデックス化の使用量を監視しているときに、数値が予想と一致しない場合、または取り込み率またはインデックス化率を変更する場合は、[インデックス化](#indexing-controls)または[取り込み](#ingestion-controls)のドキュメントを参照してください。

### 使用量ダッシュボード
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="インデックス化されたスパンダッシュボード" >}}

Datadog には、APM の使用量と、取り込まれ、インデックス化されたスパンを監視するための、すぐに使用できる[使用量ダッシュボード][3]が用意されています。

カスタムダッシュボードまたはモニターを作成するために使用する主要なメトリクスは次のとおりです。

 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

### インデックス化されたスパン

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing2.png" style="width:100%;" alt="スパンのインデックス化" >}}

デフォルトの [Datadog Intelligent Sampling Filter](#datadog-intelligent-sampling-filter) を含む、サービスに設定された各保持フィルターにより、Datadog アカウントのインデックス化されたスパンの数は_増加_します。

インデックス化されたスパンは請求に影響を与える可能性があるため、設定されている各フィルターの横に ‘Spans Indexed’ 列が表示され、そのフィルターに選択されたタイムフレームに基づいてインデックス化されたスパン数の値が示されます。

**注:** Datadog Intelligent Sampling Filter 自体では、APM Host の料金に含まれるインデックス化されたスパン以外に追加で請求が発生することはありません。

**注:** スパンインデックスフィルターを作成、変更、または無効にするには、管理者権限が必要です。


[1]: https://app.datadoghq.com/apm/traces
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: https://app.datadoghq.com/apm/traces/data-ingestion
