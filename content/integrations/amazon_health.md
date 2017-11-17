---
aliases: []
description: Track key Amazon Health metrics.
git_integration_title: amazon_health
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Health Integration
---

{{< img src="integrations/amazon_health/awshealthevent.png" alt="AWS Health Event" responsive="true" >}}

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
### Metrics
{{< get-metrics-from-git >}}

### Events

* This integration collects event that can be found in the AWS Personal Health Dashboard. 
* Examples include open issues, scheduled maintenances, and account notifications.

### Service Checks
The AWS Health integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)