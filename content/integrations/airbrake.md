---
title: Datadog-Airbrake Integration
integration_title: Airbrake
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: airbrake
---

## Overview

{{< img src="integrations/airbrake/airbrakeevent.png" style="width: 500px;" >}}

Connect Airbrake to Datadog to:

  * See exceptions in the stream, in real time
  * Search for exceptions in your graphs
  * Discuss exceptions with your team

## Configuration

Setting up Airbrake integration using webhooks:

1. Go to your Airbrake account Settings page

2. For every project you want to enable, click "Integrations"

3. Click on "WebHooks" and enter this URL in the "URL" field:
```
https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
```

4. Click "Save"

Every time a new error occurs, it will appear in your stream.


## Metrics

{{< get-metrics-from-git >}}