---
app_id: salesforce-commerce-cloud
app_uuid: fe465a7e-7702-40fb-9a88-a0e4198d1983
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 616
    source_type_name: Salesforce Commerce Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: salesforce_commerce_cloud
integration_id: salesforce-commerce-cloud
integration_title: Salesforce Commerce Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: salesforce_commerce_cloud
public_title: Salesforce Commerce Cloud
short_description: Salesforce Commerce Cloud のログを Datadog にインポートする
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  configuration: README.md#Setup
  description: Salesforce Commerce Cloud のログを Datadog にインポートする
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Salesforce Commerce Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Salesforce Commerce Cloud は、マルチテナント型のクラウドベースのコマースプラットフォームです。Salesforce Commerce Cloud と Datadog をインテグレーションし、[Datadog Logs][1] を使ってログを表示・パースします。

## 計画と使用

### インフラストラクチャーリスト

インストールは必要ありません。

### ブラウザトラブルシューティング

Datadog がログデータをインポートするためのアクセスを Salesforce Commerce Cloud に許可するよう構成するには、API クライアントを作成する必要があります。そして、その API クライアントを Datadog に登録します。

#### API クライアントの作成
1. [Commerce Cloud のクライアント作成手順][2]の手順に従います。`Token Endpoint Auth Method` フィールドで、`private_key_jwt` を選択します。`Access Token Format` フィールドでは、`JWT` を選択します。**注**: このインテグレーションは、`https://account.demandware.com/` にあるメインのアカウントマネージャーインスタンスを使用してプロビジョニングされた API クライアントのみをサポートします。
2. API クライアント ID とシークレット (ユーザー名とパスワードとも呼ばれます) を控えておいてください。これらは以降の手順で必要になります。
3. Business Manager インターフェイスの **Administration > Organization > WebDAV Client Permissions** の下に、以下の JSON を追加します。適切な場所にクライアント ID を挿入していることを確認してください。

```json
{  
   "clients":[  
      {  
         "client_id":"<your-client-id-here>",
         "permissions":[  
            {  
               "path":"/logs",
               "operations":[  
                  "read"
               ]
            }
         ]
      }
   ]
}
```

#### Datadog インテグレーションを接続する

1. [Salesforce Commerce Cloud インテグレーションタイル][3]の Configuration タブにある **Add New** をクリックします。
2. Business Manager のドメイン (例: `my-0001.sandbox.us02.dx.commercecloud.salesforce.com`) と前のステップで取得した API クライアント ID とシークレットを入力します。
3. 緑色のチェックマークがついた **Save** ボタンをクリックします。

#### 結果

ソース `salesforce.commerce.cloud` 下にタグが表示されるまで 10 分間待機します。

SFCC Log Center は、Datadog とは異なるログデータを表現します。例えば、大きなスタックトレースを持ついくつかのエラーログは、SFCC Log Center では 2 つのログイベントに分割され、Datadog ではスタックトレースの詳細が省略されます。この結果、2 つのシステム間でログイベントの総カウントに不一致が生じます。

## リアルユーザーモニタリング

### データセキュリティ

Salesforce Commerce Cloud インテグレーションには、メトリクスは含まれません。

### ワークフローの自動化

Salesforce Commerce Cloud インテグレーションは、Commerce Cloud インスタンスへの webdav 接続を介してログを収集します。

### ヘルプ

Salesforce Commerce Cloud インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: /ja/logs/
[2]: https://help.salesforce.com/s/articleView?id=cc.b2c_account_manager_add_api_client_id.htm&type=5
[3]: https://app.datadoghq.com/account/settings#integrations/salesforce-commerce-cloud
[4]: https://docs.datadoghq.com/ja/help/