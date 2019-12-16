---
title: Webhooks インテグレーションへの Webhook の追加
type: apicontent
order: 21.3
external_redirect: '/api/#add-a-webhook-to-a-webhooks-integration'
---
## Webhooks インテグレーションへの Webhook の追加

特定の Webhook を Datadog Webhooks インテグレーションに追加します。

##### 引数


* **`hooks`** [必須]:
    Webhook オブジェクトの配列。Webhook オブジェクトは、以下の要素で構成されます。

    * **`name`** [必須]:
        Webhook 名。
        [モニター通知で使用する方法については、こちらを参照してください][1]。
    * **`url`** [必須]:
        Webhook の URL。
    * **`use_custom_payload`** [オプション、デフォルト = **False**]:
        **true** の場合は、Webhook にカスタムペイロードを指定することができます。

    * **`custom_payload`** [オプション、デフォルト = **None**]:
        `use_custom_payload` が **true** の場合は、独自のペイロードを指定し、[これらの変数を使用して][2]リクエストに独自のカスタムフィールドを追加します。

    * **`encode_as_form`** [オプション、デフォルト = **False**]:
        `use_custom_payload` が **true** の場合に、これを **true** に設定すると、ペイロードが URL エンコードされます。
    * **`headers`** [オプション、デフォルト = **None**]:
        Webhook にアタッチされるヘッダー。

[1]: /ja/monitors/notifications
[2]: /ja/integrations/webhooks/#usage