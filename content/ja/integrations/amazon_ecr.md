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
integration_id: ''
integration_title: Amazon ECR
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ecr
public_title: Datadog-Amazon ECR インテグレーション
short_description: Amazon ECR のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Elastic Container Registry (Amazon ECR) は、開発者が Docker コンテナイメージを簡単に保存、管理、デプロイできるようにするフルマネージドの Docker コンテナレジストリです。

このインテグレーションを有効にすると、Datadog ですべての ECR メトリクスが表示されます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `ECR` にチェックが入っていることを
   確認します。
2. [Datadog - ECR インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ecr" >}}


### ヘルプ

ECR インテグレーションには、イベントは含まれません。

### ヘルプ

ECR インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ecr
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecr/amazon_ecr_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/