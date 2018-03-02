---
categories:
- notification
- Collaboration
- issue tracking
ddtype: crawler
description: Datadog-StatusPage.io Integration.
doc_link: https://docs.datadoghq.com/integrations/statuspage/
git_integration_title: statuspage
has_logo: true
integration_title: StatusPage.io
is_public: true
kind: integration
manifest_version: '1.0'
name: statuspage
public_title: Datadog-StatusPage.io Integration
short_description: Datadog-StatusPage.io Integration.
version: '1.0'
---

## Overview

Capture incidents from the StatusPage of your third-party services to correlate incidents with your own metrics and events. This integration does not require having your own StatusPage.io account.

## Setup
### Installation

After you activate the integration tile, enter the StatusPage.io page for whichever service you want to monitor. For instance, the PagerDuty status page can be found at `https://status.pagerduty.com`. Enter any custom tags you wish to associate with the page and click on **Update Configuration**.

## Data Collected
### Metrics

The StatusPage integration does not include any metric at this time.

### Events

The StatusPage integration pulls in Datadog events from configured StatusPage ([such as PagerDuty](https://status.pagerduty.com)), allowing you to correlate these events within your metrics or [send out alerts based on these events](https://docs.datadoghq.com/monitors/monitor_types/event/).

### Service Checks
The StatusPage integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
