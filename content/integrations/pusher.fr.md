---
categories:
- processing
- messaging
ddtype: crawler
description: Get metrics from Pusher into Datadog to see and monitor app engagement.
doc_link: https://docs.datadoghq.com/integrations/pusher/
git_integration_title: pusher
has_logo: true
integration_title: Pusher
is_public: true
kind: integration
manifest_version: '1.0'
name: pusher
public_title: Datadog-Pusher Integration
short_description: Get metrics from Pusher into Datadog to see and monitor app engagement.
version: '1.0'
---


## Overview

Monitor your realtime messages and connection analytics across your Pusher apps:

* Visualise concurrent connections in realtime

* Track messages sent by type, including broadcast, client events, webhooks, and API messages

* Get a statistical breakdown of message size, including average, median, max, and 95th percentile

* Monitor usage within billing timetables

## Setup
### Installation

In order to monitor your metrics from Pusher:

1. Copy your [Datadog API key](https://app.datadoghq.com/account/settings#api):

2. Go to your Pusher account settings and select Datadog Integration, or go [here](https://dashboard.pusher.com/accounts/sign_in)

3. Paste your Datadog API key and click Save

4. Return to your Datadog dashboard to see metrics begin to populate the default Pusher dashboard view 

<div class="alert alert-info">
Metrics are populated in realtime, therefore your historical data will begin to populate once your integration is successfully completed
</div>

## Data Collected
### Metrics
{{< get-metrics-from-git "pusher" >}}


### Events
The Pusher integration does not include any event at this time.

### Service Checks
The Pusher integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
