---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: Amazon Backup のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: amazon-backup
integration_title: Amazon Backup
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_backup
public_title: Datadog-Amazon Backup インテグレーション
short_description: Amazon Backup のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

AWS Backup は、AWS サービスやハイブリッドワークロードのデータ保護を一元化し、自動化することができます。

このインテグレーションを有効にすると、Backup メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]の **Metric Collection** セクションで、`Backup` をオンにします。
2. [Datadog - Amazon Backup インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_backup" >}}


### イベント

Amazon Backup インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Backup インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/