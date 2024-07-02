---
title: Trace Explorer
aliases:
    - /tracing/tracing_without_limits/
    - /tracing/livesearch/
    - /tracing/trace_search_and_analytics/
description: "Trace Explorer"
further_reading:
- link: tracing/trace_explorer/search
  tag: Documentation
  text: Search Spans
---

{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースエクスプローラー" >}}

## 概要

[トレースエクスプローラー][1]を使用すると、任意のスパンの任意のタグを使用して、取り込まれたかインデックス化されたすべてのスパンを検索できます。Live (過去 15 分間に取り込まれたすべてのスパン、ローリング) またはインデックス化されたスパン (カスタムフィルターにより 15 日間保存されたスパン) のどちらを検索するかによって、クエリで発見されるスパンは変化します。

インスツルメントされたアプリケーションは、トレースの 100% を Datadog に送信します。[取り込まれ][2]たトレースは、Live トレースとして 15 分間ローリングウィンドウで使用可能になります。

トレースエクスプローラーには、Live モードの時は常に **Live Search - All ingested data** のインジケータが表示されます。

{{< img src="tracing/trace_explorer/live_search.png" alt="Live Search の表示" style="width:75%;" >}}

そして、取り込まれたトレースはすべて以下を通過させます。
- インデックス化するスパンを決定するために作成できる[カスタム保持フィルター][3]。カスタム保持フィルターでインデックス化すると、トレースは **15 日間**保持されます。
- 多様なトレースを保持するデフォルトの[インテリジェント保持フィルター][4]。インテリジェント保持フィルターでインデックス化すると、トレースは **30 日間**保持されます。

トレースエクスプローラーには、[インデックス化されたスパン][5]の検索時は常に **Search - Only Indexed Data** インジケータが表示されます。

{{< img src="tracing/trace_explorer/historical_search.png" alt="Only Indexed Data の表示" style="width:75%;" >}}

Live Search は、トレースページのデフォルトの表示です。Live Search から Indexed Data Search に切り替えるには、右上のタイムセレクターを使用します。

### トレースボリュームコントロール

[取り込みおよび保持][6]の両方で、設定をカスタマイズして最も関連性の高いデータを送信、維持することができます。

#### 取り込み

[Datadog Agent の構成オプション][7]でグローバルにボリュームを制御したり、Datadog APM でインスツルメンテーションされたサービスごとに正確な[取り込みルール][8]を設定することができます。


#### インデックス化

サービスをインスツルメントし、トレースを取り込んだら、タグベースの[保持フィルター][3]を Datadog アプリ内に設定すると、関連性の高いスパンを Datadog で保持できます。

**注:** 取り込まれたスパンおよびインデックス化されたスパンはどちらも請求に影響を与える場合があります。詳細は [APM 料金][9]を参照してください。

## 15 分間の Live Search

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ライブ検索" >}}

Live Search を使用すると、スパンは、Datadog Agent から送信された時点で、保持フィルターによりインデックス化する前に Datadog に表示されます。取り込まれたすべてのスパンは、15 分間利用可能になり（ローリングウィンドウ）、サンプリングなしで表示されます。

{{< tabs >}}
{{% tab "リスト表示" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search リスト表示" video="true" >}}

**List view** では、以下のことが可能です。

- すべてのタグの `version_id` でフィルタリングすることで、新しいデプロイがスムーズに行われたかを監視。
- 取り込まれたトレースの 100% を検索して、問題のある子スパンに関連付けられた特定の `org_id` または `customer_id` を見つけ、機能停止に関する情報をリアルタイムで確認。
- `process_id` を入力して新しいプロセス ID が子スパンのタグとして自動入力されるかどうかを確認し、プロセスが適切に開始されたことをチェック。
- 子リソースの持続時間でフィルタリングし、エンドポイントでの負荷テストやパフォーマンスへの影響を監視。
- トレースパネルビューから、直接スパンやタグに対する検索クエリをワンクリックで実行できます。
- スパンタグから列を追加、削除、並び替えてビューをカスタマイズできます。

1 秒間に受け取ったスパンの数がトレーステーブルの上部に表示されます。1 秒間に数千のスパンのストリームを受け取るような場合は、人間の目では確認できないため、スループットが高いスパンストリームは確認しやすいように一部のスパンを表示します。検索クエリで利用可能なすべてのスパンを検索することができます。Live Search のクエリバーフィルター機能を使用して、スパンストリームを絞り込んだり、画面右上の **Pause/Play** ボタンを使用して、ストリームを一時停止または再開したりできます。

{{< img src="tracing/live_search/play-pause-button.png" alt="ライブストリームを一時停止/再開" style="width:75%;" >}}

**注**: スパンを選択すると、ストリームが一時停止し、そのスパンの詳細がトレース側のパネルに表示されます。

{{% /tab %}}
{{% tab "時系列表示" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search 時系列表示" video="true" >}}

スパンをリストではなく時系列で可視化する **Timeseries view** を使用します。Live Search の時系列表示は、次のような指定された条件に対応するリクエストやエラーをグラフ化するのに便利です。

- カートの金額が少なくとも `$100` の `ShoppingCart##checkout` サービスやエンドポイントのエラー、という基準に個々に一致するトレースを表示することができます 。

- アプリケーションの重要なアップデートのカナリアデプロイをリアルタイムで監視。

- iOS アプリケーションの最新バージョンの、指定地域間のレイテンシーを比較。

クエリに一致するリクエストの時系列が表示されるだけでなく、停止または調査中に最も影響を受けた顧客、アベイラビリティーゾーン、またはその他のタグの上位リストとしてスパンを可視化することもできます。

**注:** 保持済みのスパンを使用した場合のみ、ダッシュボードとモニターへのエクスポートが可能です。

{{% /tab %}}
{{< /tabs >}}

### フィルタリング

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="すべてのスパンを検索する" video="true" >}}

検索バーに有効なクエリを入力すると、**すべてのスパン**にわたり検索条件に一致するトレースが表示されます。Live Search ビューの検索構文は他のトレースビューのものと同じですが、クエリはインデックス化されたトレースだけでなく、**任意のスパン**と**任意のタグ**で収集されたすべてのトレースと照合されます。

トレーステーブルの上のボックスに選択を変更することで、[サービスエントリスパン][10]、[ルートスパン][11]、またはすべてのスパンをクエリすることが可能です。トラフィックの多いアプリケーションでこの機能を使用すると、表示されるスパンの数を減らし、サービスのエントリポイントのスパンまたはトレースのエントリポイントのみを表示することができます。このボックスを選択すると、リストに表示されるスパンのみがフィルターされます。スパンをクリックしてトレースの詳細を表示しても、他のスパンはフレームグラフに表示されます。

ファセットとして定義されていない属性でも絞り込むことができます。たとえば、`cart.value` 属性で絞り込むには、以下の 2 つの方法があります。

- トレース詳細パネルで `cart.value` 属性をクリックし、検索クエリに追加します。
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="クエリに属性を追加する" video="true" >}}

- 検索クエリバーに "cart.value" と入力して、すべてのスパンを `cart.value` 属性で絞り込みます。
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Live Search の属性による絞り込み" video="true" >}}

## 15 日間保持のインデックス化されたスパンの検索

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="インデックス検索" >}}

