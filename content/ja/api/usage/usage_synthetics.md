---
title: Synthetics の 1 時間あたり使用量の取得
type: apicontent
order: 33.6
external_redirect: '/api/#get-hourly-usage-for-synthetics'
---
## Synthetics の 1 時間あたり使用量の取得

[Synthetics][1] の 1 時間あたり使用量を取得します。

##### 引数
* **`start_hr`** [必須]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間を始めとする使用量が取得されます。
* **`end_hr`** [オプション、デフォルト = **1d+start_hr**]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間以降の使用量が取得されます。この時間より前を終わりとする使用量が取得されます。

[1]: /ja/synthetics