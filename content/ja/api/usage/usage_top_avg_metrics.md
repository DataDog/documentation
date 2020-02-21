---
title: 時間平均に基づくカスタムメトリクス上位 500 の取得
type: apicontent
order: 35.4
external_redirect: '/api/#get-top-500-custom-metrics-by-hourly-average'
---
## 時間平均に基づくカスタムメトリクス上位 500 の取得

時間平均に基づく上位[カスタムメトリクス][1]を取得します。

**引数**:

* **`month`** [必須]:
    ISO-8601 UTC 形式の月精度 [YYYY-MM] の日時値。この時間を始めとする使用量が取得されます。
* **`names`** [オプション、デフォルト = **None**]:
    メトリクス名のカンマ区切りリスト。

[1]: /ja/developers/metrics/custom_metrics