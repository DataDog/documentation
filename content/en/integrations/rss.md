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
    - notification
    - web
integration_id: "feed"
---

{{< img src="integrations/rss/rss.png" alt="RSS event" >}}

## Overview

Capture RSS feed activity in Datadog to:

- Add events from custom sources to your explorer.
- Discuss feed events with your team.

## Setup

### Installation

Configuration requires:

- A full URL to an RSS or ATOM feed
- At least one custom tag per feed.

**Optional**: Enter a username and a password to access the RSS feed

{{< img src="integrations/rss/rss_setup.png" alt="RSS setup" >}}

### Validation

Check the [Events Explorer][1] to view RSS feed activity in Datadog.

## Further Reading

### Documentation

- [Exploring Datadog Events][2]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://docs.datadoghq.com/events/#exploring-datadog-events
