---
title: ヒストグラム
kind: documentation
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: メトリクスの詳細
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ
---
## 概要

ヒストグラムは、値セットの統計的分布を測定します。

Datadog のヒストグラムメトリクスとタイミングメトリクスは本質的に同じもので、[StatsD タイミングメトリクス][1]の拡張機能です。これらはフラッシュ間隔 (通常のデフォルトは 10 秒) の間に送信された値を集計します。

フラッシュ間隔の間にメトリクス `<METRIC_NAME>` に対して 20 個の値を送信すると、Datadog ヒストグラムは、そのフラッシュ間隔の値を次のように集計します。

* `<METRIC_NAME>.avg`: フラッシュ間隔の間の 20 個の値の平均です。
* `<METRIC_NAME>.count`: フラッシュ間隔の間に送信された値の数 (この場合は 20) です。
* `<METRIC_NAME>.median`: フラッシュ間隔の間の値の中央値です。
* `<METRIC_NAME>.95percentile`: フラッシュ間隔の間の 95 パーセンタイルです。
* `<METRIC_NAME>.max`: フラッシュ間隔の間に送信された最大値です。
* `<METRIC_NAME>.min`: フラッシュ間隔の間に送信された最小値です。
* `<METRIC_NAME>.sum`: フラッシュ間隔の間に送信された値の合計です。

どの集計を Datadog に送信するかは、[datadog.yaml 構成ファイル][2]の `histogram_aggregates` パラメーターで構成します。
デフォルトでは、`max`、`median`、`avg`、`count` の各集計だけが Datadog に送出されます。

## 送信

### Agent チェック


| メソッド              | 概要                                                       |
| :---                | :---                                                           |
| self.histogram(...) | 値セットの統計的分布を追跡するために使用されます。 |

### DogStatsD

| メソッド             | 概要                                                                                  |
| :---               | :---                                                                                      |
| dog.histogram(...) | StatsD フラッシュ期間の値セットの統計的分布を追跡するために使用されます。 |


#### 例

コードサンプルについては、[DogStatsD 固有のドキュメント][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/developers/dogstatsd/data_types#histograms