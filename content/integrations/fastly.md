---
title: Datadog-Fastly Integration
integration_title: Fastly
kind: integration
doclevel: basic
git_integration_title: fastly
newhlevel: true
---
# Overview

![Fastly Graph](/static/images/fastlygraph.png)

Connect to Fastly to see key Fastly metrics (like cache coverage and header size) in context with the rest of your Datadog metrics.

# Installation

No installation steps required.

# Configuration

To enable metrics collection locate your API key on Fastly's Account Settings page, and the Service ID on the Configure page and enter them in the [Fastly integration tile](https://app.datadoghq.com/account/settings#integrations/fastly). 

Note: The ServiceID is the alphanumerical code, e.g. 5VqE6MOOy1QFJbgmCK41pY (example from https://docs.fastly.com/api/auth).

If using multiple Service IDs from one account, please enter the API key on each line.

# Metrics

<%= get_metrics_from_git() %>
