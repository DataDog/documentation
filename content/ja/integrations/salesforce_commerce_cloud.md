---
categories:
- ログの収集
dependencies: []
description: Salesforce Commerce Cloud
doc_link: https://docs.datadoghq.com/integrations/salesforce_commerce_cloud/
draft: false
git_integration_title: salesforce_commerce_cloud
has_logo: false
integration_id: ''
integration_title: Salesforce Commerce Cloud
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: salesforce_commerce_cloud
public_title: Salesforce Commerce Cloud
short_description: Salesforce Commerce Cloud からログを収集します。
team: web-integrations
version: '1.0'
---

## 概要

Salesforce Commerce Cloud は、マルチテナント型のクラウドベースのコマースプラットフォームです。Salesforce Commerce Cloud と Datadog をインテグレーションし、[Datadog Logs][1] を使ってログを表示・パースします。

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

Datadog がログデータをインポートするためのアクセスを Salesforce Commerce Cloud に許可するよう構成するには、API クライアントを作成する必要があります。そして、その API クライアントを Datadog に登録します。

#### API クライアントの作成
1. [Commerce Cloud のクライアント作成手順][2]の手順に従います。`Token Endpoint Auth Method` フィールドで、`private_key_jwt` を選択します。`Access Token Format` フィールドでは、`UUID` を選択します。**注**: このインテグレーションは、`https://account.demandware.com/` にあるメインのアカウントマネージャーインスタンスを使用してプロビジョニングされた API クライアントのみをサポートします。
2. API クライアント ID とシークレットを控えておいてください。これらは以降の手順で必要になります。
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

## 収集データ

### メトリクス

Salesforce Commerce Cloud インテグレーションには、メトリクスは含まれません。

### ログ管理

Salesforce Commerce Cloud インテグレーションは、Commerce Cloud インスタンスへの webdav 接続を介してログを収集します。

### サービスのチェック

Salesforce Commerce Cloud インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: /ja/logs/
[2]: https://documentation.b2c.commercecloud.salesforce.com/DOC3/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Faccount_manager%2Fb2c_account_manager_overview.html
[3]: https://app.datadoghq.com/account/settings#integrations/salesforce-commerce-cloud
[4]: https://docs.datadoghq.com/ja/help/