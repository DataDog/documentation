---
title: Datadog-Pingdom Integration
integration_title: Pingdom
kind: integration
git_integration_title: pingdom
newhlevel: true
---

# Overview

Track Pingdom user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

At this time we track the response_time metric for any sites you configure on the Pingdom website.

Pingdom events can be added by configuring the relevant [Integration Status Monitor](https://app.datadoghq.com/monitors#create/integration)

*Note: Metrics can only be imported for Pingdom customers at the Starter level or above.*

# Configuration

1.  Open the Pingdom integration tile.
1.  Enter the username and password to your Pingdom account.
    (If you have a Team account, you can use your own credentials and specify the account you wish to pull checks from.)
1.  You can ignore some checks by unchecking them or add some tags to the events that are going to be generated.

# Metrics

<%= get_metrics_from_git() %>


