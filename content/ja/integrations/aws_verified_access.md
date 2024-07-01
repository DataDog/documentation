---
"aliases":
- /integrations/amazon_verified_access
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Collect AWS Verified Access logs."
"doc_link": "https://docs.datadoghq.com/integrations/aws_verified_access/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/verified-access-datadog/"
  "tag": Blog
  "text": Enhance corporate application security with AWS Verified Access and Datadog
"git_integration_title": "aws_verified_access"
"has_logo": true
"integration_id": "amazon-verified-access"
"integration_title": "AWS Verified Access"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "aws_verified_access"
"public_title": "Datadog-AWS Verified Access Integration"
"short_description": "Collect AWS Verified Access logs."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

With AWS Verified Access, you can provide secure access to your corporate applications without requiring the use of a virtual private network (VPN). Verified Access evaluates each application request and helps ensure that users can access each application only when they meet the specified security requirements.


## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Log collection

#### Enable Verified Access logs

1. Open the Amazon VPC console
2. In the navigation pane, choose **Verified Access instances**.
3. Select the Verified Acccess instance.
4. On the Verified Access instance logging configuration tab, choose **Modify Verified Access instance logging configuration**
5. Turn on **Deliver to Amazon Cloudwatch Logs**. Choose the destination log group. 

**Note**: Include the string `verified-access` in the log group name to enable automatic log parsing.

For more information, see [Enable Verified Access logs][2].

#### Send logs to Datadog

**Note**: If you are using Datadog's [Amazon Security Lake integration][3], you can send Verified Access logs through that integration instead of following the steps below.

1. If you haven't already, set up the [Datadog Forwarder Lambda function][4] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**.
3. Select the **CloudWatch Logs** trigger for the Trigger Configuration.
4. Select the log group that contains your Verified Access logs.
5. Add a Filter Name.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][5] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda function][6].

## Data collected

### Metrics

The AWS Verified Access integration does not include any metric collection.

### Events

The AWS Verified Access integration does not include any events.

### Logs

The AWS Verified Access integration includes [Verified Access logs][7]. 

### Service Checks

The AWS Verified Access integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs-enable.html
[3]: https://docs.datadoghq.com/integrations/amazon_security_lake/
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs.html
[8]: https://docs.datadoghq.com/help/