Live Search と同じように、保持されたトレースを検索することができます。ライブデータ検索から保持データ検索に切り替えるには、タイムセレクターを 15 分以上の任意の期間に変更します。保持フィルターによってインデックス化されたすべてのスパンは、検索からアクセスできます。これらのスパンは、保持フィルターによってインデックス化された後、Datadog によって 15 日間保持されます。

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="保持されたトレースを検索する" video="true" >}}

{{< tabs >}}
{{% tab "リスト表示" %}}

カスタム保持フィルターとインテリジェント保持フィルターでインデックス化されたすべてのスパンは、リスト表示で検索することが可能です。ただし、どの保持フィルターにもインデックス化されていないスパンにのみ表示されるタグでフィルタリングすると、[Live Search](#live-search-for-15-minutes) の場合と異なり、検索結果は何も返されません。

{{% /tab %}}
{{% tab "時系列表示" %}}

All spans indexed by custom retention filters or the intelligent retention filter are available to be searched when using trace analytics.

From the timeseries view, export your query to a [dashboard][1], [monitor][2], or [notebook][3] to investigate further or to alert automatically when an aggregate number of spans crosses a specific threshold. 

**Note**: Spans indexed by the intelligent retention filter are excluded from APM queries that appear in dashboards, notebooks, and from trace analytics monitor evaluations. For more information, see [Trace Retention][4].

[1]: /dashboards/widgets/timeseries/
[2]: /monitors/types/apm/?tab=analytics
[3]: /notebooks
[4]: /tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### 保持構成

保持されるスパンと保持率をカスタマイズできます。デフォルトでは、[Datadog インテリジェント保持フィルター][4]が適用され、エラーおよびレイテンシーの多様性や、低スループットのリソースを含むトレースを自動的に保持します。デフォルトのインテリジェント保持フィルターの詳細と独自の追加フィルターの作成方法については、[保持フィルターのドキュメント][3]を参照してください。独自のフィルターを作成または変更するには、Datadog アプリの[保持フィルターのページ][12]にアクセスしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/trace_pipeline/ingestion_controls
[3]: /tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /tracing/glossary/#indexed-span
[6]: /tracing/trace_pipeline/
[7]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /account_management/billing/apm_distributed_tracing/
[10]: /glossary/#service-entry-span
[11]: /glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters
