---
title: Webhooks インテグレーションの作成
type: apicontent
order: 21.2
external_redirect: '/api/#create-a-webhooks-integration'
---
## Webhooks インテグレーションの作成

Datadog-Webhooks インテグレーションを作成します。

**注**:

* `POST` メソッドを使用すると、Datadog Organization の既存の構成に新しい構成を**追加**して、インテグレーション構成が更新されます。

**引数**:

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