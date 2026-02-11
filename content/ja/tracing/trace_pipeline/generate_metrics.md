---
aliases:
- /ja/tracing/span_to_metrics/
- /ja/tracing/generate_metrics/
description: 取り込まれたスパンと完全なトレースからカスタムメトリクスを生成する。
further_reading:
- link: tracing/trace_pipeline
  tag: Documentation
  text: トレースの取り込みをカスタマイズし、重要なトレースを保持する
- link: tracing/trace_search_and_analytics/query_syntax
  tag: Documentation
  text: 保持されたトレースに基づいて分析クエリとモニターを使用する
- link: tracing/trace_explorer/trace_queries
  tag: Documentation
  text: 特定のトレースからメトリクスを作成するために高度なトレースクエリを使用する
- link: tracing/metrics/metrics_namespace
  tag: Documentation
  text: トレースメトリクスを使用してアプリケーショントラフィックの100%を監視する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric
  tag: External Site
  text: Terraformを使用してスパンベースのメトリクスを作成および管理する
title: スパンとトレースからカスタムメトリクスを生成する
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Span-based metrics" >}}

取り込まれたスパンからカスタムメトリクスを生成してトレンドを追跡し、ダッシュボードを強化し、モニターをトリガーする—完全なトレース分析のために保持されていないスパンやトレースでも。

カスタムメトリクスは、Datadog APMによって取り込まれたスパンから作成され、[保持フィルター][1]がそれらのスパンをインデックスするかどうかに関係なく生成されます。スパン（カウント、期間、またはカスタムタグなど）またはトレース（エンドツーエンドのトレース期間）から数値を抽出し、15か月の保持期間を持つ長期的な[カスタムメトリクス][3]として保存します。

**ノート:**
- Datadogは、アプリケーショントラフィックの100%に対してリクエストカウント、エラーレート、レイテンシ分布をキャプチャする[トレースメトリクス][13]を自動的に生成します。
- カスタムメトリクス生成のために利用可能なスパンは、[APM取り込み制御設定][12]に依存します。サンプリングやフィルタリングからドロップされたスパンはメトリクスを生成できません。


スパンからカスタムメトリクスを使用する目的：
- スパンレベルのレイテンシ、エラーレート、またはタグレベルのパフォーマンスに対する詳細な可視性
- 低レイテンシ、高解像度のメトリクスを使用して[異常][4]または[予測][7]モニターを強化する。
- フルスパンを保持せずにトレンドやアラートのための重要な信号を抽出する。

#### トレースからカスタムメトリクスを使用するタイミング

Datadogは、[トレースクエリ][15]からメトリクスを生成することを許可します。

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="Request access to the Preview!" >}}
トレースからのカスタムメトリクスはプレビュー中です。アクセスをリクエストするには、APMサポートチームにチケットを提出し、使用例の簡単な説明を提供してください。
{{< /callout >}}

トレースからのカスタムメトリクスを使用する目的：
- 総トレース時間やトレースごとの操作数など、完全なトレースコンテキストから派生したメトリクス。
- 完全なトレースの知識を必要とする条件に対するアラート（例えば、N+1クエリ検出やファンアウトパターン）。
- 完全なトレースを保持せずに、トレンドやアラートのための重要な信号を抽出する。

## スパンまたはトレースからメトリクスを作成する

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. [**APM** > **メトリクスを生成**][14]に移動します。
2. **新しいメトリクス**をクリックします。
3. [メトリクス命名規則][11]に従ってメトリクスに名前を付けます。`trace.*`で始まるメトリクス名は許可されていません。
4. メトリクスタイプを選択してください：**スパン**または**トレース**。どちらもAPM検索および分析と同じ[クエリ構文][10]を使用します。
5. メトリクスクエリを定義して、測定したいスパンまたはトレースのみをフィルタリングして含めます。
6. 集計する値を選択してください：
     - すべての一致するスパンまたはトレースをカウントするには`*`を選択します。
     - 集計してカウント、最小、最大、合計、またはパーセンタイルを追跡するための数値属性（例えば、`@cassandra_row_count`）を入力します。
7. グループ化の次元を設定します。デフォルトでは、メトリクスにはタグがありません。追加しない限り。任意のスパン属性またはタグを使用してメトリックタグを作成します。
8. 結果をプレビューして、データビジュアライゼーションとライブプレビュー内の一致するスパンやトレースを通じてクエリのリアルタイムの影響を確認します。
9. **メトリックを作成**をクリックします。

<div class="alert alert-danger"> スパンベースのメトリックは<a href="/metrics/custom_metrics/">カスタムメトリック</a>と見なされ、それに応じて請求されます。請求に影響を与えないように、タイムスタンプ、ユーザーID、リクエストID、またはセッションIDのような無制限または非常に高いカーディナリティ属性でのグループ化を避けてください。</div>


## 既存のメトリックを更新します

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Edit an existing metrics" >}}

メトリックが作成された後、更新できるフィールドは2つだけです：

| フィールド                                | 理由                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| ストリームフィルタークエリ                | メトリックに集約される一致するスパンのセットを変更します。                                                         |
| 集約グループ                             | 生成されたメトリックのカーディナリティを管理するためにタグを更新します。                                                         |

**注意**：メトリックのタイプまたは名前を変更するには、新しいメトリックを作成し、古いものを削除します。


## データの可用性

トレースから生成されたメトリックは、トレースが完了した後に発信されます。長時間実行されるトレースの場合、遅延はそれに応じて増加します（たとえば、45分のトレースのメトリックはトレースの完了まで発信できません）。

モニターでトレースからのカスタムメトリックを使用する場合、この遅延を考慮して偽陽性を避けてください。

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_pipeline/trace_retention
[2]: /ja/account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/ja/metrics/#overview
[4]: /ja/monitors/types/anomaly/#overview
[5]: /ja/tracing/trace_explorer/
[6]: /ja/tracing/trace_explorer/query_syntax/#analytics-query
[7]: /ja/monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /ja/tracing/trace_explorer/query_syntax/
[11]: /ja/metrics/#naming-metrics
[12]: /ja/tracing/trace_pipeline/ingestion_controls
[13]: /ja/tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /ja/tracing/trace_explorer/trace_queries