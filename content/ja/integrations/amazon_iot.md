---
aliases:
  - /ja/integrations/awsiot/
categories:
  - cloud
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon Internet of Things のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_iot/'
git_integration_title: amazon_iot
has_logo: true
integration_title: Amazon Internet of Things
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_iot
public_title: Datadog-Amazon Internet of Things インテグレーション
short_description: Amazon Internet of Things のキーメトリクスを追跡
version: '1.0'
---
## 概要

AWS IoT は、接続されたデバイスが簡単かつセキュアにクラウドアプリケーションや他のデバイスと対話できるようにするマネージド型クラウドプラットフォームです。

このインテグレーションを有効にすると、Datadog にすべての IOT メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`IoT` をオンにします。

2. [Datadog - AWS IoT インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_iot" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS IoT インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS IoT インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_iot
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_iot/amazon_iot_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}