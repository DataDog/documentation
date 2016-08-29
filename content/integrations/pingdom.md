---
title: Datadog-Pingdom Integration
integration_title: Pingdom
kind: integration
git_integration_title: pingdom
newhlevel: true
---

# Overview

![Pingdom Event](/static/images/pingdomevent.png)

Track Pingdom downtime events and user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

At this time we track the response_time metric for any sites you configure on the Pingdom website.

*Note: Events and metrics can only be imported for Pingdom customers at the Starter level or above.*

# Configuration

1.  Open the Pingdom integration tile.
1.  Enter the username and password to your Pingdom account.
    (If you have a Team account, you can use your own credentials and specify the account you wish to pull checks from.)
1.  You can ignore some checks by unchecking them or add some tags to the events that are going to be generated.

Note: Pingdom does not provide an API for transaction checks, so we’re not able to show them in Datadog. 

# Metrics

<%= get_metrics_from_git() %>


