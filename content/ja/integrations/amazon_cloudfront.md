---
aliases:
- /ja/integrations/awscloudfront/
categories:
- aws
- caching
- cloud
- log collection
- network
custom_kind: インテグレーション
dependencies: []
description: エラー率、リクエストカウント数、ダウンロードバイト数、アップロードバイト数を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
draft: false
git_integration_title: amazon_cloudfront
has_logo: true
integration_id: ''
integration_title: Amazon CloudFront
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Datadog-Amazon CloudFront Integration
short_description: Track error rates, request counts, and bytes downloaded and uploaded.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon CloudFront is a global content delivery network (CDN) service that accelerates delivery of your websites, APIs, video content or other web assets.

Enable this integration to see in Datadog all your CloudFront metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `CloudFront` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon CloudFront integration][3].
3. Optional: Enable [Additional CloudFront Distribution Metrics][4] for more visibility into the performance of your CloudFront traffic.

### Log collection

{{< tabs >}}
{{% tab "Standard Logs" %}}

#### Enable logging

When you enable CloudFront logging for a distribution, specify the Amazon S3 bucket that you want CloudFront to store log files in. If you’re using Amazon S3 as your origin, Datadog recommends that you do not use the same bucket for your log files; using a separate bucket simplifies maintenance.

**Note**: Datadog recommends storing the log files for multiple distributions in the same bucket so that the log forwarder only has to subscribe to one bucket.

<div class="alert alert-info">
To automatically categorize logs with the CloudFront source, specify <code>cloudfront</code> as the prefix for the file names when enabling logging. Logs will otherwise be categorized as <code>s3</code>.
</div>

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][1] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **S3** trigger for the Trigger Configuration.
4. Select the S3 bucket that contains your CloudFront logs.
5. Leave the event type as `All object create events`.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][2] to start exploring your logs. 

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][3].

[1]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
{{% /tab %}}
{{% tab "Real-Time Logs" %}}

#### Enable logging

##### Create a specific configuration

When creating a real-time log configuration, you can specify which log fields you want to receive. By default, all of the [available fields][1] are selected.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_3.png" alt="CloudFront logging 3" popup="true" style="width:70%;">}}

Datadog recommends that you keep this default configuration and add the following custom parsing rule to automatically process logs with all fields enabled.

Navigate to the [Pipelines page][1], search for Amazon CloudFront, [create or edit a grok parser processor][2], and add the following helper rules under *Advanced Settings*:

{{< code-block lang="java" >}}
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
{{< /code-block >}}

#### Send logs to Datadog

Real-time logs are delivered to the Kinesis Data Stream of your choice and can be directly forwarded to Datadog with the [Amazon Data Firehose integration][3].

You can also configure a consumer, such as Amazon Data Firehose, to send real-time logs to an S3 bucket and use the [Datadog Lambda forwarder][4] to ship logs to Datadog.


[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#grok-parser
[3]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[4]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cloudfront" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to `aws_account`, `region`, and `distributionid`.

### イベント

The Amazon CloudFront integration does not include any events.

### サービスチェック

The Amazon CloudFront integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/