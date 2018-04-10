---
description: Track email bounces, delivery attempts, rejected messages, and more.
git_integration_title: amazon_ses
integration_title: AWS SES
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS SES Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Amazon Simple Email Service (SES) is a cost-effective, outbound-only email-sending service.

Enable this integration to see in Datadog all your SES metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). The only requirement for this integration is the permission `ses:get`.

### Configuration

In the Amazon Web Services integration tile, ensure that SES is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
