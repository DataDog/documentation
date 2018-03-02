---
aliases:
- /integrations/awskms/
categories:
- cloud
- security
- aws
ddtype: crawler
description: Track Amazon KMS key expiration.
doc_link: https://docs.datadoghq.com/integrations/amazon_kms/
git_integration_title: amazon_kms
has_logo: true
integration_title: AWS Key Management Service
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kms
public_title: Datadog-AWS Key Management Service Integration
short_description: Track Amazon KMS key expiration.
version: '1.0'
---

## Overview

AWS Key Management Service (KMS) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your data.

Enable this integration to see in Datadog all your KMS metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `KMS` is checked under metric collection.

2. Install the [Datadog - AWS KMS integration](https://app.datadoghq.com/account/settings#integrations/amazon_kms).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_kms" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS KMS integration does not include any event at this time.

### Service Checks
The AWS KMS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
