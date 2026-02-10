---
title: スパンとトレースからカスタムメトリクスを生成する
description: '取り込まれたスパンと完全なトレースからカスタムメトリクスを生成する。'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'トレースの取り込みをカスタマイズし、重要なトレースを保持する'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: '保持されたトレースに基づいて分析クエリとモニターを使用する'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: '特定のトレースからメトリクスを作成するために高度なトレースクエリを使用する'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'トレースメトリクスを使用してアプリケーショントラフィックの100%を監視する'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Terraformを使用してスパンベースのメトリクスを作成および管理する'
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="スパンベースのメトリクス" >}}

取り込まれたスパンからカスタムメトリクスを生成してトレンドを追跡し、ダッシュボードを強化し、モニターをトリガーします。これは、完全なトレース分析のために保持されていないスパンやトレースでも可能です。

カスタムメトリクスは、Datadog APMによって取り込まれたスパンから作成され、[保持フィルター][1]がそれらのスパンをインデックスするかどうかに関係なく生成されます。スパン（カウント、期間、またはカスタムタグなど）またはトレース（エンドツーエンドのトレース期間）から数値を抽出し、15か月の保持期間を持つ長期的な[カスタムメトリクス][3]として保存します。

**ノート:**
\- Datadogは、アプリケーショントラフィックの100%に対してリクエストカウント、エラーレート、レイテンシ分布をキャプチャする[トレースメトリクス][13]を自動的に生成します。
\- カスタムメトリクス生成のために利用可能なスパンは、[APM取り込み制御設定][12]に依存します。サンプリングやフィルタリングからドロップされたスパンはメトリクスを生成できません。


スパンからカスタムメトリクスを使用する目的：
\- スパンレベルのレイテンシ、エラーレート、またはタグレベルのパフォーマンスに対する詳細な可視性
\- 低レイテンシ、高解像度のメトリクスを使用して[異常][4]または[予測][7]モニターを強化する。
\- 完全なスパンを保持せずにトレンドやアラートのための重要な信号を抽出する。

#### トレースからカスタムメトリクスを使用するタイミング

Datadogは、[トレースクエリ][15]からメトリクスを生成することを許可します。

{{< callout url="https://help.datadoghq.com/hc/ja/requests/new" header="プレビューへのアクセスをリクエスト！" >}}
トレースからのカスタムメトリクスはプレビュー中です。アクセスをリクエストするには、APMサポートチームにチケットを提出し、使用ケースの簡単な説明を提供してください。
{{< /callout >}}

トレースからのカスタムメトリクスを使用する目的：
\- 完全なトレースコンテキストから派生したメトリクス、例えば、トレースの合計時間やトレースごとの操作数。
\- 完全なトレースの知識を必要とする条件に基づくアラート（例えば、N+1クエリ検出やファンアウトパターン）。
\- 完全なトレースを保持せずにトレンドやアラートのための重要な信号を抽出する。

## スパンまたはトレースからメトリクスを作成する

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="メトリクスの作成方法" >}}

1. [**APM** > **メトリクスを生成**][14]に移動します。
2. **新しいメトリクス**をクリックします。
3. [メトリクス命名規則][11]に従ってメトリクスに名前を付けます。`trace.*`で始まるメトリクス名は許可されていません。
4. メトリクスタイプを選択してください：**スパン**または**トレース**。どちらもAPM検索および分析と同じ[クエリ構文][10]を使用します。
5. メトリクスクエリを定義して、測定したいスパンまたはトレースのみをフィルタリングして含めます。
6. 集計する値を選択してください：
     - `*`を選択して、すべての一致するスパンまたはトレースをカウントします。
     - 集計してカウント、最小、最大、合計、またはパーセンタイルを追跡するために、数値属性（例えば、`@cassandra_row_count`）を入力してください。
7. グルーピング次元を設定します。デフォルトでは、メトリクスにはタグがありません。追加しない限り。任意のスパン属性またはタグを使用してメトリクスタグを作成します。
8. 結果をプレビューして、データビジュアライゼーションを通じてクエリのリアルタイムの影響を確認し、ライブプレビューで一致するスパンまたはトレースを表示します。
9. **メトリクスを作成するにはクリックしてください。

<div class="alert alert-danger"> スパンベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>と見なされ、適切に請求されます。請求に影響を与えないように、タイムスタンプ、ユーザーID、リクエストID、またはセッションIDのような無制限または非常に高いカーディナリティ属性でのグルーピングを避けてください。</div>


## 既存のメトリクスを更新します。

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="既存のメトリクスを編集" >}}

メトリクスが作成された後、更新できるフィールドは2つだけです：

| フィールド                                | 理由                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| ストリームフィルタークエリ                | メトリクスに集計される一致するスパンのセットを変更します。                                                         |
| 集計グループ                             | 生成されたメトリクスのカーディナリティを管理するためにタグを更新します。                                                         |

**注意**：メトリクスタイプまたは名前を変更するには、新しいメトリクスを作成し、古いものを削除します。


## データの可用性

トレースから生成されたメトリクスは、トレースが完了した後に発信されます。長時間実行されるトレースの場合、遅延はそれに応じて増加します（例えば、45分のトレースのメトリクスは、トレースの完了まで発信できません）。

モニターのトレースからカスタムメトリクスを使用する際は、偽陽性を避けるためにこのレイテンシを考慮してください。

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_pipeline/trace_retention
[2]: /account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/metrics/#overview
[4]: /monitors/types/anomaly/#overview
[5]: /tracing/trace_explorer/
[6]: /tracing/trace_explorer/query_syntax/#analytics-query
[7]: /monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /tracing/trace_explorer/query_syntax/
[11]: /metrics/#naming-metrics
[12]: /tracing/trace_pipeline/ingestion_controls
[13]: /tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /tracing/trace_explorer/trace_queries
