---
categories:
    - cloud
    - aws
    - log collection
description: Gather your HSM audit logs in your Datadog organization.
has_logo: true
dependencies:
    ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md"]
integration_title: AWS CloudHSM
is_public: true
custom_kind: integration
name: amazon_cloudhsm
public_title: Datadog-AWS Cloudhsm Integration
short_description: Gather your HSM audit logs in your Datadog organization.
integration_id: "amazon-cloudhsm"
---

## Overview

When an HSM in your account receives a command from the AWS CloudHSM command line tools or software libraries, it records its execution of the command in audit log form. The HSM audit logs include all client-initiated management commands, including those that create and delete the HSM, log into and out of the HSM, and manage users and keys. These logs provide a reliable record of actions that have changed the state of the HSM.

Datadog integrates with AWS CloudHSM through a Lambda function that ships CloudHSM logs to Datadog’s Log Management solution.

## Setup

### Log collection

#### Enable logs

Audit logs are enabled by default for CloudHSM.

#### Send your logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][1] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **CloudWatch Logs** trigger for the Trigger Configuration.
4. Select the CloudWatch log group that contains your CloudHSM logs.
5. Enter a name for the filter.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][2] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][3].

## Troubleshooting

Need help? Contact [Datadog Support][4].

[1]: /logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[4]: /help/
