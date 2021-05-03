---
categories:
    - cloud
    - aws
    - log collection
ddtype: crawler
description: Gather your HSM audit logs in your Datadog organization.
has_logo: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md']
integration_title: AWS Cloudhsm
is_public: true
kind: integration
name: amazon_cloudhsm
public_title: Datadog-AWS Cloudhsm Integration
short_description: Gather your HSM audit logs in your Datadog organization.
integration_id: "amazon-cloudhsm"
---

## Overview

When an HSM in your account receives a command from the AWS CloudHSM command line tools or software libraries, it records its execution of the command in audit log form. The HSM audit logs include all client-initiated management commands, including those that create and delete the HSM, log into and out of the HSM, and manage users and keys. These logs provide a reliable record of actions that have changed the state of the HSM.

Datadog integrates with AWS CloudHSM via a Lambda function that ships CloudHSM logs to Datadog’s Log Management solution.

## Setup

### Log collection

#### Enable CloudHSM logs

Audit logs are enabled by default for CloudHSM.

#### Send your logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].
2. Once the lambda function is installed, manually add a trigger on the Cloudwatch Log group that contains your CloudHSM logs in the AWS console:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group"  popup="true" style="width:70%;">}}
   Select the corresponding CloudWatch Log group, add a filter name (but feel free to leave the filter empty) and add the trigger.
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger"  popup="true" style="width:70%;">}}

Once done, go in your [Datadog Log section][2] to start exploring your logs!

## Troubleshooting

Need help? Contact [Datadog Support][3].

[1]: /integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
[3]: /help/
