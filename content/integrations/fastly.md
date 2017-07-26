---
title: Datadog-Fastly Integration
integration_title: Fastly
kind: integration
doclevel: basic
git_integration_title: fastly
newhlevel: true
---
## Overview

{{< img src="integrations/fastly/fastlygraph.png" alt="Fastly Graph" >}}

Connect to Fastly to see key Fastly metrics (like cache coverage and header size) in context with the rest of your Datadog metrics.

## Installation

No installation steps required.

## Configuration

Create a Read-only access API Token on Fastly's token management page, get your Service ID from the Dashboard and enter them in the [Fastly integration tile](https://app.datadoghq.com/account/settings#integrations/fastly).

Note: The ServiceID is the alphanumerical code, e.g. 5VqE6MOOy1QFJbgmCK41pY (example from https://docs.fastly.com/api/auth).

If using multiple Service IDs from one account, please enter an API token on each line.

## Metrics

{{< get-metrics-from-git >}}
