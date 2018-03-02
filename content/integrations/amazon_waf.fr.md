---
aliases:
- /integrations/awswaf/
categories:
- cloud
- security
- aws
ddtype: crawler
description: Track allowed versus blocked requests.
doc_link: https://docs.datadoghq.com/integrations/amazon_waf/
git_integration_title: amazon_waf
has_logo: true
integration_title: AWS Web Application Firewall
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_waf
public_title: Datadog-AWS Web Application Firewall Integration
short_description: Track allowed versus blocked requests.
version: '1.0'
---

## Overview

AWS WAF is a web application firewall that helps protect your web applications from common web exploits.

Enable this integration to see in Datadog all your WAF metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `WAF` is checked under metric collection.

2. Install the [Datadog - AWS WAF integration](https://app.datadoghq.com/account/settings#integrations/amazon_waf).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_waf" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS WAF integration does not include any event at this time.

### Service Checks
The AWS WAF integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
