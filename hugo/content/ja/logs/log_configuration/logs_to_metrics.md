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
1. **Generate Metrics** タブを選択します。
1. **+New Metric** をクリックします。

Export メニューで "Generate new metric" を選択し、Analytics の検索からメトリクスを作成することも可能です。

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="ログからメトリクスを生成する" style="width:80%;">}}

### 新しいログベースのメトリクスを追加 {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="ログからメトリクスを作成する" style="width:80%;">}}

1. **ログストリームをフィルタリングするためのクエリを入力**: クエリ構文は[ログエクスプローラー検索][6]と同じです。過去 20 分以内のタイムスタンプで取り込まれたログのみが集計対象となります。インデックスはクエリから除外する必要があります。
2. **追跡するフィールドを選択**:　`*` を選択し、クエリに一致するすべてのログのカウントを生成するか、ログ属性 (例、`@network.bytes_written`) を入力して数値を集計し、集計メトリクスの対応する `count`、`min`、`max`、`sum`、`avg` を作成します。ログ属性ファセットが[メジャー][7]の場合、メトリクスの値はログ属性の値となります。
3. **ディメンションを `group by`** に追加: デフォルトでは、ログから生成されたメトリクスには、明示的に追加しない限りタグはありません。ログに存在する任意の属性またはタグのディメンション (例えば、`@network.bytes_written`、`env`) を使用して、メトリクスの[タグ][8]を作成できます。メトリクスタグの名前は、@ を除いた元の属性またはタグの名前と同一です。
4. **パーセンタイル集計を追加**: ディストリビューションメトリクスの場合は、オプションでパーセンタイル（p50、p75、p90、p95、p99）で集計できます。パーセンタイルのメトリクスはカスタムメトリクスとしても扱われ、[適宜請求に追加][9]されます。
5. **メトリクスに命名**: ログベースのメトリクス名は、[カスタムメトリクスの命名規則][10]に従う必要があります。

**注**: ログベースのメトリクスのデータポイントは、10 秒間隔で生成されます。ログベースのメトリクス用の[ダッシュボードグラフ][11]を作成するとき、`count unique`パラメーターは10秒間隔内の値に基づきます。

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="ユニーククエリパラメーターが強調表示された時系列グラフの設定ページ" style="width:80%;">}}

<div class="alert alert-danger">ログベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>として請求されます。請求額を抑えるには、タイムスタンプ、ユーザー ID、リクエスト ID、セッション IDなど、値の数に制限がない、または値の数が非常に多い属性でグループ化することは避けてください。</div>

### ログベースのメトリクスを更新する {#update-a-log-based-metric}

メトリクスの作成後、以下のフィールドを更新できます。

- Stream filter query: メトリクスに集約される一致するログの組み合わせを変更します
- Aggregation groups: タグを更新するか、生成されたメトリクスのカーディナリティを管理します
- パーセンタイル選択: **Calculate percentiles** ボックスへのチェックにより、パーセンタイルメトリクスを削除または生成します

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