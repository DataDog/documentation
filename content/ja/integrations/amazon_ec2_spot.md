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
integration_id: ''
integration_title: Amazon EC2 スポット
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ec2_spot
public_title: Datadog-Amazon EC2 スポットインテグレーション
short_description: Amazon EC2 スポットのキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon EC2 スポットインスタンスを使用すると、AWS クラウド内の使用されていない EC2 容量を活用できます。

このインテグレーションを有効にすると、Datadog にすべての EC2 Spot [Fleet メトリクス][1]を表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `EC2 Spot` が有効になっていることを確認します。
2. [Datadog - Amazon EC2 Spot インテグレーション][4]をインストールします。

### 収集データ

[Datadog Agent][5] または [Rsyslog][6] のような別のログシッパーを使用して、Datadog にログを送信します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### ヘルプ

Amazon EC2 Spot インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon EC2 Spot インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-ec2-spot
[5]: https://docs.datadoghq.com/ja/agent/logs/
[6]: https://docs.datadoghq.com/ja/integrations/rsyslog/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/