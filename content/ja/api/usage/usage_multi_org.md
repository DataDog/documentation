---
title: マルチオーガニゼーションのアカウント全体の使用量の取得
type: apicontent
order: 33.8
external_redirect: /api/#get-usage-across-your-multi-org-account
---

## マルチオーガニゼーションのアカウント全体の使用量の取得

マルチオーガニゼーションのアカウント全体の使用量を取得します。

##### 引数
* **`start_month`** [必須]:
    ISO-8601 UTC 形式の月精度 [YYYY-MM] の日時値。この月を始めとする使用量が取得されます。最大 15 か月前まで指定できます。
* **`end_month`** [オプション、デフォルト = **current_month-3d**]:
    ISO-8601 UTC 形式の月精度 [YYYY-MM] の日時値。この月を終わりとする使用量が取得されます。
* **`include_org_details`** [オプション、デフォルト=**true**]:
    サブオーガニゼーションごとの使用量サマリーを含めます。
