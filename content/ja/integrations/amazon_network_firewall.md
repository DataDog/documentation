---
categories:
- cloud
- AWS
dependencies: []
description: Amazon Network Firewall を監視します。
doc_link: https://docs.datadoghq.com/integrations/amazon_network_firewall/
draft: false
git_integration_title: amazon_network_firewall
has_logo: true
integration_id: amazon-network-firewall
integration_title: Amazon Network Firewall
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_network_firewall
public_title: Amazon Network Firewall
short_description: Amazon Network Firewall を監視します。
version: '1.0'
---

## 概要

AWS Network Firewall は、VPC の境界でトラフィックを絞り込むことができるステートフルなサービスです。

このインテグレーションを有効にすると、すべての Amazon Network Firewall メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Network Firewall` が有効になっていることを確認します。

2. [Datadog - AWS Amazon Network Firewall インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Network Firewall から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が  `amazon_network_firewall` に設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、Amazon Network Firewall ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_network_firewall" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Amazon Network Firewall インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Amazon Network Firewall インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-firewall
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_network_firewall/amazon_network_firewall_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/