---
aliases:
- /integrations/awssqs/
categories:
- cloud
- processing
- aws
ddtype: crawler
description: Track queue size, average message size, number of messages, and more.
doc_link: https://docs.datadoghq.com/integrations/amazon_sqs/
git_integration_title: amazon_sqs
has_logo: true
integration_title: AWS SQS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_sqs
public_title: Datadog-AWS SQS Integration
short_description: Track queue size, average message size, number of messages, and
  more.
version: '1.0'
---

{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS Dashboard" responsive="true" popup="true">}}

## Overview

Amazon Simple Queue Service (SQS) is a fast, reliable, scalable, fully managed message queuing service.

Enable this integration to see all your SQS metrics in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `SQS` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon SQS metrics: 

    * `sqs:ListQueues`: Used to list alive queues.

    For more information on SQS policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html).

3. Install the [Datadog - AWS SQS integration](https://app.datadoghq.com/account/settings#integrations/amazon_sqs).


## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_sqs" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS SQS integration does not include any event at this time.

### Service Checks
The AWS SQS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
