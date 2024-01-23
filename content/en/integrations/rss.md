---
integration_title: RSS
name: rss
kind: integration
doclevel: basic
description: "See RSS feeds in your Datadog event explorer."
is_public: true
public_title: Datadog-RSS Integration
short_description: "Capture any RSS feed inside your Datadog event explorer"
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/rss.md']
categories:
    - notifications
integration_id: "feed"
---

{{< img src="integrations/rss/rss_event.png" alt="RSS event in Datadog events explorer" >}}

## Overview

The RSS Feed integration allows you to collect all of your RSS Feed events in Datadog, such as cloud provider status feeds or the Datadog release notes feed. Use your RSS Feed events to:

- Set up alerts for new or unexpected activity
- Display and analyze events on dashboards
- Discuss feed events with your team

## Setup

### Installation

Configuration requires:

- A full URL to an RSS or ATOM feed
- At least one custom tag per feed

**Optional**: Enter a username and a password to access the RSS feed.

{{< img src="integrations/rss/rss_setup.png" alt="RSS setup" >}}

### Validation

Check the [Events Explorer][1] to view RSS feed activity in Datadog.

## Further Reading

### Documentation

- [Exploring Datadog Events][2]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://docs.datadoghq.com/events/#exploring-datadog-events
