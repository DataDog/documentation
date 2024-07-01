---
algolia:
  tags:
  - ログメトリクス
  - メトリクスからログを生成する
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
  text: CIDR 表記クエリを使用して、ネットワークトラフィックログをフィルターする
title: 取り込んだログからメトリクスを生成する
---

## 概要

Datadog の [Logging without Limits][1]\* を使用すると、インデックスに含めるものと除外するものを動的に決定できます。同時に、多くのタイプのログが、長期間にわたり KPI などトレンドの追跡テレメトリーとして使用されます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。つまり、[除外フィルター][2]を使用して調査用に保存するアイテムを制限しても、15 か月間のすべてのログデータの傾向と異常を 10 秒の粒度で視覚化できます。

ログベースのメトリクスを使用すると、クエリや、リクエスト期間のようなログに含まれる数値の[ディストリビューションメトリクス][3]に一致するログの COUNT メトリクスを生成できます。

**請求について:** 取り込まれたログから生成されたメトリクスは、[カスタムメトリクス][4]として請求されます。

## ログベースのメトリクスを生成する

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="ログをメトリクスに生成" style="width:80%;">}}

ログベースのメトリクスを新しく生成するには、Datadog アカウントの [Configuration ページ][5]で _[Generate Metrics][6]_ タブを選択し、**New Metric+** ボタンをクリックします。

Export メニューで "Generate new metric" を選択し、Analytics の検索からメトリクスを作成することも可能です。

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics.jpg" alt="ログからメトリクスを生成" style="width:80%;">}}

### 新しいログベースのメトリクスを追加

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="ログからメトリクスを作成" style="width:80%;">}}

1. **クエリを入力してログストリームを絞り込み**: クエリの構文は[ログエクスプローラーでの検索][7]と同じです。過去 20 分以内のタイムスタンプで取り込まれたログのみが集計の対象となります。
2. **追跡するフィールドを選択**: `*` を選択してクエリに一致するすべてのログカウントを生成するか、ログ属性 (例: `@network.bytes_written`) を入力して数値を集計し、該当する `count`、`min`、`max`、`sum`、`avg` の集計メトリクスを作成します。ログ属性のファセットが[メジャー][8]の場合、メトリクスの値はログ属性の値になります。
3. **`group by` にディメンションを追加**: デフォルトでは、明示的に追加しない限り、ログから生成されたメトリクスにタグは付いていません。ログに存在する属性やタグディメンション (例: `@network.bytes_written`、`env`) は、いずれもメトリクス[タグ][9]を作成するために使用できます。メトリクスタグ名は元の属性またはタグ名から @ を抜いたものとなります。
4. **パーセンタイル集計を追加**: ディストリビューションメトリクスの場合は、オプションでパーセンタイル（p50、p75、p90、p95、p99）で集計できます。パーセンタイルのメトリクスはカスタムメトリクスとしても扱われ、[適宜請求に追加][10]されます。
5. **メトリクスに命名**: ログベースのメトリクス名は、[カスタムメトリクスの命名規則][11]に従う必要があります。

**注**: ログベースのメトリクスのデータポイントは、10 秒間隔で生成されます。ログベースのメトリクスに対して[ダッシュボードグラフ][12]を作成する場合、`count unique` パラメーターは 10 秒間隔内の値に基づいています。

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="count unique クエリパラメーターがハイライトされた時系列グラフの構成ページ" style="width:80%;">}}

<div class="alert alert-warning">ログベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>と見なされ、それに応じて請求されます。請求への影響を避けるために、タイムスタンプ、ユーザー ID、リクエスト ID、セッション ID などの無制限または非常に高いカーディナリティ属性によるグループ化は避けてください。</div>

### ログベースのメトリクスを更新する

メトリクスの作成後、以下のフィールドを更新できます。

- Stream filter query: メトリクスに集約される一致するログの組み合わせを変更します
- Aggregation groups: タグを更新するか、生成されたメトリクスのカーディナリティを管理します
- パーセンタイル選択: **Calculate percentiles** ボックスへのチェックにより、パーセンタイルメトリクスを削除または生成します

メトリクスタイプまたは名前を変更するには、新しいメトリクスを作成する必要があります。

## ログ使用メトリクス

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="推奨される使用量メトリクス" style="width:80%;">}}

使用量メトリクスは、ほぼリアルタイムによる現在の Datadog 使用量の推定値です。これらにより、以下が可能になります。

- 推定使用量をグラフ化します。
- 推定使用量に基づいてモニターを作成します。
- 使用量の急上昇または低下の即時アラートを取得します。
- コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価します。

ログ管理の使用量メトリクスには、より詳細な監視に使用できる 3 つのタグがあります。

| タグ                     | 説明                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | ログを目的のインデックスに一致させるルーティングクエリを示します。  |
|  `datadog_is_excluded`  | ログが除外クエリと一致するかどうかを示します。            |
|  `service`              | ログイベントのサービス属性。                               |

`datadog.estimated_usage.logs.ingested_events` メトリクスでは、追加の `status` タグを使用して、ログのステータス (`info`、`warning` など) を反映させることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/
[2]: /ja/logs/indexes/#exclusion-filters
[3]: /ja/metrics/distributions/#overview
[4]: /ja/metrics/custom_metrics/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[7]: /ja/logs/search_syntax/
[8]: /ja/logs/explorer/facets/#quantitative-facets-measures
[9]: /ja/getting_started/tagging/
[10]: /ja/account_management/billing/custom_metrics/?tab=countrategauge
[11]: /ja/metrics/custom_metrics/#naming-custom-metrics
[12]: /ja/dashboards/querying/