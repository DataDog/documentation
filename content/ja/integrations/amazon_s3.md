---
aliases:
- /ja/integrations/awss3/
categories:
- cloud
- data store
- aws
- os & system
- log collection
dependencies: []
description: リクエストレイテンシー、種類別リクエスト数、バケットサイズなどを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_s3/
draft: false
git_integration_title: amazon_s3
has_logo: true
integration_id: amazon-s3
integration_title: Amazon S3
integration_version: ''
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

    詳細については、AWS ウェブサイト上の [S3 ポリシー][4]を参照してください。

3. [Datadog - AWS S3 インテグレーション][5]をインストールします。
4. (オプション) **リクエストメトリクス**を収集するには、AWS コンソールで Amazon S3 バケットの [Request metrics ][6] を有効にします。

### ログの収集

#### S3 アクセスログの有効化

1. S3 バケットに移動します。
2. **Properties** をクリックします。
3. Services Access Logging セクションに移動し、**Edit** をクリックします。
4. **Enable** を選択します。
5. ログの送信先となる S3 バケットを選択します。

 詳しくは、[Amazon S3 サーバーのアクセスロギングを有効にする][7]を参照してください。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][8] をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、S3 アクセスログを収集する方法を以下の 2 つから選択します。

    - 自動: Datadog に権限を設定してアクセスを許可した場合、S3 のログは自動的に管理されます。Datadog Forwarder Lambda 関数での自動ログ収集の構成については、[トリガーを自動的にセットアップする][9]を参照してください。
    - 手動: AWS コンソールで、S3 のアクセスログが格納されている S3 バケットにトリガーを追加します。[手動インストール手順](#manual-installation-steps)を参照してください。

#### 手動インストールの手順

1. AWS アカウントで [Datadog Forwarder Lambda 関数][8] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. S3 のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][10]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][11]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_s3" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

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
[4]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_s3
[6]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[7]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#log-collection
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3/amazon_s3_metadata.csv
[13]: https://docs.aws.amazon.com/kms/latest/developerguide/iam-policies.html#iam-policy-example-encrypt-decrypt-one-account