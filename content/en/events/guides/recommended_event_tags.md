---
title: Best Practices For Tagging Events
kind: documentation
description: Learn about recommended event tags and how to add them.
further_reading:
- link: "/getting_started/tagging/assigning_tags"
  tag: "Documentation"
  text: "Learn about assigning tags"

---

As a best practice, Datadog recommends the use of [unified service tagging][1] (env, service, version), plus other tags listed below for all events to help you:
- Identify potential issues faster
- Locate other related events
- Filter to more accurately e.g to a particular environment

If using the [API][1], they can be added within the tags param or to learn more about to how add them to certain integrations, check out [assigning_tags][2]

### Recommended Core Attributes

| **Attribute** | **Notes**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | The environment in which the event is from e.g production, edge, staging. Helps prevent confusion with events that                                                                           |
| service       | Enables you to:<br>- know which service/services will be impacted if an event is related out an error<br>- pivot to that service quickly  <br>- filter to all events with that given service |
| host          | Adds the ability to: <br>- auto enrich event at intake with additional host tags<br>- pivot to the host infrastructure and metrics tabs easily in event explorer                             |
| team          | The team which owns the event, so that they can be notified if need be                                                                                                                       |
| version       | Enables you to know that you know that an event/outage for instance is only related to a particular version released                                                                         |                                                   |

[1]: /getting_started/tagging/unified_service_tagging
[2]: /api/latest/events/#post-an-event
[3]: /getting_started/tagging/assigning_tags
