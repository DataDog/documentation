---
aliases:
- /ja/tracing/tracing_without_limits/
- /ja/tracing/livesearch/
- /ja/tracing/trace_search_and_analytics/
description: Trace Explorer
further_reading:
- link: tracing/trace_explorer/search
  tag: ドキュメント
  text: スパンを検索する
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: ラーニングセンター
  text: APM メトリクスとトレースの概要
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: ラーニングセンター
  text: Datadog APM を使用してアプリケーションのバグを診断する
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## 概要 {#overview}

[Trace Explorer][1] を使用すると、任意のスパンの任意のタグを使用して、取り込まれたスパンやインデックス化されたスパンのすべてを検索できます。クエリによって見つかるスパンは、Live Search を使用するか (過去 15 分間に取り込まれたすべてのスパン、ローリング)、インデックス化されたスパンを検索するか (カスタムフィルターにより 15 日間保持されるスパン) によって変わります。

インスツルメントされたアプリケーションは、構成された [Ingestion Control][2] に基づいて Datadog にトレースを送信します。取り込まれたトレースは、15 分間のローリングウィンドウの Live トレースとして利用できます。

Trace Explorer には、Live モードのときは常に **Live Search - All ingested data** (Live Search - 取り込まれたすべてのデータ) というインジケーターが表示されます。

{{< img src="tracing/trace_explorer/live_search.png" alt="Live Search インジケーター" style="width:75%;" >}}

取り込まれたトレースはすべて次の処理を受けます。
- インデックス化するスパンを決定するために作成できる[カスタム保持フィルター][3]。カスタム保持フィルターでインデックス化すると、トレースは **15 日間**保持されます。
- 多様なトレースを保持するデフォルトの[インテリジェント保持フィルター][4]。インテリジェント保持フィルターでインデックス化すると、トレースは **30 日間**保持されます。

Trace Explorer には、[インデックス化されたスパン][5]の検索時は常に **Search - Only Indexed Data** (検索 - インデックス化されたデータのみ) というインジケーターが表示されます。

{{< img src="tracing/trace_explorer/historical_search.png" alt="Only Indexed Data インジケーター" style="width:75%;" >}}

Live Search は、[Traces] (トレース) ページのデフォルトビューです。Live Search から Indexed Data Search に切り替えるには、右上のタイムセレクターを使用します。

### Trace Patterns {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="プレビューに参加しましょう!" >}}
Trace Patterns はプレビュー中です。このフォームからリクエストを送信してください。
{{< /callout >}}

Trace Patterns は、構造や属性が似ているスパンを反復パターンにグループ化して、数千のトレースを、個別に読まずに一括して動作を分析できるようにします。クエリで返されるスパンが、トレースごとにスキャンするには多すぎる場合に使用できます (今週の新しいエラー形状や、デプロイ後に変化したレイテンシーパターンを見つける場合など)。

### トレースボリュームコントロール {#trace-volume-control}

[取り込みおよび保持][6]の両方で、設定をカスタマイズして最も関連性の高いデータを送信、維持することができます。

#### 取り込み {#ingestion}

[Datadog Agent の構成オプション][7]でグローバルにボリュームを制御したり、Datadog APM でインスツルメンテーションされたサービスごとに正確な[取り込みルール][8]を設定することができます。


#### インデックス化 {#indexing}

サービスをインスツルメントし、トレースを取り込んだら、タグベースの[保持フィルター][3]を Datadog アプリ内に設定すると、関連性の高いスパンを Datadog で保持できます。

**注:** 取り込まれたスパンおよびインデックス化されたスパンはどちらも請求に影響を与える場合があります。詳細は [APM 料金][9]を参照してください。

## 15 分間の Live Search {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

Live Search を使用すると、Datadog Agent によって送信されたスパンが、保持フィルターによってインデックス化される前に、即座に表示されます。取り込まれたすべてのスパンは、15 分間利用可能になり (ローリングウィンドウ)、サンプリングなしで表示されます。

