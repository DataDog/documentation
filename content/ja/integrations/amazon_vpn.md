---
categories:
- AWS
- クラウド
- ログの収集
- ネットワーク
dependencies: []
description: AWS VPN のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_vpn/
draft: false
git_integration_title: amazon_vpn
has_logo: true
integration_id: ''
integration_title: AWS VPN
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_vpn
public_title: Datadog-AWS VPN インテグレーション
short_description: AWS VPN のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS VPN を使用すると、ユーザーネットワークまたはデバイスから AWS グローバルネットワークへの安全なプライベートトンネルを確立できます。

このインテグレーションを有効にすると、Datadog にすべての VPN メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `VPN` が有効になっていることを確認します。
2. [Datadog - AWS VPN インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

AWS VPN から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_vpn` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS VPN ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_vpn" >}}


### ヘルプ

AWS VPN インテグレーションには、イベントは含まれません。

### ヘルプ

AWS VPN インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-vpn
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpn/amazon_vpn_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/