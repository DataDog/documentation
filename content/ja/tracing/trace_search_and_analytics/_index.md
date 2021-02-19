---
title: トレース検索と分析
kind: ドキュメント
aliases:
  - /ja/tracing/tracing_without_limits/
  - /ja/tracing/livesearch/
description: トレース検索と分析
---
{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

## 検索と分析の概要

[トレース検索と分析][1]を使用すると、任意のスパンの任意のタグを使用して、取り込まれたかインデックス化されたすべてのスパンを検索できます。Live (過去 15 分間に取り込まれたすべてのスパン、ローリング) または Indexed Spans (カスタムフィルターにより 15 日間保存されたスパン) のどちらを検索するかによって、クエリで検索されるスパンは変化します。

- インスツルメントされたアプリケーションは、トレースの 100% を Datadog に送信します。[取り込まれ][2]たトレースは、Live トレースとして 15 分間ローリングウィンドウで使用可能になります。

Live モードの間は、Datadog アプリでタイムセレクターの横に **Live** と表示されます。

{{< img src="tracing/live_search/LiveSearch.png" alt="Live Search の表示" >}}

取り込まれたすべてのトレースには、インデックス化するスパンを決定するように作成できるカスタム[保持フィルター ][3]と、さまざまなトレースを保持するデフォルトの[インテリジェント保持フィルター][4]が使用されます。

インデックス化されると、トレースは検索と分析に使用されることが可能になり、15 日間保持されます。

[インデックス化されたスパン][5]を検索すると、Datadog アプリでタイムセレクターの横に 'Retained traces' と表示されます。

{{< img src="tracing/live_search/RetainedSearch.png" alt="保持検索の表示" >}}

[取り込みおよび保存][6]の両方で、設定をカスタマイズして最も関連性の高いデータを送信、維持することができます。

### (推奨) Tracing Without Limits を有効にする

Datadog APM が実装されたサービスごとに、きめ細かな取り込み制御を設定できます。詳しくは、[Ingestion Controls][2] のドキュメントをご参照ください。1 秒あたり最大 50 トレースを送信するサービスは、デフォルトですべてのトレースを送信します。すべてのサービスがすべてのトラフィックを送信するよう構成するには、以下の環境変数を設定します。

```
DD_TRACE_SAMPLE_RATE=1.0
```

サービスおよび取り込まれたトレースのインスツルメントが完了したら、タグベースの[保持フィルター][3]を Datadog アプリ内に設定すると、関連性の高いスパンを Datadog で保持できます。

**注:** Ingested Span および Indexed Span はどちらも請求に影響を与える場合があります。詳細は [APM 料金][7]ページを参照してください。


## 15 分間の Live Search

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Live Search を使用すると、スパンは、Datadog Agent から送信された時点で、保持フィルターによりインデックス化する前に Datadog に表示されます。取り込まれたすべてのスパンは、15 分間利用可能になります（ローリングウィンドウ）。Datadog によって取り込まれたすべてのスパンはサンプリングなしで表示されます（これが Tracing without Limits™ です）。

{{< img src="tracing/live_search/LiveSearch.mp4" alt="Live Search" video="true" >}}

APM Live Search では、以下を実行できます。

- すべてのタグの `version_id` でフィルタリングすることで、新しいデプロイがスムーズに行われたかを監視。
- 取り込まれたトレースの 100% を検索して、問題のある子スパンに関連付けられた特定の `org_id` または `customer_id` を見つけ、機能停止に関する情報をリアルタイムで確認。
- `process_id` を入力して新しいプロセス ID が子スパンのタグとして自動入力されるかどうかを確認し、プロセスが適切に開始されたことをチェック。
- 子リソースの持続時間でフィルタリングし、エンドポイントでの負荷テストやパフォーマンスへの影響を監視。
- トレースパネルビューから、直接スパンやタグに対する検索クエリをワンクリックで実行できます。
- スパンタグから列を追加、削除、並び替えてビューをカスタマイズできます。

1 秒間に受け取ったスパンの数がトレーステーブルの上部に表示されます。1 秒間に数千のスパンのストリームを受け取るような場合は、人間の目では確認できないため、スループットが高いスパンストリームは確認しやすいようにスパンを表示しますが、すべてのスパンは検索可能です。Live Search のクエリバーフィルター機能を使用して、スパンストリームを絞り込んだり、画面右上の **Pause/Play** ボタンを使用して、ストリームを一時停止または再開したりできます。

{{< img src="tracing/live_search/PausePlaystream.png" alt="ライブストリームを一時停止/再開" >}}

Live Search は Traces ページのデフォルトのビューです。保持済みトレースを表示している場合は、時間範囲セレクターで **LIVE** オプションを選択して、過去 15 分間のトレースの Live Search を使用するよう切り替えることができます。

**注**: スパンを選択すると、ストリームが一時停止し、そのスパンの詳細がトレース側のパネルに表示されます。

### トレースストリームと検索クエリの絞り込み
{{< img src="tracing/live_search/toplevelspan2.gif" alt="Live Search クエリ" >}}

検索バーに有効なクエリを入力すると、**すべてのスパン**にわたり検索条件に一致するトレースが表示されます。Live Search ビューの検索構文は他のトレースビューのものと同じですが、クエリはインデックス化されたトレースだけでなく、任意のスパンとタグで収集されたすべてのトレースと照合されます。

**注**: トレーステーブル上部のチェックボックスを使用して、`top-level spans of the service` のみを選択することができます。この機能を高トラフィックのアプリケーションで使用して、表示されるスパンの数を減らし、サービスのエントリーポイントスパンのみを表示することができます。このボックスを選択しても、表示されるスパンを_視覚的に_フィルタリングするだけです。それらはすべてまだ存在しています。

ファセットとして定義されていない属性でも絞り込むことができます。たとえば、`customer.id` 属性で絞り込むには、以下の 2 つの方法があります。

- トレースパネルで属性をクリックし、検索クエリに追加します。
{{< img src="tracing/live_search/LiveSearchQuery1.png" alt="Live Search フィルター" >}}


- 検索クエリバーに "customer.id" と入力して、すべてのスパンを `customer.id` 属性で絞り込みます。
{{< img src="tracing/live_search/LiveSearchQuery3.png" alt="Live Search フィルター" >}}

## 15 日間保持のトレース検索

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

保持中のトレースは、Live Search と同じ方法で検索できます。ライブ検索から保持中のデータに切り替えるには、タイムセレクターを 15 分を超える期間に変更します。

保持フィルターまたは App Analytics のレガシーフィルターによりインデックス化されたすべてのスパンは、検索からアクセス可能です。これらのスパンは、保持フィルターによりインデックス化された後 15 日間 Datadog で保持されます。

**注:** 2020 年 10 月 20 日現在、App Analytics に代わり Tracing without Limits が、よりフレキシブルにトレースを 100% 取り込み、ビジネスに最も重要なものを保持する方法として使用されています。

{{< img src="tracing/live_search/HistoricalSearch2.gif" alt="Historical Search" >}}


たとえば、保持フィルターによりインデックス化されていないスパンにのみ表示されるタグでフィルタリングした場合、検索結果は返されませんが、Live Search を使用すると返されます。

保持されるスパンと保持率をカスタマイズできます。デフォルトでは、[Datadog Intelligent Retention][4] が適用されます。デフォルトのスパン保持フィルターの詳細と独自の追加フィルターの作成方法については、[保持フィルター][3]のドキュメントを参照してください。独自のフィルターを作成または変更するには、Datadog アプリの [Retention Filters][8] ページにアクセスしてください。

## 15分間の Live Analytics

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Live Analytics では、取り込まれたトレースの 100% について、スパンにタグを使用してフィルタリングおよびグループ化しながら 15 分間分析を行うことができます。スパンは、Datadog Agent から送信された時点で、保持フィルターによりインデックス化する前に Datadog に表示されます。に Datadog に表示されます。取り込まれたすべてのスパンは、15 分間利用可能になります（ローリングウィンドウ）。Datadog によって取り込まれたすべてのスパンはサンプリングなしで表示されます（これが Tracing without Limits™ です）。

{{< img src="tracing/live_search/LiveAnalytics.mp4" alt="Live Analytics" video="true" >}}

Analytics は、特定の条件に一致するリクエストまたはエラーをグラフ化するために使用されます。例:

- カートの金額が少なくとも `$100` の `ShoppingCart##checkout` サービスやエンドポイントのエラー、という基準に一致するトレースに直接ドリルダウンできます 。

- アプリケーションの重要なアップデートのカナリアデプロイをリアルタイムで監視。

- iOS アプリケーションの最新バージョンの、指定地域間のレイテンシーを比較。

Live Analytics では、クエリに一致するリクエストの分析が表示されるだけでなく、停止または調査中に最も影響を受けた顧客、アベイラビリティーゾーン、またはその他のタグの上位リストも確認できます。

Live Analytics を使用すると、15 分のローリングウィンドウで取り込まれたすべてのスパンのすべてのタグをクエリに使用できます。

**注:** 保持済みのスパンを使用した場合のみ、ダッシュボードとモニターへのエクスポートが可能です。

## 15 日間保持のトレース分析

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Retained Analytics は、Live Analytics と同じページから利用できます。分析に使用するデータを、ライブデータから保持済みデータに切り替えるには、タイムセレクターを 15 分を超える期間に変更します。その後、ライブフィードではなく、選択された固定期間に基づくデータが使用されるようになります。

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Historical Analytics" >}}

保持フィルターまたは App Analytics のレガシーフィルターによりインデックス化されたすべてのスパンは、トレース分析に使用する際に検索可能です。これらのスパンは、保持フィルターによりインデックス化された後 15 日間 Datadog で保持されます。

**注:** 2020 年 10 月 20 日現在、App Analytics に代わり Tracing without Limits が、よりフレキシブルにトレースを 100% 取り込み、ビジネスに最も重要なものを保持する方法として使用されています。

保持されるスパンと保持率をカスタマイズできます。デフォルトでは、[Datadog Intelligent Retention][4] が適用され、エラーおよびレイテンシーの多様性や、低スループットのリソースを含むトレースを自動的に保持します。デフォルトのスパン保持フィルターの詳細と独自の追加フィルターの作成方法については、[保持フィルター][3]のドキュメントを参照してください。独自のフィルターを作成または変更するには、Datadog アプリの [Retention Filters][8] ページにアクセスしてください。

[1]: https://app.datadoghq.com/apm/traces
[2]: /ja/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: /ja/tracing/trace_retention_and_ingestion/#retention-filters
[4]: /ja/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
[5]: /ja/tracing/visualization/#indexed-span
[6]: /ja/tracing/trace_retention_and_ingestion/
[7]: /ja/account_management/billing/apm_distributed_tracing/
[8]: https://app.datadoghq.com/apm/traces/retention-filters