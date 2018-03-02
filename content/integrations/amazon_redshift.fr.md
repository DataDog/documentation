---
aliases:
- /integrations/awsredshift/
categories:
- cloud
- aws
ddtype: crawler
description: Track key Amazon Redshift metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
git_integration_title: amazon_redshift
has_logo: true
integration_title: AWS Redshift
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_redshift
public_title: Datadog-AWS Redshift Integration
short_description: Track key Amazon Redshift metrics.
version: '1.0'
---

## Overview

Amazon Redshift is a fast, fully managed, petabyte-scale data warehouse service that makes it simple and cost-effective to efficiently analyze all your data.

Enable this integration to see all your Redshift metrics in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Redshift` is checked under metric collection.

2. Install the [Datadog - AWS Redshift integration](https://app.datadoghq.com/account/settings#integrations/amazon_redshift).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_redshift" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Redshift integration does not include any event at this time.

### Service Checks
The AWS Redshift integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

