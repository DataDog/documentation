---
title: Reserved Attributes
aliases:
- /service_management/events/explorer/attributes/
disable_toc: false
further_reading:
- link: "/events/explorer/facets"
  tag: "Documentation"
  text: "Learn about Event facets"
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Attributes are used for facets and tags, which are then used to filter and search in the Events Explorer. 

## List of reserved attributes

This list describes automatically ingested reserved attributes with events.

| Attribute | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your events. The Agent sets this value automatically.                          |
| `source`  | This corresponds to the integration name, or the technology from which the event originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: `nginx`, `postgresql`, and more. |
| `status`  | This corresponds to the level or severity of an event.      |
| `service` | The name of the application or service generating the events. |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the event entry. |   

### Events with multiple service tags

The reserved `service` attribute accepts one value. If an event has multiple `service` tags:

- V1 selects the first `service` tag it processes. Because tags are not sorted, the result is not deterministic.
- V2 sorts the tags alphabetically and selects the first `service` tag.

For example, consider an event with `env:prod`, `service:payments`, `team:store`, and `service:checkout`. V1 can assign either service value. V2 assigns `checkout`, because `service:checkout` comes before `service:payments` alphabetically.

Send only one `service` tag per event and use another tag key for additional dimensions. A `service:<value>` query matches the reserved attribute; use `tags:("service:<value>")` to find any value in the raw tag list.

To search a tag that has the same key as a reserved attribute, use the `tags` search syntax. 
Example: `tags:("status:<status>")`

To create a facet on a tag that has the same key as a reserved attribute:
1. Use the [Remapper processor][1] to remap the tag to another tag or attribute.
2. Create a [facet][2] on the new tag/attribute.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/remapper/
[2]: /events/explorer/facets
