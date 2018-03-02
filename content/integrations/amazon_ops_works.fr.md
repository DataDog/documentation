---
aliases:
- /integrations/awsopsworks/
categories:
- cloud
- provisioning
- aws
ddtype: crawler
description: Track AWS OpsWorks resource usage.
doc_link: https://docs.datadoghq.com/integrations/amazon_ops_works/
git_integration_title: amazon_ops_works
has_logo: true
integration_title: AWS OpsWorks
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ops_works
public_title: Datadog-AWS OpsWorks Integration
short_description: Track AWS OpsWorks resource usage.
version: '1.0'
---

## Overview

AWS OpsWorks is an application management service that makes it easy to deploy and operate applications of all shapes and sizes.

Enable this integration to see in Datadog all your OpsWorks metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).
### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `OpsWorks` is checked under metric collection.

2. Install the [Datadog - AWS OpsWork integration](https://app.datadoghq.com/account/settings#integrations/amazon_ops_works).


## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_ops_works" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Ops Works integration does not include any event at this time.

### Service Checks
The AWS Ops Works integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
