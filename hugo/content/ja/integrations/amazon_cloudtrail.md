---
aliases:
- /ja/integrations/awscloudtrail/
- /ja/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
app_id: amazon-cloudtrail
app_uuid: 9e036ee0-0b9d-4798-af43-a2f160cceec2
assets:
  dashboards:
    aws_cloudtrail: assets/dashboards/aws_cloudtrail.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 83
    source_type_name: Amazon Cloudtrail
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- クラウド
- ログの収集
- security
custom_kind: インテグレーション
dependencies: []
description: 不審な AWS アカウントアクティビティを警告
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_cloudtrail
public_title: AWS CloudTrail
short_description: Amazon CloudTrail は、アカウントで実行された AWS API コールを記録し、ログ ファイルとして配信する
  Web サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon CloudTrail は、アカウントで実行された AWS API コールを記録し、ログ ファイルとして配信する Web
    サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS CloudTrail
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

<div class="alert alert-warning">
AWS CloudTrail for Cloud SIEM を設定する場合は、<a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">AWS Configuration for Cloud SIEM</a> を参照してください。
</div>

AWS CloudTrail は、AWS アカウントの監査証跡を提供します。Datadog は、この監査証跡を読み取ってイベントを作成します。Datadog のイベントエクスプローラーでイベントを検索し、ダッシュボードでの関連付けに使用します。次に CloudTrail イベントの例を示します。

![CloudTrail イベント][1]

ほかの AWS サービスについては、[Amazon Web Services インテグレーション ページ][2] を参照してください。


## セットアップ

### インストール

[Amazon Web Services インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

### イベント収集

**注**: Datadog CloudTrail インテグレーションでは、CloudTrail バケットにイベントを収集する必要があります。

1. AWS CloudTrail イベントを収集するため、Datadog IAM ポリシーに次の権限を追加してください。CloudTrail ポリシーの詳細は、[AWS CloudTrail API リファレンス][4] を参照してください。CloudTrail ではトレイルにアクセスするために S3 権限も一部必要です。**これらは CloudTrail バケットに対してのみ必要です**。Amazon S3 ポリシーの詳細は、[Amazon S3 API リファレンス][5] を参照してください。

    | AWS アクセス許可              | 説明                                                     |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | 証跡と、証跡が格納される S3 バケットをリストします。      |
    | `cloudtrail:GetTrailStatus` | 非アクティブな証跡をスキップします。                                        |
    | `s3:ListBucket`             | CloudTrail バケット内のオブジェクトをリストして、有効な証跡を取得します。|
    | `s3:GetBucketLocation`      | 証跡をダウンロードするバケットのリージョンを取得します。               |
    | `s3:GetObject`              | 有効な証跡を取得します。                                     |
    | `organizations:DescribeOrganization` | アカウントのオーガニゼーションについての情報を返します (org trail に必須)。 |

    このポリシーを Datadog IAM の既存のメインポリシーに追加します。

    ```json
    {
        "Sid": "AWSDatadogPermissionsForCloudtrail",
        "Effect": "Allow",
        "Principal": {
            "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
        },
        "Action": ["s3:ListBucket", "s3:GetBucketLocation", "s3:GetObject"],
        "Resource": [
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
        ]
    }
    ```

    **注**: プリンシパル ARN は、メイン AWS インテグレーションのインストール手順で表示されるものを使用します。CloudTrail リソース ARN について詳しくは、[AWS CloudTrail と IAM の連携の仕組み][6] の Resources セクションを参照してください。既存のポリシーを更新する場合 (新規に作成する場合ではなく) は、`SID` と `Principal` は不要です。

2. [Datadog - AWS CloudTrail インテグレーション][7] をインストールします:
   インテグレーション ページで、Datadog の events explorer におけるデフォルト フィルターである normal priority として表示するイベントの種類を選択します。Amazon Web Services ページで設定したアカウントも、ここに表示されます。ここに記載のないイベントも表示したい場合は、[Datadog サポート][8] にお問い合わせください。

### ログ収集

#### ログの有効化

AWS CloudTrail で [Trail を作成し][9]、ログの書き込み先となる S3 バケットを選択します。

#### ログを Datadog に送信する方法

1. まだ設定していない場合は、AWS アカウントに [Datadog Forwarder Lambda 関数][10] をセットアップしてください。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. CloudTrail のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[Log Explorer][11] に移動して、ログの調査を開始します。

AWS サービス ログの収集について詳しくは、[Datadog Lambda 関数で AWS サービス ログを送信する][12] を参照してください。

## 収集データ

### メトリクス

AWS CloudTrail インテグレーションには、メトリクスは含まれません。

### イベント

AWS CloudTrail インテグレーションは、AWS CloudTrail の監査トレイルをもとに多種多様なイベントを生成します。すべてのイベントには、Datadog の [events explorer][13] で `#cloudtrail` タグが付与されます。優先度はインテグレーション設定で変更できます。

優先度を標準に設定された CloudTrail イベント (デフォルトのフィルターのイベントエクスプローラーに表示されます):

* apigateway
* オートスケーリング
* CloudFormation
* cloudfront
* cloudsearch
* cloudtrail
* codedeploy
* codepipeline
* config
* datapipeline
* ds
* ec2
* ecs
* elasticache
* elasticbeanstalk
* elasticfilesystem
* elasticloadbalancing
* elasticmapreduce
* iam
* kinesis
* Lambda
* モニタリング
* opsworks
* rds
* redshift
* route53
* s3
* ses
* signin
* ssm

### サービスチェック

AWS CloudTrail インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### CloudTrail タイルがないか、アカウントがリストされません

まずは [Amazon Web Services][2] インテグレーションを設定してください。その後、CloudTrail タイルを設定できます。

[1]: images/cloudtrail_event.png
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[5]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[7]: https://app.datadoghq.com/integrations/amazon-cloudtrail
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[10]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[11]: https://app.datadoghq.com/logs
[12]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/ja/events/