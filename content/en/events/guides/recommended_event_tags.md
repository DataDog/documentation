---
title: Best Practices For Tagging Events
kind: documentation
description: Learn about recommended event tags and how to add them.
further_reading:
- link: "/getting_started/tagging/assigning_tags"
  tag: "Documentation"
  text: "Learn about assigning tags"

---

As a best practice, Datadog recommends the use of [unified service tagging][1], plus other tags listed below for all events to help you:
- Identify potential issues faster
- Locate other related events
- Filter to more accurately in the event explorer e.g to a particular environment

### Recommended Core Attributes

| **Attribute** | **Notes**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | The environment in which the event is from e.g production, edge, staging. <br>Ensures that events from a lower environment are not confused to be of a higher priority                       |
| service       | Enables you to:<br>- know which service/services will be impacted if an event is related out an error<br>- pivot to that service quickly  <br>- filter to all events with that given service |
| version       | Enables you to know that you know that an event/outage for instance is only related to a particular version released                                                                         |
| host          | Adds the ability to: <br>- auto enrich event at intake with additional host tags<br>- pivot to the host infrastructure and metrics tabs easily in event explorer                             |
| team          | The team which owns the event, so that they can be notified if need be                                                                                                                       |                                                          |

#### Improving your Tagging

- **API**

When using the [API][2], tags can be added within the tags field.

- **Monitor**

When creating or editing a monitor, you can add the recommended tags within the [whats happening section][5]

- **Integrations**

To learn more about to how add tags to integrations, check out [assigning_tags][3] or the specific [integrations page][4]

[1]: /getting_started/tagging/unified_service_tagging
[2]: /api/latest/events/#post-an-event
[3]: /getting_started/tagging/assigning_tags
[4]: /integrations/
[5]: /getting_started/monitors/#notify-your-team
