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

VPC flow logs can be generated to a S3 bucket or a Cloudwatch Log group.
Click on the VPC you want to monitor in the list and choose `Create Flow logs` in the Flow Logs tab at the bottom of the screen:

{{< img src="integrations/amazon_vpc/flow_logs.png" alt="flow logs" responsive="true" style="width:75%;" >}}


Select the `All` filter to get both accepted and rejected connection and choose the S3 bucket or the Log Group of your choice: 

{{< img src="integrations/amazon_vpc/flow_log_creation.png" alt="flow logs creation" responsive="true" style="width:75%;" >}}

**Important note**: When enabling logging, specify `vpc` as prefix for the file names to have the Lambda automatically set the `vpc` source on the logs which then triggers the Log integration in the platform.

##### Send Logs to Datadog

1. If you haven’t already, set up the [Datadog log collection AWS Lambda function][1].
2. Once the lambda function is installed, manually add a trigger on the S3 bucket or the Cloudwatch Log Group that contains your VPC flow logs in the AWS console, in your Lambda, click on S3 or CloudWatch in the trigger list:

    {{< img src="integrations/amazon_vpc/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" style="width:75%;" >}}

    Configure your trigger by choosing the S3 bucket that contains your AWS VPC logs and change the event type to Object Created (All) then click on the add button.

    {{< img src="integrations/amazon_vpc/s3_lambda_trigger_configuration.png" alt="S3 lambda trigger" responsive="true" style="width:75%;" >}}

Once done, go in your Datadog Log section to start exploring your logs!

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/#create-a-new-lambda-function