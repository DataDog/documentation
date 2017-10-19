---
title: Datadog-Fastly Integration
integration_title: Fastly
kind: integration
doclevel: basic
git_integration_title: fastly
newhlevel: true
description: "Track cache-related metrics, origin requests, response codes, and more."
---

{{< img src="integrations/fastly/fastlygraph.png" alt="Fastly Graph" responsive="true" >}}

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

{{< get-metrics-from-git >}}
