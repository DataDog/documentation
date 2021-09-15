---
aliases:
  - /ja/integrations/awss3/
categories:
  - cloud
  - data store
  - aws
  - os & system
  - log collection
ddtype: crawler
dependencies: []
description: リクエストレイテンシー、種類別リクエスト数、バケットサイズなどを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_s3/
draft: false
git_integration_title: amazon_s3
has_logo: true
integration_id: amazon-s3
integration_title: Amazon S3
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_s3
public_title: Datadog-Amazon S3 インテグレーション
short_description: リクエストレイテンシー、種類別リクエスト数、バケットサイズなどを追跡。
version: '1.0'
---
{{< img src="integrations/amazon_s3/s3_db_screenshot.png" alt="S3 ダッシュボード" popup="true">}}

## 概要

Amazon Simple Storage Service (S3) は、可用性の高いスケーラブルなクラウドストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての S3 メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

#### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`S3` をオンにします。
2. Amazon S3 のメトリクスを収集するため、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `s3:ListAllMyBuckets`: 使用できるバケットを一覧表示するために使用されます。
    - `s3:GetBucketTagging`: カスタムバケットタグを取得するために使用されます。

    S3 ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS S3 インテグレーション][5]をインストールします。
4. (オプション) **リクエストメトリクス**を収集するには、AWS コンソールで Amazon S3 バケットの [Request metrics ][6] を有効にします。

### ログの収集

#### S3 アクセスログの有効化

S3 バケットを選択し、Properties タブをクリックします。

{{< img src="integrations/amazon_s3/selecting_s3_bucket.png" alt="S3 バケットの選択" popup="true" style="width:70%;">}}

次に、Server access logging をクリックし、Enable を選択します。

{{< img src="integrations/amazon_s3/server_access_logging.png" alt="S3 サーバーアクセスのロギング" popup="true" style="width:70%;">}}

ログの書き込み先になる S3 バケットを選択します。詳細については、[S3 AWS のドキュメント][7]を参照してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、S3 アクセスログを収集する方法を以下の 2 つから選択します。

    - 自動: 必要なアクセス許可を Datadog に提供していただくことで、Datadog が S3 アクセスログを管理します。[自動ログ収集を構成するには、メイン Amazon Web サービスを参照してください][9]。
    - 手動: AWS コンソールで S3 アクセスログを含む S3 バケットに手動でトリガーを追加します。

#### 手動インストールの手順

1. [Datadog ログコレクション AWS Lambda 関数][10]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで S3 ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   S3 ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][11]に移動し、ログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_s3" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS S3 インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS S3 インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### CloudTrail 暗号化ログ

ご使用の AWS S3 で AWS CloudTrail ログデータが KMS によって暗号化される場合は、`kms:Decrypt` ポリシーを使用して Datadog ロールが CloudTrail ログデータを解読できるようにします。[KMS 暗号化/解読ポリシーの詳細については、こちらを参照してください][13]。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_s3
[6]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[7]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#log-collection
[10]: /ja/integrations/amazon_web_services/#create-a-new-lambda-function
[11]: https://app.datadoghq.com/logs
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3/amazon_s3_metadata.csv
[13]: https://docs.aws.amazon.com/kms/latest/developerguide/iam-policies.html#iam-policy-example-encrypt-decrypt-one-account