{{< tabs >}}
{{% tab "リストビュー" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search リストビュー" video="true" >}}

**リストビュー**では、以下のことが可能です。

- すべてのタグの `version_id` でフィルタリングすることで、新しいデプロイがスムーズに行われたかを監視。
- 取り込まれたトレースの 100% を検索して、問題のある子スパンに関連付けられた特定の `org_id` または `customer_id` を見つけ、機能停止に関する情報をリアルタイムで確認。
- `process_id` を入力して新しいプロセス ID が子スパンのタグとして自動入力されるかどうかを確認し、プロセスが適切に開始されたことをチェック。
- 子リソースの持続時間でフィルタリングし、エンドポイントでの負荷テストやパフォーマンスへの影響を監視。
- トレースパネルビューから直接、スパンやタグに対する検索クエリをワンクリックで実行。
- スパンタグの列の追加、削除、並べ替えによりビューをカスタマイズ。

1 秒間に受け取ったスパンの数がトレーステーブルの上部に表示されます。1 秒間に数千のスパンのストリームを受け取るような場合は、人間の目では確認できないため、スループットが高いスパンストリームは確認しやすいように一部のスパンを表示します。利用可能なすべてのスパンを検索クエリで検索できます。Live Search クエリバーのフィルター機能を使用してスパンストリームを絞り込んだり、画面右上の [**Pause/Play**] (一時停止/再開) ボタンを使用してストリームを一時停止または再開したりできます。

{{< img src="tracing/live_search/play-pause-button.png" alt="ライブストリームを一時停止/再開" style="width:75%;" >}}

**注**: スパンを選択すると、ストリームが一時停止し、そのスパンの詳細がトレースサイドパネルに表示されます。

{{% /tab %}}
{{% tab "時系列ビュー" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search 時系列ビュー" video="true" >}}

スパンをリストではなく時系列で可視化するには**時系列ビュー**を使用します。Live Search の時系列ビューは、次のような特定の条件に対応するリクエストやエラーをグラフ化するのに便利です。

- カートの金額が少なくとも `$100` の `ShoppingCart##checkout` サービスやエンドポイントのエラー。これらの条件に一致するトレースを個別に表示できます。

- アプリケーションの重要なアップデートのカナリアデプロイをリアルタイムで監視。

- iOS アプリケーションの最新バージョンにおける地域ごとのレイテンシーを比較。

クエリに一致するリクエストの時系列が表示されるだけでなく、ダウンタイムまたは調査中に最も影響を受けた顧客、アベイラビリティーゾーン、またはその他のタグの上位リストとしてスパンを可視化することもできます。

**注:** 保持済みのスパンを使用した場合のみ、ダッシュボードとモニターへのエクスポートが可能です。

{{% /tab %}}
{{< /tabs >}}

### フィルタリング {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="すべてのスパンを検索する" video="true" >}}

検索バーに有効なクエリを入力すると、検索条件に一致するトレースが**すべてのスパン**にわたって表示されます。Live Search ビューの検索構文は他のトレースビューのものと同じですが、クエリはインデックス化されたトレースだけでなく、**任意のスパン**と**任意のタグ**で収集されたすべてのトレースと照合されます。

トレーステーブルの上のボックスで選択を変更することにより、[サービスエントリスパン][10]、[ルートスパン][11]、またはすべてのスパンをクエリすることが可能です。トラフィックの多いアプリケーションでこの機能を使用すると、表示されるスパンの数を減らして、サービスのエントリポイントのスパンのみを表示したり、トレースのエントリポイントのみを表示したりできます。このボックスを選択すると、リストに表示されるスパンのみがフィルターされます。スパンをクリックしてトレースの詳細を表示すると、他のスパンもフレームグラフに表示されます。

ファセットとして定義されていない属性でも絞り込むことができます。たとえば、`cart.value` 属性で絞り込むには、以下の 2 つの方法があります。

- トレース詳細パネルで `cart.value` 属性をクリックし、検索クエリに追加します。
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="クエリに属性を追加する" video="true" >}}

- 検索クエリバーに "cart.value" と入力して、すべてのスパンを `cart.value` 属性で絞り込みます。
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Live Search の属性による絞り込み" video="true" >}}

### 統合インサイトによる異常の分析 {#analyzing-anomalies-with-integrated-insights}

Trace Explorer は、自動化された Watchdog の外れ値検出とタグ分析を組み合わせて、問題の根本原因の迅速な特定を支援します。エラーや高レイテンシースパンで統計的に過剰に代表されているタグを Watchdog が検出すると、それらのインサイトが複数の場所に反映されます。

- **検索候補**: 検索バーへの入力時に、外れ値のタグが候補として、エラーやレイテンシーの問題と相関していることを示すインジケーターと共に表示されます。
- **グループ化の推奨事項**: グループ化する属性を選択する際に、外れ値のファセットが強調表示されて調査を支援します。
- **ファセットサイドバー**: 外れ値のタグが、ファセットリストの最上部で専用の "OUTLIERS" セクションに表示されます。
- **RED メトリクス**: 関連する外れ値が検出されると、エラーとレイテンシーのグラフの横にある [Analyze] (分析) ボタンが強調表示されます。

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="統合インサイトによる異常の分析" video="true" >}}

