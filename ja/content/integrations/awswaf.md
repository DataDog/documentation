---
description: Track allowed versus blocked requests.
git_integration_title: amazon_waf
integration_title: AWS Web Application Firewall
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS Web Application Firewall Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

AWS WAF is a web application firewall that helps protect your web applications from common web exploits.

Enable this integration to see in Datadog all your WAF metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that WAF is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
