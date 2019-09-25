---
aliases:
  - /ja/integrations/awsefs/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon Elastic Filesystem のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_efs/'
git_integration_title: amazon_efs
has_logo: true
integration_title: Amazon Elastic File System
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_efs
public_title: Datadog-Amazon Elastic File System インテグレーション
short_description: Amazon Elastic Filesystem のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon EFS は、AWS クラウド内の Amazon EC2 インスタンスと共に使用されるシンプルでスケーラブルなファイルストレージです。

このインテグレーションを有効にすると、Datadog にすべての EFS メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EFS` をオンにします。

2. Amazon EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    * `elasticfilesystem:DescribeTags`: ファイルシステムに適用されたカスタムタグを取得します。
    * `elasticfilesystem:DescribeFileSystems`: アクティブなファイルシステムをリストします。

    EFS ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS EFS インテグレーション][5]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_efs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Elastic File System インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Elastic File System インテグレーションには、サービスのチェックは含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_efs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[7]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}