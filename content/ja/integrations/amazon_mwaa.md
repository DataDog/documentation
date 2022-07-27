---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: Amazon MWAA のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: amazon-mwaa
integration_title: Amazon MWAA
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_mwaa
public_title: Datadog-Amazon MWAA インテグレーション
short_description: Amazon MWAA のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

Amazon Managed Workflows for Apache Airflow (Amazon MWAA) は、クラウド上でワークフローを簡単に構築・管理できる Apache Airflow 用のマネージドサービスです。

このインテグレーションを有効にすると、すべての Amazon MWAA メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]の "Limit metric collection by AWS service" という項目で、
   `MWAA` にチェックが入っていることを確認します。
2. [Datadog - Amazon MWAA インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mwaa" >}}


### イベント

Amazon MWAA インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon MWAA インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mwaa
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/