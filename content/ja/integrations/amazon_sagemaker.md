---
"categories":
- automation
- aws
- cloud
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon SageMaker metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_sagemaker/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/"
  "tag": Blog
  "text": "CloudHealth + Datadog: Effectively manage your cloud assets"
"git_integration_title": "amazon_sagemaker"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon SageMaker"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_sagemaker"
"public_title": "Datadog-Amazon SageMaker Integration"
"short_description": "Track key Amazon SageMaker metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon SageMaker is a fully managed machine learning service. With Amazon SageMaker, data scientists and developers can build and train machine learning models, and then directly deploy them into a production-ready hosted environment.

Enable this integration to see all your SageMaker metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `SageMaker` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon SageMaker integration][3].

### Log collection

#### Enable logging

Configure Amazon SageMaker to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_sagemaker` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog log collection AWS Lambda function][4].
2. Once the lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon SageMaker logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sagemaker" >}}


### イベント

The Amazon SageMaker integration does not include any events.

### サービスチェック

The Amazon SageMaker integration does not include any service checks.

## Out-of-the-box monitoring

Datadog provides out-of-the-box dashboards for your SageMaker endpoints and jobs.

### SageMaker endpoints

Use the [SageMaker endpoints dashboard][8] to help you immediately start monitoring the health and performance of your SageMaker endpoints with no additional configuration. Determine which endpoints have errors, higher-than-expected latency, or traffic spikes. Review and correct your instance type and scaling policy selections using CPU, GPU, memory, and disk utilization metrics.

{{< img src="integrations/amazon_sagemaker/sagemaker_endpoints_2.png" alt="The out of the box SageMaker endpoints dashboard" style="width:80%;">}}

### SageMaker jobs

You can use the [SageMaker jobs dashboard][9] to gain insight into the resource utilization (for example, finding CPU, GPU, and storage bottlenecks) of your training, processing, or transform jobs. Use this information to optimize your compute instances.

{{< img src="integrations/amazon_sagemaker/sagemaker_jobs_2.png" alt="The out of the box SageMaker jobs dashboard" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

## トラブルシューティング

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-sagemaker
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#log-collection
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sagemaker/amazon_sagemaker_metadata.csv
[8]: https://app.datadoghq.com/dash/integration/31076/amazon-sagemaker-endpoints
[9]: https://app.datadoghq.com/dash/integration/31077/amazon-sagemaker-jobs
[10]: https://docs.datadoghq.com/help/

