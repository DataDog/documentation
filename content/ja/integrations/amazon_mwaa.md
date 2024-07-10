---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: Amazon Managed Workflows for Apache Airflow (MWAA) のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: ''
integration_title: Amazon Managed Workflows for Apache Airflow (MWAA)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mwaa
public_title: Datadog-Amazon Managed Workflows for Apache Airflow (MWAA) インテグレーション
short_description: Amazon Managed Workflows for Apache Airflow (MWAA) のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Managed Workflows for Apache Airflow (MWAA) は、クラウド上でワークフローを簡単に構築・管理できる Apache Airflow 用のマネージドサービスです。

このインテグレーションを有効にすると、すべての Amazon MWAA メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MWAA` が有効になっていることを確認します。
2. [Datadog - Amazon Managed Workflows for Apache Airflow (MWAA) インテグレーション][3] をインストールします。

### 収集データ

1. AWS MWAA が [CloudWatch にログを送信][4]するよう構成します。
2. [Datadog にログを送信します][5]。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_mwaa" >}}


### ヘルプ

Amazon Managed Workflows for Apache Airflow (MWAA) インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Managed Workflows for Apache Airflow (MWAA) インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mwaa
[4]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[5]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/