---
categories:
- cloud
- health
- aws
ddtype: crawler
description: Monitor AWS service health events in near real time.
doc_link: https://docs.datadoghq.com/integrations/amazon_health
git_integration_title: amazon_health
has_logo: true
integration_title: AWS Health
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_health
public_title: Datadog-AWS Health Integration
short_description: Monitor AWS service health.
version: '1.0'
---

{{< img src="integrations/amazon_health/awshealthevent.png" alt="AWS Health Event" responsive="true" popup="true">}}

## Overview

AWS Health provides ongoing visibility into the state of your AWS resources, services, and accounts.

Enable this integration to see AWS Health service events in Datadog.

**Note**: This integration only works for AWS customers with a Business or Enterprise support plan.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Health metrics: 

    * `health:DescribeEvents`: Used to list all health events
    * `health:DescribeEventDetails`: Gets detailed information on health events
    * `health:DescribeAffectedEntities`: Gets the affected AWS entities for health events

    For more information on Health policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_health.html).

3. Install the [Datadog - AWS Health integration](https://app.datadoghq.com/account/settings#integrations/amazon_health).

## Data Collected
### Metrics
The AWS Health integration does not include any metric at this time.

### Events

* This integration collects event that can be found in the AWS Personal Health Dashboard. 
* Examples include open issues, scheduled maintenances, and account notifications.

### Service Checks
The AWS Health integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
