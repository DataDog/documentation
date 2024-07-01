---
title: Best Practices For Tagging Events
kind: guide
description: Learn about recommended event tags and how to add them.
aliases:
- /events/guides/recommended_event_tags
further_reading:
- link: /getting_started/tagging/assigning_tags
  tag: Documentation
  text: Learn about assigning tags
---

## Overview

Datadog recommends using [unified service tagging][1] and the tags listed below on all your events for the following benefits:

- Identify potential issues faster
- Locate related events
- Filter more accurately in the [Events Explorer][2], for example, to a specific environment

## Add tags

You have multiple options to improve your tagging strategy for events:

- API: When using the [API][3], you can add tags in the `tags` field.

- Monitor: When creating or editing a monitor, you can add recommended tags in the [**Say what's happening** section][4].

- Integrations: For more information about adding tags to integrations, see [Assigning Tags][5] or the specific [integration][6].

You can add the following core attributes to your events:

| **Attribute** | **Description**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | The environment in which the event is from, such as production, edge, or staging. This enables you to ensure that events from a lower environment are not confused as high priority.                       |
| service       | The service name. Enables you to:<br>- Know which service(s) are impacted if an event is related to an error<br>- Pivot to the impacted service  <br>- Filter for all events with that service |
| version       | The build or service version. This allows you to identify, for example, if an outage or event is related to a particular version.                                                                         |
| host          | The host name. Enables you to: <br>- Automatically enrich events at intake with additional host tags<br>- Pivot to the **Host Infrastructure** and **Metrics** tabs in the [Events Explorer][7].                             |
| team          | The team that owns the event and are notified if need be.                                                                                                                       |                                                          |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: /service_management/events/explorer
[3]: /api/latest/events/#post-an-event
[4]: /getting_started/monitors/#notify-your-services-and-your-team-members
[5]: /getting_started/tagging/assigning_tags
[6]: /integrations/
[7]: https://app.datadoghq.com/event/explorer
