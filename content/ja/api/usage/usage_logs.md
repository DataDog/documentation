---
title: ログの 1 時間あたり使用量の取得
type: apicontent
order: 33.2
external_redirect: "/api/#get-hourly-usage-for-logs"
---

## ログの 1 時間あたり使用量の取得

ログの 1 時間あたり使用量を取得します。

##### 引数
* **`start_hr`** [必須]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間を始めとする使用量が取得されます。
* **`end_hr`** [オプション、デフォルト = **1d+start_hr**]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間以降の使用量が取得されます。この時間より前を終わりとする使用量が取得されます。

##### 応答

* **`ingested_events_bytes`**:
    収集されたログバイト数が含まれます。
* **`indexed_events_count`**:
    インデックス化されたログイベント数が含まれます。
* **`hour`**:
    使用量が取得された時間。
