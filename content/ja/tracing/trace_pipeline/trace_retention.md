---
aliases:
- /ja/tracing/trace_retention/
description: 保持フィルターでトレース保持を制御する方法について説明します。
further_reading:
- link: /tracing/trace_ingestion/mechanisms
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_ingestion/ingestion_controls/
  tag: ドキュメント
  text: Ingestion Controls
- link: /tracing/trace_retention/usage_metrics/
  tag: ドキュメント
  text: 使用量メトリクス
kind: documentation
title: トレースの保持
---

{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="保持フィルター" >}}

APM を使用すると、トレースの[取り込み][1]とそのトレースの 15 日間の**保存**の両方を完全にカスタマイズできます。

取り込まれたデータとインデックス化されたデータの量を追跡または監視するには、[使用量メトリクス][2]のドキュメントを参照してください。

## Retention Filters

スパンが Datadog に取り込まれた後、アカウントに設定された保持フィルターに従って、一部は 15 日間保持されます。

デフォルトでは、アカウントに対して 2 つの保持フィルターが有効になっています。
- `Error Default` 保持フィルターは `status:error` を持つエラースパンをインデックス化します。保持率とクエリは構成することができます。例えば、本番環境のエラーを取得するには、クエリを `status:error, env:production` に設定します。デフォルトでエラーを捕捉したくない場合は、保持フィルターを無効にしてください。
- [インテリジェント保持フィルター](#datadog-intelligent-retention-filter)は、多様なエラートレースや異なるレイテンシー分布のトレースを保持することができます。

また、サービスに追加の[タグベースの保持フィルター](#create-your-own-retention-filter)をいくつでも作成できます。

**注**: 保持フィルターを作成、変更、または無効にするには、管理者権限が必要です。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_page.png" style="width:100%;" alt="保持フィルターページ" >}}

Datadog では、[Retention Filters タブ][3]で、すべての保持フィルターのリストを見ることができます。

Filter Name
: スパンをインデックス化するために使用される各フィルターの名前。

Filter Query
: 各フィルターのタグベースのクエリ。

Retention Rate
: インデックス化される一致するスパンの数の割合 (0〜100%)。

Spans Indexed
: 選択した期間中にフィルターによってインデックス化されたスパンの数。

Last Updated
: 最後に保持フィルターを変更したユーザーとその日付。

Enabled toggle
: フィルターのオンとオフを切り替えることができます。

保持フィルターリストの順序は、インデックスの動作を変更します。スパンがリストの早い段階で保持フィルタに一致した場合、そのスパンは保持されるか削除されるかのどちらかです。リストの下位にある一致する保持フィルターは、すでに処理されたスパンを捕らえません。

各保持フィルターの `Spans Indexed` 列は、 `datadog.estimated_usage.apm.indexed_spans` メトリクスによって提供され、これを使用してインデックス化されたスパンの使用量を追跡することが可能です。詳細については、[使用量メトリクス][2]を読むか、アカウントで利用できる[ダッシュボード][4]を参照してください。

<div class="alert alert-info"><strong>注</strong>: 保持フィルターは、Agent によって収集され、Datadog に送信される (「取り込まれる」) トレースには影響しません。取り込まれるトレースデータの量を変更する唯一の方法は、<a href="/tracing/trace_ingestion/mechanisms">取り込みコントロール</a>を使用することです。</div>

### Datadog インテリジェント保持フィルター

インテリジェント保持フィルターは、サービスに対して常にアクティブであり、アプリケーションの健全性を監視するのに役立つトレースの割合を保持します。すべての[サービスエントリスパン][5]は、インテリジェント保持フィルターによって保持されるトレースに対してインデックス化されます。

30 日間にわたり、Intelligent Retention は以下を保持します。

 - エラーの代表的な選択であり、エラーの多様性を保証します (たとえば、応答コード 400、500)。
 - `p75`、`p90`、`p95` パーセンタイルでレイテンシーが高い。
 - 任意のタイムウィンドウ選択の過去のトレースが関連付けられている任意のトラフィックを持つすべてのリソース。
 - 各タイムウィンドウの真の最大期間トレース。

**注**: インテリジェント保持はスパンをランダムではなく意図的に選択するため、インテリジェントフィルターによってのみ保持されるスパンは、[トレースエクスプローラー時系列ビュー][6]には**含まれません**。集計されたビュー (時系列、トップリスト、テーブル) は、[カスタム保持フィルター](#create-your-own-retention-filter)によって保持されたスパンのみ利用可能です。

インテリジェント保持フィルターによってインデックス化されたスパンは、インデックス化されたスパンの**使用量にカウントされない**ため、**請求に影響を与えません**。

インテリジェント保持が保持するスパンよりも多く保持したい特定のタグや属性がある場合、[独自の保持フィルターを作成する](#create-your-own-retention-filter)ことで、保持できます。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_ingestion
[2]: /ja/tracing/trace_retention/usage_metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /ja/tracing/visualization/#service-entry-span
[6]: /ja/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /ja/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /ja/tracing/visualization/#trace-root-span