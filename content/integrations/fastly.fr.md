---
categories:
- web
ddtype: crawler
description: Track cache-related metrics, origin requests, response codes, and more.
doc_link: https://docs.datadoghq.com/integrations/fastly/
git_integration_title: fastly
has_logo: true
integration_title: Fastly
is_public: true
kind: integration
manifest_version: '1.0'
name: fastly
public_title: Datadog-Fastly Integration
short_description: Track cache-related metrics, origin requests, response codes, and
  more.
version: '1.0'
---

{{< img src="integrations/fastly/fastlygraph.png" alt="Fastly Graph" responsive="true" popup="true">}}

## Overview

Connect to Fastly to see key Fastly metrics (like cache coverage and header size) in context with the rest of your Datadog metrics.

## Setup
### Installation

No installation steps required.

### Configuration

Create a Read-only access API Token on Fastly's token management page, get your Service ID from the Dashboard and enter them in the [Fastly integration tile](https://app.datadoghq.com/account/settings#integrations/fastly).

<div class="alert alert-info">
The ServiceID is the alphanumerical code, e.g. 5VqE6MOOy1QFJbgmCK41pY (example from <a href="https://docs.fastly.com/api/auth">here</a>).
</div>

If using multiple Service IDs from one account, please enter an API token on each line.

## Data Collected
### Metrics
{{< get-metrics-from-git "fastly" >}}


### Events
The Fastly integration does not include any event at this time.

### Service Checks
The Fastly integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
