---
categories:
- Cost Management
- security
- configuration & deployment
- cloud
ddtype: crawler
description: 'Help CloudHealth help you: give it per-instance metrics from Datadog.'
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
git_integration_title: cloudhealth
has_logo: true
integration_title: Cloudhealth
is_public: true
kind: integration
manifest_version: '1.0'
name: cloudhealth
public_title: Datadog-Cloudhealth Integration
short_description: 'Help CloudHealth help you: give it per-instance metrics from Datadog.'
version: '1.0'
---

## Overview

If you use both Cloudhealth and Datadog, you can configure your Cloudhealth account to collect per-instance resource usage metrics from Datadog. This helps CloudHealth gives you more accurate recommendations for adjusting your cloud resources.

This integration does **NOT** pull anything from Cloudhealth into Datadog. It just helps Cloudhealth poll your Datadog account for metrics.

## Setup
### Configuration

If you have not yet started optimizing your cloud with CloudHealth, first sign up for a [risk-free 14 day trial](https://www.cloudhealthtech.com/). For existing CloudHealth customers, all you need to do is take these four simple steps to setup your Datadog integration in CloudHealth and to improve visibility across every dimension of their cloud environment.

1. In the CloudHealth Platform, Go to Setup -> Accounts -> Datadog and click New Account button on the top right corner.
{{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="Cloudhealth Config 2" responsive="true" popup="true">}}

2. Fill out the form with information from the Datadog account that you want to integrate:
    * Name - friendly name, you can update this at any time.

    * API Key - API keys are unique to your organization.

    * Application Key - Application keys, in conjunction with your organization's API key, give access to Datadog's API. CloudHealth only queries Datadog for host and metric information, and does not write anything to Datadog.

    * Import Tags - This will allow you to import Datadog tags into the platform

3. Allowed tags - if "Import tags" is toggled on, tags will be actively collected and you will see an additional field to whitelist the tags that you want to import into CloudHealth. Select the tags that should be allowed to imported within the CloudHealth platform.
{{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="Cloudhealth Config 1" responsive="true" popup="true">}}

## Data Collected
### Metrics

The Cloudhealth integration does not include metrics at this time.

### Events

The Cloudhealth integration pushes Catchpoint events to your Datadog event stream.

### Service Checks
The Cloudhealth integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
