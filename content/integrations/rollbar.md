---
title: Datadog-Rollbar Integration
integration_title: Rollbar
kind: integration
doclevel: basic
---
{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event" >}}

## Overview

Rollbar helps developers like us build better software, faster. With Rollbar developers can view exceptions from all of of their frameworks, platforms and environments in one place.

Connect Rollbar to Datadog to:

* Get notified of exceptions, errors, code deployments in your event stream
* Filter notifications by severity, environment, host, users and more
* Search for exceptions in your graphs
* Discuss exceptions with your team
* Spend less time debugging issues

## Installation

No installation is required.

## Configuration

Configuration is per-project in Rollbar.

* In Rollbar, go to the Notification settings page for a Project: **Dashboard** → **Settings** → **Notifications** → **Datadog**

* On Datadog, [head to the APIs page](https://app.datadoghq.com/account/settings#api) to get your API Key (copy to your clipboard): **Integrations** → **APIs**

* Add your Datadog API key in Rollbar

* Click [Enable Datadog Integration](https://app.datadoghq.com/account/settings#integrations/rollbar)

Done. Every time an exception occurs, it will appear in your event stream.

## Metrics

This integration does not include metrics at this time.

## Events

This integration will push exceptions, errors and code deployments into Datadog as events.