## 15 日間保持のインデックス化されたスパンの検索 {#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="インデックス検索" >}}

保持されたトレースは、Live Search と同様に検索できます。ライブデータの検索から保持データの検索に切り替えるには、タイムセレクターを 15 分以上の任意の期間に変更します。保持フィルターによってインデックス化されたすべてのスパンに検索からアクセスできます。これらのスパンは、保持フィルターによってインデックス化された後、Datadog によって 15 日間保持されます。

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="保持されたトレースの検索" video="true" >}}

{{< tabs >}}
{{% tab "リストビュー" %}}

カスタム保持フィルター*と*インテリジェント保持フィルターでインデックス化されたすべてのスパンは、リストビューで検索可能です。ただし、どの保持フィルターにもインデックス化されていないスパンにのみ表示されるタグでフィルタリングすると、[Live Search](#live-search-for-15-minutes) の場合と異なり、検索結果は何も返されません。

{{% /tab %}}
{{% tab "時系列ビュー" %}}

カスタム保持フィルターまたはインテリジェント保持フィルターによりインデックス化されたスパンはすべて、トレース分析を使用する際に検索可能です。

時系列ビューから、クエリを[ダッシュボード][1]、[モニター][2]、[ノートブック][3]にエクスポートして、さらに詳しく調査したり、スパンの集計数が特定のしきい値を超えたときに自動的にアラートを出したりすることが可能です。

**注**: インテリジェント保持フィルターによってインデックス化されたスパンは、APM トレース分析モニターの評価から除外されます。詳細については、[トレースの保持][4]を参照してください。

[1]: /ja/dashboards/widgets/timeseries/
[2]: /ja/monitors/types/apm/?tab=analytics
[3]: /ja/notebooks
[4]: /ja/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### 保持構成 {#retention-configuration}

保持されるスパンと保持率をカスタマイズできます。デフォルトでは、[Datadog インテリジェント保持フィルター][4]が適用され、エラーおよびレイテンシーの多様性や、低スループットのリソースを含むトレースが自動的に保持されます。デフォルトのインテリジェント保持フィルターの詳細と独自の追加フィルターの作成方法については、[保持フィルターのドキュメント][3]を参照してください。独自のフィルターを作成または変更するには、Datadog アプリの[保持フィルターのページ][12]にアクセスしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /ja/tracing/trace_pipeline/ingestion_controls
[3]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /ja/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /ja/tracing/glossary/#indexed-span
[6]: /ja/tracing/trace_pipeline/
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /ja/account_management/billing/apm_distributed_tracing/
[10]: /ja/glossary/#service-entry-span
[11]: /ja/glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters