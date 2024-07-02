---
"aliases":
- "/integrations/awslambda/"
- "/serverless/real-time-enhanced-metrics/"
"categories":
- "aws"
- "cloud"
- "log collection"
- "tracing"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Lambda の実行、エラー、呼び出しの回数などを追跡"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_lambda/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/"
  "tag": "ブログ"
  "text": "Lambda 関数の監視方法"
- "link": "https://www.datadoghq.com/blog/datadog-lambda-layer/"
  "tag": "ブログ"
  "text": "Datadog の Lambda レイヤー: カスタムサーバーレスメトリクスの監視"
- "link": "https://www.datadoghq.com/blog/datadog-lambda-extension/"
  "tag": "ブログ"
  "text": "Datadog の Lambda 関数について"
"git_integration_title": "amazon_lambda"
"has_logo": true
"integration_id": "amazon-lambda"
"integration_title": "AWS Lambda"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_lambda"
"public_title": "Datadog-AWS Lambda Integration"
"short_description": "Track lambda run times, errors, invocation counts, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">This page is limited to documentation for ingesting AWS Lambda metrics from Amazon CloudWatch. See the <a href="/serverless">Datadog Serverless documentation</a> for collecting telemetry directly from your Lambda functions in real time.</div>

## Overview

AWS Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting CloudWatch metrics. This page also describes how to set up custom metrics, logging, and tracing for your Lambda functions.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

#### AWS Lambda metrics

1. In the [AWS integration page][2], ensure that `Lambda` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][3] to collect AWS Lambda metrics. For more information, see the [Lambda policies][4] on the AWS website.

    | AWS Permission     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | List Lambda functions, metadata, and tags.   |
    | `tag:GetResources` | Get custom tags applied to Lambda functions. |
    | `cloudtrail:LookupEvents` | Use CloudTrail History to detect changes to lambda functions |

3. Install the [Datadog - AWS Lambda integration][5].

Once this is completed, view all of your Lambda Functions in the [Datadog Serverless view][6]. This page brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view. Detailed documentation on this feature can be found in the [Datadog Serverless documentation][7].

## 収集データ

<div class="alert alert-warning">When using AWS Lambda extensions, the <em>duration</em> metric reported by AWS includes the <em>post_runtime_extensions_duration</em> consumed by Lambda extensions <a href="https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/">performing activities after the function response is returned</a>. To monitor the actual performance of the function, use <em>duration - post_runtime_extensions_duration</em> or the <a href="https://docs.datadoghq.com/serverless/enhanced_lambda_metrics/">Datadog enhanced metric</a> <em>aws.lambda.enhanced.runtime_duration</em>.</div>

Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to function name, security-groups, and more.

### メトリクス
{{< get-metrics-from-git "amazon_lambda" >}}


### イベント

The AWS Lambda integration collects Lambda deployment events from AWS CloudTrail if [Datadog serverless deployment tracking][9] is enabled.

### サービスチェック

The AWS Lambda integration does not include any service checks.

### Real-time enhanced Lambda metrics

See the [Serverless documentation][10] to learn more.

### Custom metrics

See the [Serverless documentation][11] to learn more.

### Log collection

See the [Serverless documentation][12] to learn more.

### Trace collection

See the [Serverless documentation][13] to learn more.

### Lambda@Edge

Datadog automatically adds tags `at_edge`, `edge_master_name`, and `edge_master_arn` tags on your Lambda metrics to get an aggregated view of your Lambda function metrics and logs as they run in Edge locations.

Distributed tracing is _not_ supported for Lambda@Edge functions.

## Out-of-the-box monitoring

The AWS Lambda integration provides ready-to-use monitoring capabilities to monitor and optimize performance.

- AWS Lambda Dashboard: Gain a comprehensive overview of your Lambda functions using the out-of-the-box [AWS Lambda dashboard][14].
- Recommended Monitors: Enable [Recommended AWS Lambda monitors][15] to proactively detect issues and receive timely alerts.

## トラブルシューティング

Need help? Contact [Datadog support][16].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/integrations/amazon-lambda
[6]: https://app.datadoghq.com/functions
[7]: /serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /serverless/deployment_tracking
[10]: /serverless/enhanced_lambda_metrics/
[11]: /serverless/custom_metrics/#custom-metrics
[12]: /serverless/forwarder/
[13]: /serverless/distributed_tracing/
[14]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[15]: https://app.datadoghq.com/monitors/recommended
[16]: /help/

