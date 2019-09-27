---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Cognito のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cognito/'
git_integration_title: amazon_cognito
has_logo: true
integration_title: Amazon Cognito
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_cognito
public_title: Datadog-Amazon Cognito インテグレーション
short_description: Amazon Cognito のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Cognito は、ユーザーの一意 ID の作成、ID プロバイダーによるユーザー ID の認証、AWS Cloud へのモバイルユーザーデータの保存を行うことができるサービスです。

このインテグレーションを有効にすると、Datadog にすべての Cognito メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Cognito` をオンにします。

2. [Datadog - Amazon Cognito インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_cognito" >}}


### イベント
Amazon Cognito インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Cognito インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-cognito
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}