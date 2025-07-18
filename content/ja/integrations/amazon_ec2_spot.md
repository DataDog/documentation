---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: Amazon EC2 スポットのキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2_spot/
draft: false
git_integration_title: amazon_ec2_spot
has_logo: true
integration_id: amazon-ec2-spot
integration_title: Amazon EC2 スポット
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ec2_spot
public_title: Datadog-Amazon EC2 スポットインテグレーション
short_description: Amazon EC2 スポットのキーメトリクスを追跡
version: '1.0'
---

## 概要

Amazon EC2 スポットインスタンスを使用すると、AWS クラウド内の使用されていない EC2 容量を活用できます。

このインテグレーションを有効にすると、Datadog にすべての EC2 Spot [Fleet メトリクス][1]を表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `EC2 Spot` が有効になっていることを確認します。
2. [Datadog - Amazon EC2 Spot インテグレーション][4]をインストールします。

### ログの収集

[Datadog Agent][5] または [Rsyslog][6] のような別のログシッパーを使用して、Datadog にログを送信します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### イベント

Amazon EC2 Spot インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon EC2 Spot インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-ec2-spot
[5]: https://docs.datadoghq.com/ja/agent/logs/
[6]: https://docs.datadoghq.com/ja/integrations/rsyslog/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/