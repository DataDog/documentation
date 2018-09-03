---
categories:
- cloud
- aws
- log collection
ddtype: crawler
description: Gather your AWS VPC logs.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
has_logo: false
integration_title: AWS VPC
is_public: true
kind: integration
name: amazon_vpc
public_title: Datadog-AWS VPC Integration
short_description: Gather your AWS VPC logs.
---

### Overview

Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. VPC Flow Logs is a feature that allows you to capture information about the IP traffic going to and from network interfaces in your VPC.

### Setup

#### Log Collection

##### Enable VPC Flow log logging

VPC flow logs can be sent to an S3 bucket or a Cloudwatch Log group. Click on the VPC you want to monitor in the list, then choose `Create Flow logs` in the Flow Logs tab at the bottom of the screen:

{{< img src="integrations/amazon_vpc/flow_logs.png" alt="flow logs" responsive="true" style="width:75%;" >}}

Select the `All` filter to get both accepted and rejected connections, then select the appropriate S3 bucket or the Log Group: 

{{< img src="integrations/amazon_vpc/flow_log_creation.png" alt="flow logs creation" responsive="true" style="width:75%;" >}}

**Note**: Specify `vpc` as prefix for the file names in order to have the Lambda automatically set the `vpc` source on the logs. This triggers the Log integration in the platform.

##### Send Logs to Datadog

1. If you haven’t already, set up the [Datadog log collection AWS Lambda function][1].

2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or Cloudwatch Log Group that contains your VPC flow logs via the AWS console. Then, in your Lambda, click on S3 or CloudWatch in the trigger list:

    {{< img src="integrations/amazon_vpc/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" style="width:75%;" >}}

    Configure your trigger by choosing the S3 bucket that contains your AWS VPC logs, then change the *event type* to `Object Created (All)`. Finally, click on the add button.

    {{< img src="integrations/amazon_vpc/s3_lambda_trigger_configuration.png" alt="S3 lambda trigger" responsive="true" style="width:75%;" >}}

Once done, head over to the Datadog Log section to start exploring your logs!

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/#create-a-new-lambda-function
