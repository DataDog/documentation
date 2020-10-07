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

Datadog の [Logging without Limits][1]\* を使用すると、インデックスに含めるものと除外するものを動的に決定できます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。つまり、[除外フィルター][2]を使用して操作上重要なログのインデックスを制限しても、15 か月間のすべてのログデータの傾向と異常を完全な粒度で視覚化できます。

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。

## ログベースのメトリクスを生成する

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="ログをメトリクスに生成"  style="width:80%;">}}

新しいログベースのメトリクスを生成するには、Datadog アカウントの[構成ページ][3]に移動して、_[Generate Metrics][4]_ タブを選択し、**New Metric+** ボタンを選択します。

### 新しいログベースのメトリクスを追加

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics.png" alt="ログをメトリクスに作成"  style="width:80%;">}}

1. **ログストリームをフィルタリングするクエリを入力します**: クエリ構文は [Log Explorer Search][5] と同じです。過去 20 分以内にタイムスタンプが取り込まれたログのみが集計対象と見なされます。
2. **追跡したいフィールドを選択します**: `*` を選択してクエリに一致するすべてのログのカウントを生成するか、ログ属性（例: `@network.bytes_written`）を入力して数値を集計し、 対応する `count`、`min`、`max`、`sum`、`avg` 集計メトリクスを作成します。ログ属性ファセットが[メジャー][6]の場合、メトリクスの値はログ属性の値です。
3. **`group by` にディメンションを追加**: デフォルトでは、明示的に追加しない限り、ログから生成されたメトリクスにタグは付いていません。ログに存在する属性やタグディメンションは、いずれもメトリクス[タグ][7]を作成するために使用できます。ログベースのメトリクスは[カスタムメトリクス][8]と見なされます。タイムスタンプ、ユーザー ID、リクエスト ID、セッション ID などの無制限または非常に高いカーディナリティ属性によるグループ化を避けて、請求に影響を与えないようにします。HIPAA 対応ユーザー向けにこの機能を使用する場合の詳細は、[ログセキュリティ][9]ページを参照してください。
4. **メトリクスに名前を付けます**: ログベースのメトリクス名は、[メトリクスの命名規則][10]に従う必要があります。

**注**: ログベースのメトリクスのデータポイントは、10 秒間隔で生成されます。

### ログベースのメトリクスを更新する

メトリクスの作成後、次のフィールドのみを更新できます。

- ストリームフィルタークエリ: メトリクスに集約される一致するログの組み合わせを変更します。
- 集約グループ: タグを更新するか、生成されたメトリクスのカーディナリティを管理します。

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
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[5]: /ja/logs/search_syntax/
[6]: /ja/logs/explorer/facets/#quantitative-facets-measures
[7]: /ja/getting_started/tagging/
[8]: /ja/developers/metrics/custom_metrics/
[9]: /ja/security/logs/#hipaa-enabled-customers
[10]: /ja/developers/metrics/#naming-metrics