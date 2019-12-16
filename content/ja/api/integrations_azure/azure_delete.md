---
title: Azure インテグレーションの削除
type: apicontent
order: 17.3
external_redirect: '/api/#delete-an-azure-integration'
---
## Azure インテグレーションの削除

特定の Datadog-Azure インテグレーションを削除します。

##### 引数

現在の Organization に対する以下のフィールド値を取得する方法については、[Datadog-Azure インテグレーションのインストール手順][1]を参照してください。

* **`tenant_name`** [必須]:

    Azure Active Directory ID

* **`client_id`** [必須]:

    Azure Web アプリケーション ID

* **`host_filters`** [オプション、デフォルト = **None**]:

    タグを使用して、Datadog にプルされる Azure インスタンスを制限します。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。

[1]: /ja/integrations/azure/#installation