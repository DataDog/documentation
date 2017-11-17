---
aliases:
- /integrations/awswaf/
description: Track allowed versus blocked requests.
git_integration_title: amazon_waf
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Web Application Firewall Integration
---

## Overview

AWS WAF is a web application firewall that helps protect your web applications from common web exploits.

Enable this integration to see in Datadog all your WAF metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that WAF is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS WAF integration does not include any event at this time.

### Service Checks
The AWS WAF integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)