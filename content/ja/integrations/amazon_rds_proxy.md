---
categories:
- AWS
- クラウド
- data stores
- ログの収集
dependencies: []
description: Amazon RDS Proxy のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
draft: false
git_integration_title: amazon_rds_proxy
has_logo: true
integration_id: ''
integration_title: Amazon RDS Proxy
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_rds_proxy
public_title: Datadog-Amazon RDS Proxy インテグレーション
short_description: Amazon RDS Proxy のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon RDS Proxy は、Amazon Relational Database Service (RDS) 用のフルマネージドで高可用性のデータベースプロキシで、アプリケーションの拡張性、データベース障害への対応力、安全性を向上させるものです。

このインテグレーションを有効にすると、Datadog にすべての RDS Proxy メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

まだの方は、[Amazon Web Services とのインテグレーション][1]を最初に設定してください。
また、[Amazon RDS とのインテグレーション][2]の有効化も必要です。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `RDS Proxy` が有効になっていることを確認します。
2. [Datadog - Amazon RDS Proxy インテグレーション][4]をインストールします。

### 収集データ

#### ログの有効化

RDS Proxy を作成する際に、詳細設定でロギングを有効にすることができます。[RDS Proxy を始める][5]の手順に従って、RDS Proxy のログを Cloudwatch に送信するようにします。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数をインストールしたら、RDS Proxy ログを含む CloudWatch ロググループにトリガーを手動で追加します。対応する CloudWatch ロググループを選択し、フィルター名 (オプション) を追加して、トリガーを追加します。

完了したら、[Datadog ログエクスプローラー][7]でログを解析します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_rds_proxy" >}}


### ヘルプ

Amazon RDS Proxy インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon RDS Proxy インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-rds-proxy
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html#rds-proxy-creating
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds_proxy/amazon_rds_proxy_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/