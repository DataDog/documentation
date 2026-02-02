---
title: スパンとトレースからのカスタムメトリクスの生成
description: '取り込まれたスパンと完全なトレースからカスタムメトリクスを生成します。'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'トレースの取り込みをカスタマイズし、重要なトレースを保持する'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: '保持されたトレースに基づいて Analytics クエリとモニターを使用する'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: '特定のトレースからメトリクスを作成するために高度なトレースクエリを使用する'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'トレースメトリクスを使用してすべてのアプリケーショントラフィックを監視する'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Terraform でスパンベースのメトリクスを作成して管理する'
---

{{< img src="tracing/apm\_lifecycle/span\_based\_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="スパンベースメトリクス" >}}

トレンドの追跡、ダッシュボードの強化、モニターのトリガーのために、取り込まれたスパンからカスタムメトリクスを生成します。完全なトレース分析のために保持されていないスパンやトレースにも対応します。

カスタムメトリクスは、スパンが[保持フィルター][1]によるインデックス化の対象であるかどうかに関係なく、Datadog APM によって取り込まれたスパンから作成されます。スパン (カウント、期間、カスタムタグなど) またはトレース (エンドツーエンドのトレース期間) から数値を抽出し、保持期間 15 か月の長期的な[カスタムメトリクス][3]として保存します。

**注:**
\- Datadogは、アプリケーショントラフィックの 100% に対してリクエストカウント、エラーレート、レイテンシ分布を収集する[トレースメトリクス][13]を自動的に生成します。
\- カスタムメトリクスの生成に利用できるスパンは、[APM の取り込み制御設定][12]に依存します。サンプリングやフィルタリングで破棄されたスパンからはメトリクスを生成できません。


スパンから生成したカスタムメトリクスは、次のような用途で使用します。
\- スパンレベルのレイテンシ、エラーレート、タグレベルのパフォーマンスを詳細に可視化する。
\- 低レイテンシ、高解像度のメトリクスを使用して[異常][4]または[予測][7]モニターを強化する。
\- スパン全体を保持せずに、トレンド把握やアラートのための重要な信号を抽出する。

#### トレースから生成したカスタムメトリクスを使用する場合

Datadog では、[トレースクエリ][15]からメトリクスを生成できます。

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="プレビューに参加ませんか?" >}}
トレースからのカスタムメトリクスはプレビューの段階です。アクセスをリクエストするには、APM サポートチームにチケットを提出し、用途の簡単な説明を提供してください。
{{< /callout >}}

トレースから生成したカスタムメトリクスは、次のような用途で使用します。
\- 完全なトレースコンテキストから抽出したメトリクス (例: トレースの合計時間、トレースごとの操作数) を作成する。
\- トレース全体の情報が必要な条件 (N+1 クエリ検出やファンアウトパターンなど) で、アラートを出す。
\- トレース全体を保持せずに、トレンド把握やアラートのための重要なシグナルを抽出する。

## スパンまたはトレースからのメトリクスの作成

{{< img src="tracing/span\_to\_metrics/createspantometrics.png" style="width:100%;" alt="メトリクスの作成方法" >}}

1. [**APM** > **Generate Metrics**][14] に移動します。
2. **New Metric** をクリックします。
3. [メトリクス命名規則][11]に従ってメトリクスに名前を付けます。`trace.*` で始まるメトリクス名は使用できません。
4. メトリクスの種類として、**Spans** または **Traces** を選択します。どちらも APM の検索および分析と同じ[クエリ構文][10]を使用します。
5. メトリクスクエリを定義して、測定するスパンまたはトレースだけに絞り込みます。
6. 集計する値を選択します。
     - 一致するスパンまたはトレースをすべてカウントするには、`*` を選択します。
     - 集計してカウント、最小、最大、合計、またはパーセンタイルを追跡するには、数値属性 (たとえば、`@cassandra_row_count`) を入力します。
7. グループ化のディメンションを設定します。デフォルトでは、タグを追加しない限り、メトリクスにタグは付きません。メトリクスタグを作成するには、任意のスパン属性またはタグを使用します。
8. 結果をプレビューして、データの可視化とライブプレビューで一致するスパンまたはトレースを確認しながら、クエリのリアルタイムの影響を把握します。
9. **Create Metric** をクリックします。

<div class="alert alert-danger"> スパンベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>として請求されます。請求額を抑えるには、タイムスタンプ、ユーザー ID、リクエスト ID、セッション IDなど、値の数に制限がない、または値の数が非常に多い属性でグループ化することは避けてください。</div>


## 既存のメトリクスの更新

{{< img src="tracing/span\_to\_metrics/editspantometrics.png" style="width:100%;" alt="既存のメトリクスを編集する" >}}

メトリクスの作成後、更新できるのは 2 つのフィールドのみです。

| フィールド                                | 理由                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| ストリームフィルタークエリ                | メトリクスに集約される、一致するスパンの組み合わせを変更します。                                                         |
| 集約グループ                             | 生成されたメトリクスのカーディナリティを管理するためにタグを更新します。                                                         |

**注**:メトリクスのタイプまたは名前を変更するには、新しいメトリクスを作成し、古いメトリクスを削除します。


## データの可用性

トレースから生成されたメトリクスは、トレースが完了した後に出力されます。長時間実行されるトレースの場合、それに応じて遅延も増加します (たとえば、45 分のトレースのメトリクスはトレースが完了するまで出力されません)。

モニターでトレースからのカスタムメトリクスを使用する場合、この遅延を考慮して誤検知を避けてください。

## 参考資料

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
