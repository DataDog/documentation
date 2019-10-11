---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon AppSync のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_appsync/'
git_integration_title: amazon_appsync
has_logo: true
integration_title: Amazon AppSync
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_appsync
public_title: Datadog-Amazon AppSync インテグレーション
short_description: Amazon AppSync のキーメトリクスを追跡
version: 1
---
## 概要
Amazon AppSync は、1 つ以上のデータソースのデータに安全にアクセス、操作、結合するための柔軟な API の作成を可能にして、アプリケーション開発を簡略化します。

このインテグレーションを有効にすると、Datadog にすべての AppSync メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`AppSync` をオンにします。

2. [Datadog - Amazon AppSync インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_appsync" >}}


### イベント
Amazon AppSync インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon AppSync インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-appsync
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appsync/amazon_appsync_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}