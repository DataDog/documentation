---
categories:
- cloud
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key AWS Step Functions metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_step_functions/
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: ''
integration_title: AWS Step Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_step_functions
public_title: Datadog-AWS Step Functions Integration
short_description: Track key AWS Step Functions metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Step Functions enables you to coordinate the components of distributed applications and microservices using visual workflows.

Enable this integration to see all your Step Functions metrics in Datadog.

<div class="alert alert-warning">Native AWS Step Function monitoring in Datadog is available in public beta. To instrument your Step Functions with enhanced metrics and traces, visit the <a href="https://docs.datadoghq.com/serverless/step_functions">Serverless documentation<a></div>

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first. Then, add the following permissions to the policy document for your AWS/Datadog Role:

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Metric collection

1. In the [AWS integration page][2], ensure that `States` is enabled under the `Metric Collection` tab. If your state machines use AWS Lambda, also ensure that `Lambda` is checked.
2. Install the [Datadog - AWS Step Functions integration][3].

#### Augmenting AWS Lambda metrics

If your Step Functions states are Lambda functions, installing this integration adds additional [tags][4] `statemachinename`, `statemachinearn`, and `stepname` to your Lambda metrics. This lets you see which state machines your Lambda functions belong to, and you can visualize this on the [Serverless page][5].

### Enhanced metric collection

Datadog can also generate metrics for your Step Functions to help you track the average or p99 of individual step durations. To collect [enhanced metrics for AWS Step Functions][6], you must use Datadog APM.

### ログ収集

1. Configure AWS Step Functions to [send logs to CloudWatch][7]. **Note**: Use the default CloudWatch log group prefix `/aws/vendedlogs/states` for Datadog to identify the source of the logs and parse them automatically.
2. [Send the logs to Datadog][8].

### トレースの収集

You can enable trace collection in two ways: through Datadog APM for Step Functions, or through AWS X-Ray. 

#### Enable tracing through Datadog APM for AWS Step Functions

<div class="alert alert-warning">
This feature is in public beta.
</div>
To enable distributed tracing for your AWS Step Functions, see the installation instructions in the [Serverless documentation][9].



#### Enable tracing through AWS X-Ray


<div class="alert alert-warning">This option does not collect <a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">enhanced metrics for AWS Step Functions</a>. For these metrics, you must enable tracing through <a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM for AWS Step Functions</a>.</div>

To collect traces from your AWS Step Functions through AWS X-Ray:

1. Enable the [Datadog AWS X-Ray integration][10].
1. AWS コンソールにログインします。
2. **Step Functions** にアクセスします。
3. Step Functions の 1 つを選択して、**Edit** をクリックします。
4. ページの下部にある **Tracing** セクションまでスクロールし、**Enable X-Ray tracing** チェックボックスをオンにします。
5. Recommended: [Install the AWS X-Ray tracing library][11] in your functions for more detailed traces.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_step_functions" >}}


### イベント

AWS Step Functions インテグレーションには、イベントは含まれません。

### サービスチェック

AWS Step Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: /ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /ja/tagging/
[5]: /ja/serverless/
[6]: https://docs.datadoghq.com/ja/serverless/step_functions/enhanced-metrics
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[8]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[9]: https://docs.datadoghq.com/ja/serverless/step_functions
[10]: /ja/tracing/serverless_functions/enable_aws_xray
[11]: /ja/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: /ja/help/