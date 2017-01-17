---
title: Datadog-Rollbar Integration
integration_title: Rollbar
kind: integration
doclevel: basic
---

### Overview

Rollbar helps developers like us build better software, faster. With Rollbar developers can view exceptions from all of of their frameworks, platforms and environments in one place.

With this integration Rollbar users can:

- Syndicate exceptions, errors and code deployments as 'Events' in Datadog.

### Installation

No installation is required.

### Configuration

To integrate Rollbar with Datadog:

1. Retrieve an API key from Datadog's [API settings page](https://app.datadoghq.com/account/settings#api)
1. Login to [Rollbar](http://www.rollbar.com), and go to the Notification settings page for a project: Dashboard → Settings → Notifications
1. Enter your Datadog API key.
1. Click Enable Datadog Integration
1. (optional) Customize your notification settings to taste!

### Metrics

This integration does not include metrics at this time.

### Events

This integration will push exceptions, errors and code deployments into Datadog as events.
