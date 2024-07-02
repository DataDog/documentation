---
"categories":
- aws
- cloud
- data stores
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon FSx metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_fsx/"
"draft": false
"git_integration_title": "amazon_fsx"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon FSx"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_fsx"
"public_title": "Datadog-Amazon FSx Integration"
"short_description": "Track key Amazon FSx metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon FSx is a fully managed service that provides scalable storage for NetApp ONTAP, OpenZFS, Windows File Server, and Lustre file systems.

Enable this integration to see all your FSx metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `FSx` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][3] in order to collect Amazon FSx metrics.

    | AWS Permission                          | Description                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | Used to add FSx custom tags.                                                                                                                                                                                                                    |
    | `fsx:DescribeFileSystems`               | Used to provide storage and throughput capacity.                                                                                                                                                                                    |

2. Install the [Datadog - Amazon FSx integration][4].


### Log collection

#### Audit event logs for FSx for Windows File Server
To track all user accesses of individual files, folders, and file shares, integrate the audit event logs from your FSx for Windows File Server:

1. [Enable the file access auditing feature][5] for your file systems and send the logs to CloudWatch.
2. If you haven’t already, set up the [Datadog log collection AWS Lambda function][4] (version 3.35.0+).
3. Once the Lambda function is installed, manually add a trigger on the `/aws/fsx/windows` CloudWatch log group in the AWS console:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group" popup="true" style="width:70%;">}}
   Select the corresponding CloudWatch Log group, add a filter name (or leave the filter empty), and add the trigger:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger" popup="true" style="width:70%;">}}
4. Go to the [Datadog Log section][6] to start exploring your logs!

**Note**: You can also send these logs to Datadog with [Amazon Data Firehose][7], but you must create a custom log [processor][8] to get the same log parsing functionality and search experience.


#### FSx API activity

Amazon FSx is integrated with AWS CloudTrail which tracks every FSx action taken by a user, role, or AWS service. 
Enable Datadog's [CloudTrail Integration][9] to monitor all FSx API calls in your AWS account.

### メトリクス
{{< get-metrics-from-git "amazon_fsx" >}}


### イベント

The Amazon FSx integration does not include any events.

### サービスチェック

The Amazon FSx integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][11].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-fsx
[5]: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[8]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui
[9]: https://docs.datadoghq.com/integrations/amazon_cloudtrail/#log-collection
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_fsx/amazon_fsx_metadata.csv
[11]: https://docs.datadoghq.com/help/

