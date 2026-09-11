---
algolia:
  tags:
  - log metrics
  - generating logs from metrics
aliases:
- /ja/logs/processing/logs_to_metrics/
- /ja/logs/logs_to_metrics/
description: 取り込んだログからメトリクスを生成します。
further_reading:
- link: logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: ブログ
  text: CIDR 表記クエリを使用してネットワークトラフィックログをフィルターする
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: ラーニングセンター
  text: アラートと調査のためのログを追跡する
title: 取り込んだログからメトリクスを生成する
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているソリューションは、クラウドベースのログ環境に特化しています。オンプレミスのログからメトリクスを生成するには、<a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Observability Pipelines</a> のドキュメントを参照してください。</div>

Datadog の [Logging without Limits][1]\* では、ストレージやクエリのためにインデックスへ含めるログと除外するログを動的に決定できます。一方で、多くの種類のログは、KPI などのトレンドを長期間追跡するためのテレメトリとして利用されます。ログベースのメトリクスは、取り込みストリーム全体のログデータを要約するためのコスト効率の高い方法です。これは、探索のために保存する内容を制限するために[除外フィルター][2]を使用しても、すべてのログデータに対して 10 秒粒度で 15 か月間にわたりトレンドや異常を可視化できることを意味します。

ログベースのメトリクスを使用すると、クエリや、リクエスト期間のようなログに含まれる数値の[分散メトリクス][3]に一致するログの COUNT メトリクスを生成できます。

**請求について:** 取り込まれたログから生成されたメトリクスは、[カスタムメトリクス][4]として請求されます。

## ログベースのメトリクスを生成する{#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="ログからメトリクスを生成する" style="width:80%;">}}

新しいログベースのメトリクスを生成するには:

1. [Generate Metrics][5] ページに移動します。
1. {{< ui >}}Generate Metrics{{< /ui >}} タブを選択します。
1. {{< ui >}}+New Metric{{< /ui >}} をクリックします。

Analytics の検索からメトリクスを作成するには、{{< ui >}}Export{{< /ui >}} メニューから {{< ui >}}Generate new metric{{< /ui >}} オプションを選択することもできます。

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="ログからメトリクスを生成する" style="width:80%;">}}

### 新しいログベースのメトリクスを追加 {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="ログからメトリクスを作成する" style="width:80%;">}}

1. {{< ui >}}Input a query to filter the log stream{{< /ui >}}: [Log Explorer の検索構文][6]を使用してクエリを記述します。Datadog は、インデックス化されたログに対してではなく、取り込み時にログストリームに対してストリームフィルタークエリを評価します。このフィルターは、[全文検索][12] (`*:search_term`) を含む、Log Explorer のすべての検索機能をサポートしているわけではありません。Log Explorer で結果を返すクエリであっても、ここではどのログにも一致しない場合があります。集計では、過去 20 分以内のタイムスタンプで取り込まれたログのみが対象になります。クエリからインデックスを除外します。

   メトリクスを保存した後、[Metrics Explorer][13] でデータポイントが生成されていることを確認してから使用してください。クエリが Log Explorer でログに一致してもメトリクスが空のままの場合は、その用語を引用符で囲んだフレーズとして書き直してください (例: `message:"Database operation failed."`)。
2. {{< ui >}}Select the field you would like to track{{< /ui >}}: `*` を選択してクエリに一致するすべてのログのカウントを生成するか、ログ属性 (例: `@network.bytes_written`) を入力して数値を集計し、対応する `count`、`min`、`max`、`sum`、`avg` の集計メトリクスを作成します。ログ属性ファセットが[メジャー][7]の場合、メトリクスの値はログ属性の値となります。
3. {{< ui >}}Add dimensions to `group by`{{< /ui >}}: デフォルトでは、ログから生成されたメトリクスには、明示的に追加しない限りタグはありません。ログに存在する任意の属性またはタグのディメンション (たとえば、`@network.bytes_written`、`env`) を使用して、メトリクスの[タグ][8]を作成できます。メトリクスタグの名前は、`@` を除いた元の属性またはタグの名前と同一です。
4. {{< ui >}}Add percentile aggregations{{< /ui >}}: ディストリビューションメトリクスの場合は、オプションで p50、p75、p90、p95、p99 のパーセンタイルを生成できます。パーセンタイルのメトリクスはカスタムメトリクスとしても扱われ、[適宜請求に追加][9]されます。
5. {{< ui >}}Name your metric{{< /ui >}}: ログベースのメトリクス名は、[カスタムメトリクスの命名規則][10]に従う必要があります。

**注**: Datadog は、ログベースのメトリクスのデータポイントを 10 秒間隔で生成します。ログベースのメトリクス用の[ダッシュボードグラフ][11]を作成するとき、`count unique` パラメーターは 10 秒間隔内の値を使用します。

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="ユニーククエリパラメーターが強調表示された時系列グラフの設定ページ" style="width:80%;">}}

<div class="alert alert-danger">ログベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>として請求されます。請求額を抑えるには、タイムスタンプ、ユーザー ID、リクエスト ID、セッション IDなど、値の数に制限がない、または値の数が非常に多い属性でグループ化することは避けてください。</div>

### ログベースのメトリクスを更新する {#update-a-log-based-metric}

メトリクスの作成後、以下のフィールドを更新できます。

- Stream filter query: メトリクスに集約される一致するログの組み合わせを変更します
- Aggregation groups: タグを更新するか、生成されたメトリクスのカーディナリティを管理します
- パーセンタイル選択: {{< ui >}}Calculate percentiles{{< /ui >}} ボックスへのチェックにより、パーセンタイルメトリクスを削除または生成します

メトリクスタイプまたは名前を変更するには、新しいメトリクスを作成する必要があります。

## ログ使用メトリクス {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="推奨される使用状況メトリクス" style="width:80%;">}}

使用状況メトリクスは、ほぼリアルタイムによる現在の Datadog 使用状況の推定値です。これらにより、以下が可能になります。

- 推定使用量をグラフ化します。
- 推定使用量に基づいてモニターを作成します。
- 使用量の急上昇または低下の即時アラートを取得します。
- コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価します。

ログ管理の使用量メトリクスには、より詳細な監視に使用できる 3 つのタグがあります。

| タグ                     | 説明                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | ログを目的のインデックスに一致させるルーティングクエリを示します。 |
|  `datadog_is_excluded`  | ログが除外クエリと一致するかどうかを示します。           |
|  `service`              | ログイベントのサービス属性。                              |

**注**: `datadog_is_excluded` および `datadog_index` フィールドは、`N/A` の値を持つことができます。これは、ログが取り込まれたものの、インデックスに明示的にルーティングするための包含条件または除外条件のいずれにも一致しなかったことを示します。

ログステータス (`info`、`warning` など) を反映するために、`datadog.estimated_usage.logs.ingested_events` メトリクスでは追加の `status` タグを利用できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/
[2]: /ja/logs/indexes/#exclusion-filters
[3]: /ja/metrics/distributions/#overview
[4]: /ja/metrics/custom_metrics/
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /ja/logs/search_syntax/
[7]: /ja/logs/explorer/facets/#quantitative-facets-measures
[8]: /ja/getting_started/tagging/
[9]: /ja/account_management/billing/custom_metrics/?tab=countrategauge
[10]: /ja/metrics/custom_metrics/#naming-custom-metrics
[11]: /ja/dashboards/querying/
[12]: /ja/logs/explorer/search_syntax/#full-text-search
[13]: /ja/metrics/explorer/