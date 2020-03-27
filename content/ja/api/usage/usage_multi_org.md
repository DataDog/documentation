---
title: マルチオーガニゼーションのアカウント全体の使用量の取得
type: apicontent
order: 35.94
external_redirect: /api/#get-usage-across-your-multi-org-account
---

## マルチオーガニゼーションのアカウント全体の使用量の取得

マルチオーガニゼーションのアカウント全体の使用量の取得。このアクションは、親オーガニゼーションで**しか**処理されない可能性があります。子オーガニゼーションでこの呼び出しを使用すると、 `{"errors": ["Access was denied to this resource."]}`になります。

**引数**:

* **`start_month`** [必須]:
    ISO-8601 UTC 形式の月精度 [YYYY-MM] の日時値。この月を始めとする使用量が取得されます。最大 15 か月前まで指定できます。
* **`end_month`** [オプション、デフォルト = **current_month-3d**]:
    ISO-8601 UTC 形式の月精度 [YYYY-MM] の日時値。この月を終わりとする使用量が取得されます。
* **`include_org_details`** [オプション、デフォルト=**true**]:
    サブオーガニゼーションごとの使用量サマリーを含めます。
