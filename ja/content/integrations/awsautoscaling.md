---
description: Track the status and counts of instances in your Auto Scaling Groups.
git_integration_title: amazon_auto_scaling
integration_title: AWS Auto Scaling
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS Auto Scaling Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Amazon Auto Scaling is a service to launch or terminate EC2 instances automatically based on user-defined policies.

Enable this integration to see in Datadog all your Auto Scaling metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that Auto Scaling is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
