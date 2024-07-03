---
categories:
- aws
- cloud
- cost management
- log collection
- provisioning
custom_kind: インテグレーション
dependencies: []
description: Track key AWS Trusted Advisor metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: Blog
  text: Monitor your AWS Trusted Advisor Service Limit Checks with Datadog
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: ''
integration_title: AWS Trusted Advisor
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Datadog-AWS Trusted Advisor Integration
short_description: Track key AWS Trusted Advisor metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Trusted Advisor is an online tool that provides you real time guidance to help you provision your resources following AWS best practices.

Enable this integration to see all your Trusted Advisor metrics in Datadog.

**Note**: This integration only works for AWS customers with a Business or Enterprise support plan.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the IAM Console, add `support:describe*` and `support:refresh*` as an action in the policy document field. For more information about the AWS Support API, see [Actions, resources, and condition keys for AWS Support][2].
2. In the [AWS integration page][3], ensure that `Trusted Advisor` is enabled under the `Metric Collection` tab.
3. Install the [Datadog - AWS Trusted Advisor integration][4].

### Log collection

#### Enable logging

Configure AWS Trusted Advisor to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_trusted_advisor` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Trusted Advisor logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### イベント

The AWS Trusted Advisor integration does not include any events.

### サービスチェック

The AWS Trusted Advisor integration does not include any service checks.

## Dashboard

To populate data on your AWS Trusted Advisor integration dashboard:

1. Configure support permissions.
    - In the IAM Console, add `support:describe*` and `support: refresh*` as an action in the policy document text box.
1.  Have an upgraded AWS support plan.

The Datadog Trusted Advisor Dashboard needs access to the full set of [AWS Trusted Advisor checks][9]. AWS makes these only available for upgraded AWS support plans. Make sure that your AWS plan includes full access.

## トラブルシューティング

Need help? Contact [Datadog support][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://aws.amazon.com/premiumsupport/trustedadvisor
[10]: https://docs.datadoghq.com/ja/help/