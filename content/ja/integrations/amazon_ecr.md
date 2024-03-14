---
categories:
- クラウド
- AWS
dependencies: []
description: Amazon ECR のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_ecr/
draft: false
git_integration_title: amazon_ecr
has_logo: true
integration_id: amazon-ecr
integration_title: Amazon ECR
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ecr
public_title: Datadog-Amazon ECR インテグレーション
short_description: Amazon ECR のキーメトリクスを追跡
version: '1.0'
---

## 概要

Amazon Elastic Container Registry (Amazon ECR) は、開発者が Docker コンテナイメージを簡単に保存、管理、デプロイできるようにするフルマネージドの Docker コンテナレジストリです。

このインテグレーションを有効にすると、Datadog ですべての ECR メトリクスが表示されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `ECR` にチェックが入っていることを
   確認します。
2. [Datadog - ECR インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ecr" >}}


### イベント

ECR インテグレーションには、イベントは含まれません。

### サービスのチェック

ECR インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-ecr
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecr/amazon_ecr_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/