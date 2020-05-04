---
title: 新しい GCP インテグレーションの作成
type: apicontent
order: 18.2
external_redirect: '/api/#create-a-gcp-integration'
---
## 新しい GCP インテグレーションの作成

Datadog-Google Cloud Platform インテグレーションを作成します。

**注**:

* `POST` メソッドを使用すると、Datadog Organization の既存の構成に新しい構成を**追加**して、インテグレーション構成が更新されます。
* `PUT` メソッドを使用すると、現在の構成を Datadog Organization に送信された新しい構成に**置き換えて**、インテグレーション構成が更新されます。

**引数**:

以下のすべてのフィールドの値は、[サービスアカウントの GCP コンソール][1]で作成された JSON サービスアカウントキーファイルから提供されます。現在の Organization に対してこのファイルを作成する方法については、[Datadog-Google Cloud Platform インテグレーションのインストール手順][2]を参照してください。
詳細については、[Google Cloud のサービスアカウントキーの作成と管理に関するドキュメント][3]を参照してください。

* **`type`** [必須]:

    JSON サービスアカウントキーにある `service_account` の値。

* **`project_id`** [必須]:

    JSON サービスアカウントキーにある Google Cloud プロジェクト ID。

* **`private_key_id`** [必須]:

    JSON サービスアカウントキーにある秘密キー ID。

* **`private_key`** [必須]:

    JSON サービスアカウントキーにある秘密キー名。

* **`client_email`** [必須]:

    JSON サービスアカウントキーにある電子メール。

* **`client_id`** [必須]:

    JSON サービスアカウントキーにある ID。

* **`auth_uri`** [必須]:

    `https://accounts.google.com/o/oauth2/auth`。

* **`token_uri`** [必須]:

    `https://accounts.google.com/o/oauth2/token`。

* **`auth_provider_x509_cert_url`** [必須]:

    `https://www.googleapis.com/oauth2/v1/certs`。

* **`client_x509_cert_url`** [必須]:

    `https://www.googleapis.com/robot/v1/metadata/x509/<CLIENT_EMAIL>`。ここで、`<CLIENT_EMAIL>` は JSON サービスアカウントキーにある電子メールです。

* **`host_filters`** [オプション]:

    タグを使用して、Datadog にプルされる GCE インスタンスを制限します。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。

* **`automute`** [オプション、デフォルト = **false**]:

    予期される GCE インスタンスのシャットダウンに対してモニターをオフにします。

[1]: https://console.cloud.google.com/iam-admin/serviceaccounts
[2]: /ja/integrations/google_cloud_platform/#installation
[3]: https://cloud.google.com/iam/docs/creating-managing-service-account-keys