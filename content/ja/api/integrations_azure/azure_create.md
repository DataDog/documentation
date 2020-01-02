---
title: Azure インテグレーションの作成
type: apicontent
order: 17.2
external_redirect: '/api/#create-an-azure-integration'
---
## Azure インテグレーションの作成

Datadog-Azure インテグレーションを作成します。

**注**:

* `POST` メソッドを使用すると、Datadog Organization の既存の構成に新しい構成を**追加**して、インテグレーション構成が更新されます。
* `PUT` メソッドを使用すると、現在の構成を Datadog Organization に送信された新しい構成に**置き換えて**、インテグレーション構成が更新されます。

##### 引数

現在の Organization に対する以下のフィールド値を取得する方法については、[Datadog-Azure インテグレーションのインストール手順][1]を参照してください。

* **`tenant_name`** [必須]:

    Azure Active Directory ID

* **`client_id`** [必須]:

    Azure Web アプリケーション ID.

* **`client_secret`** [必須]:

    Azure Web アプリケーション秘密キー.

* **`host_filters`** [オプション、デフォルト = **None**]:

    タグを使用して、Datadog にプルされる Azure インスタンスを制限します。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。


[1]: /ja/integrations/azure/#installation