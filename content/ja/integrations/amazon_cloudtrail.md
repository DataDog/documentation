---
aliases:
- /ja/integrations/awscloudtrail/
- /ja/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
categories:
- aws
- cloud
- log collection
- security
custom_kind: インテグレーション
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
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Datadog-AWS CloudTrail Integration
short_description: Alert on suspicious AWS account activity.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

<div class="alert alert-warning">
See <a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">AWS Configuration for Cloud SIEM</a> if you are setting up AWS CloudTrail for Cloud SIEM.
</div>

AWS CloudTrail provides an audit trail for your AWS account. Datadog reads this audit trail and creates events. Search your Datadog events explorer for these events or use them for correlation on your dashboards. Here is an example of a CloudTrail event:

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="cloudtrail event" popup="true">}}

For information on other AWS services, see the [Amazon Web Services integration page][1]


## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Event collection

**Note**: The Datadog CloudTrail integration requires events to be collected in a CloudTrail bucket.

1. Add the following permissions to your Datadog IAM policy to collect AWS CloudTrail events. For more information on CloudTrail policies, see the [AWS CloudTrail API Reference][3]. CloudTrail also requires some S3 permissions to access the trails. **These are required on the CloudTrail bucket only**. For more information on Amazon S3 policies, see the [Amazon S3 API Reference][4].

    | AWS Permission              | Description                                                     |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | Lists trails and the s3 bucket the trails are stored in.        |
    | `cloudtrail:GetTrailStatus` | Skips inactive trails.                                          |
    | `s3:ListBucket`             | Lists objects in the CloudTrail bucket to get available trails. |
    | `s3:GetBucketLocation`      | Obtains the bucket's region to download trails.                 |
    | `s3:GetObject`              | Fetches available trails.                                       |
    | `organizations:DescribeOrganization` | Returns information about an account's organization (required for org trails). |

    Add this policy to your existing main Datadog IAM policy:

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

    **Note**: The principal ARN is the one listed during the installation process for the main AWS integration. See the Resources section of [How AWS CloudTrail works with IAM][5] for more information on CloudTrail resource ARNs. If you are updating your policy (as opposed to adding a new one), you don't need the `SID` or the `Principal`.

2. Install the [Datadog - AWS CloudTrail integration][6]:
   On the integration page, choose the types of events to show as normal priority (the default filter) in the Datadog events explorer. The accounts you configured in the Amazon Web Services page are also shown here. If you would like to see other events that are not mentioned here, contact [Datadog support][7].

### Log collection

#### Enable logging

In AWS CloudTrail, [create a Trail][8] and select an S3 bucket to write the logs in.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][9] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **S3** trigger for the Trigger Configuration.
4. Select the S3 bucket that contains your CloudTrail logs.
5. Leave the event type as `All object create events`.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][10] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][11].

## 収集データ

### メトリクス

The AWS CloudTrail integration does not include any metrics.

### イベント

The AWS CloudTrail integration creates many different events based on the AWS CloudTrail audit trail. All events are tagged with `#cloudtrail` in your Datadog [events explorer][12]. You can set their priority in the integration configuration.

CloudTrail events that can be set to a normal priority (they appear in the Event Explorer under the default filter):

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

### サービスチェック

The AWS CloudTrail integration does not include any service checks.

## トラブルシューティング

### The CloudTrail tile is missing or there are no accounts listed

You need to first configure the [Amazon Web Services][13] integration. Then the CloudTrail tile can be configured.

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