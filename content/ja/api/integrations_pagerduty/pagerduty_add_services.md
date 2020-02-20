---
title: 新しいサービスとスケジュールの追加
type: apicontent
order: 19.3
external_redirect: "/api/#add-new-services-and-schedules"
---

## 新しいサービスとスケジュールの追加

Datadog-PagerDuty インテグレーションに新しいサービスとスケジュールを追加します。

**引数**:

* **`services`** :
    PagerDuty サービスオブジェクトの配列。Datadog サービスの構成方法については、[PagerDuty のドキュメント][1]を参照してください。PagerDuty サービスオブジェクトは、以下の要素で構成されます。

    * **`service_name`** [必須]:
        PagerDuty でのサービス名。

    * **`service_key`** [必須]:
        Pagerduty でのサービス名に関連付けられたサービスキー。

* **`schedules`** :
    スケジュール URL の配列:
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
