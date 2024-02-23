---
aliases:
- /ja/integrations/awscloudtrail/
- /ja/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
categories:
- aws
- cloud
- log collection
- security
dependencies: []
description: 不審な AWS アカウントアクティビティを警告。
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Datadog-AWS CloudTrail インテグレーション
short_description: 不審な AWS アカウントアクティビティを警告。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

<div class="alert alert-warning">
AWS CloudTrail for Cloud SIEM を設定する場合は、<a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">AWS Configuration for Cloud SIEM</a> を参照してください。
</div>

AWS CloudTrail は、AWS アカウントの監査証跡を提供します。Datadog は、この監査証跡を読み取ってイベントを作成します。Datadog のイベントエクスプローラーでイベントを検索し、ダッシュボードでの関連付けに使用します。次に CloudTrail イベントの例を示します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="Cloudtrail イベント" popup="true">}}

他の AWS サービスについては、[Amazon Web Services インテグレーションのページ][1]を参照してください


## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### イベント収集

**注**: Datadog CloudTrail インテグレーションでは、CloudTrail バケットにイベントを収集する必要があります。

1. AWS Cloudtrail のイベントを収集するには、次のアクセス許可を Datadog IAM ポリシーに追加します。CloudTrail ポリシーの詳細については、[AWS CloudTrail API リファレンス][3]を参照してください。CloudTrail の証跡にアクセスするには、S3 のアクセス許可もいくつか必要です。**このアクセス許可は CloudTrail バケットでのみ必要です**。Amazon S3 ポリシーの詳細については、[Amazon S3 API リファレンス][4]を参照してください。

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

    **注**: プリンシパル ARN は、[メイン AWS インテグレーションのインストールプロセス中][5]にリストされる ARN です。CloudTrail リソース ARN の詳細については、[AWS CloudTrail が IAM と連携する方法][5]の Resources セクションを参照してください。(新しいポリシーを追加するのではなく) ポリシーを更新する場合、`SID` または `Principal` は必要ありません。

2. [Datadog - AWS CloudTrail インテグレーション][6]をインストールします。
   インテグレーションページで、Datadog のイベントエクスプローラーに標準の優先度 (デフォルトのフィルター) で表示するイベントのタイプを選択します。Amazon Web Services ページで構成したアカウントもここに表示されます。ここに記載されていないイベントの確認を希望する場合は、[Datadog のサポートチーム][7]までお問い合わせください。

### 収集データ

#### ログの有効化

AWS CloudTrail で [Trail の作成][8]を行い、ログを書き込む S3 バケットを選択します。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][9]をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. CloudTrail のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][10]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][11]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

AWS CloudTrail インテグレーションには、メトリクスは含まれません。

### ヘルプ

AWS CloudTrail インテグレーションは、AWS CloudTrail の監査証跡に基づいて多種多様なイベントを作成します。すべてのイベントは、Datadog の[イベントエクスプローラー][12]で `#cloudtrail` でタグ付けされます。インテグレーションコンフィギュレーションで、優先度を設定できます。

優先度を標準に設定された CloudTrail イベント (デフォルトのフィルターのイベントエクスプローラーに表示されます):

* apigateway 
* autoscaling 
* cloudformation 
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
* lambda 
* monitoring 
* opsworks 
* rds 
* redshift 
* route53 
* s3 
* ses 
* signin 
* ssm

### ヘルプ

AWS CloudTrail インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

### CloudTrail タイルがないか、アカウントがリストされません

まず [Amazon Web Services][13] インテグレーションを構成する必要があります。その後、CloudTrail タイルを構成することができます。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[5]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[6]: https://app.datadoghq.com/integrations/amazon-cloudtrail
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[9]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://docs.datadoghq.com/ja/events/
[13]: https://docs.datadoghq.com/ja/integrations/aws/