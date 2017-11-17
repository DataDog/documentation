---
aliases: []
description: See and discuss new, open, pending, and resolved cases in your event
  stream.
git_integration_title: desk
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Desk Integration
---

## Overview

Connect Desk to Datadog to:

  * Receive new case events in the event stream
  * Visualize case stats by user and status
  * View trends in support tickets alongside DevOps issues

## Setup
### Configuration

From your Desk account, add an API application on the Settings -> API -> My Applications page (you made need administrator privileges.
Fill out the form as shown, leaving the latter two URL fields blank. Desk should then generate an application key, application secret, API access token, and API access token secret.

{{< img src="integrations/desk/desk_config.png" alt="desk config" responsive="true" >}}

Then from your Datadog account, enter the corresponding information on the [Desk tile](https://app.datadoghq.com/account/settings#integrations/desk). You will also need to enter your company's unique Desk domain name.
Hit the install button, and then you're all set! You will soon be able to select desk.* metrics on a custom dashboard or view them on the provided [Desk dashboard](https://app.datadoghq.com/screen/integration/desk). (You can also read about this integration on [our blog](https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration/).)

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Desk integration does not include any event at this time.

### Service Checks
The Desk integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)