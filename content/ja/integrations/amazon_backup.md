---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: AWS Backup のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: ''
integration_title: AWS Backup
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_backup
public_title: Datadog-AWS Backup インテグレーション
short_description: AWS Backup のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Backup は、AWS サービスやハイブリッドワークロードのデータ保護を一元化し、自動化することができます。

このインテグレーションを有効にすると、Backup メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Backup` が有効になっていることを確認します。
2. [Datadog - AWS Backup インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_backup" >}}


### ヘルプ

AWS Backup インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Backup インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/