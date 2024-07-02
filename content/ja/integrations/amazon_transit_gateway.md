---
"categories":
- aws
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key AWS Transit Gateway metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_transit_gateway/"
"draft": false
"git_integration_title": "amazon_transit_gateway"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Transit Gateway"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_transit_gateway"
"public_title": "Datadog-AWS Transit Gateway Integration"
"short_description": "Track key AWS Transit Gateway metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Use AWS Transit Gateway to interconnect your virtual private clouds (VPCs) and on-premises networks.

Enable this integration to see all your Transit Gateway metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric & Resource collection

1. In the [AWS integration page][2], ensure that `TransitGateway` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][3] to collect AWS Transit Gateway resources.

  | AWS Permission                                | Description                                                                                          |
  | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | `ec2:DescribeTransitGateways`                 | Grants permission to describe one or more transit gateways                                           |
  | `ec2:DescribeTransitGatewayVPCAttachments`    | Grants permission to describe one or more VPC attachments on a transit gateway.                      |
  | `ec2:DescribeTransitGatewayRouteTables`       | Grants permission to describe one or more transit gateway route tables.                              |
  | `ec2:GetTransitGatewayPrefixListReferences`   | Grants permission to get information about prefix list references for a transit gateway route table. |
  | `ec2:SearchTransitGatewayRoutes`              | Grants permission to search for routes in a transit gateway route table.                             |

3. Install the [Datadog - AWS Transit Gateway integration][4].


### Log collection

#### Enable Transit Gateway flow log logging

Transit Gateway flow logs can be sent to an S3 bucket or a CloudWatch log group. 

1. In the AWS console, go to the Transit Gateway you want to monitor.
2. Go to the **Flow logs** tab. 
3. Click **Create flow log**.
4. Select the S3 bucket or the CloudWatch log group to send the logs to.

**Note**: Include the string `transit-gateway` in the S3 bucket name to enable automatic log parsing.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][5] in your AWS account.
2. Navigate to the Datadog Forwarder Lambda function in your AWS account. In the Function Overview section, click **Add Trigger**. 
3. Select the **S3** or **CloudWatch Logs** trigger for the Trigger Configuration.
4. Select the S3 bucket or CloudWatch log group that contains your Transit Gateway logs.
5. For S3, leave the event type as `All object create events`.
6. Click **Add** to add the trigger to your Lambda.

After a few minutes, Transit Gateway flow logs appear in your [Log Explorer][6].

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][7].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_transit_gateway" >}}


### イベント

The AWS Transit Gateway integration does not include any events.

### サービスチェック

The AWS Transit Gateway integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-transit-gateway
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/logs/explorer/
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_transit_gateway/amazon_transit_gateway_metadata.csv
[9]: https://docs.datadoghq.com/help/

