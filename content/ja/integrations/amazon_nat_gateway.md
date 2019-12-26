---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon NAT Gateway のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_nat_gateway/'
git_integration_title: amazon_nat_gateway
has_logo: true
integration_title: Amazon NAT Gateway
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_nat_gateway
public_title: Datadog-Amazon NAT Gateway インテグレーション
short_description: Amazon NAT Gateway のキーメトリクスを追跡
version: 1
---
## 概要
Amazon NAT Gateway を使用すると、プライベートサブネットのインスタンスからインターネットに接続できても、インターネットからはこれらのインスタンスとの接続を開始できないようにすることができます。

このインテグレーションを有効にすると、Datadog にすべての NAT Gateway メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`NATGateway` をオンにします。

2. [Datadog - Amazon NAT Gateway インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_nat_gateway" >}}


### イベント
Amazon NAT Gateway インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon NAT Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-nat-gateway
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_nat_gateway/amazon_nat_gateway_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}