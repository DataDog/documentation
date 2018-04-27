---
beta: true
description: See AWS service changes in Datadog as context rich events.
doclevel: basic
git_integration_title: amazon_health
integration_title: AWS Health
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS Health Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/awshealth/awshealthevent.png" alt="AWS Health Event">}}

## Overview

AWS Health provides ongoing visibility into the state of your AWS resources, services, and accounts.

Enable this integration to see AWS Health service events in Datadog.

__Note, this integration only works for AWS customers with a Business or Enterprise support plan.__

## Setup
### Installation

1. If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).
2. Install the integration [on the AWS Health tile](https://app.datadoghq.com/account/settings#integrations/amazon_health).
3. Add the `health:Describe*` action to your Datadog policy in AWS.

## Data Collected
### Events

* This integration collects event that can be found in the AWS Personal Health Dashboard. 
* Examples include open issues, scheduled maintenances, and account notifications.
