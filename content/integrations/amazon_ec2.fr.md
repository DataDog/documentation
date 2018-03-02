---
aliases:
- /integrations/awsec2/
categories:
- cloud
- os & system
- aws
ddtype: crawler
description: Track instance resource usage, monitor status checks, and more.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2/
git_integration_title: amazon_ec2
has_logo: true
integration_title: AWS EC2
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ec2
public_title: Datadog-AWS EC2 Integration
short_description: Track instance resource usage, monitor status checks, and more.
version: '1.0'
---

## Overview

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Enable this integration to see in Datadog all your EC2 metrics, and additional events like scheduled maintenances.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `EC2` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon EC2 metrics: 

    * `ec2:DescribeInstanceStatus`: Used by the ELB integration to assert the health of an instance. Used by the EC2 integration to describe the health of all instances.
    * `ec2:DescribeSecurityGroups`: Adds SecurityGroup names and custom tags to ec2 instances.
    * `ec2:DescribeInstances`: Adds tags to ec2 instances and ec2 cloudwatch metrics.

    For more information on EC2 policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html).

3. Install the [Datadog - AWS EC2 integration](https://app.datadoghq.com/account/settings#integrations/amazon_ec2).

**Note**: If you want to only monitor a subset of your EC2 instances on AWS, tag them and specify the tag in the **limit** textbox in your [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_ec2" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

**Note**: `aws.ec2.instance_age` is not collected by default with Datadog - EC2 integration. [Contact us](http://docs.datadoghq.com/help/) to enable this metric collection.

### Events
The AWS EC2 integration does not include any event at this time.

### Service Checks
{{< get-service-checks-from-git "amazon_ec2" >}}


## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

