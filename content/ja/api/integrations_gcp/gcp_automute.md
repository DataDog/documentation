---
title: GCP インテグレーションのオートミュートの設定
type: apicontent
order: 17.4
external_redirect: "/api/#set-gcp-integration-automute"
---

## GCP インテグレーションのオートミュートの設定

特定の Datadog-GCP インテグレーションのオートミュートを有効または無効にします。

##### 引数

* **`project_id`** [必須]:

    JSON サービスアカウントキーにある Google Cloud プロジェクト ID。

* **`client_email`** [必須]:

    JSON サービスアカウントキーにある電子メール。

* **`automute`** [オプション、デフォルト = **false**]:

    予期される GCE インスタンスのシャットダウンに対してモニターをオフにします。
