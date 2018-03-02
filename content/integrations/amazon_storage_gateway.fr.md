---
aliases:
- /integrations/awsstoragegateway/
categories:
- cloud
- data store
- aws
ddtype: crawler
description: Track key AWS Storage Gateway metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_storage_gateway/
git_integration_title: amazon_storage_gateway
has_logo: true
integration_title: AWS Storage Gateway
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_storage_gateway
public_title: Datadog-AWS Storage Gateway Integration
short_description: Track key AWS Storage Gateway metrics.
version: '1.0'
---

## Overview

AWS Storage Gateway provides seamless and secure integration between an organization's IT environment and AWS's storage infrastructure.

Enable this integration to see in Datadog all your Storage Gateway metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). 

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `StorageGateway` is checked under metric collection.

2. Install the [Datadog - AWS Storage Gateway integration](https://app.datadoghq.com/account/settings#integrations/amazon_storage_gateway).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_storage_gateway" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Storage Gateway integration does not include any event at this time.

### Service Checks
The AWS Storage Gateway integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
