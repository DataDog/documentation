---
aliases:
  - /ja/integrations/awsebs/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: スナップショットの古さ、IOPS、読み取り/書き込み回数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ebs/'
git_integration_title: amazon_ebs
has_logo: true
integration_title: Amazon Elastic Block Store
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-Amazon Elastic Block Store インテグレーション
short_description: スナップショットの古さ、IOPS、読み取り/書き込み回数などを追跡
version: '1.0'
---
## 概要

Amazon EBS は、AWS Cloud 内の Amazon EC2 インスタンスと共に使用される永続的ブロックストレージボリュームです。

このインテグレーションを有効にすると、Datadog にすべての EBS メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EBS` をオンにします。

2. [Datadog - AWS EBS インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_ebs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS EBS インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS EBS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

* [Amazon EBS 監視のキーメトリクス][6]  
* [Amazon EBS メトリクスの収集][7]  
* [Datadog を使用した Amazon EBS ボリュームの監視][8]  

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ebs
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[5]: https://docs.datadoghq.com/ja/help
[6]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[7]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[8]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog


{{< get-dependencies >}}