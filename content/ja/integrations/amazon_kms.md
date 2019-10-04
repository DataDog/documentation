---
aliases:
  - /ja/integrations/awskms/
categories:
  - cloud
  - security
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon KMS のキー有効期限を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kms/'
git_integration_title: amazon_kms
has_logo: true
integration_title: Amazon Key Management Service
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_kms
public_title: Datadog-Amazon Key Management Service インテグレーション
short_description: Amazon KMS のキー有効期限を追跡
version: '1.0'
---
## 概要

AWS Key Management Service (KMS) は、データの暗号化に使用される暗号化キーの作成や制御を容易にするマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての KMS メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`KMS` をオンにします。

2. [Datadog - AWS KMS インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_kms" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS KMS インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS KMS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_kms
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kms/amazon_kms_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}