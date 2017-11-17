---
aliases:
- /integrations/awskms/
description: Track Amazon KMS key expiration.
git_integration_title: amazon_kms
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Key Management Service Integration
---

## Overview

AWS Key Management Service (KMS) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your data.

Enable this integration to see in Datadog all your KMS metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that KMS is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS KMS integration does not include any event at this time.

### Service Checks
The AWS KMS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)