---
categories:
- notification
- issue tracking
- exceptions
ddtype: crawler
description: Send exceptions, errors, and code deployments to your Datadog event stream.
doc_link: https://docs.datadoghq.com/integrations/rollbar/
git_integration_title: rollbar
has_logo: true
integration_title: Rollbar
is_public: true
kind: integration
manifest_version: '1.0'
name: rollbar
public_title: Datadog-Rollbar Integration
short_description: Send exceptions, errors, and code deployments to your Datadog event
  stream.
version: '1.0'
---

{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event" responsive="true" popup="true">}}

## Overview

Rollbar helps developers like us build better software, faster. With Rollbar developers can view exceptions from all of of their frameworks, platforms and environments in one place.

Connect Rollbar to Datadog to:

* Get notified of exceptions, errors, code deployments in your event stream
* Filter notifications by severity, environment, host, users and more
* Search for exceptions in your graphs
* Discuss exceptions with your team
* Spend less time debugging issues

## Setup
### Installation

No installation is required.

### Configuration

Configuration is per-project in Rollbar.

* In Rollbar, go to the Notification settings page for a Project: **Dashboard** → **Settings** → **Notifications** → **Datadog**

* On Datadog, [head to the APIs page](https://app.datadoghq.com/account/settings#api) to get your API Key (copy to your clipboard): **Integrations** → **APIs**

* Add your Datadog API key in Rollbar

* Click [Enable Datadog Integration](https://app.datadoghq.com/account/settings#integrations/rollbar)

Done. Every time an exception occurs, it will appear in your event stream.

## Data Collected
### Metrics

The Redmine integration does not include any metric at this time.

### Events

The Redmine integration will push exceptions, errors and code deployments into Datadog as events.

### Service Checks
The Redmine integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
