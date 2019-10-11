---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Managed Streaming for Kafka (MSK) のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_msk/'
git_integration_title: amazon_msk
has_logo: true
integration_title: Amazon Managed Streaming for Kafka
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_msk
public_title: Datadog-Amazon Managed Streaming for Kafka インテグレーション
short_description: Amazon MSK のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Managed Streaming for Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを簡単に構築して実行できるフルマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての MSK メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MSK` をオンにします。

2. [Datadog - Amazon MSK インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_msk" >}}


### イベント
Amazon MSK インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon MSK インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-msk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}