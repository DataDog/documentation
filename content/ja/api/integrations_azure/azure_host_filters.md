---
title: Azure インテグレーションホストフィルターの更新
type: apicontent
order: 17.4
external_redirect: '/api/#update-an azure-integration-host-filters'
---
## Azure インテグレーションホストフィルターの更新

特定の Datadog-Azure インテグレーション用に定義されたホストフィルターのリストを更新します。

##### 引数

現在のオーガニゼーションに対する以下のフィールド値を取得する方法については、[Datadog-Azure インテグレーションのインストール手順][1]を参照してください。

* **`tenant_name`** [必須]:

    Azure Active Directory ID

* **`client_id`** [必須]:

    Azure Web アプリケーション ID

* **`client_secret`** [必須]:

    Azure Web アプリケーション秘密キー

* **`host_filters`** [オプション、デフォルト = **None**]:

    タグを使用して、Datadog にプルされる Azure インスタンスを制限します。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。

[1]: /ja/integrations/azure/#installation