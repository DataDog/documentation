---
aliases:
- /ja/integrations/awses/
categories:
- cloud
- aws
- log collection
dependencies: []
description: Amazon Elasticsearch のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_es/
draft: false
git_integration_title: amazon_es
has_logo: true
integration_id: amazon-es
integration_title: Amazon Elasticsearch
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_es
public_title: Datadog-Amazon Elasticsearch インテグレーション
short_description: Amazon Elasticsearch のキーメトリクスを追跡。
version: '1.0'
---

## 概要

Amazon Elasticsearch Service は、AWS Cloud で Elasticsearch を簡単にデプロイ、操作、およびスケーリングできるマネージド型サービスです。

このインテグレーションを有効にすると、ES クラスターのカスタムタグおよびメトリクスが Datadog に表示されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`ES` をオンにします。
2. Amazon ES のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `es:ListTags`: ES メトリクスにカスタム ES ドメインタグを追加します。
    - `es:ListDomainNames`: 現在のユーザーがアクティブなリージョンで所有しているすべての Amazon ES ドメインを一覧表示します。
    - `es:DescribeElasticsearchDomains`: すべてのドメインのドメイン ID、ドメインサービスエンドポイント、およびドメイン ARN をタグとして収集します。

    詳細については、AWS ウェブサイト上の [ES ポリシー][4]を参照してください。

3. [Datadog - AWS ES インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon Elasticsearch から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_elasticsearch` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Elasticsearch ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_es" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS ES インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS ES インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_es
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_es/amazon_es_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/