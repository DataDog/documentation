---
description: Send exceptions, errors, and code deployments from Rollbar to your Datadog
  event stream.
doclevel: basic
integration_title: Rollbar
kind: integration
placeholder: true
title: Datadog-Rollbar Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event" >}}

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

This integration does not include metrics at this time.

### Events

This integration will push exceptions, errors and code deployments into Datadog as events.
