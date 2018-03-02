---
creates_events: false
ddtype: crawler
display_name: Logz.io
doc_link: https://docs.datadoghq.com/integrations/logzio/
git_integration_title: logzio
has_logo: true
integration_title: Logz.io
is_public: true
kind: integration
manifest_version: 1.0.2
metric_prefix: logzio.
metric_to_check: logzio.test
name: logzio
public_title: Datadog-Logz.io Integration
short_description: AI-Powered ELK as a Service
version: 1.0.0
---

## Overview

Integrate with Logz.io alerts to see events taking place in real-time

*   Import alerts into Datadog

![import_alert_from_logz](https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg)

*   Incorporate the events into a dashboard to identify correlations with metrics

![dashboard](https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png)

## Setup

### Installation

_To import alerts into Datadog, you need to take the following steps:_

1.  Use a Datadog API key to create a new alert endpoint in Logz.io.
2.  Create a new alert in Logz.io for a specific query.

For a more detailed setup description, see [the logz.io dedicated datadog documentation](http://logz.io/blog/log-correlation-datadog/).

## Data Collected
### Metrics
The Logz.io check does not include any metrics at this time.

### Events
The Logz.io check does not include any events at this time.

### Service Checks
The Logz.io check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).

