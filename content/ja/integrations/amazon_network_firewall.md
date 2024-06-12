---
categories:
- cloud
- AWS
dependencies: []
description: AWS Network Firewall を監視します。
doc_link: https://docs.datadoghq.com/integrations/amazon_network_firewall/
draft: false
git_integration_title: amazon_network_firewall
has_logo: true
integration_id: ''
integration_title: AWS Network Firewall
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_network_firewall
public_title: Datadog-AWS Network Firewall
short_description: AWS Network Firewall を監視します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Network Firewall は、VPC の境界でトラフィックを絞り込むことができるステートフルなサービスです。

このインテグレーションを有効にすると、すべての AWS Network Firewall メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Network Firewall` が有効になっていることを確認します。

2. [Datadog - AWS Network Firewall インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

AWS Network Firewall から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が  `amazon_network_firewall` に設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、AWS Network Firewall ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_network_firewall" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

AWS Network Firewall インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Network Firewall インテグレーションには、サービスチェックは含まれません。

## ヘルプ

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