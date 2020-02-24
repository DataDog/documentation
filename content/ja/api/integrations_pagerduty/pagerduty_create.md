---
title: PagerDuty インテグレーションの作成
type: apicontent
order: 19.2
external_redirect: "/api/#create-a-pagerduty-integration"
---

## PagerDuty インテグレーションの作成

新しい Datadog-PagerDuty インテグレーションを作成します。

**注**: 新しい PagerDuty 構成を作成 (`PUT`) する際は、すべての引数が必要です。

**引数**:

* **`services`** :
    PagerDuty サービスオブジェクトの配列。Datadog サービスの構成方法については、[PagerDuty のドキュメント][1]を参照してください。PagerDuty サービスオブジェクトは、以下の要素で構成されます。

    * **`service_name`** [必須]:
        PagerDuty でのサービス名。

    * **`service_key`** [必須]:
        Pagerduty でのサービス名に関連付けられたサービスキー。

* **`subdomain`** :
    PagerDuty アカウントのパーソナライズされたサブドメイン名。

* **`schedules`** :
    スケジュール URL の配列。例:
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

* **`api_token`** :
    PagerDuty API トークン。

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
