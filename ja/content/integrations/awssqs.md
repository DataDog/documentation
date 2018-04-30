---
description: Track queue size, average message size, number of messages, and more.
git_integration_title: amazon_sqs
integration_title: AWS SQS
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS SQS Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/awssqs/sqsdashboard.png" alt="SQS Dashboard" >}}

## Overview

Amazon Simple Queue Service (SQS) is a fast, reliable, scalable, fully managed message queuing service.

Enable this integration to see all your SQS metrics in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that SQS is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
