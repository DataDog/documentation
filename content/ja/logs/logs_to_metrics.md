---
title: 取り込んだログからメトリクスを生成する
kind: documentation
aliases:
  - /ja/logs/processing/logs_to_metrics/
description: 取り込んだログからメトリクスを生成します。
further_reading:
  - link: logs/processing/processors
    tag: ドキュメント
    text: ログの処理方法
  - link: logs/logging_without_limits
    tag: ドキュメント
    text: Dataldog でインデックス化するログの量を制御します
---
## 概要

Datadog の [Logging without Limits][1]\* を使用すると、インデックスに含めるものと除外するものを動的に決定できます。同時に、多くのタイプのログが、長期間にわたり KPI などトレンドの追跡テレメトリーとして使用されます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。つまり、[除外フィルター][2]を使用して調査用に保存するアイテムを制限しても、15 か月間のすべてのログデータの傾向と異常を 10 秒の粒度で視覚化できます。

ログベースのメトリクスを使用すると、クエリや、リクエスト期間のようなログに含まれる数値の[ディストリビューションメトリクス][3]に一致するログの COUNT メトリクスを生成できます。

## ログベースのメトリクスを生成する

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="ログをメトリクスに生成"  style="width:80%;">}}

ログベースのメトリクスを新しく生成するには、Datadog アカウントの [Configuration ページ][4]で _[Generate Metrics][5]_ タブを選択し、**New Metric+** ボタンをクリックします。

Export メニューで "Generate new metric" を選択し、Analytics の検索からメトリクスを作成することも可能です。

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics.png" alt="ログからメトリクスを生成"  style="width:80%;">}}

### 新しいログベースのメトリクスを追加

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="ログからメトリクスを作成"  style="width:80%;">}}

1. **クエリを入力してログストリームを絞り込み**: クエリの構文は[ログエクスプローラーでの検索][6]と同じです。過去 20 分以内のタイムスタンプで取り込まれたログのみが集計の対象となります。
2. **追跡するフィールドを選択**: `*` を選択してクエリに一致するすべてのログカウントを生成するか、ログ属性 (例: `@network.bytes_written`) を入力して数値を集計し、該当する `count`、`min`、`max`、`sum`、`avg` の集計メトリクスを作成します。ログ属性のファセットが[メジャー][7]の場合、メトリクスの値はログ属性の値になります。
3. **`group by` にディメンションを追加**: デフォルトでは、明示的に追加しない限り、ログから生成されたメトリクスにタグは付いていません。ログに存在する属性やタグディメンションは、いずれもメトリクス[タグ][8]を作成するために使用できます。ログベースのメトリクスは[カスタムメトリクス][9]と見なされます。タイムスタンプ、ユーザー ID、リクエスト ID、セッション ID などの無制限または非常に高いカーディナリティ属性によるグループ化を避けて、請求に影響を与えないようにします。この機能を HIPAA 対応ユーザーに使用する場合の詳しい情報は、[ログセキュリティ][10]ページをご覧ください。
4. **パーセンタイル集計を追加 (アメリカ在住の顧客のみ)**: ディストリビューションメトリクスの場合は、オプションでパーセンタイル（p50、p75、p90、p95、p99）で集計できます。パーセンタイルのメトリクスはカスタムメトリクスとしても扱われ、[適宜請求に追加][11]されます。
5. **メトリクスに命名**: ログベースのメトリクス名は、[メトリクスの命名規則][12]に従う必要があります。

**注**: ログベースのメトリクスのデータポイントは、10 秒間隔で生成されます。

### ログベースのメトリクスを更新する

メトリクスの作成後、以下のフィールドを更新できます。

- Stream filter query: メトリクスに集約される一致するログの組み合わせを変更します
- Aggregation groups: タグを更新するか、生成されたメトリクスのカーディナリティを管理します
- Percentile selection: ‘Calculate percentiles’ ボックスへのチェックにより、パーセンタイルメトリクスを削除または生成します

メトリクスタイプまたは名前を変更するには、新しいメトリクスを作成する必要があります。

## 推奨される使用量メトリクス

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
[4]: https://app.datadoghq.com/logs/pipelines
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /ja/logs/search_syntax/
[7]: /ja/logs/explorer/facets/#quantitative-facets-measures
[8]: /ja/getting_started/tagging/
[9]: /ja/developers/metrics/custom_metrics/
[10]: /ja/security/logs/#hipaa-enabled-customers
[11]: /ja/account_management/billing/custom_metrics/?tab=countrategauge
[12]: /ja/developers/metrics/#naming-metrics