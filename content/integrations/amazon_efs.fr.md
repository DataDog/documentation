---
aliases:
- /integrations/awsefs/
categories:
- cloud
- os & system
- aws
ddtype: crawler
description: Track key Amazon Elastic Filesystem metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_efs/
git_integration_title: amazon_efs
has_logo: true
integration_title: AWS Elastic File System
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_efs
public_title: Datadog-AWS Elastic File System Integration
short_description: Track key Amazon Elastic Filesystem metrics.
version: '1.0'
---

## Overview

Amazon EFS provides simple, scalable file storage for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EFS metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). 

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `EFS` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon EFS metrics: 

    * `elasticfilesystem:DescribeTags`: Gets custom tags applied to file systems
    * `elasticfilesystem:DescribeFileSystems`: Provides a list of active file systems

    For more information on EFS policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html).

3. Install the [Datadog - AWS EFS integration](https://app.datadoghq.com/account/settings#integrations/amazon_efs).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_efs" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Elastic File System integration does not include any event at this time.

### Service Checks
The AWS Elastic File System integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
