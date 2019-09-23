---
title: 子オーガニゼーションの作成
type: apicontent
order: 27.1
external_redirect: '/api/#create-child-organization'
---
## 子オーガニゼーションの作成

このエンドポイントには、[マルチオーガニゼーションのアカウント][1]機能が必要です。また、[サポートに問い合わせて][2]、エンドポイントを有効にしておく必要があります。

##### 引数

* **`name`** [必須]:
    新しい子オーガニゼーションの名前。32 文字に制限されます。
* **`subscription`** [必須]:
    サブスクリプションタイプの JSON 配列。使用できるタイプは、`trial`、`free`、`pro` です。
* **`billing`** [必須]:
    課金タイプの JSON 配列。`parent_billing` だけがサポートされています。

新しい子オーガニゼーションが作成されたら、応答に示された `org.public_id`、`api_key.key`、および `application_key.hash` を使用して、子オーガニゼーションとやり取りできます。

[1]: /ja/account_management/multi_organization
[2]: /ja/help