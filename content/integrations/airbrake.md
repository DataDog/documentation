---
aliases: []
description: View, search on, and discuss Airbrake exceptions in your event stream.
git_integration_title: airbrake
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Airbrake Integration
---

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake event" responsive="true" >}}

## Overview

Connect Airbrake to Datadog to:

  * See exceptions in the stream, in real time
  * Search for exceptions in your graphs
  * Discuss exceptions with your team

## Setup
### Configuration

Setting up Airbrake integration using webhooks:

1. Go to your Airbrake account Settings page

2. For every project you want to enable, click "Integrations"

3. Click on "WebHooks" and enter this URL in the "URL" field:
4. 
```
https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
```

4. Click "Save"

Every time a new error occurs, it will appear in your stream.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Airbrake check does not include any event at this time.

### Service Checks
The Airbrake check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)