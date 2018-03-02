---
aliases:
- /integrations/awsml/
categories:
- cloud
- aws
ddtype: crawler
description: Track prediction counts and failures from AWS Machine Learning.
doc_link: https://docs.datadoghq.com/integrations/amazon_machine_learning/
git_integration_title: amazon_machine_learning
has_logo: true
integration_title: AWS Machine Learning
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Datadog-AWS Machine Learning Integration
short_description: Track prediction counts and failures from AWS Machine Learning.
version: '1.0'
---

## Overview

Amazon Machine Learning is a service that makes it easy for developers of all skill levels to use machine learning technology.

Enable this integration to see in Datadog all your Machine Learning metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `MachineLearning` is checked under metric collection.

2. Install the [Datadog - AWS Machine Learning integration](https://app.datadoghq.com/account/settings#integrations/amazon_machine_learning).


## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_machine_learning" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Machine Learning integration does not include any event at this time.

### Service Checks
The AWS Machine Learning integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
