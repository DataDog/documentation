---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon DMS のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_dms/'
git_integration_title: amazon_dms
has_logo: true
integration_title: Amazon DMS
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_dms
public_title: Datadog-Amazon DMS インテグレーション
short_description: Amazon DMS のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Database Migration Service (DMS) は、リレーショナルデータベース、データウェアハウス、NoSQL データベースなどの各種データストアの移行を簡単に行えるクラウドサービスです。

このインテグレーションを有効にすると、Datadog にすべての DMS メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Database Migration Service` をオンにします。

2. [Datadog - Amazon DMS インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_dms" >}}


### イベント
Amazon DMS インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon DMS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-dms
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dms/amazon_dms_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}